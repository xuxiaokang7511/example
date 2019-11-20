<template>
  <div class="dashboard-container">
    <editorDashboard />
  </div>
</template>

<script>
import editorDashboard from './admin'

export default {
  name: 'Dashboard',
  components: { editorDashboard },
  data() {
    return {
      // 初始主容器的背景颜色
      initMainBgColor: ''
    }
  },
  mounted() {
    if (this.initMainBgColor === '') {
      this.initMainBgColor = this.getStyle(
        document.querySelector('.main-container'),
        'background-color'
      )
    }
    // this.setMainBg('#f0f2f5')
  },
  destroyed() {
    // this.setMainBg(this.initMainBgColor)
  },
  activated() {
    // this.setMainBg('#f0f2f5')
  },
  deactivated() {
    // this.setMainBg(this.initMainBgColor)
  }
}
</script>
<style lang="scss" scoped>
</style>

