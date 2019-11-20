import 'babel-polyfill'

import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import '@/assets/theme/index.css'
import Element from 'element-ui'
// import '@/assets/styles/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/assets/icons' // icon
import './permission' // permission control
import '@/js/libs/error-log' // error log

import '@/js/mixin'

Vue.use(Element, {
  size: store.state.app.size // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
