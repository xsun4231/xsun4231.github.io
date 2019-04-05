---
title: Hexo 国际化（i18n）功能
tags:
  - i18n
  - Internationalization
  - 国际化
  - Hexo
date: 2019-04-05 13:28:49
---

## Internationalization  i18n
`i18n`功能是指针对不同的国家、地域、语言环境，改变网站通用部分的显示语言。

## 设置
使用`YAML`或者`JSON`编写不同的语言文件，并统一放在主题文件夹`languages`中。


## 使用
使用`__`或者`_p`来取得对应语言的字符串。比如：
```
menu：
  titile: HOME
  archive: ARCHIVE
  search: SEARCH
```
```
menu：
  titile: 首页
  archive: 归档
  search: 搜索
```

在模板中使用目录时（例如语言是英文）：
```
<%= __('menu.title') %> // HOME
<%= __('menu.archive') %> // 归档
<%= __('menu.search) %> // 搜索 
```
