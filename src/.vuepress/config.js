const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Platine Documentation',
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
    repo: 'platine-php/docs',
    editLinks: true,
    docsDir: 'src',
    repoLabel: 'Github',
    editLinkText: '',
    lastUpdated: 'Last Updated',
    logo: '/assets/img/logo.png',
    sidebar: 'auto',
    smoothScroll: true,
    searchPlaceholder: 'Search ...',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/welcome' },
      { 
        text: 'Getting Started', 
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Configuration', link: '/getting-started/configuration' },
          { text: 'Architecture', link: '/getting-started/architecture' },
          { text: 'Starter Project', link: '/getting-started/starter-project' },
          { text: 'Deployment', link: '/getting-started/deployment' },
        ]
      },
      { 
        text: 'General Concepts', 
        items: [
          { text: 'Lifecycle', link: '/general/lifecycle' },
          { text: 'Container', link: '/general/container' },
          { text: 'Service Providers', link: '/general/providers' },
        ]
      },
      { text: 'Packages', link: '/packages/index' }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom'
  ]
}
