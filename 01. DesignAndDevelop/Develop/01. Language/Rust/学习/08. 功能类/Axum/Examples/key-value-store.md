# key-value-store (键值存储)

https://github.com/tokio-rs/axum/blob/main/examples/key-value-store/src/main.rs

Cargo.toml

```toml
[package]
name = "example-key-value-store"
version = "0.1.0"
edition = "2021"
publish = false

[dependencies]
axum = { path = "../../axum" }
tokio = { version = "1.0", features = ["full"] }
tower = { version = "0.5.2", features = ["util", "timeout", "load-shed", "limit"] }
tower-http = { version = "0.6.1", features = [
    "add-extension",
    "auth",
    "compression-full",
    "limit",
    "trace",
] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
```

src/main.rs

```rust
//! 简单的内存键值存储示例，展示 axum 框架的各种功能

use axum::{
    body::Bytes,                       // 用于处理原始字节数据
    error_handling::HandleErrorLayer,  // 错误处理层
    extract::{DefaultBodyLimit, Path, State},  // 提取器：路径参数、状态管理
    handler::Handler,       // 处理器 trait
    http::StatusCode,       // HTTP 状态码
    response::IntoResponse, // 响应转换
    routing::{delete, get}, // 路由方法
    Router,                 // 路由器
};
use std::{
    borrow::Cow,            // 写时克隆智能指针
    collections::HashMap,   // 哈希映射
    sync::{Arc, RwLock},    // 线程安全共享指针和读写锁
    time::Duration,         // 时间间隔
};
use tower::{BoxError, ServiceBuilder};  // 中间件工具
use tower_http::{                  // HTTP 专用中间件
    compression::CompressionLayer, // 响应压缩
    limit::RequestBodyLimitLayer,  // 请求体大小限制
    trace::TraceLayer,             // 请求追踪
    validate_request::ValidateRequestHeaderLayer,  // 请求头验证
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};  // 日志记录

#[tokio::main]  // 启用Tokio运行时
async fn main() {
    // 初始化日志记录系统
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| {
                    // 设置默认日志级别：当前crate=debug, tower_http=debug
                    format!("{}=debug,tower_http=debug", env!("CARGO_CRATE_NAME")).into()
                }),
        )
        .with(tracing_subscriber::fmt::layer())  // 使用标准格式输出
        .init();

    // 创建线程安全的共享状态
    let shared_state = SharedState::default();

    // 构建应用路由
    let app = Router::new()
        // 定义 /{key} 路由 (GET 和 POST)
        .route(
            "/{key}",
            // GET 请求：获取键值，添加响应压缩中间件
            get(kv_get.layer(CompressionLayer::new()))
                // POST 请求：设置键值，添加特殊中间件
                .post_service(
                    kv_set
                        .layer((
                            // 禁用默认请求体大小限制
                            DefaultBodyLimit::disable(),
                            // 设置自定义请求体大小限制（约5MB）
                            RequestBodyLimitLayer::new(1024 * 5_000),
                        ))
                        .with_state(Arc::clone(&shared_state)),  // 显式传递状态
        )
        // 定义 /keys 路由 (GET)：列出所有键
        .route("/keys", get(list_keys))
        // 嵌套管理路由到 /admin 路径下
        .nest("/admin", admin_routes())
        // 全局中间件（应用于所有路由）
        .layer(
            ServiceBuilder::new()
                // 错误处理中间件
                .layer(HandleErrorLayer::new(handle_error))
                // 负载脱落：当服务过载时拒绝新请求
                .load_shed()
                // 并发限制：最多同时处理1024个请求
                .concurrency_limit(1024)
                // 请求超时：10秒
                .timeout(Duration::from_secs(10))
                // HTTP 请求追踪
                .layer(TraceLayer::new_for_http()),
        )
        // 为整个路由树设置共享状态
        .with_state(Arc::clone(&shared_state));

    // 启动服务器
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    tracing::debug!("服务器监听地址: {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

// 类型别名：线程安全的共享状态
type SharedState = Arc<RwLock<AppState>>;

// 应用状态结构
#[derive(Default)]
struct AppState {
    db: HashMap<String, Bytes>,  // 内存数据库：字符串键 -> 字节值
}

/// GET /{key} 处理函数：获取键对应的值
async fn kv_get(
    Path(key): Path<String>,         // 从URL路径提取键名
    State(state): State<SharedState>, // 获取应用状态
) -> Result<Bytes, StatusCode> {     // 返回结果或错误码
    let db = &state.read().unwrap().db;  // 获取读锁
    
    db.get(&key)
        .map(Clone::clone)  // 克隆值（避免持有锁）
        .ok_or(StatusCode::NOT_FOUND)  // 未找到返回404
}

/// POST /{key} 处理函数：设置键值对
async fn kv_set(
    Path(key): Path<String>,          // 从URL路径提取键名
    State(state): State<SharedState>, // 获取应用状态
    bytes: Bytes,                     // 获取请求体原始字节
) {
    state.write().unwrap().db.insert(key, bytes);  // 获取写锁并插入数据
}

/// GET /keys 处理函数：列出所有键
async fn list_keys(State(state): State<SharedState>) -> String {
    let db = &state.read().unwrap().db;  // 获取读锁
    
    // 收集所有键并用换行符连接
    db.keys()
        .map(|k| k.to_string())
        .collect::<Vec<_>>()
        .join("\n")
}

/// 创建管理路由组（位于 /admin 下）
fn admin_routes() -> Router<SharedState> {
    /// DELETE /admin/keys 处理函数：删除所有键
    async fn delete_all_keys(State(state): State<SharedState>) {
        state.write().unwrap().db.clear();  // 清空数据库
    }

    /// DELETE /admin/key/{key} 处理函数：删除指定键
    async fn remove_key(Path(key): Path<String>, State(state): State<SharedState>) {
        state.write().unwrap().db.remove(&key);  // 删除指定键
    }

    Router::new()
        // 注册删除所有键的路由
        .route("/keys", delete(delete_all_keys))
        // 注册删除指定键的路由
        .route("/key/{key}", delete(remove_key))
        // 添加认证中间件：需要Bearer token "secret-token"
        .layer(ValidateRequestHeaderLayer::bearer("secret-token"))
}

/// 全局错误处理函数
async fn handle_error(error: BoxError) -> impl IntoResponse {
    // 处理超时错误
    if error.is::<tower::timeout::error::Elapsed>() {
        return (StatusCode::REQUEST_TIMEOUT, "请求超时");
    }
    
    // 处理服务过载错误
    if error.is::<tower::load_shed::error::Overloaded>() {
        return (
            StatusCode::SERVICE_UNAVAILABLE,
            "服务过载，请稍后重试",
        );
    }

    // 处理其他未捕获错误
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        format!("未处理的内部错误: {error}"),
    )
}
```



