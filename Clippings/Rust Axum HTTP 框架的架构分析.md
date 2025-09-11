---
title: "Rust: Axum HTTP 框架的架构分析"
source: "https://zhuanlan.zhihu.com/p/711528388"
author:
  - "[[鹅厂架构师​已认证机构号]]"
published:
created: 2025-06-08
description: "以下内容来自腾讯工程师 island导语：基于 Rust Axum HTTP 服务框架详解和案例， 看完该文章，我相信您会对 Axum 或者是其他的Rust http server 框架有更深的理解。 axum 是 hyper 之上相对较薄的一层，增加的开销…"
tags:
  - "clippings"
---
![Rust: Axum HTTP 框架的架构分析](https://pica.zhimg.com/70/v2-638631f135d6fd6cce8c0760e0033153_1440w.avis?source=172ae18b&biz_tag=Post)

Rust: Axum HTTP 框架的架构分析

目录

收起

Axum 整体架构图

Axum 基准测试

Handler 抽象设计

Axum 的handler 正是如此的特性

参数约束

Axum extract 中 FromRequest trait

如果我们需要从 handler 通过 Query 中提取数据， 那么我们该如何处理 handler？？？

Axum 的 Response 的实现和约束

Request 的所有权的问题

支持 Async Fn

middleware(中间件)的设计 --- Tower Service

那么如何实现一个自定义的中间件呢？？

方法 1. 使用实现 Tower Service trait， 参考下面案例(实现 jwt 验证的 auth 中间件)

方法2： 使用: axum::middleware::from\_fn

方法3： 使用: axum::middleware::from\_extractor

方法4： 使用 tower’s combinators: 不展开详解， 如果需要， 可以看看官方文档

总结

Response 响应

自定义 Response Body

状态共享

路由抽象

路由查找： axum 使用了 matchit = "0.7"

axum 中关系如下

路由组合

Axum Server 的创建和使用

> 以下内容来自腾讯工程师 island

导语：基于 [Rust](https://zhida.zhihu.com/search?content_id=246248543&content_type=Article&match_order=1&q=Rust&zhida_source=entity) [Axum](https://zhida.zhihu.com/search?content_id=246248543&content_type=Article&match_order=1&q=Axum&zhida_source=entity) HTTP 服务框架详解和案例， 看完该文章，我相信您会对 Axum 或者是其他的Rust http server 框架有更深的理解。

axum 是 [hyper](https://zhida.zhihu.com/search?content_id=246248543&content_type=Article&match_order=1&q=hyper&zhida_source=entity) 之上相对较薄的一层，增加的开销非常小。所以axum的性能与hyper相当。可以在 github 仓库中找到对应的基准测试；

## Axum 整体架构图

![](https://pic2.zhimg.com/v2-e8003960ae2cc7c8d9db03c35a664117_1440w.jpg)

图上可看出请求的流向（图来自互联网）

关键信息： hyper, axum(Server, Router, Matchit, Endpoint, Route, Middleware, Handler, Request, Response);

## Axum 基准测试

![](https://picx.zhimg.com/v2-2e1adfcf8d0c9dbb39d5d86c6fae32b5_1440w.jpg)

## Handler 抽象设计

```
// 对于简单的路由设计 axum 是这样的：
use axum::{
    routing::get,
    Router,
};

let router = Router::new();

// handler 没有参数
let router = router
    .route("/", get(async || {"hello world"}))
```

如果我们设计最简单的路由是自行解析 Http 结构中的数据， cookie，header， body， query 等( hyper decode http协议)， 如何将解析出来的 http.request 给 handler， 由 handler 函数放回一个 Response

```
// 类似这样的设计
add_route(handler: H, ...)
    where H: Fn(req: http::Request) -> http::Response { ... }
```

这样就存在很多设计的缺陷： 比如：用户需要自己来解析 http 协议从其中返序列化出对应的数据，还需要组装 http.Response, 如果我们可以直接从 handler 的参数中获取到对应已经序列化好的参数，则非常的方便

### Axum 的handler 正是如此的特性

> 为了解决上述的问题： handler 需要支持如下特性

1. 约束每一个参数都可以从 http request 中提取到数据
2. 约束函数的返回值都可以转换为 HTTP Response
3. 支持可变的参数
4. 支持 Async Fn

### 参数约束

> 我们期望是可以在通过编译检测确保这些参数可以从 Request 中提取到， 那么我们定义 Trait

```
// 这个类似我们的设计
pub trait FromRequest {
  // 我们需要一个错误的关联类型
  type Error
  // 接受一个 Request， 如果处理不成功， 将返回错误
  fn from_request(req: &http::Request) -> Result<Self, Self::Error>;
}
```

### Axum extract 中 FromRequest trait

> 可以从请求创建的类型。 实现 FromRequest 的提取器可以(consume)请求正文，因此只能为处理程序运行一次。  
> `注意` ： 如果您的 `提取器不需要(consume)请求正文` ，那么您应该 `实现 [FromRequestParts](https://zhida.zhihu.com/search?content_id=246248543&content_type=Article&match_order=1&q=FromRequestParts&zhida_source=entity) 而不是 FromRequest` 。 有关提取器的更多一般文档，请参阅 axum::extract。

```
pub trait FromRequest<S, M = ViaRequest>: Sized {
    // 如果提取器失败，它将使用这种“拒绝”类型。拒绝是一种可以转换为响应的错误。
    type Rejection: IntoResponse;

    // Required method
    fn from_request<'life0, 'async_trait>(
        req: Request<Body>,
        state: &'life0 S
    ) -> Pin<Box<dyn Future<Output = Result<Self, Self::Rejection>> + Send + 'async_trait>>
       where 'life0: 'async_trait,
             Self: 'async_trait;
}
```

PS： 从 axum 的 FromRequest 的源码中可以看出： 大致实现的和我们期望的实现类似

### 如果我们需要从 handler 通过 Query 中提取数据， 那么我们该如何处理 handler？？？

```
// user code
// user code
#[derive(Deserilize, Debug)]
struct Filter {
    keyword: String,
    count: u32,
}

// 这里我们通过 Query 这个提取器； 来提取出数据
async fn search(Query(f): Query<Filter>) -> (StatusCode, String) { ... }
```

> 注：提取器： 我们将可以从 Request 中提取出对应的类型的数据的结构体， 成为 `提取器`

**看看官方实现 Form 提取器 和 Query 提取器**

```
#[cfg_attr(docsrs, doc(cfg(feature = "query")))]
#[derive(Debug, Clone, Copy, Default)]
pub struct Query<T>(pub T);

#[async_trait]
impl<T, S> FromRequestParts<S> for Query<T>
where
    T: DeserializeOwned,
    S: Send + Sync,
{
    type Rejection = QueryRejection;

    /////////// \`这里是引用\`
    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        Self::try_from_uri(&parts.uri)
    }
}

#[cfg_attr(docsrs, doc(cfg(feature = "form")))]
#[derive(Debug, Clone, Copy, Default)]
#[must_use]
pub struct Form<T>(pub T);

// 这里出现了 泛型 S
#[async_trait]
impl<T, S> FromRequest<S> for Form<T>
where
    T: DeserializeOwned,
    S: Send + Sync,
{
    type Rejection = FormRejection;

    // 直接拿到 Request 的所有权
    async fn from_request(req: Request, _state: &S) -> Result<Self, Self::Rejection> {
        let is_get_or_head =
            req.method() == http::Method::GET || req.method() == http::Method::HEAD;

        match req.extract().await {
            Ok(RawForm(bytes)) => {
                let value =
                    serde_urlencoded::from_bytes(&bytes).map_err(|err| -> FormRejection {
                        if is_get_or_head {
                            FailedToDeserializeForm::from_err(err).into()
                        } else {
                            FailedToDeserializeFormBody::from_err(err).into()
                        }
                    })?;
                Ok(Form(value))
            }
            Err(RawFormRejection::BytesRejection(r)) => Err(FormRejection::BytesRejection(r)),
            Err(RawFormRejection::InvalidFormContentType(r)) => {
                Err(FormRejection::InvalidFormContentType(r))
            }
        }
    }
}
```

> 从上面两个提取器中可以看到 Form 和 Query 提取器的实现存在区别

- Form 提取器实现了 FromRequest
- Query 提取器实现了 FromRequestParts

**FromRequest vs FromRequestParts 两者的区别及提取器(Axum Extract)**

> 从这里看我们不得不讲解一下 Axum Extract 提取器的设计： `从请求中提取数据的类型和特征。`

1. 从上面我们知道 FormRequest 会 (consume) Request(请求正文)
- 从上面可以看到 FormRequest 的 from\_request 的参数是 Request； 全部 Request 正文
1. 如果您的提取器不需要访问请求正文(Request)，请实现 FromRequestParts：
- FromRequestParts 中的 from\_request\_parts 函数中只是 `Parts`

> 官方解释说： 由于 FromRequestParts 实现的提取器不需要访问 Request 正文， 那么该提取器在 handler 参数中将可以以任意的顺序运行, 从下面的例子可以看出

> Json 提取器是实现了 FromRequest， 而 State 是实现了 FromRequestParts， State 的提取器在 Json 的前面， Json 在参数的后面，否则会出现一个错误(从错误的信息中也可以看出区别)  
> 同时提取器可以访问其他的提取器， 因为 `提取器也是支持可变参数`

`注意： 自定义提取器不能两个同时实现 FromRequest vs FromRequestParts`

> 首先 Handler 接受的参数是 Extract(提取器)，而每一个提取器是一种实现 FromRequest 或 FromRequestParts 的类型。

那么 提取器解决了我们从 hyper http 协议 Request 正文中解析和反序列化出我们所需要的数据，但是我们还是需要手动取组装 Response 进行返回

### Axum 的 Response 的实现和约束

> 在 Axum 中有一个很重要的 trait 就是 `IntoResponse`: 实现了该 trait， 则可以将其转换为对应的 Response

```
// 该 trait 中只有一个方法就是 into_response
pub trait IntoResponse {
    fn into_response(self) -> http::Response;
}

// 其中 axum 内部的为我们实现了很多类型的转换： str，String， tuple 等
impl IntoResponse for &'static str {...}
impl IntoResponse for String {...}
impl IntoResponse for (StatusCode, String) {...}
```

可变长参数： 我们知道 Extract 和 Handler 都是支持多个参数(可变长不固定的参数个数)

```
// from axum 使用了 macro 宏来定义
macro_rules! all_the_tuples {
    ($name:ident) => {
        $name!([], T1);
        $name!([T1], T2);
        $name!([T1, T2], T3);
        $name!([T1, T2, T3], T4);
        $name!([T1, T2, T3, T4], T5);
        $name!([T1, T2, T3, T4, T5], T6);
        $name!([T1, T2, T3, T4, T5, T6], T7);
        $name!([T1, T2, T3, T4, T5, T6, T7], T8);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8], T9);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9], T10);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9, T10], T11);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11], T12);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12], T13);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13], T14);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14], T15);
        $name!([T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15], T16);
    };
}

// 大概宏展开之后就是下面这样
pub trait Handler {
    fn call(&self, req: http::Request) -> http::Response;
}

// illustrate for macro expand
impl<F, O> Handler for F
    where F: Fn() -> O, O: IntoResponse { ... }

// illustrate for macro expand result
impl<F, O, T1> Handler for F
    where F: Fn(T1) -> O, O: IntoResponse, T1: FromRequest {
    fn call(&self, req: http::Request) -> http::Response {
        let param1 = match T1::from_request(&req) {
            Ok(p) => p,
            Err(e) => return e.into(),
        };
        let resp = (self)(param1).into_response();
        resp
    }
}

// illustrate for macro expand： 多个参数的情况
impl<F, O, T1, T2> Handler for F
    where F: Fn(T1, T2) -> O, O: IntoResponse, T1: FromRequest, T1: FromRequest { ... }

// other impl blocks ...
```

### Request 的所有权的问题

> 所有的参数提取器中只能拿到 Request 的只读引用，因为我们可以需要提取多个参数， 如果只有一个参数， 那么可以传入所有权， 如果有多个， 那么这是最后一个给所有权

- FromRequestParts 可以从 HTTP Request Head 中提取内容 `（传递引用）`
- FromRequest 可以从 HTTP Request Head 和 Body 中提取 `（传递整个 Request 的所有权）` 。FromRequest 对于需要消费 Body 的提取器来说非常友好，但只会应用于最后一个提取器

### 支持 Async Fn

> 往往 handler 都是异步函数(数据库读写， rpc 调用等)，那么 handler 必须是一个 Async Fn(这里不展开讲解 Rust 的异步编程相关的知识)， 那么我们的 Handler 必须取实现 `Future`,

```
// 之前： handler
fn example() -> String { ... }

// 之后： 我们的 handler 必须是返回一个 Future
fn example() -> AnonymousFut { ... }

// 这两个 Future 得到的数据是 Response
struct AnonymousFut { ... }

// 这里就实现了 Future
impl Future for AnonymousFut {
    // 这里是 Response 的数据
    type Output = String;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> { ... }
}
```

为了实现上诉的 Handler， 那么我们需要做一些改动

```
pub trait Handler {
    fn call(&self, req: http::Request) -> BoxFuture<'static, http::Response>;
}
```

> BoxFuture 由 `[futures](https://zhida.zhihu.com/search?content_id=246248543&content_type=Article&match_order=1&q=futures&zhida_source=entity)` 包提供， 可以使用 `futures_util::future::BoxFuture`; 包提供，可以提供了 Future 关联类型的语法糖， 从而去掉关联类型的定义， 在内置的 Service 中间件中可以使用

```
pub type BoxFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;
```

从而上面的 Handler 的宏展开的例子就是如下：

```
// 我们都知道 宏 会在编译器时进行代码展开， 这里定义一个参数， F 实现 handler trait
// O 是 Response， T1 参数是 Request
impl<F, O, T1> Handler for F
    where F: Fn(T1) -> Fut, Fut: Future<Output = O>,
          O: IntoResponse, T1: FromRequest {

    fn call(&self, req: http::Request) -> BoxFuture<'static, http::Response> {
        Box::pin(async move {
            let param1 = match T1::from_request(&req) {
                Ok(p) => p,
                Err(e) => return e.into(),
            };
            let resp = (self)(param1).into_response();
            resp
        })
    }
}
```

> 总结： 如此设计之后， 用户可以在 Handler 中仅关注业务的实现，从而不需要关注一些公共的部分(在函数的参数和返回值上使用一些提取器和生成器)

## middleware(中间件)的设计 --- Tower Service

> 中间件的内部调用顺序（官方图）经典的洋葱模型

![](https://pic2.zhimg.com/v2-916bd3f2105c122d4360f1d7e7d42067_1440w.jpg)

中间件的内部调用顺序（官方图）经典的洋葱模型

- Req -> 从底部的 Layer 开始，也就是： 先进去的后调用； 栈的结构
- Res -> 队列的结构： 先进去的先调用

> 说到中间件，那么我们不得不提及 Tower， 该库为多数 http web框架提供了中间件 Service Trait 的支持， 它是一个 Rust 生态中通用的逻辑描述组件， 提供了一个 Service Trait 描述一个输入的 Request， 输出的 Result<Response， Error>， 只需要一个输入和输出对应， 那么基本上可以使用该描述逻辑，这个就是为啥 Tower 为各个 web 框架提供了中间件的支持

```
/ 在 tower 中的 Service
pub trait Service<Request> {
    type Response;
    type Error;
    type Future: Future<Output = Result<Self::Response, Self::Error>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>>;
    fn call(&mut self, req: Request) -> Self::Future;
}
```

> Service 不只能帮助不同组件之间的接口对齐，我们还可以利用 tower 的一些辅助组件来做逻辑的组合。Tower 提供了 Layer 用于对 Service 做修饰，还提供了 `Stack` 用于 `Layer` 之间的嵌套。

- Tower 中的 Layer 和 Stack
```
// 源码： tower-layer/stack.rs
/// Two middlewares chained together.
#[derive(Clone)]
pub struct Stack<Inner, Outer> {
    inner: Inner,
    outer: Outer,
}

impl<Inner, Outer> Stack<Inner, Outer> {
    /// Create a new \`Stack\`.
    pub fn new(inner: Inner, outer: Outer) -> Self {
        Stack { inner, outer }
    }
}

impl<S, Inner, Outer> Layer<S> for Stack<Inner, Outer>
where
    Inner: Layer<S>,
    Outer: Layer<Inner::Service>,
{
    type Service = Outer::Service;

    fn layer(&self, service: S) -> Self::Service {
        let inner = self.inner.layer(service);

        self.outer.layer(inner)
    }
}
```
- Service 描述了 async fn(Resquet) -> Result<Response, Error> 的通用的逻辑方式
- Layer 是 Service 的装饰器， 传入一个 Service 可以放回一个被修饰的 Service。
- Stack 是 Layer 的组合， 本身也是实现了Layer， 在调用.layer 时， 会依次调用内部的 layer， 顾一个 Service 内也可以存在多个 layer， 这里是使用的 `栈结构进行保存` ； 则调用顺序也是符合 Stack 的规则

由于我们的中间件是使用了 Service 中间件， 而 Route 本身是实现了 Service， 所以我们接受的 Layer 可以包装为 Route， 但是由于缺少 State

故： 对于当前还缺少 State 的 BoxedIntoRoute，我们先将 layer 暂存起来，等待填充 State 后再 layer 包装。(见下面的参考案例则是如此的设计)

### 那么如何实现一个自定义的中间件呢？？

### 方法 1. 使用实现 Tower Service trait， 参考下面案例(实现 jwt 验证的 auth 中间件)

```
#[derive(Debug, Clone)]
pub struct JwtAuthMiddleware {}

impl<S> Layer<S> for JwtAuthMiddleware {
    type Service = AuthMiddlewareService<S>;

    fn layer(&self, inner: S) -> Self::Service {
        AuthMiddlewareService { inner }
    }
}

#[derive(Debug, Clone)]
pub struct AuthMiddlewareService<S> {
    inner: S,
}

impl<T> Service<Request> for AuthMiddlewareService<T>
where
    T: Service<Request, Response = Response> + Send + 'static,
    T::Future: Send + 'static,
{
    // 中间件返回类型
    type Response = T::Response;

    // 错误类型
    type Error = T::Error;

    // 异步类型
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>> + Send>>;

    // type Future = T::Future;

    // 询问是否准备 ok
    fn poll_ready(
        &mut self,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        // 这里会调用 inner 中的 poll ready； 如果 inner 都ready 了； 那么就 ready， 会调用 下面的 call得到结果
        self.inner.poll_ready(cx)
    }

    // 调用异步
    fn call(&mut self, mut request: Request) -> Self::Future {
        let uri = request.uri();
        let is_white_path = NO_AUTH_PATHS_PREFIX
            .iter()
            .any(|v| uri.path().starts_with(v));
        // 白名单的 path 直接跳过 auth 中间件
        if is_white_path {
            return Box::pin(self.inner.call(request));
        }

        // 进行登录校验
        if jwt_token {
            if let Some(claims) = JwtClaims::decode(jwt) {
                request
                    .borrow_mut()
                    .extensions_mut()
                    .insert::<JwtClaims>(claims);
                return Box::pin(self.inner.call(request));
            }
            // self.context.
        }

        // 直接返回： 不进行下一步的 call request future， 提前返回 Response
        Box::pin(async { Ok(KeepResponse::<()>::auth_error().into_response()) })
        //  这里是向下传递 future
        // let payload = self.auth_jwt()
        // let fut = self.inner.call(request);
        // // 得到 future 的返回值，进行包装返回
        // Box::pin(async move {
        //     let response: Response = fut.await?;
        //     println!("res: {:?}", response);
        //     Ok(response)
        // })
    }
}
```

总结：

1. 创建一个自定义的中间件结构体： JwtAuthMiddleware
2. 该结构体必须实现 Layer， 因为我们需要使用 route.layer(JwtAuthMiddleware{})来添加 Layer 中间件, 那么我们的该中间件  
	必须实现 Layer trait
- 在 Layer 内部有一个 layer 方法， 该方法会返回 Layer 的关联类型(Service)
1. 我们需要创建我们自己的中间件 Service 来处理 Response 和 Request， 那么需要定义 AuthMiddlewareService 结构体， 该结构体需要接受 S(State) 的泛型，便于传递 State 的类型
2. Service 内部存在三个关联类型： Response(需要返回的 Response)， Error： 错误类型，Future： 向下传递的 Future
- poll\_ready 方法： 需要告诉异步运行时， 该 Service 是否已经 Ready，如果 Ready 则会调用 Call 方法继续向下传递
- call 方法： 拿到 Request 处理具体的逻辑，同时传递 Future

### 方法2： 使用: axum::middleware::from\_fn

> Axum 官方解释： 您不习惯实现自己的 future，而宁愿使用熟悉的 async/await 语法。 您不打算将您的中间件作为板条箱发布以供其他人使用。这样编写的中间件仅与 axum 兼容。

```
// 定义
pub fn from_fn<F, T>(f: F) -> FromFnLayer<F, (), T>
```

使用： 使用该方法比较简单， 类似 `洋葱模型` 使用 Next 函数向下传递

`请注意` ，该函数不支持提取 State。为此，请使用 `from_fn_with_state` 。

```
// 在中间件中不使用提取器： 提取数据
async fn my_middleware(
    request: Request,
    next: Next,
) -> Response {
    // do something with \`request\`...

    let response = next.run(request).await;

    // do something with \`response\`...

    response
}

// 使用提取器提取

async fn auth(
    // run the \`HeaderMap\` extractor
    headers: HeaderMap,
    // 您还可以在此处添加更多提取器，但最后一个提取器必须是实现了 \`FromRequest\`， 这里就是我们上面 Handler 提取器的规则了
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    match get_token(&headers) {
        Some(token) if token_is_valid(token) => {
            let response = next.run(request).await;
            Ok(response)
        }
        _ => {
            Err(StatusCode::UNAUTHORIZED)
        }
    }
}

fn get_token(headers: &HeaderMap) -> Option<&str> {
    // ...
}

fn token_is_valid(token: &str) -> bool {
    // ...
}

// main.rs
let app = Router::new()
    .route("/", get(|| async { /* ... */ }))
    .layer(middleware::from_fn(my_middleware));
```

### 方法3： 使用: axum::middleware::from\_extractor

不建议使用该方法， 感觉有些不伦不类， 这里直接贴官方的案例了； 不作过多的说明, 利用 `提取器来作为中间件`

```
pub fn from_extractor<E>() -> FromExtractorLayer<E, ()>
```

  

```
use axum::{
    extract::FromRequestParts,
    middleware::from_extractor,
    routing::{get, post},
    Router,
    http::{header, StatusCode, request::Parts},
};
use async_trait::async_trait;

// An extractor that performs authorization.
struct RequireAuth;

#[async_trait]
impl<S> FromRequestParts<S> for RequireAuth
where
    S: Send + Sync,
{
    type Rejection = StatusCode;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let auth_header = parts
            .headers
            .get(header::AUTHORIZATION)
            .and_then(|value| value.to_str().ok());

        match auth_header {
            Some(auth_header) if token_is_valid(auth_header) => {
                Ok(Self)
            }
            _ => Err(StatusCode::UNAUTHORIZED),
        }
    }
}

fn token_is_valid(token: &str) -> bool {
    // ...
}

async fn handler() {
}

async fn other_handler() {
}

let app = Router::new()
    .route("/", get(handler))
    .route("/foo", post(other_handler))
    // 提取器将在所有路线之前运行
    .route_layer(from_extractor::<RequireAuth>());
```

Axum 官方解释： 您有一种类型，有时想用作提取器，有时用作中间件。如果您只需要您的类型作为中间件，则更喜欢 middleware::from\_fn。

### 方法4： 使用 tower’s combinators: 不展开详解， 如果需要， 可以看看官方文档

> tower 有几个实用程序组合器，可用于对请求或响应执行简单的修改。最常用的是

- ServiceBuilder::map\_request
- ServiceBuilder::map\_response
- ServiceBuilder::then
- ServiceBuilder::and\_then

### 总结

1. 自定义中间件， 使用内置 Axum 的方法，或者是 Tower 的 Layer 和 Service 实现
2. Axum 中间件中可以访问 State， 处理 Cookie

## Response 响应

> 这里补充说明一下 Response 的规则； 上面我们知道，如果要将一个数据作为 Response 进行返回， 需要实现 `IntoResponse Trait`; 我们从源码中分析一下： Axum 的 Response 的规则

```
// axum-core/response.rs
pub type Response<T = Body> = http::Response<T>;
```

> 在 Axum 源码中定义了 Response， 实际上是 `http::Response`, 同时泛型 `T 默认是 axum::body::Body`, 从axum 的依赖上看， `http::Response` 来自 http1.0.0; 同时 Body 来自 http-body， http-body-util 为其 Body 进行扩展， 那么说明 axum 的Body 是通过 http-body 中的 Body trait 进行自定义的， 从而我们可以看看如何自定义我们自己的 Response Body

```
http = "1.0.0"
http-body = "1.0.0"
http-body-util = "0.1.0"
```

### 自定义 Response Body

> 我们看一下 Axum 是如何根据 http-body 自定义 Body 的

```
// 源码： axum-core/body.rs

// 定义了一个包装类型：
type BoxBody = http_body_util::combinators::UnsyncBoxBody<Bytes, Error>;

// 核心代码
/// axum 请求和响应中使用的主体类型。
#[derive(Debug)]
pub struct Body(BoxBody);

// 这里实际上是将 B 返回为 BoxBody
fn boxed<B>(body: B) -> BoxBody
where
    B: http_body::Body<Data = Bytes> + Send + 'static,
    B::Error: Into<BoxError>,
{
    try_downcast(body).unwrap_or_else(|body| body.map_err(Error::new).boxed_unsync())
}

// 尝试取转换
pub(crate) fn try_downcast<T, K>(k: K) -> Result<T, K>
where
    T: 'static,
    K: Send + 'static,
{
    let mut k = Some(k);
    if let Some(k) = <dyn std::any::Any>::downcast_mut::<Option<T>>(&mut k) {
        Ok(k.take().unwrap())
    } else {
        Err(k.unwrap())
    }
}

impl Body {
    /// 创建一个新的 \`Body\` 来包装另一个 [\`http_body::Body\`]。
    pub fn new<B>(body: B) -> Self
    where
        B: http_body::Body<Data = Bytes> + Send + 'static,
        B::Error: Into<BoxError>,
    {
      // 取将其 包装起来
        try_downcast(body).unwrap_or_else(|body| Self(boxed(body)))
    }

    /// 创建一个空的 body
    pub fn empty() -> Self {
        Self::new(http_body_util::Empty::new())
    }

    /// 从 [\`Stream\`] 创建一个新的 \`Body\`。
    ///
    /// [\`Stream\`]: https://docs.rs/futures-core/latest/futures_core/stream/trait.Stream.html
    pub fn from_stream<S>(stream: S) -> Self
    where
        S: TryStream + Send + 'static,
        S::Ok: Into<Bytes>,
        S::Error: Into<BoxError>,
    {
        Self::new(StreamBody {
            stream: SyncWrapper::new(stream),
        })
    }

    /// 将主体转换为数据帧的 [\`Stream\`]。
    ///
    /// 非数据帧（例如预告片）将被丢弃。使用 [\`http_body_util::BodyStream\`] 如果
    /// 你需要一个所有帧类型的 [\`Stream\`]。
    /// [\`http_body_util::BodyStream\`]: https://docs.rs/http-body-util/latest/http_body_util/struct.BodyStream.html
    pub fn into_data_stream(self) -> BodyDataStream {
        BodyDataStream { inner: self }
    }
}
```

> 从上面源码中看中看： 是从 Stream 中得到的 Body 数据流； 实际上我们不是特殊的数据需要进行数据流的订制的化， 一般不需要自定义 Body， 但是我们需要实现自定的 `Response Data`: 可以参考下面给的 `案例仓库` 中的 `response.rs` 文件

## 状态共享

> Handler 内部可能会需要一些外部量，比如初始化好的 db、或者用于缓存的 HashMap 等。我们一般会允许用户在创建 Route 的时候能够 attach 上某个 State（或者叫 Data），在 handler 函数参数中提取这个结构。

> 从上面的代码中可以看到 State 是 handler 函数中使用提取器获取的， 由于 State 不需要访问 Request 正文，那么从而 State 的提取器是实现了 `FormRequestParts` ， 上面 axum 源码中可以看出, 也许也会好奇， State 是如何绑定到 Request 上的， 在 Axum 或者是 Actix 状态的存储都是在 Request Extension 的 type map 中， 直接在其中写入数据，  
> 直接在 map 中写入数据， 会丢失静态类型检测，从而如果参数中的 State 和 Route 上的State 类型不匹配， 那么会将类型的错误抛到运行时

- `为了让 State 具备类型检测，在发生在编译期`

> axum 在 Handler， Route 和 FromRequest 上添加了泛型 `<S>`, 在 Router 上也添加了 `Router<S>` 来做相关的约束， 从上面的源码中可以看出

- axum 源码中泛型 S 贯穿整个代码中
```
pub trait Handler<S> {
    fn call(&self, req: http::Request, state: S) -> BoxFuture<'static, http::Response>;
}
pub trait FromRequest<S> {
    type Error;
    fn from_request(req: &http::Request, state: &S) -> Result<Self, Self::Error>;
}

pub struct Route<S> { ... }
impl<S> Route<S> {
    pub fn new(state: S) -> Self { ... }
    // we can only add Handler<S> to our self, not Handler<A> or Handler<B>
    pub fn route<H: Handler<S>>(self, hander: H) -> Self { ... }
}

// illustrate for macro expand result
impl<F, O, S, T1> Handler<S> for F
    where F: Fn(T1) -> Fut, Fut: Future<Output = O>,
          O: IntoResponse, T1: FromRequest {
    fn call(&self, req: http::Request, state: S) -> BoxFuture<'static, http::Response> {
        Box::pin(async move {
            let param1 = match T1::from_request(&req, &state) {
                Ok(p) => p,
                Err(e) => return e.into(),
            };
            let resp = (self)(param1).into_response();
            resp
        })
    }
}
```

## 路由抽象

### 路由查找： axum 使用了 matchit = "0.7"

> matchit 是一个第三方的库， 可以帮助我们匹配路由路径， 符合的 Path 对应的 Value 返回给我们。Matchit 基于 `radix trie` 实现，比起 HashMap 支持前缀匹配和参数提取（如 /user/:id）。

### axum 中关系如下

1. 当查找路径时，直接丢给 matchit Router 查到对应的 RouteId，之后使用 RouteId 查找到 Endpoint。
2. 当合并路由时，假设我们要将 B 合并到 A，我们会遍历 B 里的路由信息，得到所有的 (RouterId, Path, Endpoint) tuple，之后尝试合并到 A 中同 Path 上（对于 Path 相同 Method 不同的），如果不存在再另外创建新的。
```
1. RouteId → Endpoint
2. Node
  matchit Router<RouteId>: 用于路径匹配
  RouteId → Path
  Path → RouteId
```

在 axum 中 Handler 被表示为 EndPoint 类型, 源码如下：

![](https://pic2.zhimg.com/v2-4f78d36caf15283387ea61c1c6d90dc3_1440w.jpg)

(图片源自互联网）

1. `BoxedIntoRoute` 擦掉了 Handler 类型，所以我们在其泛型上找不到 Handler 相关的标记，或 Handler 的关联类型,其 State 是待填充的，我们可以将 BoxedIntoRoute 理解为一个没有附加 State 的 Route。当附加 State 后它会变成一个真正的 Route，就是名字里 Into Route 的含义。
2. `MethodRouter` 内包含不同 Method 对应的 MethodEndpoint。MethodEndpoint 可能对应 None（该方法上没设置），也可能是先前提到的 Route 或 BoxedIntoRoute。

### 路由组合

> 下面例子是从 axum 中的 example 中抄来的

首先.route("/keys", get(list\_keys)), 通过 get 将一个函数 Box 起来转为 `MethodRouter<S = (), E = Infallible>`, 之后通过 `route` 将其插入到 `Endpoint::MethodRouter`, 由于还没有附加 State, 所以其 `内部类型对应 BoxedIntoRoute，即缺少 State 的那个类型。`

之后看 `.with_state(Arc::clone(&shared_state))`

```
pub fn with_state<S2>(self, state: S) -> Router<S2, B> { ... }
```

这里会附加 S 类型的 state 并重写泛型为新的类型 S2（S2 此时没有任何约束）。 with\_state 内部会对所有 BoxedIntoRoute 附加 State 将其变为 Route 类型。

`注意：`.nest 会接收一个 `prefix 和子路由` 。这时只需要将 `子路由作为 NestedRouter 插入即可` 。需要注意的是这里在丢给子路由之前，还需要 `额外去掉 prefix` 。

## Axum Server 的创建和使用

> 路由、Handler 和 中间件组合到一起，就构成一个 Server，Server 允许用户 bind 并 serve MakeService：

```
axum::Server::bind(&addr)
      .serve(router.into_make_service())
      .await;
```
- `IntoMakeService<S>` 实现了 Service<T, Response = S, Error = Infallible>。

  

**欢迎点赞分享，搜索关注【鹅厂架构师】公众号，一起探索更多业界领先产品技术。**

发布于 2024-08-06 10:30・广东[HTTP](https://www.zhihu.com/topic/19588535)[Rust（编程语言）](https://www.zhihu.com/topic/19674381)[webserver](https://www.zhihu.com/topic/27380522)