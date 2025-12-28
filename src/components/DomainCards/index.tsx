import React from 'react';
import Link from '@docusaurus/Link';
import MagneticCard from './MagneticCard';
import { useRipple } from '@site/src/hooks/useRippleEffect';
import { useScrollAnimations } from '@site/src/effects/ScrollAnimations';
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
    title: 'AI Infra',
    description: 'LLM、RAG、向量检索、AI 应用部署与优化',
    icon: '🤖',
    link: '/aiinfra/intro',
    gradient: 'linear-gradient(135deg, #FF9D00 0%, #FFB81C 50%, #FF6B35 100%)',
    stats: { articles: 0, category: 'AI Infrastructure' },
  },
  {
    title: '云原生',
    description: 'Kubernetes、Docker、服务网格、可观测性',
    icon: '☸️',
    link: '/cloudnative/intro',
    gradient: 'linear-gradient(135deg, #326CE5 0%, #5A9FD4 50%, #0F4C81 100%)',
    stats: { articles: 0, category: 'Cloud Native' },
  },
  {
    title: '平台技术',
    description: 'Java、Spring、微服务、系统架构设计',
    icon: '⚙️',
    link: '/backend/intro',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #5B21B6 100%)',
    stats: { articles: 0, category: 'Platform Engineering' },
  },
  {
    title: '随笔',
    description: '技术感悟、职业成长、生活思考与观察',
    icon: '💭',
    link: '/thoughts/intro',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 50%, #FB923C 100%)',
    stats: { articles: 0, category: 'Thoughts & Essays' },
  },
];

export default function DomainCards(): JSX.Element {
  const { createRipple } = useRipple();
  useScrollAnimations();

  return (
    <section id="domains" className={styles.domains}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} animate-title`}>技术领域</h2>
        <p className={`${styles.sectionSubtitle} animate-title`}>
          探索前沿技术，分享实战经验
        </p>

        <div className={styles.cardsGrid}>
          {domains.map((domain) => (
            <MagneticCard
              key={domain.title}
              className={`${styles.domainCard} animate-fade-in`}
              magneticStrength={0.12}
              tiltStrength={12}
            >
              <Link
                to={domain.link}
                className={styles.cardLink}
                style={{ background: domain.gradient }}
                onClick={createRipple}
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
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}
