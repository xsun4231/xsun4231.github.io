---
title: InjectMocksのインジェクト方法
tags:
  - null
date: 2021-08-04 11:10:32
---

テスト対象のインスタンスに `@InjectMocks`をつけると、対象インスタンスのフィルドに`@Mock`されたインスタンスを差し込むことができる。

```java
    @InjectMocks
    Manager manager;

    @Mock
    Name name; // manager.nameはモックされる
```

## 実現方法
`InjectMocks`のJavadocを読むと、フィルドのinject方法は3つあります。  

1. Constructor injection;   
1つ目はコンストラクターを利用してモックインスタンスを設定する。この方法はデフォルトで引数の数が一番多いコンストラクターを利用する。
要注意なことは、必要なモックインスタンスが見つからない場合、その引数は`null`となる。  
引数にモックできないタイプ（基本型）がある場合、デフォルトのコンストラクターで`InjectMocks`のインスタンスを作って別の方法でInjectを実現する。

2. Property setter injection; 
2つ目はとてもわかりやすくて、フィルドの`setter`メソッドを利用して、モックインスタンスを差し込む。
該当の`setter`メソッドを探すとき、まずフィルドのタイプを利用する。同じタイプのフィルドが存在する場合、モックインスタンスの名前を利用する。  
という理由で、モックインスタンスを定義するとき、できる限り`Inject`対象のフィルドと同じ名前にする方がいい。  
`Constructor Injection`でデフォルトコンストラクターを利用する場合、モックインスタンスの差し込むはこの方法で実現される。


3. Field injection; 
フィルドの`setter`がない場合、直接設定で`Inject`を実現する。ルールは`Property setter injection`と同じ。

