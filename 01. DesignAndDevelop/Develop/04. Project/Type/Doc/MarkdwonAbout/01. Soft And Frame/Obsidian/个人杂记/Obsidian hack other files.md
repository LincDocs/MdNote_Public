---
create_date: 2025-10-08
last_date: 2025-10-08
main_tag: obsidian插件开发
---
# Obsidian插件去读写规则外的文件

obsidian开发中，插件可以获取的数据，除了插件文件夹的data.json、库内使用api去读取的文件外，还能通过什么方式？

能否获取插件文件夹内除 data.json 外的其他文件？像一些插件/css管理器插件还能检测插件/css和修改，像 i18n 甚至能去修改其他插件文件夹，这些是hack手段吗还是obsidian 提供的api

## gemini 2.5 pro

你好！这是一个非常好的问题，触及了 Obsidian 插件开发的本质。你的观察非常敏锐，很多强大插件的功能确实超越了表面上的 API。

简单来说，答案是：**是的，插件几乎可以访问你电脑上当前用户权限下的任何文件，这既不是 hack，也超出了 Obsidian 官方 API 的范畴，其根本原因在于 Obsidian 的技术架构。**

下面我来详细解释一下。

### 插件可以获取的数据来源

Obsidian 插件可以访问的数据主要来自以下三个层面：

#### 1. Obsidian 官方 API (The Official Way)

这是 Obsidian 官方提供和推荐的、最安全和稳定的方法。它主要包括：

- **库内文件 (Vault Files):**
    - 使用 `this.app.vault` 对象来读取、写入、修改、删除库中的 Markdown 文件和附件。
    - 例如 `app.vault.read()`, `app.vault.write()`, `app.vault.getFiles()` 等。
    - 这是最常见的操作，比如各种笔记增强插件都是基于此。
- **插件自身配置 (Plugin Data):**
    - 使用 `this.loadData()` 和 `this.saveData()` 方法。
    - 这其实是 Obsidian 封装好的快捷方式，用于读取和写入位于插件目录下的 `data.json` 文件 (`<vault>/.obsidian/plugins/your-plugin-name/data.json`)。
    - 这是为了方便插件保存自己的设置。

#### 2. Node.js API (The "Under the Hood" Way)

这是理解你问题的关键。Obsidian 是一个基于 **Electron** 的桌面应用。Electron 本质上是一个 "壳"，它捆绑了 **Chromium** (用于显示界面) 和 **Node.js** (用于与操作系统交互)。

**这意味着，你的插件代码实际上是在一个完整的 Node.js 环境中运行的！**

因此，你可以直接在插件代码中引入 Node.js 的内置模块，尤其是 `fs` (File System) 模块。

```ts
// 你可以在你的 main.ts 或其他插件文件中这样写
import * as fs from 'fs';
import * as path from 'path';

// ... 在你的插件类中 ...

async onload() {
    // 获取当前 vault 的绝对路径
    const vaultPath = (this.app.vault.adapter as any).basePath;

    // 1. 读取插件文件夹内的其他文件
    const myFilePath = path.join(this.manifest.dir, 'my-other-file.txt');
    if (fs.existsSync(myFilePath)) {
        const content = fs.readFileSync(myFilePath, 'utf-8');
        console.log('成功读取插件目录下的其他文件:', content);
    }

    // 2. 探测其他插件的文件夹
    const pluginsDir = path.join(vaultPath, '.obsidian/plugins');
    const allPlugins = fs.readdirSync(pluginsDir);
    console.log('检测到的所有插件文件夹:', allPlugins);

    // 3. 修改其他插件的文件 (!!! 极度不推荐 !!!)
    // 比如，i18n 插件可能会这样做来替换语言文件
    const anotherPluginPath = path.join(pluginsDir, 'some-other-plugin', 'main.js');
    if (fs.existsSync(anotherPluginPath)) {
        // const originalCode = fs.readFileSync(anotherPluginPath, 'utf-8');
        // 在这里可以对文件内容进行修改和写回，但风险很高
        console.log(`可以访问到 ${anotherPluginPath}`);
    }
}
```

通过这种方式，插件可以：

- **读取自己文件夹内的任何文件**：不只是 `data.json`，可以是 `styles.css`, `template.html`, `extra-data.xml` 等任何你放进去的文件。
- **遍历 `.obsidian` 目录**：可以扫描所有已安装的插件、CSS 片段、主题。这就是 "CSS/插件管理器" 类插件的工作原理。
- **修改其他插件/主题的文件**：i18n (多语言) 插件就是通过读取其他插件的 `manifest.json` 和 `main.js`，然后将需要翻译的字符串替换掉，来实现汉化的。

#### 3. DOM API (Web 技术)

因为界面是基于 Chromium 的，插件也可以像网页脚本一样操作 DOM，获取和修改页面的任何元素。但这主要用于界面交互，而不是文件数据层面。

### 核心问题：这是 Hack 吗？

**不是严格意义上的 Hack，更应该称之为“利用底层环境特性”。**

- **Obsidian 官方的态度**：官方文档主要引导开发者使用封装好的、稳定的 API。直接使用 Node.js API 被认为是不稳定且有风险的，因为：
    
    1. **没有版本保证**：Obsidian 更新可能会改变底层文件结构（比如 `.obsidian` 目录），导致你的插件崩溃。
    2. **安全性**：这赋予了插件极大的权限。一个恶意插件可以读取你电脑上的敏感文件（只要当前用户有权限访问）。这也是为什么 Obsidian 需要用户手动关闭“安全模式”并信任插件作者。
    3. **兼容性**：这种方式可能导致插件间冲突。如果两个插件都去修改第三个插件的文件，结果可能是灾难性的。
- **社区的实践**：尽管有风险，但为了实现更高级的功能，许多知名插件（如你提到的 i18n、BRAT 等）都广泛使用了 Node.js API。这已经成为社区的一种“标准实践”。

### 总结

|数据访问方式|API/技术|作用范围|是否官方推荐|稳定性|案例|
|---|---|---|---|---|---|
|**库内文件**|`app.vault` API|Vault 内的笔记和附件|**是**|高|多数笔记功能插件|
|**插件设置**|`loadData`/`saveData`|插件目录下的 `data.json`|**是**|高|保存插件配置|
|**任意文件**|**Node.js `fs` 模块**|**用户权限内的几乎所有文件**|**否**|**低**|**插件管理器、i18n、主题下载器**|

所以，你的理解是正确的。那些看起来“神奇”的插件，正是利用了 Obsidian 运行在 Node.js 环境这一核心特性，直接进行了文件系统层面的操作，从而超越了标准 API 的限制。在开发自己的插件时，如果必须使用这种方法，请务必做好错误处理，并明确告知用户可能存在的风险。


