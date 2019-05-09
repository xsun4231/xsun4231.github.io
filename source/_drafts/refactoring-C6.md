---
title: 代码重构 - 改善方法的结构
tags:
  - Refactoring
date: 2019-04-24 14:06:44
---

代码重构做的最多的就是改善方法的结构。去掉方法中不需要的元素，修改不明确的名称，将复杂而冗长的方法改成精简而明确的小方法群组，是重构方法的主要思路。  

方法重构用的最多的是【提取方法】，有种将一地零落的玩具分类整理装箱的感觉；而【方法内联】一般在方法提取的过于详细以至于产生了反作用，或者需要重新整理方法间关系时使用。  

【提取方法】的最大问题，是如何处理局部变量，这就用到了对局部变量的重构技巧。  

最后，重构方法可以的同时，原有的算法结构也会变得简明易懂，可以借机改善算法。

## 提取方法 Extract Method
如果发现方法内有一个代码块在很具体的做一件事儿，或者有一句漂亮的注释解释了接下来好几行的操作，那就试试把它提取成一个方法吧，然后取个足以说明其作用的方法名。比如：  

```Java
void printOwing(double amount) {
    printBanner();

    //print details
    System.out.println ("name:" + _name);
    System.out.println ("amount" + amount);
}
```
重构后是这个样子：  

```Java
void printOwing(double amount) {
    printBanner();
    printDetails(amount);
}

void printDetails (double amount) {
    System.out.println ("name:" + _name);
    System.out.println ("amount" + amount);
}
```

漂亮的代码往往方法都很简短，有着意思明确的方法名。方法越简洁，被重复利用的机会就越大；方法名如果足以传达信息，又可以省去不少的注释。
方法的简洁程度和方法名的好坏是联系在一起的，提取方法可以看做是用方法名来取代原位置的代码块，如果不能通过方法名理解原本代码块要执行的操作，重构也就失去了意义。
重构的时候不用刻意去思考方法或者方法名的长度，重构的关键在于(新)方法名和代码块之间的语义距离（semantic distance)。

### 局部变量的处理

如果要提取的代码块使用了局部变量，提取方法的操作就要变得稍微复杂一些了。
首先我们需要观察一下局部变量定义、赋值以及被调用的位置，如果局部变量相关的代码可以移动位置，不妨先优化一下，因为优化前后，接下来的重构操作可能会有很大不同。

1. 如果局部变量足够“局部”，可以直接放到新方法内部，当然是最简单的情况。  
2. 如果局部变量的赋值是在新方法的处理范围外，新方法只是调用了变量值而没有进行修改，我们可以把局部变量当做参数传达给新的方法。  
3. 如果新方法需要对局部变量的值进行修改，而变量的时候又在新方法的处理范围外，则需要为新方法添加返回值，返回修改后的变量值。

> 这里就涉及到了[单一返回值]的问题。编程语言普遍使用的是单一返回值的方法结构，这样可以保证代码的可读性，避免混乱。如果遇到了需要返回多个值的情况，不妨试着细化方法的划分，使用多个单一返回值的方法来实现。

栗子：
重构下面代码：  
```Java
void printOwing() {

    Enumeration e = _orders.elements();
    double outstanding = 0.0;

    printBanner();

    // calculate outstanding
    while (e.hasMoreElements()) {
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }

    printDetails(outstanding);
}
```

书中第一步进行了如下的重构:

```Java
void printOwing() {
    printBanner();
    double outstanding = getOutstanding();
    printDetails(outstanding);
}

double getOutstanding() {
    Enumeration e = _orders.elements();
    double outstanding = 0.0;
    while (e.hasMoreElements()) {
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }
    return outstanding;
}
```

书中说将`outstanding`的计算提取成了一个独立的方法，而前面的局部变量因为只在计算中被使用到，所以一并提取了出来。这里有一个看似理所当然的操作：作者并没有将`printBanner()`或者`printDetails()`放在新方法内。  
如果将`pringDetails()`放到`getOutstanding()`里，不就不需要设返回值了？ 这是因为重构的对象是计算`outstanding`的代码块，如果将不相关的方法一并放到新方法内，就偏离了重构的目的。
假设将`printDetails()`放在了`getOutstanding()`内，再看`printOwing()`会发现，可以获取的信息变少了，`printDetails()`这个操作被隐藏在了`getOutStanding`里，而这并不在我们重构的计划内。
提取方法的重构目的，是用简明的方法调用来代替具体的代码块，提高原位置代码的可读性。如果将代码的方法调用看做是一个树状结构，提取方法就是在增加分支的深度。我们在读代码的时候，并不能看到下层方法的内容，所以将原本需要在上层直接读到的内容放在了很深的位置，反而会降低代码的可读性。

## 方法内联 Inline Method



## 内联局部变量 Inline Temp

## 使用查找（方法）替代局部变量

## 引入解释用变量

## 分割局部变量（功能）

## 移除对参数的赋值操作

### Pass By Value

## Replace Method With Method Object

## Substitute Algorithm