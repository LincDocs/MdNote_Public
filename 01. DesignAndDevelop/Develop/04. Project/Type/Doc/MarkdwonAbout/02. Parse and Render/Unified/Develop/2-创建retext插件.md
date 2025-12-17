---
create_date: 2025-12-13
last_date: 2025-12-13
source: https://unifiedjs.com/learn/guide/create-a-retext-plugin/
---
# 2-创建retext插件

## 创建 retext 插件

本指南展示了如何为 retext 创建一个插件[，用于](https://unifiedjs.com/explore/project/retextjs/retext/)检查句子之间的空格数量。

> 遇到难题？有其他指南的想法？请参阅[`support.md`](https://github.com/unifiedjs/.github/blob/main/support.md)。

### 内容

- [案件](https://unifiedjs.com/learn/guide/create-a-retext-plugin/#case)
- [设置](https://unifiedjs.com/learn/guide/create-a-retext-plugin/#setting-up)
- [插件](https://unifiedjs.com/learn/guide/create-a-retext-plugin/#plugin)
- [更多练习](https://unifiedjs.com/learn/guide/create-a-retext-plugin/#further-exercises)

### 案件

在开始之前，我们先来概述一下我们要做什么。假设我们有以下文本文件：

```markdown
One sentence. Two sentences.

One sentence.  Two sentences.
```

我们希望对第二段发出警告，提示应该使用一个空格而不是两个空格。

下一步我们将编写使用我们插件的代码。

### 设置

让我们来创建一个项目。创建一个文件夹，`example`进入该文件夹，然后初始化一个新项目：

```sh
mkdir example
cd example
npm init -y
```

然后确保项目是一个模块，这样才能`import`正常`export`工作，方法是进行如下更改`package.json`：

```diff
--- a/package.json
+++ b/package.json
@@ -1,6 +1,7 @@
 {
   "name": "example",
   "version": "1.0.0",
+  "type": "module",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
```

确保`example.md`存在：

```markdown
One sentence. Two sentences.

One sentence.  Two sentences.
```

现在，让我们创建一个`example.js`文件来处理我们的文本文件并报告发现的任何问题。

```js
import fs from 'node:fs/promises'
import {retext} from 'retext'
import {reporter} from 'vfile-reporter'
import retextSentenceSpacing from './plugin.js'

const document = await fs.readFile('example.md', 'utf8')

const file = await retext()
  .use(retextSentenceSpacing) // 句子间隔检查
  .process(document)

console.error(reporter(file))
```

> 别忘了`npm install retext vfile-reporter`！

如果您阅读过 [using unified](https://unifiedjs.com/learn/guide/using-unified/) 指南，您会看到一些熟悉的语句。首先，我们加载依赖项，然后读取文件。接下来，我们使用即将创建的插件处理该文件，最后报告致命错误或任何发现的代码检查信息。

请注意，我们直接依赖于 `retext`。这是一个**包含** `unified` 处理器的软件包，并附带解析器和编译器。

运行我们的示例时（虽然目前还不能正常工作），我们希望在第二段中看到一条消息，提示应该使用一个空格而不是两个空格。

现在除了插件本身，其他一切都已准备就绪。我们将在下一节中安装插件。

### 插件

我们需要一个插件，而且在我们的例子中还需要一个用于检查的转换函数。让我们在插件文件中创建它们`plugin.js`：

```js
/**
 * @import {Root} from 'nlcst'
 * @import {VFile} from 'vfile'
 */

export default function retextSentenceSpacing() {
  /**
   * @param {Root} tree
   * @param {VFile} file
   * @return {undefined}
   */
  return function (tree, file) {
  }
}
```

首先，我们需要检查 `tree` 是否存在某种模式。我们可以使用一个工具来帮助我们递归地遍历树，即 [`unist-util-visit`](https://unifiedjs.com/explore/package/unist-util-visit/)。让我们添加它。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -3,6 +3,8 @@
  * @import {VFile} from 'vfile'
  */

+import {visit} from 'unist-util-visit'
+
 export default function retextSentenceSpacing() {
   /**
    * @param {Root} tree
@@ -10,5 +12,8 @@ export default function retextSentenceSpacing() {
    * @return {undefined}
    */
   return function (tree, file) {
+    visit(tree, 'ParagraphNode', function (node) {
+      console.log(node)
+    })
   }
 }
```

> 别忘了 `npm install unist-util-visit`。

如果我们现在使用 Node.js 运行示例，如下所示，我们会​​看到 visitor 函数会调用示例中的两个段落：

```sh
node example.js
```

```json
{
  type: 'ParagraphNode',
  children: [
    { type: 'SentenceNode', children: [Array], position: [Object] },
    { type: 'WhiteSpaceNode', value: ' ', position: [Object] },
    { type: 'SentenceNode', children: [Array], position: [Object] }
  ],
  position: {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 29, offset: 28 }
  }
}
{
  type: 'ParagraphNode',
  children: [
    { type: 'SentenceNode', children: [Array], position: [Object] },
    { type: 'WhiteSpaceNode', value: '  ', position: [Object] },
    { type: 'SentenceNode', children: [Array], position: [Object] }
  ],
  position: {
    start: { line: 3, column: 1, offset: 30 },
    end: { line: 3, column: 30, offset: 59 }
  }
}
no issues found
```

输出结果已经表明段落包含两种类型的节点：`SentenceNode` 和 `WhiteSpaceNode`。后者是我们想要检查的，但前者也很重要，因为在这个插件中，我们只对句子之间的空格发出警告（不过这也可以交给另一个插件来实现）。

现在我们遍历每个段落的子节点，只检查句子之间的空格。我们使用一个小工具来检查节点类型 [`unist-util-is`](https://unifiedjs.com/explore/package/unist-util-is/)：

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -13,7 +13,23 @@ export default function retextSentenceSpacing() {
    */
   return function (tree, file) {
     visit(tree, 'ParagraphNode', function (node) {
-      console.log(node)
+      let index = -1
+
+      while (++index < node.children.length) {
+        const previous = node.children[index - 1]
+        const child = node.children[index]
+        const next = node.children[index + 1]
+
+        if (
+          previous &&
+          next &&
+          previous.type === 'SentenceNode' &&
+          child.type === 'WhiteSpaceNode' &&
+          next.type === 'SentenceNode'
+        ) {
+          console.log(child)
+        }
+      }
     })
   }
 }
```

如果我们现在使用 Node 运行示例，如下所示，我们将看到只记录句子之间的空格。

```sh
node example.js
```

```json
{
  type: 'WhiteSpaceNode',
  value: ' ',
  position: {
    start: { line: 1, column: 14, offset: 13 },
    end: { line: 1, column: 15, offset: 14 }
  }
}
{
  type: 'WhiteSpaceNode',
  value: '  ',
  position: {
    start: { line: 3, column: 14, offset: 43 },
    end: { line: 3, column: 16, offset: 45 }
  }
}
no issues found
```

最后，我们添加一个针对第二个空格的警告，因为它包含的字符数超过了所需数量。我们可以利用[`file.message()`](https://unifiedjs.com/explore/package/vfile/#vfilemessagereason-options)这个警告信息将消息与文件关联起来。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -25,9 +25,15 @@ export default function retextSentenceSpacing() {
           next &&
           previous.type === 'SentenceNode' &&
           child.type === 'WhiteSpaceNode' &&
-          next.type === 'SentenceNode'
+          next.type === 'SentenceNode' &&
+          child.value.length !== 1
         ) {
-          console.log(child)
+          file.message(
+            'Unexpected `' +
+              child.value.length +
+              '` spaces between sentences, expected `1` space',
+            child
+          )
         }
       }
     })
```

如果我们现在最后一次运行这个示例，我们就会看到一个关于问题的消息！

```sh
$ node example.js
3:14-3:16 warning Unexpected `2` spaces between sentences, expected `1` space

⚠ 1 warning
```

### 更多练习

句子之间留一个空格并不适合所有人。这个插件可以接收用户偏好的空格数量，而不是使用硬编码的空格数量`1`。

如果你想对句子之间的制表符或换行符发出警告，或许也可以为此创建一个插件？

如果你还没看过，请查看[学习版块](https://unifiedjs.com/learn/)中的其他文章！

