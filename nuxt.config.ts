// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
  ],

  devtools: {
    enabled: true,
  },

  future: { compatibilityVersion: 4 },

  app: {
    head: {
      titleTemplate: '%s - App',
      htmlAttrs: {
        lang: 'en-US',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  colorMode: {
    classSuffix: '',
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2025-05-15',
});
