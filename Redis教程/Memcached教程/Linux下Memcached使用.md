# Linux下Memcached使用

<!-- TOC -->

- [服务常用命令](#服务常用命令)
  - [启动服务](#启动服务)
  - [终止服务](#终止服务)
  - [客户端操作](#客户端操作)
- [memcached操作常用命令](#memcached操作常用命令)
  - [set](#set)
  - [get](#get)

<!-- /TOC -->

---
## 服务常用命令

### 启动服务

例子：
```
memcached -d -uroot -p8968
```

启动参数说明：

-d 选项是启动一个守护进程。

-u root 表示启动memcached的用户为root。

-m 是分配给Memcache使用的内存数量，单位是MB，默认64MB。

-M return erroron memory exhausted (rather than removing items)。

-u 是运行Memcache的用户，如果当前为root 的话，需要使用此参数指定用户。

-p 是设置Memcache的TCP监听的端口，最好是1024以上的端口。

-c 选项是最大运行的并发连接数，默认是1024。

-P 是设置保存Memcache的pid文件。

### 终止服务

```
killall memcached
```

### 客户端操作

客户端连接命令为 `telnet` 

连接方式为：

```
telnet localhost 8968
```

成功进入后会有如下提示：

![20210222113224](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210222113224.png)

退出方式为 `quit` 成功后有如下提示：

![20210222113338](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210222113338.png)


---
## memcached操作常用命令

### set

![20210222113505](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210222113505.png)

### get 

![20210222113522](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210222113522.png)