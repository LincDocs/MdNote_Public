# Auxm Github README

`axum`是一个注重人体工程学和模块化的Web应用程序框架。

有关此Crate的更多信息，请参阅 [此Crate的文档](https://docs.rs/axum)。

## 高级功能

- 使用无宏 API 将请求路由到处理程序。
- 使用提取器以声明方式解析请求。
- 简单且可预测的错误处理模型。
- 使用最少的样板生成响应。
- 充分利用中间件、服务和实用程序的生态系统[`tower`](https://crates.io/crates/tower)。[`tower-http`](https://crates.io/crates/tower-http)

尤其是最后一点，正是它`axum`与其他框架的不同之处。 `axum`它没有自己的中间件系统，而是使用 [`tower::Service`](https://docs.rs/tower/latest/tower/trait.Service.html)。这意味着可以免费获得超时、跟踪、压缩、授权等功能。它还允许您与使用或`axum`编写的应用程序共享中间件。[`hyper`](https://crates.io/crates/hyper)[`tonic`](https://crates.io/crates/tonic)

## ⚠ 重大变更 ⚠

我们目前正在开发 axum 0.9 版本，因此该 `main` 分支包含重大变更。查看该 [`0.8.x`](https://github.com/tokio-rs/axum/tree/v0.8.x) 分支，了解已发布到 crates.io 的内容。

## 使用示例

```rust
use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // `POST /users` goes to `create_user`
        .route("/users", post(create_user));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}

async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<User>) {
    // insert your application logic here
    let user = User {
        id: 1337,
        username: payload.username,
    };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize)]
struct User {
    id: u64,
    username: String,
}
```

[您可以在示例目录](https://github.com/tokio-rs/axum/tree/main/examples)中找到此[示例](https://github.com/tokio-rs/axum/tree/main/examples/readme)以及其他示例项目。

请参阅[板条箱文档](https://docs.rs/axum)以获取更多示例。

## 性能

`axum` 是 [`hyper`](https://crates.io/crates/hyper) 之上相对较薄的一层，几乎不增加任何开销。因此`axum`的性能与 [`hyper`](https://crates.io/crates/hyper) 相当。您可以[在这里](https://github.com/programatik29/rust-web-benchmarks)和 [这里](https://web-frameworks-benchmark.netlify.app/result?l=rust)找到基准测试。

## 安全

该板条箱用于 `#![forbid(unsafe_code)]` 确保一切都以 100% 安全的 Rust 实现。

## 支持的最低 Rust 版本

Auxm 的 MSRV 为 1.75。

## 示例

[示例文件](https://github.com/tokio-rs/axum/tree/main/examples)夹包含各种使用示例`axum`。 [文档](https://docs.rs/axum)也提供了大量代码片段和示例。如需完整的示例，请查看社区维护的[案例](https://github.com/tokio-rs/axum/blob/main/ECOSYSTEM.md#project-showcase)或[教程](https://github.com/tokio-rs/axum/blob/main/ECOSYSTEM.md#tutorials)。

## 获取帮助

在 `axum` 的仓库中，我们还有很多 [示例](https://github.com/tokio-rs/axum/tree/main/examples) 展示了如何将所有内容整合在一起。社区维护的[样例](https://github.com/tokio-rs/axum/blob/main/ECOSYSTEM.md#project-showcase)和[教程](https://github.com/tokio-rs/axum/blob/main/ECOSYSTEM.md#tutorials)也演示了如何 `axum` 在实际应用中使用。也欢迎您在[Discord 频道](https://discord.gg/tokio)提问或开启[讨论](https://github.com/tokio-rs/axum/discussions/new?category=q-a)。

## 社区项目

请参阅[此处](https://github.com/tokio-rs/axum/blob/main/ECOSYSTEM.md)，查看由 构建的社区维护的板条箱和项目的列表`axum`。

## 贡献

🎈 感谢您对项目的改进！我们非常高兴您能加入我们！我们准备了一份[贡献指南](https://github.com/tokio-rs/axum/blob/main/CONTRIBUTING.md)，帮助您参与到 `axum`项目中。

## 许可

该项目已获得[MIT 许可](https://github.com/tokio-rs/axum/blob/main/axum/LICENSE)。

### 贡献

`axum` 除非您明确声明，否则您有意提交的任何贡献均应获得 MIT 许可，无需任何附加条款或条件。

