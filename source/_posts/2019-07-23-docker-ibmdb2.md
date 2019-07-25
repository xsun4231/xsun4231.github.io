---
title: 使用DB2的Docker镜像建立本地开发用的数据库
tags:
  - Docker
  - DB2
date: 2019-07-23 14:36:40
---


这个是2019-07-23的笔记，DB2的社区免费版授权和镜像的使用方法随时可能改变。

## 从哪儿找DB2

DB2的免费版本在 [2019年的社区版DB2](https://www.ibm.com/cloud/blog/announcements/ibm-db2-developer-community-edition) 中可以找到，提供了三种免费版的使用方法：

1. 使用docker镜像
2. 下载DB2程序
3. IBM Cloud的DB2服务（免费套餐）

这里记一下使用第一种方法Docker镜像的构建过程。

## 开工

### 第一步，打开冰箱....啊不，下载镜像，可以在docker hub搜DB2，这篇笔记使用的是 [ibmcom/db2](https://hub.docker.com/r/ibmcom/db2)

### 第二步，创建容器，在控制台执行:

```Docker
docker run --name db2 --privileged -p 50000:50000 -e LICENSE=accept -e DB2INST1_PASSWORD=password -e DBNAME=MYDATABASE ibmcom/db2
```

简单解释一下
1. `--name` 容器的名字，以后启动关闭的时候用 
2. `--privileged` 不知道（弄懂了再写）
3. `-p` 端口映射，这里的意思是本地的50000端口映射到容器的50000，这样我们就可以通过`localhost:50000`来访问容器里的数据库了
4. `-e` 给容器里设置一些环境变量
   1. `LICENSE` 嗯。。。
   2. `DB2INST1_PASSWORD` 为默认的用户名db2inst1设置的密码。
   3. `DBNAME` 直接使用变量作为名字建立一个database
5. 最后那个`ibmcom/db2`是镜像名


### 第三步，连接：
```
url: jdbc:db2://localhost:50000/MYDATABASE
username: db2inst1
password: password
driver: db2jcc4.jar 
```
驱动文件可以在IBM的服务网页找到 [db2jcc4.jar](http://www-01.ibm.com/support/docview.wss?uid=swg21363866)

## 结束
有时候会提示port无法使用，容器不能启动。先确定port50000没有被占用，如果可以使用，就重启docker。

