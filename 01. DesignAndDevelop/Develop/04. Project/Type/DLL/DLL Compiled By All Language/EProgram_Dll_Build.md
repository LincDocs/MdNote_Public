# DLL Compiled By All Language

# 目录

# EProgram_Dll_Build

参考：[【博客园】易语言调用外部DLL详细实例教程](https://www.cnblogs.com/wurendao/p/10959007.html)

## 工程模板

程序 > 新建 > Windows动态链接库

```c++
.版本 2

.程序集 程序集1

.子程序 _启动子程序, 整数型, , 请在本子程序中放置动态链接库初始化代码

_临时子程序 ()  ' 在初始化代码执行完毕后调用测试代码
返回 (0)  ' 返回值被忽略。

.子程序 _临时子程序

' 本名称子程序用作测试程序用，仅在开发及调试环境中有效，编译发布程序前将被系统自动清空，请将所有用作测试的临时代码放在本子程序中。 ***注意不要修改本子程序的名称、参数及返回值类型。

```

## 修改工程

然后右键新建一个子程序或者用快捷键：Ctrl+N 。然后写上代码。

> 子程序名 ：这个方法的名称。也是后面调用需要用到的哦。
>
> 返回值类型：自己根据需求填写。
>
> **公开：这个必须打钩，不然会调用不到。**

```c++
.版本 2

.子程序 EProgramDll, 文本型, 公开
.参数 str1, 文本型
.参数 str2, 文本型

返回 (str1 ＋ str2)

```

## 编译

菜单 > 编译 > 静态编译

结果就生成一个dll文件，没其他文件生成

EProgramDll.dll

```c++
// Dependencies查看
|Name              |Ordinal|VA    |
|------------------|-------|------|
|EProgramDll       |1      |0x1140|
```













