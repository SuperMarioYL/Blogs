# java输入输出

<!-- TOC -->

- [1. 控制台输入输出](#1-控制台输入输出)
- [2. 文件读写](#2-文件读写)

<!-- /TOC -->

---
## 1. 控制台输入输出
&emsp;java控制台的输入输出主要依赖于scanner类，使用`Scanner scanner=new Scanner(System.in)`获取了控制台输入的字段，其中system.in就表示这个对象读取的是控制台。

```java
    public static void main(String[] args) {
        Scanner scanner=new Scanner(System.in);
        while (scanner.hasNext()){
            String s=scanner.next();
            if(s.equals("exit")){
                break;
            }
            System.out.println(s);
        }
    }
```
---
## 2. 文件读写

文件的读写依赖于java.io类，最常用的一般为`FileReader`、`FileWriter`、`BufferReader`、`BufferWriter`，其中`File*`为最基本的文件读写类，`Buffer*`则是对`File*`做了缓冲区以及一些其他方法的优化，效率更高。下面我们来看一下具体的方法。

1. 注意事项
   - 要注意的是，由于`'\'`符号在java中有特殊的含义，所以在写文件路径时应该替换为`'\\'`
   - 文件的路径既可以是相对路径，也可以是绝对路径，推荐使用绝对路径
   - `'\r'`为光标转移到当前行的行首
   - `'\n'`为光标转到下一行，但不会调整左右位置


2. 写入文件
   1. `FileWriter`

    ```java
        FileWriter out =new FileWriter("javaproject\\sortsource.txt");//初始化，指定要写入的文件
        Random r=new Random();//获取随机数
        for (int i = 0; i < 10000000; i++) {
            out.write(String.valueOf(r.nextInt())+"\r\n");//写入数据并换行
        }
        out.flush();//将缓冲区的数据写入文件，不写也会在关闭刷新到磁盘。
        out.close();//关闭io
    ```

    2. `BufferWriter`

    ```java
        BufferedWriter out=new BufferedWriter(new FileWriter("javaproject\\sortsource.txt"));//初始化，指定写入文件，这里需要filewriter类型
        Random r=new Random();
        for (int i = 0; i < 10000000; i++) {
            out.write(String.valueOf(r.nextInt()));//写入文件
            out.newLine();//换行
        }
        out.flush();//将缓冲区的数据刷新到文件里
        out.close();//关闭io操作
    ```
    3. 文件续写

    ```java
    //覆盖写入
    new FileWriter("javaproject\\sortsource.txt")

    //加参数true,则表示续写
    new FileWriter("javaproject\\sortsource.txt",true)
    ```

3. 文件读取
   ```java
    public class FileReaderTest {
        public static void main(String[] args) {
            try {
                FileReader in = new FileReader("javaproject\\FileWriter.txt");//建立filereader对象，指定要读取的文件
                BufferedReader br=new BufferedReader(in);//由于filereader没有方法可以用来读取数据，我们用bufferedreader来读取
                for (int i = 0; i < 10; i++) {
                    System.out.println(br.readLine());//readline每次读取一行数据
                }
                br.close();//关闭io

            } catch (Exception e) {

            }

        }
    }
   ```
    结果：
    
    ![20200705194011](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705194011.png)

4. `File*`与`Buffer*`的区别
    - 首先与其他文章讲的file没有缓冲区buffer有缓冲区所以导致file频繁刷新磁盘导致效率不高不同，其实file也是有缓冲区的，我们来做一个实验：
      - 我们在flush之前打上断点，可以看到，还有167条数据没有写入文件，还在缓冲区里
    ![20200627180230](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/Snipaste_2020-07-05_18-06-01.png)

    ![20200705180844](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705180844.png)
    
      - 解除debug之后1000万条数据都写入了

    ![20200705181107](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705181107.png)

    - buffer只是将file的缓冲区优化了，所以效率会更高一些，我们再来看一下例子：
      - 和之前一样，我们也在flush之前打上断点

    ![20200705181345](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705181345.png)

      - 可以看到，有874条数据还没有刷新到磁盘文件里，从这里可以看到buffer类的默认缓冲区是要比file大的，这样他可以进行更少次数的io，效率会更高

    ![20200705181414](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705181414.png)
    
    - file换行时必须要使用换行符，但是在不同的系统中，换行符往往是不同的，有的系统换行是`'\r\n'`，而有的则是`'\n'`,跨平台性不好，而buffer则提供了换行的方法`newLine()`
    - 综上所述，在实际使用中，尽量选择buffer类就好了。 

5. `File*`与`Buffer*`效率差异

通过之前对于两个类区别的探讨我们知道buffer效率上是比file高的，但是具体高多少呢？我们试一下下面的例子,每个类分别写入一亿条随机数，看一下范别耗时多久：

![20200705183104](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705183104.png)

写入完成：

![20200705190528](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705190528.png)

最终结果：

![20200705190458](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200705190458.png)

可以看到buffer类比file类快了一半的时间，所以在平常使用的时候，我们使用buffer类就好了
