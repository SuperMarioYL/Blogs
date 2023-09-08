# Error: This command has to be run under the root user. 解决方法

如果在linux执行命令时遇到"Error: This command has to be run under the root user.",则表示你不是有root权限的用户，需要在你的命令前加`sudo`

未加前：

![20200730001703](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200730001703.png)

加sudo之后：

![20200730001859](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200730001859.png)

如果出现了“xxx is not in the sudoers file.  This incident will be reported.”，是因为你没有把当前用户赋予sudo权限