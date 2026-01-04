---
title: "RAG 系统设计：从原型到生产"
date: 2024-01-05
draft: false
tags: ["RAG", "LLM", "向量数据库", "LangChain"]
categories: ["AI Infra"]
description: "构建企业级 RAG 应用的完整指南"
---

## RAG 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    RAG Pipeline                          │
│                                                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────┐  │
│  │  Query  │───▶│ Embed   │───▶│ Retrieve│───▶│ LLM │  │
│  └─────────┘    └─────────┘    └─────────┘    └─────┘  │
│                       │              │                   │
│                       ▼              ▼                   │
│               ┌─────────────────────────┐               │
│               │     Vector Database      │               │
│               │   (Milvus / Qdrant)      │               │
│               └─────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

## Step 1: 文档处理

### 文本分块策略

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", "。", "！", "？", " "]
)

chunks = splitter.split_documents(documents)
```

**分块建议**：
- 技术文档：500-1000 tokens
- 对话记录：200-500 tokens
- 代码：按函数/类分块

## Step 2: Embedding 选择

### 模型对比

```
Model                  Dim    性能    中文支持
────────────────────────────────────────────────
OpenAI text-ada-002    1536   ★★★★   ★★★
BGE-large-zh           1024   ★★★★   ★★★★★
M3E-base               768    ★★★    ★★★★
Cohere embed-v3        1024   ★★★★   ★★★
```

### 使用示例

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('BAAI/bge-large-zh-v1.5')
embeddings = model.encode(texts, normalize_embeddings=True)
```

## Step 3: 向量数据库

### Milvus 配置

```python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema

# 连接 Milvus
connections.connect("default", host="localhost", port="19530")

# 定义 Schema
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=1024),
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=65535),
]

schema = CollectionSchema(fields, description="RAG collection")
collection = Collection("documents", schema)

# 创建索引
index_params = {
    "metric_type": "COSINE",
    "index_type": "IVF_FLAT",
    "params": {"nlist": 1024}
}
collection.create_index("embedding", index_params)
```

## Step 4: 检索优化

### 混合检索

```python
def hybrid_search(query: str, top_k: int = 5):
    # 1. 向量检索
    vector_results = vector_search(query, top_k * 2)

    # 2. 关键词检索 (BM25)
    keyword_results = bm25_search(query, top_k * 2)

    # 3. RRF 融合
    return reciprocal_rank_fusion(
        [vector_results, keyword_results],
        weights=[0.7, 0.3]
    )
```

### Reranker

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('BAAI/bge-reranker-large')

def rerank(query: str, documents: list) -> list:
    pairs = [[query, doc] for doc in documents]
    scores = reranker.predict(pairs)

    ranked = sorted(zip(documents, scores),
                   key=lambda x: x[1], reverse=True)
    return [doc for doc, _ in ranked]
```

## Step 5: Prompt 工程

```python
RAG_PROMPT = """基于以下上下文回答问题。如果上下文中没有相关信息，请明确说明。

上下文：
{context}

问题：{question}

回答："""
```

## 生产环境考虑

### 性能优化

```yaml
# 缓存配置
cache:
  embedding_cache:
    type: redis
    ttl: 3600

  query_cache:
    type: redis
    ttl: 300

# 批处理
batch:
  embedding_batch_size: 32
  retrieval_batch_size: 16
```

### 监控指标

```python
# 关键指标
metrics = {
    "retrieval_latency_p99": "< 100ms",
    "embedding_latency_p99": "< 50ms",
    "e2e_latency_p99": "< 2s",
    "retrieval_recall@5": "> 0.8",
    "answer_relevance": "> 0.7"
}
```

## 常见问题

### 1. 检索质量差

```bash
# 诊断步骤
1. 检查 embedding 模型是否适合你的领域
2. 调整 chunk_size 和 chunk_overlap
3. 尝试混合检索 + Reranker
4. 增加 top_k，让 LLM 有更多上下文
```

### 2. 响应延迟高

```bash
# 优化方向
1. 使用 embedding 缓存
2. 优化向量索引参数（IVF_PQ）
3. 使用更小的 LLM 或量化版本
4. 流式输出（streaming）
```

## 总结

构建生产级 RAG 系统的关键：

1. **分块策略**：针对内容类型调整
2. **Embedding**：选择适合领域的模型
3. **混合检索**：向量 + 关键词 + Reranker
4. **可观测性**：监控延迟和检索质量
5. **持续优化**：基于用户反馈迭代

```bash
$ echo "Happy RAGging!"
```
