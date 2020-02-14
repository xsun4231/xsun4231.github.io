---
title: 关于Enums的小问题
tags:
  - Quiz Yourself
  - Java
date: 2020-02-14 13:32:14
---

[原文链接](https://blogs.oracle.com/javamagazine/quiz-yourself-understanding-enums-advanced)

首先给出以下Enum：
```Java
enum Size{
  SMALL,
  MEDIUM,
  LARGE
}
```

问下面的代码执行的结果是：
```Java
public static void main(String[] args) {
    final var size = Size.SMALL; //line n1
    switch (size) { //line n2
        case SMALL: {System.out.println(size);} //line n3
    }
}
```

1. n1处编译失败，初始化的写法错误
2. n2处编译失败，没对应把所有Size包含在case内
3. n3处编译失败，case后面应该是完整的`Size.SMALL`
4. 输出 `SMALL`
5. 输出 `Size@3cb5cdba`

## 分析

选项1是错的，局部变量可以使用final来修饰，从`Java 10`开始，可以使用关键字`var`来声明局部变量，声明的变量类型由初始化的类型决定。
选项2也是错的，switch-case从来都不需要面对所有情况写case。
选项3也是错的，当switch的判断条件是enum类型时，case里不需要写类名。
选项4是对的，enum类型默认重写了`toString`方法，输出name的值。
选项5是错的，上面说了，enum的toString输出的是name，而不是HashCode.

