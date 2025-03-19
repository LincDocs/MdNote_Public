# README

## 引言

先读：[../How to build](../How to build.md)

在那篇文章中，说了各种编程语言/框架项目的编译/运行流程。而其中cpp在编译流中工具的种类比较多、选择比较灵活。依然是之前的四个通用步骤

1. 安装通用环境/依赖
2. 下载/编写项目
3. 安装项目环境/依赖
4. 运行/编译项目

像python就是：

- 准备python、anoncada、venv等环境
- 下载/编写项目
- 安装依赖，如 `pip install -r ./requirements.txt`、`./.venv/Script/activate`
- 运行/编译项目，如 `python xxx.py`、`nb run --reload` (脚手架)

## step1. 准备通用环境/依赖

二选一，推荐anaconda方式

- 直接到官网下载 python
- 下载 anaconda (可以控制更多版本的python)

```bash
>python --version
Python 3.12.7

>pip --version
pip 25.0.1 from G:\xxx\Anaconda\Lib\site-packages\pip (python 3.12)

>conda --version
conda 24.9.2
```

## step2. 下载/编写项目

shell

```python
python -m venv .venv --prompt <虚拟环境名>  # 或者用conda命令也行: conda activate myenv
pip install flask pyinstaller
```

main.py

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World! This is a simple HTTP response."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

## step3. 安装项目环境/依赖

```bash
# 如果项目有.venv就用这个
.\.venv\Scripts\activate

# 如果项目没有.venv就用这个
python -m venv .venv
.\.venv\Scripts\activate
pip install -r .\requirements.txt # pip freeze > requirements.txt
```

## step4. 运行/编译项目

```bash
# 运行
python main.py

# 可执行文件
pyinstaller --onefile main.py
```

## all_Workflows

先来看看github给python项目推荐的工作流：

- Python Package using Anaconda | 使用Anaconda进行包管理，在多个Python版本上创建和测试Python包
- Publish Python Package | 在发布时将Python包发布到PyPI
- Django | 构建和测试一个Django项目
- Pylint | 使用pylint来Lint Python应用程序
- Python application | 创建并测试一个Python应用程序
- Python package | 在多个Python版本上创建和测试Python包

个人用的:

build.yml

```bash
name: Multi-Platform Build

on:
    workflow_dispatch:
    push:
      branches: [ "master" ]
    pull_request:
      branches: [ "master" ]

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    
    steps:
    - name: 01. Checkout code
      uses: actions/checkout@v4

    - name: 02. Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.12'

    - name: 03. Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pyinstaller

    - name: 04. Build executable
      run: |
        if [[ "${{ runner.os }}" == "Windows" ]]; then
          pyinstaller --onefile --name myapp-${{ runner.os }}.exe src/main.py
        else
          pyinstaller --onefile --name myapp-${{ runner.os }} src/main.py
        fi
      shell: bash

    - name: Upload artifact
      uses: actions/upload-artifact@v4
      with:
        name: binaries-${{ runner.os }}
        path: dist/
```

pylint.yml

```yml
# take from github推荐的模板

name: Pylint

on:
    workflow_dispatch:
    push:
      branches: [ "master" ]
    pull_request:
      branches: [ "master" ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10", "3.12"]
    steps:
    - name: 01. Project checkout
      uses: actions/checkout@v4

    - name: 02. Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}

    - name: 03. Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pylint

    - name: Analysing the code with pylint
      run: |
        pylint $(git ls-files '*.py')
```

## all_Docker




