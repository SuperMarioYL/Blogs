import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Article {
  title: string;
  description: string;
  date: string;
  tags: string[];
  link: string;
  readingTime: string;
}

// 注意：实际项目中可以通过 Docusaurus 插件动态获取最新文章
const recentArticles: Article[] = [
  {
    title: '欢迎来到我的技术博客',
    description: '分享 AI、Infrastructure 和 Backend 开发的学习心得与实践经验',
    date: '2024-12-27',
    tags: ['Welcome', 'Blog'],
    link: '/blogs/blog',
    readingTime: '3 min',
  },
  // 后续可以添加更多文章
];

export default function RecentArticles(): JSX.Element {
  if (recentArticles.length === 0) {
    return (
      <section className={styles.recentArticles}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>最新文章</h2>
            <Link to="/blogs/blog" className={styles.viewAll}>
              查看全部 →
            </Link>
          </div>
          <div className={styles.emptyState}>
            <p>文章正在创作中，敬请期待...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.recentArticles}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>最新文章</h2>
          <Link to="/blogs/blog" className={styles.viewAll}>
            查看全部 →
          </Link>
        </div>

        <div className={styles.articlesGrid}>
          {recentArticles.map((article) => (
            <Link
              key={article.title}
              to={article.link}
              className={styles.articleCard}
            >
              <div className={styles.articleMeta}>
                <span className={styles.date}>{article.date}</span>
                <span className={styles.readingTime}>
                  📖 {article.readingTime}
                </span>
              </div>

              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleDescription}>{article.description}</p>

              <div className={styles.tags}>
                {article.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
