# Tauri模板创建

## VSCode 问题

官方文档没有介绍使用 VSCode 的情况，但以前我是用 VSCode 跑过 Rust 项目的，按理说用 VSCode 应该也行

而且也有 vscode 的 tauri 插件: https://github.com/tauri-apps/tauri-vscode

https://v2.tauri.app/zh-cn/develop/debug/vscode/

## 从零开始的项目Demo

```bash
node -v
pnpm -v
```

创建模板

```bash
pnpm create tauri-app
# Project name: tauri-app
# Identifier: com.tauri.tauri
# Choose which language to use for your frontend (ts/js、rust、.NET): ts/js
# Choose your package mmanager (pnpm/yarn/npm/deno/bun): pnpm
# Choose your UI template (Vanilla/Vue/Svelte/React/Solid/Angular/Preact): Vanilla
# Choose your UI flavor (ts/js): ts
cd tauri-app
pnpm install

pnpm tauri dev # or pnpm tauri build
```

在不使用交叉编译的情况下，`pnpm tauri build` 会在 stc-tauri/target/debug或release/ 中生成可执行程序。
windows 环境生成 exe，Linux 环境生成 deb 等

## CI模板







