---
create_time: 2024-12-31
Author: LincZero
---

# README

## 为什么选用、调研

以前是用AutoHotKey的，但我依赖新热键后，脱离后连打字都不流畅了，例如在新电脑或在非Windows平台 (AutoHotKey是纯Winodws的)

为此我重新调研了一下热键软件，尝试寻找新的、能跨平台的热键方案。调研结果见 [HotKey%20Soft](./HotKey%20Soft.md)

最后选择了Kanata。软件的功能和跨平台性质满足了我的要求，只是依然抽象的编程语言，有点难受

## 其他链接

- 官方文档的翻译 [./](./)
  AHK文档是有中文的，Kanata没有，我翻译了一些，放在了同目录下的其他文件中 (并且转换成了md格式，原文档用adoc写的)
  翻译基于 v1.7.0 版本 04051832b49829dd311b72d5e9925142274b8ddf 的Github docs文档
- 官方文档GitHub版 https://github.com/jtroo/kanata/blob/main/docs/config.adoc
- 官方文档网页版 https://jtroo.github.io/config.html

## 安装使用

- 安装： https://github.com/jtroo/kanata/releases
- 使用 (windows)： 下载 kanata.ext、kanata.kbd

::: note

注意：所有Windows二进制文件仅针对x86-64体系结构编译。

下载kanata.exe。可选地，下载kanata.kbd。当两个文件在同一目录下时，您可以双击exe来启动kanata。Kanata不启动后台进程，所以该窗口需要在启动后保持打开状态。有关在后台运行kanata的技巧，请参阅本讨论。

你需要通过cmd或powershell运行kanata.exe来使用不同的配置文件：

——cfg <cfg_file> .exe

注意：kanata_winIOv2.exe变体包含一个实验性的突破性更改，修复了与其他版本和其他操作系统相比，kanata的Windows LLHOOK+SendInput版本不一致地处理defsrc的问题。出于以下任何原因，您将对此变体感兴趣：

您是新用户
你是一个跨平台用户
您在Windows中使用多种语言布局，并希望kanata能够一致地处理关键位置

此变体包含与下面的扫描码变体相同的输出更改，并且还更改输入以对扫描码进行操作。

gui变体只使用winiov2 I/O机制。

注意：kanata_legacy_output.exe变体具有与标准kanata.exe文件相同的输入defsrc处理。它使用与1.6.1及更早版本中的标准kanata.exe变体相同的输出机制。换句话说，以前的experimental_scancode变体现在是默认的二进制文件。非遗留变体包含针对某个问题的更改；此遗留变体中省略了修复。如果发现新的输出机制存在问题，则包含遗留变体。

:::