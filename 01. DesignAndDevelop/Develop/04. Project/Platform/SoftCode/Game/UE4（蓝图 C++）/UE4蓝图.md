# 基本操作——蓝图篇

- 简单自动开关门脚本

```mermaid
graph LR
subgraph a[时间轴]
    a1[Play]
    a2[Reverse]
    a3[Updata]
    a4[新建轨迹0]
    end
subgraph b[SetActorRotation]
	b1[第一项]
	b2[目标]
	b3[NewRotation-z]
	end
OnActorBeginOverlap --> a1
OnActorEndOverlao --> a2
a3 --> b1
SM_Door --> b2
a4 --> b3
```

- 创建蓝图Actor实现（添加Box Collistion）

```mermaid
graph LR
subgraph a[时间轴]
    a1[Play]
    a2[Reverse]
    a3[Updata]
    a4[新建轨迹0]
    end
subgraph b[SetRelativeRotation]
	b1[第一项]
	b2[目标]
	b3[NewRotation-z]
	end
OnComponentBeginOverlap --> a1
OnComponentEndOverlao --> a2
a3 --> b1
SM_Door --> b2
a4 --> b3
```

区别

```
SetActorRoration  整个
SetRelativeRotation  组件（相对坐标）
SetWordRotation  组件（时间坐标）
```

- 按E开门

```mermaid
graph TB
subgraph a[时间轴]
	a3[Updata]
    a4[新建轨迹0]
    a1[Play]
    a2[Reverse]
    
    end
subgraph b[SetRelativeRotation]
	b2[目标]
	b1[第一项]
	b3[NewRotation-z]
	end
subgraph c[Gate]
	c0[Enter]
	c1[Open]
	c2[close]
	c3[Exit]
	end
subgraph d[Enable_Input]
	d1[_]
	d2[PlayerController]
	end
subgraph e[Enable_Input]
	e1[_]
	e2[PlayerController]
	end	
E -->c0
OnComponentBeginOverlap -->d1 -->c1
OnComponentEndOverlao -->e1 -->c2
GetPlayerController -->d2
GetPlayerController -->e2
c3 -->FilpFlop --_____A-->a1
FilpFlop --____B-->a2
a3 --> b1
SM_Door --> b2
a4 --> b3
```

```mermaid
graph TB
E --Enter-->Gate
OnComponentBeginOverlap -->Enable_Input1 --Open-->Gate
GetPlayerController --PlayerController-->Enable_Input1
GetPlayerController --PlayerController -->Enable_Input2
OnComponentEndOverlao -->Enable_Input2 --Close-->Gate
Gate -->FilpFlop --_____A-->时间轴
FilpFlop --____B-->时间轴
时间轴 --Updata--> SetRelativeRotation
时间轴 --新建轨迹-->SetRelativeRotation
SM_Door --目标--> SetRelativeRotation
```

## 一些节点

Lerp：Alpha控制A和B的混合，相当于0-1向任意数值的映射

### 蓝图

G+LMB > Gate节点

branch  分支

print

Get All Actors Of Class 获得类

DestroyActor 销毁

## 调试

蓝图上方工具栏中的“调试过滤器”