# Linux查找命令

## find

格式：`find <指定目录> <指定条件> <指定动作>`

例子：

```shell
#搜索 / 目录下名字为my开头的文件
find / -name "my*"

#搜索 / 目录下名字为my开头的文件 并显示详细信息
$ find . -name "my*" -ls

#
```