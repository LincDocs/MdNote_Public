# Nonebot2+Lagrange

- Nonebot2部分就是用的 OnebotV11 + fastapi，没什么好改的
- Lagrange这边更是不需要配置什么东西，json按默认来就好，然后扫个码

Lagrange对应json (默认)

```json
{
    "$schema": "https://raw.githubusercontent.com/LagrangeDev/Lagrange.Core/master/Lagrange.OneBot/Resources/appsettings_schema.json",
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    },
    "SignServerUrl": "",
    "SignProxyUrl": "",
    "MusicSignServerUrl": "",
    "Account": {
        "Uin": 0,
        "Protocol": "Linux",
        "AutoReconnect": true,
        "GetOptimumServer": true
    },
    "Message": {
        "IgnoreSelf": true,
        "StringPost": false
    },
    "QrCode": {
        "ConsoleCompatibilityMode": false
    },
    "Implementations": [
        {
            "Type": "ReverseWebSocket",
            "Host": "127.0.0.1",
            "Port": 8080,
            "Suffix": "/onebot/v11/ws",
            "ReconnectInterval": 5000,
            "HeartBeatInterval": 5000,
            "AccessToken": ""
        }
    ]
}
```


