---
title: pipenv 基本的介绍和使用方法
tags:
  - Pipenv
  - Python
date: 2019-12-12 14:29:51
---


> 根据项目需要，搞一个配置文件Pipfile，传到github里，完事儿。

## 为什么要用pipenv

首先，我们假设....算了，不扯那些没用的。做Python的开发，无论你用的什么工具，最麻烦的事儿应该莫过于包的管理。[pipenv](https://pypi.org/project/pipenv/)简单来说就是一个python官方推荐的包管理工具。  
相比于pip等其他工具，pipenv最大的特点是可以根据项目，生成不同的环境，在ProjectA中设置的Pipfile不会影响到ProjectB,更不会影响到系统默认的pip列表。这个为项目定制的虚拟环境，我们称之为`shell`。  

### 安装pipenv

安装pipenv之前，首先确定系统里有以下两样东西：
1. python
2. pip

pipenv是通过pip安装的工具，所以执行  
```
pip install pipenv 
```
由于pipenv可以在系统里不同版本的Python间任意切换，所以执行pip的时候不同太在乎Python版本问题。

### requirements.txt 和 Pipfile
pipenv 管理Python环境的配置文件是`Pipfile`，大致长这个样子：

```Pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]

[packages]
pandas = "==0.25.1"

[requires]
python_version = "3.7"

```

我们可以直接写，也可以用`pipenv install`来生成默认的Pipfile, 不过还有个更方便的方法是直接由pip生成的requirements.txt配置文件来生成Pipfile。

```
# 首先在当前路径里使用pip生成requirements.txt

pip freeze > requirements.txt

# 然后生成Pipfile
# -r 的意思是将后面配置文件里的包添加到Pipfile里

pipenv install -r requirements.txt
```

### 指定Python版本
pipenv可以指定虚拟环境的python版本，随时通过修改Pipfile来切换（修改是通过命令行修改的意思，当然你要直接修改也没什么区别，但是不用命令来修改配置文件就会觉得很low啊）
```
## 使用下面的命令，从当前系统已经安装的不同版本的Python中选择一个
pipenv --python 版本号

## 比如
pipenv --python 3.5

pipenv --python 3.7

pipenv --python 2.6

```
如果Pipfile中指定的Python版本在当前系统下不存在，之后启动虚拟环境时会跳出警告。

### (耗时警报) 锁定
更新Pipfile之后，启动虚拟环境之前，我们需要把Pipfile中列出的包安装好，或者删除已经不用的包，这个操作就是`pipenv lock`

由于需要从服务器下载相应的包（这是我猜的，鬼晓得为什么这玩意儿怎么那么慢，[官方](https://github.com/pypa/pipenv/issues/1785)似乎也没有什么行之有效的办法）

### 去吧 皮卡丘！
都搞定之后，`pipenv shell`跑起来，我们就进入定制的虚拟环境了。

### 直接看这里就可以了

说了那么老多，其实安装好pipenv之后，直接一个`pipenv -h`查看help文档就可以了
```
Options:
  --where             Output project home information.
  --venv              Output virtualenv information.
  --py                Output Python interpreter information.
  --envs              Output Environment Variable options.
  --rm                Remove the virtualenv.
  --bare              Minimal output.
  --completion        Output completion (to be eval'd).
  --man               Display manpage.
  --support           Output diagnostic information for use in GitHub issues.
  --site-packages     Enable site-packages for the virtualenv.  [env var:
                      PIPENV_SITE_PACKAGES]
  --python TEXT       Specify which version of Python virtualenv should use.
  --three / --two     Use Python 3/2 when creating virtualenv.
  --clear             Clears caches (pipenv, pip, and pip-tools).  [env var:
                      PIPENV_CLEAR]
  -v, --verbose       Verbose mode.
  --pypi-mirror TEXT  Specify a PyPI mirror.
  --version           Show the version and exit.
  -h, --help          Show this message and exit.


Usage Examples:
   Create a new project using Python 3.7, specifically:
   $ pipenv --python 3.7

   Remove project virtualenv (inferred from current directory):
   $ pipenv --rm

   Install all dependencies for a project (including dev):
   $ pipenv install --dev

   Create a lockfile containing pre-releases:
   $ pipenv lock --pre

   Show a graph of your installed dependencies:
   $ pipenv graph

   Check your installed dependencies for security vulnerabilities:
   $ pipenv check

   Install a local setup.py into your virtual environment/Pipfile:
   $ pipenv install -e .

   Use a lower-level pip command:
   $ pipenv run pip freeze

Commands:
  check      Checks for security vulnerabilities and against PEP 508 markers
             provided in Pipfile.
  clean      Uninstalls all packages not specified in Pipfile.lock.
  graph      Displays currently-installed dependency graph information.
  install    Installs provided packages and adds them to Pipfile, or (if no
             packages are given), installs all packages from Pipfile.
  lock       Generates Pipfile.lock.
  open       View a given module in your editor.
  run        Spawns a command installed into the virtualenv.
  shell      Spawns a shell within the virtualenv.
  sync       Installs all packages specified in Pipfile.lock.
  uninstall  Un-installs a provided package and removes it from Pipfile.
  update     Runs lock, then sync.
```