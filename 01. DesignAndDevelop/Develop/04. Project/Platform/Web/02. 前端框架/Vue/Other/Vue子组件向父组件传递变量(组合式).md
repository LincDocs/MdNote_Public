---
create_time: 2024-12-23
Author: LincZero
---

# Vue子组件向父组件传递变量(组合式)

## 提前总结

| 方法                    | 优点                                   | 缺点                                    | 适用场景              |
| --------------------- | ------------------------------------ | ------------------------------------- | ----------------- |
| props 和事件发射 (emit)    | - 简单**直观**<br>- 常用方法，易于理解和使用         | - 只能用于父子组件之间的通信<br>- 数据流单向，可能需要额外处理逻辑 | 父子组件之间的数据传递和事件处理  |
| 依赖注入 (provide/inject) | - 适用于**任意深度**的组件层级<br>- 方便全局状态管理     | - 难以跟踪和调试<br>- 可能导致组件之间的耦合            | 深层次组件通信或全局状态管理    |
| 使用 ref 访问子组件实例        | - 可以直接调用/访问子组件的**所有**方法和数据<br>- 灵活性强 | - 依赖于组件实例，可能导致耦合<br>- 需要确保 ref 的正确绑定  | 需要直接访问子组件方法或数据的场景 |

- props 方式
  - 原理
    父组件将一个函数作为 prop 传递给子组件，子组件在需要的时候调用这个函数，并将数据作为参数传递给父组件。这种方法直接将父组件的方法暴露给子组件，子组件可以直接调用。
  - 适用场景
    直接调用父组件方法：适用于子组件需要频繁调用父组件的方法，或需要传递复杂的数据结构。
    减少事件管理：不需要在父组件和子组件之间定义和管理事件名称，避免了事件管理的复杂性。
- emit 方式
  - 原理
    父组件通过 @ 绑定事件监听器，子组件通过 emit 触发事件，将数据传递给父组件。这种方法依赖 Vue 的事件系统，遵循 Vue 的单向数据流理念。
  - 适用场景
    事件驱动：适用于子组件需要向父组件传递多个事件或不同类型的数据，事件机制更加清晰。
    解耦合：子组件不需要知道父组件的方法实现，减少了组件之间的耦合度。

主要区别

- 耦合度：使用 props 传递函数会增加组件之间的耦合度，因为**子组件需要知道父组件的方法签名**。而 emit 事件方式则保持了组件的解耦合，子组件不需要知道父组件的实现。
- 数据流：emit 事件方式遵循 Vue 的单向数据流原则，更符合 Vue 的设计理念，而 props 传递函数则是直接调用父组件的方法。
- 灵活性：emit 事件方式更灵活，适用于更复杂的场景，比如需要传递多个事件或不同类型的数据。

## 使用 props 和事件发射 (emit)

有两种常见的写法来传递数据或事件：通过 `props` 传递函数，以及通过 `@` 事件绑定和 `emit` 触发。下面是这两种写法的详细对比。

这是最常用的方法，通过 `emit` 事件从子组件传递数据到父组件

### 提前对比

|                     |                                    |                                  |                  |
| ------------------- | ---------------------------------- | -------------------------------- | ---------------- |
| 通过 `props` 传递函数     | - 简单直接  <br>- 适合直接调用父组件方法          | - 需要传递函数，可能导致耦合  <br>- 不适合多个事件处理 | 单一事件或方法调用        |
| 通过 `@` 事件绑定和 `emit` | - 遵循 Vue 的单向数据流  <br>- 事件机制清晰，易于维护 | - 需要定义和监听事件  <br>- 需要额外处理事件名称和参数 | 多个事件处理，清晰的事件触发机制 |

### emit

这种方法是通过 `@` 事件绑定在父组件中监听子组件的事件，并在子组件中使用 `emit` 来触发事件。

[# ParentComponent.vue]

```vue
<template>
  <div>
    <ChildComponent @update="handleUpdate" />
    <p>Received from child: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const message = ref('');

function handleUpdate(value) {
  message.value = value;
}
</script>
```

[# ChildComponent.vue]

```vue
<template>
  <div>
    <button @click="sendUpdate">Send Update</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['update']);

function sendUpdate() {
  emit('update', 'Hello from Child');
}
</script>
```

### 纯props

这种方法是将父组件中的函数通过 props 传递给子组件，子组件调用这个函数来传递数据。

(减少api使用的一种用法)

[# ParentComponent.vue]

```vue
<template>
  <div>
    <ChildComponent :update="handleUpdate" />
    <p>Received from child: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const message = ref('');

function handleUpdate(value) {
  message.value = value;
}
</script>
```

[# ChildComponent.vue]

```vue
<template>
  <div>
    <button @click="sendUpdate">Send Update</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  update: Function
});

function sendUpdate() {
  props.update('Hello from Child');
}
</script>
```

## 使用依赖注入 (provide/inject)

这种方法适用于深层次组件之间的通信

[# ParentComponent.vue]

```vue
<template>
  <div>
    <ChildComponent />
    <p>Received from child: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import ChildComponent from './ChildComponent.vue';

const message = ref('');
provide('message', message);
</script>
```

[# ChildComponent.vue]

```vue
<template>
  <div>
    <button @click="sendUpdate">Send Update</button>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const message = inject('message');

function sendUpdate() {
  message.value = 'Hello from Child';
}
</script>
```

## 使用 ref 访问子组件实例

这种方法适用于需要直接调用子组件方法或访问子组件数据的情况

[# ParentComponent.vue]

```vue
<template>
  <div>
    <ChildComponent ref="childRef" />
    <button @click="getChildMessage">Get Child Message</button>
    <p>Received from child: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const childRef = ref(null);
const message = ref('');

function getChildMessage() {
  message.value = childRef.value.getMessage();
}
</script>
```

[# ChildComponent.vue]

```vue
<template>
  <div>
    <p>Message from Child</p>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const message = ref('Hello from Child');

function getMessage() {
  return message.value;
}

defineExpose({
  getMessage
});
</script>
```
