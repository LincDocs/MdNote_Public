---
create_date: 2025-12-11
last_date: 2025-12-11
---
# micromark-extension-, mdast-util-

在 https://github.com/remarkjs/ 组织中的插件中，你经常能看到依赖中有以 `micromark-extension-` 和 `mdast-util-` 开头的依赖，且大部分的插件逻辑都集中在他们上面，插件仓库本体的内容则是较少

包括 remark-gfm、remark-directive、等等

## 以 remak-directive 为例

- [remarkjs/remark-directive](https://github.com/remarkjs/remark-directive/blob/main/package.json), star 361
  - [micromark/micromark-extension-directive](https://github.com/micromark/micromark-extension-directive), star 33
    提供 `:::` 语法的识别和解析
  - [syntax-tree/mdast-util-directive](https://github.com/syntax-tree/mdast-util-directive), star 18










