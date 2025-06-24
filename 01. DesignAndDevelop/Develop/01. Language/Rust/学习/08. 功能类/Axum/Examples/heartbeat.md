---
create_time: 2025-06-16
Author: LincZero
---
# heartbeat

这部分是[我](https://github.com/LincZero)原创的，详见 github.com/NestNode/RustDemo

## 简单heartbeat

```rust
//! 主程序入口模块
//! 
//! 负责服务器配置和启动

use axum::{
    routing::{get},
    Router
};
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt}; // 日志订阅系统
mod api;

/// 主异步函数，使用tokio运行时
#[tokio::main]
async fn main() {
    api::test::test_fn();

    // 初始化日志追踪
    tracing_subscriber::registry()
        .with( // 过滤规则: 默认显示debug级别
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                format!("{}=debug,tower_http=debug", env!("CARGO_CRATE_NAME")).into()
            }),
        )
        .with(tracing_subscriber::fmt::layer()) // 输出格式
        .init(); // 初始化

    // axum
    let cors = CorsLayer::new()
        .allow_origin(Any) // 允许任意来源，开发阶段可用，生产建议指定域名
        .allow_methods(Any)
        .allow_headers(Any);
    let app = Router::new()
        .route("/", get(api::test::root))
        .merge(api::heartbeat::factory_utils_router())
        .merge(api::todos::factory_todos_router().await)
        .merge(api::rest::factory_rest_router().await)
        .layer(cors);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:24042") // 绑定TCP监听端口
        .await
        .unwrap();
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap(); // 启动HTTP服务器
}
```

api/heartbeat.rs

```rust
//! 用于心跳检测的API

use axum::{
    http::StatusCode,
    response::{IntoResponse, Json},
    routing::get,
    Router,
    Extension,
};

/// GET /heartbeat, 心脏检测
/// 
/// 可能有一些额外的服务器信息，如:
/// - 在线用户数
/// - 服务器时间
/// - 设备信息 (内存、CPU使用率等)
/// - 等
pub async fn get_heartbeat(
) -> impl IntoResponse {
    tracing::debug!("GET /heartbeat");

    let resp = json!({
        "status": "alive",
    });

    (cookies, (StatusCode::OK, Json(resp)))
}
```

## 时间状态

```rust
let resp = json!({
    "status": "alive",
    "timestamp": chrono::Local::now().to_rfc3339(), // 本地时间 [!code ++:3]
        // chrono::Utc::now().to_rfc3339(), // 零区
        // chrono::FixedOffset::east_opt(8 * 3600).unwrap(), // 东八区
});
```

## 用户数统计



