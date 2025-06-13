# hello-World (你好世界)

https://github.com/tokio-rs/axum/blob/main/examples/hello-world/Cargo.toml

Cargo.toml

```toml
[package]
name = "example-hello-world"
version = "0.1.0"
edition = "2021"
publish = false

[dependencies]
axum = { path = "../../axum" } # 这里是因为他这里是monorepo，所以是相对路径
tokio = { version = "1.0", features = ["full"] }
```

src/main.rs

```rust
//! Run with
//!
//! ```not_rust
//! cargo run -p example-hello-world
//! ```

use axum::{response::Html, routing::get, Router};

#[tokio::main]
async fn main() {
    // 使用路由构建我们的应用程序
    let app = Router::new().route("/", get(handler));

    // run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<&'static str> {
    Html("<h1>Hello, World!</h1>")
}
```
