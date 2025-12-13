---
create_date: 2025-12-13
last_date: 2025-12-13
source: https://unifiedjs.com/learn/guide/introduction-to-unified/
author: LincZero
---
# 01-介绍unified

阅读本指南后，您将：

- 了解[unify](https://unifiedjs.com/explore/package/unified/)的[作用](https://unifiedjs.com/explore/package/unified/)
- 体验一下生态系统
- 了解如何使用它
- 了解您的使用场景需要哪些部件
- 准备一份资源清单，以便继续学习或入门。

## 内容

- [介绍](https://unifiedjs.com/learn/guide/introduction-to-unified/#intro)
- [集合](https://unifiedjs.com/learn/guide/introduction-to-unified/#collective)
- [它是如何组合在一起的](https://unifiedjs.com/learn/guide/introduction-to-unified/#how-it-comes-together)
- [用例](https://unifiedjs.com/learn/guide/introduction-to-unified/#use-cases)
- [概括](https://unifiedjs.com/learn/guide/introduction-to-unified/#summary)
- [下一步](https://unifiedjs.com/learn/guide/introduction-to-unified/#next-steps)

## 介绍

[Unified](https://unifiedjs.com/explore/package/unified/)拥有友好的界面，并由一系列插件生态系统提供支持，旨在创建和处理内容。它能够处理 Markdown、 HTML、纯文本或其他类型的内容，并将其转换为结构化数据，从而使其可供 100 多个插件使用。例如，这些插件可以执行拼写检查、代码检查或压缩等任务。

使用Unified，您无需手动处理语法或解析。通常，您只需编写一行代码即可将插件链接到Unified的进程中。

unified本身是一个相对较小的模块，它作为一个接口，统一处理不同的内容格式。围绕某种特定格式会形成一个生态系统，例如[remark](https://unifiedjs.com/explore/project/remarkjs/remark/)对应Markdown。unified也存在多个[生态系统](https://unifiedjs.com/explore/package/unified/)。它们与其他工具和规范一起构成了unified整体。

## 集合

这个unified由志同道合的组织组成。这些组织拥有共同的目标：革新内容处理方式。而实现这一目标的关键在于打造无缝衔接、可互换且可插拔的工具。

根据你想做的事情，你可以参考不同的组织。那么，让我们先从自我介绍开始吧。

生态系统：

- [redot](https://unifiedjs.com/explore/project/redotjs/redot/) — Graphviz
- [rehype](https://unifiedjs.com/explore/project/rehypejs/rehype/) — HTML
- [remark](https://unifiedjs.com/explore/project/remarkjs/remark/) — markdown
- [retext](https://unifiedjs.com/explore/project/retextjs/retext/) — 自然语言

语法树的规范：

- [esast](https://github.com/syntax-tree/esast) — ECMAScript
- [hast](https://github.com/syntax-tree/hast) — HTML[​](https://github.com/syntax-tree/hast)
- [mdast](https://github.com/syntax-tree/mdast) — markdown
- [nlcst](https://github.com/syntax-tree/nlcst) — 自然语言
- [unist](https://github.com/syntax-tree/unist) — 统一语法树
- [xast](https://github.com/syntax-tree/xast) — XML

其他组成部分：

- [MDX](https://unifiedjs.com/explore/project/mdx-js/mdx/) — Markdown 和 JSX
- [micromark](https://unifiedjs.com/explore/project/micromark/micromark/) — 小巧、安全、强大的 CommonMark（和GFM）Markdown 解析器
- [syntax-tree](https://github.com/syntax-tree) — 用于构建插件的底层实用程序
- [vfile](https://unifiedjs.com/explore/package/vfile/) — 用于文本处理的虚拟文件格式

我们将在下一节中探讨它们如何协同工作。如果您已经跃跃欲试，可以直接跳转到 [“使用unified”](https://unifiedjs.com/learn/guide/using-unified/) 或 [“如何开始使用插件”](https://unifiedjs.com/learn/guide/using-plugins/) 部分。

## 它是如何组合在一起的

这些处理器、规范和工具共同构成了一个三部分组成的过程。处理器的运行过程：

1. **解析**：无论输入的是 Markdown、HTML还是text，都需要解析成可用的格式；这种格式称为语法树；
   规范（例如 [mdast](https://github.com/syntax-tree/mdast)）定义了语法树的结构；
   处理器（例如用于 [mdast](https://github.com/syntax-tree/mdast) 的 [remark](https://unifiedjs.com/explore/project/remarkjs/remark/)）负责创建语法树
2. **转换**：这是关键所在；用户可以设置插件及其运行顺序；插件会接入此阶段，转换并检查它们获取的格式。
3. **字符串化**：最后一步是将（调整后的）格式字符串化为 Markdown、HTML或text（这可能与输入格式不同！）

unified可以通过编程方式在 Bun、Deno 或 Node.js 中使用。通过构建步骤或 [CDN](https://unifiedjs.com/explore/package/unified/) （例如[`esm.sh`](https://esm.sh/)）；
它也可以在浏览器中使用。
此外，还有CLI版本、Grunt 插件和 Gulp 插件等处理器版本。

Unified的独特之处在于它可以在同一过程中切换格式，例如从 Markdown 切换到HTML。这使得组合文档的功能更加强大。

以下插件支持多种格式：

- [`remark-rehype`](https://unifiedjs.com/explore/package/remark-rehype/) — Markdown 转 HTML
- [`rehype-remark`](https://unifiedjs.com/explore/package/rehype-remark/) — HTML 转 Markdown
- [`remark-retext`](https://unifiedjs.com/explore/package/remark-retext/) — Markdown 转 text
- [`rehype-retext`](https://unifiedjs.com/explore/package/rehype-retext/) — HTML 转 text

## 用例、案例

每当您需要处理内容时，不妨考虑一下unified 。它是一款功能强大的工具。当然，对于某些任务，例如将 Markdown 转换为HTML，您[`marked`](https://github.com/markedjs/marked)也可以使用其他更简单的工具。unified[的真正优势](https://unifiedjs.com/explore/package/unified/)在于处理多个任务。例如，当您需要强制执行格式规则、检查拼写、生成目录以及（可能）执行更多操作时，[unified](https://unifiedjs.com/explore/package/unified/)[就是](https://unifiedjs.com/explore/package/unified/)您的最佳选择。

> [!quote]
> [MDX](https://unifiedjs.com/explore/project/mdx-js/mdx/)的成功很大程度上归功于对Unified和[remark](https://unifiedjs.com/explore/project/remarkjs/remark/)生态系统的充分利用。我几个小时就搭建出了一个原型，因为我无需操心 Markdown 解析的问题：remark 免费提供了解析功能，让我可以在此基础上进行开发。
> 
> —— [约翰·奥坦德](https://github.com/johno)，[`mdx-js/mdx`](https://unifiedjs.com/explore/project/mdx-js/mdx/) 的作者

为了进一步激发大家的想象力，以下是unified中常用的一些插件，它们可以实现一些有趣的功能：

- [`rehype-minify`](https://unifiedjs.com/explore/project/rehypejs/rehype-minify/) — 压缩HTML
- [`rehype-react`](https://unifiedjs.com/explore/package/rehype-react/) — 转换为 Preact、React、Vue 等
- [`rehype-starry-night`](https://github.com/rehypejs/rehype-starry-night) — 对代码应用语法高亮显示
- [`remark-directive`](https://github.com/remarkjs/remark-directive) — 支持指令
- [`remark-gfm`](https://github.com/remarkjs/remark-gfm) — 支持GFM
- [`remark-lint`](https://unifiedjs.com/explore/project/remarkjs/remark-lint/) — 检查 Markdown 代码样式
- [`remark-toc`](https://unifiedjs.com/explore/package/remark-toc/) — 生成目录
- [`retext-equality`](https://unifiedjs.com/explore/package/retext-equality/) — 检查可能存在的不当言辞
- [`retext-repeated-words`](https://unifiedjs.com/explore/package/retext-repeated-words/) — 检查`for for`重复词
- [`retext-spell`](https://unifiedjs.com/explore/package/retext-spell/) — 检查拼写
- ...探索所有[rehype](https://github.com/topics/rehype-plugin)、[remark](https://github.com/topics/remark-plugin)或[​​retext](https://github.com/topics/retext-plugin)插件

## 总结

- unified提供了一个友好的界面，并由一个插件生态系统提供支持，该生态系统专为创建和操作内容而构建；您无需担心解析问题，因为您可以使用现有的基本组件进行构建。
- 有数百种插件可供使用。
- [remark](https://unifiedjs.com/explore/project/remarkjs/remark/) 用于 Markdown，
  [rehype](https://unifiedjs.com/explore/project/rehypejs/rehype/)用于HTML，
  [retext](https://unifiedjs.com/explore/project/retextjs/retext/)用于自然语言。
- unified的插件管道通常允许您编写一行代码，将一个功能链接到流程中，例如桥接格式（例如 Markdown 到HTML）。

## 下一步

- [使用unified](https://unifiedjs.com/learn/guide/using-unified/)
- [开始使用插件](https://unifiedjs.com/learn/guide/using-plugins/)
- [语法树简介](https://unifiedjs.com/learn/guide/introduction-to-syntax-trees/)
