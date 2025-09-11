---
title: "让我们一起完成WYSIWYG(所见即所得)的markdown编辑器"
source: "https://juejin.cn/post/6946530449388732452"
author:
  - "[[Lupoy]]"
published: 2021-04-02
created: 2025-07-20
description: "万事开头难，鬼知道在写这篇文章的时候我踌躇了多久。 在知乎上有一篇帖子在讨论Markdown编辑器做成WYSIWYG(所见即所得)形式有什么弊端。 本文相对而言，更像是开篇总结，实质内容没多少，活脱脱一篇菜鸡踩坑日记。 对于一个程序员来说，我们使用markdown大多是在REA…"
tags:
  - "clippings"
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image)

[Lupoy](https://juejin.cn/user/78820567949736/posts)

3,378 阅读7分钟

![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

> 阳光正好，微风不燥。

## 前言

万事开头难，鬼知道在写这篇文章的时候我踌躇了多久。

在知乎上有一篇帖子在讨论Markdown编辑器做成WYSIWYG(所见即所得)形式有什么弊端。

本文相对而言，更像是开篇总结，实质内容没多少，活脱脱一篇菜鸡踩坑日记。

对于一个程序员来说，我们使用markdown大多是在README.md或者api文档中，样式是我们从不去关心的，因为市面上有很多优秀的markdown编辑器： [mdnice](https://link.juejin.cn/?target=https%3A%2F%2Fmdnice.com%2F "https://mdnice.com/") 、 [vditor](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVanessa219%2Fvditor "https://github.com/Vanessa219/vditor") 等等。

退而求其次，供我们选择的markdown解析渲染插件也有很多： [marked](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmarkedjs%2Fmarked "https://github.com/markedjs/marked") 、 [markdown-it](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmarkdown-it%2Fmarkdown-it "https://github.com/markdown-it/markdown-it") 。

再退而求其次(内心OS:对，我就是这么没有底线)，vscode、webstrom、py、Go....甚至是文本编辑器，我们都可以去写markdown(至于样式，我都退成这样了，给个活路吧亲)。

言归正传，做一款左右预览的markdown编辑器不算难，从旁观者的角度来看，无非是选个框架，去npm哐哐哐哐install一些插件，接着左边儿跟我一起画个龙(编辑区);在你右边儿画一道彩虹(预览区),在你胸口上比划一个郭富城(菜单栏)，至于优化，再说再说。

在写这篇文章的前几个月，我基于React+monaco-editor+markdown-it做了一款左右预览的markdown编辑器，但是(敲黑板),无论多么完善他，总是会有左右滚动不同步的问题，无论使用codemirror还是monaco-editor，他们都是一款成熟的编辑器，但是(再敲黑板),我们在右侧预览的时候，当我们左侧插入图片，右侧将图片显示出来，它和左侧的图片语法不能够完美的对应上，例如：当我们左侧图片链接已经滚出可视区域，而右侧图片因为高度的原因，或多或少都会出现图片还没滚动出可视区域的问题。

为了解决它，我调研了很多成熟的编辑器，做得好的： [stackedit](https://link.juejin.cn/?target=https%3A%2F%2Fstackedit.io%2Fapp%23 "https://stackedit.io/app#") [vditor](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVanessa219%2Fvditor "https://github.com/Vanessa219/vditor") [HyperMd](https://link.juejin.cn/?target=https%3A%2F%2Flaobubu.net%2FHyperMD%2F%23.%2Fdocs%2Fzh-CN%2FREADME.md "https://laobubu.net/HyperMD/#./docs/zh-CN/README.md") balaala一大堆。

由此，引出了我长达几个月的踩坑之旅。(朱局长：他平时就这么勇的吗？🐶)

## ContentEditable

> 那时，我们还年轻。总觉得世界应该是我们的

在使用 `contenteditable="true"` 的时候踩坑不仅是单行内容在结构嵌套的情况下光标位置的问题，这个问题的解决可以参考vditor的解决方案，动态向内容中插入 `<wbr />` 标签，然后实时获取标签位置，将光标移动到这个标签之后删除这个标签。

但是相应也会产生一个问题，因为vditor是使用了自己编写的词法分析器---Luter，所以它不必担心这个 `wbr` 标签会对输出的html格式产生什么样的影响，但是，我们如果使用marked或者markdown-it去解析内容的时候，因为有这个标签的存在，可能会存在将加粗解析为两个斜体(因为中间有 `wbr`)

## vditor

通过阅读vidtor的源码（对不起，vditor作者，🧎♀️），我知道了，他其实自定义了markdown的词法分析---Luter，在此基础之上完成了vidtor编辑器，我最开始想要尝试使用Luter引擎，但是后来困难战胜了我脆弱的小心灵，同时给我造成了不可磨灭的伤害，不是说Luter不好，相反，他脱离于正则去校验是否输入为markdown特殊语法，在响应速度上会优于很多词法分析器，但是他对我这个菜鸡而言，太难了，我曾经在他的基础上连续开发编辑器半个月左右，后来将这些代码全部放弃，重新去考虑其他的了，因为：

1. 我觉得我再写也不会超越vditor（Jay：我感觉我一直活在“夏洛”的影子里）因为单从编辑器这个角度而言，至少是我阅过的源码中顶优秀的存在，像国外的stackflowd 的优秀开源工具stackedit，他的缺点在于使用了vue作为了技术框架，此举不是为了批判vue，因为我也使用vue使用了几年，而vditor是脱离于三大框架之外，更能一套代码多端适配。这才是我推荐的原因，当然，也得说说vditor的左右同步滚动做的不到位呀，还是很不同步的
2. 我再怎么写，也是vditor mini，因为luter和vditor人一家产的，在使用luter的时候或多或少还是会使用到vditor的东西，那 和直接对vditor的源码进行删减有甚区别？
3. 我是个菜鸡而已，单单一个heading的语法就让我够头疼了，在光标切换到其它行的时候，我们之前行的内容如何展示，我拿到的是text，并不是一个stream流，这让我很头疼，我总不能走一个for循环去解决这个吧

## stackedit

这个并不是因为vue就不可取了，想反，他的代码很牛逼，大佬将所有的正则匹配规则都写在了里面，其实说真的，可以借鉴一下，我决定在之后我的这个v1版本完成之后将这块做一下。

## 小结

当我在使用 `contenteditable="true"` 这条路上走了很久之后，我清楚的认识道自己是个菜鸡👎，因为从头去写一个真的是太难了，光标、换行等等的问题接踵而来，如果想要踩坑少，我就不自觉的想要看vditor或者stackedit源码。

难道，我只能做一个面向源码编程的码农？

## codemirror

> 我以为我搭上了通过成功的阶梯

接着，我使用了codemirror这个代码编辑器，相对于monaco-editor，它的又是在于：体积小、文档全，同时他只是提供了输入，至于输出以及结构，全部是我们去自己主宰的，可插拔性极高，由此，引出本次更新日志的重点，当然也算踩坑较多的地方。

直接说结果，也是以失败告终，失败点在于：当我们在写table语法的时候，他会在多行去展示这个语法，以HyperMd demo为例：

![dom结构展示](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3667f0a5e1ea4a25a0cc8aad8099f48f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 他不是在一行去展示，我尝试过当检测到markdown语法的时候自己创建一个table结构，但是这样子光标又会出现问题，因为codemirror是块级光标，当插入在一行的时候光标就会很长。

也有试过我将markdown解析，然后在codemirror中插入html，但是这样表格内容无法编辑，如果在table上加contenteditable又不能直接修改td中的内容，td上加contenteditable又会很小，且不能使用快捷键切换。

## slate.js

> 蓦然回首，那人却在灯火阑珊处

slate 是一款流行的富文本编辑器——不，与其说它是一款编辑器，倒不如说它是一个编辑器框架，在这个框架上，开发者可以通过插件的形式提供丰富的富文本编辑功能。slate 比较知名的用户（包括前用户）有 GitBook 和语雀

钉钉的文档协同团队，在自研文字编辑器之前，就用了很久的slate

其实截止到现在，我仍没有完成自己的markdown编辑器，但是，我目前完成了标题和table表格的语法支持，参考下方GIF图:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc5267278cef4f68a680f3e78396a5de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 结语

本文主要是针对之前做WYSIWYG(所见即所得)的markdown编辑器时所遇到的经历以及采用、放弃的内容进行总结，算是一篇开篇文序，后续将同步更新基于slate.js实现markdown的WYSIWYG(所见即所得)的过程。

标签：

评论 3

![avatar](https://p26-passport.byteacctimg.com/img/mosaic-legacy/3795/3033762272~50x50.awebp)

0 / 1000

[![尤小溪的头像](https://p26-passport.byteacctimg.com/img/mosaic-legacy/3793/3114521287~100x100.awebp)](https://juejin.cn/user/2969161380924215/robots)

还有更新吗？

点赞

2

[Castle587](https://juejin.cn/user/134555151399036)

:

下面不是有吗 [juejin.cn](https://juejin.cn/post/6948719982968569887 "https://juejin.cn/post/6948719982968569887")

点赞

回复

[Lupoy](https://juejin.cn/user/78820567949736)

作者

:

目前比较忙，暂时还无法更新，实在抱歉

点赞

回复

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/b9d0c7badde6e5569e2390ee4a8cbd24.svg) 10

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 3

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e371749f308e0d99430a6a4943eef946.svg) 已收藏

![avatar](https://p3-passport.byteacctimg.com/img/user-avatar/93ccf7b5981770987fb307250c71afe5~40x40.awebp)

为你推荐

- [我熬夜开发了一款简约实用、支持多平台的Markdown在线编辑器（开源）](https://juejin.cn/post/6936929271482941471 "我熬夜开发了一款简约实用、支持多平台的Markdown在线编辑器（开源）")
		[之前，一直想开发一款属于自己的Markdown编辑器，主要是自己平常写文章可以更加灵活操作，另外扩宽自己的视野也是非常不错的选择啊！所以在周末就决定玩耍一番。首先我调研了很多线上热门的md编辑器，都很优秀。不为超过他们，主要自己用着舒服点。这篇文章主要是记录下我是如何从0到1是…](https://juejin.cn/post/6936929271482941471)
	- [
		Vam的金豆之路
		](https://juejin.cn/user/2506542244168909)
	- 3.3k
	- 38
	- 5
- [再见 Typora！这个开源的 Markdown 编辑器爱了！](https://juejin.cn/post/7045886513829117983 "再见 Typora！这个开源的 Markdown 编辑器爱了！")
		[一款简单而优雅的开源 Markdown 编辑器 —— Marktext，它专注于速度和可用性，适用于 Linux、MacOS 和 Windows。](https://juejin.cn/post/7045886513829117983)
	- [
		杰哥的IT之旅
		](https://juejin.cn/user/3245414056723230)
	- 6.9k
	- 42
	- 20
	![再见 Typora！这个开源的 Markdown 编辑器爱了！](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d56dd57c9ea940e297bae6bec96e1c60~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis)
- [Markdown 所见即所得（WYSIWYG）编辑器的研究](https://juejin.cn/post/7496005453354024969 "Markdown 所见即所得（WYSIWYG）编辑器的研究")
		[关于 Markdown 所见即所得编辑器的研究，现有开源编辑器的一些问题、实现自定义 markdown 编辑器历程，中间遇到的问题，markdown 解析器的选择，commonmark 规范的阅读翻译](https://juejin.cn/post/7496005453354024969)
	- [
		yuanyxh
		](https://juejin.cn/user/2881148117060749)
	- 628
	- 4
	- 2
	![Markdown 所见即所得（WYSIWYG）编辑器的研究](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b622c973962742f7b23e798f190f426c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgeXVhbnl4aA==:q75.awebp?rk3s=f64ab15b&x-expires=1753596053&x-signature=e2QZc%2Fp%2BXWMuMwi1at%2FJondEchM%3D)
- [VSCode + Md Editor 插件， Typora 的平替方案](https://juejin.cn/post/7525328220867870735 "VSCode + Md Editor 插件， Typora 的平替方案")
		[曾几何时，Markdown 基本只在程序员圈中流行。然而随着 AI 大模型的热潮，LLM 天然倾向输出结构清晰的文本，使得 Markdown 成为了人机协作与知识整理的通用桥梁，重要性不言而喻](https://juejin.cn/post/7525328220867870735)
	- [
		seepine
		](https://juejin.cn/user/544946869772078)
	- 69
	- 点赞
	- 评论
- [聊聊技术写作中的那些神兵利器 | 创作者训练营第二期](https://juejin.cn/post/6952380089484967943 "聊聊技术写作中的那些神兵利器 | 创作者训练营第二期")
		[创作者训练营第二期打开，作为技术创作者，你都用过什么工具呢，今天我们就从编辑器、图床、多平台分发工具等多方面来聊聊吧~](https://juejin.cn/post/6952380089484967943)
	- [
		村雨遥
		](https://juejin.cn/user/747323637904519)
	- 1.7k
	- 13
	- 2
	![聊聊技术写作中的那些神兵利器 | 创作者训练营第二期](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6910777ab95b49f9a2e7fa3ef0832bad~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis)
- [手把手带你10分钟手撸一个简易的Markdown编辑器](https://juejin.cn/post/6968632189894262791 "手把手带你10分钟手撸一个简易的Markdown编辑器")
		[最近我在项目中需要实现一个 markdown编辑器 的需求，并且是以React框架为开发基础的，类似掘金这样的： 我的第一想法肯定是能用优秀的开源就一定用开源的，毕竟不能老是重复造轮子。于是我](https://juejin.cn/post/6968632189894262791)
	- [
		零一01
		](https://juejin.cn/user/1336628107814488)
	- 17k
	- 210
	- 36
	![手把手带你10分钟手撸一个简易的Markdown编辑器](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f9534b078324a1faa43ee1c86e2ae94~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis)
- [🐂呀！这款markdown编辑器我太钟意啦！](https://juejin.cn/post/7131641368283185182 "🐂呀！这款markdown编辑器我太钟意啦！")
		[📖阅读本文，您将收获 了解到优秀的markdown产品wolai、notion markdown编辑器选型，多一个选择项 学会如何使用Mildown 一、markdown编辑器的槽点 作为研发人员，我](https://juejin.cn/post/7131641368283185182)
	- [
		程序员凌览
		](https://juejin.cn/user/3350967174565198)
	- 13k
	- 100
	- 19
	![🐂呀！这款markdown编辑器我太钟意啦！](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a14e70b2527347598f3db4caba38afc0~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis)
- [作为一个后端 Java 开发，为何、如何自己实现一个 Markdown 编辑器](https://juejin.cn/post/7174105780335935524 "作为一个后端 Java 开发，为何、如何自己实现一个 Markdown 编辑器")
		[作为一个 Java 开发，为何、如何自己实现 Quiet 项目的 Markdown 编辑器，并使其适配项目的暗黑模式和亮色模式。](https://juejin.cn/post/7174105780335935524)
	- [
		lin\_mt
		](https://juejin.cn/user/893248374339111)
	- 2.6k
	- 9
	- 1
- [使用Codemirror打造Markdown编辑器](https://juejin.cn/post/7018430125695828004 "使用Codemirror打造Markdown编辑器")
		[前几天突然想给自己的在线编译器加一个Markdown编辑和预览功能，于是花了两三天敲敲打打初步实现了这个功能。 编辑功能 粗体 斜体 中划线 标题 链接 图片 引用 代码 有序列表 无序列表 横线 看](https://juejin.cn/post/7018430125695828004)
	- [
		lliiooiill
		](https://juejin.cn/user/3966693684546967)
	- 4.0k
	- 17
	- 1
	![使用Codemirror打造Markdown编辑器](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d54aa621467458b828b850b2d78d5a7~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis)
- [快速入门上手Markdown](https://juejin.cn/post/7021800254580359205 "快速入门上手Markdown")
		[第一次接触Markdown是写代码初期看很多大佬的github，他们的项目一定会有一份文件叫Readme.md的文件 他们由一些简单美观的符号和汉字字母组成，编译之后成为一篇简单直观的文档 深入了解之](https://juejin.cn/post/7021800254580359205)
	- [
		fx67ll
		](https://juejin.cn/user/254742426028680)
	- 1.2k
	- 2
	- 4
- [几款主流好用的 Markdown 编辑器！值得拥有](https://juejin.cn/post/7038952271698198536 "几款主流好用的 Markdown 编辑器！值得拥有")
		[1、前言 Markdown编辑器 Markdown 其实在 2004 年就有了，不过之前一直很小众，这几年随着相关应用平台的发展，Markdown以其独到的优势迅速火起来了。Markdown编辑器使用](https://juejin.cn/post/7038952271698198536)
	- [
		终码一生
		](https://juejin.cn/user/4064226315080589)
	- 3.5k
	- 3
	- 评论
- [超高颜值+丝滑体验+多端同步，技术人Markdown笔记的最佳实践](https://juejin.cn/post/7319319374045757440 "超高颜值+丝滑体验+多端同步，技术人Markdown笔记的最佳实践")
		[前言 本篇是一个小的经验篇，介绍下我平时用什么工具写笔记写文章的。 现在写东西当然主推 Markdown 语法了，比富文本要方便太多，现在大多数新闻博客类平台应该都支持Markdown的语法，即使不支](https://juejin.cn/post/7319319374045757440)
	- [
		阿祖zu
		](https://juejin.cn/user/3825956194367230)
	- 2.6k
	- 14
	- 18
	![超高颜值+丝滑体验+多端同步，技术人Markdown笔记的最佳实践](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9f9bd707b704d17ab7d7acd7396ee3a~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis#?w=1280&h=720&s=153606&e=jpg&b=e6e4de)
- [【Markdown-01】初识 Markdown——你的第一份文档](https://juejin.cn/post/7525050440520286248 "【Markdown-01】初识 Markdown——你的第一份文档")
		[第 1 章：初识 Markdown——你的第一份文档 欢迎来到 Markdown 的世界！在这一章中，我们将从最基础的概念开始，带你了解 Markdown 的前世今生，体验它的设计哲学，并帮你选择一款](https://juejin.cn/post/7525050440520286248)
	- [
		码路工人
		](https://juejin.cn/user/3790771823315150)
	- 58
	- 1
	- 评论
	![【Markdown-01】初识 Markdown——你的第一份文档](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4696494d1b71466fa82c945d763c2edc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56CB6Lev5bel5Lq6:q75.awebp?rk3s=f64ab15b&x-expires=1753596053&x-signature=gootC6GCJxln5djW37yguE2is6g%3D)
- [Vue整合Markdown组件+SpringBoot文件上传+代码差异对比](https://juejin.cn/post/7156972993930297381 "Vue整合Markdown组件+SpringBoot文件上传+代码差异对比")
		[持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第20天，点击查看活动详情 前言 一眨眼礼拜五了，说啥再水一篇博文，之后的话，小爷就可以去玩几把游戏了，嘿嘿~。 那么今天带来的主](https://juejin.cn/post/7156972993930297381)
	- [
		Huterox
		](https://juejin.cn/user/2542529912789694)
	- 1.7k
	- 5
	- 4
	![Vue整合Markdown组件+SpringBoot文件上传+代码差异对比](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a83eda03e67f4de9a853e112741edf1b~tplv-k3u1fbpfcp-jj:108:72:0:0:q75.avis)
- [如何让 VSCode 拥有和掘金一样好看的 Markdown 样式（内含 Markdown 渲染原理）](https://juejin.cn/post/7241538641570480188 "如何让 VSCode 拥有和掘金一样好看的 Markdown 样式（内含 Markdown 渲染原理）")
		[本文适用于平时会使用 Markdown 的同学，文中讲述了 Markdown 是如何被解析渲染的，以及介绍了如何将掘金的 Markdown 样式搬到本地 VSCode 中使用](https://juejin.cn/post/7241538641570480188)
	- [
		60rzvvbj
		](https://juejin.cn/user/4090656281073575)
	- 8.0k
	- 20
	- 4

APP内打开