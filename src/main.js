import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false

import '@fortawesome/fontawesome-free/css/all.css'


Vue.prototype.$apiUrl = 'https://api.github.com/'
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
