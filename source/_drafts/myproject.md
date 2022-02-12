---
title: 前后端分离Vue+SprintBoot项目
tags:
  - null
date: 2022-02-12 13:45:41
---
...

# Spring+Vue.js 前后端分离项目

1. # 项目结构
- 【前端】Vue.js Element axios
- 【后端】SpringBoot（Tomcat JPA springSecurity?)
- 【数据库】 MySQL Redis
2. # 初始搭建

## 2.1 搭建数据库

## 2.2 搭建前端

有两种选择，使用VueCLI或者使用IDE创建。

1. 使用VueCLI （略）
2. 使用IntelljIDEA （略）

### 登陆页面

1. src\componets\Login.vue
2. src\componets\Home.vue
3. 设置反向代理

使用模块 axios来实现反向代理。

`npm install —save axios`

在前段Vue.js项目中修改src\main.js

```javascript
// 省略import部分


var axios = require('axios')
axios.defaults.baseURL = 'http://host:port/api'

// 全局注册 $axios
Vue.prototype.$axios = axios
```

1. 配置路由
2. 跨域支持

## 2.3 搭建后端

1. Spring Initializr
2. 修改 application.properties

```xml
server.port=portNo

spring.datasource.url=jdbc:mysql://host:port/DBNAME
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

1. 创建第一个API接口
   1. User类
   2. Result类
   3. UserService
   4. LoginController

## 2.X 第一次测试


