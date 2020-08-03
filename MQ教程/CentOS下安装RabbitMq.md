# CentOS环境RabbitMQ安装与使用

<!-- TOC -->

- [RabbitMQ安装](#rabbitmq安装)
- [RabbitMQ使用](#rabbitmq使用)
  - [启动mq](#启动mq)
  - [查看状态](#查看状态)
  - [停止服务](#停止服务)
  - [插件管理](#插件管理)
    - [启用插件](#启用插件)
    - [插件默认访问地址](#插件默认访问地址)

<!-- /TOC -->

---
## RabbitMQ安装

```
配置文件：
vi /usr/lib/rabbitmq/lib/rabbitmq_server-3.6.5/ebin/rabbit.app
比如修改密码、配置等等，例如：loopback_users 中的 <<"guest">>,只保留guest
查看服务是否成功：
yum install lsof
lsof -i:5672

```

---
## RabbitMQ使用

默认端口：5672
默认用户：guest/guest

### 启动mq

```
rabbitmq-server start
```

### 查看状态

```
rabbitmq-server status
```

### 停止服务

```
rabbitmqctl stop
```

### 插件管理

#### 启用插件

```
rabbitmq-plugins enable rabbitmq_management
```

#### 插件默认访问地址

```
http://127.0.0.1:15672/
```