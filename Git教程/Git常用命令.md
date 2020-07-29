# Git常用命令

## 目录

|Git命令|含义|
|:--|:--|
|[init](#init)|将本地工程初始化为本地仓库，纳入版本控制|
|[clone](#clone)|从远端克隆仓库|
|[add](#add)|将工作区修改保存到暂存区|
|[status](#status)|查看暂存区（green）和工作区（red）的修改|
|[commit](#commit)|将修改提交到本地仓库|
|[push](#push)|将本地当前分支的提交推送到远端仓库|
|[log](#log)|查看提交的日志|
|[reset](#reset)|将提交回退到某一次提交时的状态|
|[](#)||


|普通命令|含义|
|:--|:--|
|`rm -rf [file|dir]`|删除文件或文件夹|
|`rm -rf .git`|根目录执行，删除仓库|
|`exit`|退出 git bash|
|`clear`|清空 git bash 界面|

---
## <a id=init>init</a>

将本地工程初始化为本地仓库，纳入版本控制

```
git init
```

---
## <a id=clone>clone</a>

从远端克隆仓库

```
git clone URL

例:
git clone git@github.com:leiyu1997/Blogs.git
```
URL有两种形式：
- http格式，如`https://github.com/leiyu1997/Blogs.git`
  - 在推送的时候，这种形式clone下来的仓库需要每次校验用户名和密码，不实用
- ssh格式，如`git@github.com:leiyu1997/Blogs.git`
  - 在推送的时候，如果配置了ssh keys，就不需要验证用户名和密码了，比较方便

---
## <a id=add>add</a>

将工作区修改保存到暂存区

- `git add [file]`
  - add指定文件，在`git bash`中可以用TAB键选择文件
- `git add .`
  - add当前目录及其子目录的所有文件
- `git add --all`
  - add所有文件（不管在哪个目录下执行，都会add整个仓库的所有修改）

在根目录下， `git add .` 和 `git add --all` 没有区别，只有不是根目录的情况下有区别

---
## <a id=status>status</a>

查看暂存区（green）和工作区（red）的修改

```
git status
```
- 绿色代表已经添加（add）到暂存区（index）
- 而红色表示还在工作空间（workspace）中
- 已经提交（commit）已经到repo里的，查看不到状态

![20200708011253](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200708011253.png)

---
## <a id=commit>commit</a>

将修改提交到本地仓库

- `git commit -m [memo]`
  - 将暂存区的修改提交到本地仓库，memo为提交的备注
- `git commit -am [memo]`
  - 将暂存区的修改以及工作区已加入版本控制的文件修改提交到本地仓库，memo为提交的备注

---
## <a id=push>push</a>

将本地当前分支的提交推送到远端仓库

```
git push
```

---
## <a id=log>log</a>

查看提交的日志,按Q退出,可选择查看的分支

```
git log [branch]
```
- `git log`
  - 什么都不加默认查看本地当前分支的日志
- `git log branch`
  - 加上分支名查看要查看的分支的日志
- `git log origin/HEAD`
  - 查看远端当前分支的日志
- `git log origin/branch`
  - 也可以查看其他远程分支的日志 

![20200728163705](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200728163705.png)

---
## <a id=reset>reset</a>

重新设置head指针指向的commit记录，即可以将提交回退到某一次提交时的状态

```
git reset [--soft]|[--mixed]|[--hard] <commitID>
```

reset有三个参数：
- `git reset --soft <commitID>`
  - 本地仓库回到指定commitID提交时，加上`--soft`,则表示暂存区和工作区的修改都不会受到影响
- `git reset --mixed <commitID>`
  - 回到指定commit的状态，加上`--mixed`则暂存区的修改会回到工作区
  - **--mixed是默认参数，即不加参数就默认为--mixed**
- `git reset --hard <commitID>`
  - 回到指定commit的状态，加上`--hard`则暂存区和工作区的修改都会被清空，和commit保持一致

从之前的Git基本概念的理解中我们知道，head其实就是一个指向最新commit的指针，我们从git log的日志中也可以看到，最新的commit右边有（head->master）表示head当前是master分支，并且指向这个commit。

![20200728210505](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200728210505.png)

由此，我们也可以在使用commitID的地方用HEAD代替：
- `git reset head` 
  - 回退到最新的commitid，暂存区的修改会回到工作区
  - 既然是回到最新的commit，那么`git reset --soft head`便没什么意义了，因为他什么也没改

- `git reset head^`回退到最新提交的上一次提交
- `git reset head^^`回退到最新提交的上一次的上一次提交，往后以此类推

- `git reset head~0`回退到最新提交
- `git reset head~1`回退到最新提交的上一次提交，往下依次类推

