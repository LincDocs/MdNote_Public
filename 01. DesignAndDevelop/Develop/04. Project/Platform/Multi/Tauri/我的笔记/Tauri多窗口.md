# Tauri多窗口

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

