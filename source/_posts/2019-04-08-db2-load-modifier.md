---
title: db2-load-modifier
tags:
  - null
date: 2019-04-08 17:23:35
---


```sql
-- 使用UTF-8的codepage导入数据
db2 import from filename.csv OF DEL modified by codepage=1208 insert into table_name

-- 
modified by chardelx''

--
modified by coldelx;

```

