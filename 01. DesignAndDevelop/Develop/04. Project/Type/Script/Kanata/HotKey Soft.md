---
create_time: 2024-12-31
Author: LincZero
---

# HotKey Soft

## 调研

帮我调研一下有没有类似ahk的热键软件方案？要求： 语言最好不要再用像ahk那样的语言，最好是py、js、ts、lua等之类大众点的 可以跨平台的优先标注和考虑

kimi GPT + 个人补充：

\\[list2ut]

- 软件名称
  - 编程语言
  - 开源
  - 介绍
  - 选用
- AutoHotkey
  - C++
  - 9.5k https://github.com/AutoHotkey/AutoHotkey
  - 用于Windows的宏创建和面向自动化的脚本工具。
  - *否*，*不跨平台*
- Pywinauto
  - Python
  - 5.1k https://github.com/pywinauto/pywinauto
  - 使用Python实现Windows GUI自动化（基于文本属性）
  - *否*，*不跨平台*
- hotkeys-js
  - Js
  - https://github.com/jaywcjlove/hotkeys-js
  - 用于捕获键盘输入的健壮的Javascript库。它没有依赖关系
  - *否*，没可执行文件不符合
- hotkey
  - Js
  - 3.2k https://github.com/github/hotkey
  - 使用键盘快捷键触发元素上的操作
  - *否*，操作元素不符合
- soffes/HotKey
  - Swift
  - 946 https://github.com/soffes/HotKey
  - macOS中简单的全局快捷键
  - *否*，*不跨平台*
- JKeyMaster
  - Java
  - 234 https://github.com/tulskiy/jkeymaster 
  - 一个用JNA在java中注册全局热键的库。目标是支持基于x11的平台，Windows和MacOSX
  - **待定**
- Kanata
  - Rust开发，Lisp写
  - 3.5k https://github.com/jtroo/kanata
  - 提高键盘的舒适度和可用性与先进的定制
  - **是**
- IronAHK
  - C#
  - 410 https://github.com/Paris/IronAHK
  - 跨平台。net重写流行的AutoHotkey脚本语言，用于桌面自动化。
  - *否*，停止维护。是用C#对AHK的重写，带来了跨平台的兼容性
- Keymapper
  - 多语言（支持Python）
  - 1.4k https://github.com/keymapperorg/KeyMapper
  - 一个安卓应用程序，改变你的设备上的按钮！
  - *否*，安卓的
- global_hotkey


