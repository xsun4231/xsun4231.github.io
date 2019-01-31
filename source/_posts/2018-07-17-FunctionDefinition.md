---
title: Define Functions in JavaScript
date: 2018-07-17
tags: JavaScript
---

> 需要什么，就去学什么咯。

JavaScript中定义函数，通常会遇到以下两种写法：

写法A
```JavaScript
function name1(){
  //...
}
```
写法B
```JavaScript
var name2 = function(){
  // ...
};
```


这两种写法有什么区别呢？很久很久以前,[stackoverflow][stackoverflow]上面有人问了一样的问题。

## funciton的基本定义
首先，在JavaScript中function的最基本定义方法是写法A，这种定义的内容在脚本被编译时就会执行，生成一个有名字的函数对象。

而写法B实际上是定义了一个无名的函数对象，又将这个对象赋给了一个有名字的变量。
这种写法的存在，方便了我们将函数定义为对象的属性：
```JavaScript
var target = new Object();
target.add = function(a,b){
  return a+b;
};
target.add(1,1); //2
```

所以写法A定义的是一个完整的函数对象，而写法B定义的函数是没有名字的，`name2`是变量的名字，而不是函数的。

## 扩展
其实还可以使用`new`来声明函数：
```JavaScript
var name = new Function("a", "b", "return a+b;");
```
这里注意使用的是`Function`而不是`function`，这是具体的定义了一个`Function`类型的对象。速度慢，只有在特定情况下使用，比如想要让用户去控制函数内容的时候。



[tips]:https://www.permadi.com/tutorial/jsFunc/index.html

[stackoverflow]:https://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname