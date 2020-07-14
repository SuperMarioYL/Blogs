## 目录

#### [一、系统设置](#system)
#### [二、编辑相关](#edit)
#### [三、网络相关](#network)
#### [四、yum命令](#yum)


## <a id="system">系统设置</a>

1. 去掉虚拟机报警声
```
方法1：
rmmod pcspkr

方法2：

vim /etc/inputrc 

把这一行的注释去掉重启即可

set bell-style none
```

2. 设置共享文件夹
   1. 设置windows共享文件夹
   2. 安装vmtools
   3. linux 命令

```
vmware-hgfsclient #查看共享文件夹名称

mkdir /sharefiles #创建linux共享目录

/usr/bin/vmhgfs-fuse .host:/ /sharefiles -o subtype=vmhgfs-fuse,allow_other 
#/sharefiles 即为我设置的共享文件夹在虚拟机下的位置
```
---

## <a id="edit">编辑相关</a>

1. 清除控制台 `clear`
2. 文件操作 
   1. 创建文件夹 `mkdir xxx`
   2. 创建文件 `touch xxx.txt`
   3. 删除文件 `rm`
      - 删除的既可以是目录也可以是文件，可以使用`rm *.txt`来删除所有TXT文件
      - 参数：
        - `-i`：删除时逐一询问
        - `-f`：删除只读文件
        - `-r`：递归删除所有子目录和子文件
3. 翻页 
   - 向上翻页 `Shift + PgUp`
   - 向下翻页 `Shift + PgDn`
4. vim 命令
   1. 进入
      1. `vi xxx` 进入一个文件
   2. 编辑
      1. `i` 表示insert
      2. `a` 表示append 有时候需要
   3. 退出
      1. `esc + :q`  退出
      2. `esc + :wq` 保存并退出
      3. `ctrl + z`  有时候需要这种方式退出
5. `ls` 浏览当前文件夹下的所有文件
   - `ls |grep xxx` 只浏览包含xxx的文件

6. `pwd` 显示当前路径


---
## <a id="network">网络相关</a>

1.  `ip add` 显示当前ip

---
## <a id="yum">yum命令</a>

1. yum 命令
   1. `yum list installed | grep xxx` 查看所有已安装的xxx
   2. `yum [-y] remove xxx` 移除xxx
   3. `yum list xxx*` 查看yum能下载的所有版本的xxx
   4. `yum [-y] install xxx` 安装xxx

如果没有-y在安装过程中会让你输入y/n,加上-y则不需要这个验证了

















