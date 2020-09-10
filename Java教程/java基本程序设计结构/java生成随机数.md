## java生成随机数

java生成随机数最常用的有3种方法，3种方法如下

1. `Math.random()`

`Math.random()`可以生成[0,1)范围的随机数

2. `java.util.Random`
   - 构造方法
     - `Random r=new Random()`不带随机种子，每次执行都产生不一样的结果
     - `Random r=new Random(5)`带有随机种子，随机种子相同时执行相同的次数，生成的随机数是一样的
    ```java
    public class Main {
        public static void main(String[] args) {
            Random r=new Random(5);
            for (int i = 0; i < 3; i++) {
                System.out.print(r.nextInt()+"|");
            }
            System.out.println();
            Random r1=new Random(5);
            for (int i = 0; i < 3; i++) {
                System.out.print(r1.nextInt()+"|");
            }
        }
    }
    结果：
    -1157408321|758500184|379066948|
    -1157408321|758500184|379066948|


    public class Main {
        public static void main(String[] args) {
            Random r=new Random();
            for (int i = 0; i < 3; i++) {
                System.out.print(r.nextInt()+"|");
            }
            System.out.println();
            Random r1=new Random();
            for (int i = 0; i < 3; i++) {
                System.out.print(r1.nextInt()+"|");
            }
        }
    }
    结果：
    1996430610|-551940818|1987043112|
    -337598557|-1206292926|1674370019|
    ```
    - 方法
    ```java
    //生成int类型随机数(加入bound参数生成[0,bound)的随机数，不加参数生成[0,integer.max_value)的随机数)
    nextInt([bound])

    //生成随机的Boolean类型
    nextBoolean()

    //生成long类型的随机数
    nextLong()

    //生成double类型的随机数
    nextDouble()
    ```
3. `System.currentTimeMillis()`

生成一个当前时间毫秒数的随机数，所以循环生成可能只有一个值。

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.print(System.currentTimeMillis()+"|");
        }
    }
}

结果：
1593612811269|1593612811269|1593612811269|
```