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

配置servlet标签需要配置两个，一个是servlet本身，另一个servlet-mapping是servlet的映射信息。
servlet的servlet-name可以自定义，一般为servlet的类名，而servlet-class则是servlet类的全路径。  
servlet-mapping的servlet-name是对应的servlet名，url-pattern则是我们输入到浏览器地址栏中的用来调用servlet的url。



|      | url-pattern | 
| :---- | ---- | 
| 精确匹配 | /servlet |  
| 模糊匹配 | /* |  
| 模糊匹配 | /path/* |  
| 模糊匹配 | *.后缀 |  

url-pattern除了上面的基本写法之外，还要注意几点：
1. `/` 或者 `*`, url不能直接用servlet名开头。
2. 同时使用两种模糊匹配是非法路径
3. 匹配优先级：精确匹配最优先，后缀匹配最后

### 【2】初始参数

可以设置两种参数用来初始化servlet，一种是init-param，一种时context-param。  
关于两种参数的区别：[init-param and context-param](https://stackoverflow.com/questions/28392888/init-param-and-context-param)  

init-param是给特定servlet设置的参数，所以写在`<servlet>`下面

```xml
<servlet>
  <servlet-name></servlet-name>
  <servlet-class></servlet-class>
  <init-param>
    <param-name>userName</param-name>
    <param-value>Alice</param-value>
  </init-param>
</servlet>
```

使用的时候通过`getServletConfig().getInitParamter("userName")`来调用。

context-param是为webApp全局准备的参数，直接定义在`<web-app>`标签下，通过`getServletContext().getInitParamter("userName")`来调用

```xml
<web-app>
  <context-param>
    <param-name>userName</param-name>
    <param-value>Alice</param-value>
  </context-param>

</web-app>
```


### 【3】特殊标签

1. 错误处理
```xml
<error-page> 
    <error-code>404</error-code> 
    <location>/error404.jsp</location> 
</error-page> 

...

<error-page> 
    <exception-type>java.lang.Exception<exception-type> 
    <location>/exception.jsp<location> 
</error-page> 
```
2. 过滤器
```xml
<filter> 
    <filter-name> </filter-name> 
    <filter-class> </filter-class> 
</filter> 
<filter-mapping> 
    <filter-name> </filter-name> 
    <url-pattern> </url-pattern> 
</filter-mapping> 
```

3. 监听器
```xml
<listener> 
  <listener-class></listener-class> 
</listener> 
```

4. 会话
```xml
<session-config> 
  <!-- 以分为单位 -->
  <session-timeout> </session-timeout> 
</session-config>
```

5. 欢迎页

找不到index1，就会加载index2

```xml
<welcome-file-list>
  <welcome-file>index1.jsp</welcome-file>
  <welcome-file>index2.jsp</welcome-file>
</welcome-file-list>
```
