# React杂记

## _

> react tsx 语法中，标签类的类声明不用 class 而是 className，这是什么设计上的考量？我感觉前者的关键字不是更符合吗？

根本原因：JSX 是 JavaScript，不是 HTML。**在 js 中，`class` 是 js 的保留关键字而非 html 的保留关键字**

JSX 最终会被编译成 JavaScript 对象（`React.createElement(...)` 调用）。在 JavaScript 的 DOM API 中，操作元素类名用的是：

```
element.className = "foo"  // ✅ DOM 属性名
element.class = "foo"      // ❌ 不存在的属性
```

| HTML 属性    | React/JSX 属性 | 原因                 |
| ---------- | ------------ | ------------------ |
| `class`    | `className`  | `class` 是 JS 保留字   |
| `for`      | `htmlFor`    | `for` 是 JS 保留字（循环） |
| `tabindex` | `tabIndex`   | camelCase 统一风格     |

## _

> react 的 className 好像很多那种快捷表示样式的变量？那个是什么，使用场景是什么，有什么优点？让他们生效需要什么特殊的配置吗，他们会在渲染之后被删除变成 css 吗？

### Tailwind CSS

```jsx
export function Card() {
  return (
    <div className="flex items-center p-4 rounded-lg shadow-md bg-white">
      Hello
    </div>
  )
}
```

**特点：**

- 直接写工具类名字符串，每个类名对应一条 CSS 规则（`flex` → `display: flex`）
- 构建时 Tailwind 扫描代码，只打包用到的类，生成对应 CSS
- 渲染后类名就在 DOM 里，CSS 在全局样式表中，**不会被删除**
- **优点**：不用写 CSS 文件，样式即代码，极致开发效率

**需要 安装 + 配置 使用**


