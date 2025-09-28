---
create_date: 2025-04-23
last_date: 2025-09-21
author: LincZero
---
# Tauri

资料：

- 官方
  - [官网](https://v2.tauri.app/)
  - [github](https://github.com/tauri-apps/tauri)
- 官网文档
  - **不要直接看中文文档!!!** 除非你没有遇到任何问题，中文文档翻译比较滞后，像我开发过程中看的 logging 页，中文就缺了很多东西。导致我踩了不少坑
  - [中文-首页](https://v2.tauri.app/zh-cn/)
  - [中文-快速入门](https://v2.tauri.app/zh-cn/start/)
  - [文档对应的仓库](https://github.com/tauri-apps/tauri-docs/tree/v2/src/content/docs/zh-cn/start)
    (注意: 文档源码很多用 **mdx** 写的)
    ```js
    // 主要使用带变量的标签页 (包工具/系统/Linux发行版)
    <Tabs syncKey="distro">
    <TabItem label="Debian">
    
    // 以及import
    import Cta from '../../_fragments/cta.mdx';
    ```
- 视频
  - https://www.bilibili.com/video/BV1kp421U7Vb/
- 笔记
  - [./中文教程/](./中文教程/)。这部分使用 [官网-中文](https://v2.tauri.app/zh-cn/) [快速入门](https://v2.tauri.app/zh-cn/start/) 教程

> [!note]
> 支持多种语言语言：
> 
> 开发者们可以集成任何用于创建用户界面的可以被编译成 HTML、JavaScript 和 CSS 的前端框架，同时可以在必要时使用 Rust、Swift 和 Kotlin 等语言编写后端逻辑。



