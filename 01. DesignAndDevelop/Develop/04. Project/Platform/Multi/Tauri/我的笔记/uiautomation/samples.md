# uiautomation方式示例

https://github.com/leexgone/uiautomation-rs/blob/main/samples/

## 目录

- uia_async/
- uia_async_event/
- uia_cached_print/
- uia_event_handler/
- uia_notepad/
- uia_print/
- uia_varaint/
- win_update/

## uia_notepad

```rust
use uiautomation::actions::Window;
use uiautomation::controls::WindowControl;
use uiautomation::core::UIAutomation;
use uiautomation::inputs::Keyboard;
use uiautomation::processes::Process;

fn main() {
    Process::create("notepad.exe").unwrap(); // 打开记事本

    let automation = UIAutomation::new().unwrap();
    let root = automation.get_root_element().unwrap();
    // 找到notepad窗口，并且在寻找过程中启用调试打印
    let matcher = automation.create_matcher().from(root).timeout(10000).classname("Notepad").debug(true);
    if let Ok(notepad) = matcher.find_first() {
        println!("Found: {} - {}", notepad.get_name().unwrap(), notepad.get_classname().unwrap());

        // 开始一系列的在记事本中的操作: 输出文本 -> 按住ctrlshift并向左移动
        notepad.send_text_by_clipboard("This is from clipboard.\n").unwrap();
        notepad.send_keys("Hello, Rust UIAutomation!", 10).unwrap();
        notepad.send_text("\r\n{Win}D.", 10).unwrap();

        let kb = Keyboard::new().interval(10).ignore_parse_err(true);
        kb.send_keys(" {None} (Keys).").unwrap();

        notepad.hold_send_keys("{Ctrl}{Shift}", "{Left}{Left}", 50).unwrap();

        let window: WindowControl = notepad.try_into().unwrap();
        window.maximize().unwrap(); // 最大化窗口
    }
}
```

## uia_print

https://github.com/leexgone/uiautomation-rs/blob/main/samples/uia_print/src/main.rs

递归打印，没啥好说的。全局打印内容太多了，所以我改了下，将 `root` 改成了 `focused`，即只打印聚焦的文本编辑环境的内容

```rust
use uiautomation::Result;
use uiautomation::UIAutomation;
use uiautomation::UIElement;
use uiautomation::UITreeWalker;
use uiautomation::controls::ControlType;
use uiautomation::types::UIProperty;
use uiautomation::variants::Variant;

fn main() {
    let automation = UIAutomation::new().unwrap();
    let filter = automation.create_property_condition(UIProperty::ControlType, Variant::from(ControlType::Pane as i32), None).unwrap();
    let walker = automation.filter_tree_walker(filter).unwrap(); //automation.get_control_view_walker().unwrap(); 
    let focused = automation.get_focused_element()?; // 当前聚焦元素
    let _root = automation.get_root_element().unwrap(); // 根元素

    print_element(&walker, &focused, 0).unwrap();
}

fn print_element(walker: &UITreeWalker, element: &UIElement, level: usize) -> Result<()> {
    for _ in 0..level {
        print!(" ")
    }
    println!("{} - {}", element.get_classname()?, element.get_name()?);

    if let Ok(child) = walker.get_first_child(&element) {
        print_element(walker, &child, level + 1)?;

        let mut next = child;
        while let Ok(sibling) = walker.get_next_sibling(&next) {
            print_element(walker, &sibling, level + 1)?;

            next = sibling;
        }
    }
    
    Ok(())
}
```

### 各种环境下的兼容性问题

author: LincZero

```rust
/** 递归打印传入的 element 及其子元素
 * 
 * 以下是不同环境下的测试:
 * 
 * - QQ环境: - [] (Edit) 群名 -> - [] (Text) <消息框内容>
 * - 浏览器input/textarea: 显示的是默认值而不是当前值，- [] (Edit) file content
 * - Obsidian: Edit -> 一堆散乱的 Text/Image (格式)，特别阅读模式，基本无法还原成源md
 * - notepad--:
 *   - [ScintillaEditView] (Edit)
 *     - [QWidget] (Group)
 *     - [QWidget] (Group) 
 *       - [QScrollBar] (ScrollBar)
 * - notepad: - [RichEditD2DPT] (Document) 文本编辑器
 * - VSCode: - [] (Edit) 现在无法访问编辑器。 若要启用屏幕阅读器优化模式，请使用 Shift+Alt+F1
 * - VSCode增强: - [] (Edit) Cargo.toml, 编辑器组2 -> [] (Text) [package] <文件内容>
 */
```

### 元素零散问题

author: LincZero

我额外还改了改

```rust
// 递归打印传入的 element 及其子元素
fn _test_uia_print(walker: &UITreeWalker, element: &UIElement, level: usize) -> uiautomation::Result<()> {
    for _ in 0..level {
        print!(" ")
    }
    println!("- [{}] ({}) {}", // 可以继续加各种信息
        element.get_classname()?, element.get_control_type()?, element.get_name()?);

    // 递归
    if let Ok(child) = walker.get_first_child(&element) {
        _test_uia_print(walker, &child, level + 1)?; // 递归

        let mut next = child;
        while let Ok(sibling) = walker.get_next_sibling(&next) {
            _test_uia_print(walker, &sibling, level + 1)?; // 递归

            next = sibling;
        }
    }
    
    Ok(())
}
```

上面这是代码

````md
# 标题

内容 **加粗** *斜体* `代码` $公式$

## 二级标题

> 引用

```rust
代码
```

| 表格a | 表格b |
| --- | --- |
| 表格c | 表格d |
````

上面这是我聚焦的md编辑器的源码

```
实时模式:

- [] (Edit) 
 - [] (Text) ​
 - [] (Text) ​
 - [] (Image) 
 - [] (Text) 标题
 - [] (Text) 内容
 - [] (Text) 加粗
 - [] (Text)  
 - [] (Text) 斜体
 - [] (Text)
 - [] (Text) 代码
 - [] (Text)
 - [] (Text) 公
 - [] (Text) 式
 - [] (Text) ​
 - [] (Text) ​
 - [] (Image)
 - [] (Text) 二级标题
 - [] (Text) ​
 - [] (Text) >
 - [] (Text)
 - [] (Text) 引用
 - [] (Text) Rust
 - [] (Text) 代码
 - [] (Table)
  - [] (Custom)
   - [] (Header) 表格a
    - [] (Text) 表格a
    - [] (Image)
    - [] (Image)
   - [] (Header) 表格b
    - [] (Text) 表格b
    - [] (Image)
  - [] (Custom)
   - [] (DataItem) 表格c
    - [] (Text) 表格c
    - [] (Image)
   - [] (DataItem) 表格d
    - [] (Text) 表格d
 - [] (Image) 
 - [] (Image)
  
源码模式:

- [] (Edit)
 - [] (Text) ​
 - [] (Text) ​
 - [] (Image)
 - [] (Text) # 
 - [] (Text) 标题
 - [] (Text) 内容 
 - [] (Text) **
 - [] (Text) 加粗
 - [] (Text) **
 - [] (Text)
 - [] (Text) *
 - [] (Text) 斜体
 - [] (Text) *
 - [] (Text)
 - [] (Text) `
 - [] (Text) 代码
 - [] (Text) `
 - [] (Text)
 - [] (Text) $
 - [] (Text) 公式
 - [] (Text) $
 - [] (Text) ​
 - [] (Text) ​
 - [] (Image)
 - [] (Text) ##
 - [] (Text) 二级标题
 - [] (Text) >
 - [] (Text) 引用
 - [] (Text) ```rust
 - [] (Text) 代码
 - [] (Text) ```
 - [] (Text) |
 - [] (Text)  表格a
 - [] (Text) |
 - [] (Text)  表格b
 - [] (Text) |
 - [] (Text) |
 - [] (Text)  ---
 - [] (Text) |
 - [] (Text)  --- 
 - [] (Text) |
 - [] (Text) |
 - [] (Text)  表格c
 - [] (Text) |
 - [] (Text)  表格d
 - [] (Text) |
```

上面这个是控制台打印。

现在，我希望能获得该 md 编辑器的原文，而非以零散的形式获得，有办法吗？

—— 好像不行

## 。

