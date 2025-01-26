---
create_time: 2025-01-09
Author: LincZero
---

# .npmrc

文件名就是 `.npmrc`，不是、也没有扩展名。rc表示 `running configuraiton`

## 用法-设置代理

例如设置 npm / pnpm 等的代理

```bash
# 设置全局代理，如果你不需要，可以注释掉该文件

# .npmrc 文件内容
# proxy=http://proxy.example.com:8080
# https-proxy=http://proxy.example.com:8080
registry=https://registry.npmmirror.com/

# 可使用以下命令验证:
# pnpm config get proxy
# pnpm config get https-proxy
# pnpm config get registry # 原 https://registry.npmjs.org/ 代理 https://registry.npmmirror.com/
```

使用这种方式可以避免全局生效，也不再需要使用 `--registry https://registry.npmmirror.com/` 这么麻烦，有的命令还无法用后者的方式

## 用法-其他

https://github.com/nolebase/integrations/blob/main/.npmrc

```
link-workspace-packages=true
```

不知道干嘛用的

更多详细用法后面需要使用/有空再去找文档
