# todos (待办事项)

Cargo.toml

```toml
[package]
name = "example-todos"
version = "0.1.0"
edition = "2021"
publish = false

[dependencies]
axum = { path = "../../axum" }
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.0", features = ["full"] }
tower = { version = "0.5.2", features = ["util", "timeout"] }
tower-http = { version = "0.6.1", features = ["add-extension", "trace"] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
uuid = { version = "1.0", features = ["serde", "v4"] }
```

src/main.rs

```rust
//! 提供一个管理待办事项(Todos)的RESTful Web服务器。
//!
//! API接口设计：
//!
//! - `GET /todos`: 返回所有待办事项的JSON列表
//! - `POST /todos`: 创建新的待办事项
//! - `PATCH /todos/{id}`: 更新指定ID的待办事项
//! - `DELETE /todos/{id}`: 删除指定ID的待办事项
//!
//! 运行命令：
//!
//! ```sh
//! cargo run -p example-todos
//! ```

// 引入所需的库和模块
use axum::{
    error_handling::HandleErrorLayer,  // 错误处理中间件
    extract::{Path, Query, State},     // 请求提取器（路径参数、查询参数、状态）
    http::StatusCode,                  // HTTP状态码
    response::IntoResponse,            // 响应转换trait
    routing::{get, patch},             // HTTP方法路由
    Json, Router,                      // JSON处理、路由器
};
use serde::{Deserialize, Serialize};   // JSON序列化/反序列化
use std::{
    collections::HashMap,              // 内存存储数据结构
    sync::{Arc, RwLock},               // 线程安全共享指针和读写锁
    time::Duration,                    // 超时时间设置
};
use tower::{BoxError, ServiceBuilder}; // 中间件构建工具
use tower_http::trace::TraceLayer;     // HTTP请求追踪
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt}; // 日志订阅系统
use uuid::Uuid;                        // 生成唯一ID

// 主异步函数，使用tokio运行时
#[tokio::main]
async fn main() {
    // 初始化日志追踪系统
    tracing_subscriber::registry()
        .with(
            // 从环境变量设置日志过滤规则，默认显示debug级别日志
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                format!("{}=debug,tower_http=debug", env!("CARGO_CRATE_NAME")).into()
            }),
        )
        .with(tracing_subscriber::fmt::layer()) // 日志输出格式
        .init(); // 初始化日志系统

    // 创建内存数据库（使用读写锁保护的HashMap）
    let db = Db::default();

    // 构建路由和中间件
    let app = Router::new()
        // 定义路由端点
        .route("/todos", get(todos_index).post(todos_create))
        .route("/todos/:id", patch(todos_update).delete(todos_delete))
        // 添加全局中间件
        .layer(
            ServiceBuilder::new()
                // 错误处理中间件：将BoxError转换为HTTP响应
                .layer(HandleErrorLayer::new(|error: BoxError| async move {
                    if error.is::<tower::timeout::error::Elapsed>() {
                        // 请求超时处理
                        Ok(StatusCode::REQUEST_TIMEOUT)
                    } else {
                        // 其他错误处理
                        Err((
                            StatusCode::INTERNAL_SERVER_ERROR,
                            format!("未处理的内部错误: {error}"),
                        ))
                    }
                }))
                .timeout(Duration::from_secs(10))  // 10秒请求超时
                .layer(TraceLayer::new_for_http()) // HTTP请求追踪
                .into_inner(),
        )
        .with_state(db); // 注入共享状态（数据库）

    // 绑定TCP监听端口
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    tracing::debug!("监听地址: {}", listener.local_addr().unwrap());
    
    // 启动HTTP服务器
    axum::serve(listener, app).await.unwrap();
}

// 分页查询参数结构体
#[derive(Debug, Deserialize, Default)]
pub struct Pagination {
    pub offset: Option<usize>,    // 起始位置
    pub limit: Option<usize>,     // 返回数量限制
}

// GET /todos 处理函数 - 获取待办事项列表
async fn todos_index(
    pagination: Query<Pagination>,// 提取查询参数
    State(db): State<Db>          // 提取共享数据库状态
) -> impl IntoResponse {
    // 获取读锁访问数据库
    let todos = db.read().unwrap();

    // 应用分页逻辑
    let todos = todos
        .values()
        .skip(pagination.offset.unwrap_or(0))         // 跳过指定偏移量
        .take(pagination.limit.unwrap_or(usize::MAX)) // 限制返回数量
        .cloned()                 // 克隆数据
        .collect::<Vec<_>>();     // 收集为Vec

    // 返回JSON格式的待办事项列表
    Json(todos)
}

// 创建待办事项的请求体结构
#[derive(Debug, Deserialize)]
struct CreateTodo {
    text: String, // 待办事项内容
}

// POST /todos 处理函数 - 创建新待办事项
async fn todos_create(
    State(db): State<Db>,         // 共享数据库状态
    Json(input): Json<CreateTodo> // 提取JSON请求体
) -> impl IntoResponse {
    // 创建新的待办事项
    let todo = Todo {
        id: Uuid::new_v4(),       // 生成唯一ID
        text: input.text,         // 设置内容
        completed: false,         // 默认未完成
    };

    // 获取写锁并插入数据库
    db.write().unwrap().insert(todo.id, todo.clone());

    // 返回201 Created状态码和创建的待办事项
    (StatusCode::CREATED, Json(todo))
}

// 更新待办事项的请求体结构
#[derive(Debug, Deserialize)]
struct UpdateTodo {
    text: Option<String>,         // 可选的新文本
    completed: Option<bool>,      // 可选的完成状态
}

// PATCH /todos/{id} 处理函数 - 更新待办事项
async fn todos_update(
    Path(id): Path<Uuid>,         // 提取路径中的ID
    State(db): State<Db>,         // 共享数据库状态
    Json(input): Json<UpdateTodo> // 提取JSON请求体
) -> Result<impl IntoResponse, StatusCode> {
    // 查找指定ID的待办事项
    let mut todo = db
        .read()
        .unwrap()
        .get(&id)
        .cloned()                 // 克隆数据
        .ok_or(StatusCode::NOT_FOUND)?; // 找不到返回404

    // 更新文本（如果提供了新文本）
    if let Some(text) = input.text {
        todo.text = text;
    }

    // 更新完成状态（如果提供了新状态）
    if let Some(completed) = input.completed {
        todo.completed = completed;
    }

    // 更新数据库中的待办事项
    db.write().unwrap().insert(todo.id, todo.clone());

    // 返回更新后的待办事项
    Ok(Json(todo))
}

// DELETE /todos/{id} 处理函数 - 删除待办事项
async fn todos_delete(
    Path(id): Path<Uuid>, // 提取路径中的ID
    State(db): State<Db>  // 共享数据库状态
) -> impl IntoResponse {
    // 尝试删除指定ID的待办事项
    if db.write().unwrap().remove(&id).is_some() {
        // 成功删除返回204 No Content
        StatusCode::NO_CONTENT
    } else {
        // 找不到返回404 Not Found
        StatusCode::NOT_FOUND
    }
}

// 数据库类型定义：线程安全的HashMap，使用读写锁保护
type Db = Arc<RwLock<HashMap<Uuid, Todo>>>;

// 待办事项数据结构
#[derive(Debug, Serialize, Clone)]
struct Todo {
    id: Uuid,           // 唯一标识符
    text: String,       // 事项内容
    completed: bool,    // 完成状态
}
```


