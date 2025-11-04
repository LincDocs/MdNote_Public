---
create_date: 2025-09-20
last_date: 2025-09-20
author: LincZero
---
# Rust非标准全局快捷键

## 做法

### 标准的系统级快捷键及局限性

如果只需要监听标准的系统级快捷键，则参考文档 ([源码](https://github.com/tauri-apps/tauri-plugin-global-shortcut) [文档](https://v2.tauri.app/plugin/global-shortcut/)) 或我笔记 ([全局快捷方式](../中文教程/07-插件/全局快捷方式.md)) 中的 Shortcut Plugin 就行

这里关注的是像 AutoHotKey 或 Kanata 那种非标准快捷键，像 `Caps+F` `'+D` 等

### 底层键盘钩子

如果你真的需要像 Kanata 那样支持“非标准”修饰键（如 Caps、特殊自定义键），你需要用原生代码实现键盘钩子，然后和 Tauri 通信。

如 rdev 或 gilrs 库等

#### 步骤

1. 用 Rust crate 监听键盘事件
   推荐用 [`device_query`](https://crates.io/crates/device_query) 或 [`rdev`](https://crates.io/crates/rdev) 实现全局键盘监听。
2. 判断组合键状态
   在事件回调里判断“Caps+F”等自定义组合。
3. 通过 Tauri Emit 或命令通信给前端
   用 Tauri 的 `emit` 或自定义命令把事件传到前端 JS。

#### 例子（用 `rdev` 监听 Caps+F）

```rust
use rdev::{listen, Event, EventType, Key};

fn main() {
    let mut caps_active = false;
    listen(move |event: Event| {
        match event.event_type {
            EventType::KeyPress(Key::CapsLock) => caps_active = true,
            EventType::KeyRelease(Key::CapsLock) => caps_active = false,
            EventType::KeyPress(Key::KeyF) if caps_active => {
                println!("Caps+F detected!");
                // 这里可以用 tauri::api::process::Command 或 tauri::window.emit 通知前端
            }
            _ => {}
        }
    }).unwrap();
}
```

注意: 该例子无法组止 CapsLock 的原行为

### 阻止 Caps 原行为及模拟 (需要 `unstable_grab` 功能)

rdev 官方文档其实已经说明了这个例子: https://docs.rs/rdev/0.5.3/rdev/

原文:

> （需要启用 `unstable_grab` (不稳定抓取) 功能）
> 
> 如果使用 `unstable_grab` 功能来安装此库，将会添加 `grab` 函数，该函数会连接到全局输入设备事件流中。
> 
> 通过为该函数提供一个回调函数，**您可以拦截所有键盘和鼠标事件，使其在传递给应用程序/窗口管理器之前被拦截。在回调函数中，返回 None 表示忽略该事件，而返回该事件则允许其继续传递。目前这里尚无法对事件进行修改**。
> 
> 注意：此处所用的 `unstable` (不稳定) 一词特指抓取 API 存在不稳定性和易变性这一事实。

原代码:

```rust
#[cfg(feature = "unstable_grab")]
use rdev::{grab, Event, EventType, Key};

#[cfg(feature = "unstable_grab")]
let callback = |event: Event| -> Option<Event> {
    if let EventType::KeyPress(Key::CapsLock) = event.event_type {
        println!("Consuming and cancelling CapsLock");
        None  // CapsLock is now effectively disabled
    }
    else { Some(event) }
};
// This will block.
#[cfg(feature = "unstable_grab")]
if let Err(error) = grab(callback) {
    println!("Error: {:?}", error)
}
```

### 参考 Kanata 的做法

[Kanata](https://github.com/kinetiknz/kanata) 是用 Rust 写的键盘 remapper，它直接用系统钩子监听键盘事件，并进行自定义映射。

你可以：

- 复用 Kanata 的底层监听逻辑，或参考其源码，集成到 Tauri 的 Rust 后端。
- 或者先用 Kanata remap 键盘，然后 Tauri 只监听更简单的快捷键。

## 我的实践

### 项目

参见: https://github.com/any-menu/any-menu/blob/main/src/Tauri/src-tauri/src/ad_shortcut.rs

与前面纸上谈兵的一些不同的:

### 修饰键问题

监听依然用了 rdev，但是发送不用 rdev，存在问题，而改用了 enigo。原因是 rdev 无法很好地配合修饰键使用:

```rust
/** 高级快捷键
 * 
 * 常规的系统级快捷键使用 Tauri 的快捷键插件即可，但非系统级快捷键要自己处理
 * 
 * ## 一些bug问题 - Shift+LeftArrow为例:
 * 
 * ```rust
 * # rdev::simulate 的版本存在问题
 * # simulate() 发出按键后，在按键按下前会自动松开Shift键，松开对应键后再自动按回Shift键。导致Shift键环境丢失
 * # 感觉 rdev 没有设计成能很好地支持快捷键
 * let _ = simulate(&EventType::KeyPress(Key::ShiftLeft));
 * let _ = simulate(&EventType::KeyPress(Key::LeftArrow));
 * let _ = simulate(&EventType::KeyRelease(Key::LeftArrow));
 * let _ = simulate(&EventType::KeyRelease(Key::ShiftLeft));
 * ```
 *
 * ```rust
 * #enigo.key 的版本正常，不区分左右Ctrl/Shift
 * let mut enigo = Enigo::new(&Settings::default()).unwrap();
 * let _ = enigo.key(enigo::Key::Shift, Press);
 * let _ = enigo.key(enigo::Key::LeftArrow, Click);
 * let _ = enigo.key(enigo::Key::Shift, Release);
 * ```
 */
```

### Caps模拟、虚拟键、不使用层等问题

我用了几个变量来处理:

```rust
let caps_active = Cell::new(false);         // 是否激活 Caps 层
let caps_active_used = Cell::new(false);    // 是否使用过激活后的 Caps 层
let virtual_event_flag = Cell::new(false);  // 跳过虚拟行为，避免递归
```

### 聚焦于应用自身时无法监听

暂无解决，解决中......

问题描述为:

> 我聚焦到这个应用本身的应用窗口上时，无法监听到任何事件 (聚焦在其他任何窗口上，都能正常监听)
> 使用的 rdev 的 listen 和 grab 均是这种情况
> 
> 为什么该软件的应用窗口先于全局监听，而全局监听又先于其他软件的应用窗口？我在想能不能加一个进程来解决，全局监听进程与显示窗口的不在同一进程，这样能否通过全局监听方式监听应用自身？

目前有两个思路，一是分开创始全局快捷键与软件内快捷键，二是把全局快捷键监听独立为一个进程而非线程


