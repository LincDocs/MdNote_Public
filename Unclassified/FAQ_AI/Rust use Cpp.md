---
create_date: 2026-07-09
last_date: 2026-07-09
---
# Rust/Tauri use Cpp

## Rust/Tauri use Cpp

> [!question]
> Tauri2 可以轻松、低成本、高性能地在项目中集成 C++ 吗？
> 需求原因是我可能有些代码感觉用 Rust 写不太方便，很复杂？
> 具体做法是什么？
> 这是推荐方案吗？

by deepseek-v4-pro

是的，**Tauri 2 可以轻松、低成本、高性能地集成 C++**，因为它的后端本身就是 Rust，而 Rust 拥有成熟的 C/C++ 互操作机制。下面我会从可行性、具体做法、成本与性能、以及“是否推荐”这四个方面详细展开，并给你一个可以直接运行的示例。

### 1. 为什么可以“轻松、低成本、高性能”集成？

- **轻松**：有 `cxx` 这样专门为「Rust ↔ C++」设计的**安全绑定库**，你不需要手写大量 `unsafe` 的 FFI 代码。它让你在 Rust 里直接调用 C++ 函数，像调用普通 Rust 函数一样。
- **低成本**：可以复用已有 C++ 代码（算法库、硬件 SDK、存量业务逻辑），避免重写。通过 `build.rs` 自动编译 C++ 源码，跨平台成本远低于在 Node.js 里集成原生模块。
- **高性能**：`cxx` 生成的绑定是零开销或极低开销的，函数调用就是直接的 C++ ABI 调用，数据传递可以避免不必要的拷贝。

### 2. 具体做法（基于 Tauri 2 + `cxx`）

假设你想在 Tauri 命令里调用一个 C++ 函数，例如一个复杂的计算。

#### 步骤 1：创建 Tauri 2 项目
```bash
cargo create-tauri-app my-app
cd my-app
```

#### 步骤 2：添加 C++ 源码
在项目根目录新建 `cpp/` 文件夹，放入 `algorithm.cpp` 和 `algorithm.h`。
```cpp
// cpp/algorithm.h
#pragma once
#include <string>

std::string heavy_compute(int input);
```

```cpp
// cpp/algorithm.cpp
#include "algorithm.h"
#include <sstream>

std::string heavy_compute(int input) {
    // 这里是你的复杂 C++ 逻辑
    std::ostringstream oss;
    oss << "Processed: " << (input * 42);
    return oss.str();
}
```

#### 步骤 3：使用 `cxx` 创建桥接文件
在 `src-tauri/src/` 下创建 `ffi.rs`，描述 Rust 和 C++ 的接口。
```rust
// src-tauri/src/ffi.rs
#[cxx::bridge(namespace = "myapp")]
mod ffi {
    extern "Rust" {
        // 如果 C++ 要调用 Rust，可以在这里声明
    }

    unsafe extern "C++" {
        include!("algorithm.h");  // 包含我们的头文件

        // 直接声明 C++ 函数签名
        fn heavy_compute(input: i32) -> String;
    }
}
```

#### 步骤 4：在 `build.rs` 中编译 C++ 代码
编辑 `src-tauri/build.rs`（如果没有就新建），用 `cc` crate 编译。
```rust
// src-tauri/build.rs
fn main() {
    // 编译 cpp 目录下的所有 .cpp 文件
    cc::Build::new()
        .cpp(true)
        .files(&["../cpp/algorithm.cpp"])  // 注意路径相对于 src-tauri
        .include("../cpp")
        .compile("mycpplib");
}
```
并在 `Cargo.toml` 中加入构建依赖和运行时依赖：
```toml
[build-dependencies]
cc = "1"

[dependencies]
cxx = "1.0"
```

#### 步骤 5：在 Tauri 命令中调用 C++
在 `src-tauri/src/lib.rs` 或 `main.rs` 中写一个 Tauri command，直接调用 `cxx` 生成的绑定。
```rust
use tauri;

mod ffi;  // 引入桥接模块

#[tauri::command]
fn compute_with_cpp(input: i32) -> String {
    // 调用 C++ 函数就像调用本地函数
    ffi::heavy_compute(input)
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compute_with_cpp])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 步骤 6：前端调用
```js
import { invoke } from '@tauri-apps/api/core';

const result = await invoke('compute_with_cpp', { input: 10 });
console.log(result); // 输出 "Processed: 420"
```

**关键点**：
- `cxx` 生成的代码会处理 `std::string` 到 Rust `String` 的转换，没有内存安全问题。
- 编译时 C++ 源码被静态链接进最终的 Tauri 二进制文件，分发时无需额外动态库。

### 3. 成本与性能的具体分析

| 维度 | 评价 | 说明 |
|------|------|------|
| **轻松度** | ★★★★☆ | `cxx` 让绑定几乎不用手写 unsafe，头文件和实现直接可用。对于复杂的 C++ 类、继承、模板，`cxx` 支持有限，可能需要手动包装成 C 兼容接口，此时难度上升。 |
| **成本** | **初期低，维护可控** | 只要依赖了 C++ 源码，你就需要确保 C++ 编译器在目标平台可用（Windows 通常需安装 VS Build Tools，macOS 有 Clang，Linux 有 GCC）。跨平台 CI 配置稍多一些，但远比重写便宜。 |
| **性能** | ★★★★★ | 调用开销极小，只是 C++ 函数调用的间接层。数据在 Rust 和 C++ 之间零拷贝传递（`cxx` 使用指针或栈拷贝基础类型）。 |
| **安全性** | **需要注意** | `cxx` 保证跨语言边界的类型安全和所有权安全，但如果 C++ 内部有内存错误，Rust 无法保护。 |

### 4. 这是推荐方案吗？

**分情况推荐：**

✅ **强烈推荐的情况**  
- 你已经有大量稳定的 C++ 库（如 OpenCV、TensorRT、自定义引擎）。
- 性能关键路径需要手写 SIMD 或操作硬件，而 C++ 的生态或经验更丰富。
- 需要使用 Rust 生态中严重缺失的 C++ 库。

🤔 **需要权衡的情况**  
- 你只是“感觉 Rust 写起来不方便、复杂”——这可能因为对 Rust 的所有权还不熟悉。引入 C++ 会带来两套构建体系、额外的调试成本、以及 C++ 自身的安全隐患。用 Rust 重写往往是**更一致、更安全**的选择。
- 即使 Rust 难写，Tauri 的命令层本质上就是异步 Rust，大部分逻辑都可以用 Rust 写；只有真正绕不过的 C++ 代码才走 FFI。

⚡ **一个折中方案**  
把性能核心、复杂算法放在 C++ 里，上层业务逻辑用 Rust 调用，这样各自发挥优势。Tauri 项目完全可以这样做，且社区已有大量实践。

### 总结
**Tauri 2 集成 C++ 既轻松又高效**，尤其借助 `cxx` crate。你只需写好 C++ 代码，用 `build.rs` 编译，在 `ffi.rs` 中声明接口，然后就能在 Tauri 的命令里直接使用。性能无损，成本可控。  
但如果不是为了复用现有 C++ 资产，而是逃避 Rust 的学习曲线，我更建议花点时间掌握 Rust——最终会给你更安全的系统和更简单的维护体验。

如果你想看更复杂的场景（比如传递大型数组、调用 C++ 类、异步集成），我可以再给你写一个完整的示例。

## FFI 与 JNI 概念

> [!question]
> 解释什么是FFI，全称是什么。java调用cpp用的JNI也解释下。与这个类似吗？

by deepseek-v4-pro

我们一步步拆解，先讲清楚概念，再对比它们的异同。

### 1. FFI 是什么？全称是什么？

**全称**：**Foreign Function Interface**（外部函数接口）。

**解释**：  
FFI 是一种**允许用一种编程语言编写的代码，去调用另一种语言编写的函数、使用其数据结构**的机制。它不是某一种具体的技术，而是一个通用术语。

你可以把它想象成一个“语言翻译官”：
- Rust 语言有自己的函数调用约定、内存布局。
- C++ 也有自己的一套（名字修饰、异常处理等）。
- 直接让 Rust 调用 C++ 是不行的，因为它们互相“听不懂”。
- FFI 就是**在 A 语言里声明 B 语言函数的签名，并约定一套双方都遵守的底层规则**（通常以 C 语言 ABI 为公共中间层），从而完成调用。

**核心要点**：  
FFI 的关键在于跨越语言边界，处理**数据类型映射**、**内存管理**、**调用约定**和**错误处理**的差异。几乎任何语言要调用 C/C++，或让 C/C++ 调用自己，都需要用到 FFI。

### 2. JNI 是什么？

**全称**：**Java Native Interface**（Java 本地接口）。

**解释**：  
JNI 是 **Java 官方提供的 FFI 标准**，专门用于 Java 代码与 C/C++ 等本地代码互相调用。

**典型工作流程**：
1. 在 Java 类中用 `native` 关键字声明一个方法。
2. 用 `javac -h` 生成一个 C/C++ 头文件，这个头文件里包含了名称极长的函数签名（如 `Java_com_example_MyClass_myMethod`）。
3. 在 C/C++ 中实现这个函数，通过 `JNIEnv*` 指针来访问 Java 对象、数组，并进行类型转换。
4. 编译成动态库（Windows 上是 `.dll`，Linux 是 `.so`，macOS 是 `.dylib`）。
5. 在 Java 中用 `System.loadLibrary` 加载这个库，之后就能调用那个 `native` 方法了。

**JNI 的特点**：
- **完全手动的类型转换**：所有 Java 的 `String`、数组、对象，都必须通过 `JNIEnv` 提供的函数来操作，例如 `GetStringUTFChars` 把 Java 字符串转成 C 字符串。
- **极易出错**：稍有不慎就会造成内存泄漏（忘记释放字符串）、崩溃（访问无效的本地引用）或难以调试的问题。
- **性能不错**：调用本身有开销，但计算密集型代码在 C++ 里跑得很快。

### 3. 与 Tauri（Rust + `cxx`）集成 C++ 类似吗？

**结论：非常类似，本质上都是 FFI，但 `cxx` 是比 JNI 安全、现代得多的实现。**

我们可以从以下几个维度对比：

| 维度 | JNI (Java ↔ C++) | `cxx` (Rust ↔ C++) | 之前的例子 (Tauri 用 `cxx`) |
|------|------------------|---------------------|------------------------------|
| **所属语言** | Java 的官方 FFI | Rust 社区流行的安全 FFI 库 | Rust 生态 |
| **底层机制** | 通过 C 函数和 `JNIEnv` 指针间接操作 | 代码生成 + Rust 的类型安全包裹，底层也是 C ABI | 同左，静态链接进 Tauri |
| **绑定写法** | 手写 C 函数，手动用 `GetStringUTFChars` 等转换 | 在 `cxx::bridge` 模块里声明，自动生成安全胶水代码 | `ffi.rs` 中声明，直接调用像 Rust 函数 |
| **类型安全** | 很弱。你可以把 `jobject` 强转成任何东西，编译期不检查 | 很强。`cxx` 保证两边类型一致，`String` 自动转换且内存安全 | 编译期保证跨边界安全 |
| **内存安全** | 依赖程序员，极易泄漏或悬挂指针 | `cxx` 通过所有权分析保证 C++ 侧的内存被 Rust 自动管理或明确析构 | 在示例中 `std::string` 返回给 Rust 时，内存所有权正确转移 |
| **易用性** | 繁琐，样板代码极多 | 声明式，接近自动挡 | 你看到的简单三行桥接 |
| **构建系统** | 需手动编译 C++ 成动态库，或用复杂构建脚本 | `build.rs` + `cc` crate 自动编译，静态链接 | 之前例子的一键编译 |

**总结它们的相似与不同：**

- **相似之处（本质都是 FFI）**：  
  JNI、`cxx`，甚至 Python 的 `ctypes`/`Cython`，**都是为了解决跨语言调用的同一类问题**。它们都在做“翻译”：把 Java 的 `String` 变成 `char*`，或把 Rust 的 `String` 安全地变成 `std::string`。底层最终都是通过 C 的调用约定进行通信。

- **根本不同（安全性与抽象层级）**：  
  JNI 是**手动挡、无安全带**：你需要自己管理所有资源的转换和释放，错误代价是 JVM 崩溃。  
  `cxx` 是**自动挡、带防撞梁**：它利用了 Rust 的所有权系统和强大的宏/代码生成，把那些危险、重复的手工活都自动完成了，在编译期就消除内存错误。**它是现代 FFI 实践的一个优秀代表**，让你感觉就像在写普通 Rust 函数一样调用 C++。

因此，在你的 Tauri 2 项目里用 `cxx` 集成 C++，本质上就是在做 FFI，只不过你选择了比 JNI 时代更安全、更低成本、更不易出错的实现方式。这也就是为什么我说它能做到“轻松、低成本、高性能”。

## 分别构建 or 一体化

:::question

(出现了一个报错)

那这个报错呢，是不是因为 cpp 部分缺失那些标准库之类的东西。
一般的 cpp 项目有 cmark markfile 等文件去管理这些项目配置和链接相关的事，还有编辑器的各种设置可以选 gcc/g++ 版本，调试工具等。

而这里把 cpp 交给了 build.rs 来编译，似乎会缺少很多东西？

如果说分开两个不同的项目，cpp 项目只编译 .a 或 .lib，然后再去标注函数类型并引用，和原来的做法相比，会更好吗？给出全面深入的两种方案的对比。

:::

by deepseek-v4-pro

你的观察很敏锐，这次链接错误确实不是 C++ 标准库缺失，而是 `cxx` 工作方式导致的一个典型遗漏。我先解决你的当前报错，再深入回答关于两种集成方案的对比。

### 1. 当前的链接错误到底缺了什么？

链接器报错：
```
无法解析的外部符号 myapp$cxxbridge1$197$heavy_compute
```
`myapp$cxxbridge1$197$heavy_compute` 是 **`cxx` 自动生成的 C++ 胶水代码**里的符号。`cxx` 工作流程是：

1. 读取你写的 `#[cxx::bridge]` 模块（`ffi.rs`）；
2. 生成一个隐藏的 `.cpp` 文件（里面有你声明的 `heavy_compute` 的包装函数，以及 `namespace myapp` 等实现）；
3. 这个生成的 `.cpp` 会 `#include "algorithm.h"`，并调用你的 `heavy_compute`。

**你只编译了 `algorithm.cpp`，却忘了编译 `cxx` 自动生成的那个 `.cpp`**，所以链接器找不到包装函数。

解决办法：**用 `cxx_build` 来统筹整个编译过程**。

### 2. 修复方法：正确的 `build.rs` 与依赖

修改 `src-tauri/build.rs`（没有就新建，放在 `Cargo.toml` 同级）：

```rust
// src-tauri/build.rs
fn main() {
    // cxx_build::bridge 会：
    // 1. 解析 src/ffi.rs 并生成 C++ 桥接源码
    // 2. 返回一个已经配置好编译该桥接源码的 cc::Build
    cxx_build::bridge("src/ffi.rs")
        .file("../cpp/algorithm.cpp")          // 你自己的 C++ 源文件
        .include("../cpp")                     // 头文件搜索路径
        .flag_if_supported("-std=c++17")       // 指定 C++ 标准（按需）
        .compile("mycpplib");                  // 输出库名，任意命名
}
```

`Cargo.toml` 里需要加入 `cxx-build` 作为构建依赖：

```toml
[build-dependencies]
cxx-build = "1.0"
```

同时可以移除原来的 `cc` 依赖（`cxx-build` 内部已经依赖 `cc`）。现在编译就会自动把生成的桥接代码和你的 `algorithm.cpp` 一起编译、链接，错误消失。

> 你可能还看到一个 `unnecessary unsafe` 的警告，这是因为你在 `lib.rs` 里写了 `unsafe { heavy_compute(9) }`，但你的 `ffi.rs` 用了 `pub use ffi_inner::ffi::heavy_compute;` 重新导出后，可能函数在某些路径下被视作**安全函数**（例如 `cxx` 的某些版本对简单签名能推断安全，不过具体表现可变）。这个警告不影响编译，如果你想消除它，直接去掉 `unsafe` 块即可，或者在 `ffi.rs` 中不要再导出，保持 `ffi::ffi::heavy_compute` 的调用方式并确实使用 `unsafe`。

### 3. “把 C++ 交给 build.rs 编译，会缺少很多东西吗？”

你担心的完全合理。一个成熟的 C++ 项目通常有 CMake / Meson 管理目标、编译选项、依赖、安装规则，IDE 能自动感知调试配置、智能提示、一键运行。

而 `build.rs` + `cc`/`cxx_build` 提供了**足够日常使用**的能力，但确实有边界：

| 能力                         | `build.rs` 支持？                                |
| ---------------------------- | ------------------------------------------------ |
| 设置 C++ 标准 (`-std=c++17`)     | ✅ `.flag_if_supported("-std=c++17")`               |
| 选择编译器 (GCC/Clang/MSVC)  | ✅ 环境变量 `CXX` 或 `CC_<target>`                    |
| 多文件、多目录编译           | ✅ `.files(...)` 支持 glob                          |
| 预处理器宏 (`-DXXX`)           | ✅ `.define("XXX", "value")`                        |
| 头文件路径                   | ✅ `.include(...)`                                  |
| 优化级别 (`-O2`)、调试符号 (`-g`) | ✅ `.opt_level(2)` `.debug(true)`                    |
| 链接系统库 (`-lm`, `-lpthread`) | ✅ `println!("cargo:rustc-link-lib=m")`            |
| 自动解决第三方 C++ 依赖 (如 Boost、OpenCV) | ❌ 需要自己下载/编译，或引入 vcpkg/conan 的脚本    |
| IDE 对 C++ 代码的完整支持    | ⚠️ 一般：IDE 通常只把 Rust 项目看作 Rust crate，C++ 代码只是附属文件，智能提示、跳转、调试都有折扣 |
| 单元测试框架 (GTest 等)       | ❌ 需额外整合，基本不现实                           |
| 复杂的条件编译与多目标配置   | ⚠️ 只能用 Rust `cfg` 手动模拟，没有 CMake generator 灵活 |

也就是说：**对于几十个文件以内、不依赖复杂外部库的 C++ 逻辑，`build.rs` 完全够用**；但如果你的 C++ 部分很庞大、有多层依赖、需要完整 IDE 体验和独立的测试体系，那么单独建一个 C++ 库项目会更好。

### 4. 两种集成方案全面对比

#### 方案 A：build.rs 一体化（当前做法）
- **结构**：C++ 源码直接放在 Rust 项目内，通过 `cxx_build` 编译并链接。
- **构建入口**：`cargo build` 一条命令。
- **依赖管理**：C++ 依赖靠手工下载或脚本，无法用 CMake 的 `find_package`。
- **IDE 体验**：只能将 C++ 文件当作普通文本编辑；调试时可以在符号表看到 C++ 函数，但断点、表达式求值依赖 gdb/lldb 映射，不完美。
- **调试**：只要编译时加了 `-g`，可以调试进 C++ 代码，但源码路径映射需手动处理。
- **跨平台**：靠 `cc` crate 自动适配平台编译器和标志，简单项目非常方便。

#### 方案 B：独立 C++ 项目 + 静态库链接
- **结构**：C++ 代码有独立的 CMake/Meson 项目，产出 `.a` 或 `.lib`，Rust 侧通过 `cxx` 或手动 FFI 绑定，并在 `build.rs` 中调用 CMake 构建，或直接在 `Cargo.toml` 里配置链接。
- **构建入口**：需要协调两套构建：先构建 C++ 库，再 `cargo build`。可以在 `build.rs` 中用 `Command::new("cmake").args(...).status()` 自动化，但依赖系统需安装 cmake 等。
- **依赖管理**：CMake 生态完整，`FetchContent`、`find_package`、vcpkg/conan 都很方便。
- **IDE 体验**：C++ 项目可独立打开（VS/CLion/VSCode），享受完整的智能提示、重构、测试、调试功能。
- **调试**：只要库带有调试符号，调试体验与纯 C++ 项目几乎一样，Rust 和 C++ 混编调试也没问题。
- **跨平台**：CMake 是事实标准，但集成到 Rust 构建时，需要处理工具链发现、参数传递，配置稍复杂。

下面用表格归纳关键维度：

| 维度               | A: build.rs 一体化                                                        | B: 独立 C++ 静态库                                                       |
| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **构建复杂度**     | 简单，`cargo build` 一键完成                                              | 较高，需编排两套构建，可能要在 `build.rs` 中调用 CMake                   |
| **环境要求**       | Rust + 平台默认 C++ 编译器                                                | Rust + CMake + 目标平台 C++ 编译器（及依赖）                             |
| **C++ 依赖管理**   | 手工管理，难以接入包管理器                                                | 完整的 CMake/vcpkg/conan 支持，可轻松引入 Boost、OpenCV 等               |
| **IDE 支持**       | 对 C++ 部分弱，仅当附属文件                                               | 独立项目获得完整 IDE 能力（补全、重构、测试）                            |
| **调试体验**       | 可行，但源码映射不够自动化，需手动配置                                   | 极佳，与纯 C++ 项目无差别                                                |
| **跨平台一致性**   | `cc` crate 自动处理，开销低                                              | 需编写平台判断逻辑，工作量大但控制力更强                                 |
| **增量编译**       | 只编译改动的 .cpp，速度不错                                               | 同样增量，且 CMake 能精确管理依赖                                        |
| **团队分工**       | 适合全栈个人或小团队                                                      | 适合 Rust 和 C++ 工程师分别维护不同项目                                  |
| **版本与发布**     | 源码与 Rust 一起版本控制                                                  | 库与主项目可独立版本控制，可通过 git submodule 或包管理器集成            |
| **适用规模**       | 小型 C++ 工具函数（几十个文件）、内部算法                                 | 中大型 C++ 引擎、第三方库封装、需要单独测试和发布的组件                  |

### 5. 最终推荐

- **优先坚持方案 A（一体化）**，除非你确实遇到了方案 A 的明显短板（比如 IDE 卡脖子、需要引入复杂的 C++ 依赖、团队有专门的 C++ 开发者）。大多数情况下，Rust 开发者引入 C++ 只是为了几段高性能算法或某个硬件 SDK，三五个文件的一体化集成完全够用，成本最低。

- 如果你已经有**现成的 C++ 项目**，或者计划**把 C++ 作为独立组件长期维护**，那么方案 B 是更专业的选择。你可以这样落地：
  1. 用 CMake 建立 C++ 库项目，确保可以独立编译出静态库。
  2. 在 Rust 项目的 `build.rs` 里使用 `cmake` crate（或直接 `Command::new("cmake")`）编译它，然后用 `println!("cargo:rustc-link-search=...")` 和 `cxx` 绑定来调用。
  3. 甚至可以写一个小脚本，在 CI 中先构建 C++ 库，再构建 Tauri 应用，把静态库路径传递给 Rust。

**总之，你的“缺少很多东西”的直觉是对的——方案 A 放弃了 C++ 生态的成熟工具，但换来简洁的一站式体验；方案 B 保留了 C++ 的专业工具链，但引入了多构建系统的维护成本。** 根据你的实际代码规模和复杂度选择即可。

如果你目前的 C++ 部分只涉及几十个文件、无复杂外部依赖，建议先用修复后的方案 A 继续；后续如果发现 IDE 支持或依赖管理成为瓶颈，再平滑迁移到方案 B 也不迟。






