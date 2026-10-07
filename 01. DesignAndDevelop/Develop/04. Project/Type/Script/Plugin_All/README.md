---
create_date: 2026-10-08
last_date: 2026-10-08
---
# README

各种插件支持框架：一些共同点

## 插件发布形式

### Obsidian

- `main.js`, `manifest.json`
- (可选) `styles.css`, `data.json`

manifest.json 示例:

```json
{
  "id": "any-menu",
  "name": "AnyMenu",
  "version": "1.2.4",
  "minAppVersion": "1.8.7",
  "description": "A powerful input method assistant / editor assistant. Integrates a variety of quick input tools that can be used in a general text environment. Like quicker input, quicker conversion, quicker search, quicker menu, etc.",
  "author": "LincZero",
  "authorUrl": "https://github.com/LincZero",
  "fundingUrl": {
    "Support Page": "https://github.com/LincZero#thank-you-very-much-for-your-support",
    "中国大陆备用链接": "https://linczero-github-io.pages.dev/MdNote_Other/LincZero/#thank-you-very-much-for-your-support"
  },
  "isDesktopOnly": true
}
```

### Firefox / Chrome

- `.zip` 压缩文件。解压缩情况:
  - docs/
  - icons/ | 图标资源
  - src/
  - manifest.json

manifest.json 示例:

```json
{
  "manifest_version": 3,
  "name": "AnyMenu Helper",
  "version": "1.0",
  "description": "This extension is solely designed to enhance the content-aware functionality of the AnyMenu software in a browser environment.",
  "icons": {
    "48": "icons/border-48.png"
  },

  "browser_specific_settings": {
    "gecko": {
      "id": "any-menu@linczero",
      "strict_min_version": "109.0"
    }
  },

  "permissions": [
    "storage"
  ],

  "options_ui": {
    "page": "src/options.html",
    "open_in_tab": false
  },

  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["src/debug.js", "src/bridge.js", "src/main.js"]
    }
  ]
}
```

### VSCode

(例子: https://github.com/LincDemo/vscode-region-highlighter/releases/tag/1.0.2)

- `.visx` 文件
  (`.vsix` 本质是 Open Packaging Conventions 压缩包，可用 `vsce package` 生成)
  修改为 `zip` 扩展名并解压缩情况：
  - extension/
    - assets/ | 纯图片资源
    - out/    | 编译后的 JS 文件，对应原项目 `src/` 内容
      - extension.js | 入口 js
      - ...
    - test/   | 原 `src/` 里的
    - CHANGELOG.md
    - README.md
    - package.json | `"main": "./out/extension.js",`
    - LICENSE.txt
  - `[Content_Types].xml`
  - extension.vsixmanifest

无 `manifest.json` 文件，确实使用 `package.json` 作为扩展清单。  

`extension.vsixmanifest` 是 VSIX 打包元数据，不是开发时的扩展清单。  
`package.json` 关键字段通常包括：`name`、`displayName`、`description`、`version`、`publisher`、`engines.vscode`、`categories`、`activationEvents`、`main`、`contributes`、`icon`、`repository`、`license`、`files`。  
从较新的 VS Code 版本起，部分 `activationEvents` 可由 `contributes` 自动推断，但显式声明仍常见。  
`.vscodeignore` 用于控制哪些文件不进入 `.vsix`。

入口 js 示例: (这里我展示回编译前 ts 的文件内容)

```ts
import * as vscode from 'vscode'
import { EnumCommands, EnumContributes } from './typings'
import { syncTriggerDecorationRegion } from './core'
import { registerMarkCommand, registerUnMarkCommand } from './command'
import { throttle } from './util'

export function activate(context: vscode.ExtensionContext) {
  const throttleWrapper = throttle(syncTriggerDecorationRegion, 500)

  // initial trigger decorate region
  throttleWrapper()

  vscode.window.onDidChangeActiveTextEditor(() => {
    throttleWrapper()
  }, null, context.subscriptions)

  vscode.workspace.onDidChangeTextDocument(() => {
    throttleWrapper()
  }, null, context.subscriptions)

  vscode.workspace.onDidOpenTextDocument(() => {
    throttleWrapper()
  }, null, context.subscriptions)

  const markCommand = vscode.commands.registerCommand(
    `${EnumContributes.PLUGIN_PREFIX}.${EnumCommands.MARK}`,
    () => { registerMarkCommand() }
  )

  const unmarkCommand = vscode.commands.registerCommand(
    `${EnumContributes.PLUGIN_PREFIX}.${EnumCommands.UNMARK}`,
    () => { registerUnMarkCommand() }
  )

  context.subscriptions.push(markCommand, unmarkCommand)
}
```

### uTools / Quicker 等

略




