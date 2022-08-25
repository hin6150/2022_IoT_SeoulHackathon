import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from 'vue3-apexcharts'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(VueApexCharts).use(store).use(router).component('Datepicker', Datepicker).mount('#app')
