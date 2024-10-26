# (idea) Gantt

## 思考内容 (群聊记录)

多条时间线并行（正符/农业/工业/战争/不同国家）……确实挺难画

做成数据库的形式，允许勾选需要哪几条时间线，动态渲染

这方面我认为应该有可以参考的东西，我找找

https://www.allhistory.com/ (主要关注里面的 “全画作” 一项)

不过mermaid的甘特图太窄，我说专业版的专门做甘特图的东西，可能能达到差不多的效果？

有点像多分层的甘特图

一个允许多时间线的甘特图

虽然mermaid的甘特图效果比较糟糕，语法……其实也糟糕，但我想是可以参考的专业的那种甘特图（可以拖拽缩放的）效果才能好

纯md的话，我感觉设计出来还行
每项只需要声明三个内容：
1. 时间段内容（允许md格式、加链接）
2. 时间范围（允许三种格式：首尾/首+持续时间/仅声明开始，即时间点）
3. 作用时间线（允许缺省，为作用于默认时间线。该项主要用于多个时间线的情况）

例如这样：

```
2001-2004, 做A事情, 事业线
2002-2005, 做B事情, 事业线
2003-2008, 丽丽, 感情线
2006-2010, 柳如烟, 感情线（别问为什么同一时间有两条女，问就是左拥右抱
```


