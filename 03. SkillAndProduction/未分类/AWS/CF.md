# CF

## CF 实战

CF注册域名后，将 zh.hostname.com 挂载到我的CF的网站上 (cf的pages)，将 hostname.com 挂载到 我的 github.io 的网站上，如何做？

| 配置平台             | 关键配置步骤                                                                | DNS 记录类型 (在 Cloudflare 中设置)  |
| ---------------- | --------------------------------------------------------------------- | ---------------------------- |
| GitHub Pages     | 1. 仓库设置中启用 Pages  <br>2. 设置自定义域名 `hostname.com`  <br>3. 创建 `CNAME` 文件 | **A 记录** (推荐) 或 **CNAME 记录** |
| Cloudflare Pages | 1. 在 Pages 项目中添加自定义域名 `zh.hostname.com`                               | **CNAME 记录** (通常自动添加)        |

- 在左侧导航栏中，点击 **Pages**。
- 在 "Custom domain" (自定义域名) 部分，输入您的根域名 `hostname.com`，然后点击 **Save**。
    - GitHub 会自动检查您的域名配置。此时可能会显示一个警告，因为我们还没有在 Cloudflare 上配置 DNS。
    - 保存后，仓库中会自动生成一个名为 `CNAME` 的文件，里面包含了 `hostname.com`。

### 将 `zh.hostname.com` 指向 Cloudflare Pages

这部分操作相对更简单，因为域名和 Pages 服务都在 Cloudflare 生态内。

步骤 1: 在 Cloudflare Pages 项目中添加自定义域名

1. 登录 Cloudflare 账户，进入 **Workers & Pages**。
2. 选择您要绑定的 Pages 项目。
3. 进入项目后，点击 **Custom domains** (自定义域名) 标签页，然后点击 **Set up a domain**。
4. 输入您要使用的子域名 `zh.hostname.com`，然后点击 **Continue**。
5. Cloudflare 会自动验证该域名是否在您的账户下，并自动为您添加正确的 DNS 解析记录。通常情况下，您只需点击确认即可。

步骤 2: 验证 DNS 记录 (通常是自动完成)

1. 返回您域名的 **DNS** 管理页面。
2. 您应该能看到一条由 Cloudflare Pages 自动创建的新记录，通常是这样的：

|类型 (Type)|名称 (Name)|内容 (Content / Target)|TTL|代理状态 (Proxy status)|
|---|---|---|---|---|
|**CNAME**|`zh`|`xxxx.pages.dev`|Auto|**代理 (Proxied)**|

- **内容 (Content)**: `xxxx.pages.dev` 是您的 Cloudflare Pages 项目的默认地址。
- **代理状态**: 这条记录 **必须** 保持为 **"代理" (Proxied)** 状态，这样才能享受 Cloudflare 的 CDN、SSL 等服务。

完成以上步骤后，等待几分钟，Cloudflare Pages 会自动为 `zh.hostname.com` 配置好 HTTPS，然后您就可以通过 `https://zh.hostname.com` 访问您的 Pages 网站了。


