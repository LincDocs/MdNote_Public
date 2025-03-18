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

## step3

略

## step4

分以下几种情况：

- 解释环境的运行：npm run dev
- 编译为静态资源: npm run build
- 编译为非解释环境可用的可执行文件

这里可以选择很多东西，Next还是CommondJS、构建打包器、ts转js

```json
"scripts": {
    // tsc。这个是在js打包构建之前运行，运行完了才到js的打包构建。对应 `tsconfig.json`
    "tsc:build": "tsc -noEmit -skipLibCheck && node esbuild.config.mjs production"
    
    // node esbuild，对应 `esbuild.config.mjs` 文件的配置
    "esbuild:dev": "node esbuild.config.mjs",

    // vite，vue项目比较常用这个，对应 `vite.config.js` 文件的配置
    // 其dev模式可以提供一个http服务
    "vite:dev1": "vite build --watch --mode=development",
    "vite:dev": "vite --config ./src/App/vite.config.js",
		"vite:build": "vite build --config ./src/App/vite.config.js"

    // webpack
    // 以前用这个，现在用得不多了，略
}
```

### 打包器、配置

略

### 可执行文件

其中重点说一下怎么打包为可执行文件:

参考: https://zhuanlan.zhihu.com/p/66411743

Pkg

Pkg可将 [Node.js](https://zhida.zhihu.com/search?content_id=102886924&content_type=Article&match_order=1&q=Node.js&zhida_source=entity) 项目打包为一个单独的可执行文件，可在未安装Nodejs的机器上运行。支持win、linux等多系统。





