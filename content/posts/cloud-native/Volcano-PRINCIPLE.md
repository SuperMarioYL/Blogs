---
title: "volcano 原理深度解析"
date: 2025-01-08
draft: false
tags: ["Kubernetes", "DevOps", "云原生AI", "Volcano"]
categories: ["Cloud Native"]
description: "volcano 原理深度解析（gang 调度等）"
---

![image.png](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20250322205612.png)

Volcano 是一个基于 Kubernetes 构建的批处理系统。主要分为四个模块：
- Scheduler：负责作业的调度决策，有多种调度策略，如 gang 调度、priority 调度等
- controller manager：负责管理各种自定义资源（CRD）（volcano 通过 Informer 机制自定义实现，没有实现 reconciler）
- admisson ： 负责验证和修改作业请求
- vcctl： 用户端 client

volcano 会在 Kubernetes 注入三种自定义资源，分别是 
- 资源管理队列 queue
- 任务 job
- 节点组 pod group

来实现调度算法
# 2. volcano 调度核心原理

volcano scheduler 通过抽象调度流程，将调度分为多个动作（action），将不同的调度算法实现为 plugin，将实现 func 注入 session 对象，再通过 session 调度 action，实现整体的调度流程

action 有如下几个：
1. enqueue: 作业进入调度系统
2. allocate: 主要资源分配
3. backfill: 优化资源利用
4. reclaim: 资源回收和重分配
5. preempt: 高优先级任务抢占

pkg/scheduler/scheduler.go
```go
// runOnce executes a single scheduling cycle. This function is called periodically
// as defined by the Scheduler's schedule period.
func (pc *Scheduler) runOnce() {
	klog.V(4).Infof("Start scheduling ...")
	scheduleStartTime := time.Now()
	defer klog.V(4).Infof("End scheduling ...")

	pc.mutex.Lock()
	actions := pc.actions
	plugins := pc.plugins
	configurations := pc.configurations
	pc.mutex.Unlock()

	// Load ConfigMap to check which action is enabled.
	conf.EnabledActionMap = make(map[string]bool)
	for _, action := range actions {
		conf.EnabledActionMap[action.Name()] = true
	}

	ssn := framework.OpenSession(pc.cache, plugins, configurations)
	defer func() {
		framework.CloseSession(ssn)
		metrics.UpdateE2eDuration(metrics.Duration(scheduleStartTime))
	}()

	for _, action := range actions {
		actionStartTime := time.Now()
		action.Execute(ssn)
		metrics.UpdateActionDuration(action.Name(), metrics.Duration(actionStartTime))
	}
}
```


## 2.1 gang 调度核心实现

- 在 Gang 调度中，只有当所有任务都能被调度时，才会分配资源
- 当作业的 MinAvailable 任务无法满足时，不会进行任何资源分配

volcano 对资源的管理 主要分为 queue 和节点级别，queue 资源满足后启动抢占，抢占节点资源，抢占成功则会再内部记录资源分配，当作业的 MinAvailable 任务无法满足时，不会进行任何资源分配，满足了MinAvailable后，开始进行资源的分配，也就是向 K8s 发送请求

**资源占用机制详解**
- 当任务状态从 Pending 变为 Allocated 时，调度器会在内部记录资源分配
- 当任务进入 Binding 状态时，调度器通过 AddBindTask 将任务添加到节点上
- 任务进入 Bound 状态后，Pod 已绑定到节点但可能尚未开始运行
- 当任务进入 Running 状态时，表示 Pod 已在节点上实际运行
**状态流转**
- Pending → Allocated → Binding → Bound → Running
- 任务可能从任何状态转为 Releasing，表示正在删除


pkg/scheduler/plugins/gang/gang.go
在 gangPlugin.OnSessionOpen 方法中，Gang 调度插件注册了多个关键函数：
1. validJobFn: 验证作业是否满足 Gang 调度要求
```go
   validJobFn := func(obj interface{}) *api.ValidateResult {
       job := obj.(*api.JobInfo)
       
       // 检查每个任务是否有足够的有效 Pod
       if valid := job.CheckTaskValid(); !valid {
           return &api.ValidateResult{
               Pass:    false,
               Reason:  v1beta1.NotEnoughPodsOfTaskReason,
               Message: "Not enough valid pods of each task for gang-scheduling",
           }
       }
       
       // 检查有效任务数是否达到最小要求
       vtn := job.ValidTaskNum()
       if vtn < job.MinAvailable {
           return &api.ValidateResult{
               Pass:   false,
               Reason: v1beta1.NotEnoughPodsReason,
               Message: fmt.Sprintf("Not enough valid tasks for gang-scheduling, valid: %d, min: %d",
                   vtn, job.MinAvailable),
           }
       }
       return nil
   }
```

2. preemptableFn: 控制抢占和回收行为，保证 Gang 调度的完整性

```go
   preemptableFn := func(preemptor *api.TaskInfo, preemptees []*api.TaskInfo) ([]*api.TaskInfo, int) {
       var victims []*api.TaskInfo
       jobOccupiedMap := map[api.JobID]int32{}
       
       for _, preemptee := range preemptees {
           job := ssn.Jobs[preemptee.Job]
           if _, found := jobOccupiedMap[job.UID]; !found {
               jobOccupiedMap[job.UID] = job.ReadyTaskNum()
           }
           
           // 只有当作业的运行任务数量大于 MinAvailable 时才允许抢占
           if jobOccupiedMap[job.UID] > job.MinAvailable {
               jobOccupiedMap[job.UID]--
               victims = append(victims, preemptee)
           }
       }
       
       return victims, util.Permit
   }
```

3. jobOrderFn: 确定作业调度的优先顺序
```go
   jobOrderFn := func(l, r interface{}) int {
       lv := l.(*api.JobInfo)
       rv := r.(*api.JobInfo)
       
       lReady := lv.IsReady()
       rReady := rv.IsReady()
       
       // 已就绪的作业优先级高于未就绪的作业
       if lReady && rReady {
           return 0
       }
       if lReady {
           return 1
       }
       if rReady {
           return -1
       }
       return 0
   }
```


## 2.2 priority 调度 原理

- 通过比较任务的优先级值，高优先级任务先调度
- 优先级相同时，顺序不变
- 高优先级任务返回负值，使其在队列中排在前面
- ==**允许高优先级任务抢占低优先级任务的资源**==
- ==**不需要满足同时启动的要求**==