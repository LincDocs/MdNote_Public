---
create_time: 2025-03-20
Author: LincZero
---

# toml

TOML (全称: Tom 的显而易见的最小化语言, **T**om’s **O**bvious, **M**inimal **L**anguage)

> [!note]
> 2022年底时我调研和比较过一次，当时并没有很在意，因为很少见到这个格式，还是其他几个占主流 (json > yml > ini)。现在是2025年初。我发现在环境中越来越多的toml文件，重新调研一下

## 个人选用

我个人的感觉是：

- json 的不支持注释，在我看来是最难受的点，其次是手动编辑困难，难以手打
- ini 的不支持嵌套结果，在我看来是最难受的点
- 然后就是比较toml和yml了。
  yml我其实感觉挺不错的，特别是其完全兼容json的特性，更易于会json的人迁移学习。
  toml暂时看来也还不错

## 简单调研

为什么现在很多像python、rust等，都选择使用toml，相较于其他的几个，有什么优点？

近年来，TOML（Tom's Obvious, Minimal Language）逐渐成为许多语言和工具的首选配置文件格式。
- 如 Python 的 `pyproject.toml`
- 如 Rust 的 `Cargo.toml`

相较于 JSON、INI、YAML 等传统格式，TOML 在以下方面具有显著优势：

### 一、对比各格式特性

| 特性     | TOML         | JSON                  | INI            | YAML                     |
| ------ | ------------ | --------------------- | -------------- | ------------------------ |
| 可读性    | **高**（无缩进依赖） | 中（语法严格）               | **高**（简单键值对）   | **高**（依赖缩进）              |
| 注释支持   | ✅            | ❌                     | ✅（仅 `;` 或 `#`） | ✅                        |
| 数据类型支持 | 丰富（含日期）      | 基础类型                  | 仅字符串           | 丰富（含复杂对象）                |
| 嵌套结构   | ✅（表与数组表）     | ✅（多层嵌套）               | ❌              | ✅                        |
| 语法复杂度  | 低（明确规则）      | 中（严格符号）               | 极低             | 高（缩进敏感）                  |
| 解析性能   | **高**        | **高**                 | **高**          | 低（复杂解析）                  |
| 压缩率    | 中            | 较高<br>(重复符号用<br>压缩算法) | 低<br>(内容本来就少)  | 中高<br>(`-:` 有一定<br>的重复性) |

### 二、TOML 的核心优势

- 人类友好与机器友好的平衡  
   - 直观语法：类似 INI 的键值对结构，但支持更复杂的数据类型（如表、数组、日期），无需缩进或符号干扰。
   - 注释自由：允许用 `#` 添加说明，适合配置文件的场景需求。
   - 明确类型：直接标注类型（如 `2023-10-01` 自动识别为日期），避免 YAML 中因格式模糊导致的解析错误。
- 强表达力与低复杂度  
   - 嵌套结构：通过 `[table]` 和 `[[array.table]]` 实现层级，比 INI 的节更灵活，比 JSON/YAML 的嵌套更易读。
   - 丰富类型：支持字符串、数值、布尔值、日期、数组、内联表等，覆盖常见配置需求。
- 解析与生态优势  
   - 高效解析：语法规则简单明确，解析器实现轻量（如 Rust 的 `toml` 库、Python 的 `tomli`），启动速度快。
   - 工具链支持：被 Cargo、Poetry、Rustfmt 等主流工具原生支持，社区工具（如 `dprint`）普遍兼容。
- 规避 YAML/JSON 的痛点  
   - 无缩进陷阱：YAML 的缩进和符号（如 `:` 和 `-`）容易因空格问题导致解析失败。
   - 无冗余符号：JSON 的引号、逗号对人工编写不友好，且不支持注释。
   - 无隐式类型转换：YAML 中类似 `yes` 被解析为布尔值的问题，在 TOML 中需显式使用 `true`。

### 三、各格式适用场景

- TOML：**项目配置**（如包元数据、工具链设置）、需兼顾可读性和结构化的场景。
- JSON：**数据交换**（API 通信）、需要严格结构的自动化生成场景。
- YAML：**复杂配置**（Kubernetes 部署文件）、强调可读性且需深度嵌套的场景。
- INI：**简单配置**（小型应用设置）、仅需扁平键值对的场景。

### 四、为何 Python/Rust 等转向 TOML？

- 配置文件的核心需求  
   项目配置（如 `pyproject.toml` 或 `Cargo.toml`）需要满足：
   - 人工可读可维护（开发者常直接编辑）
   - 类型清晰无歧义（避免部署错误）
   - 轻量级无依赖（减少工具链负担）
- TOML 的精准匹配  
   - 通过 `[tool.poetry]` 等表结构，明确划分工具专属配置。
   - 支持版本号、依赖列表等复杂类型，无需手动处理字符串。
   - 社区工具链（如 PEP 621）直接集成解析支持，降低适配成本。

### 总结

TOML 凭借 **简洁性**、**明确性** 和 **适度的表达力**，成为现代语言生态中配置文件的首选。它规避了 JSON 的机械性、YAML 的复杂性和 INI 的功能不足，在开发者体验与机器效率之间找到了最佳平衡点。

## demo

简单学习demo

```toml
# 注释以 # 开头

# 键值对（基本类型）
title = "TOML 示例"
port = 8080
enable_logging = true
start_date = 2023-10-01  # 日期类型自动识别

# 表（嵌套配置）
[database]
host = "localhost"
user = "admin"
ports = [8000, 8001, 8002]  # 数组

# 数组表（多组同类配置）
[[servers]]
name = "server_a"
ip = "192.168.1.1"

[[servers]]
name = "server_b"
ip = "192.168.1.2"
```

进阶学习

```toml
# 多级嵌套表
[app.metadata]
author = "Alice"
tags = ["web", "backend"]

# 混合类型数组
mixed_array = [1, "two", false, { key = "value" }]

# 多行字符串
description = """
这是多行文本，
支持换行和 "引号" 无需转义。
"""

# 环境变量覆盖（某些解析器支持）
[env]
PATH = "/usr/bin"  # 默认值
```

让 copilot 帮我生成了一个稍复杂的demo

```toml
# This is a TOML document.

title = "TOML Example"

[owner]
name = "LincZero"
dob = 1980-01-01T00:00:00Z

[database]
server = "192.168.1.1"
ports = [8001, 8001, 8002]
connection_max = 5000
enabled = true

[servers]

  # Indentation (tabs and/or spaces) is allowed but not required
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"
  country = "China"
  [servers.beta.backup]
  ip = "10.0.0.3"
  dc = "eqdc10"

[clients]
data = [["gamma", "delta"], [1, 2]]
hosts = [
  "alpha",
  "omega"
]

# Multi-line strings are supported
multiline_string = """
This is a
multi-line string.
"""

# Inline tables are useful for compact data representation
inline_table = { key1 = "value1", key2 = 2, key3 = true }

# Arrays of tables
[[products]]
name = "Hammer"
sku = 738594937

[[products]]
name = "Nail"
sku = 284758393
color = "gray"
```

## 解析

- **Python**：使用 `tomli` 或 `tomllib`（Python 3.11+ 内置）
- **Rust**：使用 `toml` crate








