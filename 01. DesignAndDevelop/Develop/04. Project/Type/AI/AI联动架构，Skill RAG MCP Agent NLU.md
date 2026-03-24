---
create_date: 2026-03-17
last_date: 2026-03-22
author:
  - LincZero
---
# AI联动架构，Skill RAG MCP Agent NLU

还有部分内容见 AnyMenu AI 插件的选型文章

## 比较文章

### 读懂AI概念

参考: [【闪客】一口气拆穿Skill/MCP/RAG/Agent/OpenClaw底层逻辑](https://www.bilibili.com/video/BV1ojfDBSEPv/?vd_source=354c23df0ba4fa88870827023af91943)

概念:

- LLM: 大语言模型。LM 是语言模型，词语接龙 -> 对话
- Prompt: 提问的指示
- Context: 提问时的上下文 (背景信息)
- Memory: 记忆。记忆压缩
- Agent: 智能体。
  你和AI中间的程序。
  早期的智能体只是加一段 Prompt 而已，添加能自主上网一个小程序也能叫 Agent。
  举例: 接入 Web Search 和 RAG 也是他的职责。
  原理: 减少你和模型沟通的次数，AI问 -> 你查阅并把资源给他 -> AI获取到资源后正式回答，可以理解为把这一部分给封装
- Web Search: 联网搜索
- RAG: (Retrieval-Augmented Generation) 检索增强生成。向量数据库
- Function Calling: Agent 和 大模型之间工具调用**约定**的对话格式。让大模型知道 Agent 有哪些搜索、文件读取、脚本执行等功能可用并调用之
- MCP: (Model Context Protocal) 模型上下文协议。同上
- 更多 Agent 交互
  - CLI: Claude Code、CodeX、iFlow
  - IDE: Cursor、Antigravity、Trae
  - 桌面助手: Clawdbot、Moltbot、OpenClaw
- Langchain: AI流程变成。相对稳定的工作流。优点: 稳定、快速、省Token
- Workflow: 同上，通常是低代码
- Skill: 技能。特性: 渐进式披露、按需加载
- SubAgent: 子智能体

其他

- Function Calling 和 MCP 怎么区分？
  前者: 是大模型和 Agent 之间的沟通约定，让AI生成内容符合一定的格式，方便解析
  后着: Agent 和工具服务之间的调用约定，类似函数 api 那样约定输入参数、返回值等
- MCP 和 SKILL 怎么区分？
  SKILL: prompt 加载器
  SKILL 能取代 MCP 吗？说是可以，能把 MCP 内容都放在 SKILL 目录下，并在 SKILL.md 中说明

### 其他

- [OpenClaw跟Skills、MCP、RAG和Agent有什么关系？](https://zhuanlan.zhihu.com/p/2015735260248318706)

### AI比较AI联动架构

- 过去（NLU）：听懂死板指令，触发固定的本地开关。
- 现在（Skill）：LLM 充当大脑理解复杂逻辑，指挥本地工具（Skill）执行单步动作。
- 辅助（RAG）：给 LLM 配备可随时查阅的私有资料库。
- 桥梁（MCP）：让千百个第三方软件能以统一接口插进 LLM 的大脑里。
- 未来（Agent）：利用所有接口和资料，帮你规划并跑通多重步骤的赛博管家。

[list2ut|addClass(ab-super-width)]

- < 对比维度
  - 核心解决的问题
  - 主导方
  - 代码层面的形态
  - 相互关系
- Skill
  (技能/工具)
  - 模型如何“采取动作”或获取结构化实时数据
  - 用户/代码逻辑主导，LLM 只负责将意图转为 JSON
  - `functions` 或 `tools` 参数中的 JSON Schema
  - Agent 执行动作的基础单元
- RAG
  (检索增强)
  - 模型如何获取大量“私有非结构化知识”
  - 外部代码主导（负责切片、向量搜索），LLM 只负责阅读和生成
  - 向量化代码 + VectorDB 增删改查逻辑 + Prompt 拼接
  - Agent 解决知识盲区、管理长期记忆的手段
- MCP
  (模型上下文协议)
  - 客户端与工具/数据源之间如何“标准化对接”
  - 标准协议主导，标准化了工具和数据的暴露格式
  - `stdio/SSE` 通信逻辑，暴露 Resource/Tool/Prompt 的 Server
  - 封装 Skill 和 RAG 资源的标准化传输协议
- Agent
  (智能体)
  - 模型如何“自主规划并解决复杂任务”
  - LLM 完全主导（通过思考循环决定下一步操作）
  - `while` 循环 或 节点/边构成的有向无环图(DAG)控制流
  - 顶层形态（用 MCP 接入 Skill，用 RAG 补充知识）

## Skill

推荐去看 Claude 官方文档

- Claude 文档: https://code.claude.com/docs/zh-CN/overview
  - [扩展 Claude Code](https://code.claude.com/docs/zh-CN/features-overview)
    扩展插入代理循环的不同部分：
    - **[CLAUDE.md](https://code.claude.com/docs/zh-CN/memory)** 添加 Claude 每个会话都能看到的持久上下文
    - **[Skills](https://code.claude.com/docs/zh-CN/skills)** 添加可重用的知识和可调用的工作流
    - **[MCP](https://code.claude.com/docs/zh-CN/mcp)** 将 Claude 连接到外部服务和工具
    - **[Subagents](https://code.claude.com/docs/zh-CN/sub-agents)** 在隔离的上下文中运行自己的循环，返回摘要
    - **[Agent teams](https://code.claude.com/docs/zh-CN/agent-teams)** 协调多个独立会话，具有共享任务和点对点消息传递
    - **[Hooks](https://code.claude.com/docs/zh-CN/hooks)** 完全在循环外作为确定性脚本运行
    - **[Plugins](https://code.claude.com/docs/zh-CN/plugins)** 和 **[marketplaces](https://code.claude.com/docs/zh-CN/plugin-marketplaces)** 打包和分发这些功能
    其中 Claude 认为 [Skills](https://code.claude.com/docs/zh-CN/skills) 是最灵活的扩展
  - [存储指令和记忆](https://code.claude.com/docs/zh-CN/memory)
    每个 Claude Code 会话都从一个全新的 context window 开始。两种机制可以跨会话传递知识：
    - CLAUDE.md 文件：您编写的指令，为 Claude 提供持久上下文
    - 自动记忆：Claude 根据您的更正和偏好自己编写的笔记

## 比较 - 模型支持

列举现在的大模型API中，哪些支持 function calling、skills、mcp、RAG （这几个必须需要模型api支持吧，rag记得就不需要，任意模型都可以）

---

*take from claude sonnet 4.6*

这是一个通用的 AI/LLM 技术问题，不局限于 GitHub 产品范围。我来基于业界通识为你做一个清晰的梳理：

### 四大能力的本质区别

| 能力 | 是否需要模型 API 原生支持 | 说明 |
|------|--------------------------|------|
| Function Calling | ✅ 必须模型原生支持 | 模型需要能输出结构化的函数调用意图（JSON格式） |
| MCP (Model Context Protocol) | ✅ 必须（工具调用层） | MCP 底层依赖 Function Calling / Tool Use 能力 |
| Skills | ⚠️ 部分依赖 | 取决于实现方式（提示词���入 vs 工具调用） |
| RAG | ❌ 不需要原生支持 | 任意模型均可，RAG 逻辑在外部实现 |

### Function Calling / Tool Use

需要模型 API 原生支持，模型必须能理解 `tools` 参数并输出 `tool_call` 结构。

| 模型/平台                                 | 支持情况                   |
| ------------------------------------- | ---------------------- |
| OpenAI GPT-4o / GPT-4.1 / GPT-4 Turbo | ✅ 支持                   |
| OpenAI GPT-3.5-turbo (新版)             | ✅ 支持                   |
| Anthropic Claude 3/3.5/3.7            | ✅ 支持（称为 Tool Use）      |
| Google Gemini 1.5/2.0 Pro/Flash       | ✅ 支持                   |
| Meta Llama 3.1 / 3.2 / 3.3            | ✅ 支持（需量化版或专用fine-tune） |
| Mistral Large / Small                 | ✅ 支持                   |
| DeepSeek-V3 / R1                      | ✅ V3支持，R1 部分支持（推理模型受限） |
| Qwen2.5 / QwQ                         | ✅ 支持                   |
| 百度文心一言 (ERNIE)                        | ✅ 支持                   |
| 智谱 GLM-4                              | ✅ 支持                   |
| 月之暗面 Kimi                             | ✅ 支持                   |
| xAI Grok-3                            | ✅ 支持                   |
| 早期 GPT-3 / 小型模型                       | ❌ 不支持                  |

> ⚠️ 推理型模型（如 o1、DeepSeek-R1）对 function calling 支持往往受限或行为不稳定，因为它们主要为链式思考设计。

### MCP (Model Context Protocol)

MCP 是 Anthropic 提出的开放协议，本质上是 Function Calling 的上层封装：

- MCP Server 暴露工具 → 客户端将工具列表传给模型 → 模型通过 Function Calling 调用
- 因此，支持 Function Calling 的模型，理论上都能接入 MCP
- MCP 的"支持"更多在于客户端/框架侧（如 Claude Desktop、GitHub Copilot CLI、Cursor 等）

### ~~Skills~~~~

"Skills" 是个相对模糊的概念，不同平台含义不同：

| 场景 | 实现方式 | 是否需要模型支持 |
|------|----------|----------------|
| GitHub Copilot Skills | Markdown 提示词注入到上下文 | ❌ 不需要特殊支持 |
| OpenAI GPTs / Actions | 底层用 Function Calling | ✅ 需要 |
| LangChain Agent Tools | 包装成 Function Call | ✅ 需要 |

### Claude Skiils

**Claude 的 Skills** 本质上就是 **Tool Use（Function Calling）的另一种叫法/封装**。

|维度|说明|
|---|---|
|是否需要模型原生支持|✅ 必须，Claude Skills 底层就是 Claude 的 Tool Use API|
|本质|Anthropic 在 Tool Use 之上的高层抽象，定义了标准化的技能描述格式|
|依赖关系|Skills → Tool Use → Function Calling（三者层层依赖）|
|是否可跨模型|❌ 不能，Skills 是 Claude 专属的概念，绑定 Anthropic API|

和 MCP 的关系:

Code

```
Skills (Claude 高层概念)
    └── Tool Use / Function Calling (模型原生能力)
            └── MCP (跨平台协议，调用外部工具的标准化方式)
```

- **Skills** 偏向描述"模型能做什么"（能力声明）
- **MCP** 偏向描述"如何连接外部工具"（协议/传输层）
- 两者可以结合使用：MCP Server 提供工具 → 以 Skill 形式暴露给 Claude

### RAG (Retrieval-Augmented Generation)

**完全不需要模型 API 原生支持**，是你的理解是对的 ✅

RAG 的流程完全在外部完成：

```
用户提问 → 向量检索相关文档 → 拼接到 Prompt → 发给任意模型 → 模型回答
```

- 任何能接受文本输入的模型都可以做 RAG
- 包括本地模型（Ollama、llama.cpp）也完全支持
- 唯一的限制是模型的 Context Window 大小（决定能塞多少检索结果）

### 总结

```
Function Calling  → 需要模型原生支持（结构化输出能力）
MCP               → 依赖 Function Calling，协议层面是客户端框架的事
Skills            → 看实现，提示词注入不需要，工具调用需要
RAG               → 完全不需要，任意模型均可
```

| 能力               | 需要模型原生支持                |
| ---------------- | ----------------------- |
| Function Calling | ✅ 必须。需要模型原生支持（结构化输出能力）  |
| Claude Skills    | ✅ 必须（且绑定 Claude）        |
| MCP              | ✅ 依赖 Tool Use（但协议层在客户端） |
| RAG              | ❌ 不需要                   |

## 比较 - Token 消耗问题

*take from claude sonnet 4.6*

这是一个很好的问题，但我需要诚实说明：这个问题属于通用 LLM 技术知识范畴，搜索结果揭示了一个重要信息：这里的 Skills 其实是 GitHub Copilot CLI 的 Skills（Markdown 文件形式），而非 Anthropic Claude API 层面的概念。

Token 消耗比较：

### 先明确三者的本质

| 机制 | 本质 |
|------|------|
| Function Calling / Tool Use | 模型 API 原生能力，工具定义以 JSON Schema 传入 |
| MCP | 协议层，底层仍然通过 Tool Use 传递工具定义 |
| Skills（Copilot CLI） | Markdown 文件注入到 prompt，不是工具调用 |

### Token 消耗对比

#### Function Calling / Tool Use

```
消耗 = 系统提示 + 工具 JSON Schema 定义 + 对话历史 + 模型输出的 tool_call JSON
```

- 每个工具的 JSON Schema 描述会占用 token（名称、参数、描述）
- 工具越多，每次请求消耗越多
- 典型单个工具定义：**50~300 tokens**

#### MCP

```
消耗 ≈ Function Calling（MCP 工具最终也以 Tool Use 形式传入模型）
```

- MCP Server 的工具列表会被转换为 Tool Use 的 JSON Schema 格式
- **和 Function Calling 消耗基本一致**，MCP 本身不额外增加 token
- 但如果 MCP Server 返回大量工具，Schema 列表变长，消耗随之增加

#### Skills（GitHub Copilot CLI）

```
消耗 = Skill 的 Markdown 文件内容直接注入到 prompt
```

- **只在被调用时注入**（just-in-time），不调用则不消耗
- 消耗量完全取决于 Markdown 文件大小
- 典型 Skill 文件：**100~2000 tokens**
- 优点：**不用调用时零消耗**，而 Function Calling 每次请求都要带所有工具 Schema

### 汇总对比表

| 维度 | Function Calling | MCP | Skills (Copilot CLI) |
|------|-----------------|-----|----------------------|
| 消耗时机 | 每次请求都带工具定义 | 同左 | 仅调用时注入 |
| 定义格式 | JSON Schema | JSON Schema（同 FC） | Markdown 文本 |
| 单次开销 | 中（JSON Schema） | 中（同 FC） | 低~高（取决于 md 大小） |
| 未使用时开销 | ❌ 仍然消耗（Schema 在每次请求中） | ❌ 同左 | ✅ 零消耗 |
| 调用结果返回 | tool result 也占 token | tool result 也占 token | 无额外结果 token |

### 关键结论

> - **Skills 的 token 策略更聪明**：按需注入，不用就不占 context window。  
> - **Function Calling / MCP 是每轮都要带所有工具 Schema**，工具多了开销显著。  
> - MCP 相比裸 Function Calling **没有额外 token 开销**，只是工具数量可能更多。

## 产品举例

### Claudion

### OpenClaw


