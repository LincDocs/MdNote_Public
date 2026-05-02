# Browser Extension (浏览器扩展)

## 参考资料

- 通用浏览器扩展
  - [构建一个跨浏览器的扩展程序 - MDN](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension)
  - [浏览器扩展 - MDN](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions)
  - [Chrome/Firefox 浏览器扩展开发完整指南](https://juejin.cn/post/7572997791452020774)
- Chrome 浏览器扩展 官方文档
  - [浏览器扩展 介绍](https://developer.chrome.com/docs/extensions?hl=zh-cn)
  - [构建您的第一个扩展程序](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=zh-cn)
- Chrome 浏览器扩展 其他文档
  - [chrome插件开发流程（超全） - CSDN](https://blog.csdn.net/weixin_43898997/article/details/133021462)
  - [chrome 插件开发指南（Manifest V3） - 掘金](https://juejin.cn/post/7173567493871501325)
  - [《Chrome插件开发全攻略》 - Github](https://github.com/sxei/chrome-plugin-demo)
  - [从零实现的Chrome扩展 - Github](https://github.com/WindrunnerMax/EveryDay/blob/master/Plugin/%E4%BB%8E%E9%9B%B6%E5%AE%9E%E7%8E%B0%E7%9A%84Chrome%E6%89%A9%E5%B1%95.md)

## FAQ - 不同浏览器扩展的开发区别

常见问题:

- 请问如果学习 Chrome 浏览器扩展也能应用于 (Firefox浏览器吗)？
- 还是说需要一些简单的修改后能应用？
- 还是说主要看有没有应用一些特殊的平台api？
- 我应该如何学习，我更期望我开发的插件能在多个浏览器中都能使用
- 补充：我想开发的插件是与本地电脑应用协作，帮助电脑应用获取浏览器内容的一个扩展 (他们会使用ws/http等方式通信)

Gemini 3.1 Pro 解答:

开发浏览器扩展是一个非常有意思且实用的方向。针对你的问题，我逐一为你解答：

### 学习 Chrome 扩展能应用于 Firefox 吗？

**答案是：很大程度上可以。**

目前主流浏览器（Chrome、Firefox、Edge、Safari 等）都已经达成共识，共同拥抱 **WebExtensions API** 标准。
这意味着它们的核心架构（Manifest 配置文件、Content Scripts、Background Scripts/Service Worker、Popup 页面等）和生命周期是完全一致的。
你学习 Chrome 扩展的知识，*90%* 以上可以直接迁移到 Firefox。

### 是不是需要简单的修改后能应用？

**是的，通常需要一些调整。** 主要差异在于：

- **命名空间与异步处理**：
  Chrome 习惯使用 `chrome.*` 命名空间，早期基于回调函数（现在也支持 Promise）；而 Firefox 官方推崇使用 `browser.*` 命名空间，并且原生全面基于 Promise。
- **Manifest (清单文件) 差异**：
  目前 Chrome 强制推行 **Manifest V3 (MV3)**，后台脚本变成了 Service Worker。
  Firefox 也支持 MV3，但它在 MV3 中依然允许使用传统的 Event Pages（后台脚本），并且 Firefox 的 `manifest.json` 中通常需要配置特定的 `browser_specific_settings`（比如扩展的专属 ID）。
- **如何解决**：
  业界通用的做法是引入 Mozilla 官方提供的 [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)。它可以抹平 `chrome.*` 和 `browser.*` 的差异，让你用一套基于 Promise 的代码跑在所有浏览器上。

### 主要看有没有应用一些特殊的平台 API？

**非常正确**

大多数基础 API（如 `tabs` 标签页管理、`storage` 本地存储、`runtime` 消息通信、`contextMenus` 右键菜单）都是完全跨平台兼容的。

**但是**，如果你使用了一些浏览器独有的 API（例如 Chrome 特有的企业级设备管理 API、某些特定版本的标签组 API，或者 Firefox 独有的侧边栏 `sidebarAction` 某些特性），就会导致不兼容。
不过，对于获取网页内容这种常规操作，不涉及特殊 API。

### 我期望开发跨浏览器扩展，应该如何学习？

为了实现跨浏览器兼容，建议的路线如下：

- **以 MDN 文档为主，Chrome 文档为辅**：MDN 的 WebExtensions 文档本身就是为了“跨浏览器”编写的，里面详细标注了每个 API 在各个浏览器中的兼容性。Chrome 文档可以作为 Manifest V3 特性的补充参考。
- **使用现代化框架/脚手架**：不要从零手写 `manifest.json`，建议使用现代构建工具，它们会自动帮你抹平不同浏览器的 Manifest 差异。推荐了解：
  - **Plasmo**：目前非常火的浏览器扩展开发框架（号称扩展界的 Next.js），默认支持多浏览器打包，体验极好。
  - **Vite 插件**：例如 `crxjs/vite-plugin`，结合 Vue 或 React 开发���非常现代。
- **引入 Polyfill**：如果你坚持原生开发，一定要引入上面提到的 `webextension-polyfill`。

### 补充场景：与本地电脑应用通信

你想让浏览器扩展与本地应用通信，使用 WebSocket (WS) 或 HTTP 是可以的（通常在扩展的 Background 脚本 / Service Worker 中发起，因为不受同源策略跨域限制），**但这不是最佳实践**。

针对“扩展与本地应用通信”，浏览器提供了一个专门的、更安全、更原生的标准方案：**Native Messaging（原生消息通信）**。

**关于 Native Messaging：**

- **工作原理**：你的本地电脑应用需要在操作系统注册一个特殊的 JSON 文件（告诉浏览器：我在这里，我允许哪个 ID 的扩展来找我）。然后，浏览器扩展可以通过 `chrome.runtime.connectNative()` 直接与本地应用建立一个持久的双向标准输入/输出流（stdin/stdout）连接。
- **优势**：
  - **无需开启端口监听**：如果用 HTTP/WS，你的本地应用必须在后台跑一个服务器并占用端口，Native Messaging 不需要，浏览器可以直接唤醒并连通本地应用。
  - **安全性高**：只有你在 JSON 文件中授权的特定扩展 ID 才能唤起你的本地应用。
- **跨浏览器差异**：Chrome 和 Firefox 都支持 Native Messaging！扩展端的代码几乎一样，**唯一的区别在于本地应用注册 JSON 文件的路径**。Chrome 和 Firefox 在 Windows/Mac/Linux 上存放该注册表/配置文件的默认路径不同。

**给你的开发建议：**

1. 学习基础的 **Content Script**（用于读取网页 DOM 内容）。
2. 学习扩展内部通信：将 Content Script 获取的内容发送给扩展的 **Background Script / Service Worker**。
3. 重点学习 **Native Messaging**（推荐）或在 Background 脚本中发起 **WebSocket**，将数据传给你的本地应用。
4. 使用 **Plasmo** 或类似脚手架初始化项目，这样你就能一次编译，同时输出 Chrome 和 Firefox 两个版本的扩展包。



















