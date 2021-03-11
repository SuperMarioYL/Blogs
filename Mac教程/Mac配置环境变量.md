# Mac配置环境变量

<!-- TOC -->

- [配置方式](#配置方式)
- [重启后不生效解决方法](#重启后不生效解决方法)

<!-- /TOC -->

## 配置方式

```
vi ~/.bash_profile
```

## 重启后不生效解决方法

每次重启后都需要 `source ~/.bash_profile` 

解决方法：

```
vi ~/.zshrc
```

在最后加入一句 `source ~/.bash_profile` 即可