---
title: Concurrency - Java的并发编程
tags:
  - null
date: 2019-08-05 10:30:11
---

## 什么是Concurrency
Concurrency的意思是并发性，或者并行性（日语），顾名思义指的是同时处理不同的任务。
并发编程并不针对多核CPU，即使只有一个CPU，也可以通过分时段的线程切换来实现多个线程的并发执行。

## Java的基本多线程写法
首先是线程的最基本写法。Java中有两种最基本的线程编写方法：
1. 继承Thread类，在`run()`中书写程序内容，使用`start()`来启动线程。
```Java
public class Sample{
    public static void main(String... args) {
        ThreadA a = new ThreadA();
        ThreadB b = new ThreadB();

        a.start();
        b.start();
    }
}

class ThreadA extends Thread {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.print("A " + i);
        }
    }
}

class ThreadB extends Thread {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.print("B" + i);
        }
    }
}

```

2. 实现Runnable接口。`Thread`的构造体可以接受一个Runnable的参数，所以我们也可以通过写一个实现了Runnable接口的类来生成线程。
```Java
  public class Sample {
    public static void main(String[] args) {
        ThreadA A = new ThreadA();
        ThreadB B = new ThreadB();

        Thread a = new Thread(A);
        Thread b = new Thread(B);

        a.start();
        b.start();
    }
}

class ThreadA implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("A " + i);
        }
    }
}

class ThreadB implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(" B " + i);
        }
    }
}
```
**Runnable的一个好处是可以使用Lambda表达式来定义**
```Java
Thread c = new Thread(() -> {
    for (int i = 0; i < 10; i++) {
        System.out.println("C " + i);
    }
});
c.start();
```

### 线程的状态和优先级
`java.lang`的列举型Thread.State中定义了6中线程状态：
```Java
/**
	 * A Thread which has not yet started.
	 */
	NEW,
	/**
	 * A Thread which is running or suspended.
	 */
	RUNNABLE,
	/**
	 * A Thread which is blocked on a monitor.
	 */
	BLOCKED, 
	/**
	 * A Thread which is waiting with no timeout.
	 */
	WAITING,
	/**
	 * A Thread which is waiting with a timeout.
	 */
	TIMED_WAITING, 
	/**
	 * A thread which is no longer alive.
	 */
	TERMINATED
```

一个线程只能由`start()`启动一次，多次启动会产生`IllegalThreadStateException`

在Thread类中定义了三个优先级常数：
```Java
	/**
	 * The maximum priority value for a Thread.
	 */
	public final static int MAX_PRIORITY = 10;		// Maximum allowed priority for a thread
	/**
	 * The minimum priority value for a Thread.
	 */
	public final static int MIN_PRIORITY = 1;			// Minimum allowed priority for a thread
	/**
	 * The default priority value for a Thread.
	 */
	public final static int NORM_PRIORITY = 5;		// Normal priority for a thread
```
线程的优先级可以通过`priority`的getter和setter来设置和确认，当两个进行中的线程发生冲突时，一般优先级高的线程会先运行，但这并不等于说优先级高的线程一定会被优先启动。系统在启动线程的时候并不看优先级的高低。
### Thread类
Thread类提供了各种用来控制线程启动，暂停，再开，终止的方法，这里记录以下两个点的理解：
1. InterruptedException. 当线程进入待机或者睡眠等状态时，就需要针对InterruptedException写一个try-catch，简单理解就是被人吵醒的认识应该怎么办。
2. sleep可以设置一定的时间，但并不等于时间到了线程就会停止挂起，继续运行。sleep只是线程在不被interrupt的情况下最短的睡眠时长，时间到了之后，也要视系统的资源分配情况来决定什么时候继续运行。

<!-- ### Runnable 和 Callable -->

### 并发集合

## 高效的线程管理

### 执行器

### 线程池

#### 线程池的四种 BlockedQueue

## 多线程中的问题

### 内存释放 shutdown 和 shutdownNow

### InterruptException

### 使用TimeUnit

### 