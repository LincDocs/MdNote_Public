---
create_date: 2026-04-14
last_date: 2026-04-14
---
# FIM (Fill-in-the-Middle)

## 背景

我使用通用 ai api (claude kimi deepseek gemini gpt 等)

是否能实现类似 copilot 那样的 ai 自动补全应用？即在光标位置续写内容，同时他能知道光标位置的上面和光标下面的文本内容。如果有需要，他还能知道其他文件的文本内容

具体需要怎么实现？有什么注意要点？是否有简单的类似的开源项目供参考？

---

完全可以实现！这正是 **FIM (Fill-in-the-Middle)** 技术的典型应用。下面从原理、实现方法、注意要点、开源参考项目四个方面详细说明：

## 一、核心原理：FIM（Fill-in-the-Middle）

AI 自动补全的核心就是把光标位置的 **上文（prefix）** 和 **下文（suffix）** 分别提取出来，发送给 AI 模型，让模型 "填空"。

```
光标上方的内容 → prefix
光标下方的内容 → suffix
AI 返回         → 要在光标处插入的内容
```

## 二、两种实现方式

### 方式 1：原生 FIM API（推荐，如果模型支持）

部分模型直接提供了 FIM 端点（如 DeepSeek、Codestral、Qwen-Coder），只需传入 `prefix` 和 `suffix`：

```typescript name=fim-example.ts
// DeepSeek FIM API 示例
const response = await fetch("https://api.deepseek.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "deepseek-coder",
    prompt: prefix,   // 光标上方的文本
    suffix: suffix,   // 光标下方的文本
    max_tokens: 256,
    temperature: 0.0,
    stop: ["\n\n", "<｜fim▁end｜>"]
  })
});
```

### 方式 2：Chat API 模拟 FIM（GPT/Claude 等通用模型）

GPT、Claude 等模型没有原生 FIM 端点，但可以通过 **prompt 工程** 模拟。Continue 项目中就有一个经典的 `holeFillerTemplate`：

```typescript name=hole-filler-template.ts
// 将 prefix + suffix 包装成 "填空" 提示词
const prompt = `You are a HOLE FILLER. You are provided with a file containing holes, 
formatted as '{{FILL_HERE}}'. Your TASK is to complete with a string to replace this hole.

<QUERY>
${prefix}{{FILL_HERE}}${suffix}
</QUERY>

TASK: Fill the {{FILL_HERE}} hole. Answer only with the CORRECT completion, 
and NOTHING ELSE. Do it now.
<COMPLETION>`;

// stop token 设为 "</COMPLETION>"
const response = await callChatAPI(prompt, { stop: ["</COMPLETION>"] });
```

这种方式对于各大通用 API（Claude、GPT、Gemini、Kimi）都通用。

## 三、在编辑器中的实现步骤（以 VS Code 插件为例）

### 步骤 1：实现 InlineCompletionProvider

VS Code 提供了 `InlineCompletionItemProvider` 接口，这是实现"幽灵文本"补全的标准方式：

```typescript name=completion-provider.ts
import * as vscode from 'vscode';

class MyCompletionProvider implements vscode.InlineCompletionItemProvider {
  
  async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.InlineCompletionContext,
    token: vscode.CancellationToken
  ): Promise<vscode.InlineCompletionItem[]> {
    
    // 1. 提取 prefix（光标上方的全部内容）
    const prefix = document.getText(
      new vscode.Range(new vscode.Position(0, 0), position)
    );
    
    // 2. 提取 suffix（光标下方的全部内容）
    const suffix = document.getText(
      new vscode.Range(position, document.positionAt(document.getText().length))
    );
    
    // 3. 调用 AI API 获取补全
    const completion = await callAIForCompletion(prefix, suffix);
    
    // 4. 返回 InlineCompletionItem
    return [new vscode.InlineCompletionItem(completion, new vscode.Range(position, position))];
  }
}

// 注册 provider
vscode.languages.registerInlineCompletionItemProvider(
  { pattern: '**' },
  new MyCompletionProvider()
);
```

### 步骤 2：提取上下文信息

```typescript name=context-extraction.ts
async function buildContext(document: vscode.TextDocument, position: vscode.Position) {
  const prefix = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
  const suffix = document.getText(new vscode.Range(position, 
    new vscode.Position(document.lineCount - 1, Number.MAX_SAFE_INTEGER)));
  
  // 可选：收集其他打开的文件作为额外上下文
  const otherFiles: string[] = [];
  for (const editor of vscode.window.visibleTextEditors) {
    if (editor.document.uri.toString() !== document.uri.toString()) {
      otherFiles.push(
        `// File: ${editor.document.fileName}\n${editor.document.getText()}`
      );
    }
  }
  
  return { prefix, suffix, otherFiles };
}
```

### 步骤 3：调用 AI API

```typescript name=call-ai.ts
async function callAIForCompletion(prefix: string, suffix: string): Promise<string> {
  // 方式 A：支持 FIM 的模型 (DeepSeek / Codestral)
  if (modelSupportsFIM) {
    return await fimRequest(prefix, suffix);
  }
  
  // 方式 B：通用 Chat 模型 (GPT / Claude / Gemini)
  const prompt = `<QUERY>\n${prefix}{{FILL_HERE}}${suffix}\n</QUERY>
Fill the {{FILL_HERE}} hole. Answer ONLY with the completion text.`;
  
  return await chatRequest([
    { role: "system", content: "You are a code completion assistant. Output ONLY the code to fill in." },
    { role: "user", content: prompt }
  ], { stop: ["</COMPLETION>"], temperature: 0, max_tokens: 256 });
}
```

## 四、关键注意要点

| 要点                    | 说明                                             |
| --------------------- | ---------------------------------------------- |
| 🔑 Debounce 防抖        | 用户每敲一个字符都会触发，必须做 300-500ms 防抖，否则请求爆炸           |
| 🔑 AbortController 取消 | 用户继续输入时取消上一次未完成的请求                             |
| 🔑 Token 截断           | prefix/suffix 可能很长，需要根据模型上下文窗口截断（保留光标附近最相关的内容） |
| 🔑 缓存                 | 对相同 prefix+suffix 缓存结果，避免重复请求                  |
| 🔑 延迟控制               | 补全必须在 ~500ms 内返回才有好的用户体验，建议用流式(streaming)响应    |
| 🔑 后处理                | 去除模型多余输出、处理缩进、过滤重复行等                           |
| 🔑 Stop tokens        | 必须设置合理的 stop tokens 防止模型输出过多内容                 |
| 🔑 Temperature        | 设为 0 或接近 0（如 0.01），保证补全的确定性                    |

## 五、推荐参考的开源项目

### 1. [Continue](https://github.com/continuedev/continue) ⭐ 最推荐 

Continue 是目前最完整的开源 AI 代码补全项目，支持所有主流 AI API，其核心 FIM 模板实现在：

```
core/autocomplete/templating/AutocompleteTemplate.ts  — FIM 提示词模板
core/autocomplete/CompletionProvider.ts                — 补全逻辑核心
extensions/vscode/src/autocomplete/completionProvider.ts — VS Code 集成
```

它为每个模型定义了不同的 FIM 模板格式，例如：
- DeepSeek: `<｜fim▁begin｜>{prefix}<｜fim▁hole｜>{suffix}<｜fim▁end｜>`
- Qwen-Coder: `<|fim_prefix|>{prefix}<|fim_suffix|>{suffix}<|fim_middle|>`
- GPT/Claude: 使用 "Hole Filler" prompt 工程方式
- 还支持多文件上下文的模板（Codestral、Qwen 多文件 FIM）

### 2. [llm-vscode](https://github.com/huggingface/llm-vscode)

HuggingFace 出品，轻量级 VS Code 补全插件，代码简洁，适合学习。

### 3. [Tabby](https://github.com/TabbyML/tabby)

自托管的 AI 代码补全服务器 + VS Code 插件，Rust 后端，支持本地模型。

### 4. [Twinny](https://github.com/rjmacarthy/twinny)

极简的开源 VS Code AI 补全插件，代码量小，非常适合作为入门学习项目。

## 六、最小可行实现总结

如果你想用最少的代码跑起来一个原型：

- 创建 VS Code 插件，实现 `InlineCompletionItemProvider`
- 提取 prefix/suffix（光标上下文本）
- 用 Chat API + Hole Filler prompt 发请求（兼容所有模型）
- 加上 debounce + abort 控制请求频率
- 返回 `InlineCompletionItem` 显示为幽灵文本

大约 200-300 行代码就能实现一个基础可用的 AI 自动补全功能。建议从 **Twinny** 项目开始参考，然后逐步参考 **Continue** 的高级特性（多文件上下文、智能截断、缓存等）。















