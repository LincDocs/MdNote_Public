---
create_date: 2026-10-01
last_date: 2026-10-01
tags:
  - 游戏
  - 数学
  - 仿真
author:
  - LincZero
---
# 千星奇域方糖守卫流浪者精通bug利用与最大化

## 背景介绍

python程序仿真一个程序模拟：

开头硬编码变量（但需要能快速修改调整）：角色对象的数组，每个角色的初始创建时间、总迭代时间。

所有角色初始100块，并拥有一个技能：每12s自动触发一次，随机向另一个角色借他当前一半的钱，并在8s后归还借出的钱。
此时故意制造一个bug：当钱不够归还时，依然归还借出的所有钱，但自身钱不会变成负数，而是会变成0（相当于整个系统中凭空造钱了）

最后输出迭代结束后的各个角色各自拥有的钱和总钱数

## 拟真程序

by deepseek-v4.1

```python
import heapq
import random


# ======================== 配置区（改这里就行） ========================
INIT_MONEY     = 100     # 每个角色初始资金
TOTAL_TIME     = 480     # 总迭代时间（秒）。20轮迭代=24s=游戏6轮，40轮迭代=480s=游戏12轮
SKILL_INTERVAL = 12      # 技能触发间隔（秒）
REPAY_DELAY    = 8       # 借钱后多少秒归还（秒）
LOAN_RATIO     = 0.5     # 借走对方"当前资金"的比例
RANDOM_SEED    = None    # 随机种子（None = 每次都不一样）
VERBOSE        = False   # 是否打印每一次事件日志

# 角色配置：name = 角色名, create_time = 该角色出现的时间（秒）
CHARACTER_CONFIG = [
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 0.4},
    {"name": "6", "create_time": 0.5},
    {"name": "7", "create_time": 0.6},
    {"name": "8", "create_time": 0.7},
]

# =====================================================================


class Character:
    __slots__ = ("name", "create_time", "money", "alive")

    def __init__(self, name, create_time):
        self.name = name
        self.create_time = create_time
        self.money = 0.0
        self.alive = False

    def __repr__(self):
        return f"<{self.name} {self.money:.2f}>"


def simulate():
    if RANDOM_SEED is not None:
        random.seed(RANDOM_SEED)

    chars = {cfg["name"]: Character(cfg["name"], cfg["create_time"])
             for cfg in CHARACTER_CONFIG}

    # ---- 事件队列（最小堆）：(时间, 序号, 类型, 数据) ----
    events = []
    _seq = [0]

    def push(t, kind, payload):
        heapq.heappush(events, (t, _seq[0], kind, payload))
        _seq[0] += 1

    def log(msg):
        if VERBOSE:
            print(msg)

    # 每个角色在各自的 create_time "出生"
    for name, ch in chars.items():
        push(ch.create_time, "create", name)

    while events:
        t, _, kind, payload = heapq.heappop(events)
        if t > TOTAL_TIME:
            break

        # ---------------- 1. 角色创建 ----------------
        if kind == "create":
            ch = chars[payload]
            ch.alive = True
            ch.money = float(INIT_MONEY)
            log(f"[{t:7.2f}s] {ch.name} 创建，初始资金 {ch.money:.2f}")
            # 出生后开始周期性触发技能
            push(t + SKILL_INTERVAL, "skill", ch.name)

        # ---------------- 2. 技能触发：向别人借钱 ----------------
        elif kind == "skill":
            borrower = chars[payload]
            candidates = [c for c in chars.values()
                          if c.alive and c is not borrower and c.money > 0]
            if candidates:
                lender = random.choice(candidates)
                amount = lender.money * LOAN_RATIO
                if amount > 0:
                    lender.money -= amount
                    borrower.money += amount
                    log(f"[{t:7.2f}s] {borrower.name} 向 {lender.name} 借了 "
                        f"{amount:.2f}  "
                        f"({borrower.name}={borrower.money:.2f}, "
                        f"{lender.name}={lender.money:.2f})")
                    # 排一个 REPAY_DELAY 秒后的归还事件
                    push(t + REPAY_DELAY, "repay",
                         (borrower.name, lender.name, amount))
            # 排下一次技能触发
            push(t + SKILL_INTERVAL, "skill", borrower.name)

        # ---------------- 3. 归还 ----------------
        elif kind == "repay":
            borrower_name, lender_name, amount = payload
            borrower = chars[borrower_name]
            lender = chars[lender_name]

            if borrower.money >= amount:
                # 正常归还
                borrower.money -= amount
                lender.money += amount
                log(f"[{t:7.2f}s] {borrower.name} 归还 {lender.name} "
                    f"{amount:.2f}  "
                    f"({borrower.name}={borrower.money:.2f}, "
                    f"{lender.name}={lender.money:.2f})")
            else:
                # ================== 故意保留的 BUG ==================
                # 钱不够也照样"全额归还"，
                # 自身资金清零而不是变成负数 —— 多出的部分凭空产生。
                short = amount - borrower.money
                borrower.money = 0.0
                lender.money += amount
                log(f"[{t:7.2f}s] *** BUG *** {borrower.name} 归还 "
                    f"{lender.name} {amount:.2f} 时余额不足，"
                    f"自身清零，凭空产生 {short:.2f}  "
                    f"({borrower.name}=0.00, {lender.name}={lender.money:.2f})")
                # ===================================================

    return chars


def main():
    chars = simulate()

    created = [c for c in chars.values() if c.alive]
    total = sum(c.money for c in created)
    initial_total = INIT_MONEY * len(created)

    print()
    print("=" * 46)
    print(f"迭代结束（总时长 {TOTAL_TIME}s，共 {len(created)} 个角色）")
    print("=" * 46)
    for name, ch in chars.items():
        if ch.alive:
            print(f"  {name:>6} : {ch.money:>12.2f}")
        else:
            print(f"  {name:>6} : 未创建")
    print("-" * 46)
    print(f"  初始总资金 : {initial_total:>12.2f}")
    print(f"  最终总资金 : {total:>12.2f}")
    print(f"  凭空多出   : {total - initial_total:>12.2f}")
    print("=" * 46)


if __name__ == "__main__":
    main()

```

## 拟真结果

```python
"""记录1:
CHARACTER_CONFIG = [
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 2},
    {"name": "3", "create_time": 4},
    {"name": "4", "create_time": 5},
    {"name": "5", "create_time": 6},
    {"name": "6", "create_time": 8},
    {"name": "7", "create_time": 10},
    {"name": "8", "create_time": 11},
]
凭空多出:
1998.84
1280.61
1027.71
2450.17
2327.59
1657.85
2758.57
2609.33
1905.97
"""

"""记录2:
[
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 0},
    {"name": "3", "create_time": 0},
    {"name": "4", "create_time": 0},
    {"name": "5", "create_time": 0},
    {"name": "6", "create_time": 0},
    {"name": "7", "create_time": 0},
    {"name": "8", "create_time": 0},
]
凭空多出:
319.16
426.94
219.36
549.78
"""

"""记录2.2:
CHARACTER_CONFIG = [
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 0.4},
    {"name": "6", "create_time": 0.5},
    {"name": "7", "create_time": 0.6},
    {"name": "8", "create_time": 0.7},
]

669.35
638.19
333.23
749.61
1297.72
570.97
"""

"""记录3:
CHARACTER_CONFIG = [
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 2},
    {"name": "3", "create_time": 4},
    {"name": "4", "create_time": 6},
    {"name": "5", "create_time": 8},
    {"name": "6", "create_time": 10},
]

1299.63
1559.45
653.25
1740.61
1699.70
1292.48
1657.81
1890.47
"""
```

## bug策略和总结

by deepseek-v4.1

从你给的实验记录和原程序逻辑看，这个 bug 的“造钱”本质非常清晰。下面先分析原理，再给出最大化利用的策略和具体轴安排。

### 一、Bug 造钱公式

每次归还事件：

- 借款人 `borrower` 在 `t` 时刻向出借人 `lender` 借了 `amount`，约定 `t+8` 归还。
- 归还时，如果 `borrower.money >= amount`，正常转移，系统总钱不变。
- 如果 `borrower.money < amount`，则：
  - `borrower.money = 0`
  - `lender.money += amount`
  - 系统凭空增加：`short = amount - borrower.money_before_repay`

所以**总造钱量 = Σ short**。

要最大化 `short`，需要同时满足：

1. **借出金额 `amount` 尽可能大**  
   `amount = lender.money * 0.5`，所以出借人当时余额越大越好。
2. **借款人还款前余额尽可能小**  
   最好接近 0，这样 `short ≈ amount`。
3. **触发 bug 的次数尽可能多**  
   即让“余额不足”的归还得频繁发生。
4. **资金不断向少数角色集中，形成大额出借人**  
   每次 bug 都会让出借人余额增加、借款人清零，长期看资金会集中，后续借出金额可能指数增长。

### 二、关键时间关系（相位分析）

原程序中：

- 角色创建时间：`c`
- 技能触发时间：`c + 12k`（k = 0,1,2...）
- 还款时间：`c + 12k + 8`

所以两个角色的技能/还款是否同时，取决于创建时间对 12 取模的差值。

令角色 i 和 j 的创建时间分别为 `c_i`、`c_j`：

- 若 `c_i - c_j ≡ 8 (mod 12)`，则 **i 的还款时间** 与 **j 的技能时间** 同余。
- 若 `c_i - c_j ≡ 4 (mod 12)`，则 **i 的还款时间** 与 **j 的技能时间** 也同余（因为 4 ≡ -8）。
- 事件队列中，同一时间的事件按入队顺序执行。技能事件通常比还款事件更早入队，所以**技能会先执行**。这意味着：如果技能触发者向即将还款的人借钱，可以抢先清空他的余额，导致他还款时余额不足，触发 bug。

因此，**创建时间相差 4 秒或 8 秒的角色，会形成“技能清空还款者”的交叉**。

### 三、实验记录解读

| 配置 | 创建时间 | 造钱量范围 | 分析 |
|---|---|---|---|
| 记录2 | 全 0 | 219 ~ 550 | 所有人同时创建，技能和还款完全同步，缺少交叉借款，效果最差 |
| 记录2.2 | 0, 0.1, 0.2 ... 0.7 | 333 ~ 1297 | 轻微错开，打破完全同步，有一定交叉，但相位覆盖少 |
| 记录3 | 0,2,4,6,8,10 | 653 ~ 1890 | 均匀覆盖 6 个相位，交叉频繁，效果明显提升 |
| 记录1 | 0,2,4,5,6,8,10,11 | 1027 ~ 2758 | 8 个角色，相位覆盖更全，且包含 4/8 秒差值，平均造钱最高 |

结论：

- **同时创建最差**。
- **创建时间均匀分布在 0~11 秒内，效果显著提升**。
- **角色数量越多，总造钱量越大**（但人均可能下降）。
- **相位差 4 秒或 8 秒的组合越多，交叉清空概率越高**。

### 四、最大化策略与轴安排

#### 策略 1：均匀覆盖 12 秒周期

让所有角色的创建时间尽可能均匀地分布在 `0 ~ 11` 秒内。  
推荐间隔 2 秒或 1 秒，这样自动包含大量相差 4 秒、8 秒的配对。

#### 策略 2：分组同步触发，提高清空概率

将角色分成若干组，组内创建时间完全相同，组间创建时间相差 4 秒或 8 秒。  
这样同一时刻会有多个角色同时触发技能，他们随机选择目标，更容易同时向某个即将还款的角色借钱，迅速抽干其余额。

#### 策略 3：采用三组相位 0 / 4 / 8

这是理论上最规整的交叉轴：

- 组 A：创建时间 `0`
- 组 B：创建时间 `4`
- 组 C：创建时间 `8`

技能与还款时间表：

| 时间 | 事件 |
|---|---|
| 20 | 组 A 还款，组 C 技能（技能先执行，可能清空组 A） |
| 24 | 组 B 还款，组 A 技能 |
| 28 | 组 C 还款，组 B 技能 |
| 32 | 组 A 还款，组 C 技能 |
| ... | 每 4 秒循环一次 |

每组人数越多，同时触发技能的角色越多，清空还款者的概率越高。

#### 策略 4：采用六组相位 0,2,4,6,8,10

这是更密集的覆盖，每 2 秒就有一次交叉：

- 组 0 还款 ↔ 组 8 技能
- 组 2 还款 ↔ 组 10 技能
- 组 4 还款 ↔ 组 0 技能
- 组 6 还款 ↔ 组 2 技能
- 组 8 还款 ↔ 组 4 技能
- 组 10 还款 ↔ 组 6 技能

交叉频率是 3 组方案的两倍，但每组人数会少一些。需要实验比较。

#### 策略 5：延长总迭代时间

每次 bug 都会增加总资金，出借人余额变大，下次借出金额更大，可能形成正反馈。  
建议 `TOTAL_TIME` 至少设为 `600` 或 `1200`，让复利效应充分发挥。

#### 策略 6：多次运行取平均，搜索最优轴

由于借款目标是随机的，单次结果波动很大。建议：

- 将 `RANDOM_SEED` 设为 `None`，运行 100 次取平均造钱量。
- 或者固定多个种子，评估轴的平均表现。
- 写一个网格搜索脚本，遍历创建时间组合，找出平均造钱量最高的轴。

### 五、推荐配置示例

#### 方案 A：三组强同步（推荐优先测试）

总 12 人，每组 4 人：

```python
CHARACTER_CONFIG = [
    {"name": "A1", "create_time": 0},
    {"name": "A2", "create_time": 0},
    {"name": "A3", "create_time": 0},
    {"name": "A4", "create_time": 0},
    {"name": "B1", "create_time": 4},
    {"name": "B2", "create_time": 4},
    {"name": "B3", "create_time": 4},
    {"name": "B4", "create_time": 4},
    {"name": "C1", "create_time": 8},
    {"name": "C2", "create_time": 8},
    {"name": "C3", "create_time": 8},
    {"name": "C4", "create_time": 8},
]
```

#### 方案 B：六组均匀覆盖

总 12 人，每组 2 人：

```python
CHARACTER_CONFIG = [
    {"name": "A1", "create_time": 0},
    {"name": "A2", "create_time": 0},
    {"name": "B1", "create_time": 2},
    {"name": "B2", "create_time": 2},
    {"name": "C1", "create_time": 4},
    {"name": "C2", "create_time": 4},
    {"name": "D1", "create_time": 6},
    {"name": "D2", "create_time": 6},
    {"name": "E1", "create_time": 8},
    {"name": "E2", "create_time": 8},
    {"name": "F1", "create_time": 10},
    {"name": "F2", "create_time": 10},
]
```

#### 方案 C：八角色高覆盖（参考记录 1）

```python
CHARACTER_CONFIG = [
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 2},
    {"name": "3", "create_time": 4},
    {"name": "4", "create_time": 5},
    {"name": "5", "create_time": 6},
    {"name": "6", "create_time": 8},
    {"name": "7", "create_time": 10},
    {"name": "8", "create_time": 11},
]
```

### 六、进一步优化建议

1. **记录每次 bug 的 short 值**  
   在代码里加一行日志，输出每次 bug 的 `short`，可以分析哪些时间点造钱最多。

2. **尝试不同 TOTAL_TIME**  
   分别跑 240、600、1200 秒，观察造钱量是否指数增长。

3. **写一个自动搜索脚本**  
   固定角色数量，让 `create_time` 在 `0~11` 内以 `0.5` 为步长随机组合，用多个随机种子跑，取平均造钱量最高的轴。

4. **调整技能间隔与还款延迟**  
   虽然题目固定为 12s 和 8s，但如果你想探索，可以修改这两个参数，相位关系会变。当前 12 和 8 的最优相位差是 4 和 8。

5. **注意事件顺序**  
   同一时间技能先于还款执行，这对造钱有利。如果你想进一步放大，可以确保技能事件总是先入队。

总结：  
**最优轴的核心是让创建时间均匀覆盖 12 秒周期，并刻意形成 4 秒或 8 秒的相位差，使“技能触发”与“还款”同时发生。推荐三组 0/4/8 或六组 0/2/4/6/8/10，每组人数尽量多且相等，并延长总时间让复利效应放大。** 实际最优解会因随机性波动，建议用程序搜索多个种子取平均。

## 第二代，程序优化

修改代码，仅修改main入口，每次直接跑1000次模拟，然后只输出平均凭空多出的值，方便我更好地查看

```python
def main():
    N = 1000  # 模拟次数

    global RANDOM_SEED
    base_seed = RANDOM_SEED  # 用顶部配置的种子作为基准

    deltas = []
    for i in range(N):
        # 每次用不同但可复现的种子
        RANDOM_SEED = None if base_seed is None else base_seed + i
        chars = simulate()
        created = [c for c in chars.values() if c.alive]
        total = sum(c.money for c in created)
        initial = INIT_MONEY * len(created)
        deltas.append(total - initial)

    RANDOM_SEED = base_seed  # 还原

    avg = sum(deltas) / N
    print(f"跑 {N} 次，平均凭空多出: {avg:.2f}")
```

## 第二代，拟真结果

```python
"""记录:
都迭代1000次，每次480s。从强到弱排序:

[
    {"name": "1", "create_time": 0.0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 6.1}, // 这里>4s，<8s，都是同一个相位
    {"name": "6", "create_time": 6.2},
    {"name": "7", "create_time": 6.3},
    {"name": "8", "create_time": 6.4},
]
1929.83

[
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 2},
    {"name": "3", "create_time": 4},
    {"name": "4", "create_time": 5},
    {"name": "5", "create_time": 6},
    {"name": "6", "create_time": 8},
    {"name": "7", "create_time": 10},
    {"name": "8", "create_time": 11},
]
1795.58

[
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 2},
    {"name": "3", "create_time": 4},
    {"name": "4", "create_time": 6},
    {"name": "5", "create_time": 8},
    {"name": "6", "create_time": 10},
]
1678.05

[
    {"name": "1", "create_time": 0.0},
    {"name": "2", "create_time": 1.5},
    {"name": "3", "create_time": 3.0},
    {"name": "4", "create_time": 4.5},
    {"name": "5", "create_time": 6.0},
    {"name": "6", "create_time": 7.5},
    {"name": "7", "create_time": 9.0},
    {"name": "8", "create_time": 10.5},
]
1649.58

[
    {"name": "1", "create_time": 0.0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 3.1},
    {"name": "4", "create_time": 3.2},
    {"name": "5", "create_time": 6.1},
    {"name": "6", "create_time": 6.2},
    {"name": "7", "create_time": 9.0},
    {"name": "8", "create_time": 9.1},
]
1214.28

[
    {"name": "1", "create_time": 0.0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 8.1},
    {"name": "6", "create_time": 8.2},
    {"name": "7", "create_time": 8.3},
    {"name": "8", "create_time": 8.4},
]
923.55

[
    {"name": "1", "create_time": 0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 0.4},
    {"name": "6", "create_time": 0.5},
    {"name": "7", "create_time": 0.6},
    {"name": "8", "create_time": 0.7},
]
488.45

[
    {"name": "1", "create_time": 0.0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 3.1}, // 这里第二相是<4s都是同一个相位
    {"name": "6", "create_time": 3.2},
    {"name": "7", "create_time": 3.3},
    {"name": "8", "create_time": 3.4},
]
483.83

[
    {"name": "1", "create_time": 0.0},
    {"name": "2", "create_time": 0.1},
    {"name": "3", "create_time": 0.2},
    {"name": "4", "create_time": 0.3},
    {"name": "5", "create_time": 9.4},
    {"name": "6", "create_time": 9.5},
    {"name": "7", "create_time": 9.3},
    {"name": "8", "create_time": 9.4},
]
475.35
"""
```


