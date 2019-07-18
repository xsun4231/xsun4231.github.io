---
title: 关于枚举型的一些理解
tags:
  - Enum
date: 2019-07-17 08:39:22
---

最近工作中写了一个枚举类，在code-review的时候被佐藤老师指摘了好几处，特别总结一下加深理解。
  
## 什么是枚举型 Enum

Enum是Java 5开始引入的一个接口，关键字 `enum` 创建的类会自动使用Enum接口。  

```Java
enum WeekDay {
    MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

像这样定义了`WeekDay`之后，我们就不必为周一到周日创建整形或者字符串的静态变量了，可以直接把`WeekDay`中定义的七个名字当做基本型来使用: `WeebDay.MONDAY` , `WeebDay.TUESDAY` , `WeebDay.WEDNESDAY` ,  `WeebDay.THURSDAY` ,  `WeebDay.FRIDAY` ,  `WeebDay.SATURDAY` ,  `WeebDay.SUNDAY` 。 

枚举型的构造体是私有的，使用枚举型的时候，就是直接使用枚举型中定义的实体。
```Java
WorkDay day = WorkDat.SUNDAY; 
```

## 用枚举类的思维方式来使用枚举类

### 创建

### 比较

### 

## 关联 [使用私有构造体或者枚举类型来强化单例性]
