# Tauri系统事件

gen by claude 4

tauri 如何监听全局事件：Ctrl+右键时，从鼠标位置弹出应用窗口或自定义面板 (作为菜单，像quicker软件那样)

要实现 Ctrl+右键时从鼠标位置弹出窗口，你需要结合以下几个方面：

### 1. 全局快捷键监听

在 `src-tauri/src/main.rs` 中配置全局快捷键：

```rust
use tauri::{
    CustomMenuItem, GlobalShortcutManager, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut shortcut_manager = app.global_shortcut_manager();
            
            // 注册 Ctrl+右键 全局快捷键（这里用其他组合键代替，因为右键无法直接作为快捷键）
            shortcut_manager
                .register("Ctrl+Shift+Space", move || {
                    // 获取鼠标位置并显示窗口
                    show_popup_at_cursor();
                })
                .unwrap();
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 2. 获取鼠标位置和创建弹出窗口

```rust
use tauri::{Manager, PhysicalPosition, WindowBuilder};

#[tauri::command]
fn show_popup_at_cursor() {
    // 获取当前鼠标位置
    let cursor_pos = get_cursor_position(); // 需要额外的依赖来获取鼠标位置
    
    // 创建弹出窗口
    let window = WindowBuilder::new(
        &app,
        "popup",
        tauri::WindowUrl::App("popup.html".into())
    )
    .position(cursor_pos.x, cursor_pos.y)
    .size(300.0, 200.0)
    .decorations(false)
    .always_on_top(true)
    .skip_taskbar(true)
    .build()
    .unwrap();
}
```

### 3. 使用 `mouse-position` 获取鼠标坐标

在 `Cargo.toml` 中添加依赖：

```toml
[dependencies]
mouse-position = "0.1.2"
tauri = { version = "1.0", features = ["api-all", "system-tray", "global-shortcut"] }
```

### 4. 更完整的实现

```rust
use mouse_position::mouse_position::Mouse;
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, WindowBuilder};

fn get_mouse_position() -> (f64, f64) {
    let position = Mouse::get_mouse_position();
    match position {
        Mouse::Position { x, y } => (x as f64, y as f64),
        Mouse::Error => (0.0, 0.0),
    }
}

#[tauri::command]
fn show_context_menu(app_handle: tauri::AppHandle) {
    let (x, y) = get_mouse_position();
    
    // 创建或显示弹出窗口
    if let Some(window) = app_handle.get_window("context-menu") {
        window.set_position(tauri::PhysicalPosition::new(x as i32, y as i32)).unwrap();
        window.show().unwrap();
    } else {
        let window = WindowBuilder::new(
            &app_handle,
            "context-menu",
            tauri::WindowUrl::App("context-menu.html".into())
        )
        .position(x, y)
        .size(200.0, 300.0)
        .decorations(false)
        .always_on_top(true)
        .skip_taskbar(true)
        .resizable(false)
        .build()
        .unwrap();
    }
}

fn main() {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show_menu".to_string(), "Show Context Menu"));
    
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::RightClick { .. } => {
                // 右键点击系统托盘时显示菜单
                show_context_menu(app.clone());
            }
            _ => {}
        })
        .setup(|app| {
            // 注册全局快捷键
            let app_handle = app.handle();
            app.global_shortcut_manager()
                .register("Ctrl+Alt+Space", move || {
                    show_context_menu(app_handle.clone());
                })
                .unwrap();
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![show_context_menu])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 注意事项：

1. **全局鼠标事件监听**：直接监听 Ctrl+右键比较困难，通常使用其他快捷键组合替代
2. **权限问题**：全局快捷键需要适当的系统权限
3. **跨平台兼容性**：不同操作系统的行为可能有差异
4. **性能考虑**：避免频繁的全局事件监听影响性能

这个实现可以创建类似 Quicker 软件的右键菜单效果，你可以根据具体需求进行调整和优化。


