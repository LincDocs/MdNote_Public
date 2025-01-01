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

## 调研2

其他人的调研： https://zhuanlan.zhihu.com/p/595742183 列举了四种软件的调研结果

## 数字层设计调研

![](assets/Pasted%20image%2020250101082159.png)

设计

- 起始行位置
  - 空格上一行为123：打数字更舒服，也便于兼容mini键盘 (小数字行也没有的键盘，但很少人用)
  - 空格上两行为123：可以扩展 `0、.、=` 在更合适的位置上
- 起始列位置
  - J列开始：更顺手
  - H列开始：则右侧空间更容易吻合计算器的设计
- 右Shift键和右Alt键是否应该利用上
  - 我键盘上的右Alt位置是非常规的，会偏左一格
  - 而且哪怕是原来的位置，`I K , RAlt` 布局也不在一条线上，打起来会很别扭

参考了一些计算器的UI设计

- 非三指输入逻辑
  - 如windows自带计算器：数字区左下到右下到右上是：[+/- 0 . (=) + - * / 删]，但这个的操作逻辑是鼠标点击
  - 如小米计。算器：数字区左下到右下到右上是：[+/- 0 . (=) + - * / 删]，但这个的操作逻辑是右手拇指输入
- 三指输入逻辑 (当前设计)
  - 如实体计算器：数字区左下到右下到右上是：
  - 如键盘的数字区：数字区左下到右下到右上是：[无 0 . (Enter/=) + - * /]
  - 如银行柜员机：数字区左下到右下到右上是：[无 0 000 (Enter/=) 无 重置 取消]
- 数字起始位置
  - 电话拨号键一般123在上面 (数字较均匀)
  - 计算器一般是123在下面 (数字小的使用频率更高，放在下面更顺手的位置)
  - 其中部分柜员机的数字123在上面，部分的数字123在下面。盲打需要注意这点
- 总结
  - 应该以键盘的数字区为主进行拟合

其他

- 我们假设数字模式下 `Enter` 和 `\=` 是同质的
- 频率分析：`CE > 数字 > . > (+-*/) > = > 括号 > AC`
- 删除、符号等和数字层是否必须在同一层。如果非同一层，则按键跨度小，更舒适，但需要更高的熟练度

