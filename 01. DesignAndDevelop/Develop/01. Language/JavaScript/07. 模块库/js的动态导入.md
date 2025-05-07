---
create_time: 2025-05-03
---
# js的动态/条件/按需导入

## 需求

有时候，我们的代码会编译到多平台，然后每个平台使用不同的依赖包。这时候我们就会希望有像 C 语言的条件宏，进行条件导入。

再或者，我们不希望一开始就导入太多内容，拖慢速度。而且一些依赖也不一定能用得上，于是希望动态加载、按需加载。

此外，JS主流的模块系统有两个：ESM 和 CJS，`import` 和 `require` 语法的不同，也给我们的这一需求增加复杂度。

总结：动态导入可以用于以下场景：

- 按需加载第三方库
- 懒加载组件
- 条件加载模块

## ECMAScript 动态导入表达式

参考：

- [MDN Web Docs - import() 动态导入](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import)
- [动态导入表达式](https://jkchao.github.io/typescript-book-chinese/project/dynamicImportExpressions.html)
- [ECMAScript 2020 (ES11) 中的动态导入：实现代码按需加载](https://www.javascriptcn.com/post/65123b7595b1f8cacdaa6505)

### 介绍

动态导入表达式是 ECMAScript 的一个新功能，它允许你在程序的任意位置异步加载一个模块。

TC39 JavaScript 委员会有一个提案，目前处于第四阶段，它被称为 [import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import) 。

### 基本用法

```js
import(/* webpackChunkName: "momentjs" */ 'moment')
  .then(moment => {
    // 懒加载的模块拥有所有的类型，并且能够按期工作
    // 类型检查会工作，代码引用也会工作  :100:
    const time = moment().format();
    console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
    console.log(time);
  })
  .catch(err => {
    console.log('Failed to load moment', err);
  });
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": [
      "dom",
      "es5",
      "scripthost",
      "es2015.promise"
    ],
    "jsx": "react",
    "declaration": false,
    "sourceMap": true,
    "outDir": "./dist/js",
    "strict": true,
    "moduleResolution": "node",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "types": [
      "node",
      "react",
      "react-dom"
    ]
  }
}
```

> [!ERROR]
> 
> - 使用 `"module": "esnext"` 选项：TypeScript 保留 `import()` 语句，该语句用于 Webpack Code Splitting。
> - 进一步了解有关信息，推荐阅读这篇文章：[Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4.](https://blog.josequinto.com/2017/06/29/dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4/)

### Demo、场景例子

下面按场景来举例

#### 按需加载第三方库

```js
import('lodash/debounce')
  .then((debounce) => {
    // 使用 debounce 函数
  })
  .catch((error) => {
    // 加载模块失败，处理错误
  });
```

#### 懒加载组件

```js
// www.javascriptcn.com code example
button.addEventListener('click', () => {
  import('./lazyComponent')
    .then((lazyComponent) => {
      // 使用 lazyComponent 组件
    })
    .catch((error) => {
      // 加载模块失败，处理错误
    });
});
```

#### 条件加载模块

```js
// www.javascriptcn.com code example
if (userChoice === 'A') {
  import('./moduleA')
    .then((moduleA) => {
      // 使用 moduleA 模块
    })
    .catch((error) => {
      // 加载模块失败，处理错误
    });
} else if (userChoice === 'B') {
  import('./moduleB')
    .then((moduleB) => {
      // 使用 moduleB 模块
    })
    .catch((error) => {
      // 加载模块失败，处理错误
    });
}
```

## CJS 动态导入

CJS（require）：

`require` 是同步加载，但可通过动态路径实现条件导入：

```javascript
if (condition) {
 const module = require('./module.cjs');
}
```

## 编译期判断

动态/条件/按需引入的一个应用场景是：条件加载模块

但如果条件是固定的，那么我们可能希望在编译期就去除相关代码。否则动态引入无法解决一个问题：打包时依然会将不需要的包打包走。这会导致打包体积变大

解决：好像有一些方案，如webpack插件之类的。但感觉都不是很方便

## 其他 (via deepseek)

在 JavaScript 开发中，动态导入（Dynamic Imports）和按需加载（Lazy Loading）是优化性能、适配多平台场景的关键技术。以下是实现这类需求的完整方案，涵盖语法、跨模块系统兼容性、性能优化及实际应用场景。

### JavaScript 动态/条件/按需导入的实现与优化

在 JavaScript 开发中，动态导入（Dynamic Imports）和按需加载（Lazy Loading）是优化性能、适配多平台场景的关键技术。以下是实现这类需求的完整方案，涵盖语法、跨模块系统兼容性、性能优化及实际应用场景。

#### 一、动态导入的核心语法

动态导入通过 `import()` 函数实现，返回一个 `Promise` 对象，支持异步加载模块。其核心语法如下：

```javascript
// 动态加载模块
import('./module.js')
  .then(module => {
    // 使用模块
    module.doSomething();
  })
  .catch(error => {
    // 处理错误
    console.error('加载失败:', error);
  });

// 结合 async/await
async function loadModule() {
  try {
    const module = await import('./module.js');
    module.doSomething();
  } catch (error) {
    console.error('加载失败:', error);
  }
}
```

动态导入的优势包括：

1. 减少初始加载时间：仅在实际需要时加载模块。
2. 代码分割：配合 Webpack 等工具，自动拆分代码为独立 chunk。
3. 跨平台适配：根据运行时条件（如平台类型）动态选择模块路径。

#### 二、条件导入的实现

##### 1. 多平台适配

通过动态路径实现条件导入，例如根据环境变量选择不同模块：

```javascript
// 根据平台动态加载模块
const platform = 'web'; // 假设当前平台为 Web
const modulePath = `./modules/${platform}-module.js`;
const module = await import(modulePath);
```

##### 2. 条件触发加载

在特定用户交互或逻辑分支中触发加载：

```javascript
// 用户点击按钮时加载模块
button.addEventListener('click', async () => {
  const utils = await import('./utils.js');
  utils.handleClick();
});
```

#### 三、跨模块系统（ESM 与 CJS）的兼容性

1. ESM（静态导入）：  
   静态 `import` 在编译时解析依赖，无法动态调整路径。仅适用于明确依赖的场景。

2. CJS（require）：  
   `require` 是同步加载，但可通过动态路径实现条件导入：
   ```javascript
   if (condition) {
     const module = require('./module.cjs');
   }
   ```

3. 兼容性方案：  
   - 统一使用动态 `import()`：ESM 和 CJS 均支持该语法（需 Babel 转译旧环境）。
   - 条件导出：在 `package.json` 中通过 `exports` 字段定义不同环境的入口：
     ```json
     {
       "exports": {
         "browser": "./browser-module.js",
         "node": "./node-module.js"
       }
     }
     ```

#### 四、性能优化策略

1. 代码分割与缓存  
   - Webpack 配置：使用 `SplitChunksPlugin` 分割代码，减少初始包体积。
   - 预加载/预取：通过魔法注释优化加载时机：
     ```javascript
     import(/* webpackPreload: true */ './critical-module.js');
     import(/* webpackPrefetch: true */ './future-module.js');
     ```

1. 错误处理  
   确保捕获加载失败的情况：
   ```javascript
   import('./module.js')
     .then(module => { /* ... */ })
     .catch(error => {
       // 降级方案：加载备用模块或提示用户
       console.error('模块加载失败，启用备用逻辑');
       import('./fallback-module.js');
     });
   ```

2. Tree-Shaking 限制  
   动态导入的模块默认不支持 Tree-Shaking。解决方案：
   - 在动态模块中仅导出必要内容。
   - 使用 `/*#__PURE__*/` 标注辅助静态分析。

#### 五、高级应用场景

1. 路由懒加载（React/Vue）  
   结合前端路由实现按需加载：
   ```javascript
   // React Router 示例
   const Home = lazy(() => import('./routes/Home'));
   ```

2. 模块联邦（Micro Frontends）  
   通过 Webpack 5 的模块联邦动态加载远程模块：
   ```javascript
   // 加载远程模块
   const remoteModule = await import('remote-app/module');
   ```

3. 多语言按需加载  
   根据用户语言设置加载对应翻译文件：
   ```javascript
   const lang = navigator.language;
   const translations = await import(`./locales/${lang}.js`);
   ```

#### 六、工具与兼容性

1. 构建工具支持  
   - Webpack/Rollup：自动处理代码分割和动态导入。
   - Babel：转译 `import()` 语法以兼容旧浏览器。

1. 浏览器兼容性  
   动态导入在现代浏览器（Chrome 63+、Safari 11.1+）中原生支持，旧环境需通过 Polyfill（如 `systemjs`）实现。

### 总结

动态导入和按需加载是优化 JavaScript 应用性能的核心技术，尤其适用于多平台适配、大型应用和微前端架构。通过合理使用 `import()`、代码分割和错误处理，开发者可以显著提升用户体验。同时，需注意模块系统的差异及 Tree-Shaking 的限制，结合工具链实现最佳实践。

**参考链接**：  

- [ES11 动态导入语法详解（JavaScript中文网）](http://www.javascriptcn.com/post/65123b7595b1f8cacdaa6505)  
- [动态导入的性能优化策略（OSCHINA）](https://my.oschina.net/emacs_8618453/blog/16803667)  
- [模块联邦与动态导入结合（腾讯云社区）](https://cloud.tencent.cn/developer/information/%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5-%20import()%20-%E5%B0%86%E4%BB%A3%E7%A0%81%E6%89%93%E5%8C%85%E5%88%B0%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6%E4%B8%AD%E6%97%B6%E5%A4%B1%E8%B4%A5)

### 其他

```js
;(async () => {
  if  (ABCSetting.env !== 'obsidian') return

  const { default: mermaid } = await import('mermaid');
  const { default: mindmap } = await import('@mermaid-js/mermaid-mindmap');
})();
```

