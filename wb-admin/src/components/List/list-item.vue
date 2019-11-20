<template>
  <li class="wb-list-item" :class="classes">
    <template v-if="itemLayout === 'vertical' && $slots.extra">
      <div class="wb-list-item-main">
        <slot></slot>
        <ul v-if="$slots.action" class="wb-list-item-action">
          <slot name="action"></slot>
        </ul>
      </div>
      <div class="wb-list-item-extra">
        <slot name="extra"></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
      <ul v-if="$slots.action" class="wb-list-item-action">
        <slot name="action"></slot>
      </ul>
      <div class="wb-list-item-extra">
        <slot name="extra"></slot>
      </div>
    </template>
  </li>
</template>
<script>
export default {
  name: 'ListItem',
  inject: ['ListInstance'],
  props: {},
  computed: {
    itemLayout() {
      return this.ListInstance.itemLayout
    },
    isItemContainsTextNode() {
      let result
      this.$slots.default.forEach(item => {
        if (typeof item === 'string') {
          result = true
        }
      })
      return result
    },
    isFlexMode() {
      const extra = this.$slots.extra
      if (this.itemLayout === 'vertical') {
        return !!extra
      }
      return !this.isItemContainsTextNode
    },
    classes() {
      return [
        {
          'wb-list-item-no-flex': !this.isFlexMode
        }
      ]
    }
  }
}
</script>
