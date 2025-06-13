---
create_time: 2024-06-22
Author: LincZero
---
# CloudFlare Pages

## 配置教程

参考： https://www.bilibili.com/video/BV1Sp4y157br

1. 登录或注册 > 右侧Workers&Pages/Overview > Page > Connect to Git > 选择GitHub/GitLab > 然后配置就好 > 选择仓库
2. 然后是 VuePress Hope Theme 的额外注意要项：
   - 分支我选择了 gh-pages，然后不填那些编译选项，直接用GitHub的编译结果。

总体来说还是比较简单的，搞起来很快，没怎么折腾，很方便。
测了下速，在广东速度也还行，其他地区似乎较一般。

## Pages VS Workers

参考

- [开发者用](https://developers.cloudflare.com/) (内容地图，文档)
  - Developer Products/ | 开发产品
    - [Workers文档](https://developers.cloudflare.com/workers/)
    - [Pages文档](https://developers.cloudflare.com/pages/)
- [工作平台](https://dash.cloudflare.com/) (注意右上可以切换成中文)
  - 计算(Workers)/workers-and-pages

### Pages VS Workers

我刚用的时候好像还没Workers？或者没留意，或者Workers没完全兼容Pages

目前来说，CloudFlare更推荐使用前者：

> [!quote] 
> 
> **[Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/)** 现在支持几乎所有 Pages 功能 — 以及 Pages 中没有的额外工具和集成。  
>   
> 查看我们的[迁移指南](https://developers.cloudflare.com/workers/static-assets/migrate-from-pages/)和[兼容性矩阵](https://developers.cloudflare.com/workers/static-assets/migrate-from-pages/#compatibility-matrix)，了解如何立即迁移到 Workers。



































