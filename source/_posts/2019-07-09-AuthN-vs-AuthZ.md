---
title: 区分 Authentication(AuthN) 和 Authorization(AuthZ)
tags:
  - null
date: 2019-07-09 11:48:48
---


最近写的一段代码里，关于关键字`Auth`的使用在review的时候被佐藤老师批评了，一直以来对于认证和授权都没有好好的理解，在这里整理一下。

## 别直接用Auth来命名

之前对于`Auth`这个关键字的理解，一直都处于大概知道什么意思的模糊状态。其实使用`Auth`作为关键字来命名方法和变量，并不是很合适，因为`Authentication` 和 `Authorization` 的缩写都可以是`Auth`。  

`Authentication` 的中文翻译是`认证`，日语翻译是`認証`，可以理解为判断**你是不是谁**的操作，比如输入用户名和密码，系统判断这个用户名存在，且密码匹配，就是认证。

`Authorization` 的中文翻译是`授权`，日语翻译是`認可`, 我的理解是**你可不可以**的意思，例如用户名密码通过认证之后，系统判断该用户是否有访问权限，给与权限的操作，就是授权。

## 401 和 403

HTTP的返回值401和403是一对很容易弄混的数字。

 * 401 Unauthorized
 * 403 Forbidden

401是发生用户认证错误时的返回值，而403是拒绝访问。那么结合上面对`Authentication`和`Authorization`的理解不难发现:

  * 401 虽然写着Unauthorized的名字，返回的却是Authentication的错误
  * 403 则承担着返回Unauthorized错误的职责
