# README

## Open source project

开源部分

主创开源项目（注意，其中很多项目被我迁移到了organization中。如果你想了解更多，不妨到这些组织仓库里看看）<br>
（Note that many of these projects were migrated to my organization. If you want to learn more, check out these organizational warehouses）

### Common

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

### AnyBlock (My org)

- [AnyBlock](https://github.com/any-block) (organization)
  - [any-block-obsidian](https://github.com/any-block/obsidian-any-block)
  - any-block-obsidian-min
  - markdwon-it-any-block
  - VuepressDemo (about how to use markdwon-it-any-block in vuepress)
  - VitepressDemo (about how to use markdwon-it-any-block in vitepress)

### LincDocs (My org)

- [LincDocs](https://github.com/LincDocs) (organization)
  - [Workflows](https://github.com/LincDocs/Workflow)
  - many... (include my main documentation project `MdNote_Public`)

### More

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

### 非开发成品的灵感设计

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





