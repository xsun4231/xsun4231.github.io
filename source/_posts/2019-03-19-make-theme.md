---
title: make-theme
date: 2019-03-19 10:27:18
tags:
---

## theme 结构
 
* _config.yml
* languages
* layout
* scripts
* source

### _config.yml
主题的配置文件，修改主题的配置文件不需要重启服务器（修改网站根目录的那个_config.yml则需要重启才能生效)

### languages
国际化设置，使用yml文件设置网站元素的翻译，具体参考[i18n](https://hexo.io/docs/internationalization)

### layout
网页、模板的设置。hexo默认使用Swig,不过也可以手动添加EJS,Haml,Jade或者Pug的支持。模板的写法参考 [Templates](https://hexo.io/docs/templates)

### scripts
存放JavaScript代码的文件夹，Hexo会自动加载这里的javaScript文件。扩展功能参考 [plugins](https://hexo.io/docs/plugins)

### source
顾名思义，这里是存放资源的。不属于页面模板的资源理论上都应该在此文件夹下面。