# Spring定时任务的基本使用

<!-- TOC -->

- [基本使用](#基本使用)
- [cron表达式](#cron表达式)

<!-- /TOC -->

## 基本使用

1. 在启动类上加上注解 `@EnableScheduling` 开启定时任务

![20210417182737](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210417182737.png)

2. 创建受 Spring Bean 管理的类 

![20210417182936](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210417182936.png)

3. 在方法前加入注解 `@Scheduled(cron = "0/2 * * * * ? ")` 括号内是 cron 表达式

![20210417183138](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20210417183138.png)

## cron表达式

