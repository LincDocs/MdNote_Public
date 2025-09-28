---
create_date: 2025-09-24
last_date: 2025-09-24
author: LincZero
---
# kanata依赖参考

更多Kanata相关

- Kanata作为软件: [[01. DesignAndDevelop/Doc/]]
- Kanata脚本编写: [[Develop/04. Project/Type/Script/Kanata/]]
- Kanata开发研究: [[Develop/04. Project/Plantform/Multi/Tauri/]]

Kanata作为Rust软件，对于我个人开发 InputMethod Assistant 而言，或会有很多启发。有一些功能和实现方法都可以去参考

## 依赖

参考: https://github.com/jtroo/kanata/blob/main/Cargo.toml

我让 claude 4 翻译其依赖作用

```toml
[workspace]
members = [
    "./",                      # 根目录项目
    "parser",                  # 解析器模块
    "keyberon",               # 键盘矩阵处理库
    "example_tcp_client",     # TCP客户端示例
    "tcp_protocol",           # TCP协议模块
    "windows_key_tester",     # Windows按键测试工具
    "simulated_input",        # 模拟输入模块
    "simulated_passthru",     # 模拟透传模块
]
exclude = [
    "interception",           # 排除拦截驱动相关
    "key-sort-add",          # 排除按键排序添加工具
    "wasm",                  # 排除WebAssembly模块
]
resolver = "2"               # 使用Cargo依赖解析器版本2

[package]
name = "kanata"
version = "1.10.0-prerelease-1"
authors = ["jtroo <j.andreitabs@gmail.com>"]
description = "Multi-layer keyboard customization"  # 多层键盘自定义工具
keywords = ["keyboard", "layout", "remapping"]      # 关键词：键盘、布局、重映射
categories = ["command-line-utilities"]             # 分类：命令行工具
homepage = "https://github.com/jtroo/kanata"
repository = "https://github.com/jtroo/kanata"
readme = "README.md"
license = "LGPL-3.0-only"
edition = "2024"
default-run = "kanata"

[lib]
name = "kanata_state_machine"     # 库名：Kanata状态机
path = "src/lib.rs"

[[bin]]
name = "kanata"                   # 可执行文件名
path = "src/main.rs"

[dependencies]
# 核心依赖
anyhow = "1"                      # 错误处理库，提供灵活的错误类型
clap = { version = "4", features = [ "std", "derive", "help", "suggestions" ], default-features = false }  # 命令行参数解析库
dirs = "5.0.1"                    # 系统目录路径获取库
indoc = { version = "2.0.4", optional = true }  # 多行字符串缩进处理库（可选）
log = { version = "0.4.8", default-features = false }  # 日志记录库
miette = { version = "5.7.0", features = ["fancy"] }  # 精美的错误报告库
once_cell = "1"                   # 线程安全的延迟初始化库
parking_lot = "0.12"              # 高性能锁库（比std::sync更快）
radix_trie = "0.2"               # 基数树数据结构（用于高效字符串匹配）
rustc-hash = "1.1.0"             # Rust编译器使用的哈希算法
simplelog = "0.12.0"             # 简单的日志实现库
serde_json = { version = "1", features = ["std"], default-features = false, optional = true }  # JSON序列化库（可选）
time = "0.3.36"                  # 时间处理库
web-time = "1.1.0"               # Web兼容的时间库

# Kanata内部模块
kanata-keyberon = { path = "keyberon", version = "0.1100.0" }        # Kanata键盘矩阵处理模块
kanata-parser =   { path = "parser", version = "0.1100.0" }          # Kanata配置解析器
kanata-tcp-protocol = { path = "tcp_protocol", version = "0.1100.0" } # Kanata TCP协议模块

[features]
# 功能特性定义
default = ["tcp_server","win_sendinput_send_scancodes", "zippychord"]  # 默认特性
perf_logging = []                           # 性能日志记录
tcp_server = ["serde_json"]                 # TCP服务器功能
win_sendinput_send_scancodes = ["kanata-parser/win_sendinput_send_scancodes"]  # Windows发送扫描码
win_llhook_read_scancodes = ["kanata-parser/win_llhook_read_scancodes"]        # Windows低级钩子读取扫描码
win_manifest = ["embed-resource", "indoc", "regex"]     # Windows清单文件
cmd = ["kanata-parser/cmd"]                 # 命令行功能
interception_driver = ["kanata-interception", "kanata-parser/interception_driver"]  # 拦截驱动
simulated_output = ["indoc"]                # 模拟输出
simulated_input = ["indoc"]                 # 模拟输入
passthru_ahk = ["simulated_input","simulated_output"]   # AutoHotkey透传模式
gui = ["win_manifest","kanata-parser/gui",  # 图形用户界面
  "win_sendinput_send_scancodes","win_llhook_read_scancodes",
  "muldiv","strip-ansi-escapes","open",
  "dep:windows-sys",
  "winapi/processthreadsapi",               # 进程线程API
  "native-windows-gui/tray-notification","native-windows-gui/message-window","native-windows-gui/menu","native-windows-gui/cursor","native-windows-gui/high-dpi","native-windows-gui/embed-resource","native-windows-gui/image-decoder","native-windows-gui/notice","native-windows-gui/animation-timer",
]
zippychord = ["kanata-parser/zippychord"]   # 快速和弦输入功能

[profile.release]
# 发布配置
opt-level = "z"     # 优化级别：最小化大小
lto = "fat"         # 链接时优化：完整优化
panic = "abort"     # panic时直接终止程序
codegen-units = 1   # 代码生成单元数：1（更好的优化）
```

 (为了简化，我单独拆分出平台专属依赖)

```toml
# 非WASM目标依赖
[target.'cfg(not(target_arch = "wasm32"))'.dependencies]
arboard = "3.4"                   # 跨平台剪贴板访问库

# macOS特定依赖
[target.'cfg(target_os = "macos")'.dependencies]
karabiner-driverkit = "0.1.6"    # Karabiner驱动工具包（macOS键盘定制）
objc = "0.2.7"                    # Objective-C运行时绑定
core-graphics = "0.24.0"          # Core Graphics框架绑定
open = { version = "5", optional = true }  # 打开文件/URL库（可选）
libc = "0.2"                      # C标准库绑定
os_pipe = "1.2.1"                 # 操作系统管道库

# Linux特定依赖
[target.'cfg(target_os = "linux")'.dependencies]
evdev = "0.13.0"                  # Linux输入子系统事件设备接口
inotify = { version = "0.10.0", default-features = false }  # Linux文件系统事件监控
mio = { version = "0.8.11", features = ["os-poll", "os-ext"] }  # 金属I/O库，用于异步I/O
nix = { version = "0.26.1", features = ["ioctl"] }  # Unix系统调用绑定
open = { version = "5", optional = true }  # 打开文件/URL库（可选）
signal-hook = "0.3.14"            # Unix信号处理库
sd-notify = "0.4.1"               # systemd通知库

# Windows特定依赖
[target.'cfg(target_os = "windows")'.dependencies]
encode_unicode = "0.3.6"          # Unicode编码处理库
winapi = { version = "0.3.9", features = [  # Windows API绑定
    "wincon",                     # Windows控制台API
    "timeapi",                    # 时间API
    "mmsystem",                   # 多媒体系统API
    "winuser",                    # Windows用户界面API
    "windef",                     # Windows定义
    "minwindef",                  # 最小Windows定义
] }
windows-sys = { version = "0.52.0", features = [  # 现代Windows系统API绑定（可选）
    "Win32_Devices_DeviceAndDriverInstallation",  # 设备和驱动安装
    "Win32_Devices_Usb",          # USB设备
    "Win32_Foundation",           # 基础API
    "Win32_Graphics_Gdi",         # 图形设备接口
    "Win32_Security",             # 安全API
    "Win32_System_Diagnostics_Debug",  # 系统诊断调试
    "Win32_System_Registry",      # 注册表
    "Win32_System_Threading",     # 线程管理
    "Win32_UI_Controls",          # UI控件
    "Win32_UI_Shell",             # Shell界面
    "Win32_UI_HiDpi",             # 高DPI支持
    "Win32_UI_WindowsAndMessaging",  # 窗口和消息
    "Win32_System_SystemInformation",  # 系统信息
    "Wdk",                        # Windows驱动开发工具包
    "Wdk_System",                 # WDK系统
    "Wdk_System_SystemServices",  # WDK系统服务
], optional=true }
native-windows-gui = { version = "1.0.13", default-features = false}  # 原生Windows GUI库
regex = { version = "1.10.4", optional = true }  # 正则表达式库（可选）
kanata-interception = { version = "0.3.0", optional = true }  # Kanata拦截驱动（可选）
muldiv = { version = "1.0.1", optional = true }  # 乘除法运算库（可选）
strip-ansi-escapes = { version = "0.2.0", optional = true }  # 去除ANSI转义序列（可选）
open = { version = "5", features = ["shellexecute-on-windows"], optional = true}  # 文件打开库（Windows Shell执行）
# shellexecute修复允许打开已写入的文件，需要_detached模式

# Windows构建时依赖
[target.'cfg(target_os = "windows")'.build-dependencies]
embed-resource = { version = "2.4.2", optional = true }  # 嵌入资源文件（可选）
indoc = { version = "2.0.4", optional = true }          # 多行字符串处理（可选）
regex = { version = "1.10.4", optional = true }         # 正则表达式（可选）
```

### 按功能模块拆解

我们先不管跨平台

略

### enigo

- jtroo/kanata使用了部分enigo的逻辑，但没有直接依赖
  https://github.com/jtroo/kanata/blob/341edb23d54c5c5f5e773324b0ca8b0a4257aa1c/src/oskbd/windows/llhook.rs#L429
- enigo库
  https://github.com/enigo-rs/enigo


