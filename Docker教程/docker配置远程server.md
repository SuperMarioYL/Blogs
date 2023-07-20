# docker 配置远程server

## 一、远程主机上安装 docker（centos7+为例）

centos6及以下对 docker 的支持并不好，请在centos7及以上版本安装

在 CentOS 7 上安装 Docker，可以按照以下步骤进行操作：

1. 更新系统：

```shell
sudo yum update
```

2. 安装所需的依赖包：

```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

3. 添加 Docker 的软件源：

```shell
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

>配置阿里云源
>sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo



1. 安装 Docker 引擎：


```shell
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

5. 启动 Docker 服务：

```shell
sudo systemctl start docker
```

>停止 Docker 服务
>systemctl stop docker docker.socket

6. 设置 Docker 服务开机自启动：

```shell
sudo systemctl enable docker
```

7. 验证 Docker 是否成功安装：

```shell
docker version
```

## 二、Docker 开启远程 API

要在 Docker 中启用远程 API，你可以按照以下步骤进行操作：

1. 编辑 Docker 服务的配置文件：

```shell
sudo vi /lib/systemd/system/docker.service
```

2. 在配置文件中找到 `ExecStart` 行，并在行末尾添加以下参数：

```text
-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
```
这将允许 Docker 监听所有网络接口上的 TCP 请求。

如果你只想允许特定 IP 地址的连接，请将 0.0.0.0 替换为相应的 IP 地址。

3. 保存并关闭配置文件。

4. 重新加载 Docker 配置：

```shell
sudo systemctl daemon-reload
```

5. 重启 Docker 服务：

```shell
sudo systemctl restart docker
```

现在，Docker 远程 API 已经启用，并监听在默认端口 2375 上。你可以通过远程主机上的 Docker 客户端与该主机建立连接并管理 Docker。

请注意，开启 Docker 远程 API 可能会带来安全风险，因为远程未经身份验证的访问可以对主机造成潜在的风险。为了确保安全，请确保在安全的网络环境下使用，并采取适当的安全措施，如配置防火墙规则、限制访问等。

此外，Docker 还提供了 TLS 加密选项来保护远程 API 通信的安全性。你可以使用证书和密钥来配置 Docker 远程 API 的 TLS 加密。有关如何使用 TLS 加密的详细信息，请参考 Docker 官方文档。

请记住，对于特定的操作系统和 Docker 版本，可能会有一些细微的差异和特定的配置要求。如有需要，请参考 Docker 和系统文档以获取更详细和准确的信息。

## Mac docker client 链接远程 docker server

使用 Docker 客户端在 macOS 上管理远程服务器上的 Docker 服务。以下是一些步骤来配置和使用 Docker 客户端连接到远程服务器的 Docker 服务：

1. 在远程服务器上确保 Docker 服务正在运行，并已配置为允许远程连接。你可以参考 Docker 官方文档或相关操作系统的文档来完成这些步骤。

2. 在 macOS 上打开终端应用程序(Docker Desktop)。

3. 在终端中使用以下命令配置 Docker 客户端连接到远程服务器：

```shell
# vi ~/.bash_profile && source
export DOCKER_HOST=tcp://10.xx.xx.xxx:2375
```
将 10.xx.xx.xxx 替换为你的远程服务器的 IP 地址。

4. 确认 Docker 客户端已正确配置为连接到远程服务器：

```shell
docker version
```
这将显示与远程服务器上的 Docker 服务相关的版本和详细信息。

5. 现在，你可以使用 Docker 客户端在 macOS 上管理远程服务器上的 Docker 服务，包括运行容器、管理镜像、查看日志等操作。

请注意，连接到远程 Docker 服务可能需要一些网络设置，如防火墙规则和网络访问权限。确保远程服务器的防火墙允许来自 macOS 客户端的连接，并且你具有适当的网络访问权限。

希望这些步骤能帮助你在 macOS 上使用 Docker 客户端管理远程服务器的 Docker 服务。如有任何进一步的问题，请随时提问。

