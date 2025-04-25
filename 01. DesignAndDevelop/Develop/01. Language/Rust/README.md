# Rust

## 资料

参考：

- [【B站】【2023】最新最全Rust编程语言入门教程](https://www.bilibili.com/video/BV16B4y1q7Sq)，==笔者评价：屎一样的教程，广告很多，不建议选择==
  - 自带在线笔记：http://www.go-edu.cn/categories/Rust%E8%AF%AD%E8%A8%80%E6%95%99%E7%A8%8B/
- rust官网
  - [官网](https://www.rust-lang.org/zh-CN/) (有中文)
  - [官网安装](https://www.rust-lang.org/zh-CN/tools/install)
  - [官网教程](https://www.rust-lang.org/zh-CN/learn) [马上开始](https://www.rust-lang.org/zh-CN/learn/get-started)
    - [《The Rust Programming Language》](https://doc.rust-lang.org/book/) [repo](https://github.com/rust-lang/book) 15.9k
      [《Rust 程序设计语言》](https://kaisery.github.io/trpl-zh-cn/) [repo](https://github.com/rust-lang-cn/rust-by-example-cn) 1.9k (中文 非官方翻译)
      介绍: 官网圣经，也叫Rust圣经
    - [《Rust By Example》](https://doc.rust-lang.org/rust-by-example/) [repo](https://github.com/rust-lang/rust-by-example) 7.3k
      [《通过例子学 Rust》](https://rustwiki.org/zh-CN/rust-by-example/) [repo](https://github.com/KaiserY/trpl-zh-cn/tree/main) 4.8k (中文 非官方翻译)
      介绍: 如果您不喜欢阅读大量的文档来学习语言，那么《通过例子学 Rust》就能涵盖您要学的知识
    - Rustlings 课程 [repo](https://github.com/rust-lang/rustlings/) 57k
    - ... (还有很多其他文档)
  - [官网在线实验场](https://play.rust-lang.org/)
  - [官网社区](https://www.rust-lang.org/zh-CN/community) 有discord和zulip聊天平台、论坛
- 其他
  - [《Rust语言圣经(Rust Course)》](https://course.rs/about-book.html) [repo](https://github.com/sunface/rust-course) 27k
  - [Rusty Book(锈书)](https://rusty.course.rs/) [repo](https://github.com/sunface/new-rusty-book) 166

先重新整理一下电子书资料:

- [《The Rust Programming Language》](https://doc.rust-lang.org/book/) [repo](https://github.com/rust-lang/book) 15.9k
  [《Rust 程序设计语言》](https://kaisery.github.io/trpl-zh-cn/) [repo](https://github.com/rust-lang-cn/rust-by-example-cn) 1.9k (中文 非官方翻译)
  介绍: 官网圣经，也叫Rust圣经
- [《Rust By Example》](https://doc.rust-lang.org/rust-by-example/) [repo](https://github.com/rust-lang/rust-by-example) 7.3k
  [《通过例子学 Rust》](https://rustwiki.org/zh-CN/rust-by-example/) [repo](https://github.com/KaiserY/trpl-zh-cn/tree/main) 4.8k (中文 非官方翻译)
  介绍: 如果您不喜欢阅读大量的文档来学习语言，那么《通过例子学 Rust》就能涵盖您要学的知识
- [《Rust语言圣经(Rust Course)》](https://course.rs/about-book.html) [repo](https://github.com/sunface/rust-course) 27k
- [Rusty Book(锈书)](https://rusty.course.rs/) [repo](https://github.com/sunface/new-rusty-book) 166

> [!note]
> 2025-03-20补充: 时隔一年再看，资料多了很多。特别是官网上的资料，完善了许多
> 
> 现在直接用官网学习就挺好的！目前强烈推荐使用官方资料学习

## 基本介绍

- 特点
    - 静态编译型语言
    - 无垃圾回收机制（速度快）的同时，也无野指针和线程错误（依赖强大的编译器），代价是没有unSafe
    - 重编译轻运行
- 优点
    - 性能好
    - 安全
    - 跨平台好
- 缺点
    - 代价是没有unsafe
    - 开发效率低、学习曲线低，学习性价比不高
- 应用
    - 也可以写前端，用WebAssembly写

如何影响JavaScript？

- 任何能用js写的最终都会使用js写
    - 优点是可以写任何东西，缺点是你真的会用他去写任何东西
- 用js写js生态链的基建，最近有所改变
    - 现在都是用GO、Rust弄。例如esbuild、deno、next.js、vite
- 重运行时

与GO对比

- 略

## 简单调研

参考：

- 优点：
  - [【B站】【中文字幕】Rust 让你感觉自己是个天才](https://www.bilibili.com/video/BV11g411y7JE/)
- 缺点
  - https://www.bilibili.com/video/BV1b5411f7qy
  - https://www.bilibili.com/video/BV1Gv4y1y7im







