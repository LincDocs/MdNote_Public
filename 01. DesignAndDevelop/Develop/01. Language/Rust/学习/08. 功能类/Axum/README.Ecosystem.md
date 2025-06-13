# 社区项目

TODO: 分类

- README类 (强烈建议优先粗读一遍，目录类)
  - [./README.md](./README.md)
  - [./README.Examples.md](README.Examples.md)
  - [./README.Ecosystem.md](README.Ecosystem.md)

如果您的项目未在此处列出但您希望它被列出，请随时创建 PR。

目录：

- 社区生态
- 社区项目
- 社区教程

## 社区维护的阿克苏姆生态系统

[table]

- [axum-server](https://crates.io/crates/axum-server)： axum-server 是一个设计用于与 axum 一起使用的超级服务器实现。
- [axum-typed-websockets](https://crates.io/crates/axum-typed-websockets)： `axum::extract::ws`带有类型安全消息。
- [Tower-cookies](https://crates.io/crates/tower-cookies)： Cookie 管理中间件
- [axum-flash](https://crates.io/crates/axum-flash)： axum 的一次性通知（又名闪存消息）。
- [axum-msgpack](https://crates.io/crates/axum-msgpack)： axum 的 MessagePack 提取器。
- [axum-sqlx-tx](https://crates.io/crates/axum-sqlx-tx)： 请求绑定的[SQLx](https://github.com/launchbadge/sqlx#readme)事务，根据响应自动提交/回滚。
- [aliri_axum](https://docs.rs/aliri_axum)和[aliri_tower](https://docs.rs/aliri_tower)： JWT 验证中间件和 OAuth2 范围强制提取器。
- [ezsockets](https://github.com/gbaranski/ezsockets)： 易于使用与 axum 集成的 WebSocket 库。
- [axum_session](https://github.com/AscendingCreations/AxumSessions)： 数据库持久会话，如 axum 的 pythons flask_sessionstore。
- [axum_session_auth](https://github.com/AscendingCreations/AxumSessionsAuth)： 基于持久会话的用户登录，并具有 axum 的权限管理。
- [axum-auth](https://crates.io/crates/axum-auth)： axum 的高级 http 身份验证提取器。
- [axum-keycloak-auth](https://github.com/lpotthast/axum-keycloak-auth)： 使用 Keycloak 发出的 JWT 保护 axum 路由。
- [axum-tungstenite](https://github.com/davidpdrsn/axum-tungstenite)： 使用 tungstenite 直接与 axum 建立 WebSocket 连接
- [axum-jrpc](https://github.com/0xdeafbeef/axum-jrpc)： axum 的 Json-rpc 提取器
- [axum-tracing-opentelemetry](https://crates.io/crates/axum-tracing-opentelemetry)： 用于集成 axum + tracing + opentelemetry 的中间件和工具
- [svelte-axum-project](https://github.com/jbertovic/svelte-axum-project)： 以 axum 为后端的 Svelte 前端应用程序的模板和示例
- [axum-streams](https://github.com/abdolence/axum-streams-rs)： 具有不同格式的流式 HTTP 主体：JSON、CSV、Protobuf。
- [axum-template](https://github.com/Altair-Bueno/axum-template)： 基于 axum 的 Web MVC 应用程序的层、提取器和模板引擎包装器
- [axum-template](https://github.com/janos-r/axum-template)： GraphQL 和 REST API、SurrealDb、JWT 身份验证、直接错误处理、请求日志
- [axum-guard-logic](https://github.com/sjud/axum_guard_logic)： 使用 AND/OR 逻辑提取类型并根据`Service`输入检查其值。
- [axum-casbin-auth](https://github.com/casbin-rs/axum-casbin-auth)： axum框架的Casbin访问控制中间件
- [aide](https://docs.rs/aide)： 具有 [axum 集成](https://docs.rs/aide/latest/aide/axum/index.html)的代码优先开放 API 文档生成器。
- [axum-typed-routing](https://docs.rs/axum-typed-routing/latest/axum_typed_routing/)： 使用助手生成 OpenAPI 的静态类型路由宏。
- [axum-jsonschema](https://docs.rs/axum-jsonschema/)： `Json<T>`执行请求的 JSON 模式验证的提取器。
- [axum-login](https://docs.rs/axum-login)： 基于会话的 axum 用户身份验证。
- [axum-csrf-sync-pattern](https://crates.io/crates/axum-csrf-sync-pattern)： 为 AJAX 后端和 API 端点实现 CSRF STP 的中间件。
- [axum-otel-metrics](https://github.com/ttys3/axum-otel-metrics/)： 支持 prometheus 导出器的 axum OpenTelemetry Metrics 中间件。
- [jwt-authorizer](https://crates.io/crates/jwt-authorizer)： axum 的 JWT 授权层（oidc 发现、验证选项、声明提取等）
- [axum-typed-multipart](https://crates.io/crates/axum_typed_multipart)： 类型安全包装器`axum::extract::Multipart`。
- [Tower-governor](https://crates.io/crates/tower_governor)： Tower 服务和层，通过[Governor](https://crates.io/crates/governor)提供速率限制后端
- [axum-restful](https://github.com/gongzhengyang/axum-restful)： axum 和 sea-orm 的 restful 框架，受到 django-rest-framework 的启发。
- [springtime-web-axum](https://crates.io/crates/springtime-web-axum)： 基于 Springtime 和 axum 构建的 Web 框架，利用依赖注入轻松进行应用程序开发。
- [rust-axum-with-google-oauth](https://github.com/randommm/rust-axum-with-google-oauth)： 用于 axum 上的 Google OAuth 身份验证的网站模板，使用带有 SQLx 或 MongoDB 和 MiniJinja 的 SQLite。
- [axum-htmx](https://github.com/robertwayne/axum-htmx)： axum 的 Htmx 提取器和请求保护器。
- [axum-prometheus](https://github.com/ptrskay3/axum-prometheus)： 一个用于收集 axum 应用程序的 HTTP 指标的中间件库，与所有[metrics.rs](https://metrics.rs/)导出器兼容。
- [axum-valid](https://github.com/gengteng/axum-valid)： 使用 validator、garde 和 validify 进行数据验证的提取器。
- [Tower-sessions](https://github.com/maxcountryman/tower-sessions)： 会话作为`tower`中间件`axum`。
- [Shuttle](https://github.com/shuttle-hq/shuttle)： 无需编写任何基础架构文件即可构建和交付后端。现已支持 Axum。
- [socketioxide](https://github.com/totodore/socketioxide)： 一个易于使用的 socket.io 服务器实现，可作为`tower`层/服务工作。
- [axum-serde](https://github.com/gengteng/axum-serde)： 提供多个基于 serde 的提取器/响应，还提供一个宏来轻松定制基于 serde 的提取器/响应。
- [loco.rs](https://github.com/loco-rs/loco)： 基于 axum 的类似于 Rails 的全栈 Web 和 API 生产力框架。
- [axum-test](https://crates.io/crates/axum-test)： 用于编写针对 axum 运行的 Cargo 测试的高级库。
- [axum-messages](https://github.com/maxcountryman/axum-messages)： axum 的一次性通知消息。
- [spring-rs](https://github.com/spring-rs/spring-rs)： spring-rs 是一个用 rust 编写的微服务框架，灵感来自 java 的 spring-boot，基于 axum
- [zino](https://github.com/zino-rs/zino)： Zino 是可组合应用程序的下一代框架，可与 axum 完全集成。
- [axum-rails-cookie](https://github.com/endoze/axum-rails-cookie)： 在基于 axum 的应用程序中提取 rails 会话 cookie。
- [axum-ws-broadcaster](https://github.com/Necoo33/axum-ws-broadcaster)： 用于[axum-typed-websockets](https://crates.io/crates/axum-typed-websockets)和 的广播库`axum::extract::ws`。
- [axum-negotiate-layer](https://github.com/2ndDerivative/axum-negotiate-layer)： Kerberos/NTLM“协商”认证的中间件/层。
- [axum-kit](https://github.com/4lkaid/axum-kit)： 简化 axum 与 SQLx 和 Redis 的集成和使用。
- [Tower_allowed_hosts](https://crates.io/crates/tower_allowed_hosts)： 允许主机中间件，限制仅来自允许主机的请求。
- [baxe](https://github.com/zyphelabs/baxe)： 简单的宏，用于定义一次后端错误并自动生成标准化的 JSON 错误响应，从而节省时间并降低复杂性
- [axum-html-minifier](https://crates.io/crates/axum_html_minifier)： 该中间件缩小了 axum 响应的 html 正文内容。
- [static-serve](https://crates.io/crates/static-serve)： 用于在 axum 网络服务器中压缩和嵌入静态资产的辅助宏。

## 项目展示

- [HomeDisk](https://github.com/MedzikUser/HomeDisk)：☁️ 快速、轻量且开源的本地云，用于存储您的数据。
- [Houseflow](https://github.com/gbaranski/houseflow)：用 Rust 编写的房屋自动化平台。
- [JWT Auth](https://github.com/Z4RX/axum_jwt_example)：用于教育目的的 JWT 身份验证服务。
- [ROAPI](https://github.com/roapi/roapi)：无需编写任何代码即可为静态数据集创建成熟的 API。
- [notify.run](https://github.com/notify-run/notify-run-rs)：HTTP 到 WebPush 中继，用于向您自己发送桌面 / 移动通知，用 Rust 编写。
- [turbo.fish](https://turbo.fish/) ([存储库](https://github.com/jplatte/turbo.fish))：自己去发现 😉
- [图书管理](https://github.com/lz1998/axum-book-management)：使用 ORM 和 JWT 进行图书管理的 CRUD 系统，用于教育目的。
- [realworld-axum-sqlx](https://github.com/launchbadge/realworld-axum-sqlx) ：使用 axum 和[SQLx实现的](https://github.com/launchbadge/sqlx)[Realworld](https://github.com/gothinkster/realworld)演示应用规范的 Rust 实现。请参阅[https://github.com/davidpdrsn/realworld-axum-sqlx](https://github.com/davidpdrsn/realworld-axum-sqlx)获取包含最新依赖项的 fork。[](https://github.com/launchbadge/sqlx)[](https://github.com/davidpdrsn/realworld-axum-sqlx)
- [Rustapi](https://github.com/ndelvalle/rustapi)：使用 MongoDB 的 RESTful API 模板
- [axum-postgres-template](https://github.com/koskeller/axum-postgres-template)：生产就绪的 axum + PostgreSQL 应用程序模板
- [RUSTfulapi](https://github.com/robatipoor/rustfulapi)：用于在 Rust 中构建 REST Web 服务的可复用模板。使用 axum 和 SeaORM。
- [Jotsy](https://github.com/ohsayan/jotsy)：由 Skytable、a​​xum 和 Tokio 提供支持的自托管笔记应用程序
- [Svix](https://www.svix.com/)（[存储库](https://github.com/svix/svix-webhooks)）：企业级 webhook 服务
- [emojied](https://emojied.net/)（[存储库](https://github.com/sekunho/emojied)）：将 URL 缩短为表情符号！
- [CLOMonitor](https://clomonitor.io/)（[存储库](https://github.com/cncf/clomonitor)）：检查开源项目存储库以验证它们是否符合某些最佳实践。
- [Pinging.net](https://www.pinging.net/)（[存储库](https://github.com/benhansenslc/pinging)）：一种检查和监控互联网连接的新方法。
- [Wastebin](https://github.com/matze/wastebin)：极简主义的 Pastebin 服务。
- [sandbox_axum_observability](https://github.com/davidB/sandbox_axum_observability)一个沙盒/展示项目，用于实验 axum 和可观察性（跟踪、opentelemetry、jaeger、grafana tempo……）
- [axum_admin ：使用](https://github.com/lingdu1234/axum_admin)**axum**、Sea-orm 和 Vue 3构建的管理面板。
- [rgit](https://git.inept.dev/~doyle/rgit.git/about)：一款速度极快的 Git 存储库浏览器，与 cgit 兼容并深受其启发。
- [Petclinic](https://github.com/danipardo/petclinic)：Spring Framework 的 Petclinic 展示项目移植到 axum
- [axum-middleware-example](https://github.com/casbin-rs/axum-middleware-example)：使用 axum、Casbin 和 Diesel 的授权应用程序，并支持 JWT。
- [circleci-hook](https://github.com/DavidS/circleci-hook)：将 CircleCI WebHooks 转换为 OpenTelemetry 追踪数据，提升您的测试洞察力。使用 otel-cli 添加详细信息以捕获单个命令。使用 TRACEPARENT 集成添加测试详细信息。
- [lishuuro.org](https://github.com/uros-5/backend-lishuuro)：使用 axum 作为后端的小型国际象棋变体服务器。
- [freedit](https://github.com/freedit-org/freedit)：一个由 rust 提供支持的论坛。
- [axum-http-auth-example](https://github.com/i0n/axum-http-auth-example)：使用 postgres 和 redis 的 axum http auth 示例。
- [Deaftone](https://github.com/Deaftone/Deaftone)：轻量级音乐服务器。API 简洁明了。
- [dropit](https://github.com/scotow/dropit)：临时文件托管。
- [cobrust](https://github.com/scotow/cobrust)：基于网络的多人蛇游戏。
- [meta-cross](https://github.com/scotow/meta-cross)：井字游戏的调整版本。
- [httq](https://github.com/scotow/httq) HTTP 到 MQTT 简单代理。
- [Pods-Blitz](https://pods-blitz.org/)自托管播客发布者。使用 axum-login、password-auth、sqlx 和 handlebars（用于 HTML 模板）等包。
- [ReductStore](https://github.com/reductstore/reductstore)：用于存储和管理大量 blob 数据的时间序列数据库
- [randoku](https://github.com/stchris/randoku)：一个生成随机数并随机打乱列表的小型网络服务
- [sero](https://github.com/clowzed/sero)：像 surge.sh 一样，使用自定义子域名托管静态网站。但拥有完全的控制权和一些很酷的新功能。（axum、sea-orm、postgresql）
- [Hatsu](https://github.com/importantimport/hatsu)：🩵 用于静态站点的自托管和全自动 ActivityPub 桥。
- [Mini RPS](https://github.com/marcodpt/minirps)：迷你反向代理服务器、HTTPS、CORS、静态文件托管和模板引擎（minijinja）。
- [fx](https://github.com/rikhuijzer/fx)：您可以自行托管的（微）博客服务器。
- [clean_axum_demo](https://github.com/sukjaelee/clean_axum_demo)：一个使用 Axum 和 SQLx 构建的现代化、简洁架构的 Rust API 服务器模板。它集成了领域驱动设计、存储库模式、JWT 身份验证、文件上传、Swagger 文档和 OpenTelemetry。

## 教程

- [Rust on Nails](https://rust-on-nails.com/)：Rust Web 应用程序的全栈架构
- [axum-tutorial](https://github.com/programatik29/axum-tutorial)（[网站](https://programatik29.github.io/axum-tutorial/)）：axum 初学者教程
- [demo-rust-axum](https://github.com/joelparkerhenderson/demo-rust-axum)：Rust 和 axum Web 框架的演示
- [axum 简介 (讨论)](https://www.youtube.com/watch?v=ETdmhh7OQpA)：哥本哈根 Rust 聚会上关于 axum 的讨论
- [Axum 入门](https://carlosmv.hashnode.dev/getting-started-with-axum-rust)：axum 教程、GET、POST 端点和服务文件
- [使用 Rust、Axum、PostgreSQL 和 Tokio 构建博客](https://spacedimp.com/blog/using-rust-axum-postgresql-and-tokio-to-build-a-blog/)
- [axum 简介](https://www.youtube.com/playlist?list=PLrmY5pVcnuE-_CP7XZ_44HN-mDrLQV4nS)：YouTube 播放列表
- [Rust Axum 完整课程](https://www.youtube.com/watch?v=XZtlD_m59sM)：YouTube 视频
- [使用 Shuttle 部署 Axum 项目](https://docs.shuttle.rs/examples/axum)
- [使用 Rust 进行 API 开发](https://rust-api.dev/docs/front-matter/preface/)：基于 axum 的 REST API

[使用 Rust 和 Next.js 构建 SaaS](https://joshmo.bearblog.dev/lets-build-a-saas-with-rust/)通过 axum 将 Next.js 与 Rust 结合起来构建 SaaS 的教程




