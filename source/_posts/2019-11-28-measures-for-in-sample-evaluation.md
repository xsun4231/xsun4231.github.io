---
title: 均方误差和决定系数
tags:
  - Python
  - Data Science
date: 2019-11-28 14:00:58
---

## 均方误差 Mean Square Error
是对误差的一个估计，其定义为所有估值和样本的误差平方的平均值。  

在python中这样写：
```Python
from sklearn.metrics import mean_squared_error

mean_sqlared_error(df['data'],predict)

```



## 决定系数 Coefficient of determination / $R^2$
维基百科的定义是：_用于度量因变量的变异中可由自变量解释部分所占的比例，以此来判断统计模型的解释力。_  

* 首先得到一组因变量 取得平均值 $\bar{y}$
* 由此可以得到总的方差 $SS_{tot}$
* 再取得预估值的方差 $SS_{res}$
* 最后得到决定系数 $R^2 = 1 - \frac{SS_{tot}}{SS_{res}}$

在python中这样写：
```Python
from sklearn.linear_model import LinearRegression

lm=LinearRegression()

lm.score(X,Y)

```