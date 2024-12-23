# README_Chart

## 比较 (Svg、Canvas2D、Div)

### 简单比较1

- Div
  - 案例：anyblock版mindmap
  - 应用：一般的html
- Svg
  - 案例：icon图标、mermaid、platuml by svg、drow.io、markmap
  - 应用：icon图标、有连线
  - 优点：嵌入HTML方便、矢量缩放不失真
- Canvas
  - 案例：eChart、obsidian canvas、obsidian Canvas Mindmap、comfyui、百度/谷歌地图
  - 应用：高性能、有连线、有画笔/拖拽
  - 优点：矢量缩放不失真、大量数据或复杂的动画时性能优（可以搭配WebGL）、转图片方便
  - 缺点：Canvas内部元素不在Dom中

Canvas2D 与 Canvas3D 补充：Canvas3D 通常指 WebGL 在 Canvas 上进行 3D 绘图

### 简单比较2

参考： https://cloud.baidu.com/article/3317813

[list2ut]

- < 比较项
  - SVG
  - Canvas
- 绘制方式
  - 基于矢量的图形绘制技术，它使用XML来描述图形，因此可以无损地缩放到任意大小
  - 基于像素的图形绘制技术，它通过JavaScript的API在HTML5画布上绘制图形，一旦图形绘制完成，就不能再进行无损缩放，否则会导致像素失真（但是在缩放时可以重绘，保持清晰度）
- 编辑性
  - **更优**。由于SVG使用XML进行描述，因此可以使用任何文本编辑器进行编辑和修改，这使得SVG非常适合用于需要频繁修改和更新的图形
  - 绘制的图形是位图，不容易进行编辑和修改
- 动画效果
  - **更好**。SVG的动画可以通过CSS和JavaScript进行控制，可以实现更为流畅和自然的动画效果
  - 虽然也可以进行动画，但需要使用JavaScript编写复杂的动画逻辑，实现起来相对较为困难。
- 浏览器兼容性
  - **更好**。在大多数现代浏览器中都有很好的支持，并且在旧版本的Internet Explorer中也有插件支持
  - 在大多数现代浏览器中都有很好的支持，但在某些旧浏览器中可能存在问题
- 适用范围
  - 更适合用于需要大型渲染区域的应用。
    如地图、流程图等，因为它可以无损地缩放到任意大小，并且具有良好的编辑性和动画效果
  - 适合用于图形密集型的应用。
    如游戏、图表等，因为它可以通过JavaScript的API进行高效的图形渲染和更新
- 总结
  - 需要绘制**矢量**图形、需要**频繁修改和更新**图形、或者需要更好的**动画**效果和浏览器**兼容性**
  - 需要绘制**图形密集**型的应用、或者需要**高效**的**图形渲染**和**更新**

### 深入比较 (非常优秀的文章)

转： https://g2-v3.antv.vision/en/docs/manual/tutorial/renderers

HTML5 提供了 Canvas 和 SVG 两种绘图技术，也是多数 Web 图表库使用的渲染技术。Canvas 是基于脚本的，通过 JavaScript 指令来动态绘图。而 SVG 则是使用 XML 文档来描述矢量图。两者有不同的适用场景。

#### 适用场景

- Canvas：提供的绘图能力更底层，适合做到像素级的图形处理，能动态渲染和绘制大数据量的图形
- SVG：抽象层次更高，声明描述式的接口功能更丰富，内置了大量的图形、滤镜和动画等，方便进行文档元素的维护，也能导出为文件脱离浏览器环境使用。

下图从通用层面描述不同渲染技术各自适合的场景。

![](assets/A_2WKtTqXkMBMAAAAAAAAAAABkARQnAQ.jpg)

#### 性能差异

之前网上有不少 Canvas 和 SVG 性能对比的文章，得出的结论大体是 *“Canvas 性能更好，适合更大量数据的渲染”。其实这么说是**有失偏颇**的*。性能对比要看场景。

从底层来看，Canvas 的性能受画布尺寸影响更大，而 SVG 的性能受图形元素个数影响更大。下图是微软 MSDN 上给的一个对比图。（纵轴是渲染时间）

![](assets/A_7yoLQZTLlX4AAAAAAAAAAABkARQnAQ.png)

#### 总结

结论：如果单就图表库的视角来看，选择 Canvas 和 SVG 各有千秋。

- Canvas场景：小画布、大数据量。如热力图、大数据量的散点图等
- SVG场景：画布非常大，有缩放、平移等高频的交互，或者移动端对内存占用量非常敏感等场景
  (数量小时，SVG 的方案通常内存占用会更小，做缩放、平移等操作的时候往往帧率也更高)

比较流行的看法是 SVG 做定制和交互更有优势，因为有类似 DOM 的结构，能快速应用浏览器底层的鼠标事件、CSS 样式、CSS3 动画等。不过基于 Canvas 做上层封装后也能实现类似的定制和交互，并且自由度更高。




