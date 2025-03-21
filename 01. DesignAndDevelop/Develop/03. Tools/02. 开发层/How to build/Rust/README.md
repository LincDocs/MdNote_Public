# Build

## 引言

先读：[../How to build](../How to build.md)

在那篇文章中，说了各种编程语言/框架项目的编译/运行流程。而其中cpp在编译流中工具的种类比较多、选择比较灵活。依然是之前的四个通用步骤

1. 安装通用环境/依赖
2. 项目下载/编写
3. 安装项目环境/依赖
4. 运行/编译项目

像rust就是：

1. 通过 rustup 安装 rustc (编译器) 和 cargo (包管理和构建系统)，以及安装其他环境和工具链等
   (相较 cpp 这里有原生的包管理、构建系统、管理依赖项、运行测试、生成文档、脚手架等，还挺好)
2. 项目下载/编写。编写的话可以借助 `cargo new <project-name>` 快速创建项目
3. 不需要，和go类似的，构建项目的时候会自动安装依赖
4. 编译 `cargo build`，运行 `cargo run`

## step1 通用环境/依赖

到官网 https://www.rust-lang.org/ 下载，按官方 [安装须知](https://www.rust-lang.org/zh-CN/tools/install) 的指引下载，**并配置环境变量**

以windows为例，得到一个12MB的 `rustup-init.exe` (安装器+管理器，有点类似于c++的cygwin或msys2)

> [!quote]
> Rust 由工具 rustup 安装和管理。Rust 有着以 6 星期为周期的 快速版本迭代机制，支持 大量平台，因而不同时期存在大量不同的 Rust 构建版本。 rustup 用于管理不同平台下的 Rust 构建版本并使其互相兼容， 支持安装由 Beta 和 Nightly 频道发布的版本，并支持其他用于交叉编译的编译版本。 

双击进入安装界面 (命令式安装)

```bash
# 1 安装方式
Current installation options:

   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) 继续进行标准安装（默认-只需按enter键）
2) 自定义安装
3) 取消安装
2

# 2 主机名
I am going to ask you the value of each of these installation options.
You may simply press the Enter key to leave unchanged.

Default host triple? [x86_64-pc-windows-msvc]

# 3 工具链
Default toolchain? (stable/beta/nightly/none) [stable]
# 4 配置文件
Profile (which tools and data to install)? (minimal/default/complete) [default]
# 5 修改环境变量
Modify PATH variable? (Y/n)

# 6 重复确认
Current installation options:

   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable
               profile: default
  modify PATH variable: yes

1) Proceed with selected options (default - just press enter)
2) Customize installation
3) Cancel installation
Enter
```

补充 - 镜像

```bash
# 默认的这两个网站均在中国大陆境外，因此在中国大陆访问会很慢，需要配置成境内的镜像:
# 设置方法:
# 在 PowerShell 或 CMD 中设置临时环境变量
$env:RUSTUP_DIST_SERVER = "https://rsproxy.cn"
$env:RUSTUP_UPDATE_ROOT = "https://rsproxy.cn/rustup"

# 备用
RUSTUP_DIST_SERVER=https://static.rust-lang.org                   # 默认
RUSTUP_UPDATE_ROOT=https://static.rust-lang.org/rustup            # 默认
RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static        # 中国科学技术大学 (推荐)
RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup # 中国科学技术大学
RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup    # 清华大学
RUSTUP_DIST_SERVER=https://mirrors.sjtug.sjtu.edu.cn/rust-static/ # 上海交通大学
```

补充 - 验证

```bash
# 验证
$ rustc -V
rustc 1.85.1 (4eb161250 2025-03-15)
$ cargo -V
cargo 1.85.1 (d73d2caf9 2024-12-31)
```

## step2 项目下载/编写

shell

```bash
cargo new rust-http-demo
cd rust-http-demo
```

cargo.toml

```toml
[package]
name = "rust-http-demo"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4.4"  # 使用 actix-web 作为 web 框架
tokio = { version = "1.0", features = ["macros", "rt-multi-thread"] }  # 异步运行时
```

src/main.rs

```rust
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust HTTP Server!")
}

#[get("/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok().body("OK")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(health_check)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
```

## step3 项目环境/依赖

不需要，和go类似的，构建/运行项目的时候会自动安装依赖

```shell
cargo build # 编译
cargo run   # 运行
```

## step4 项目运行/编译

:::note
主要是两个工具：

- `rustc` 编译器
  类似cpp的gcc/g++，`rustc <source-file>`，如 `rustc main.rs`，它会生成一个与源文件同名的可执行文件。但一般不用这个，而是用cargo
- `cargo` 包管理器和构建系统
  它不仅负责构建项目，还可以管理依赖项、运行测试、生成文档等。常用命令:
  ```bash
  cargo new <project-name>   # 创建一个新的 Rust 项目。
  cargo build                # 构建项目。
  cargo run                  # 构建并运行项目。
  cargo test                 # 运行测试。
  cargo doc                  # 生成文档。
  cargo install <crate-name> # 安装一个 Rust 包（crate）。
  ```
:::

```bash
cargo build # 编译
cargo run   # 运行
```

### 添加多平台构建支持

```shell
cargo build --target x86_64-unknown-linux-gnu --release # Linux
cargo build --target x86_64-pc-windows-msvc --release   # Windows
cargo build --target x86_64-apple-darwin --release      # macOS
```

或使用cross来构建

```shell
cargo install cross

rustup target add x86_64-pc-windows-msvc
rustup target add x86_64-unknown-linux-gnu
rustup target add x86_64-apple-darwin

cross build --target x86_64-unknown-linux-musl --release
cross build --target x86_64-pc-windows-msvc --release
```

### 产物路径

其中构建产物值得一提，确保重新编译时，往往删掉可执行文件再编译会很快。但如果整个target文件夹删掉，再编译会非常慢。因为这个有点相当于是构建版依赖文件，类似 js package.json，但是依赖的文件经过了本地的构建。

即第一次构建时，会下载依赖+构建为本地适用的版本，然后构建产物。重新构建时并不需要去删除依赖

windows

[dir]

- target/
  - debug/                  | 核心
    - .fingerprint/
    - build/                | 核心
    - deps/                 | 核心
    - examples/
    - incremental/
    - .cargo-lock
    - `<ProjectName>.pdb`
    - `<ProjectName>.d`
    - `<ProjectName>.exe`
  - release/                | 核心
    - (同上)
  - x86_64-pc-windows-msvc/ | 这个是交叉编译相关的，`--target <目标平台的固定字符串>`
    - release/
    - CACHEDIR.TAG
  - .rustc_info.json
  - CACEDIR.TAR

## all_workflows

### 简单工作流

先来看 Github 为 Rust 项目推荐的工作流：

- Rust | 用Cargo构建并测试一个Rust项目

默认的workflow非常简单优雅 (似乎是 GitHub 托管的一些运行器已预装了 Rust 工具链，不一定会有)

```yml
name: Rust

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

env:
  CARGO_TERM_COLOR: always

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Build
      run: cargo build --verbose
    - name: Run tests
      run: cargo test --verbose
```

或者可以参考其他非官方工作流：

https://github.com/rust-build/rust-build.action 这里用到了 `rust-build/rust-build.action@v1.4.5`，比较封装

```yml
# .github/workflows/release.yml

on:
  release:
    types: [created]

jobs:
  release:
    name: release ${{ matrix.target }}
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        include:
          - target: x86_64-pc-windows-gnu
            archive: zip
          - target: x86_64-unknown-linux-musl
            archive: tar.gz tar.xz tar.zst
          - target: x86_64-apple-darwin
            archive: zip
    steps:
      - uses: actions/checkout@master
      - name: Compile and release
        uses: rust-build/rust-build.action@v1.4.5
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          RUSTTARGET: ${{ matrix.target }}
          ARCHIVE_TYPES: ${{ matrix.archive }}
```

### 交叉编译

现在我们加入多平台构建可执行文件

```yml
# 根据情况修改 branches name、BIN_NAME (toml对应的应用名)

name: Native Multi-Platform Build

on:
  push:
    # tags: ["v*"]  # 在打版本标签时触发构建
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

env:
  CARGO_TERM_COLOR: always

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false # 一个失败不影响其他的矩阵运行
      matrix:
        include:
          # Linux 平台
          - os: ubuntu-22.04
            target: x86_64-unknown-linux-gnu       # 原生 x86_64
            toolchain: []
          - os: ubuntu-22.04
            target: x86_64-unknown-linux-musl      # 静态链接
            toolchain: "musl-tools"
          # - os: ubuntu-22.04
          #   target: aarch64-unknown-linux-gnu      # ARM64 (交叉编译)
          #   toolchain: "gcc-aarch64-linux-gnu"
          # Windows 平台
          - os: windows-latest
            target: x86_64-pc-windows-msvc         # 原生 x64
            toolchain: []
          - os: windows-latest
            target: aarch64-pc-windows-msvc        # ARM64 (交叉编译)
            toolchain: []                          # "clang"
          # macOS 平台
          - os: macos-latest
            target: x86_64-apple-darwin            # Intel 兼容模式
            toolchain: []
          - os: macos-latest
            target: aarch64-apple-darwin           # 原生 Apple Silicon
            toolchain: []

    steps:
      - name: 01. code checkout
        uses: actions/checkout@v4

      # 配置 Rust 环境
      - name: 02. Setup Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          targets: ${{ matrix.target }}
          components: rust-std

      # 交叉编译工具修复
      - name: 02. Install Cross-compiler Toolchain
        if: matrix.os == 'ubuntu-22.04'
        run: |
          # 按需安装 musl 工具链
          if [[ "${{ matrix.target }}" == *"musl"* ]]; then
            echo "安装 musl 工具链..."
            sudo apt-get update
            sudo apt-get install -y musl-tools
            rustup target add x86_64-unknown-linux-musl
          fi
          # 按需安装 ARM64 交叉编译工具链
          if [[ "${{ matrix.target }}" == *"aarch64"* ]]; then
            echo "安装 ARM64 交叉编译工具链..."
            sudo apt-get update
            sudo apt-get install -y gcc-aarch64-linux-gnu
            rustup target add aarch64-unknown-linux-gnu
          fi

      # 安装平台专用工具链 (github有些系统会内置rust，而且这东西安装很慢，如果有内置那就不装)
      # - name: 02. Install Toolchain
      #   if: matrix.toolchain != ''
      #   run: |
      #     case "${{ runner.os }}" in
      #       Linux)
      #         sudo apt-get update
      #         sudo apt-get install -y ${{ matrix.toolchain }}
      #         ;;
      #       Windows)
      #         choco install ${{ matrix.toolchain }}  # 示例：通过 Chocolatey 安装
      #         ;;
      #     esac

      # 解决 macOS 常见问题
      - name: Fix macOS SDK (Apple Silicon), Setup Xcode (Apple Silicon)
        if: matrix.os == 'macos-latest' && matrix.target == 'aarch64-apple-darwin'
        run: |
          sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
          sudo xcodebuild -license accept

      # 执行编译
      - name: 04. Build Release
        run: |
          cargo build --release --target ${{ matrix.target }}
          ls

      # 智能处理产物名称，只保留可执行文件
      - name: Package Artifacts
        shell: bash
        run: |
          BIN_NAME=rust-http-demo # [!code] 这里要写入你toml里写的app名
          OUTPUT_DIR=release      # [!code]
      
          mkdir -p $OUTPUT_DIR
          case "${{ matrix.target }}" in
            *windows*)
              cp target/${{ matrix.target }}/release/$BIN_NAME.exe $OUTPUT_DIR/${BIN_NAME}-${{ matrix.target }}.exe
              ;;
            *)
              cp target/${{ matrix.target }}/release/$BIN_NAME $OUTPUT_DIR/${BIN_NAME}-${{ matrix.target }}
              ;;
          esac

      - uses: actions/upload-artifact@v4
        with:
          name: binaries-${{ matrix.os }}-${{ matrix.target }}
          path: release/
```

## all_Docker

file

```dockerfile
# 构建阶段
FROM rust:1.70 as builder

WORKDIR /app
COPY . .

RUN cargo build --release

# 运行阶段
FROM debian:bullseye-slim

COPY --from=builder /app/target/release/rust-http-demo /usr/local/bin/

EXPOSE 8080
CMD ["rust-http-demo"]
```

shell

```bash
docker build -t rust-http-demo .
```

## ll

```
macos
build时：
Error: The operation was canceled.

ubuntu 2204 aarch
build时:
warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "aarch64-linux-musl-gcc": No such file or directory (os error 2)
warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "aarch64-linux-musl-gcc": No such file or directory (os error 2)
warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "aarch64-linux-musl-gcc": No such file or directory (os error 2)
warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "aarch64-linux-musl-gcc": No such file or directory (os error 2)
error: failed to run custom build command for `zstd-sys v2.0.15+zstd.1.5.7`
...
error occurred in cc-rs: failed to find tool "aarch64-linux-musl-gcc": No such file or directory (os error 2)


warning: build failed, waiting for other jobs to finish...
Error: Process completed with exit code 101.

ubuntu 2204 x64
build时:
warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "musl-gcc": No such file or directory (os error 2)

warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "musl-gcc": No such file or directory (os error 2)

warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "musl-gcc": No such file or directory (os error 2)

warning: zstd-sys@2.0.15+zstd.1.5.7: Compiler family detection failed due to error: ToolNotFound: failed to find tool "musl-gcc": No such file or directory (os error 2)

error: failed to run custom build command for `zstd-sys v2.0.15+zstd.1.5.7`

error occurred in cc-rs: failed to find tool "musl-gcc": No such file or directory (os error 2)

warning: build failed, waiting for other jobs to finish...

Error: The operation was canceled.
```