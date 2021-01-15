# Java项目使用@Test注解测试（以Idea为例）

1. 打开 File -> Project Structure

![20210115174456](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210115174456.png)

2. 选择 Project Settings -> Libraies -> +号 -> java
![20210115190334](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210115190334.png)

3. 选择idea目录的lib路径下的jar包
   1. `hamcrest-core-xxx.jar`
   2. `junit-xxx.jar`

![20210115190620](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20210115190620.png)

4. 将jar包导入项目，即可正常使用`@Test`注解