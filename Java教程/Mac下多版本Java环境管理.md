# Mac下多版本Java环境管理

## sdkman

https://sdkman.io/

sdkman 来管理 java、maven

### 安装

https://sdkman.io/install

### 可管理的 sdk

https://sdkman.io/sdks

### 安装 java

使用以下命令列出所有可用的 Java 版本：

```shell
sdk list java
```

安装特定版本的java

```shell
sdk install java 8.0.412-amzn
sdk install java 11.0.23-amzn
sdk install java 17.0.11-amzn
sdk install java 21.0.3-amzn
```

使用 特定版本的java

```shell
sdk use java 8.0.412-amzn
sdk use java 11.0.23-amzn
sdk use java 17.0.11-amzn
sdk use java 21.0.3-amzn
```

设置默认版本的java


```shell
sdk default java 8.0.412-amzn
```

### 安装 maven

列出所有 maven 版本

```shell
sdk list maven
```

安装特定版本的maven

```shell
sdk install maven 3.8.8
sdk install maven 3.9.8
```

使用 特定版本的maven

```shell
sdk use maven 3.8.8
sdk use maven 3.9.8
```


设置默认版本的maven

```shell
sdk default maven 3.8.8
```
