# SpringBoot数据库配置

## 

```java
@Configuration
@MapperScan(
        basePackages = "com.baidu.ai.engine.biz.dao.automation.mapper",
        sqlSessionTemplateRef = "automationSqlSessionTemplate"
)
public class AutomationDataSourceConfig {

    @Bean("automationDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.automation")
    public DataSource setDataSource() {
        return new DruidDataSource();
    }

    @Bean("automationDataSourceTransactionManager")
    public DataSourceTransactionManager setDataSourceTransactionManager(
            @Qualifier("automationDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean("automationSqlSessionFactory")
    public SqlSessionFactory setSqlSessionFactory(
            @Qualifier("automationDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }

    @Bean("automationSqlSessionTemplate")
    public SqlSessionTemplate setSqlSessionTemplate(
            @Qualifier("automationSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```