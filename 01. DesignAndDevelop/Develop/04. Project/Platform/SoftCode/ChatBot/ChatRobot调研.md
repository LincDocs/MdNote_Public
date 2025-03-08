---
create_time: 2025-03-08
Author: LincZero
---
# ChatRobot调研

调研于 2025-03-08

1. 先检索，gpt + github + google + 社区/贴吧/群提问
2. 再深入，star history、社区 文档 贡献人数
3. 技巧：在此过程中能得到新关键词，循环 (例如 robot 优化成 bot，可加 nt 限定词等)
4. 技巧：不维护的项目还是有用的，可以多看看弃坑说明，以及issue

## take from Copilot

（Copilot调研的一个好处和坏处就是，他会侧重于github开源项目结果）

ome of the initial findings:

- [mirai](https://github.com/mamoe/mirai)
    - 14.7k, 6 months ago, kotlin
    - A high-performance QQ bot framework based on Netty.
- [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
    - 10.5k, 10 months ago, go
    - A lightweight, fast, and cross-platform implementation of the CQHTTP API for CoolQ.
- [nonebot2](https://github.com/nonebot/nonebot2)
    - 6.5k, 5 hours ago, python
- [nonebot](https://github.com/nonebot/nonebot)
    - 2.2k, 2 years ago, python
    - A Python bot framework based on CQHTTP.
- [QQBot](https://github.com/pandolia/qqbot)
    - 3.7k, 5 years ago, Python
    - A Python-based QQ bot framework.
- [CoolQ SDK](https://github.com/richardchien/coolq-sdk-go)
    - 404
    - A Go SDK for CoolQ, a popular QQ bot framework.
- [CQHTTP](https://github.com/richardchien/cqhttp)
    - 404
    - CoolQ HTTP API plugin: a plugin for CoolQ that allows you to interact with CoolQ via HTTP.
- [CQPlus](https://github.com/zyzsdy/CQPlus)
    - 404
    - An enhanced version of the CoolQ HTTP API plugin with additional features.
- [YiriMirai](https://github.com/YiriMirai/YiriMirai)
    - 404
    - A QQ bot framework based on Mirai with additional features and enhancements.

## token form github

https://github.com/search?q=qq%20robot&type=repositories

和上面的搜索结果差不多 (更差)，这里仅列举补充的：

- [vipjeffreylee/QQrobot](https://github.com/vipjeffreylee/QQrobot)
    - 462, C++, 2013
- [Dice-Developer-Team/Dice](https://github.com/Dice-Developer-Team/Dice)
    - 493, C++, 2024-12
    - QQ Dice Robot For TRPG QQ跑团掷骰机器人

## take from deepseek

根据2024年9月更新的搜索结果，以下是当前主流的QQ机器人框架汇总及其特点分析，涵盖安卓、PC和开源三大类：

### 一、安卓端框架

- Panda框架  
  - 收费，功能丰富，支持群管理、信息查询、娱乐功能等，适合商业用途。
- QY框架  
  - 免费，基础功能完善，支持自定义插件，适合个人开发者或小型社群管理。
- 白泽框架  
  - 免费，以稳定性著称，兼容多账号管理，支持自动化脚本。
- 少萝框架  
  - 免费，界面简洁，适合新手快速上手，内置多种娱乐插件。
- 彩虹框架  
  - 免费，功能模块化设计，支持多协议适配，扩展性强。

### 二、PC端框架

- MyQQ复活版  
  - 免费，经典框架的延续，支持插件扩展和消息监听，适合长期稳定运行的场景。
- HtQQ  
  - 免费，轻量级框架，占用资源低，支持多线程处理消息。
- 七七NT  
  - 免费，基于新架构开发，兼容Windows和Linux系统，支持高并发消息处理。
- PikachuNT  
  - 免费，以高性能和低延迟为特点，适合需要实时响应的应用场景。
- 梦幻框架
  - ds说开源，然而并没有开源，他是文档开源，可能就被误识别为开源了
  - 特点：完全免费，支持多协议（如QQ、DoDo机器人），基于HTTP内核，稳定性高
  - 地址：[官网链接](https://drea.cc)

### 三、开源框架

- [Mirai](https://github.com/mamoe/mirai)
  - 14.7k, 6 months ago, Kotlin
  - 特点：基于Kotlin实现的高效协议库，支持Android和PC端，插件生态完善，社区活跃。  
- [nonebot2](https://github.com/nonebot/nonebot2)
  - 6.5k, 5 hours ago, python
  - 特点：Python异步框架，支持跨平台开发，利用类型注解提升代码可维护性，适合复杂功能扩展。  
  - 地址：[官网链接](https://v2.nonebot.dev/)
- [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
  - 10.5k, 10 months ago, go
  - 特点：基于Go语言开发，轻量且高并发，支持OneBot标准协议，可与其他框架无缝集成
  - 地址：[文档链接](https://docs.go-cqhttp.org/)

### 选择建议

综合下载地址：网页6提供了一个包含所有框架和插件的打包下载链接（[点击访问](https://asyyds.lanzouw.com/b042efipe)），涵盖免费和收费资源。

- 个人开发者/小型社群：推荐免费框架如白泽、少萝或NoneBot2，灵活且学习成本低。  
- 商业应用/高并发需求：可考虑收费框架如Panda或开源高性能框架Mirai。  
- 技术探索：开源框架（如go-cqhttp）适合需要深度定制的场景，支持二次开发。

如需更详细的插件配置或最新框架动态，建议访问上述链接或参考开发者社区文档。

## take from google

## take from NT特化搜索

https://www.google.com/search?q=NTQQ+Bot

开源部分

- [NapCatQQ](https://github.com/NapNeko/NapCatQQ)
    - 3.7k, 15 hours ago, ts
- https://github.com/bgluminous/mira-bot-rebirth-ntqq
    - 8, 9 months ago, java
- 

非开源部分

- [LLOneBot](https://llonebot.github.io/zh-CN/)
- LiteLoaderQQNT

文章

- [NoneBot2搭建官方QQ机器人-简单易上手](https://blog.csdn.net/weixin_58403216/article/details/144715878?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-1-144715878-blog-139640167.235%5Ev43%5Epc_blog_bottom_relevance_base7&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-1-144715878-blog-139640167.235%5Ev43%5Epc_blog_bottom_relevance_base7&utm_relevant_index=1)
- [2024 年最新基于 LLOneBot NT 框架搭建 QQ 机器人详细教程（更新中）](https://blog.csdn.net/qq_47452807/article/details/139640167)

## 总结

### Star History

还是再来看 star-history.com:

- [mirai](https://github.com/mamoe/mirai)
    - 14.7k, 6 months ago, kotlin
- [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
    - 10.5k, 10 months ago, go
- [NapCatQQ](https://github.com/NapNeko/NapCatQQ)
    - 3.7k, **15 hours ago**, ts
- [nonebot2](https://github.com/nonebot/nonebot2)
    - 6.5k, **5 hours ago**, python
- [nonebot](https://github.com/nonebot/nonebot)
    - 2.2k, 2 years ago, python
    - 仅支持 Python 3.7+
- [QQBot](https://github.com/pandolia/qqbot)
    - 3.7k, 5 years ago, Python

[![Star History Chart](https://api.star-history.com/svg?repos=mamoe/mirai,Mrs4s/go-cqhttp,nonebot/nonebot,pandolia/qqbot,NapNeko/NapCatQQ,nonebot/nonebot2&type=Date)](https://star-history.com/#mamoe/mirai&Mrs4s/go-cqhttp&nonebot/nonebot&pandolia/qqbot&NapNeko/NapCatQQ&nonebot/nonebot2&Date)

## 独立调研

网站、文档、社区、插件生态

最终选择是 nonebot2，特别是多协议的支持！兼容性、迁移性、泛用性得到保证，这点不错！

### nonebot2

- 官网： https://nonebot.dev/
- repo: https://github.com/nonebot/nonebot2
- 兼容： **支持多个聊天软件平台，可自定义通信协议！**

|协议名称|状态|注释|
|:-:|:-:|:-:|
|OneBot（[仓库](https://github.com/nonebot/adapter-onebot)，[协议](https://onebot.dev/)）|✅|支持 QQ、TG、微信公众号、KOOK 等[平台](https://onebot.dev/ecosystem.html)|
|Telegram（[仓库](https://github.com/nonebot/adapter-telegram)，[协议](https://core.telegram.org/bots/api)）|✅||
|飞书（[仓库](https://github.com/nonebot/adapter-feishu)，[协议](https://open.feishu.cn/document/home/index)）|✅||
|GitHub（[仓库](https://github.com/nonebot/adapter-github)，[协议](https://docs.github.com/en/apps)）|✅|GitHub APP & OAuth APP|
|QQ（[仓库](https://github.com/nonebot/adapter-qq)，[协议](https://bot.q.qq.com/wiki/)）|✅|QQ 官方接口调整较多|
|Console（[仓库](https://github.com/nonebot/adapter-console)）|✅|控制台交互|
|Red（[仓库](https://github.com/nonebot/adapter-red)，[协议](https://chrononeko.github.io/QQNTRedProtocol/)）|✅|QQ 协议|
|Satori（[仓库](https://github.com/nonebot/adapter-satori)，[协议](https://satori.js.org/zh-CN)）|✅|支持 Onebot、TG、飞书、微信公众号、Koishi 等|
|Discord（[仓库](https://github.com/nonebot/adapter-discord)，[协议](https://discord.com/developers/docs/intro)）|✅|Discord Bot 协议|
|DoDo（[仓库](https://github.com/nonebot/adapter-dodo)，[协议](https://open.imdodo.com/)）|✅|DoDo Bot 协议|
|Kritor（[仓库](https://github.com/nonebot/adapter-kritor)，[协议](https://github.com/KarinJS/kritor)）|✅|Kritor (OnebotX) 协议，QQ 机器人接口标准|
|Mirai（[仓库](https://github.com/nonebot/adapter-mirai)，[协议](https://docs.mirai.mamoe.net/mirai-api-http/)）|✅|QQ 协议|
|钉钉（[仓库](https://github.com/nonebot/adapter-ding)，[协议](https://open.dingtalk.com/document/)）|🤗|寻找 Maintainer（暂不可用）|
|开黑啦（[仓库](https://github.com/Tian-que/nonebot-adapter-kaiheila)，[协议](https://developer.kookapp.cn/)）|↗️|由社区贡献|
|Ntchat（[仓库](https://github.com/JustUndertaker/adapter-ntchat)）|↗️|微信协议，由社区贡献|
|MineCraft（[仓库](https://github.com/17TheWord/nonebot-adapter-minecraft)）|↗️|由社区贡献|
|BiliBili Live（[仓库](https://github.com/wwweww/adapter-bilibili)）|↗️|由社区贡献|
|Walle-Q（[仓库](https://github.com/onebot-walle/nonebot_adapter_walleq)）|↗️|QQ 协议，由社区贡献|
|Villa（[仓库](https://github.com/CMHopeSunshine/nonebot-adapter-villa)）|❌|米游社大别野 Bot 协议，官方已下线|
|Rocket.Chat（[仓库](https://github.com/IUnlimit/nonebot-adapter-rocketchat)，[协议](https://developer.rocket.chat/)）|↗️|Rocket.Chat Bot 协议，由社区贡献|
|Tailchat（[仓库](https://github.com/eya46/nonebot-adapter-tailchat)，[协议](https://tailchat.msgbyte.com/)）|↗️|Tailchat 开放平台 Bot 协议，由社区贡献|
|Mail（[仓库](https://github.com/mobyw/nonebot-adapter-mail)）|↗️|邮件收发协议，由社区贡献|
|黑盒语音（[仓库](https://github.com/lclbm/adapter-heybox)，[协议](https://github.com/QingFengOpen/HeychatDoc)）|↗️|黑盒语音机器人协议，由社区贡献|
|微信公众平台（[仓库](https://github.com/YangRucheng/nonebot-adapter-wxmp)，[协议](https://developers.weixin.qq.com/doc/)）|↗️|微信公众平台协议，由社区贡献|

### NapCatQQ (NT)

比较强依赖于NT

### mirai

- 开发文档、SDK: https://docs.mirai.mamoe.net
    - 社区SDK: Kotlin/Java等JVM平台语言
    - 原生接口: KotlinScript、C++、JS、酷Q DLL 插件
    - HTTP接口: 两个HTTP协议插件
- 社区 https://mirai.mamoe.net/ 周活贴10个左右
- 在线讨论 https://app.gitter.im/#/room/#mamoe_mirai:gitter.im?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
- go-cqhttp

### ~~go-cqhttp~~

go-cqhttp 维护说明：

特别地 [go-cqhttp QQ Bot的未来以及迁移建议](https://github.com/Mrs4s/go-cqhttp/issues/2471)、NTQQ问题

```anyblock
[quote]
[!quote]
由于QQ官方针对协议库的围追堵截 持续👊🐔 , 不断更新加密方案, 我们已无力继续维护此项目.
在未来 sign-server 方案彻底被官方封死之后 go-cqhttp 将无法继续使用.
同时NTQQ的出现让我们可以使用官方 完美 实现的协议实现来继续开发Bot, 不再担心由于协议实现不完美而导致被识别.
我们建议所有QQBot项目开始做好迁移至无头NTQQ或类似基于官方客户端技术的准备以应对未来的彻底封锁,
如果你的 go-cqhttp 还能继续使用, 不建议立即迁移, 但请开始阅读相关文档并做好迁移准备

推荐项目:
如果你想在电脑/服务器上部署bot -> https://chronocat.vercel.app/blog/0050
如果你想在Android 手机/模拟器上部署bot -> https://github.com/linxinrao/Shamrock
以上项目均为调用官方协议实现
以上项目均被请喝茶了，只能说有缘再见了.

相关问题可以在这个issue下讨论

协议库的时代已经过去, 接下来是Hook官方客户端的时代了, 感谢大家三年来的支持

其实go-cqhttp项目最初只是想做一个能在路由器上跑的酷Q

——————————————————————
什么是无头NTQQ?

众所周知, **QQ官方最新推出的 NTQQ 客户端使用了 electron 技术, 该技术可以非常方便的跨平台同时使用前端已有的技术栈进行客户端开发**.
NTQQ 客户端项目分为前后端两个部分, 前端是使用 Web 技术开发的 UI 界面供用户交互，后端使用 nodejs addons 技术包装了一个库来处理客户端逻辑和与服务端通信 (wrapper.node).
这个库的作用和 go-cqhttp 非常相似, 所以我们完全可以将前端删除只与这个库交互, 并引出 API 来为我们的Bot服务.
从服务端视角来说我们的 Bot 和正常客户端一样, 因为都是通过 wrapper.node 与服务端通信. 并且由于是官方根据内部文档开发的模块, 我们可以说这是一个 完美 的 go-cqhttp.

优点: 无头模式下相对低的占用.
缺点: 可能会受未来QQ更新的影响.

Shamrock项目是什么原理?

Shamrock 项目使用 xposed 的 hook 技术来实现远程操作 AndroidQQ 客户端.
优点: 不容易受未来更新封堵的影响.
缺点: 需要运行一个完整 AndroidOS 环境.

如果你的服务器资源足够充足, 我个人建议观望并跟进 Shamrock 项目. xposed 是久经考验且生态完善的技术.
```

Shamrock项目？