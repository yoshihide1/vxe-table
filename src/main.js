import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'chart.js'

import CoreuiVue from '@coreui/vue';
Vue.use(CoreuiVue);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
