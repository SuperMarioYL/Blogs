## git配置文件解析，配置命令详解

Git有三个等级的系统文件，Git默认不会创建这些配置文件，只有你编辑他们的时候，他们才会被创建，平常我们使用命令行来修改就可以了，他们分别存放于不同的位置。

### 目录
1. [配置文件介绍](#1)
2. [配置命令详解](#2)
   - [编辑配置文件](#21)
   - [编辑单个配置](#22)
   - [查看某个配置](#23)
   - [重置某个配置](#24)
---
### <a id='1'>配置文件介绍</a>

#### system
- 系统级别，一般存放系统设置，作用范围最大
- 一般存放于`[Git安装目录]\mingw64\etc\gitconfig`,但是Git不会自动生成这个文件只有通过命令编辑文件后，该文件才会生成,编辑命令`git config --system --edit`

#### global
- 全局文件，整个系统用户范围内生效，作用范围比system小
- 配置文件不会自动生成，通过命令`git config --global --edit`编辑之后生成，位置默认在`C:\Users\Administrator\.gitconfig`

#### local
- 每个仓库的配置文件，作用范围最小，只在本仓库生效
- clone或者init时自动生成，位置在`.git\config`

注：既然配置文件有3种，那如果有一个属性，三种配置文件里都有配置，且各不相同，会取哪个属性呢？
答：作用范围越小的优先生效，这不难理解，这样可以为每个仓库每个用户做单独的配置

---
### <a id='2'>配置命令详解</a>

- <a id='21'>编辑配置文件</a>
  - 加上`--global`可以编辑全局配置，其他配置文件以此类推，放在`-e`或者`--edit`的左右两侧都可以
  - `--edit`可简写成`-e`
  - 如果不加`--global`等参数，默认编辑的是仓库配置文件
    ```
    git config [--global|--local|--system] --edit
    git config [--global|--local|--system] -e
    ```

    例子：
    
    ![20200711174319](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711174319.png)

    执行编辑全局配置文件的命令后，配置文件会自动打开，git bash 会等待你编辑完配置文件后才会进行下一步的动作，用什么编辑器打开文件则是使用的在你安装Git时选择的编辑器。

    ![20200711174410](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711174410.png)

- <a id='22'>编辑单个配置</a>

打开我的全局配置文件会发现如下的属性：

![20200711174936](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711174936.png)

怎么看配置文件呢？

比如`name`这个属性，我们想要用git命令编辑的时候，就用`user.name`这种方式来找到他

编辑单个配置命令如下：

```
//xxx为要修改的属性，sss为需要配置的内容
git config [--global|--system|--local] xxx 'sss'
```
举例：

```
//配置全局配置文件中的user.name
git config --global user.name 'leilei'
```

- <a id='23'>查看某个配置</a>

```
//xxx为要获取的配置
git config --get [--global|--local|--system] xxx
```

举例：

![20200711175821](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711175821.png)

- <a id='24'>重置某个配置</a>

```
//xxx为要重置的配置
git config --unset [--global|--local|--system] xxx
```