# VuePress 升级、更新、依赖

## 代理问题

注意 `pnpm dlx vp-update` 命令与 `pnpm install ...` 命令不同：无法使用 `--registry` 选项：

```bash
> pnpm dlx vp-update --registry https://registry.npmmirror.com/                         
 WARN  GET https://registry.npmjs.org/semver error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
Packages: +3
+++
Progress: resolved 3, reused 3, downloaded 0, added 3, done
file:///C:/Users/76269/AppData/Local/pnpm-cache/dlx/taf3ilq7ai6qndt6j7t5qja34i/19443a7b85d-2998/node_modules/.pnpm/cac@6.7.14/node_modules/cac/dist/index.mjs:400
          throw new CACError(`Unknown option \`${name.length > 1 ? `--${name}` : `-${name}`}\``);
                ^

CACError: Unknown option `--registry`
```

代替方式是：

- 要么设置环境变量，全局生效
- 要么增加npm配置环境

这里我选择了后者：

[# .npmrc]

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

## 记录一个更新过程

（版本跨得有点远）

```bash
> pnpm dlx vp-update         
Packages: +3
+++
Progress: resolved 3, reused 3, downloaded 0, added 3, done
Bumping deps...
"@vuepress/utils"is deprecated, please remove it from your dependencies and import "vuepress/utils" from "vuepress" directly.
Install deps...

   ╭──────────────────────────────────────────────────────────────────╮
   │                                                                  │
   │                Update available! 9.12.2 → 9.15.3.                │
   │   Changelog: https://github.com/pnpm/pnpm/releases/tag/v9.15.3   │
   │                Run "pnpm self-update" to update.                 │
   │                                                                  │
   │         Follow @pnpmjs for updates: https://x.com/pnpmjs         │
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

Packages: +240 -32
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-------------------------
Progress: resolved 664, reused 418, downloaded 181, added 240, done
node_modules/.pnpm/esbuild@0.24.2/node_modules/esbuild: Running postinstall script, done in 485ms
node_modules/.pnpm/vue-demi@0.14.7_vue@3.5.13/node_modules/vue-demi: Running postinstall script, done in 325ms

devDependencies:
- @vuepress/bundler-vite 2.0.0-rc.8
+ @vuepress/bundler-vite 2.0.0-rc.19
- @vuepress/plugin-docsearch 2.0.0-rc.21
+ @vuepress/plugin-docsearch 2.0.0-rc.69
- @vuepress/utils 2.0.0-rc.2
+ @vuepress/utils 2.0.0-rc.19
- vue 3.4.21
+ vue 3.5.13
- vuepress 2.0.0-rc.8
+ vuepress 2.0.0-rc.19
- vuepress-theme-hope 2.0.0-rc.31
+ vuepress-theme-hope 2.0.0-rc.67

 WARN  Issues with peer dependencies found
.
├─┬ vuepress-theme-hope 2.0.0-rc.67
│ ├─┬ @vuepress/plugin-markdown-math 2.0.0-rc.69
│ │ └── ✕ unmet peer katex@^0.16.10: found 0.16.9
│ └─┬ vuepress-plugin-md-enhance 2.0.0-rc.67
│   └── ✕ unmet peer mermaid@^11.2.0: found 10.9.1
└─┬ @vuepress/helper 2.0.0-rc.19
  └── ✕ unmet peer vuepress@2.0.0-rc.8: found 2.0.0-rc.19

Done in 12.1s
Upgrading deps...
Packages: +82
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 654, reused 566, downloaded 23, added 82, done
node_modules/.pnpm/vue-demi@0.14.10_vue@3.5.13/node_modules/vue-demi: Running postinstall script, done in 277ms

dependencies:
- @vue-flow/background 1.3.0
+ @vue-flow/background 1.3.2
- @vue-flow/core 1.41.2
+ @vue-flow/core 1.41.7
- katex 0.16.9
+ katex 0.16.19
- mermaid 10.9.1
+ mermaid 10.9.3 (11.4.1 is available)

devDependencies:
- @vueuse/core 10.9.0
+ @vueuse/core 10.11.1 (12.3.0 is available)
- jsdom 24.1.1
+ jsdom 24.1.3 (25.0.1 is available)

 WARN  Issues with peer dependencies found
.
├─┬ vuepress-theme-hope 2.0.0-rc.67
│ └─┬ vuepress-plugin-md-enhance 2.0.0-rc.67
│   └── ✕ unmet peer mermaid@^11.2.0: found 10.9.3
└─┬ @vuepress/helper 2.0.0-rc.19
  └── ✕ unmet peer vuepress@2.0.0-rc.8: found 2.0.0-rc.19

Done in 6.3s
```
