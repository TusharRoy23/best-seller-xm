// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
    strict: true
  },
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }, // make it false in production
  app: {
    head: {
      title: 'Commerce',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description', name: 'description', content: ''
        },
        { name: 'csp-nonce', content: 'random_nonce_value' },
      ],
      script: [
        {
          src: 'https://code.jquery.com/jquery-3.4.1.min.js',
        },
        {
          src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js'
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
        },
        {
          rel: 'stylesheet',
          href: '/css/style.min.css',
        },
      ],
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image'
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },
})