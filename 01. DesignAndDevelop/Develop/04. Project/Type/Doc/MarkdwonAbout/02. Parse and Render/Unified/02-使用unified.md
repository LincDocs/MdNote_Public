---
create_date: 2025-12-14
last_date: 2025-12-14
source: https://unifiedjs.com/learn/guide/using-unified/
author: LincZero
---
# 02-使用unified

本指南展示了如何使用unified将markdown文件转换为HTML。它还展示了如何生成目录，并简要介绍了 文本检查 (checking prose)。

> 遇到难题？有其他指南的想法？请参阅[`support.md`](https://github.com/unifiedjs/.github/blob/main/support.md)。

## 内容

- [树状变换](https://unifiedjs.com/learn/guide/using-unified/#tree-transformations)
- [插件](https://unifiedjs.com/learn/guide/using-unified/#plugins)
- [报告](https://unifiedjs.com/learn/guide/using-unified/#reporting)
- [检查散文](https://unifiedjs.com/learn/guide/using-unified/#checking-prose)
- [更多练习](https://unifiedjs.com/learn/guide/using-unified/#further-exercises)

## 树变换 (Tree transformations)

在这个例子中，我们从 Markdown 内容开始，然后将其转换为HTML。我们需要一个工具来解析 Markdown，以及一个工具来编译（字符串化, stringify）HTML。
相关的项目分别是 [`remark-parse`](https://unifiedjs.com/explore/package/remark-parse/) 和 [`rehype-stringify`](https://unifiedjs.com/explore/package/rehype-stringify/)。为了在两种语法之间进行转换，我们使用 [`remark-rehype`](https://unifiedjs.com/explore/package/remark-rehype/) 。最后，我们使用 [`unified`](https://unifiedjs.com/explore/package/unified/) 将它们连接起来。

首先创建一个项目。创建一个文件夹`example`，进入该文件夹，然后初始化一个新的包：

```sh
mkdir example
cd example
npm init -y
```

然后确保项目是一个模块，以便通过 `import` 和 `export` 使其正常工作：`"type": "module"`

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

现在让我们使用 [npm](https://www.npmjs.com/) 安装所需的依赖项，npm 是 [Node.js](https://nodejs.org/en) 自带的。

```sh
npm install rehype-stringify remark-parse remark-rehype unified
```

现在创建一个 Markdown 文件，`example.md`我们将对其进行转换。

```markdown
# Pluto

Pluto is an dwarf planet in the Kuiper belt.

## Contents

## History

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto’s orbital period is about 248 years…
```

然后 `index.js` 也创建它。它将 Markdown 转换为 HTML：

```js
import fs from 'node:fs/promises'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

const document = await fs.readFile('example.md', 'utf8')

const file = await unified()
  .use(remarkParse)     // markdown_string转remark, 即解析
  .use(remarkRehype)    // remark转rehype, 即mdast转hast?
  .use(rehypeStringify) // rehype转html_string, 即字符串化
  .process(document)

console.log(String(file))
```

现在，使用 [Node](https://nodejs.org/en) 运行我们的模块：

```sh
node index.js
```

...生成一个`example.html`如下所示的文件：

```html
<h1>Pluto</h1>
<p>Pluto is an dwarf planet in the Kuiper belt.</p>
<h2>Contents</h2>
<h2>History</h2>
<h3>Discovery</h3>
<p>In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…</p>
<h3>Name and symbol</h3>
<p>The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…</p>
<h3>Planet X disproved</h3>
<p>Once Pluto was found, its faintness and lack of a viewable disc cast doubt…</p>
<h2>Orbit</h2>
<p>Pluto’s orbital period is about 248 years…</p>
```

> 👉 请注意，这 [`remark-rehype`](https://unifiedjs.com/explore/package/remark-rehype/) 不会处理 Markdown 内部的 HTML 代码。有关更多信息，请参阅[_HTML和注释部分_](https://unifiedjs.com/learn/recipe/remark-html/)。

🎉 真棒！它目前功能还不多，但我们慢慢来。下一节，我们将通过引入插件来增强它的实用性。

## 插件

我们仍然缺少一些东西，具体来说就缺少目录以及正确的HTML文档结构。

对于前者，我们可以使用 [`rehype-slug`](https://unifiedjs.com/explore/package/rehype-slug/) and [`remark-toc`](https://unifiedjs.com/explore/package/remark-toc/) 来完成。
对于后者，我们可以使用 [`rehype-document`](https://unifiedjs.com/explore/package/rehype-document/)来完成。

```sh
npm install rehype-document rehype-slug remark-toc
```

现在我们也来使用这两个函数，方法是修改我们的`index.js`文件：

```diff
--- a/index.js
+++ b/index.js
@@ -1,14 +1,20 @@
 import fs from 'node:fs/promises'
+import rehypeDocument from 'rehype-document'
+import rehypeSlug from 'rehype-slug'
 import rehypeStringify from 'rehype-stringify'
 import remarkParse from 'remark-parse'
 import remarkRehype from 'remark-rehype'
+import remarkToc from 'remark-toc'
 import {unified} from 'unified'

 const document = await fs.readFile('example.md', 'utf8')

 const file = await unified()
   .use(remarkParse)
+  .use(remarkToc)
   .use(remarkRehype)
+  .use(rehypeSlug)
+  .use(rehypeDocument, {title: 'Pluto'})
   .use(rehypeStringify)
   .process(document)

```

我们将选项传递给 `rehype-document`。在这种情况下，我们利用这些选项来确保在我们的 `<head>` 标签中生成一个符合 HTML 规范的正确 `<title>` 元素。`rehype-document` 还接受其他一些选项，例如要使用的语言标签。这些选项的具体说明在它的 readme.md 文件中有详细描述。许多其他插件也接受选项，所以请务必阅读 [`readme.md`](https://unifiedjs.com/explore/package/rehype-document/) 文档以了解更多内容

> 👉 请注意，[remark](https://unifiedjs.com/explore/project/remarkjs/remark/) 插件基于 Markdown 树运行，而 [rehype](https://unifiedjs.com/explore/project/rehypejs/rehype/) 插件基于HTML树运行。务必将 `.use` 插件调用放在正确的位置：插件的调用顺序很重要！

如果像以前一样运行我们的模块，我们会得到以下`example.html`文件：

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Pluto</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
</head>
<body>
<h1 id="pluto">Pluto</h1>
<p>Pluto is an dwarf planet in the Kuiper belt.</p>
<h2 id="contents">Contents</h2>
<ul>
<li><a href="#history">History</a>
<ul>
<li><a href="#discovery">Discovery</a></li>
<li><a href="#name-and-symbol">Name and symbol</a></li>
<li><a href="#planet-x-disproved">Planet X disproved</a></li>
</ul>
</li>
<li><a href="#orbit">Orbit</a></li>
</ul>
<h2 id="history">History</h2>
<h3 id="discovery">Discovery</h3>
<p>In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…</p>
<h3 id="name-and-symbol">Name and symbol</h3>
<p>The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…</p>
<h3 id="planet-x-disproved">Planet X disproved</h3>
<p>Once Pluto was found, its faintness and lack of a viewable disc cast doubt…</p>
<h2 id="orbit">Orbit</h2>
<p>Pluto’s orbital period is about 248 years…</p>
</body>
</html>
```

> 👉 请注意，文档格式不太美观。不过有插件可以解决这个问题！欢迎您添加[`rehype-format`](https://unifiedjs.com/explore/package/rehype-format/)插件。就在之后`rehypeDocument`！

💯 你做得太棒了！这真的很有用，对吧？

下一节，我们将为撰写报告奠定基础。

## 报告 (Reporting)

在检查一些文字 (prose) 之前，我们先来修改一下 `index.js` 文件，以便打印出一份漂亮的报告。

我们可以使用它们 [`to-vfile`](https://unifiedjs.com/explore/package/to-vfile/) 来读取和写入文件系统中的虚拟文件。然后，我们可以使用 [`vfile-reporter`](https://unifiedjs.com/explore/package/vfile-reporter/) 这些工具来报告与这些文件相关的消息。让我们来安装它们。

```sh
npm install to-vfile vfile-reporter
```

然后，在我们的示例中使用 [vfile](https://unifiedjs.com/explore/package/vfile/)，如下所示：

```diff
--- a/index.js
+++ b/index.js
@@ -1,21 +1,24 @@
-import fs from 'node:fs/promises'
 import rehypeDocument from 'rehype-document'
 import rehypeSlug from 'rehype-slug'
 import rehypeStringify from 'rehype-stringify'
 import remarkParse from 'remark-parse'
 import remarkRehype from 'remark-rehype'
 import remarkToc from 'remark-toc'
+import {read, write} from 'to-vfile'
 import {unified} from 'unified'
+import {reporter} from 'vfile-reporter'

-const document = await fs.readFile('example.md', 'utf8')
+const file = await read('example.md')

-const file = await unified()
+await unified()
   .use(remarkParse)
   .use(remarkToc)
   .use(remarkRehype)
   .use(rehypeSlug)
   .use(rehypeDocument, {title: 'Pluto'})
   .use(rehypeStringify)
-  .process(document)
+  .process(file)

-console.log(String(file))
+console.error(reporter(file))
+file.extname = '.html'
+await write(file)
```

如果我们现在单独运行这个模块，会得到一份报告，显示一切正常：

```sh
$ node index.js
example.md: no issues found
```

但事情并不顺利：Markdown 中有一个拼写错误！下一节将展示如何通过添加 [retext](https://unifiedjs.com/explore/project/retextjs/retext/) 来检测 prose 错误。

## 检查自然语言 (Checking prose)

我确实注意到里面有个拼写错误。所以我们来检查一下文本，以避免将来再次出现这种情况。我们可以使用 [retext](https://unifiedjs.com/explore/project/retextjs/retext/) 及其生态系统进行自然语言解析。由于我们是用英语编写的，所以我们 [`retext-english`](https://unifiedjs.com/explore/package/retext-english/) 专门使用 retext 来解析英语自然语言。我们文件中的问题 `example.md` 在于它使用了 `an dwarf planet` 而不是 `a dwarf planet`，而 retext 可以很方便用 [`retext-indefinite-article`](https://unifiedjs.com/explore/package/retext-indefinite-article/) 地检查这一点。为了将标记语言转换为文本，我们使用 [`remark-retext`](https://unifiedjs.com/explore/package/remark-retext/)。我们也来安装这些依赖项。

```sh
npm install remark-retext retext-english retext-indefinite-article
```

`index.js`……并像这样改变我们：

```diff
--- a/index.js
+++ b/index.js
@@ -3,7 +3,10 @@ import rehypeSlug from 'rehype-slug'
 import rehypeStringify from 'rehype-stringify'
 import remarkParse from 'remark-parse'
 import remarkRehype from 'remark-rehype'
+import remarkRetext from 'remark-retext'
 import remarkToc from 'remark-toc'
+import retextEnglish from 'retext-english'
+import retextIndefiniteArticle from 'retext-indefinite-article'
 import {read, write} from 'to-vfile'
 import {unified} from 'unified'
 import {reporter} from 'vfile-reporter'
@@ -12,6 +15,8 @@ const file = await read('example.md')

 await unified()
   .use(remarkParse)
+  // @ts-expect-error: fine.
+  .use(remarkRetext, unified().use(retextEnglish).use(retextIndefiniteArticle))
   .use(remarkToc)
   .use(remarkRehype)
   .use(rehypeSlug)
```

如代码所示，该插件 `remark-retext` 接收另一个 `unified` 管道，即自然语言管道。它会使用给定管道中定义的解析器转换原始语法（Markdown）。然后，它会在自然语言语法树上运行附加的插件。

现在，让我们最后一次运行我们的模块：

```sh
$ node index.js
example.md
3:10-3:12 warning Unexpected article `an` before `dwarf`, expected `a` retext-indefinite-article retext-indefinite-article

⚠ 1 warning
```

我们收到了一条有用的信息。

💃 你已经搭建了一个非常棒的系统，做得好！今天就到这里，请查看下一节以获取更多练习和资源。

## 更多练习

最后，查看 [retext](https://github.com/retextjs/retext/blob/HEAD/doc/plugins.md)、[remark](https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md) 和 [rehype](https://github.com/rehypejs/rehype/blob/HEAD/doc/plugins.md) 的可用插件列表，并尝试使用其中的一些插件。

如果你还没看过，请查看 [学习版块](https://unifiedjs.com/learn/) 中的其他文章！

