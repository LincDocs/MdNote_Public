---
create_time: 2025-02-05
Author: LincZero
---
# How to build cpp

## 环境准备

如果你未曾在本地编写和编译过C++项目，这里也提供了环境准备的说明的文档

而如果你本地已经有相关的环境，可以跳过这一步

1. 下载你需要使用的IDE软件 (如 `CLion`、`VS`、`VSCode`)
2. 安装编译工具 (如 [`MinGW-W64`](https://jb.gg/clion-mingw)、[`VisualStudio`](https://visualstudio.microsoft.com/zh-hans/vs/)) 及配置环境变量
   <br>现代会推荐使用 [msys2](https://www.msys2.org/) 来安装MinGW，以前会使用 Cygwin 或其他
   <br>(对于CLion来说，你添加工具链时，旁边会有个“下载”按钮，也能告诉你要在什么地方下载)
3. 检查环境
   <br>`g++ --version` 或 `clang --version`
   <br>如果没有插件到，可以看看是不是没有添加到环境变量

## 使用各种软件编译

### CLion in Windows

如果你未曾使用CLion编译C++项目，那么你可能需要配置工具链:

参考：

- 工具集: MinGW, w64 9.0
- CMake: 3.24.2
- 构建工具: ninja.exe
- C编译器: gcc.exe
- C++编译器: g++.exe
- 捆绑的GDB: v12.1

### CLion in Linux

或使用 WSL 也行

### VSCode in Windows

可参考官方说明：

- https://vscode.js.cn/docs/languages/cpp
- https://code.visualstudio.com/docs/languages/cpp

安装插件，`C/C++` 以及 `C/C++ Extension Pack`。用于着色、补全、悬停、错误检查等

菜单运行 > 启动调试(F5) > ……

`.vscode/extensions.json`

```json
{
    "recommendations": [
        "ms-vscode.cpptools",
        "ms-vscode.cpptools-extension-pack"
    ]
}
```

### VSCode in Linux

VSCode 使用 ssh 插件连接 Linux 或 wsl虚拟机

### Github Workflows

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

### GitLab

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
