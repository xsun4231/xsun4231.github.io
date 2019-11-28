---
title: 使用Python的线性回归分析
tags:
  - Data Analysis
date: 2019-11-26 11:32:56
---

## 线性回归是啥？
线性回归是统计学中的一种回归分析方法，我们可以简单的记住线性回归中有两个重要变量：
1. The predictor(independent) variable 自变量 x
2. the target(dependent) variable 因变量 y

如果线性回归方程中只有一个x，则称为简单线性回归，大于一个x时，成为多元线性回归。
举个例子
```
y = b0 + b1*x
```
这个简单线性回归方程中，x是自变量，y是因变量，b0是intercept, b1叫做slope

## Python中的简单线性回归

```Python
from sklearn.linear_model import LinearRegression

lm=LinearRegression()

# 假设我们有一个dataframe df
X = df[['highway-mpg']] #作为自变量 X可以指定多列
Y = df['Price'] #因变量Y只有一列

lm.fit(X,Y) #使用线性回归分析

Yhat = lm.predict(X_0) # X_0 跟X又相同的列数

# 可以查看线性回归方程的参数
lm.intercept_

lm.coef_

```