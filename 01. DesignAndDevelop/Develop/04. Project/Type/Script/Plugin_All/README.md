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

## 存储位置

### Obsidian

> #### 存储位置

在库的：`./.Obsidian/plugins/` 里

> #### 存储形式

文件夹 + 编译后的若干源文件

### Google Chrome

> #### 存储位置

扩展文件存放在 Chrome 用户配置文件夹下的 `Extensions` 目录中。你可以通过在地址栏输入 `chrome://version/` 查看“个人资料路径”来找到它。

- Windows: `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions\`
- macOS: `~/Library/Application Support/Google/Chrome/Default/Extensions/`
- Linux: `~/.config/google-chrome/Default/Extensions/`
        
> #### 存储形式

解压后的文件夹。Chrome 会将 `.crx` 文件解压，每个扩展都有一个以其唯一 ID 命名的文件夹，该文件夹内直接包含 `manifest.json` 和其他资源文件。
    
是否复制: 是。Chrome 会在其配置目录中保留一份解压后的副本，原始的 `.crx` 文件在安装后通常不会被保留。

### Mozilla Firefox

> #### 存储位置

扩展文件存放在 Firefox 用户配置文件夹下的 `extensions` 目录中。你可以在地址栏输入 `about:profiles` 来查看“根目录”。

- Windows: `%USERPROFILE%\AppData\Roaming\Mozilla\Firefox\Profiles\{profile}.default\extensions\`
- macOS: `~/Library/Application Support/Firefox/Profiles/{profile}.default/extensions/`
- Linux: `~/.mozilla/firefox/{profile}.default/extensions/`

> #### 存储形式

多为解压后的文件夹，但也可能保留 `.xpi` 文件。Firefox 的存储形式相对灵活。较新的版本通常会将扩展解压到一个以扩展 ID 命名的文件夹中，但有时你也会在 `extensions` 目录下直接看到 `.xpi` 文件。

是否复制: 是。Firefox 会将扩展（解压或 `.xpi` 文件形式）复制到其配置目录中。

### VSCode

> #### 存储位置

所有已安装的扩展都位于用户主目录下的 .vscode/extensions 文件夹中。

- Windows: `%USERPROFILE%\.vscode\extensions`
- macOS: `~/.vscode/extensions`
- Linux: `~/.vscode/extensions`

> #### 存储形式

解压后的文件夹。VS Code 会将 `.vsix` 文件解压，每个扩展都有一个独立的文件夹，命名格式通常为 publisher.extension-name-version（例如 ms-python.python-2024.6.0）

### uTools

> #### 存储位置

- Windows: `%APPDATA%\uTools\plugins` (即 `C:\Users\<用户名>\AppData\Roaming\uTools\plugins`)
- macOS: `~/Library/Application Support/uTools/plugins`
- Linux: `~/.config/uTools/plugins`

> #### 存储形式

`.asar` 压缩包，例如: `3cfd11235ea96a27255f16afcc5a4cda.asar`

解压补充:

之前解包研究过，需要特别的方式解压。
最简单的方式是创建一个项目并使用 asar 解压，如 `package.json` 为:

```json
{
  "name": "Decode-utools",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "unpack": "npx asar extract ./asar/fe42cb4ec919aeb5b3fcb66f9093df42.asar ./unpacked-folder/fe42cb4ec919aeb5b3fcb66f9093df42",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.10.0",
  "dependencies": {
    "@electron/asar": "^4.0.1"
  }
}
```

## 其他

见 `../../../../03. Tools/03. 管理层/03. 多项目管理/05. 插件体系/实例参考/`

