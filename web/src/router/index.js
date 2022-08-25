import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from '../views/MainComponent.vue'
import InnerComponent from '../views/InnerComponent.vue'
import StatisticComponent from '../views/StatisticComponent.vue'

const routes = [
  {
    path: '/',
    name: 'MainComponent',
    component: MainComponent
  },
  {
    path: '/inner',
    name: 'InnerComponent',
    component: InnerComponent
  },
  {
    path: '/statistic',
    name: 'StatisticComponent',
    component: StatisticComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
