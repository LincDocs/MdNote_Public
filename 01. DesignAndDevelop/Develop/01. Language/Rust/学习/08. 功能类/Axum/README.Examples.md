# README.Examples

TODO: 分类

- README类 (强烈建议优先粗读一遍，目录类)
  - [./README.md](README.md)
  - [./README.Examples.md](README.Examples.md)
  - [./README.Ecosystem.md](README.Ecosystem.md)

## 目录

[官方项目/examples/](https://github.com/tokio-rs/axum/blob/main/examples/) 详情：

[dir]

- examples/    | **示例**。详见 [README.Examples](README.Examples.md) 和 [./README.Ecosystem](README.Ecosystem.md)
  - README.md  | 展示如何使用 axum。每个示例都设置为独立的 crate，因此其依赖关系清晰。<br>有关社区使用 axum 构建的内容的列表，请参阅 [此处](https://github.com/tokio-rs/axum/blob/main/ECOSYSTEM.md)的列表
  - anyhow-error-response/ | 如何错误响应
  - async-graphql/         | 异步 graphql
  - auto-reload/           | 自动重新加载
  - chat/ | 聊天
  - 压缩/
  - ...
  - 自定义路径拒绝/
  - 依赖注入/
  - ...
  - 错误处理/
  - 形式/
  - 全局404处理程序/
  - 优雅关机/
  - 处理头请求/
  - hello-wrold/           | *你好世界* [src/main.rs](https://github.com/tokio-rs/axum/blob/main/examples/hello-world/src/main.rs)
  - http-proxy/            | http代理/
  - jwt/
  - key-value-store/       | 键值存储
  - ...
  - mongodb/               | mongo数据库
  - multipart-form/        | 多部分表格
  - oauth/
  - parse-body-based-on-content-type/ | 基于内容类型解析主体
  - print-request-response/| *打印请求响应*
  - 普罗米修斯指标/
  - 带有空字符串的查询参数/
  - readme/                | *自述*
  - request-id/            | 请求ID
  - reqwest-response /     | reqwest响应 (reqwest没拼错，这是是一个简单而强大的RUST HTTP 客户端)
  - reverse-proxy/         | 反向代理
  - 路由和处理程序紧密相连/
  - 使用hyper服务/
  - 简单路由器 wasm/
  - sqlx-postgres/
  - sse/                   | *sse*
  - static-file-server/    | *静态文件服务器*
  - stream-to-file/        | 流输出到文件
  - ...
  - TLS优雅关闭/
  - tls-rustls/
  - 代办事项/
  - 东京Postgres/
  - tokio-redis/
  - 追踪或日志记录/
  - unix域套接字/
  - 验证器/
  - 版本控制/
  - websockets-http2/
  - 网络套接字/
  - ...

## \<Template\>

```bash
cargo new folderName
# - folderName/
#   - src/
#     - main.rs
#   - Cargo.toml

# b1. 命令版
# cargo add axum
# cargo add tokio@1.0 --features full

# b2. 直接复制黏贴以下内容到toml [dependencies]中
axum = "0.8.4"
tokio = { version = "1.0", features = ["full"] }
# 并执行命令:
cargo build
```
