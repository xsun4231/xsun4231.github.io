---
title: HAS-A 和 IS-A的区别
tags:
  - Inheritance
date: 2019-11-14 13:39:09
---

## 一句话总结

不妨通过字面意思来理解，HAS-A 就是有什么的意思，而IS-A就是是什么的意思。在面向对象编程（OOP）中，类的继承就是IS-A的关系，简单来说就是“张三是个人，旺财是条狗”的意思。而类的对象使用，多数时候可以看作是HAS-A的关系，比如把身高，体重都看作是类的话，我们可以说“张三有身高，有体重”。

* Inheritance 继承 IS-A
* composition 组成 HAS-A

## 举个栗子

谷歌搜到的第一篇说明就很[浅显易懂](https://www.w3resource.com/java-tutorial/inheritance-composition-relationship.php)

```Java
Class Car{ ... } // 车是一个类 

Class Engine{ ... } // 引擎也是一个类

Class Toyota extends Car { // 丰田车作为一个有继承关系的子类，跟Car是IS-A关系，跟Engine是HAS-A的关系
  private Engine;
  ...
}

```