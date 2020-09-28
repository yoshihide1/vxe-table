import Vue from 'vue'
import VueRouter from 'vue-router'
import Corona from '@/views/Corona.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'corona',
    component: Corona
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
