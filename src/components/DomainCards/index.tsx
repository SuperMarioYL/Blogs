import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Domain {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradient: string;
  stats: {
    articles: number;
    category: string;
  };
}

const domains: Domain[] = [
  {
    title: 'AI & LLM',
    description: '大语言模型、RAG、向量检索、AI 应用开发',
    icon: '🤖',
    link: '/blogs/docs/ai-llm/intro',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    stats: { articles: 0, category: 'Artificial Intelligence' },
  },
  {
    title: 'Infrastructure',
    description: 'Kubernetes、Docker、云原生、DevOps 实践',
    icon: '🏗️',
    link: '/blogs/docs/infrastructure/intro',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    stats: { articles: 0, category: 'Cloud Native' },
  },
  {
    title: 'Backend',
    description: 'Java、Spring、数据库、系统架构设计',
    icon: '⚙️',
    link: '/blogs/docs/backend/intro',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    stats: { articles: 0, category: 'Backend Development' },
  },
  {
    title: '随笔 & 思考',
    description: '技术感悟、职业成长、行业观察与思考',
    icon: '💭',
    link: '/blogs/blog',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    stats: { articles: 0, category: 'Thoughts' },
  },
];

export default function DomainCards(): JSX.Element {
  return (
    <section id="domains" className={styles.domains}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>技术领域</h2>
        <p className={styles.sectionSubtitle}>
          探索前沿技术，分享实战经验
        </p>

        <div className={styles.cardsGrid}>
          {domains.map((domain) => (
            <Link
              key={domain.title}
              to={domain.link}
              className={styles.domainCard}
              style={{ background: domain.gradient }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>{domain.icon}</div>
                <h3 className={styles.cardTitle}>{domain.title}</h3>
                <p className={styles.cardDescription}>{domain.description}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.articleCount}>
                    {domain.stats.articles > 0 ? `${domain.stats.articles} 篇文章` : '敬请期待'}
                  </span>
                  <span className={styles.arrow}>→</span>
                </div>
              </div>

              {/* 悬浮光效 */}
              <div className={styles.cardGlow}></div>
              {/* Shimmer闪光效果 */}
              <div className={styles.cardShimmer}></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
