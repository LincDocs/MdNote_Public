---
create_time: 2025-06-17
Author: LincZero
---
# Vuepress vs Vitepress (API)

其他比较直接搜，有很多，这里重点讲开发上/api的区别

## `pages[i]`

这个是为了方便开发把所有文档内容塞进去的对象。vuepress中的这个对象其包含了所有文档的原文本、解析html后的文本。

因此方便于某些插件之余，这个对象非常大非常臃肿。会导致编译体积激增。

vitepress好像不会这样塞，线性跑一遍不缓存文本内容和解析html，要简单很多

## 路径

参考: https://theme-hope.vuejs.press/zh/guide/component/sfc.html

一般在开发过程中，vitepress路径很多可以直接用相对/绝对路径。但vuepress不行，原因和区别如下

### 导入文件 - 别名

> [!important] 
> 通过别名导入
> 
> 由于 Markdown 文件会被转换为 Vue 单文件组件并缓存到 `.vuepress/.temp/pages` 目录中，所以相对导入在 Markdown 文件中是无效的。你应该使用别名。

### `@source` 别名

你可以使用 `@source` 别名来引用当前项目的源目录
    
```sh
.
├── src → project folder
│    ├── example
│    │    ├── ...
│    │    └── MyComponent.vue
│    ├── ...
│    └── README.md
└── ...
```

Markdown 文件

```md
<MyComponent />

<script setup>
import MyComponent from "@source/example/MyComponent.vue";
</script>
```

### 创建别名

你也可以使用 `alias` 选项来创建别名:
    
```sh
.
├── src → project folder
│    ├── .vuepress
│    │    ├── components
│    │    │    └── MyComponent.vue
│    │    ├── ...
│    │    └── config.ts
│    ├── ...
│    └── README.md
└── ...
```

.vuepress/config.ts
```ts
import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  alias: {
    "@MyComponent": path.resolve(__dirname, "components/MyComponent.vue"),
  },
});
```

README.md
```md
<MyComponent />

<script setup>
import MyComponent from "@MyComponent";
</script>
```

