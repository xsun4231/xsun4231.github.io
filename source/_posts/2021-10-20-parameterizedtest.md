---
title: JUnit5から使える @ParameterizedTest
tags:
  - null
date: 2021-10-20 17:00:16
---


`@ParameterizedTest`は指定のテストメソッドに違う引数を順番に渡して処理することで、複数のテストを実現する方法。  
JUnit5の新しい機能として、使うとき以下のパッケージを依存関係に追加する必要がある。
```
org.junit.jupiter:junit-jupiter-params
```

## 使ってみる
`@ParameterizedTest`でパラメーター指定のテストケースを声明する。そして`@ValueSource`を利用してパラメーターを指定する（整数:1,2,3）。


```java
    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3})
    void test(int i) {
        System.out.println(i);
    }
```

これで１つのメソッドでテストを3回実行した。  
`@ParameterizedTest`は`org.junit.jupiter.params.provider`パッケージ下のインタフェースと一緒に使う必要がある。

## DisplayName of ParameterizedTest
`@ParameterizedTest`はパラメーターごとにテストケースを命名できる。

```java
    @ParameterizedTest(name = "input is {0} {1} {2}")
    @CsvSource(value = {"1,a,true"})
    void test(int a, String b, boolean c) {

    }

```

使えるplaceholderは以下となる。
* `{index}` テストケースの番号
* `{0~n}` 指定番号の引数の値（0から）
* `{arguments}` 全ても引数
* `{displayName}` `@DisplayName`で指定する内容、`@DisplayName`がない場合はテストメソッドの名前