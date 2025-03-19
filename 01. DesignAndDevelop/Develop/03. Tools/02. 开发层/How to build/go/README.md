# README

## 引言

先读：[../How to build](../How to build.md)

在那篇文章中，说了各种编程语言/框架项目的编译/运行流程。而其中cpp在编译流中工具的种类比较多、选择比较灵活。依然是之前的四个通用步骤

1. 安装通用环境/依赖
2. 下载/编写项目
3. 安装项目专用环境/依赖
4. 运行/编译项目

像go就是 (话说go在这一整个流程中，相当简洁，基本只要一个go.exe)

1. 准备go.exe
2. 下载/编写项目
3. 安装依赖
4. 运行, `go run main.go` 或 `go build -o ./bin/demo<.exe>`

## 生成可执行程序的三种方法

参考： [Golang编译生成可执行程序的三种方法](https://blog.csdn.net/liuzehn/article/details/133617437)

### 方法一，自带的 main.go

熟悉Golang语言的小伙伴一定都知道，每个Golang工程中都有一个main.go文件，这是一个入口文件，所以一般都使用如下命令编译可执行程序：

```bash
go build main.go
```

### 方法二，go.mod

接下来，我们看第二种方法，也是最简单的方法，命令如下：

```bash
go build
```

但是这个命令需要和go.mod文件配合使用，最终生成可执行文件的名字就是其中module的名称

### 方法三，指定可执行文件的名字

除了上面的两种方法，其实，我们还可以指定可执行文件的名字，具体命令如下：

```bash
go build -o test.exe
```

这样生成的可执行文件的名字就是test.exe。

## step1，通用环境/依赖

到官网下载就好: https://go.dev/

和Java一样，需要一个 SDK (Software Development Kit)

```bash
go version # 不要加 `--`，这也符合go的语法糖理念
go version go1.24.1 windows/amd64 # 2025-03-19，对应版本go 1.24.1
```

## step2，项目下载/编写

这里以一个简单的http服务为例

> [!note]
> **go.exe 非常强大**
> 
> - 能创建文件模板
> - 自带了许多库，尤其网络库
> - 能处理包管理
> - 能运行程序、能生成可执行文件
> 
> 比js那边还简洁，那边要弄这些功能分别是用不同的工具: 脚手架、npm、其他工具等

shell

```bash
mkdir go-http-demo
cd go-http-demo
go mod init example.com/demo # 模块定义文件

go env -w GOPROXY=https://goproxy.cn,direct # (可选) 解决国内网络问题
go get github.com/sirupsen/logrus # 依赖
go mod tidy # 自动同步依赖关系
```

main.go

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/sirupsen/logrus"
)

func main() {
    fmt.Println("test")
    
    log := logrus.New()
    log.Info("Starting server...")
    
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        log.WithField("path", r.URL.Path).Info("Request received")
        w.Write([]byte("Hello, World with Logging!"))
    })

    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## step3，项目环境/依赖

首次运行会自动下载依赖

国内用户可设置代理：`go env -w GOPROXY=https://goproxy.cn,direct`

常用命令:

```bash
go mod init example.com/demo           # 初始化依赖文件
go get github.com/gin-gonic/gin@v1.7.4 # 添加依赖
go get -u github.com/gin-gonic/gin     # 更新依赖
go mod download                        # 下载依赖
    # (注意，不会像js那样下载到项目的node_module文件夹中，而是下载到本地 `$HOME/go/pkg/mod`)
go mod tidy                            # 整理依赖
```

## step4，项目编译/运行

```bash
go run main.go # 运行

go build -o ./bin/demo.exe # 生成可执行文件 (windows加exe扩展名, linux不加)
go build -o ./bin/demo     # 生成可执行文件 (windows加exe扩展名, linux不加)
```

[dir]

- go.mod  | 模块配置文件，定义模块的基本信息和依赖关系。包含: 模块路径、Go版本、依赖模块
  (类似js的 `package.json`)
  *每个go文件必须有归属的包*
- go.sum  | 依赖模块的校验和信息，确保模块版本和内容一致性和安全性。
  每次 `go mod tidy` 和 `go mod download` 时都会更新
  (类似 `package-lock.json`、`pnpm-lock.yaml` 文件)
- main.go | 入口主程序

## all_Workflows

先来看 github 官方为 go 推荐了什么工作流：

- SLSA Go releaser | 使用兼容SLSA3的构建器编译Go项目
- Go | 构建一个Go项目

slsa go releaser

```yml
# 此工作流使用的操作未经过GitHub认证。
# 它们由第三方提供，并受单独的服务条款、隐私政策和支持文档的约束。

# This workflow lets you compile your Go project using a SLSA3 compliant builder.
# This workflow will generate a so-called "provenance" file describing the steps
# that were performed to generate the final binary.
# The project is an initiative of the OpenSSF (openssf.org) and is developed at
# https://github.com/slsa-framework/slsa-github-generator.
# The provenance file can be verified using https://github.com/slsa-framework/slsa-verifier.
# For more information about SLSA and how it improves the supply-chain, visit slsa.dev.

name: SLSA Go releaser
on:
  workflow_dispatch:
  release:
    types: [created]

permissions: read-all

jobs:
  # ==============================================
  #  先决条件：创建.slsa-gorelease。项目根目录下的Yml文件。
  #  See format in https://github.com/slsa-framework/slsa-github-generator/blob/main/internal/builders/go/README.md#configuration-file
  #===============================================
  build:
    permissions:
      id-token: write # To sign.
      contents: write # To upload release assets.
      actions: read   # To read workflow path.
    uses: slsa-framework/slsa-github-generator/.github/workflows/builder_go_slsa3.yml@v1.4.0
    with:
      go-version: 1.17
      # ===========================================
      #     Optional: For more options, see https://github.com/slsa-framework/slsa-github-generator#golang-projects
      # ===========================================
```

deepseek给我的: 矩阵版本，自己手动改了点

```yml
name: Cross-Platform Build

on:
  workflow_dispatch:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        include:
          - os: ubuntu-latest
            goos: linux
            suffix: ""
          - os: windows-latest
            goos: windows
            suffix: ".exe"
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Go
      uses: actions/setup-go@v4
      with:
        go-version: '1.21'
    
    - name: Build
      env:
        GOOS: ${{ matrix.goos }}
        GOARCH: amd64
      run: |
        mkdir -p bin
        go build -o bin/demo-${{ matrix.goos }}-amd64${{ matrix.suffix }} main.go
    
    - name: Upload Artifacts
      uses: actions/upload-artifact@v4
      with:
        name: binaries-${{ matrix.os }}
        path: bin/
```

## all_Docker

略








