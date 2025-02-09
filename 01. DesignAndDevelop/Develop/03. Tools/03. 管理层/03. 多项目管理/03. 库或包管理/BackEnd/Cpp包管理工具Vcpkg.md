---
create_time: 2025-02-06
Author: LincZero
---
# Cpp包管理工具 Vcpkg

## 参考资料

- [微软vcpkg文档](https://learn.microsoft.com/zh-cn/vcpkg/)，[微软官网中的vcpkg说明](https://github.com/microsoft/vcpkg?tab=readme-ov-file#get-started)。强烈建议看这个为准，强烈建议看自己IDE里中vcpkg相关的内容
  - [教程：通过 CMake 安装和使用包](https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started?pivots=shell-powershell)
  - [教程：在 Visual Studio Code 中通过 CMake 安装和使用包](https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started-vscode?pivots=shell-powershell)
  - [CLion - Vcpkg integration](https://www.jetbrains.com/help/clion/package-management.html) (需要新版本CLion，23版本以上)
  - [CMake 项目中的 vcpkg](https://learn.microsoft.com/zh-cn/vcpkg/users/buildsystems/cmake-integration)
- 贡献
  - [教程：将端口添加到 vcpkg 开源注册表](https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started-adding-to-registry?pivots=shell-powershell)
- 视频
  - [【cmake】cmake搭配vcpkg的manifest模式实现第三方库的全自动下载和配置](https://www.bilibili.com/video/BV1pd4y1x7De) (特意找了个manifest模式的，这种资料可不多，都是经典模式)

## 学习 - 线性 (使用流程)

### 下载、安装、配置

很简单

```bash
git clone https://github.com/microsoft/vcpkg.git # 下载
cd vcpkg; .\bootstrap-vcpkg.bat # 安装 (双击也行), 此时会生成一个 vcpkg.exe
# 然后需要手动添加一下这个路径到windows环境变量，可以顺便新开cmd `>vcpkg --version` 检查下
```

### 在项目中使用

#### (1) 安装依赖

以清单模式为例，不建议使用经典模式 (经典模式是 `vcpkg install xxx`)

```bash
vcpkg new --application # 生成清单文件。当前文件夹会多出 `vcpkg.json` 和 `vcpkg-configuration.json`

# 添加依赖项 (可选)
vcpkg add port fmt # 如添加fmt包
vcpkg add cpp-httplib # 如添加cpp-httplib包
vcpkg add spdlog
vcpkg install # 安装vcpkg中记录的依赖包
```

不知道有没有某个包或想查找有哪些包可以去网站查，例如： https://vcpkg.link/ports/cpp-httplib

平时使用时也推荐去看一下。他上面也会告诉你用什么代码安装，以及需要往 CMake 文件里加什么代码！非常方便！

#### (2) 使用依赖

常规代码使用该库

```cpp
#include <fmt/core.h>

int main()
{
    fmt::print("Hello World!\n");
    return 0;
}
```

然后 `CMakeLists.txt` 中添加以下代码：

```js
find_package(fmt CONFIG REQUIRED)  
target_link_libraries(${PROJECT_NAME} PRIVATE fmt::fmt)
```

#### (3) 连接依赖

**原理**：

但这时 find_package 还不能找不到C++库。

一是前一章我们说过一般情况下去寻找的位置，但无论是经典还是清单模式，新库安装所在的位置不没在之前要找的地方的。所以我们需要让CMake能识别存放新的库的地方。

二是通过vcpkg安装的库是未编译状态，有时我们需要先编译他们再使用。这时需要使用vcpkg自身的cmake (即 `-DCMAKE_TOOLCHAIN_FILE=G:/<vcpkg安装路径>/scripts/buildsystems/vcpkg.cmake`)。把这些库编译成当前平台的库，然后再使用

**清单模式版**：

清单模式+纯头文件库这种，似乎没那么麻烦？那些教程老搞得我头晕

```js
set(CMAKE_PREFIX_PATH "${CMAKE_SOURCE_DIR}/vcpkg_installed/")
```

**VSCode**: 

先安装CMake、CMake Tools 两个扩展 (主要是后者进行这一步)

配置 `VCPKG_ROOT` 环境变量：需要提供 `vcpkg.cmake` 工具链文件。 要自动执行此操作，请在包含以下内容的 "helloworld" 目录中创建一个 `CMakePresets.json` 文件：

```json
{
  "version": 2,
  "configurePresets": [
    {
      "name": "vcpkg",
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/build", // 换成自己的目录
      "cacheVariables": {
        "CMAKE_TOOLCHAIN_FILE": "$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" // 换成安装vcpkg的本地目录
      }
    }
  ]
}

// 这里的两个路径的官方示例是：
$env:VCPKG_ROOT="C:\path\to\vcpkg"
$env:PATH="$env:VCPKG_ROOT;$env:PATH"

// 如果你不知道路径，除了去安装路径找，还可以这样：
>vcpkg integrate install
Applied user-wide integration for this vcpkg root.
CMake projects should use: "-DCMAKE_TOOLCHAIN_FILE=G:/<vcpkg安装路径>/scripts/buildsystems/vcpkg.cmake"

All MSBuild C++ projects can now #include any installed libraries. Linking will be handled automatically. Installing new libraries will make them instantly available.
```

**VS**：

`vcpkg integrante install` 安装之后即可使用

## 学习 - 字典型

### 经典模式和清单模式 (manifest模式)

- 经典模式是在任意路径下的，执行 `vcpkg install ...` 会安装到统一的指定路径。
- manifest模式是在你 `vcpkg new -application` 所在的路径下的，`add` 再 `vcpkg install` 会安装到当前目录下的 `vcpkg_installed` 文件夹中

> 参考：[【C++】C++包管理的最终答案(maybe)](https://www.bilibili.com/video/BV1FN411E77t)
> 
> - 共同特点、使用流程
>   - (1) 下载依赖 (2) 定位cmake项目到vcpkg (3) 通过find_package使用下载好的依赖
> - 清单模式
>   - (1) 提供一个json文件，描述了所有依赖信息，别人 `vcpkg install` (2) 同 (3) 同
>   - 推荐，别人使用时直接 `vcpkg install` 就行了
> - 经典模式
>   - (1) `vcpkg search fmt && vcpkg install fmt` (2) 编译命令加上 `-DCMAKE_TOOL...` (忘了) (3) 同
>   - 这种方式不利于分发，不建议使用
> 
> 一个原理补充：第二步是为了在cmake之前先去执行vcpkg-cmake脚本 (现场编译你需要的依赖包)
> 
> CLion补充：2023版本之后，按两下shift输入vcpkg回车，有一个vcpkg的面板

#### 经典模式

在经典模式下，`vcpkg` 命令直接安装和管理包。你可以使用 `vcpkg install <package>` 命令来安装单个包。例如：

```shell
vcpkg install cpp-httplib
```

#### 清单模式 (manifest模式)

在manifest模式下，`vcpkg` 使用 `vcpkg.json`文件来管理项目的依赖项。`vcpkg.json`文件定义了项目所需的所有包。当你运行`vcpkg install`时，它会读取`vcpkg.json`文件并安装其中列出的所有依赖项。

### 更多命令

有一些其他命令：

```shell
vcpkg list
vcpkg search fmt

vcpkg install spdlog:x64-windows        # 只编译64位windows版本
vcpkg install spdlog:x64-windows-static # 只编译64位windows版本的静态库
vcpkg remove spdlog:x64-windows         # 删除
vcpkg update                            # 更新
vcpkg upgrade                           # 列出需要更新的库
```

### 更新

vcpkg 包管理器在 GitHub 上定期更新。 若要将 vcpkg 的克隆更新到最新版本，执行 `git pull` 命令即可。

## 总结、FAQ

### CMAKE_TOOLCHAIN_FILE 的三种方式

`CMAKE_TOOLCHAIN_FILE` 到底是用以下哪种方式进行配置？同时配置时优先级如何？

- `命令行` 中：`cmake -DCMAKE_TOOLCHAIN_FILE=""`
- `CMakeLists.txt` 中：`set(CMAKE_TOOLCHAIN_FILE "...")`
- `CMakePresets.json` 中：`configurePresetsp[0].cacheVariables.CMAKE_TOOLCHAIN_FILE = "..."` (CMake 3.19 版本开始支持)

都可以，优先级顺序如下：`命令行参数` > CMakePresets.json > CMakeLists.txt

### Vs其他包管理工具

整体用下来和 python pip 的 `requirement.txt` 和 js npm 的 `package.json` 是差不多的。网站也与npm的官网很像

### 搜包原理

```bash
find_package(spdlog CONFIG REQUIRED) # 使用 vcpkg 的清单模式时，`find_package(spdlog CONFIG REQUIRED)` 能够找到 `spdlog` 的原因在于: vcpkg 的工具链文件机制 (通过 -D-DCMAKE_TOOLCHAIN_FILE=../../vcpkg/scripts/buildsystems/vcpkg.cmake 找到，这个工具链文件会自动将vcpkg_installed目录添加到CMake的搜索路径中) 以及 CMake 的配置
```

更多原理见 [Cpp包管理工具find_package](Cpp包管理工具find_package.md)

## demo、实战、调试技巧

### CppCMakeVcpkgTemplate

由于初学时我项目配置卡了好久，我决定通过编译一个模板demo `CppCMakeVcpkgTemplate` 来验证至关重要的一点：我项目配置的问题or我环境的问题

或者想要熟悉该包管理工具的，也可以尝试自己编译一遍这个库，应该就能感受到其便利，以及学习到使用流程了

```shell
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

### 不同IDE的按钮与命令行的对应关系

详见 [[How to build cpp]]
