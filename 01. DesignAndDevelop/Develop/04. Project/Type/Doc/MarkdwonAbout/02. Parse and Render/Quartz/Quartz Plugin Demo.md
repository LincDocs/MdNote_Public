---
tags:
  - 源码
---
# Quartz Plugin Demo

所有Transformer插件都可以在以下位置找到: `quartz/plugins/transformers`。如果您决定编写自己的Transformer插件，请不要忘记将其重新导出到以下位置：`quartz/plugins/transformers/index.ts`

最后提醒一句：Transformer 插件相当复杂，所以如果您一开始没能理解也不用担心。您可以先看看内置的 Transformer，了解它们是如何处理内容的，这样就能更好地理解如何实现您想要的功能。

## OFM - 部分, Obsidian 风格 Markdown

插件类别 OFM 插件为示例

quartz/quartz.config.ts

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

quartz/plugins/transformers/ofm.ts

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

## LaTeX demo

take from: https://quartz.jzhao.xyz/advanced/making-plugins#transformers

[LaTeX](https://quartz.jzhao.xyz/plugins/Latex) 插件是一个很好的Transformer插件示例，他借鉴了 `remark` 和 `rehype` 这两个系统的功能：

quartz/plugins/transformers/latex.ts

```ts
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
import { QuartzTransformerPlugin } from "../types"
 
interface Options {
  renderEngine: "katex" | "mathjax"
}
 
export const Latex: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  const engine = opts?.renderEngine ?? "katex"
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      if (engine === "katex") {
        // 如果需要将选项传递给插件，您可以使用 [插件，选项] 这样的元组形式
        return [[rehypeKatex, { output: "html" }]]
      } else {
        return [rehypeMathjax]
      }
    },
    externalResources() {
      if (engine === "katex") {
        return {
          css: [
            {
              // 基本css
              content: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
            },
          ],
          js: [
            {
              // 修复复制行为: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
              src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/copy-tex.min.js",
              loadTime: "afterDOMReady",
              contentType: "external",
            },
          ],
        }
      }
    },
  }
}
```

## WordCount demo, 单词数

Transformer插件的另一个常见功能是解析文件并为该文件添加额外数据：

```ts
export const AddWordCount: QuartzTransformerPlugin = () => {
  return {
    name: "AddWordCount", // 添加单词数量
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => { // tree 是一个 `mdast` 根元素, file 是一个 `vfile`
            const text = file.value
            const words = text.split(" ").length
            file.data.wordcount = words // 往文件数据中添加单词计数
          }
        },
      ]
    },
  }
}
 
 // 向 TypeScript 说明我们正在添加的自定义数据字段，这样其他插件也会知晓这个数据字段的存在
declare module "vfile" {
  interface DataMap {
    wordcount: number
  }
}
```

## findAndReplace api，正则识别斜体

最后，您还可以使用包中的函数 `unist-util-visit` 或包 `findAndReplace` 中的函数对 Markdown 或 HTML AST 进行转换 `mdast-util-find-and-replace`。

```ts
export const TextTransforms: QuartzTransformerPlugin = () => {
  return {
    name: "TextTransforms",
    markdownPlugins() {
      return [() => {
        return (tree, file) => {
          // 正则替换 _text_ 为 "斜体"
          findAndReplace(tree, /_(.+)_/, (_value: string, ...capture: string[]) => {
            const [inner] = capture // `inner` 指的是正则表达式中括号内的内容
            return { // 返回一个 mdast 节点，https://github.com/syntax-tree/mdast
              type: "emphasis",
              children: [{ type: 'text', value: inner }]
            }
          })
        }
      }]
    }
  }
}
```

## visit api, 遍历移除链接内容

最后，您还可以使用包中的函数 `unist-util-visit` 或包 `findAndReplace` 中的函数对 Markdown 或 HTML AST 进行转换 `mdast-util-find-and-replace`。

```ts
export const TextTransforms: QuartzTransformerPlugin = () => {
  return {
    name: "TextTransforms",
    markdownPlugins() {
      return [() => {
        return (tree, file) => {
          // 移除所有链接（将内容替换为仅包含链接内容
          // 按照“类型”字段在 mdast 节点上进行匹配
          // https://github.com/syntax-tree/mdast#link in this example
          visit(tree, "link", (link: Link) => {
            return {
              type: "paragraph"
              children: [{ type: 'text', value: link.title }]
            }
          })
        }
      }]
    }
  }
}
```

