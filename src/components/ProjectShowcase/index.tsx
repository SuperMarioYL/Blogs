import React from 'react';
import styles from './styles.module.css';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  // 示例项目，后续可以替换为真实项目
  {
    title: '技术博客系统',
    description: '基于 Docusaurus 构建的现代化技术博客，采用 Apple 简约设计风格',
    image: 'https://via.placeholder.com/400x220/667eea/ffffff?text=Blog+System',
    tags: ['Docusaurus', 'React', 'TypeScript'],
    github: 'https://github.com/SuperMarioYL/Blogs',
  },
  // 可以添加更多项目
];

export default function ProjectShowcase(): JSX.Element {
  if (projects.length === 0) {
    return (
      <section className={styles.projects}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>技术项目</h2>
          <p className={styles.sectionSubtitle}>开源项目与技术实践</p>
          <div className={styles.emptyState}>
            <p>项目展示正在准备中，敬请期待...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>技术项目</h2>
        <p className={styles.sectionSubtitle}>开源项目与技术实践</p>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.title} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.imageOverlay}></div>
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.projectLinks}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
