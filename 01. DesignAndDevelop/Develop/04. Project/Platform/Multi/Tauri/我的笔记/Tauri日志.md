# Tauri日志

## 目录

Rust日志库:

- log + env_logger: 最基础和常用的组合
- tracing + tracing-subscriber: 更现代化的日志和追踪框架
- slog: 结构化日志库
- log4rs

## 普通log

同普通 Rust 程序，`cargo add log` 和 `cargo add env_logger`

为什么需要两个库

gpt: 

这是 Rust 生态系统中的**门面模式**（Facade Pattern）设计：

- `log` 库的作用
  - 抽象接口：`log` 是一个轻量级的**门面库**，只定义了日志记录的标准接口
  - 宏定义：提供 `info!`、`debug!`、`warn!`、`error!` 等宏
  - 与实现解耦：应用代码只依赖接口，不关心具体实现
- `env_logger` 库的作用
  - 具体实现：是 `log` 接口的一个**具体实现**
  - 实际功能：负责格式化、过滤、输出日志到控制台
  - 环境配置：通过环境变量控制日志级别

## 日志插件

见 Tauri 插件文档: https://v2.tauri.app/plugin/logging/

这个插件**不要看中文文档**!!!，少了好多东西: https://v2.tauri.app/zh-cn/plugin/logging/

## ~~命令函数不打印问题~~

> 后来发现是我傻了。我自己忘了我把paste函数弃用了，用send函数代替……然后一直在前者的函数里做调试

像下面的demo中，在 `run()` 中的打印正常，而在 `paste()` 中无论是 `println!` 还是使用日志库如 `info!` 的打印，对不会在控制台中打印。

gpt: 原因在于: **Tauri命令函数（如`paste()`、`send()`等）是在后台线程中执行的，而不是在主线程中**，所以它们的输出不会显示在开发控制台中

```rust
use tauri::{
  menu::{Menu, MenuItem},
  tray::TrayIconBuilder,
  Manager
};
use log::{info, debug, error};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    println!("rust println 测试 in run");

    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build()) // 添加日志插件
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // ... 你的现有setup代码 ...
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, paste, send, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn paste(text: &str) -> String {
    // 使用log宏而不是println!
    info!("paste function called with text: {}", text);
    debug!("Debug info in paste function");
    
    // 你的现有逻辑...
    // set_clipboard_text(text).expect("Failed to set clipboard text");
    // simulate_paste().expect("Failed to simulate paste");

    format!("Successfully pasted: {}", text)
}
```