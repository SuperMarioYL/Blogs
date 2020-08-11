# Redis基本数据结构及操作

redis中共有五种数据结构，下面来一一展示如何操作他们

<!-- TOC -->

- [字符串(String)](#字符串string)
- [列表(List)](#列表list)
- [集合(Set)](#集合set)
- [散列(Hash)](#散列hash)
- [有序集合(ZSet)](#有序集合zset)

<!-- /TOC -->

|数据结构|结构中存储的值|可以进行的操作|
|:--|:--|:--|
|string|可以是字符串、整数、浮点数|对整个字符串或部分字符串进行操作|

---
## 字符串(String)

string存储的可以是字符串、整数、浮点数.是键值对结构

有如下命令：

|指令|命令|操作|
|:--|:--|:--|
|`get`|`get key`|获取给定键的值，如果是空返回`(nil)`|
|`set`|`set key value`|设置要存储的键值|
|`del`|`del key [key...]`|删除指定的键值，可同时删除多个，返回删除的数量|

![20200810211955](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200810211955.png)

---
## 列表(List)

列表可以有序的存储多个字符串，列表的操作如下：

|命令|操作|
|:--|:--|
|`lpush/rpush listname value [value...]`|在列表的左/右端插入元素(可以插入多个值)，返回插入的个数|
|`lpop/rpop listname`|在列表的左/右端弹出元素，返回弹出元素的值|
|`lrange listname begin end`|从左到右列出从begin开始到end的所有元素，`lrange key 0 -1`可以获取列表的所有值|
|`lindex listname index`|获取列表的index位置上的值|
|`del listname`|删除列表的所有值|

![20200810214538](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200810214538.png)

---
## 集合(Set)

集合与列表都可以存储多个字符串，主要的区别是:
- 列表可以存储多个相同的字符串，而集合不能存储相同的字符串
- 列表是有序的，集合是无序的

|命令|操作|
|:--|:--|
|`sadd setname value...`|将值添加到指定集合，返回成功插入的数量|
|`smembers setname`|查看指定集合的所有元素|
|`sismember setname value`|查看指定元素是否存在于集合中，返回1代表存在，0代表不存在|
|`srem setname value`|移除集合中指定的元素|

---
## 散列(Hash)

hash结构可以存放多个键值对结构

|命令|操作|
|:--|:--|
|`hset hashname key value`|向hash内添加键值对，返回添加的数量|
|`hget hashname key`|从hash中获取指定键的值|
|`hgetall hashname`|获取hash所有的值|
|`hdel hashname key`|从hash中删除指定键值|

![20200811224250](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200811224250.png)

---
## 有序集合(ZSet)

zset有序集合和散列一样存储的是键值对，不同的是有序集合的键被称为成员（member），有序集合的值必须是浮点数，被称为`分值`，用来排序使用，类似于优先级的概念，升序排列

|命令|操作|
|:--|:--|
|`zadd zsetname value key`|向zset中增加数据，value为分值，key为成员|
|`zrange zsetname begin end`|查找从begin到end的数据（`zrange zsetname 0 -1`表示展示zset的所有数据）|
|`zrangebyscore zsetname s1 s2`|以分值为条件查询在s1到s2的元素|
|`zrem zsetname key`|移除zset里的成员|


![20200812010047](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200812010047.png)

可在 `zrange` 和 `zrangebyscore` 命令的后面加上 `withscores` 关键字，可以将分值展示出来

![20200812010654](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200812010654.png)