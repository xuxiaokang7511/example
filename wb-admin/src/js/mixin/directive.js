import Vue from 'vue'
import waves from '@/js/directive/waves/index.js' // 水波纹指令
// import elHeightAdaptiveTable from '@/js/directive/el-table/index.js' // 固定表头时的高度自动调整
// import permit from '@/js/directive/permit/index.js' // 权限判断指令

import resize from '@/js/directive/resize.js' // resize
// 指令
// 水波纹指令
Vue.use(waves)
Vue.use(resize)
// 表高度调整指令
// Vue.use(elHeightAdaptiveTable)
// Vue.use(permit)
