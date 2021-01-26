# Spring基本概念

<!-- TOC -->

- [1. SpringMVC和SpringBoot的区别？](#1-springmvc和springboot的区别)
- [2. Spring的核心理念？](#2-spring的核心理念)
  - [2.1. 什么是IOC？什么是IOC容器？](#21-什么是ioc什么是ioc容器)
  - [2.2. AOP是什么？](#22-aop是什么)
- [3. 将Bean放入容器——装配Bean](#3-将bean放入容器装配bean)
- [4. 获取Bean——依赖注入（Dependency Injection | DI）](#4-获取bean依赖注入dependency-injection--di)
- [5. Bean的生命周期](#5-bean的生命周期)

<!-- /TOC -->

---
## 1. SpringMVC和SpringBoot的区别？

- 传统的SpringMVC项目需要配置IOC容器、DispatcherServlet以及第三方服务器比如Tomcat，配置完成后才可以开发。
- SpringBoot在开始阶段做了很多自动配置的约定，让我们可以通过Maven配置文件POM.xml引入所需要的包就可以直接开发，简化了开发流程，可以快速搭建项目，并且SpringBoot还提供了监控的功能。

---
## 2. Spring的核心理念？

- 控制反转 IOC（Inversion of Control）
- 面向切面编程 AOP（Aspect Oriented Programming）

### 2.1. 什么是IOC？什么是IOC容器？

&emsp;IOC是一种通过描述来生成或者获取对象的技术。在普通的java项目中，通常使用 `new` 关键字来创建对象，而在Spring中则不是，是通过描述来创建对象，具体到SpringBoot则是用注解形式的描述来创建对象。Spring中对于需要管理的对象统称为Bean。

&emsp;IOC容器就是用来管理Bean的容器

### 2.2. AOP是什么？

&emsp;AOP是一种面向切面编程的思想，Spring AOP 实际上就是一种约定的流程，通过一系列的注解或者其他术语，把这段代码编入一段流程中去。

用到的注解：
- @Aspect
- @Before
- @After
- @AfterReturning
- @AfterThrowing

---
## 3. 将Bean放入容器——装配Bean

可以装配Bean的注解如下：
1. @Bean
2. @Component
3. @ComponentScan
4. 其他继承了@Conponent注解的注解，比如@Sevice

---
## 4. 获取Bean——依赖注入（Dependency Injection | DI）

依赖注入的注解：
1. @Autowired（根据Bean的类型注入）
2. @Primary（要注入的Bean有多种类型时，可加该注解注明优先级）
3. @Qualifier（根据Bean的名称注入，需要和@Autowired配合使用）

---
## 5. Bean的生命周期

![Bean的声明周期](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/Bean的声明周期.jpg)