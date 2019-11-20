import Vue from 'vue'
import ContentMain from '@/components/ContentMain'
import PageHeader from '@/components/PageHeader'
// list
import List from '@/components/List/list.vue'
import ListItem from '@/components/List/list-item.vue'
import ListItemMeta from '@/components/List/list-item-meta.vue'
// cell
import Cell from '@/components/Cell/cell.vue'
import CellGroup from '@/components/Cell/cell-group.vue'
// affix
import Affix from '@/components/Affix/index.vue'
// anchor
import Anchor from '@/components/Anchor/anchor.vue'
import AnchorLink from '@/components/Anchor/anchor-link.vue'
// time
import Time from '@/components/Time/time.vue'

Vue.component('content-main', ContentMain)
Vue.component('wb-page-header', PageHeader)

Vue.component('wb-list', List)
Vue.component('wb-list-item', ListItem)
Vue.component('wb-list-item-meta', ListItemMeta)

Vue.component('wb-cell', Cell)
Vue.component('wb-cell-group', CellGroup)

Vue.component('wb-affix', Affix)

Vue.component('wb-anchor', Anchor)
Vue.component('wb-anchor-link', AnchorLink)

Vue.component('wb-time', Time)
