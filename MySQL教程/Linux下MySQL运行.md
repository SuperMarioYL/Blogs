# Linux下MySQL运行

mysqld 是MySQL服务端命令

mysql 是MySQL客户端命令

---
## MySQL命令

- 启动

```
mysqld
```

- 停止

```
1. 杀死已存在MySQL服务
killall mysqld

2. 停止服务
mysqld stop
```

---
## 遇到的问题

### 启动报错：mysqld: Too many arguments (first extra is 'start')

使用如下命令：

```
mysqld --user=mysql
```

