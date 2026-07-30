---
create_date: 2026-07-30
last_date: 2026-07-30
---
# KeyboardLock FAQ

deepseek-v4-pro 对话记录

## 背景

一个复杂的在线笔记或图形编辑类的网页应用，通常需要大量快捷键。

但浏览器自身也可能自带许多快捷键，极容易导致冲突，不同浏览器的快捷键还不一样（用户甚至可能自定义或装不同的插件）

那么：

- 一是分析网页应用和浏览器和扩展的快捷键优先级。
- 二是分析常见的可能会被覆盖的快捷键，从而让我更好地设计应用的快捷键，避免冲突。
- 三是有无方法能更好地减少冲突，例如全屏状态是否能减少自带快捷键的响应。例如让用户安装我开发的浏览器扩展。
- 最后，你是否有其他相关补充和给我的建议？

## 分析

设计一套既强大又不与浏览器“打架”的快捷键体系，确实是在线工具最头疼的问题之一。下面我按你的几个点逐一分析，并给出可落地的建议。

### 一、优先级分析：网页、浏览器与扩展谁说了算

整个事件链路大致遵循这个优先级：

1. **浏览器内核级“不可取消”快捷键**  
   这类快捷键在事件进入渲染进程前就被拦截，`preventDefault()` 完全无效。典型：`Ctrl+N/T/W`、`Ctrl+Shift+N/T`、`Ctrl+Tab`、`F11`（全屏）、`Alt+D`/`Ctrl+L`（地址栏）等。这是最高的优先级。

2. **扩展的 `chrome.commands` 全局快捷键**  
   如果在 manifest 里声明且作用域为 `global`，即使浏览器在后台也能触发。优先级很高，能覆盖大量浏览器自带功能，甚至部分内核级快捷键（取决于平台）。事件**不会**再传递给网页。

3. **浏览器可被 `preventDefault()` 阻止的默认行为**  
   如 `Ctrl+S`（保存页面）、`Ctrl+P`（打印）、`Ctrl+D`（添加书签）、`Ctrl+F`（页面查找）等。网页在 `keydown` 里调用 `preventDefault()` 就能接管，如果没阻止，浏览器就会执行默认动作。

4. **扩展内容脚本中的事件监听**  
   内容脚本与网页共享 DOM 事件流，可以在捕获阶段用 `stopImmediatePropagation()` 抢先拦截，但一般不作为主要快捷键方案。可用于桥接扩展命令，向页面发消息。

5. **网页应用自身的监听**  
   如果前面几层都没拦截，那就由你的应用处理。合理搭配 `preventDefault()` 就能安全使用大量组合键。

**结论**：网页能安全拿下的快捷键，是“浏览器允许阻止”的那一批；真正无法撼动的，必须靠扩展或主动避开。

### 二、常见冲突快捷键清单及设计避让

下面列出高冲突组合键，基于 Chrome/Firefox/Edge，兼顾 Mac 的 `Cmd` 键。

#### 🚫 严禁使用的（preventDefault 无效，或会严重影响浏览器操控）

| 组合键 (Win) | 组合键 (Mac) | 浏览器行为 | 可否阻止 | 建议 |
|------|------|------|------|------|
| `Ctrl+N` | `Cmd+N` | 新建窗口 | ❌ 不可 | 绝对避免 |
| `Ctrl+T` | `Cmd+T` | 新建标签页 | ❌ 不可 | 绝对避免 |
| `Ctrl+W` | `Cmd+W` | 关闭标签页 | ❌ 不可 | 别用作关闭文档，可用 `Ctrl+Shift+W` |
| `Ctrl+Shift+N` | `Cmd+Shift+N` | 隐身窗口 | ❌ 不可 | 避免 |
| `Ctrl+Shift+T` | `Cmd+Shift+T` | 恢复关闭标签 | ❌ 不可 | 避免 |
| `Ctrl+Tab` / `Ctrl+Shift+Tab` | `Cmd+Option+→/←` | 切换标签页 | ❌ 不可 | 避免，可用 `Ctrl+PageUp/Down` 代替（也需要看是否可阻止） |
| `Ctrl+1`~`9` | `Cmd+1`~`9` | 切换标签页 | ❌ 不可 | 勿用作功能键 |
| `Ctrl+L` / `Alt+D` | `Cmd+L` | 聚焦地址栏 | ❌ 不可 | 避免 |
| `F11` | `F11` | 全屏切换 | ❌ 不可 | 别用作自定义全屏，可用 `Ctrl+Shift+F` |
| `F1` | `F1` | 帮助中心 | 多数不可 | 勿用作主要功能 |

#### ⚠️ 高风险，但可尝试阻止（行为因浏览器而异，强烈建议避开）

| 组合键 | 浏览器行为 | 备注 |
|------|------|------|
| `Ctrl+D` | 添加书签 | Chrome 可阻止，但很多用户习惯用此“删除”，做在线笔记时可考虑用 `Delete` 或 `Ctrl+Shift+D` |
| `Ctrl+H` | 打开历史记录 | 可阻止，但易引发预期外行为 |
| `Ctrl+J` | 打开下载页 | 同上 |
| `Ctrl+Shift+B` | 显示/隐藏书签栏 | 不稳定，避免 |
| `Ctrl+Shift+O` | 书签管理器 | 避免 |
| `F5` / `Ctrl+R` | 刷新 | 可阻止，但用户本能会按，误触就丢失进度。建议自定义保存提醒，非要用则务必结合防误触 |
| `Ctrl+0` | 重置缩放 | 可阻止，但建议留给浏览器，应用缩放用 `Ctrl+Shift+0` 或 `Ctrl+Alt+0` |

#### ✅ 相对安全、可接管的标准编辑组合（绝大部分浏览器允许 preventDefault）

| 组合键 | 功能 | 适用 |
|------|------|------|
| `Ctrl+Z` / `Ctrl+Shift+Z` / `Ctrl+Y` | 撤销/重做 | 必须用 |
| `Ctrl+X/C/V` | 剪切/复制/粘贴 | 必须用，配合剪贴板 API |
| `Ctrl+A` | 全选 | 可接管 |
| `Ctrl+S` | 保存 | 强烈建议接管，比浏览器“保存网页”体验好 |
| `Ctrl+P` | 打印/导出 | 可接管 |
| `Ctrl+F` | 应用内查找 | 可接管，但要给用户留退路，如“按 `Ctrl+Shift+F` 使用浏览器查找” |
| `Ctrl+B/I/U` | 加粗/斜体/下划线 | 文本编辑常用，可接管，`Ctrl+U` 在某些浏览器会查看源代码，但 `preventDefault` 后基本安全 |

**特别的 Mac 差异**：  
- `Cmd+K` 为聚焦搜索，不可靠，可用 `Cmd+Shift+K`。  
- `Cmd+Shift+P` 在 Firefox 是新建隐私窗口，很危险，不要在跨浏览器应用里用作命令面板。建议命令面板统一用 `F1`（如果可用）或 `Ctrl+Shift+P`（仅 Chrome 安全），并允许用户自定义。

### 三、减少冲突的实战方法

#### 1. “无修饰键”策略 —— 应用在图形/画布区域的最佳实践
这是 Figma、Excalidraw、Miro 的核心思路：  
- 为画布区域设置 `tabindex="0"`，使之可聚焦。  
- 当焦点在画布内时，监听 `keydown`，只处理**无修饰键**（`V、H、R、T、Delete` 等）。一旦检测到 `Ctrl/Alt/Meta` 组合，故意放行或仅保留几个核心的（`Ctrl+Z/C/V`）。  
- 当焦点离开画布（点击输入框、侧栏）时，取消单键监听，恢复浏览器默认行为。  
这样几乎不与浏览器冲突，因为浏览器快捷键都要修饰键。

#### 2. 全屏模式并不能减少冲突
全屏只是视觉上的沉浸，但所有浏览器快捷键（包括 `Ctrl+W/T`、`Esc` 退出全屏）依然生效，且 `Esc` 你几乎无法阻止。**别指望全屏来解决快捷键冲突**。

#### 3. 安装配套浏览器扩展 —— 一劳永逸的“终极方案”
如果你能说服重度用户装扩展，那冲突问题就彻底交给你控制了：
- 在扩展 `manifest.json` 中声明 `commands`，把应用所有修饰键组合都注册上（甚至包括 `Ctrl+N` 这类终极禁区）。  
- 在扩展后台监听 `chrome.commands.onCommand`，通过 `chrome.tabs.sendMessage` 向网页派发自定义事件。  
- 网页收到事件后执行对应功能，而不再需要自己监听可能冲突的 `keydown`。  
- 你还能支持用户任意自定义快捷键，完全不受浏览器限制。

这种方式唯一的成本就是“需要用户安装”，适合面向专业用户的工具。可作为可选项，提供“安装桌面增强插件获得完整快捷键体验”的引导。

#### 4. 内置快捷键配置器 + 冲突检测
- 在应用设置里暴露一套快捷键映射表，允许用户自行修改。  
- 预设一套“安全方案”：比如所有组合键都尽量用 `Ctrl+Shift+字母`，避开 `Ctrl+字母`。  
- 当用户尝试设置 `Ctrl+T` 等禁用键时，直接提示“此组合被浏览器保留，无法使用”。  
- 你也可以尝试用一些黑名单机制，运行时检测平台，动态屏蔽高危组合。

#### 5. 其他细节与建议

- **Alt 键的陷阱**：Windows 下，单按或组合 `Alt` 极易激活浏览器菜单栏，导致后续按键丢失。除非你同时 `preventDefault` 掉 `Alt` 的 `keydown`，否则不建议网页应用使用任何 `Alt+字母` 快捷键。`Alt` 仅适合作为“按住状态”（如按 `Alt` 临时切换吸管），并在 `keyup` 恢复。  
- **输入法合成处理**：所有快捷键监听必须在 `keydown` 中检查 `event.isComposing`，如果为 `true` 则直接跳过，避免中文输入时触发一堆命令。  
- **键盘布局**：优先基于 `event.key` 判定（如 `"z"`, `"Delete"`），别用 `keyCode`。物理键位（`code`）可作辅助，但注意不同布局会改变。  
- **交互提示**：提供一个快捷键面板，按 `?` 弹出，实时反映当前生效的快捷键（并注明 `Mac`/`Win`），降低记忆负担。  
- **PWA 安装无额外好处**：安装成桌面 PWA 后，浏览器快捷键依然存在，不能绕过上述限制。  
- **动态适应**：首次启动时，可尝试发送测试事件并检测能否成功 `preventDefault`，自动标记某些组合键是否已被浏览器“没收”，然后向用户推荐替代快捷键。

**一句话总结思路**：  
> 用“无修饰键 + 画布聚焦”覆盖大量操作，用“可接管的标准编辑组合”覆盖核心编辑，用“自定义快捷键设置”兜底，用“浏览器扩展”给专业用户终极自由，主动避开那几个浏览器死守的红线。这样就能在兼容性和效率之间找到最好的平衡点。

## idea

我认为浏览器中使用复杂的快捷键和应用是一个较为广泛且实用的需求。并且目前来说浏览器可能用到的快捷键太多太多了，避开设计非常别扭，设计出的新快捷键不符合用户直觉。我希望浏览器厂商能够更好地支持这类应用。

例如全屏模式下或者出一个类似全屏模式的“专注模式”，在该状态下仅保留退出模式的快捷键，而不接管其他快捷键。我认为这会是一个很好的设计，你认为呢？

有人也这么提出过这种idea吗？如果我希望向所有浏览器提出这种建议，并被标准指定方或厂商看到，可行吗？

## Keyboard Lock API 介绍

你这个想法非常好，而且可以说是说到了很多 Web 应用开发者的心坎里。你所期待的“浏览器专注模式”，其实已经在 Web 标准中被具象化成了 **Keyboard Lock API**，只是现状还不完全理想。

### 一、这个想法有人提过吗？—— 不仅有，而且已经在路上了

你描述的“全屏后只保留退出快捷键”的模式，几乎就是 **Keyboard Lock API** 设计的初衷。这个 API 允许网页在全屏或指针锁定状态下，捕获所有按键，包括 `Escape`、`Ctrl+T`、`Alt+D` 等原本浏览器死守的组合键。它最初就是由游戏和生产力工具（如在线设计、笔记应用）开发者强烈呼吁，才进入标准讨论的。

所以你的需求一点都不小众，像 Figma、Excalidraw 这类顶尖的网页应用，都在底层重度依赖或期待这个能力。

### 二、目前的实际情况如何？

Keyboard Lock API 目前（2026年）的状况是：

-   **Chromium 系浏览器（Chrome / Edge / Opera）已实现**，但需要满足**全屏或指针锁定**等先决条件，且系统保留键（如 macOS 的 `Cmd+Tab`）仍无法捕获。
-   **Firefox 和 Safari 尚未实现**，目前仍只能通过 `preventDefault()` 处理有限按键，无法解决内核级冲突。
-   调用方式大致为：在全屏元素上请求 `navigator.keyboard.lock(["Escape", "KeyW", "ControlLeft"])` 等。一旦锁定，即便是浏览器的关闭标签页组合也能被应用接管，直到用户按下事先声明可退出的键（如长按 `Escape`）。

所以，你想象的“专注模式”已经部分存在，但只在部分浏览器中以 API 形态提供，还未成为所有浏览器的标准内置模式。

### 三、这会是“很好的设计”吗？

从实用角度看，**是，但需要巧妙的交互安全机制**。直接让网页随意接管所有按键存在风险：恶意网站可能锁住退出路径。因此标准设计了安全护栏：

-   必须由用户主动触发（如点击“进入专注模式”按钮）才能进入全屏并锁定键盘。
-   必须提供显式的退出提示（浏览器会叠加一条“长按 Esc 退出”的提示条）。
-   某些致命系统组合键仍不可覆盖（如 `Ctrl+Alt+Del`）。

如果浏览器厂商能把这个包装成一个更友好的“专注模式”UI（而不只是API），体验会提升一大截——这正是你所期望的样子。

### 四、如何向厂商和标准方提出建议？可行吗？

**完全可行，而且现在就是参与的好时机。** 你可以用以下方式让厂商更重视这个需求：

1.  **通过 WICG 发起或支持提案**
    WICG 是专门孵化新 Web 能力的社区组，Keyboard Lock 就是来自这里。你可以：
    -   在 [WICG/keyboard-lock](https://github.com/WICG/keyboard-lock) 仓库提 issue，分享你的“专注模式”用例与交互设想。
    -   参与 [Web Applications WG](https://www.w3.org/groups/wg/webapps/) 的讨论，阐明生产力应用对快捷键拦截的真实痛点。

2.  **向各浏览器提交特性请求**
    -   **Chrome / Edge**：通过 [crbug.com](https://crbug.com) 提 feature request，描述“希望提供浏览器级专注模式，基于键盘锁定增强安全提示”。Chromium 团队对这类反馈重视度较高。
    -   **Firefox**：在 [Mozilla's Bugzilla](https://bugzilla.mozilla.org) 提交，并附上 Keyboard Lock 标准链接，表达开发者迫切需求。
    -   **Safari**：通过 [WebKit Bug Tracker](https://bugs.webkit.org) 或 [Apple 的 Safari 反馈](https://www.apple.com/feedback/safari.html) 提交，强调跨浏览器一致性对生产力应用的影响。

3.  **具体话术建议**
    不要只说“给我一个专注模式”，而是描述**用例 + 现有痛点 + 期望行为**，例如：
    > “作为在线图形编辑器的开发者，我们无法提供符合用户直觉的快捷键，因为 `Ctrl+N`、`Ctrl+Tab` 等被浏览器强制占用。Keyboard Lock API 解决了大部分问题，但 Firefox/Safari 尚未实现。我们希望浏览器能提供一种‘应用专注模式’，在全屏基础上激活键盘锁定，并给用户明确的退出提示。这会让 Figma、Notion、Excalidraw 等应用体验飞跃，也符合 Web 作为应用平台的方向。”

    越具体，越能引起共鸣。

### 五、给你的额外建议

在标准彻底成熟之前，你可以采用**渐进增强策略**，结合之前聊过的方案：

-   **默认使用安全快捷键 + 无修饰键**，保证所有浏览器可用。
-   **检测 Keyboard Lock API 可用性**，如果存在，就引导用户“点击此处全屏并启用专注模式，获得完整快捷键支持”。进入该模式后，即可放心使用那些原本会冲突的组合键。
-   **提供一个浏览器扩展作为终极方案**，覆盖那些实在无法在网页内解决的快捷键（如 `Ctrl+W`），作为对专业用户的补充。这样既照顾了大众用户，又给了高端用户完美体验。

你提的这个方向，正是 Web 从“文档浏览”走向“应用平台”必须要跨过的一道坎。现在去提建议，绝对是时候。

## 验证应用

给我一个 Keyboard Lock API 的简单的前端验证应用。
要简单。
功能大概是屏幕上实时显示当前在网页上进行的快捷键，且支持历史记录显示。

## Demo

这是一个极简的验证页面，用来体验 **Keyboard Lock API** 的效果。页面会实时显示你按下的组合键，并保留历史记录。

> **使用前提**：
> - 必须在 **HTTPS 或 localhost** 下打开。
> - 目前仅 **Chromium 内核浏览器** (Chrome 89+, Edge 89+) 支持。
> - 需要**手动触发全屏**才能锁定键盘。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyboard Lock API 演示</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background: #1a1a2e;
      color: #eee;
      font-family: 'Segoe UI', system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      transition: background 0.3s;
    }
    body.locked {
      background: #16213e; /* 暗色表示锁定状态 */
    }
    .container {
      width: 100%;
      max-width: 700px;
    }
    .card {
      background: #0f3460;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .status-badge {
      background: #e94560;
      color: white;
      font-size: 0.9rem;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 500;
    }
    .status-badge.active {
      background: #00b894;
    }
    .controls {
      display: flex;
      gap: 10px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    button {
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      background: #533483;
      color: white;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.3);
    }
    button:active {
      transform: translateY(0);
    }
    button.primary {
      background: #e94560;
    }
    button.secondary {
      background: #0a3d62;
    }
    .current-key-area {
      background: #16213e;
      border-radius: 16px;
      padding: 30px;
      margin: 20px 0;
      text-align: center;
      border: 2px solid #533483;
      transition: border-color 0.3s;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .locked .current-key-area {
      border-color: #e94560;
    }
    .current-key {
      font-size: 3rem;
      font-weight: bold;
      word-break: break-word;
      letter-spacing: 2px;
      color: #f5f5f5;
    }
    .placeholder {
      font-size: 1.2rem;
      opacity: 0.5;
    }
    .history-title {
      font-size: 1.1rem;
      margin: 20px 0 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .history-list {
      background: #16213e;
      border-radius: 16px;
      padding: 15px;
      max-height: 200px;
      overflow-y: auto;
      list-style: none;
    }
    .history-list li {
      padding: 8px 12px;
      border-bottom: 1px solid #0f3460;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      display: flex;
      justify-content: space-between;
      color: #dfe6e9;
    }
    .history-list li:last-child {
      border-bottom: none;
    }
    .clear-btn {
      background: transparent;
      border: 1px solid #636e72;
      padding: 6px 14px;
      font-size: 0.8rem;
      border-radius: 8px;
    }
    .info-note {
      margin-top: 15px;
      font-size: 0.85rem;
      color: #b2bec3;
      border-left: 3px solid #e94560;
      padding-left: 12px;
    }
    .warning {
      color: #e17055;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>
        ⌨️ Keyboard Lock 验证
        <span class="status-badge" id="statusBadge">未锁定</span>
      </h1>

      <div class="controls">
        <button class="primary" id="enterBtn">🔒 进入专注模式</button>
        <button class="secondary" id="exitBtn" disabled>🔓 退出专注模式</button>
      </div>

      <div class="current-key-area">
        <div class="current-key" id="currentKeyDisplay">
          <span class="placeholder">在此区域显示按键...</span>
        </div>
      </div>

      <div class="history-title">
        📜 按键历史
        <button class="clear-btn" id="clearHistoryBtn">清空记录</button>
      </div>
      <ul class="history-list" id="historyList">
        <li style="opacity:0.5">暂无记录，开始按键吧</li>
      </ul>

      <div class="info-note">
        💡 <strong>提示</strong>：点击“进入专注模式”后，浏览器会全屏并锁定键盘。此时所有按键（包括 Escape、Ctrl+T 等）都将被本页接管。长按 <strong>Escape</strong> 键 或 点击退出按钮可退出。
      </div>
      <div class="info-note warning" id="supportNote">
        ⚠️ 你的浏览器可能不支持 Keyboard Lock API。请使用 Chrome 89+ 或 Edge 89+。
      </div>
    </div>
  </div>

  <script>
    (function() {
      // --- DOM 元素 ---
      const enterBtn = document.getElementById('enterBtn');
      const exitBtn = document.getElementById('exitBtn');
      const statusBadge = document.getElementById('statusBadge');
      const currentKeyDisplay = document.getElementById('currentKeyDisplay');
      const historyList = document.getElementById('historyList');
      const clearHistoryBtn = document.getElementById('clearHistoryBtn');
      const supportNote = document.getElementById('supportNote');

      // --- 状态 ---
      let isLocked = false;
      const keyHistory = []; // 存储 { display, timestamp }
      const MAX_HISTORY = 20;

      // --- 工具函数 ---
      function formatKeyEvent(e) {
        // 忽略纯修饰键的单独按下（但显示组合键）
        // 如果 e.key 是修饰键名称且没有其他修饰键被按下，我们也显示出来（例如单独按了 Ctrl）
        const modifiers = [];
        if (e.ctrlKey) modifiers.push('Ctrl');
        if (e.altKey) modifiers.push('Alt');
        if (e.shiftKey) modifiers.push('Shift');
        if (e.metaKey) modifiers.push('Cmd'); // 或 Windows 键

        let key = e.key;
        // 统一一些键名显示
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        else if (key === 'Alt') key = 'Alt';
        else if (key === 'Shift') key = 'Shift';
        else if (key.length === 1) key = key.toUpperCase(); // 单字符大写

        // 如果按下的就是修饰键自身，且没有其他修饰键，则直接显示修饰键名
        const isModifierKey = ['Control', 'Alt', 'Shift', 'Meta'].includes(e.key);
        if (isModifierKey && modifiers.length === 1) {
          // 单独按下修饰键
          return modifiers[0]; // 例如 "Ctrl"
        }

        // 组合键
        return modifiers.length ? `${modifiers.join('+')}+${key}` : key;
      }

      function addToHistory(keyString) {
        const entry = {
          display: keyString,
          timestamp: new Date().toLocaleTimeString()
        };
        keyHistory.unshift(entry);
        if (keyHistory.length > MAX_HISTORY) {
          keyHistory.pop();
        }
        renderHistory();
      }

      function renderHistory() {
        historyList.innerHTML = '';
        if (keyHistory.length === 0) {
          historyList.innerHTML = '<li style="opacity:0.5">暂无记录</li>';
          return;
        }
        keyHistory.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<span>${item.display}</span><span style="opacity:0.6;font-size:0.8rem">${item.timestamp}</span>`;
          historyList.appendChild(li);
        });
      }

      function updateUI() {
        if (isLocked) {
          statusBadge.textContent = '键盘已锁定';
          statusBadge.className = 'status-badge active';
          document.body.classList.add('locked');
          enterBtn.disabled = true;
          exitBtn.disabled = false;
        } else {
          statusBadge.textContent = '未锁定';
          statusBadge.className = 'status-badge';
          document.body.classList.remove('locked');
          enterBtn.disabled = false;
          exitBtn.disabled = true;
          currentKeyDisplay.innerHTML = '<span class="placeholder">在此区域显示按键...</span>';
        }
      }

      // --- 键盘事件处理 (仅在锁定状态下活跃) ---
      function onKeyDown(e) {
        if (!isLocked) return;
        
        // 阻止默认行为，确保所有键都被页面捕获
        e.preventDefault();
        
        const display = formatKeyEvent(e);
        currentKeyDisplay.textContent = display;
        addToHistory(display);
      }

      // --- 全屏变化监听 ---
      async function onFullscreenChange() {
        if (!document.fullscreenElement) {
          // 已经退出全屏，解除锁定
          if (isLocked) {
            await unlockKeyboard();
          }
        }
      }

      // --- Keyboard Lock 操作 ---
      async function lockKeyboard() {
        if (!('keyboard' in navigator) || !navigator.keyboard.lock) {
          alert('当前浏览器不支持 Keyboard Lock API。\n请使用 Chrome 89+ 或 Edge 89+。');
          supportNote.style.display = 'block';
          return false;
        }
        try {
          // 锁定所有键（也可以传递特定键码，如 ["Escape"] 来排除退出键，但这里我们锁定全部）
          await navigator.keyboard.lock();
          console.log('键盘已锁定');
          return true;
        } catch (err) {
          console.error('键盘锁定失败:', err);
          alert('键盘锁定失败: ' + err.message);
          return false;
        }
      }

      async function unlockKeyboard() {
        if ('keyboard' in navigator && navigator.keyboard.unlock) {
          navigator.keyboard.unlock();
        }
        isLocked = false;
        updateUI();
        console.log('键盘已解锁');
      }

      // --- 进入专注模式 ---
      async function enterFocusMode() {
        if (isLocked) return;
        try {
          // 首先请求全屏
          await document.documentElement.requestFullscreen();
          // 全屏成功后锁定键盘
          const locked = await lockKeyboard();
          if (locked) {
            isLocked = true;
            updateUI();
          } else {
            // 如果锁定失败，退出全屏
            await document.exitFullscreen();
          }
        } catch (err) {
          console.error('进入全屏失败:', err);
          alert('无法进入全屏模式，请确保页面是由用户手势触发。');
        }
      }

      // --- 退出专注模式 ---
      async function exitFocusMode() {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        // 全屏退出事件会自动调用 unlockKeyboard
      }

      // --- 事件绑定 ---
      enterBtn.addEventListener('click', enterFocusMode);
      exitBtn.addEventListener('click', exitFocusMode);
      clearHistoryBtn.addEventListener('click', () => {
        keyHistory.length = 0;
        renderHistory();
      });

      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('fullscreenchange', onFullscreenChange);

      // 初始检查 API 支持
      if (!('keyboard' in navigator && navigator.keyboard.lock)) {
        supportNote.style.display = 'block';
      } else {
        supportNote.style.display = 'none';
      }

      // 清理（非必须）
      window.addEventListener('beforeunload', () => {
        if (isLocked) {
          navigator.keyboard?.unlock();
        }
      });
    })();
  </script>
</body>
</html>
```

**如何使用：**

1. 将以上代码保存为 `keyboard-lock-demo.html`。
2. 通过本地服务器打开（必须 `localhost` 或 HTTPS），直接用 `file://` 协议可能无法全屏或锁定。
3. 点击 **“进入专注模式”**，浏览器会全屏并锁定键盘。
4. 此时尝试按 `Ctrl+T`、`Ctrl+W`、`Escape` 等，会发现它们被页面接管并显示在屏幕上。
5. 点击 **“退出专注模式”** 或长按 `Escape` 键即可恢复。

这个简单页面足以验证 Keyboard Lock API 的核心能力，并记录所有快捷键，帮你直观感受“完全控制键盘”的效果。



