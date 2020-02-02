import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'

Vue.config.productionTip = false

import store from '@/store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
