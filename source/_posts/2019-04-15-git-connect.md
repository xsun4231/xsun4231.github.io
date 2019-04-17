---
title: 使用github的一些事儿
tags:
  - null
date: 2019-04-15 15:46:33
---


首先，Git和GitHub不是一个东西。Git是一个版本管理系统，而GitHub是一个用来保存软件代码的平台。我们不妨把git看作是通讯技术，而github只是**一个**通讯服务商。也就是说除了github之外，还有很多的代码托管平台，大家都是用的git来上传下载代码，只不过github名气最大。

> 为了不受各种不同的软件影响，这里说的都是通过命令行操作

## 环境搭建
首先要做的事安装`git`，下载地址在[这里](https://git-scm.com/downloads).

git安装完之后，打开命令行执行`git --version`看看是否可以查看git的版本，如果返回版本信息，就OK了. git会自己安装一个`git Bash`, 不过git的命令行并不局限于bash，windows下直接在cmd或者powershell都可以使用.

本地的代码推送到github时，github需要验证用户的信息. 就好比你可以每次进门都填一次我叫什么，我从哪儿来，我是干什么的，也可以提前登陆好身份信息，“哔”的一声刷脸进门，这个登录的身份信息就是`ssh key`.

接下来的操作分为三步：
1. [确定本地是否已经有建立好的ssh key](https://help.github.com/en/enterprise/2.15/user/articles/checking-for-existing-ssh-keys)
    * 打开git Bash（这里需要用到Bash, windows的cmd是没有ls命令的) 输入`ls -al ~/.ssh` 这里一个搜索命令，返回名称为`.ssh`的目录信息。如果有`id_rsa.pub`文件，就说明已经有ssh key了.  
2. [如果没有，建立一组新的ssh key](https://help.github.com/en/enterprise/2.15/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    * 执行命令`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`来生成一组ssh key，接下来直接按回车就可以了（文件位置使用默认位置不需要输入，passphrase默认空白，不设置，设置的话以后每次推送代码都要输密码）。
    * 将生成的key登录到ssh-agent. 执行命令启动ssh-agent，windows：`eval $(ssh-agent -s)`  Mac或者Linux：`eval "$(ssh-agent -s)"`.然后执行命令添加key，Mac：`ssh-add -K ~/.ssh/id_rsa` windows或者Linux：`ssh-add ~/.ssh/id_rsa`
3. [将建立好的ssh key登录到github](https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account)
    * 将ssh key的内容复制到剪贴板. window可以使用命令：`clip < ~/.ssh/id_rsa.pub` Mac可以使用：`pbcopy < ~/.ssh/id_rsa.pub` Linux可以使用：`sudo apt-get install xclip ` 和 `xclip -sel clip < ~/.ssh/id_rsa.pub`

添加到github这一步我们单独说一下，以防弄错。打开github页面，点击用户头像，进入`setting`，在菜单中间的位置找到`SSH and GPG keys`，点击右上角的绿色按钮`New SSH key`，在`Title`里填写要添加的ssh key的介绍，比如"公司那台贼慢的电脑/家里的老爷机/学校的大屁股显示器",然后在将复制的SSH key粘贴到`Key`里面，点击`Add SSH key`就可以了。

## 克隆项目代码
我们来到`GitHub`的代码页，可以在代码的右上角看到一个绿色按钮`Clone or Download`，点开之后可以看到克隆代码用的链接。  

链接有两种，`https` 和 `ssh`， 简单来讲，使用https的链接克隆的项目需要用github的用户名密码来推送，使用ssh链接克隆的项目则使用ssh-key验证
{% asset_img usehttps.PNG https %}

{% asset_img usessh.PNG ssh %}

由于我们已经设置好了ssh-key，所以使用格式为`git@github.com:用户名/项目名.github.io.git`的ssh链接.
```
git clone git@github.com:用户名/项目名.github.io.git
```


## remote 和 local
git管理的代码有两个地方: 
1. 一个是**remote** 可以理解为远端，也就是指托管代码的地方，使用github时，值得也就是github服务器端
2. 一个是**local** 直译本地，意译本地，他也就是本地的意思

从远端向本地同步代码，叫做`pull` 也就是拉，将本地代码同步到远端，叫做`push` 推送，简单而形象。

local值不需要，当然也不能修改，因为代码就在本地. remote的值可以随时添加，删除或者修改，remote是name和url成对设置的，一般默认的remote名是origin
* `git remote` 确认remote，会返回remote的名称
* `git remote get-url remoteName` 获得remote的url
* `git remote set-url remoteName url` 设置remote的url

## branch
无论是local还是remote, 代码通过`branch`（分支）来进行版本管理，branch可以理解成时间线，或者河流，可以分成几个分支并行前进，也可以随时汇集到一起（只要内容没有冲突）。
可以通过`git branch`来查当前本地的分支。
切换分支的命令为 `git checkout "branch_name"`
常用的生成分支命令为 `git checkout -b "new_branch_name" "base_branch_name"`
* 分支的名称不可以有空格，所以一般通过下划线连接单词，当分支名含有特殊符号比如 # 时，需要在分支名前后加 " 来防止控制台执行时的歧义。 


## 前方施工中。。。



