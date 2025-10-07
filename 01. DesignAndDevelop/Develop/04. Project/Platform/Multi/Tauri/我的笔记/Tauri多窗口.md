# Tauri多窗口

## Demo

src-tauri/src/lib.rs

添加了 config 菜单项

```rust
use tauri::{
  menu::{Menu, MenuItem},
  tray::TrayIconBuilder,
  Manager, WindowEvent
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?; // 退出菜单项
            let config_item = MenuItem::with_id(app, "config", "Open Config Panel", true, None::<&str>)?; // 新增配置菜单项
            let menu = Menu::with_items(app, &[&quit_item, &config_item])?; // 菜单项数组

            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone()) // 托盘图标
                .tooltip("any-menu")
                .menu(&menu) // 加载菜单项数组
                // .show_menu_on_left_click(true) // 左键也能展开菜单
                .on_menu_event(|app, event| match event.id.as_ref() { // 菜单事件
                    "quit" => {
                        app.exit(0);
                    }
                    "config" => { // 打开配置窗口
                        // 如果配置窗口已存在，直接显示并聚焦
                        if let Some(window) = app.get_webview_window("config") {
                            
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                        // 如果配置窗口不存在，创建新窗口
                        else {
                            let _config_window = tauri::WebviewWindowBuilder::new(
                                app,
                                "config",
                                tauri::WebviewUrl::App("config.html".into()) // 或者你的配置页面路径
                            )
                            .title("Configuration Panel")
                            .inner_size(600.0, 500.0)
                            .min_inner_size(400.0, 300.0)
                            .center()
                            .resizable(true)
                            .build();
                        }
                    }
                    _ => {}
                })
                .build(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, paste, send])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

src/config.html 添加该文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Configuration Panel</title>
    <link rel="stylesheet" href="/src/config.css" />
</head>
<body>
    <div id="config-container">
        <h1>Configuration Panel</h1>
        <div class="config-section">
            <h2>General Settings</h2>
            <div class="config-item">
                <label for="auto-start">Auto Start</label>
                <input type="checkbox" id="auto-start" />
            </div>
            <div class="config-item">
                <label for="hotkey">Global Hotkey</label>
                <input type="text" id="hotkey" placeholder="Ctrl+Alt+M" />
            </div>
        </div>
        
        <div class="config-section">
            <h2>Appearance</h2>
            <div class="config-item">
                <label for="theme">Theme</label>
                <select id="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                </select>
            </div>
        </div>
        
        <div class="config-actions">
            <button id="save-btn">Save</button>
            <button id="cancel-btn">Cancel</button>
        </div>
    </div>
    
    <script type="module" src="/src/config.js"></script>
</body>
</html>
```

## 多窗口 = 多进程 = 前端单例失效

by Claude Sonnet 4.5

解决方法: 

**将单例的状态和操作（Source of Truth）从前端 WebView 转移到一个所有进程都能与之通信的、唯一的中心点。**

- 在 **Tauri** 环境中，这个中心点就是 **Rust 后端核心进程**。
- 在 **纯 Web** 环境中，这个中心点就是 **浏览器的主窗口/主线程**（实际上它本身就是单进程，问题自然解决，但我们的设计需要兼容它）

具体方案:

- 使用 Tauri Store Plugin（推荐）
  ```ts
  import { Store } from 'tauri-plugin-store-api';
  ...
  this.store = new Store('.settings.dat');
  ...
  return await this.store.get(key);
  ```
- 使用 Rust 后端作为单一数据源
- 使用 Window Events 进行窗口间通信
  ```ts
  import { emit, listen } from '@tauri-apps/api/event';
  ...
  this.localState.set(key, value);
  // 广播到所有窗口
  await emit('state-update', { key, value });
  ```
- 混合方案（推荐用于复杂场景）

| 方案            | 优点        | 缺点          | 适用场景   |
| ------------- | --------- | ----------- | ------ |
| Store Plugin  | 简单、持久化    | 性能略低        | 简单配置管理 |
| Rust State    | 性能最佳、类型安全 | 需要写 Rust 代码 | 复杂状态管理 |
| Window Events | 实现简单      | 无持久化、易失步    | 临时状态同步 |
| 混合方案          | 功能完整      | 实现复杂        | 生产环境   |

- 注意有的**只能共享数据** (JSON/序列化数据)
  - Tauri Store Plugin
  - Rust State + Invoke
  - Window Events (Tauri)
  - LocalStorage / IndexedDB
- 有的则**能共享对象/函数** (真正的单例)
  - JavaScript 模块单例（仅限同一进程）
  - SharedWorker（Web Only）
  - SharedArrayBuffer + Atomics（实验性）
- 混合方案（伪共享对象）（但其实很多东西都不能共享）
  通过特殊设计，让多个进程"看起来"在共享对象
  - Proxy + RPC 模式
  - Service Worker (Web) + Rust Backend (Tauri)

| 方案                | 数据共享   | 对象共享       | 函数共享       | 适用场景     |
| ----------------- | ------ | ---------- | ---------- | -------- |
| **纯数据方案**         |        |            |            |          |
| Tauri Store       | ✅ JSON | ❌          | ❌          | 配置、设置    |
| Rust State        | ✅ JSON | ❌          | ❌          | 配置、设置    |
| Window Events     | ✅ JSON | ❌          | ❌          | 状态同步     |
| LocalStorage      | ✅ JSON | ❌          | ❌          | Web 配置   |
| **真单例方案**         |        |            |            |          |
| JS 模块单例           | ✅ 任意   | ✅          | ✅          | **同一进程** |
| SharedWorker      | ✅ 序列化  | ⚠️ Worker内 | ⚠️ Worker内 | Web多标签   |
| SharedArrayBuffer | ✅ 数值   | ❌          | ❌          | 高性能计算    |
| **混合方案**          |        |            |            |          |
| Proxy + RPC       | ✅ 跨进程  | ⚠️ 本地      | ⚠️ 本地      | **推荐**   |
| Adapter模式         | ✅ 跨进程  | ⚠️ 本地      | ⚠️ 本地      | **推荐**   |

对于 Tauri 多窗口场景：

**不可能实现真正的跨进程对象共享**，因为：

1. Main 和 Config 是完全独立的 JavaScript 进程
2. **进程间只能通过序列化数据通信**
3. 函数、类实例无法序列化

## 多窗口单例 + monorepo 需要去除Tauri依赖

by Gemini 2.5 Pro

原始需求：

```ts
export class PluginManager {  ... }
// TODO 需要实现多进程单例 (Main 和 Config 面板是两个 WebView 进程)
export const PLUGIN_MANAGER = new PluginManager();
```

以上是一个Tauri程序的一个部分。这里的 PLUGIN_MANAGER 不是真单例。这导致了一些全局的资源管理器、全局设置/配置对象。以及我程序中还有，在不同程序中还有非常多这种全局变量：

```ts
export const global_setting: {...}
```

怎么解决这个问题？

追加要求：这是一个monorepo，有tauri版和纯web app版两种，前者中main和config是两个不同的窗口和进程。后者中则是只有一个窗口去同时显示main和config。那么就要求，PluginManager、global_setting 等这些核心模块不能直接去依赖Tauri，而应该是不去依赖的

---

解决:

需要同时兼容 Tauri (多进程) 和 Web (单进程) 模式，并且核心模块不能直接依赖 Tauri——是解决这个问题的关键。这要求我们设计一个抽象层

