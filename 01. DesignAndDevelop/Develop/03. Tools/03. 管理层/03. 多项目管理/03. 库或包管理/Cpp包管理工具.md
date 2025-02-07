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

## Vcpkg

详见 [./Cpp包管理工具Vcpkg](./Cpp包管理工具Vcpkg)
