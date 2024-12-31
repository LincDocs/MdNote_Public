# Ohter

调研其他开源脚本。

和 AHK 比起来，Kanata 能找到的开源脚本少得可怜，尽管已经有3.5k。

- 1 https://github.com/ChuufMaster/kanata-kbd
  这个是Caps脚本。写法很怪，不会参考
- 0 https://github.com/breizeway/kanata/blob/main/keymap.kbd
  这个定义了四层，写得规范，可以参考
- 7 https://github.com/TransientError/windows-config/blob/9ce9b76e6cf4ae758e51e5e35251ef37c000742d/kanata/thinkie-kanata.kbd#L4
  46行，定义了两层，而且看起来是个异型键盘

## TransientError 源码剖析

怪怪的，好像是纯实验

```lisp
(defsrc
esc  f1   f2   f3   f4   f5   f6   f7   f8   f9   f10  f11  f12  home end  ins  del
  grv  1    2    3    4    5    6    7    8    9    0    -     =    bspc
  tab  q    w    e    r    t    y    u    i    o    p    [     ]    \
  caps a    s    d    f    g    h    j    k    l    ;    '          ret
  lsft z    x    c    v    b    n    m    ,    .    /               rsft
  wkup lctl lmet lalt           spc            ralt sys  rctl  pgup up   pgdn
                                                               left down rght
)

(deflayer base
  @cw     f1    f2   f3   f4   f5   f6   f7   f8   f9   f10  f11  f12   home end ins del
  grv   1     2    3    4    5    6    7    8    9    0    -    =     bspc
  tab   q     w    e    r    t    y    u    i    o    p    [    ]     \
@escWin a  @salt @dctl @fsft g    h  @jsft @kctl @lal ;    '          @retWin
  lsft  @zctl x    c    v    b    n    m    ,    .    @slashctl       rsft
  wkup  lctl  lmet lalt           spc            ralt sys  rctl @nsym up   @sym
                                                                left     down right
)

(deflayer symbols
_    _    _    _    _    _    _    _    _    _    _    _    _    _    _    _    _
  _    _    _    _    _    _    _    _    _    _    _    _    _     _
  _    S-1  S-2  S-[  S-]  S-\  _    7    8    9    S-8  _    _     _
  _    S-3  S-4  S-9  S-0  grv  _    4    5    6    +    _          _
  _    S-5  S-6  [    ]   S-grv _    1    2    3    _               _
  _    _    _    _              _              0    _    _     _    _    @unsym
                                                               _    _    _
)

(defalias 
  zctl (tap-hold 0 200 z lctl)     ;; 按住 -> 左Ctrl
  slashctl (tap-hold 0 200 / rctl) ;; 按住 -> 右Ctrl
  escWin (tap-hold 0 200 esc lmet) ;; 按200ms放开 -> 左功能键(win键)
  retWin (tap-hold 0 200 ret lmet) ;; 按200ms放开 -> 左功能键(win键)
  sym (layer-switch symbols)
  unsym (layer-switch base)
  nsym (one-shot 500 (layer-while-held symbols))
  fsft (tap-hold 0 200 f lsft)   ;; 按住 -> 左Shift
  jsft (tap-hold 0 200 j rsft)   ;; 按住 -> 右Shift
  dctl (tap-hold 100 200 d lctl) ;; 按住 -> 左Ctrl
  kctl (tap-hold 0 200 k rctl)   ;; 按住 -> 右Ctrl
  salt (tap-hold 0 200 s lalt)   ;; 按住 -> 左Alt
  lal (tap-hold 0 200 l ralt)    ;; 按住 -> 右Alt
  cw (caps-word 2000)
)
```
