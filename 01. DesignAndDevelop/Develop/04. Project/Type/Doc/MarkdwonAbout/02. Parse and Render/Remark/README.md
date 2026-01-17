---
create_date: 2025-12-09
last_date: 2025-12-10
author: LincZero
---
# Remark README

(请先读 [../Unified/README.md](../Unified/README.md))

## 资料

- remark
  - repo: https://github.com/remarkjs/remark
  - website: https://remark.js.org/
- 上游相关
  - 你最好先了解其上游 (unified) 相关的知识再回来看 remark，他们总是密不可分的。
    了解 unified 知识前学习 remark 容易让人感到迷糊
  - unified
    Remark 建立在 [unified](https://github.com/unifiedjs/unified) 之上,一定要阅读它和它的 [网站](https://unifiedjs.github.io)
    官网: https://unifiedjs.com/

### 开发资料

quartz: 其所有Transformer插件都可以在以下位置找到: `quartz/plugins/transformers`

> [!note]
> 三个主要仓库组织
> 
> 在 https://github.com/remarkjs/ 组织中的插件中，你经常能看到依赖中有以 `micromark-extension-` 和 `mdast-util-` 开头的依赖，且大部分的插件逻辑都集中在他们上面，插件仓库本体的内容则是较少
> 
> 包括 remark-gfm、remark-directive、等等
> 
> 这也导致了一个学习难点是，一个插件有时会被拆得很细，难以学习。例如: 
> 
> 以 remak-directive 为例
> 
> - [remarkjs/remark-directive](https://github.com/remarkjs/remark-directive/blob/main/package.json), star 361
> - [micromark/micromark-extension-directive](https://github.com/micromark/micromark-extension-directive), star 33
>   提供 `:::` 语法的识别和解析
> - [syntax-tree/mdast-util-directive](https://github.com/syntax-tree/mdast-util-directive), star 18

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

## 下游相关

依赖&使用 Remark 的一些库

- SSG类， 使用 remark 解析和渲染引擎的SSG (静态网站生成器)，或者说都是基于 Unified 生态系统
  - Astro， 通用高性能多用途网站
  - Quartz， 更强调 OFM (Obsidian 风格 Markdwon)
  - Docusaurus， remark 用于将 Markdown/MDX 转换为 React 组件
- 其他
  - Next.js
  - Nuxt Content (Nuxt.js)
  - Gatsby

SSG Remark 的使用与配置对比

**gemini 3 pro**:

我们将对比它们如何加载插件、扩展功能

### Docusaurus

Docusaurus 将 remark 配置封装在 `docusaurus.config.js` 的 presets（预设）或 plugin 选项中。

- **配置方式**: 标准且严格。你需要将 remark 插件数组传递给 `@docusaurus/preset-classic`。
- **MDX 支持**: 默认强制使用 MDX。这意味着你的 Markdown 内容被视为 React 组件。这既是优点（可以在文档里直接写 React 组件），也是痛点（Markdown 语法稍有错误就会导致构建崩溃，因为它是作为代码编译的）。
- **自带 Remark 插件**: 默认集成了一些极其好用的插件，专门处理 **Admonitions (警告框)** 和 **数学公式 (KaTeX)**。
- **开发者体验**: 添加插件很容易，但如果要修改 Docusaurus 内部默认的 remark 逻辑（比如修改它如何解析标题生成 TOC），则比较困难，因为内部封装较深。

```js
// docusaurus.config.js
presets: [
  ['classic', {
    docs: {
      remarkPlugins: [require('remark-math')], // 在这里添加
      rehypePlugins: [require('rehype-katex')],
    },
  }],
],
```

### Astro

Astro 提供了目前最灵活的 Remark 集成体验。

- **配置方式**: 在 `astro.config.mjs` 中有顶级的 `markdown` 配置项。
- **MDX vs Markdown**: Astro 明确区分 `.md` (标准 Markdown) 和 `.mdx` (MDX)。
    - 对于 `.md`，它使用纯 remark 渲染，速度极快。
    - 对于 `.mdx`，它使用 remark + JSX 编译器。
- **Frontmatter 注入**: Astro 的 remark 插件可以非常方便地注入 frontmatter 数据，然后直接在 `.astro` 布局文件中使用 `Astro.props.frontmatter` 访问。这对于根据内容动态修改页面元数据非常强大。
- **扩展性**: 你可以编写自定义 remark 插件来修改生成的 HTML，或者提取元数据（如阅读时间）并自动注入到 frontmatter 中供页面组件使用。

```js
// astro.config.mjs
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkToc, remarkMath], // 简单直接
    rehypePlugins: [],
    // 甚至可以扩展默认的 GitHub Flavored Markdown
    gfm: true,
  },
});
```

### Quartz

Quartz (尤其是 v4) 是三者中最“极客”的，它的核心逻辑暴露得非常彻底。

- **配置方式**: `quartz.config.ts` 定义了一个完整的插件列表。
- **Transformers**: Quartz 引入了 `Transformer` 的概念。很多 `Transformer` 本质上就是对 remark/rehype 插件的封装。
- **Obsidian 兼容性**: Quartz 对 remark 的使用主要集中在 **还原 Obsidian 的编辑���验**。它有专门的 remark 逻辑来处理 Wikilinks (`[[链接]]`)、Obsidian Callouts (`> [!info]`) 和 Latex。
- **深度定制**: Quartz 允许你直接修改它的 `emitters` (发射器) 和 `plugins`。如果你想写一个 remark 插件把所有的文本都变成红色，在 Quartz 里你可以直接把它插到处理链的中间。它比 Astro 和 Docusaurus 更像是一个“构建脚本生成器”。

```ts
// quartz.config.ts
plugins: {
  transformers: [
    Plugin.FrontMatter(),
    Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }), // 深度集成的 Remark 逻辑
    Plugin.GitHubFlavoredMarkdown(),
    Plugin.TableOfContents(),
    Plugin.CrawlLinks({ markdownLinkResolution: 'shortest' }),
  ],
}
```

### 总结与建议

| 特性             | Astro                               | Quartz                         | Docusaurus                       |
| -------------- | ----------------------------------- | ------------------------------ | -------------------------------- |
| 主要用途           | 全能型 (博客、营销、SaaS)                    | 知识库、数字花园、Obsidian 发布           | 软件文档、产品手册                        |
| **Remark 自由度** | ⭐⭐⭐⭐⭐ (原生支持，配置简单)                   | ⭐⭐⭐⭐ (通过 Transformers 封装，深度可控) | ⭐⭐⭐ (通过配置数组，被 Preset 约束)         |
| Markdown 哲学    | 内容即数据 (Content Collections)         | 内容即连接 (双向链接、图谱)                | 内容即组件 (MDX, React)               |
| 构建性能           | 极快 (这也是它的主要卖点)                      | 较快 (基于 esbuild)                | 较慢 (尤其是大型文档库，因 Webpack/React 开销) |
| 对 Obsidian 支持  | 需安装社区插件 (`astro-rehype-obsidian` 等) | **原生完美支持**                     | 较弱，需大量配置或插件                      |
