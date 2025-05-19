---
create_time: 2025-05-18
Author: LincZero
---

# Html2Md

## 为什么从网页/Word中复制数据，能黏贴到Md中

当你从框选了网页一部分内容后，并复制后。此时你的剪切版其实有 text/plain 和 text/html 两种格式的数据。

而 Markdwon 编辑器通常在被黏贴的时候会做一件事：去拿 text/html 的数据，并自动转换为 md 的文本。而这个 html2md 的过程，各个 Markdwon 编辑器的行为可能并不完全一致。

补充：`Ctrl Shift V` (以纯文本方式黏贴) 的原理，就是只把 text/html 的数据进行黏贴。而不是 html2md 的方式。

补充：`Win + V` (查看剪切版)，中所看到的文本就是 text/plain 的纯文本结果，或者图片有时也能看到。而复制文件等，则是又使用其他格式来存储。甚至有的是用软件内部的剪切版而不走系统剪切版。

## Html转Md的相关库

略

## 改善Html转Md

见 [./对于文章复制黏贴的优化.md](./对于文章复制黏贴的优化.md)

