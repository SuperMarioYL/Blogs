# CentOS环境RabbitMQ安装与使用

<!-- TOC -->

- [1. RabbitMQ安装](#1-rabbitmq安装)
- [2. RabbitMQ使用](#2-rabbitmq使用)
  - [2.1. 启动mq](#21-启动mq)
  - [2.2. 查看状态](#22-查看状态)
  - [2.3. 停止服务](#23-停止服务)
  - [2.4. 插件管理](#24-插件管理)
    - [2.4.1. 启用插件](#241-启用插件)

<!-- /TOC -->

---
## 1. RabbitMQ安装

```
配置文件：
vi /usr/lib/rabbitmq/lib/rabbitmq_server-3.6.5/ebin/rabbit.app
比如修改密码、配置等等，例如：loopback_users 中的 <<"guest">>,只保留guest
查看服务是否成功：
yum install lsof
lsof -i:5672

```

---
## 2. RabbitMQ使用

默认端口：5672
默认用户：guest/guest

### 2.1. 启动mq

```
rabbitmq-server start
```

### 2.2. 查看状态

```
rabbitmq-server status
```

### 2.3. 停止服务

```
rabbitmqctl stop
```

### 2.4. 插件管理

#### 2.4.1. 启用插件

命令：
```
rabbitmq-plugins enable rabbitmq_management
```

插件默认访问地址：
```
http://127.0.0.1:15672/
```
