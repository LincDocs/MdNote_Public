---
create_date: 2026-05-26
last_date: 2026-05-26
---
# Tauri透明区域穿透

## 背景

一些桌面程序在桌面显示不规则 (非矩形) 悬浮内容，是怎么做到的？

例如圆形的悬浮球、例如一些角色/动物的剪影、例如一些桌面歌词。在这些内容的透明区域，鼠标是可以点击穿透的。

- 如果显示内容基于前端框架，例如在 Tauri 程序中能做到这一点吗？
- 还是说不能用前端，只能通过别的自定义绘图 api 在桌面上绘制

## 答

by Claude Sonnet 4.6:

### 桌面不规则悬浮窗的实现原理

这是一个很经典的桌面开发问题，核心技术有几个层次：

### 核心技术

#### 1. 透明窗口 + 形状遮罩

所有方案的基础都是：
- 创建一个**全透明背景的无边框窗口**（transparent + frameless window）
- 窗口本身仍是矩形，但背景透明，只渲染内容部分
- 透明区域的**鼠标穿透**需要额外处理

#### 2. 鼠标穿透的实现方式

这是难点，有两种主流方案：

| 方案 | 原理 | 平台 |
|------|------|------|
| 窗口级穿透 | 设置窗口样式 `WSEXTRANSPARENT` / `WSEXLAYERED` | Windows |
| Hit-test 回调 | 自定义 hit-test，透明像素返回"穿透" | 跨平台 |

- Windows: `SetWindowLong` 设置 `WSEXLAYERED \| WSEXTRANSPARENT`，或用 `SetLayeredWindowAttributes` / `UpdateLayeredWindow`
- macOS: `NSWindow.ignoresMouseEvents`，或用 `NSWindow` 的 `hasShadow=false` + `isOpaque=false`
- Linux (X11): `XShapeCombineRegion` 设置窗口形状

### Tauri 能做到吗？

**可以！** Tauri 完全支持这个场景，而且是推荐方案之一。

#### Tauri 的实现方式

```rust name=src-tauri/main.rs
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            
            // 无边框 + 透明背景
            window.set_decorations(false)?;
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .unwrap();
}
```

```json name=tauri.conf.json
{
  "app": {
    "windows": [{
      "transparent": true,        // 透明背景
      "decorations": false,       // 无边框
      "alwaysOnTop": true,        // 置顶
      "resizable": false
    }]
  }
}
```

前端部分（CSS控制形状）：

```css name=style.css
body {
  background: transparent !important;
  /* 圆形悬浮球 */
}

.float-ball {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(100, 150, 255, 0.8);
  /* 透明区域自动穿透 */
}
```

#### Tauri 的鼠标穿透

Tauri 2.x 提供了专门的 API：

```rust name=src-tauri/main.rs
// 方案1：整个窗口穿透（再用前端控制哪些区域可交互）
window.set_ignore_cursor_events(true)?;

// 方案2：动态切换（鼠标在内容区域时不穿透，在透明区域时穿透）
// 需要前端检测鼠标是否在不透明区域，然后调用此 API
```

**更精细的方案**（按像素透明度决定穿透）：

```javascript name=src/main.js
// 前端监听鼠标移动，判断当前像素是否透明
document.addEventListener('mousemove', async (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const isTransparent = !el || el === document.documentElement;
  
  await invoke('set_ignore_cursor', { ignore: isTransparent });
});
```

### 其他框架的支持情况

| 框架 | 支持透明窗口 | 支持鼠标穿透 | 备注 |
|------|------------|------------|------|
| Tauri | ✅ | ✅ | 推荐，性能好 |
| Electron | ✅ | ✅ | `transparent: true` + `setIgnoreMouseEvents` |
| Qt | ✅ | ✅ | 原生支持最完善 |
| Flutter Desktop | ✅ | ✅ (需插件) | |
| 原生 Win32/WPF | ✅ | ✅ | 最底层，最灵活 |

Electron 的例子（对比参考）：

```javascript name=main.js
const win = new BrowserWindow({
  transparent: true,
  frame: false,
  alwaysOnTop: true
});

// 透明区域穿透
win.setIgnoreMouseEvents(true, { forward: true });
// forward: true 表示鼠标事件仍转发给渲染进程，可做hover检测
```

### 总结

- **不需要自定义绘图 API**，前端框架完全可以胜任
- **Tauri / Electron 都能实现**圆形悬浮球、角色剪影、桌面歌词等效果
- 关键点是：`transparent window` + `ignore mouse events` 动态切换
- 形状完全由 CSS/Canvas/SVG 控制，透明像素 = 视觉上和交互上都"不存在"

## 实战

### v1

以 Tauri2 为例，完整写法:

#### tauri.conf.json

```json name=tauri.conf.json
{
  "app": {
    "windows": [{
      "transparent": true,        // 透明背景
      "decorations": false,       // 无边框
      "alwaysOnTop": true,        // 置顶
      "resizable": false
    }]
  }
}
```

#### main.rs

(旧)

```rust
use tauri::Manager;

// 自定义 Command，前端 invoke 调用的就是这个
#[tauri::command]
fn set_ignore_cursor(window: tauri::WebviewWindow, ignore: bool) {
    window.set_ignore_cursor_events(ignore).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_ignore_cursor]) // 注册
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap(); // "main" 是窗口 label
            window.set_decorations(false).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .unwrap();
}
```

然后前端可以这样调用:

```js
import { invoke } from '@tauri-apps/api/core';
...
await invoke('set_ignore_cursor', { ignore: isTransparent });
```

(新)

简化

不用 invoke 其实也行。后端不用写那个命令，然后前端像下面这样调用，更方便简洁

```js
const appWindow = getCurrentWindow()
...
appWindow.setIgnoreCursorEvents(false)
```

#### css

避免在 html/body 元素上不穿透。
如果还是不行 (我就遇到了)，可以 debug 看一下透明时 el 是什么元素，然后将判断改为 "el 是否 html"

```css
/* 让 html/body 对 elementFromPoint 不可见 */
html, body {
  background: transparent !important;
  pointer-events: none;  /* 关键：透明区域不响应 */
}

/* 真正的内容元素单独开启 */
.float-ball,
.lyric-bar,
.my-widget {
  pointer-events: auto;
}
```

#### main.js

```js
import { invoke } from '@tauri-apps/api/core';

document.addEventListener('mousemove', async (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);

  // pointer-events:none 的元素会被跳过
  // 透明区域没有 pointer-events:auto 的元素 → el 为 null
  const isTransparent = el === null;

  await invoke('set_ignore_cursor', { ignore: isTransparent });
});
```

性能优化（可选）

`mousemove` 触发非常频繁，可以加节流：

main.js

```js
import { invoke } from '@tauri-apps/api/core';

let lastIgnore = null;

document.addEventListener('mousemove', async (e) => {
  // (二选一) 判断方法一 (通过设置透明区域)
  // const el = document.elementFromPoint(e.clientX, e.clientY);
  // const isTransparent = el === null;
  
  // (二选一) 判断方法二 (假如的你透明区域一定是html/body)
  const isTransparent = (
    el === null ||
    el === document.documentElement ||  // <html>
    el === document.body                // <body>
  );

  // 状态没变就不调用，避免频繁 IPC
  if (isTransparent === lastIgnore) return;
  lastIgnore = isTransparent;

  await invoke('set_ignore_cursor', { ignore: isTransparent });
});
```

### v2

但前面的做法有个问题，鼠标穿透后不会再有 mousemove 事件，无法检测到鼠标重新回到不透明 dom 上

参考类似项目: `viftode4/claude-usage-widget`

关于穿透后 `mousemove` 失效的问题，先搜一下其他 Tauri 项目的实现：找到了非常好的参考案例！特别是 `viftode4/claude-usage-widget` 这个项目完美解决了你的问题。

#### 核心问题：穿透后 `mousemove` 失效

你说得对，这是这类实现的根本矛盾：
- 穿透后鼠标事件不再发给窗口 → 无法检测鼠标回来了 → 无法恢复

**解决方案：不依赖 `mousemove`，改用从 Rust 端轮询全局鼠标坐标。**

#### 最佳参考项目 —— [`viftode4/claude-usage-widget`](https://github.com/viftode4/claude-usage-widget)

这个项目实现了一个 blob 形状悬浮球，逻辑完全一致，代码极简且清晰：

**Rust 端：暴露全局鼠标坐标接口**

```rust name=src-tauri/src/lib.rs
#[tauri::command]
fn get_cursor_position() -> (f64, f64) {
    // 使用 tauri 内置或 enigo/mouse_rs 获取全局坐标
}
```

**前端：定时轮询坐标，判断是否在内容区域内**

```typescript name=src/hooks/useClickThrough.ts url=https://github.com/viftode4/claude-usage-widget/blob/5b520770dcffa72f45705bf1fca69c10a27baf76/companion/src/hooks/useClickThrough.ts#L1-L80
import { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { isPointInPolygon } from "../canvas/hitTest";
import type { BlobNode } from "../canvas/physics";

interface BlobPosition {
  nodes: BlobNode[];
}

export function useClickThrough(blobRef: React.RefObject<BlobPosition | null>) {
  const ignoring = useRef(true);

  useEffect(() => {
    const appWindow = getCurrentWebviewWindow();
    let running = true;

    let unchangedCount = 0;
    let lastOverBlob = false;
    let currentInterval = 33;
    let intervalId: number;

    async function poll() {
      if (!running) return;

      try {
        const pos = await invoke<{ x: number; y: number }>("get_cursor_position");
        if (!running) return;

        const blob = blobRef.current;
        if (!blob || blob.nodes.length === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const cx = pos.x / dpr;
        const cy = pos.y / dpr;

        const overBlob = isPointInPolygon(cx, cy, blob.nodes, 15);

        if (overBlob && ignoring.current) {
          await appWindow.setIgnoreCursorEvents(false);
          ignoring.current = false;
        } else if (!overBlob && !ignoring.current) {
          await appWindow.setIgnoreCursorEvents(true);
          ignoring.current = true;
        }

        // 自适应轮询频率：悬停状态稳定后降低频率节省资源
        if (overBlob === lastOverBlob) {
          unchangedCount++;
          const targetInterval = unchangedCount > 30 ? 500 : 33;
          if (targetInterval !== currentInterval) {
            currentInterval = targetInterval;
            clearInterval(intervalId);
            intervalId = window.setInterval(poll, currentInterval);
          }
        } else {
          unchangedCount = 0;
          if (currentInterval !== 33) {
            currentInterval = 33;
            clearInterval(intervalId);
            intervalId = window.setInterval(poll, currentInterval);
          }
        }
        lastOverBlob = overBlob;
      } catch {
        // Cursor position unavailable
      }
    }

    intervalId = window.setInterval(poll, currentInterval);

    return () => {
      running = false;
      clearInterval(intervalId);
    };
  }, [blobRef]);
}
```

#### 整体思路总结

```
穿透时                    非穿透时
鼠标事件 → 底层桌面        鼠标事件 → 窗口
                          ↓
Rust 轮询全局坐标（不依赖窗口事件）
          ↓
    判断是否在形状内
    ↙              ↘
在内：关闭穿透      不在：开启穿透
setIgnoreCursorEvents(false)  setIgnoreCursorEvents(true)
```

关键点：**全局鼠标坐标是系统级的，与窗口是否穿透无关**，所以 Rust 端始终能拿到，绕过了 `mousemove` 失效的问题。

另一个值得参考的是 [`ZRainbow1275/bentodesk`](https://github.com/ZRainbow1275/bentodesk)，它用状态机管理穿透切换，更健壮，适合复杂场景。

#### 参考项目 —— ZRainbow1275/bentodesk

略

### v3

思考：

如果交替使用非穿透时和穿透时的状态，有没有可能：

当鼠标快速进入并出去区域时，从非穿透切换到穿透状态需要时间，而这时鼠标已经出去了，此时 document mousemove 无法检测到鼠标出去的行为，从而导致整个逻辑出现问题。

出现了明明鼠标在区域外，但还是判定非穿透状态的情况。

如果存在这种问题，是继续健壮这个状态机机制，还是一直使用 rust 全局坐标来判断，会更好？

不过好像没出现过这种情况。应该也不需要补强了


