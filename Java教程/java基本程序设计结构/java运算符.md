# java运算符

&emsp; 本节介绍java的运算符以及运算符的优先级。先列总结，有不懂得可以看详细解释

<!-- TOC -->

- [运算符优先级](#运算符优先级)
- [运算符详解](#运算符详解)
  - [位运算符](#位运算符)

<!-- /TOC -->


---
## 运算符优先级

运算符优先级**从高到低**总结如下：

|运算符|结合顺序|
|:--|:-:|
|>>|fa|

---
## 运算符详解

---
### 位运算符

位运算符是在二进制位层面上进行操作的运算符，包括 
- `&` (与) 同位均为1才是1
- `|` (或) 同位有一位为1结果为1
- `^` (异或) 同位不相等结果为1
- `~` (非) 将每一位按位取反
- `>>` 逻辑右移，高位按符号位补足
  - `x >> 1` 代表 x/2
- `>>>` 无符号右移，不管正负，高位补0
- `<<` 逻辑左移，低位补0
  - `x << 1` 代表 x*2

以32位int为例：

```
int a=0b1010,b=0b1100,c=-0b1010;
System.out.println("a&b:\t"+Integer.toBinaryString(a&b));
System.out.println("a|b:\t"+Integer.toBinaryString(a|b));
System.out.println("a^b:\t"+Integer.toBinaryString(a^b));
System.out.println("~a:\t\t"+Integer.toBinaryString(~a));
System.out.println("c:\t\t"+Integer.toBinaryString(c));
System.out.println("c>>2:\t"+Integer.toBinaryString(c>>2));
System.out.println("c>>>2:\t"+Integer.toBinaryString(c>>>2));
System.out.println("c<<2:\t"+Integer.toBinaryString(c<<2));
```

![20200809114626](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200809114626.png)

![20200809114658](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200809114658.png)

