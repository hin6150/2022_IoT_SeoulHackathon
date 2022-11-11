import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import VueApexCharts from 'vue3-apexcharts'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'

const app = createApp(App)

app
  .use(VueApexCharts)
  .use(store)
  .use(router)
  .mixin(mixins)
  .component('Datepicker', Datepicker)
  .mount('#app')

app.config.globalProperties.$http = axios
