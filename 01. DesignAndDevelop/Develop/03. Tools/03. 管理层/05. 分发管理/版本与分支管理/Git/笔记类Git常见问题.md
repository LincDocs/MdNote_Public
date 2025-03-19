# 笔记类Git常见问题

## 换行符

这里指 `\r` 和 `\n\r` 的问题

这个主要是我用obsidian会出现的问题。像typora编辑他不会去改动换行符，而obsidian会将你的旧笔记转成Linux换行符。这就会导致obsidian打开过的旧文件，有可能会被git检测到有更改

## 编码

略

## 文件名大小写

默认情况下，Linux中Git对文件名大小写敏感，而Windows中Git对文件名大小写不敏感的问题

解决方案：

https://blog.csdn.net/weixin_44814196/article/details/135834224 这里有几种解决方法

这里我仅举例配置的方式：

关闭git 忽略大小写配置 （可以当前项目设置，也可以全局设置 --global）

```bash
git config core.ignorecase       # 查看当前配置，不出意外，返回true
git config core.ignorecase false # 修改配置，关闭 git 忽略大小写配置
```

