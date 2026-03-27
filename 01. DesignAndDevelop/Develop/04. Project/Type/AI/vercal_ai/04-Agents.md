# 04-Agents

## Coding Agents 入门

本页介绍了在编码 Agent（例如 Claude Code、Codex、OpenCode、Cursor 或任何其他 AI 辅助开发环境）中工作时如何充分利用 AI SDK。

### 安装 AI SDK 技能

让您的编码代理深入了解 AI SDK 的最快方法是安装官方 AI SDK 技能。技能是轻量级的 Markdown 文件，可根据需要将专门指令加载到代理的上下文中 - 因此您的代理确切地知道如何使用 SDK，而无需您进行解释。

使用 `npx skills add` 安装 AI SDK Skill：

```bash
npx skills add vercel/ai
```

这会将技能安装到代理的特定技能目录中（*例如* `.claude/skills`、`.codex/skills`）。如果您选择多个代理，CLI 会创建符号链接，以便每个代理都可以发现该技能。使用 `-a` 直接指定代理 —— 例如，`-a amp` 安装到通用 `.agents/skills` 目录中。使用 `-y` 进行非交互式安装。

安装后，任何支持 [Agent Skiils (代理技能)](https://agentskills.io) 的代理 format 会在执行 AI SDK 任务时自动发现并加载技能。

> 代理技能使用渐进式披露：您的代理在启动时仅加载技能的名称和描述。仅当任务需要时，才会将完整的说明引入上下文，从而使您的代理保持快速和专注。

### `node_modules` 中的文档和源代码

安装 ai 包后，您就已经在 node_modules 中本地获得了完整的 AI SDK 文档和源代码。您的编码代理可以直接读取这些内容 - 无需访问互联网。

如果尚未安装 ai 软件包，请安装：

```bash
# 四选一
pnpm add ai
npm install ai
yarn add ai
bun add ai
```

安装后，您的 agent 可以在以下路径引用捆绑的源代码和文档：

```bash
node_modules/ai/src/              # 按模块整理的完整源代码
node_modules/ai/docs/             # 包含示例的官方文档
```

这意味着您的代理可以直接从已安装的包中查找准确的 API 签名、实现和使用示例 - 确保它始终使用项目中实际安装的 SDK 版本。

### 安装开发工具

AI SDK DevTools 可让您在开发过程中全面了解 AI SDK 调用。它捕获 LLM 请求、响应、工具调用、令牌使用和多步骤交互，并将它们显示在本地 Web UI 中。

> [!warning]
> AI SDK DevTools 是实验性的，仅适用于本地开发。不要在生产环境中使用。

安装开发工具包：

```bash
# 四选一
pnpm add @ai-sdk/devtools
npm install @ai-sdk/devtools
yarn add @ai-sdk/devtools
bun add @ai-sdk/devtools
```

#### 添加中间件

#### 启动查看器

### 检查工具调用和输出

### 下一步去哪里？


















