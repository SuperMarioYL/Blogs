# 博客站点操作命令

注意：-f 需要加在 up/down 前面

## 启动(和更新)服务

```shell
# halo启动
docker-compose -f halo.yaml -p halo  up -d 
# npm 启动
docker-compose -f npm.yaml -p npm  up -d 
# 图床启动
docker-compose -f picbed.yaml -p picbed up -d
## 不加-f 默认查找 docker-compose.yml
```

## 查看日志

- 查看所有日志

```shell
docker-compose logs -f
```

- 查看某个服务的日志

```shell
docker-compose logs -f <service_name>
```

## 停止服务

- 停止所有服务

```shell
docker-compose down
```

- 停止某个文件定义的服务

```shell
docker-compose -f halo.yaml down
```
