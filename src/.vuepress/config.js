const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'platine-php/config',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  host: 'localhost',
  
  dest: 'dist',
    
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'platine-php/config',
    editLinks: true,
    docsDir: 'docs/src',
    repoLabel: 'Github',
    editLinkText: '',
    lastUpdated: 'Last Updated',
    logo: 'logo.png',
    sidebar: 'auto',
    smoothScroll: true,
    searchPlaceholder: 'Search ...',
    nav: [
      { text: 'Home', link: '/' },
      { 
        text: 'Docs', 
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Installation', link: '/installation' },
          { text: 'Usage', link: '/usage' },
          { text: 'Loader', link: '/loader' },
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['vuepress-plugin-code-copy', true]
  ]
}
