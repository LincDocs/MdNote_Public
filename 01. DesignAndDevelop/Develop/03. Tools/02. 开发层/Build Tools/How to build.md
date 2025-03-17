---
create_time: 2025-03-16
Author: LincZero
---
# How to build

## 项目通用构建

大多数项目（无论什么语言/框架），编程项目的流程大体相同，都需要这几个步骤：

- 安装通用环境/依赖
- 下载/编写项目
- 安装项目专用环境/依赖
- 运行/编译项目
- (可选 可能还有一些调试等步骤，这里先忽略)

像python就是：

- 准备python、anoncada、venv等环境
- 下载/编写项目
- 安装依赖，如 `pip install -r ./requirements.txt`、`./.venv/Script/activate`
- 运行/编译项目，如 `python xxx.py`、`nb run --reload` (脚手架)

像JavaScript就是：

- 准备node.js、npm/pnpm/xpm等环境
- 下载/编写项目
- 安装依赖，如 `npm install`
- 运行/编译项目，如 `npm run build`

像CPP就是：

- 准备 `工具链`、`cmake`、`gdb`、`gcc/g++`、`cygwin/msys2` 等环境
- 下载/编写项目
- 安装依赖，如 `./vcpkg/vcpkg install`
- 运行/编译项目，如 `mkdir build && cd build && cmake .. && cmake --build .`

其他的像 Java、Rust、Go 等也同理

> [!tip]
> 其中，有一些方式是通用的，对于重复的这部分不再在上面赘述
> 
> - 对于安装环境。可选安装IDE、一些集成环境
> - 对于安装依赖。直接使用文件夹或通过 git/curl 下载，是通用方法
> - 对于编译项目。单纯运行按钮、使用工作流文件、或使用VSCode的Task，是通用的方法
> 
> 然后会发现，在这些环节中，每个环节其实都可以有不同的做法。比较灵活，并非一成不变

## 其他

更具体的，以及跟具体语言有关的，详见该文件夹下的其他文件

