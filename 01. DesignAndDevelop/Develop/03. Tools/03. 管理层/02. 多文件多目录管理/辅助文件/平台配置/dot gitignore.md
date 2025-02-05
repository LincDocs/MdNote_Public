---
create_time: 2025-01-09
Author: LincZero
---
# .gitignore

文件名就是 `.gitignore`，不是、也没有扩展名

## 主功能与教程

功能略，自己去搜

## 技巧 - 反向选择

直得一提的技巧是反向选择，举例我vuepress项目的规则：

```
node_modules/

src/*
!src/.vuepress/
src/.vuepress/.cache/
src/.vuepress/.temp/
src/.vuepress/dist/
src/.vuepress/public/docs/

tmp_docs/
```

## 常见排除项

```
d
```

## 常见的不应排除的项

```
.vscode
```


