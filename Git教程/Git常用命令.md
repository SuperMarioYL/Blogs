# Git常用命令

## 目录

|关键词|含义|
|:--|:--|
|[clone](#clone)|从远端克隆仓库|
|[add](#add)|将工作区修改保存到暂存区|
|[commit](#commit)|将修改提交到本地仓库|
|[](#)||
|[](#)||
|[](#)||
|[](#)||

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





```
//撤销add(撤销上次add,后边加文件可以只撤销单个文件)
git reset HEAD [file]
```

1. 提交文件

```
//xxx为我们提交代码时的备注
git commit -m xxx

//将add与commit合起来，不需要两个命令来提交了（只限于已经加入git追踪的文件，新文件还是需要add）
git commit -am xxx
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

## <a id='2'>撤销</a>

- 撤销暂存区的修改

```
git reset head [file]
```

- 撤销提交的更改

- 撤销已经push的更改

当我么已经把代码推送到remote时，可以通过reset命令回到某个版本

git reset 只能修改本地版本库的内容，如果需要修改远程仓库需要使用Git revert



