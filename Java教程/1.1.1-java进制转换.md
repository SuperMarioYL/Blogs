## java进制转换

1. 十进制转换为其他进制

```
public class Main {
    public static void main(String[] args) throws Exception {
        //转换为二进制
        System.out.println(Integer.toBinaryString(2333));

        //转换为16进制
        System.out.println(Integer.toHexString(2333));

        //转换为八进制
        System.out.println(Integer.toOctalString(2333));
    }
}
```
结果：
![20200707202014](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200707202014.png)

2. 其他进制转换为十进制

在Java代码中，默认的整数进制就是十进制，就算你定义了一个其他进制的数，在输出或者运算时都是按照十进制来的，不需要刻意转换：

```
public class Main {
    public static void main(String[] args) throws Exception {
        int int16=0xfff;
        int int2=0b1001;
        System.out.println(int2);
        System.out.println(int16);
    }
}

```

![20200707205523](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200707205523.png)

当然，对于没有标识的整形，java中也保留了转换进制的方法：

```
public class Main {

    public static void main(String[] args) {
        System.out.println(Integer.parseInt("1001", 2));//2进制转换成十进制
        System.out.println(Integer.parseInt("1001", 8));//8进制转换为十进制
        System.out.println(Integer.parseInt("1001", 16));//16进制转换为十进制
    }
}
```

结果为：

![20200708005800](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200708005800.png)