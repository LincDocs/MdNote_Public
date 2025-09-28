# Tauri模拟输入

## 剪切版策略

```rust
#[tauri::command]
fn paste(text: &str) -> String {
    // format!("Hello, {}! You've been pasted from Rust!", name)

    // 将文本写入剪贴板
    set_clipboard_text(text).expect("Failed to set clipboard text");

    // 模拟 Ctrl+V 按键来粘贴
    simulate_paste().expect("Failed to simulate paste");

    format!("Successfully pasted: {}", text)
}

/// 将文本写入剪贴板
#[cfg(target_os = "windows")]
fn set_clipboard_text(text: &str) -> Result<(), String> {
    use std::ffi::OsStr;
    use std::iter::once;
    use std::os::windows::ffi::OsStrExt;
    use std::ptr;
    use winapi::um::winuser::{OpenClipboard, EmptyClipboard, SetClipboardData, CloseClipboard};
    use winapi::um::winbase::{GlobalAlloc, GlobalLock, GlobalUnlock, GMEM_MOVEABLE};
    use winapi::um::winnt::HANDLE;
    use winapi::um::winuser::CF_UNICODETEXT;

    unsafe {
        if OpenClipboard(ptr::null_mut()) == 0 {
            return Err("Failed to open clipboard".to_string());
        }

        if EmptyClipboard() == 0 {
            CloseClipboard();
            return Err("Failed to empty clipboard".to_string());
        }

        let wide: Vec<u16> = OsStr::new(text).encode_wide().chain(once(0)).collect();
        let len = wide.len() * std::mem::size_of::<u16>();
        
        let h_mem: HANDLE = GlobalAlloc(GMEM_MOVEABLE, len);
        if h_mem.is_null() {
            CloseClipboard();
            return Err("Failed to allocate memory".to_string());
        }

        let p_mem = GlobalLock(h_mem);
        if p_mem.is_null() {
            CloseClipboard();
            return Err("Failed to lock memory".to_string());
        }

        ptr::copy_nonoverlapping(wide.as_ptr(), p_mem as *mut u16, wide.len());
        GlobalUnlock(h_mem);

        if SetClipboardData(CF_UNICODETEXT, h_mem).is_null() {
            CloseClipboard();
            return Err("Failed to set clipboard data".to_string());
        }

        CloseClipboard();
        Ok(())
    }
}

/// 模拟黏贴按键
#[cfg(target_os = "windows")]
fn simulate_paste() -> Result<(), String> {
    use winapi::um::winuser::{keybd_event, VK_CONTROL, KEYEVENTF_KEYUP};
    
    // VK_V 的值是 0x56
    const VK_V: u8 = 0x56;
    
    unsafe {
        // 按下 Ctrl
        keybd_event(VK_CONTROL as u8, 0, 0, 0);
        
        // 按下 V
        keybd_event(VK_V, 0, 0, 0);
        
        // 释放 V
        keybd_event(VK_V, 0, KEYEVENTF_KEYUP, 0);
        
        // 释放 Ctrl
        keybd_event(VK_CONTROL as u8, 0, KEYEVENTF_KEYUP, 0);
    }
    
    Ok(())
}

/// 将文本写入剪贴板
#[cfg(not(target_os = "windows"))]
fn set_clipboard_text(_text: &str) -> Result<(), String> {
    Err("Clipboard operations not implemented for this platform".to_string())
}

/// 模拟黏贴按键
#[cfg(not(target_os = "windows"))]
fn simulate_paste() -> Result<(), String> {
    Err("Paste simulation not implemented for this platform".to_string())
}
```

这是tauri程序的后端部分，用了模拟剪切版操作的方式去输入文本。但总感觉剪切版api效果不佳 (可能响应不够快、污染剪切版，等等问题)，有没有更直接的方式进行输出？像autohotkey的热字符串那样、kanata我记得也能直接输出unicdoe字符

## 直接输入策略 —— enigo库 (推荐)

`enigo` 是一个跨平台的输入模拟库，可以直接发送键盘事件：

Cargo.toml

```toml
[dependencies]
enigo = "0.8"
```

使用

```rust
use enigo::{Enigo, KeyboardControllable};

#[tauri::command]
fn paste_direct(text: &str) -> Result<String, String> {
    let mut enigo = Enigo::new();
    
    // 直接输入文本（字符逐个输入）
    enigo.text(text).map_err(|e| e.to_string())?;
    
    Ok(format!("Successfully typed: {}", text))
}
```

## 使用 `rdev` 库进行更精细的控制

## 使用 inputbot 库

## Windows 原生 `SendInput` API（最高效）

## 总结

- 对于短文本：使用 `enigo` 直接输入，响应最快且不污染剪贴板
  - 但单字符输入会有一个问题，可能会导致自动补全、以及进行回退操作时会一个一个字符撤回
    我之前在kanata仓库反馈过这个问题，见: https://github.com/jtroo/kanata/issues/1463
    但是用剪切板方案实现还是差点意思 —— 响应慢。达不到我在 autohotkey 上的使用体验
- 对于长文本：可以保留剪贴板方式作为备选

autohotkey 的输出字符串使用的是哪种方式？

AutoHotkey 主要使用两种方式：

1. SendInput - 直接发送键盘事件序列，不经过剪贴板
2. SendRaw/SendText - 发送原始文本，会自动转换为对应的键盘事件

在 Rust/Tauri 中的替代方案为:

- 方案一：使用 SendInput API (Windows)
- 方案二：使用 enigo crate (跨平台)
- 方案三：使用 inputbot crate

