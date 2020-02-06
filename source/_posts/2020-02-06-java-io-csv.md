---
title: 使用Java读写CSV文件
tags:
  - Java
  - CSV
date: 2020-02-06 10:04:09
---

最近针对一个Issue，需要给excel文件的读写功能增加CSV的支持，本来以为使用类似的方法可以直接写到DTO里面，结果一查，Java好像对CSV的支持还是最原始最基本的写法（并非贬义，可能是容易了反而不需要什么工具来读写CSV）。

总结成一句话就是，读写CSV就相当于读写一个纯字符串文件。

## 读取CSV  

读取CSV文件大致分为以下几步：
1. 使用`FileInputStream`读取csv文件
2. 使用`BufferedReader`来对输入流进行更高效的处理
3. 将每一行的数据作为字符串读取，使用`split(",")`分割

```Java
// 字符编码 设置下没坏处
Charset charset = StandardCharsets.UTF_8;
// 缓存大小 提高读取效率 
int bufferSize = 5 * 1024 * 1024;
try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(new FileInputStream("input/sample.csv"), charset), bufferSize)) {
    String line;
    List<String[]> data = new ArrayList<>();
    // 这里假设文件不是很大，不然这么些内存是不够用的
    while (Objects.nonNull(line = reader.readLine())) {
        data.add(line.split(","));
    }

    // 然后 想怎么用就怎么用了
} catch (IOException e) {
    // IOException 就囊括了读取文件可能发生的全部意外
    e.printStackTrace();
}
```

## 写CSV  

跟上面读取CSV的操作正好反过来，写CSV文件分为以下几步:
1. 使用`FileOutputStream`输出文件
2. 将要输出的一行数据使用指定的符号（csv一般是逗号）连接成字符串
3. 输出到文件，使用`BufferedWriter.write()`的话记得换行
  
```Java
// 文件路径和文件名
String file = "output/output.csv";
// 指定字符编码
Charset charset = StandardCharsets.UTF_8;
// 指定缓存
int bufferSize = 5 * 1024 * 1024;
try (BufferedWriter writer = new BufferedWriter(
        new OutputStreamWriter(new FileOutputStream(file), charset), bufferSize
)) {
    for (String[] datum : data) {
        writer.write(String.join(",", datum));
        // 换行
        writer.newLine();
    }
} catch (IOException e) {
    e.printStackTrace();
}
```
