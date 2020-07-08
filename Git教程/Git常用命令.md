## Git常用命令

### 一、概念理解

![20200630214812](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200630214812.png "图片转载自He_quotes")

首先我们要明白，git存放代码的地方主要有四个部分，首先是我们的工作区(workspace),这里是我们修改代码的地方，代码修改完后，要将更改增加到暂存区(index),要将修改推送到远端仓库(remote)的话，就要将暂存区(index)的修改提交到仓库(repository),然后再推送。
---

### 二、常用命令
1. 从远端clone仓库
   - 要注意的是URL有两种，一种是ssh形式，一种是http形式，在使用http形式推送时必须要验证账号密码，为了方便一般采用ssh形式

```
git clone url
```

1. 添加修改到暂存区

```
//add指定文件
git add (在gitbush中可以按tab快捷添加修改的文件)

//add所有文件
git add .

//add所有文件
git add --all

//撤销add(撤销上次add,后边加文件可以只撤销单个文件)
git reset HEAD [file]
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

5. 删除仓库

```
rm -rf .git
```

6. 退出

```
exit
```

7. 查看添加的修改
   - 绿色代表已经添加（add）到暂存区（index）
   - 而红色表示还在工作空间（workspace）中
   - 已经提交（commit）已经到repo里的，所以查看不到状态

```
git status
```

![20200708011253](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200708011253.png)