# Linux查看日志命令

<!-- TOC -->

- [head](#head)
- [tail](#tail)
- [cat](#cat)
- [grep](#grep)

<!-- /TOC -->

---
## head

查看文件开头的内容

常用命令
```
显示前1000行内容
head /home/work/abc.log -n 1000
```

---
## tail 

查看文件末尾的内容

常用命令
```
显示末尾的1000行
tail /home/work/abc.log -n 1000

实时刷新最新更新
tail -f /home/work/abc.log
```


---
## cat

在bash输出文件内容

```
cat /home/work/abc.log
```

---
## grep

按关键字过滤文本

|参数|含义|
|:-:|:-:|
|-A n|查看输出行的后n行内容|
|-B n|查看输出行的前n行内容|
|-C n|查看输出行的前后n行内容|


常用命令
```

输出abc.log 新日志中包含字段 bbb 以及其后100行的内容
tail -f /home/work/abc.log |grep 'bbb' -A 100
```

注：grep的关键字加''后可以模糊查询

例：
```
ls | grep 'my*'
```

grep 'aaa' xxx.txt 从xxx.txt查找aaa

grep -v 'aaaa' 排除关键字