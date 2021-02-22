# Linux增加快捷操作

```
vi ~/.bashrc
```

通过如下格式指定快捷操作命令和执行的流程，可以实现快捷操作

```
alias rootsql = 'mysql -u root -p123456'
```

执行多个命令可以用 `;` 来分隔，例如：
```
alias mv ='commandA;commandB'
```

完成之后执行编译操作

```
source ~/.bashrc
```

然后就可以在bash使用这个操作了
#rootsql

