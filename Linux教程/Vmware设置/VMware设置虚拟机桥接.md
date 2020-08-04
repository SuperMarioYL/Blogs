# VMware设置虚拟机桥接
<!-- TOC -->

- [设置虚拟机桥接](#设置虚拟机桥接)
- [设置虚拟网络编辑器](#设置虚拟网络编辑器)

<!-- /TOC -->


## 设置虚拟机桥接

右键虚拟机选择设置，打开设置之后选择网络适配器，将网络连接模式改为桥接模式。

![20200731211448](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200731211448.png)

## 设置虚拟网络编辑器

在VMware主界面--编辑--虚拟网络编辑器路径下打开虚拟网络编辑器，找到vmnet0。

如果打开之后没有vmnet0,如下图所示：

![20200731220640](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200731220640.png)

可能的原因是你不使用管理员登陆的

解决办法：

1. 找到VMware.exe
2. 右键“属性”
3. 找到“兼容性”
4. 勾选以管理员身份登陆

![20200731221627](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200731221627.png)

5. VMware打开编辑--虚拟网络编辑器
6. 点击移除所有网络
7. 点击还原默认设置

这样vmnet0就出来了

![20200731221218](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200731221218.png)

随后将已桥接改为自己的网卡



