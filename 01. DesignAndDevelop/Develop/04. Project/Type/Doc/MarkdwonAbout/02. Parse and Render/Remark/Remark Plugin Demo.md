# Remark Plugin Demo

## 官方推荐的四个典型插件

> [!quote]
> 
> remark 插件用于处理 Markdown 内容。一些常见的例子有：
> 
> - [`remark-gfm`](https://github.com/remarkjs/remark-gfm) — 添加对 GFM（GitHub 风格 Markdown）的支持
> - [`remark-lint`](https://github.com/remarkjs/remark-lint) — 检查 Markdown 并警告不一致之处
> - [`remark-toc`](https://github.com/remarkjs/remark-toc) — 生成toc目录
> - [`remark-rehype`](https://github.com/remarkjs/remark-rehype) 将 Markdown 转换为 HTML
> 
> 这些插件堪称典范，因为它们的功能和实现方式截然不同，分别是:
> 
> - 扩展 Markdown 语法
> - 检查树
> - 更改树
> - 转换为其他语法树

### 扩展 Markdown 语法 (remarkjs/remark-gfm)

不过这里的逻辑都在两个子库 mdast-util-gfm 和 micromark-extension-gfm 中

```js
/**
 * @import {Root} from 'mdast'
 * @import {Options} from 'remark-gfm'
 * @import {} from 'remark-parse'
 * @import {} from 'remark-stringify'
 * @import {Processor} from 'unified'
 */

import {gfmFromMarkdown, gfmToMarkdown} from 'mdast-util-gfm'
import {gfm} from 'micromark-extension-gfm'

/** @type {Options} */
const emptyOptions = {}

/**
 * Add support GFM (autolink literals, footnotes, strikethrough, tables,
 * tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkGfm(options) {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor<Root>} */ (this)
  const settings = options || emptyOptions
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(gfm(settings))
  fromMarkdownExtensions.push(gfmFromMarkdown())
  toMarkdownExtensions.push(gfmToMarkdown(settings))
}
```

### 检查树

### 更改树 - toc

不过都在 mdast-util-toc 子库中

```js
/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-toc').Options} Options
 */

import {toc} from 'mdast-util-toc'

/**
 * Generate a table of contents (TOC).
 *
 * Looks for the first heading matching `options.heading` (case insensitive),
 * removes everything between it and an equal or higher next heading, and
 * replaces that with a list representing the rest of the document structure,
 * linking to all further headings.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkToc(options) {
  const settings = {
    ...options,
    heading: (options && options.heading) || '(table[ -]of[ -])?contents?|toc',
    tight: options && typeof options.tight === 'boolean' ? options.tight : true
  }

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    const result = toc(tree, settings)

    if (
      result.endIndex === undefined ||
      result.endIndex === -1 ||
      result.index === undefined ||
      result.index === -1 ||
      !result.map
    ) {
      return
    }

    tree.children = [
      ...tree.children.slice(0, result.index),
      result.map,
      ...tree.children.slice(result.endIndex)
    ]
  }
}
```

### 转换为其他语法树 (rehype)

md 2 html

## visit

### Demo - 一级标题后面添加 🚀 图标

```js
/** 作用: 所有的一级标题后面自动加上 🚀 图标 */

import { type QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root } from "mdast"

// 这是标准的 remark 插件结构
const remark_rocket_heading = () => {
  return (tree: Root, _file: any) => {
    // 遍历所有的 heading (标题) 节点
    visit(tree, "heading", (node) => {
      // 只处理一级标题 (depth === 1)
      if (node.depth === 1) {
        // 找到标题中的文本节点
        const textNode = node.children.find((n) => n.type === "text")
        
        // 如果存在文本，追加 emoji
        if (textNode && "value" in textNode) {
          textNode.value += " 🚀"
        }
      }
    })
  }
}

// 这是 Quartz 的 Transformer 插件定义
export const RocketHeading: QuartzTransformerPlugin = () => {
  return {
    name: "RocketHeading",
    markdownPlugins() {
      return [
        remark_rocket_heading,
      ]
    },
  }
}
```

### ~~Demo - 一级标题后面添加 🚀 图标~~

弃用，非标准的 remark 插件

```js
/** 作用: 所有的一级标题后面自动加上 🚀 图标 */

import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root } from "mdast"

export const RocketHeading: QuartzTransformerPlugin = () => {
  return {
    name: "RocketHeading",
    markdownPlugins() {
      return [
        () => {
          // 这是标准的 remark 插件结构
          return (tree: Root, _file) => {
            // 遍历所有的 heading (标题) 节点
            visit(tree, "heading", (node) => {
              // 只处理一级标题 (depth === 1)
              if (node.depth === 1) {
                // 找到标题中的文本节点
                const textNode = node.children.find((n) => n.type === "text")
                
                // 如果存在文本，追加 emoji
                if (textNode && "value" in textNode) {
                  textNode.value += " 🚀"
                }
              }
            })
          }
        },
      ]
    },
  }
}
```

## Remark-directive

https://github.com/remarkjs/remark-directive/blob/main/lib/index.js

```js
/**
 * @import {} from 'mdast-util-directive'
 * @import {Root} from 'mdast'
 * @import {} from 'remark-arse'
 * @import {} from 'remark-stringify'
 * @import {Processor} from 'unified'
 */

import {directiveFromMarkdown, directiveToMarkdown} from 'mdast-util-directive'
import {directive} from 'micromark-extension-directive'

/**
 * Add support for generic directives.
 *
 * ###### Notes
 *
 * Doesn’t handle the directives: create your own plugin to do that.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkDirective() {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor<Root>} */ (this)
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(directive())
  fromMarkdownExtensions.push(directiveFromMarkdown())
  toMarkdownExtensions.push(directiveToMarkdown())
}
```

### 在 Quartz 中

remark-directive 插件的内容如上

在 quartz 的插件系统中，对应的这种插件应该怎么写？

如何应用 remark-directive？如果不直接用这个，又如何应用
```js
import {directiveFromMarkdown, directiveToMarkdown} from 'mdast-util-directive'
import {directive} from 'micromark-extension-directive'
```
这三个导入内容来在 quartz 中实现 `:::` 语法

gemini 2.5 pro:

好的，我来为你解答如何在 Quartz 中集成 `remark-directive` 插件，或者直接使用其核心模块来实现 `:::` 指令语法。

Quartz 的插件系统是基于 `unified` 生态的，因此集成 remark 或 micromark 插件非常方便。

### 方案一：直接使用 `remark-directive` 插件

在 Quartz 中，你可以通过修改 `quartz/plugins/transformers/lastmod.ts`（或者创建一个新的 transformer 插件）来添加 remark 插件。但更推荐的方式是在 `quartz.config.ts` 文件中进行配置，这样更符合 Quartz 的设计哲学，也便于管理。

以下是在 `quartz.config.ts` 中配置 `remark-directive` 的方法：

1. **安装依赖：**
    ```bash
    npm install remark-directive
    ```

2. **修改 `quartz.config.ts`：**

    你需要在 `quartz.config.ts` 的 `transformer` 插件配置中，找到 `Plugin.FrontMatter()` （或者其他处理 Markdown 的插件），并在其 `markdownPlugins` 选项中添加 `remark-directive`。

    ````typescript name=quartz.config.ts
    import { QuartzConfig } from "./quartz/cfg"
    import * as Filenames from "./quartz/plugins/filename"
    import * as PrettyLinks from "./quartz/plugins/prettylinks"
    import * as Static from "./quartz/plugins/static"
    import * as Jsdelivr from "./quartz/plugins/jsdelivr"
    import * as CrawlLinks from "./quartz/plugins/crawl"
    import * as NextPrev from "./quartz/plugins/nextprev"
    import * as LastModified from "./quartz/plugins/lastmod"
    import * as Created from "./quartz/plugins/created"
    import * as TagPage from "./quartz/plugins/tags"
    import * as ContentIndex from "./quartz/plugins/contentIndex"
    import * as Description from "./quartz/plugins/description"
    import * as OxHugo from "./quartz/plugins/oxhugogo"
    import * as Git from "./quartz/plugins/git"
    import * as ExternalLinks from "./quartz/plugins/external"
    import * as HardLineBreaks from "./quartz/plugins/hardbreaks"
    import * as SyntaxHighlighting from "./quartz/plugins/syntax"
    import * as NotFound from "./quartz/plugins/404"
    import * as OldContent from "./quartz/plugins/old"
    import * as RSS from "./quartz/plugins/rss"
    import { Themes } from "./quartz/plugins/theme"
    import { IconFolderOptions } from "./quartz/plugins/iconfolder"
    import remarkDirective from "remark-directive" // [!code hl]
    
    const config: QuartzConfig = {
      configuration: {
        pageTitle: "🪴 Quartz 4.0",
        enableSPA: true,
        enablePopovers: true,
        analytics: {
          provider: "plausible",
        },
        baseUrl: "quartz.jzhao.xyz",
        ignorePatterns: ["private", "templates", ".obsidian"],
        defaultDateType: "created",
        theme: {
          typography: {
            header: "Schibsted Grotesk",
            body: "Source Sans Pro",
            code: "IBM Plex Mono",
          },
          colors: {
            lightMode: {
              light: "#faf8f8",
              lightgray: "#e5e5e5",
              gray: "#b8b8b8",
              darkgray: "#4e4e4e",
              dark: "#2b2b2b",
              secondary: "#284b63",
              tertiary: "#84a59d",
              highlight: "rgba(143, 159, 169, 0.15)",
            },
            darkMode: {
              light: "#161618",
              lightgray: "#393639",
              gray: "#646464",
              darkgray: "#d4d4d4",
              dark: "#ebebec",
              secondary: "#7b97aa",
              tertiary: "#84a59d",
              highlight: "rgba(143, 159, 169, 0.15)",
            },
          },
        },
      },
      plugins: {
        emitters: [
          NextPrev(),
          CrawlLinks({ slackWebhook: process.env.SLACK_WEBHOOK }),
          RSS(),
          Static(),
          Jsdelivr(),
          NotFound(),
          OldContent(),
        ],
        filters: [PrettyLinks(), Git(), ExternalLinks()],
        transformers: [
          SyntaxHighlighting(),
          TagPage(),
          ContentIndex(),
          LastModified(),
          Created(),
          Description(),
          HardLineBreaks(),
          OxHugo(),
          // 在这里添加 remark-directive
          {
            displayName: "Directives",
            plugin: () => {
              // 你可以在这里创建一个 transformer 插件，但对于 remark 插件，更简单的方式是使用下面的方法
              return {}
            },
          },
        ],
        integrators: [],
      },
    }
    
    // 在这里配置 markdown 插件 // [!code hl]
    config.plugins.transformers.push(
      (config.plugins.transformers.find(
        (plugin) => plugin.displayName === "Syntax Highlighting",
      ) ?? {
        markdownPlugins: [],
      }).markdownPlugins.push(remarkDirective) && config.plugins.transformers[0],
    )
    
    // 如果你没有 SyntaxHighlighting 插件，可以直接这样添加
    // config.plugins.transformers.push({
    //   displayName: "FrontMatter",
    //   markdownPlugins: [[remarkDirective]],
    // })
    
    export default config
    ````

    一个更清晰、更推荐的做法是直接在 `FrontMatter` 插件的定义处添加：

    ```typescript name=quartz.config.ts
    // ... imports
    import remarkDirective from "remark-directive"
    
    const config: QuartzConfig = {
      // ...
      plugins: {
        // ...
        transformers: [
          // 假设你正在使用这个插件来处理frontmatter和markdown
          Plugin.FrontMatter({
            markdownPlugins: [
              // 在这里添加 remark-directive
              remarkDirective
            ]
          }),
          // ... 其他 transformer 插件
        ],
        // ...
      },
    }
    
    export default config
    ```

### 方案二：手动集成 `micromark` 和 `mdast-util` 模块

如果你不想引入整个 `remark-directive` 包，或者想要更多自定义控制，可以手动集成 `micromark` 和 `mdast-util` 的模块。这同样在 `quartz.config.ts` 中完成。

1.  **安装依赖：**
    ```bash
    npm install micromark-extension-directive mdast-util-directive
    ```

2.  **修改 `quartz.config.ts`：**

    你需要同时配置 `micromarkPlugins` (用于解析原始文本) 和 `markdownPlugins` (用于处理 AST)。

    ````typescript name=quartz.config.ts
    import { QuartzConfig } from "./quartz/cfg"
    import * as Plugin from "./quartz/plugins"
    
    // 导入需要的模块
    import { directive } from "micromark-extension-directive"
    import { directiveFromMarkdown, directiveToMarkdown } from "mdast-util-directive"
    
    const config: QuartzConfig = {
      configuration: {
        // ...你的其他配置
      },
      plugins: {
        emitters: [
          // ...
        ],
        filters: [
          // ...
        ],
        transformers: [
          Plugin.FrontMatter({
            // markdownPlugins 用于 remark/rehype 插件
            markdownPlugins: [
              // remark-directive 的作用就是做下面的事情
              // 这里我们手动实现
              () => (tree, file) => {
                // 这个函数是 remark 插件，但我们只需要配置下面的 from/to markdown 扩展
                // 所以这里留空
              },
            ],
            // micromarkPlugins 用于底层的解析器
            micromarkPlugins: [directive()],
            // mdast-util-directive 提供了这两个扩展
            fromMarkdownExtensions: [directiveFromMarkdown()],
            toMarkdownExtensions: [directiveToMarkdown()],
          }),
          // ...其他 transformers
        ],
        integrators: [
          // ...
        ],
      },
    }
    
    export default config
    ````

### 如何处理指令？

请注意，`remark-directive` **只负责解析** `:::` 语法并将其转换为 mdast 树中的 `containerDirective`、`leafDirective` 或 `textDirective` 节点。它**不会**为这些指令添加任何样式或功能。

你需要创建另一个 remark 插件来处理这些指令节点，并将它们转换为你需要的 HTML。

**示例：创建一个处理 `::note` 指令的插件**

1.  **创建插件文件 `quartz/plugins/remark-callouts.ts` (示例):**

    ```typescript name=quartz/plugins/remark-callouts.ts
    import { visit } from "unist-util-visit"
    import { h } from "hastscript"
    import { Root } from "mdast"
    
    export const remarkCallouts = () => {
      return (tree: Root) => {
        visit(tree, (node) => {
          if (
            node.type === 'containerDirective' ||
            node.type === 'leafDirective' ||
            node.type === 'textDirective'
          ) {
            if (node.name === 'note') {
              const data = node.data || (node.data = {})
              const hast = h('div', { class: 'callout-note' }, node.children)
    
              data.hName = hast.tagName
              data.hProperties = hast.properties
              data.hChildren = hast.children
            }
          }
        })
      }
    }
    ```

2.  **在 `quartz.config.ts` 中使用这个新插件:**

    ```typescript name=quartz.config.ts
    // ...
    import remarkDirective from "remark-directive"
    import { remarkCallouts } from "./quartz/plugins/remark-callouts"
    
    // ...
          Plugin.FrontMatter({
            markdownPlugins: [
              remarkDirective,
              remarkCallouts // 在 remark-directive 之后使用
            ]
          }),
    // ...
    ```

3.  **添加 CSS 样式:**

    在你的 CSS 文件中 (例如 `quartz/styles/custom.scss`)，为 `.callout-note` 添加样式：
    ```css
    .callout-note {
      padding: 1rem;
      border-left: 4px solid #4a90e2;
      background-color: #f0f7ff;
      margin: 1rem 0;
    }
    ```

现在，当你在 Markdown 文件中使用以下语法时：

````markdown
:::note
这是一个笔记。
:::
````

它将被渲染成一个带有自定义样式的 `div` 元素。你可以扩展 `remarkCallouts` 插件来支持更多类型的指令，如 `warning`, `tip` 等。

## Remark wiki link

解释一下 quartz 中的wiki link插件的实现？ 其他细节可以不需要说，主要专注于：怎么将 `[[xxx]]` **替换成** 对应的 markdown 内容所渲染的 html。并请给出几个关键步骤所对应的源码链接

整个转换过程可以分为以下几个关键步骤：

1. **解析 Markdown，生成 AST**：当 Quartz 处理一个 Markdown 文件时，它首先用 Remark 将文本解析成一个 `mdast` (Markdown Abstract Syntax Tree)。在这个树中，每个 Markdown 元素（如标题、段落、列表）都是一个节点。
    
2. **识别 Wikilink 语法**：标准的 Markdown 没有 `[[wikilink]]` 语法。因此，Quartz 使用了一个名为 `remark-wiki-link` 的 Remark 插件来扩展语法。这个插件的作用是在解析阶段识别出 `[[...]]` 模式，并在 AST 中创建一个特殊的节点，通常类型为 `wikiLink`。
    
3. **遍历 AST 并转换 `wikiLink` 节点**：这是实现替换功能的核心。Quartz 的 `Plugin.Transformers.WikiLinks` 插件会遍历 AST。当它遇到一个 `wikiLink` 节点时，它会执行以下操作：
    
    - **解析链接目标**：从 `wikiLink` 节点中提取出链接的文本，例如 "xxx"。
    - **解析别名（Alias）**：处理 `[[xxx|别名]]` 这样的语法，提取出最终要显示的文本。
    - **解析嵌入（Embed/Transclusion）**：检查链接是否以 `!` 开头，即 `![[xxx]]`。这是区分普通链接和内容嵌入的关键。
    - **路径解析**：插件会根据链接目标 "xxx" 在所有已处理的文件中查找匹配项。它会尝试将 "xxx" 标准化并与所有 Markdown 文件的路径进行匹配，从而找到目标文件的唯一标识（slug）。
    - **节点替换**：
        - **对于普通链接 (`[[xxx]]`)**：插件会将 `wikiLink` 节点替换成一个标准的 `html` 节点，其内容是一个 `<a>` 标签，例如 `<a href="/xxx">xxx</a>`。`href` 的值是根据第4步解析出的 slug 生成的。
        - **对于内容嵌入 (`![[xxx]]`)**：这正是你问题的核心。插件不会生成 `<a>` 标签。相反，它会将 `wikiLink` 节点替换为一个 `html` 节点，其内容是目标 Markdown 文件（`xxx.md`）**已经被渲染后**的 HTML 内容。这个过程通常被称为“**transclusion**”（嵌入）。



## OFM (Obsidian 风格 Markdown)



