---
create_time: 2025-02-22
Author: LincZero
---
# Oomol

## 安装、使用体验

### 安装

以 windows 版本为例，安装 windows 版本后，他会先让你安装并更新到最新的wsl2。这是为了跨平台统一

使用下来比较流程，没出什么幺蛾子

### 项目

他每个工作流都是一个项目 (以项目为单位进行分享)

- 缺点
  - 其易用性和大小没有 comfyui 工作流那种单文件强。
    不过 ts 项目也不算很大
- 优点
  - 项目为单位，提供了额外的灵活性：工作流可以有独立依赖、独立的配置
  - 独立依赖这点还是比较好的，包括 js 的 npm依赖 (package.json)，包括 python 的 requirements.txt (不过python项目分享时，经常伴随一些AI库，依赖的安装还挺慢的)

## 自定义程度

### 数据类别

(相当于nodeflow中项的valueType)

注意：如果选择了 Variable/Array/Object 这种容器类型，那么后面可以再进行 type-value 的选择

- 容器类
  - Variable    | (不一定可选) df属于这个
- String
- Number
- FilePath, SavePath, DirPath
- Secret
- Boolean
- Integer
- Color
- Text
- Object
- Array
- Select      | (不一定可选)
- MultiSelect | (不一定可选)
- Date
- Any
- AnyOf       | (不一定可选)
- Binary      | (不一定可选)
- Null

### 节点类别

[dir]

- Script/
  - Python, TypeScript, JavaScript, Value
- Preview/
  - Audio、Video
  - Binary Image、Image、Images
  - HTML、Markdown (with file)、Markdown
- Data Lab/
  - Bar Chart, Column date filter
  - Column Number Filter | 柱状图
  - Column Number sort   | 柱状图 (带排序)
  - Csv To Df, Delete Column By Name
  - DF to excel
  - DF Preview
  - DF To Csv
  - Excel to df
  - Line Chart
  - Pie Chart
  - Stacked Area Chart
- File/
  - Binary save as file
  - Binary to file
  - Copy dir, Copy file, Copy file list
  - Read folder
  - Empty dir
  - File to binary
  - File to path
  - Read URL
  - URL to path
- Read File/
  - Copy Dir, Copy File, Copy File LIst
  - Dir To Path
  - Dir To Path List
  - Empty Dir
  - File To Path
  - Url Download To Path
- Transform/
  - Decode string
  - Encode string
  - Parse JSON
  - Stringify JSON

## 分析 - repo

### 群组项目集

这个群组有很多子项目 (2025-02-22 分了23个子项目)

- https://github.com/oomol-lab
  - ovm-core | 运行podman所需的最小虚拟机
  - ovm      | 在Apple虚拟化框架上运行ovm-core虚拟机
  - mac-power-monitor

### 解决方案

VSCode框架 (像cursor、oomal都用这个，还挺方便) + OVM (Oracle VirtualBox) 虚拟机

然后这两者都是跨平台的，VSCode框架甚至有 github.dev + codespace 的成熟方案可以参考

这是一个很不错的设计思路

## 分析 - 工作流项目

### 项目结构

项目结构比较简单

[dir]

- flows/             | 核心，里面可以包含多个工作流
  - `<工作流名>`/
    - scriptlets/          | 里面可能有 `.py` 脚本
    - `<fileName>.oo.yaml`    | 工作流文件
    - `.<fileName>.ui.oo.json` | 工作流文件的可选补充 (位置和尺寸)
- (依赖, 文档类)/
  - README.md        | 自述文件
  - .gitignore       | git忽略文件
  - package.json     | pnpm的依赖
  - package.oo.yaml  | 版本和信息说明，依赖说明
  - pnpm-lock.yaml   | pnpm的依赖 (锁)
  - requirements.txt | python的依赖

主要是 `flows` 文件夹那里，推荐结合后面的demo来看

### demo - HelloWorld 的 quick-start

该工作流的流程：

- (1) `URL to path #1`: 从url中下载到一个 `.csv` 文件
- (2) `Csv To Df #1`: 转换为df数据 (这是python Pandas库中的表格型数据结构 `DateFrame`)
- (3) `DF Preview #1`: 表格方式查看DF数据
- (3) `Column Number Filter #1`: 筛选过滤掉一部分
- (4) `Bar Chart #1`: 画柱形图

![](assets/Pasted%20image%2020250222213636.png)

```yml
# hello-world/flows/1-quick-start/flow.oo.yaml
nodes:
  - task: data-lab::csv_to_df
    title: "Csv To Df #1"
    node_id: csv_to_df#1
    inputs_from:
      - handle: csv
        from_node:
          - node_id: url_to_path#1
            output_handle: address
    description: Read the CSV as the DataFrame object of pandas
  - task: data-lab::df_preview
    title: "DF Preview #1"
    node_id: df_preview#1
    inputs_from:
      - handle: df
        from_node:
          - node_id: csv_to_df#1
            output_handle: df
  - task: data-lab::bar_chart
    title: "Bar Chart #1"
    node_id: bar_chart#1
    inputs_from:
      - handle: df
        from_node:
          - node_id: column_number_filter#1
            output_handle: df
      - handle: chart_title
        value:
      - handle: y_column
        value:
      - handle: x_column
        value: country
  - task: data-lab::column_number_filter
    title: "Column Number Filter #1"
    node_id: column_number_filter#1
    inputs_from:
      - handle: df
        from_node:
          - node_id: csv_to_df#1
            output_handle: df
      - handle: column_name
        value: income
      - handle: min_threshold
        value: 15000
      - handle: max_threshold
        value: 20000
      - handle: preview
        value: true
  - task: oomol-file::url_to_path
    title: "URL to path  #1"
    node_id: url_to_path#1
    inputs_from:
      - handle: url
        value: https://oomol-flows.oss-cn-hangzhou.aliyuncs.com/data_test_oomols.csv
    description: '"URL To Path" is a package downloaded from the store, which can be
      used without writing code yourself. You can install it through the toolbar
      on the right.'
```

.flow.ui.oo.json

这是文件是用来存尺寸和位置信息的，允许丢失

(有自动布局，丢失问题不大。只所以只存宽度不存高度，是因为他允许你拖拽修改宽度 (方便查看表格)，但不允许修改高度)

```json
{
  "nodes": {
    "csv_to_df#1": {
      "contentWidth": 350,
      "rfNode": {
        "position": {
          "x": 1140.987538458461,
          "y": 457.87493063295346
        }
      }
    },
    "df_preview#1": {
      "contentWidth": 350,
      "rfNode": {
        "position": {
          "x": 496.9460673098081,
          "y": 807
        }
      }
    },
    "bar_chart#1": {
      "contentWidth": 350,
      "rfNode": {
        "position": {
          "x": 1342,
          "y": 807
        }
      }
    },
    "column_number_filter#1": {
      "contentWidth": 350,
      "rfNode": {
        "position": {
          "x": 928,
          "y": 807
        }
      }
    },
    "url_to_path#1": {
      "contentWidth": 450,
      "rfNode": {
        "position": {
          "x": 626.9875384584609,
          "y": 457.87493063295346
        }
      }
    }
  }
}
```

### demo - v2ex

```yml
nodes:
  - task: self::v2ex_lottery
    title: "V2EX Lottery #1"
    node_id: v2ex_lottery#1
    inputs_from:
      - handle: topicID
        value: 0
        from_node:
          - node_id: +value#1
            output_handle: id
      - handle: excludes
        value:
          - ""
        from_node:
          - node_id: +value#1
            output_handle: excludes
      - handle: count
        value: 30
        from_node:
          - node_id: +value#1
            output_handle: count
      - handle: token
        value: ${{OO_SECRET:Custom,V2EX,token}}
  - values:
      - handle: id
        json_schema:
          type: integer
          minimum: 1
        value: 1
      - handle: excludes
        json_schema:
          type: array
          items:
            type: string
        value:
          - Livid
      - handle: count
        json_schema:
          type: integer
          minimum: 1
          ui:options:
            step: 1
        value: 3
    title: "Value #1"
    node_id: +value#1
```

