---
create_date: 2025-09-28
last_date: 2025-09-28
Author: LincZero
---
# Tauri光标位置


### windows 自带面板解决方案

像widnows的 `win+句号` 和 `win+v` 唤出的那个面板，以及输入法，就是会在光标旁边。所以 windows 应该是有这个 api 的

这个面板是 Windows 系统输入体验的一部分，它使用的是一个叫做 **文本服务框架 (Text Services Framework, TSF)** 的高级 API。

- **什么是 TSF？** TSF 是一个现代的、可扩展的系统，专门用来处理所有形式的文本输入。它不仅仅用于打字，还用于输入法编辑器 (IME，比如中文/日文输入法)、手写识别、语音输入，以及你提到的表情符号面板。

### win-win rust 包 (失败)

gpt乱说，win-win 没有 `win_win::caret_pos()` 方法

原理:

像你的 Tauri 应用、PowerToys Run、Wox/Utools 这类工具，它们并不是一个“输入法”或“文本服务”，所以它们无法接入 TSF。它们需要一种方法从外部“窥探”到当前活动窗口的光标在哪里。

`win-win` 在 Windows 平台上使用的正是这种“窥探”的方式，它依赖一个经典的 Win32 API：`GetGUIThreadInfo`。

Cargo.toml

```toml
[dependencies]
# ... other dependencies
serde = { version = "1.0", features = ["derive"] }
win-win = "0.2"
```

src-tauri/main.ts

```rust
// 1. 定义一个结构体来存放坐标，并让它可以被序列化
#[derive(serde::Serialize)]
struct Point {
    x: i32,
    y: i32,
}

// 2. 创建一个新的 Tauri 命令 `get_caret_position`
#[tauri::command]
fn get_caret_position() -> Result<Point, String> {
    // 使用 win-win crate 来获取光标位置
    match win_win::caret_pos() {
        Ok((x, y)) => Ok(Point { x, y }),
        Err(e) => Err(e.to_string()), // 如果失败，返回错误信息
    }
}

fn main() {
    tauri::Builder::default()
        // 3. 将新命令注册到 handler 中
        .invoke_handler(tauri::generate_handler![
            // ... 你可能还有其他命令
            get_caret_position
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 输入法程序解决方案 (TSF)

*(问题是rust似乎无输入法框架，输入法多是C++的)*

Q: 我要做的程序是类似于输入法的工具。是一个输入法辅助工具。不能把程序变成输入法性质吗？

A: 是的，你完全可以将你的程序改造为真正的“输入法”性质的工具，这在技术上是可行的，而且这样做会让你获得最原生、最强大的集成能力。

你已经触及到了问题的核心：从一个“外部观察者”（使用 `win-win`）转变为一个“系统参与者”（实现一个真正的输入法）。

这样做意味着你的程序将不再仅仅是一个独立的 Tauri 应用，而是会包含一个**文本服务框架 (TSF) 组件**。这会带来巨大的好处，但复杂度也会指数级增长。

变成“输入法性质”意味着什么？

这意味着你需要用 Rust 去实现一个真正的 Windows 文本服务 (Text Service)。**这个服务会被注册到 Windows 系统中，并作为一个 DLL 文件被需要文本输入的应用程序（如记事本、浏览器等）加载**。

### 结论：两条路径的选择

*(问题是rust似乎无输入法框架，输入法多是C++的)*

路径 A: 辅助工具 (你当前的方式)

- **技术**: Tauri App + `win-win` crate。
- **优点**:
    - 简单，快速，开发周期短。
    - 完全在 Tauri 的生态系统内，易于理解和打包。
    - 对于不需要深度文本操纵的场景已经足够好。
- **缺点**:
    - 依赖“轮询”或“查询”来获取状态，不够原生。
    - 无法拦截键盘事件或管理预编辑文本。
    - 在某些非标准应用中可能无法获取光标位置。

路径 B: 真正输入法 (TSF)

- **技术**: Rust DLL (使用 `windows-rs` 实现 TSF) + Tauri App (作为 UI)。
- **优点**:
    - 功能最强大，集成最深，体验最原生。
    - 可以实现所有标准输入法的功能。
    - 是制作“输入法辅助工具”的终极形态。
- **缺点**:
    - **极其复杂**。需要深入理解 Windows COM、TSF 框架、DLL 注入和进程间通信。
    - 开发周期长，调试困难（因为你的代码运行在其他应用的进程里）。
    - 需要处理复杂的安装和注册逻辑。

| 特性     | `Win + .` 面板 (TSF)                         | `win-win` Crate (`GetGUIThreadInfo`)                          |
| ------ | ------------------------------------------ | ------------------------------------------------------------- |
| API 类型 | **现代框架**: 文本服务框架 (Text Services Framework) | **经典 Win32 API**                                              |
| 工作模式   | **协作式**: 应用程序主动向系统提供光标信息。                  | **查询式**: 你的应用去“询问”系统前台窗口的光标在哪里。                               |
| 可靠性    | **非常高**。这是官方指定的方式，几乎所有标准应用都支持。             | **比较高，但不完美**。对于一些使用非标准UI框架或自己绘制光标的应用（比如某些游戏、特殊的代码编辑器），可能获取不到。 |
| 实现复杂度  | **极高**。需要实现复杂的 COM 接口，通常只有 IME 或系统级工具会用。   | **非常低**。像 `win-win` 这样封装好的库，让调用变得极其简单。                        |
| 本质     | 作为一个“输入服务”与应用程序**深度集成**。                   | 作为一个外部工具**观察和模拟**系统状态。                                        |

### UIA方法

gpt:

你之前遇到的问题根源在于，像 VSCode、Office、WPF/UWP 应用等现代软件（例如传统的 **Win32、WPF、Electron/VSCode、UWP** 等），它们界面中的光标**不是**一个 Windows 系统级别的“Caret”对象。它们是应用程序自己绘制的图形。`GetGUIThreadInfo` 这样的传统 WinAPI 对此无能为力。

UI Automation 解决了这个问题，因为它是一个更高层次的抽象框架，其工作原理如下：

1. 提供者（Provider）与客户端（Client）模型：
    - **提供者**：应用程序（如 VSCode、Word、Chrome）负责向 Windows 报告自己的 UI 结构和状态。它们会说：“我是一个窗口，我内部有一个文本编辑器，这是它的内容，这是当前的光标位置。”
    - **客户端**：你的程序（或者屏幕阅读器等辅助工具）作为客户端，向 Windows 查询：“请告诉我当前拥有焦点的 UI 元素是什么？它的文本选区在哪里？”
2. 标准化的“模式”（Pattern）：
    - UIA 定义了一系列“模式”来与不同类型的控件交互。对于文本输入，最重要的就是 `TextPattern`。
    - 任何实现了 `TextPattern` 的控件，无论其底层技术是 Electron (Chromium)、WPF 还是其他什么，都必须按标准方式提供获取文本选区（Text Selection）的方法。
    - **对于闪烁的光标，它在 `TextPattern` 中被表示为一个零宽度的文本选区。**

#### windows库

又分使用 uiautomation 包，以及原生一点的:

```toml
[dependencies]
windows = { version = "0.58.0", features = [
    "Win32_UI_Accessibility",
    "Win32_System_Com",
    "Win32_Foundation",
    "Win32_UI_WindowsAndMessaging", # for GetForegroundWindow
    "core",
] }
```

#### UI Automation库

详见 [uiautomation/uiautomation](uiautomation/uiautomation.md)

#### 总结

| 特性       | `uiautomation` (高层封装) | `windows` (底层绑定)           |
| -------- | --------------------- | -------------------------- |
| 便利性      | ⭐⭐⭐⭐⭐ **(非常方便)**      | ⭐⭐ (比较繁琐)                  |
| 安全性      | ⭐⭐⭐⭐⭐ **(安全)**        | ⭐⭐ (需要大量 `unsafe`)         |
| 代码简洁度    | ⭐⭐⭐⭐⭐ **(简洁)**        | ⭐⭐ (冗长)                    |
| API 覆盖范围 | ⭐⭐ (仅限 UIA)           | ⭐⭐⭐⭐⭐ **(全部 Windows API)** |
| 灵活性      | ⭐⭐⭐ (足够，但有局限)         | ⭐⭐⭐⭐⭐ **(完全灵活)**           |
| 学习曲线     | ⭐⭐⭐⭐ (较低)             | ⭐⭐ **(陡峭)**                |

## 可以参考的项目 —— Ditto

https://github.com/sabrogden/Ditto

这个就能做到

代码分析

gemini 2.5 Pro: ...

:::note

gemini 2.5 pro:

这个函数会按顺序尝试以下几种方法来确定光标位置：

1. **使用 UI Automation (IAccessible 接口)**：这是首选方法。它尝试从当前活动窗口获取一个代表插入符的 `IAccessible` 对象 (`OBJID_CARET`)，然后调用 `accLocation` 方法来获得其屏幕坐标。
    
2. **使用 `GetGUIThreadInfo` 函数**：如果第一种方法失败，它会尝试使用 `GetGUIThreadInfo`。这个 Win32 API 函数可以获取当前线程的图形用户界面（GUI）信息，其中包括插入符的矩形区域 (`rcCaret`)。
    
3. **使用 `GetCaretPos` 函数**：作为最后的备用方案，它会先通过 `AttachThreadInput` 将自己的线程附加到目标窗口的线程上，然后调用 `GetCaretPos` 来获取位置。调用后会立即分离。这种方法是必需的，因为 `GetCaretPos` 只能获取当前线程的插入符位置。

:::

我不信，除非你给出文件和代码位置

### gemini 2.5 pro 分析的代码

#### 获取插入符位置的核心逻辑

这个功能的核心在 `ExternalWindowTracker.cpp` 文件中的 `FocusCaret` 函数。它按顺序尝试了多种方法（`IAccessible`、`GetGUIThreadInfo`、`GetCaretPos`）来获取光标位置。

- **文件**: `src/ExternalWindowTracker.cpp`
- **函数**: `ExternalWindowTracker::FocusCaret`
- **代码链接**: [**https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/ExternalWindowTracker.cpp#L445-L524**](https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/ExternalWindowTracker.cpp#L445-L524)

```cpp
// 链接指向的 C++ 代码
CPoint ExternalWindowTracker::FocusCaret()
{
	CPoint pt(-1, -1);

	if(!m_activeWnd || !m_focusWnd)
		return pt;

	// 第一步: 尝试使用 IAccessible 接口
	if (m_AccessibleObjectFromWindow)
	{
		// ... (代码见链接)
	}
	if (pt.x != -1 && pt.y != -1)
		return pt;

	// 第二步: 尝试 GetGUIThreadInfo
	GUITHREADINFO guiThreadInfo;
	guiThreadInfo.cbSize = sizeof(GUITHREADINFO);
	DWORD OtherThreadID = GetWindowThreadProcessId(m_activeWnd, NULL);
	if(GetGUIThreadInfo(OtherThreadID, &guiThreadInfo))
	{
		// ... (代码见链接)
	}
	if(pt.x != -1 && pt.y != -1)
		return pt;

	// 第三步: 附加线程并使用 GetCaretPos
	DWORD currentThreadId = GetCurrentThreadId();
	if(AttachThreadInput(OtherThreadID, currentThreadId, TRUE))
	{
		BOOL ok = GetCaretPos(&pt);
		if(ok && (pt.x != 0 && pt.y != 0))
		{
			::ClientToScreen(m_focusWnd, &pt);
			if (pt.y != 0 && pt.x != 0)
			{
				// 在这里增加 Y 轴偏移量
				pt.y += 20;
			}
			// ...
		}
		// ...
		AttachThreadInput(OtherThreadID, currentThreadId, FALSE);
	}

	return pt;
}
```

#### 使用获取到的位置来显示窗口

在 `QuickPaste.cpp` 文件中，`ShowQPasteWnd` 函数会调用 `FocusCaret()` 来获取坐标，然后根据这个坐标来决定窗口应该显示在哪里。

- **文件**: `src/QuickPaste.cpp`
- **代码链接**: [**https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/QuickPaste.cpp#L143-L191**](https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/QuickPaste.cpp#L143-L191)

```cpp
// 链接指向的 C++ 代码
void CQuickPaste::ShowQPasteWnd(CWnd *pParent, bool bAtPrevPos, bool bFromKeyboard, BOOL bReFillList)
{
    // ...

    // 调用 FocusCaret() 获取位置
	CPoint ptCaret = theApp.m_activeWnd.FocusCaret();
	if(ptCaret.x == -1 || ptCaret.y == -1)
	{
		// ... (如果获取失败，则使用窗口中心作为备用方案)
	}
	
    // ...

	long nPosition = CGetSetOptions::GetQuickPastePosition();
	
    // ...

    // 如果设置为在插入符位置显示 (POS_AT_CARET)
	else if (nPosition == POS_AT_CARET)
	{
        // 将窗口的坐标设置为获取到的插入符坐标
		point = ptCaret;
		if (CGetSetOptions::m_centerWindowBelowCursorOrCaret)
		{
			point.x -= csSize.cx / 2;
		}
	}
    
    // ...

	// 使用 point 坐标来设置窗口位置
	if (forceMoveWindow ||
		(m_pwndPaste->m_DittoWindow.m_crWindow.TopLeft() != crRect.TopLeft()) ||
		(m_pwndPaste->m_DittoWindow.m_crWindow.Size() != crRect.Size()))
	{
		m_pwndPaste->MoveWindow(crRect, FALSE);
	}
    // ...
}
```

### IAccessible

```rust
CPoint ExternalWindowTracker::FocusCaret()
{
	CPoint pt(-1, -1);

	if(!m_activeWnd || !m_focusWnd)
		return pt;

	//first try getting the caret position using IAccessible object
	if (m_AccessibleObjectFromWindow)
	{
		{
			IAccessible* pIAccessible = NULL;
			HRESULT hr = m_AccessibleObjectFromWindow(m_activeWnd, OBJID_CARET, __uuidof(IAccessible), (void**)&pIAccessible);
			if (hr == S_OK)
			{
				long left = 0, top = 0, width = 0, height = 0;
				VARIANT varCaret;
				varCaret.vt = VT_I4;
				varCaret.lVal = CHILDID_SELF;
				hr = pIAccessible->accLocation(&left, &top, &width, &height, varCaret);
				pIAccessible->Release();
				if (hr == S_OK && left != 0 && top != 0)
				{
					// calculate offset of caret by Accessible 
					pt.SetPoint(left + width, top + 20);
				}
			}
		}
	}
	if (pt.x != -1 && pt.y != -1)
		return pt;

	//next try GetGUIThreadInfo
	...
}
```

`IAccessible` 接口能做什么？

一个实现了 `IAccessible` 接口的 UI 元素（如按钮、文本框、菜单，甚至是您提到的插入符光标 `Caret`）会向操作系统暴露自己的信息，例如：

- 名称 (Name): 比如按钮上的文字“确定”。
- 角色 (Role): 比如“按钮”、“文本框”、“窗口”。
- 状态 (State): 比如“被选中”、“被禁用”、“隐藏”。
- 位置和大小 (Location): 它在屏幕上的坐标和尺寸。这正是 Ditto 获取光标位置的关键！

#### `IAccessible` 和 UI Automation (UIA) 是同一种东西吗？

不是，但它们是“前辈”与“后辈”的关系。

- **Microsoft Active Accessibility (MSAA)**: 这是**旧的、第一代**的辅助技术框架，核心就是 `IAccessible` 接口。它诞生于 Windows 95 时代，功能相对有限，但因为历史悠久，几乎所有 Windows 程序都对它有基础支持。
- **UI Automation (UIA)**: 这是**新的、现代的**辅助技术框架，随 .NET Framework 3.0 一同发布。它旨在**取代** MSAA，提供了更丰富、更强大、更灵活的功能。

**主要区别：**

| 特性   | IAccessible (MSAA) | UI Automation (UIA)                                    |
| ---- | ------------------ | ------------------------------------------------------ |
| 时代   | 旧（Windows 95+）     | 新（Windows Vista+, .NET 3.0+）                           |
| 功能   | 基础，有限              | 丰富，强大，可扩展                                              |
| 架构   | 简单，基于 COM          | 更复杂，基于 COM，但有很好的 .NET 封装                               |
| 兼容性  | 极高，几乎所有程序都支持       | 现代程序支持良好。为了向后兼容，UIA 内部提供了一个“桥”，可以把 MSAA 的信息转换成 UIA 格式。 |
| 获取信息 | 只能获取预定义的一组属性       | 可以获取大量属性，支持自定义模式（Pattern）                              |

**结论**：UIA 是 `IAccessible` 的超集和继任者。在现代 Windows 开发中，**推荐使用 UIA**，因为它功能更全。但为了兼容老旧程序，像 Ditto 这样需要和各种软件交互的工具，会同时使用多种技术（包括 MSAA）作为备选方案，这正是 `FocusCaret` 函数所做的。

#### Rust可以怎么处理？

在 Rust 中，要与这些基于 COM 的 Windows API 交互，通常需要使用特定的 crate 来处理 FFI (Foreign Function Interface) 和 COM 的复杂性。

- 最主流和推荐的方式是使用 `windows` crate，这是微软官方为 Rust 提供的 Windows API 绑定。
- 也可以使用 uia 包来处理

以下是一个简化的示例，演示如何用 Rust 和 `windows` crate 实现类似的功能（获取插入符位置）：

```rust
[dependencies.windows]
version = "0.56.0" # 使用最新版本
features = [
    "Win32_Foundation",
    "Win32_UI_Accessibility", // UIA
    "Win32_UI_WindowsAndMessaging",
    "Win32_System_Com",
    "Win32_System_Ole",
]
```

### 其他

好像确实是

尝试用deepwiki 分析下 https://deepwiki.com/sabrogden/Ditto

其快速窗口叫: `QPasteWnd`

定位的关键代码应该是: 

```cpp
CGetSetOptions::GetQuickPastePoint(point)
// https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/QuickPaste.cpp#L45
// https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/QuickPaste.cpp#L136

CPoint ptCaret = theApp.m_activeWnd.FocusCaret();
// https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/QuickPaste.cpp#L146

---

//If it is a window get the rect otherwise get the saved point and size
if (IsWindow(m_pwndPaste->m_hWnd) &&
    m_pwndPaste->IsIconic() == FALSE &&
    m_forceResizeOnNextShow == false)
{
    m_pwndPaste->GetWindowRect(rcPrev);
    csSize = rcPrev.Size();
}
else
{
    CGetSetOptions::GetQuickPastePoint(point);
    CGetSetOptions::GetQuickPasteSize(csSize);

    if (IsWindow(m_pwndPaste->m_hWnd))
    {
        csSize.cx = m_pwndPaste->m_DittoWindow.m_dpi.Scale(csSize.cx);
        csSize.cy = m_pwndPaste->m_DittoWindow.m_dpi.Scale(csSize.cy);
    }
}

CPoint ptCaret = theApp.m_activeWnd.FocusCaret();
	
---

CPoint ExternalWindowTracker::FocusCaret()
// https://github.com/sabrogden/Ditto/blob/37579d5d5869388027e8c6aa058dd5adb2bc7624/src/ExternalWindowTracker.cpp#L446
```

