# Quartz Plugin Dev

> [!warning]
> 在此之前，你应该先阅读完 [官方文档-制作自己的插件](https://quartz.jzhao.xyz/advanced/making-plugins) 或 [译-制作自己的插件](译-制作自己的插件.md) 中的内容

## 官方文档

https://quartz.jzhao.xyz/advanced/making-plugins

## 插件类别

### quartz 的插件类别

- transformers        | 转换器。封装/包含: unified/remark/rehype 插件
  - name              | 插件名
  - textTransform     | markdown_str -> markdown_str
  - markdownPlugins   | markdown_str/mdast -> mdast (remark plugin)
  - htmlPlugins       | hast -> hast (rehype plugin)
  - externalResources | 资源 (on client)
- filters             | 过滤器。根据特定规则过滤一些文件
- emitters            | 发射器

> #### 结合 api

```typescript
const config: QuartzConfig = {
  configuration: {...}
  plugins: {
    transformers: [{
      name: string,
      textTransform?: (ctx: BuildCtx, src: string) => string
      markdownPlugins?: (ctx: BuildCtx) => PluggableList
      htmlPlugins?: (ctx: BuildCtx) => PluggableList
      externalResources?: (ctx: BuildCtx) => Partial<StaticResources>
      // 如 {
      //   const js: JSResource[] = []
      //   const css: CSSResource[] = []
      //   return { js, css }
      // },
    }, ...],
    filters: [...],
    emitters: [...],
  }
}
export default config
```

> #### 结合处理流程

这里的插件类别要结合 quartz 流程来看: (take from [译-制作自己的插件](译-制作自己的插件.md))

![](assets/Pasted%20image%2020251213191840.png)

即从上到下依次转换:

- Markdown Files | Markdown 文件
- Transformer    | 转换器。可转换 text->text, markdown->markdown
- Modified files | 转换后的文件。HTML语法树 + 转换器的数据
- Filters        | 过滤器。根据特定规则过滤一些文件
- Filtered files | 过滤后的文件
- Emitters       | 发射器。根据已解析的文件生成新的文件 (ContentPage/FolderPage/ContentIndex)
- Generated Site | 生成的网站。一组包含 html、js、css 和 json 文件的集合

### unified/remark/rehype 插件类别 (复习)

然后我们再来复习下 unified/remark/rehype 的插件类别: (take from [编写 remark 插件实现自定义扩展语法](../Remark/Based%20on%20unified/编写%20remark%20插件实现自定义扩展语法.md))

- unified 插件分类
  - (按转换过程分类)
    - Parser       | 负责把输入解析为语法树
      (通常在 micromark 组织，库名 `micromark-extension-xxx`)
    - Transformers | 负责对语法树进行更改
      (通常在 syntax-tree 组织，库名 `mdast-utils-xxx`)
    - Compiler     | 负责序列化语法树得到输出
  - (按格式类型分类)
    - Remark | Markdown string 相关
      (通常在 remarkjs 组织)
    - Rehype | Html string 相关
    - Retext | 自然语言 string 相关
    - (其他)
  - (两种分类互不干扰)
    - remark-parse     | 类别 2-1 + 1-1
    - remark-stringify | 类别 2-1 + 1-3
    - rehype-parse     | 类别 2-2 + 1-1
    - rehype-stringify | 类别 2-2 + 1-3
    - remark-rehype    | 类别 2-4 + 1-2

### 两种类别的对应关系

我们再来比较、对应一下前两者

Quartz 中的 transformers 就是 unified 插件

其子类中的 markdownPlugins 和 htmlPlugins 分别对应 remark 和 rehype 插件

## 代码示例

见 [Quartz Plugin Demo](Quartz%20Plugin%20Demo.md)

## FAQ from gpt, about custom parse plugin

### markdown_str -> mdast 环节

这里的 markdown_str -> markdown_str 对应 texdtTransform，mdast -> mdast 对应 markdownPlugins。
那么 markdown_str -> mdast 这个解析过程是可以控制的吗（类似 markdown-it 的 parse 阶段）？如果能，对应的是哪个环节？

gemini 3 pro:

markdown_str -> mdast 这个解析过程是可以控制的吗？对应哪个环节？

是可以控制的，且正是通过 `markdownPlugins` 进行控制。

### wiki link 识别所在环节

remark ofm 插件中对应 wiki link 的识别，是处理哪个环节？mdast -> mdast 的 visit/find-and-replace？还是 markdown_str -> mdast 环节

gemini 3 pro:

remark ofm (Wiki Link) 的识别是处理哪个环节？

是 markdown_str -> mdast (解析/Tokenizer) 环节。

虽然理论上可以通过 mdast -> mdast 阶段遍历文本节点（visit Text nodes）并用正则替换来实现（这叫 "Find and Replace" 策略），但成熟的 Wiki Link 插件（如 remark-wiki-link 或 remark-ofm）通常是在解析阶段介入的。

原因如下：

- 上下文安全（Tokenization）：
  如果在 AST 转换阶段用正则替换，很难区分代码块里的 `[[link]]` 和正文里的 `[[link]]`。
  在解析阶段介入，解析器会先切分 Token。它知道哪里是 code，哪里是 text。只有在合法的上下文中，`[[...]]` 才会被识别为 Wiki Link 节点。
- 结构化数据：
  解析器直接将 `[[My Page]]` 转换为一个自定义的 AST 节点（例如 type: wikiLink），而不是保持为 Text 节点。
  之后的 mdast -> mdast 插件就可以直接访问这个 wikiLink 节点，进行进一步处理（比如添加 href 属性，判断文件是否存在等）。

### 两种 Quartz transformers.markdownPlugins 插件

分别怎么写 markdown_str -> markdown_str，以及 markdown_str -> mdast 的 quartzConfig 插件，分别给我一个最简单最短的 demo

gemini 3 pro:

这是两个最简短的 Demo，分别对应你要的两个环节。

#### 1. `markdown_str -> markdown_str` (String 替换)

**使用场景**：简单的全局文本替换、清理脏字符，在解析器介入前修改原文。

```typescript name=quartz/plugins/transformers/my-text-replace.ts
import { QuartzTransformerPlugin } from "../types"

export const MyTextReplace: QuartzTransformerPlugin = () => {
  return {
    name: "MyTextReplace",
    // 环节: markdown_str -> markdown_str
    // 作用: 在解析前，简单粗暴地把所有的 "Hello" 替换成 "Hi"
    textTransform(_ctx, src) {
      return src.replace(/Hello/g, "Hi") 
    },
  }
}
```

#### 2. `mdast -> mdast` (AST 修改)

**使用场景**：大部分插件的归宿。使用 `unist-util-visit` 遍历节点并修改。

```typescript name=quartz/plugins/transformers/my-ast-modifier.ts
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const MyASTModifier: QuartzTransformerPlugin = () => {
  return {
    name: "MyASTModifier",
    // 环节: mdast -> mdast
    // 作用: 这是一个 Remark 插件。遍历所有文本节点，把内容变成大写。
    markdownPlugins() {
      return [
        () => (tree) => {
          visit(tree, 'text', (node) => {
            node.value = node.value.toUpperCase()
          })
        }
      ]
    }
  }
}
```

#### 重新回答你的问题

##### Q1: markdown_str -> mdast 这个解析过程是可以控制的吗？如果能，对应的是哪个环节？

**答案**：**可以控制，但非常复杂，通常不推荐手写。**

这个过程由 `remark-parse` (基于 `micromark`) 负责。如果你想**创造一种全新的语法**（比如 `::callout::` 或 `$$math$$`），你需要介入这个环节。

在 Quartz/Unified 中，介入这个环节的入口依然是 **`markdownPlugins`**，但你需要在这个插件里注入 `micromark` 的扩展，而不是简单的 visit。

* **对应环节**：它依然属于 Quartz 配置里的 `markdownPlugins` 数组，但在内部逻辑上，它是在配置 `remark-parse` 的 tokenizer（分词器）。

**Demo (伪代码，仅展示复杂性):**

```typescript
import { myMicromarkExtension } from "micromark-extension-my-syntax"
import { myFromMarkdownExtension } from "mdast-util-my-syntax"

// 依然是在 markdownPlugins 里配置
markdownPlugins() {
  return [
    function () {
      // 这里的 data 是用来配置 parser 的
      this.data('micromarkExtensions', [myMicromarkExtension]) 
      this.data('fromMarkdownExtensions', [myFromMarkdownExtension])
    }
  ]
}
```

*注：正因为这太复杂了，99% 的轻量级需求（比如自定义语法）都选择用 Demo 1 的 `textTransform` 把自定义语法正则替换成标准 Markdown（如 HTML 标签），或者是 Demo 2 的 `visit` 遍历文本节点正则匹配。*

##### Q2: remark ofm (wikilink) 的识别是处理哪个环节？

**答案**：**markdown_str -> mdast (Parsing / Tokenizer 环节)**。

标准的 Wiki Link (`[[link]]`) 识别不属于标准的 CommonMark 语法。
像 `remark-ofm` (或者底层的 `remark-wiki-link`)，它们是为了让解析器能“看懂”这个双括号。

它们通过注入 **Micromark Extension** (Tokenizer)，在字符流（Character Stream）解析阶段，一旦遇到 `[` `[`，就劫持解析流程，生成一个自定义的 `wikiLink` 类型节点，而不是普通的 Text 节点。

所以：
1.  它**不是** `visit/find-and-replace`（那是解析成 Text 节点后再去查找替换，效率低且容易误伤代码块里的内容）。
2.  它是**真正的 Parser 扩展**（`markdown_str -> mdast` 转换发生的瞬间）。

### 重新回答

所以你还是只给了我 markdown_str -> markdown_str 和 mdast -> mdast，还是没有给我 markdown_str -> mdast。我知道是有的，gfm、ofm、directive (`:::`) 等……有很多很多插件都做了这一步，都有 `micromark-extension-` 相关的依赖，虽然相关文档比较少，但你可以看源码然后告诉我。

gemini 3 pro:

这才是你想要的“硬核” Demo。

Quartz 的 `markdownPlugins` 既可以放 **AST 变换器**（mdast -> mdast），也可以放 **语法扩展器**（markdown_str -> mdast）。区别在于后者需要操作 `this.data()` 来注入 `micromark` 扩展。

#### 1. markdown_str -> markdown_str (Text Transform)

最简单的字符串替换，不涉及 AST。

```typescript
// quartz/plugins/transformers/my-text.ts
import { QuartzTransformerPlugin } from "../types"

export const MyTextReplacer: QuartzTransformerPlugin = () => {
  return {
    name: "MyTextReplacer",
    textTransform: (_ctx, src) => {
      // 把所有的 ":::" 替换为 "FOO"
      return src.replace(/:::/g, "FOO")
    },
  }
}
```

#### 2. markdown_str -> mdast (Syntax Extension)

这是你真正想要看到的。
我们编写一个插件，扩展解析器以识别 `+` 符号，并将其解析为自定义的 AST 节点 `plusNode`，而不是普通的文本。

这需要两个步骤：

1. **Micromark Extension**: 教“词法分析器”如何识别字符 `+` (Tokenization)。
2. **fromMarkdown Extension**: 教“编译器”如何把 Token 变成 AST 节点。

```typescript
// quartz/plugins/transformers/my-plus-syntax.ts
import { QuartzTransformerPlugin } from "../types"

export const MyPlusSyntax: QuartzTransformerPlugin = () => {
  return {
    name: "MyPlusSyntax",
    markdownPlugins() {
      return [
        function myRemarkPlugin() {
          const data = this.data()

          // --- 1. Micromark 扩展 (Tokenization) ---
          // 定义如何识别 '+' 符号
          const myMicromarkExtension = {
            text: {
              // 43 是 '+' 的 ASCII 码
              43: {
                name: 'plus', // 调试用名称
                tokenize: function (effects, ok, nok) {
                  return function start(code) {
                    if (code !== 43) return nok(code)
                    
                    // 告诉解析器：这是一个 'plus' 类型的 Token
                    effects.enter('plus')
                    effects.consume(code) // 吃掉这个字符
                    effects.exit('plus')
                    
                    return ok(code)
                  }
                }
              }
            }
          }

          // --- 2. mdast-util-from-markdown 扩展 (AST Construction) ---
          // 定义如何把 'plus' Token 变成 AST 节点
          const myFromMarkdownExtension = {
            enter: {
              plus(token) {
                // 进入 Token 时，创建一个 AST 节点
                this.enter({ type: 'plusNode', value: '+' }, token)
              }
            },
            exit: {
              plus(token) {
                // 离开 Token 时，闭合节点
                this.exit(token)
              }
            }
          }

          // --- 3. 注入到 Processor ---
          add(data, 'micromarkExtensions', myMicromarkExtension)
          add(data, 'fromMarkdownExtensions', myFromMarkdownExtension)
        }
      ]
    }
  }
}

// 辅助函数：安全地向 data 数组中添加配置
function add(data: any, field: string, value: any) {
  if (data[field]) data[field].push(value)
  else data[field] = [value]
}
```

#### 总结

- **环节**：这个处理发生在 `unified().parse()` 内部，早于任何 visit/traverse。
- **生态现状**：大部分 `markdownPlugins`（如 `remark-gfm`, `remark-math`）内部都是这样写的：它们并不直接手动解析，而是 import 一个 `micromark-extension-xxx` 和 `mdast-util-xxx`，然后像上面那样 `add` 进去。
- **Quartz 集成**：只要你按上述格式写成一个 Plugin，放入 Quartz 配置的 `transformers` -> `markdownPlugins` 中，它就能生效。

### 使用代码块曲线救国

如果我要自定义一种新的块解析规则，先在 string->string 识别出范围并将其改写成代码块或markdown-it-contianer块 (`:::`) 的形式，然后在 mdast -> mdast 的阶段再去进行处理。是不是可以代替和简化，不再去处理 markdown_str -> mdast 的复杂性

gemini 3 pro:

是的，**完全可以，而且这是一种非常聪明的“曲线救国”策略**。

在 Unified/Remark 社区中，这种方法被称为“**预处理（Pre-processing）**”。这能帮你避开 99% 编写 `micromark-extension`（即 `markdown_str -> mdast` 真正解析器）的痛苦。

### 核心思路：借壳上市

1.  **阶段 1 (`textTransform`)**：用正则把你的“自定义语法”替换成 Markdown 解析器**本来就认识**的语法容器（通常是**代码块** ` ``` ` 或 **指令** `:::`）。
2.  **阶段 2 (`markdownPlugins`)**：在 AST 中找到这个容器，识别标记，把它“整容”成你想要的最终节点。

#### 优缺点评估

* 优点：
    * 极简：只需要写 Regex 和简单的 AST 遍历。
    * 兼容：不需要引入 `micromark` 极其复杂的底层依赖。
* 缺点：
    * 上下文不安全：`textTransform` 是盲目的字符串替换。如果你在正文中（比如代码块里）刚好写了你的自定义语法字符串，它也会被替换掉。（不过对于个人博客来说，这种情况完全可以人为避免）。

#### Demo：实现一个 `:::warning` 块

假设我们要实现类似 VuePress 的 `::: warning 内容 :::` 语法，但我们不想写解析器。

策略

1. **String 阶段**：把 `::: warning` 偷梁换柱变成 ` ```custom-warning ` 代码块。
    * *为什么用代码块？因为 Markdown 解析器天生支持代码块，内容不会被乱解析。*
2. **AST 阶段**：找到语言为 `custom-warning` 的代码块，把它变成 `<div class="warning">`。

代码实现

```typescript name=quartz/plugins/transformers/my-block.ts
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const MyCustomBlock: QuartzTransformerPlugin = () => {
  return {
    name: "MyCustomBlock",
    
    // 步骤 1: 偷梁换柱 (String -> String)
    // 将 ::: warning \n ... \n ::: 转换为 ```custom-warning \n ... \n ```
    textTransform(_ctx, src) {
      // 这里的正则是个简写，实际可能需要处理多行匹配
      // 假设语法是: ::: warning 内容 :::
      return src.replace(
        /::: warning\n([\s\S]*?)\n:::/g, 
        "```custom-warning\n$1\n```"
      )
    },

    // 步骤 2: 整容手术 (MDAST -> MDAST)
    markdownPlugins() {
      return [
        () => (tree) => {
          visit(tree, 'code', (node, index, parent) => {
            // 找到我们的“卧底”代码块
            if (node.lang === 'custom-warning') {
              
              // 构造我们想要的新节点结构
              // 这里我们把它转换成一个带有 class 的 div
              // remark-rehype 会读取 data.hName 和 data.hProperties 来生成 HTML
              const newNode = {
                type: 'paragraph', // 或者 'div' (如果使用了 remark-directive 等)
                data: {
                  hName: 'div',
                  hProperties: { className: ['alert', 'alert-warning'] }
                },
                children: [
                  { type: 'text', value: node.value }
                ]
              }

              // 替换节点：在 parent.children 中的 index 位置，删除 1 个，插入 newNode
              if (parent && index !== undefined) {
                parent.children.splice(index, 1, newNode as any)
              }
            }
          })
        }
      ]
    }
  }
}
```

#### 总结

这种方法把**解析问题**（Parser）降维成了**查找替换问题**（Regex + AST Transform）。

- **如果**你要做很严谨的开源库，必须处理嵌套、转义字符等，那你必须去写 `micromark-extension`。
- **如果**只是为了给自己的 Quartz 博客加个功能，**请务必使用这种方法**，既快又好维护。

### wiki link 的显示环节

假如我想要使用这个思路去实现 wiki link (支持使用 `!` 来显示)的识别，而不去写 parse。那剩下的思路是怎么样的？

1. 先将 `![[abc]]` 转换为内联代码样式，如: "`!wiki-abc`"
2. mdast -> mdast，遍历 !wiki- 开头的内联代码，将其替换成目标的 wiki show link 节点
3. 然后怎么将这个节点替换成对应的内容，使最后的渲染结果中这里是目标页面的渲染内容

gemini 3 pro:

这个思路非常棒！这就是所谓的“**Pipeline Hijacking (管线劫持)**”策略，在不需要高性能和极高语法严谨性的场景下，这比写 `micromark` 扩展要高效得多。

针对你的 **Transclusion (嵌入/引用)** 需求，核心难点在于第 3 步：**“如何获取目标文件内容并插入到当前 AST 中”**。

下面是完整的实现逻辑和代码 Demo。

#### 核心思路

1. **Text Transform**: 用正则把 `![[path/to/note]]` 变成一种特殊的、**不会破坏 AST 结构**的标记。
  * *技巧*：将其转化为 `:::embed{src="path/to/note"}` (如果有 directive 插件) 或者简单的 **Inline Code** 如 `` `__EMBED__path/to/note` ``。
2. **AST Transform**:
  * 找到这个节点。
  * **关键步骤**：在插件内部读取目标文件的内容 -> 调用 `unified` 解析那个文件 -> 拿到新 AST -> 嫁接到当前树上。

#### 代码 Demo

假设我们要实现：将 `![[note]]` 替换为 `note.md` 的实际内容。

```typescript name=quartz/plugins/transformers/my-embed.ts
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { unified } from "unified"
import remarkParse from "remark-parse"
import fs from "fs"
import path from "path"

export const MyEmbed: QuartzTransformerPlugin = () => {
  return {
    name: "MyEmbed",
    
    // --- 步骤 1: 文本替换 (String -> String) ---
    textTransform: (_ctx, src) => {
      // 识别 ![[abc]] 形式，并转换为特殊的行内代码标记
      // 注意：这里为了防误触，加个特殊前缀 __QUARTZ_EMBED__
      return src.replace(/!\[\[(.*?)\]\]/g, '`__QUARTZ_EMBED__$1`')
    },

    // --- 步骤 2 & 3: AST 替换 (MDAST -> MDAST) ---
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // 这里的 file.data.filePath 是当前正在处理的文件的绝对路径
            const currentDir = path.dirname(file.data.filePath as string)

            visit(tree, 'inlineCode', (node, index, parent) => {
              if (typeof node.value === 'string' && node.value.startsWith('__QUARTZ_EMBED__')) {
                // 1. 提取目标文件名
                const targetFileName = node.value.replace('__QUARTZ_EMBED__', '').trim()
                
                // 2. 计算目标文件的绝对路径 (简化版，实际可能需要处理别名或根路径)
                // 假设引用是相对路径或文件名
                let targetPath = path.resolve(currentDir, targetFileName)
                if (!targetPath.endsWith('.md')) targetPath += '.md'

                // 3. 读取并解析目标文件
                try {
                  if (fs.existsSync(targetPath)) {
                    const content = fs.readFileSync(targetPath, 'utf-8')
                    
                    // --- 核心魔法：在插件里再跑一遍解析器 ---
                    // 我们只需要解析 markdown -> mdast，不需要转 html
                    const targetAst = unified()
                      .use(remarkParse)
                      .parse(content)

                    // 4. 嫁接 (Splicing)
                    // 情况 A: 嵌入的内容是整段的 (Paragraphs, Headings...)
                    // 而我们的标记 `code` 是在一个 Paragraph 里的。
                    // 结构通常是: Paragraph -> [Text, InlineCode(Embed), Text]
                    
                    // 如果我们直接把 Block 级元素塞进 Paragraph，AST 会不合法，
                    // 但 Rehype 通常能容忍并渲染出来。
                    // 更完美的做法是将父级 Paragraph 拆开，但这比较复杂。
                    
                    // 这里演示最暴力的替换：直接把目标 AST 的 children 塞进去
                    // @ts-ignore - 忽略类型报错，因为我们在做“非法”的 AST 操作
                    parent.children.splice(index, 1, ...targetAst.children)
                    
                    // 修正索引，因为我们可能插入了多个节点
                    return index + targetAst.children.length
                  } else {
                    // 文件不存在，替换为报错文本
                    node.value = `[Error: File ${targetFileName} not found]`
                  }
                } catch (e) {
                  console.error(e)
                }
              }
            })
          }
        }
      ]
    }
  }
}
```

#### 深度解析：Step 3 的实现细节

你问的重点是 **“怎么将这个节点替换成对应的内容”**。

在上面的代码中，核心逻辑是：

1. **文件读取**：`fs.readFileSync(targetPath)`。因为这是构建过程，读本地文件是完全合法的。
2. **递归解析 (The "Parser within a Parser")**：
    这就是不用 Micromark 的代价——你需要手动调用 `unified().use(remarkParse).parse(content)`。
    * 这会把目标文件内容变成一个新的 AST 树 (`targetAst`)。
3. **AST 嫁接 (Grafting)**：
    * `parent.children.splice(index, 1, ...targetAst.children)`
    * 这句话的意思是：在父节点（包含 `![[...]]` 的那个段落）中，删掉当前的 `inlineCode` 节点，然后在原位置插入 `targetAst` 的所有子节点。

#### 潜在的坑 (需要注意)

虽然这个方法简单，但有几个坑需要你在工程化时考虑：

- 块级元素嵌套问题 (Block inside Inline)：
  * Markdown 解析出来的 `![[...]]` 通常被包裹在一个 `paragraph` 节点里。
  * 如果你引用的文件包含 `# Heading`，那么嫁接后结构变成了 `Paragraph -> Heading`。
  * 根据 CommonMark 规范，段落里不能包含标题。
  * **后果**：大部分浏览器能渲染，但 HTML 结构可能不符合标准 (`<p><h1>...</h1></p>`)。
  * **进阶解法**：检查 `parent` 是否只有这一个子节点。如果是，说明是独占一行的引用，应该把 `parent` (Paragraph) 整个替换掉，而不仅仅是替换 `child` (inlineCode)。
- 无限递归 (Infinite Loops)：
  * 如果 A 引用 B，B 引用 A。
  * 你的解析器会无限读取、无限解析，直到内存溢出。
  * **解法**：在这个 demo 里没写，实际需要在 `parse` 时传递一个 `stack` 记录已引用的文件路径，发现循环引用立即停止。
- 路径解析 (Path Resolution)：
  * Quartz 的 Wiki Link 支持 `[[folder/file]]` 也支持 `[[file]]` (模糊匹配)。
  * Demo 里用了简单的 `path.resolve`。如果你想完美复刻，需要利用 Quartz 的 `ctx.allSlugs` 或 `ctx.allFiles` 去查找对应的文件路径。

### 插件嵌套问题

这里有些问题：对于目标文件而言，你这里的 targetAst 会不会导致少了点插件？例如 md_str -> md_str 等插件。

即当我使用 wiki link 插件时，插件效果可能不完美：embe页面和真实的目标页面的显示效果可能不同，这是因为 embe 页面所使用的解析和渲染等行为丢失了一些插件行为。

remark ofm 插件的 wiki link 有处理这种情况吗？他是怎么处理的？

gemini 3 pro:

#### 你的担忧非常敏锐，这确实是一个“深坑”

是的，如果你的 `mdast -> mdast` 插件只是简单地读取目标文件、用基础解析器解析并插入 AST，那么**目标文件确实会丢失主流程中的 `textTransform` 和其他插件效果**。

这会导致严重的**不一致性**：比如你在主流程里定义了 `::callout::` 替换，或者用正则处理了某些脏字符，而被嵌入（Transclude/Embed）的内容里，这些语法可能原样暴露出来，无法渲染。

#### Quartz 和 remark-ofm 是怎么处理的？

通过查阅 Quartz 源码 (`quartz/plugins/transformers/ofm.ts`)，我们可以看到 Quartz 处理引用嵌入（Transclusion/Embed，即 `![[link]]`）的方式其实非常“鸡贼”（或者说务实）：

##### 1. 并没有进行真正的 AST 注入

Quartz 的 `ofm` 插件在处理非媒体类（非图片/视频）的嵌入时，**并没有**在 Markdown 编译阶段去读取目标文件内容并插入 AST。

它做的事情是生成一个**占位符**（blockquote）：

```typescript
// 伪代码逻辑，来自源码 ofm.ts
return {
  type: "html",
  data: { hProperties: { transclude: true } },
  // 生成一个带有 data-url 属性的引用块
  value: `<blockquote class="transclude" data-url="${url}">...</blockquote>`,
}
```

##### 2. 真正的“内容填充”发生在客户端 (Client-side)

Quartz 实际上是依赖**浏览器端的 JavaScript** (`quartz/components/scripts/transcludes.inline.ts`) 来完成嵌入的。
当页面加载时，JS 会读取 `blockquote.transclude` 的 `data-url`，通过 `fetch()` 请求目标页面的内容（HTML），然后挖出需要的部分填进去。

**这样做的好处：**

* **完美解决插件丢失问题**：因为请求的是**已经构建好的 HTML**，所以目标页面已经经历了完整的构建流程（所有的 transformers, filters, emitters 都跑完了）。
* **避免无限递归**：如果 A 引用 B，B 引用 A，静态构建时 AST 注入会死循环，但客户端请求模式只会加载所需的片段。

#### 如果你坚持要在服务端（构建时）做 AST 注入

如果你不想依赖客户端 JS，而是想在构建出的 HTML 里就已经包含了嵌入的内容（对 SEO 和无 JS 环境更友好），你需要手动解决你提出的“插件丢失”问题。

**解决方案：手动复刻“迷你流水线”**

在你的插件读取目标文件内容后，不能只跑 `remark-parse`，你需要显式地调用配置中的 `textTransform`。

以下是一个改进后的思路 Demo：

##### 步骤 1: 准备工作

获取 `ctx` (构建上下文)，里面包含了所有的插件配置。

##### 步骤 2: 编写 AST 注入逻辑

```typescript
// 伪代码，展示如何在处理嵌入时应用 textTransform
import { unified } from "unified"
import remarkParse from "remark-parse"
import { read } from "to-vfile"

// ... 在你的 markdownPlugins visitor 中 ...

// 1. 读取目标文件
const targetPath = resolvePath(node.url)
let content = await read(targetPath)

// 2. 【关键】手动应用配置中的 textTransform
// 从 ctx 中获取所有 transformers
const transformers = ctx.cfg.plugins.transformers

for (const plugin of transformers) {
  if (plugin.textTransform) {
    // 让目标文件的内容也享受“预处理”待遇
    content.value = plugin.textTransform(ctx, content.value.toString())
  }
}

// 3. 解析为 AST
const processor = unified().use(remarkParse)
// 注意：这里可能还需要应用其他的 markdownPlugins，这会变得很复杂
// 如果你的其他插件都是 mdast->mdast，你可能需要手动把它们也加进来
// processor.use(...) 

const targetAst = processor.parse(content)

// 4. 替换节点
parent.children.splice(index, 1, ...targetAst.children)
```

#### 总结与建议

1. **Quartz 官方方案（推荐）**：
    学习 Quartz 的做法，生成一个带有 `data-url` 的 HTML 节点，让**客户端 JS** 去 fetch 目标页面。这样能保证目标页面呈现的内容是经过完整构建流程处理过的（包括所有的插件效果），而且实现最简单。
2. **构建时注入（高难度）**：
    如果必须在服务端做，你必须意识到**你正在手动实现一个递归的构建系统**。
    * 你至少需要手动运行所有的 `textTransform`。
    * 如果目标文件里还有 Wiki Link，你需要处理递归引用。
    * 如果目标文件里有其他自定义语法（由其他 `markdownPlugins` 处理），你解析出的 AST 是原生的，那些语法会失效。除非你构造的 `processor` 包含了所有的插件。

**结论**：`md_str -> md_str` 的预处理方案配合 **客户端 Fetch** 是最稳妥的路径。构建时 AST 注入是一个深坑，除非你只嵌入最纯粹的 Markdown 文本。

### 插件嵌套问题2

话说像markdown-it通常会有一个实例md对象，像vuepress中的markdown-it插件会传入这个变量给markdown-it插件，这样可以轻松在插件内部进行有带所有插件的渲染。

quartz插件能不能使用类似的思路？在 quartz.config.ts  中将 `const config: QuartzConfig = {` 中提取，或重新构建一个类似的 unified 对象，并以参数形式传递给插件。从而让插件进行再渲染时能包含其他插件的效果

gemini 3 pro: ... (Error: I'm sorry but there was an error. Please try again.)

(上下文过长了，我删了上一条提问重新问了)

gemini 3 pro:

你非常敏锐！这确实是上面那个简易 Demo 最大的痛点：**“裸跑”的 `unified().parse()` 丢失了整个项目的构建上下文（Transformers）**。

正如你所说，如果被引用的文件里也有 `[[link]]` 或者使用了其他自定义语法，用纯净版 `remarkParse` 解析出来的结果就会失效或原样输出。

在 Quartz (以及基于 Unified 的系统) 中，要解决这个问题有几种“流派”。

#### 解决方案 1：复用 Processor (推荐，最符合 Unified 哲学)

你提到的 Markdown-it 的 `md` 实例思路，在 Unified 中对应的是 **Processor**。
虽然 Quartz 的架构稍微封装了一下，但我们完全可以在插件初始化时，或者在运行时构建一个 **“全功能”的 Processor**。

在 Quartz 的源码中，`createMdProcessor` (在 `quartz/processors/parse.ts`) 就是负责组装所有插件的工厂函数。我们可以在我们的插件里调用它！

**如何实现：**

Quartz 的插件接收 `ctx: BuildCtx`。这个 `ctx` 里包含了 `cfg`（配置）。我们可以利用这个配置重新创建一个带有一切功能的 Processor。

```typescript name=quartz/plugins/transformers/embed-advanced.ts
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { createMdProcessor } from "../../processors/parse" // 导入 Quartz 的核心工厂函数
import fs from "fs"
import path from "path"
import { FilePath } from "../../util/path"

export const AdvancedEmbed: QuartzTransformerPlugin = () => {
  return {
    name: "AdvancedEmbed",
    
    textTransform: (_ctx, src) => src.replace(/!\[\[(.*?)\]\]/g, '`__QUARTZ_EMBED__$1`'),

    markdownPlugins(ctx) {
      return [
        () => {
          // 1. 在这里创建一个全功能的 Processor！
          // 注意：createMdProcessor 会加载配置里所有的 transformers
          // 风险提示：这可能会包含当前插件自己 (Infinite recursion?)
          // Quartz 的设计比较好，通常重新创建是可以的，但要小心递归死循环。
          
          // 为了避免无限递归（比如自己调自己），
          // 有时候我们需要手动过滤掉“Embed”类的插件，或者依靠递归深度锁。
          const processor = createMdProcessor(ctx)

          return async (tree, file) => {
            const promises: Promise<void>[] = []

            visit(tree, 'inlineCode', (node, index, parent) => {
              if (typeof node.value === 'string' && node.value.startsWith('__QUARTZ_EMBED__')) {
                
                const targetSlug = node.value.replace('__QUARTZ_EMBED__', '').trim()
                // ... (查找文件路径逻辑略) ...
                const targetFilePath = "..." as FilePath 

                const p = async () => {
                  const content = fs.readFileSync(targetFilePath, 'utf-8')
                  
                  // 2. 这里的关键点：还需要跑 textTransform！
                  // 因为 createMdProcessor 只处理 markdownPlugins，
                  // 而很多自定义语法是在 textTransform 阶段处理的。
                  let processedContent = content
                  for (const plugin of ctx.cfg.plugins.transformers) {
                    if (plugin.textTransform) {
                      processedContent = plugin.textTransform(ctx, processedContent)
                    }
                  }

                  // 3. 使用全功能 Processor 解析
                  const result = await processor.process({
                    value: processedContent,
                    path: targetFilePath
                  })
                  
                  // result.result 是解析后的 AST (MDAST)
                  const targetRoot = result.result as any

                  // 4. 嫁接
                  // 注意：这里变成了 async，所以 visit 可能会比较麻烦
                  // 通常建议用 unist-util-visit-parents 或收集 Promise 后再一次性替换
                  if (parent && index !== undefined) {
                    parent.children.splice(index, 1, ...targetRoot.children)
                  }
                }
                promises.push(p())
              }
            })
            
            await Promise.all(promises)
          }
        }
      ]
    }
  }
}
```

#### 解决方案 2：依赖注入 (Dependency Injection) / 配置提取

你提到的思路：“*在 quartz.config.ts 中提取 ... 并以参数形式传递给插件*”。

这也是完全可行的，而且在解决“递归死循环”问题上可能更灵活。

**做法：**

1.  定义一个“子处理器 (Sub-processor)”。
2.  在配置插件时传入这个子处理器的配置。

```typescript
// quartz.config.ts
import { MyEmbed } from "./plugins/transformers/my-embed"
import { GitHubFlavoredMarkdown } from "./plugins/transformers/gfm"

// 把不需要递归的通用插件提取出来
const commonPlugins = [GitHubFlavoredMarkdown(), ...]

const config: QuartzConfig = {
  plugins: {
    transformers: [
      ...commonPlugins,
      // 告诉 Embed 插件：当你渲染子页面时，请使用这些插件
      MyEmbed({ 
        subPlugins: commonPlugins 
      }),
    ]
  }
}
```

然后在插件内部：

```typescript
// my-embed.ts
export const MyEmbed: QuartzTransformerPlugin<{ subPlugins: QuartzTransformerPluginInstance[] }> = (opts) => {
  return {
    name: "MyEmbed",
    markdownPlugins(ctx) {
      // 1. 使用 opts.subPlugins 构建一个小型的 processor
      const subProcessor = unified().use(remarkParse)
      
      opts?.subPlugins.forEach(p => {
         // 加载子插件的逻辑
         if(p.markdownPlugins) {
            subProcessor.use(p.markdownPlugins(ctx))
         }
      })
      
      return [
        // ... 主逻辑，调用 subProcessor.parse() ...
      ]
    }
  }
}
```

#### 哪种更好？

对于 Quartz 这种静态站点生成器：

*   **方案 1 (createMdProcessor)** 是**最省心**的。它能保证嵌入的内容和主页面的渲染逻辑**完全一致**（包括 Wiki Link 解析、Callouts、甚至 Frontmatter 处理）。
    *   *唯一要注意的是递归保护*：必须在逻辑里加一个 `depth` 计数器，防止 A -> B -> A 导致死循环把栈炸了。
*   **方案 2** 适合你需要对嵌入内容的渲染逻辑做**特殊处理**（比如嵌入的内容不显示标题、不显示目录等）的场景。

#### 总结

要在插件里获得完整的渲染能力，不能只用 `remarkParse`。你需要：
1.  **复用** `ctx.cfg.plugins.transformers` 里的插件列表。
2.  **手动执行** `textTransform` 链（因为这是 Quartz 特有的，unified 不会自动执行）。
3.  **构造** 一个包含这些插件的 `unified` Processor 来解析目标内容。

### 我的个人总结

目前主要是两个点比较难受：

1. markdown-it的解析环节好操作。但unified的解析环节你要干涉会比较复杂 (虽然也行)，更多的是在解析前处理文本和解析后处理语法树这两个环节下手。
2. 然后是unified不像mdit有一个完整实例，他的流程完全一步一步来，不允许返回。那么在插件中进行重渲染就很蛋疼，要么重渲染时丢失其他插件的功能，要么只能用一些取巧的方法 (如他带 ! 的 wiki link 的实现一般是替换成 iframe 元素)


