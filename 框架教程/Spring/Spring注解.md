# Spring注解

<!-- TOC -->

- [@ConfigurationProperties](#configurationproperties)

<!-- /TOC -->

## @ConfigurationProperties

[使用教程](https://www.cnblogs.com/tian874540961/p/12146467.html)

例子：
```java
@ConfigurationProperties(prefix = "spring.datasource")
@Component
public class DatasourcePro {

    private String url;

    private String username;

    private String password;

    // 配置文件中是driver-class-name, 转驼峰命名便可以绑定成
    private String driverClassName;

    private String type;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDriverClassName() {
        return driverClassName;
    }

    public void setDriverClassName(String driverClassName) {
        this.driverClassName = driverClassName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
```

注：@ConfigurationProperties 的 POJO类的命名比较严格,因为它必须和prefix的后缀名要一致, 不然值会绑定不上, 特殊的后缀名是“driver-class-name”这种带横杠的情况,在POJO里面的命名规则是 下划线转驼峰 就可以绑定成功，所以就是 “driverClassName”