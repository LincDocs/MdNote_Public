# Prism.js

## 资料

- 官网： https://prismjs.com/
  - 教程 - html script版: https://prismjs.com/#basic-usage
  - 教程 - webpack npm包版: https://prismjs.com/#basic-usage-bundlers
- Github Repo: https://github.com/PrismJS/prism

## 使用

参考： https://blog.csdn.net/qq_43030820/article/details/131918105

2KB，可以直接html里script引入也行

这里 vue 方式：

```bash
npm install prismjs
```

```js
//引入Prism（我们只需要在局部引入即可，我这里是在文章内容展示组件中引入）
<script setup lang="ts">
    import Prism from "prismjs"//导入代码高亮插件的core（里面提供了其他官方插件及代码高亮样式主题，你只需要引入即可）
    import "prismjs/themes/prism-tomorrow.min.css" //引入代码高亮主题（这个去node_modules的安装prismjs中找到想使用的主题即可）
</script>
```

## 实战

参考我的 `LincZero/obsidian-node-flow` 项目的 `NFTextArea` 组件

