
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'personal-management',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/deviceCheck.js',
    '~/plugins/vuex.js',
  ],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/http',
  ],
  http: {
    // Yapılandırma seçenekleri buraya eklenebilir
    baseURL: 'http://127.0.0.1:8000/',
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'cookie-universal-nuxt',
    'bootstrap-vue/nuxt',
  ],
  router: {},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
