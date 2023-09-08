# Git常用命令

<!-- TOC -->

- [init](#init)
  - [将本地工程初始化为本地仓库，纳入版本控制](#将本地工程初始化为本地仓库纳入版本控制)
- [clone](#clone)
  - [从远端克隆仓库](#从远端克隆仓库)
- [add](#add)
  - [将工作区修改保存到暂存区](#将工作区修改保存到暂存区)
- [status](#status)
  - [查看暂存区（green）和工作区（red）的修改](#查看暂存区green和工作区red的修改)
- [commit](#commit)
  - [将修改提交到本地仓库](#将修改提交到本地仓库)
- [push](#push)
  - [将本地当前分支的提交推送到远端仓库](#将本地当前分支的提交推送到远端仓库)
  - [推送本地分支到远程指定分支](#推送本地分支到远程指定分支)
  - [删除远程分支](#删除远程分支)
- [log](#log)
  - [查看提交的日志,按q退出,可选择查看的分支](#查看提交的日志按q退出可选择查看的分支)
- [reset](#reset)
  - [重新设置head指针指向的commit记录，即可以将提交回退到某一次提交时的状态](#重新设置head指针指向的commit记录即可以将提交回退到某一次提交时的状态)
- [branch](#branch)
  - [分支的新增、浏览、删除等，不能切换分支](#分支的新增浏览删除等不能切换分支)
- [checkout](#checkout)
  - [查看当前分支状态，切换分支](#查看当前分支状态切换分支)
  - [撤销工作区的修改（不撤销暂存区）](#撤销工作区的修改不撤销暂存区)
- [merge](#merge)
  - [合并分支](#合并分支)
- [diff](#diff)
  - [查看工作区的修改](#查看工作区的修改)

<!-- /TOC -->

---
|普通命令|含义|
|:--|:--|
|`rm -rf [file/dir]`|删除文件或文件夹|
|`rm -rf .git`|根目录执行，删除仓库|
|`exit`|退出 git bash|
|`clear`|清空 git bash 界面|

---
## init

### 将本地工程初始化为本地仓库，纳入版本控制

```
git init
```

---
## clone

### 从远端克隆仓库

```
git clone URL

例:
git clone git@github.com:SuperMarioYL/Blogs.git
```
URL有两种形式：
- http格式，如`https://github.com/SuperMarioYL/Blogs.git`
  - 在推送的时候，这种形式clone下来的仓库需要每次校验用户名和密码，不实用
- ssh格式，如`git@github.com:SuperMarioYL/Blogs.git`
  - 在推送的时候，如果配置了ssh keys，就不需要验证用户名和密码了，比较方便

---
## add

### 将工作区修改保存到暂存区

- `git add [file]`
  - add指定文件，在`git bash`中可以用TAB键选择文件
- `git add .`
  - add当前目录及其子目录的所有文件
- `git add --all`
  - add所有文件（不管在哪个目录下执行，都会add整个仓库的所有修改）

在根目录下， `git add .` 和 `git add --all` 没有区别，只有不是根目录的情况下有区别

---
## status

### 查看暂存区（green）和工作区（red）的修改

```
git status
```
- 绿色代表已经添加（add）到暂存区（index）
- 而红色表示还在工作空间（workspace）中
- 已经提交（commit）已经到repo里的，查看不到状态

![20200708011253](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200708011253.png)

---
## commit

### 将修改提交到本地仓库

- `git commit -m [memo]` 将暂存区的修改提交到本地仓库，memo为提交的备注
- `git commit -am [memo]` 将暂存区的修改以及工作区已加入版本控制的文件修改提交到本地仓库，memo为提交的备注

---
## push

### 将本地当前分支的提交推送到远端仓库

```
git push
```

### 推送本地分支到远程指定分支

```
git push origin head:refs/for/master
```

### 删除远程分支

```
git push origin --delete 远程分支
```

---
## log

### 查看提交的日志,按q退出,可选择查看的分支

```
git log [branch]
```
|命令|含义|
|:--|:--|
|`git log`|什么都不加默认查看本地当前分支的日志|
|`git log [branch]`|加上分支名查看要查看的分支的日志|
|`git log origin/HEAD`|查看远端当前分支的日志|
|`git log origin/[branch]`|查看其他远程分支的日志|
|`git log --oneline`|加上`--oneline`展示缩略日志|

![20200728163705](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200728163705.png)

---
## reset

### 重新设置head指针指向的commit记录，即可以将提交回退到某一次提交时的状态

```
git reset [--soft]|[--mixed]|[--hard] <commitID>
```

reset有三个参数：

|命令|影响暂存区|影响工作区|含义|
|:--|:-:|:-:|:--|
|`git reset --soft <commitID>`|N|N|回到指定commit的状态，暂存区和工作区的修改都不会受到影响|
|`git reset --mixed <commitID>`|Y|N|回到指定commit的状态，暂存区的修改会回到工作区。<br/>**--mixed是默认参数，即不加参数就默认为--mixed**|
|`git reset --hard <commitID>`|Y|Y|回到指定commit的状态，暂存区和工作区的修改都会被删除|

从之前的Git基本概念的理解中我们知道，head其实就是一个指向最新commit的指针，我们从git log的日志中也可以看到，最新的commit右边有（head->master）表示head当前是master分支，并且指向这个commit。

![20200728210505](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200728210505.png)

由此，我们也可以在使用commitID的地方用HEAD代替：
- `git reset head` 
  - 回退到最新的commitid，暂存区的修改会回到工作区
  - 既然是回到最新的commit，那么`git reset --soft head`便没什么意义了，因为他什么也没改

- `git reset head^`回退到最新提交的上一次提交
- `git reset head^^`回退到最新提交的上一次的上一次提交，往后以此类推

- `git reset head~0`回退到最新提交
- `git reset head~1`回退到最新提交的上一次提交，往下依次类推

---
## branch

### 分支的新增、浏览、删除等，不能切换分支

- `git branch` 浏览本地分支（被`'*'`标记的分支为当前本地主分支）
- `git branch <branch>` 创建新的本地分支，本地主分支不变

  ![20200729173331](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200729173331.png)

- `git branch <branch> <commitID>` 基于某一分支的一个commitID创建新分支

- `git branch -a` 浏览本地（green/white）和远端分支（red） 

  ![20200730193833](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200730193833.png)

- `git branch -d <branch>` 删除本地分支

  ![20200730194054](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200730194054.png)

---
## checkout

### 查看当前分支状态，切换分支

注：工作区和暂存区的修改会随着分支的切换在不同分支间移动，而已提交的修改则不会随着分支移动

- `git checkout` 查看当前分支状态

  ![20200805000155](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200805000155.png)

- `git checkout <branch>` 切换到branch分支
- `git checkout -b <branch>` 创建branch分支并切换到该分支（如果branch分支已经被创建，那么该语句将报错）
- `git checkout -B <branch>` 强制创建branch分支并切换到该分支（如果branch分支已经创建，该命令会将原来的分支强制覆盖）

### 撤销工作区的修改（不撤销暂存区）

撤销某一文件在工作区的修改
```
git checkout -- filename
```
撤销工作区的所有修改
```
git checkout -- *
```


---
## merge

### 合并分支

要将B分支的代码合并到A分支上，要先将head指向A分支，然后执行合并B的操作，这样，B中的修改就合并到A上了
```
git checkout A
git merge B
```

---
## diff

### 查看工作区的修改

```
git diff
```

![20200811203604](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200811203604.png)