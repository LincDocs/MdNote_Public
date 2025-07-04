# Async 编程简介

## async 简介

众所周知，Rust 可以让我们写出性能高且安全的软件，那么异步编程这块儿呢？是否依然在高性能的同时保证了安全？

我们先通过一张 web 框架性能对比图来感受下 Rust 异步编程的性能:

![actix-vs-gin screenshot](https://pic1.zhimg.com/v2-3cebd732fb56f43713f106fdcfa44a3c_b.png)

上图并不能说 Rust 写的 `actix` 框架比 Go 的 `gin` 更好、更优秀，但是确实可以一定程度上说明 Rust 的异步性能非常的高！

简单来说，异步编程是一个[并发编程模型](https://course.rs/advance/concurrency-with-threads/concurrency-parallelism.html)，目前主流语言基本都支持了，当然，支持的方式有所不同。异步编程允许我们同时**并发运行大量的任务，却仅仅需要几个甚至一个 OS 线程或 CPU 核心**，现代化的异步编程在使用体验上跟同步编程也几无区别，例如 Go 语言的 `go` 关键字，也包括我们后面将介绍的 `async/await` 语法，该语法是 `JavaScript` 和 `Rust` 的核心特性之一。

`async` 是 Rust 选择的异步编程模型，下面我们来介绍下它的优缺点，以及何时适合使用。

### async vs 其它并发模型

由于并发编程在现代社会非常重要，因此每个主流语言都对自己的并发模型进行过权衡取舍和精心设计，Rust 语言也不例外。下面的列表可以帮助大家理解不同并发模型的取舍:

- OS 线程
  - 优点：它最简单，也无需改变任何编程模型(业务/代码逻辑)，因此非常适合作为语言的原生并发模型，我们在[多线程章节](https://course.rs/advance/concurrency-with-threads/concurrency-parallelism.html)也提到过，Rust 就选择了原生支持线程级的并发编程。
  - 缺点：但是，这种模型也有缺点，例如线程间的同步将变得更加困难，线程间的上下文切换损耗较大。使用线程池在一定程度上可以提升性能，但是对于 IO 密集的场景来说，线程池还是不够。
- 事件驱动(Event driven)
  - 这个名词你可能比较陌生，如果说事件驱动常常跟回调 (Callback) 一起使用，相信大家就恍然大悟了。
  - 优点：这种模型性能相当的好
  - 缺点：但最大的问题就是存在回调地狱的风险：非线性的控制流和结果处理导致了数据流向和错误传播变得难以掌控，还会导致代码可维护性和可读性的大幅降低，大名鼎鼎的 `JavaScript` 曾经就存在回调地狱。
- 协程(Coroutines) 
  - 优点：可能是目前最火的并发模型，`Go` 语言的协程设计就非常优秀，这也是 `Go` 语言能够迅速火遍全球的杀手锏之一。协程跟线程类似，无需改变编程模型，同时，它也跟 `async` 类似，可以支持大量的任务并发运行。
  - 缺点：但协程抽象层次过高，导致用户无法接触到底层的细节，这对于系统编程语言和自定义异步运行时是难以接受的
- actor 模型
  - 优点：是 erlang 的杀手锏之一，它将所有并发计算分割成一个一个单元，这些单元被称为 `actor` ，单元之间通过消息传递的方式进行通信和数据传递，跟分布式系统的设计理念非常相像。由于 `actor` 模型跟现实很贴近，因此它相对来说更容易实现。
  - 缺点：但是一旦遇到流控制、失败重试等场景时，就会变得不太好用
- async/await
  - 优点：该模型性能高，还能支持底层编程，同时又像线程和协程那样无需过多的改变编程模型
  - 缺点：但有得必有失，`async` 模型的问题就是内部实现机制过于复杂，对于用户来说，理解和使用起来也没有线程和协程简单，好在前者的复杂性开发者们已经帮我们封装好，而理解和使用起来不够简单，正是本章试图解决的问题。

总之，Rust 经过权衡取舍后，最终选择了同时提供多线程编程和 async 编程:

- 前者 (多线程)
  - 通过标准库实现，当你无需那么高的并发时，例如需要并行计算时，可以选择它，优点是线程内的代码执行效率更高、实现更直观更简单，这块内容已经在多线程章节进行过深入讲解，不再赘述
- 后者 (async)
  - 通过语言特性 + 标准库 + 三方库的方式实现，在你需要高并发、异步 `I/O` 时，选择它就对了

### async vs 多线程

虽然 `async` 和多线程都可以实现并发编程，后者甚至还能通过线程池来增强并发能力，但是这两个方式**并不互通**，从一个方式切换成另一个需要大量的代码重构工作，因此提前为自己的项目选择适合的并发模型就变得至关重要。

多线程：

- 缺点
  - `OS` 线程非常适合*少量任务并发*，因为线程的创建和上下文*切换是非常昂贵*的。
  - 甚至于*空闲的线程都会消耗系统资源*。
  - 虽说线程池可以有效的降低性能损耗，但是也无法彻底解决问题。
- 优点
  - 当然，线程模型也有其优点，例如它不会破坏你的代码逻辑和编程模型，你之前的顺序代码，经过少量修改适配后依然可以在新线程中直接运行。
  - 同时在某些操作系统中，你还可以改变线程的优先级，这对于实现驱动程序或延迟敏感的应用(例如硬实时系统)很有帮助。
  - 场景
    - 对于*长时间运行的 CPU 密集型任务，例如并行计算，使用线程将更有优势*。原因：
    - 这种密集任务往往会让所在的线程**持续运行**，任何不必要的线程切换都会带来性能损耗，因此高并发反而在此时成为了一种多余。
    - 同时你所创建的线程数应该等于 CPU 核心数，*充分利用 CPU 的并行能力*，甚至还可以将线程绑定到 CPU 核心上，进一步减少线程上下文切换。

async：

- 优点
  - 场景
    - 而*高并发*更适合 `IO` 密集型任务，例如 web 服务器、数据库连接等等网络服务。原因：
    - 因为这些任务**绝大部分时间都处于等待状态**，如果使用多线程，那线程大量时间会处于无所事事的状态，再加上线程上下文切换的高昂代价，让多线程做 `IO` 密集任务变成了一件非常奢侈的事。
    - 而使用`async`，既可以有效的降低 `CPU` 和内存的负担，又可以让大量的任务并发的运行，一个任务一旦处于`IO`或者其他等待(阻塞)状态，就会被立刻切走并执行另一个任务，而这里的任务切换的性能开销要远远低于使用多线程时的线程上下文切换。
- 原理
  - 事实上， `async` *底层也是基于线程实现，但是它基于线程封装了一个运行时*，可以将多个任务映射到少量线程上，然后将线程切换变成了任务切换，后者仅仅是内存中的访问，因此要高效的多。
- 缺点
  - 不过`async`也有其缺点，原因是编译器会为`async`函数生成状态机，然后将整个运行时打包进来，这会造成我们编译出的二进制可执行*文件体积显著增大*。

#### 应用对比

总之，`async`编程并没有比多线程更好，最终还是根据你的使用场景作出合适的选择，如果无需高并发，或者也不在意线程切换带来的性能损耗，那么多线程使用起来会简单、方便的多！最后再简单总结下：

> 若大家使用 tokio，那 CPU 密集的任务尤其需要用线程的方式去处理，例如使用 `spawn_blocking` 创建一个阻塞的线程去完成相应 CPU 密集任务。
> 
> 至于具体的原因，不仅是上文说到的那些，还有一个是：tokio 是协作式的调度器，如果某个 CPU 密集的异步任务是通过 tokio 创建的，那理论上来说，该异步任务需要跟其它的异步任务交错执行，最终大家都得到了执行，皆大欢喜。但实际情况是，CPU 密集的任务很可能会一直霸占着 CPU，此时 tokio 的调度方式决定了该任务会一直被执行，这意味着，其它的异步任务无法得到执行的机会，最终这些任务都会因为得不到资源而饿死。
> 
> 而使用 `spawn_blocking` 后，会创建一个单独的 OS 线程，该线程并不会被 tokio 所调度( 被 OS 所调度 )，因此它所执行的 CPU 密集任务也不会导致 tokio 调度的那些异步任务被饿死

- 有大量 `IO` 任务需要并发运行时，选 `async` 模型
- 有部分 `IO` 任务需要并发运行时，选多线程，如果想要降低线程创建和销毁的开销，可以使用线程池
- 有大量 `CPU` 密集任务需要并行运行时，例如并行计算，选多线程模型，且让线程数等于或者稍大于 `CPU` 核心数
- 无所谓时，统一选多线程

#### 具体性能对比

|操作|async|线程|
|---|---|---|
|创建|0.3 微秒|17 微秒|
|线程切换|0.2 微秒|1.7 微秒|

可以看出，`async` 在线程切换的开销显著低于多线程，对于 IO 密集的场景，这种性能开销累计下来会非常可怕！

#### 例子，书写对比

在大概理解`async`后，我们再来看一个简单的例子：并发的下载文件

**多线程实现**:

```rust
fn get_two_sites() {
    // 创建两个新线程执行任务
    let thread_one = thread::spawn(|| download("https://course.rs"));
    let thread_two = thread::spawn(|| download("https://fancy.rs"));

    // 等待两个线程的完成
    thread_one.join().expect("thread one panicked");
    thread_two.join().expect("thread two panicked");
}
```

缺点：如果是在一个小项目中简单的去下载文件，这么写没有任何问题，但是一旦下载文件的并发请求多起来，那一个下载任务占用一个线程的模式就太重了，会很容易成为程序的瓶颈。

**`async` 实现**: (语法和js的 `async-wait` 很像)

```rust
async fn get_two_sites_async() {
    // 创建两个不同的`future`，你可以把`future`理解为未来某个时刻会被执行的计划任务
    // 当两个`future`被同时执行后，它们将并发的去下载目标页面
    let future_one = download_async("https://www.foo.com");
    let future_two = download_async("https://www.bar.com");

    // 同时运行两个`future`，直至完成
    join!(future_one, future_two);
}
```

优点：不再有线程创建和切换的昂贵开销，所有的函数都是通过静态的方式进行分发，同时也没有任何内存分配发生。这段代码的性能简直无懈可击！

**其他，结合使用**：

事实上，`async` 和多线程并不是二选一，在同一应用中，可以根据情况两者一起使用。当然，我们还可以使用其它的并发模型，例如上面提到事件驱动模型，前提是有三方库提供了相应的实现。

### async: Rust vs 其它语言

目前已经有诸多语言都通过 `async` 的方式提供了异步编程，例如 `JavaScript` ，但 `Rust` 在*实现上有所区别*:

- **Future 在 Rust 中是惰性的**，只有在被轮询(`poll`)时才会运行， 因此丢弃一个 `future` 会阻止它未来再被运行，你可以将`Future`理解为一个在未来某个时间点被调度执行的任务。
- **Async 在 Rust 中使用开销是零**， 意味着只有你能看到的代码(自己的代码)才有性能损耗，你看不到的(`async` 内部实现)都没有性能损耗，例如，你可以无需分配任何堆内存、也无需任何动态分发来使用 `async` ，这对于热点路径的性能有非常大的好处，正是得益于此，Rust 的异步编程性能才会这么高。
- **Rust 没有内置异步调用所必需的运行时**，但是无需担心，Rust 社区生态中已经提供了非常优异的运行时实现，例如大明星 [`tokio`](https://tokio.rs)
- **运行时同时支持单线程和多线程**，这两者拥有各自的优缺点，稍后会讲

## Async Rust 当前的进展

简而言之，Rust 语言的 `async` 目前还没有达到多线程的成熟度，其中一部分内容还在不断进化中，当然，这并不影响我们在生产级项目中使用，因为社区中还有 `tokio` 这种大杀器。

使用 `async` 时，你会遇到好的，也会遇到不好的，例如：

- 收获卓越的性能
- 会经常跟进阶语言特性打交道，例如生命周期等，这些家伙可不好对付
- 一些兼容性问题，例如同步和异步代码、不同的异步运行时( `tokio` 与 `async-std` )
- 更昂贵的维护成本，原因是 `async` 和社区开发的运行时依然在不停的进化

总之，`async` 在 Rust 中并不是一个善茬，你会遇到更多的困难或者说坑，也会带来更高的代码阅读成本及维护成本，但是为了性能，一切都值了，不是吗？

不过好在，这些进化早晚会彻底稳定成熟，而且在实际项目中，我们往往会使用成熟的三方库，例如`tokio`，因此可以避免一些类似的问题，但是对于本章的学习来说，`async` 的一些难点还是我们必须要去面对和征服的。

### 语言和库的支持

`async` 的底层实现非常复杂，且会导致编译后文件体积显著增加，因此 Rust 没有选择像 Go 语言那样内置了完整的特性和运行时，而是选择了通过 Rust 语言提供了必要的特性支持，再通过社区来提供 `async` 运行时的支持。 因此要完整的使用 `async` 异步编程，你需要依赖以下特性和外部库:

- 所必须的特征(例如 `Future` )、类型和函数，由标准库提供实现
- 关键字 `async/await` 由 Rust 语言提供，并进行了编译器层面的支持
- 众多实用的类型、宏和函数由官方开发的 [`futures`](https://github.com/rust-lang/futures-rs) 包提供(不是标准库)，它们可以用于任何 `async` 应用中。
- `async` 代码的执行、`IO` 操作、任务创建和调度等等复杂功能由社区的 `async` 运行时提供，例如 [`tokio`](https://github.com/tokio-rs/tokio) 和 [`async-std`](https://github.com/async-rs/async-std)

还有，你在同步( `synchronous` )代码中使用的一些语言特性在 `async` 中可能将无法再使用，而且 Rust 也不允许你在特征中声明 `async` 函数(可以通过三方库实现)， 总之，你会遇到一些在同步代码中不会遇到的奇奇怪怪、形形色色的问题，不过不用担心，本章会专门用一个章节罗列这些问题，并给出相应的解决方案。

### 编译和错误

在大多数情况下，`async` 中的编译错误和运行时错误跟之前没啥区别，但是依然有以下几点值得注意：

- 编译错误，由于 `async` 编程时需要经常使用复杂的语言特性，例如生命周期和`Pin`，因此相关的错误可能会出现的更加频繁
- 运行时错误，编译器会为每一个`async`函数生成状态机，这会导致在栈跟踪时会包含这些状态机的细节，同时还包含了运行时对函数的调用，因此，栈跟踪记录(例如 `panic` 时)将变得更加难以解读
- 一些隐蔽的错误也可能发生，例如在一个 `async` 上下文中去调用一个阻塞的函数，或者没有正确的实现 `Future` 特征都有可能导致这种错误。这种错误可能会悄无声息的通过编译检查甚至有时候会通过单元测试。好在一旦你深入学习并掌握了本章的内容和 `async` 原理，可以有效的降低遇到这些错误的概率

### 兼容性考虑

异步代码和同步代码并不总能和睦共处。例如，我们无法在一个同步函数中去调用一个 `async` 异步函数，同步和异步代码也往往使用不同的设计模式，这些都会导致两者融合上的困难。

甚至于有时候，异步代码之间也存在类似的问题，如果一个库依赖于特定的 `async` 运行时来运行，那么这个库非常有必要告诉它的用户，它用了这个运行时。否则一旦用户选了不同的或不兼容的运行时，就会导致不可预知的麻烦。

### 性能特性

`async` 代码的性能主要取决于你使用的 `async` 运行时，好在这些运行时都经过了精心的设计，在你能遇到的绝大多数场景中，它们都能拥有非常棒的性能表现。

但是世事皆有例外。目前主流的 `async` 运行时几乎都使用了多线程实现，相比单线程虽然增加了并发表现，但是对于执行性能会有所损失，因为多线程实现会有同步和切换上的性能开销，若你需要极致的顺序执行性能，那么 `async` 目前并不是一个好的选择。

同样的，对于延迟敏感的任务来说，任务的执行次序需要能被严格掌控，而不是交由运行时去自动调度，后者会导致不可预知的延迟，例如一个 web 服务器总是有 `1%` 的请求，它们的延迟会远高于其它请求，因为调度过于繁忙导致了部分任务被延迟调度，最终导致了较高的延时。正因为此，这些延迟敏感的任务非常依赖于运行时或操作系统提供调度次序上的支持。

以上的两个需求，目前的 `async` 运行时并不能很好的支持，在未来可能会有更好的支持，但在此之前，我们可以尝试用多线程解决。

## async/.await 简单入门

`async/.await` 是 Rust 内置的语言特性，可以让我们用同步的方式去编写异步的代码。

通过 `async` 标记的语法块会被转换成实现了`Future`特征的状态机。 与同步调用阻塞当前线程不同，当`Future`执行并遇到阻塞时，它会让出当前线程的控制权，这样其它的`Future`就可以在该线程中运行，这种方式完全不会导致当前线程的阻塞。

下面我们来通过例子学习 `async/.await` 关键字该如何使用，在开始之前，需要先引入 `futures` 包。编辑 `Cargo.toml` 文件并添加以下内容:

```toml
[dependencies]
futures = "0.3"
```

### 使用 async

首先，使用 `async fn` 语法来创建一个异步函数:

```rust
async fn do_something() {
    println!("go go go !");
}
```

需要注意，**异步函数的返回值是一个 `Future`**，若直接调用该函数，不会输出任何结果，因为 `Future` 还未被执行：

```rust
fn main() {
      do_something();
}
```

运行后，`go go go`并没有打印，同时编译器给予一个提示：`warning: unused implementer of Future that must be used`，告诉我们 `Future` 未被使用，那么到底该如何使用？答案是使用一个执行器( `executor` ):

```rust
// `block_on`会阻塞当前线程直到指定的`Future`执行完成，这种阻塞当前线程以等待任务完成的方式较为简单、粗暴，
// 好在其它运行时的执行器(executor)会提供更加复杂的行为，例如将多个`future`调度到同一个线程上执行。
use futures::executor::block_on;

async fn hello_world() {
    println!("hello, world!");
}

fn main() {
    let future = hello_world(); // 返回一个Future, 因此不会打印任何输出
    block_on(future); // 执行`Future`并等待其运行完成，此时"hello, world!"会被打印输出
}
```

### 使用.await

在上述代码的`main`函数中，我们使用`block_on`这个执行器等待`Future`的完成，让代码看上去非常像是同步代码，但是如果你要在一个`async fn`函数中去调用另一个`async fn`并等待其完成后再执行后续的代码，该如何做？例如:

```rust
use futures::executor::block_on;

async fn hello_world() {
    hello_cat();
    println!("hello, world!");
}

async fn hello_cat() {
    println!("hello, kitty!");
}
fn main() {
    let future = hello_world();
    block_on(future);
}
```

这里，我们在`hello_world`异步函数中先调用了另一个异步函数`hello_cat`，然后再输出`hello, world!`，看看运行结果：

```console
warning: unused implementer of `futures::Future` that must be used
 --> src/main.rs:6:5
  |
6 |     hello_cat();
  |     ^^^^^^^^^^^^
= note: futures do nothing unless you `.await` or poll them
...
hello, world!
```

不出所料，`main`函数中的`future`我们通过`block_on`函数进行了运行，但是这里的`hello_cat`返回的`Future`却没有任何人去执行它，不过好在编译器友善的给出了提示：``futures do nothing unless you `.await` or poll them``，两种解决方法：使用`.await`语法或者对`Future`进行轮询(`poll`)。

后者较为复杂，暂且不表，先来使用`.await`试试:

```rust
use futures::executor::block_on;

async fn hello_world() {
    hello_cat().await;
    println!("hello, world!");
}

async fn hello_cat() {
    println!("hello, kitty!");
}
fn main() {
    let future = hello_world();
    block_on(future);
}
```

为`hello_cat()`添加上`.await`后，结果立刻大为不同:

```console
hello, kitty!
hello, world!
```

输出的顺序跟代码定义的顺序完全符合，因此，我们在上面代码中**使用同步的代码顺序实现了异步的执行效果**，非常简单、高效，而且很好理解，未来也绝对不会有回调地狱的发生。

总之，在`async fn`函数中使用`.await`可以等待另一个异步调用的完成。**但是与`block_on`不同，`.await`并不会阻塞当前的线程**，而是异步的等待`Future A`的完成，在等待的过程中，该线程还可以继续执行其它的`Future B`，最终实现了并发处理的效果。

### 一个例子

考虑一个载歌载舞的例子，如果不用`.await`，我们可能会有如下实现：

```rust
use futures::executor::block_on;

struct Song {
    author: String,
    name: String,
}

async fn learn_song() -> Song {
    Song {
        author: "周杰伦".to_string(),
        name: String::from("《菊花台》"),
    }
}

async fn sing_song(song: Song) {
    println!(
        "给大家献上一首{}的{} ~ {}",
        song.author, song.name, "菊花残，满地伤~ ~"
    );
}

async fn dance() {
    println!("唱到情深处，身体不由自主的动了起来~ ~");
}

fn main() {
    let song = block_on(learn_song());
    block_on(sing_song(song));
    block_on(dance());
}
```

当然，以上代码运行结果无疑是正确的，但。。。它的性能何在？需要通过连续三次阻塞去等待三个任务的完成，一次只能做一件事，实际上我们完全可以载歌载舞啊:

```rust
use futures::executor::block_on;

struct Song {
    author: String,
    name: String,
}

async fn learn_song() -> Song {
    Song {
        author: "曲婉婷".to_string(),
        name: String::from("《我的歌声里》"),
    }
}

async fn sing_song(song: Song) {
    println!(
        "给大家献上一首{}的{} ~ {}",
        song.author, song.name, "你存在我深深的脑海里~ ~"
    );
}

async fn dance() {
    println!("唱到情深处，身体不由自主的动了起来~ ~");
}

async fn learn_and_sing() {
    // 这里使用`.await`来等待学歌的完成，但是并不会阻塞当前线程，该线程在学歌的任务`.await`后，完全可以去执行跳舞的任务
    let song = learn_song().await;

    // 唱歌必须要在学歌之后
    sing_song(song).await;
}

async fn async_main() {
    let f1 = learn_and_sing();
    let f2 = dance();

    // `join!`可以并发的处理和等待多个`Future`，若`learn_and_sing Future`被阻塞，那`dance Future`可以拿过线程的所有权继续执行。若`dance`也变成阻塞状态，那`learn_and_sing`又可以再次拿回线程所有权，继续执行。
    // 若两个都被阻塞，那么`async main`会变成阻塞状态，然后让出线程所有权，并将其交给`main`函数中的`block_on`执行器
    futures::join!(f1, f2);
}

fn main() {
    block_on(async_main());
}
```

上面代码中，学歌和唱歌具有明显的先后顺序，但是这两者都可以跟跳舞一同存在，也就是你可以在跳舞的时候学歌，也可以在跳舞的时候唱歌。如果上面代码不使用`.await`，而是使用`block_on(learn_song())`， 那在学歌时，当前线程就会阻塞，不再可以做其它任何事，包括跳舞。

因此`.await`对于实现异步编程至关重要，它允许我们在同一个线程内并发的运行多个任务，而不是一个一个先后完成。若大家看到这里还是不太明白，强烈建议回头再仔细看一遍，同时亲自上手修改代码试试效果。

至此，读者应该对 Rust 的`async/.await`异步编程有了一个清晰的初步印象，下面让我们一起来看看这背后的原理：`Future`和任务在底层如何被执行。
