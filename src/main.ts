import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex';
import countTo from 'vue-count-to';
Vue.component('countTo',countTo)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,  
  render: h => h(App)
})
