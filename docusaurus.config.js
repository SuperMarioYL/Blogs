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
  baseUrl: '/Blogs/',
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
        docs: false,  // 禁用默认 docs
        blog: false,  // 禁用默认 blog
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/apple-theme.css',
            './src/css/themes/aiinfra.css',
            './src/css/themes/cloudnative.css',
            './src/css/themes/backend.css',
            './src/css/themes/thoughts.css',
          ],
        },
      }),
    ],
  ],

  plugins: [
    // AI Infra 领域
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'aiinfra',
        path: 'content/aiinfra',
        routeBasePath: 'aiinfra',
        sidebarPath: './sidebars.aiinfra.js',
        editUrl: 'https://github.com/SuperMarioYL/Blogs/tree/master/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
    ],
    // 云原生领域
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cloudnative',
        path: 'content/cloudnative',
        routeBasePath: 'cloudnative',
        sidebarPath: './sidebars.cloudnative.js',
        editUrl: 'https://github.com/SuperMarioYL/Blogs/tree/master/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
    ],
    // 后端/平台技术领域
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'backend',
        path: 'content/backend',
        routeBasePath: 'backend',
        sidebarPath: './sidebars.backend.js',
        editUrl: 'https://github.com/SuperMarioYL/Blogs/tree/master/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
    ],
    // 随笔领域
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'thoughts',
        path: 'content/thoughts',
        routeBasePath: 'thoughts',
        sidebarPath: './sidebars.thoughts.js',
        editUrl: 'https://github.com/SuperMarioYL/Blogs/tree/master/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
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
            to: '/aiinfra/intro',
            label: 'AI Infra',
            position: 'left',
            activeBaseRegex: `/aiinfra/`,
          },
          {
            to: '/cloudnative/intro',
            label: '云原生',
            position: 'left',
            activeBaseRegex: `/cloudnative/`,
          },
          {
            to: '/backend/intro',
            label: '平台技术',
            position: 'left',
            activeBaseRegex: `/backend/`,
          },
          {
            to: '/thoughts/intro',
            label: '随笔',
            position: 'left',
            activeBaseRegex: `/thoughts/`,
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
                label: 'AI Infra',
                to: '/aiinfra/intro',
              },
              {
                label: '云原生',
                to: '/cloudnative/intro',
              },
              {
                label: '平台技术',
                to: '/backend/intro',
              },
              {
                label: '随笔',
                to: '/thoughts/intro',
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
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Leo. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'python', 'bash', 'go', 'yaml', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
