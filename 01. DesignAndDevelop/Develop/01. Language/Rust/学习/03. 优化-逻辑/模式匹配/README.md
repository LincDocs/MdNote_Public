# README

## Rust的条件判断的简洁之道

Author: LincZero

### if else 写法

```rust
let result = data.get_by_id(&id);
if result.is_some() {
    Json(result.unwrap().clone()).into_response()
} else {
    StatusCode::NOT_FOUND.into_response()
}
```

### match 写法

```rust
let result = data.get_by_id(&id);
match result {
    Some(result) => {
        Json(result.clone()).into_response()
    },
    None => {
        StatusCode::NOT_FOUND.into_response()
    }
}
```

### 三元运算符 写法

这里不适合转换为此写法，略

```rust
let result = if condition { value_if_true } else { value_if_false };
```

### 链式 写法

Rust有很多类似三元运算符的链式方法……

- 缺点: 平添了很多 “新语法” (不利于不会该语言的人看懂代码)，而不是无脑地 “if else”
- 优点: 熟练使用后，代码真的能变得很简洁 (前提是熟练看懂)

链式语法相较于普通多行语法的表达特征：

- 能表达一个变量在所有权不变的情况下经历多个环节。而普通的多行语法无法表现这一特征，可能会在其中发生所有权向函数的转移

> 与其他语言对比：
> 
> 很多语言都没这个特性。typescript倒有个。
> 
> - 三元运算符: `conf ? yes : no`
> - 空运算符: `optionValue ?? newValue`
>   
> 后者就类似于 rust 的 unwrap_or

#### map_or, map_or_else

- `map_or(default, func)`：`Some` 时应用函数，`None` 时返回默认值。
- `map_or_else(default_closure, func)`：延迟计算默认值（适合开销大的操作）。

#### unwarp_or, unwrap_or_else

```rust
data.get_by_id(&id)
    .map_or_else(
        || StatusCode::NOT_FOUND.into_response(),
        |result| Json(result.clone()).into_response()
    )
```

或

```rust
data.get_by_id(&id)
    .map(|result| Json(result.clone()).into_response())
    .unwrap_or_else(|| StatusCode::NOT_FOUND.into_response())
```

### 比较 `map_or`, `unwarp_or`, `and_then`, `or_else`

比较map_or map_or_else unwarp_or unwarp_or_else，一般应该用哪种，上面的例子中推荐用哪种？

在 Rust 中处理 `Option<T>` 时，有几种方式可以处理 Some/None 情况：


在 Rust 中，`Option` 和 `Result` 类型提供了一系列组合方法（combinators）来处理值或错误。以下是 `map_or`/`map_or_else`、`unwrap_or`/`unwrap_or_else`、`and_then`/`or_else` 的详细说明、使用方法和比较。

#### 方法比较

[exTable]

| 方法               | IO行为                                                        | 典型用途                     |
| ---------------- | ----------------------------------------------------------- | ------------------------ |
| `map_or`         | `Some(value)` → `f(value)` 结果<br>`None` → 默认值               | 转换值 + 处理缺失               |
| `map_or_else`    | ^                                                           | 同上，但默认值通过闭包延迟计算<br>即惰性求值 |
| `unwrap_or`      | `Some(value)` → `value` (解包)<br>`None` → 默认值                | 简单解包并提供后备值               |
| `unwrap_or_else` | ^                                                           | 同上，但默认值通过闭包延迟计算<br>即惰性求值 |
| `and_then`       | `Some(value)` → `f(value)` 结果<br>`None` → `None` (不变,保持,传播) | 链式操作（如多次解析）              |
| `or_else`        | `Some(value)` → `value`<br>`None` → `f()` 结果 (闭包恢复)         | 错误恢复或后备方案                |

#### 原型

```rust
// 立即提供默认值
fn map_or<U, F>(self, default: U, f: F) -> U
where
    F: FnOnce(T) -> U;

// 通过闭包延迟生成默认值
fn map_or_else<U, D, F>(self, default: D, f: F) -> U
where
    D: FnOnce() -> U,
    F: FnOnce(T) -> U;

// 立即提供默认值
fn unwrap_or(self, default: T) -> T;

// 通过闭包延迟生成默认值
fn unwrap_or_else<F>(self, f: F) -> T
where
    F: FnOnce() -> T;

// 链式操作：Some → 应用函数生成新 Option
fn and_then<U, F>(self, f: F) -> Option<U>
where
    F: FnOnce(T) -> Option<U>;

// 错误处理：None → 尝试恢复
fn or_else<F>(self, f: F) -> Option<T>
where
    F: FnOnce() -> Option<T>;
```


