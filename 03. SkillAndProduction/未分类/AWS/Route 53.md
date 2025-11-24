# 什么是 Amazon Route 53？

Amazon Route 53 是一项高度可用且可扩展的域名系统 (DNS) Web 服务。您可以使用 Route 53 以任意组合执行三项主要功能：域名注册、DNS 路由和运行状况检查。

如果您选择使用 Route 53 来实现所有这三个功能，请务必遵循以下顺序：

**1. 注册域名**

您的网站需要一个名称，例如 example.com。 Route 53 允许您为您的网站或网络应用程序注册一个名称，称为域名。

- 有关概述，请参阅域注册的工作原理。
- 有关过程，请参阅注册新域。
- 有关指导您注册域并在 Amazon S3 存储桶中创建简单网站的教程，请参阅 Amazon Route 53 入门。

**2. 将互联网流量路由到您域的资源**

当用户打开网络浏览器并在地址栏中输入您的域名 (example.com) 或子域名 (acme.example.com) 时，Route 53 会帮助将浏览器与您的网站或网络应用程序连接起来。

- 有关概述，请参阅如何将互联网流量路由到您的网站或 Web 应用程序。
- 有关过程，请参阅将 Amazon Route 53 配置为您的 DNS 服务。
- 有关如何将电子邮件路由到 Amazon WorkMail 的过程，请参阅将流量路由到 Amazon WorkMail。

**3. 检查资源的运行状况**

Route 53 通过互联网向资源（例如网络服务器）发送自动请求，以验证其是否可访问、可用且正常运行。您还可以选择在资源不可用时接收通知，并选择将互联网流量路由到远离不健康资源的地方。

- 有关概述，请参阅 Amazon Route 53 如何检查资源的运行状况。
- 有关过程，请参阅创建 Amazon Route 53 运行状况检查。

###### 其他 53 号公路功能

除了作为域名系统 (DNS) 网络服务外，Route 53 还提供以下功能：

**Route 53 解析器**

为 AWS 区域中的 Amazon VPC、AWS Outposts 机架中的 VPC 或任何其他本地网络获取递归 DNS。创建条件转发规则和 Route 53 端点，以解析在 Route 53 私有托管区域或本地 DNS 服务器中掌握的自定义名称。

有关更多信息，请参阅什么是 Amazon Route 53 Resolver？。

**Outposts 上的 Amazon Route 53 解析器**

通过 Route 53 Resolver 端点，将 Outpost 机架上的 Route 53 Resolver 与本地数据中心的 DNS 服务器连接起来。这可以解决 Outposts 机架和其他本地资源之间的 DNS 查询。

有关更多信息，请参阅Outposts 上的 Amazon Route 53 是什么？。

**Route 53 解析器 DNS 防火墙**

保护 Route 53 解析器中的递归 DNS 查询。创建域列表并构建防火墙规则，根据这些规则过滤出站 DNS 流量。

有关详细信息，请参阅使用 DNS 防火墙过​​滤出站 DNS 流量。

**交通流量**

易于使用且经济高效的全球流量管理：根据地理位置、延迟、运行状况和其他考虑因素，将最终用户路由到应用程序的最佳端点。

有关详细信息，请参阅使用流量来路由 DNS 流量。

**Amazon Route 53 配置文件**

借助 Route 53 配置文件，您可以跨多个 VPC 和不同的 AWS 账户应用和管理与 DNS 相关的 Route 53 配置。

有关更多信息，请参阅什么是 Amazon Route 53 配置文件？。

###### 主题

- [域名注册的工作原理](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-domain-registration.html)
- [互联网流量如何路由到您的网站或 Web 应用程序](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html)
- [Amazon Route 53 如何检查您资源的运行状况](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-health-checks.html)
- [Amazon Route 53 概念](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/route-53-concepts.html)
- [如何开始使用 Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-how-to-get-started.html)
- [访问 Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-accessing-route-53.html)
- [AWS 身份和访问管理](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/IAMRoute53.html)
- [Amazon Route 53 定价和账单](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Route53Pricing.html)
- [将 Route 53 与 AWS SDK 结合使用](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/sdk-general-information-section.html)
