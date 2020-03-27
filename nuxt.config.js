
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'MTA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {type: 'text/javascript', src: '//at.alicdn.com/t/font_1387596_o1j2dgknfyk.js'},
      {type: 'text/javascript', src: '/iconfont/iconfont.js'}
      // {type: 'text/javascript', src: 'https://unpkg.com/vue/dist/vue.js'},
      // {type: 'text/javascript', src: 'https://unpkg.com/element-ui/lib/index.js'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
     '@/assets/css/index.less',
  ],
  //at.alicdn.com/t/font_1677480_dwcplymzekb.js

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    transpile: [/^element-ui/],
    maxChunkSize: 300000,
    babel: {
      'plugins': [
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ],
      'comments': true
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
}
