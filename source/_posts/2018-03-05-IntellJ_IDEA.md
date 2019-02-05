---
title: Intellj IDEA Memo
date: 2018-03-05
tags:
---

> “这里应该怎么设置来着？ ”

## 配置propertity文件时，显示UTF-8编码的方法

直接打开propertity文件的话，UTF-8编码会直接显示ASCII编码而不是文字，可以在设置里修改：
`File -> Setting -> Editor -> File Encoding`  
下找到.propertity文件的设置，勾选  
`transparent native to ascii conversion`

## Uppercase & lowercase
It is possible to encode non-ASCII symbols using both uppercase and lowercase hex sequences (for example, **\u00E3** and **\u00e3**). By default, only uppercase sequences are enabled. To use lowercase hex sequences, set the `idea.native2ascii.lowercase` property in the **idea.properties** file to `true`.
