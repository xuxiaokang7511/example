<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="!item.children||item.children.length<=0">
      <app-link :to="resolvePath(item.page)">
        <el-menu-item :index="resolvePath(item.page)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="item.icon" :title="item.label" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.label+item.id" popper-append-to-body>
      <template slot="title">
        <item v-if="!item.hidden" :icon="item.icon" :title="item.label" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.id"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['menuObj'])
  },
  methods: {
    resolvePath(page) {
      return (this.menuObj[page] && this.menuObj[page].path) || ''
    }
  }
}
</script>
