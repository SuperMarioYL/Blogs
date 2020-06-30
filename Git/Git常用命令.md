## Git常用命令

### 一、概念理解

![20200630214812](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200630214812.png "图片转载自He_quotes")

首先我们要明白，git存放代码的地方主要有四个部分，首先是我们的工作区(workspace),这里是我们修改代码的地方，代码修改完后，要将更改增加到暂存区(index),要将修改推送到远端仓库(remote)的话，就要将暂存区(index)的修改提交到仓库(repository),然后再推送。
---

### 二、常用命令
1. 从远端clone仓库

```
git clone url
```

2. 添加修改到暂存区

```
//add指定文件
git add (在gitbush中可以按tab快捷添加修改的文件)

//add所有文件(不包括删除)
git add .

//add所有文件（包括删除）
git add --all
```

3. 提交文件

```
//xxx为我们提交代码时的备注
git commit -m xxx
```
4. 推送文件

```
git push
```