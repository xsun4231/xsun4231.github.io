---
title: Concurrency - Java的并发编程
tags:
  - 未填之坑
date: 2019-08-05 10:30:11
---
Concurrency的意思是并发性，或者并行性（日语），顾名思义指的是同时处理不同的任务。并发编程的核心线程，可以简单地理解成RTS游戏里的“工人“单位:一个工人同一时间只能执行一个建造任务，增加工人可以增加建造序列的数量，也可以通过给工人切换建造任务来**看起来**增加建造序列，而这里的微操，全都是由系统来控制的。
所以，并发编程并不针对多核CPU，即使只有一个CPU，也可以通过分时段的线程切换来实现多个线程的并发执行。

## Java的基本多线程写法
首先是线程的最基本写法。Java中有两种最基本的线程编写方法：
1. 继承Thread类，在`run()`中书写程序内容，使用`start()`来启动线程。
```Java
public class Sample{
    public static void main(String... args) {
        WorkerA a = new WorkerA();
        WorkerB b = new WorkerB();
        // 这里我们有两个工人，可以同时启动两个建造任务了
        a.start();
        b.start();
    }
}

class WorkerA extends Thread {
    /**
    * 在run里写上具体要给这个工人分配的任务
    */
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.print("Yes, my lord. " + i);
        }
        System.out.println("Building cpmolete.");
    }
}

class WorkerB extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.print("了解。" + i);
        }
        System.out.println("任務完了。");
    }
}

```

2. 实现Runnable接口。`Thread`的构造体可以接受一个Runnable的参数，所以我们也可以通过写一个实现了Runnable接口的类来生成线程。虽然也是在run方法中写所要执行的任务，但是实现Runnable的类是作为生成线程的参数来使用，所以我们可以理解为创建了一类工作，然后以该工作为参数创建(灵魂召唤)多个工人来执行。
```Java
  public class Sample {
    public static void main(String[] args) {
        // 我们创建了两个同样的工人，会执行同一种建造任务，比如都去造房子（卡人口不可取）
        Work work = new Work();

        Thread workerA = new Thread(work);
        Thread workerB = new Thread(work);

        workerA.start();
        workerB.start();
    }
}

class Work implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.print("Yes, my lord. " + i);
        }
        System.out.println("Building cpmolete.");
    }
}

```
**Runnable也可以使用Lambda表达式来定义**，这样我们就可以直接写run方法的内容而不用去定义一整个类了。
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
1. InterruptedException. 当线程进入待机或者睡眠等状态时，就需要针对InterruptedException写一个try-catch，简单理解就是被人吵醒时应该怎么办。
2. sleep可以设置一定的时间，但并不等于时间到了线程就会停止挂起，继续运行。sleep只是线程在不被interrupt的情况下最短的睡眠时长，时间到了之后，也要视系统的资源分配情况来决定什么时候继续运行。

### 同步与排他
并发编程一个很常见的问题就是不同线程对同一资源的读写控制，这里就要提到两个很基本的概念，同步和排他（锁）。  
排他锁比较好理解，就是通过关键字或者方法来指定某一部分同一时间只能被一个线程使用，被调用时这部分资源会被锁定，其他想要使用该资源的线程则会被挂起，知道资源解锁，轮班使用。
`synchronized`是用来指定锁定资源的关键字，可以用来修饰方法，也可以用来指定代码块。
```Java
public synchronized void add(int a){...}

// 或者
public void add(int a){
    synchronized(想要锁定的对象){
        //指定的对象在这段代码运行过程中被上锁
    }
}
```
  
同步则是指使用wait(),notify(),notifyAll()等方法，具体的控制线程的运行。  
wait()可以指定也可以不指定超时的值，wait可以让线程进入等待，直到等待超时或者其他的线程使用了notify(),notifyAll()或者interrupt()方法，使等待的线程进入可执行的状态。  
notify()会随机让一个等待的线程再开，notifyAll()则是让所有该对象的线程再开。
wait(),notify(),notifyAll()都是用来控制线程访问被锁资源的，所以如果没有synchronized锁定资源，这些方法的会抛出`IllegalMonitorStateException`  

排他锁无法避免会出现不同的线程锁定不同的资源大家都干不了活儿的局面，这就是死锁；或者因为要使用的资源不断被其他线程占用而导致某一线程进展缓慢，这叫活锁。  
死锁和活锁都不会在编译或者运行时报错，所以要留意设置超时，一定时间后手动解锁资源。等待资源访问时线程会处于`饥饿`的状态，饥饿的线程越多，则说明程序效率越低。为了减少饥饿，资源的调用顺序，锁定的粒度都需要好好思考。

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