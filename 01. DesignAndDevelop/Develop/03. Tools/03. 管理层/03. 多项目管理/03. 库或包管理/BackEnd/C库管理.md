# 库管理

模块库



一个纯C的模块，写：

- 源代码 - 纯头文件库
- 源代码 - 给cpp一起编译
- 静态库
- 动态库

比较这四种选择（参考：GPT4）

1. 纯头文件库
   - 选用：这种方式比较适合小型项目
   - 优点：避免链接问题，对于模板类或函数非常有用
   - 缺点：因为每次编译都会重新编译所有的代码，可能会导致**编译时间**增长
2. 不封装直接给源代码和主函数一起编译
   - 选用：这种方式比较粗糙，一般适合比较小的项目，或者为了方便调试
   - 优点：可以直接查看和修改源代码
   - 缺点：如果源代码较多，**编译时间**可能会很长，也不利于代码的模块化管理
3. 静态库
   - 选用：静态库在编译阶段会被连接到目标程序，增加了目标程序的体积。这种方式适合中大型的项目
   - 优点：**执行速度快**，因为在编译阶段已经确定了所有函数的地址，不需要在运行时动态链接
   - 缺点：如果库有更新，需要重新编译和链接目标程序
4. 动态库
   - 选用：动态库在运行期间被加载，因此可以被多个程序共享，**节约内存**
   - 优点：支持版本控制，允许函数库在不需要重新连接应用程序的情况下进行升级或改变
   - 缺点：运行速度相对较慢，因为需要在运行时解析函数地址

这四种选择各有优劣，根据实际项目的规模、需求和团队的开发习惯，可以进行适当的选择。

## 常用库

参考：[最全常用 C++ 框架、库和资源汇总](https://zhuanlan.zhihu.com/p/98056565)

### 标准库

C++标准库，包括了STL容器，算法和函数等。

- C++ Standard Library：是一系列类和函数的集合，使用核心语言编写，也是C++ISO自身标准的一部分。
- Standard Template Library：标准模板库
- C POSIX library ： POSIX系统的C标准库规范
- ISO C++ Standards Committee ：C++标准委员会

### 框架

C++通用框架和库

- Apache C++ Standard Library：是一系列算法，容器，迭代器和其他基本组件的集合
- ASL ：Adobe源代码库提供了同行的评审和可移植的C++源代码库。
- **Boost** ：大量通用C++库的集合。
- BDE ：来自于彭博资讯实验室的开发环境。
- Cinder：提供专业品质创造性编码的开源开发社区。
- Cxxomfort：轻量级的，只包含头文件的库，将C++ 11的一些新特性移植到C++03中。
- Dlib：使用契约式编程和现代C++科技设计的通用的跨平台的C++库。
- EASTL ：EA-STL公共部分
- ffead-cpp ：企业应用程序开发框架
- Folly：由Facebook开发和使用的开源C++库
- JUCE ：包罗万象的C++类库，用于开发跨平台软件
- libPhenom：用于构建高性能和高度可扩展性系统的事件框架。
- LibSourcey ：用于实时的视频流和高性能网络应用程序的C++11 evented IO
- LibU ： C语言写的多平台工具库
- Loki ：C++库的设计，包括常见的设计模式和习语的实现。
- MiLi ：只含头文件的小型C++库
- openFrameworks ：开发C++工具包，用于创意性编码。
- **Qt** ：跨平台的应用程序和用户界面框架
- Reason ：跨平台的框架，使开发者能够更容易地使用Java，.Net和Python，同时也满足了他们对C++性能和优势的需求。
- ROOT ：具备所有功能的一系列面向对象的框架，能够非常高效地处理和分析大量的数据，为欧洲原子能研究机构所用。
- STLport：是STL具有代表性的版本
- STXXL：用于额外的大型数据集的标准模板库。
- Ultimate++ ：C++跨平台快速应用程序开发框架
- Windows Template Library：用于开发Windows应用程序和UI组件的C++库
- Yomm11 ：C++11的开放multi-methods.

### 人工智能

- btsk ：游戏行为树启动器工具
- Evolving Objects：基于模板的，ANSI C++演化计算库，能够帮助你非常快速地编写出自己的随机优化算法。
- Neu：C++11框架，编程语言集，用于创建人工智能应用程序的多用途软件系统。

### 异步事件循环

- Boost.Asio：用于网络和底层I/O编程的跨平台的C++库。
- libev ：功能齐全，高性能的时间循环，轻微地仿效libevent，但是不再像libevent一样有局限性，也修复了它的一些bug。
- libevent ：事件通知库
- libuv ：跨平台异步I/O。

### 音频

音频，声音，音乐，数字化音乐库

- FMOD ：易于使用的跨平台的音频引擎和音频内容的游戏创作工具。
- Maximilian ：C++音频和音乐数字信号处理库
- OpenAL ：开源音频库—跨平台的音频API
- Opus：一个完全开放的，免版税的，高度通用的音频编解码器
- Speex：免费编解码器，为Opus所废弃
- Tonic： C++易用和高效的音频合成
- Vorbis： Ogg Vorbis是一种完全开放的，非专有的，免版税的通用压缩音频格式。

### 生态学

生物信息，基因组学和生物技术

- libsequence：用于表示和分析群体遗传学数据的C++库。
- SeqAn：专注于生物数据序列分析的算法和数据结构。
- Vcflib ：用于解析和处理VCF文件的C++库
- Wham：直接把联想测试应用到BAM文件的基因结构变异。

### 压缩

压缩和归档库

- bzip2：一个完全免费，免费专利和高质量的数据压缩
- doboz：能够快速解压缩的压缩库
- PhysicsFS：对各种归档提供抽象访问的库，主要用于视频游戏，设计灵感部分来自于Quake3的文件子系统。
- KArchive：用于创建，读写和操作文件档案（例如zip和 tar）的库，它通过QIODevice的一系列子类，使用gzip格式，提供了透明的压缩和解压缩的数据。
- LZ4 ：非常快速的压缩算法
- LZHAM ：无损压缩数据库，压缩比率跟LZMA接近，但是解压缩速度却要快得多。
- LZMA ：7z格式默认和通用的压缩方法。
- LZMAT ：及其快速的实时无损数据压缩库
- miniz：单一的C源文件，紧缩/膨胀压缩库，使用zlib兼容API，ZIP归档读写，PNG写方式。
- Minizip：Zlib最新bug修复，支持PKWARE磁盘跨越，AES加密和IO缓冲。
- Snappy ：快速压缩和解压缩
- ZLib ：非常紧凑的数据流压缩库
- ZZIPlib：提供ZIP归档的读权限。

### 并发性

并发执行和多线程

- Boost.Compute ：用于OpenCL的C++GPU计算库
- Bolt ：针对GPU进行优化的C++模板库
- C++React ：用于C++11的反应性编程库
- Intel TBB ：Intel线程构件块
- Libclsph：基于OpenCL的GPU加速SPH流体仿真库
- OpenCL ：并行编程的异构系统的开放标准
- OpenMP：OpenMP API
- Thrust ：类似于C++标准模板库的并行算法库
- HPX ：用于任何规模的并行和分布式应用程序的通用C++运行时系统
- VexCL ：用于OpenCL/CUDA 的C++向量表达式模板库。

### 容器

- C++ B-tree ：基于B树数据结构，实现命令内存容器的模板库
- Hashmaps： C++中开放寻址哈希表算法的实现

### 密码学

- Bcrypt ：一个跨平台的文件加密工具，加密文件可以移植到所有可支持的操作系统和处理器中。
- BeeCrypt：
- Botan： C++加密库
- Crypto++：一个有关加密方案的免费的C++库
- GnuPG： OpenPGP标准的完整实现
- GnuTLS ：实现了SSL，TLS和DTLS协议的安全通信库
- Libgcrypt
- libmcrypt
- LibreSSL：免费的SSL/TLS协议，属于2014 OpenSSL的一个分支
- LibTomCrypt：一个非常全面的，模块化的，可移植的加密工具
- libsodium：基于NaCI的加密库，固执己见，容易使用
- Nettle 底层的加密库
- OpenSSL ： 一个强大的，商用的，功能齐全的，开放源代码的加密库。
- Tiny AES128 in C ：用C实现的一个小巧，可移植的实现了AES128ESB的加密算法

### 数据库

数据库，SQL服务器，ODBC驱动程序和工具

- hiberlite ：用于Sqlite3的C++对象关系映射
- Hiredis： 用于Redis数据库的很简单的C客户端库
- LevelDB： 快速键值存储库
- LMDB：符合数据库四大基本元素的嵌入键值存储
- MySQL++：封装了MySql的C API的C++ 包装器
- RocksDB：来自Facebook的嵌入键值的快速存储
- SQLite：一个完全嵌入式的，功能齐全的关系数据库，只有几百KB，可以正确包含到你的项目中。

### 调试

调试库， 内存和资源泄露检测，单元测试

- Boost.Test：Boost测试库
- Catch：一个很时尚的，C++原生的框架，只包含头文件，用于单元测试，测试驱动开发和行为驱动开发。
- CppUnit：由JUnit移植过来的C++测试框架
- CTest：CMake测试驱动程序
- googletest：谷歌C++测试框架
- ig-debugheap：用于跟踪内存错误的多平台调试堆
- libtap：用C语言编写测试
- MemTrack —用于C++跟踪内存分配
- microprofile- 跨平台的网络试图分析器
- minUnit ：使用C写的迷你单元测试框架，只使用了两个宏
- Remotery：用于web视图的单一C文件分析器
- UnitTest++：轻量级的C++单元测试框架

### 游戏引擎

- Cocos2d-x ：一个跨平台框架，用于构建2D游戏，互动图书，演示和其他图形应用程序。
- Grit ：社区项目，用于构建一个免费的游戏引擎，实现开放的世界3D游戏。
- Irrlicht ：C++语言编写的开源高性能的实时#D引擎
- Polycode：C++实现的用于创建游戏的开源框架（与Lua绑定）。

### 图形用户界面

- CEGUI ： 很灵活的跨平台GUI库
- FLTK ：快速，轻量级的跨平台的C++GUI工具包。
- GTK+： 用于创建图形用户界面的跨平台工具包
- gtkmm ：用于受欢迎的GUI库GTK+的官方C++接口。
- imgui：拥有最小依赖关系的立即模式图形用户界面
- libRocket ：libRocket 是一个C++ HTML/CSS 游戏接口中间件
- MyGUI ：快速，灵活，简单的GUI
- Ncurses：终端用户界面
- QCustomPlot ：没有更多依赖关系的Qt绘图控件
- Qwt ：用户与技术应用的Qt 控件
- QwtPlot3D ：功能丰富的基于Qt/OpenGL的C++编程库，本质上提供了一群3D控件
- OtterUI ：OtterUI 是用于嵌入式系统和互动娱乐软件的用户界面开发解决方案
- PDCurses 包含源代码和预编译库的公共图形函数库
- wxWidgets C++库，允许开发人员使用一个代码库可以为widows， Mac OS X，Linux和其他平台创建应用程序

### 图形

- bgfx：跨平台的渲染库
- Cairo：支持多种输出设备的2D图形库
- Horde3D 一个小型的3D渲染和动画引擎
- magnum C++11和OpenGL 2D/3D 图形引擎
- Ogre 3D 用C++编写的一个面向场景，实时，灵活的3D渲染引擎（并非游戏引擎）
- OpenSceneGraph 具有高性能的开源3D图形工具包
- Panda3D 用于3D渲染和游戏开发的框架，用Python和C++编写。
- Skia 用于绘制文字，图形和图像的完整的2D图形库
- urho3d 跨平台的渲染和游戏引擎。

### 图像处理

- Boost.GIL：通用图像库
- CImg ：用于图像处理的小型开源C++工具包
- CxImage ：用于加载，保存，显示和转换的图像处理和转换库，可以处理的图片格式包括 BMP, JPEG, GIF, PNG, TIFF, MNG, ICO, PCX, TGA, WMF, WBMP, JBG, J2K。
- FreeImage ：开源库，支持现在多媒体应用所需的通用图片格式和其他格式。
- GDCM：Grassroots DICOM 库
- ITK：跨平台的开源图像分析系统
- Magick++：ImageMagick程序的C++接口
- MagickWnd：ImageMagick程序的C++接口
- OpenCV ： 开源计算机视觉类库
- tesseract-ocr：OCR引擎
- VIGRA ：用于图像分析通用C++计算机视觉库
- VTK ：用于3D计算机图形学，图像处理和可视化的开源免费软件系统。

### 国际化

- gettext ：GNU `gettext’
- IBM ICU：提供Unicode 和全球化支持的C、C++ 和Java库
- libiconv ：用于不同字符编码之间的编码转换库

### Json

- frozen ： C/C++的Jason解析生成器
- Jansson ：进行编解码和处理Jason数据的C语言库
- jbson ：C++14中构建和迭代BSON data,和Json 文档的库
- JeayeSON：非常健全的C++ JSON库，只包含头文件
- JSON++ ： C++ JSON 解析器
- json-parser：用可移植的ANSI C编写的JSON解析器，占用内存非常少
- json11 ：一个迷你的C++11 JSON库
- jute ：非常简单的C++ JSON解析器
- ibjson：C语言中的JSON解析和打印库，很容易和任何模型集成。
- libjson：轻量级的JSON库
- PicoJSON：C++中JSON解析序列化，只包含头文件
- qt-json ：用于JSON数据和 QVariant层次间的相互解析的简单类
- QJson：将JSON数据映射到QVariant对象的基于Qt的库
- RapidJSON： 用于C++的快速JSON 解析生成器，包含SAX和DOM两种风格的API
- YAJL ：C语言中快速流JSON解析库

### 日志

- Boost.Log ：设计非常模块化，并且具有扩展性
- easyloggingpp：C++日志库，只包含单一的头文件。
- Log4cpp ：一系列C++类库，灵活添加日志到文件，系统日志，IDSA和其他地方。
- templog：轻量级C++库，可以添加日志到你的C++应用程序中

### 机器学习

- Caffe ：快速的神经网络框架
- CCV ：以C语言为核心的现代计算机视觉库
- mlpack ：可扩展的C++机器学习库
- OpenCV：开源计算机视觉库
- Recommender：使用协同过滤进行产品推荐/建议的C语言库。
- SHOGUN：Shogun 机器学习工具
- sofia-ml ：用于机器学习的快速增量算法套件

### 数学

- Armadillo ：高质量的C++线性代数库，速度和易用性做到了很好的平衡。语法和MatlAB很相似
- blaze：高性能的C++数学库，用于密集和稀疏算法。
- ceres-solver ：来自谷歌的C++库，用于建模和解决大型复杂非线性最小平方问题。
- CGal： 高效，可靠的集合算法集合
- cml ：用于游戏和图形的免费C++数学库
- Eigen ：高级C++模板头文件库，包括线性代数，矩阵，向量操作，数值解决和其他相关的算法。
- GMTL：数学图形模板库是一组广泛实现基本图形的工具。
- GMP：用于个高精度计算的C/C++库，处理有符号整数，有理数和浮点数。

### 多媒体

- GStreamer ：构建媒体处理组件图形的库
- LIVE555 Streaming Media ：使用开放标准协议(RTP/RTCP, RTSP, SIP) 的多媒体流库
- libVLC ：libVLC (VLC SDK)媒体框架
- QtAv：基于Qt和FFmpeg的多媒体播放框架，能够帮助你轻而易举地编写出一个播放器
- SDL ：简单直控媒体层
- SFML ：快速，简单的多媒体库

### 网络

- ACE：C++面向对象网络变成工具包
- Boost.Asio：用于网络和底层I/O编程的跨平台的C++库
- Casablanca：C++ REST SDK
- cpp-netlib：高级网络编程的开源库集合
- Dyad.c：C语言的异步网络
- libcurl :多协议文件传输库
- Mongoose：非常轻量级的网络服务器
- Muduo ：用于Linux多线程服务器的C++非阻塞网络库
- net_skeleton ：C/C++的TCP 客户端/服务器库
- nope.c ：基于C语言的超轻型软件平台，用于可扩展的服务器端和网络应用。 对于C编程人员，可以考虑node.js
- Onion :C语言HTTP服务器库，其设计为轻量级，易使用。
- POCO：用于构建网络和基于互联网应用程序的C++类库，可以运行在桌面，服务器，移动和嵌入式系统。
- RakNet：为游戏开发人员提供的跨平台的开源C++网络引擎。
- Tuf o ：用于Qt之上的C++构建的异步Web框架。
- WebSocket++ ：基于C++/Boost Aiso的websocket 客户端/服务器库
- ZeroMQ ：高速，模块化的异步通信库

### 物理学

动力学仿真引擎

- Box2D：2D的游戏物理引擎。
- Bullet ：3D的游戏物理引擎。
- Chipmunk ：快速，轻量级的2D游戏物理库
- LiquidFun：2D的游戏物理引擎
- ODE ：开放动力学引擎-开源，高性能库，模拟刚体动力学。
- ofxBox2d：Box2D开源框架包装器。
- Simbody ：高性能C++多体动力学/物理库，模拟关节生物力学和机械系统，像车辆，机器人和人体骨骼。

### 机器人学

- MOOS-IvP ：一组开源C++模块，提供机器人平台的自主权，尤其是自主的海洋车辆。
- MRPT：移动机器人编程工具包
- PCL ：点云库是一个独立的，大规模的开放项目，用于2D/3D图像和点云处理。
- Robotics Library (RL)： 一个独立的C++库，包括机器人动力学，运动规划和控制。
- RobWork：一组C++库的集合，用于机器人系统的仿真和控制。
- ROS ：机器人操作系统，提供了一些库和工具帮助软件开发人员创建机器人应用程序。

### 科学计算

- FFTW :用一维或者多维计算DFT的C语言库。
- GSL：GNU科学库。

### 脚本

- ChaiScript ：用于C++的易于使用的嵌入式脚本语言。
- Lua ：用于配置文件和基本应用程序脚本的小型快速脚本引擎。
- luacxx：用于创建Lua绑定的C++ 11 API
- SWIG ：一个可以让你的C++代码链接到JavaScript，Perl，PHP，Python，Tcl和Ruby的包装器/接口生成器
- V7：嵌入式的JavaScript 引擎。
- V8 ：谷歌的快速JavaScript引擎，可以被嵌入到任何C++应用程序中。

### 序列化

- Cap’n Proto ：快速数据交换格式和RPC系统。
- cereal ：C++11 序列化库
- FlatBuffers ：内存高效的序列化库
- MessagePack ：C/C++的高效二进制序列化库，例如 JSON
- protobuf ：协议缓冲，谷歌的数据交换格式。
- protobuf-c ：C语言的协议缓冲实现
- SimpleBinaryEncoding：用于低延迟应用程序的对二进制格式的应用程序信息的编码和解码。
- Thrift ：高效的跨语言IPC/RPC，用于C++，Java，Python，PHP，C#和其它多种语言中，最初由Twitter开发。

### 视频

- libvpx ：VP8/VP9编码解码SDK
- FFmpeg ：一个完整的，跨平台的解决方案，用于记录，转换视频和音频流。
- libde265 ：开放的h.265视频编解码器的实现。
- OpenH264：开源H.364 编解码器。
- Theora ：免费开源的视频压缩格式。

### 虚拟机

- CarpVM：C中有趣的VM，让我们一起来看看这个。
- MicroPython ：旨在实现单片机上Python3.x的实现
- TinyVM：用纯粹的ANSI C编写的小型，快速，轻量级的虚拟机。

### Web应用框架

- Civetweb ：提供易于使用，强大的，C/C++嵌入式Web服务器，带有可选的CGI，SSL和Lua支持。
- CppCMS ：免费高性能的Web开发框架（不是 CMS）.
- Crow ：一个C++微型web框架（灵感来自于Python Flask）
- Kore :使用C语言开发的用于web应用程序的超快速和灵活的web服务器/框架。
- libOnion：轻量级的库，帮助你使用C编程语言创建web服务器。
- QDjango：使用C++编写的，基于Qt库的web框架，试图效仿Django API，因此得此名。
- Wt ：开发Web应用的C++库。

### XML

XML就是个垃圾，xml的解析很烦人，对于计算机它也是个灾难。这种糟糕的东西完全没有存在的理由了。-Linus Torvalds

- Expat ：用C语言编写的xml解析库
- Libxml2 ：Gnome的xml C解析器和工具包
- libxml++ ：C++的xml解析器
- PugiXML ：用于C++的，支持XPath的轻量级，简单快速的XML解析器。
- RapidXml ：试图创建最快速的XML解析器，同时保持易用性，可移植性和合理的W3C兼容性。
- TinyXML ：简单小型的C++XML解析器，可以很容易地集成到其它项目中。
- TinyXML2：简单快速的C++CML解析器，可以很容易集成到其它项目中。
- TinyXML++：TinyXML的一个全新的接口，使用了C++的许多许多优势，模板，异常和更好的异常处理。
- Xerces-C++ ：用可移植的C++的子集编写的XML验证解析器。

### 多项混杂

一些有用的库或者工具，但是不适合上面的分类，或者还没有分类。

- C++ Format ：C++的小型，安全和快速格式化库
- casacore ：从aips++ 派生的一系列C++核心库
- cxx-prettyprint：用于C++容器的打印库
- DynaPDF ：易于使用的PDF生成库
- gcc-poison ：帮助开发人员禁止应用程序中的不安全的C/C++函数的简单的头文件。
- googlemock：编写和使用C++模拟类的库
- HTTP Parser ：C的http请求/响应解析器
- libcpuid ：用于x86 CPU检测盒特征提取的小型C库
- libevil ：许可证管理器
- libusb：允许移动访问USB设备的通用USB库
- PCRE：正则表达式C库，灵感来自于Perl中正则表达式的功能。
- Remote Call Framework ：C++的进程间通信框架。
- Scintilla ：开源的代码编辑控件
- Serial Communication Library ：C++语言编写的跨平台，串口库。
- SDS：C的简单动态字符串库
- SLDR ：超轻的DNS解析器
- SLRE： 超轻的正则表达式库
- Stage ：移动机器人模拟器
- VarTypes：C++/Qt4功能丰富，面向对象的管理变量的框架。
- ZBar：‘条形码扫描器’库，可以扫描照片，图片和视频流中的条形码，并返回结果。
- CppVerbalExpressions ：易于使用的C++正则表达式
- QtVerbalExpressions：基于C++ VerbalExpressions 库的Qt库
- PHP-CPP：使用C++来构建PHP扩展的库
- Better String ：C的另一个字符串库，功能更丰富，但是没有缓冲溢出问题，还包含了一个C++包装器。

### 软件

用于创建开发环境的软件

### 编译器

C/C++编译器列表

- Clang :由苹果公司开发的
- GCC：GNU编译器集合
- Intel C++ Compiler ：由英特尔公司开发
- LLVM ：模块化和可重用编译器和工具链技术的集合
- Microsoft Visual C++ ：MSVC，由微软公司开发
- Open WatCom ：Watcom，C，C++和Fortran交叉编译器和工具
- TCC ：轻量级的C语言编译器

### 在线编译器

在线C/C++编译器列表

- codepad ：在线编译器/解释器，一个简单的协作工具
- CodeTwist：一个简单的在线编译器/解释器，你可以粘贴的C,C++或者Java代码，在线执行并查看结果
- coliru ：在线编译器/shell， 支持各种C++编译器
- Compiler Explorer：交互式编译器，可以进行汇编输出
- CompileOnline：Linux上在线编译和执行C++程序
- Ideone ：一个在线编译器和调试工具，允许你在线编译源代码并执行，支持60多种编程语言。

### 调试器

C/C++调试器列表

- Comparison of debuggers ：来自维基百科的调试器列表
- GDB ：GNU调试器
- Valgrind：内存调试，内存泄露检测，性能分析工具。

### 集成开发环境（IDE）

C/C++集成开发环境列表

- AppCode ：构建与JetBrains’ IntelliJ IDEA 平台上的用于Objective-C，C,C++，Java和Java开发的集成开发环境
- CLion：来自JetBrains的跨平台的C/C++的集成开发环境
- Code::Blocks ：免费C，C++和Fortran的集成开发环境
- CodeLite ：另一个跨平台的免费的C/C++集成开发环境
- Dev-C++：可移植的C/C++/C++11集成开发环境
- Eclipse CDT：基于Eclipse平台的功能齐全的C和C++集成开发环境
- Geany ：轻量级的快速，跨平台的集成开发环境。
- IBM VisualAge ：来自IBM的家庭计算机集成开发环境。
- Irony-mode：由libclang驱动的用于Emacs的C/C++微模式
- KDevelop：免费开源集成开发环境
- Microsoft Visual Studio ：来自微软的集成开发环境
- NetBeans ：主要用于Java开发的的集成开发环境，也支持其他语言，尤其是PHP，C/C++和HTML5。
- Qt Creator：跨平台的C++，Javascript和QML集成开发环境，也是Qt SDK的一部分。
- rtags：C/C++的客户端服务器索引，用于 跟基于clang的emacs的集成
- Xcode ：由苹果公司开发
- YouCompleteMe：一个用于Vim的根据你敲的代码快速模糊搜索并进行代码补全的引擎。

### 构建系统

- Bear ：用于为clang工具生成编译数据库的工具
- Biicode：基于文件的简单依赖管理器。
- CMake ：跨平台的免费开源软件用于管理软件使用独立编译的方法进行构建的过程。
- CPM：基于CMake和Git的C++包管理器
- FASTBuild：高性能，开源的构建系统，支持高度可扩展性的编译，缓冲和网络分布。
- Ninja ：专注于速度的小型构建系统
- Scons ：使用Python scipt 配置的软件构建工具
- tundra ：高性能的代码构建系统，甚至对于非常大型的软件项目，也能提供最好的增量构建次数。
- tup：基于文件的构建系统，用于后台监控变化的文件。

### 静态代码分析

提高质量，减少瑕疵的代码分析工具列表

- Cppcheck ：静态C/C++代码分析工具
- include-what-you-use ：使用clang进行代码分析的工具，可以#include在C和C++文件中。
- OCLint ：用于C，C++和Objective-C的静态源代码分析工具，用于提高质量，减少瑕疵。
- Clang Static Analyzer：查找C，C++和Objective-C程序bug的源代码分析工具
- List of tools for static code analysis ：来自维基百科的静态代码分析工具列表



















































