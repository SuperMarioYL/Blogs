# linux安装java（yum方法）

1. 检查是否有已经安装的java版本

```
yum list installed | grep java
```

如果想要删除，用如下指令

```
yum -y remove tzdata-java.noarch  
```
tzdata-java.noarch 即为检查已安装的java版本的名字

2. 安装java
    1. 查看yum可以安装的java版本

    ```
    yum list java*
    ```

    ![20200627210116](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627210116.png)

    2. 选择想要安装的版本并安装

    ```
    yum install java-1.8.0-openjdk.x86_64
    ```
    ![20200627210707](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627210707.png)

    3. 检查是否安装成功

    ```
    java -version 
    ```

    ![20200627210917](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627210917.png)

    如图所示，如果有版本信息则表示安装成功

3. 配置java环境变量
   1. `/etc/profile` 为该系统下所有用户生效的环境变量配置文件
   2. `/usr/lib/jvm` 为yum磨人的java下载位置
   3. 在profile文件中加入如下

```
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin 
```



