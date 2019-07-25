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

像这样定义了`WeekDay`之后，我们就不必为周一到周日创建整形或者字符串的静态变量了，可以直接把`WeekDay`中定义的七个名字当做基本型来使用: `WeekDay.MONDAY` , `WeekDay.TUESDAY` , `WeekDay.WEDNESDAY` ,  `WeekDay.THURSDAY` ,  `WeekDay.FRIDAY` ,  `WeekDay.SATURDAY` ,  `WeekDay.SUNDAY` 。 

枚举型的构造体是私有的，不可以使用构造体来构建枚举类的实体，但是枚举类中的元素是公开的，可以像基本型一样直接取来使用。
```Java
WorkDay day = WorkDat.SUNDAY; 
```

## 用枚举类的思维方式来使用枚举类
引入枚举类的一个主要目的，是可以有一种类型安全，不可变的方法来定义常量。在引入枚举类之前，一般通过定义基本型的常量来表达一些固定的值。
比如` static final int MONDAY = 1;` 这种写法看似没什么问题，可没有什么实际意义的`1`在这里承担了很重要的职责，不免让人产生疑问，改成`0`可不可以呢？
而在判断是不是`MONDAY`时，又必须和`1`作比较，这就让程序逐渐变得复杂而又危险了。

引入枚举类之后，MONDAY本身就可以起到表达数值，作为判断条件的作用，从而减少了产生bug的可能性。  
所以，像下面这种强行使用枚举类的`name` `toString`来判断对象是否为枚举类中的一个元素的写法，是很不符合枚举类的思维方式的，浪费了使用枚举类的好处。
```Java
String a = System.getEnv(“TODAY”)；
String today = "Undefined";
if(WeekDay.MONDAY.name.equals(a)){
  today = WeekDay.MONDAY.name;
} 
```

我们可以给`WeekDay`添加一个方法来返回元素:
```Java
public WeekDay as(String candidate){
  if(MONDAY.name.equals(candidate)){
    return MONDAY;
  }else if(...){
    ...
  }
  return UNDEFINED; //添加一个未定义的元素
}
```

这样我们在外面就可以告别那个中间的String，直接获取WeekDay的对象：
```Java
WeekDay today = WeekDay.as(System.getEnv("TODAY"));
If(today == WeekDay.UNDEFINED){
  // 对于未定义，空的设定值，或者默认值，可以在这里自由的设置
}

if(today == WeekDay.MONDAY){
  // 想干啥干啥咯
}
```

## 关联 [使用私有构造体或者枚举类型来强化单例性]
