# docker 解决下载慢问题

## 配置镜像源

1. 打开文件
   
```shell
vi /etc/docker/daemon.json
```

2. 配置数据目录和镜像源

https:

```json
{
  "data-root": "/home/work/yulei12/docker/docker_data",
  "registry-mirrors": [
    "https://docker.mirrors.tuna.tsinghua.edu.cn",
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

如果遇到 TLS handshake timeout 则使用如下配置：

http:

```json
{
  "data-root": "/home/work/yulei12/docker/docker_data",
  "registry-mirrors": [
    "http://f1361db2.m.daocloud.io",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.tuna.tsinghua.edu.cn",
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```


1. 重启docker

```shell
systemctl daemon-reload
systemctl restart docker
```

## 异地下载然后导入

可以先下载 Docker 镜像，然后在需要的时候导入它。这在网络连接不稳定或者带宽有限的情况下特别有用。以下是如何做到这一点的步骤：

1. 下载镜像

首先，你需要在有网络连接的机器上下载镜像。你可以使用 docker pull 命令来下载镜像，例如：

```shell
docker pull apachepulsar/pulsar:2.8.0
```

2. 保存镜像

下载完镜像后，你可以使用 docker save 命令来将镜像保存为一个 tar 文件，例如：

```shell
docker save -o pulsar.tar apachepulsar/pulsar:2.8.0
```
这将会创建一个名为 pulsar.tar 的文件，这个文件包含了 apachepulsar/pulsar:2.8.0 镜像的所有层。

3. 导入镜像

你可以将这个 tar 文件复制到其他机器上，然后使用 docker load 命令来导入镜像，例如：

```shell
docker load -i pulsar.tar

```
这将会从 pulsar.tar 文件中导入镜像。

