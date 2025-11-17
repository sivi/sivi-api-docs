// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import dotenv from 'dotenv';
dotenv.config();
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sivi UI SDK & API Documentation for Developers',
  tagline: 'Generative AI for editable design creation.',
  favicon: 'img/sivi_fav.png',

  // Set the production url of your site here
  url: 'https://developer.sivi.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sivi', // Usually your GitHub org/user name.
  projectName: 'sivi-api-docs', // Usually your repo name.

  trailingSlash: false, // this will create direct htmls and fetch the same in next try
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          sidebarCollapsed: false,

        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        googleTagManager: {
          containerId: 'GTM-KRNP7XST',
        }, 
      }),
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
  ],
  
  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({

            // Algolia search configuration
      algolia: {
        // Your Algolia Application ID
        appId: process.env.ALGOLIA_APP_ID,
        // Your Algolia Search API Key - the public one, not the admin key
        apiKey: process.env.ALGOLIA_API_KEY,
        // Your Algolia index name
        indexName: process.env.ALGOLIA_INDEX_NAME || 'developer-sivi',
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default
        searchPagePath: 'search',
        // Optional: Configure the crawler
        contextualSearch: true,
      },

      // Replace with your project's social card
      image: 'img/social-developer-sivi.png',
      
      // Configure Mermaid to respect system theme
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'dark'
        },
      },
      navbar: {
        logo: {
          alt: 'Sivi Logo',
          src: 'img/sivi_logo.png',
          srcDark: 'img/sivi_logo_dark.png', // Logo for dark theme
          href: '/'
        },
        items: [
          {
            href: 'https://sivi.ai/',
            position: 'right',
            label: 'Home'
          },
          {
            href: 'https://sivi.ai/pricing',
            position: 'right',
            label: 'Pricing'
          }
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Sivi AI. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
