# Redis基本数据结构及操作

redis中共有五种数据结构，下面来一一展示如何操作他们

<!-- TOC -->

- [字符串(String)](#字符串string)
- [列表(List)](#列表list)
- [集合(Set)](#集合set)

<!-- /TOC -->

|数据结构|结构中存储的值|可以进行的操作|
|:--|:--|:--|
|string|可以是字符串、整数、浮点数|对整个字符串或部分字符串进行操作|

---
## 字符串(String)

string存储的可以是字符串、整数、浮点数.

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
|`lpush/rpush key value [value...]`|在列表的左/右端插入元素(可以插入多个值)|
|`lpop/rpop key`|在列表的左/右端弹出元素|
|`lrange key begin end`|从左到右列出从begin开始到end的所有元素，`lrange key 0 -1`可以获取列表的所有值|
|`lindex key index`|获取key为键的列表的index位置上的值|

![20200810214538](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200810214538.png)

---
## 集合(Set)
