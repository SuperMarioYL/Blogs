# Docker client.timeout解决办法

在从docker仓库下载镜像时，如果报这个错误，一般是由于国内网络环境造成的，我们配置成阿里的网址就好了，这里介绍一下centos下如何使用阿里的镜像仓库

1. 打开daemon.json

```
cd /etc/docker/
vi daemon.json
```
![20200626190215](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200626190215.png)

2. 在daemon.json中配置如下，这样就会从这个地址下载镜像了

```
{
  "registry-mirrors": [
    "https://khec465u.mirror.aliyuncs.com" 
  ]
}
```
![20200626190423](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200626190423.png)

3. 改完后需要重新加载daemon并重新启动docker

```
systemctl daemon-reload
systemctl restart docker 
```

4. 配置完后，就可以愉快的下载镜像啦

![20200626190701](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200626190701.png)