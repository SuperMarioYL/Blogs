# java进制转换

<!-- TOC -->

- [二进制在计算机中的表示（正码、反码、补码）](#二进制在计算机中的表示正码反码补码)
- [java中不同进制数的定义方法](#java中不同进制数的定义方法)
  - [二进制](#二进制)
  - [八进制](#八进制)
  - [十六进制](#十六进制)
- [进制转换方法](#进制转换方法)
  - [十进制转换为其他进制](#十进制转换为其他进制)
  - [其他进制转换为十进制](#其他进制转换为十进制)

<!-- /TOC -->

---
## 二进制在计算机中的表示（正码、反码、补码）

- 一个N位的二进制数由1位符号位和N-1位数据位组成,正数符号位为0，负数符号位为1
- 二进制数在计算机中是以补码的形势存在的，补码的定义为：
  - 对于正数，补码与原码相同
  - 对于负数，符号位不变，数据位取反，再加一

举例（32位正数为例）：
  - 20
    - 原码：0000 0000 0000 0000 0000 0000 0001 0100
    - 反码：0000 0000 0000 0000 0000 0000 0001 0100
    - 补码：0000 0000 0000 0000 0000 0000 0001 0100
  - -20
    - 原码：1000 0000 0000 0000 0000 0000 0001 0100
    - 反码：1111 1111 1111 1111 1111 1111 1110 1011
    - 补码：1111 1111 1111 1111 1111 1111 1110 1100

----
## java中不同进制数的定义方法

### 二进制

0+B/b+二进制数

举例：`0b1100`

### 八进制

0+八进制数

举例：`0233`

### 十六进制

0+x/X+十六进制数

举例：`0xffff`

---
## 进制转换方法

### 十进制转换为其他进制

```java
public class Main {
    public static void main(String[] args) throws Exception {
        //转换为二进制（输出补码，省略0）
        System.out.println(Integer.toBinaryString(2333));

        //转换为16进制
        System.out.println(Integer.toHexString(2333));

        //转换为八进制
        System.out.println(Integer.toOctalString(2333));
    }
}
```
结果：
![20200707202014](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200707202014.png)

### 其他进制转换为十进制

在Java代码中，默认的整数进制就是十进制，就算你定义了一个其他进制的数，在输出或者运算时都是按照十进制来的，不需要刻意转换：

```java
public class Main {
    public static void main(String[] args) throws Exception {
        int int16=0xfff;
        int int2=0b1001;
        System.out.println(int2);
        System.out.println(int16);
    }
}

```

![20200707205523](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200707205523.png)

当然，对于没有标识的整形，java中也保留了转换进制的方法：

```java
public class Main {

    public static void main(String[] args) {
        System.out.println(Integer.parseInt("1001", 2));//2进制转换成十进制
        System.out.println(Integer.parseInt("1001", 8));//8进制转换为十进制
        System.out.println(Integer.parseInt("1001", 16));//16进制转换为十进制
    }
}
```

结果为：

![20200708005800](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200708005800.png)