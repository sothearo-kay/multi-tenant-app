// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@nuxt/eslint'],

  devtools: {
    enabled: true
  },

  compatibilityDate: '2025-05-15'
});
