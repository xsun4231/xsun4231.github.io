---
title: 关于Java的stream执行顺序的笔记
tags:
  - Java
  - stream
date: 2019-11-20 13:39:55
---

## Java.util.stream 基本
首先来个例子：
```Java
Stream.of("aaa", "aa", "bbbb", "bb", "ccccc", "cc", "dddddd", "eeeeeee")
        .filter(len -> len.length() > 3)
        .forEach(System.out::println);
```
stream在使用的时候，分为中间操作（intermediate operation)和终端操作（terminal operation），例子中的`filter()`就是中间操作，中间操作可以有多个，跟火车厢一样接起来就可以。
而终端操作（或者叫终结操作)只能有一个。终端操作很容易理解成是对stream的结束，事实上终端操作最主要的作用是执行。如果没有终端操作，中间操作的内容将不会生效。所以，下面这个stream执行后是什么效果？
```Java
Stream.of("aaa", "aa", "bbbb", "bb", "ccccc", "cc", "dddddd", "eeeeeee")
        .mapToInt(String::length)
        .filter(len -> len > 3)
        .peek(System.out::println)
        .limit(2);
```
答案是：什么也不输出。因为`limit()`是个中间方法，对这个stream的操作将不会生效。  

### 执行顺序
弄懂了什么中间操作和终端操作的区别以后，我们就要面对下一个疑问了：中间操作和终端操作的执行顺序是什么？
很简单，来个例子瞧瞧：
```Java
Stream.of("aaa", "aa", "bbbb", "bb", "ccccc", "cc", "dddddd", "eeeeeee")
        .filter(len -> len.length() > 3)
        .peek(System.out::println)
        .mapToInt(String::length)
        .limit(2)
        .forEach(System.out::println);
```
输出结果有几行？内容是?

{% asset_img 1.png result %}

这里重点在`peek()`，`limit()`和`forEach()`的生效顺序，从结果上来看,应该是stream中的每一个元素，对应一组打包的操作，所以输出字符串b之后紧接着输出的是b的长度，而不是字符串c。而`limit()`限制了处理的元素个数，大于limit的元素到达不了终端操作，自然不会生效。

我们换个方法再验证一遍，这次终端操作用`sum()`来替代`forEach()`，终端操作不是对元素逐一的操作了，对中间操作的执行顺序会有什么影响吗？
```Java
Stream.of("aaa", "aa", "bbbb", "bb", "ccccc", "cc", "dddddd", "eeeeeee")
        .filter(len -> len.length() > 3)
        .peek(System.out::println)
        .mapToInt(String::length)
        .limit(2)
        .peek(System.out::println)
        .sum();
```
结果跟`forEach()`是一样的。