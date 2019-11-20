<template>
  <div class="wb-page-header">
    <div class="wb-page-header-detail">
      <div class="wb-page-header-main">
        <div class="wb-page-header-row">
          <div class="wb-page-header-title">
            <slot />
          </div>
        </div>
        <div class="wb-page-header-row">
          <div class="wb-page-header-content">
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style lang="scss" scoped>
.wb-page-header {
  color: #515a6e;
  padding: 0;
  margin: 0;
}
.wb-page-header-detail {
  padding: 16px 32px 0 32px;
  background: #fff;
  border-bottom: 1px solid #e8eaec;
}
.wb-page-header-main {
  width: 100%;
  flex: 0 1 auto;
}
.wb-page-header-row {
  width: 100%;
  display: flex;
}
.wb-page-header-title {
  margin-bottom: 16px;
  flex: auto;
  display: inline-block;
  color: #17233d;
  font-weight: 500;
  font-size: 20px;
}
.wb-page-header-content {
  margin-bottom: 16px;
  flex: auto;
  font-size: 14px;
  .el-row:not(:last-child) {
    padding-bottom: 16px;
  }
}
</style>
