# Milvus 集群线上问题记录


## 问题现象

下午 2点多，突然线上Milvus集群全部崩溃了，具体表现如下：

- 大量Node OOM

![k8s集群Node OOM](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/1c1c822d819f201d2c63b74e7e5f0522.png)

- 机器负载本不高，但1-2分钟内cpu、内存、负载全部被打满

![cpu、内存、负载全部瞬间被打满](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/7e819244af017f1168f3582caec7d8ef.png)

- querynode 大批量被驱逐

![querynode 大批量被驱逐](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20240626110719.png)


- 多个 Namespace 下的服务均不可用，均受到影响

## 问题排查

监控如下：

![20240626115719](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20240626115719.png)

![20240626120829](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20240626120829.png)


初步原因定位是对单个 querynode 的压力，超过了集群物理机所能负载的上限，正常情况下querynode 崩溃，会在其他物理机上重建，具有自恢复能力，问题时间段，有一个querynode一直在重建，但是负载太高了，每次重建物理机的资源都不够，所以一直在不同的物理机上一直重建，造成多台物理机OOM，造成集群崩溃

## 解决方案

根本解决方案：

原有机器为 4C16G 配置，新扩容 多台 8C32G 配置，解决问题。

实际操作：

1. 扩容多台 8C32G 物理机
2. 标记 OOM 节点为不可调度

```shell
kubectl cordon <node-name>
```

3. 驱逐 OOM 节点上的 pod 到新集群

```shell
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data
```


