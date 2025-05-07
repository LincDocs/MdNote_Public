---
create_time: 2025-04-23
---
# js的析构

## 基石：自动回收、**必然闲时回收**

注意最重要的一点：闲时回收

**没有任何方法**能够人为控制对象析构，**但是有方法**能够设置标识符以停止资源运行 (**停止而非释放**)

## 定时器析构问题

在 JavaScript/TypeScript 中，定时器（setInterval/setTimeout）不会自动析构

```js
onUnmounted(() => {
  nodedata_syncType.value = 'no'
  // 注意项：
  // 在 JavaScript/TypeScript 中，定时器（setInterval/setTimeout）不会自动析构，这是由其底层设计机制决定的
  // clearInterval保证立即而非闲时停止定时器 (并且此时也只是标识符覆盖，而非对象销毁)
  if (nodedata_timer.value !== null) { clearInterval(nodedata_timer.value); nodedata_timer.value = null; }
})
```

## 相关方法 - destory() 不等于析构函数

destory的回调

- 一种情况只是告诉你这个对象可以被自动回收了。但并不会马上被回收，他还是会存在一段时间。
- 是也不确定……没有马上检测到可以被自动回收也是有可能的

即

- 没办法第一时间检测到可以被自动回收
- 检测到可以被自动回收后，也不会马上回收资源。**存在多久没法人为控制**

## 相关方法 - dispose() 手动停止 (伪手动释放)

通过这种方法，能够手动通知资源的停止 (**停止而非释放**)，从而避免不会立刻释放资源而造成的问题

**我们无法释放资源，仅可以停止资源代替释放资源**

```js
class SafeClass {
  constructor() {
    this.timer = setInterval(/* ... */)
  }

  // 必须手动调用的销毁方法
  dispose() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null // 打破引用
    }
  }
}
```
