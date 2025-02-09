---
create_time: 2025-02-06
Author: LincZero
---
# Cpp包管理工具

## 原依赖

C++在不使用包管理工具时，一般会去哪找标准包和扩展包？CMakeList.txt 中 `find_package(fmt CONFIG REQUIRED) ` 又会去哪找？

- 系统包管理器安装的库
- CMAKE_PREFIX_PATH 环境变量：你可以通过设置 `CMAKE_PREFIX_PATH` 环境变量来指定 CMake 查找库的路径
  例如：
  ```js
  set(CMAKE_PREFIX_PATH "/path/to/fmt")
  ```
- CMake 自带的模块路径：CMake 自带一些模块来查找常用的库，可以在 `/usr/share/cmake-<version>/Modules/` 下找到
- 手动指定路径：如果你知道库的具体安装路径，可以通过 `CMAKE_MODULE_PATH` 或者 `CMAKE_PREFIX_PATH` 手动指定。

一些IDE软件安装时也会有对应的路径：

- VS：例如 `C:\Program Files (x86)\Microsoft Visual Studio\<version>\VC\Tools\MSVC\<version>\lib\x64`
- CLion：例如 `C:\MinGW\lib` 或 `C:\cygwin64\lib`
- WSL：例如 `/usr/lib` 和 `/usr/local/lib`

## 手动编译及管理

以添加spdlog包为例：

### 手动编译

Linux

```bash
cd libs
git clone https://github.com/gabime/spdlog.git
cd spdlog && mkdir build && cd build
cmake .. && cmake --build .
```

Windows

```bash
cd libs
git clone https://github.com/gabime/spdlog.git
cd spdlog; mkdir build; cd build
cmake ..; cmake --build .
```

### 手动路径

然后搜包路径改一下：

```bash
# 这个是原来用vcpkg的写法
find_package(spdlog CONFIG REQUIRED) # 使用 vcpkg 的清单模式时，`find_package(spdlog CONFIG REQUIRED)` 能够找到 `spdlog` 的原因在于 vcpkg 的工具链文件机制 (通过 -D-DCMAKE_TOOLCHAIN_FILE=../../vcpkg/scripts/buildsystems/vcpkg.cmake 找到，这个工具链文件会自动将vcpkg_installed目录添加到CMake的搜索路径中) 以及 CMake 的配置

# 修改成直接指定搜包路径
find_package(spdlog CONFIG REQUIRED PATHS "${PROJECT_SOURCE_DIR}/libs/spdlog/build/")

# 或者添加该语句 (整体添加搜包路径)
list(APPEND CMAKE_PREFIX_PATH "${PROJECT_SOURCE_DIR}/libs/spdlog/build/")

# 或者添加该语句 (整体设置搜包路径)
set(CMAKE_PREFIX_PATH "${PROJECT_SOURCE_DIR}/libs/spdlog/build/")
```

### 全局安装

或者直接安装到默认寻找路径也行

linux

```bash
sudo cmake --install . --prefix /usr/local
```

安装完成后，spdlog 的头文件和库文件会被安装到 /usr/local/include 和 /usr/local/lib 目录下。例如：

- 头文件路径：`/usr/local/include/spdlog`
- 库文件路径：`/usr/local/lib/libspdlog.so`（或 .a 文件）

windows

```bash
cmake --install . --prefix "C:\Program Files\spdlog"
```

## Vcpkg

详见 [Cpp包管理工具Vcpkg](Cpp包管理工具Vcpkg.md)

## find_package搜包语句

无论前面哪种方式，都有一个非常重要的语句：搜包

详见 [Cpp包管理工具find_package](Cpp包管理工具find_package.md)
