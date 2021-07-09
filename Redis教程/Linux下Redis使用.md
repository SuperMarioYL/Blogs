# Linux下Redis使用

<!-- TOC -->

- [redis常用命令](#redis常用命令)
- [常见问题](#常见问题)

<!-- /TOC -->

---
## redis常用命令

redis-server 是Redis服务命令

redis-cli 是Redis连接工具命令

1. 启动Redis服务

```
redis-server [--port 6379]

或者依赖redis.conf 启动
redis-server /home/yulei12/.jumbo/etc/redis.conf
```

2. 关闭redis服务

```
redis-cli [-h 127.0.0.1] [-p 6379] shutdown
```

3. 连接Redis

```
redis-cli [-p 6379]
```

---
## 常见问题

