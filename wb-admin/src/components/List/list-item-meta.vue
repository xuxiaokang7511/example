<template>
  <div class="wb-list-item-meta">
    <div v-if="avatar || $slots.avatar" class="wb-list-item-meta-avatar">
      <slot name="avatar">
        <el-avatar :src="avatar" size="small"></el-avatar>
      </slot>
    </div>
    <div class="wb-list-item-meta-content">
      <div v-if="title || $slots.title" class="wb-list-item-meta-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="wb-list-item-meta-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListItemMeta',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
