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

## Remark-directive (`:::`)

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

### 核心代码逻辑

这个功能的代码主要位于 `quartz/plugins/transformers/wikilinks.ts` 文件中。以下是其核心逻辑的简化说明：

1. **插件入口**: 插件导出一个 `WikiLinks()` 函数，它返回一个 Remark 插件的结构。
2. **`visitor` 函数**: 插件内部定义了一个 `visitor` 函数，使用 `unist-util-visit` 库来遍历 AST。
3. **节点处理**:
    - `visitor` 函数专门查找类型为 `wikiLink` 的节点。
    - 对于每个 `wikiLink` 节点，它会检查 `node.data.isEmbed` 属性（这个属性由 `remark-wiki-link` 在解析 `![[...]]` 时设置）。
    - **如果是嵌入 (Embed)**:
        - 它会根据链接目标查找对应的文件。
        - 如果找到文件，它会读取该文件的 `html` 内容（这个 HTML 是 Quartz 在处理那个文件时已经生成并缓存了的）。
        - 然后，它将当前的 `wikiLink` 节点替换为一个 `html` 节点，`value` 就是读取到的 HTML 字符串。
    - **如果是普通链接 (Link)**:
        - 它会生成一个指向目标页面的 URL。
        - 然后将 `wikiLink` 节点替换为一个 `html` 节点，`value` 是一个完整的 `<a>...</a>` 标签字符串。

### 总结

简单来说，Quartz 通过以下流水线实现了这个功能：

**`[[xxx]]` (链接):** `Markdown Text` → `Remark Parser` + `remark-wiki-link` → `AST with 'wikiLink' node` → `Quartz WikiLinks Transformer` → `AST with 'html' node (<a> tag)` → `HTML File`

**`![[xxx]]` (嵌入/替换):** `Markdown Text` → `Remark Parser` + `remark-wiki-link` → `AST with 'wikiLink' node (isEmbed: true)` → `Quartz WikiLinks Transformer` (查找并注入 `xxx.md` 的渲染结果) → `AST with 'html' node (content of xxx.html)` → `HTML File`

这种基于 AST 的处理方式非常灵活和强大，因为它不是简单的字符串替换，而是在结构层面进行操作，从而能够优雅地处理复杂的嵌套和渲染逻辑。

### Remark wiki link 源码

请给出几个关键步骤所对应的源码链接

gemini 2.5 pro: (部分内容已人工修复)

当然，以下是核心步骤及其对应的源码链接。

为了清晰起见，我们将追溯从 Quartz 的插件配置文件到其依赖的 Remark 插件内部实现。

> #### 第 1 步：Quartz 启用并配置 Wikilink 插件

首先，Quartz 在其 `plugins/transformers/wikilinks.ts` 文件中定义和配置这个功能。这里的代码告诉 Quartz 如何使用 `remark-wiki-link` 插件，并为其提供解析链接、处理别名等所需的配置。

(gpt给的不对，这里是人工修正答案)

- **源码链接**: [`quartz/plugins/transformers/ofm.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/ofm.ts#L34)

先是 quartz/quartz.config.ts

```typescript
const config: QuartzConfig = {
  configuration: {...}
  plugins: {
    transformers: [
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
    ],
    filters: [...],
    emitters: [...],
  }
}
export default config
```

然后是 https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/ofm.ts#L176

```typescript
export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  ...
  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src) {
      // 预转换wiki链接（将锚点固定到可能包含非法语法（如代码块、LaTeX）的内容上）
      if (opts.wikilinks) {
        // 首先替换表格内的所有维基链接
        // 再将所有其他维基链接替换掉
      }
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = []
      plugins.push(() => {
        return (tree: Root, file) => {
          if (opts.wikilinks) {
            //
          }
          // ... 填充plugins
          mdastFindReplace(tree, replacements)
        }
      })
      // ... 填充plugins
      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw]
      // ... 填充plugins
      return plugins
    },
    externalResources() {
      const js: JSResource[] = []
      const css: CSSResource[] = []
      // ... 填充 js 和 css
      return { js, css }
    },
  }
}
```

- **关键点**:
    - `remarkWikiLink`: 这是实际处理 Wikilink 语法的第三方 Remark 插件。
    - `pageResolver`: 这是 Quartz 传给 `remark-wiki-link` 的一个函数，用来根据 `[[链接目标]]` 中的 "链接目标" 字符串，查找对应的文件路径。这是实现链接的关键。

> #### 第 2 步：解析 `[[wikilink]]` 语法 (Micromark)

`remark-wiki-link` 插件本身依赖 `micromark-extension-wiki-link` 来实现最底层的语法识别。这个扩展负责在文本中找到 `[[...]]` 模式，并将其标记为一个 `wikiLink` token。

- **源码链接**: [`micromark-extension-wiki-link/index.js`](https://github.com/landakram/micromark-extension-wiki-link/blob/master/src/index.js#L26)

```javascript
// micromark-extension-wiki-link/index.js

// ...

function tokenize(effects, ok, nok) {
  return start

  function start(code) {
    // ... 寻找 '[['
    effects.enter('wikiLink')
    effects.enter('wikiLinkMarker')
    effects.consume(code) // consume '['
    return open
  }

  // ... (状态机，解析中间的文本和 ']]')
}
```
- **关键点**:
    - 这是一个底层的词法分析器扩展，它只负责识别语法，不关心链接指向哪里。
    - 它将识别出的内容包装成一个 `wikiLink` 类型的 token，交给上层处理。

> #### 第 3 步：转换 AST 节点 (Remark)

这是最核心的一步。`remark-wiki-link` 插件接收 `micromark` 生成的 AST，找到 `wikiLink` 节点，然后根据配置决定如何转换它。

代码会遍历 AST，当遇到一个 `wikiLink` 节点时，它会：
1. 调用 `pageResolver` (由 Quartz 提供) 来查找文件的真实路径 (`permalink`)。
2. 检查这个链接是否是“嵌入”模式 (transclusion)，即 `![[...]]`。
3. 如果文件存在：
    - **对于普通链接 `[[...]]`**：将其转换为一个标准的 HTML `<a>` 标签。
    - **对于嵌入链接 `![[...]]`**：将节点替换为一个 `html` 类型的节点，其内容就是被链接文件的 Markdown **渲染后的 HTML**。

- **源码链接**: [`remark-wiki-link/index.js`](https://github.com/landakram/remark-wiki-link/blob/main/index.js#L76-L113)

```javascript
// remark-wiki-link/index.js

// ...

visit(tree, 'wikiLink', function (node) {
  // ...

  // 1. 调用 pageResolver 获取路径
  let permalink = pageResolver(node.data.alias)
  // ...

  if (permalink) {
    if (node.data.isEmbed) { // 2. 检查是否是 ![[...]]
      // 3. (嵌入)
      // ...
      // 获取嵌入内容
      let content = fs.readFileSync(path.join(embedRoot, permalink), 'utf-8')
      // ...
      // 递归处理嵌入内容的 Markdown
      let file = processor.processSync(content)
      // 将节点类型变为 html，内容为渲染后的 HTML
      node.type = 'html'
      node.value = file.value

    } else {
      // 3. (普通链接)
      // ...
      // 创建一个 <a> 标签
      node.type = 'link'
      node.url = hrefTemplate(permalink)
      // ...
    }
  } 
  // ...
})
```

- **关键点**:
  - `visit(tree, 'wikiLink', ...)`: 这是遍历 AST 并找到所有 `wikiLink` 节点的地方。
  - `node.data.isEmbed`: 判断是否为 `![[...]]` 的关键。
  - `processor.processSync(content)`: 这是实现**内容嵌入**的核心。它读取目标文件的 Markdown 内容，并通过一个新的 Markdown 处理器实例 (`processor`) 将其转换为 HTML。
  - `node.type = 'html'` 和 `node.value = file.value`: 这是最终的替换操作，将 `![[...]]` 节点从 AST 中替换为一个包含完整渲染后 HTML 的节点。

通过这三个步骤，Quartz 及其生态系统中的工具链协作，将一个简单的 `[[wikilink]]` 文本标记，高效地转换为了功能丰富的超链接或嵌入式内容。

## OFM (Obsidian 风格 Markdown)



