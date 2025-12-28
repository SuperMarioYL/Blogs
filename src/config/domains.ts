import type { NavbarItem } from '@docusaurus/theme-common';

export interface DomainConfig {
  id: string;
  name: string;
  logo: {
    light: string;
    dark: string;
    icon: string;  // Emoji fallback
  };
  navItems: NavbarItem[];
  theme: string;
}

export const DOMAINS: Record<string, DomainConfig> = {
  aiinfra: {
    id: 'aiinfra',
    name: 'AI Infrastructure',
    logo: {
      light: '/img/logos/aiinfra-light.svg',
      dark: '/img/logos/aiinfra-dark.svg',
      icon: '🤖'
    },
    navItems: [
      { label: 'LLM 推理', to: '/aiinfra/llm' },
      { label: 'RAG 系统', to: '/aiinfra/rag' },
      { label: '向量数据库', to: '/aiinfra/vector-db' },
    ],
    theme: 'aiinfra',
  },
  cloudnative: {
    id: 'cloudnative',
    name: 'Cloud Native',
    logo: {
      light: '/img/logos/k8s-light.svg',
      dark: '/img/logos/k8s-dark.svg',
      icon: '☸️'
    },
    navItems: [
      { label: 'Kubernetes', to: '/cloudnative/kubernetes' },
      { label: 'Docker', to: '/cloudnative/docker' },
      { label: '服务网格', to: '/cloudnative/service-mesh' },
    ],
    theme: 'cloudnative',
  },
  backend: {
    id: 'backend',
    name: 'Platform Engineering',
    logo: {
      light: '/img/logos/backend-light.svg',
      dark: '/img/logos/backend-dark.svg',
      icon: '⚙️'
    },
    navItems: [
      { label: 'Java & Spring', to: '/backend/java' },
      { label: '微服务架构', to: '/backend/microservices' },
      { label: '系统设计', to: '/backend/system-design' },
    ],
    theme: 'backend',
  },
  thoughts: {
    id: 'thoughts',
    name: 'Thoughts & Essays',
    logo: {
      light: '/img/logos/thoughts-light.svg',
      dark: '/img/logos/thoughts-dark.svg',
      icon: '💭'
    },
    navItems: [
      { label: '技术感悟', to: '/thoughts/tech' },
      { label: '职业成长', to: '/thoughts/career' },
      { label: '生活观察', to: '/thoughts/life' },
    ],
    theme: 'thoughts',
  },
};

export function detectDomain(pathname: string): string | null {
  // 检测路径中是否包含领域标识
  if (pathname.includes('/aiinfra')) return 'aiinfra';
  if (pathname.includes('/cloudnative')) return 'cloudnative';
  if (pathname.includes('/backend')) return 'backend';
  if (pathname.includes('/thoughts')) return 'thoughts';
  return null;
}
