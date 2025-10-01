# uiautomation

- https://crates.io/crates/uiautomation
- https://github.com/leexgone/uiautomation-rs
- 需求、场景、同类: 见 [../Tauri光标位置展开面板](../Tauri光标位置展开面板.md)

## Feature 特征

| Feature     | 描述                | 默认值   |
| ----------- | ----------------- | ----- |
| `process`   | 支持进程操作并按进程ID筛选    | False |
| `dialog`    | 启用消息框显示信息         | False |
| `input`     | 支持键盘输入            | True  |
| `clipboard` | 支持剪贴板操作           | False |
| `pattern`   | 支持微软UI自动化控件模式     | -     |
| `control`   | 支持将UI元素封装为控件以简化操作 | True  |
| `event`     | 支持微软UI自动化事件       | False |
| `log`       | 使用日志库输出调试信息       | False |
| `all`       | 启用以上所有功能          | False |

## demo

### demo —— 打印所有 UI 元素

官方 github demo

(打印内容超多超久，尝试前可以限制一下)

```rust
use uiautomation::Result; // 不建议 use 这个，这个Result很容易和标准Result冲突导致报错
use uiautomation::UIAutomation;
use uiautomation::UIElement;
use uiautomation::UITreeWalker;

fn main() {
    let automation = UIAutomation::new().unwrap();
    let walker = automation.get_control_view_walker().unwrap();
    let root = automation.get_root_element().unwrap();

    print_element(&walker, &root, 0).unwrap();
}

fn print_element(walker: &UITreeWalker, element: &UIElement, level: usize) -> Result<()> {
    for _ in 0..level {
        print!(" ")
    }
    println!("{} - {}", element.get_classname()?, element.get_name()?);

    if let Ok(child) = walker.get_first_child(&element) {
        print_element(walker, &child, level + 1)?;

        let mut next = child;
        while let Ok(sibling) = walker.get_next_sibling(&next) {
            print_element(walker, &sibling, level + 1)?;

            next = sibling;
        }
    }
    
    Ok(())
}
```

### demo —— 打开笔记本并输入文本

官方 github demo

```rust
use uiautomation::core::UIAutomation;
use uiautomation::processes::Process;

fn main() {
    Process::create("notepad.exe").unwrap();

    let automation = UIAutomation::new().unwrap();
    let root = automation.get_root_element().unwrap();
    let matcher = automation.create_matcher().from(root).timeout(10000).classname("Notepad");
    if let Ok(notepad) = matcher.find_first() {
        println!("Found: {} - {}", notepad.get_name().unwrap(), notepad.get_classname().unwrap());

        notepad.send_keys("Hello,Rust UIAutomation!{enter}", 10).unwrap();

        let window: WindowControl = notepad.try_into().unwrap();
        window.maximize().unwrap();
    }
}
```

### demo —— 获得属性 as Variant

```rust
use uiautomation::UIAutomation;
use uiautomation::types::UIProperty;
use uiautomation::variants::Variant;

fn main() {
    let automation = UIAutomation::new().unwrap();
    let root = automation.get_root_element().unwrap();

    let name: Variant = root.get_property_value(UIProperty::Name).unwrap();
    println!("name = {}", name.get_string().unwrap());

    let ctrl_type: Variant = root.get_property_value(UIProperty::ControlType).unwrap();
    let ctrl_type_id: i32 = ctrl_type.try_into().unwrap();
    println!("control type = {}", ctrl_type_id);

    let enabled: Variant = root.get_property_value(UIProperty::IsEnabled).unwrap();
    let enabled_str: String = enabled.try_into().unwrap();
    println!("enabled = {}", enabled_str);
}
```

### demo —— 模拟键盘输入

```rust
use uiautomation::core::UIAutomation;

fn main() {
    let automation = UIAutomation::new().unwrap();
    let root = automation.get_root_element().unwrap();
    root.send_keys("{Win}D", 10).unwrap();
}
```

### demo —— 添加事件处理程序

```rust
struct MyFocusChangedEventHandler{}

impl CustomFocusChangedEventHandler for MyFocusChangedEventHandler {
    fn handle(&self, sender: &uiautomation::UIElement) -> uiautomation::Result<()> {
        println!("Focus changed: {}", sender);
        Ok(())
    }
}

fn main() {
    let note_proc = Process::create("notepad.exe").unwrap();

    let automation = UIAutomation::new().unwrap();
    let root = automation.get_root_element().unwrap();
    let matcher = automation.create_matcher().from(root).timeout(10000).classname("Notepad");
    if let Ok(notepad) = matcher.find_first() {
        let focus_changed_handler = MyFocusChangedEventHandler {};
        let focus_changed_handler = UIFocusChangedEventHandler::from(focus_changed_handler);

        automation.add_focus_changed_event_handler(None, &focus_changed_handler).unwrap();

        let text_changed_handler: Box<CustomPropertyChangedEventHandlerFn> = Box::new(|sender, property, value| {
            println!("Property changed: {}.{:?} = {}", sender, property, value);
            Ok(())
        });
        let text_changed_handler = UIPropertyChangedEventHandler::from(text_changed_handler);

        automation.add_property_changed_event_handler(&notepad, uiautomation::types::TreeScope::Subtree, None, &text_changed_handler, &[UIProperty::ValueValue]).unwrap();
    }

    println!("waiting for notepad.exe...");
    note_proc.wait().unwrap();
}
```

## uiautomation与Tauri一同使用

### 同一线程COM冲突问题，COM library not initialized

解决方法: 不要在同一线程中同时使用 uia 和 tauri，前者可以另开一个线程去用

```rust
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager,
};
use uiautomation::{
    // Result, // 这行代码告诉编译器：“在这个函数里，当我写 Result 的时候，我指的不是标准库里的 std::result::Result，而是 uiautomation 这个库里定义的 Result
    // Result 最好不要use，容易出报错
    UIAutomation,
    UIElement,
    UITreeWalker,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // uia
    thread::spawn(|| {
        // 在新线程中初始化 uiautomation。否则会报错 "COM library not initialized"
        // 原因: 不要让同一线程中同时使用uia和tauri，他们会都尝试去初始化COM
        let automation = UIAutomation::new().unwrap();
        let walker = automation.get_control_view_walker().unwrap();
        let root = automation.get_root_element().unwrap();
        print_element(&walker, &root, 0).unwrap();
    });

    // 日志插件
    let log_plugin = tauri_plugin_log::Builder::new()
        .level(log::LevelFilter::Debug) // 日志级别
        .clear_targets()
        // 打印到终端
        .target(tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Stdout))
        // 打印到前端控制台 (前端要开下attachConsole)
        // .target(tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Webview))
        // 打印到日志文件
        // .target(tauri_plugin_log::Target::new(
        //     tauri_plugin_log::TargetKind::Folder {
        //         path: std::path::PathBuf::from("/path/to/logs"), // 会相对于根盘符的绝对路径
        //         file_name: None,
        //     },
        // ))
        .build();

    tauri::Builder::default()
        .plugin(log_plugin)
        .plugin(tauri_plugin_global_shortcut::Builder::new().build()) // 全局快捷键插件
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?; // 退出菜单项
            let config_item = MenuItem::with_id(app, "config", "Config", true, None::<&str>)?; // 新增配置菜单项
            let menu = Menu::with_items(app, &[&quit_item, &config_item])?; // 菜单项数组

            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone()) // 托盘图标
                .tooltip("any-menu")
                .menu(&menu) // 加载菜单项数组
                // .show_menu_on_left_click(true) // 左键也能展开菜单
                .on_menu_event(|app, event| match event.id.as_ref() {
                    // 菜单事件
                    "quit" => {
                        app.exit(0);
                    }
                    // 打开配置窗口
                    "config" => {
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
                                tauri::WebviewUrl::App("config.html".into()), // 或者你的配置页面路径
                            )
                            .title("AnyMenu - Config")
                            .inner_size(600.0, 500.0)
                            .min_inner_size(400.0, 300.0)
                            .center()
                            .resizable(true)
                            .build();
                        }
                    }
                    _ => {}
                })
                // .on_tray_icon_event(|tray, event| {
                //     if let TrayIconEvent::Click {
                //         button: MouseButton::Left,
                //         button_state: _,
                //         ..
                //     } = event
                //     {
                //         let app = tray.app_handle();
                //         if let Some(window) = app.get_webview_window("main") {
                //             let _ = window.show();
                //             let _ = window.set_focus();
                //         }
                //     }
                // })
                .build(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, paste, send, read_file, get_caret_xy])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn print_element(walker: &UITreeWalker, element: &UIElement, level: usize) -> uiautomation::Result<()> {}
```

### 调用/线程通信问题

前面说了uiautomation不能和tauri在同一线程下工作

那么我们如何在Tauri中调用uiautomation呢？以下提供示例：在 get_caret_xy 中去调用 print_element 函数

这里尽量少修改，修改了三处: 

- 主Tauri线程中初始化通道，并将通道对象，放入uia线程和Tauri线程
- uia线程中启用循环监听事件
- 函数中使用注入的uia_sender来发送事件，以通知uia线程调用方法

```rust
se std::sync::mpsc::{self, Sender, Receiver};
use std::sync::{Arc, Mutex};
use tauri::State;
use uiautomation::{
    // Result, // 这行代码告诉编译器：“在这个函数里，当我写 Result 的时候，我指的不是标准库里的 std::result::Result，而是 uiautomation 这个库里定义的 Result
    // Result 最好不要use，容易出报错
    UIAutomation,
    UIElement,
    UITreeWalker,
};


// #region uia thread

// 定义全局 Sender 类型
struct UiaSender(pub Mutex<Sender<UiaMsg>>);

// 消息枚举，根据需求可扩展
enum UiaMsg {
    PrintElement,
}

fn start_uia_worker(rx: Receiver<UiaMsg>) {
    thread::spawn(move || {
        // 初始化 uiautomation
        let automation = UIAutomation::new().unwrap();
        let walker = automation.get_control_view_walker().unwrap();
        let root = automation.get_root_element().unwrap();

        loop {
            match rx.recv() {
                Ok(UiaMsg::PrintElement) => {
                    let _ = print_focused_element(&walker, &automation, 0);
                }
                Err(_) => break,
            }
        }
    });
}

// #endregion

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // uia
    // 新增：初始化channel
    let (tx, rx) = mpsc::channel::<UiaMsg>();
    let uia_sender = UiaSender(Mutex::new(tx));
    // 启动worker线程，传递receiver
    start_uia_worker(rx);
    
    ...
    
    tauri::Builder::default()
        .manage(uia_sender) // 依赖注入，注入到Tauri State管理
    
    ...

}

#[tauri::command]
fn get_caret_xy(app_handle: tauri::AppHandle, uia_sender: State<UiaSender>) -> (i32, i32) {
    let mut x = 0;
    let mut y = 0;

    // uia
    // 向worker线程发消息
    let tx = uia_sender.0.lock().unwrap();
    let _ = tx.send(UiaMsg::PrintElement);

    return print_msg(app_handle);
    // return (x, y);
}
```


