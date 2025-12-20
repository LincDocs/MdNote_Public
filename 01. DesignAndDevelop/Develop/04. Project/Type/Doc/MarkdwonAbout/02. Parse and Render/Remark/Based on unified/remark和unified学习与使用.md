---
title: "remark和unified学习与使用"
source: "https://juejin.cn/post/7140468491001266213"
author:
  - "[[faga]]"
published: 2022-09-07
created: 2025-12-10
description: "remark不单单是一个markdown的编译工具，更准确地说，它是一个围绕markdown的生态。通过插件化的方式，对mdast进行修改，使其转化成我们想要的样子。"
tags:
  - "clippings"
---
# remark和unified学习与使用

Remark 建立在 [unified](https://github.com/unifiedjs/unified) 之上,一定要阅读它和它的 [网站](https://unifiedjs.github.io)
官网: https://unifiedjs.com/

## remark

remark不单单是一个markdown的编译工具，更准确地说，它是一个围绕markdown的生态。通过插件化的方式，对mdast进行修改，使其转化成我们想要的样子。 `remarkParse` 就是将 `markdown` 编译为mdast的插件。

```javascript
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

main()

async function main() {
  const file = await unified()
    .use(remarkParse)     // markdown -> mdast
    .use(remarkRehype)    // mdast -> hast
    .use(rehypeSanitize)  // sanitize HTML
    .use(rehypeStringify) // hast -> string
    .process('# Hello, Neptune!')

  console.log(String(file))
}
```

## unified

`unified` 相当于一种管道传输的思想，我们把内容放到管道里，先对其解析，解析为 [ast](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsyntax-tree "https://github.com/syntax-tree") ，再使用一个一个插件处理ast，管道中的内容是以ast的形式传输的，最终将ast编译，并在管道的另一头获取到被处理后的内容。

![image-20220708230927329](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed36dd29dc344e9d9270b8137ff2af75~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```lua
| ........................ process ........................... |
| .......... parse ... | ... run ... | ... stringify ..........|

          +--------+                     +----------+
Input ->- | Parser | ->- Syntax Tree ->- | Compiler | ->- Output
          +--------+          |          +----------+
                              X
                              |
                       +--------------+
                       | Transformers |
                       +--------------+
```

`unified` 其实际上只是一个配置 `processor` 的过程， `unified()` 返回值是一个 `processor`,`processor.use()` 返回是一个被配置过的 `processor`,在配置一个插件后，我们可以使用 `processor.process()` 或 `processor.processSync()` 处理。

`processor.processSync(file:VFile|undefined):VFile`

如果我们传入的值不是VFile，则会自动的使用 `new VFile(x)` 将其转化为 `VFile`

输出的 `VFile` 我们可以使用 `String(VFile)` 或 `VFile.toString()` 获取到其中的内容

## Plugin

插件是用于配置 `processor` 的，那么我们该如何写一个自己的插件呢

### function attacher(options?)

**parameters**

`options` -- configuration

**Return**

`transformer`

`Plugin` 应该是一个可以接收options，并且返回 `transformer` 的函数

### function transformer(tree,file\[,next\])

transformer是用来处理 `syntax tree` 和 `VFile` 的函数。

以下是官方的例子

move.js

```javascript
export function move(options) {
  if (!options || !options.extname) {
    throw new Error('Missing \`options.extname\`')
  }

  return function (tree, file) {
    if (file.extname && file.extname !== options.extname) {
      file.extname = options.extname
    }
  }
}
```

index.js

```javascript
import {read, write} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {move} from './move.js'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(move, {extname: '.html'})
  .use(rehypeStringify)
  .process(await read('index.md'))

console.error(reporter(file))
await write(file) // written VFile to ‘index.html’
```

index.html

```html
<h1>Hello, world!</h1>
```

## 实际应用

这是在我写一个vscode的插件时碰到的问题，这个vscode插件是用于预览markdown的，虽然插件市场已经有很多预览markdown的插件了，但是由于一些原因，这个插件需要使用remark来实现，所以需要重新做一个。

在需要实现滚动锁定功能的时候，其他插件的实现方法是，对每一个 `HTML Element` 添加一个属性:`data-line` (指的是该html在编辑器的位置)，这样我在滚动预览页面的时候就只需要找到能看到的最上面的 `HTML Element` 再找到与之对应的 `data-line` 接着滚动编辑器即可。

因此思路也非常清晰了，我们需要在对 `hast` 的处理过程中加上一步(添加data-line属性)，接着，我们开始编写此插件

rehype-source-line.ts

```javascript
import {visit} from 'unist-util-visit';// 用于访问语法树的节点

export default function rehypeSourceLine() {
  return (tree:any) => {
    visit(tree, (node) => {
        if(node.position && node.properties){
          node.properties.dataLine = node.position.start.line;
        }
    });
  };
}
```

让我们来看看效果

![image-20220710150532940](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbd412581d1e42fe87c867cf8bb37228~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

ok，那么这样一个简单的插件就完成了。
