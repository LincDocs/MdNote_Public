# Rust JSON Lib

参考: https://docs.rs/serde_json/latest/serde_json/

## 调研

Rust json 库调研: (by Copilot)

在Rust生态中，最常用且广泛支持JSON与字符串（str）互转的库主要有以下几个：

### serde + serde_json（最主流，工业标准）

- serde 是Rust领域事实上的序列化/反序列化框架，serde_json 则是其JSON实现。
- 支持灵活的数据结构（Value）、结构体自动映射、str 与 JSON 的相互转换。

常用用法举例：

```rust
use serde_json::{Value, from_str, to_string};

let json_str = r#"{"name": "Alice", "age": 30}"#;
// str -> JSON Value
let v: Value = serde_json::from_str(json_str).unwrap();

// JSON Value -> str
let s = serde_json::to_string(&v).unwrap();
```

支持直接与结构体（derive Serialize, Deserialize）互转。
文档：[serde_json docs](https://docs.rs/serde_json/)

### json（纯粹但功能较简单）

- 另一个较轻量的JSON库，API简单直接。
- 适合无需复杂结构体映射、只做简单JSON操作的场景。

用法示例：

```rust
let parsed = json::parse(r#"{"name": "Bob"}"#).unwrap();
let s = parsed.dump();
```

文档：[json crate docs](https://docs.rs/json/)

### miniserde（极简，适合嵌入式/无std场景）

- 更小的依赖和体积，API风格类似serde，但功能有限。
- 一般只有在对包体积和性能极度敏感时才选用。


