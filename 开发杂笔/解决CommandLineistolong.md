Idea启动项目报错:Command line is too long. Shorten command line for className or also for JUnit defaultconfiguration.

解决方法：

在该项目文件夹.idea/workspace.xml中找到

```
<component name="PropertiesComponent">

  ...

</component>
```

然后在其中添加:

```
<property name="dynamic.classpath" value="true" />
```

问题得到解决。