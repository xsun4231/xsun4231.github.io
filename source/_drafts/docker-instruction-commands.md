---
title: Dockerfile 命令
tags:
  - null
date: 2019-07-30 10:29:30
---

内容整理自[Docker入门到实践][1]

## 什么是Dockerfile

Dockerfile 是一种用来定制镜像的文本文件。我们可以在Dockerfile中指定基础镜像，执行命令，开放端口，设置环境变量等等。
**每一条指令**会构建一层。参考[docker 文档][2]，docker的镜像具有下面的层结构(image layers)，增加层的厚度自然会增加镜像的大小，所以在书写Dockerfile时，尽量使用`\` 和 `&&` 将同一种命令的内容合并到一层。
{% asset_img layer.png layer %}

比如[Docker入门到实践][1]中的例子，写一个构建`nginx`镜像的Dockerfile：

```Dockerfile
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

这个Dockerfile包含了两个指令，`FROM`制定了基础镜像，基础镜像可以是各种服务类的官方镜像，也可以是干净的操作系统镜像，还可以是空白镜像`scratch`。`RUN`是最常用的指令，用来执行命令行命令。

接下来我们执行
```cmd
docker build -t nginx:v3 .
```
来构建镜像，`it nginx:v3`的的意思是构建的目标名为nginx，标签为v3。

docker构建镜像的log将每一条指令分的很清楚，每一条指令作为一个step来执行，完成后我们就可以看到新的镜像`nginx:v3`了。

执行下面命令，通过新构建的镜像生成一个容器：
```cmd
docker run --name hello -d -p 8080:80 nginx:v3
```
然后我们访问 `localhost:8080` 就可以看到欢迎页了：
{% asset_img hello.png hello %}

### Dockerfile中用到的命令  
docker的指令一般有两种书写方式，一种是指令后跟命令行，一种是使用`[]`的函数调用写法，这里主要记录一下命令行写法。

* COPY  
  `COPY <context path> <target path>`  
  这个指令将上下文目录中的文件或者目录复制到新一层的目标路径中，要复制的文件或者目录可以有多个，可以使用通配符（符合golang的filepath.Match规则)，目标路径可以是绝对路径，也可以是工作目录的相对路径。  
  还可以加上`--chown=<user>:<group>`来改变文件的所属用户和所属组

  > 上下文路径？context path?
* ADD  
  使用方法跟COPY基本一样。功能会丰富一点，比如源路径可以设置为url，使用url路径时docker会讲文件打包下载到目标路径。因为需要多余的RUN来处理权限，解压缩，筛选内容，这个命令并不是很实用。

* CMD  
  用于指定默认的容器主进程的启动命令。指令的写法也有两种：  
  * shell 格式 `CMD 命令`
  * exec 格式 `CMD ["可执行文件", "参数", ..."参数" ]`  

  使用shell格式写的内容会被解析为`CMD ["sh", "-c", "命令"]`，所以命令中可以使用环境变量，但是命令必须前台执行，如果命令结束后直接结束了`sh`程序，则容器也会推出。

* ENTRYPOINT
  
* ENV

* ARG

* VOLUME

* EXPOSE

* WORKDIR

* USER
* HEALTHCHECK
* ONBUILD


## 镜像的使用

### 镜像的获取，管理和删除

### commit 命令

[1]:https://legacy.gitbook.com/book/yeasy/docker_practice/details
[2]:https://docs.docker.com/storage/storagedriver/