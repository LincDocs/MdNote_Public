# README

## 参考资料

### 开发无关，仅使用

- 通用资料
  - [Github开源地址](https://github.com/markdown-it/markdown-it)
    - [parser_block.mjs rules](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.mjs#L22-L36)
    - [parser_core.mjs rules](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.mjs#L19-L29)
    - [parser_inline.mjs rules](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.mjs#L28-L41)
  - [Github文档](https://github.com/markdown-it/markdown-it/tree/master/docs)
  - [【Github.io】Markdown-it API 文档](https://markdown-it.github.io/markdown-it/)
  - 中文文档
      - 主页文档：https://markdown-it.docschina.org/
      - 在主页上方还有其他页：[构造](https://markdown-it.docschina.org/architecture.html)、[开发者建议](https://markdown-it.docschina.org/development.html)、[安全](https://markdown-it.docschina.org/security.html)、[DocsChina主页](https://docschina.org/)、[【Github】markdown-it](https://github.com/markdown-it/markdown-it) 
- 使用资料
  - 中文文档：https://markdown-it.docschina.org/

### 插件开发者资料

- 官方资料
  - [/markdown-it/docs/](https://github.com/markdown-it/markdown-it/tree/master/docs)，Github插件开发文档
    - [examples/](https://github.com/markdown-it/markdown-it/blob/master/docs/examples/)
      - [renderer_rules.md](https://github.com/markdown-it/markdown-it/blob/master/docs/examples/renderer_rules.md)，渲染规则
    - [architecture.md](https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md)，解析器架构和设计原则，*好用*
    - [development.md](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md)，插件开发者的一些指南，*好用*
    - security.md，安全 相关
    - 4.0_migration.md，迁移到v4
    - 5.0_migration.md，迁移到v5
  - [【Github.io】Markdown-it 官方演示及调试页面](https://markdown-it.github.io/)
    - 使用说明：该演示页面的右侧标签栏有 html、source、debug 三个选项，分别是 html展示、html源码、TokensStream结构。
      *能看TokensStream好用的*，这能很方便地帮助我们开发。
  - 英文文档：https://markdown-it.github.io/markdown-it/（*英文API，好用*）
  - [核心源码](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.mjs)，那个lib文件夹下的都是
- 第三方资料
  - [《markdown-it 中文文档》](https://markdown-it.docschina.org/)，（*中文API，这个也很好用*）
  - ~~[【知乎】markdown-it 原理解析](https://zhuanlan.zhihu.com/p/4595547650)~~
  - [【简书】markdown-it解析](https://www.jianshu.com/p/39ed59f610d4)

### 《博客搭建》冴羽

- 作者主页
  - [GitHub - 作者主页](https://github.com/mqyqingfeng/Blog)，[InfoQ - 作者主页](https://www.infoq.cn/u/yayujs/publish)
  - 最终效果网站：[冴羽的 JavaScript 博客](https://ts.yayujs.com/)
  - 备用链接：例如 [InfoQ - markdown-it 插件如何写（一）](https://xie.infoq.cn/article/16c70bb0f0bfb972d1e5867f6) 或 [markdown-it 插件如何写（一）](https://juejin.cn/post/7055238938092371975) 或 [markdown-it 插件如何写（一）](https://github.com/mqyqingfeng/Blog/issues/253)，这几个的内容是一样的，只是作者在不同的平台发布而已
- 其中，和markdown-it关联的部分：
  - [markdown-it 原理解析](https://github.com/mqyqingfeng/Blog/issues/252)
  - [markdown-it 插件如何写（一）](https://xie.infoq.cn/article/16c70bb0f0bfb972d1e5867f6)
  - [markdown-it 插件如何写（二）](https://xie.infoq.cn/article/7db8be15aa5161a8f36eec348)
  - [markdown-it 插件如何写（三）](https://xie.infoq.cn/article/e36b2ff51c9520688be2581a7)
- 个人吐槽
  - 话说他这个Github文章居然是写在issue里的，神奇……也许是为了方便使用评论功能吧
  - 注意，有一些文章内部链接跳转到 markdown-it Github 源码并出现404的，需要将末尾的 .js 替换成 .mjs

## 优秀的mdit插件

这里主要列举开源的，以便可以去参考源码和学习

### 一些框架的默认插件

[card|addClass(ab-col2)]
- VitePress 默认插件
  [VitePress 默认插件](https://vitepress.dev/zh/guide/markdown#header-anchors)
- VuePress 默认插件
  [VuePress 默认插件](https://marketplace.vuejs.press/zh/plugins/markdown.html)
- Vue 相关mdit插件
  [markdown-it 的 vue 库](https://github.com/ravenq/markdown-it-vue)
  - 插件列表
    - markdown-it
    - markdown-it-emoji
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-footnote
    - markdown-it-deflist
    - markdown-it-abbr
    - markdown-it-ins
    - markdown-it-mark
    - markdown-it-katex
    - markdown-it-task-lists
    - markdown-it-highlight
    - markdown-it-latex
    - markdown-it-container
    - markdown-it-github-toc
    - markdown-it-source-map
    - markdown-it-link-attributes
  - 内部插件列表
    - markdown-it-image
    - markdown-it-font-awsome
    - markdown-it-link-attributes
    - markdown-it-highlight
    - markdown-it-plugin-echarts
    - markdown-it-plugin-mermaid
    - markdown-it-plugin-flowchart
- VuePress-Theme-Hope 默认插件
  [VuePress-Theme-Hope 默认插件](https://theme-hope.vuejs.press/zh/guide/markdown/)
  [mdit-plugin官网](https://mdit-plugins.github.io/zh/)
  ![image-20240805125638171](./README.assets/image-20240805125638171.png)

### Github高Star插件

- Github比较高Star的几个：（有专门的主题，可以在 https://github.com/topics/markdown-it-plugin 里看）
  - https://github.com/desenmeng/markdown-it-plugin，“a markdown-it plugin demo”，足够简单，只有一个js文件
  - https://github.com/geekplux/markvis，1.6k，围栏代码块vis触发，显示柱形图/波形图
  - [markdown-it/markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)， 表情符号语法插件markdown-it markdown解析器
  - [waylonflinn/markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex)， 添加数学到您的Markdown与KaTeX插件Markdown-it
  - [markdown-it/markdown-it-container](https://github.com/markdown-it/markdown-it-container)， markdown-it markdown解析器的隔离容器插件
  - [executablebooks/markdown-it-py](https://github.com/executablebooks/markdown-it-py)， Markdown解析器，做得对。100% CommonMark支持，扩展，语法插件和高速。现在在Python中!
  - [valeriangalliat/markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)， 一个markdown-it插件，为标题和可选的永久链接添加' id '属性。
  - [markdown-it-collapsible](https://github.com/Bioruebe/markdown-it-collapsible)，用 `+++` 标记代替 HTML `<details>` and `<summary>` 来设置可折叠区域
  - [markdown-it-color](https://github.com/nkjmsss/markdown-it-color)，内联颜色
  - [markdown-it-markmap](https://github.com/deiv/markdown-it-markmap)，脑图
  - (个人研究推荐)
    - [markdown-it-multimd-table](https://www.npmjs.com/package/markdown-it-multimd-table)， 扩展表格
    - [markdown-it-link-to-card](https://github.com/luckrya/markdown-it-link-to-card)，将链接转换为卡片
    - [markdown-it-obsidian-callouts](https://github.com/ebullient/markdown-it-obsidian-callouts)，Obsidian的callout语法

### 其他

- Npmjs比较高分的几个：
  - 略，npm自己搜
- 其他
  - [adam-p/markdown-here](https://github.com/adam-p/markdown-here)， 谷歌Chrome, Firefox和雷鸟扩展，让您在Markdown中编写电子邮件并在发送前渲染它。
  - [hexojs/hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)， Markdown-这是一个Markdown解析器，操作正确。一个更快和CommonMark兼容替代Hexo。

## 优秀的mdit插件 (旧)

### 可参考

#### table-extended

Obsidian插件：[aidenlx/table-extended](https://github.com/aidenlx/table-extended)

里面提到：

> 由于当前黑曜石 API 的限制，内置的 markdown解析器 不可配置。相反，这个插件包括一个独立的 Markdown 解析器 [markdown-it](https://markdown-it.github.io/) 和插件 [markdown-it-multimd-table](https://github.com/RedBug312/markdown-it-multimd-table)，表格部分和带有语言标签 `tx` 的代码块内的文本被传递给 `markdown-it` 。
>
> 然而，内部链接和嵌入被提取并传递给黑曜石，因此黑曜石的核心特征保持不变。
>
> 请注意，该插件的行为可能与官方的 MultiMarkdown 编译器和黑曜石的解析器不同，如果合理的输入出现意外结果，请提出问题。

### 不符合需求

#### keep-it-markdown

[djsudduth/keep-it-markdown](https://github.com/djsudduth/keep-it-markdown)

> 使用非官方的Keep API将 **Google Keep笔记动态转换为** 黑曜石，Logseq，Joplin和Concept的markdown。此外，将简单的markdown笔记导入回Google Keep。

#### markdown-it-obsidian-plus

Markdown-it插件：[klequis/markdown-it-obsidian-plus](https://github.com/klequis/markdown-it-obsidian-plus)

>  markdown-it插件将 obsidian markdown 转换为HTML

不过似乎和 Obsidian 没有什么关系

#### markdown-it-obsidian

[alexjv89/markdown-it-obsidian](https://github.com/alexjv89/markdown-it-obsidian)

>  将 Obsidian 的 wiki 链接转化为 markdown链接



































