# ECharts 实现 Gantt 图实例

在看这一篇之前，应该先看:

- ECharts 的 gantt issue: https://github.com/apache/echarts/issues/19579
- 一个用户使用echarts模拟甘特最后放弃，转投dhtmlx/Gantt: https://juejin.cn/post/6844904106042064910
- 别人的实现demo:
  - 我觉得效果比较好的: https://codepen.io/joanneccwang/pen/XWMjzGJ
    `type: 'custom', renderItem: this.renderItem,`
  - 这个也比较好，还有原理讲解: https://zhang.beer/vuepress/blog/vue/gtt.html
    不过这个的原理和其他几个不同，使用柱状图模拟
    `type: "bar",`
  - 官方的甘特_航班图: https://echarts.apache.org/examples/zh/editor.html?c=custom-gantt-flight&theme=dark
    `type: 'custom', renderItem: renderGanttItem,`
  - 官方的甘特_性能图: https://echarts.apache.org/examples/zh/editor.html?c=custom-profile&random=lq2xwnkbff
    `type: 'custom', renderItem: renderItem,`
  - 参考官方航班图的: https://blog.csdn.net/weixin_45719444/article/details/129540303

## 原理

甘特图与柱状图在图形的构成方式上类似，数据都是条状呈现，只是起点不一样，那能不能通过两条数据的叠加实现改变起点来绘制甘特图呢？

这里使用到了 ECharts 两个重要的属性 —— stack 和 z 。

stack 用于数据堆叠，同个类目轴上系列配置相同的 stack 后，后一个系列的值会在前一个系列的值上相加，堆叠在同一条状数据上，当 stack 不同时，同个类目轴上后一个系列的值则会另起一行/列显示。

## 一些数据demo

[list2echarts_gantt]

- 1840-06/P3Y| 英军发动鸦片战争

- 1842-08/P3Y
  
  清政府与英国签订《南京条约》:
  1. 中国割让香港岛给英国;
  2. 赔款洋银2100万元;
  3. 开放广州、厦门、福州、宁波、上海五处为通商口岸;

  > [!note]
  > 《南京条约》影响
  >
  > 1. 中国近代史上第一个不平等条约，给中国人民带来深重的灾难，开创了列强以条约形式侵略和奴役中国的恶例;
  > 2. 中国的国家主权和领土完整遭到破坏，逐步沦为半殖民地半封建社会;
  > 3. 中国社会的主要矛盾由地主阶级与农民阶级的矛盾，演变为帝国主义和中华民族的矛盾（主要矛盾)、封建主义和人民大众的矛盾;
  > 4. 反侵略反封建成为中国人民肩负的两大历史任务;
  > 5. 中国逐渐开始了反帝反封建的资产阶级民主革命。

- 1841-05/P3Y
  
  三元里人民的抗英斗争，是中国近代史上中国人民第一次大规模的反侵略武装斗争。
  
  > ![ ](https://tse1-mm.cn.bing.net/th/id/R-C.4bbce1406f4442c1360edde26baa894d?rik=iHeUeby0jS5lnw&riu=http%3a%2f%2fp8.qhmsg.com%2fdr%2f270_500_%2ft01dbb76ff833d0a159.jpg&ehk=yggnC0t62%2b6DEVjvBgs%2fXJuuexBucd66FTc5gL0Gw%2fA%3d&risl=&pid=ImgRaw&r=0)
  
- 1851-01/P3Y
  
  洪秀全金田村发动起义，建号太平天国。1853年3月，占领南京,定为首都,改名天京，正式宜告太平天国农民政权的建立。颁布《天朝天亩制度》、天平军北伐

[list2echarts_gantt]

- 2025-12-03/2025-12-24 | 上半，杜林、温迪、雅柯达卡池
- 2025-12-24/2026-01-14 | 下半，瓦蕾莎、希诺宁卡池
  - mm
  - AA
- 2025-12-05/2025-12-15 | 「哐哐当当雀雀球」
- 2025-12-10/2026-01-13 | 「幽境危战」
- 2025-12-03/2026-01-13 | 「干“雪”度假村，派对聚奇域！」网页活动
- 2025-12-29/2026-01-07 | 「讽勇争锋，龙之劲斗」
- 2025-12-19/2026-01-05 | 「炽魂斗士的雪界之旅」
- 2026-01-05/2026-01-12 | 「百货奇货」
- 2025-12-01/2026-02-23 | 「砺行修远」2期：参与活动可兑换角色命座！
- 2025-12-01            | 幻想真境巨诗 (火冰风, 再下期是火水雷)
- 2026-01-02            | 月之三版本前瞻

[list2echarts_gantt]

- 2025-12-03T08:30/PT1H | 起床
- 2025-12-03T08:50/2025-12-03T09:00 | 吃早饭
- 2025-12-03T12:00/2025-12-03T12:30 | 吃午饭
- 2025-12-03T18:00/2025-12-03T18:50 | 吃晚饭

## demo —— 官方性能gantt 简化版

```js
// 生成模拟数据，填充data数据
var data = [];
var startTime = +new Date();
var categories = ['categoryA', 'categoryB', 'categoryC']; // y轴分类，多少行
categories.forEach(function (category, index) {
  var baseTime = startTime;
  for (var i = 0; i < 10; i++) { // 给每行生成10个数据
    var duration = Math.round(5000 + Math.random() * 10000);
    data.push({
      name: 'test',
      value: [index, baseTime, (baseTime += duration), duration],
    });
    baseTime += Math.round(Math.random() * 2000);
  }
});
console.log('debug mock data', data) // data类型: {name: string, value[分类索引0/1/2, 开始时间, 结束时间=开始+经过, 经过时间]}

// 生成模拟数据2
// 还需要: 总范围、分组数
categories = ['', ' ', '', '', '', '', '']; // categoryA
startTime = 1764518400000 - 1*24*60*60*1000
data = [
  {
    "name": "上半，杜林、温迪、雅柯达卡池\n- mm\n- AA",
    "value": [
      0,
      1764691200000,
      1766505600000,
      1814400000
    ]
  },
  {
    "name": "下半，瓦蕾莎、希诺宁卡池",
    "value": [
      0,
      1766505600000,
      1768320000000,
      1814400000
    ]
  },
  {
    "name": "「哐哐当当雀雀球」",
    "value": [
      1,
      1764864000000,
      1765728000000,
      864000000
    ]
  },
  {
    "name": "「幽境危战」",
    "value": [
      2,
      1765296000000,
      1768233600000,
      2937600000
    ]
  },
  {
    "name": "「干“雪”度假村，派对聚奇域！」网页活动",
    "value": [
      3,
      1764691200000,
      1768233600000,
      3542400000
    ]
  },
  {
    "name": "「讽勇争锋，龙之劲斗」",
    "value": [
      1,
      1766937600000,
      1767715200000,
      777600000
    ]
  },
  {
    "name": "「炽魂斗士的雪界之旅」",
    "value": [
      4,
      1766073600000,
      1767542400000,
      1468800000
    ]
  },
  {
    "name": "「百货奇货」",
    "value": [
      4,
      1767542400000,
      1768147200000,
      604800000
    ]
  },
  {
    "name": "「砺行修远」2期：参与活动可兑换角色命座！",
    "value": [
      5,
      1764518400000,
      1771776000000,
      7257600000
    ]
  },
  {
    "name": "月之三版本前瞻",
    "value": [
      6,
      1735747200000,
      1735833600000,
      86400000
    ]
  },
  {
    "name": "幻想真境巨诗 (火冰风, 再下期是火水雷)",
    "value": [
      6,
      1764518400000,
      1764604800000,
      86400000
    ]
  }
]

// 填充颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
data.forEach(function (item) {
  item.itemStyle = {
    color: getRandomColor()
  };
});

// 计算高度
// 动态计算图表高度
var barHeight = 40; // 每个柱子的高度
var gridHeight = categories.length * barHeight; // 计算 grid 的总高度

var lastMonth = -1; // 用来记录上一个刻度的月份

// 自定义渲染函数
function renderItem(params, api) {
  var categoryIndex = api.value(0); // 分类索引0/1/2
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1] * 1 - 5;
  // console.log('原尺寸', api.size([0, 1]))
  var rectShape = echarts.graphic.clipRectByRect( // 绘制矩形，并裁减
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  );
  return (
    //rectShape && {
    //  type: 'rect',
    //  transition: ['shape'],
    //  shape: rectShape,
    //  style: api.style()
    //}
    rectShape && {
      type: 'group', // 使用 group 包含矩形和文本
      children: [
        {
          // 矩形元素
          type: 'rect',
          transition: ['shape'],
          shape: rectShape,
          style: api.style()
        },
        {
          // 文本元素
          type: 'text',
          transition: ['style'], // 对样式应用过渡动画
          style: {
            x: start[0] + 5, // 将文本放在矩形内部，并向右偏移 5px
            y: start[1], // 垂直居中
            text: data[params.dataIndex].name,// text: api.value(3), // + ' ms', // 文本内容
            fill: '#fff', // 文本颜色
            textVerticalAlign: 'middle', // 文本垂直对齐方式
            textAlign: 'left' // 文本水平对齐方式
          }
        }
      ]
    }
  );
}
option = {
  tooltip: { // 悬浮显示文字
    trigger: 'item',
    formatter: function (params) { // 支持html
      // var duration = params.value[3];
      // var categoryName = categories[params.value[0]];
      return echarts.format.formatTime('MM-dd', params.value[1]) +
        '/' +
        echarts.format.formatTime('MM-dd', params.value[2]) +
        '<br />' +
        data[params.dataIndex].name.replaceAll('\n', '<br />');
    }
  },
  dataZoom: [
    {
      type: 'slider', // 滑动条型 dataZoom
      xAxisIndex: 0, // 控制第一个 X 轴
      filterMode: 'weakFilter',
      height: 20, // 滑动条高度
      bottom: 10, // 距离底部的距离
      start: 0, // 初始显示范围
      end: 100, // 初始显示范围
      handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      showDetail: false,
    },
    {
      type: 'inside', // 内置型 dataZoom，支持鼠标滚轮缩放
      xAxisIndex: 0, // 控制第一个 X 轴
      filterMode: 'weakFilter',
      start: 0,
      end: 100
    }
  ],
  grid: {
    height: gridHeight,
    top: 40,
    bottom: 10,
  },
  xAxis: {
    position: 'top',
    min: startTime,
    scale: true,
    splitNumber: 30, // 显示更密集 (非一定，会避免标签重叠)
    axisLabel: {
      fontSize: 10, // 显示更密集
      formatter: function (val) {
        // console.log('xAxis val', val) // 这里的val是时间戳
        // return Math.max(0, val - startTime) + ' ms';
        // 使用 echarts 内置的格式化工具，或者自己拼接字符串
        // 'yyyy-MM-dd\nhh:mm:ss' 表示日期和时间，\n表示换行
        // return echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', val);
        // return echarts.format.formatTime('MM-dd', val);
        
        // *** 修改在这里：智能日期格式化 ***
        var date = new Date(val);
        var currentMonth = date.getMonth();
        var dateText;

        // 如果月份与上一个不同，或者这是第一个刻度
        if (lastMonth !== currentMonth) {
          lastMonth = currentMonth; // 更新月份记录
          dateText = echarts.format.formatTime('yyyy-MM', val) + '\n' +
            echarts.format.formatTime('dd', val);
        } else {
          dateText = '\n' + echarts.format.formatTime('dd', val); // (头部空换行保持高度不变，避免缩放时图表跳动)
        }

        return dateText
      }
    }
  },
  yAxis: {
    data: categories, // 分类
    inverse: true,
  },
  series: [
    {
      type: 'custom',
      renderItem: renderItem,
      itemStyle: {
        opacity: 0.8 // 透明度
      },
      encode: {
        x: [1, 2], // 将value数组的第1,2个元素映射到x轴 (开始和结束时间)
        y: 0 // 将value数组的第0个元素映射到y轴 (分类索引)
      },
      data: data
    }
  ]
};
```

## demo —— 官方性能gantt

```js
var data = [];
var dataCount = 10;
var startTime = +new Date();
var categories = ['categoryA', 'categoryB', 'categoryC'];
var types = [
  { name: 'JS Heap', color: '#7b9ce1' },
  { name: 'Documents', color: '#bd6d6c' },
  { name: 'Nodes', color: '#75d874' },
  { name: 'Listeners', color: '#e0bc78' },
  { name: 'GPU Memory', color: '#dc77dc' },
  { name: 'GPU', color: '#72b362' }
];
// Generate mock data
categories.forEach(function (category, index) {
  var baseTime = startTime;
  for (var i = 0; i < dataCount; i++) {
    var typeItem = types[Math.round(Math.random() * (types.length - 1))];
    var duration = Math.round(Math.random() * 10000);
    data.push({
      name: typeItem.name,
      value: [index, baseTime, (baseTime += duration), duration],
      itemStyle: {
        normal: {
          color: typeItem.color
        }
      }
    });
    baseTime += Math.round(Math.random() * 2000);
  }
});
function renderItem(params, api) {
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1] * 0.6;
  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  );
  return (
    rectShape && {
      type: 'rect',
      transition: ['shape'],
      shape: rectShape,
      style: api.style()
    }
  );
}
option = {
  tooltip: {
    formatter: function (params) {
      return params.marker + params.name + ': ' + params.value[3] + ' ms';
    }
  },
  // title: {
  //   text: 'Profile',
  //   left: 'center'
  // },
  grid: {
    height: 300
  },
  xAxis: {
    min: startTime,
    scale: true,
    axisLabel: {
      formatter: function (val) {
        return Math.max(0, val - startTime) + ' ms';
      }
    }
  },
  yAxis: {
    data: categories
  },
  series: [
    {
      type: 'custom',
      renderItem: renderItem,
      itemStyle: {
        opacity: 0.8
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: data
    }
  ]
};
```

## demo1 —— 柱状图模拟

```js
props: {
    jobRowData: Object // 查看作业实例当前行
},
data () {
  return {
    chartId: 'ganttChart',
    loading: false,
    noData: false,
    startDate: [],
    endDate: [],
    xDate: '', // x轴标题
    legendData: [], // 图例
    seriesData: [] // 图数据
  }
},
methods: {
  async getData () {
    this.loading = true
    var statusConfig = [{
      status: 'SUBMITTED_SUCCESS',
      statusZH: '提交成功',
      color: '#008800'
    }, {
      status: 'RUNNING_ EXECUTION',
      statusZH: '运行中',
      color: '#fcdb56'
    }, {
      status: 'READY_ PAUSE',
      statusZH: '准备暂停',
      color: '#ff8c00'
    }, {
      status: 'PAUSE',
      statusZH: '暂停',
      color: '#ff4500'
    }, {
      status: 'READY_STOP',
      statusZH: '准备停止',
      color: '#ffcccc'
    }, {
      status: 'STOP',
      statusZH: '停止',
      color: '#fa8072'
    }, {
      status: 'FAILURE',
      statusZH: '失败',
      color: '#3ba1ff'
    }, {
      status: 'SUCCESS',
      statusZH: '成功',
      color: '#69d388'
    }, {
      status: 'NEED_FAULT_TOLERANCE',
      statusZH: '需要容错',
      color: '#a9a9a9'
    }, {
      status: 'KILL',
      statusZH: '终止',
      color: '#cc0000'
    }, {
      status: 'WAITING_THREAD',
      statusZH: '等待线程',
      color: '#a777e9'
    }, {
      status: 'WAITTING_LIVE',
      statusZH: '等待依赖节点完成',
      color: '#e38eff'
    }]
    let res = await getGanttChart.send({}, { processInstanceId: this.jobRowData.id })
    this.loading = false
    if (res.isSuccess) {
      var startTip = []
      for (let item = 0; item < res.data.tasks.length; item++) {
        let taskStatus = res.data.tasks[item].status
        let statusColor = ''
        for (let i in statusConfig) {
          if (taskStatus === statusConfig[i].status) {
            taskStatus = statusConfig[i].statusZH
            statusColor = statusConfig[i].color
          }
        }
        this.legendData[item] = taskStatus
        this.startDate = []
        this.endDate = []
        startTip[item] = res.data.tasks[item].startDate[0] // 获取开始时间，用于tooltip显示
        this.startDate[item] = res.data.tasks[item].startDate[0]// 每一个任务的前面几个时间置空,最后一个时间赋值
        this.endDate[item] = res.data.tasks[item].endDate[0]
        this.seriesData.push({ // 一次传两个数据，用开始时间覆盖结束时间
          name: this.legendData[item],
          type: 'bar',
          cursor: 'pointer',
          barWidth: '40%',
          barMaxWidth: '30px',
          stack: '总量', // 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加。
          // zlevel: -1, // 用于Canvas分层，不同zlevel值的图形会放置在不同的Canvas中
          itemStyle: {
            normal: {
              borderColor: '#fff',
              color: statusColor
            }
          },
          data: this.endDate
        })
        this.seriesData.push({
          name: this.legendData[item],
          type: 'bar',
          cursor: 'default',
          barWidth: '40%',
          barMaxWidth: '30px',
          stack: '总量',
          itemStyle: {
            normal: {
              color: '#fff'
            }
          },
          // zlevel: -1,
          z: 3, // 控制图形的前后顺序，z值小的会被z值大的覆盖。z相比zlevel优先级更低，而且不会创建新的Canvas
          data: this.startDate
        })
      }
      this.seriesData = Object.values(this.seriesData) // 对象转化成数组
      let tempDate = new Date(res.data.tasks[0].startDate[0]).toLocaleString()
      // 取第一个任务的开始时间戳，转化成日期格式如：2021/9/18 上午10:44:34
      this.xDate = tempDate.substring(0, tempDate.indexOf(' ')) // 去掉空格后的部分
      this.myChart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          show: true, // 提示文字
          formatter: function (param) {
            let tip1 = '任务名称：' + param.name
            let tip2 = '任务状态：' + param.marker + param.seriesName
            let tip3 = '开始时间：' + new Date(startTip[param.dataIndex]).toLocaleString()
            let tip4 = '结束时间：' + new Date(param.value).toLocaleString()
            let tip5 = (param.value - startTip[param.dataIndex]) / 1000
            if (tip5 < 60) {
              tip5 = '持续时间：' + tip5 + '秒'
            } else if (tip5 < 3600) {
              tip5 = '持续时间：' + (tip5 / 60).toFixed(3) + '分钟'
            } else if (tip5 < 86400) {
              tip5 = '持续时间：' + (tip5 / 3600).toFixed(3) + '小时'
            } else {
              tip5 = '持续时间：' + (tip5 / 3600 / 24).toFixed(3) + '天'
            }
            if (param.dataIndex * 2 === param.seriesIndex) { // 开始时间不显示，只显示结束时间的tooltip
              return '<div style="text-align:left">' + tip1 + '</br>' + tip2 + '</br>' + tip3 + '</br>' + tip4 + '</br>' + tip5 + '</div>'
            }
          }
        },
        title: {
          text: '任务状态：',
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          }
        },
        legend: {
          icon: 'circle', // 图标形状
          itemGap: 25, // 图例每项之间的间隔
          itemWidth: 25, // 图标大小
          itemHeight: 10,
          left: 80
        },
        grid: {
          show: false, // 不显示外边框
          right: 90,
          left: 80,
          bottom: 200
        },
        xAxis: {
          type: 'time',
          name: this.xDate,
          axisLabel: {
            color: '#333333', // 坐标轴文字颜色
            formatter: function (param) {
              let date = new Date(param)
              let formatZero = function (num) {
                return (Array(2).join('0') + num).slice(-2)
              }
              let HMS = [formatZero(date.getHours()), formatZero(date.getMinutes()), formatZero(date.getSeconds())]
              return HMS.join(':')
            }
          },
          nameTextStyle: {
            color: '#333333'// 坐标轴末端标题颜色
          },
          splitLine: {
            show: false // 不显示网格线
          },
          axisLine: {
            lineStyle: {
              color: '#D9D9D9' // 坐标轴颜色
            }
          }
        },
        yAxis: {
          splitLine: {
            show: true, // 显示网格线
            lineStyle: {
              type: 'dashed' // 网格线设置为虚线
            }
          },
          axisTick: {
            show: false // 取消刻度
          },
          axisLine: {
            lineStyle: {
              color: '#fff' // 坐标轴颜色
            }
          },
          axisLabel: {
            margin: 20,
            color: '#333333', // 坐标轴文字颜色
            formatter: function (param) {
              if (param.length > 8) {
                param = param.substring(0, 8) + '\n' + param.substring(8, param.length)
              }
              return param
            }
          },
          data: res.data.taskNames
        },
        series: this.seriesData
      })
    } else {
      this.noData = true
    }
  }
}
```

## demo2

https://codepen.io/joanneccwang/pen/XWMjzGJ

可在线修改测试

```js
<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app">
    <h1>EChart Gantt</h1>

    <div id="chart"></div>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
      mockData: [],
      ganttChart: undefined,
      person: ['Joanne', 'Vic', 'Ruby', 'Jimmy', 'Alan', 'Karol', 'Rita', 'Jason', 'Patrick'],
      type: [
        {name: 'Rest', color: '#64CCAF'},
        {name: 'Dining', color: '#63A6F7'},
        {name: 'Meeting', color: '#F7C83E'},
      ],
      minOnlinePersonNum: 2,
      
      chartOptions: {
        yAxis: {
          data:[],
        },
        xAxis: {
          // type: 'time',
          position: 'top',
          scale: true,
          splitLine: {
            lineStyle: {
              color: ['#E9EDFF']
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: '#929ABA'
            }
          },
          axisLabel: {
            color: '#929ABA',
            inside: false,
            align: 'center',
            formatter: function (val) {
              // console.log({val})
              return moment(val).format('YYYY/MM/DD HH:mm');
            }
          },
        },
        dataZoom: [{
          type: 'slider',
          filterMode: 'weakFilter', // 當所有數據都 overflow 才過濾掉
          xAxisIndex: 0,
          height: 10,
          bottom: 10,
          showDetail: false,
          handleSize: '80%',
        }, {
          type: 'inside',
          yAxisIndex: 1,
          start: 0,
          end: 3,
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
        }]
      },
    };
  },
  // computed: {
//     lackOfOnlinePersonTimeRange () {
//       let allTimePoints = []
//       this.mockData.forEach(d => {
//         const start = d.value[1];
//         const end = d.value[2];
//         allTimePoints = [...allTimePoints, start, end]
//       })
//       // 列出所有時間點
//       const sortedTimePoints = allTimePoints.sort()
//       const timePointCounter = {}
//       sortedTimePoints.forEach(key => {
//         timePointCounter[key] = 0
//       })
      
//       // 算每個時間點的人數
//       const timePoints = Object.keys(timePointCounter)
//       this.mockData.forEach(d => {
//         const start = d.value[1];
//         const end = d.value[2];
//         timePoints.forEach(tp => {
//           if (start <= tp && tp < end) {
//             timePointCounter[tp] += 1
//           }
//         })
//       })
      
//       const numOfPerson = this.person.length
//       const lackOfPerson = []
//       let timeRange = { start: 0, end: 0 }
//       timePoints.forEach(tp => {
//         console.log(numOfPerson, timePointCounter[tp], this.minOnlinePersonNum)
//         const isLack = (numOfPerson - timePointCounter[tp]) < this.minOnlinePersonNum
//         if (isLack) {
//           console.log({isLack})
//           if (timeRange.start === 0) {
//             timeRange.start = tp
//           } else {
//             timeRange.end = tp
//           }
//           console.log({timeRange})
//         } else {
//           if (timeRange.start !== 0 && timeRange.end !== 0) {
//             lackOfPerson.push(Object.assign({}, timeRange))
//             timeRange = { start: 0, end: 0 }
//           }
//         }
//       })
      
//       if(timeRange.start !== 0 && timeRange.end !== 0) {
//         lackOfPerson.push(Object.assign({}, timeRange)
//       }
//       return lackOfPerson
//     },
//   },
  methods: {    
    resize() {
      this.ganttChart.resize();
    },
    renderItem(params, api) {
      var categoryIndex = api.value(0);
      var start = api.coord([api.value(1), categoryIndex]);
      var end = api.coord([api.value(2), categoryIndex]);
      var height = api.size([0, 1])[1] * 0.6;
  
      var rectShape = echarts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
      }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
      });
  
      return rectShape && {
          type: 'rect',
          transition: ['shape'],
          shape: rectShape,
          style: api.style()
      };
    },
    setUpChart() {
      this.chartOptions.yAxis.data = this.person
      this.chartOptions.series = [{
        type: 'custom',
        renderItem: this.renderItem,
        encode: { // data 維度映射
            x: [1, 2],
            y: 0
        },
        // markArea:{
        //   silent: true,
        //   data: this.lackOfOnlinePersonTimeRange.map((timeRange) => {
        //     return [{xAxis: timeRange.start}, {xAxis: timeRange.end}];
        //   }),
        // },
        data: this.mockData,
      }]
      // console.log(this.chartOptions)
      this.ganttChart.setOption(this.chartOptions, true);
    },
    
    genMockData() {
      const mockData = [];
      const today = new Date()
      const startTime = today.getTime()
      this.person.forEach((p, index) => {
        let baseTime = startTime
        for (var i = 0; i < 5; i++) {
          var typeItem = this.type[Math.round(Math.random() * (this.type.length - 1))];
          var duration = Math.round(Math.random() * 6000000);
          mockData.push({
            name: typeItem.name,
            value: [
              index,
              baseTime, // startTime
              baseTime += duration, // endTime
              duration,
              typeItem.name,
            ],
            itemStyle: {
              normal: {
                color: typeItem.color
              }
            }
          });
          baseTime += Math.round(Math.random() * 2000000);
        }
      })
      
      return mockData;
    },
  },
  
  mounted() {
    this.mockData = this.genMockData();
    // console.log(this.mockData)
    console.log({lack: this.lackOfOnlinePersonTimeRange})
    
    this.ganttChart = echarts.init(document.getElementById('chart'));
    this.setUpChart();
    
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}

#chart {
 border: 1px solid hotpink;
 height: 300px;
}
</style>
```



