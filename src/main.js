// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import glo from './js/global.js'
import axios from 'axios'
import qs from 'qs'
import vuebus from 'vue-bus'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './css/common.less'
import './css/autoFlex.css'
import './css/index.less'
import './css/main.less'
import './css/ch_main.less'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.prototype.$axios=axios
//Vue.prototype.domain='http://120.77.216.100:8088'

Vue.prototype.$qs=qs
Vue.use(glo)
Vue.use(vuebus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
