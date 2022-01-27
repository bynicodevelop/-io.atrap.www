import { defineNuxtPlugin } from '#app'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('Datepicker', Datepicker);
})