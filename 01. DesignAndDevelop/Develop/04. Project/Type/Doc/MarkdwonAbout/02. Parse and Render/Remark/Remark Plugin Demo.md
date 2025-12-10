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
