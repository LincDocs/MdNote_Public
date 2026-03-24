---
create_date: 2026-03-24
last_date: 2026-03-24
source: https://ai-sdk.dev/docs/introduction
---
# AI SDK

AI SDK 是 TypeScript 工具包，旨在帮助开发人员使用 *React、Next.js、Vue、Svelte、Node.js* 等构建人工智能驱动的应用程序和代理。

## 为什么要使用AI SDK？

将大型语言模型 (LLM) 集成到应用程序中非常复杂，并且严重依赖于您使用的特定模型提供程序。

AI SDK 标准化了支持的 [提供商](https://ai-sdk.dev/docs/foundations/providers-and-models) 之间的人工智能 (AI) 模型集成。这使得开发人员能够专注于构建出色的人工智能应用程序，而不是在技术细节上浪费时间。

如，以下是使用 AI SDK 使用各种模型生成文本的方法：

::: tabs

@tab Gateway

```js
import { generateText } from "ai";

const { text } = await generateText({
  model: "anthropic/claude-sonnet-4.5",
  prompt: "What is love?",
});
```

@tab Provider

```js
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const { text } = await generateText({
  model: anthropic("claude-sonnet-4-5"),
  prompt: "What is love?",
});
```

@tab custom

```js
import { generateText } from "ai";
import { yourProvider } from "your-custom-provider";

const { text } = await generateText({
  model: yourProvider("your-model-id"),
  prompt: "What is love?",
});
```

:::

AI SDK有两个主要库：

- **[AI SDK Core](https://ai-sdk.dev/docs/ai-sdk-core):** 一个统一的 API，用于生成文本、结构化对象、工具调用以及使用法学硕士构建代理。
- **[AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui):** 一组与框架无关的挂钩，用于快速构建聊天和生成用户界面。

## 模型提供者

AI SDK支持 [多种模型提供者](https://ai-sdk.dev/providers)

- Vercel AI Gateway
- OpenAI
- Anthropic
- Google Generative AI
- xAI Grok
- Azure
- Amazon Bedrock
- Groq
- Fal AI
- DeepInfra
- Google Vertex AI
- Mistral
- Together.ai
- Cohere
- Fireworks
- DeepSeek
- Cerebras
- Perplexity
- Luma AI
- Baseten

## 模板

我们已经构建了一些模板 其中包括针对不同用例、提供商和框架的 AI SDK 集成。您可以使用这些模板开始使用 AI 支持的应用程序。

### 入门套件

- 聊天机器人入门模板
- 内部知识库 (RAG)
- 多模态聊天
- 语义图像搜索
- 自然语言 PostgreSQL

### 特征探索

- 功能标志示例
- 具有遥感功能的聊天机器人
- 结构化对象流
- 多步骤工具

### 框架

- Next.js OpenAI Starter (React)
- Nuxt OpenAI Starter (Vue.js)
- SevelteKit OpenAI Starter
- Solid OpenAI Starter

### 生成式用户界面

- Gemini Chatbot
- 使用 RSC 生成 UI (实验性)

### 安全性

- 机器人防护
- 速率限制

## 加入我们的社区

如果您对 AI SDK 有任何疑问，欢迎您在 [Vercel 社区](https://community.vercel.com/c/ai-sdk/62) 向我们的社区提问。

## llms.tx (对于Cursor、Windsurf、Copilot、Claude等)

您可以在 ai-sdk.dev/llms.txt 访问 Markdown 格式的整个 AI SDK 文档。这可以用来向任何法学硕士（假设它有足够大的上下文窗口）询问有关基于最新文档的 AI SDK 的问题。

### 用法示例

例如，向 LLM 提出有关 AI SDK 的问题：

1. 从 ai-sdk.dev/llms.txt 复制文档内容
2. 使用以下提示格式：

```
Documentation:
{paste documentation here}
---
Based on the above documentation, answer the following:
{your question}
```




