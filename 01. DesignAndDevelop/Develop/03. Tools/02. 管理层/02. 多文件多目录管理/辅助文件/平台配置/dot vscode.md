---
create_time: 2025-01-09
Author: LincZero
---

# .vscode/

文件夹名为 `.vscode`

其内容可以有：

[dir]

- .vscode/
  - extensions.json | VSCode需要的扩展
  - settings.json   | VSCode相关设置

## 为什么需要分享

这个文件夹有时是需要分享的。例如有的项目是需要依赖 vscode 的插件的……

- 例如：Lint类的插件会希望贡献者遵循相同的代码规范
- 例如：我比较喜欢用的sass插件，将sass转css的行为直接交由IDE完成，就不主要在不同的打包环境下再去安装和配置sass包（不同环境要安装的sass的东西还不同）
  当然，这种方法无法处理 `.vue` 文件中的 `<script lang='ts'>` 部分，还是得老实安装sass依赖

## 创建配置

- 文件夹部分
  - 有的项目会有这个文件夹，但有的项目没有。如果没有可以通过这种方式创建：
    菜单栏运行 > 添加配置。当然，手动创建 `.vscode` 也行
- 填充配置内容
  - 上面的方法可以填充一部分
  - 插件部分的填充
    打开扩展列表，在想要添加的扩展上面 右键 > 添加到工作区建议
    这时会自动创建 `.vscode/extensions.json` 文件并帮你把插件添加进去
  - 对于插件的个性化设置
    如果 `.vscode/extensions.json` 已经记录了该插件，
    那么这一部分也会自动记录在 `.vscode/settings.json` 中

## demo1

这是我 (LincZero) 个人的习惯的配置和使用插件，记一下

### extensions.json

extensions.json

```json
// 通用部分
// Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
// Comment Translate
// GitLens
// 前端部分
// Easy Sass
// ESLint

{
    "recommendations": [
        "intellsmi.comment-translate",
        "dbaeumer.vscode-eslint"
    ]
}
```

### settings.json

```json
{
    "recommendations": [
        "intellsmi.comment-translate",
        "dbaeumer.vscode-eslint"
    ]
}
```

## demo2

### extensions.json

这个是插件扩展

参考： https://github.com/nolebase/integrations/blob/main/.vscode/extensions.json

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "mikestead.dotenv",
    "EditorConfig.EditorConfig",
    "usernamehw.errorlens",
    "dbaeumer.vscode-eslint",
    "antfu.goto-alias",
    "lokalise.i18n-ally",
    "antfu.iconify",
    "yzhang.markdown-all-in-one",
    "antfu.unocss",
    "Vue.volar",
    "vitest.explorer",
    "redhat.vscode-yaml"
  ]
}
```

### setting.json

参考： https://github.com/nolebase/integrations/blob/main/.vscode/settings.json

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  // The following is optional.
  // It's better to put under project setting `.vscode/settings.json`
  // to avoid conflicts with working with different eslint configs
  // that does not support all formats.
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ],
  "typescript.tsdk": "node_modules/typescript/lib",
  "i18n-ally.localesPaths": [
    "packages/**/src/locales"
  ],
  "i18n-ally.keystyle": "nested"
}
```

