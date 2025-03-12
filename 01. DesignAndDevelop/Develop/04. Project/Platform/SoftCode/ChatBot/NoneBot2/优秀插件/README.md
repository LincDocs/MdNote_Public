# 优秀插件

## 介绍

- 优秀使用插件
- 优秀的开发参考demo插件

这里主要指后者

了解插件可以做到什么事情，然后有遇到不会的场景就可以去进行参考学习。
主要专注与不同信息类型和事件的处理，纯文字IO的情况涉及的复杂性是不在于机器人api上的，对学习机器人帮助不大。

资料

- 插件商店: https://nonebot.dev/store/plugins

## 插件列表

简单插件demo (插件简单、适合初学)

```python
plugins = [                             # 社区插件
    # supermaster类别
    "nonebot_plugin_status",            # 服务器状态插件
    # 非命令信息响应器
    "nonebot_plugin_analysis_bilibili", # bilibili链接解析
    "nonebot_plugin_repeater",          # 复读机
]
builtin_plugins = [                     # 内置插件
    "echo"                              # 打印插件
]
plugin_dirs = ["src/plugins"]           # 个人插件
```

- [plugin-status](https://github.com/nonebot/plugin-status): 服务器插件。superuser, 戳一戳, 获取电脑信息
- [nonebot_plugin_analysis_bilibili](https://github.com/mengshouer/nonebot_plugin_analysis_bilibili): bilibili链接解析
- [nonebot_plugin_picsearcher](https://github.com/synodriver/nonebot_plugin_picsearcher): 图片搜索。查找色图来源
- [nonebot_plugin_translator](https://github.com/Lancercmd/nonebot_plugin_translator): 多语种翻译插件
- [nonebot-plugin-alias](https://github.com/noneplugin/nonebot-plugin-alias): 命令别名. 为指令动态创建别名
- [nonebot_plugin_admin](https://github.com/yzyyz1387/nonebot_plugin_admin): 不简易群管
- [nonebot-plugin-plus-one](https://github.com/yejue/nonebot-plugin-plus-one): 群聊复读机
- [nonebot-plugin-deepseek](https://github.com/KomoriDev/nonebot-plugin-deepseek): Deepseek
