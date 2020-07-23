import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'chart.js'

import { freeSet } from '@coreui/icons'
import CoreuiVueCharts from '@coreui/vue-chartjs'
Vue.use(CoreuiVueCharts)
import CoreuiVue from '@coreui/vue';
Vue.use(CoreuiVue);
new Vue({
  icons: { freeSet },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
