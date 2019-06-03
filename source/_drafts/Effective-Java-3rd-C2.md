---
title: Effect Java 3rd Edition -- Chapter 2 对象的生成与销毁
tags:
  - null
date: 2019-05-29 10:56:18
---

## Item1 使用静态工厂代替构造体

教科书中说使用构造体来生成类的实体，但实际工作中还有一种方法：使用静态方法返回该类的一个实体。我们可以称之为**静态工厂**

> 注意，书中说这里的静态工厂不同于设计模式中的创建型工厂模式。那么区别在哪里？

### 使用静态工厂的优点

1. 可以自由命名，提高代码的可读性。
2. 可以不生成新的实体，使用现有实体节省空间和时间。
3. 可以返回子类实体。
4. 可以根据参数，改变对象类型。
5. 返回类型的类甚至可以在使用的时候再写。

### 静态工厂的缺点

1. 没有public或者private构造体的无法被继承
2. 静态工厂不如构造体显眼

### 例子

from 
```Java
Date d = Date.from(instant);
```

of
```Java
Set<Rank> faceCards = EnumSet.of(JACK, QUENE, KING);
```

valueOf
```Java
BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
```

instance or getInstance, and newInstance
```Java
StackWalker luke = StackWalker.getInstance(options);

Object newArray = Array.newInstance(classObject, arrayLen);
```

getType, newType and type
```Java
FileStore fs = Files.getFileStore(path);

BufferedReader br = Files.newBufferedReader(path);

List<Complaint> litany = Collections.list(legacyLitany);
```

## Item2 构造体有很多参数时，考虑使用Builder

静态工厂和原始构造体都会面对一个问题：无法根据参数的个数进行动态的变化。当类有很多个属性需要设置时，一般有下面两种方法：

* telescoping constructor 重叠构造器 
  * 为不同的参数类型写不同的构造体
* JavaBeans 
  * 先通过零参构造体获得一个对象，然后使用setter给属性一一赋值

其实还有第三种方法可以考虑：建造者模式.  
先使用类的必要属性获得一个该类的Builder，然后将需要的可选属性赋值给Builder，最后执行Builder的Build方法，获得所需要的对象。  
建造者举例：
```Java
// Builder Pattern
public class NutritionFacts{
  private final int servingSize;
  private final int servings;
  private final int calories;
  private final int fat;
  private final int sodium;
  private final int carbohydrate;

  public static class Builder{
    // Required parameters
    private final int servingSize;
    private final int servings;

    // optional parameters 
    // initialized to default values
    private int calories = 0;
    private int fat = 0;
    private int sodium = 0;
    private int carbohydrate = 0;

    // constructor with required parameters
    public Builder(int servingSize, int servings){
      this.servingSize = servingSize;
      this.servings = servings;
    }

    // methods to add optional paramters
    // return builder instance to make it chained.
    public Builder calories(int val){
      calories = val;
      return this;
    }

    public Builder fat(int val){
      fat = val;
      return this;
    }

    public Builder carbohydrate(int val){
      carbohydrate = val;
      return this;
    }

    public NutritionFacts build(){
      return new NutritionFacts(this);
    }

  }

  // constructor for building
  private NutritionFacts(Builder builder){
    servingSize = builder.servingSize;
    servings = builder.servings;
    calories = builder.calories;
    fat = builder.fat;
    sodium = builder.sodium;
    carbohydrate = builder.carbohydrate;
  }
}
```

使用的时候就是这种效果：
```Java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8)  // 新建一个Builder的instance，构造体包含必要属性   
    .calories(100).sodium(35).carbohydrate(27)    // 对可选属性赋值
    .build();    // 生成目标类的instance
```

###  Builder模式在继承中的使用
首先我们创建一个抽象类Pizza，Pizza内部包含了一个静态的抽象类Builder：
```Java
public abstract class Pizza {
    public enum Topping {HAM, NUSHROOM, ONION, PEPPER, SAUSAGE}

    final Set<Topping> toppings;

    abstract static class Builder<T extends Builder<T>> {
        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
        public T addToping(Topping topping){
            toppings.add(Objects.requireNonNull(topping));
            return self();
        }

        abstract Pizza build();

        // Subclasses must override this method to return "this"
        protected abstract T self();
    }

    Pizza(Builder<?> builder){
        toppings = builder.topping.clone(); //书中说这里参看 item 50 (Make defensive copies when needed) 
    }
}
```

接下来写两个子类：
```Java

public class NyPizza extends Pizza {
    public enum Size{SMALL, MEDIUM, LARGE}
    private final Size size; // 这是NyPizza 独有的属性

    public static class Builder extends Pizza.Builder<Builder> {
        private final Size size;

        // Size 是必要属性，在生成Builder的instance时设置为参数
        public Builder(Size size){
            this.size = Objects.requireNonNull(size);
        }

        @Override
        public NyPizza build(){
            return new NyPizza(this); // 返回的是Nypizza的instance
        }

        @Override
        protected Builder self(){
            return this;
        }
    }

    private NyPizza(Builder builder){
        super(builder);
        size = builder.size;
    }
}

public class Calzone extends Pizza {
    private final boolean sauceInside;

    public static class Builder extends Pizza.Builder<Builder> {
        private boolean sauceInside = false; // Default

        public Builder sauceInside(){
            sauceInside = true;
            return this;
        }

        @Override
        public Calzone build(){
            return new Calzone(this);
        }

        @Override
        protected Builder self(){
            return this;
        }
    }

    private Calzone(Builder builder){
        super(builder);
        sauceInside = builder.sauceInside;
    }
}
```

> **covariant return type**   
> 
> 协变返回值类型，指子类成员函数的返回值类型不必完全等同于重写的父类中的函数返回值类型，可以是更（狭窄）的类型

在使用的时候，两个子类可以使用自己的Builder来建造instance：
```Java
NyPizza pizza = new NyPizza.Builder(SMALL)
    .addTopping(SAUSAGE).addTopping(ONION).build();
Calzone calzone = new Calzone.Builder()
    .addTopping(HAM).sauceInside().build();
```

Builder模式的一个优点是对属性的赋值可以自由设置，反复利用。比如需要生成一串序列号不同的对象的时候。  

Builder模式最大的缺点就是使用的时候你必须额外穿件一个Builder对象，虽然微乎其微，但也是有时间和空间开销的。所以最好是在类有足够多（一只手数不过来的时候*此处不许用二进制来数）的属性，或者将来很有可能会添加很多的属性时，采用Builder模式来创建对象实体。


