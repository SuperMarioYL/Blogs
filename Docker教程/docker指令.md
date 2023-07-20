# Docker 命令

## 容器

1. `docker ps [-a]` 查看所有容器
2. `docker run` 运行容器
   1. `docker run --network=host --ipc=host --name rrtty  -itd iregistry.baidu-int.com/paddlecloud/base-images:paddlecloud-centos7.8-gcc8.2-cuda11.0-cudnn8 /bin/bash`
3. `docker rm <name>` 删除容器

| 命令           | 描述         | 例子                                                                               |
| :------------- | :----------- | :--------------------------------------------------------------------------------- |
| docker ps [-a] | 查看所有容器 | docker ps                                                                          |
| docker run     | 运行容器     | docker run --network=host --ipc=host --name {name} -itd iregistry/contos /bin/bash |
| 1              | 1            | 1                                                                                  |
| 1              | 1            | 1                                                                                  |
