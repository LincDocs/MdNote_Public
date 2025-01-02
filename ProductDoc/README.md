# README

## 导航

- 开源产品
  - [AnyBlock](./AnyBlock/)
  - [NodeFlow](./Plugin/NodeFLow/)
  - [Obsidian-Chat-View-QQ](./Plugin/Obsidian-Chat-View-QQ/)
  - [Lc Document Web](./Web/LincZero_Document_Library/)
  - [Lc Nav](./Web/LcNavWeb/)
  - [BiliTool](./App/B站小工具/)
  - [LincZero-Help-Oneself](../App/LincZero_Help_Oneself/)
- 非开源产品
  - 略，不予显示

部分项目包含多个也是开源的子项目：（也许是monorepo，也许是multirepo）

- [Lc Document Web](./Web/LincZero_Document_Library/)
  - Theme extension
    - VuePress-Theme-Hope
  - MarkdownIt extension
    - AnyBlock (自研, V3 2024)，用于部分md写法与渲染扩展
    - markdown-it-obsidian-callout (贡献)，用于obsidian callout语法的渲染，用于代替gfm-alert
    - @nolebase/markdown-it-bi-directional-links (贡献)，用于双链的wiki链接语法的支持
  - VuePress extension
    - newPageHook (自研)，对Markdown-it版本的AnyBlock的补充增强
    - 仿文件侧边栏 (魔改)，组件替换 (后弃用，换用自研侧边栏)
    - NodeFlow (自研, 2024)，用于节点工作流的显示与扩展
    - onInitialized-json (自研)，格式扩展。对NodeFlow的增强，直接识别工作流json文件
    - onInitialized-pdf (自研)，格式扩展。直接识别pdf库
    - RootSidebar (自研)，侧边栏，带状态，可指定任意层作为树根部。完全舍弃掉theme中的sidebar配置
    - relational_graph，双链图谱
  - Workflows extension
    - LincDocs/Workflows (自研)
- [LincZero-Help-Oneself](../App/LincZero_Help_Oneself/)
  - Kanata - MyScript
  - AutoHotKey - MyScript
  - Typora - MyStyle
  - Obsidian - MyStyle
  - VIA - MyConfig
  - RIME - MyConfig

## 一些声明

### 非商业声明

该类产品文档主要展示开源项目，而且一般是纯自主设计、开发的项目

公司项目/商业项目不会放在这 (也许会放在个人作品或简历页(加密)那里)

1. 未经公司许可。而且之前公司的项目中，有些产品文档就是不公开的，用户买了产品后才发给对方。
2. 未经经营许可。挂载在 Github/CloudPages 中的网站，感觉不太能用作经营用途。后面如果有需要，可能是要在自己的服务器上备案后才能放相关文档的

还有一部分项目在私有文件夹那边，此处也不予展示

### 非开发成品的灵感设计

有一些非成品、待实现的，或仅设计的，我也会放在这，并用 `(idea)` 前缀声明

#### 设计是否允许实现

除了该文件夹外，还有一些相同内容的在 Private 权限的同名文件夹下。

我不希望设计后被抢先实现的，会放在 Private 那边。这边的是允许被实现的。

并且这边的是我乐于看到被实现的（因为这边的主要是我自己想去使用，但自己没有充足的时间精力去做）。但是要做的话最好和我提前说，避免重复开发/开发冲突了





