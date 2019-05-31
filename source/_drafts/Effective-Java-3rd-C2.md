---
title: Effect Java 3rd Edition -- Chapter 2 对象的生成与销毁
tags:
  - null
date: 2019-05-29 10:56:18
---

## Item1 使用静态工厂代替构造体

教科书中说使用构造体来生成类的实体，但实际工作中还有一种方法：使用静态方法返回该类的一个实体。我们可以称之为**静态工厂**

> 注意，书中说这里的静态工厂不同于设计模式中的创建型工厂模式。那么区别在哪里？

### 使用静态工厂的优点

1. 可以自由命名，提高代码的可读性。
2. 可以不生成新的实体，使用现有实体节省空间和时间。
3. 可以返回子类实体。
4. 可以根据参数，改变对象类型。
5. 返回类型的类甚至可以在使用的时候再写。

### 静态工厂的缺点

1. 没有public或者private构造体的无法被继承
2. 静态工厂不如构造体显眼

### 例子

from 
```Java
Date d = Date.from(instant);
```

of
```Java
Set<Rank> faceCards = EnumSet.of(JACK, QUENE, KING);
```

valueOf
```Java
BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
```

instance or getInstance, and newInstance
```Java
StackWalker luke = StackWalker.getInstance(options);

Object newArray = Array.newInstance(classObject, arrayLen);
```

getType, newType and type
```Java
FileStore fs = Files.getFileStore(path);

BufferedReader br = Files.newBufferedReader(path);

List<Complaint> litany = Collections.list(legacyLitany);
```

## Item2 构造体有很多参数时，考虑使用Builder

静态工厂和原始构造体都会面对一个问题：无法根据参数的个数进行动态的变化。当类有很多个属性需要设置时，一般有下面两种方法：

* telescoping constructor 重叠构造器 
  * 为不同的参数类型写不同的构造体
* JavaBeans 
  * 先通过零参构造体获得一个对象，然后使用setter给属性一一赋值

其实还有第三种方法可以考虑：建造者模式 -- 先生成类的一个建造者对象，把需要设置的属性值设置给建造者对象，最后执行建造者的建造方法得到一个对象。
