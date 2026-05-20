---
create_date: 2026-05-17
last_date: 2026-05-17
author:
  - LincZero
---
# Json注释之为什么tsconfig可以

## 背景

我有个问题，为什么在 tsconfig.json 中可以添加注释，而在 package.json 添加注释的话会编辑器报错。

一个猜测不知道对不对：是因为 package.json 会被包管理器自动编辑，而这个过程中难以保留注释，可能导致注释消失。所以给你警告。而 tsconfig.json 没这种问题。

另一个猜测是 json 没有注释文件是对的，tsconfig.json 例外是因为当你使用了他时，就表示你已经有了 ts 或之类的依赖，而该依赖会处理注释。而 package.json 是更通用的配置，你无法确认项目中是否有可以处理 json 注释的依赖，为了统一性干脆统一禁止其注释行为。

## Gemini 3.1 Pro 回答

你的这两个猜测**都非常准确，而且直接切中了问题的核心！** 你已经把最主要的两个原因都想到了。

你的理解完全正确，下面我顺着你的思路为你补充一些技术细节：

### 1. 根本原因：JSON 标准规范与解析器的差异（你的第二个猜测）

- **标准的 JSON 规范是禁止注释的**：JSON 的发明者 Douglas Crockford 曾明确表示，他在设计 JSON 规范时故意去掉了注释功能，主要是为了防止有人利用注释来夹带私货（比如制定非标准的解析指令），从而破坏 JSON 作为纯粹数据交换格式的跨平台互通性。
- **`package.json` 必须是严谨的纯 JSON**：因为它是整个前端生态的基石。不仅 Node.js 和 npm/yarn/pnpm 要读它，CI/CD 工具、甚至 Python/Go 写的各种其他构建工具都会去读取它。为了保证**任何语言、任何标准的 `JSON.parse()`** 都能无缝解析它，它必须严格遵守 JSON 规范。
- **`tsconfig.json` 是一个“特例”（JSONC）**：就像你猜测的，用到 `tsconfig.json` 就意味着你在使用 TypeScript。它的最终解析者是 TypeScript 编译器（`tsc`）。微软在开发 TypeScript 时，非常清楚配置文件需要注释来解释复杂的选项，因此 **TypeScript 内部实现了一个自定义的 JSON 解析器**，专门允许并忽略 `//` 和 `/* */` 注释。
  - 在 VS Code 中，如果你留意右下角的语言模式，普通的 `.json` 文件显示的是 `JSON`，而当你打开 `tsconfig.json` 时，VS Code 会偷偷把它识别为 **`JSON with Comments` (简称 `jsonc`)**。这就是为什么编辑器不会给你报错的原因。

### 2. 工程化原因：包管理器的自动覆写（你的第一个猜测）

- **`JSON.stringify` 会“吃掉”注释**：即使 npm 允许 `package.json` 带有注释，在工程实践中也会带来灾难。当你运行 `npm install xxx` 或者 `npm run lint -- --fix` 更新脚本时，包管理器的底层逻辑是：
    1. 用 `JSON.parse()` 读取 `package.json` 转换为 JS 对象。
    2. 在内存中修改这个对象（比如在 `dependencies` 里加了一行）。
    3. 用 `JSON.stringify()` 重新把它写回文件。
- 在这个“读取 -> 序列化写入”的过程中，**标准的 JS 对象里是无法保存注释节点的**。如果 `package.json` 里写了注释，只要你随便装一个新包，文件被覆写后，你辛辛苦苦写的注释就会瞬间全部消失。
- 因为很难低成本地做到“修改 JSON 的同时保留原有注释格式”，所以规范强制要求不能有注释，编辑器也会标红阻止你这么做。

### 总结

你非常敏锐地看透了本质。

- **`package.json` 是“数据交换格式”**，要求绝对通用和标准（纯 JSON）
- **`tsconfig.json` 是“应用专属配置文件”**，它由专门的程序（tsc）负责解析，所以采用了更人性化的带注释的 JSON（JSONC）。



