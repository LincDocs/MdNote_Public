# README

## 引言

先读：[../How to build](../How to build.md)

在那篇文章中，说了各种编程语言/框架项目的编译/运行流程。而其中cpp在编译流中工具的种类比较多、选择比较灵活。依然是之前的四个通用步骤

1. 安装通用环境/依赖
2. 下载/编写项目
3. 安装项目专用环境/依赖
4. 运行/编译项目

像JavaScript就是：

- 准备node.js、npm/pnpm/xpm等环境
- 下载/编写项目
- 安装依赖，如 `npm install`
- 运行/编译项目，如 `npm run build`

## step1 通用环境/依赖

- windows是去node官网安装node.js
- linux直接用命令安装 (如apt，但一般这样安装版本会很旧)
  - 重点：linux 更新和版本管理问题

## step2 下载/编写项目

略

## step3 项目环境/依赖

略

## step4 编译/运行

分以下几种情况：

- 解释环境的运行：npm run dev
- 编译为静态资源: npm run build
- 编译为非解释环境可用的可执行程序

这里可以选择很多东西，Next还是CommondJS、构建打包器、ts转js

```json
"scripts": {
    // ----------------- ts编译器 ------------------------
    
    // ts-node/tsc
    // 介绍: ts编译器
    // 对应依赖: `npm install -D ts-node`
    // 对应配置: `tsconfig.json`
    "ts:dev": "ts-node src/index.ts",
    "tsc:build": "tsc -noEmit -skipLibCheck && node esbuild.config.mjs production"
    
    // ----------------- 打包工具 -------------------------
    
    // node esbuild
    // 介绍: 打包工具    
    // 对应依赖: `npm install -D esbuild`
    // 对应配置: `esbuild.config.mjs`/`esbuild.config.ts`/`esbuild.js`
    "esbuild:dev": "node esbuild.config.mjs",

    // vite
    // 介绍: 打包工具，vue项目比较常用这个
    // 对应依赖: `npm install -D vite`
    // 对应配置: `vite.config.js`
    "vite:dev1": "vite build --watch --mode=development",
    "vite:dev": "vite --config ./src/App/vite.config.js",
		"vite:build": "vite build --config ./src/App/vite.config.js"

    // webpack
    // 介绍: 打包工具。以前用这个，现在用得不多了
    // 对应配置: `webpack.config.js`

    // ----------------- 可执行程序生成器 ------------------
    
    // pkg
    // 介绍: 可执行程序生成器。构建无需node.js依赖的可执行程序
    // 对应依赖: `npm install -D pkg`
    // 对应配置: package.json里的pkg字段
    "pkg:build": "pkg . --out-path build",
}
```

按功能分类：

- ts-node/tsc: ts编译器
- vite/esbulid/webpack: 打包器。可以包括编译器的功能，可以减少文件数量 (看情况，像插件一般减少为一，网络资源就根据只加载部分资源和cdn加速的情况来减少)，可以压缩文件大小，等
- pkg: 可执行程序生成器

### 打包器、配置

略

### 可执行文件

其中重点说一下怎么打包为可执行文件:

#### Pkg (要用分支版本)

参考: https://zhuanlan.zhihu.com/p/66411743

Pkg可将 [Node.js](https://zhida.zhihu.com/search?content_id=102886924&content_type=Article&match_order=1&q=Node.js&zhida_source=entity) 项目打包为一个单独的可执行文件，可在未安装Nodejs的机器上运行。支持win、linux等多系统。

注意：https://github.com/vercel/pkg 官方仓库已经存档弃用，官方说明如下：

> [!warning]
> 
> pkg has been deprecated with 5.8.1 as the last release. There are a number of successful forked versions of pkg already with various feature additions. Further, we’re excited about Node.js 21’s support for single executable applications. Thank you for the support and contributions over the years. The repository will remain open and archived.
> 
> PKG已在5.8.1版本中弃用。pkg已经有了许多成功的分支版本，并添加了各种功能。此外，我们对 **Node.js 21** 对单个可执行应用程序的支持感到兴奋。感谢您多年来的支持和贡献。存储库将保持打开状态并存档。

（话说我刚开始没留意到，直接用了。后面报错找不到 node20 相关的东西，然后去github搜，才发现不维护了）

所以现在有两种选择：

1. **使用已经被开发并且有新增功能的 fork 版本**：你可以选择一个已经成功 fork 并且添加了新功能的 pkg 版本。这些 fork 版本通常会继续维护，并且可能会有你需要的功能。
    - 这里我调研了一下，有个 [Vercel/pkg-fetch](https://github.com/vercel/pkg-fetch)
2. **升级到 Node.js 21**：Node.js 21 支持单一可执行文件应用程序，你可以考虑升级到 Node.js 21 并使用内置的功能来替代 pkg。

#### ESA (Node21新特性)

从21版本开始支持，但这里复习下：Node的版本和Linux一样，都遵循双数LTS，单数beta的原则。所以我这里用Node22

> 笔者写到这里的时候，2025-03-18，官方上显示的最新版本为：Node.js v22.14.0 LTS，beta v23.10.0

核心：**原生单可执行文件（SEA）功能**

- Node.js 21 开始原生支持**单可执行应用**（Single Executable Applications），无需第三方工具即可将项目打包为独立可执行文件。这是官方推荐的长期方案 `[citation:用户提供]`。
- 优势：
    - 原生支持，兼容性和稳定性更高。
    - 无需额外依赖，简化部署流程。
- 限制：
    - 目前功能可能不如 pkg 完善（如跨平台支持需进一步验证） `[citation:用户提供]`。

sea-config.json

```json
{
    "main": "dist/index.js",
    "output": "sea-prep.blob"
}
```

package.json

```json
{
  "type": "module",
  "scripts": {
    "build": "node --experimental-sea-config sea-config.json"
  }
}
```

然后注意，这样只能生成 `.blob` 文件，接下来要将该文件注入你电脑上的 `node.js` 可执行文件 (如windows上的node.exe)，才是一个真正的可执行文件

```bash
copy "C:\Program Files\nodejs\node.exe" .\hello.exe

npx postject hello NODE_SEA_BLOB sea-prep.blob \
  --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6
```

更多技术细节可参考：[Node.js SEA 文档](https://nodejs.org/api/single-executable-applications.html)、[Bun 官方文档](https://bun.sh/docs)。

### 可执行文件 - 比较

会发现 Pkg 和 ESA 不同

直接生成 `.exe` 文件的工具（比如 `pkg`）和 Node.js 22 的 **SEA（Single Executable Applications）** 确实是两种不同的实现方式，它们的底层原理和步骤有所不同。

#### pkg

`pkg` 工具的原理

`pkg`（如 [vercel/pkg](https://github.com/vercel/pkg)）是第三方工具，它的核心逻辑是：

- 将你的 JavaScript 代码和 Node.js 运行时**预先打包**成一个独立的可执行文件。
- 通过“虚拟文件系统”在运行时动态加载代码（无需手动注入 `blob`）。
- 直接生成 `.exe`/二进制文件，用户无需额外操作。

```
# 安装 pkg
npm install -g pkg

# 直接生成 exe 文件
pkg hello.js --targets node22-win-x64 --output hello.exe
```

- 优点：简单直接，无需手动操作 Node.js 可执行文件。
- 缺点：依赖第三方工具，生成的文件体积较大（因为内置了完整的 Node.js 运行时）。

#### SEA

Node.js 22 的 SEA 特性

SEA 是 Node.js 官方实验性功能，它的逻辑是：

- 将你的代码编译成一个二进制 blob 文件
- 将这个 blob 注入到已有的 Node.js 可执行文件中（需要依赖宿主机的 Node.js 文件）
- 生成的可执行文件是原版 Node.js 的修改版（附加了你的代码）

为什么需要“注入”？

- SEA 的设计目标是轻量化，它复用宿主机的 Node.js 可执行文件，而不是重新打包一个完整的运行时
- 因此你需要手动复制 Node.js 的 node.exe，并将 blob 注入其中（类似“寄生”模式）

#### 两者的关键区别
| 特性   | `pkg`         | Node.js SEA            |
| ---- | ------------- | ---------------------- |
| 实现方式 | 第三方工具（Vercel） | Node.js 官方实验性功能        |
| 打包方式 | 完整运行时 + 代码    | 复用宿主机的 Node.exe + 代码注入 |
| 生成文件 | 直接生成 `.exe`   | 需手动注入生成 `.exe`         |
| 文件体积 | 较大（含完整运行时）    | 较小（复用已有 Node.exe）      |
| 跨平台  | **支持**        | 需手动复制不同平台的 Node.exe    |
| 代码保护 | 可加密/混淆        | 依赖注入机制（较透明）            |

## all_Workflows

Github 默认给你推荐的相关工作流有：

- Grunt | 用npm和grunt构建一个NodeJS项目
- Gulp | 用npm和gulp构建一个NodeJS项目
- Webpack | 用npm和webpack构建一个NodeJS项目
- Deno | 测试你的Deno项目
- Publish Node.js Package to Github Packages | 将Node.js包发布到GitHub Packages
- Publish Node.js Package | 将Node.js包发布到npm
- ... | (话说居然没搜到用vite和esbuild的)

deepseek给的工作流:

```yml
name: Build and Test

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
      
    - name: Build with tsc
      run: npm run tsc:build
      
    - name: Build with esbuild
      run: npm run esbuild:build
      
    - name: Build with Vite
      run: npm run vite:build
      
    - name: Build executable
      run: |
        npm run tsc:build
        npm run pkg:build
```

## all_Docker

略



