---
create_date: 2025-11-13
last_date: 2025-11-13
author: LincZero
---
# AWS初体验

我很久以前是先用的两年阿里云，后来优惠没了转腾讯云，再后来懒得运维了，再往后是白嫖 Github 和 Cloudflare 的服务器

不过最近想想还是把域名弄上比较好，也对SEO比较友好

## 备注一些常用链接

(不过控制台里会有个 "最近访问"，一般还是好找的。而且还可以搜索，只是有些名词的叫法和国内不太一样，对应关系没建立起来)

- 控制台主页: https://ap-southeast-2.console.aws.amazon.com/console/home?region=ap-southeast-2
- Route 53: https://us-east-1.console.aws.amazon.com/route53/v2/home?region=ap-southeast-2#Home
  - 一种将用户路由至互联网应用程序的可靠方法。相当于域名和域名映射
  - 定价 https://aws.amazon.com/cn/route53/pricing/
  - 详细: 使用 Amazon Route 53 时，您不必支付任何前期费用，或为服务响应您的域的查询数量签订合约。与其他 AWS 服务相似，您可以现用现付并且仅按实际使用量付费。Amazon Route 53 的成本组成部分包括权威 DNS、运行状况检查、解析程序、域名、Route 53 配置文件和解析程序 DNS 防火墙
  - 文档: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html
- S3: https://ap-southeast-2.console.aws.amazon.com/s3/home?region=ap-southeast-2
  - 从任意位置存储和检索任意数量的数据
  - 定价 https://aws.amazon.com/cn/s3/pricing/?nc=sn&loc=4

## router 53 实战

如何在 AWS 购买域名并挂载到 github.io / Cloudflare 的个人网站中？

> 我是否可以在AWS购买域名并挂载到 github.io 或 cloudflare 的个人网站中？是使用 router 53吗？具体流程是怎么做的？

这个过程主要分为三步：

1. **在 AWS Route 53 注册你的域名**。
2. **在 GitHub Pages 或 Cloudflare Pages 上设置你的网站并绑定自定义域名**。
3. **回到 AWS Route 53，配置 DNS 记录，将你的域名指向对应的网站托管平台**。

下面我将以 **GitHub Pages** 为例，为你提供详细的操作流程。Cloudflare Pages 的流程也十分相似。

### (1) AWS 上的操作

1. Route 53 主页: https://us-east-1.console.aws.amazon.com/route53/v2/home?region=ap-southeast-2#Home
2. 点击右侧的 "开始使用"，跳转到新面板。新面板中选择起点为注册域
   (注册域 -> 转移域 -> 创建托管区域 -> 配置运行状况检查 -> 配置流量 -> 配置解析程序)
   有哪些域名: https://d32ze2gidvkk54.cloudfront.net/Amazon_Route_53_Domain_Registration_Pricing_20140731.pdf
3. （**搁置**。发现还是国内版的AWS，注册域名可能还得实名和备案。得用国外版的。那我还不如用CF方便些）

