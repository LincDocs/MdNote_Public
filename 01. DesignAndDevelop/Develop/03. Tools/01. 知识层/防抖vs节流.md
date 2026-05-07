---
create_date: 2026-05-07
last_date: 2026-05-07
---
# 防抖vs节流

by Gemini 3.1 Pro

## 比较

在前端开发中分别对应着两个非常经典的概念：**防抖（Debounce）** 和 **节流（Throttle）**。

虽然它们的目的都是为了限制高频触发事件（如选中文本、滚动、拖拽、调整窗口大小等）的执行频率，以优化性能，但它们的侧重点和适用场景完全不同。

以下是两者的比较以及其他的常见变种方案：

### 防抖（Debounce）—— “等动作结束后再执行”

只有在操作停止（如鼠标停止移动、停止输入文字）达到指定的时间间隔（如0.3s）后，才执行一次回调。如果在这个时间内又触发了动作，则重新计时。

- **优点：** 性能开销极小，因为无论用户操作多久，最终只执行一次。
- **缺点：** 无法在操作过程中给予用户实时反馈。
- **适用场景：** 搜索框输入联想（用户打完字再请求接口）、窗口 resize 结束后的布局重绘、文本选择结束后的划词翻译。

### 节流（Throttle）—— “动作过程中按固定频率执行”

在一个连续的操作过程中，无论操作频率多高，都保证在一个固定的时间间隔（如0.1s）内只执行一次回调。

- **优点：** 可以在操作过程中持续捕获变化，提供流畅且不卡顿的连续反馈。
- **缺点：** 相比防抖，执行次数更多，如果在回调中执行复杂计算或大量 DOM 操作，仍可能造成轻微卡顿。
- **适用场景：** 拖拽元素（Drag）、窗口调整（Resize）时的实时预览、滚动条（Scroll）事件监听（如懒加载图片）。

## 代码实现 Demo

以下是仅包含核心逻辑的简版 Demo。

### 防抖（Debounce）实现

每次触发事件都会清除上一次的定时器并重新开始计时。

```javascript name=debounce.js
/**
 * 防抖函数
 * @param {Function} func 需要防抖执行的回调函数
 * @param {number} delay 延迟时间（毫秒）
 */
function debounce(func, delay) {
  let timer = null;
  
  return function(...args) {
    const context = this;
    
    // 如果之前已经有定时器，清除它（重新计时）
    if (timer) {
      clearTimeout(timer);
    }
    
    // 开启新的定时器，delay 时间后执行
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// 使用示例：
// const handleSelection = debounce((text) => console.log('选中文本:', text), 300);
// document.addEventListener('selectionchange', () => handleSelection(window.getSelection().toString()));
```

### 节流（Throttle）实现

> [!WARNING]
> 这里的实现其实存在一些问题，更好的解决方法见后面章节的 "定时器+时间戳的完美节流" 一节

利用时间戳记录上一次执行的时间，只有当前时间与上次执行时间的差值大于设定间隔时才执行。

```javascript name=throttle.js
/**
 * 节流函数（时间戳版本）
 * @param {Function} func 需要节流执行的回调函数
 * @param {number} interval 触发间隔时间（毫秒）
 */
function throttle(func, interval) {
  let lastTime = 0;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    
    // 如果当前时间距离上次执行时间超过了设定的间隔，则执行
    if (now - lastTime >= interval) {
      func.apply(context, args);
      lastTime = now;
    }
  };
}

// 使用示例：
// const handleDrag = throttle((e) => console.log('拖拽坐标:', e.clientX, e.clientY), 100);
// window.addEventListener('mousemove', handleDrag);
```

## 其他进阶方案

除了基础的防抖和节流，实际业务中还会用到它们的变体：

### 立即执行防抖 (Immediate Debounce)

触发事件时**立即执行一次**，然后如果在设定的延迟时间内再次触发，则不执行并重新计时。常用于防止按钮连击（例如点赞、提交表单），点第一下立即生效，狂点的话后续点击全被屏蔽。

### 定时器+时间戳的完美节流 (Throttle with trailing edge)

上面给出的基础节流（时间戳版）有一个特点：它会在动作开始时立刻触发，*但如果动作停止时正好卡在时间间隔中间，最后那一次动作可能会被忽略*。

完整的节流实现（如 Lodash 的 `_.throttle`）结合了时间戳和定时器，确保不仅中间过程按频率触发，而且**动作停止后必定会补发最后一次**，以保证最终状态的准确性。

## 使用建议

- 只要你不需要中间状态（比如单纯的提交、完成编辑），**无脑用防抖**。
- 如果你需要给用户提供连续的视觉反馈（拖拽跟随、进度条更新、滚动监听），**必须用节流**。


