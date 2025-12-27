import React from 'react';
import Layout from '@theme/Layout';
import HomepageHero from '@site/src/components/HomepageHero';
import DomainCards from '@site/src/components/DomainCards';
import RecentArticles from '@site/src/components/RecentArticles';
import ProjectShowcase from '@site/src/components/ProjectShowcase';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="首页"
      description="Leo's Tech Blog - 专注 AI Infra、推理加速、云原生与平台架构的技术博客"
    >
      <main className={styles.main}>
        <HomepageHero />
        <DomainCards />
        <RecentArticles />
        <ProjectShowcase />
      </main>
    </Layout>
  );
}
