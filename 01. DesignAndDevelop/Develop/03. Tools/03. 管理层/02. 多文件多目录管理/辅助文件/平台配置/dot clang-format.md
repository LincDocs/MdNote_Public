---
create_time: 2024-03-20
Author: LincZero
---
# .clang-format

**ClangFormat**

主要针对 C++

## 大厂规范

专指C++

- Google：[Google 开源项目风格指南——中文版](https://zh-google-styleguide.readthedocs.io/en/latest/)，这个文档非常美观易用，且涵盖了大部分常用语言
- LLVM：https://llvm.org/docs/CodingStandards.html
- Mozilla
- Microsoft Visual
- Apple

## 代码编码风格文件 (`.clang-format`)

放置路径：它的工作方式是首先在你的代码文件的所在目录或者上级目录中寻找一个名为 `.clang-format` 或是 `_clang-format` 的配置文件。如果找不到，它会继续寻找，直到根目录。这就意味着你可以在任何你希望的地方放置这个配置文件。

IDE支持：大多数主流的 IDE，如 Visual Studio, Visual Studio Code, JetBrains 系列的 CLion,  IntelliJ IDEA 等都支持 ClangFormat。他们可能需要你在IDE中安装一个插件或者在设置中指向你电脑上的  ClangFormat 程序路径。

## 公司内部规范

1. 全局变量使用前缀`g_`.
2. 静态变量使用前缀`s_`.
3. 成员变量使用前缀`m_`.
4. 类名使用前缀`C`, 且使用大驼峰命名法, 如`CGlobalControl`.
5. 一般情况下使用下划线连接单词, 如`socket_fd`.
6. 枚举和宏全部大写.
