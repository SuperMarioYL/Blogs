# 解决“没有未桥接的主机网络适配器”或没有vmnet0

如果在VMware设置桥接的时候报“无法将网络改为桥接状态没有未桥接的主机网络适配器” 或者没有vmnet0 可能的原因是你没有用管理员打开VMware（我的VMware版本是15）

解决办法：

1. 找到VMware.exe
2. 右键“属性”
3. 找到“兼容性”
4. 勾选以管理员身份登陆

![20200731221627](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200731221627.png)

5. VMware打开编辑--虚拟网络编辑器
6. 点击移除所有网络
7. 点击还原默认设置

一般来说这样就可以了