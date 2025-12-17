---
create_date: 2025-12-13
last_date: 2025-12-13
source: https://unifiedjs.com/learn/guide/create-a-remark-plugin/
---
# 3-创建remark插件

(基于deepseek对原文的翻译)

本指南展示如何为 [remark](https://unifiedjs.com/explore/project/remarkjs/remark/) 创建一个插件，该插件将表情符号短代码（[gemoji](https://github.com/wooorm/gemoji/blob/main/support.md)，例如 `:+1:`）转换为 Unicode 表情符号（`👍`）。它会在文本中查找正则表达式并替换它。

> 遇到困难？有关于其他指南的想法？请参阅 [`support.md`](https://github.com/unifiedjs/.github/blob/main/support.md)。

### 目录

- [案例](https://unifiedjs.com/learn/guide/create-a-remark-plugin/#case)
- [设置](https://unifiedjs.com/learn/guide/create-a-remark-plugin/#setting-up)
- [插件](https://unifiedjs.com/learn/guide/create-a-remark-plugin/#plugin)

### 案例

在开始之前，我们先概述一下我们想做什么。假设我们有以下文件：

```markdown
Look, the moon :new_moon_with_face:
```

我们希望将其转换为：

```markdown
Look, the moon 🌚
```

在下一步中，我们将编写代码来使用我们的插件。

### 设置

让我们建立一个项目。创建一个文件夹 `example`，进入该文件夹，并初始化一个新项目：

```sh
mkdir example
cd example
npm init -y
```

然后通过修改 `package.json` 确保该项目是一个模块，以便 `import` 和 `export` 生效：

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

确保 `input.md` 存在且包含以下内容：

```markdown
Look, the moon :new_moon_with_face:
```

现在，让我们创建一个 `example.js` 文件，它将处理我们的文件并报告发现的问题。

```js
import fs from 'node:fs/promises'
import {remark} from 'remark'
import remarkGemoji from './plugin.js'

const document = await fs.readFile('input.md', 'utf8')

const file = await remark().use(remarkGemoji).process(document)

await fs.writeFile('output.md', String(file))
```

> 别忘了运行 `npm install remark`！

如果你阅读过关于 [使用 unified](https://unifiedjs.com/learn/guide/using-unified/) 的指南，你会看到一些熟悉的语句。首先，我们加载依赖项，然后读入文件。我们使用接下来要创建的插件处理该文件，最后将其再次写出。

注意，我们直接依赖于 `remark`。这是一个暴露 `unified` 处理器的包，并附带了 Markdown 解析器和 Markdown 编译器。

现在，除了插件本身，我们已经完成了所有设置。我们将在下一节中完成插件。

### 插件

我们需要一个插件，对于我们的案例还需要一个转换器。让我们在插件文件 `plugin.js` 中创建它们：

```js
/**
 * @import {Root} from 'mdast'
 */

/**
 * 将 gemoji 短代码 (`:+1:`) 转换为表情符号 (`👍`)。
 *
 * @returns
 *   Transform (转换函数)
 */
export default function remarkGemoji() {
  /**
   * @param {Root} tree
   * @return {undefined}
   */
  return function (tree) {
  }
}
```

大多数插件都是这样开始的。一个返回另一个函数的函数。

对于这个用例，我们可以遍历树并使用 [`unist-util-visit`](https://unifiedjs.com/explore/package/unist-util-visit/) 替换节点，许多插件都是这样工作的。但另一个工具更简单：[`mdast-util-find-and-replace`](https://github.com/syntax-tree/mdast-util-find-and-replace)。它**查找正则表达式并允许你替换匹配项**。

让我们添加它。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -2,6 +2,8 @@
  * @import {Root} from 'mdast'
  */

+import {findAndReplace} from 'mdast-util-find-and-replace'
+
 /**
  * 将 gemoji 短代码 (\`:+1:\`) 转换为表情符号 (\`👍\`)。
  *
@@ -14,5 +16,16 @@ export default function remarkGemoji() {
    * @return {undefined}
    */
   return function (tree) {
+    findAndReplace(tree, [
+      /:(\+1|[-\w]+):/g,
+      /**
+       * @param {string} _
+       * @param {string} $1
+       * @return {undefined}
+       */
+      function (_, $1) {
+        console.log(arguments)
+      }
+    ])
   }
 }
```

> 别忘了运行 `npm install mdast-util-find-and-replace`！

如果我们现在用 Node.js 运行我们的示例，会看到 `console.log` 被调用：

```sh
node example.js
```

```json
[Arguments] {
  '0': ':new_moon_with_face:',
  '1': 'new_moon_with_face',
  '2': {
    index: 15,
    input: 'Look, the moon :new_moon_with_face:',
    stack: [ [Object], [Object], [Object] ]
  }
}
```

此输出显示正则表达式匹配了表情符号短代码。第二个参数是表情符号的名称。这正是我们想要的。

我们可以查找该名称以找到对应的 Unicode 表情符号。我们可以使用 [`gemoji`](https://github.com/wooorm/gemoji/blob/main/support.md) 包来实现。它暴露了一个 `nameToEmoji` 记录。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -2,6 +2,7 @@
  * @import {Root} from 'mdast'
  */

+import {nameToEmoji} from 'gemoji'
 import {findAndReplace} from 'mdast-util-find-and-replace'

 /**
@@ -21,10 +22,10 @@ export default function remarkGemoji() {
       /**
        * @param {string} _
        * @param {string} $1
-       * @return {undefined}
+       * @return {string | false}
        */
       function (_, $1) {
-        console.log(arguments)
+        return Object.hasOwn(nameToEmoji, $1) ? nameToEmoji[$1] : false
       }
     ])
   }
```

> 别忘了运行 `npm install gemoji`！

如果我们现在再次用 Node 运行我们的示例……

```sh
node example.js
```

……然后打开 `output.md`，我们会看到短代码被替换成了表情符号！

```markdown
Look, the moon 🌚
```

就是这样！有关此插件的完整版本，请参阅 [`remark-gemoji`](https://unifiedjs.com/explore/package/remark-gemoji/)。

如果还没看过，请查看 [学习区](https://unifiedjs.com/learn/) 中的其他文章！


