---
title: Couch Backup Memo
date: 2018-04-13
tags:
    - Couch DB
---

> 原文 [couchbackup](https://github.com/cloudant/couchbackup)。

## 前提介绍
CouchBackup 是一个用来备份和还原数据的命令行工具，它只是简单的生成或者读取一个保存数据的文件，并不支持过于复杂的数据库结构，比如在数据库中插入其他文件。
安装使用CouchBackup前要确认已经安装了正确版本的`Node.js`和`CouchDB`
安装couchbackup的命令是：
```
npm install -g @cloudant/couchbackup
```
## 环境变量
设置CouchDB的URl可以使用下面的命令：
```
export COUCH_URL=http://localhost:5984
```
或者
```
export COUCH_URL=https://myusername:mypassword@myhost.cloudant.com
```

指定数据库的名字可以使用以下命令：
```
export COUCH_DATABASE=animal_db
```
不过我们可以在备份还原的时候直接指定参数`--url`和`--db`

## 备份和还原

### 备份
可以使用以下的指令对环境变量指定的数据库进行备份：
```
couchbackup > fileName.txt
```
也可以使用参数指定备份的数据库：
```
Couchbackup --db animal_db > fileName.txt
```
