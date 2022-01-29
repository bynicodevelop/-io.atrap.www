import { defineNuxtPlugin } from '#app'
import Datepicker from 'vue3-date-time-picker';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('Datepicker', Datepicker);
})