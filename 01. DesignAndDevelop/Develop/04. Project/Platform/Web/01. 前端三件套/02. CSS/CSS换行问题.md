---
create_time: 2024-10-10
Author: LincZero
---

# CSS换行问题

## 场景

> 之前弄AnyBlock的块宽度很多都是不满100%的（包括表格单元格、卡片、时间线等），在窄区域中显示多文本时经常需要使用换行

## 相关属性

(不全是换行有关的属性，也将一些容易混淆的属性加进去了)

[dir]

- white-space    | 定义了空白符（空格、制表符等）如何处理以及文本是否应该换行
  - normal       | 空白符**会**被折叠，**会**自动换行，*默认且适用大部分文本*
  - nowrap       | 空白符**会**被折叠，**不允许**换行 (*可能溢出容器*)，*有换行符也不允许换行*
  - pre          | 空白符**不**被折叠，**不**自动换行 (*可能溢出容器*)，*常用于显示代码*
  - pre-wrap     | 空白符**不**被折叠，**会**自动换行
  - pre-line     | 空白符**会**被折叠，**会**自动换行，很像normal
  - break-spaces | 空白符**不**被折叠，**会**自动换行，很像pre-wrap
- word-break     | 长单词或者英文单词应该如何断行
  - normal       | 不允许跨单词断行，只允许在单词间的空格断行
  - break-all    | 允许在任何字符间断行，这可能不符合某些语言的习惯
  - keep-all     | 对于东亚语言，默认为 `normal`，其他情况下不允许跨汉字断行
- ~~word-wrap~~      | (将废弃，用overflow-wrap代替)
- overflow-wrap  | 这个属性与 `word-break` 类似，控制*长单词或URL*能否在无法完全适应一行时断开
  - normal       | 不允许跨单词断开 (*可能溢出容器*)，同 `word-break: normal`
  - anywhere     | 逢单词断开
  - break-word   | 允许长单词或URL在无法适应一行时断开
- overflow       | 当一个元素的内容溢出其框模型时的行为
  - visible
  - hidden
  - scrool
  - auto
- text-overflow  | 当 `overflow` 设置为 `hidden` 并且内容仍然溢出时，此属性定义了如何渲染溢出的内容
  - clip
  - ellipsis
- word-spacing   | 用于增加或减少单词之间的空间

> [!warning]
> The property was originally a nonstandard and unprefixed Microsoft extension called `word-wrap`, and was implemented by most browsers with the same name. It has since been renamed to `overflow-wrap`, with `word-wrap` being an alias.

## 总结

……

