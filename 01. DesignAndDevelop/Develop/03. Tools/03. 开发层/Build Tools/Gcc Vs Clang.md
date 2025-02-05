---
create_time: 2025-02-05
Author: LincZero
---
# Gcc Vs Clang

Take from:

- https://www.incredibuild.cn/blog/gcc-vs-clang-battle-of-the-behemoths

## GCC：并不只是编译器，更是编译器套件

先来说说 GCC。1984 年，当 Richard Stallman 创立 GNU 项目时，其目标是创建一个完善的类似 Unix 操作系统的自由软件。提醒大家，当时 Linux 还没出现， Linux 是后来替代 Unix 的操作系统，所以自由软件的概念在当时的确是一个伟大的目标。那时候，C 语言是系统软件开发的主导语言，Richard 开始为 C 语言开发编译器，并将其命名为 GNU C（GCC）。转眼，今年 4 月，GCC 的版本已经发展到了 10.3，从 C 语言编译器发展成为跨平台编译器，支持以下多种语言：

## Clang/LLVM: 编译器的“龙头”

CLAN/LLVM 是一个支持 C、C++、Objto-C 多种语言的编译器工具链。这句话并不能证明 Clang/LLVM 力量的强大。为了解释为什么我对这个编译工具情有独钟，我需要更详细地描述一下现代编译器的架构：

Clang/LLVM 就是这种架构的典型例子。LLVM 最初是美国伊利诺伊大学的一个研究项目。Clang 是前端，LLVM 是后端。LLVM 定义了一个基于单一静态赋值（SSA）形式的中间表示（IR）。许多编译优化因此更容易在 IR 上执行。还可以添加 LLVM IR pass 来添加自定义优化步骤。总而言之，这些工具推动着 Clang/LLVM 成为顶尖的编译器工具链。

## 比较

现在让我们来比较一下两大编译器巨头：GCC 和 Clang。

- **开源软件**——众所周知，GCC 和 Clang 都是免费的开源软件。但是他们的许可授权很不一样。GCC 是参照 GPL（GNU 公共许可证）授权的，而 Clang/LLVM 是 Apache 许可授权的。比较 GCC 和 Clang 的许可授权，最专业的是律师。
- **支持平台**—— GCC 和 Clang 都支持几乎所有的平台。Clang/LLVM 可在 Windows 本机上进行编译，而 GCC 则需要 MinGW 这样的子系统，才能与 Windows 兼容。这样比较 Clang 和 GCC 是不公平的，因为 GCC 没有在本地支持Windows 的计划。
- **代码复杂度**—— GCC 是一个非常复杂的软件，有超过 1500 万行代码。尽管其前/后端定义清晰明了，但软件在本质上更为单一。对比 GCC，Clang 更多的是模块化架构，具有定义良好的扩展点。
- **标准支持**—— 对 C++ 20，即最新推出的 C++ 版本，GCC 已通过测试。另外，它也完全符合 C++ 17 以及最新的 C 语言标准，C17。Clang 完全符合 C++ 17 标准，也将很快跟进 C++ 20 标准。
- 高效代码生成—— Clang 和 GCC 的代码生成，在空间和时间的复杂度旗鼓相当。因此这种比较毫无意义，因为这两个编译优化工具都基于一种严密的静态分配形式。
- **语言独立的类型系统**——在这个标题下对比 Clang 与 GCC 很有意义。由于 Clang/LLVM 对所有兼容语言都使用语言独立的类型系统，因此可以确定指令的确切语义。GCC 则没有语言独立类型系统的设计目标。
- 前端解析器—— GCC 以前有基于 Bison的 LR 解析器，后来转向了手写递归下降解析器。Clang 一直使用手写的确定性递归下降解析器，且可回溯。
- **后端链接器**—— GCC 与 Clang 的差异在这个层面最为明显。GCC 使用 ld 作为链接器，支持 ld-gold。Clang 使用 lld 作为链接器。通过一些基准测试，可以看出 lld 比 ld甚至最新的 ld-gold 都快。
- 构建工具—— Clang 与 GCC 的另一个大的区别。GCC 使用 Autotools 和 Make 作为构建工具，而 Clang/LLVM 使用 CMake。
- **调试支持**—— GCC 有一个优秀的 GDB 调试器。GDB 历经时间考验，性能优异。Clang 则将 LLDB 调试器构建为 LLVM 上的一组可重用组件。

以下的表格简单梳理了两个工具的差异：

|   |   |   |
|---|---|---|
|**类别**|GCC|Clang/LLVM|
|许可证|GNU GPL|Apache 2.0|
|代码模块化|一体化架构|模块化|
|支持平台|*inx, Windows (MinGW)|*inx, Natively in Windows|
|符合的语言标准|C++20 已通过验证, 符合 C++17|符合 C++17，正在申请  C++20 标准|
|代码生成|高效，有很多编译器选项可以使用|高效，LLVM 后端使用了 SSA 表单|
|语言独立类型系统|没有|有(LLVM的设计初衷)|
|构建工具|基于 Make|CMake|
|解析器|最早采用 Bison LR，现在改为递归下解析器|手写的递归下降解析器|
|链接器|LD|lld|
|调试器|GDB|LLDB|

## **总结**

这篇博文可以帮助你理解 GCC 和 Clang 的主要区别。GCC 是一个成熟的编译器，支持多种语言。Clang 主要支持 C 语言、C++ 和 Objtovi-C。但是 Clang 的底层框架 LLVM 具有足够的可扩展性，可以支持 Julia 和 Swift 等较新的语言。从 C++ 的角度来看，这两种都是符合 C++ 17 标准的优秀编译器。

从 Incredibuild 角度来看，两者都是很好的工具。这就是为什么我们也与 Clang 和 GCC 都兼容。借助 Incredibuild 的创新技术，Clang 和 GCC 编译进程可以无缝地分布在网络中的数百个远程内核上，大大减少了 Clang 和 GCC 的[编译时间](https://www.incredibuild.cn/product/dev-acceleration)。
