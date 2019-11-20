<template>
  <div class="wb-exception">
    <div class="wb-exception-img">
      <div class="wb-exception-img-element" :style="{'background-image':`url(${img})`}"></div>
    </div>
    <div class="wb-exception-content">
      <h1>500</h1>
      <div class="wb-exception-content-desc">抱歉，服务器出错了</div>
      <a href>
        <el-button type="primary">返回首页</el-button>
      </a>
    </div>
  </div>
</template>

<script>
import img from '@/assets/images/exception-img/500-color.svg'
export default {
  name: 'Page500',
  data() {
    return {
      img
    }
  }
}
</script>
