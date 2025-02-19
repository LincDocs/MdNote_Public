# Kanata 调试技巧、踩坑

## 使用非gui的版本

有时报错信息不完全，很难知道哪里错了。此时不要用 `kanata_gui.exe`，而是换用 `kanata.exe`

前者的报错信息在右下角的通知栏里，信息又少干扰。而后者的报错信息在控制台里，错误信息给得较多。

## 例如

例如我使用 `(clipboard-cmd-set powershell.exe -c "$v = ($Input | Select-Object -First 1)")` 语句，报错后前者就没看出来是什么原因，后者才告诉我说是：`cmd is not enabled for this kanata executable. Use a cmd_allowed prebuilt executable or compile with the feature: cmd.`

~~然后我加上这个就好了：~~

```lisp
;; [danger-enable-cmd](https://github.com/jtroo/kanata/blob/main/docs/config.adoc#danger-enable-cmd)
(defcfg
  danger-enable-cmd yes
)
```

然后我换用 `cmd_allowed` 版本就好了

## 踩坑：cmd问题

- 不支持cmd的版本
    - kanata.exe
    - kanata_gui.exe
- 支持cmd的版本
    - kanata_cmd_allowed
    - kanata_gui_cmd_allowed