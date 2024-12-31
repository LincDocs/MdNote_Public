# VSCode编辑技巧

由于是类Lisp的语言，我们可以这样：

1. 在VSCode中安装扩展Lisp
2. Ctrl+Shift+P，setting.json -> 选择用户配置 (不要选默认(只读)和工作区那个)，并加入：

```json
"files.associations": {
    "*.kbd": "lisp",
    "*.ahk": "lisp"
},
```

这可以给 AutoHotKey (.ahk) 和 Kanata (.kbd) 的代码文件着色，使用lisp的代码着色规则去着色 `.kbd` 和 `.ahk` 扩展名的的文件
