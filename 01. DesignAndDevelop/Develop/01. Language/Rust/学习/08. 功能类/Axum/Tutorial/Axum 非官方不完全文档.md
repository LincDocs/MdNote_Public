---
create_time: 2025-06-15
Author: https://github.com/i-xiao-zi/rustdocs
---
# 简单教学文档

转自： [Axum 非官方不完全文档](https://rust.wjjss.com/axum/) [对应github repo](https://github.com/i-xiao-zi/rustdocs)

## 简介

### 文档说明

关于本文档 —— _`Axum`非官方不完全文档_

- 本文档非官方文档，是由本人根据 [`Axum 官方文档`](https://docs.rs/axum/latest/axum/) 加上自己的理解编写而成的，不保证正确性。
- 本文档是在本人学习 `Axum` 过程中，发现缺少中文资料，甚至很多网上查找的资料中的内容是不正确的， 故此，我将自己学习 `Axum` 的过程记录下来，以供参考。
- 因 [`Axum 官方框架`](https://github.com/tokio-rs/axum/)更新频繁，本人学习过程中的用法，在后续的过程中可能会有所改变，不保证本文档更新及时。
- 在学习、开发、使用过程中，如果您发现错误、改进或建议，不欢迎提交错误，不会有任何改进，同样也请保留您的宝贵建议。

### 什么是`Axum`？

`axum`，一个注重**易用性和模块化**的Web应用程序框架

### 高级功能

- 使用无宏(`macro-free`) API 将请求路由到处理程序
- 使用提取器(`extractors`)以声明方式解析请求
- 简单且可预测的错误处理模型
- 使用最少的样板生成响应
- 充分利用 `Tower` 和 `tower-http` 生态系统的中间件(`middleware`)、服务(`services`)和工具(`utilities`)

> 特别是最后一点，是与其他框架的不同之处。没有自己的中间件系统，而是使用`tower::Service`。
> 
> 这意味着能免费获取超时、跟踪、压缩、授权等中间件。它还使您能够与使用`Hyper`或`Tonic`编写的应用程序共用中间件。

## 快速开始

说明

- 先来一段最基础的代码
- 同样，必须是`hello world`

### 1. 安装 rust

> 都会安装吧？这里就不做过多介绍了。
> 
> [Rust官网](https://www.rust-lang.org/)

### 2. 创建项目

```sh
cargo new example # 创建项目
cargo add axum # 安装框架
cargo add tokio -F full # 添加依赖
```

此时，项目结构：

```bash
example/ (root component)
├─ src/
│  └─ main.rs
└─ Cargo.toml
```

此时，Cargo.toml文件的内容

```toml
[package]
name = "example"
version = "0.1.0"
edition = "2021"

[dependencies]
axum = "0.7.4"
tokio = { version = "1.35.1", features = ["full"] }
```

### 3. 添加代码(src/main.rs)

```rust
use axum::{Router, routing::get};
use tokio::net::TcpListener;

async fn root() -> &'static str {
    "Hello, World!"
}

#[tokio::main] // tokio的main运行时
async fn main() {
    let app = Router::new().route("/", get(root));
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

### 4. 运行项目

```sh
cargo run
```

> 不管怎么说，项目跑起来了

## **提前总结 - 捋一下全部概念**

```rust
Router::new()          // 🟡 路由 (`Router`)
    .route(            // 该方法接受两个参数
        "/get/:id",    // `path` 路由路径. 支持 静态/捕获/通配符
        get(           // `method_router` 路由方法. 支持 get/post/put/patch等
            get_method // 🟡 处理器 (`handler`)，详细见下面
        )
    )

// 🟡 处理器 (`handler`)
// 其中前面的路由方法接受一个处理器，这里的 get_method 就是处理器
// 而这个处理器的参数不像一般函数那样是固定参数的，其可以使用参数提取器提取参数
async fn get_method(
  Path(user_id): Path<u32> // 🟡 提取器 (`extractors`)
) {}
```

## 路由 (`Router`)

### 什么是路由？

- 什么是路由？是用于设置由哪些路径转到哪些服务的。
- `Auxum`的`Router`是一个用于组合处理程序和服务的结构体：

```rust
pub struct Router<S = ()> { /* private fields */ }
```

### 路由规则

```rust
use axum::{Router, routing::get, routing::post};

Router::new()
    .route("/get", get(get_method))
    .route("/post", post(post_method))
    .route("/getpost", get(get_method).post(post_method));

async fn get_method() {}
async fn post_method() {}
```

#### 通过Router::new()创建一个Router实例

```rust
pub fn new() -> Self
```

#### 通过route()方法添加路由

```rust
/**
args

- `path` 路由路径
- `method_router` 路由方法
 */
pub fn route(self， path： &str， method_router： MethodRouter<S>) -> Self
```

> ##### arg1 `path` 路由路径

用 `/` 分割多个部分，每个部分可以是以下三种：

- 静态 (`static`): 
  传入请求需要与路径完全匹配，如：
  - `/`：匹配 `/`
  - `/user`: 匹配 `/user`, 不匹配 `/user/`
  - `/user/`: 匹配 `/user/`, 不匹配 `/user`
  - `/user/123`: 不匹配 `/user/123/`
  
- 捕获 (`capture`, `:xxx`): 
  路径可以包含与任何单个段匹配的段，并将其捕获，捕获的值可以是0长度，如：
  - `/:key`: 匹配 `/a`,不匹配 `/a/`
  - `/user/:id`: 匹配 `/user/`, `/user/abc`, 不匹配 `/user`,`/user/abc/`
  - `/user/:id/tweets`: 匹配 `/user//tweets`,` /user/abc/tweets`, 不匹配`/user/tweets/`,`/user/abc/tweets/`
  无法仅匹配类型（如数字或正则表达式），您必须在处理程序中手动解析它。
  
- 通配符 (`wildcard`, `*`): 
  可以以匹配所有段的路径结束，并将存储这些段，这与空段不匹配,如，  
  - `/*key`: 匹配 `/a`,`/a/`, 不匹配 `/`
  - `/user/*key`: 匹配 `/user/a`，`/user/a/`，`/user/a/tweets`，不匹配 `/user`，`/user/`
  - `/:id/:repo/*tree`: 你猜？

> ##### arg2 `method_router` 路由方法

```rust
pub struct MethodRouter<S = (), E = Infallible> {
    get: MethodEndpoint<S, E>,
    head: MethodEndpoint<S, E>,
    delete: MethodEndpoint<S, E>,
    options: MethodEndpoint<S, E>,
    patch: MethodEndpoint<S, E>,
    post: MethodEndpoint<S, E>,
    put: MethodEndpoint<S, E>,
    trace: MethodEndpoint<S, E>,

    fallback: Fallback<S, E>,
    allow_header: AllowHeader,
}
```

`axum` 的 `route` 可以匹配以上多种方法

- 可以是一条`route`匹配一个方法，如，
    ```rust
    Router::new()
        .route("/", get(get_method))
        .route("/", post(post_method))
        .route("/", delete(delete_method));
    ```
    
- 也可以是一条`route`匹配多个方法，如，
    ```rust
    Router::new()
        .route("/", get(get_method).post(post_method).delete(delete_method));
    ```

> ##### 异常与优先级

- 如果一条 `route` 与另一条 `route` 重叠，则会发生异常。
- **静态路由（`static`）优先级大于动态路由（`capture`, `wildcard`）**，他们不视为重叠
- 如果为空，也会触发异常，如：
    ```rust
    Router::new()
        .route("", get(|| async {}))                                                // 异常，空
        .route("/", get(|| async {})).route("/", post(|| async {}))                 // 正常
        .route("/abc", get(|| async {})).route("/:id", get(|| async {}))            // 正常，/abc 匹配前者
        .route("/def", get(|| async {})).route("/*path", get(|| async {}))          // 正常, /def 匹配前者
        .route("/ghi/*path", get(|| async {})).route("/ghi/:id", get(|| async {})); // 异常，重叠
    ```

### 路由参数提取 (`Path` 类型提取)

对于动态路由（`capture`,`wildcard`）路由参数，可以使用 `Path` 类型提取，如，

```rust
Router::new()
    .route("/", get(|| async {}))
    .route("/first", get(first))
    .route("/:second", get(second))
    .route("/:name/:id", get(three))
    .route("/*four", get(four);

async fn first() -> &'static str {
    "Hello, World!"
}
async fn second(Path(second): Path<String>) -> String{
    String::from(second)
}
async fn three(Path((name, id)): Path<(String, String)>) -> String{
    String::from(name).add(&id)
}
async fn four(Path(four): Path<String>) -> String{
    String::from(four)
}
```

更多信息请参考[处理器](https://rust.wjjss.com/axum/basic/handler.html)。

## 处理器 (`handler`) 与 提取器 (`extractors`)

### 处理器 (`handler`) 

可用于处理请求的异步函数

- 在 axum 中，`handler` 是一个*异步函数*
- 它接受零个或多个提取器 (`extractors`) 作为参数，并返回 可以转换为响应
- 处理程序是应用程序逻辑所在的位置，也是构建 axum 应用程序的地方 通过在处理程序之间路由

### 参数提取器 (`extractors`)

处理程序函数是一个异步函数，它接受任意数量的 “提取器(`extractors`)”作为参数。
提取器是实现 `FromRequest` 或 `FromRequestParts` 的类型。

#### 常见的提取器 (8种)

常见的提取器有：

- Path      | 提取*动态路由中的参数*
- Query     | 提取*请求中的参数*
- HeaderMap | 提取*请求头*
- String    | 提取*请求体的字符串*，并确保其为有效的 UTF-8 编码
- Bytes     | 提取*请求体中原始的请求体*
- Json      | 提取*请求体中的 JSON*
- Request   | 提取*整个请求*，它包含了完整的请求信息，以便进行最大的控制
- Extension | 提取*请求的扩展*，它用于从请求的扩展中提取数据。通常用于与处理器共享状态

实战demo:

```rust
use axum::{
    extract::{Request, Json, Path, Extension, Query},
    routing::post,
    http::header::HeaderMap,
    body::{Bytes, Body},
    Router,
};
use serde_json::Value;
use std::collections::HashMap;

async fn path(Path(user_id): Path<u32>) {}
async fn query(Query(params): Query<HashMap<String, String>>) {}
async fn headers(headers: HeaderMap) {}
async fn string(body: String) {}
async fn bytes(body: Bytes) {}
async fn json(Json(payload): Json<Value>) {}
async fn request(request: Request) {}
async fn extension(Extension(state): Extension<State>) {}

#[derive(Clone)]
struct State { /* ... */ }

let app = Router::new()
    .route("/path/:user_id", post(path))
    .route("/query", post(query))
    .route("/string", post(string))
    .route("/bytes", post(bytes))
    .route("/json", post(json))
    .route("/request", post(request))
    .route("/extension", post(extension));
```

#### 应用多个提取器，顺序问题

可以应用多个提取器，这些提取器始终按照函数参数的顺序 `从左到右` 依次运行。
请求正文是一个异步流，只能使用一次。
因此，您只能有一个提取器来使用请求正文，并且它必须是最后一个提取器。

```rust
async fn handler(
    method: Method,
    headers: HeaderMap,
    State(state): State<AppState>,
    body: String,
) {
    // ...
}
```

如上，`method`，`headers`，`state`, `body` 必须按照它们在参数列表中放置的位置 `从左到右` 依次运行。 `method`，`headers`，`state` 不需要使用请求主体，因此它们可以放在参数列表的`左`端，放置顺序可以随意，但必须在`body`之前。

以下均是错误的写法：

```rust
async fn handler(
    body: String, // 异常，`body`不是最后一个提取器 [!code error]
    method: Method,
) {
    // ...
}
```

```rust
#[derive(Deserialize)]
struct Payload {}

async fn handler(
    string_body: String,
    bytes_body: Json<Payload>, // 异常，多次使用请求正文。string_body和bytes_body互斥 [!code error]
) {
    // ...
}
```

#### 可选提取器

如果请求不匹配，`axum`中定义的所有提取器都将拒绝该请求。 如果您希望将提取器设置为可选，您可以将其包装在：`Option`

```rust
use axum::{
    extract::Json,
    routing::post,
    Router,
};
use serde_json::Value;

async fn create_user(
    payload: Option<Json<Value>> // 允许请求body可选json
) {
    if let Some(payload) = payload {
        // ...
    } else {
        // ...
    }
}

let app = Router::new().route("/users", post(create_user));
```

也可以将提取器用`Result`包装起来使它们成为可选的，并为您提供不匹配的原因：

```rust
use axum::{
    extract::{Json, rejection::JsonRejection},
    routing::post,
    Router,
};
use serde_json::Value;

async fn create_user(
    payload: Result<Json<Value>, JsonRejection> // Result的方式声明可选
) {
    match payload {
        Ok(payload) => {
            // 提取成功
        }
        Err(JsonRejection::MissingJsonContentType(_)) => {
            // 请求头中没有 `Content-Type: application/json`
        }
        Err(JsonRejection::JsonDataError(_)) => {
            // 不能将请求体解析为目标类型
        }
        Err(JsonRejection::JsonSyntaxError(_)) => {
            // 请求体中存在语法错误
        }
        Err(JsonRejection::BytesRejection(_)) => {
            //提取失败
        }
        Err(_) => {
            // 这段代码表明JsonRejection是一个被标记为#[non_exhaustive]的枚举，
            // 因此在处理JsonRejection时必须有一个万能的情况来匹配所有可能的值
        }
    }
}

let app = Router::new().route("/users", post(create_user));
```

#### 自定义提取器

- 实现 `FromRequestParts`    
- 实现 `FromRequest`

### 更多提取器

Author: LincZero

> #### cookie

通过 `axum_extra::extract::CookieJar` 提取器（需要加 `axum-extra` 依赖）

```rust
// use axum_extra::extract::CookieJar;
use axum::extract::CookieJar;

async fn cookies(jar: CookieJar) {
  if let Some(session_id) = jar.get("session_id") {
      // 获取到了 session_id
  }
}
```

> #### 客户端IP

通过 `axum::extract::ConnectInfo` 提取器（需要在 server 里设置 `with_state` 和 `with_connect_info`）

注意：如果服务器后面有代理（如 nginx），需要信任和解析 X-Forwarded-For 头部，不能直接用 ConnectInfo

```rust
use axum::extract::ConnectInfo;
use std::net::SocketAddr;

async fn client_ip(ConnectInfo(addr): ConnectInfo<SocketAddr>) {
    println!("Client IP: {}", addr);
}
```

> #### 获取 Header（比如Session相关信息）

- 你已经写了 headers(headers: HeaderMap)，可以手动从 header 里取 cookie 或自定义 session 头

> #### FAQ

同一个页面/同一客户端IP多次访问时，这些信息是否不变？

- Cookie/SessionID：  
    如果同一浏览器页面没有清除或阻止 Cookie，每次请求都会带上相同 Cookie（包括 session_id），**但前提是服务端和客户端都支持和使用 Cookie**。
- 客户端 IP：  
    理论上同一个客户端公网 IP 是不变的，但实际中用户可能有 NAT、代理、VPN、移动网络等，**同一用户的 IP 可能发生变化**，也可能多个用户共享同一个出口 IP。
- SessionID（无论是你生成的还是由 Cookie 管理）：  
    只要客户端 Cookie 不变，SessionID 就不会变。但如果用户打开隐私模式、清除 Cookie 或用不同浏览器标签页、不同设备访问，SessionID 就会变。

用这些信息统计“当前用户人数”靠谱吗？

- 仅用 IP
    误差很大，不能精准统计用户，比如同一个局域网下的所有人共享 IP，或者同一人换网络后 IP 变了。
- 仅用 Cookie/SessionID
    比较可靠，但用户清 Cookie、换设备、隐身窗口都会导致 session 变动。
- 最佳实践
    - 用 Cookie 生成的 session_id 作为用户唯一标识，结合 IP 作为辅助参考。
    - 可以实现简单的“在线用户/活跃会话数”统计，但不能做到 100% 精确的人头统计。

| 信息     | 是否适合统计用户 | 原因                                  |
| ------ | -------- | ----------------------------------- |
| 会话 ID  | ✅ 是      | 通过 Cookie 持久化，同一用户标识稳定              |
| Cookie | ⚠️ 间接使用  | 需配合会话 ID 逻辑                         |
| 客户端 IP | ❌ 否      | 动态 IP、共享 IP（如公司 NAT）导致不准确           |
| 浏览器指纹  | ❌ 不建议    | 需要复杂计算（如 User-Agent + IP），仍有误差且隐私敏感 |

推荐实践：

1. 使用 `CookieJar` 管理会话 ID。
2. 服务端存储活跃会话及时间戳。
3. 定时清理过期会话。
4. **活跃用户数 = 内存中未过期的会话 ID 数量**。

## 中间件 (`middleware`)

- `Axum`没有自己的定制中间件系统，而是与[`Tower`](https://crates.io/crates/tower)集成
- 这意味着[`tower`](https://crates.io/crates/tower) 和 [`tower-http`](https://crates.io/crates/tower-http) 中间件的生态系统都可以与 `axum` 一起使用
- 虽然没有必要完全理解 `Tower` 来编写或使用中间件 对于 `Axum`，但是还是推荐至少对 `Tower` 的概念有一个基本的了解
- 有关一般介绍，请参阅 `Tower` 的文档 `tower::ServiceBuilder`

### 安装依赖

### 使用中间件

## 模板

### 响应 `Html` 字符串

通过返回`Html`结构体，会自动给给响应添加`Content-Type: text/html`请求头

```rust
use axum::response::Html;

async fn html() -> Html<&'static str> {
    Html("<p>Hello, World!</p>")
}
let app = Router::new()
    .route("/", get(html));
```

### 与 `askama` 集成

#### 安装依赖

```sh
cargo add askama -F "with-axum"
cargo add askama_axum
```

#### 添加模版

- 在项目根目录下创建 `templates` 目录

- 在 `templates` 目录下创建 `index.html` 文件

- 在 `index.html` 文件中添加模版代码
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Hello {{name}}!</h1>
    </body>
    </html>
    ```

- 在`src/main.rs`编写代码
    ```rust
    use axum::Router;
    use axum::routing::get;
    use axum::extract::Path;
    use tokio::net::TcpListener;
    use askama::Template;
    
    #[derive(Template)]
    #[template(path ="index.html")]
    struct HelloTemplate {
      name: String,
    }
    async fn root(Path(name): Path<String>) -> HelloTemplate {
      HelloTemplate { name }
    }
    #[tokio::main]
    async fn main() {
      let app = Router::new().route("/:name", get(root));
      let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
      axum::serve(listener, app).await.unwrap();
    }
    ```
    
- 打开浏览器，输入 `http://localhost:3000/world` 看看有什么神奇的事情发生吧！












