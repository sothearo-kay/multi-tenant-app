// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/color-mode'],

  devtools: {
    enabled: true
  },

  colorMode: {
    classSuffix: ''
  },

  compatibilityDate: '2025-05-15'
});

