<template>
  <div class="wb-exception">
    <div class="wb-exception-img">
      <div class="wb-exception-img-element" :style="{'background-image':`url(${img})`}"></div>
    </div>
    <div class="wb-exception-content">
      <h1>401</h1>
      <div class="wb-exception-content-desc">抱歉，你无权访问该页面</div>
      <a href>
        <el-button type="primary">返回首页</el-button>
      </a>
    </div>
  </div>
</template>

<script>
import img from '@/assets/images/exception-img/401-color.svg'
export default {
  name: 'Page401',
  data() {
    return {
      img
    }
  }
}
</script>
