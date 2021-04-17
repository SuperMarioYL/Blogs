# IDEA导出java工程jar文件

我们想要让我们的程序可以更方便的在其他机器上去执行，就要将程序打包，本文介绍idea怎么导出java工程的jar文件。

1. 打开file->progect structure

![20200627202046](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627202046.png)

2. 配置artifacts
   1. 选择artifacts
   2. 添加要导出的项目
   3. 选择type为jar
   4. 选择jar包，配置manifast file 和main class
   5. output directory是工程导出的目录
   6. 配置完后关闭

![20200627202546](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627202546.png)

3. 导出jar包

主界面选择build->build artifacts->build

![20200627203006](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627203006.png)

执行完后我们就可以在我们指定的输出位置看到jar包了

![20200627203159](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627203159.png)

4. 执行jar文件

cmd 到输出文件夹下执行
```
java -jar xxx.jar
```

![20200627203509](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627203509.png)

如果报如上错误，说明我们需要先解压一遍jar包

![20200627203645](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627203645.png)

解压完后，执行解压出来的jar包就可以了

![20200627203706](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627203706.png)

![20200627203749](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200627203749.png)

---

以上就是idea导出jar包的详细过程了。