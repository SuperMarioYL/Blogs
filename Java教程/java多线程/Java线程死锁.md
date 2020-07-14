# Java线程死锁
&emsp;在上一篇《java线程同步》中，我们思考了一个问题，那就是当多个线程在都在等待其他线程释放共享资源时，所有的线程都就不能继续下去了，这在java运行过程中是一种很严重的问题，俗称java死锁。

下面是2个线程的死锁代码：
```
    //同步类
    public class DeadLock {
        private String str1 ="1";
        private String str2="2";

        public void method1(){
            synchronized (str1){
                System.out.println("线程"+str1+"正在执行");
                try {
                    Thread.sleep(1000);
                }catch (InterruptedException e){
                    e.printStackTrace();
                }
                synchronized (str2){
                    System.out.println("线程运行结束");
                }
            }
        }

        public void method2(){
            synchronized (str2){
                System.out.println("线程"+str2+"正在执行");
                try {
                    Thread.sleep(1000);
                }catch (InterruptedException e){
                    e.printStackTrace();
                }
                synchronized (str1){
                    System.out.println("线程运行结束");
                }
            }
        }

    }

    //实现的runnable类
    public class SynchronizeRunnable implements Runnable {

        private DeadLock deadLock=new DeadLock();

        public void method(){
            deadLock.method2();
        }

        @Override
        public void run(){
            deadLock.method1();
        }
    }

    //执行方法
    public  void  threadone() throws Exception{
        SynchronizeRunnable runnable=new SynchronizeRunnable();
        Thread thread1=new Thread(runnable);
        thread1.start();
        runnable.method();
    }
```

结果如下：
```
线程2正在执行
线程1正在执行
```

我们看到，主线程与thread1线程由于都在等对方释放资源，所以卡死了。
