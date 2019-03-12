---
title: localization - tests
date: 2019-03-07 14:55:39
tags:
    - Java
    - OCP Java SE8
categories: 
    - OCP Java SE8
---

## 例题
内容翻译自《OCA / OCP Java SE 8 Programmer Practice Tests》
  

#### 不是 `locale` 的选项是:
1. Cultural region
2. Geographical region
3. Policical region
4. Time zone region

#### 会根据程序运行的 `locale` 不同而进行本地化改变的是：
1. Currencies
2. Dates
3. Both
4. Neither

#### 如何获取一个程序运行时的 `locale` 信息：
1. `Locale.get("default")`
2. `Locale.get(Locale.DEFAULT)`
3. `Locale.getDefault()`
4. None of the above

#### 在一个程序里，所有的城镇名都被保存在了`strings.properties`文件中，这一操作最合适的名称是：
1. Internationalization
2. Localization
3. Specialization
4. Translation

#### `Properties` 实现了以下哪个接口:
1. `Map`
2. `HashTable` `HashMap`
3. `HashTable` `Map`
4. `HashMap` `Map`

#### 什么扩展名的文件可以作为保存`String`变量的资源包:
1. `.java`
2. `.properties`
3. Both of the above
4. Neither of the above

#### `Locale.setDefault()`的时效会持续到什么时候（假设没有别的方法使用`Locale.setDefault()`):
1. 到方法结束
2. 到程序结束
3. 到电脑重启
4. 不会结束

#### 下面代码的输出是：

```
# Properties
mystery=bag
type=paper
```
```Java
18：    System.out.print(props.getProperty("mystery"));
19：    System.out.print(" ");
20：    System.out.print(props.getProperty("more"));
```

1. `bag`
2. `bag null`
3. `bag ?`
4. 代码的第20行会抛出 `RuntimeException`

#### 补全下面获取资源包的代码:
```Java
public class Flights_en extends ____ {
    protected Object[][] ____ {
        return new Object[0][0];
    }
}
```

1. `JavaResourceBundle, getContents`
2. `JavaResourceBundle, getProperties`
3. `ListResourceBundle, getContents`
4. `ListResourceBundle, getProperties`

#### 下面表示印度和印地语的 有效`locale`格式是：

1. hi_IN
2. HI_in
3. in_HI
4. IN_hi

#### 下面Java代码中的`purple`会使用哪个资源文件的值：
```Java
Locale.setDefault(new Locale("en", "US"));
ResourceBundle rb = ResourceBUndle.getBundle("Colors");
rb.getString("purple");
```

1. `Colors.class`
2. `Colors.properties`
3. `Colors_en_US.class`
4. `Colors_en_US.properties`

#### 下面Java代码的输出结果是：

```Java
package counter;
import java.util.*;
public class CountResource extends ListResourceBundle {
    private int count = 0;@
    Override protected Object[][] getContents() {
        return new Object[][] {
            {
                "count", count++
            }
        };
    }
    public static void main(String[] args) {
        ResourceBundle rb = ResourceBundle.getBundle("counter.CountResource");
        System.out.println(rb.getObject("count") + " " + rb.getObject("count"));
    }
}
```


