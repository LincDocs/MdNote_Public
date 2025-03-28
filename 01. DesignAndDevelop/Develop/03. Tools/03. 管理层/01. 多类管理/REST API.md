# REST API (RESTful API)

## 介绍

REST API 是一种遵循 REST 架构设计原则的 [应用编程接口（API ）](https://www.redhat.com/zh/topics/api/what-are-application-programming-interfaces)。REST 是表述性状态传递的英文缩写，涵盖一系列有关如何构建 Web API 的规则和准则。

REST (**RE**presentational **S**tate **T**ransfer, 表述性状态转移) 是其全称的首字母缩写。它是**分布式超媒体系统的** **架构风格**，最初由Roy Fielding在2000年的着名[论文中提出](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)。

### 落地举例

- [obsidian-local-rest-api](https://coddingtonbear.github.io/obsidian-local-rest-api/#/)
- [AWS Amplify](https://github.com/aws-amplify/amplify-js)
- [NocoDB](https://github.com/nocodb/nocodb)
- Back4app

## 指导原则

1. **客户端 - 服务器** - 通过将用户接口问题与数据存储问题分开，我们通过简化服务器组件来提高跨多个平台的用户接口的可移植性并提高可伸缩性。
2. **无状态** - 从客户端到服务器的每个请求都必须包含理解请求所需的所有信息，并且不能利用服务器上任何存储的上下文。因此，会话状态完全保留在客户端上。
3. **可缓存** - 缓存约束要求将对请求的响应中的数据隐式或显式标记为可缓存或不可缓存。如果响应是可缓存的，则客户端缓存有权重用该响应数据以用于以后的等效请求。
4. **统一接口** - 通过将通用性的软件工程原理应用于组件接口，简化了整个系统架构，提高了交互的可见性。为了获得统一的接口，需要多个架构约束来指导组件的行为。REST由四个接口约束定义：资源识别; 通过陈述来处理资源; 自我描述性的信息; 并且，超媒体作为应用程序状态的引擎。
5. **分层系统** - 分层系统风格允许通过约束组件行为来使体系结构由分层层组成，这样每个组件都不能“看到”超出与它们交互的直接层。
6. **按需编码（可选）** - REST允许通过以小程序或脚本的形式下载和执行代码来扩展客户端功能。这通过减少预先实现所需的功能数量来简化客户端。

## 核心特点

take from deepseek

它通过标准的 **HTTP 方法**（如 GET、POST、PUT、DELETE）和 **资源导向的 URL** 来实现客户端与服务器之间的通信。以下是其核心概念和特点：

- 资源（Resource）  
	- 将数据或服务抽象为“资源”（如用户、订单、文章），**每个资源有唯一的标识符**（URI，如 `/users/123`）。
	- 资源的表现形式通常是 JSON 或 XML。
- HTTP 方法（Verbs）  
	- 使用标准 HTTP 方法定义操作：
		- **GET**：获取资源（如获取用户列表 `/users`）。
		- **POST**：创建资源（如新增用户）。
		- **PUT/PATCH**：更新资源（全量更新或部分更新）。
		- **DELETE**：删除资源。
- 无状态（Stateless）  
	- 每个请求**必须包含所有必要信息**，服务器不保存客户端状态（如会话）。会话状态由客户端管理（如通过 Token）。
- 统一接口（Uniform Interface）
	- 一致的交互方式，例如通过 URI 定位资源，通过 HTTP 方法定义操作。
- 可缓存（Cacheable）  
	- 服务器可明确标记响应是否可缓存，减少重复请求。

### 示例

假设一个博客系统的 API：

- **GET** `/articles` → 返回所有文章列表（JSON 格式）。
- **GET** `/articles/5` → 返回 ID 为 5 的文章。
- **POST** `/articles` → 创建新文章（请求体包含 JSON 数据）。
- **PUT** `/articles/5` → 更新 ID 为 5 的文章。
- **DELETE** `/articles/5` → 删除 ID 为 5 的文章。

### RESTful API 的优点

1. **简单易用**  
   基于 HTTP 标准，开发者和工具（如 Postman）天然支持。
2. **松耦合**  
   客户端和服务器独立演进，只需维护接口一致。
3. **可扩展性**  
   支持分布式系统，易于水平扩展。
4. **跨平台**  
   JSON/XML 格式通用，适合 Web、移动端、IoT 等场景。

### 对比其他 API 风格

- **SOAP**：基于 XML，严格规范，复杂但适合企业级安全场景。
- **GraphQL**：允许客户端自定义返回字段，但需要额外学习成本。
- **RPC**（如 gRPC）：基于函数调用思维，性能高，但灵活性较低。

### 设计最佳实践

1. 使用名词复数表示资源（如 `/users` 而非 `/getUser`）。
2. 利用 HTTP 状态码表示结果（如 `200 OK`、`404 Not Found`、`401 Unauthorized`）。
3. 版本控制 API（如 `/api/v1/users`）。
4. 提供清晰的文档（如 Swagger/OpenAPI）。

### 常见误解

- 误区：任何 HTTP API 都是 RESTful。  
  纠正：需严格遵循 REST 原则（如资源化、无状态、统一接口）。

**总结**：RESTful API 是构建现代 Web 服务的基石，通过简单的 HTTP 协议和资源模型，实现了高效、灵活的系统间通信。
