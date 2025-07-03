# ref和reactive

Vue 中的 reactive 和 ref 有什么区别？好像都是响应式对象

## 基本差异

- 数据类型处理
    - `ref`: 可以包装任何数据类型（包括原始类型如 string、number、boolean）
    - `reactive`: 只能用于对象类型（对象、数组、Map、Set等）
- 访问方式
    - `ref`: 需要通过 `.value` 属性访问或修改值
    - `reactive`: 直接访问和修改属性，不需要 `.value`
- 响应式原理
    - `ref`: 基于类的 getter/setter 实现
    - `reactive`: 基于 ES6 的 Proxy 实现
- 选用
    - `ref`:
      - 处理基本类型数据（字符串、数字、布尔值等）时
      - 需要保持对响应式对象的引用但可能完全替换它时
      - 单一值的响应式状态时
    - `reactive`: 
      - 处理复杂的对象结构时
      - 多个相关属性需要一起管理时
      - 不需要替换整个对象时

```ts
import { ref, reactive } from 'vue'

// ref 示例
const count = ref(0)
console.log(count.value) // 0
count.value++
console.log(count.value) // 1

// reactive 示例
const state = reactive({
  count: 0,
  name: 'Vue'
})
console.log(state.count) // 0
state.count++
console.log(state.count) // 1
```

其他注意事项：

- `ref` 在模板中会自动解包，不需要使用 `.value`
- 解构问题:
  - 解构 `reactive` 对象会丢失响应性
  - 可以使用 `toRefs` 将 `reactive` 对象的属性转换为 `ref` 以保持响应性

## 使用建议总结

|场景|推荐 API|原因|
|---|---|---|
|管理对象/数组状态|`reactive`|直接操作属性，语法更自然|
|管理原始值（字符串、数字等）|`ref`|唯一选择|
|组件状态聚合|`reactive` + `toRefs`|解构时用 `toRefs` 保持响应性（如：`const { x, y } = toRefs(state)`）|
|灵活引用（可能替换整个值）|`ref`|通过 `.value` 替换不会丢失响应性|
## 响应性原理差异

|          | `reactive`                 | `ref`                           |
| -------- | -------------------------- | ------------------------------- |
| **实现方式** | 使用 `Proxy` 代理整个对象          | 包装对象：`{ value: ... }` + `Proxy` |
| 深层响应     | ✅ 默认深度响应                   | ✅ 深度响应（对象类型内部自动用 `reactive` 转换） |
| 原始值处理    | ❌ 无法处理原始值（String/Number 等） | ✅ 可包装原始值                        |

- Q：reactive 不需要 `.value` 的原理上也是自动解包吗？
- A：否。`reactive` 本身就是代理对象（Proxy），而不是包装器。




