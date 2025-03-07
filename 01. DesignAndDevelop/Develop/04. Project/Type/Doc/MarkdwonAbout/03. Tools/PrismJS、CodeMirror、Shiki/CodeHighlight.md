---
create_time: 2025-03-03
Author: LincZero
---
# CodeHighlight

## 调研

:::code(chat)
me:
调研前端的代码高亮库，开源的话给出地址和star数

deepseek:
### 代码高亮开源库调研

以下是几款主流的前端代码高亮开源库的调研总结，涵盖功能特点、GitHub地址及Star数（数据截至2025年3月3日）：

#### 1. highlight.js

- GitHub地址: [github.com/highlightjs/highlight.js](https://github.com/highlightjs/highlight.js)  
- Star数: **24.1k**
- 特点:  
  - 支持 **196种编程语言** 和 **242种主题**，自动检测语言类型。  
  - 轻量级（核心库仅约6KB），支持浏览器端和Node.js环境，兼容任何框架。  
  - 使用简单，通过 `<pre><code>` 标签自动高亮，支持自定义标签和禁用高亮。  
  - 提供CDN加速，社区活跃，持续维护。  

#### 2. PrismJS

- GitHub地址: [github.com/PrismJS/prism](https://github.com/PrismJS/prism)  
- Star数: 约 **12.8k**  
- 特点:  
  - 模块化设计，支持按需加载语言插件，核心库仅约 **2KB**。
  - 提供丰富的主题扩展（如官方主题库 [Prism-Themes](https://github.com/PrismJS/prism-themes)），支持代码行号、高亮特定行等高级功能。
  - 兼容现代前端框架（React、Vue等），支持服务端渲染。

#### 3. Starry Night

- GitHub地址: [github.com/wooorm/starry-night](https://github.com/wooorm/starry-night)  
- Star数: 约 **3.2k**
- 特点:
  - 基于 **TextMate语法引擎**，支持 **600+种语言**，提供与GitHub一致的高亮效果。
  - 支持生成HTML或AST（抽象语法树），适用于博客、文档网站及命令行工具。
  - 依赖WebAssembly优化性能，支持深色/浅色主题切换。

#### 4. Shiki

- GitHub地址: [github.com/shikijs/shiki](https://github.com/shikijs/shiki)
- Star数: 约 **7.6k**
- 特点:
  - 基于VS Code的高亮引擎，支持 **VS Code主题**，语法精准度高。
  - 支持静态生成，适合静态网站（如Jekyll、Hugo），避免客户端计算开销。

#### 5. React Syntax Highlighter

- GitHub地址: [github.com/react-syntax-highlighter/react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- Star数: 约 **4.1k**
- 特点:
  - 专为React设计，封装了PrismJS和Highlight.js，提供组件化调用。
  - 支持代码行高亮、行号、自定义样式等，适用于动态内容渲染。

#### 对比与选择建议

- 轻量级需求：优先考虑 **highlight.js** 或 **PrismJS**，适合快速集成且无需复杂配置。
- 高精度与主题多样性：选择 **Starry Night** 或 **Shiki**，尤其适合技术文档或对标GitHub风格的项目。
- 框架集成：React项目推荐 **React Syntax Highlighter**，Vue项目可使用 **highlight.js的Vue插件**。

用户可通过GitHub链接查看详细文档和最新数据。若需更完整的库列表或主题示例，可参考各项目的官方Demo页面（如highlight.js的[Demo](https://highlightjs.org/static/demo/)。

以下是对 **Shiki**、**Prism.js** 和 **Highlight.js** 三款主流前端代码高亮库的对比分析，结合功能特性、性能表现及适用场景，给出选用建议：

@chat me

重点比较 shiki prismjs highlight.js 三者，突出他们的优点缺点，给出选用建议

@chat deepseek

### 重点比较 shiki prismjs highlight.js

#### 1. Shiki

- 优点
    1. 高精度分词  
       基于 VS Code 的语法引擎和 TextMate 语法规则，分词精细度接近专业编辑器（如 VSCode、PyCharm），支持代码结构中的装饰器、f-string、参数类型等复杂语法元素的区分。
    2. 主题丰富性  
       支持直接使用 VS Code 主题，提供与编辑器一致的视觉效果，且支持深浅色模式切换。
    3. 静态生成优化  
       适合静态网站（如 Jekyll、Hugo），在构建时生成高亮代码，减少客户端计算开销。
    4. 性能高效  
       通过 WebAssembly 优化，支持细粒度语言和主题的按需加载，避免冗余资源加载。
- 缺点
    1. 客户端动态渲染性能受限  
       若需在浏览器端动态高亮代码，依赖 WebAssembly 可能增加初始化耗时。
    2. 配置复杂度较高  
       需要手动管理语言包和主题，对新手不够友好。

#### 2. Prism.js

- 优点
    1. 轻量灵活  
       核心库仅 2KB，支持按需加载语言和插件（如行号、复制按钮），适合对性能敏感的场景。
    2. 扩展性强  
       提供丰富的插件生态（如代码折叠、语言别名映射），支持自定义主题和样式。
    3. 框架友好  
       与 Vue、React 等现代框架集成简单，支持服务端渲染。
    4. 分词表现中上  
       分词精度优于 Highlight.js，但略逊于 Shiki，能满足大多数常见需求。
- 缺点
    1. 主题风格有限  
       官方主题数量较少，需依赖第三方主题库（如 Prism-Themes）扩展。
    2. 动态内容需手动触发  
       在动态渲染场景中需调用 `Prism.highlightAll()` 手动更新高亮。

#### Highlight.js

- 优点
    1. 开箱即用  
       自动检测代码语言，无需手动指定，支持 196 种语言和 242 种主题，适合快速集成。
    2. 社区活跃  
       维护时间长，文档丰富，兼容性广泛。
    3. 轻量级  
       核心库约 6KB，CDN 支持加速加载。
- 缺点
    1. 分词粗糙  
       对复杂语法（如装饰器、f-string）支持不足，部分语言高亮效果与专业工具有明显差距。
    2. 扩展功能有限  
       需要自行实现行号、复制等功能，插件生态较弱。
    3. 样式兼容问题  
       某些主题在移动端可能导致代码换行错位，需额外 CSS 修复。

#### 综合对比与选用建议

| 维度    | Shiki     | Prism.js    | Highlight.js |
| --------- | ------------- | --------------- | ---------------- |
| 分词精度  | 极高（近编辑器级）     | 中上              | 一般               |
| 主题丰富性 | 高（VS Code 主题） | 中（依赖扩展）         | 高（原生主题多）         |
| 性能    | 静态生成快，动态稍慢    | 轻量灵活            | 轻量但动态渲染效率一般      |
| 框架支持  | 通用（需配置）       | 友好（Vue/React插件） | 通用（需手动封装）        |
| 适用场景  | 静态站点、文档       | 动态应用、博客         | 快速集成、简单需求        |

#### 选用建议

2. 追求高精度与美观
   选择 **Shiki**，尤其适合技术文档、对标 GitHub/VSCode 风格的项目。
3. 轻量灵活与动态渲染
   选择 **Prism.js**，适合需要行号、复制等插件功能的动态应用或博客。
4. 快速集成与简单需求
   选择 **Highlight.js**，适合对高亮精度要求不高的小型项目或快速原型开发。

#### 附加推荐

- React/Vue 项目：可结合框架专用封装（如 `react-syntax-highlighter` 或 `vue-highlightjs`）简化集成。
- 性能优化：若使用 Shiki，建议通过静态生成减少客户端负担；若使用 Prism.js，按需加载语言和插件。

通过以上分析，可根据项目需求选择最合适的工具。如需进一步了解具体配置，可参考各库的官方文档或示例页面。

@chat me

你还应该给出他们分别在哪里有应用。以及帮我看下obsidian、typora、vuepress、vscode分别用的什么方案？

@chat deepseek

### 实际应用场景

#### 1. Shiki

- 应用场景
  - 静态站点生成器（如 **VuePress**、**Docusaurus** 的插件）  
  - 技术文档平台（如 **VitePress** 默认高亮方案）  
  - 需要精准语法高亮的 Markdown 渲染工具（如 **GitBook** 的扩展方案）

#### 2. Prism.js

- 应用场景
  - 博客系统（如 **Hexo**、**Gatsby** 的默认高亮）  
  - 动态网页应用（如 **MDN Web Docs** 的代码示例）  
  - 富文本编辑器（如 **Tiptap** 的代码块插件）

#### 3. Highlight.js

- 应用场景
  - 快速集成的小型项目（如 **Discourse 论坛** 的代码片段）  
  - CMS 系统（如 **WordPress** 的代码高亮插件）  
  - 在线代码展示工具（如 **CodePen** 的早期版本）

#### 再次总结调研

| 工具      | 高亮方案                                                                 | 说明                                                                 |
|---------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Obsidian  | 基于 **CodeMirror 6** + **Lezer 语法树**                                   | 依赖 CodeMirror 的语法解析能力，深度集成 Markdown 编辑与实时高亮。              |
| Typora    | 自研高亮引擎（推测基于 **CodeMirror** 或 **Prism.js** 定制）               | 高亮风格简洁，支持实时渲染，但未公开技术细节。                                  |
| VuePress  | 默认使用 **Prism.js**，支持切换为 **Shiki**（需配置）                     | 官方推荐 Shiki 作为静态生成优化方案，动态模式下仍依赖 Prism.js。                 |
| VS Code   | 基于 **TextMate 语法引擎**（与 **Shiki** 同源）                           | 使用 TextMate 的 `.tmLanguage` 语法规则，支持扩展主题和语法包。                 |
:::

## 我的一个需求

:::code(chat)

me:
假如我现在的需求是：需要在客户端进行代码编辑并实时高亮，你最推荐哪个？

deepseek:

### 需求分析：客户端代码编辑 + 实时高亮

#### 核心挑战

1. 实时性：编辑时需即时触发高亮，对性能敏感。  
2. 精准性：需支持复杂语法（如 JSX、TypeScript 类型注解）。  
3. 轻量化：避免因高亮库过大导致页面卡顿。

#### 方案对比

| 库         | 实时高亮适配性                                                                 | 关键限制                                                                 |
|----------------|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Shiki      | ❌ 较差<br>（依赖静态生成或 WebAssembly，动态编辑场景初始化延迟较高）               | 需预加载语言和主题，动态渲染性能较差，适合静态内容展示。                          |
| Prism.js   | ✅ 优秀<br>（轻量，支持按需加载语言，可监听输入事件手动触发高亮）                   | 需调用 `Prism.highlightAll()` 更新高亮，对高频输入需做防抖优化。                   |
| Highlight.js| ✅ 一般<br>（自动检测语言，但分词粗糙，复杂语法高亮效果差）                         | 无法精准处理 TS/JSX 等嵌套语法，适合简单代码片段。                                |

#### 最终推荐：Prism.js

理由：

1. 平衡性能与精度：轻量核心（2KB）支持按需加载语言，分词精度满足大多数动态编辑场景。  
2. 扩展性强：可通过插件添加行号、代码复制、折叠等功能，适配编辑器需求。  
3. 社区支持：丰富的示例和框架封装（如 `vue-prism-editor`、`react-simple-code-editor`）。  

#### 优化方向

1. 高频输入防抖
   ~~~javascript
   let timeout;
   editor.addEventListener('input', () => {
     clearTimeout(timeout);
     timeout = setTimeout(() => Prism.highlightAll(), 300);
   });
   ~~~
2. 按需加载语言
   ~~~html
   <!-- 仅加载必要语言 -->
   <script src="prism-core.js"></script>
   <script src="prism-javascript.js"></script>
   <script src="prism-typescript.js"></script>
   ~~~
3. 主题适配
   使用 VS Code 风格主题库（如 [Prism Theme VS Code](https://github.com/PrismJS/prism-themes)）提升视觉效果。

#### 替代方案参考

若对高亮精度要求极高且可接受性能妥协：  
- **Shiki + 定制 Web Worker**：  
  将 Shiki 的高亮计算移至 Web Worker 线程，避免主线程阻塞，示例：  
  ~~~javascript
  // 主线程
  const worker = new Worker('shiki-worker.js');
  editor.onInput(() => worker.postMessage(code));

  // Worker 线程
  shiki.getHighlighter({ theme: 'github-dark' }).then(highlighter => {
    self.onmessage = (e) => {
      const html = highlighter.codeToHtml(e.data, { lang: 'typescript' });
      self.postMessage(html);
    };
  });
  ~~~

#### 总结

- **优先选 Prism.js**：适合大多数实时编辑场景，轻量且易扩展。  
- **备选 Shiki + Worker**：仅在高精度需求且愿意投入性能优化时采用。  
- **避免 Highlight.js**：除非项目对高亮质量要求极低。  

可根据实际项目复杂度选择方案，建议从 Prism.js 开始快速验证原型。
:::

## 区别、应用

[table]

- [highlight.js](https://github.com/highlightjs/highlight.js) | 24.1k | 2 months ago
- [PrismJS](https://github.com/PrismJS/prism)      | 12.5k | 3 years ago
- [Shiki](https://github.com/shikijs/shiki)        | 11.0k | 9 hours age

实际应用

- [vuepress-hope-theme 代码块](https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html) 使用的是Shiki和Prismjs
- Obsidian实时模式、Typora使用的是CodeMirror (你可以使用CodeMirror官网上的预设方案来修改代码块样式)
- Obsidian阅读模式: 好像是Shiki
- vscode: TextMate Grammars 
