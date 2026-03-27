---
create_date: 2026-03-25
last_date: 2026-03-25
---
# App Router and Pages Router

## FAQ

@faq q: 

https://ai-sdk.dev/docs/getting-started

这里的

- Next.js App Router (React)
- Next.js Pages Router (React)

有什么区别？我该如何选择？我缺少 React Next.js 开发经验，所以涉及到我知识盲区时可以说详细点

@faq gpt- 4.1: 

**Next.js App Router** 和 **Next.js Pages Router** 是 Next.js（一个基于 React 的流行前端框架）的两套“路由”系统。它们都用来组织页面和导航，但在功能和设计理念上有本质区别。简单总结如下：

## 1. Pages Router（传统路由系统）

- **出现时间早**，自 Next.js 诞生以来就有。
- 目录: 典型路径：`pages/` 目录下的每个文件代表一个页面。例如：`pages/about.js` => `/about`
- **文件系统为路由**，约定优于配置。
- **适合**: 老项目、教程、资料最丰富、很多依赖库支持最好。

## 2. App Router（现代路由系统，自 Next.js 13 起引入）

- 目录: 为 `app/`，不是 `pages/`
- **更灵活**，全面支持 React Server Components。
- 支持“布局”、“嵌套路由”、“局部刷新”等更现代的开发体验。
- **未来发展方向**。Next.js 官方推动新项目采用 `app/` 结构。

## 如何选择？

- **如果你是新手，而且打算长期维护或跟进新版 Next.js 技术，建议选 “App Router”。**
- 如果你需要用到大量资料、教程和第三方库，并且团队中有老手推荐用 `pages/`，可以选 Pages Router。
- **现在大多数新项目和官方推荐都优先用 App Router** —— 除非你依赖还未支持 `app/` 的库，才考虑 Pages Router。

## 详细举例

| 特性              | Pages Router                    | App Router                  |
| --------------- | ------------------------------- | --------------------------- |
| 目录结构            | `/pages`                        | `/app`                      |
| 入口页面文件名         | `pages/index.js`                | `app/page.js`               |
| 页面创建方式          | 每个 .js 文件=一个页面                  | 每个子目录下 `page.js`=一个页面       |
| 布局（Layout）      | 文件内使用                           | 可以多层嵌套layout.js             |
| React 18/Server | 支持 Client Components            | 支持 Server、Client Components |
| SEO，数据请求方式      | getStaticProps/getServerSide... | 通过 async function，灵活        |
| 新手友好度           | 资料多/简单                          | 更现代，官方推荐，资料逐步完善             |

## 总结建议

**新手入门建议**: 如果无历史包袱并想学习新版、主流写法，建议直接学 App Router（`app/` 目录）。现在官网文档和生态也已逐渐完善。

如果你需要实际项目结构示例或代码对比也可以告诉我！


