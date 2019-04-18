---
title: Immediately_Invoked_Function -- 立即调用函数的写法
date: 2018-06-20
tags: 
  - JavaScript
---

## 自执行-立即调用的函数表达式
在某些情况下，我们不需要函数创建多个实例，也不需要对返回值做什么处理，便可以通过在函数声明的后面添加`()`来实现自执行。因为`foo`仅仅是`function(){}`这个表达式的一个引用，在函数表达时候后添加`()`便可以执行。
```JavaScript
var foo = function(){
  //do something.
}();
```
但如果我们像下面这么写，会报错：

```JavaScript
function(){
  //do somthing.
}();
```

给括号里加入参数的话，可以不报错，但是函数不会执行，因为它会被解析成一个毫不相关的括号。
报错原因：解析代码的时候，function已经被识别为声明函数用，而不是一个函数表达式。
所以我们要做的就是把括号前面的内容解析成表达式，以下的写法都可以：
```JavaScript
  (function makeCounter(){
    console.log("invoked by ()");
  }());

  var x = function makeCounter(){
    console.log("invoked by var with ()");
  }();

  !function(){
    console.log("invoked by !");
  }();
  
  ~function(){
    console.log("invoked by ~");
  }();

  +function(){
    console.log("invoked by +");
  }();

  -function(){
    console.log("invoked by -");
  }();

  new function(){
    console.log("invoked by new");
  };

  new function(){
    console.log("invoked by new with ()");
  }();
```