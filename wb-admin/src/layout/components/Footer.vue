<template>
  <div class="footer">版权所有</div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  height: $footerHeight;
  line-height: $footerHeight;
  text-align: center;
  overflow: hidden;
  position: relative;
  background: $bodyBg;
  box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.04), 0 0 3px 0 rgba(0, 0, 0, 0.02);
}
</style>
