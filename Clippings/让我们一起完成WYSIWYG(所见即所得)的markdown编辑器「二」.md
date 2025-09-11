---
title: "让我们一起完成WYSIWYG(所见即所得)的markdown编辑器「二」"
source: "https://juejin.cn/post/6948719982968569887"
author:
  - "[[Lupoy]]"
published: 2021-04-08
created: 2025-07-20
description: "我们在上篇文章中提过，我们将以Slate为编辑器框架搭建markdown编辑器所见即所得。 强烈推荐remixicon，风格统一，icon量多，用过的开发都说好，适合我们这些视觉审美差的开发者。 目前我完成了标题的所见即所得以及表格的所见即所得；图片目前完成了百分之五十，未来想…"
tags:
  - "clippings"
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

> 书接上回

我们在上篇文章中提过，我们将以Slate为编辑器框架搭建markdown编辑器所见即所得。

开头先贴出我目前完成的部分:![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84b664657a2347aebd68969a682ad5dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

强烈推荐 [remixicon](https://link.juejin.cn/?target=https%3A%2F%2Fremixicon.com%2F "https://remixicon.com/") ，风格统一，icon量多，用过的开发都说好，适合我们这些视觉审美差的开发者。

目前我完成了标题的所见即所得以及表格的所见即所得；图片目前完成了百分之五十，未来想支持多种功能，例如横屏滑动，九宫格布局....

## slate.js的前世今生

> slate简介

slate.js是一个「 **非常轻量** 」的编辑器框架，它没有集成任何功能，只提供了一个插件扩展机制让开发者去实现自己想要的功能，可插拔性高，轻量化操作，同时，它与「 **视图** 」无关，它将视图层独立封装为 `slate-react` ，Slate.js自己定义了一套脱离UI实现的数据模型，本文采用的slatejs版本号为： `0.57.1`.

> 它像极了angular

说它像angular不是说框架层，而是Slate的历程和angular相似，经历了一次大的改版，去除了之前的很多API以及语言选型从JavaScript转为了typescript。

在github上能搜到的利用slatejs做的编辑器，很大一部分是建立在最初版本的slatejs： `0.4x.x` 上的，就连Slate.js官方文档为了照顾使用之前版本的开发者，也会出一个main版本和 `0.47` 版本的文档。

## slate架构简介

slate作为一个编辑器框架，他的分层设计明显，仓库下包含四个模块：

- slate：核心，他定义了数据模型(model)，操作模型的方法和编辑器实例本身
- slate-react： 以插件的形式提供了DOM渲染和用户交互能力，包括光标，快捷键等等。。。
- slate-history：以插件的形式提供 undo/redo 能力
- slate-hyperscript：让 用户能够使用jsx的语法创建slate的数据，项目中没有使用到，故暂不会介绍此处

## state(model)

这是slate的核心区域，它提供的API在官方文档上不够全面，但是在 [github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fianstormtaylor%2Fslate%2Ftree%2Fmain%2Fdocs%2Fapi "https://github.com/ianstormtaylor/slate/tree/main/docs/api") 上提示的很全面。

> 工欲善其事，必先利其器

要想使用slate构建编辑器，那必须要了解他的构造。

### model结构

state它是以树形结构来创建和存储文档内容的，树形结构的节点类型为Node：

```ts
export type Node = Editor | Element | Text

export interface Element {
  children: Node[]
  [key: string]: unknown
}

export interface Text {
  text: string
  [key: string]: unknown
}
```
- Element 类型含有 children 属性，可以作为其他 Node 的父节点
- Editor 可以看作是一种特殊的 Element ，它既是编辑器实例类型，也是文档树的根节点
- Text 类型是树的叶子结点，包含文字信息

他不会限制我们传入的数据类型，这让我们可以自行扩展Node的属性，但是相应的Node类型中必须包含的是 `children` ，例如我们定义了一个image类型的Node节点：

```ts
export const imageNode = (str: string, link: string): Node => {
    return {
        type: "image",
        url: link,
        desc: str,
        children: [{ text: str }]
    }
};

// 跟踪编辑器中 value 的值。
const [value, setValue] = useState([
   imageNode('ceshi', 'https://baidu.com'),
] as Node[]);
```

那么为什么slate要采用树形结构来描述文档内容呢？

- 富文本文档本来就含有层次信息，例如，paragraph。text等，用树形结构描述符合我们开发者的直觉感官
- 文本和属性信息存在一处，方便我们获取文字的同时获取属性信息
- 方便递归操作

#### editor

我们可以实时拿到editor对象，如截图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20580c2fec554ba099abf3e09c2e9813~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

通过截图，我们可以知道editor提供children去存储我们的Node节点，同时提供了很多全局的方法供我们去使用，例如 `insertNodes 插入节点` `removeNode删除节点` 等等

### 光标和选区 selection

有了model还需要selection选区，slate的选区采用的是Path+offset的设计。

Path是一个number类型的数组：

```ts
export type Path = number[]
```

它代表的是一个Node和他的祖先节点，以及在各自的上一级祖先节点的children数组中的index：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/739c201d61d840e6bf29eac9cde121e9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

例如上图就是第一行的第一个元素。

offset 则是对于 Text 类型的节点而言，代表光标在文本串中的 index 位置。

Path 加上 offet 即构成了 Point 类型，即可表示 model 中的一个位置。

```ts
export interface Point {
  path: Path
  offset: number
}
```

两个 Point 类型即可组合为一个 Range，表示选区。

```ts
export interface Range {
  anchor: Point // 选区开始的位置
  focus: Point // 选区结束的位置
}
```

## 如何对model进行变更---Transforms

Transforms了很多的方法，这些方法大致分成四种类型：

```ts
export const Transforms = {
  ...GeneralTransforms,
  ...NodeTransforms,
  ...SelectionTransforms,
  ...TextTransforms,
}
```
- NodeTransforms：对 Node 的操作方法
- SelectionTransforms：对选区的操作方法
- TextTransforms：对文本操作方法
- GeneralTransforms：它并不生成 Operation 而是对 Operation 进行处理，只有它能直接修改 model，其他 transforms 最终都会转换成 GeneralTransforms 中的一种。

具体还是需要去查阅文档，此处只是相当于一次汇总，但实际上例如插件化等并没有讲解。

评论 6