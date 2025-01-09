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

## extensions.json demo

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

## setting.json demo

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

