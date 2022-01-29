import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  srcDir: './',
  css: [
    '@/assets/css/main.css',
    '~/node_modules/vue3-date-time-picker/dist/main.css'
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
  serverMiddleware: [],
  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URL,
    SITE_NAME: process.env.SITE_NAME,
    SITE_TITLE: process.env.SITE_TITLE,
    SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
    SITE_THUMBNAIL: process.env.SITE_THUMBNAIL,
    TWITTER_AUTHOR: process.env.TWITTER_AUTHOR,
    GA4_ID: process.env.GA4_ID,
    PIXEL_ID: process.env.PIXEL_ID,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
  },
  privateRuntimeConfig: {
    NUXT_APP_MAILCHIMP_API_KEY: process.env.NUXT_APP_MAILCHIMP_API_KEY,
    NUXT_APP_TWITTER_CLIENT_ID: process.env.NUXT_APP_TWITTER_CLIENT_ID,
    NUXT_APP_TWITTER_SECRET_CLIENT: process.env.NUXT_APP_TWITTER_SECRET_CLIENT,
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