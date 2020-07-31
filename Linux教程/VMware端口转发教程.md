# VMware端口转发教程（实现主机访问虚拟机端口）

<!-- TOC -->

- [获取虚拟机ip地址（以CentOS8为例）](#获取虚拟机ip地址以centos8为例)
- [关闭Linux防火墙](#关闭linux防火墙)
- [设置虚拟网络编辑器](#设置虚拟网络编辑器)
- [Windows防火墙调整（非必要）](#windows防火墙调整非必要)

<!-- /TOC -->

---
## 获取虚拟机ip地址（以CentOS8为例）

登陆虚拟机后，执行如下命令，获取网络信息

```
ifconfig
```

其中这个ens32对应的inet就是ip地址

![20200801010501](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200801010501.png)

保存下来，接下来使用

---
## 关闭Linux防火墙

  命令如下:

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

---
## 设置虚拟网络编辑器

打开VMware--编辑--虚拟网络编辑器，选择VMnet8,选择NAT设置

![20200801005904](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200801005904.png)

点击添加

![20200801010014](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200801010014.png)

填入数据
- 主机端口就是本地想访问的端口
- 虚拟机ip就是前面获取到的ip
- 虚拟机端口就是你想要转发的端口

![20200801010053](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200801010053.png)

## Windows防火墙调整（非必要）

一般来说执行上面的步骤就可以实现端口转发了，可以先尝试一下能否转发，如果不能成功再看这个步骤。

控制面板选择防火墙

![20200801010928](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200801010928.png)

选择高级设置

![20200801010957](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200801010957.png)

选择入站规则，点击新建规则

