---
create_date: 2025-12-13
last_date: 2025-12-13
source: https://unifiedjs.com/learn/guide/create-a-rehype-plugin/
---
# 4-创建rehype插件

(基于deepseek对原文的翻译)

本指南展示了如何为 [rehype](https://unifiedjs.com/explore/project/rehypejs/rehype/) 创建一个插件，用于为标题添加 `id` 属性。

> 遇到困难？或者对其他指南有想法？请查看 [`support.md`](https://github.com/unifiedjs/.github/blob/main/support.md)。

### 目录

- [案例](https://unifiedjs.com/learn/guide/create-a-rehype-plugin/#case)
- [项目设置](https://unifiedjs.com/learn/guide/create-a-rehype-plugin/#setting-up)
- [插件](https://unifiedjs.com/learn/guide/create-a-rehype-plugin/#plugin)

### 案例

在开始之前，我们先概述一下我们想要实现什么。假设我们有以下文件：

```html
<h1>太阳系</h1>
<h2>形成与演化</h2>
<h2>结构与组成</h2>
<h3>轨道</h3>
<h3>组成</h3>
<h3>距离与尺度</h3>
<h3>行星际环境</h3>
<p>…</p>
```

我们希望将其转换为：

```html
<h1 id="solar-system">太阳系</h1>
<h2 id="formation-and-evolution">形成与演化</h2>
<h2 id="structure-and-composition">结构与组成</h2>
<h3 id="orbits">轨道</h3>
<h3 id="composition">组成</h3>
<h3 id="distances-and-scales">距离与尺度</h3>
<h3 id="interplanetary-environment">行星际环境</h3>
<p>…</p>
```

在下一步中，我们将编写使用插件的代码。

### 项目设置

让我们来设置一个项目。创建一个文件夹 `example`，进入该文件夹，并初始化一个新项目：

```sh
mkdir example
cd example
npm init -y
```

然后通过修改 `package.json`，确保项目是一个模块，以便 `import` 和 `export` 能够正常工作：

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

确保 `input.html` 文件存在，内容如下：

```html
<h1>太阳系</h1>
<h2>形成与演化</h2>
<h2>结构与组成</h2>
<h3>轨道</h3>
<h3>组成</h3>
<h3>距离与尺度</h3>
<h3>行星际环境</h3>
<p>…</p>
```

现在，让我们创建一个 `example.js` 文件，它将处理我们的文件并报告发现的任何问题。

```js
import fs from 'node:fs/promises'
import {rehype} from 'rehype'
import rehypeSlug from './plugin.js'

const document = await fs.readFile('input.html', 'utf8')

const file = await rehype()
  .data('settings', {fragment: true})
  .use(rehypeSlug)
  .process(document)

await fs.writeFile('output.html', String(file))
```

> 别忘了 `npm install rehype`！

如果你阅读过 [使用 unified](https://unifiedjs.com/learn/guide/using-unified/) 的指南，你会看到一些熟悉的语句。首先，我们加载依赖项，然后读取文件。我们用接下来将要创建的插件处理该文件，最后再次将其写出。

请注意，我们直接依赖 `rehype`。这个包提供了一个带有 HTML 解析器和 HTML 编译器附加的 `unified` 处理器。

现在，除了插件本身之外，我们已经完成了所有设置。我们将在下一节中完成插件的创建。

### 插件

我们需要一个插件，并且对于我们的案例，还需要一个转换器。让我们在插件文件 `plugin.js` 中创建它们：

```js
/**
 * @import {Root} from 'hast'
 */

/**
 * 为标题添加 \`id\`。
 *
 * @returns
 *   转换器。
 */
export default function rehypeSlug() {
  /**
   * @param {Root} tree
   * @return {undefined}
   */
  return function (tree) {
  }
}
```

大多数插件都是这样开始的。一个返回另一个函数的函数。

接下来，对于这个用例，我们可以遍历树并使用 [`unist-util-visit`](https://unifiedjs.com/explore/package/unist-util-visit/) 来更改节点。许多插件都是这样工作的。

让我们从这里开始，使用 `unist-util-visit` 来查找标题：

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -2,6 +2,8 @@
  * @import {Root} from 'hast'
  */

+import {visit} from 'unist-util-visit'
+
 /**
  * Add \`id\`s to headings.
  *
@@ -14,5 +16,17 @@ export default function rehypeSlug() {
    * @return {undefined}
    */
   return function (tree) {
+    visit(tree, 'element', function (node) {
+      if (
+        node.tagName === 'h1' ||
+        node.tagName === 'h2' ||
+        node.tagName === 'h3' ||
+        node.tagName === 'h4' ||
+        node.tagName === 'h5' ||
+        node.tagName === 'h6'
+      ) {
+        console.log(node)
+      }
+    })
   }
 }
```

> 别忘了 `npm install unist-util-visit`！

如果我们现在用 Node.js 运行示例，会看到 `console.log` 被调用：

```sh
node example.js
```

```json
{
  type: 'element',
  tagName: 'h1',
  properties: {},
  children: [ { type: 'text', value: 'Solar System', position: [Object] } ],
  position: …
}
{
  type: 'element',
  tagName: 'h2',
  properties: {},
  children: [
    {
      type: 'text',
      value: 'Formation and evolution',
      position: [Object]
    }
  ],
  position: …
}
…
```

这个输出显示我们找到了标题元素。这正是我们想要的。

接下来，我们想要获取标题内容的字符串表示。有另一个实用工具可以实现这个功能： [`hast-util-to-string`](https://unifiedjs.com/explore/package/hast-util-to-string/)。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -2,6 +2,7 @@
  * @import {Root} from 'hast'
  */

+import {toString} from 'hast-util-to-string'
 import {visit} from 'unist-util-visit'

 /**
@@ -25,7 +26,8 @@ export default function rehypeSlug() {
         node.tagName === 'h5' ||
         node.tagName === 'h6'
       ) {
-        console.log(node)
+        const value = toString(node)
+        console.log(value)
       }
     })
   }
```

> 别忘了 `npm install hast-util-to-string`！

如果我们现在用 Node.js 运行示例，会看到打印出的文本：

```sh
node example.js
```

```
Solar System
Formation and evolution
Structure and composition
Orbits
Composition
Distances and scales
Interplanetary environment
```

然后，我们希望将这些文本转换为 URL 标识符（slug）。这里有很多选择。对于这个案例，我们将使用 [`github-slugger`](https://github.com/Flet/github-slugger)。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -3,6 +3,7 @@
  */

 import {toString} from 'hast-util-to-string'
+import Slugger from 'github-slugger'
 import {visit} from 'unist-util-visit'

 /**
@@ -17,6 +18,8 @@ export default function rehypeSlug() {
    * @return {undefined}
    */
   return function (tree) {
+    const slugger = new Slugger()
+
     visit(tree, 'element', function (node) {
       if (
         node.tagName === 'h1' ||
@@ -27,7 +30,8 @@ export default function rehypeSlug() {
         node.tagName === 'h6'
       ) {
         const value = toString(node)
-        console.log(value)
+        const id = slugger.slug(value)
+        console.log(id)
       }
     })
   }
```

> 别忘了 `npm install github-slugger`！

`const slugger = new Slugger()` 放在这里的原因是，我们希望为每个文档创建一个新的 slugger。如果我们在函数外部创建它，将会为每个文档重用同一个 slugger，这将导致来自不同文档的 slug 混合在一起。对于具有相同标题的文档，这将成为问题。

如果我们现在用 Node.js 运行示例，会看到打印出的 slug：

```sh
node example.js
```

```
solar-system
formation-and-evolution
structure-and-composition
orbits
composition
distances-and-scales
interplanetary-environment
```

最后，我们想要将 `id` 添加到标题元素。这也是确保我们不覆盖现有 `id` 的好时机。

```diff
--- a/plugin.js
+++ b/plugin.js
@@ -22,16 +22,17 @@ export default function rehypeSlug() {

     visit(tree, 'element', function (node) {
       if (
-        node.tagName === 'h1' ||
-        node.tagName === 'h2' ||
-        node.tagName === 'h3' ||
-        node.tagName === 'h4' ||
-        node.tagName === 'h5' ||
-        node.tagName === 'h6'
+        !node.properties.id &&
+        (node.tagName === 'h1' ||
+          node.tagName === 'h2' ||
+          node.tagName === 'h3' ||
+          node.tagName === 'h4' ||
+          node.tagName === 'h5' ||
+          node.tagName === 'h6')
       ) {
         const value = toString(node)
         const id = slugger.slug(value)
-        console.log(id)
+        node.properties.id = id
       }
     })
   }
```

如果我们现在再次用 Node 运行我们的示例...

```sh
node example.js
```

...并打开 `output.html`，我们将看到 ID 已经添加！

```html
<h1 id="solar-system">太阳系</h1>
<h2 id="formation-and-evolution">形成与演化</h2>
<h2 id="structure-and-composition">结构与组成</h2>
<h3 id="orbits">轨道</h3>
<h3 id="composition">组成</h3>
<h3 id="distances-and-scales">距离与尺度</h3>
<h3 id="interplanetary-environment">行星际环境</h3>
<p>…</p>
```

完成！关于此插件的完整版本，请参见 [`rehype-slug`](https://unifiedjs.com/explore/package/rehype-slug/)。

如果你还没有看过，请查看 [学习区](https://unifiedjs.com/learn/) 的其他文章！


