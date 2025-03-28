---
last_time: 2020.04.28
tag: 有道云
---

# Blend modes 图层混合模式

我有个叫 《20200218_图层混合模式的研究_Matlab》 的Matlab项目，甚至画了图，那个也值得参考

**Blend modes（27-8bit&&15-32bit）**

公式改-简化：(r,g,b)=(R,G,B)/255，（r,g,b)反相=1-(r,g,b)，(R,G,B)反相=255-(R,G,B)，D为该层透明度
**注意的是，简化版公式是方便理解，真实运算中直接使用(R,G,B)数据进行运算**
A为下图层-基色，B为上图层-混合色，C为结果色。【A=R/**G/B，a=r/g/b】

| 图层混合模式                        | 作用                                                         | 公式                                               | 图层混合模式                         | 作用                                                         | 公式                                                     |
| ----------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| 正常模式（Normal）【组合模式】      | 补充：与不透明度有关补充：图层的默认模式体现：混合色层以Alpha状盖住了基色层 | c=F(a,b,d)【支持32bit】                            | 溶解（Dissolve）【组合模式】         | 补充：与不透明度有关补充：图像的色彩不产生影响体现：混合色层以散点状盖住基色层边缘处效果明显 | c=F(a,b,d)【支持32bit】                                  |
| 正片叠底（Multiply）【加深模式】    | 应用：扣白留黑补充：与滤色模式相反体现：压暗中间调           | c=aXb【支持32bit】                                 | 滤色（Screen）【减淡模式】           | 应用：扣黑留白补充：与正片叠底相反体现：提亮中间调           | c反=a反xb反                                              |
| 变暗（Darken）【加深模式】          | 应用：截取剖面补充：与变亮模式相反体现：谁暗就保留谁         | c=Min(a,b)【支持32bit】                            | 变亮（Lighten）【减淡模式】          | 应用：水漫石头补充：与变暗模式相反体现：谁亮就保留谁         | c=Max(a,b)【支持32bit】                                  |
| 深色（Darker Color）【加深模式】    | 补充：与变暗相似，但计算复合通道体现：会导致过渡生硬         | ∑c=Min(∑a,∑b)【支持32bit】                         | 浅色（Lighter Color）【减淡模式】    | 补充：与变亮相似，但计算复合通道体现：会导致过渡生硬         | ∑c=Max(∑a,∑b)【支持32bit】                               |
| 颜色加深（Color Burn）【加深模式】  | 类似于正片叠底但会根据叠加的颜色相应增加对比度和白色混合没有效果 | c=1-(1-b)/a                                        | 颜色减淡（Color Dodge）【减淡模式】  | 补充：与颜色加深相反补充：极易过曝                           | c=b/(1-a)【支持32bit】                                   |
| 线性加深（Linear Burn）【加深模式】 | 体现：都白才白，否则变暗                                     | c=a+b-1=b-反相a=a-反相b                            | 线性减淡（Linear Dodge）【减淡模式】 | 也称为线性减淡添加应用：迭代HDRI图物理亮度猜想：压暗一半再用，调和体现：亮度更亮，饱和低 | c=a+b                                                    |
| 叠加（Overlay）【对比模式】         | **下图层**混合色遵循中性灰原理**二分段**函数，叠底和滤色的混合**体现：**提亮白色压暗阴影，加对比 | a<=0.5: c=2abca>0.5: c反=2a反b反与强光同算法       | 强光（Hard Light）【对比模式】       | 上图层混合色遵循中性灰原理二分段函数，叠底和滤色的混合体现：提亮白色压暗阴影，加对比 | b<=0.5: c=2abb>0.5: c反=2a反b反与叠加同算法              |
| 柔光（Soft Light）【对比模式】      | 上图层混合色遵循中性灰原理二分段函数，叠加和强光的柔和版体现：柔化地加对比 | b<=0.5:c=2ab+(a^2)(1-2B)b>0.5:c=2a(1-b)+根a*(2b-1) | 点光（Pin Light）【对比模式】        | 上图层混合色遵循中性灰原理二分段函数，变暗和变亮的混合体现：会产生明显分界线 | b>0.5:Max(a,b)b<0.5:Min(a,b)                             |
| 线性光（Linear Light）【对比模式】  | 上图层混合色遵循中性灰原理不分段，类似线性减淡和线性加深体现：提亮高光压暗黑色，丢细节 | c=(2a-1)+b                                         | 实色混合（Hard Mix）【对比模式】     | **不遵循**中性灰原理**二分段**函数，分通道的阈值**体现：**会得到纯度非常高的颜色 | a+b>=1：c=1a+b<1：c=0                                    |
| 亮光（Vivid Light）【对比模式】     |                                                              |                                                    |                                      |                                                              | a<2b-1：c=2b-1a=(2b-1,2b)：c=aa>2b：c=2b                 |
| 差值（Difference）【比较模式】      | 与排除作用类似，结果色对比度更强体现：白色混合变反色，黑色混合不变色体现：能得到反色条纹/边缘应用：能用于用水印去除透明水印 | c=abs(a-b)【支持32bit】                            | 色相（Hue）【色彩模式】              | 体现：基色图层的色相被替换                                   | c色相值=b色相值c饱和度=a饱和度c亮度=a亮度　【支持32bit】 |
| 排除（Exclusion）【比较模式】       | 与插值作用类似，结果色对比度很弱(灰)体现：白色混合变反色，黑色混合不变色体现：能得到反色条纹/边缘 | c=a+b-2ab                                          | 饱和度（Saturation）【色彩模式】     | 体现：基色图层的饱和度被替换                                 | c色相值=a色相值c饱和度=b饱和度c亮度=a亮度　【支持32bit】 |
| 减去（Subtract）【比较模式】        | 体现：白色混合得黑色，黑色混合不变色                         | c=b-a=(b-a)/收缩+补偿【支持32bit】                 | 颜色（Color）【色彩模式】            | 体现：基色图层仅亮度不被替换作用：黑白图片上色的绝佳模式     | c色相值=b色相值c饱和度=b饱和度c亮度=a亮度　【支持32bit】 |
| 划分（Divide）【比较模式】          | 体现：白色混合不变色，黑色混合得白色体现：基色更亮得白色     | c=b/a*1【支持32bit】                               | 明度（Luminosity）【色彩模式】       | 体现：基色图层的亮度被替换                                   | c色相值=a色相值c饱和度=a饱和度c亮度=b亮度　【支持32bit】 |