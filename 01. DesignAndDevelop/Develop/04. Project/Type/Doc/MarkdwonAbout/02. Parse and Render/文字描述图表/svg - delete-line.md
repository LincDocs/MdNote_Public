---
create_date: 2026-04-14
last_date: 2026-04-14
---
# Svg - delete-line

(请结合源码查看)

## 背景

svg中是否有擦除线条的方式，例如我想要在原图标的基础上加上一个删除线 (path/line)

并且为了提高该删除线的易分辨程度，我希望在该删除线上下各加上一条擦除线擦掉原图标的那一点区域

- 其实如果将这根线的颜色弄成图标的背景颜色感觉也大致能实现？但这样实现可能难以在多种不同背景颜色下支持。所以不太想用
- 如果将删除线下的图案重新绘制也可以实现，但那样似乎太麻烦了

这是可能可以实现的吗？

在 SVG 中，确实有优雅的方式实现"擦除线条"的效果，不需要依赖背景色！主要有两种思路：

### ✅ 方案：使用 `mask` 遮罩

这是最推荐的 SVG 原生方案。

**核心原理：**
- SVG 的 `<mask>` 元素中，**白色 = 显示，黑色 = 隐藏（擦除）**
- 用黑色矩形在 mask 中"挖掉"原图标的对应区域，再叠加删除线

**示例结构：**

```xml name=strikethrough-icon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <!-- 定义遮罩：白色=显示，黑色=擦除 -->
    <mask id="eraseMask">
      <!-- 先全部显示 -->
      <rect width="24" height="24" fill="white"/>
      
      <!-- 删除线上方的擦除区域（黑色 = 挖掉） -->
      <rect x="2" y="10.5" width="20" height="1.5" fill="black"/>
      <!-- 删除线下方的擦除区域 -->
      <rect x="2" y="13" width="20" height="1.5" fill="black"/>
    </mask>
  </defs>

  <!-- 原始图标，应用遮罩后，删除线穿过的区域被"挖空" -->
  <g mask="url(#eraseMask)">
    <!-- 这里放你的原始图标 path -->
    <path d="M3 3 L21 21 ..." fill="currentColor"/>
  </g>

  <!-- 删除线本体（在遮罩之外，不受影响） -->
  <line x1="2" y1="12" x2="22" y2="12" 
        stroke="currentColor" stroke-width="2" 
        stroke-linecap="round"/>
</svg>
```

### 效果示意

```
原图标（被 mask 挖掉中间区域）：

  ████████████████████
  ████████████████████
  ████████  ← 挖掉这一行（擦除线1）
  ────────────────────  ← 删除线
  ████████  ← 挖掉这一行（擦除线2）
  ████████████████████
  ████████████████████
```

### 优势对比

| 方案 | 背景色无关 | 实现难度 | 说明 |
|------|-----------|----------|------|
| 依赖背景色的线 | ❌ | 简单 | 换背景就穿帮 |
| 重新绘制图案 | ✅ | 复杂 | 工作量大 |
| **`mask` 遮罩** | ✅ | **中等** | **推荐** |

### 实用建议

- 擦除区域的高度 建议比删除线宽度各多 `1~2px`，这样视觉上删除线才能"穿出"图案
- 删除线倾斜 如果需要斜线，`mask` 里的擦除区域换成 `<line>` 并设置 `stroke` 为黑色、加粗即可
- `currentColor` 支持 整个方案完全兼容 `currentColor`，深色/浅色模式下都能正常工作

这个方案完全可行，而且是 SVG 的标准用法 ✅

## 实战1 - 删除加粗

很好，下面这个是我现在的图标：

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold">
  <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/>
  <path d="m2 2 20 20"/>
</svg>
```

其中 `<path d="m2 2 20 20"/>` 是删除线

你帮我改良一下，在该删除线外擦除一下，以提升该icon的辨识度

---

分析你的图标：删除线是从 `(2,2)` 到 `(22,22)` 的对角线，需要在这条线的两侧用 mask 擦除原图标的内容。

```xml name=strikethrough-icon.svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold">
  <defs>
    <mask id="eraseMask">
      <!-- 默认全部显示 -->
      <rect width="24" height="24" fill="white"/>
      <!-- 沿对角线方向擦除一条带状区域，覆盖删除线两侧 -->
      <!-- 用一条较粗的黑色线模拟擦除带 -->
      <line x1="2" y1="2" x2="22" y2="22"
            stroke="black" stroke-width="5" stroke-linecap="round"/>
    </mask>
  </defs>

  <!-- 原始图标，应用遮罩 -->
  <g mask="url(#eraseMask)">
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/>
  </g>

  <!-- 删除线，不受遮罩影响，渲染在最上层 -->
  <line x1="2" y1="2" x2="22" y2="22"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold">
  <defs>
    <mask id="eraseMask">
      <rect width="24" height="24" fill="white"/>
      <line x1="2" y1="2" x2="22" y2="22"
            stroke="black" stroke-width="5" stroke-linecap="round"/>
    </mask>
  </defs>
  <g mask="url(#eraseMask)">
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/>
  </g>
  <line x1="2" y1="2" x2="22" y2="22"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>

**关键点说明：**

- mask 里的黑色 `<line>` 的 `stroke-width="5"` = 删除线两侧各擦除 **1.5px**（5 - 2 = 3，两侧各 1.5px）
- 删除线本身的 `stroke-width="2"` 保持与原图标线宽一致
- 如果觉得擦除区域太窄/太宽，只需调整 mask 里那条线的 `stroke-width` 即可，删除线本身不受影响

## 实战2 - 标题上的删除

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-icon lucide-heading">
    <defs>
        <mask id="eraseMask">
            <rect width="24" height="24" fill="white"/>
            <line x1="2" y1="2" x2="22" y2="22"
                stroke="black" stroke-width="5" stroke-linecap="round"/>
        </mask>
    </defs>
  
    <g mask="url(#eraseMask)">
        <path d="M6 12h12"/>
        <path d="M6 20V4"/>
        <path d="M18 20V4"/>
    </g>
    
    <line x1="2" y1="2" x2="22" y2="22"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
```

## 实战3 - 链接删除

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-off-icon lucide-link-2-off"><path d="M9 17H7A5 5 0 0 1 7 7"/><path d="M15 7h2a5 5 0 0 1 4 8"/><line x1="8" x2="12" y1="12" y2="12"/><line x1="2" x2="22" y1="2" y2="22"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-off-icon lucide-link-2-off">
    <path d="M9 17H7A5 5 0 0 1 7 7"/>
    <path d="M15 7h2a5 5 0 0 1 4 8"/>
    <line x1="8" x2="12" y1="12" y2="12"/>
    <line x1="2" x2="13" y1="2" y2="13"/>
</svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-off-icon lucide-link-2-off">
    <path d="M9 17H7A5 5 0 0 1 7 7"/>
    <path d="M15 7h2a5 5 0 0 1 4 8"/>
    <line x1="8" x2="12" y1="12" y2="12"/>
    <line x1="2" x2="22" y1="2" y2="22"/>
    <line x1="2" x2="22" y1="22" y2="2"/>
</svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-off-icon lucide-link-2-off">
    <path d="M9 17H7A5 5 0 0 1 7 7"/>
    <path d="M15 7h2a5 5 0 0 1 4 8"/>
    <line x1="8" x2="12" y1="12" y2="12"/>
    <line x1="4" x2="22" y1="2" y2="20"/>
    <line x1="2" x2="20" y1="4" y2="22"/>
    <!--line x1="2" x2="22" y1="2" y2="22"/-->
    <!--line x1="4" x2="20" y1="20" y2="4"/-->
</svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-off-icon lucide-link-2-off">
    <path d="M9 17H7A5 5 0 0 1 7 7"/>
    <path d="M15 7h2a5 5 0 0 1 4 8"/>
    <line x1="8" x2="12" y1="12" y2="12"/>
    <line x1="5" x2="22" y1="2" y2="19"/>
    <line x1="2" x2="19" y1="5" y2="22"/>
    <!--line x1="2" x2="22" y1="2" y2="22"/-->
    <!--line x1="4" x2="20" y1="20" y2="4"/-->
</svg>


