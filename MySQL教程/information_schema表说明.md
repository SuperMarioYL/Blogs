# information_schema表说明

information_schema表是一张数据库表，里面包含了mysql数据库的所有信息，可以通过语法展示，接下来展示一下这张表里常用信息

---

## 总结：

|表名|快捷语法|说明|
|:--|:--|:--|
|[SCHEMATA](#schemata)|`show databases`|数据库信息|
|[TABLES](#tables)|`SHOW TABLES [from database]`|表信息|
|[COLUMNS](#columns)|`SHOW COLUMNS FROM test.student`|字段信息|
|[INNODB_LOCK_WAITS](#lockwait)|||
|[INNODB_TRX](#trx)|||
|[PROCESSLIST](#process)|||


---

## 详细：

### <a id="schemata">SCHEMATA</a>

schemata包含了MySQL的所有数据库信息

```
SELECT * FROM information_schema.SCHEMATA;

SHOW DATABASES;
```

![20200628202104](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200628202104.png)

### <a id=tables>TABLES</a>

tables包含了数据库的所有表信息

```
SELECT * FROM information_schema.`TABLES`;

SHOW TABLES [from database]
```
![20200628204453](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200628204453.png)

### <a id="columns">COLUMNS</a>

COLUMNS包含了数据库所有表的字段信息

```
SELECT * FROM information_schema.`COLUMNS`

SHOW COLUMNS FROM test.student
```
![20200628205315](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200628205315.png)

### <a id="lockwait">INNODB_LOCK_WAITS</a>

INNODB_LOCK_WAITS表中存储了当前正在被阻塞的SQL语句，以及是因为什么阻塞，可以通过`kill trx_id`的方式解除等待

```
SELECT * FROM information_schema.INNODB_LOCK_WAITS;
```
### <a id="trx">INNODB_TRX</a>

INNODB_TRX表中存储了正在执行的SQL

```
SELECT * FROM information_schema.SCHEMATA;

SHOW DATABASES;
```
