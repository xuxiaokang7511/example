<template>
  <div class="content-body" :style="{height: `calc(100% - ${top})`}">
    <div class="content-body-main" :style="{height: `calc(100% - ${footHeight})`}">
      <slot />
    </div>
    <div class="content-body-foot" :style="{height: footHeight}">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBody',
  props: {
    top: {
      type: String,
      default: '48px'
    },
    footHeight: {
      type: String,
      default: '48px'
    }
  }
}
</script>

<style lang="scss" scoped>
.content-body {
  width: 100%;
  background-color: #fff;
  border: 1px solid #f5f7f9;
  .content-body-main {
    overflow: auto;
  }
  .content-body-foot {
    overflow: hidden;
  }
}
</style>
