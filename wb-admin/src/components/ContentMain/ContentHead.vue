<template>
  <div class="content-head" :style="{height:height}">
    <div class="content-head-left">
      <div v-if="showFlag" class="content-head-left-sign"></div>
      <div class="content-head-left-span">
        <slot />
      </div>
    </div>
    <div class="content-head-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentHead',
  props: {
    height: {
      type: String,
      default: '48px'
    },
    showFlag: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.content-head {
  width: 100%;
  background-color: #fff;
  position: relative;
  border: 1px solid #f5f7f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  .content-head-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    .content-head-left-sign {
      height: 24px;
      width: 3px;
      background-color: #409eff;
    }
    .content-head-left-span {
      margin-left: 14px;
      font-size: 14px;
      color: #2d2f33;
      width: 100%;
    }
  }
  .content-head-right {
    text-align: right;
    flex-grow: 0;
  }
}
</style>
