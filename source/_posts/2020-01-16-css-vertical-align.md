---
title: CSS 文字对齐
tags:
  - css
date: 2020-01-16 21:09:17
---

本来想直接把代码内嵌到markdown里，但是hexo好像不支持，残念

```html
<table style="width:1000px">
  <tr>
    <th></th>
    <th>A</th>
    <th>B</th>
    <th>C</th>
  </tr>
  <tr>
    <th >0</th>
    <td style="text-align: right;">text-align: right;</td>
    <td style="text-align: left;">text-align: left;</td>
    <td style="text-align: center;">text-align: center;</td>                                             
  </tr>
  <tr style="height:100px;">
    <th>1</th>
    <td style="vertical-align: top;">vertical-align: top;</td>
    <td style="vertical-align: bottom;">vertical-align: bottom;</td>
    <td style="vertical-align: middle;">vertical-align: middle;</td>
  </tr>
</table>
```

水平方向对齐：
1. `text-align: right;`
2. `text-align: center;`
3. `text-align: left;`

垂直方向对齐：
1. `vertical-align: top;`
2. `vertical-align: middle;`
3. `vertical-align: bottom;`