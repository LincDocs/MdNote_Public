---
create_time: 2025-06-06
Author: LincZero
---
# HyperMD

- 仓库: https://github.com/laobubu/HyperMD ⭐1.5k
- 快速开始 (中文): https://github.com/laobubu/HyperMD/blob/master/docs/zh-CN/quick-start.md

> [!warning]
> 注意，截止到今日，HyperMd 已经有7年没更新了。
> 
> 应该也不支持 CodeMirror6 了，只支持5

## 介绍

这是个所见即所得的Markdown编辑库。

好像Obsidian有使用过的痕迹，如很多class会是 `HyperMD-list-line HyperMD-list-line-1 cm-line` 这种。我也是因此而关注之

## Usage

```ts
import {EditorView, basicSetup} from "codemirror"
import {markdown} from "@codemirror/lang-markdown"

const view = new EditorView({
  parent: document.body,
  doc: `*CodeMirror* Markdown \`mode\``,
  extensions: [basicSetup, markdown()]
})
```

## 注意：将已有的 CodeMirror markdown 编辑器转成 HyperMD 模式

如果你的页面上已经有一个基于 CodeMirror（版本 ≥ 5.37.0） 的 Markdown 编辑器了， 你可以很轻松地将它转换为 HyperMD 模式：

**调用 `HyperMD.switchToHyperMD(editor);` 即可**，其中 `editor` 是那个 CodeMirror 编辑器实例

> ⚠️ **还是闭包的问题**...
> 
> CodeMirror 和 HyperMD **必须** 用相同的方法载入：要么用打包器, 要么 RequireJS 或者 `<script>` 标签。 如果不一致，HyperMD 可能会无法正常工作，因为它无法访问正确的 CodeMirror！
> 
> 有的组件 (例如 SimpleMDE, React-CodeMirror) 使用了其 **私有的** CodeMirror 版本, HyperMD 是不支持的。如果要支持的话，可能得花一点功夫…… [(例如 react-codemirror 得这样搞)](https://github.com/laobubu/HyperMD/issues/26#issuecomment-391420190)

此操作会把 `HyperMD.suggestedEditorConfig` 里面的配置逐个应用到你的编辑器上， 如果有不喜欢的配置项，你可以使用 `switchToHyperMD` 的第二个可选参数来覆盖之：

```js
// 举个栗子： 我就是想用 "vim" 按键绑定
HyperMD.switchToHyperMD(editor, {
  keyMap: "vim"
})
```



