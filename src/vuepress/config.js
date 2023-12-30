const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://vuepress.vuejs.org/guide/deploy.html#github-pages
   */
  base: '/vuepresstrello/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Clon Trello Firebase',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'Nivel principiantes',

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

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      // 
      // 
      
      { text: 'Instalación', link: '/install/' },
      { text: 'Datos', link: '/datos/' },
      { text: 'Dragable', link: '/draggable/' },
      { text: 'Columnas', link: '/columns/' },
      { text: 'Tareas', link: '/newTask/' },
      { text: 'Firebase', link: '/firebase/' },
      { text: 'GitHub', link: '/github/' },
      { text: 'Canal Youtube', link: 'https://www.youtube.com/watch?v=dZ59MDPcrqo&list=PLgh8bcLDakt3KLia5B5ZIEbvhxp41EPiE' }
    ],
    sidebar: 'auto'
  },
  plugins: [['vuepress-plugin-code-copy', true]]
}
