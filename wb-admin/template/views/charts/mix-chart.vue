<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from './components/MixChart'

export default {
  name: 'MixChart',
  components: { Chart }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  /* REVIEW: 主体高度 */
  height: calc(100vh - #{$headerHeight} - #{$tagsViewHeight});
}
</style>

