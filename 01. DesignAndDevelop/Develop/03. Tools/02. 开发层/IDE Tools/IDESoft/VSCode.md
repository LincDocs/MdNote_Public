# VSCode

## 编辑类

### 提升效率



### 快捷键

| 快捷键       | 功能                                                |
| ------------ | --------------------------------------------------- |
| F1           | 打开VSCode命令行（不是cmd命令行），往往配合插件使用 |
| Ctrl+Shift+P | 编辑器设置的命令行                                  |

## 扩展类

### VSCode摸鱼

百度就会给你介绍很多花式摸鱼的VS插件

比如

- QQ，能让你在VSCode里聊QQ
- 小霸王
- daily anime，追番

## 界面类

### 大纲显示的筛选

优化大纲显示

① 首先我觉得排序依据选位置会好一点（默认是根据类型）

② 其次，如何在VS代码中配置python大纲模式以仅显示类和方法？

<kbd>CtrlShift</kbd> + <kbd>P</kbd>，输入：`Perferences: Open Settings (JSON)`（首选项：打开设置 (json) ）添加或修改代码：

```json
// 推荐屏蔽项：
"outline.showVariables": false,  	// 只显示到函数名，看不到变量（包括全局和类/函数的局部），图标是蓝色的[]中间有个cube
"outline.showProperties": false,	// {}里键值对的键就不显示了，图标是个灰色板手
"outline.showFunctions": false,     // ？包括方法内隐式定义的callback匿名函数，图标和类方法一样，是个紫色的cube
```

其他扩展选项：（但是话说怎么没有 outline.showVariables 项）

```json
outline.showArrays
outline.showBooleans
// outline.showClasses		// class 类，刚需
outline.showConstants
outline.showConstructors
outline.showEnums
outline.showEvents
outline.showFields
outline.showFiles

outline.showKeys
// outline.showMethods		// 类方法 (紫色立方)，刚需
outline.showModules
outline.showNamespaces
outline.showNull
outline.showNumbers
outline.showObjects
outline.showOperators
outline.showPackages
outline.showStrings
outline.showStructs
outline.showTypeParameters

outline.showFunctions		  // 函数 (紫色立方)。包括匿名函数(名字为<function>)
outline.showVariables     // 变量 (蓝色中括)。
outline.showProperties		// 属性 (灰色板手)。{}里键值对的键。一般不打开
// outline.showInterfaces	// interface 接口 (蓝色的一空一实心的)。刚需
```

### 大纲显示的筛选 (新)

新版补充：以前配置JSON是不分 User Setting、Default Setting、Workspace Setting 的，现在分了。

打开Default Setting就能看到各个配置，而且都有默认值和注释（我的似乎是默认注释就是中文的，如果不是，也可以用Comment Tranlate插件。挺清晰明了的）

```json
	// 控制大纲项是折叠还是展开。
	//  - alwaysCollapse: 折叠所有项。
	//  - alwaysExpand: 展开所有项。
	"outline.collapseItems": "alwaysExpand",

	// 使用图标呈现大纲元素。
	"outline.icons": true,

	// 对大纲元素的错误和警告使用锁屏提醒。被关闭时由 `problems.visibility` 覆盖。
	"outline.problems.badges": true,

	// 对大纲元素的错误和警告使用颜色。被关闭时由 `problems.visibility` 覆盖。
	"outline.problems.colors": true,

	// 显示大纲元素上的错误和警告。被关闭时由 `problems.visibility` 覆盖。
	"outline.problems.enabled": true,

	// 启用后，大纲将显示 `array` 符号。
	"outline.showArrays": true,

	// 启用后，大纲将显示 `boolean` 符号。
	"outline.showBooleans": true,

	// 启用后，大纲将显示 `class` 符号。
	"outline.showClasses": true,

	// 启用后，大纲将显示`constant`符号。
	"outline.showConstants": true,

	// 启用大纲时，大纲将显示 `constructor` 符号。
	"outline.showConstructors": true,

	// 启用后，大纲将显示 `enumMember` 符号。
	"outline.showEnumMembers": true,

	// 启用后，大纲将显示 `enum` 符号。
	"outline.showEnums": true,

	// 启用后，大纲将显示 `event` 符号。
	"outline.showEvents": true,

	// 启用时，大纲将显示 `field`符号。
	"outline.showFields": true,

	// 启用后，大纲将显示 `file` 符号。
	"outline.showFiles": true,

	// 启用时，大纲将显示 `function` 符号。
	"outline.showFunctions": true,

	// 启用后，大纲将显示 `interface` 符号。
	"outline.showInterfaces": true,

	// 启用后，大纲将显示 `key`符号。
	"outline.showKeys": true,

	// 启用后，大纲将显示 `method` 符号。
	"outline.showMethods": true,

	// 启用后，大纲将显示 `module` 符号。
	"outline.showModules": true,

	// 启用后，大纲将显示 `namespace` 符号。
	"outline.showNamespaces": true,

	// 启用后，大纲将显示 `null` 符号。
	"outline.showNull": true,

	// 启用后，大纲将显示 `number` 符号。
	"outline.showNumbers": true,

	// 启用后，大纲将显示 `object` 符号。
	"outline.showObjects": true,

	// 启用时，大纲显示 `operator` 符号。
	"outline.showOperators": true,

	// 启用后，大纲将显示 `package` 符号。
	"outline.showPackages": true,

	// 启用后，大纲将显示 `property` 符号。
	"outline.showProperties": true,

	// 启用后，大纲将显示 `string` 符号。
	"outline.showStrings": true,

	// 启用后，大纲将显示`struct` 符号。
	"outline.showStructs": true,

	// 启用后，大纲将显示 `typeParameter` 符号。
	"outline.showTypeParameters": true,

	// 启用后，大纲将显示 `variable` 符号。
	"outline.showVariables": true,
```

## 配置类

部分见上面界面类

尤其是可分享状态，见 [[../../../03. 管理层/02. 多文件多目录管理/辅助文件/平台配置/dot vscode]] 笔记

## 我的User Setting

LincZero的个人配置

```json
{
    // -------------- 大纲部分 --------------------------------------
    "outline.collapseItems": "alwaysCollapse",  // 折叠
    "outline.showVariables": false,     // 变量 (蓝色中括)。按需打开
    "outline.showProperties": false,    // 属性 (紫色立方)。按需打开
    // "outline.showFunctions": false,  // 函数 (灰色扳手)。这个一般都要打开，但包括匿名函数

    // 只看类则删掉注释
    // "editor.columnSelection": false, // 
    
    // "outline.showMethods": false,    // 类方法，刚需
    // "outline.showClasses": false,    // class 类，刚需
    // "outline.showInterfaces": false, // interface 接口，刚需

    // -------------- 其他部分 --------------------------------------
    "terminal.integrated.fontFamily": "monospace",
    "remote.SSH.remotePlatform": {
        "192.168.56.20": "linux"
    },
    "files.associations": {
        "*.kbd": "lisp",
        "*.ahk": "lisp"
    },

    // -------------- 扩展部分 --------------------------------------
    "commentTranslate.targetLanguage": "zh-CN",
    "commentTranslate.hover.nearShow": false,
    "commentTranslate.browse.enabled": true,
    "commentTranslate.ignore": [

        {
            "languageId": "javascript,typescript,javascriptreact,typescriptreact",
            "regular": "[\\*\\s]+"
        },
        {
            "languageId": "dart",
            "regular": "[\\s|/]+"
        }
    ],
    "commentTranslate.browse.mode": "inplace",
    "commentTranslate.sourceLanguage": "en",
}
```

