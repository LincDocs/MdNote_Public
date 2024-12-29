---
create_time: 2024-12-28
Author: LincZero
---

# 以太网帧协议(Gantt版)

tags: 网络协议、前导码、链路层协议、Gantt版、甘特图版

最近发现PlantUML的Gantt图可以较好地绘制网络协议格式，于是复习并绘制了一番

## 仅Gantt测试

```plantuml
@startgantt
[test1] starts D+0 and ends D+3
[test2] requires 4 days
[test3] starts D+0 and requires 4 days
@endgantt
```

## UDP完整以太网帧格式

UDP完整以太网帧格式（含前导码最小为 $72Byte = L1(8) + L2(14+4) + L3(20) + L4(8) + L7(18)$）

```plantuml
@startgantt

--(L1,8Byte)--

[前导码+帧起始-1] starts D+0 and ends D+31
[前导码+帧起始-2] starts D+0 and ends D+31

--ethernet II(L2,14/18Byte)--
[目标地址--1] starts D+0 and ends D+31 and is colored in Coral
[目的地址--2] starts D+0 and ends D+15 and is colored in Coral
[源地址--1] starts D+16 and ends D+31 and is colored in Yellow
[源地址--2] starts D+0 and ends D+31 and is colored in Yellow
[目的地址--2] displays on same row as [源地址--1]
[长度(46~1500)] starts D+0 and ends D+15 and is colored in Cyan/Black

--ip(L3,20+Byte)--

[版本] starts D+0 and ends D+3
[ip头长度] starts D+4 and ends D+7 and is colored in Cyan/Black
[区分服务] starts D+8 and ends D+15
[总长度] starts D+16 and ends D+31 and is colored in Cyan/Black
[版本] displays on same row as [ip头长度]
[ip头长度] displays on same row as [区分服务]
[区分服务] displays on same row as [总长度]

[标识] starts D+0 and ends D+15
[标志] starts D+16 and ends D+18
[片偏移] starts D+19 and ends D+31
[标识] displays on same row as [标志]
[标志] displays on same row as [片偏移]

[生存时间] starts D+0 and ends D+7
[协议] starts D+8 and ends D+15
[首部校验和] starts D+16 and ends D+31
[生存时间] displays on same row as [协议]
[协议] displays on same row as [首部校验和]

[源地址] starts D+0 and ends D+31 and is colored in Yellow
[目的地址] starts D+0 and ends D+31 and is colored in Coral
[可选字段(长度可变) 与 填充] starts D+0 and ends D+31 and is colored in White/Gray

--udp(L4,8Byte)--

[源端口] starts D+0 and requires 16 days and is colored in Yellow
[目的端口] starts D+16 and requires 16 days and is colored in Coral
[源端口] displays on same row as [目的端口]

[报文长度] starts D+0 and requires 16 days and is colored in Cyan/Black
[带伪头的UDP校验和选项] starts D+16 and requires 16 days
[报文长度] displays on same row as [带伪头的UDP校验和选项]

--data(L7,18+Byte)--

[数据1(Payload)(18~1472)] starts D+0 and requires 32 days
[数据2(Payload)(18~1472)] starts D+0 and requires 32 days
[数据3(Payload)(18~1472)] starts D+0 and requires 32 days
[数据4(Payload)(18~1472)] starts D+0 and requires 32 days
[数据5(Payload)(18~1472)] starts D+0 and requires 16 days
[数据6(Payload)(可选)] starts D+16 and requires 16 days and is colored in White/Gray
[数据5(Payload)(18~1472)] displays on same row as [数据6(Payload)(可选)]

--ethernet II(L2,4/18Byte)--
[FCS(CRC)] starts D+0 and ends D+31
@endgantt
```

8Byte一行表示

```plantuml
@startgantt

--(L1,8Byte)--

[前导码+帧起始] starts D+0 and requires 64 days

--ethernet II(L2,14/18Byte)--
[目标地址-1] starts D+0  and requires 48 days and is colored in Coral
[源地址-1] starts D+48 and ends D+63 and is colored in Yellow
[源地址-2] starts D+0 and ends D+31 and is colored in Yellow
[目标地址-1] displays on same row as [源地址-1]
[长度(46~1500)] starts D+32  and requires 16 days and is colored in Cyan/Black
[源地址-2] displays on same row as [长度(46~1500)]

--ip(L3,20+Byte)--

[版本] starts D+0  and requires 4 days
[ip头长度] starts D+4 and requires 4 days and is colored in Cyan/Black
[区分服务] starts D+8 and requires 8 days
[总长度] starts D+16 and requires 16 days and is colored in Cyan/Black
[标识] starts D+32  and requires 16 days
[标志] starts D+48 and requires 3 days
[片偏移] starts D+51 and requires 13 days
[版本] displays on same row as [ip头长度]
[ip头长度] displays on same row as [区分服务]
[区分服务] displays on same row as [总长度]
[总长度] displays on same row as [标识]
[标识] displays on same row as [标志]
[标志] displays on same row as [片偏移]

[生存时间] starts D+0 and requires 8 days
[协议] starts D+8 and requires 8 days
[首部校验和] starts D+16 and requires 16 days
[源地址] starts D+32 and requires 32 days and is colored in Yellow
[生存时间] displays on same row as [协议]
[协议] displays on same row as [首部校验和]
[首部校验和] displays on same row as [源地址]

[目的地址] starts D+0 and requires 32 days and is colored in Coral
[可选字段(长度可变) 与 填充] starts D+32 and requires 32 days and is colored in White/Gray
[目的地址] displays on same row as [可选字段(长度可变) 与 填充]

--udp(L4,8Byte)--

[源端口] starts D+0 and requires 16 days and is colored in Yellow
[目的端口] starts D+16 and requires 16 days and is colored in Coral
[报文长度] starts D+32 and requires 16 days and is colored in Cyan/Black
[带伪头的UDP校验和选项] starts D+48 and requires 16 days
[源端口] displays on same row as [目的端口]
[目的端口] displays on same row as [报文长度]
[报文长度] displays on same row as [带伪头的UDP校验和选项]

--data(L7,18+Byte)--

[数据1(Payload)(18~1472)] starts D+0 and requires 64 days
[数据2(Payload)(18~1472)] starts D+0 and requires 64 days
[数据3(Payload)(18~1472)] starts D+0 and requires 16 days
[数据4(Payload)(可选)] starts D+16 and requires 48 days and is colored in White/Gray
[数据3(Payload)(18~1472)] displays on same row as [数据4(Payload)(可选)]

--ethernet II(L2,4/18Byte)--
[FCS(CRC)] starts D+0 and ends D+31
@endgantt
```

## TCP完整以太网帧格式

TCP完整以太网帧格式（含前导码最小为 $72Byte = L1(8) + L2(14+4) + L3(20) + L4(20) + L7(18)$）

```plantuml
@startgantt

--(L1,8Byte)--

[前导码+帧起始-1] starts D+0 and ends D+31
[前导码+帧起始-2] starts D+0 and ends D+31

--ethernet II(L2,14/18Byte)--
[目标地址--1] starts D+0 and ends D+31 and is colored in Coral
[目的地址--2] starts D+0 and ends D+15 and is colored in Coral
[源地址--1] starts D+16 and ends D+31 and is colored in Yellow
[源地址--2] starts D+0 and ends D+31 and is colored in Yellow
[目的地址--2] displays on same row as [源地址--1]
[长度(46~1500)] starts D+0 and ends D+15 and is colored in Cyan/Black

--ip(L3,20+Byte)--

[版本] starts D+0 and ends D+3
[ip头长度] starts D+4 and ends D+7 and is colored in Cyan/Black
[区分服务] starts D+8 and ends D+15
[总长度] starts D+16 and ends D+31 and is colored in Cyan/Black
[版本] displays on same row as [ip头长度]
[ip头长度] displays on same row as [区分服务]
[区分服务] displays on same row as [总长度]

[标识] starts D+0 and ends D+15
[标志] starts D+16 and ends D+18
[片偏移] starts D+19 and ends D+31
[标识] displays on same row as [标志]
[标志] displays on same row as [片偏移]

[生存时间] starts D+0 and ends D+7
[协议] starts D+8 and ends D+15
[首部校验和] starts D+16 and ends D+31
[生存时间] displays on same row as [协议]
[协议] displays on same row as [首部校验和]

[源地址] starts D+0 and ends D+31 and is colored in Yellow
[目的地址] starts D+0 and ends D+31 and is colored in Coral
[可选字段(长度可变) 与 填充] starts D+0 and ends D+31 and is colored in White/Gray

--tcp(L4,20+Byte)--

[源端口] starts D+0 and ends D+15 and is colored in Yellow
[目的端口] starts D+16 and ends D+31 and is colored in Coral
[源端口] displays on same row as [目的端口]

[序号] starts D+0 and ends D+31
[确认序号] starts D+0 and ends D+31

[tcp头长度] starts D+0 and ends D+3 and is colored in Cyan/Black
[保留] starts D+4 and ends D+9
[U] starts D+10 and ends D+11
[A] starts D+11 and ends D+12
[P] starts D+12 and ends D+13
[R] starts D+13 and ends D+14
[S] starts D+14 and ends D+15
[F] starts D+15 and ends D+16
[窗口大小] starts D+16 and ends D+31 and is colored in Cyan/Black
[tcp头长度] displays on same row as [保留]
[保留] displays on same row as [U]
[U] displays on same row as [A]
[A] displays on same row as [P]
[P] displays on same row as [R]
[R] displays on same row as [S]
[S] displays on same row as [F]
[F] displays on same row as [窗口大小]

[校验和] starts D+0 and ends D+15
[紧急指针] starts D+16 and ends D+31
[校验和] displays on same row as [紧急指针]

[选项(可选)] starts D+0 and ends D+31 and is colored in White/Gray

--data(L7,6+Byte)--

[数据1(Payload)(6~1460)] starts D+0 and requires 32 days
[数据2(Payload)(6~1460)] starts D+0 and requires 16 days
[数据3(Payload)(可选)] starts D+16 and requires 16 days and is colored in White/Gray
[数据2(Payload)(6~1460)] displays on same row as [数据3(Payload)(可选)]

--ethernet II(L2,4/18Byte)--
[FCS(CRC)] starts D+0 and ends D+31
@endgantt
```

8Byte一行表示

```plantuml
@startgantt

--(L1,8Byte)--

[前导码+帧起始] starts D+0 and requires 64 days

--ethernet II(L2,14/18Byte)--
[目标地址-1] starts D+0  and requires 48 days and is colored in Coral
[源地址-1] starts D+48 and ends D+63 and is colored in Yellow
[源地址-2] starts D+0 and ends D+31 and is colored in Yellow
[目标地址-1] displays on same row as [源地址-1]
[长度(46~1500)] starts D+32  and requires 16 days and is colored in Cyan/Black
[源地址-2] displays on same row as [长度(46~1500)]

--ip(L3,20+Byte)--

[版本] starts D+0  and requires 4 days
[ip头长度] starts D+4 and requires 4 days and is colored in Cyan/Black
[区分服务] starts D+8 and requires 8 days
[总长度] starts D+16 and requires 16 days and is colored in Cyan/Black
[标识] starts D+32  and requires 16 days
[标志] starts D+48 and requires 3 days
[片偏移] starts D+51 and requires 13 days
[版本] displays on same row as [ip头长度]
[ip头长度] displays on same row as [区分服务]
[区分服务] displays on same row as [总长度]
[总长度] displays on same row as [标识]
[标识] displays on same row as [标志]
[标志] displays on same row as [片偏移]

[生存时间] starts D+0 and requires 8 days
[协议] starts D+8 and requires 8 days
[首部校验和] starts D+16 and requires 16 days
[源地址] starts D+32 and requires 32 days and is colored in Yellow
[生存时间] displays on same row as [协议]
[协议] displays on same row as [首部校验和]
[首部校验和] displays on same row as [源地址]

[目的地址] starts D+0 and requires 32 days and is colored in Coral
[可选字段(长度可变) 与 填充] starts D+32 and requires 32 days and is colored in White/Gray
[目的地址] displays on same row as [可选字段(长度可变) 与 填充]

--tcp(L4,20+Byte)--

[源端口] starts D+0 and requires 16 days and is colored in Yellow
[目的端口] starts D+16 and requires 16 days and is colored in Coral
[序号] starts D+32 and requires 32 days
[源端口] displays on same row as [目的端口]
[目的端口] displays on same row as [序号]

[确认序号] starts D+0 and requires 32 days
[tcp头长度] starts D+32 and requires 4 days and is colored in Cyan/Black
[保留] starts D+36 and requires 6 days
[ U| A| P| R| S| F] starts D+42 and requires 6 days
[窗口大小] starts D+48 and requires 16 days and is colored in Cyan/Black
[确认序号] displays on same row as [tcp头长度]
[tcp头长度] displays on same row as [保留]
[保留] displays on same row as [ U| A| P| R| S| F]
[ U| A| P| R| S| F] displays on same row as [窗口大小]

[校验和] starts D+0 and requires 16 days
[紧急指针] starts D+16 and requires 16 days
[选项(可选)] starts D+32 and requires 32 days and is colored in White/Gray
[校验和] displays on same row as [紧急指针]
[紧急指针] displays on same row as [选项(可选)]

--data(L7,6+Byte)--

[数据1(Payload)(6~1460)] starts D+0 and requires 48 days
[数据2(Payload)(可选)] starts D+48 and requires 16 days and is colored in White/Gray
[数据1(Payload)(6~1460)] displays on same row as [数据2(Payload)(可选)]

--ethernet II(L2,4/18Byte)--
[FCS(CRC)] starts D+0 and ends D+31
@endgantt
```


## Ethernet II 与 MAC 802

```plantuml
@startgantt

--ethernet II(L2,14/18Byte)--
[目标地址--1] starts D+0 and ends D+31 and is colored in Coral
[目的地址--2] starts D+0 and ends D+15 and is colored in Coral
[源地址--1] starts D+16 and ends D+31 and is colored in Yellow
[源地址--2] starts D+0 and ends D+31 and is colored in Yellow
[目的地址--2] displays on same row as [源地址--1]
[长度(46-1500)] starts D+0 and ends D+15

--mac(L2,14/18Byte)--
[目标地址-1] starts D+0 and ends D+31 and is colored in Coral
[目的地址-2] starts D+0 and ends D+15 and is colored in Coral
[源地址-1] starts D+16 and ends D+31 and is colored in Yellow
[源地址-2] starts D+0 and ends D+31 and is colored in Yellow
[目的地址-2] displays on same row as [源地址-1]
[协议类型] starts D+0 and ends D+15
@endgantt
```

### Ethernet II 和 IEEE 802.3 (MAC802) 协议

Ethernet II

- 用途：Ethernet II是**最常用**的以太网帧格式，广泛应用于现代网络，包括局域网（LAN）和广域网（WAN）。
- 常见应用：主要用于IP网络，尤其是IPv4和IPv6。大多数UDP和TCP通信使用Ethernet II帧格式。
- 特点：Ethernet II帧的以太类型（EtherType）字段用于指示上层协议（例如，0x0800表示IPv4，0x86DD表示IPv6）。

IEEE 802.3 (MAC802)

- 用途：IEEE 802.3是以太网的标准，定义了物理层和数据链路层的规范，包括帧格式。虽然它定义了一个不同的帧格式，但在实际应用中，**并不多见**，Ethernet II更为常见。
- 常见应用：较少单独使用，更多的是在特定的网络管理和控制系统中。
- 特点：IEEE 802.3帧格式包括一个长度字段，用于指示数据字段的长度，而不是EtherType。


