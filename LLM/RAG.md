关于 RAG 的业界实现与 Unstructured 拆解
复制
AI
超级助理
通用
图片
表格
分栏
附件
代码块
公式
超链接
提及
阅读统计
高亮信息
流程图
思维导图
在此处拆分卡片
布局
默认分栏
模块分栏
编号分栏
时间线分栏
箭头分栏
文本格式
正文
一级标题
二级标题
三级标题
四级标题
五级标题
六级标题
无序列表
有序列表
待办列表
引用
分割线
数据表
表格视图
相册视图
看板视图
甘特视图
日历视图
架构视图
图表
柱状图
条形图
饼状图
折线图
散点图
第三方应用
DuChat
Beta
百度地图
CodePen
Figma
一、介绍
1 背景与目标
原目标应该是通过拆解 Unstructured 包的实现方案，增强结构化和半结构化数据（Semi-structuredData ）在 RAG 中的相关性以及灵活性。为了满足提升整体 RAG 效果的目标，改为探讨 RAG 开源解决方案，以及结构化和半结构化数据在其中的表现。
2 知识来源：
开源框架：
﻿﻿https://github.com/Unstructured-IO﻿ 半结构化处理包
﻿﻿https://github.com/netease-youdao/QAnything﻿ 网易有道开源的 RAG 解决方案
﻿﻿https://github.com/infiniflow/ragflow﻿ 义柏资本开源 RAG 解决方案
﻿﻿https://github.com/weaviate/Verba﻿ weaviate 开源 RAG 解决方案
﻿﻿https://github.com/QuivrHQ/quivr﻿ Quivr 开源 RAG 解决方案（RAG 类目里⭐最高️，但是效果有待商榷）
自定义框架，非解决方案：
﻿﻿https://github.com/run-llama/llama_index﻿ 
﻿﻿https://github.com/langchain-ai/langchain﻿
﻿﻿https://github.com/deepset-ai/haystack﻿
﻿﻿https://github.com/phidatahq/phidata﻿ 
闭源服务：
﻿﻿https://cohere.com/﻿ 
引用：
[1] Retrieval-Augmented Generation for Large Language Models: A Survey
[2] A Method for Parsing and Vectorization of Semi-structuredData used in Retrieval Augmented Generation
[3] Give Us the Facts: Enhancing Large Language Models with Knowledge Graphs for Fact-aware Language Modeling
[4] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.
[5] Advanced Unstructured Data Processing for ESG Reports:A Methodology for Structured Transformation and Enhanced Analysis.
[6] Unifying Large Language Models and Knowledge Graphs: A Roadmap.
﻿
二、RAG 拆解与各类开源实现
1 简述
当前的通用技术可能还是在 Advanced RAG 里深化拓展，自定义工作流一定程度上能实现 Modular RAG ，通用性可能有待商榷，本次不展开；
﻿
Advanced RAG 一般有以下三个阶段：
输入自定义信息补充私域知识库，如：
模糊解析半结构化数据并存入向量库，为相似语义提供材料；
准确抽取实体与相互关系，融合入图谱，作为事实很近的材料；
结构化数据走 ETL 流程；
LLM 解读或拆解用户提问得到合适的 query 和 sub query，检索相关信息和事实，如：
使用向量检索语义相近的文档元素；
使用图谱检索事实相近的元素；
走数据仓查找相关的结构化数据；
通过背景资料剔除无意义的信息；（如原始数据的插入时间可能有意义，但不会体现在本文本身）
分类、筛选、再排序，提升有效数据的曝光度；
聚合检索信息作为上下文，咨询 LLM 多轮对话再生成文本；
﻿
以下待补充：
数据到图谱；
结构化数据 ETL；
生成最终文本结果的 Prompt 策略；
【检索召回】 <--> 【LLM 生成结果】两者间反复多轮微调，迭代检索；
.......
﻿
2 Advanced RAG 流程拆解
2.1 知识库构造
2.1.1 走向量，实现语义相近的半结构化数据录入
2.1.1.1 文档解析
朴素方式
2.1.1.2 分块（不展开，文档解析合理，分块水到渠成）
2.1.1.3 表格处理
2.1.1.4 清除无关数据
2.1.1.5 构造索引
﻿
2.1.2 走图谱（待补充）
﻿
2.1.3 结构化 ETL（待补充）
﻿
2.2.2 数据检索
2.2.3 生成（待补充）
﻿
四、RAG 评测
﻿
五、Unstructured 拆解
