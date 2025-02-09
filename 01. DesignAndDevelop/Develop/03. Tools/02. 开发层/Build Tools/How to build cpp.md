---
create_time: 2025-02-05
Author: LincZero
---
# How to build cpp

## 环境准备大概流程

首先要说明的是，各种IDE以及操作系统环境下，环境准备流程略有不同。

一个首先的建议是，去各种IDE官网上去寻找他们的配置教程页，如 CLion、VS、VSCode 等都有。

针对于各种具体IDE的配置方式放在下一章节中，本章节仅大概讲述他们的共同特征，共同的大致流程，以让大家了解其依赖和配置的本质。
（尤其是Linux的纯命令行方式、VSCode、Github/Gitlab Workflows的方式，都比较接近于底层。）

### (1) IDE软件

下载你需要使用的IDE软件 (如 `CLion`、`VS`、`VSCode` 等)

### (2) 安装编译工具

**安装技巧**

- 有些IDE软件 (如VS等)，在下载的时候可以可选编译工具。如果有可以跳过这一步。
- 有些IDE软件 (如CLion等)，你添加工具链时，旁边会有个“下载”按钮，也能告诉你要在什么地方下载。也能简化这一步的流程。
- 有些IDE软件 (如VSCode)，软件本体不捆绑太多的东西，很多环境都需要手动安装。

**安装编译工具**

- 主要需要的工具有：
  - `GUN/linux`、[`MinGW-W64`](https://jb.gg/clion-mingw)、[`VisualStudio`](https://visualstudio.microsoft.com/zh-hans/vs/) (通常是编译必须的一些环境，包括标准和扩展包等。windows用后两者)
  - gcc/g++ (满足编译单c/c++文件或简单的多文件需求)
  - gbd (推荐选, 如果你还需要调试、断点追踪等功能)
  - cmake (推荐选, 如果你需要一些 `CMakeList.txt` 或 `Makefile` 等处理项目间依赖的东西时)
  - vcpkg (推荐选, 包管理和依赖工具，也能配合cmake使用)
- 安装助手、一些集成环境
  - msys2和cygwin可以**帮忙安装的是构建工具**，也基本都能安装: cmake、ninja、gcc、g++、gdb。或msyc直接安装的 `MinGW工具链` 这种会同时包括 gcc/g++/gdb，也能提高工具准备的效率
  - vcpkg可以**帮忙安装的是第三方库/包依赖**

**安装方式**

- Linux和Windows的有所不同。这里以 Winodws VScode 安装 MinGW 为例
- Winodws现代会推荐使用 [`msys2`](https://www.msys2.org/) 来安装 `MinGW`，以前会使用 `Cygwin` 或其他 (虽然 cygwin 有个界面)
  这两用起来逻辑大差不差
  msys2 它提供了 GCC、MinGW-w64 以及其他有用的 C++ 工具和库的最新原生版本
- 具体安装方法见Vscode官方说明：[使用 MinGW 的 GCC](https://vscode.js.cn/docs/cpp/config-mingw)

### (3) 环境变量与检查环境

用以下命令分别检查 gcc (或clang) 是否安装和配置到位：

```bash
gcc --version
g++ --version
gdb --version

cmake --version
ninja --version
```

如果没有插件到，可以看看是不是没有添加到环境变量

## 使用各种软件编译

### CLion in Windows

可参考CLion官方的说明：[教程：在Windows上配置CLION](https://www.jetbrains.com/help/clion/quick-tutorial-on-configuring-clion-on-windows.html)
这里介绍了CLion分别使用 `Windows MinGW`、`cygwin`、`WSL`、`系统工具链`、`Windows上的Clang/GDB` 的情况

如果你未曾使用CLion编译C++项目，那么你可能需要配置工具链。

#### 自带

一般安装CLion他会捆绑一个C++环境给你，而这个他自己的C++环境通常可以被CLion自己所检测到，不需要额外处理。

参考：

- 工具集: MinGW, w64 9.0
- CMake: 3.24.2
- 构建工具: ninja.exe
- C编译器: gcc.exe
- C++编译器: g++.exe
- 捆绑的GDB: v12.1

#### 自带 - 手动配置

需要注意一点是，当CLion使用软件自身捆绑的环境变量时，他不给出具体路径。这里我尝试分析其部分的真实路径：（版本号检测出来和默认不给出路径的一样，应该是对的。`win` 可能可以替代成 `cygwin`）

- 工具集: `G:\<CLion安装路径>\bin\mingw\`
- CMake: `G:\<CLion安装路径>\bin\cmake\win\x64\bin\cmake.exe`
- 构建工具: `G:\<CLion安装路径>\bin\ninja\win\x64\ninja.exe`
- C编译器: `G:\<CLion安装路径>\bin\mingw\bin\gcc.exe`
- C++编译器: `G:\<CLion安装路径>\bin\mingw\bin\g++.exe`
- 捆绑的GDB: `G:\<CLion安装路径>\bin\gdb\win\x64\bin\gdb.exe`

这里之所以要讲这个，一是为了方便给其他IDE复用这一部分环境，二是为了方便得知如何使用其他IDE或使用其他环境进行配置。

实际命令：

```bash
G:\<CLion安装路径>\bin\cmake\win\x64\bin\cmake.exe --build H:\<项目所在路径>\cmake-build-debug --target <项目名> -j 12
```

#### 其他

其他大部分的环境类型，详见官网介绍，前面有链接

如果要使用vcpkg，见：[CLion - Vcpkg integration](https://www.jetbrains.com/help/clion/package-management.html) (需要新版本CLion，23版本以上)

#### Msys2

不过官网并没有提到使用msys2的情况，这个也是可以的，这里进行补充：

见：https://youtrack.jetbrains.com/issue/CPP-22392

(注意这里我使用了 `ucrt64` 代替 `mingw64`，其与 Windows 10及以上的系统更兼容)

- 工具集: `G:\<Msys2安装路径>\ucrt64`
- CMake: Bundled
- 构建工具: Bundled
- C编译器: `G:\<s2M 安装路径>\ucrt64\bin\gcc.exe`
- C++编译器: `G:\<s2M 安装路径>\ucrt64\bin\g++.exe`
- 捆绑的GDB: `G:\<s2M 安装路径>\ucrt64\bin\gdb.exe`

### CLion in Linux

可参考CLion官方的说明：[教程：在Windows上配置CLION](https://www.jetbrains.com/help/clion/quick-tutorial-on-configuring-clion-on-windows.html)

或使用 WSL 也行

### VSCode in Windows

可参考vscode官方说明：

- [Visual Studio Code 的 C/C++](https://vscode.js.cn/docs/languages/cpp)、[C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp)
  (两个链接一样的，分别是中文和英文域名)
  - [使用 MinGW 的 GCC](https://vscode.js.cn/docs/cpp/config-mingw#_prerequisites)
  - [教程：在 Visual Studio Code 中通过 CMake 安装和使用包](https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started-vscode?pivots=shell-powershell)

#### 只需gcc和gdb环境

(1) 安装VSCode。VSCode安装插件，`C/C++` 以及 `C/C++ Extension Pack`。用于着色、补全、悬停、错误检查等

(2) 安装Msys2，然后在其终端运行以下命令安装 `MinGW-w64工具链`

(注意 `mingw-w64-ucrt-x86_64-toolchain` 默认包含了 `GCC/G++/GDB` 等，具体的包含项你在下载过程中是可选的)

不确定包名可以去官网查： https://packages.msys2.org/

```bash
# 这里下载都是基于同一来源，这样稳定些 (你也可以都使用CLion捆绑的，或cygwin下载的)

pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
# Enter, Y
# (path `C:\msys64\ucrt64\bin`)


pacman -S mingw-w64-ucrt-x86_64-cmake # 可选
# pacman -S cmake
# 添加环境变量。如果您选择了默认安装步骤，则路径为：`C:\msys64\mingw64\。。。`。

pacman -S mingw-w64-ucrt-x86_64-ninja
# (path `C:\msys64\ucrt64\bin`)
# pacman -S mingw-w64-x86_64-ninja
# (path `C:\msys64\mingw64\bin`)

# 添加环境变量。如果您选择了默认安装步骤，则路径为：`C:\msys64\ucrt64\bin`
```

(3) 检查环境。在**新**的命令提示符中输入：

```bash
gcc --version
g++ --version
gdb --version

cmake --version
ninja --version
```

(4) demo程序

```bash
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

输入

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World" << std::endl;
}
```

(5) 运行

在VSCode cpp文件标签页标签的右侧应该安看到一个运行按钮

- 点下拉框：`Run C/C++ File` / `Debug C/C++ File`，选 `Run`
- 然后选择工具链：`clang-cl.exe` / `clang-cpp.exe` / `g++.exe` / `cpp.exe` 等，选 `g++.exe`
- 然后应该就能看到结果了

实际命令还挺长的

```bash
> & 'c:\Users\<用户名>\.vscode\extensions\ms-vscode.cpptools-1.23.5-win32-x64\debugAdapters\bin\WindowsDebugLauncher.exe' '--stdin=Microsoft-MIEngine-In-ihe2ijxi.o3h' '--stdout=Microsoft-MIEngine-Out-j434iwvu.muh' '--stderr=Microsoft-MIEngine-Error-gipmpsae.uad' '--pid=Microsoft-MIEngine-Pid-qckf0tkf.2g1' '--dbgExe=G:\<Msys2安装路径>\ucrt64\bin\gdb.exe' '--interpreter=mi' 

# 即: vscode的cpp扩展.exe 一些配置 gdb.exe
```

(6.1) (可选) dot VSCode 文件

当在VSCode中选择了工具链后，会自动生成一个 `.vscode/tasks.json`

```json
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: g++.exe 生成活动文件",
            "command": "G:\\<Msys2的安装路径>\\ucrt64\\bin\\g++.exe",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ],
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "调试器生成的任务。"
        }
    ],
    "version": "2.0.0"
}
```

将两C++依赖添加到工具区建议：`.vscode/extensions.json`

```json
{
    "recommendations": [
        "ms-vscode.cpptools",
        "ms-vscode.cpptools-extension-pack",
        "ms-vscode.cmake-tools"
    ]
}
```

#### CMake环境

之前我们安装环境时没装CMake，`cmake --version` 就没有的。还确实对复杂C/C++项目的编译能力

安装VSCode扩展 `CMake Tools`



### VSCode in Linux

可参考vscode官方说明：

- [Visual Studio Code 的 C/C++](https://vscode.js.cn/docs/languages/cpp)、[C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp)
  (两个链接一样的，分别是中文和英文域名)
  - [在 VS Code 中使用 Linux 上的 C++](https://vscode.js.cn/docs/cpp/config-linux)
  - [教程：在 Visual Studio Code 中通过 CMake 安装和使用包](https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started-vscode?pivots=shell-powershell)

VSCode 使用 ssh 插件连接 Linux 或 wsl虚拟机

### VSCode in Github CodeSpace

略

### VS

略，推荐去VS官网去搜

### Github workflows

仅供参考：

```yaml
name: CI

on:
  push:
    paths-ignore:
      - '**.md'

  pull_request:
    paths-ignore:
      - '**.md'

jobs:
  build-linux-gcc48:
    name: Linux-gcc-4.8
    runs-on: ubuntu-latest
    container: ubuntu:16.04
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install dependency
        run: |
          apt update
          apt install -y gcc-4.8 g++-4.8 make

      - name: Get latest CMake and Ninja
        uses: lukka/get-cmake@v3.27.7

      - name: CMake
        run: cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=gcc-4.8 -DCMAKE_CXX_COMPILER=g++-4.8

      - name: Build
        run: cmake --build build --target recorder --parallel 10

      - name: Upload
        uses: actions/upload-artifact@v3
        with:
          name: recorder_linux_gcc48
          path: build/recorder

  build-linux:
    name: Linux-gcc
    runs-on: ubuntu-latest
    strategy:
      matrix:
        compiler: [ '5', '8', '13' ]
    container: gcc:${{ matrix.compiler }}
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Get latest CMake and Ninja
        uses: lukka/get-cmake@v3.27.7

      - name: CMake
        run: cmake -S . -B build -DCMAKE_BUILD_TYPE=Release

      - name: Build
        run: cmake --build build --target recorder --parallel 10

      - name: Upload
        uses: actions/upload-artifact@v3
        with:
          name: recorder_linux_gcc${{ matrix.compiler }}
          path: build/recorder

  build-macos:
    name: MacOS
    runs-on: macos-11
    strategy:
      matrix:
        arch: [ 'arm64', 'x86_64' ]
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Cmake
        run: cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_ARCHITECTURES="${{ matrix.arch }}" -DCMAKE_OSX_DEPLOYMENT_TARGET=10.12

      - name: Build
        run: cmake --build build --target recorder --parallel 10

      - name: Upload
        uses: actions/upload-artifact@v3
        with:
          name: recorder_mac_${{ matrix.arch }}
          path: build/recorder

  build-windows-msvc:
    name: Win-MSVC
    runs-on: windows-2022
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Cmake
        run: cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -G "Visual Studio 17 2022" -A x64

      - name: Build
        run: cmake --build build --target recorder --parallel 10

      - name: Upload
        uses: actions/upload-artifact@v3
        with:
          name: recorder_win_msvc
          path: build/Debug/recorder.exe

  build-windows-mingw:
    name: Win-MinGW
    runs-on: windows-2019
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up MinGW
        uses: egor-tensin/setup-mingw@v2
        with:
          platform: x64
          version: 12.2.0

      - name: CMake
        run: cmake -S . -B build -G "MinGW Makefiles" -DCMAKE_BUILD_TYPE=Release

      - name: Build
        run: cmake --build build --target recorder --parallel 10

      - name: Upload
        uses: actions/upload-artifact@v3
        with:
          name: recorder_win_mingw
          path: build/recorder.exe

  # build-windows-clang-cl:
  #   name: Win-ClangCl
  #   runs-on: windows-2019
  #   steps:
  #     - name: Checkout
  #       uses: actions/checkout@v3
  #
  #     - name: Cmake
  #       run: cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -G "Visual Studio 16 2019" -A x64 -T ClangCL
  #
  #     - name: Build
  #       run: cmake --build build --target recorder --parallel 10
  #
  #     - name: Upload
  #       uses: actions/upload-artifact@v3
  #       with:
  #         name: recorder_win_clang_cl
  #         path: build/Debug/recorder.exe

  build-android:
    name: Android
    runs-on: ubuntu-latest
    strategy:
      matrix:
        arch: [ 'arm64-v8a', 'x86_64' ]
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Get latest CMake and Ninja
        uses: lukka/get-cmake@latest

      - name: Set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8

      - name: Set up Android NDK
        uses: nttld/setup-ndk@v1
        id: setup-ndk
        with:
          ndk-version: r25c

      - name: CMake
        run: cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DANDROID_ABI=${{ matrix.arch }} -DCMAKE_TOOLCHAIN_FILE=${{ steps.setup-ndk.outputs.ndk-path }}/build/cmake/android.toolchain.cmake

      - name: Build
        run: cmake --build build --target recorder --parallel 10

      - name: Upload
        uses: actions/upload-artifact@v3
        with:
          name: recorder_android_${{ matrix.arch }}
          path: build/recorder
```

### GitLab workflows

仅供参考：

```yaml
variables:
BUILD_DIR: build

# before_script:
#   - ls
#   - mkdir -p $BUILD_DIR
#   - cd $BUILD_DIR
#   - pwd

build-ubuntu-gcc-48:
image: 192.168.1.208:9050/msy/ubuntu:gcc48
tags:
- gcc48
script:
- ls
- mkdir -p $BUILD_DIR
- cd $BUILD_DIR
- pwd
- cmake --version # cmake如果低于3.13，不支持 -S和-B命令，也不支持用cmake build代替make
- cmake -S .. -B . -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=gcc-4.8 -DCMAKE_CXX_COMPILER=g++-4.8
- cmake --build . --target recorder --parallel 10
artifacts:
paths:
- $BUILD_DIR/recorder

build-windows-mingw:
tags:
- windows
script:
- set PATH=%PATH%;C:\Soft\CLion\CLion 2022.3.3\bin\mingw\bin
- >
"C:/Soft/CLion/CLion 2022.3.3/bin/cmake/win/x64/bin/cmake.exe" -S "." -B "build"
-DCMAKE_BUILD_TYPE=Release
-DCMAKE_MAKE_PROGRAM="C:/Soft/CLion/CLion 2022.3.3/bin/ninja/win/x64/ninja.exe"
-DCMAKE_C_COMPILER="C:/Soft/CLion/CLion 2022.3.3/bin/mingw/bin/gcc.exe"
-DCMAKE_CXX_COMPILER="C:/Soft/CLion/CLion 2022.3.3/bin/mingw/bin/g++.exe"
-G Ninja
- |
"C:/Soft/CLion/CLion 2022.3.3/bin/cmake/win/x64/bin/cmake.exe" --build "build" --target recorder --parallel 10
- cd
- dir
artifacts:
paths:
- build/recorder.exe
name: "recorder_win_mingw"

# ————————————————————————————————————————————————————————————————————————————————————————————————

# build-linux-gcc-7:
#   tags:
#     - gcc7
#   script:
#     - apt-get update -qq
#     - apt install -y gcc-7 g++-7 cmake
#     - cmake --version
#     - cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=gcc-7 -DCMAKE_CXX_COMPILER=g++-7
#     - make
#   artifacts:
#     paths:
#       - $BUILD_DIR/recorder

# stages:
#   - build
#
# build-linux-gcc11:
#   stage: build
#   tags:
#     - gcc11
#   script:
#     - apt update
#     - cmake -DCMAKE_BUILD_TYPE=Release -G "CodeBlocks - Unix Makefiles" -B build/
#     - cmake --build build --target recorder --parallel 10
#   artifacts:
#     paths:
#       - build/recorder
#     name: "recorder_build"

# 原CLion：/usr/bin/cmake -DCMAKE_BUILD_TYPE=Debug -G "CodeBlocks - Unix Makefiles" -S /root/CLion/recorder -B /root/CLion/recorder/cmake-build-debug

# variables:
#   GIT_SUBMODULE_STRATEGY: recursive

# .build_template: &build_definition
#   script:
#     - apt update
#     - apt install -y gcc-4.8 g++-4.8 make
#     - cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=gcc-4.8 -DCMAKE_CXX_COMPILER=g++-4.8
#     - cmake --build build --target recorder --parallel 10
#   artifacts:
#     paths:
#       - build/recorder
#     name: "recorder_${CI_JOB_NAME}"

# build-linux-gcc48:
#   image: ubuntu:16.04
#   stage: build
#   <<: *build_definition

# build-linux-gcc11:
#   tags:
#     - gcc11
#   stage: build
#   <<: *build_definition

# build-macos:
#   tags:
#     - macos
#   stage: build
#   variables:
#     arch: ["arm64", "x86_64"]
#   script:
#     - cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_ARCHITECTURES="${arch}" -DCMAKE_OSX_DEPLOYMENT_TARGET=10.12
#     - cmake --build build --target recorder --parallel 10
#   artifacts:
#     paths:
#       - build/recorder
#     name: "recorder_mac_${arch}"

# build-windows-msvc:
#   tags:
#     - windows
#   stage: build
#   script:
#     - cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -G "Visual Studio 17 2022" -A x64
#     - cmake --build build --target recorder --parallel 10
#   artifacts:
#     paths:
#       - build/Debug/recorder.exe
#     name: "recorder_win_msvc"

# build-windows-mingw:
#   tags:
#     - windows
#   stage: build
#   script:
#     - cmake -S . -B build -G "MinGW Makefiles" -DCMAKE_BUILD_TYPE=Release
#     - cmake --build build --target recorder --parallel 10
#   artifacts:
#     paths:
#       - build/recorder.exe
#     name: "recorder_win_mingw"

# build-android:
#   image: ubuntu:latest
#   stage: build
#   variables:
#     arch: ["arm64-v8a", "x86_64"]
#   script:
#     - apt update
#     - apt install -y cmake ninja-build
#     - apt install -y openjdk-8-jdk
#     - wget https://dl.google.com/android/repository/android-ndk-r25c-linux-x86_64.zip
#     - unzip android-ndk-r25c-linux-x86_64.zip -d ${HOME}
#     - export ANDROID_NDK_HOME=${HOME}/android-ndk-r25c
#     - export PATH=${PATH}:${ANDROID_NDK_HOME}
#     - cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DANDROID_ABI=${arch} -DCMAKE_TOOLCHAIN_FILE=${ANDROID_NDK_HOME}/build/cmake/android.toolchain.cmake
#     - cmake --build build --target recorder --parallel 10
#   artifacts:
#     paths:
#       - build/recorder
#     name: "recorder_android_${arch}"
```

### Pure terminal in Windows

```shell
cd build
cmake .. && cmake --build .
```

### Pure terminal in Linux

其实这个和上面的工作流大差不差，主要都是先一遍cmake，再一遍make

```shell
cd build
cmake .. && cmake --build .

# 旧 (用cmake将cmakelist生成makefile，再用make生成最终产物。但实际上cmake本身就能跨平台，根本用不着make。@mq白cpp 就吐槽过: BV1wHSoYfE1H)
# cd build
# cmake ..
# make -j
```

## 多IDE共享环境

有时候，我们可以让多个IDE共享一些环境。

(1) 先检查环境变量是否存在该环境，如 `gdb --version`

(2) 如果cmd检测到环境变量存在，但IDE无法自动检测到

- 关闭IDE新开，或用管理员权限新开试试（如果刚添加的环境变量，需要新开软件才能检测到）
- 不然就手动在配置中写路径（一般不会）。linux/cmd可以用 `where gdb`、Windows PowerShell可以用 `Get-Command gdb` 检测路径

(3) 如果环境变量中没有该环境，但你使用的某个IDE可以检测到。

（有的IDE装的环境只有自己能检测得到（没有添加到环境变量中，而是直接指定固定路径）
可以去该IDE的设置中查看一下有没有相关的路径

有的软件 (VS、CLion) 安装时有捆绑的环境，但配置中又不给你说明环境在哪。这时可以去上网查一下。
如CLion通常的存储位置：

- 工具集: `G:\<CLion安装路径>\bin\mingw\`
- CMake: `G:\<CLion安装路径>\bin\cmake\win\x64\bin\cmake.exe`
- 构建工具: `G:\<CLion安装路径>\bin\ninja\win\x64\ninja.exe`
- C编译器: `G:\<CLion安装路径>\bin\mingw\bin\gcc.exe`
- C++编译器: `G:\<CLion安装路径>\bin\mingw\bin\g++.exe`
- 捆绑的GDB: `G:\<CLion安装路径>\bin\gdb\win\x64\bin\gdb.exe`

## 比较编写cpp时的各种IDE

暂略

## cmake编译核心

### 两个核心步骤

对底层构建工具缺乏认知的VS小白有个说法叫 "VS巨婴" (不是我说的)，意思就是离开了VS，或者没有那个运行按钮就不知道干啥了 (我以前也是哈)

- 通用：两个步骤：
  - 配置阶段
  - 构建阶段
  - 运行阶段
- 命令行：对应的就是以下两条主命令：(只是一般还会附上许多命令选项)
  - `cmake ..`
  - `cmake --build .`
- CLion：
  - 你点击CMake的重新加载按钮就是配置阶段 (运行前也会自动运行这一部分)
  - 点击运行按钮就是构建阶段
- VSCode：也同理。你安装好插件后：
  - 在 `CMakeLists.txt` 文件上Ctrl+S保存也会自动触发CMake部分 (运行前也会自动运行这一部分) 
  - 点击运行按钮就是构建阶段

可以看到，不同的软件本质上都是相同的。使用cmake时，运行都是执行这两条命令 (不算运行编译结果那条)

### 智能选项

不同的是，IDE可以帮你自动附加许多命令选项，比较方便。实例见 [[../../03. 管理层/03. 多项目管理/03. 库或包管理/BackEnd/Cpp包管理工具Vcpkg#CppCMakeVcpkgTemplate]]。而这些配置哪来的呢？

- CMakeLists.txt，并不存储这些信息
- 各种软件自身的解决方案，可以存储这些。如CLion的 `.idea`、VS的 `.vs` 或 `.sln`、VSCode 的 `.vscode/task.json`
  - 例如 CLion `设置 > 构建、执行、部署 > CMake > CMake options` 处理配置阶段的选项
  - 例如 CLion `右上角运行按钮下拉框 > 编辑配置 > Target、程序实参等` 处理编译阶段、运行阶段的选项
- `CMakePreset.json`。这是一种比较新和通用的解决方案。主要作用于构建阶段的配置
  - VSCode的CMake插件使用、CLion也能识别 (但好像识别不全? 识别不全的话要自己配一下)
  - 主要的C ++ IDE应该已经支持CMakePresets.json，并且不需要特定的配置

## demo、实战、调试技巧

从零创建项目到多IDE编译

### CppCMakeVcpkgTemplate

见 [[../../03. 管理层/03. 多项目管理/03. 库或包管理/BackEnd/Cpp包管理工具Vcpkg#CppCMakeVcpkgTemplate]]

```bash
# (方式一) clone两次
# 准备项目
> git clone https://github.com/lukka/CppCMakeVcpkgTemplate.git; git cd CppCMakeVcpkgTemplate
# 也许是为了避免大家安装的位置不同，该模板块选择把vcpkg的位置放在了项目中...也不是不行
> git clone https://github.com/microsoft/vcpkg.git; .\vcpkg\bootstrap-vcpkg.bat;


# (方式二) 递归clone
> git clone --recursive https://github.com/lukka/CppCMakeVcpkgTemplate.git; git cd CppCMakeVcpkgTemplate


# (方式一) VSCode. 点击运行按钮，选择main (他这个项目add_executable了两个目标)。成功打印！
# 
# 相当于以下的命令组:
> G:\Soft\Dev\All\Tool_CMake\bin\cmake.EXE -DCMAKE_TOOLCHAIN_FILE=H:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate/vcpkg/scripts/buildsystems/vcpkg.cmake -SH:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate -BH:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate/builds/ninja-multi-vcpkg -G "Ninja Multi-Config"
> G:\Soft\Dev\All\Tool_CMake\bin\cmake.EXE --build H:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate/builds/ninja-multi-vcpkg --config Debug --target main --
> ."H:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate/builds/ninja-multi-vcpkg/Debug/main.exe"
# 
# 简化 (假设都配置了环境变量，不过有时不能相对路径)
> mkdir ./builds/ninja-multi-vcpkg && cd ./builds/ninja-multi-vcpkg
> cmake -S ../../ -B . -G "Ninja Multi-Config" -DCMAKE_TOOLCHAIN_FILE=../../vcpkg/scripts/buildsystems/vcpkg.cmake
> cmake --build . --config Debug --target main --


# (方式二) CLion. 按cmake再安运行就行了 (cmake阶段失败的话 设置>构建执行部署>CMake，选项里加上 `-DCMAKE_TOOLCHAIN_FILE=H:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate/vcpkg/scripts/buildsystems/vcpkg.cmake` 就行了)
#
# 相当于以下命令组：
> G:\Soft\Dev\All\IDE_JetBrains_CLion\2024\bin\cmake\win\x64\bin\cmake.exe -DCMAKE_BUILD_TYPE=Debug -DCMAKE_MAKE_PROGRAM=G:/Soft/Dev/All/IDE_JetBrains_CLion/2024/bin/ninja/win/x64/ninja.exe -G Ninja -S H:\Git\Private\Group_LincZero\CppCMakeVcpkgTemplate -B H:\Git\Private\Group_LincZero\CppCMakeVcpkgTemplate\cmake-build-debug -DCMAKE_TOOLCHAIN_FILE=H:/Git/Private/Group_LincZero/CppCMakeVcpkgTemplate/vcpkg/scripts/buildsystems/vcpkg.cmake # 注意最后一个参数如果没有，见上，CLion设置里给CMake加上选项
> G:\Soft\Dev\All\Tool_CMake\bin\cmake.exe --build H:\Git\Private\Group_LincZero\CppCMakeVcpkgTemplate\cmake-build-debug --target main -j 14
# 
# 简化 (假设都配置了环境变量)
> mkdir ./cmake-build-debug && cd ./cmake-build-debug
> cmake -S .. -B . -G Ninja -DCMAKE_BUILD_TYPE=Debug -DCMAKE_MAKE_PROGRAM=ninja -DCMAKE_TOOLCHAIN_FILE=../vcpkg/scripts/buildsystems/vcpkg.cmake
> cmake --build . --target main -j 14


# (方式三) Terminal. 纯终端
# 基本同上
```

### 从零搭建

模拟于 CMakeVcpkgTemplate，详见 [LincDemo/CMakeVcpkgTemplate]

# CMakeVcpkgTemplate

该模板的特点：

- 描述了从零搭建的所有操作，让你知其所以然
- 最简化的版本中，项目创建仅需 `2个文件+5条命令`，项目克隆准备 `3条命令`，运行 `3条命令`
- 同时提供了大量适用于其他IDE或环境的可选文件/操作

## 从零搭建

以下命令组，如果你是windows，将 `&&` 更换成 `;`

Create Project

```bash
> cmake --version
> ninja --version
> gcc --version
> g++ --version
> gdb --version

> mkdir CMakeVcpkgTemplate && cd CMakeVcpkgTemplate

# add files
> git init
> git submodule add https://github.com/microsoft/vcpkg.git vcpkg
> ./vcpkg/bootstrap-vcpkg.bat # or .sh
> ./vcpkg/vcpkg new --application
> ./vcpkg/vcpkg add port fmt
> (add CMakeLists.txt)
> (add main.cpp)

# (optional, choosable)
> (add .gitignore、README.md、LICENSE)

# Use
# git clone 
```

Push、Template Project

```bash
> git add -A
> git commit -m "init"
# Then push according to github prompt
# 然后根据github提示push

# The project can be converted to a template repository in the github setting
# 上github setting中可以将该项目转换为模板存储库
```

Use Project

```bash
> git clone --recursive ... && cd CMakeVcpkgTemplate
> ./vcpkg/bootstrap-vcpkg.bat
> ./vcpkg/vcpkg install

> mkdir build && cd build
> cmake .. -DCMAKE_TOOLCHAIN_FILE=../vcpkg/scripts/buildsystems/vcpkg.cmake
> cmake --build .
```

## 可选

### CMakePresets.json 文件

详见 [[CMakePresets.json]]

不用这个文件也行：

像CLion、VS都可以在设置中进行配置（但不跨IDE，不通用），在CMake配置中加上选项：

`-DCMAKE_TOOLCHAIN_FILE=./vcpkg/scripts/buildsystems/vcpkg.cmake`

使用这个文件：

这个文件一是VSCode的 CMake/CMake Tool 插件在使用，二是现在许多新版本的IDE都能支持这个文件，更方便你去跨平台使用

### github工作流

略









