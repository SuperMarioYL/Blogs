# Linux下MySQL运行

<!-- TOC -->

- [MySQL命令](#mysql命令)
- [遇到的问题](#遇到的问题)
  - [启动报错：mysqld: Too many arguments (first extra is 'start')](#启动报错mysqld-too-many-arguments-first-extra-is-start)
  - [查找配置文件位置](#查找配置文件位置)
  - [MySQL服务报错：IP address '172.24.160.128' could not be resolved: Temporary failure in name resolution](#mysql服务报错ip-address-17224160128-could-not-be-resolved-temporary-failure-in-name-resolution)
  - [MySQL工具连接时报：Host '172.24.160.128' is not allowed to connect to this MySQL server](#mysql工具连接时报host-17224160128-is-not-allowed-to-connect-to-this-mysql-server)

<!-- /TOC -->



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
mysqladmin -u root shutdown
```

- linux下数据竖向显示

加 `\G`
```
mysql> select * from tableA \G;
```

---
## 遇到的问题

### 启动报错：mysqld: Too many arguments (first extra is 'start')

使用如下命令：

```
mysqld --user=mysql
```

### 查找配置文件位置

使用如下命令：
```
mysql --verbose --help|grep -A 1 'Default options'
```

![20210205105032](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210205105032.png)

如果存在多个值，则MySQL是按照先后顺序读取的，找不到第一个就找第二个，以此类推


### MySQL服务报错：IP address '172.24.160.128' could not be resolved: Temporary failure in name resolution

原因是开启了IP解析

解决办法：

在 `my.cnf` 配置文件中的 `[mysqld]` 模块下加入
```
skip-host-cache
skip-name-resolve
```
如图所示：

![20210205143402](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210205143402.png)

即可


### MySQL工具连接时报：Host '172.24.160.128' is not allowed to connect to this MySQL server

报错信息如下图所示：

![20210205143530](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210205143530.png)

说明没有开启远程登录的权限

解决方法：

1. 登录mysql

    ```
    mysql -uroot -p
    输入密码
    ```
2. 执行开启权限语句
   - % 指所有IP地址
   - 123456 代指登录密码
   - root 代指用户名

    ```
    grant all on *.* to root@"%" identified by “123456”;
    ```

3. 执行刷新系统权限语句

    ```
    flush privileges;
    ```

这样即可正常使用mysql工具登录了。
