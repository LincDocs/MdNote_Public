# Linux系统软件包管理

## linux包管理器

### apt/apt-get

apt是新的

### yun

……

## Windows包管理器

### msys2

### cygwin (Windows的Linux环境包管理器)

## 为什么现在越来越多的linux工具使用npm或pip安装

为什么现在很多的linux命令行工具，不再使用apt安装，而是使用npm或pip3进行安装（这两个需要nodejs和python环境）

```bash
pip3 install thefuck
npm install -g tldr # or pip3 install tldr
```

via: deepseek

现在越来越多的 Linux 命令行工具选择通过 `npm` 或 `pip3` 分发，而不是传统的 `apt` 包管理器，这背后有几个关键原因：

### 1. 跨平台兼容性

- 语言无关性：
  工具若基于 Node.js 或 Python 编写，通过 `npm`/`pip` 安装时，只需对应语言环境即可运行，**天然支持跨平台**（Windows/macOS/Linux）。而 `apt` 仅适用于 Debian/Ubuntu 系 Linux。
- 开发者的需求：
  现代开发者常需在多种系统中切换，跨平台工具能减少环境适配成本。例如 `tldr`（简化版 man 手册）通过 `npm` 或 `pip` 安装后，可以在任意平台使用。

### 2. 更快的迭代速度

- 绕过系统包管理流程：
  将工具发布到 `apt` 仓库需要严格的审核、打包和依赖管理，流程冗长（如 Debian 的 `unstable` → `testing` → `stable`）。而 `npm`/`pip` 允许开发者**直接发布新版本**，用户能即时获取更新。
- 敏捷开发：
  开源工具（如 `thefuck`）维护者可以快速修复 Bug 或添加功能，无需等待系统仓库的同步周期。

### 3. 依赖管理的灵活性

- 避免系统级污染：
  `apt` 安装的包通常是全局的，可能引发依赖冲突（如 Python 2/3 兼容性问题）。而 `npm`/`pip` 允许用户级安装（`--user` 模式）或虚拟环境隔离（如 `venv`），减少对系统环境的影响。
- 更细粒度的控制：
  开发者可以直接声明依赖版本（如 `package.json` 或 `requirements.txt`），避免因系统仓库中依赖版本过旧导致兼容性问题。

### 4. 开发者生态的偏好

- 语言社区驱动：
  许多工具的作者本身是 Node.js 或 Python 开发者，他们更熟悉 `npm`/`pip` 的发布流程。例如：
  - 前端工具（如 `prettier`、`eslint`）天然依赖 Node.js 生态，通过 `npm` 分发。
  - Python 的脚本类工具（如 `youtube-dl`、`pipx`）适合通过 `pip` 分发。
- 开源协作惯性：
  GitHub 上的开源项目常直接集成 CI/CD 自动发布到 `npm`/`PyPI`，而打包成 `.deb` 需要额外维护成本。

### 5. 容器化与云原生趋势

- 轻量化部署：
  在 Docker 容器或 Serverless 环境中，优先使用语言级包管理器（`npm`/`pip`）而非安装完整的 `apt` 系统，可以显著减少镜像体积。
- 避免权限问题：
  容器中通常以非 root 用户运行，使用 `npm`/`pip` 用户级安装比 `apt` 更安全。

### 6. 用户安装的便捷性

- 无需 Root 权限：
  `npm install -g` 或 `pip3 install --user` 不需要 `sudo`，普通用户即可完成安装，降低了安全风险。
- 即时可用：
  用户只需安装 Node.js/Python 环境，无需配置系统仓库或处理 GPG 密钥。

### 潜在的缺点

尽管有上述优势，这种方式也存在争议：

- 环境依赖：用户需额外安装 Node.js/Python 运行时，可能增加复杂度。
- 版本碎片化：不同工具可能依赖不同版本的 Python/Node.js，易引发冲突。
- 安全性：非系统仓库的包缺乏官方审计，存在供应链攻击风险（如 `npm` 的依赖黑洞问题）。

### 总结
|      | **`apt`**    | npm / pip       |
| ---- | ------------ | --------------- |
| 适用场景 | 系统级工具、核心服务   | 跨平台工具、快速迭代的开源项目 |
| 优势   | 稳定性、安全性、依赖统一 | 灵活性、跨平台、低维护成本   |
| 趋势   | 传统 Linux 运维  | 开发者优先、云原生环境     |

因此，工具开发者会根据目标用户（开发者 vs 系统管理员）、迭代速度和跨平台需求，选择最适合的分发方式。

## 转npm或pip环境

由于上一章的原因，有时我们哪怕我进行js或python的开发，也需要这两个环境。

而很不巧的是，apt 等linux包管理工具对于 node.js 或 python 环境的安装版本，都过于老旧，update也没用。

这里演示：ubuntu22.4 安装 node.js 22 和 python3.13 (或mini conda)

### node.js

https://deb.nodesource.com/

感谢该网站提供的安装脚本，请查看上述网站。

这里的命令版本不一定是最新的，仅示例：

**nodejs安装**

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs
```

**验证**

```bash
node -v
npm -v
```

另一个方法是使用nvm，但我觉得上面的方法更好用

### python pip

https://repo.anaconda.com/miniconda/

感谢该网站提供的安装脚本，最新版请查看上述网站。

这里的命令版本不一定是最新的，仅示例：

**miniconda安装**

```bash
# 下载并安装 Miniconda，这一步可以手动下载
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

**python安装**

```bash
# 创建 Python 3.13 环境（需确认 conda 仓库已支持），可以自行到官网查看最新版是多少
conda create -n py313 python=3.13
conda activate py313
```

**验证**

```bash
python --version
```

另一个方法是从源码编译安装，但我觉得用miniconda更好用，此处论坛




