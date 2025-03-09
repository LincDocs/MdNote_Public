# NoneBot2+Mirai

参考:

- (上) Linux服务器下 签名服务器+Mirai部署 详细教程 https://zhuanlan.zhihu.com/p/652785933
- (下) https://zhuanlan.zhihu.com/p/653131976

### 为什么使用Mirai

我之前一直用的 [go-cqhttp](https://zhida.zhihu.com/search?content_id=233192437&content_type=Article&match_order=1&q=go-cqhttp&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NDE2MTU5MzUsInEiOiJnby1jcWh0dHAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyMzMxOTI0MzcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.QwCaY56_YX4BUrYC6tmmVgO4YLXEU7O4_x4cNAWRSyM&zhida_source=entity)，这是一款非常优秀的QQ后端，但是对于一些高并发的群消息，这个启动器有时候可能会吞消息，导致机器人的回复不及时。因此，新版本我打算使用mirai来作为后端。这篇文章简单记录一下签名服务器时代，如何正确在Linux服务器上配置和下载mirai



