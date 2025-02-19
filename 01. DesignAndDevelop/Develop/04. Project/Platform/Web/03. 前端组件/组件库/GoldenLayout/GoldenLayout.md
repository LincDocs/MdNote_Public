---
create_time: 2025-02-11
Author: LincZero
---
# GoldenLayout

这个我23年用过，挺好用的。现在25年又需要用，再了下，也到v2版本了。顺便在用的时候做做笔记

不过就是两年没更新

- 参考
  - repo: https://github.com/golden-layout/golden-layout
  - website: https://golden-layout.github.io/golden-layout/
  - oldWebsite (v1): http://golden-layout.com/
  - demo online: https://codepen.io/pbklink/pen/dyWJNNm

## 安装

```shell
npm i golden-layout
```

## 使用

主要还是使用v1文档的demo和docs，v2的说明很少的

## V1文档

[lt]

- Download   | 下载
- [Demo](http://golden-layout.com/examples/)      | 示例 (建议用这个来学习)
- [Tutorials](http://golden-layout.com/tutorials/) | 教程
- [Docs](http://golden-layout.com/docs/)       | 文档
- Faq        | 常见问题

### Demo

[lt]

- [Demo](http://golden-layout.com/examples/)      | 示例 (建议用这个来学习)
  - 主要
    - row          | 行
    - column       | 列
    - stack        | 堆栈
    - saving state | 保存状态
  - 主题
    - 简单的黑暗主题
    - 简单的明亮主题
  - 配置
    - 黄金螺旋
    - 同步布局
    - 嵌套堆栈
  - 添加项目
    - 通过拖动
    - 通过选择
    - 到元素
  - 自定义功能
    - 扩展标头
    - 扩展选项卡
    - 变成重新订购1,2
    - 禁用标题
    - 有条件的关闭
    - 自定义拆分器
    - 配置的CSS类
    - 面板滚动
    - 自定义工具提示
  - 一体化
    - 简单的ReactJS示例
    - 复杂的ReactJS示例
    - Highcharts和YQL
    - Slickgrid
    - Angular
    - Webix

### Tutotials

[lt]

- [Tutorials](http://golden-layout.com/tutorials/) | 教程
  - Goldenlayout
    - 入门
    - 入门ReactJs
    - 保存状态
    - 添加项目
    - 标题控件
    - 弹出式
    - 扩展选项卡
  - 使用...
    - requirejs
    - Angular (简单)
    - Angular (复杂)
    - HighCharts
    - Slickgrid

### Docs

[lt]

- [Docs](http://golden-layout.com/docs/)       | 文档
  - 配置
    - Configuration      | 一般配置
    - Item Configuration | 项目配置。组件、行、列和堆栈配置
  - API
    - [GoldenLayout](http://golden-layout.com/docs/GoldenLayout.html)      | 主要的布局实例
    - ContentItem Item   | 组件、行、列和堆栈
    - Container          | 容器
    - BrowserWindow      | 浏览器
    - Header             | 标题
    - Tab                | 选项卡
    - EventEmitter       | GoldenLayou中每个对象都能发出事件，这是API

## 个人备注

其原理和做法，GoldenLayout 和 VueFlow 都是很类似的。都通过具名插槽注册组件，然后在生成对应的布局，最后把注册的组件按名字填入这些布局当中

对应的纯js写法也行，类似这样：

```js
// http://golden-layout.com/examples/
myLayout.registerComponent( 'example', function( container, state ){
  container.getElement().html( '<h2>' + state.text + '</h2>');
});
```









