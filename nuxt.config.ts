// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: 'KidiShop — Habits enfants 0-20 ans',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Prototype ecommerce habits enfants 0-20 ans. Cash à la livraison. International FCFA/EUR/USD.' }
      ]
    }
  },
  nitro: {
    preset: 'node-server'
  }
})
