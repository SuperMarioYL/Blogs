# HTTP请求过程

<!-- TOC -->

- [流程介绍](#流程介绍)
- [请求在Tomcat的处理流程](#请求在tomcat的处理流程)
- [DispatcherServlet的处理流程](#dispatcherservlet的处理流程)

<!-- /TOC -->

## 流程介绍

&emsp;Springboot启动时从Application文件开始的，启动时会启动内嵌的Tomcat容器，Tomcat容器开始监听指定的端口，并扫描指定范围的并且扫描给定范围内的configurations，beans，components，services，注册到 `applicationContext` 上下文中，默认是单例模式生成这些实例，并且解析 `静态配置文件的内容` 当作常量， 也一并加载到服务中。

&emsp;SpringMVC处理请求的核心类是：DispatcherServlet，所有的 Web 请求都需要通过它来处理，进行转发，匹配，数据处理后，并转由页面进行展现，它是 SpringMVC 最核心的部分。Tomcat会将所有的请求都交给 DispatcherServlet 的 doService 方法处理。


![20210309235613](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210309235613.png)


## 请求在Tomcat的处理流程

源码分析
```mermai
graph TD
  1(HTTP请求) --> 2
  subgraph Tomcat
  2(connector) --> saf
  end
```

Tomcat通过connector组件来监听端口（默认是8080），具体把请求打到到代码中则是在Acceptor（接收器）线程中，该线程是主要是用来接收请求使用的。

`org.apache.tomcat.util.net.Acceptor.run()`

在执行到该行（G：95）时会等待请求进来，在接收到请求后会继续走下一步代码

![20210311014616](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210311014616.png)



请求传递至 SocketProcessorBase ，执行run()方法，run方法内会调用doRun()

![20210312004542](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312004542.png)

由于 SocketProcessorBase 并没有实现doRun方法，则会调用其子类——EndPoint的内部类 SocketProcessor 的实现方法，以 NioEndPoint 内部类 SocketProcessor 为例

![20210312004858](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312004858.png)

在 NioEndPoint.SocketProcessor.doRun() 中调用了 AbstractEndpoint.Handler.process()

![20210312005457](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312005457.png)

由于是接口，所以实际调用的是 org.apache.coyote.AbstractProtocol.process() 

然后在方法中调用了 org.apache.coyote.AbstractProcessorLight.process()

![20210312010911](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312010911.png)

在方法中调用了 AbstractProcessorLight.service()

![20210312011236](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312011236.png)

该方法是抽象方法，所以实际调用的是 org.apache.coyote.http11.Http11Processor.service() ，在方法中又调用了 org.apache.catalina.connector.CoyoteAdapter.service() 

![20210312011638](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312011638.png)

在方法中调用如下方法：

![20210312011925](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312011925.png)

通过一系列的invoke() 执行到 org.apache.catalina.core.StandardWrapperValve.invoke() 在方法中调用了 ApplicationFilterChain.doFilter()

![20210312012959](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312012959.png)

在internalDoFilter() 中遍历了所有的filter，最后调用了HttpServlet的service()方法

![20210312015503](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312015503.png)

在方法中根据method类型调用不同的方法，以doPost() 为例，最后调用了org.springframework.web.servlet.FrameworkServlet.doPost(), 在其中调用 processRequest() 方法，在方法中调用了DispatcherServlet 的doService() 方法

![20210312020317](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312020317.png)

![20210312020246](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210312020246.png)


## DispatcherServlet的处理流程



