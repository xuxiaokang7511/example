import Vue from 'vue'

import * as filters from '@/js/filters' // global filters

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
