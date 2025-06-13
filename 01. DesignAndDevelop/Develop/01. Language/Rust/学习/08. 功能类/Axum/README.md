---
create_time: 2025-06-08
Author: LincZero
---
# Axum

参考链接：

- README类 (强烈建议优先粗读一遍，目录类)
  - [./README.md](./README.md)
  - [./README.Examples.md](README.Examples.md)
  - [./README.Ecosystem.md](README.Ecosystem.md)
- github repo
  - [tokio-rs 组织](https://github.com/tokio-rs)
  - [tokio](https://github.com/tokio-rs/tokio) ⭐28.7k
  - [axum](https://github.com/tokio-rs/axum) ⭐21.9k
- 官方文档 https://docs.rs/axum/latest/axum/ (我写的时候是0.8.4)
  - api https://docs.rs/axum/latest/axum/struct.Form.html#
- 其他中文文章 (挺多都比较新，且质量还不错，但中文文档数量不是很多)
  - [Axum 非官方不完全文档](https://rust.wjjss.com/axum/)
  - [Rust Web 框架：Axum 入门一探 - 掘金](https://juejin.cn/post/7233196954401636410)
  - [Rust: Axum HTTP 框架的架构分析 - 知乎](https://zhuanlan.zhihu.com/p/711528388) 写得挺好
  - [Rust Web 开发之Axum使用手册 - 腾讯云](https://cloud.tencent.com/developer/article/2382870)
  - [超简单！手把手实现axum简易中间件 - cnblogs](https://www.cnblogs.com/cinea/p/18010282)

## 安装

```bash
# 添加最新版 Axum
cargo add axum

# 添加 Tokio 并启用所有功能
cargo add tokio --features full
```

## 目录 - 官方项目

[官方项目](https://github.com/tokio-rs/axum/blob/main) 详情：

[dir]

- .github/
- axum-core/
- axum-extra/
- exum-macros/
- axum/
- examples/    | **示例**。详见 [README.Examples](README.Examples.md) 和 [./README.Ecosystem](README.Ecosystem.md)
- .clippy.toml
- .gitignore
- CHANGELOG.md
- CONTRIBUTING.md
- Cargo.lock
- Cargo.toml
- ECOSYSTEM.md
- README.md
- deny.toml

## 目录 - 官方文档

[官方文档](https://docs.rs/axum/latest/axum/index.html) 详情：

[dir|fold]

- All Items             | 所有项目
- Sections/             | 章节
  - High-level features | 高级功能
  - Compatibility       | 兼容性
  - Example             | **示例1**
  - Routing             | 路由
  - Handles             | 处理程序
  - Extractors          | 提取器
  - Responses           | 回应
  - Error handing       | 错误处理
  - Middleware          | 中间件
  - Sharing state with handlers    | 与处理程序共享状态
    - Using the State extractor    | 使用State提取器
    - Using request extensions     | 使用请求扩展
    - Using closure captures       | 使用闭包捕获
    - Using task-local variables   | 使用任务局部变量
  - Building integrations for axum | 为axum构建集成
  - Required dependencies          | 必须的依赖项
  - Examples            | 示例2
  - Featrue flags       | 功能标志
- Crate Items/          | Crate 项 (包项)
  - Re-exports          | 转口
  - Modules             | 模块
  - Structs             | 结构体
  - Traits              | 特质
  - Functions           | 功能
  - Type Aliases        | 类型别名
  - Attribute Macros    | 属性宏
- Crates/               | Crates (包s)
  - axum                | Axum

## 目录 - 其他自定义

RESTful API

- [todos](https://github.com/tokio-rs/axum/blob/main/examples/todos/src/main.rs): Provides a RESTful web server managing some Todos.
- [parse-body-base-on-content-type](https://github.com/tokio-rs/axum/blob/main/examples/parse-body-based-on-content-type/src/main.rs): Provides a RESTful web server managing some Todos.
- [axum-restful](https://github.com/gongzhengyang/axum-restful): A restful framework based on axum and sea-orm, inspired by django-rest-framework.
