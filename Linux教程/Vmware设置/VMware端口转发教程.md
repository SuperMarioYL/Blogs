# VMware端口转发教程（实现主机访问虚拟机端口）

<!-- TOC -->

- [获取虚拟机ip地址（以CentOS8为例）](#获取虚拟机ip地址以centos8为例)
- [关闭Linux防火墙](#关闭linux防火墙)
- [设置虚拟网络编辑器](#设置虚拟网络编辑器)
- [Windows防火墙调整（非必要）](#windows防火墙调整非必要)
- [Win10防火墙调整（非必要）](#win10防火墙调整非必要)
- [总结](#总结)

<!-- /TOC -->

---
## 获取虚拟机ip地址（以CentOS8为例）

登陆虚拟机后，执行如下命令，获取网络信息

```
ifconfig
```

其中这个ens32对应的inet就是ip地址

![20200801010501](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801010501.png)

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

![20200801005904](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801005904.png)

点击添加

![20200801010014](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801010014.png)

填入数据
- 主机端口就是本地想访问的端口
- 虚拟机ip就是前面获取到的ip
- 虚拟机端口就是你想要转发的端口

![20200801010053](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801010053.png)

## Windows防火墙调整（非必要）

一般来说执行上面的步骤就可以实现端口转发了，可以先尝试一下能否转发，如果不能成功再看这个步骤。

控制面板选择防火墙

![20200801010928](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801010928.png)

选择高级设置

![20200801010957](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801010957.png)

选择入站规则，点击新建规则

![20200801011955](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801011955.png)

选择端口

![20200801012028](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801012028.png)

选择TCP，选择特定端口，将之前设置的主机端口写上

![sdfsad](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/Snipaste_2020-08-01_01-24-41.png)

选择允许连接

![sdfsad](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/Snipaste_2020-08-01_01-24-58.png)

全选

![sdfsad](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/Snipaste_2020-08-01_01-25-08.png)

输入一个自己的名字

![sdfsad](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/Snipaste_2020-08-01_01-25-20.png)

结果如下，这样就可以将这个端口排除在防火墙外了

![sdfsad](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/Snipaste_2020-08-01_01-25-34.png)

## Win10防火墙调整（非必要）

如果你是Win10，上面的这些操作你都设置了都不生效，那么把入站规则的这3个都勾选在尝试一下

![20200801013430](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200801013430.png)


## 总结

以上便是VMware端口转发的流程，如果还不成功，欢迎私信我