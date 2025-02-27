# GetFavicon

## 四种方法

- 这一类是从网站获取。
  像我之前写过的两个项目就有这种需求 ([LcNavSite](https://github.com/LincZero/LcNavSite/tree/master/public/icon) 和 [obsidian-chat-view-qq](https://github.com/LincZero/obsidian-chat-view-qq))。而使用比较多的主要是导航网站类、界面模拟类
- 获取方式
  - 一是 `hostname/favicon.ico` 尝试加载。缺点是有的网站的icon不是 `hostname/favicon.ico`，因为html头部是可以指定图标的路径的，有的网站会换用 svg 、或者使用图床里的链接等。另外，他们的大小尺寸和格式都不相同
  - 二是手动。当时我写 LcNavSite 时这里手动获取了许多网站的icon。而没有收录的icon则尝试使用 `hostname/favicon.ico` 进行加载。
    该方案的优点是稳定性和速度 (特别国内无法访问的外网图标也能获取)
  - 三是使用浏览器提供的服务，参考 [如何获取网站的图标（Favicon）](https://nolebase.ayaka.io/zh-CN/%E7%AC%94%E8%AE%B0/%F0%9F%9B%A0%EF%B8%8F%20%E5%BC%80%E5%8F%91/%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E7%BD%91%E7%AB%99%E7%9A%84%E5%9B%BE%E6%A0%87%EF%BC%88Favicon%EF%BC%89.html) [Grab favicon.ico using Google Chrome dev tools](https://superuser.com/questions/532616/grab-favicon-ico-using-google-chrome-dev-tools)。
    优点是稳定，缺点是用不同的浏览器语句不同。如 `chrome://favicon/https://github.com` 不能在edge/firefox上使用，另两个有自己的url
  - 四是查看有没有相关的爬虫服务提供商。提供类似第三点一样的服务，但需要在不同的浏览器上工作

## 在线服务类

重点调研一下第四点 —— favicon 获取的第三方API服务及方案

测试：需要重点测试非 `hostname/favicon.ico` 的位置是否能正常使用

根据搜索结果，以下是可以实现网站图标（Favicon）获取的第三方 API 服务及相关方案，覆盖免费和付费选项：

### 开源 API

https://github.com/search?q=get%20favicon&type=repositories

- https://github.com/owen0o0/getFavicon 220star 98fork php 两月内 需要部署
  - 示例: 无提供，必须自己部署
- https://github.com/sy-records/GetFavicon 49star 28fork php 一月内 可部署 (当前选用)
  - 示例: https://favicon-ico.vercel.app/?url=http://github.com (可用)
  - 示例: https://favicon-ico.vercel.app/?url=http://google.com (可用)
  - 示例: https://favicon-ico.vercel.app/?url=https://chat.deepseek.com (不可用)
  - 示例: https://favicon-ico.vercel.app/?url=https://github.com/copilot (不正确)
- https://github.com/fransallen/favicone 49star 0fork 两年 假开源
  - 示例: https://favicone.com/github.com (可用)
  - 示例: https://favicone.com/google.com (可用)
  - 示例: https://favicone.com/deepseek.com (可用)
  - 示例: https://favicone.com/github.com/copilot (不可用)
- https://github.com/Ridter/get_ip_by_ico 6年前
- https://github.com/antongunov/favicongrabber.com 7年前

### 免费 API

#### icon.horse

- 示例: https://icon.horse/icon/github.com (可用)
- 示例: https://icon.horse/icon/google.com (不可用)
- 示例: https://icon.horse/icon/deepseek.com (不可用)

#### Google Favicon 服务

- 接口地址：`http://www.google.com/s2/u/0/favicons?domain=目标域名`
- 示例：`<img src="http://www.google.com/s2/favicons?domain=github.com">` (可用，但国内不行)
- 示例: http://www.google.com/s2/favicons?domain=github.com/copilot/ (不正确)
- 特点：
  - 直接通过 Google 服务获取图标，支持大部分主流网站。
  - 域名需去除协议（如 `www.github.com`）

#### DuckduckGo 服务

https://duckduckgo.com/duckduckgo-help-pages/privacy/favicons/

#### g.etfv.co 服务

- 接口地址：`http://g.etfv.co/目标URL`
- 示例：`<img src="http://g.etfv.co/https://www.baidu.com">` (好像不行)
- 特点：
  - 自动解析目标网站的 Favicon，返回图标图片流。
  - 支持动态更新，无需维护缓存

#### OOOPN API（免费/直接返回图片）

- 功能：直接返回目标网站的 Favicon 图片流，无需解析 JSON。
- 请求方式：GET/POST
- 接口地址：`https://api.ooopn.com/ico/api.php?url=目标URL`
- 示例：`<img src="https://api.ooopn.com/ico/api.php?url=https://www.example.com">` (好像不行)
- 特点：
  - 无需 API Key，支持跨域请求
  - 直接输出图片数据，适用于前端直接嵌入 `<img>` 标签
  - 适用场景：轻量级应用或前端快速集成

### 自建爬虫方案（补充）

若需更高可控性，可结合以下逻辑自建服务：

2. 优先尝试根目录：请求 `目标域名/favicon.ico`。
3. 解析 HTML 元数据：若根目录无图标，爬取页面源码，从 `<link rel="icon">` 或 `<meta>` 标签中提取路径。
4. 缓存优化：将获取的图标缓存在服务器，减少重复请求。

### 付费类

#### 咕咕数据 API（付费）

- 功能：支持通过 URL 获取网站的标题和 Favicon 链接，返回 JSON 格式数据，包含状态码、标题、图标链接等信息。
- 请求方式：HTTPS GET
- 接口地址：`https://api.gugudata.com/websitetools/favicon?appkey=YOUR_APPKEY&url=目标URL`
- 特点：
  - 需付费获取 `appkey`，支持高频率请求（每秒不超过 100 次）。
  - 全国多节点 CDN 部署，响应速度快，支持负载均衡。
  - 兼容 Apple ATS 和 HTTPS 协议。
- 适用场景：企业级应用或高频调用需求。

#### 天行数据 API（按次计费）

- 功能：获取网页的标题、关键词、描述及 Favicon 链接。
- 请求方式：POST（参数需 URL 编码）
- 接口地址：`https://api.tianapi.com/网页信息接口`
- 特点：
  - 需注册获取 API Key，免费套餐提供 100 次调用。
  - 返回字段包括 `title`、`description`、`keywords`、`favicon` 等元数据。
  - 价格阶梯从 10 元（2000 次）到 2000 元（520 万次）不等。
- 适用场景：需同时获取网页元数据（如 SEO 信息）的场景。

### 总结、对比、建议

| 方案                | 优点                          | 缺点                          | 适用场景               |
|---------------------|-------------------------------|-------------------------------|-----------------------|
| 咕咕数据 API        | 高稳定性、负载均衡            | 需付费，需集成认证            | 企业级高频调用        |
| OOOPN API           | 免费、无需认证                | 依赖第三方服务可用性          | 轻量级前端项目        |
| 天行数据 API        | 综合元数据获取                | 按次计费，需注册              | SEO 分析工具          |
| 公共免费 API        | 零成本、简单易用              | 可能被服务方限流或停用        | 个人项目或低频率场景  |
| 自建爬虫            | 完全可控，支持自定义逻辑      | 需维护爬虫和缓存机制          | 对稳定性要求高的场景  |

- **推荐免费方案**：优先使用 `g.etfv.co` 或 Google 的公共 API，适合个人项目或低频率调用。
- **推荐付费方案**：咕咕数据 API 适合企业级需求，天行数据 API 适合需要综合元数据的场景。
- **自建爬虫**：若需长期稳定且可控性高，可结合根目录探测与 HTML 解析实现。
