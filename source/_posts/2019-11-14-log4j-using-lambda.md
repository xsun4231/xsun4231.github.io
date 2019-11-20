---
title: Log4j 节能写法
tags:
  - Lambda
date: 2019-11-14 17:06:39
---

## 尽量使用Supplier<> 来生成log

比如debug，我们可以使用下面三种方法
```Java
    /**
     * Logs a message object with the {@link Level#DEBUG DEBUG} level.
     *
     * @param message the message string to log.
     */
    void debug(String message);

    /**
     * Logs a message with parameters at the {@link Level#DEBUG DEBUG} level.
     *
     * @param message the message to log; the format depends on the message factory.
     * @param params parameters to the message.
     * @see #getMessageFactory()
     */
    void debug(String message, Object... params);

    /**
     * Logs a message with parameters which are only to be constructed if the logging level is the {@link Level#DEBUG
     * DEBUG} level.
     *
     * @param message the message to log; the format depends on the message factory.
     * @param paramSuppliers An array of functions, which when called, produce the desired log message parameters.
     * @since 2.4
     */
    void debug(String message, Supplier<?>... paramSuppliers);

```

### 第一种：直接输出信息。
最不环保的写法，甚至新手的话可能会出现`logger.debug("A is " + a + ", B is" + b + ".");`这种写法，首先使用`+`来生成log文本是非常耗时的，其次，无论log输出的级别是否低于debug，这段字符串的处理都会被执行。

### 第二种：使用MessageFactory和参数生成log
OpenJDK 8之前这么写是没问题的，使用MessageFactory来生成log既增加了可读性，又比字符串连接要节能。不过问题是log的生成还是总需要被执行。

### 第三种：使用Lambda
doc中写了:`only to be constructed if the logging level is the DEBUG level.`，还需要解释吗？

### 那么，当需要把objectA写到debug里时
```Java
logger.debug(objectA.toString()); // 一般写法

logger.debug(() -> objectA.toString()); // 略动脑筋的写法

logger.debug(objectA::toString); //文艺写法
```
