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
|[](#)||
|[](#)||


|普通命令|含义|
|:--|:--|
|`rm -rf [file]|[dir]`|删除文件或文件夹|
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



















## <a id='2'>撤销</a>


```
//撤销add(撤销上次add,后边加文件可以只撤销单个文件)
git reset HEAD [file]
```

- 撤销暂存区的修改

```
git reset head [file]
```

- 撤销提交的更改

- 撤销已经push的更改

当我么已经把代码推送到remote时，可以通过reset命令回到某个版本

git reset 只能修改本地版本库的内容，如果需要修改远程仓库需要使用Git revert



