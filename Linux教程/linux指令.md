# Linux指令

<!-- TOC -->

- [编辑](#编辑)
  - [文件操作](#文件操作)
  - [vim 命令](#vim-命令)
  - [ls 命令](#ls-命令)
- [网络相关](#网络相关)
  - [显示网络属性、IP地址](#显示网络属性ip地址)
  - [重启网络](#重启网络)
  - [防火墙相关（CentOS8）](#防火墙相关centos8)
  - [查看网络连接、端口属性——netstat](#查看网络连接端口属性netstat)
- [yum](#yum)
- [系统设置](#系统设置)
  - [查看磁盘使用情况](#查看磁盘使用情况)
  - [查看各个进程的CPU占用](#查看各个进程的cpu占用)
- [进程相关](#进程相关)
  - [查看进程信息 ps](#查看进程信息-ps)
  - [实时查看服务器进程状态 top](#实时查看服务器进程状态-top)
  - [停止进程 kill\killall](#停止进程-killkillall)

<!-- /TOC -->


|简单指令|含义|
|:--|:--|
|`Shift + PgUp`|向上翻页|
|`Shift + PgDn`|向下翻页|
|`pwd`|显示当前路径|
|`clear`|清除控制台|


---
## 编辑

### 文件操作 
1. 创建文件夹 `mkdir xxx`
2. 创建文件 `touch xxx.txt`
3. 删除文件 `rm`
- 删除的既可以是目录也可以是文件，可以使用`rm *.txt`来删除所有TXT文件
- 参数：
  - `-i`：删除时逐一询问
  - `-f`：删除只读文件
  - `-r`：递归删除所有子目录和子文件
### vim 命令
1. 进入
   1. `vi xxx` 进入一个文件
2. 编辑
   1. `i` 表示insert
   2. `a` 表示append 有时候需要
3. 退出
   1. `esc + :q`  退出
   2. `esc + :wq` 保存并退出
   3. `ctrl + z`  有时候需要这种方式退出
   4. 如果是只读文件，需要加 `!` 改为 `:q!` 或 `:wq!` 可以退出
### ls 命令
- `ls` 浏览当前文件夹下的所有文件
- `ls |grep xxx` 只浏览包含xxx的文件



---
## 网络相关

### 显示网络属性、IP地址
- `ip add` 显示网络属性
- `ifconfig` 显示网络属性
- `/etc/sysconfig/network-scripts` 这个文件夹下的文件存放着关乎网络的一些属性

### 重启网络
- `service NetworkManager restart` centos和readhat下重启网络服务
- `service network restart` ubuntu下重启网络服务

### 防火墙相关（CentOS8）

  ```
  查看状态
  systemctl status firewalld.service

  打开防火墙
  systemctl start firewalld.service

  关闭防火墙
  systemctl stop firewalld.service

  开启防火墙
  systemctl enable firewalld.service

  禁用防火墙
  systemctl disable firewalld.service
  ```

### 查看网络连接、端口属性——netstat

常用实例——查看某个端口被哪个应用占用：
```
netstat -anp | grep 端口号
```
![20210223104218](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210223104218.png)

常用参数：

* -a (all)显示所有选项，netstat默认不显示LISTEN相关
* -t (tcp)仅显示tcp相关选项
* -u (udp)仅显示udp相关选项
* -n 拒绝显示别名，能显示数字的全部转化成数字。(重要)
* -l 仅列出有在 Listen (监听) 的服務状态
* -p 显示建立相关链接的程序名(macOS中表示协议 -p protocol)
* -r 显示路由信息，路由表
* -e 显示扩展信息，例如uid等
* -s 按各个协议进行统计 (重要)
* -c 每隔一个固定时间，执行该netstat命令。

---
## yum

1. `yum list installed | grep xxx` 查看所有已安装的xxx
2. `yum [-y] remove xxx` 移除xxx
3. `yum list xxx*` 查看yum能下载的所有版本的xxx
4. `yum [-y] install xxx` 安装xxx

如果没有-y在安装过程中会让你输入y/n,加上-y则不需要这个验证了

---
## 系统设置

### 查看磁盘使用情况
1. `df -h [dir]`展示文件系统的磁盘容量以及使用量，加文件夹展示该文件所在磁盘的使用情况
2. `du -h [dir]`展示某个文件夹的使用情况

### 查看各个进程的CPU占用

```
top
```

---
## 进程相关

### 查看进程信息 ps

最常用的方法：

```
ps -aux | grep 进程代码

例：

ps -aux |grep mysql
```

|参数|含义|
|:-:|:--|
|a|显示当前终端机的所有进程，包括其他用户的|
|u|显示以用户为维度的进程，单用只显示当前用户进程，au可显示所有用户进程|
|x|显示当前用户的所有终端机的进程|
|g|显示以组为维度的进程|
|m|显示进程下的线程|


### 实时查看服务器进程状态 top

|参数|含义|
|:-:|:--|
|H|以线程维度展示|
|p 进程ID|展示某一个进程|

### 停止进程 kill\killall

- `kill 进程ID`

  彻底杀死进程
  ```
  kill -9 进程ID
  ```

- `killall 进程名` 

  杀死名字叫这个的进程
  ```
  killadd 进程名

  例：killall mysqld
  ```














