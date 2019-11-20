<template>
  <div class="wb-cell-item">
    <div class="wb-cell-icon">
      <slot name="icon"></slot>
    </div>
    <div class="wb-cell-main">
      <div class="wb-cell-title">
        <slot>{{ title }}</slot>
      </div>
      <div class="wb-cell-label">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
    <div class="wb-cell-footer">
      <span class="wb-cell-extra">
        <slot name="extra">{{ extra }}</slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CellItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    }
  }
}
</script>
