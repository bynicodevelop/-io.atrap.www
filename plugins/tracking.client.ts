import { defineNuxtPlugin } from '#app'
import pixel from "aio-vue-analytics"

export default defineNuxtPlugin((nuxtApp) => {
  const {PIXEL_ID, GA4_ID} = useRuntimeConfig();

  nuxtApp.vueApp.use(pixel, {
    pixelId: PIXEL_ID,
    ga4Id: GA4_ID,
  })

  return {
    provide:{
      tracker: pixel.tracker,
    },
  }
})

