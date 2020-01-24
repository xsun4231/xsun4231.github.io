---
title: AngularJS 页面载入事件的相关方法
tags:
  - null
date: 2020-01-21 09:46:17
---


AngularJS的uirouter一个重要的内容就是使用`state`的使用，这里记录一组关于`state`的事件，每当路由转移过程中发生对应事件时，都会在`$rootScrope`广播，使用`$rootScope.$on('$stateEventName', function(event, ...))`获取该事件。

## 0. 引入router.state.events
首先引入JavaScript源文件：
```html
<script src="stateEvents.js"></script>
```
然后导入模块：
```JavaScript
angular.module("myApplication", ['ui.router', 'ui.router.state.events']
```

## 1. [事件](https://ui-router.github.io/ng1/docs/latest/modules/ng1_state_events.html)

1. $stateChangeCancel
2. $stateChangeStart
3. $stateNotFound
4. $stateChangeError
5. $stateChangeSuccess

### $stateChangeCancel
当一个页面的转移被取消时，会在`$rootScope`广播`$stateChangeCancel`事件
有以下参数可以使用：
* toState 目标state
* toParams 前往目标state时的参数
* fromState 来源state
* fromParams 带来的参数
* options 选项
* $transition$ 

和开始事件`$stateChangeStart` ， 成功事件`$stateChangeSuccess` 提供的参数相同

### $stateChangeError
相比于开始和成功的事件，错误事件多一个参数`error`，其内容当然是错误信息。

### $stateNotFound
没有找到state时的事件，提供一下参数可以用：
* unfoudState 未找到的state信息，提供`to` `toParams` `options`等属性
* fromState 来源state
* fromParams 来源参数
* options 选项


## 2. 更新到 [Transition Hooks](https://ui-router.github.io/ng1/docs/1.0.0/classes/transition.transitionservice.html)

uirouter已经更新了IHookRegistry接口，可以对`transition`进行更为详细控制。
`$transition` 和`$transitionService`都实现了该接口，但是`$transition`对象只能在转换开始前使用。  

该接口提供以下方法：
1. getHooks 返回所有已登录的hook方法，参数时方法名，比如`onBefore onEnter`等等
2. onBefore 开始前
8. onStart 开始后
5. onExit 退出，onStart之后transition会推出state
7. onRetain 保留，onExit之后onRetain会被执行，子state会被优先执行
3. onEnter 进入，在onRetain结束后，transition会进入state
6. onFinish 结束前，这是最后可以取消或者定向transition的方法
4. onError 错误
9. onSuccess 成功
