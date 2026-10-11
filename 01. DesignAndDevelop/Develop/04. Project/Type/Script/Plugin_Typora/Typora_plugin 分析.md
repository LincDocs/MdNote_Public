---
create_date: 2026-09-29
last_date: 2026-09-29
tags:
  - 源码
---
# Typora_plugin 分析

分析项目: https://github.com/obgnail/typora_plugin/

编写本文档时，使用 1.10.26 (笔者之前安装时的版本) / 1.19.8 (笔者编写文档时的最新版本) 版本

## 项目结构分析

### 项目结构

[dir]

- develop/       | 编译项目，编译插件
- plugin/        | 插件模块，包含许多不同的插件模块
- (配置类)/       | github 与 vscode 配置
  - .editorconfig
  - .github/
  - .gitattributes
  - .gitignore
- (文档类)/
  - assets/
  - AGENTS.md
  - README-cm.md
  - README.md
  - LICENSE

### 发布的压缩包结构

[dir]

- assets/
- plugin/
  - bin/
    - install_linux.sh      | linux 使用
    - install_linux_amd_x64
    - install_windows.ps1   | windows 使用
    - install_windows_amd_x64.exe
    - 报毒了怎么办.md
    - ...
  - ...
- .gitignore
- (文档类，他不应该)
- LICENSE
- README.md

### Typora 原项目结构

我们先来看看 Typora 安装后的原项目结构:

[dir]

- locales/
  - window.html
  - ...
- resources/
- swiftshader/
- ...

### 插件用法与原理

Windows 中，插件的使用方法是:

- 将发布的压缩包解压并替换到对应的位置 (包含 window.html 的目标文件夹)
  - 正式版 Typora 的相对路径为：./resources/
  - 免费版 Typora 的相对路径为：./resources/app/
- 运行该文件下的 `plugin/bin/install_windows.ps1`

脚本 (install_windows.ps1) 内容: (脚本已被添加中文注释与中文输出)

```shell
# 计算 Typora 根目录。
# 该脚本通常位于 Typora 安装目录下的 plugin/bin 中，
# 因此当前目录向上两级即为 Typora 根目录。
$rootDir = (Get-Location).Path | Split-Path -Parent | Split-Path -Parent

# Typora 旧版本资源目录：app
$appPath = Join-Path -Path $rootDir -ChildPath "app"

# Typora 新版本资源目录：appsrc
$appsrcPath = Join-Path -Path $rootDir -ChildPath "appsrc"

# Typora 主页面文件 window.html
$windowHTMLPath = Join-Path -Path $rootDir -ChildPath "window.html"

# window.html 的备份文件
$windowHTMLBakPath = Join-Path -Path $rootDir -ChildPath "window.html.bak"

# 需要注入到 window.html 中的插件脚本标签
$pluginScript = "<script src=`"./plugin/index.js`" defer=`"defer`"></script>"

# 旧版本 window.html 中原本存在的 frame.js 脚本标签
$oldFrameScript = "<script src=`"./app/window/frame.js`" defer=`"defer`"></script>"

# 新版本 window.html 中原本存在的 frame.js 脚本标签
$newFrameScript = "<script src=`"./appsrc/window/frame.js`" defer=`"defer`"></script>"

# 实际需要匹配的 frame.js 脚本标签，会根据 Typora 版本决定
$frameScript = ""

# 安装脚本 banner
$banner = @"
____________________________________________________________________
   ______                                      __            _
  /_  __/_  ______  ____  _________ _   ____  / /_  ______ _(_)___
   / / / / / / __ \/ __ \/ ___/ __ ``/  / __ \/ / / / / __ ``/ / __ \
  / / / /_/ / /_/ / /_/ / /  / /_/ /  / /_/ / / /_/ / /_/ / / / / /
 /_/  \__, / .___/\____/_/   \__,_/  / .___/_/\__,_/\__, /_/_/ /_/
     /____/_/                       /_/            /____/
                        Designed by obgnail
              https://github.com/obgnail/typora_plugin
____________________________________________________________________
"@

# 输出消息后暂停，等待用户按键，然后退出脚本
function finish {[CmdletBinding()]param ($msg) Write-Host $msg; PAUSE; Exit}

# 输出错误消息后暂停，等待用户按键，然后退出脚本
function panic {[CmdletBinding()]param ($msg) Write-Error $msg; PAUSE; Exit}

Write-Host $banner
Write-Host ""

# [1/5] 检查 window.html 是否存在
Write-Host "[1/5] 检查文件 window.html 是否存在于 $rootDir"
if (!(Test-Path -Path $windowHTMLPath)) {
    panic "window.html 不存在于 $rootDir"
}

# [2/5] 检查 app / appsrc 目录，并根据目录选择对应的 frame.js 脚本标签
Write-Host "[2/5] 检查文件夹 app/appsrc 是否存在于 $rootDir"
if (Test-Path -Path $appsrcPath) {
    $frameScript = $newFrameScript
} elseif (Test-Path -Path $appPath) {
    $frameScript = $oldFrameScript
} else {
    panic "appsrc/app 不存在于 $rootDir"
}

# 读取 window.html 的原始内容
$fileContent = Get-Content -Path $windowHTMLPath -Encoding UTF8 -Raw

# 替换内容：保留原 frame.js 脚本标签，并在其后追加插件脚本标签
$replacement = -Join($frameScript, $pluginScript)

# [3/5] 检查 window.html 内容
Write-Host "[3/5] 检查 window.html 内容"
if (!$fileContent.Contains($frameScript)) {
    panic "window.html 中不包含：$frameScript"
}
if ($fileContent.Contains($pluginScript)) {
    finish "插件已经安装，无需重复安装"
}

# [4/5] 备份 window.html
Write-Host "[4/5] 备份 window.html"
Copy-Item -Path $windowHTMLPath -Destination $windowHTMLBakPath

# [5/5] 更新 window.html
Write-Host "[5/5] 更新 window.html"

# 将原 frame.js 脚本标签替换为：frame.js 脚本标签 + 插件脚本标签
$newFileContent = $fileContent -Replace [Regex]::Escape($frameScript), $replacement

# 将修改后的内容写回 window.html
Set-Content -Path $windowHTMLPath -Value $newFileContent -Encoding UTF8

finish "插件安装成功"
```

简单概括就是找到 html 文件，在 `frame.js` 脚本标签的后面 追加一个引用自己的脚本的 `<script>` 标签。

### 插件分类系统

obgnail/typora_plugin 的插件类别分为:

- 导航与管理
- 编辑增强
- 组件
- 视图与主题
- 高级功能

## 贡献

其插件的开发与项目无关，这点很好。

你只需要仿照已有插件来编写插件文件，然后放到项目的 `plugin/` 文件夹内并PR。

例如仿照 [chart](https://github.com/obgnail/typora_plugin/blob/master/plugin/chart/index.js) 插件。

项目编译时，就会将插件一同编译起来。











