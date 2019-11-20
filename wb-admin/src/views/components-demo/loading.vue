<template>
  <div>
    <wb-page-header>
      Loading 加载
      <template #content>
        <div>加载数据时显示动效。</div>
      </template>
    </wb-page-header>
    <div class="components-container">
      <div v-loading="true" class="bg">默认效果</div>
      <div v-loading="true" class="bg" element-loading-spinner="wb-spin-iview">
        <div>自定义 Loading</div>在绑定了v-loading指令的元素上添加element-loading-spinner="wb-spin-iview"。
      </div>
      <div
        v-loading="true"
        class="bg"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.75)"
      >
        <div>自定义 Loading</div>在绑定了v-loading指令的元素上添加element-loading-text属性，其值会被渲染为加载文案，并显示在加载图标的下方。类似地，element-loading-spinner和element-loading-background属性分别用来设定图标类名和背景色值。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.bg {
  margin: 24px 0;
  padding: 12px;
  line-height: 30px;
  background: #fff;
  min-height: 180px;
}
</style>
