# zookeeper 安装

## 下载

下载地址：https://mirrors.ustc.edu.cn/apache/zookeeper/

注：版本zookeeper需要下载bin压缩包

下载并解压
```shell
wget https://mirrors.ustc.edu.cn/apache/zookeeper/zookeeper-3.6.3/apache-zookeeper-3.6.3-bin.tar.gz && tar xzvf apache-zookeeper-3.6.3-bin.tar.gz
```

![20210701193127](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20210701193127.png)

## 文件介绍

### zookeeper 文件整体介绍

```
.
├── bin // bin目录下主要存放zookeeper的脚本，zkServer.sh 是Linux下的启动脚本
│   ├── README.txt
│   ├── zkCleanup.sh
│   ├── zkCli.cmd
│   ├── zkCli.sh
│   ├── zkEnv.cmd
│   ├── zkEnv.sh
│   ├── zkServer.cmd
│   ├── zkServer-initialize.sh
│   ├── zkServer.sh
│   ├── zkSnapShotToolkit.cmd
│   ├── zkSnapShotToolkit.sh
│   ├── zkTxnLogToolkit.cmd
│   └── zkTxnLogToolkit.sh
├── checkstyle-simple.xml
├── checkstyle-strict.xml
├── checkstyleSuppressions.xml
├── conf // 配置文件目录 启动时需配置 zoo.cfg
│   ├── configuration.xsl
│   ├── log4j.properties
│   └── zoo_sample.cfg // 样例配置
├── dev
│   └── docker
├── excludeFindBugsFilter.xml
├── Jenkinsfile
├── Jenkinsfile-owasp
├── Jenkinsfile-PreCommit
├── LICENSE.txt
├── NOTICE.txt
├── owaspSuppressions.xml
├── pom.xml
├── README.md
├── README_packaging.md
├── zk-merge-pr.py
├── zookeeper-assembly
│   ├── pom.xml
│   └── src
├── zookeeper-client
│   ├── pom.xml
│   └── zookeeper-client-c
├── zookeeper-compatibility-tests
│   ├── pom.xml
│   └── zookeeper-compatibility-tests-curator
├── zookeeper-contrib // 用于zk操作的工具包
│   ├── build-contrib.xml
│   ├── build.xml
│   ├── ivysettings.xml
│   ├── pom.xml
│   ├── zookeeper-contrib-fatjar
│   ├── zookeeper-contrib-huebrowser
│   ├── zookeeper-contrib-loggraph
│   ├── zookeeper-contrib-monitoring
│   ├── zookeeper-contrib-rest
│   ├── zookeeper-contrib-zkfuse
│   ├── zookeeper-contrib-zkperl
│   ├── zookeeper-contrib-zkpython
│   ├── zookeeper-contrib-zktreeutil
│   └── zookeeper-contrib-zooinspector
├── zookeeper-docs
│   ├── pom.xml
│   └── src
├── zookeeper-it
│   ├── pom.xml
│   ├── README.txt
│   └── src
├── zookeeper-jute
│   ├── pom.xml
│   └── src
├── zookeeper-metrics-providers
│   ├── pom.xml
│   └── zookeeper-prometheus-metrics
├── zookeeper-recipes
│   ├── build-recipes.xml
│   ├── build.xml
│   ├── pom.xml
│   ├── README.txt
│   ├── zookeeper-recipes-election
│   ├── zookeeper-recipes-lock
│   └── zookeeper-recipes-queue
└── zookeeper-server
    ├── pom.xml
    └── src
```


### zoo.cfg 介绍

配置 zoo.cfg

```shell
cp zoo_sample.cfg zoo.cfg
```

打开文件，会发现如下信息

![20210701194319](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20210701194319.png)

预装的默认有5个属性:

- tickTime
  - The number of milliseconds of each tick
  - tick翻译成中文的话就是滴答滴答的意思，连起来就是滴答滴答的时间，寓意心跳间隔，单位是毫秒，系统默认是2000毫秒，也就是间隔两秒心跳一次。tickTime的意义：客户端与服务器或者服务器与服务器之间维持心跳，也就是每个tickTime时间就会发送一次心跳。通过心跳不仅能够用来监听机器的工作状态，还可以通过心跳来控制Flower跟Leader的通信时间，默认情况下FL的会话时常是心跳间隔的两倍。
- initLimit
  - 集群中的follower服务器(F)与leader服务器(L)之间初始连接时能容忍的最多心跳数（tickTime的数量）
- syncLimit
  - 集群中flower服务器（F）跟leader（L）服务器之间的请求和答应最多能容忍的心跳数。
- dataDir
  - 该属性对应的目录是用来存放myid信息跟一些版本，日志，跟服务器唯一的ID信息等。
- clientPort
  - 客户端连接的接口，客户端连接zookeeper服务器的端口，zookeeper会监听这个端口，接收客户端的请求访问！这个端口默认是2181


## 启动与停止

```
启动
./ zkServer.sh start

停止
./ zkServer.sh stop
```

一般启动时使用的命令为 `./ zkServer.sh start` 但是，第一次启动建议使用 `./zkServer.sh start-foreground`  可以查看使用的详细信息。

## 常见报错信息

### Unsupported major.minor version 52.0

实例如下：

![20210702170946](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20210702170946.png)

说明Java版本不一致，建议使用Java8及以上版本