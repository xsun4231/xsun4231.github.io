---
title: post-with-source
tags:
  - null
date: 2019-04-03 13:16:57
---

##  样板
{% asset_img 1.JPG i1 %}

## 资源文件夹
从`Hexo 3 `开始，在`_config.yml`中启用`post_asset_folder=true`, 使用hexo的资源文件夹功能。
启用后，`_posts`里每生成一个post，会在相同路径下生成一个同名的文件夹作用该post的资源管理文件夹。

## 使用资源
启用了`asset_folder`后，可以使用以下几种命令，在文章中引用资源:
```
{% asset_path name %}
{% asset_img name title %}
{% asset_link name title %}
```
`name`的地方填写资源文件夹开始的相对路径，所以没有复杂结构的话直接写文件名就可以了。

## 特点
使用资源文件夹与使用`markdown`的引用语法的最大不同就是：在网站首页或者归档处显示时，使用资源文件夹功能的引用可以被显示，而`markdown`语法引用的内容则无法被正确显示。


