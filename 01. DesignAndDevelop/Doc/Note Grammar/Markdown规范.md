---
create_time: 2024-10-13
---

# Markdown规范

（注意：本篇笔记具有时效性，编辑于 2024-10-13）

关于md标准

有个东西叫 CommonMark，最原始最基础的，见 https://spec.commonmark.org/0.31.2/ (最新的24年1月)

然后又有个东西叫 GFM（Github Flavored Markdown），见 https://github.github.com/gfm/ 或 https://gfm.docschina.org/zh-hans/ (19年标准)
官方介绍：`GFM is a strict superset of CommonMark.` (GFM是CommonMark的严格超集)

callout语法在 GFM 规范 (22年后实际支持，但并没有修改规范文档，最新规范依然是19年的V0.29版本) 里叫 GFM Alert，ComonMark 没有这个东西

然后obsidian的callout又不相当于 GFM Alert，例如 GFM Alert 不允许在 `[!note]` 后面添加加标题，或者添加是否折叠的标志，也不允许嵌套。callout是ob创造的语法，ob似乎也没有去写什么规范文档

mermaid 和 latex 也并不是markdown的标准，只是这两分别使用的mermaid库，以及katex/mathjax，轻巧快速，被大多数md编辑器所内置（并非全部内置，vscode/github/gitee有，但clion(jetbrant)/一些非md软件的md编辑器(trello/飞书)不内置）

还有诸如上下标、高亮等，都是非标准的语法。虽然像高亮支持得比较广泛了，但也没有被添加到文档标准当中。

除了这些小修小补的扩展外，还有一些改动较多的，也需要借助自己的md解释器来渲染的。例如 kramdown 等

---

总之，已有的规范文档虽然也有更新，但基本不新增任何语法，都是在原有规范的基础上进一步讨论细节或其他。

而这些旧规范无法满足现代很多需求，但似乎由于历史遗留问题或者为了追求稳定性和易实现性，没有添加很多东西。

另外，其实不需要追求纯原生，有些东西哪怕99%的md软件都支持，他也是非标准的。

## 总结

[table]

- .md
  - CommonMark
    - https://spec.commonmark.org/0.31.2/
  - GFM
    (Github Flavored Markdown, Github风格Md)
    - https://github.github.com/gfm/ 或 https://gfm.docschina.org/zh-hans/ (19年标准)
  - OFM
    (Obsidian Flavored Markdown, Obsidian风格Md)
    - https://help.obsidian.md/obsidian-flavored-markdown
  - Kramdown
    - https://kramdown.gettalong.org/
      有点像md + markdown-it-attrs 风格
- 非.md的类md
  - .mdx
    - https://mdxjs.com/
      md + 组件，追求功能性。将 markdown 和 JSX 语法完美地融合在一起
  - .adoc
    - https://asciidoc.org/
    - Github支持识别渲染，全名 AsciiDoc
  - .rst
    - reStructuredText，常用于Python社区
    - Github支持识别渲染
  - .qd
    - quarkdown
  - .qmd
    - Quarto
  - .mdz
    - https://www.bilibili.com/video/BV1PZ7hzdEUD
  - MediaWiki
    - [语法-整理](https://dapeng.li/learning/mediawiki/)
    - [语法](https://www.mediawiki.org/wiki/Help:Formatting/zh)
    - [语法-表格](https://www.mediawiki.org/wiki/Help:Tables)
    - Github支持识别渲染
  - Wikipedia
    - Wikipedia 的 Pipe 语法
    - 语法和功能性都很接近html，只比html简化一点。所以得到了强大的功能和难写的语法
    - [语法](https://zh.wikipedia.org/wiki/Help:%E7%9B%AE%E5%BD%95)
      [语法-表格](https://zh.wikipedia.org/wiki/Help:%E8%A1%A8%E6%A0%BC)
- Json类
  - .ipynb
- LaTeX类
  - .tex
    - LaTeX
  - .typ
    - Typst
- 富文本
  - .docx
- 不知道 (未验证)
  - .org
    - Org-mode，主要用于Emacs用户，支持笔记和任务管理
      Github可能支持渲染?
  - .textile
    - 轻量标记语言
  - 其他
    - .rdoc .pod .creole .mediawiki

在Github仓库中编辑Wiki可以看到 Github 所支持的格式:

- AsciiDoc
- Creole
- Markdown
- MediaWiki
- Org-mode
- Pod
- RDoc
- Textile
- reStructuredText

![wiki-edit-mode-dropdown.webp](./assets/wiki-edit-mode-dropdown.webp)

