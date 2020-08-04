# Linux权限管理
<!-- TOC -->

- [如何查看用户有没有管理员权限](#如何查看用户有没有管理员权限)
- [为普通用户赋管理员权限](#为普通用户赋管理员权限)
  - [将用户加入sudoers](#将用户加入sudoers)
  - [sudo 使用方法](#sudo-使用方法)
    - [命令执行前转换权限](#命令执行前转换权限)
    - [使用sudo+命令](#使用sudo命令)
  - [退出管理员权限](#退出管理员权限)

<!-- /TOC -->

---
## 如何查看用户有没有管理员权限

看命令行前的字符即可，普通用户为 `$` 而管理员则为 `#` 

![20200803213844](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200803213844.png)

---
## 为普通用户赋管理员权限

普通用户可以使用sudo命令获得管理员权限，首先要把用户加入sudoers文件中，然后使用sudo命令即可

### 将用户加入sudoers

用有Root权限的账号登陆，修改位于`/etc/`文件夹下的`sudoers`文件

```
vi /etc/sudoers
```
在 `root ALL=(ALL) ALL` 的下面加上一句：

```
yourname ALL=(ALL) ALL
```

如果在每次使用sudo命令的时候不想输入密码，可以加上 `NOPASSWD:` 如下所示：

```
leiyu  ALL=(All) NOPASSWD: ALL
```

即可，如下图所示，然后`Esc+:wq`退出即可

![20200803203823](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200803203823.png)

### sudo 使用方法

#### 命令执行前转换权限

适用于大部分操作都需要管理员权限的情况，在命令执行前执行下面两条命令的任意一条就可以把当前用户的权限变更为管理员权限

```
权限变更为管理员，但环境变量依然使用本用户
sudo su 

权限变更为管理员，环境变量也使用管理员的
sudo su - 
```

#### 使用sudo+命令

如果该用户大部分操作都不需要管理员权限，只有一少部分操作需要，那么可以在命令前加sudo 即可赋予该命令管理员权限

例子：

```
sudo vi /etc/sudoers
```

### 退出管理员权限

执行 `exit` 即可

![20200803214408](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200803214408.png)