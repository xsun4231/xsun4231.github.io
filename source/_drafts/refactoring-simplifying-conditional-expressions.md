---
title: 代码重构. 简化条件语句
tags:
  - 【 Refactoring Improving the Design of Existing Code 】
  - 代码重构
  - Refactoring
  - 条件语句
date: 2019-04-22 14:22:37
---

> 原文 [publisher logo Refactoring: Improving the Design of Existing Code] Chapter 9 Simplifying Conditianal Expressions


## 分离条件

很多程序之所以“复杂难懂”，是因为出现了“复杂难懂”的条件语句。当人们看到条件语句时，最想获取的信息是：if XXX 的时候，do YYY； else do ZZZ。所以简化条件语句最简单直接的方法就是把长长的判断语句或者大段大段的处理分离出来，留下最基本的`if else`结构，一目了然，至于具体的判断方法和处理内容，则去具体的方法中查看。

> 遇到有嵌套结构的条件语句时，不妨先试试先整理成卫语句(Guard Clauses)，行不通再进行分解处理。

比如我们遇到下面这段代码：
```Java
if (date.before (SUMMER_START) || date.after(SUMMER_END)){
  charge = quantity * winterRate + winterServiceCharge;
}else{
  charge = quantity * summerRate;
}
```

对条件和判断后的代码分别施放**Extract Method**法术:
```Java
if (notSummer(date)){
  charge = winterCharge(quantity);
} else {
  charge = summerCharge (quantity);
}

private boolean notSummer(Date date) {
  return date.before (SUMMER_START) || date.after(SUMMER_END);
}

private double summerCharge(int quantity) {
  return quantity * summerRate;
}

private double winterCharge(int quantity) {
  return quantity * winterRate + winterServiceCharge;
}
```

当然，每次抽离出方法的时候，都不要忘记进行测试，**保证重构不会影响原本的处理结果**，很多时候条件语句并不是十分复杂，看起来好像没有抽离成为方法的必要，这就要看条件语句读起来是否顺畅易懂了，如果可以把原本机器感十足的语句变得更像一段流畅直白的描述，条件语句的重构就是有意义的。

## 整合条件

## Consolidate Duplicate Conditional Fragments

## Remove Control Flag

## Replace Nested Conditional with Guard Clauses

## Replace Conditional with Polymorphism

## Introduce Null Object

## Introduce Assertion