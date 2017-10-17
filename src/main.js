// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$http = axios

import moment from 'vue-moment'
Vue.use(moment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
