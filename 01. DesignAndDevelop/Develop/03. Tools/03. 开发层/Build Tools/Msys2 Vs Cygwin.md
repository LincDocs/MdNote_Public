---
create_time: 2025-02-05
Author: LincZero
---
# Msys2 Vs Cygwin

## Msys2 Vs Other

Take from https://www.msys2.org/docs/what-is-msys2/

:::note

MSYS2 与其他项目对比

如果您想看到更多比较或认为可以改进，请告诉我们。

### MSYS2 与 WSL

MSYS2 允许您构建本机 Windows 程序，而使用 [WSL](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)您只能交叉编译它们，这会使事情变得更加复杂。如果您只是在寻找 Linux CLI 工具，或者无论如何都想构建最终在 Linux 服务器上运行的软件，那么 WSL 是更好的选择。

### MSYS2 与 Chocolatey 的比较

[Chocolatey](https://chocolatey.org/)主要捆绑已构建的（开源和闭源）软件，并使其易于安装/更新。另一方面，在 MSYS2 中，所有软件包都是从源代码构建的，您可以轻松地在您的机器上重现构建。Chocolatey 软件包的优势在于，捆绑的安装程序通常具有更好的 Windows 集成，因为它们设置了文件关联、快捷方式等。而且由于它们不是从源代码构建的，因此还有很多用于 Visual Studio 等闭源软件的软件包，否则很难管理/更新。

### MSYS2 与 Cygwin 的比较

MSYS2 中的 unixy 工具直接基于[Cygwin](https://cygwin.com/)，因此存在一些重叠。Cygwin 专注于在 Windows 上构建 Unix 软件，而 MSYS2 专注于构建针对 Windows API 构建的本机软件。

### MSYS2 与 Arch Linux 的比较

MSYS2 和[Arch Linux](https://www.archlinux.org/)共享软件包管理器及其附带的所有内容，例如构建定义、如何打包规则、更新工作方式、软件包签名方式、软件包运送方式、滚动发布性质等。通过重复使用此功能和概念，我们可以专注于实际软件包，并从 Arch Linux 开发人员的经验和工作中获益。已经熟悉 Arch Linux 的用户也将更容易上手。

### MSYS2 与 Scoop 的比较

由于缺乏使用[scoop](https://scoop.sh/)的经验，请参阅其比较页面：

- [https://github.com/lukesampson/scoop/wiki/Chocolatey-Comparison](https://github.com/lukesampson/scoop/wiki/Chocolatey-Comparison)
- [https://github.com/lukesampson/scoop/wiki/Cygwin-and-MSYS-Comparison](https://github.com/lukesampson/scoop/wiki/Cygwin-and-MSYS-Comparison)

:::

## Msys2

Website: https://www.msys2.org/

> [!quote]
>
> MSYS2 —— 适用于 Windows 的软件分发和构建平台
> 
> **MSYS2**是一组工具和库，为您提供一个易于使用的环境来构建、安装和运行原生 Windows 软件。
> 
> [它由一个名为mintty](https://mintty.github.io/)的命令行终端 、bash、git 和 subversion 等版本控制系统、tar 和 awk 等工具甚至 autotools 等构建系统组成，所有这些都基于[Cygwin](https://cygwin.com/)的修改版本。尽管其中一些核心部分基于 Cygwin，但 MSYS2 的主要重点是为本机 Windows 软件提供构建环境，并且将 Cygwin 使用部分保持在最低限度。MSYS2 为 GCC、mingw-w64、CPython、CMake、Meson、OpenSSL、FFmpeg、Rust、Ruby 等提供了最新的本机构建，仅举几例。
> 
> 为了便于安装软件包并保持更新，它提供了一个名为 [Pacman](https://wiki.archlinux.org/index.php/pacman)的软件包管理系统，Arch Linux 用户应该很熟悉它。它带来了许多强大的功能，例如依赖项解析和简单的完整系统升级，以及直接且可重复的软件包构建。我们的软件包存储库包含[3300 多个](https://packages.msys2.org/base)可立即安装的预构建软件包。
> 
> 有关更多详细信息，请参阅[“什么是 MSYS2？”](https://www.msys2.org/docs/what-is-msys2/)，其中还将 MSYS2 与其他软件发行版和开发环境（如[Cygwin](https://cygwin.com/)、 [WSL](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)、 [Chocolatey](https://chocolatey.org/)、[Scoop](https://scoop.sh/)等）进行了比较， 以及[“谁在使用 MSYS2？”，](https://www.msys2.org/docs/who-is-using-msys2/)以了解哪些项目正在使用 MSYS2 以及用于什么目的。

## Cygwin

略
