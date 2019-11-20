<template>
  <div class="wb-exception">
    <div class="wb-exception-img">
      <div class="wb-exception-img-element" :style="{'background-image':`url(${img})`}"></div>
    </div>
    <div class="wb-exception-content">
      <h1>404</h1>
      <div class="wb-exception-content-desc">抱歉，你访问的页面不存在</div>
      <a href>
        <el-button type="primary">返回首页</el-button>
      </a>
    </div>
  </div>
</template>

<script>
import img from '@/assets/images/exception-img/404-color.svg'
export default {
  name: 'Page404',
  data() {
    return {
      img
    }
  }
}
</script>
