# (开发中) AnyBlock with chronos

## 适配 chronos 官方示例

https://github.com/clairefro/obsidian-plugin-chronos

### Quickstart

```chronos
- [1789~1799] French Revolution
- [1791~1804] Haitian Revolution
- [1776] American Declaration of Independence
```

[code(js)]

- 1789/1799 | French Revolution
- 1791/1804 | Haitian Revolution
- 1776 | American Declaration of Independence

### Syntax Overview

- [Events](https://github.com/clairefro/obsidian-plugin-chronos#events--) (`-`)
- [Periods](https://github.com/clairefro/obsidian-plugin-chronos#periods-) (`@`)
- [Points](https://github.com/clairefro/obsidian-plugin-chronos#points-) (`*`)
- [Markers](https://github.com/clairefro/obsidian-plugin-chronos#markers-) (`=`)
- [Comments](https://github.com/clairefro/obsidian-plugin-chronos#comments-) (`#`)
- [Flags](https://github.com/clairefro/obsidian-plugin-chronos#flags-) (`>`)

```chronos
- [2020] A year
- [2020-02] A month
- [2020-02-28] A day
- [2020-02-28T12] An hour
- [2020-02-28T12:30] A minute
- [2020-02-28T12:30:09] A second
```

[code(js)]

- 2020/ | A year
- 2020-02/ | A month
- 2020-02-28/ | A day
- 2020-02-28T12/ | An hour
- 2020-02-28T12:30/ | A minute
- 2020-02-28T12:30:09/ | A second
## Q

### 分组，多级列表/空时间项的含义

分组目前有两个想法，一是多级列表 (若不用，则作为多行项、子任务，都合适)，二是使用空时间项 (相当于贯穿全行)

### Toggle width !!!

感觉是个可以全局推广的块功能!

### Fake time

ISO 8601 的基础上：

无限后、无限前、未知、空


