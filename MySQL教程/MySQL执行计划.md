# MySQL执行计划

&emsp;作为一个后端程序员，工作中免不了和数据库打交道，以MySQL数据库为例，同样的需求，有的人写的查询语句几秒就执行完了，而有的人写的SQL要执行几分钟甚至无法执行，那么怎么去调优我的SQL呢？MySQL提供了性能调优工具即**EXPLAIN**执行计划。

## 什么是explain？

- MySQL提供的查询SQL语句执行效率的工具，通过返回信息供人们进行性能调优，书写格式如下：

```
EXPLAIN
SELECT * FROM TABLE [LEFT JOIN TABLE ...] WHERE [COLOMN IN (子查询)];
```
即在自己的SQL语句前加上explain关键字即可，返回的信息如下：
![MySQL执行计划](https://img-blog.csdnimg.cn/20200515203836680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NjIxNDk0,size_16,color_FFFFFF,t_70)

接下来我们分析一下各个字段的含义。

## 各字段含义

- id
  - select查询的顺序
  - 同id从上向下执行
  - 不同id时id越大的先被执行
  - 如果是子查询ID号会递增，即一个SQL中如果有子查询，先执行子查询
- select_type
  - 查询的类型，用于区别SQL是普通查询还是子查询、关联查询等
  - 主要的参数有：

|select_type参数|意义|
|:-:|:--|
|SIMPLE|表明SQL是简单查询，不包含复杂的查询形式|
|PRIMARY|查询中包含了复杂的查询，最外层为此标志|
|SUBQUERY|在select或where列表中包含了子查询|
|DERIVED|from或join的表是通过select语句查询出来放到临时表里的，此参数代表了该临时表|
|UNION|union的查询|
|UNION RESULT|union查询的结果|

- table
  - 本条数据表示的表
- partitions
  - 略
- type
  - type是性能调优的重要指标，它代表了我们的SQL是以什么样的形式来访问表的，不同的访问形式查询的效率是不一样的。
  - **一般来说，好的查询type要达到range及以上才可以。**
  - 他们之间的优劣如下，越靠前查询效率越高：
  
```
system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL
```
|type参数|意义|
|:-:|:--|
|system|表中只有一行记录（系统表）|
|const|通过一次索引就找到了，通常用于primary key或者unique索引，比如`select * from table where id=1`|
|eq_ref|唯一性索引扫描，用于primary key或unique index，如`SELECT * FROM table a LEFT JOIN table b on a.id=b.id`|
|ref|非唯一性索引扫描，使用了非唯一索引进行|
|range|区间扫描，通常在where中使用了between或者in/not in|
|index|index与all都是全表查询，区别在于，index只查询索引树，而all会查询非索引数据，index例子如`SELECT id FROM table`|
|all|全表查询，例子如`SELECT id,name FROM table`|

- possible_keys
  - 查询涉及到的字段包含的所有索引及主键都会被列出
- key
  - 实际上时用到的索引，没有用到则为空
- key_len
  - 使用的索引在表中定义的长度（不代表实际使用的长度）
- ref
  - 显示被使用的索引是哪一列，如果不确定，则是const。
- rows
  - 查询按照执行计划id所规定的顺序执行时，上一执行计划从本执行计划获取一行数据时需要查询的行数。
- extra
  - 重要信息

|extra参数|意义|
|:--|:--|
|Using filesort|文件排序，代表至少有一个orderby中的字段没有索引，如`select * from table order by name`|
|Using temporary|使用临时表保存中间结果，用于orderby,groupby|
|Using index|表示查询的字段都有索引，如`select id from table`|
|Using where|使用了where过滤|
|Using join buffer|使用了连接缓存|
|Impossible WHERE|where条件为不可能，不需要查询，如`select * from table where 1<>1`|

## 总结

&emsp;在MySQL调优查看执行计划的时候最关键的数据便是`type`和`rows`了，先要看有没有命中索引，再看每个流程需要检索的行数，只要命中索引(ref及以上)，检索的行数也很小，那么，我们就可以说，这个SQL的执行效率很高。

  












