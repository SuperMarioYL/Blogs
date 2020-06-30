# MySQL时间类型

&emsp;mysql有多种时间类型，他们之间的区别是什么？使用时又需要注意什么呢？

## 1.MySQL的5种时间类型

如下表所示：

|类型       |大小|格式|0值意义|
|:-:|:-:|:-:|:-:|:-:|
|DATE       |4 bytes|YYYY-MM-DD         |0000-00-00|
|TIMESTAMP  |4 bytes|YYYY-MM-DD HH:MM:SS|0000-00-00 00:00:00|
|DATETIME   |8 bytes|YYYY-MM-DD HH:MM:SS|0000-00-00 00:00:00|
|TIME       |3 bytes|HH-MM-SS           |00-00-00|
|YEAR       |1 bytes|YYYY               |0000|

- DATETIME与TIMESTAMP的区别？
  - timestamp是4字节，表示时间范围小，时间范围从1970-01-01 00:00:01到2038-01-19 03:14:07，存储的是从1970-01-01 00:00:00到特定时间的秒数，所以同一个时间戳 在不同时区的人看来表示的时间是不同的。
  - datetime是8个字节，存储的就是时间的数字，范围从1000-01-01 00:00:00到9999-12-31 23:59:59，可以表达的时间范围比较大，由于是直接存的时间数值，所以不同时区的人看到的是相同的时间。

## 2.常用的日期函数与比较方式

- 获取当前时间
```
#获取当前日期时间
SELECT NOW()
SELECT CURRENT_TIMESTAMP
SELECT CURRENT_TIMESTAMP()
SELECT LOCALTIME()
SELECT LOCALTIME
SELECT LOCALTIMESTAMP
SELECT LOCALTIMESTAMP()

#获取当前日期
SELECT CURDATE()
SELECT CURRENT_DATE
SELECT CURRENT_DATE()

#获取当前时间
SELECT CURRENT_TIME
SELECT CURRENT_TIME()
SELECT CURTIME()
```

- 时间的加减
```
#日期的加减
SELECT DATE_ADD('2020-05-14 20:12:37',INTERVAL '1 2' YEAR_MONTH)
SELECT ADDDATE('2020-05-14 20:12:37',INTERVAL '1 2' YEAR_MONTH)
SELECT SUBDATE('2020-05-14 20:12:37',INTERVAL '1 2' YEAR_MONTH)
SELECT DATE_SUB('2020-05-14 20:12:37',INTERVAL '1 2' YEAR_MONTH)
```
INTERVAL 是间隔关键字，后面跟unit，下图为单位
![INTERVAL Unit](https://img-blog.csdnimg.cn/20200514204121224.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NjIxNDk0,size_16,color_FFFFFF,t_70#pic_center)

- DATEDIFF(date1,date2)
  - date1减去date2,返回天数，参数可以是日期类型也可以是时间类型
  - `SELECT DATEDIFF('2020-05-14 20:12:37','2019-05-14 20:12:37')`
  - 结果：`366`

- DATE_FORMAT(date,format)
  - 时间格式转换函数，可以将时间格式转换为任意格式
  - `SELECT DATE_FORMAT('2020-05-14 20:12:37','%Y-%m时间转换')`
  - 结果为：`2020-05时间转换`
  - format中可以使用获取date中时间的参数，常用的如下：

|转换参数|单位|获取的位数|范围|
|:-:|:-:|:-:|:-:|
|%Y|年|4||
|%y|年|2||
|%M|月||月的英文名如'May'|
|%m|月|2|[01,12]|
|%D|天||英文简写如'1st''3rd'|
|%d|天|2|[01,31]|
|%H|时|2|[00,24]|
|%h|时|2|[00,12]|
|%i|分|2|[00,59]|
|%S或%s|秒|2|[00,59]|
|%p|上下午||PM/AM|
|%r|上下午格式时间||'12:12:37 AM'格式时间|
|%W|周||英文周名如'Thursday'|
|%w|周|1|[0,6]周日-周六|
|%j|返回今天是今年的第几天|3|[001,366]|

## 3.使用方式

- 在选择一段范围比如一个月时，我们可以直接用between，如：求创建时间在5月的所有数据

`SELECT * FROM table WHERE create_time BETWEEN '2020-05-01' AND '2020-05-31'`

 