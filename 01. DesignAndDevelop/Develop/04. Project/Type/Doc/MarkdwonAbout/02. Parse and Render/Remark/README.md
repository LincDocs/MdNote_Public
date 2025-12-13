---
create_date: 2025-12-09
last_date: 2025-12-10
author: LincZero
---
# Remark README

(请先读 [../Unified/README.md](../Unified/README.md))

## 资料

- repo: https://github.com/remarkjs/remark
- website: https://remark.js.org/

## Github README

### 亮点

- [x] **[compliant](https://github.com/remarkjs/remark?tab=readme-ov-file#syntax)** — 100% 符合 CommonMark，100% 符合 GFM 或 MDX（带插件）
- [x] **[ASTs](https://github.com/remarkjs/remark?tab=readme-ov-file#syntax-tree)** — 检查和更改内容变得容易
- [x] **[popular](https://www.npmtrends.com/remark-parse-vs-marked-vs-micromark-vs-markdown-it)** — 世界上最受欢迎的 Markdown 解析器
- [x] **[plugins](https://github.com/remarkjs/remark?tab=readme-ov-file#plugins)** — 150+ 个插件可供您选择

### 简洁

remark 是一个插件生态系统，可将 Markdown 作为结构化数据使用，特别是 AST（抽象语法树）。
AST 使程序可以轻松处理 Markdown。我们称这些程序为插件。插件能检查和更改树。
您可以使用许多现有的插件，也可以制作自己的插件。

- 要学习 Markdown，请参阅此备忘单和教程
- 有关我们的更多信息，请访问 Unifiedjs.com
- 如有疑问，请参阅支持
- 如需帮助，请参阅下面的贡献或赞助

### 插件

remark 插件用于处理 Markdown 内容。一些常见的例子有：

- [`remark-gfm`](https://github.com/remarkjs/remark-gfm) — 添加对 GFM（GitHub 风格 Markdown）的支持
- [`remark-lint`](https://github.com/remarkjs/remark-lint) — 检查 Markdown 并警告不一致之处
- [`remark-toc`](https://github.com/remarkjs/remark-toc) — 生成toc目录
- [`remark-rehype`](https://github.com/remarkjs/remark-rehype) 将 Markdown 转换为 HTML

这些插件堪称典范，因为它们的功能和实现方式截然不同，分别是:

- 扩展 Markdown 语法
- 检查树
- 更改树
- 转换为其他语法树

您可以从现有的 150 多个插件中进行选择。以下是三种查找插件的好方法：

- [`awesome-remark`](https://github.com/remarkjs/awesome-remark) — 精选最棒的项目
- [插件列表](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) — 所有插件的列表
- [`remark-plugin`主题](https://github.com/topics/remark-plugin) — GitHub 上任何带有标签的仓库

有些插件由我们组织内部维护，`@remarkjs`有些则由其他地方的人员维护。任何人都可以编写 remark 插件，因此，在选择是否在项目中引入依赖项时，务必仔细评估 remark 插件的质量。

### 更多

略，见 github readme 原文

## 使用Remark插件

使用 Remark 渲染引擎的 SSG 如: Astro、Quartz

### Quartz 使用 Remark 插件

from gpt:

> 在 Quartz 中编写插件时，通常包含两部分代码：
> 
> 1. **通用 Remark 插件部分**：这完全是基于 unified/remark 生态的标准代码，操作 Markdown AST（抽象语法树）。这部分代码**与 Quartz 无关**，你可以把它剥离出来放在任何使用 remark 的项目（如 Astro, Next.js, Gatsby）中使用。
> 2. **Quartz 适配器部分**：这是 Quartz 特有的接口 `QuartzTransformerPlugin`，它的作用仅仅是告诉 Quartz “请在构建流程中加载这个 remark 插件”。

感觉不太对，`import { type QuartzTransformerPlugin } from "../types"` 会用到一点，但是是非必须的

在配置中注册插件 (你也可以参考他自带的插件的做法):

`/quartz.config.ts`

```js
import { RocketHeading } from "./quartz/plugins/transformers/rocketHeading" // [!code ++]

const config: QuartzConfig = {
  plugins: {
    transformers: [
      RocketHeading(), // [!code ++]
    ],
  },
}
```

