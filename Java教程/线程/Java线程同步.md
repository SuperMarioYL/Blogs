# Java线程同步

&emsp;在之前的文章《Java的Thread类的两种实现方式的区别》中，我们发现，通过实现Runnable接口创建的线程可能会出现被共享的资源，被多个线程同时操作，并导致数据不准确的现象，那我们怎么去保护我们的敏感数据的，必须让共享的数据在一个特定的操作时间内只能由一个线程来进行操作，这，便是线程同步的概念。

&emsp;首先来看一下不同步时的代码：
```
    //Bank
    public class Bank {
        private int money = 0;

        public void addMoney(int m) {
            money += m;
        }

        public void subMoney(int m) {
            money -= m;
        }

        public void getmoney() {
            System.out.println("Money：" + money);
        }
    }

    //实现runnable接口的类
    public class SynchronizeRunnable implements Runnable {

        private Bank bank=new Bank();

        @Override
        public void run(){
            for (int i = 0; i <1000 ; i++) {
                bank.addMoney(1);
            }
            bank.getmoney();
        }
    }

    //执行方法
    public  void  threadone() throws Exception{
        Runnable runnable= new SynchronizeRunnable();
        Thread thread1=new Thread(runnable);
        Thread thread2=new Thread(runnable);
        thread1.start();
        thread2.start();
    }

```
执行结果如下：
```
Money：1798
Money：1798
```
可以看到，由两个线程同时来进行加钱的操作，每个线程都加1000块，那么理论值是2000，而结果却是1798，这便是多个线程同时操作一个资源的结果，必须要对关键资源进行线程同步，才可以保护我们的数据。

---

本文介绍三种方法来实现线程同步。在了解线程同步的方法之前我们要提前了解一下**synchronized**关键字，使用了synchronized，就可以对特定的资源、方法等添加同步锁。

## 1.使用同步代码块
事实上我们看到，加钱的操作，核心知识这一行代码：
```
money += m;
```
我们只需要让这一行代码线程同步即可，修改后的Bank类如下：
```
public class Bank {
    private int money = 0;

    public void addMoney(int m) {
        synchronized (this){
            money += m;
        }
    }

    public void subMoney(int m) {
        money -= m;
    }

    public void getmoney() {
        System.out.println("Money：" + money);
    }
}
```
运行结果如下：
```
Money：2000
Money：2000
```
synchronized关键字会锁定括号里的资源。

## 2.使用同步方法
除了同步代码块以外，我们还可以对方法使用synchronized关键字来进行修饰，意味着同一时间只有一个线程可以执行此方法。修改后的Bank类如下:
```
public class Bank {
    private int money = 0;

    public synchronized void addMoney(int m) {
        money += m;
    }

    public void subMoney(int m) {
        money -= m;
    }

    public void getmoney() {
        System.out.println("Money：" + money);
    }
}
```
结果如下：
```
Money：2000
Money：2000
```
同步方法在执行时会锁定整个对象。

### 注：由于同步是一个高开销的工作，会极大浪费CPU资源，所以要尽量减少同步的内容，一般能同步代码块的时候没必要同步整个类。

### 注：synchronized还可以修饰静态方法，在修饰静态方法时，只要方法被同步，整个类都会被锁定。

## 3.使用重入锁实现线程同步
&emsp;synchronized关键字在实际业务中有时会满足不了复杂的业务逻辑，所以在java5中引入了java.util.concurrent包来辅助线程同步问题。ReentrantLock()是一种可重入、互斥、实现了lock接口的锁，可以用它来实现线程同步。

&emsp;ReenTrantLock类有标准的使用规范：
```
    //首先实例化
    private Lock lock= new ReentrantLock();

    //锁定后要紧跟Try方法，并且在finally第一行解锁
    //try语句块内写需要线程同步的代码块
    public void addMoney(int m) {
        lock.lock();
        try {
            money += m;
        }finally {
            lock.unlock();
        }
    }
```

Bank代码如下：
```
public class Bank {
    private int money = 0;

    private Lock lock= new ReentrantLock();

    public void addMoney(int m) {
        lock.lock();
        try {
            money += m;
        }finally {
            lock.unlock();
        }
    }

    public void subMoney(int m) {
        money -= m;
    }

    public void getmoney() {
        System.out.println("Money：" + money);
    }
}
```

执行结果如下：
```
Money：2000
Money：2000
```

### 注：一般为了代码的简洁能用synchronized实现的功能就不用ReentrantLock

---

## 反思
&emsp;线程同步解决了多个线程争抢操作同一个资源时的数据错误，通过锁定一部分资源，其他的线程要操作时必须要等正在操作的线程执行完释放代码块才可以操作，那有没有可能两个线程都在等待对方释放资源呢？这便是线程死锁。