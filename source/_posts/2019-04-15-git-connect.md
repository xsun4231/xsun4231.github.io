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

本地的代码推送到github时，github需要验证推送用户的信息，你可以每次进门都填一次我叫什么，我从哪儿来，我是干什么的等等等等，也可以使用已经在github登录好的身份证件，“哔”的一下，自动刷卡进门，这个身份证件就是`ssh key`.

接下来的操作分为三步：
1. [确定本地是否已经有建立好的ssh key](https://help.github.com/en/enterprise/2.15/user/articles/checking-for-existing-ssh-keys)
    * 打开git Bash（这里需要用到Bash, windows的cmd是没有ls命令的) 输入`ls -al ~/.ssh` 这里一个搜索命令，返回名称为`.ssh`的目录信息。如果有`id_rsa.pub`文件，就说明已经有ssh key了.  
2. [如果没有，建立一组新的ssh key](https://help.github.com/en/enterprise/2.15/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    * 执行命令`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`来生成一组ssh key，接下来直接按回车就可以了（文件位置使用默认位置不需要输入，passphrase默认空白，不设置，设置的话以后每次推送代码都要输密码）。
3. [将建立好的ssh key登录到github](https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account)
    * 执行命令`clip < ~/.ssh/id_rsa.pub` 将ssh key的内容复制到剪贴板（当然，你也可以打开id_rsa.pub文件手动复制）

添加到github这一步我们单独说一下，以防弄错。打开github页面，点击用户头像，进入`setting`，在菜单中间的位置找到`SSH and GPG keys`，点击右上角的绿色按钮`New SSH key`，在`Title`里填写要添加的ssh key的介绍，比如"公司那台贼慢的电脑/家里的老爷机/学校的大屁股显示器",然后在将复制的SSH key粘贴到`Key`里面，点击`Add SSH key`就可以了。

## 克隆项目代码（先欠着）

