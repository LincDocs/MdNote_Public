---
create_date: 2025-09-19
last_date: 2025-09-19
author: LincZero
---
# Json编辑器

## 可视化的json在线编辑

略，直接搜有很多

有一个感觉比较不错的是：Postman 和 foxapi 那种形式的。虽然不是传统意义上的json编辑器，但编辑和交互起来非常方便

## 可视化的json编辑库

### 需求

我想要在我的软件中内嵌一个便于编辑通用json的一个json编辑器。其作用：

- 方便更好地编辑正确的json (避免文本形式编写时容易出现错误)
- 提高编辑效率
- 利好小白编辑

### GPT简单调研

gemini:

[addClass(ab-super-width)]

| 特性          | JSON Editor (Jos de Jong) | Monaco Editor  | CodeMirror | 框架特定组件  |
| ----------- | ------------------------- | -------------- | ---------- | ------- |
| 易用性 (对开发者)  | ★★★★★                     | ★★★☆☆          | ★★★★☆      | ★★★★★   |
| 功能强大性       | ★★★★☆                     | ★★★★★          | ★★★★☆      | ★★★☆☆   |
| 用户友好度 (对小白) | ★★★★★                     | ★★★★★          | ★★★☆☆      | ★★★★☆   |
| 定制性         | ★★★★☆                     | ★★★★★          | ★★★★★      | ★★★☆☆   |
| 推荐场景        | 通用、快速集成                   | 专业、需 Schema 校验 | 轻量、需深度定制   | 已有特定技术栈 |

deepseek:

[addClass(ab-super-width)]

| 特性/编辑器    | JSONEditor (原生JS)        | json-editor-vue3 (Vue3组件)      | my-json-editor (Vue3组件)      | JSONedit (独立桌面应用) |
| --------- | ------------------------ | ------------------------------ | ---------------------------- | ----------------- |
| 核心类型      | 原生JavaScript库            | Vue 3组件封装                      | Vue 3组件封装                    | 独立桌面软件 (Windows)  |
| 集成方式      | 通过JS引入，框架无关              | 作为Vue组件引入                      | 作为Vue组件引入                    | 进程调用，非内嵌          |
| 多种视图模式    | 树、代码、表单、文本、预览            | 树、代码、表单、文本、预览                  | 树、代码、表单、文本、预览                | 树、列表、文本           |
| 语法验证与错误提示 | ✅                        | ✅                              | ✅                            | ✅                 |
| 树形结构可视化   | ✅                        | ✅                              | ✅                            | ✅                 |
| 代码编辑模式    | ✅ (基于ACE编辑器)             | ✅                              | ✅                            | ✅                 |
| 主题/样式定制   | ✅                        | ✅ (通过Vue属性)                    | ✅ (通过Vue属性)                  | ❌                 |
| 框架支持      | 所有主流Web框架                | Vue 3                          | Vue 3                        | .NET, C++等桌面环境    |
| 安装/引入     | `npm install jsoneditor` | `npm install json-editor-vue3` | `npm install my-json-editor` | 下载EXE文件           |
| 许可证       | Apache-2.0               | MIT                            | MIT                          | 未明确               |
| 适用场景      | Web应用、React、Angular等     | Vue 3项目                        | Vue 3项目                      | 传统桌面软件集成          |

总结：这类的json编辑器优点是编辑起来非常像json，缺点也是编辑起来非常像json。对于非通用的有约束的json，其可视化和封装程度明显不足

## 带约束的json编辑库

### 需求

有时我们不希望json是通用地被编辑，更常见的是约束一个类型，如:

```typescript
export type ContextMenuItem = {
  label: string
  // 如果是字符串则表示黏贴该字符串，方便声明demo模板 (TODO demo模板可能需要配图和help url?)
  callback?: string
  icon?: string // 目前仅obsidian环境有效，使用lucide图标
  children?: ContextMenuItems
}
export type ContextMenuItems = ContextMenuItem[]
```

然后限制基于该类型去做一个简单的类json型的可视化编辑器

这里可能需要借助的一个东西是：**JSON Schema**

### 调研 (schema-driven json 编辑库)

有了 Schema 之后，您就可以使用以下这些库来生成可视化编辑器了。这些库会自动根据 Schema 创建输入框、下拉菜单、复选框、嵌套表单等。

- [react-jsonschema-form (RJSF)](https://github.com/rjsf-team/react-jsonschema-form) ⭐15.2k, 2 days ago, ts
  网站/在线: https://rjsf-team.github.io/react-jsonschema-form/
  如果您的技术栈是 **React**，这是**首选**。它是这个领域最强大、最流行的库。
  - 主要特点:
    - 自动生成表单: 传入一个 JSON Schema，它会自动生成一个完整的 HTML 表单。
    - 高度可定制: 您可以自定义每个字段的 Widget（例如，用颜色选择器代替文本框）、自定义整个表单的布局和主题。
    - 实时校验: 用户输入时，会根据 Schema 实时显示错误信息。
    - 社区活跃: 有大量的主题包（如 Material-UI, Bootstrap, Ant Design）和文档支持。
  - 推荐理由: 功能最完善，生态最成熟。对于复杂的、需要高度定制的场景，它是最佳选择。
- [josdejong/jsoneditor](https://github.com/josdejong/jsoneditor) ⭐12.1k, 3 weeks ago, js
  网站: [JSON Editor (Jos de Jong's)](https://github.com/josdejong/jsoneditor/blob/develop/docs/api.md#json-schema-validation)
  我上次提到的这个通用编辑器，其实也**内置了强大的 JSON Schema 支持**。
  - 主要特点:  
    - 模式切换: 它可以在“树状视图”下工作，当您传入一个 Schema 时，它会：
      - 在添加新字段时，只允许您添加 Schema 中定义的字段。
      - 对字段值的类型进行限制（例如，`label` 字段只能输入文本）。
      - 通过上下文菜单提供符合 Schema 的操作。
    - 代码视图增强: 在“代码视图”下，如果传入 Schema，它会提供基于 Schema 的自动补全和实时验证，这和 VS Code 的体验非常相似。
  - 推荐理由: 如果您想同时为用户提供**简单的树状编辑**和**专业的代码编辑**两种模式，并且两种模式都受 Schema 约束，那么这个库是完美的选择。它不依赖任何框架，集成非常灵活。
- [jsonform](https://github.com/jsonform/jsonform) ⭐2.8k, last year
  [JSON Forms](https://jsonforms.io/)
  这是一个专注于从 JSON Schema 生成表单的解决方案，并且对主流框架（React, Angular, Vue）都有官方支持。
  - 主要特点:  
    - 解耦设计: 将 Schema (数据结构)、UI Schema (布局) 和渲染器分离开，提供了极高的灵活性。
    - 框架支持: 为 React, Vue, Angular 提供了专门的包，集成体验很好。
    - 可扩展性: 同样支持自定义渲染器和布局。
  - 推荐理由: 如果您在一个团队或公司内，希望为不同的项目（可能使用不同框架）提供一套统一的、基于 Schema 的表单生成方案，JSON Forms 是一个理想的选择。
- [vue-json-schema-form](https://github.com/lljj-x/vue-json-schema-form) ⭐2.2k, last month

## 总结

### 调研

- [microsoft/monaco-editor](https://github.com/microsoft/monaco-editor) ⭐44k, last week, js
  这个是VSCode所用的编辑器。这是纯文本的json编辑器，而不是可视化的
- [josdejong/jsoneditor](https://github.com/josdejong/jsoneditor) ⭐12.1k, 3 weeks age, js
  在线体验: https://jsoneditoronline.org/
- [jsonform/jsonform](https://github.com/jsonform/jsonform) ⭐2.8k, last year
- [lljj-x/vue-json-schema-form](https://github.com/lljj-x/vue-json-schema-form) ⭐2.2k, last month
- [rjsf-team/react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) ⭐15.2k, 2 days ago, ts
  网站/在线: https://rjsf-team.github.io/react-jsonschema-form/
  RJSF。效果不错，像demo里的nested，可以看到其支持array效果
  一个缺点是不支持折叠……

不足:

- 通用json编辑器太像json，约束、封装、可视化都不够好
- 根据schema生成表单符合一些，但array和json好像都不能折叠
  然后样式不一定符合，例如可能会希望有表格视图

### star-history

[![Star History Chart](https://api.star-history.com/svg?repos=josdejong/jsoneditor,microsoft/monaco-editor&type=Date)](https://www.star-history.com/#josdejong/jsoneditor&microsoft/monaco-editor&Date)


