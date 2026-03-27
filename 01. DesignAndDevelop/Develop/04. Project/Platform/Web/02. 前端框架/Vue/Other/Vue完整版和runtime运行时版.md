---
create_date: 2026-03-27
last_date: 2026-03-27
author:
  - LincZero
---
# Vue完整版和runtime运行时版

参考:

- [Vue：浅析vue.js完整版 和 vue.runtime.js运行时版](https://juejin.cn/post/6970997826457174052)
- [Vue CLI 官方文档](https://cli.vuejs.org/zh/config/#runtimecompiler)

## 不同构建版本

[addClass(ab-super-width)]

|        UMD        |        CommonJS        |  ES Module<br>(基于构建工具使用)  | ES Module<br>(直接用于浏览器) |                            |
| :---------------: | :--------------------: | :-----------------------: | :--------------------: | :------------------------: |
|        完整版        |       vue<br>.js       |     vue<br>.common.js     |     vue<br>.esm.js     |   vue.esm<br>.browser.js   |
|      只包含运行时版      |   vue.runtime<br>.js   | vue.runtime<br>.common.js | vue.runtime<br>.esm.js |             -              |
|   完整版<br>(生产环境)   |     vue<br>.min.js     |             -             |           -            | vue.esm<br>.browser.min.js |
| 只包含运行时版<br>(生产环境) | vue.runtime<br>.min.js |             -             |           -            |             -              |

注：

- **完整版**：同时包含编译器和运行时的版本。
- **编译器**：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
- **运行时**：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。*基本上就是除去编译器的其它一切*。

引入，例如:

```html
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.min.js"></script>
// or
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.runtime.min.js"></script>
// or
...
```

## Vue CLI 的 runtimeCompiler 选项

- Type: `boolean`
- Default: `false`
    是否使用包含运行时编译器的 Vue 构建版本。设置为 `true` 后你就可以在 Vue 组件中使用 `template` 选项了，但是这会让你的应用额外增加 10kb 左右。
    更多细节可查阅：[Runtime + Compiler vs. Runtime only](https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6)。

## 使用Vue实例的三种方法

- 方法一：

  完整版Vue，从CDN引用 `vue.js` 或` vue.min.js` 即可做到，也可以通过 `import` 引用 `vue.js` 或 `vue.min.js`

- 方法二：

  运行时版本 `vue.runtime.js`

- 方法三：

  写（完整版），用户下载（运行时版本）

  可以通过webpack，使用 `vue-loader` 将 `*.vue` 文件翻译成h构建方法，但这样做HTML就只有一个` div#app`，SEO不友好

  总的来说，运行时版本使用 `vue-loader` 或` vueify`，`*.vue` 文件内部的模板会在构建时预编译成JavaScript。在最终打包好的包里是不需要编译器的，所以只用运行时版本即可。**相较而言，运行时版本的体积比完整版要小大约30%。**

## SEO友好

上面说到，方法三对SEO不友好，那么SEO是什么呢？

SEO就是搜索引擎优化

可以认为搜索引擎根据curl结果猜测页面内容，如果页面都是用JS创建div，那么就很难检测出信息。

把`title`、`description`、`keyword`、`h1`、`a`写好即可，原则是能够让curl得到页面的信息，SEO就能正常工作。

Google可以获取JS创建的内容。

## 深入理解两种区别

| |Vue完整版|Vue非完整版|评价|
|:-:|:-:|:-:|:-:|
|特点|有compiler|无compiler|compiler占40%体积|
|视图|写在HTML里或者写在template选项|写在render函数里用h来创建标签|h是作者写好传给render的|
|cdn引入|`vue.js`|`vue.runtime.js`|文件名不同，生成环境后缀为`.min.js`|
|webpack引入|需要配置 alias|默认使用此版|作者配置|
|@vue/cli引入|需要额外配置|默认使用此版|作者配置|

**最佳实践**：使用非完整版，然后配合 `vue-loader` 和 `vue` 文件

思路：

1. 保证用户体验，用户下载的JS文件体积更小，但只支持h函数
2. 保证开发体验，开发者可直接在vue文件里写HTML标签，而不写h函数
3. 使用 `vue-loader` 把vue文件里的HTML转为h函数

  







  