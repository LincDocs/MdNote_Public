---
create_date: 2025-09-30
last_date: 2025-09-30
author: LincZero
---
# Option/Result、Some()/None/Ok()/Err()

## 总结两种特殊枚举

这两个是**特殊枚举**

总结下来就是:

- option
  - Some()
  - None
- Result
  - Ok()
  - Err()

示例

```rust
let maybe_num: Option<i32> = Some(5); // 有值
let no_num: Option<i32> = None;       // 无值
```

```rust
let good: Result<i32, &'static str> = Ok(5);     // 成功，返回值为5
let bad: Result<i32, &'static str> = Err("err"); // 失败，错误信息"err"
```

## 通用枚举/嵌套特殊枚举

可以用**通用枚举**来表示，或者弄个复杂的场景:

我想要一个结果可能是 number/i32/Ok/Err/None 这五种可能

```rust
enum MyResult {
    Number(i32),
    Ok,
    Err(String), // 这里假设错误用字符串表示
    None,
}
```

还有另一种做法是：(rust可能更推荐这种)

```rust
// 代表可能没有结果，或者有一个 Result
type MaybeResult = Option<Result<i32, String>>;

// 用法示例
let a: MaybeResult = Some(Ok(42));        // 有值且成功
let b: MaybeResult = Some(Err("fail".into())); // 有值但失败
let c: MaybeResult = None;                // 无值
```

这样你就能表达三种状态：

- None（无结果）
- Some(Ok(i32))（有结果且成功）
- Some(Err(String))（有结果但失败）

## Result的Err位类型

Result Err 位值通常的表示:

`Err("xxx")` 可以是 `Box<dyn std::error::Error>` 或 `&'static str`

