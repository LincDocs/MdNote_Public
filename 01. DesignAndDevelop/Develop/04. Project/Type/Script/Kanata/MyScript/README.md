# Kanata script

## 调研其他开源脚本

和 AHK 比起来，Kanata 能找到的开源脚本很少，尽管已经有3.5k。推荐搜索策略：`kanata .kbd`

## 官方类别

首先是官方是有提供一部分示例的：

[dir]

- cfg_samples/             | [link](https://github.com/jtroo/kanata/blob/main/cfg_samples/)
  - tray-icon/             | 
    - tray-icon.kbd        | 
  - all_keys_in_defsrc.kbd | 所有按键名的表，用于在defsrc中使用
  - artsey.kbd             | 
  - chords.tsv             | 
  - colemak.kbd            | 
  - deflayermap.kbd        | 单独指定几个热键
  - f13_f24.kbd            | 增加f12~f24按键
  - fancy_symbols.kbd      | 
  - home-row-mod-advanced.kbd | 
  - home-row-mod-basic.kbd | 
  - included-file.kbd      | 
  - jtroo.kbd              | 也许是作者自用的示例
  - kanata.kbd             | 教程类示例 (很长，几乎把所有用法都试了一遍) aaaa aaaa aaaa aaaa aaaa
  - key-toggle_press-only_release-only.kbd
  - minimal.kbd            | 最小示例
  - simple.kbd             | 简单示例

### Kanata.kbd、Minimal.kbd、Simple.kbd

这几个可以见原链接，也可以见该笔记同目录下的另外几个笔记

## 第三方类别

然后是一些在github搜索出来的真实案例：

- 首先是我自己的调研后写的 https://github.com/LincZero/LincZero-Help-Oneself/blob/main/Kanata/
  也是Caps脚本
- 1 https://github.com/ChuufMaster/kanata-kbd
  这个是Caps脚本。写法很怪，不会参考
- 0 https://github.com/breizeway/kanata/blob/main/keymap.kbd
  这个定义了四层，写得规范，可以参考
- 7 https://github.com/TransientError/windows-config/blob/9ce9b76e6cf4ae758e51e5e35251ef37c000742d/kanata/thinkie-kanata.kbd#L4
  46行，定义了两层，而且看起来是个异型键盘

这部分详见 [./Other.md](./Other.md)