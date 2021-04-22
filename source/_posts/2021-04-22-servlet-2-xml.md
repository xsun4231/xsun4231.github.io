---
title: web.xml 的Servlet配置
tags:
  - Java
date: 2021-04-22 19:40:50
---

[web.xml中servlet配置及其含义](https://www.cnblogs.com/AlanWilliamWalker/p/11128688.html)

## 什么是 web.xml
web.xml是Java工程中用来设置初始化配置信息的文件。xml的书写规则是有Schema文件来定义的。

web.xml使用的schema一般是Sun定义的，标注在标签`<web-app>`中。  

## web.xml中设置Servlet的常用标签

### 【1】servlet 
```xml
<!-- servlet的配置 -->
<servlet>
  <!-- 定义servlet的内部名称 -->
  <servlet-name></servlet-name>
  <!-- servlet的类名 此处为全路径-->
  <servlet-class></servlet-class>
</servlet>

<!-- servlet的映射配置 -->
<servlet-mapping>
  <!-- 对应上面定义的servlet内部名称 -->
  <servlet-name></servlet-name>
  <!-- servlet的映射路径 -->
  <url-pattern></url-pattern>
</servlet-maping>
```

配置servlet标签需要配置两个，一个是servlet本身，另一个是servlet的映射信息。
servlet的servlet-name可以自定义，一般为servlet的类名，而servlet-class则是servlet类的全路径。



|      | url-pattern | 
| :---- | ---- | 
| 精确匹配 | /servlet |  
| 模糊匹配 | /* |  
| 模糊匹配 | /path/* |  
| 模糊匹配 | *.后缀 |  


