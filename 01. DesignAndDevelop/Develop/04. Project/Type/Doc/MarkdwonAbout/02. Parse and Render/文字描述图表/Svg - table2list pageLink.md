---
create_date: 2026-10-14
last_date: 2026-10-15
author:
  - LincZero
---
# Svg - table2list pageLink

查看本章时，去除代码块查看

## table2list

**图标设计: 需要表示 "表格转换为列表" 的功能**

```html
lucide svg 风格参考:

table

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table preview-icon">
  <path d="M12 3v18"/>
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M3 9h18"/>
  <path d="M3 15h18"/>
</svg>

table-of-contents

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents preview-icon"><path d="M16 5H3"/><path d="M16 12H3"/><path d="M16 19H3"/><path d="M21 5h.01"/><path d="M21 12h.01"/><path d="M21 19h.01"/></svg>

list

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list preview-icon">
  <path d="M3 5h.01"/>
  <path d="M3 12h.01"/>
  <path d="M3 19h.01"/>
  <path d="M8 5h13"/>
  <path d="M8 12h13"/>
  <path d="M8 19h13"/>
</svg>

侧表

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-properties preview-icon">
  <path d="M15 3v18"/>
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M21 9H3"/>
  <path d="M21 15H3"/>
</svg>

侧表2

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-2 preview-icon">
  <path d="M3 9h18"/>
  <path d="M9 3v18"/>
  <rect x="3" y="3" width="18" height="18" rx="2"/>
</svg>

表格拆分

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-columns-split preview-icon">
  <path d="M14 14v2"/>
  <path d="M14 20v2"/>
  <path d="M14 2v2"/>
  <path d="M14 8v2"/>
  <path d="M2 15h8"/>
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M22 15h-4"/>
  <path d="M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/>
  <path d="M22 9h-4"/>
  <path d="M5 3v18"/>
</svg>

---

自定义 svg

(1) table mix list

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（一列三行） -->
  <rect width="9" height="18" x="2" y="3" rx="2"/>
  <path d="M2 9h9"/>
  <path d="M2 15h9"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M15 6h7"/>
  <path d="M15 12h7"/>
  <path d="M15 18h7"/>
</svg>

(2) 左侧圆角消除

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格，左上和左下为直角，右侧保留圆角 -->
  <path d="M2 3 H9 A2 2 0 0 1 11 5 V19 A2 2 0 0 1 9 21 H2 Z"/>
  <path d="M2 9h9"/>
  <path d="M2 15h9"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M15 6h7"/>
  <path d="M15 12h7"/>
  <path d="M15 18h7"/>
</svg>

(3) 左侧改为 lucide-table-columns-split

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M15 6h7"/>
  <path d="M15 12h7"/>
  <path d="M15 18h7"/>
</svg>

(4) 左边宽一点

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格，右边界 x=11，宽度与最初版本一致 -->
  <path d="M2 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h9"/>
  <path d="M2 15h9"/>
  <path d="M6 3v18"/>
  <!-- 右侧：列表 -->
  <path d="M15 6h7"/>
  <path d="M15 12h7"/>
  <path d="M15 18h7"/>
</svg>

(5) 加上点

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M13 6h.01"/>
  <path d="M13 12h.01"/>
  <path d="M13 18h.01"/>
  <path d="M16 6h6"/>
  <path d="M16 12h6"/>
  <path d="M16 18h6"/>
</svg>

(6) 宽松点

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M13.5 6h.01"/>
  <path d="M13.5 12h.01"/>
  <path d="M13.5 18h.01"/>
  <path d="M17 6h5"/>
  <path d="M17 12h5"/>
  <path d="M17 18h5"/>
</svg>

(7) 再宽松点

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M14 6h.01"/>
  <path d="M14 12h.01"/>
  <path d="M14 18h.01"/>
  <path d="M17.5 6h4.5"/>
  <path d="M17.5 12h4.5"/>
  <path d="M17.5 18h4.5"/>
</svg>

(8) 右侧的高度宽松点

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M14 5h.01"/>
  <path d="M14 12h.01"/>
  <path d="M14 19h.01"/>
  <path d="M17.5 5h4.5"/>
  <path d="M17.5 12h4.5"/>
  <path d="M17.5 19h4.5"/>
</svg>

(9) 再去掉点看看

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M15 5h7"/>
  <path d="M15 12h7"/>
  <path d="M15 19h7"/>
</svg>

(10) 加回点，然后左边窄回去

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h8"/>
  <path d="M2 15h8"/>
  <path d="M5 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M14 5h.01"/>
  <path d="M14 12h.01"/>
  <path d="M14 19h.01"/>
  <path d="M17.5 5h4.5"/>
  <path d="M17.5 12h4.5"/>
  <path d="M17.5 19h4.5"/>
</svg>

(11) 左边再简化，取 table-columns-split 的右侧的镜像，即少了竖线

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h4"/>
  <path d="M2 15h4"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M10 5h.01"/>
  <path d="M10 12h.01"/>
  <path d="M10 19h.01"/>
  <path d="M14 5h8"/>
  <path d="M14 12h8"/>
  <path d="M14 19h8"/>
</svg>

(12) 左侧不那么简化，只简化一点 (选用)

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2list preview-icon">
  <!-- 左侧：表格（取自 table-columns-split 的左侧部分） -->
  <path d="M2 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/>
  <path d="M2 9h7"/>
  <path d="M2 15h7"/>
  <path d="M4 3v18"/>
  <!-- 右侧：列表（三条横线） -->
  <path d="M13 5h.01"/>
  <path d="M13 12h.01"/>
  <path d="M13 19h.01"/>
  <path d="M17 5h5"/>
  <path d="M17 12h5"/>
  <path d="M17 19h5"/>
</svg>
```

## GetPageLink

```html
参考:

link

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link preview-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>

link2

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-2 preview-icon"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>

external-link

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link preview-icon"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

file link

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-symlink preview-icon">
  <path d="M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"/>
  <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
  <path d="m10 18 3-3-3-3"/>
</svg>

folder link

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-symlink preview-icon">
  <path d="M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"/>
  <path d="m8 16 3-3-3-3"/>
</svg>

---

page

panel-top

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-top preview-icon">
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M3 9h18"/>
</svg>

panels-top-left

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panels-top-left preview-icon"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>

---

自定义:

page-link

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-page-link preview-icon">
  <path d="M3 11
  V5 a2 2 0 0 1 2-2
  H19 a2 2 0 0 1 2 2
  V19 a2 2 0 0 1-2 2
  H5 a2 2 0 0 1-2-2
  v-2 a2 2 0 0 1 2-2
  h6"/>
  <path d="m8 18 3-3-3-3"/>
  <path d="M3 9h18"/>
</svg>

箭头右一点

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-page-link preview-icon">
  <path d="M3 11
  V5 a2 2 0 0 1 2-2
  H19 a2 2 0 0 1 2 2
  V19 a2 2 0 0 1-2 2
  H5 a2 2 0 0 1-2-2
  v-2 a2 2 0 0 1 2-2
  h7"/>
  <path d="m9 18 3-3-3-3"/>
  <path d="M3 9h18"/>
</svg>

top 小一点 (选用)

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-page-link preview-icon">
  <path d="M3 10
  V5 a2 2 0 0 1 2-2
  H19 a2 2 0 0 1 2 2
  V19 a2 2 0 0 1-2 2
  H5 a2 2 0 0 1-2-2
  v-2.5 a2 2 0 0 1 2-2
  h7"/>
  <path d="m9 17.5 3-3-3-3"/>
  <path d="M3 8h18"/>
</svg>

```
