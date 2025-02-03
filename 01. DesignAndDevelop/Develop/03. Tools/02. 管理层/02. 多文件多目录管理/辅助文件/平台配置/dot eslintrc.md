# .eslintrc

## 介绍

从名字来看，`eslint` 就是代码风格检查的一个工具，`rc` 就是运行配置 `running configuration` (这点与 `.npmrc` 一样)

> [!note]
> GPT: 在 .npmrc 和 .eslintrc 中，rc 是一种命名约定，其含义可以追溯到 Unix 系统的早期。它最初来源于 CTSS（Compatible Time-Sharing System）中的 runcom 命令脚本功能。在 Unix 系统中，rc 常被用作配置文件的后缀，表示这些文件用于配置程序的运行参数

## 使用

### 使用 - vscode插件方式

安装插件：eslint

对应 `.vscode/extensions.json`

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint"
    ]
}
```

### 使用 - npm包命令

> [!warning]
> 我一般用vscode版，这个很少用。这里我找了一个仓库的做法来写笔记，未验证

[# package.json]

```json
"scripts": {
  "lint": "eslint --cache .",
  "lint:fix": "eslint --cache --fix .",
},
"devDependencies": {
  // 这里感觉有一些是非必须的
  "@antfu/eslint-config": "^3.12.1",
  "@unocss/eslint-config": "^0.65.3",
  "@unocss/eslint-plugin": "^0.65.3",
  "eslint": "^9.17.0",
}
```

### 使用 - github工作流检查方式

略

反正是可以的，可以规范他人的PR。等我下次用到还记得的话，再来补充

## 配置

### 边使用边配置，调试和修改 (建议)

如果你碰到了不想改/认为报错有问题的烦人报错，你可以先鼠标悬浮。他会告诉你这是 eslint 的哪条规则，导致了这里检查有问题。

此时你可以复制规则名，黏贴到 `.eslintrc` 里面的 rule 项，并设置为 `off` (`error` 表示报错，`off` 表示关闭该检查)

### 配置表查询

可参考官网文档： https://typescript-eslint.io/rules/ 这里列举了所有规则名与其详情

### 我的常用配置

[# .eslintrc]

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": { "node": true },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ], 
  "parserOptions": {
      "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-inferrable-types": "off", // 允许冗余的类型标注便于美观对齐 let origi_colCount: number = 0;
    "no-constant-condition": "off", // 允许 while(true) 写法
    // "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
    "@typescript-eslint/no-unused-vars": "off", // (可选) 允许声明未使用的变量
    "prefer-const": "error", // 不允许不变动的变量不使用const
  } 
}
```

话说好像有另一个文件也能配置：

[# eslint.config.js]

```js
import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  ignores: [
    '**/*.md',
    '**/*.yaml',
    '**/*.yml',
  ],
})
```

