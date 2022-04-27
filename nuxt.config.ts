import { defineNuxtConfig } from 'nuxt'

const dev = process.env.NODE_ENV === 'development'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/global.css'],
  dev,
  loading: {},
})
