# README

## Open source project

开源部分

主创开源项目（注意，其中很多项目被我迁移到了organization中。如果你想了解更多，不妨到这些组织仓库里看看）<br>
（Note that many of these projects were migrated to my organization. If you want to learn more, check out these organizational warehouses）

### Repo Card

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=any-block&repo=any-block&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats) [![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&username=LincZero&repo=obsidian-node-flow&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&username=LincZero&repo=obsidian-chat-view-qq&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats) [![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=mProjectsCode&repo=obsidian-shiki-plugin&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=vuepress&repo=core&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats) [![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=vuepress&repo=ecosystem&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=mdit-plugins&repo=mdit-plugins&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats) [![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=nolebase&repo=integrations&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&username=LincZero&repo=LincZero.github.io&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats) [![Readme Card](https://github-readme-stats.vercel.app/api/pin/?description_lines_count=3&hide_border=true&show_owner=true&username=PKM-er&repo=Pkmer-Math&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)

### 文档导航

这里是一部分在该网站上部署文档的仓库的文档页：

- [AnyBlock](./AnyBlock/)
- [NodeFlow](./Plugin/NodeFLow/)
- [Obsidian-Chat-View-QQ](./Plugin/Obsidian-Chat-View-QQ/)
- [Lc Document Web](./Web/LincZero_Document_Library/)
- [Lc Nav](./Web/LcNavWeb/)
- [BiliTool](./App/B站小工具/)
- [LincZero-Help-Oneself](../App/LincZero_Help_Oneself/)

### LincZero

部分项目包含多个也是开源的子项目：（也许是monorepo，也许是multirepo）

- FontEnd
  - [LincZero.github.io](https://github.com/LincZero/LincZero.github.io)
  - [NodeFlow](https://github.com/LincZero/obsidian-node-flow)
  - [AnyBlock](https://github.com/any-block/obsidian-any-block)
  - [LcNavSite](https://github.com/LincZero/LcNavSite)
  - [ChatViewQQ](https://github.com/LincZero/obsidian-chat-view-qq)
- Application
  - [pyqt-node-editor-master](https://github.com/LincZero/pyqt-node-editor-master)
  - [SuperManager](https://github.com/LincZero/SuperManager)
  - [BiliTools](https://github.com/LincZero/BiliTools)
- [LincZero.github.io](https://github.com/LincZero/LincZero.github.io) (integration)
  - Theme extension
    - [VuePress-Theme-Hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope)
  - MarkdownIt extension
    - [AnyBlock](https://github.com/any-block) (自研, V3 2024)，用于部分md写法与渲染扩展
    - [markdown-it-obsidian-callout](https://github.com/ebullient/markdown-it-obsidian-callouts) (贡献)，用于obsidian callout语法的渲染，用于代替gfm-alert
    - [@nolebase/markdown-it-bi-directional-links](https://github.com/nolebase/integrations/tree/main/packages/markdown-it-bi-directional-links) (贡献)，用于双链的wiki链接语法的支持
  - VuePress extension
    - newPageHook (开发)，对Markdown-it版本的AnyBlock的补充增强
    - [~~仿文件侧边栏~~](https://github.com/LincZero/LincZero.github.io/tree/main/src/.vuepress/plugin/RootSidebar) (魔改)，组件替换 (后弃用，换用自研侧边栏)
    - [NodeFlow](https://github.com/LincZero/obsidian-node-flow) (开发, 2024)，用于节点工作流的显示与扩展
    - [Tikz](https://github.com/LincZero/LincZero.github.io/tree/main/src/.vuepress/plugins/Tikz/) (开发, 迁移)，Tikz的LaTex宏扩展。
    - [onInitialized-json](https://github.com/LincZero/LincZero.github.io/tree/main/src/.vuepress/plugins/ExFormat) (开发)，格式扩展。对NodeFlow的增强，直接识别工作流json文件
    - [onInitialized-pdf](https://github.com/LincZero/LincZero.github.io/tree/main/src/.vuepress/plugins/ExFormat) (开发)，格式扩展。直接识别pdf库
    - [RootSidebar](https://github.com/LincZero/LincZero.github.io/tree/main/src/.vuepress/plugins/RootSidebar) (自研)，侧边栏，带状态，可指定任意层作为树根部
      - MdBookTool, 支持将MdBook的SUMMARY.md作为数据源生成侧边栏
    - [ReadEnhance](https://github.com/LincZero/LincZero.github.io/tree/main/src/.vuepress/plugins/ReadEnhance) (开发)，阅读增强。除了文本类布局，更多的是为非 `.md` 提供更好的展示效果 (如节点流、pdf等)
  - Workflows extension
    - [LincDocs/Workflows](https://github.com/LincDocs/Workflow) (自研)，特点：构建库与文档库分离、完全零配置 开箱即用、单文件构建 & 可选的单文件配置
- [LincZero-Help-Oneself](../App/LincZero_Help_Oneself/)
  - Kanata - MyScript
  - AutoHotKey - MyScript
  - Typora - MyStyle
  - Obsidian - MyStyle
  - VIA - MyConfig
  - RIME - MyConfig

### AnyBlock (My Org)

- [AnyBlock](https://github.com/any-block) (organization)
  - [any-block-obsidian](https://github.com/any-block/obsidian-any-block)
  - [any-block-obsidian-min](https://github.com/any-block/obsidian-any-block-min)
  - markdwon-it-any-block
  - VuepressDemo (about how to use markdwon-it-any-block in vuepress)
  - VitepressDemo (about how to use markdwon-it-any-block in vitepress)

### LincDocs (My Org)

(It might not be updated in time, see: https://lincdocs.github.io/)

Include many of your own or third party documents, make it easy to manage them, and add site deployment services/proxy deployment services for them.

包括许多自己的和第三方的文档，使他们易于管理，并为它们添加在线文档网站的部署服务

- [LincDocs](https://lincdocs.github.io/)
  - [MdNote_Public](https://github.com/LincDocs/MdNote_Public)
    - 内容: Linc的公开笔记
    - 在线：https://lincdocs.github.io/MdNote_Public/ (备用 https://linczero.github.io/MdNote_Public/) 
  - [Workflow](https://github.com/LincDocs/Workflow)
    - 内容: 该组织的网站部署工作流
    - 在线: https://lincdocs.github.io/Workflow/
  - [Pkmer-Math](https://github.com/LincDocs/Pkmer-Math) (代理)
    - 内容: 数学库
    - 在线: https://lincdocs.github.io/Pkmer-Math/
    - 原库：https://github.com/PKM-er/Pkmer-Math
    - 在线：https://pkm-er.github.io/Pkmer-Math/
  - [AnyBlock](https://github.com/LincDocs/AnyBlock) (代理)
    - 内容：一个通用多平台的markdown扩展，能快速选择区域并渲染为特定内容
    - 在线：https://lincdocs.github.io/AnyBlock/
    - 原库：https://github.com/any-block/obsidian-any-block 的文档构
  - [ComfyUI-Workflows-Linc](https://github.com/LincDocs/ComfyUI-Workflows-Linc)
    - 内容: 个人的ComfyUI学习仓库
    - 在线: https://lincdocs.github.io/ComfyUI-Workflows-Linc/
  - [obsidian-api-request](https://github.com/LincDocs/obsidian-api-request) (代理)
    - 内容：Obsidian的API请求
    - 在线：https://lincdocs.github.io/obsidian-api-request/
    - 原库：https://github.com/LincDemo/obsidian-api-request
  - [nonebot2](https://github.com/LincDocs/nonebot2) (代理)
    - 内容: Onnebot2 Chat机器人框架
    - 在线：https://lincdocs.github.io/nonebot2/
    - 原库: https://github.com/nonebot/nonebot2/tree/master/website/docs
  - [rust-course](https://github.com/LincDocs/rust-course) (代理。**原库 no license, 仅自用并提供迁移参考, 请勿直接使用该库**)
    - 内容：这可能是目前最用心的 Rust 中文学习教程 / Book
    - 在线: https://lincdocs.github.io/rust-course/
    - 原库: https://github.com/sunface/rust-course
    - 在线: https://course.rs/
  - [trpl-zh-cn](https://github.com/LincDocs/trpl-zh-cn) (代理)
    - 内容: Rust 程序设计语言（2021 edition） 
    - 在线: https://lincdocs.github.io/trpl-zh-cn/
    - 原库: https://github.com/KaiserY/trpl-zh-cn
    - 在线: kaisery.github.io/trpl-zh-cn/
  - [rust-by-example-cn](https://github.com/LincDocs/rust-by-example-cn) (代理)
    - 内容: Rust By Example 中文版(包含在线代码编辑器)
    - 在线: https://lincdocs.github.io/rust-by-example-cn/
    - 原库: https://github.com/rust-lang-cn/rust-by-example-cn
    - 在线: rustwiki.org/zh-CN/rust-by-example
  - [pdf](https://github.com/LincDocs/pdf) (实验)
    - 内容: pdf书库 (实验)
    - 在线: https://lincdocs.github.io/pdf/
  - ...
- Other (同作者非该组织下的其他相关文档)
  - [LincZero.github.io](https://linczero.github.io/)
  - [ComfyUI-Workflows-Linc](https://github.com/LincDocs/ComfyUI-Workflows-Linc)
    - 内容: 我的 ComfyUI 学习工作流库
    - 在线: https://lincdocs.github.io/ComfyUI-Workflows-Linc/
  - [ComfyUI-Workflows-ZHO](https://linczero.github.io/MdNote_Other/ComfyUI-Workflows-ZHO/) (代理)
    - 内容: 我的 ComfyUI 工作流合集 | My ComfyUI workflows collection
    - 在线: https://linczero.github.io/MdNote_Other/ComfyUI-Workflows-ZHO/
    - 原库: https://github.com/ZHO-ZHO-ZHO/ComfyUI-Workflows-ZHO
  - [ComfyUI_examples](https://github.com/LincDocs/ComfyUI_examples) (代理)
    - 内容: Examples of ComfyUI workflows
    - 在线: https://linczero.github.io/MdNote_Other/ComfyUI_examples/
    - 原库: https://github.com/comfyanonymous/ComfyUI_examples
    - 在线: https://comfyanonymous.github.io/ComfyUI_examples/
  - [Kanata](https://linczero.github.io/MdNote_Public/01.%20DesignAndDevelop/Develop/04.%20Project/Type/Script/Kanata/) 中文翻译文档
    - 内容: 提高键盘的舒适度和可用性与先进的定制
    - 在线: https://linczero.github.io/MdNote_Public/01.%20DesignAndDevelop/Develop/04.%20Project/Type/Script/Kanata/
    - 原库: https://github.com/jtroo/kanata/blob/main/docs/config.adoc

### More

PR

- https://github.com/vuepress
  - https://github.com/vuepress/core
  - https://github.com/vuepress/ecosystem
  - https://github.com/mdit-plugins/mdit-plugins
- https://github.com/mProjectsCode/obsidian-shiki-plugin
  - https://github.com/LincZero/obsidian-shiki-plugin
- [nolebase/markdown-it-bi-directional-links](https://github.com/nolebase/integrations/tree/main/packages/markdown-it-bi-directional-links)
- ...(挺多的，仅列举最近/主要的)

还有部分没整理的，自己到对应的组织首页或仓库看

## Non-open source project

非开源部分

见个人简历页那里 (此处不公布页面url和访问密码，如有需要需联系我)

### 非商业声明

该文件夹下的产品文档，主要展示**开源项目**，而且一般是纯自主设计、开发的项目

公司项目/商业项目不会放在这 (也许会放在个人作品或简历页(加密)那里)

1. 未经公司许可。而且之前公司的项目中，有些产品文档就是不公开的，用户买了产品后才发给对方。
2. 未经经营许可。挂载在 Github/CloudPages 中的网站，感觉不太能用作经营用途。后面如果有需要，可能是要在自己的服务器上备案后才能放相关文档的

还有一部分项目在私有文件夹那边，此处也不予展示

## Idea

非开发成品的灵感设计相关

有一些非成品、待实现的，或仅设计的，我也会放在这，并用 `(idea)` 前缀声明

> [!note]
> 
> 设计是否允许实现
> 
> 除了该文件夹外，还有一些相同内容的在 Private 权限的同名文件夹下。
> 
> 我不希望设计后被抢先实现的，会放在 Private 那边。这边的是允许被实现的。
> 
> 并且这边的是我乐于看到被实现的（因为这边的主要是我自己想去使用，但自己没有充足的时间精力去做）。但是要做的话最好和我提前说，避免重复开发/开发冲突了

## Non-me

(待补充，这里应该会有一些优秀的网络博客)



