# jdk升级工具和注意事项

## jdk升级工具

### 依赖版本检查工具 versions-maven-plugin
该插件可以帮助你检查并更新项目依赖版本，同时可以检查依赖是否兼容新的Java版本。

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>versions-maven-plugin</artifactId>
    <version>2.8.1</version>
    <configuration>
        <reportVersions>true</reportVersions>
    </configuration>
</plugin>
```
运行以下命令生成报告：

```sh
mvn versions:display-dependency-updates
```


## jdk升级注意事项

