# VueFlow学习随笔

## VueFlow学习笔记 (开发者的学习杂记)

### Main

- 大部分看官网文档就行了
- 然后一部分可能在代码注释里
- 剩余的笔记，才会做在这里

### 原理

- 拖拽相关：
  D3.js
- 自定义节点：
  见NodeFlow.vue，运用的自定义插槽。VueFlow标签先通过传入的数据构造有自定义标签的插槽位置，然后再用具名插槽v-slot(简写#)把插槽内容进行插入/替换。
  我自定义也仿照这个设计做了 "自定义 节点项"
- 其他：
  VueUse

## 组合式函数部分

参考：https://vueflow.dev/typedocs/

注意：以下说的 “原信息” 指传入节点/socket/edge组件时的props信息，而非对象信息。
对象信息通常要根据 “原信息” 提供的id，再使用如 `getConnectedEdges(id)` 的API获取

- useConnection        | 可组合用于访问当前正在进行的连接，返回：当前连接：startHandle、endHandle、status、position
- useEdge              | (核心) 可组合访问边缘对象及其 dom 元素
- useEdgesData         | (核心) 
- useGetPointerPosition
- useHandle            | (核心) 
- ~~useHandleConnections~~ | (核心) (弃用，`useNodeConnections` 代替) 与所选handle连接的线的原信息
- useKeyPress
- useNode              | (核心)
- useNodeConnections   | (核心) (1.42.0 最近新增的) 检索连接到一个节点的所有边。可以通过句柄类型和id进行过滤
- useNodeId            | (核心) 
- useNodesData         | (核心) 节点的原信息
- useNodesInitialized
- useVueFlow
- useZoomPanHelper

```js
// 除文档，可以参考 node_modules/@vue-flow/core/dist/composables/，这下面都是组合式函数
// 学习要点：
// 需要区分 useXXX、useXXXId、useXXXsData 三者
// 需要区分 edge、connect

// ----------------------- Node -----------------------------

/**
 * 可组合，提供对节点对象、父节点对象、连接边及其 dom 元素的访问
 * 如果没有提供节点 ID，则从上下文中注入节点 ID
 * 如果你不提供 ID，则必须在自定义节点组件的子级中调用此可组合项，否则将抛出
 * 
 * @return (object{
 *   connectedEdges
 *   id: string
 *   node
 *   nodeEl
 *   parentNode
 * })
 */
useNode

/**
 * 此可组合项从 ctx 返回当前节点 id。
 * 它应该在（自定义）节点组件 ctx 内部使用，因为 id 由内部NodeWrapper组件提供。
 * 
 * @return (id: string)
 */
useNodeId

/**
 * 可组合用于接收一个或多个节点的数据
 * 
 * @return ComputedRef< NodeData< NodeType>[]>
 *   NodeData: { id, type, data }
 */
useNodesData

// ----------------------- Edge -----------------------------

/**
 * 可组合访问边缘对象及其 dom 元素
 * 如果没有提供边缘 ID，则从上下文中注入边缘 ID
 * 如果你不提供 ID，则必须在自定义边缘组件的子级中调用此可组合项，否则将抛出
 * 
 * @return (object {
 *   id: string,
 *   edge,
 *   edgeEl,
 * })
 */
useEdge

/**
 * 可组合用于接收一个或多个节点的数据
 * @return (ComputedRef<EdgeData<EdgeType> | null>) 数据对象数组
 *   EdgeData: { id, type, data }
 */
useEdgesData

/**
 * 可组合用于访问当前正在进行的连接
 * 
 * @return (object {
 *   startHandle,
 *   endHandle,
 *   status,
 *   position,
 * })
 */
useConnection

/**
 * 返回的现有连接的可组合项<Handle />
 * 
 * @return (ComputedRef< HandleConnection[]>)
 *   HandleConnection: {
 *     edgeId: string,
 *     source: string,
 *     sourceHandle: string,
 *     target: string,
 *     targetHandle: string,
 *   }
 */
useHandleConnections

// ----------------------- Handle ---------------------------

/**
 * 此可组合项提供处理事件的监听器
 * 通常建议使用 `<Handle />` 组件来代替此可组合项
 * @return (object {
 *   handleClick(),
 *   handlePointerDown(),
 * })
 */
useHandle

// ----------------------- Other ----------------------------

/**
 * 返回用于获取指针位置的函数的可组合项
 * @return (Function)
 */
useGetPointerPosition

/**
 * 如果按下某个键，则返回布尔值的可组合项
 * @return (Ref< boolean>)
 */
useKeyPress

/**
 * 可组合用于获取所有节点的初始化状态。
 * 
 * 当新节点添加到图中时，它不会立即初始化。这是因为节点的边界尚不清楚。当所有节点都初始化后，即当它们的边界已知时，此可组合项将返回 false，然后返回 true。
 * 
 * @return (ComputedRef< boolean>)
 */
useNodesInitialized

/**
 * 提供对存储实例的访问的可组合项
 *
 * 如果没有提供 id，则从上下文中注入 store 实例
 * 
 * 如果在上下文中没有找到存储实例，则创建一个新的存储实例并在存储中注册
 * 
 * @return (VueFlowStore)
 */
useVueFlow

/**
 * 使用缩放平移助手
 * 
 * @deprecated 改用useVueFlow
 */
useZoomPanHelper
```

## 组合式函数部分 - useVueFlow

useVueFlow 是 VueFlow 提供的最重要且最特殊的组合式函数之一，这里重点提下

- use组合函数里如果用了inject等，必须要在setup作用域下工作，所以我们要缓存一次变量
- 而 useVueFlow() 通常导出store里的普通函数/数据。通常能在非setup作用域下工作。如findNode等
- 不过只是说 useVueFlow 里的函数可以在非setup作用域下工作，useVueFlow 本身还是要在 setup 时运行的。例如 `流程控制` 和 `自动布局` 两个实现中，都是在setup中 useVueFlow 并闭包 (缓存在setup时期的useVueFlow结果)

useVueFlow 能导出的东西：

```ts
// 这里不直接给结果，而是顺着调用链往下

// 1 https://vueflow.dev/typedocs/functions/useVueFlow.html
export declare function useVueFlow(id?: string): VueFlowStore
export declare function useVueFlow(options?: FlowOptions): VueFlowStore

// 2 https://vueflow.dev/typedocs/type-aliases/VueFlowStore.html
export type VueFlowStore =
  {
    readonly id: string
    readonly emits: FlowHooksEmit
    readonly nodeLookup: ComputedRef<NodeLookup>
    readonly edgeLookup: ComputedRef<EdgeLookup>
    /** current vue flow version you're using */
    readonly vueFlowVersion: string
  } & FlowHooksOn &
  ToRefs<State> &
  Readonly<ComputedGetters> &
  Readonly<Actions>

// 3 常用的有：
// (见下)
```

[lt]

- [Actions](https://vueflow.dev/typedocs/type-aliases/ComputedGetters.html)/
  - setNodes, setEdges
  - addNodes, addEdges
  - findNode, findEdge
  - updateNode, updateEdge
  - updateNodeData, updateEdgeData
  - applyNodeChanges, applyEdgeChanges
  - setMinZoom, setMaxZoom
  - getConnectedEdges
- [ComputedGetters](https://vueflow.dev/typedocs/type-aliases/ComputedGetters.html)/
- [State](https://vueflow.dev/typedocs/interfaces/State.html)/
  - nodes
  - edges

## 注入相关

https://github.com/search?q=repo%3Abcakmakoglu%2Fvue-flow+provide%28&type=code

能发现几个主要的注入数据：

```ts
provide(NodeId, props.id)
provide(NodeRef, nodeElement)

provide(EdgeId, props.id)
provide(EdgeRef, edgeEl)

provide(VueFlow, vueFlow)
provide(BlobityInjection, blobity as Ref<Blobity>)
provide(Slots, slots)
```


