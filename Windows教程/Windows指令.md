# windows指令

<!-- TOC -->

- [常用指令](#常用指令)
  - [切换盘符](#切换盘符)
  - [切换文件夹](#切换文件夹)
- [网络相关命令](#网络相关命令)
  - [查看ip](#查看ip)
    - [刷新DNS缓存(修改hosts之后要执行)](#刷新dns缓存修改hosts之后要执行)
  - [查看端口占用](#查看端口占用)
    - [查询端口或者PID包括xxx的数据](#查询端口或者pid包括xxx的数据)

<!-- /TOC -->

---
## 常用指令

### 切换盘符

![20200627174614](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200627174614.png)

### 切换文件夹

```
cd xxx
```

![20200627174649](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200627174649.png)

---
## 网络相关命令

###  查看ip

```
ipconfig
```

#### 刷新DNS缓存(修改hosts之后要执行)

```
ipconfig /flushdns
```

![20200627180230](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200627180230.png)


### 查看端口占用

```
netstat -ano
```

![20200627175129](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200627175129.png)


#### 查询端口或者PID包括xxx的数据

```
netstat -ano|findstr "xxx"
```

![20200627175805](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200627175805.png)


