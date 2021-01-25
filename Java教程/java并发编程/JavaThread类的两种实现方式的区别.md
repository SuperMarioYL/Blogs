# Java的Thread类的两种实现方式的区别

&emsp;在之前的文章中，我介绍过要创建thread对象可以通过继承Thread和实现Runnable接口两种方式来实现，但是这两种方式是由本质的区别的，具体的区别我们一起来看一下。

## 1.通过继承Thread实现
代码如下：
```
    //Bank类
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

    //Thread子类
    public class MyThread extends Thread {

        private Bank bank=new Bank();

        @Override
        public void run(){
            for (int i = 0; i <10 ; i++) {
                bank.addMoney(1);
            }
            bank.getmoney();
        }
    }

    //执行的方法
    public  void  threadone() throws Exception{
        Thread thread3=new MyThread();
        Thread thread4=new MyThread();
        thread3.start();
        thread4.start();
    }    
```
运行结果如下：

```
    Money：10
    Money：10
```
由此我们可以看到，通过继承创建的线程对象，他们虽然执行的是一个类的方法，但资源却是互相独立的，相当于创建N个任务由N个线程来执行。

---

## 2.通过实现Runnable接口来实现
代码如下：
```
    //Bank类
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

    //实现Runnable接口类
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
运行结果如下：
```
Money：1581
Money：1581
```
通过结果和代码，我们不难看出，thread1和thread2线程，执行的都是runnable对象的run方法，操作的资源都是runnable的资源，即通过实现Runnable接口的方式创建的线程，他们的资源是共享的，完成的是同一个任务，即N个线程执行1个任务。

**注：一般来讲，除非打算修改或增强类的基本行为，否则不建议创建子类，实现Runnable接口更符合面向对象的编程理念。**
---
## 3.思考

&emsp;可是，按照代码来看，一个线程加1000块钱，综合应该是2000才对，怎么是1581呢？由于两个线程共同操作一个资源，两个线程在money为X时先后获取了money的值，然后分别对其进行+1操作，这时，他们的结果都为X+1,就这样，2个线程的操作实际只有1个线程的生效了。这种多个线程对同一个共享资源的操作如果不加限制是十分可怕的，想一想你的银行卡余额，对吧，这就需要我们对敏感资源的多线程操作加以保护，这便是线程同步的概念。