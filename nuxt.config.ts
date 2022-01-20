import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    srcDir: './',
    css: [
        '@/assets/css/main.css',
    ],
    build: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          }
        }
      },
    },
    privateRuntimeConfig: {
      NUXT_APP_MAILCHIMP_API_KEY: process.env.NUXT_APP_MAILCHIMP_API_KEY
    },
    vite: {
      logLevel: "info",
      optimizeDeps: {
          include: [
              '@headlessui/vue', '@heroicons/vue/solid', '@heroicons/vue/outline', 'vue'
          ]
      }
  }
})