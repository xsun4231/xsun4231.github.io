---
title: jQuery 基本知识点备忘录
date: 2019-03-19 14:06:56
tags:
    - JavaScript
    - jQuery
---

## $(document).ready()

页面载入需要首先准备DOM（Document Object Model),jQuery可以检测到页面的DOM是否准备完毕，`$(document).ready(function)`中的function，会等到页面的DOM准备完毕再运行。  
类似的还有`$(window).on("load",funciton)`,这种写法下的function会在整个页面（并不仅仅是DOM）载入完毕时再执行。

```JavaScript
$( document ).ready(function() {
    console.log( "document loaded" );
});

$( window ).on( "load", function() {
    console.log( "window loaded" );
});
```
将上面的代码插入页面的某个部件里执行，可以看到document很快就载入完成，等页面的所有其他元素都载入完成，`window loaded`才会被执行输出。

