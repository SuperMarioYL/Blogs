import React from 'react';
import Link from '@docusaurus/Link';
import ClientOnly from '@site/src/utils/ClientOnly';
import ThreeGeometryGrid from './ThreeGeometryGrid';
import ParticleBackground from './ParticleBackground';
import { PerformanceMonitor } from '@site/src/utils/performanceMonitor';
import styles from './styles.module.css';

const techStack = [
  'AI Infra',
  'LLM 推理',
  'vLLM',
  'TensorRT',
  'Kubernetes',
  '云原生',
  'Python',
  'Go',
  'CUDA',
  'Triton',
];

export default function HomepageHero(): JSX.Element {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Hi, I'm <span className={styles.gradient}>Leo</span>
          </h1>
          <p className={styles.heroTagline}>
            AI Infra Engineer | 推理加速专家 | 云原生架构师
          </p>
          <p className={styles.heroDescription}>
            专注于 AI 基础设施、大模型推理加速、云原生架构与平台工程，构建高性能、可扩展的 AI 系统
          </p>

          {/* 技术标签云 */}
          <div className={styles.techTags}>
            {techStack.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>

          {/* CTA 按钮 */}
          <div className={styles.heroButtons}>
            <a href="#domains" className={styles.primaryButton}>
              探索文章
            </a>
            <Link to="/aiinfra/intro" className={styles.secondaryButton}>
              最新博客
            </Link>
          </div>
        </div>

        {/* 动态背景效果 */}
        <div className={styles.heroBackground}>
          <div className={styles.gradientBlob1}></div>
          <div className={styles.gradientBlob2}></div>
          <div className={styles.gradientBlob3}></div>
        </div>

        {/* 3D 几何网格背景 - 仅桌面端加载 */}
        {typeof window !== 'undefined' && PerformanceMonitor.shouldLoadHeavyEffects() && (
          <ClientOnly>
            <ThreeGeometryGrid />
          </ClientOnly>
        )}

        {/* 粒子星空背景 - 自适应设备 */}
        <ClientOnly>
          <ParticleBackground />
        </ClientOnly>
      </div>
    </header>
  );
}
