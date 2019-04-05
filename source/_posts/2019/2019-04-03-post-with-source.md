---
title: Hexo 资源文件夹的使用
tags:
  - Hexo
date: 2019-04-03 13:16:57
---

## 启用资源文件夹
从`Hexo 3 `开始，在`_config.yml`中启用`post_asset_folder=true`, 使用hexo的资源文件夹功能。
启用后，`_posts`里每生成一个post，会在相同路径下生成一个同名的文件夹作用该post的资源管理文件夹。

## 引用资源文件夹中的资源
启用了`asset_folder`后，可以使用以下几种命令，在文章中引用资源:
```
{% asset_path name %}
{% asset_img name title %}
{% asset_link name title %}
```
在`name`的地方填写资源文件夹内的相对路径。

比如以下的文件结构：
```
 - sample.md
 - sample
   - part1
    - img.jpg
```

在sample.md中引用img.jpg时的写法是:
```
{% asset_img part1\img.jpg this is title %}
```

## 优点
使用资源文件夹与使用`markdown`的引用语法的最大不同就是：在网站首页或者归档处显示时，使用资源文件夹功能的引用可以被显示，而`markdown`语法引用的内容则无法被正确显示。

##  样板
{% asset_img 1.JPG i1 %}
