---
title: 代码重构 - 改善方法的结构
tags:
  - Refactoring
  - 重构
date: 2019-04-24 14:06:44
---


代码重构做的最多的就是改善方法的结构。去掉方法中不需要的元素，修改不明确的名称，将复杂而冗长的方法改成精简而明确的小方法群组，是重构方法的主要思路。  

方法重构用的最多的是【提取方法】，有种将一地零落的玩具分类整理装箱的感觉；而【方法内联】一般在方法提取的过于详细以至于产生了反作用，或者需要重新整理方法间关系时使用。  

【提取方法】的最大问题，是如何处理局部变量，这就用到了对局部变量的重构技巧。  

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
重构的时候不用刻意去思考方法或者方法名的长度，重构的关键在于方法名和代码块之间的语义距离（semantic distance)。

### 局部变量的处理

如果要提取的代码块使用了局部变量，提取方法的操作就要变得稍微复杂一些了。
首先我们需要观察一下局部变量定义、赋值以及被调用的位置，如果局部变量相关的代码可以移动位置，不妨先优化一下，因为优化前后，接下来的重构操作可能会有很大不同。

1. 如果局部变量足够“局部”，可以直接放到新方法内部，当然是最简单的情况。  
2. 如果局部变量的赋值是在新方法的处理范围外，新方法只是调用了变量值而没有进行修改，我们可以把局部变量当做参数传达给新的方法。  
3. 如果需要新方法的处理来给变量赋值，而变量值的使用又在新方法的范围外，则需要为新方法添加返回值，返回变量值。

> 想返回多个变量值咋整嘞？这里涉及到了[单一返回值]的问题。编程语言普遍使用的是单一返回值的方法结构，这样可以保证代码的可读性，避免混乱。如果遇到了需要返回多个值的情况，不妨试着细化方法的划分，使用多个单一返回值的方法来实现。

栗子，重构下面代码：  
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

书中直接进行了如下的重构:

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

书中说将`outstanding`的计算提取成了一个独立的方法，而前面的局部变量因为只在计算中被使用到，所以一并提取了出来。这里有一个看似理所当然却值得做笔记的操作：作者并没有将`printBanner()`或者`printDetails()`放在新方法内。  
如果将`pringDetails()`放到`getOutstanding()`里，不就不需要设返回值了？ 这是因为重构的对象是计算`outstanding`的代码块，如果将不相关的方法一并放到新方法内，就偏离了重构的目的。
假设将`printDetails()`放在了`getOutstanding()`内，再看`printOwing()`会发现，可以获取的信息变少了，`printDetails()`这个操作被隐藏在了`getOutStanding`里，而这并不在我们重构的计划内。
提取方法的重构目的，是用简明的方法调用来代替具体的代码块，提高原位置代码的可读性。如果将代码的方法调用看做是一个树状结构，提取方法就是在增加分支的深度。我们在读代码的时候，并不能看到下层方法的内容，所以将原本需要在上层直接读到的内容放在了很深的位置，反而会降低代码的可读性。

## 方法内联 Inline Method

重构的一个重要目的是用简洁明了的方法名来替代代码原本所在的位置，以提高可读性。但有时会发现一些方法的内容已经简洁的跟方法名不相上下，这时就可以考虑舍弃方法了。  

比如下面代码，`moreThanFiveLateDeliveries`和`_numberOfLateDeliveries > 5`几乎没什么区别，也就没有必要留着方法了。

```Java
int getRating() {
    return (moreThanFiveLateDeliveries()) ? 2 : 1;
}
boolean moreThanFiveLateDeliveries(){
    return _numberOfLateDeliveries > 5;
}
```

```Java
int getRating() {
    return (_numberOfLateDeliveries > 5)? 2 : 1;
}
```

## 内联局部变量 
如果有一个局部变量像下面的`basePrice`一样只做了一次很简单的赋值操作，又没有被多个位置引用，那就没必要留着它了。

```Java
double basePrice = anOrder.basePrice();
return (basePrice > 1000)
```

```Java
return (anOrder.basePrice() > 1000)
```

## 使用查找方法替代局部变量
有时我们为了重复使用某一个表达式的结果，会将其保存在局部变量中，但是局部变量的访问有范围限制，想要使用该变量，就需要在同一个方法内，结果导致方法过长，过长的方法往往有着复杂的结构而又不好重构。如果使用查找方法来替代局部变量，便可以摆脱局部变量的范围限制，在类的各个地方都能使用表达式的结果，重构的时候也就少了很多顾虑。

```Java
double basePrice = _quantity * _itemPrice;
if (basePrice > 1000)
    return basePrice * 0.95;
else
    return basePrice * 0.98;
```
将`basePrice`提取成为一个方法：
```Java
if (basePrice() > 1000)
    return basePrice() * 0.95;
else
    return basePrice() * 0.98;
...
double basePrice() {
    return _quantity * _itemPrice;
}
```

## 引入解释用变量

比如下面代码
```Java
if ( (platform.toUpperCase().indexOf("MAC") > -1)&&
      (browser.toUpperCase().indexOf("IE") > -1)&&
       wasInitialized() && resize > 0 )
 {
   // do something
 }
```
条件语句的表达式非常复杂，难以理解，可以引入解释变量，提高条件语句的可读性：
```Java
final boolean isMacOs     = platform.toUpperCase().indexOf("MAC") > -1;
final boolean isIEBrowser = browser.toUpperCase().indexOf("IE")  > -1;
final boolean wasResized  = resize > 0;

if (isMacOs && isIEBrowser && wasInitialized() && wasResized) {
    // do something
}
```

不难发现，这个重构操作对条件语句的重构有很不错的效果，但是会引入新的局部变量。我们完全可以通过提取方法来简化表达式，所以作者也有提到：一般在无法提取方法时，才会想起来引入解释变量。
有些方法由于使用了大量局部变量，使用提取方法来重构会很麻烦，这时引入解释变量可能有助于梳理算法结构，对进一步的重构有很大帮助。


## 分割局部变量
我们可以这样理解:局部变量在方法中的作用大致有两种，
1. 一种是在循环的处理中，用来当做index或者flag。
2. 另一种是用来保存值或参照，方便多次的使用，这种局部变量应该只能被赋值一次。
如果一个局部变量承担了超出上述范围的责任，就该考虑分割它了。让一个局部变量承担多种责任，会降低代码的可读性，造成混乱。所以遇到这种情况，尽可能一个变量一个责任的进行分割。分割之后，再考虑其他的重构操作。比如：

```Java
double temp = 2 * (_height + _width);
System.out.println (temp);
temp = _height * _width;
System.out.println (temp);
```

`temp`两次每调用时，保存的内容不一样，所以应该分割为两个变量：

```Java
final double perimeter = 2 * (_height + _width);
System.out.println (perimeter);
final double area = _height * _width;
System.out.println (area);
```

## 移除对参数的赋值操作
**参数可以引用，修改，但不可以直接使用 `=` 赋值 **   
```Java
void aMethod(Object foo) {
foo.modifyInSomeWay();           // √ 这个可以
foo = anotherObject;             // × 这个不行
```
首先要弄懂赋值的概念，使用`=`的操作，其作用不是修改变量的值，而是改变了该变量名所参照的对象。在方法中改变参数的参照（进行赋值操作），我的理解是有两个问题：
1. 如果想通过方法的调用来改变参数的参照对象，可以通过返回值来进行赋值，直接在方法中使用`=`，调用方法的地方看不到该赋值操作，会降低代码的可读性。
2. 如果是**Pass By Value**的编程语言，改变参数的参照（Reference），并不会影响到函数外的原变量。这就造成了混乱。

### Pass By Value && Pass By Reference
复习一下值传递和引用传递
* 值传递
  * 方法的参数是变量值的拷贝，在方法内修改参数值不会影响方法外变量的值
* 引用传递
  * 方法的参数时变量的地址，在方法内修改参数会直接影响该内存地址的内容，方法外变量的值也会改变。

Java是值传递的编程语言，对于基本数据类型的值传递很好理解，对于引用类型的参数，[java基本数据类型传递与引用传递区别](https://blog.csdn.net/javazejian/article/details/51192130) 这篇文章里有个图很有助于理解

{asset_img passByReference.PNG pbr}
方法的代码如下
```Java
package com.zejian.test;
/**
 * java中的按值调用
 * @author zejian
 */
public class CallByValue {
	private static User user=null;
	public static void updateUser(User student){
		student.setName("Lishen");
		student.setAge(18);
	}
	
	
	public static void main(String[] args) {
		user = new User("zhangsan",26);
		System.out.println("调用前user的值："+user.toString());
		updateUser(user);
		System.out.println("调用后user的值："+user.toString());
	}
}
```
我们可以把引用类型的对象看作是一个值，引用类型的参数所传递的，是这个对象（图中的user），这就是引用类型的值传递。  
通过`student`调用对象的方法是可以修改`user`内容的，但如果使用`=`来对`student`进行赋值，只是让`student`指向了一个新的对象，并不会影响到`user`。为了防止参数赋值造成混乱，Java其实可以将参数设置为`final`，只不过好像没怎么见谁用过...

## 把方法换成对象
如果一个方法中有太多的局部变量，以至于无法通过提取方法进行重构（可是不进行重构方法又太丑陋了），不妨把方法整体提取为一个独立的对象，局部变量变为该对象的属性后，就可以在对象内轻松地提取方法进行下一步的重构了。

书中例子：
```Java
Class Account
    int gamma (int inputVal, int quantity, int yearToDate) {
        int importantValue1 = (inputVal * quantity) + delta();
        int importantValue2 = (inputVal * yearToDate) + 100;
        if ((yearToDate - importantValue1) > 100)
            importantValue2 -= 20;
        int importantValue3 = importantValue2 * 7;
        // and so on.
        return importantValue3 - 2 * importantValue1;
    }
```
上面代码中，如果想要将计算返回值的部分提取出来，就需要将好多局部变量作为参数传递，非常复杂。我们可以使用对象来替代方法，首先写一个`Gamma`类：
```Java
class Gamma...
    private final Account _account;
    private int inputVal;
    private int quantity;
    private int yearToDate;
    private int importantValue1;
    private int importantValue2;
    private int importantValue3;
```
再为`Gamma`类添加一个构造体：
```Java
Gamma (Account source, int inputValArg, int quantityArg, int yearToDateArg) {
        _account = source; // 为了使用方法delta()
        inputVal = inputValArg;
        quantity = quantityArg;
        yearToDate = yearToDateArg;
    }
```
然后将原方法的处理内容转移到`Gamma`中，作为一个待重构的方法：
```Java
int compute () {
        importantValue1 = (inputVal * quantity) + _account.delta();
        importantValue2 = (inputVal * yearToDate) + 100;
        if ((yearToDate - importantValue1) > 100)
            importantValue2 -= 20;
        int importantValue3 = importantValue2 * 7;
        // and so on.
        return importantValue3 - 2 * importantValue1;
    }
```
这时，由于局部变量都已经变成了`Gamma`类的属性，我们提取方法时不需要再担心局部变量了：
```Java
int compute () {
       importantValue1 = (inputVal * quantity) + _account.delta();
       importantValue2 = (inputVal * yearToDate) + 100;
       importantThing();
       int importantValue3 = importantValue2 * 7;
       // and so on.
       return importantValue3 - 2 * importantValue1;
   }

   void importantThing() {
       if ((yearToDate - importantValue1) > 100)
            importantValue2 -= 20;
   }
```

## 优化算法
书中用的是**substitue algorithm**, 意思是用简明易懂的写法来替代旧算法，并没有追求提高算法效率或者降低消耗，我在理解的时候把这个重构操作也归类为**优化**  

意思很简单：即使做的还是那些事儿，如果可以让你的算法看起来更容易理解，Just do it.