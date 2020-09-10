# Spring事务的传播机制

<!-- TOC -->

- [REQUIRED（默认传播机制）](#required默认传播机制)
- [SUPPORTS](#supports)
- [MANDATORY](#mandatory)
- [REQUIRES_NEW](#requires_new)

<!-- /TOC -->

&emsp;Spring通过在类前添加 `@Transactional` 注解来配置事务，我们可以自己来配置事务的传播机制。

&emsp;Spring共有7种事务的传播机制，都定义在 `Propagation` 枚举类中，对任何一个服务来说都有单独调用和被其他服务调用两种状态，这7种事务传播机制对这两种状态的处理各不相同，下面我来详细的说明一下这7种传播机制的功能 

```java 
public enum Propagation {

	REQUIRED(TransactionDefinition.PROPAGATION_REQUIRED),

	SUPPORTS(TransactionDefinition.PROPAGATION_SUPPORTS),

	MANDATORY(TransactionDefinition.PROPAGATION_MANDATORY),

	REQUIRES_NEW(TransactionDefinition.PROPAGATION_REQUIRES_NEW),

	NOT_SUPPORTED(TransactionDefinition.PROPAGATION_NOT_SUPPORTED),

	NEVER(TransactionDefinition.PROPAGATION_NEVER),

	NESTED(TransactionDefinition.PROPAGATION_NESTED);
}
```

---
## REQUIRED（默认传播机制）

- `REQUIRED` 是默认的事务传播机制
- 单独调用时，开启事务
- 被调用时，会加入主事务，融合为一个事务，保证acid

```java
@Transactional(propagation = Propagation.REQUIRED)
```

---
## SUPPORTS

- 单独调用时，不开启事务
- 被调用时，会加入主事务，组成一个事务

```java
@Transactional(propagation = Propagation.SUPPORTS)
```

---
## MANDATORY
`MANDATORY` 为强制支持事务，只支持被事务调用

- 单独调用时，由于没有被事务调用，会抛出异常：
  ```java
  throw new IllegalTransactionStateException(“Transaction propagation ‘mandatory’ but no existing transaction found”);
  ```
- 被调用时，会加入主事务，融合成一个事务

```java
@Transactional(propagation = Propagation.MANDATORY)
```

---
## REQUIRES_NEW

- 单独调用时，开启事务
- 被调用时，开启一个独立的事务，与主事务相互独立，互不影响

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
```