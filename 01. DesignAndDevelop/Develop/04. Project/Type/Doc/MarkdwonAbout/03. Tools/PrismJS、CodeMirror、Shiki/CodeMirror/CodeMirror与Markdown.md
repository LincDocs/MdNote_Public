---
create_time: 2025-06-06
Author: LincZero
---
# CodeMirror与Markdown

## codemirror

- cm5 repo: https://github.com/codemirror/codemirror5
- cm5 文档: http://codemirror.net/5/
- cm6 repo: 似乎没找到，难道cm6不开源？
- cm6 文档: https://codemirror.net/docs/guide/

usage (cm6)

```javascript
import {EditorState} from "@codemirror/state"
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"

let startState = EditorState.create({
  doc: "Hello World",
  extensions: [keymap.of(defaultKeymap)]
})

let view = new EditorView({
  state: startState,
  parent: document.body
})
```

## codemirror/lang-markdown

参考:

- [codemirror/lang-markdown](https://github.com/codemirror/lang-markdown) ⭐98

usage

```ts
import { EditorView, basicSetup } from "codemirror"
import { markdown } from "@codemirror/lang-markdown"

const view = new EditorView({
  parent: document.body,
  doc: `*CodeMirror* Markdown \`mode\``,
  extensions: [basicSetup, markdown()]
})
```

## obsidian demo

甚至结合obsidian

```ts
import {
	WorkspaceLeaf, MarkdownView, MarkdownEditView,
	ViewState, livePreviewState, editorEditorField
} from 'obsidian';
import { basicSetup } from "@codemirror/basic-setup";
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { markdown } from "@codemirror/lang-markdown";
import HyperMd from 'hypermd'

...

// Strategy 1 - import { EditorView } from '@codemirror/view';, but it is difficult get all ob extensions.
const state = EditorState.create({
  doc: this.codeblockInfo.source ?? this.codeblockInfo.source_old,
  extensions: [
    basicSetup,
    markdown()
  ]
  // extensions: livePreviewState
});

// 在你的 div (container) 内挂载 EditorView
const view = new EditorView({
  state,
  parent: divContent // targetEl
});
```

但不知道