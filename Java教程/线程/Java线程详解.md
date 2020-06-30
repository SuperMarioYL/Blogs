# Java线程详解
&emsp;Java的多线程一直是初学者的难点，本文记录一下我自己踩坑的得到的一些心得体会。
## 1.什么是线程？和进程有什么区别？
&emsp;在现代操作系统中，通常会运行多个应用程序，这一个个的应用程序，在计算机眼里，就是一个个的进程，每个进程都会占有一部分内存空间和CPU执行时间。进程就是一段CPU的执行流程，这段流程中可以运行多个线程，即一个进程可包括多个线程。

---
## 2.Java的线程实例化
&emsp;Java中的线程指的是通过Thread()类及其子类实例化来运行的线程。可以通过2种方式来实例化线程。
- a.通过继承Thread()类来实现
  
代码如下：
```
    public class MyThread extends Thread {
        private String name;

        public MyThread(String name){
            this.name=name;
        }

        @Override
        public void run(){
            for (int i = 0; i <5 ; i++) {
                System.out.println("MyThread"+name+":"+i);
            }
        }
    }
    public  void  threadone(){
        MyThread myThread=new MyThread("我的线程");
        myThread.start();
    }
```
结果如下：
```
MyThread我的线程:0
MyThread我的线程:1
MyThread我的线程:2
MyThread我的线程:3
MyThread我的线程:4
```
- b.通过实现Runnable接口进行实例化

代码如下：
```
    public class MyRunnable implements Runnable{
        String name;

        public MyRunnable(String name){
            this.name=name;
        }

        @Override
        public void run(){
            for (int i = 0; i <5 ; i++) {
                System.out.println("MyRunnable"+name+":"+i);
            }
        }
    }
    public  void  threadone(){
        Thread thread=new Thread(myRunnable);
        thread.start();
    }
```
结果如下：
```
MyRunnableRunnable:0
MyRunnableRunnable:1
MyRunnableRunnable:2
MyRunnableRunnable:3
MyRunnableRunnable:4
```
&emsp;本质上其实都是通过重写run()方法来实现的，但是实现Runnable接口有一个好处就是可以跳开单继承的限制。

&emsp;事实上run()方法和start()方法都可以把我们重写的run()方法执行，那为什么要有2个方法呢？

---
## 3.线程的状态
&emsp;在讲解run()和start()方法之前有必要了解一下线程的几个状态，看一下源码
```
public enum State {
        /**
         * Thread state for a thread which has not yet started.
         * （线程尚未启动）
         */
        NEW,

        /**
         * Thread state for a runnable thread.  A thread in the runnable
         * state is executing in the Java virtual machine but it may
         * be waiting for other resources from the operating system
         * such as processor.
         *（线程处于可运行的状态。可运行状态的线程既有可能已经在JVM中执行，也有可能在* 等待操作系统的资源）
         */
        RUNNABLE,

        /**
         * Thread state for a thread blocked waiting for a monitor lock.
         * A thread in the blocked state is waiting for a monitor lock
         * to enter a synchronized block/method or
         * reenter a synchronized block/method after calling
         * {@link Object#wait() Object.wait}.
         *（阻塞状态，线程被锁定时的状态）
         */
        BLOCKED,

        /**
         * Thread state for a waiting thread.
         * A thread is in the waiting state due to calling one of the
         * following methods:
         * <ul>
         *   <li>{@link Object#wait() Object.wait} with no timeout</li>
         *   <li>{@link #join() Thread.join} with no timeout</li>
         *   <li>{@link LockSupport#park() LockSupport.park}</li>
         * </ul>
         *
         * <p>A thread in the waiting state is waiting for another thread to
         * perform a particular action.
         *
         * For example, a thread that has called <tt>Object.wait()</tt>
         * on an object is waiting for another thread to call
         * <tt>Object.notify()</tt> or <tt>Object.notifyAll()</tt> on
         * that object. A thread that has called <tt>Thread.join()</tt>
         * is waiting for a specified thread to terminate.
         *
         *(等待状态，一个线程在等待另一个线程操作时的状态，排除有等待时间的状况)
         *
         */
        WAITING,

        /**
         * Thread state for a waiting thread with a specified waiting time.
         * A thread is in the timed waiting state due to calling one of
         * the following methods with a specified positive waiting time:
         * <ul>
         *   <li>{@link #sleep Thread.sleep}</li>
         *   <li>{@link Object#wait(long) Object.wait} with timeout</li>
         *   <li>{@link #join(long) Thread.join} with timeout</li>
         *   <li>{@link LockSupport#parkNanos LockSupport.parkNanos}</li>
         *   <li>{@link LockSupport#parkUntil LockSupport.parkUntil}</li>
         * </ul>
         *（有等待时间的等待状态）
         *
         */
        TIMED_WAITING,

        /**
         * Thread state for a terminated thread.
         * The thread has completed execution.
         * （线程已经执行完成的状态）
         */
        TERMINATED;
    }
```
一个线程有这6种状态，一个简单线程差不多是:

[实例化线程(NEW)]->[执行线程(Runnable)]->[线程执行完毕(TERMINATED)]

---
## 4.run()与start()的区别
&emsp;run()与start()的区别就是执行时是否是在自己实例化的线程执行的，即是否是新创建了个线程执行重写的run()方法，我们来看一下区别：

- start()执行如下
```
代码：
    public class MyThread extends Thread {
        private String name;

        public MyThread(String name){
            this.name=name;
        }

        @Override
        public void run(){
            System.out.println("运行时线程状态："+this.getState());
            for (int i = 0; i <5 ; i++) {
                System.out.println("MyThread"+name+":"+i);
            }
        }
    }
    public  void  threadone(){
        MyThread myThread=new MyThread("我的线程");
        try {
            System.out.println("创建时线程状态："+myThread.getState());
            myThread.start();
            //等待10毫秒等线程执行结束
            Thread.sleep(10);
            System.out.println("线程运行结束后线程状态："+myThread.getState());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
结果：
    创建时线程状态：NEW
    运行时线程状态：RUNNABLE
    MyThread我的线程:0
    MyThread我的线程:1
    MyThread我的线程:2
    MyThread我的线程:3
    MyThread我的线程:4
    线程运行结束后线程状态：TERMINATED
```
我们可以看到，线程创建之后，在start()方法下，主线程与mythread()线程并行执行，运行时线程状态在主线程执行的是比创建线程快的，创建的线程在执行时状态变为可运行状态(RUNNABLE),执行结束后就变成了TERMINATED。

- run()执行如下
```
代码：
    public class MyThread extends Thread {
        private String name;

        public MyThread(String name){
            this.name=name;
        }

        @Override
        public void run(){
            System.out.println("运行时线程状态："+this.getState());
            for (int i = 0; i <5 ; i++) {
                System.out.println("MyThread"+name+":"+i);
            }
        }
    }
    public  void  threadone(){
        MyThread myThread=new MyThread("我的线程");
        try {
            System.out.println("创建时线程状态："+myThread.getState());
            myThread.run();
            //等待10毫秒等线程执行结束
            Thread.sleep(10);
            System.out.println("线程运行结束后线程状态："+myThread.getState());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
结果：
    创建时线程状态：NEW
    运行时线程状态：NEW
    MyThread我的线程:0
    MyThread我的线程:1
    MyThread我的线程:2
    MyThread我的线程:3
    MyThread我的线程:4
    线程运行结束后线程状态：NEW
```
可以看到，run()方法执行线程从头到尾线程都是new状态，即我们创建的线程从来没有执行过，run()方法是在主线程执行的，与其他的方法没有什么不同。

到这里我们也就明白了，start()方法与run()方法的区别就是start()方法是在创建的线程里执行的，而run()则是在主线程里执行的。

---
## 5.Thread()类方法解析
- start()方法
&emsp;start()方法是线程的启动方法，会使线程进入运行状态并执行run()方法。
```
    /**
     * Causes this thread to begin execution; the Java Virtual Machine
     * calls the <code>run</code> method of this thread.
     * 线程由此开始；虚拟机调用run()方法
     */
    public synchronized void start()
```

- Thread.sleep()方法
&emsp;静态方法，不能通过对象调用。Thread().sleep(x)可以使线程休眠x毫秒。
```
    public static native void sleep(long millis) throws InterruptedException;
```
- Thread.currentThread()
&emsp;返回一个当前正在执行的线程引用
```
    /**
     * Returns a reference to the currently executing thread object.
     *
     * @return  the currently executing thread.
     */
    public static native Thread currentThread();
```
- Thread.yield()
&emsp;Thread.yield()让出一段时间的CPU资源，俗称线程礼让，与sleep()的区别主要是

    - sleep()方法会使线程进入中断状态并且抛出异常，必须要捕获异常并对其进行处理
    - yield()方法会一直使线程处于就绪状态
    - sleep()方法具有更好的可移植性，一般采取sleep()
  
```
    /**
     * A hint to the scheduler that the current thread is willing to yield
     * its current use of a processor. The scheduler is free to ignore this
     * hint.
     */
    public static native void yield();
```
- setPriority(int) 
&emsp;设置线程的优先级，优先级取1-10以内的数值，数值越大代表优先级越高。
    
    - 优先级高并不意味着会独占CPU资源，只是获得资源的概率更大一些。
    - 每个子线程都会继承父线程的优先级，没有父线程的线程的初始优先级为NORM_PRIORITY=5。
    - thread有内置的三个优先级MAX_PRIORITY、NORM_PRIORITY、MIN_PRIORITY，由于优先级的数值在不同的jvm上有可能不同，所以尽可能用内置的优先级。

```
    /**
     * The minimum priority that a thread can have.
     */
    public final static int MIN_PRIORITY = 1;

   /**
     * The default priority that is assigned to a thread.
     */
    public final static int NORM_PRIORITY = 5;

    /**
     * The maximum priority that a thread can have.
     */
    public final static int MAX_PRIORITY = 10;

    public final void setPriority(int newPriority)
```

## 6.如何结束线程
&emsp;Thread.stop()等方法由于不安全已经被废弃了，目前，想使一个线程结束的话，最好是等待run方法执行结束。

---
## 总结
&emsp;这就是我对于java线程的一些理解，希望可以帮助到大家。































