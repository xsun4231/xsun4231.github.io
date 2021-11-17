---
title: Vue.js プロジェクトの構造
tags:
  - null
date: 2021-11-12 20:55:02
---
Vue.jsプロジェクトファイルの構造とVueファイルの構造をメモする。

## Vue.jsプロジェクトの構造

* src
  * components: 各モジュールはここで定義する
  * main.js: 入り口のjs
  * router 
    * index.js: ルーター設定
  * App.vue 
  * assets: 画像などのリソース
* index.html: 画面入り口
* static: 静的リソース
* test
* config
  * index.js: 各種設定
* build
* package.json
* node_modules


## Vueファイルの構造

Vueファイルは以下３つの部分がある。

[1]HTML
```HTML
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
```

[2]JavaScript
```js
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

[3]css
```css
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
