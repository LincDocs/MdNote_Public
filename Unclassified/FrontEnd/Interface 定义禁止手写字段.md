# Interface 定义禁止手写字段

## Interace vs Class 中的一个痛点

我使用 interface 方案编写插件时，往往感觉一个地方很麻烦：

app 全局对象是一个超级频繁被使用的对象。但使用时需要额外三步：
- 总需要在 onLoad(app) 中取出
- 并将其全局缓存
- 然后在其他函数中调用之前又得写 `app?` (可能为空，但实际上他不可能为空)。

反观 class 对象，只需要 `this.app` 即可取出该对象且不用判空。

## 解决方案1

下面代码中这里是我所尝试的一个解决方案，我将其注入到 plugin.app 让 interface 中也能通过 this 取用。但是这样的话虽然解决了前两步，但插件每次使用该值时也依然需要判空 `app?.xxx`

如果将 app 注入到全局变量中，好像也和 index.d.ts 对不上？（也可能是我不会写这种全局注入的类型）

```typescript
// @param file_path 仅用于失败时打印，无其他作用
async loadPlugin(file_path: string, scriptContent: string): Promise<PluginInterface> {
  let blobUrl: string | null = null;
  try {
    // 1. (可选) 为脚本内容追加 sourceURL 注释
    // 如果不做这一步，即使用 `scriptContent` 代替 `scriptWithSourceURL`，则
    // 在控制台的插件打印输出源中会显示是在源代码中的一个哈希名的虚拟文件中，
    // 如 `feb8d7e3-b917-47db-8ae6-0eb6c9522e95`。
    // 无其他影响
    let sourceName = file_path.replace(/^.*[\\/]/, '');
    const scriptWithSourceURL = scriptContent + `\n//# sourceURL=${sourceName}`;

    // 2. Import 脚本
    //   将字符串代码转换为 Blob，并指定类型为 JS 模块
    const blob = new Blob([scriptWithSourceURL], { type: 'application/javascript' });
    blobUrl = URL.createObjectURL(blob);

    // 2.1. (二选一)
    //   使用原生动态 import 加载这个虚拟文件
    //   使用 /* @vite-ignore */ 防止 Vite 在构建时试图解析这个动态路径
    // const module = await import(/* @vite-ignore */ blobUrl);

    // 2.1. (二选一) Function2 避免 obsidian auto review
    const Function2 = Function;
    const dynamicImport = new Function2('url', 'return import(url)');
    const module = await dynamicImport(blobUrl);

    //   获取 export default 导出的对象
    let rawPlugin = module.default;
    if (!rawPlugin) {
      throw new Error('Plugin script must export a default object, path:' + file_path);
    }

    // 3. 验证插件格式
    // 导出类型修正
    // 以前版本有一个是直接导出实例 (结构体)，现在改为了导出类 (更方便用ts开发插件)
    // 两种方式都支持，后者先转实例
    if (typeof rawPlugin === 'function') {
      rawPlugin = new rawPlugin();
    }
    const plugin = this.loadPlugin_validatePlugin(rawPlugin);

    // 4. 为插件注入属性
    // 插件实例可以通过 this.app 方便访问
    const appContext = PluginCtx.getPluginAppCtx(plugin);
    if ((plugin as any).app === undefined) {
      ;(plugin as any).app = appContext;
    }

    // 5. 获取插件 CSS 注入软件
    PluginManager.injectPluginCss(plugin);

    // 6. 注册并执行加载事件
    this.plugin_list[plugin.metadata.id] = plugin;
    const { icon, css, ...rest } = plugin.metadata;
    this.plugin_list2[file_path] = rest
    plugin.onLoad?.(appContext);

    return plugin;
  } catch (error) {
    throw new Error('Plugin load error, path:' + file_path, { cause: error });
  } finally {
    // 清理内存，防止内存泄漏
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
  }
}
```

## 解决方案2

deepseek-v4.1: 

你的痛点本质不是 `interface` 的问题，而是 **「`app` 被声明成了可选字段，而 `this` 在对象字面量里没有类型上下文」**。这两个都可以解决，而且不需要全局变量、也不需要把插件改成 class。

下面给你一套完整方案，和你现在的加载器代码可以无缝对接。

### 1. 关键认知：interface 也可以描述「加载器注入的必填字段」

你现在 `index.d.ts` 里大概率是这么写的：

```ts
export interface PluginInterface {
  app?: App;      // ← 痛点的根源
  onLoad?(app: App): void;
}
```

改成**必填**：

```ts
export interface PluginInterface {
  /** 由插件加载器在加载时注入，插件方法内可直接 this.app 使用 */
  app: App;
  metadata: PluginMetadata;
  onLoad?(app: App): void | Promise<void>;
  onUnload?(): void | Promise<void>;
}
```

这和 interface 无关，class 里你写 `protected app!: App` 也是「类型上说一定有，运行时靠框架赋值」。`interface` 完全可以表达同样的契约：类型上必填，运行时由加载器保证注入。这样开发者写 `this.app.xxx` 就不用 `?.` 了。

当然，此时在插件开发中，会要求你声明 app 字段，以符合类型。否则 ts 会报错。
所以还需要后面的操作                                                          

### 2. 用 `definePlugin` + `ThisType` 让 `this.app` 有类型

> [!note]
> 
> 核心: ThisType 关键字，其功能：
> 
> 是 TypeScript 内置的一个特殊标记接口，
> 
> 注意它**本身没有任何成员**，只是给编译器看的信号。它的唯一作用：
> 
> > 当它出现在某个对象类型 `X & ThisType<Y>` 里时，`X` 里所有**方法**（method shorthand，不是箭头函数）的 `this` 类型会变成 `Y`。
> 
> 它是**纯类型层面的**，编译后完全消失，运行时零成本。

问题来了：插件作者写对象字面量时，`this` 是推断出来的对象本身，不会自动带上 `app`。解决方式就是给一个工厂函数，用 `ThisType` 把 `this` 修正成 `PluginInterface`。

```ts
// sdk/types.ts
export interface App { /* ... */ }
export interface PluginMetadata {
  id: string;
  name: string;
  version?: string;
  icon?: string;
  css?: string;
}

export interface PluginInterface {
  /** 加载器注入，插件内 this.app 直接用 */
  app: App;
  metadata: PluginMetadata;
  onLoad?(app: App): void | Promise<void>;
  onUnload?(): void | Promise<void>;
}

// --------------- 上面是原有的，下面是修正 ---------------

/** 插件作者书写的部分：禁止手写 app */
export type PluginDefinition = Omit<PluginInterface, 'app'> & {
  app?: never;
};

export function definePlugin<T extends PluginDefinition>(
  plugin: T & ThisType<T & { app: App }>
): T {
  return plugin;
}
```

`ThisType<T & { app: App }>` 的作用：让对象里**所有方法**（非箭头函数）的 `this` 类型变成 `T & { app: App }`。因为 `T` 是 `PluginDefinition` 的子类型，本身没有 `app`，所以 `{ app: App }` 会干净地补上，不会和 `never` 冲突。

插件作者写：

```ts
import { definePlugin } from 'your-sdk';

export default definePlugin({
  metadata: { id: 'hello', name: 'Hello' },

  onLoad(app) {
    console.log(this.app);  // ✅ App，不判空
    console.log(app);       // ✅ 也可以直接用参数
  },

  doSomething() {
    this.app.someMethod();  // ✅ App，不判空
  },
});
```

`this.app` 和 `app` 参数两种写法都有类型，都不用判空。

### 3. 加载器里注入 `app`，与你现在的代码几乎一致

你现在的注入逻辑是对的，只需要类型上对齐：

```ts
async loadPlugin(file_path: string, scriptContent: string): Promise<PluginInterface> {
  // ... 前面省略 ...
  let rawPlugin = module.default;
  if (typeof rawPlugin === 'function') {
    rawPlugin = new rawPlugin();
  }

  const plugin = this.loadPlugin_validatePlugin(rawPlugin) as PluginInterface;

  // 注入 app（运行时补全 interface 里声明的必填字段）
  if ((plugin as any).app === undefined) {
    (plugin as any).app = PluginCtx.getPluginAppCtx(plugin);
  }

  PluginManager.injectPluginCss(plugin);
  this.plugin_list[plugin.metadata.id] = plugin;
  const { icon, css, ...rest } = plugin.metadata;
  this.plugin_list2[file_path] = rest;
  plugin.onLoad?.(plugin.app);

  return plugin;
}
```

关键点：**类型上 `app: App` 必填，运行时加载器保证它存在**。这是插件系统里非常常见的「运行时注入契约」，和 class 的 `protected app!: App` 完全等价，只是没有 `this` 的语法糖——而这个糖由 `definePlugin` + `ThisType` 补上了。

### 4. 为什么不用全局变量

```ts
declare global {
  var app: App;
}
```

技术上可行，写进 `global.d.ts` 后插件里可以直接 `app.xxx`。但问题：

- 只适合**单 app 实例**，未来多实例就崩。
- 全局命名污染，容易和宿主或其他库冲突。
- 隐式依赖，代码里看不出 `app` 从哪来，IDE 跳转体验差。
- 和 `index.d.ts` 的模块化类型体系割裂，插件作者容易踩坑。

**作为兜底可以留一个**（方便老插件迁移），但不建议作为主推方案。

### 5. 和 class 方案的关系

如果插件作者偏爱 class，你原来的 `PluginBase` 依然可以并存：

```ts
export abstract class PluginBase implements PluginInterface {
  abstract metadata: PluginMetadata;
  app!: App;   // 加载器注入
  abstract onLoad?(app: App): void | Promise<void>;
}
```

加载器里 `typeof rawPlugin === 'function'` 时 `new rawPlugin()`，对 class 和工厂函数都成立。`app` 注入逻辑不变。

这样两种写法最终都满足同一个 `PluginInterface`，加载器只依赖 interface，类型和运行时都统一。

### 6. 回到你的两个具体疑问

**Q：把 app 注入到 `plugin.app`，但和 `index.d.ts` 对不上怎么办？**

对不上的原因是你的 `index.d.ts` 里 `app` 是可选或不存在。**直接在 `PluginInterface` 里声明 `app: App` 必填**即可，加载器负责运行时补全。类型上必填、运行时注入，这是标准做法。

**Q：全局变量注入的类型怎么写？**

```ts
// global.d.ts
import type { App } from './types';
declare global {
  // eslint-disable-next-line no-var
  var app: App;
}
export {};
```

能写，但不推荐做主方案，理由见第 4 节。

### 结论

- 你的痛点是「`app?` 可选」，不是「interface」。
- 把 `app` 在 `PluginInterface` 里声明为**必填**，加载器负责运行时注入。
- 提供 `definePlugin` + `ThisType<T & { app: App }>`，让对象字面量里的 `this.app` 有类型、不判空。
- 全局变量可以用，但只作为兼容兜底，不做主推。
- class 方案可以并存，两者都实现同一个 `PluginInterface`，加载器只认 interface。

这样你既保留了 interface 方案的开放性和零运行时成本，又拿到了 class 的 `this.app` 体验。

## 解决方案2 的问题

我觉得解决方案二这种写法好奇怪……

一是 thisType 好像有些冷门，平时也不使用。
二是这样的话插件开发者会不会也有疑问：这个 this.app 是哪里来，明明没有这个类型。

这种写法有点不是太常规？真的要这样定义 api 吗？

by deepsee-v4.1:

你的直觉是对的，**`ThisType` 确实不常规**，甚至很多 TS 老手都没主动用过它。它出现在 Vue 2 的 Options API 内部、少数 ORM 里，但作为**对外公开的插件 API**，它是偏冷门的。而且你担心的第二点更关键：

> 插件作者看到 `this.app`，会问「我对象里没写 `app`，这个 `this.app` 哪来的？」

这个问题没有好的回答。答案是「`definePlugin` 用 `ThisType` 帮你补的」——这本身就需要解释，**需要解释的 API 就是坏 API**。你作为 API 设计者都觉得别扭，插件作者只会更别扭。

所以：**不建议用 `ThisType` 做公开的插件 API。** 下面给你几个更常规、插件作者一看就懂的方案。

## 0







