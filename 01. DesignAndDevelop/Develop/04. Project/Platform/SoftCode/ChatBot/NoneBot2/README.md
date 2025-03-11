---
create_time: 2025-03-08
Author: LincZero
---
# README

> [!tip]
> 
> 建议使用官网文档，那个挺详细的，也美观
> 
> 这里仅再补充官网没有的东西

## 资料

- repo: https://github.com/nonebot/nonebot2
- 官网、文档、开发API： https://nonebot.dev/
    - API: https://nonebot.dev/docs/api/
    - 社区(QQ、QQ频道、Discord): https://nonebot.dev/docs/community/contact
- 我的代理文档: https://lincdocs.github.io/nonebot2/
- 此处文档: 官网文档的基础上增加一些个人学习注释，重新分了类与排序 (官方为了url一致性，重新分类不会动文件夹结构)，也方便离线。
  但不一定是最新的，也可能缺页，并且没有做多版本文档 (versioned_docs)，**一般建议使用官方文档**
- 兼容： **支持多个聊天软件平台，可自定义通信协议！**

## 注意

nonebot 只提供了一个统一的通用的平台，如果你想应用于例如QQ上，还需要一个协议端的东西。

如：官方机器人、lagrange、go-cqhttp、mirai 等

具体的配合可见 [../实战/](../实战/)

## 兼容

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
