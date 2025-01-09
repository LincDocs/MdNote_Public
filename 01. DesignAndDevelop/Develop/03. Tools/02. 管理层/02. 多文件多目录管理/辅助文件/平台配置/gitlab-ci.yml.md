---
create_time: 2025-01-09
Author: LincZero
---
# .gitlab-ci.yml

文件名就是 `.gitlab-ci.yml`，用来控制 gitlab runner 执行工作流的

## demo

参考: https://github.com/LincZero/LincZero.github.io/blob/main/.gitlab-ci.yml

我记得以前任职的公司里，我写过很多。有前端、后端等好几个 gitlab.ci 文件

```yml
# 选择你要使用的 docker 镜像
image: node:18-buster

pages:
  # 每当 push 到 main 分支时触发部署
  only:
    - main

  # 缓存 node_modules
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store

  # 安装 pnpm
  before_script:
    - curl -fsSL https://get.pnpm.io/install.sh | sh -
    - pnpm config set store-dir .pnpm-store

  # 安装依赖并运行构建脚本
  script:
    - pnpm install --frozen-lockfile
    - pnpm docs:build --dest public

  artifacts:
    paths:
      - public
```



