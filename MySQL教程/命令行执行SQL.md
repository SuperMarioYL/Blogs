# 命令行执行sql

## 命令行执行sql语句

### 输出到控制台

```shell
mysql -h ${host} -P ${port} -D ${datebase} -u ${username} -p ${password} -e "${sql}" 

```

### 输出到文件

```shell
mysql -h ${host} -P ${port} -D ${datebase} -u ${username} -p ${password} -e "${sql}" > ${filename}

```

## 命令行执行sql文件

### 输出到控制台

```shell
mysql -h ${host} -P ${port} -D ${datebase} -u ${username} -p ${password} < xxx.sql

```

### 输出到文件

```shell
mysql -h ${host} -P ${port} -D ${datebase} -u ${username} -p ${password} < xxx.sql > yyy.txt

```
