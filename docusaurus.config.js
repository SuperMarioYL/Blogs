// @ts-check
const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Leo\'s Tech Blog',
  tagline: 'AI Infra | 推理加速 | 云原生 | 平台架构',
  favicon: 'img/favicon.ico',

  // GitHub Pages 配置
  url: 'https://supermarioyl.github.io',
  baseUrl: '/blogs/',
  organizationName: 'SuperMarioYL',
  projectName: 'Blogs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 客户端模块 - 全局效果初始化
  clientModules: [
    require.resolve('./src/clientModules/effects.ts'),
  ],

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/SuperMarioYL/Blogs/tree/master/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '最近文章',
          blogSidebarCount: 'ALL',
          postsPerPage: 10,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Lei Yu.`,
          },
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/apple-theme.css'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Leo',
        logo: {
          alt: 'Leo\'s Avatar',
          src: 'https://avatars.githubusercontent.com/u/20982600?v=4',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'aiSidebar',
            position: 'left',
            label: 'AI & LLM',
          },
          {
            type: 'docSidebar',
            sidebarId: 'infraSidebar',
            position: 'left',
            label: 'Infrastructure',
          },
          {
            type: 'docSidebar',
            sidebarId: 'backendSidebar',
            position: 'left',
            label: 'Backend',
          },
          {
            to: '/blog',
            label: '博客',
            position: 'left'
          },
          {
            href: 'https://github.com/SuperMarioYL',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '技术领域',
            items: [
              {
                label: 'AI & LLM',
                to: '/docs/ai-llm/intro',
              },
              {
                label: 'Infrastructure',
                to: '/docs/infrastructure/intro',
              },
              {
                label: 'Backend',
                to: '/docs/backend/intro',
              },
            ],
          },
          {
            title: '社交',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/SuperMarioYL',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Leo. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'python', 'bash', 'go'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
