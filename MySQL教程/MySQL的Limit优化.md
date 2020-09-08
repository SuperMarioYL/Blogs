# MySQL的limit优化

<!-- TOC -->

- [limit的介绍](#limit的介绍)
- [limit遇到的效率问题](#limit遇到的效率问题)
- [limit的优化](#limit的优化)

<!-- /TOC -->

## limit的介绍

limit关键字是MySQL进行分页的关键字

使用的用法为：

```
select * from tablename limit 0,20;
```

---
## limit遇到的效率问题

limit是通过从表的第一行开始遍历到指定位置的方法来实现寻找分页数据的，这样在数据量小的时候是非常有效的，但是碰到数据量非常大的情况时，会遇到效率不佳的问题

比如：

```
select * from tablename limit 1000000,20;
```

如上语句的意思为从第100万行开始读取20行，而limit在执行时会遍历1000020条数据才能得到结果，如果数据量上亿，分页效率会慢的让人承受不了

## limit的优化

解决办法：**记下上一次分页的最大id值，在本次分页时直接将前面的数据直接用where条件直接排除掉**

如果上一页的最大id值为1000000，那么，我们的分页改成：

```
select * from tablename where id > 1000000 limit 20;
```

这样limit只需要遍历20条数据，效率会提高很多