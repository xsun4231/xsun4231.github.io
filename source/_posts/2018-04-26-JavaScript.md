---
title: JavaScript Memo
date: 2018-04-26
tags:
---

## 介绍
JavaScript使用的是ECMA(European Computer Manufacturers Association)的ECMAScript标准,也就是人们常说的ES6,ES7,ES8.而JavaScript本身是网景公司(Netscape)对ES标准的一种实现,JavaScript是该公司的注册商标.(这也是前阵子苹果下架了所有名称里带JavaScript的app的原因)
> JavaScript 是Brendan Eich用两周写出来的一种语言.所以有点设计缺陷也可以理解,比如`typeof null == "object"`
由于浏览器确定了使用的JavaScript版本,所以写JavaScript程序时,要注意ES版本与浏览器的支持是否匹配.

## 基本
### 写在哪里
JavaScript的代码可以直接写在网页html里,也可以单独写在js文件中. 
html里的JavaScript代码要写在 `<scrpt>` 标签内,标签的 `type` 属性不需要定义：
```<html>
<head>
  <script>
    alert('Hello, World!');
  </script>:
</head>
<body>
  ...
</body>
</html>```

我们也可以把```alert('Hello, World!')```单独写在一个js文件中,取个名字`hello.js`,然后把js文件的引用写入html的head中(其实写在body里也能跑)
```
<html>
<head>
  <script src="hello.js"></script>
</head>
<body>
  ...
</body>
</html> 
```

### 简单语法
JavaScript每个语句以`;`结束,JavaScript的引擎会自动添加,所以这里并不强制要求,不过因为自动添加的`;`有时会造成歧义,所以手动添加还是最保险的.

赋值语句
```JavaScript
var x = 1;
```
条件判断
```JavaScript
if( 1 > 0 ){
    x = 1;
}
```

> 一般规范：4空格缩进,80字换行

另外跟Java一样,JavaScript的注释写法也是`//`和`/* */`,JavaScript也对大小写敏感.

### 变量
1. JavaScript是动态语言,变量的声明使用**var**,赋值使用**=**.  
2. 使用var声明的变量其[作用域](##heading-作用域)都在函数内，而不使用var声明的变量则是全局变量.  
3. 变量名要求由大小写英文,数字,`$`和`_`组成,不可以用数字开头,也不可以使用JavaScript的关键字作为变量名.

## 数据类型

### 基本型
JavaScript有五种基本类型：
* number
* string
* boolean
* undefined
* null

```JavaScript
typeof 1;//"number"
typeof "abc";//"string"
typeof true;//"boolean"
typeof undefined;//"undefined"
typeof null;//"object"
```

#### 数字型 Number
JavaScript中数字型不区分整数和浮点数,正、负、整数、浮点数、NaN、Infinity都是Number型,可直接进行运算.
> NaN: Not a Number 
>  
> Infinity: ∞ 无穷大

#### 字符串
JavaScript中字符串可以用双引号`"`,也可以用单引号`'`来表示.

#### 布尔型
JavaScript中的布尔型由true和false构成,以及 **与,或,取反**的运算都与Java相同.

>JavaScript中进行比较的时候,如果使用`==`,会自动转换类型再进行比较,不转换类型的比较则需使用三个等号`===`.  
> {% asset_img equals.PNG equals %}


> NaN与所有Number都不相等,包括它自己,判断NaN的时候只能使用`isNaN()`.
> ```JavaScript
> isNaN(NaN) //true
>// function isNaN(a){
>//     return a != a;
>// }
> ```

> JavaScript的浮点数在运算时会产生误差,直接进行比较会出现错误结果.这点在Java中也是一样，所以要进行精确比较的时候,不应该使用浮点型.
> 　
> {% asset_img float.PNG float %}
> 
> 可以通过检测误差绝对值来进行比较:
> ```JavaScript
> Math.abs(1/3 - (1 - 2/3)) < 0.000001; \\true
> ```

#### 空值和未定义
JavaScript中类似于Java,也通过**null**来表示空值,空值与长度为零的字符串不同.JavScript同时还定义了一个表示未定义的常量**undefined**.一般在检测参数时可以用到,未输入的参数会被当做**undefined**处理.

### 引用类型

#### 数组 Array
JavaScript通过`[]`来表示数组,使用`,`来分隔元素.也可以用`new Array(1,2,3);`来定义数组.数组中的元素可以是任意的数据类型,通过索引`arr[index]`来访问.

#### 对象 Object
JavaScript的对象是由成对的**key-value**组成的无序集合.**key**都是字符串,**value**可以是任意数据类型.
```JavaScript
var person = {
  name: 'Bob',
  age: 23,
  tags: ['person', 'young'],
  married: false,
  code: null
}
```
通过以下格式获取对象的属性：
```JavaScript
person.name;// Bob
person.age; // 23
```


## 作用域
传统的编程语言,作用域一般是块级,也就是一个`{}`内是一个作用域,所以在`if else while for`的范围内定义的局部变量不会影响到外面.而JavaScript的作用域是函数级,一个`function`为一个作用域,在函数内部定义的变量,不受函数内部语法块的影响.
```JavaScript
var x = 1; // 1
if(true){
  var x = 2; //2
}
condole.log(x); //2
```
如果一定要实现块作用域的话,便需要插入函数来起到划分的作用
```JavaScript
var x = 1; //1
if(true){
  function print(){
    var x = 2;//2
  }
}
console.log(x);//1
```

#### 函数作用域提升
函数声明分为：声明式 和 变量式

声明式会自动将声明放在函数最前面,并执行赋值的内容.
```JavaScript
function name(){

}
```

所以下面的函数没有问题
```JavaScript
test("test");
function test(arg){
  console.log(arg); //test
}
```

变量式会将声明提升到函数最前,而后再赋值
```JavaScript
var name = funciton(){

}
```
所以下面的代码中,函数被声明之后,还没有赋值,便被执行,会报错.
```JavaScript
baz("baz"); //baz is not a function
var baz = function(arg){
  console.log(arg);
};
```
需要注意的是,变量式声明中的函数,是不会被提升作用域的
```JavaScript
var baz = function spam(arg){
  if(arg < 5){
    spam(arg + 1);//只在函数的作用域内有效
  }else{
    console.log(arg);
  }
};
baz(1); //5
spam(1);//spam is not defined
```

>> 使用var声明的变量或者函数,要放到其作用域的顶端.


[runoob]: http://www.runoob.com/js/js-tutorial.html
[Liaoxuefeng]: https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000
