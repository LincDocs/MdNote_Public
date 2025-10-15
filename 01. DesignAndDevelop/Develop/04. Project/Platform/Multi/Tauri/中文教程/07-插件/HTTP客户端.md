# Tauri HTTP客户端

参考:

- https://v2.tauri.app/zh-cn/plugin/http-client/
- https://v2.tauri.app/zh-cn/reference/javascript/http/

使用 HTTP 插件发起 HTTP 请求。

## 支持的平台

_This plugin requires a Rust version of at least **1.77.2**_

| Platform | Level | Notes |
| -------- | ----- | ----- |
| windows  | ✅     |       |
| linux    | ✅     |       |
| macos    | ✅     |       |
| android  | ✅     |       |
| ios      | ✅     |       |

## 设置

请安装 http 插件。

- [自动](https://v2.tauri.app/zh-cn/plugin/http-client/#tab-panel-2545) 这里演示自动
- [手动](https://v2.tauri.app/zh-cn/plugin/http-client/#tab-panel-2546) 手动安装见官网

使用项目的包管理器来添加依赖：

```bash
pnpm tauri add http
# 非pnpm见官网
```

## 用法

http 插件既有 JavaScript API 版本，也有 Rust [reqwest](https://docs.rs/reqwest/) 重新导出的版本。

### JavaScript

1. 配置允许访问的 URL
    src-tauri/capabilities/base.json
    ```json
    {
      "permissions": [
        {
          "identifier": "http:default",
          "allow": [{ "url": "https://*.tauri.app" }],
          "deny": [{ "url": "https://private.tauri.app" }]
        }
      ]
    }
    ```
    更多信息，请参阅[权限概述](https://v2.tauri.app/zh-cn/security/permissions/)的文档。

2. 发送请求
    ```ts
    import { fetch } from '@tauri-apps/plugin-http';

    // Send a GET request
    const response = await fetch('http://my.api.host/data.json', {
      method: 'GET',
    });
    console.log(response.status); // e.g. 200
    console.log(response.statusText); // e.g. "OK"
    ```

> [!tip]
> 注意
> 
> 当前的 `fetch` 方法是一个 Rust 后端 API。 它试图与 [`fetch` Web API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 尽可能接近和兼容。

### Rust

在 Rust 中，你可以利用插件重新导出的 `reqwest` 包。更多细节请参考 [reqwest 文档](https://docs.rs/reqwest/)。

```rust
use tauri_plugin_http::reqwest;

let res = reqwest::get("http://my.api.host/data.json").await;
println!("{:?}", res.status()); // e.g. 200
println!("{:?}", res.text().await); // e.g Ok("{ Content }")
```

