# 为git配置全局代理，解决GitHub colone慢的问题

&emsp;在网上搜索了许多的教程，不管是配置host文件还是别的教程，都没有办法提升GitHub clone的速度，在配置了代理之后速度终于上来了，本教程的前提是你已经配置了ssr。

1. 下载shadowsocksR并配置好代理，保证可用，此部分比较敏感，请自行找解决方法
![20200625171019](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625171019.png)

配置完之后将鼠标放到软件图标上就可以看到他正运行在哪个端口上

2. 配置git socks代理 端口需要改成自己的

```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

取消配置：

git config --global --unset http.proxy
git config --global --unset https.porxy
```

3.查看clone速度

在没有配置代理前速度一直是十几kb每秒，配置完后速度起飞

![20200625163409](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625163409.png)