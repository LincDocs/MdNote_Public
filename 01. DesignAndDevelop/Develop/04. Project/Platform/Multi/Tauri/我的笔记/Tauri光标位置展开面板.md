---
create_date: 2025-09-21
last_date: 2025-09-28
author: LincZero
---
# Tauri光标位置展开面板

## 首先需要全局快捷键

全局快捷方式 https://v2.tauri.app/zh-cn/plugin/global-shortcut/

或我笔记也转载了

## Tauri 取消默认顶部栏

配置文件里设置

### 快捷面板模板

(类似于 wox/utools/quicker/... 那样的模板)

依赖

```bash
pnpm tauri add global-shortcut # 用于全局快捷键
```

tauri.conf.json

```json
// v1文档: https://v1.tauri.app/v1/api/js/window/ https://v1.tauri.app/v1/api/config/
// v2文档: https://v2.tauri.app/reference/javascript/api/namespacewindow/#properties-6
"windows": [
  {
    "label": "main",
    "title": "any-menu",
    "width": 800,
    "height": 600,
    "visible": false,     // 初始隐藏
    "decorations": false, // 无标题栏和边框
    "skipTaskbar": true,  // 不在任务栏显示
    "alwaysOnTop": true,  // 始终置顶
    "resizable": false,   // 可拖拽设置大小
    "center": false,
    "transparent": true,  // 透明
    "shadow": false,      // 阴影
  }
],
```

权限

src-tauri/capabilities/default.json

```json
// 文档: https://v2.tauri.app/reference/acl/core-permissions/#default-permission-8
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "opener:default",
    "core:window:allow-show",
    "core:window:allow-hide",
    "core:window:allow-set-position",
    "core:window:allow-minimize",
    "core:window:allow-unminimize",
    "core:window:allow-set-focus",
    "core:window:allow-center",
    "core:window:allow-set-always-on-top",
    "core:window:allow-set-ignore-cursor-events",
    "log:default",
    "global-shortcut:allow-is-registered",
    "global-shortcut:allow-register",
    "global-shortcut:allow-unregister"
  ]
}
```

## 鼠标位置

```js
// 注意api/window里的功能很多都需要开启权限，否则控制台会报错告诉你应该开启哪个权限
import { getCurrentWindow, cursorPosition } from '@tauri-apps/api/window'

...

/** 显示窗口，并自动定位到光标/鼠标位置 */
async function showWindow() {
  const appWindow = getCurrentWindow()

  appWindow.setIgnoreCursorEvents(false) // 关闭点击穿透 (点击透明部分可能会临时打开)

  // s1. 鼠标位置 (类似于quciker app)
  const cursor = await cursorPosition()
  cursor.x += 0
  cursor.y += 2
  await appWindow.setPosition(cursor)

  // 光标位置 (类似于windows自带的 `win+.` 面板)
  const cursor2 = 'TODO'
   
  // 屏幕中间位置计算 (类似于 wox/utools app)
  
  // TODO 动态计算大小
  // TODO 动态计算边界，是否超出屏幕，若是，进行位置纠正
  // await appWindow.setSize({ width: 240, height: 320 })

  await appWindow.show(); global_state.isWindowVisible = true;
  await appWindow.setFocus() // 聚焦窗口
    // 这是必须的，否则不会显示/置顶窗口。注意作为菜单窗口而言，窗口消失时要恢复聚焦与光标

  if (SEARCH_DB.el_search != null) SEARCH_DB.el_search.show() // 显示&聚焦搜索框
}
```

## 光标位置

详见 [./Tauri光标位置](./Tauri光标位置.md)
