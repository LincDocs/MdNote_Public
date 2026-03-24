---
create_date: 2026-03-24
last_date: 2026-03-24
author:
  - LincZero
---
# vercal_ai

[vercel/ai](https://github.com/vercel/ai)

## 基本使用

```bash
npm install ai
npx skills add vercel/ai
```

相关依赖 - 供应商sdk:

```json
"@ai-sdk/openai": "^1.0.0",
"@ai-sdk/anthropic": "^1.0.0",
"@ai-sdk/google": "^1.0.0",
"@ai-sdk/ollama": "^1.0.0"
```

相关依赖 - UI:

|方案 | UI Hooks | 框架要求 |
|---|---|---|
| @ai-sdk/react | useChat / useCompletion | React + 服务端路由（Next.js 等） |
| @ai-sdk/vue | useChat / useCompletion | Vue + 服务端路由（Nuxt 等） |
| 纯 Vite | ❌ 不支持 | 需要自己写 |

## vercal_ai 官方文档目录

[vercel/ai](https://github.com/vercel/ai)

原文没有中文翻译，这里是中文笔记，如果感觉翻译不好或某些词不达意，请参见原文

翻译注意点: LLM == 大语言模型 != 法学硕士

### 导航栏

- 文档
- Cookbook
- 供应商
- 工具注册表
- 游乐场
- AI 元素
- AI 网关

### 文档

- Vercel 的 AI SDK
- 基础
  - 概述
  - 提供商量和模型
  - Prompts
  - 工具
  - 流式 UI
  - 提供商选项
- [开始使用](https://ai-sdk.dev/docs/getting-started)
  - 选择供应商 (即选择 AI 模型)
  - 浏览 Library (即选择 AI SDK)
  - Next.js App Router (React)
  - Next.js Pages Router (React)
  - SvelteKit
  - Nuxt (Vue.js)
  - Node.js
  - Expo
- Agent (代理商)
  - ...
- AI SDK Core
  - ...
- AI SDK UI
  - ...
- AI SDK RSC
  - ...
- 高级
  - ...
- 参考
  - ...
- 迁移指南
  - ...
- 故障排除
  - ...







