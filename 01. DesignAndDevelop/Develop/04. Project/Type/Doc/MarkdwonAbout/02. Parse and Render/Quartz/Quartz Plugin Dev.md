# Quartz Plugin Dev

> [!warning]
> 在此之前，你应该先阅读完 [官方文档-制作自己的插件](https://quartz.jzhao.xyz/advanced/making-plugins) 或 [译-制作自己的插件](译-制作自己的插件.md) 中的内容

## 官方文档

https://quartz.jzhao.xyz/advanced/making-plugins

## 插件类别

插件接口类别有:

- transformers
  - name
  - textTransform
  - markdownPlugins
  - htmlPlugins
  - externalResource
- filters
- emitters

### 代码示例

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
