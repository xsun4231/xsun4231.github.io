---
title: python 中的字符串格式化
tags:
  - python 
  - f-string
date: 2019-04-12 16:46:14
---

> 原文： [python-f-string](https://realpython.com/python-f-strings/)

自`3.6`版本开始，python引入了一种叫做`f-strings`的写法，使用改写发可以极大地增强字符串的可读性（当然好处不止这些).
不过在学习`f-strings`之前，先看看以往的写法都有哪些。

## 旧方法
在`3.6`之前，我们常用的字符串格式化写法有两种：
 1. 使用转移符 `%`
 1. 使用字符串的格式化方法 `str.format()` 

### 旧选项1 `%`
跟其他编程语言一样，python也可以用`%`来把变量值插入到字符串中的对应位置。写法如下：
```python
name = 'Tom'
print('Hello %s.' % name)
# 输出结果: 'Hello Tom.'
```
输出多个变量时，在`%`后使用括号将所有变量放到一起：
```python
name1 = 'Tom'
name2 = 'Jerry'
type1 = 'cat'
type2 = 'god'
print('Hello %s, you are a %s.this is %s, a %s' % (name1, type1, name2, type2))
# 输出结果: 'Hello Tom, you are a cat. this is Jerry, a god'
```
但是转移符这种东西，一个不小心就容易写错。

### 旧选项2 `str.format()`
从`2.6`开始，python为字符串添加了一个`format()`方法，可以将引入的参数按顺序替换到字符串中的`{}`处。例如：
```python
name1 = 'Tom'
name2 = 'Jerry'
type1 = 'cat'
type2 = 'god'
print('Hello {}, you are a {}.this is {}, a {}'.format(name1, type1, name2, type2))
# 输出结果: 'Hello Tom, you are a cat. this is Jerry, a god'
```

使用`format()`你还可以自定义参数的插入顺序，例如：
```python
name1 = 'Tom'
name2 = 'Jerry'
type1 = 'cat'
type2 = 'god'
print('Hello {0}, you are a {2}.this is {1}, a {3}'.format(name1, name2, type1, type2))
# 输出结果: 'Hello Tom, you are a cat. this is Jerry, a god'
```

`format()`方法的功能还不止于此，既然`index`可以用来出入参数，那可不可以用参数名称呢？毕竟`0,1,2,3`的可读性有限。答案是可以：
```python
name1 = 'Tom'
name2 = 'Jerry'
type1 = 'cat'
type2 = 'god'
print('Hello {name_a}, you are a {type_a}.this is {name_b}, a {type_b}'.format(name_a = name1, name_b = name2, type_a = type1, type_b = type2))
# 输出结果: 'Hello Tom, you are a cat. this is Jerry, a god'
```

既然可以这样写了，那干脆直接引入`dict`得了.这个也是可以的：
```python
character = {
  'name' : 'Tom',
  'type' : 'cat'
}
print('Hello {name}, you are a {type}.'.format(**character))
# 输出结果: 'Hello Tom, you are a cat.'
```

这样可读性就非常好了，不过在`3.6`版本，更好的写法出现了。

## 新方法
关于`f-string`的引入，可以参看[PEP498](https://www.python.org/dev/peps/pep-0498/), 或者[Python-doc](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).  


写法非常简单，在字符串前加`f`或者`F`，在字符串中直接插入`{变量名}`，就可以了：
```python
name = 'Tom'
type = 'cat'
print(f'Hello {name}, you are a {type}.')
# 输出结果: 'Hello Tom, you are a cat.'
```

在`{}`中不仅可以使用字符串，还可以使用运算公式，甚至调用方法：

```python
def change_name(input):
    return 'Jerry'
name = 'Tom'
print(f"Hello {change_name(name)}.")
# 输出结果: 'Hello Jerry.'
```

> 当使用`object`时，f-string会默认调用`__str__()`方法，如果想调用`__repr__`，需要在对象名后面加`!r`：
 ```Python
 f"{object}"
 # 输出 object.__str__()的内容
 f"{object!r}"
 # 输出 object.__repr__()的内容
 ```

最后一个考点：换行。在python中可以使用`'''`来输出带有换行的字符串，不过直接在前面加上f的结果并不怎么好看：
```python
message = f'''
Hi,
you are a 
Cat
'''
# message : '\nHi, \nyou are a \nCat\n'
```

`f-string`的换行方法是，在每行的最后添加`\`
```python
message = f''\
f'Hi '\
f'you are a '\
f'Cat '
# message ： 'Hi you are a Cat'
```

**注意** 一般情况下`f-string`使用单引号和双引号没有区别，但比如引用字典，需要单引号来标记key时，f-stirng就需要使用双引号了，否则字符串中的单引号会被错误理解。