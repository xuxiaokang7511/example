import Vue from 'vue'
// 注册组件
import './components'
// 注册指令
import './directive'
// 注册过滤器
import './filters'

// 方法
import methods from './methods'
// 计算属性
import computed from './computed'

// 混入方法和计算属性
Vue.mixin({
  computed,
  methods
})
