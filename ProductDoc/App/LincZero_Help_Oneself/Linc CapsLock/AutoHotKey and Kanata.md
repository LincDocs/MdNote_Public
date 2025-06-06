# AutoHotKey and Kanata

AHK and KBD

其他链接：

- 见仓库 https://github.com/LincZero/LincZero-Help-Oneself 里面的对应目录，这里包含了源项目，以及一些README文档
- 见具体的AHK或Kanata脚本文件夹内的README文件以及脚本内注释，也有部分说明
- 见 [Kanata](../../../01.%20DesignAndDevelop/Develop/04.%20Project/Type/Script/Kanata/README.md)、[AutoHotKey](../../../01.%20DesignAndDevelop/Develop/04.%20Project/Type/Script/AutoHotKey/) 相关的笔记，有一些学习经验

## Kanata - MyScript

我自己目前主力的脚本，见： https://github.com/LincZero/LincZero-Help-Oneself

里面有 AutoHotKey 和 Kanata 的脚本，功能大差不差，以前用AHK，后来为了跨平台转Kanata

功能介绍：

```lisp
;; 辅助记忆学习表，左上从数字6开始。如遇部分字符显示不正常，可能是字体不支持。最好是用VSCode打开该说明
;; 
;; 原Caps层       行层(扩大范围)  页层 (扩大范围到页)  词层略，和行层差不多
;; 6️⃣🟦🟦🟦🟦  6️⃣🟦🟦🟦🟦  6️⃣🟦🟦🟦🟦
;; ⏫🔼🔙🔜🟦  ⏫⏫🔚🔜🟦  ⏫🔼🔙🔜🟦
;; ⏪️◀️🔽▶️⏩️  ⏪️⏪️⏬⏩️⏩️  ⏫⏪️🔽⏩️⏬
;; 🟦🟦⏬🟦🟦  🟦🟦⏬🟦🟦  🟦🟦⏬🟦🟦

;;零层
;;零　  一　  二　  三　  四　  五　 | 六　  七　  八　  九　  十　  十一  十二  　　 
;;一　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　　 
;;二　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　　 
;;三　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　
;;一层  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  符层  　　  　　 
;;五　  　　  　　  　　  　　  空格 | 　　  　　  　　  　　  连点  　　  　　  　　 
;;

;;一层
;;零　  一　  二　  三　  四　  五　 | 六　  七　  八　  九　  十　  十一  十二
;;一　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　
;;二　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　
;;三　  　　  　　  数层  页层  　　 | 　　  上　  前删  后删  　　  　　  　
;;四　  　　  　　  词层  行层  词层 | 最左  左　  下　  右　  最右  　
;;五　  　　  　　  　　  　　  回车 | 　　  　　  　　  　　  　
;;

;;行层
;;零　  一　  二　  三　  四　  五　 | 六　  七　  八　  九　  十　  十一  十二
;;一　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　
;;二　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　
;;三　  　　  　　  　　  　　  　　 | 　　  上　  行删  行删  　　  　　  　
;;四　  　　  　　  　　  　　  选行 | 最左  最左  下　  最右  最右  　
;;五　  　　  　　  　　  　　  复制 | 　　  　　  　　  　　  　
;;

;;页层
;;零　  一　  二　  三　  四　  五　 | 六　  七　  八　  九　  十　  十一  十二
;;一　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　
;;二　  　　  　　  　　  　　  　　 | 　　  　　  　　  　　  　　  　　  　　  　
;;三　  　　  　　  　　  　　  　　 | 　　  上页  前删  后删  　　  　　  　
;;四　  　　  　　  　　  　　  　　 | 最上  左页  下页  右页  最下  　
;;五　  　　  　　  　　  　　  复制 | 　　  　　  　　  　　  　
;;

;;数层
;;esc   f1    f2    f3    f4    f5  | f6    f7    f8    f9    f10   f11   f12
;;grv   -     -     -     -     -   | -     nlck  /     *     bspc  -     -     -
;;tab   -     -     -     -     -   | /     7     8     9     -!    (     )     -
;;caps  -     -     -     -     -   | *     4     5     6     +     -     -
;;lsft  -     -     -     -     ^   | .     1     2     3     =     ret
;;-     -     -                 0   |             -     -     -
;;

;;符层
;;esc   f1    f2    f3    f4    f5  | f6    f7    f8    f9    f10   f11   f12
;;grv   -     -     -     -     -   | 「」   -     -     -     -     -     -     -
;;tab   !     ?     -     /     -!  | 《》  {}    ```    -     -
;;caps  -     ……    -     *     +   | “”    ()    `   -     -
;;lsft  -     -     -     .     =   | 【】  []    -   -
;;-     -     -                 0   |             -     -     -
;;
```
