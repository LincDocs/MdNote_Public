# Cpp包管理工具find_package

参考：

- [Cmake之深入理解find_package()的用法](https://zhuanlan.zhihu.com/p/97369704)
- [“轻松搞定CMake”系列之find_package用法详解](https://blog.csdn.net/zhanghm1995/article/details/105466372)

## find_package 命令详解



## 搜包过程、两种工作模式

首先我们需要明确一点，CMake本身不提供任何搜索库的便捷方法，所有搜索库并给变量赋值的操作必须由CMake代码完成，也就是上述中的 `XXXConfig.cmake` 以及下面将要提到的 `FindXXX.cmake` 配置文件。只不过，库的作者通常会提供这两个文件，以方便使用者调用。

### ### 两种工作模式

#### 介绍

find_package命令有两种工作模式，这两种工作模式的不同决定了其搜包路径的不同：

- Module模式
  find_package命令基础工作模式(Basic Signature)，也是默认工作模式。
- Config模式
  find_package命令高级工作模式(Full Signature)。 只有在find_package()中指定CONFIG、NO_MODULE等关键字，或者Module模式查找失败后才会进入到Config模式。

#### 查找顺序、流程

因此find_package工作模式流程图为：

![](assets/fbc0ea14540f058e6c7c5ffb5024c81e.png)

两种模式看起来似乎差不多，**不过CMake默认采取Module模式，如果Module模式未找到库，才会采取Config模式**。如果XXX_DIR路径下找不到XXXConfig.cmake文件，则会找 `/usr/local/lib/cmake/XXX/` 中的`XXXConfig.cmake` 文件。总之，Config模式是一个备选策略。通常，库安装时会拷贝一份XXXConfig.cmake到系统目录中，因此在没有显式指定搜索路径时也可以顺利找到。

#### 提前比较、区别、选用建议

上面的查找规则整体看起来好像很复杂，但其实我们在安装库的时候都会自动配置安装到对的位置，一般都不会出现问题。如果我们需要指定特定的库，我们也只需要设置**优先级最高**的几个变量名即可。包括下面两种情况：

1、如果你明确知道想要查找的库`<PackageName>Config.cmake`或`<lower-case-package-name>-config.cmake`文件所在路径，为了能够准确定位到这个包，可以直接设置变量`<PackageName>_DIR`为具体路径，如：

就可以明确需要查找的OpenCV包的路径了。

2、如果你有多个包的配置文件需要查找，可以将这些配置文件都统一放在一个命名为`cmake`的文件夹下，然后设置变量`CMAKE_PREFIX_PATH`变量指向这个`cmake`文件夹路径，**需要注意根据上述的匹配规则，此时每个包的配置文件需要单独放置在命名为包名的==文件夹==下（文件夹名不区分大小写）**，否则会提示找不到。

### Module模式

#### 用法

**Module**模式的参数为：

```js
find_package(<package> [version] [EXACT] [QUIET] [MODULE]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [NO_POLICY_SCOPE])
```

参数解释：

[list]

- **package**： 必填参数。需要查找的包名，注意大小写。
- **version和EXACT**： 可选参数，version指定的是版本，如果指定就必须检查找到的包的版本是否和**version**兼容。如果指定**EXACT**则表示必须完全匹配的版本而不是兼容版本就可以。
- **QUIET**： 可选参数，表示如果查找失败，不会在屏幕进行输出（但是如果指定了**REQUIRED**字段，则**QUIET**无效，仍然会输出查找失败提示语）。
- **MODULE**： 可选字段。前面提到说“如果**Module**模式查找失败则回退到**Config**模式进行查找”，但是假如加入了**MODULE**选项，那么就只在**Module**模式查找，如果**Module**模式下查找失败并不切换到**Config**模式查找。
- **REQUIRED**： 可选字段。表示一定要找到包，找不到的话就立即停掉整个CMake。而如果不指定**REQUIRED**则CMake会继续执行。
- **COMPONENTS，components**： 可选字段，表示查找的包中必须要找到的组件(components），如果有任何一个找不到就算失败，类似于**REQUIRED**，导致CMake停止执行。

#### 查找顺序

Module模式下是要查找到名为 `Find<PackageName>.cmake` 的配置文件。

Module模式只有两个查找路径，且他们的查找顺序如下：

- CMAKE_MODULE_PATH
    - 路径：**CMAKE_MODULE_PATH** 变量对应的路径中查找。
    - 打印：`CMakeLists.txt` 文件中打印：`message(STATUS "CMAKE_MODULE_PATH = ${CMAKE_MODULE_PATH}")`
    - 补充：其中 **CMAKE_MODULE_PATH** 默认为空，可以利用 `set` 命令赋值。
    - 补充：（如果路径为空，或者路径中查找失败，则找下一项）
- CMAKE_ROOT
    - 路径：CMake安装目录（即**CMAKE_ROOT**变量）下的 **Modules** 目录下（通常为 `/usr/share/cmake-3.10/Modules`，3.10是我的CMake版本）查找。
    - 打印：`CMakeLists.txt` 文件中打印：`message(STATUS "CMAKE_ROOT = ${CMAKE_ROOT}")`

在安装CMake时，CMake为我们提供了很多开发库的 `FindXXX.cmake` 模块文件，可以通过命令查询：

```bash
cmake --help-module-list | grep -E ^Find
```

### Config模式

#### 用法

**Config**模式的完整命令参数为：

```js
find_package(<package> [version] [EXACT] [QUIET]
             [REQUIRED] [[COMPONENTS] [components...]]
             [CONFIG|NO_MODULE]
             [NO_POLICY_SCOPE]
             [NAMES name1 [name2 ...]]
             [CONFIGS config1 [config2 ...]]
             [HINTS path1 [path2 ... ]]
             [PATHS path1 [path2 ... ]]
             [PATH_SUFFIXES suffix1 [suffix2 ...]]
             [NO_DEFAULT_PATH]
             [NO_CMAKE_ENVIRONMENT_PATH]
             [NO_CMAKE_PATH]
             [NO_SYSTEM_ENVIRONMENT_PATH]
             [NO_CMAKE_PACKAGE_REGISTRY]
             [NO_CMAKE_BUILDS_PATH] # Deprecated; does nothing.
             [NO_CMAKE_SYSTEM_PATH]
             [NO_CMAKE_SYSTEM_PACKAGE_REGISTRY]
             [CMAKE_FIND_ROOT_PATH_BOTH |
              ONLY_CMAKE_FIND_ROOT_PATH |
              NO_CMAKE_FIND_ROOT_PATH])
```

相比于Module模式，Config模式的参数更多，也更复杂，但实际在使用过程中我们并不会用到所有参数，大部分参数都是可选的，我们只需要掌握基本的参数用法即可。

其中具体查找库并给 `XXX_INCLUDE_DIRS` 和 `XXX_LIBRARIES` 两个变量赋值的操作由 `XXXConfig.cmake` 模块完成。

#### 查找顺序

**Config** 模式下是要查找名为 `<PackageName>Config.cmake` 或 `<lower-case-package-name>-config.cmake` 的模块文件。

与Module模式不同，Config模式需要查找的路径非常多，也要匹配很多的可能性，因此有些路径是首先作为**根目录**，然后进行子目录的匹配，我会进行说明。

具体查找顺序为：  

- 名为 `<PackageName>_DIR` 的CMake变量或环境变量路径  
    - **非根目录**，默认为空。  
      这个路径是非根目录路径，需要指定到 `<PackageName>Config.cmake` 或 `<lower-case-package-name>-config.cmake` 文件所在目录才能找到。  
- 名为 `CMAKE_PREFIX_PATH`、`CMAKE_FRAMEWORK_PATH`、`CMAKE_APPBUNDLE_PATH` 的CMake变量或**环境变量**路径
    - **根目录**，默认都为空。  
      注意如果你电脑中安装了**ROS**并配置好之后，你在终端执行`echo $CMAKE_PREFIX_PATH`会发现ROS会将CMAKE_PREFIX_PATH这个变量设置为ROS中的库的路径，意思是会首先查找ROS安装的库，如果恰好你在ROS中安装了OpenCV库，就会发现首先找到的是ROS中的OpenCV，而不是你自己安装到系统中的OpenCV。  
- `PATH`环境变量路径  
    - **根目录**，默认为系统环境`PATH`环境变量值。  
      其实这个路径才是**Config**模式大部分情况下能够查找到安装到系统中各种库的原因。  
    - 这个路径的查找规则为：  
    - 遍历`PATH`环境变量中的各路径，如果该路径如果以bin或sbin结尾，则**自动回退到上一级目录**得到根目录。例如我的`PATH`路径包括：
      ```bash
      $ echo $PATH
      /home/zhanghm/.local/bin:/usr/local/cuda-10.1/bin:/opt/ros/melodic/bin:/home/zhanghm/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
      ```

在上述指明的是**根目录**路径时，CMake会首先检查这些**根目录**路径下是否有名为`<PackageName>Config.cmake`或`<lower-case-package-name>-config.cmake`的模块文件，如果没有，CMake会继续**检查或匹配**这些根目录下的以下路径（`<PackageName>_DIR`路径不是根目录路径）：

其中为系统架构名，如Ubuntu下一般为：`/usr/lib/x86_64-linux-gnu`，整个`(lib/<arch>|lib|share)`为可选路径，例如OpenCV库而言会**检查或匹配**`<prefix>/OpenCV/`、`<prefix>/lib/x86_64-linux-gnu/OpenCV/`、`<prefix>/lib/share/OpenCV/`、`<prefix>/share/OpenCV/`等路径；name为包名，不区分大小写`<name>*`意思是包名后接一些版本后等字符也是合法的，如`pcl-1.9`也会被找到。

## 内置模块、非官方库、自己的库

### 通过Cmake内置模块引入依赖包

为了方便我们在项目中引入外部依赖包，cmake官方为我们预定义了许多寻找[依赖包](https://zhida.zhihu.com/search?content_id=109768348&content_type=Article&match_order=4&q=%E4%BE%9D%E8%B5%96%E5%8C%85&zhida_source=entity)

的Module，他们存储在 `path_to_your_cmake/share/cmake-<version>/Modules` 目录下。每个以`Find<LibaryName>.cmake` **命名的文件**都可以帮我们找到一个包。我们也可以在官方文档中查看到哪些库官方已经为我们定义好了，我们可以直接使用find_package函数进行引用 [官方文档：Find Modules](https://link.zhihu.com/?target=https%3A//cmake.org/cmake/help/latest/manual/cmake-modules.7.html)。

我们以 [curl库](https://zhida.zhihu.com/search?content_id=109768348&content_type=Article&match_order=1&q=curl%E5%BA%93&zhida_source=entity) 为例，假设我们项目需要引入这个库，从网站中请求网页到本地，我们看到官方已经定义好了FindCURL.cmake。所以我们在CMakeLists.txt中可以直接用find_pakcage进行引用。

### 通过find_package引入非官方的库（该方式只对支持cmake编译安装的库有效）

假设此时我们需要引入glog库来进行日志的记录，我们在Module目录下并没有找到 FindGlog.cmake。所以我们需要自行安装glog库，再进行引用。

安装

```bash
# clone该项目
git clone https://github.com/google/glog.git 
# 切换到需要的版本 
cd glog
git checkout v0.40  

# 根据官网的指南进行安装
cmake -H. -Bbuild -G "Unix Makefiles"
cmake --build build
cmake --build build --target install
```

此时我们便可以通过与引入curl库一样的方式引入glog库了

```cmake
find_package(GLOG)
add_executable(glogtest glogtest.cc)
if(GLOG_FOUND)
    # 由于glog在连接时将头文件直接链接到了库里面，所以这里不用显示调用target_include_directories
    target_link_libraries(glogtest glog::glog)
else(GLOG_FOUND)
    message(FATAL_ERROR ”GLOG library not found”)
endif(GLOG_FOUND)
```

### Module模式与Config模式

通过上文我们了解了通过Cmake引入依赖库的基本用法。知其然也要知其所以然，find_package对我们来说是一个黑盒子，那么它是具体通过什么方式来查找到我们依赖的库文件的路径的呢。到这里我们就不得不聊到find_package的两种模式，一种是Module模式，也就是我们引入curl库的方式。另一种叫做Config模式，也就是引入glog库的模式。下面我们来详细介绍着两种方式的运行机制。

在Module模式中，cmake需要找到一个叫做`Find<LibraryName>.cmake`的文件。这个文件负责找到库所在的路径，为我们的项目引入[头文件路径](https://zhida.zhihu.com/search?content_id=109768348&content_type=Article&match_order=1&q=%E5%A4%B4%E6%96%87%E4%BB%B6%E8%B7%AF%E5%BE%84&zhida_source=entity)

和库文件路径。cmake搜索这个文件的路径有两个，一个是上文提到的cmake安装目录下的`share/cmake-<version>/Modules`目录，另一个使我们指定的`CMAKE_MODULE_PATH`的所在目录。

如果Module模式搜索失败，没有找到对应的`Find<LibraryName>.cmake`文件，则转入Config模式进行搜索。它主要通过`<LibraryName>Config.cmake` or `<lower-case-package-name>-config.cmake`这两个文件来引入我们需要的库。以我们刚刚安装的glog库为例，在我们安装之后，它在`/usr/local/lib/cmake/glog/`目录下生成了`glog-config.cmake`文件，而`/usr/local/lib/cmake/<LibraryName>/`正是find_package函数的搜索路径之一。（find_package的搜索路径是一系列的集合，而且在linux，windows，mac上都会有所区别，需要的可以参考官方文档[find_package](https://link.zhihu.com/?target=https%3A//cmake.org/cmake/help/latest/command/find_package.html)）

由以上的例子可以看到，对于原生支持Cmake编译和安装的库通常会安装Config模式的[配置文件](https://zhida.zhihu.com/search?content_id=109768348&content_type=Article&match_order=1&q=%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6&zhida_source=entity)

到对应目录，这个配置文件直接配置了头文件库文件的路径以及各种[cmake变量](https://zhida.zhihu.com/search?content_id=109768348&content_type=Article&match_order=1&q=cmake%E5%8F%98%E9%87%8F&zhida_source=entity)

供find_package使用。而对于非由cmake编译的项目，我们通常会编写一个`Find<LibraryName>.cmake`，通过脚本来获取头文件、库文件等信息。通常，原生支持cmake的项目库安装时会拷贝一份XXXConfig.cmake到系统目录中，因此在没有显式指定搜索路径时也可以顺利找到。

### 编写自己的 `Find<LibraryName>.cmake` 模块

假设我们编写了一个新的函数库，我们希望别的项目可以通过find_package对它进行引用我们应该怎么办呢。

我们在当前目录下新建一个`ModuleMode`的文件夹，在里面我们编写一个计算两个整数之和的一个简单的函数库。库函数以手工编写Makefile的方式进行安装，库文件安装在/usr/lib目录下，头文件放在/usr/include目录下。其中的Makefile文件如下：

```make
# 1、准备工作，编译方式、目标文件名、依赖库路径的定义。
CC = g++
CFLAGS  := -Wall -O3 -std=c++11 

OBJS = libadd.o #.o文件与.cpp文件同名
LIB = libadd.so # 目标文件名
INCLUDE = ./ # 头文件目录
HEADER = libadd.h # 头文件

all : $(LIB)

# 2. 生成.o文件 
$(OBJS) : libadd.cc
    $(CC) $(CFLAGS) -I ./ -fpic -c $< -o $@

# 3. 生成动态库文件
$(LIB) : $(OBJS)
    rm -f $@
    g++ $(OBJS) -shared -o $@ 
    rm -f $(OBJS)


# 4. 删除中间过程生成的文件 
clean:
    rm -f $(OBJS) $(TARGET) $(LIB)

# 5.安装文件
install:
    cp $(LIB) /usr/lib
    cp $(HEADER) /usr/include
```

编译安装

```bash
make
sudo make install
```

接下来我们回到我们的Cmake项目中来，在`cmake`文件夹下新建一个FindAdd.cmake的文件。我们的目标是找到库的头文件所在目录和[共享库文件](https://zhida.zhihu.com/search?content_id=109768348&content_type=Article&match_order=1&q=%E5%85%B1%E4%BA%AB%E5%BA%93%E6%96%87%E4%BB%B6&zhida_source=entity)

的所在位置。

```cmake
# 在指定目录下寻找头文件和动态库文件的位置，可以指定多个目标路径
find_path(ADD_INCLUDE_DIR libadd.h /usr/include/ /usr/local/include ${CMAKE_SOURCE_DIR}/ModuleMode)
find_library(ADD_LIBRARY NAMES add PATHS /usr/lib/add /usr/local/lib/add ${CMAKE_SOURCE_DIR}/ModuleMode)

if (ADD_INCLUDE_DIR AND ADD_LIBRARY)
    set(ADD_FOUND TRUE)
endif (ADD_INCLUDE_DIR AND ADD_LIBRARY)
```

这时我们便可以像引用curl一样引入我们自定义的库了。

在CMakeLists.txt中添加

```cmake
# 将项目目录下的cmake文件夹加入到CMAKE_MODULE_PATH中，让find_pakcage能够找到我们自定义的函数库
set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake;${CMAKE_MODULE_PATH}")
add_executable(addtest addtest.cc)
find_package(ADD)
if(ADD_FOUND)
    target_include_directories(addtest PRIVATE ${ADD_INCLUDE_DIR})
    target_link_libraries(addtest ${ADD_LIBRARY})
else(ADD_FOUND)
    message(FATAL_ERROR "ADD library not found")
endif(ADD_FOUND)
```

#### 默认路径

#### 创建自己的包

## 纯头文件问题

以cpp-httplib为例

这种也会有提供 `FindBrotli.cmake` 和 `httplibConfig.cmake.in` 文件，在repo/cmake文件夹里。但是假如说没提供我又不想自己写 `.cmake`，或者说我就是不想clone整个仓库，只想下载那个 `.h` 文件直接就使用了，这时是不是不能用 `find_package` 找包？

是的，这时 `find_package` 无法正常工作。要么你就把仓库提供的cmake相关文件下载下来，要么你就不找包了，将该文件当作工程文件来正常编译使用。

后者的方法：

```js
include_directories(${CMAKE_SOURCE_DIR}/external/httplib)
```
