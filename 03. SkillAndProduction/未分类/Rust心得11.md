---
create_date: 2025-11-05
last_date: 2025-11-05
author: LincZero
---
# Rust心得2025-11

## 字符串相关

记忆建议（快速决策与助记法）

- 五个关键词帮你快速选签名：Borrow / Owned / Mutate / Generic / FFI
  - Borrow（只读）
    - &str（最常用）
    - &'static str (如果是字面量)
  - Owned（要所有权）
    - String
    - 或 `Into<String>`（若想接收 &str/ String 两种输入用 Into）。
  - Mutate（就地修改）
    - &mut String
    - 如果“可能要变为 owned”用 `Cow<'a, str>`。
  - Generic（更通用）
    - `AsRef<str>`（只读通用）
    - `Borrow<str>`（集合用）
    - Display（只需格式化）
  - FFI（跨语言或非 UTF）
    - CStr/CString
    - `&[u8]/Vec<u8]`
- 快速选型表（一句话版）
  - 只读且想最简单 | `&str`（或 `impl AsRef<str>` 用于更通用）
  - 需要拥有并存储/返回 | `String` 或 `S: Into<String>`
  - 大多数只读，少数需修改 | `Cow<'a, str>`
  - 就地修改现有 String | `&mut String`
  - 多人共享同一个字符串 | `Rc<String> / Arc<String>`
  - 与 C 交互或非 UTF | `CStr/CString` 或 `&[u8]/Vec<u8]`
  - 需要接受任意可打印类型 | `T: Display`

## Option/Result解包函数的记法

你感觉功能和函数名不是很对应，这很正常。关键在于要把它们理解为 **“短语”** 而不是孤立的单词。

### 分类 1：取值或提供备选 (Getting the Value or Alternatives)

这类函数的目标是：从容器中取出值。如果取不出，就用一个备用方案。

- `unwrap()`
  - **Unwrap** it, *or panic*.
  - **解包**，*否则就让程序崩溃*。
  - 最直接、最“暴力”的取值方式。它假设你 100% 确定里面有值

- `expect("message")`
  - I **expect** a value, *or panic with this "message"*.
  - 我**期望**一个值，*否则用这条“消息”来崩溃*。
  - `unwrap()` 的友好版，让你在程序崩溃时知道是“哪个期望”落空了

- `unwrap_or(default_value)`
  - **Unwrap** it, **or** use this `default_value`.
  - **解包**，**或者**使用这个 `默认值`。
  - 最常用的备用方案。`or` 后面直接跟一个现成的值。

- `unwrap_or_else(fallback_fn)`
  - **Unwrap** it, **or else** execute this `fallback_fn` to get a value.
  - **解包**，**否则就**执行这个 `备用函数` 来获取一个值。
  - `else` 在这里暗示了“如果前面的条件不成立，就做这件事”。它接受一个函数（闭包），只在需要备用值时才执行，避免了不必要的开销（惰性求值）。

- `unwrap_or_default()`
  - **Unwrap** it, **or** use the type's **default** value.
  - **解包**，**或者**使用该类型的**默认值**。
  - `unwrap_or` 的一个特例，专门用于那些实现了 `Default` trait 的类型。

### 分类 2：转换内部的值 (Mapping the Inner Value)

这类函数的目标是：在不破坏容器（`Option`/`Result`）的前提下，对内部的值进行转换。

- `map(|v| ...)`
  - **Map** the inner value `v` to a new one.
  - **映射**内部的值 `v` 变成一个新值。
  - “映射”是核心。`Some(1)` -> `map(|v| v+1)` -> `Some(2)`。`None` 保持 `None`。`Result` 同理。

- `map_or(default, |v| ...)`
  - **Map** the inner value `v`, **or** return the `default`.
  - **映射**内部的值 `v`，**或者**直接返回这个 `default` 值。
  - 结合了 `map` 和 `unwrap_or` 的思想。注意，它的返回值不再是 `Option`/`Result`，而是一个普通的值。

- `map_or_else(default_fn, |v| ...)`
  - **Map** the inner value `v`, **or else** execute `default_fn` to get a return value.
  - **映射**内部的值 `v`，**否则就**执行 `default_fn` 来获取一个返回值。
  - `map_or` 的惰性版本。`else` 再次暗示了“执行一个函数”。

- `map_err(|e| ...)` (`Result` 专用)
  - **Map** the **error** value `e` to a new one.
  - **映射****错误**值 `e` 变成一个新值。
  - `map` 只处理 `Ok` 的情况，而 `map_err` 只处理 `Err` 的情况。函数名清晰地表达了它的意图。

### 分类 3：链式操作 (Chaining Operations)

这类函数的目标是：执行一个操作，该操作的返回值本身又是一个 `Option` 或 `Result`。

- `and_then(|v| ...)`
  - If it's `Ok`/`Some`, **and then** execute this operation.
  - 如果它是 `Ok`/`Some`，**然后就**执行这个操作。
  - `and` 体现了“成功路径”的延续。用于将多个可能失败的操作串联起来。例如：先解析用户ID，**然后就**用ID去数据库查找用户。

- `or_else(|e| ...)`
  - If it's `Err`/`None`, **or else** try this alternative operation.
  - 如果它是 `Err`/`None`，**否则就**试试这个备用操作。
  - `or else` 体现了“失败路径”的备用方案。用于在一个操作失败后，尝试另一个可能成功的操作。例如：先尝试从缓存读取数据，**否则就**去数据库里读。

- `and(opt_b)`
  - If the first is `Some`, **and** the second is `Some`, return the second.
  - 如果第一个是 `Some`，**并且**第二个是 `Some`，则返回第二个。
  - 逻辑“与”操作。只有两者都“成功”(`Some`)时，才算成功，并取第二个的值。任何一个 `None` 都会导致结果是 `None`。

- `or(opt_b)`
  - Return the first if it's `Some`, **or** return the second.
  - 如果第一个是 `Some` 就返回它，**或者**返回第二个。
  - 逻辑“或”操作。只要有一个“成功”(`Some`)，就返回第一个成功的值。

### 分类 4：类型转换 (Type Conversion)

这类函数的目标是：在 `Option` 和 `Result` 之间互相转换。

- `ok_or(err_value)` (`Option` 专用)
  - Make it "**Ok**", **or** provide this `err_value`.
  - 把它变成 "**Ok**"，**或者**（在它是`None`时）提供这个 `err_value`。
  - `Some(v)` -> `Ok(v)`，`None` -> `Err(err_value)`。这是将“有无”问题升级为“成败”问题的标准方法。

- `ok_or_else(err_fn)` (`Option` 专用)
  - Make it "**Ok**", **or else** execute `err_fn` to create an error.
  - 把它变成 "**Ok**"，**否则就**执行 `err_fn` 来创建一个错误。
  - `ok_or` 的惰性版本。

- `ok()` (`Result` 专用)
  - Keep only the "**Ok**" value (as `Some`), discard any `Err`.
  - 只保留 "**Ok**" 的值（并包装为 `Some`），丢弃所有 `Err`。
  - `Ok(v)` -> `Some(v)`，`Err(e)` -> `None`。当你不再关心失败的具体原因时使用。

- `err()` (`Result` 专用)
  - Keep only the "**Err**" value (as `Some`), discard any `Ok`.
  - 只保留 "**Err**" 的值（并包装为 `Some`），丢弃所有 `Ok`。
  - `Err(e)` -> `Some(e)`，`Ok(v)` -> `None`。当你只关心失败，并想对失败原因进行处理时使用。

### 总结表格

| 函数名 | 关键助记词 | 意图 |
| :--- | :--- | :--- |
| `unwrap_or` | **or** (或者) | 提供一个**值**作为备选 |
| `unwrap_or_else` | **or else** (否则就) | 提供一个**函数**来计算备选值 |
| `map` | **map** (映射) | 转换容器**内部**的值 |
| `map_or` | **map or** (映射或者) | 转换内部值，或提供一个**值**作为备选 |
| `map_or_else` | **map or else** (映射否则就) | 转换内部值，或提供一个**函数**计算备选 |
| `and_then` | **and then** (然后就) | 成功后的**链式操作** |
| `or_else` | **or else** (否则就) | 失败后的**备选操作** |
| `ok_or` | **ok or** (Ok或者) | `Option` 转 `Result`，`None`时提供错误**值** |
| `ok_or_else` | **ok or else** (Ok否则就) | `Option` 转 `Result`，`None`时调用**函数** |

希望这个详细的“翻译”列表能帮你建立起对这些函数名的直觉，从而彻底告别混淆！
