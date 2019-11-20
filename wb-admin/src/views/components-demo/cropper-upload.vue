<template>
  <div>
    <wb-page-header>
      图片裁剪
      <template #content>
        <el-row>
          <el-col :span="8">
            <div>
              GitHub：
              <a
                class="link-type"
                href="https://github.com/fengyuanchen/cropperjs"
                target="_blank"
              >cropperjs</a>
            </div>
          </el-col>
          <el-col :span="8">
            <div>重置： reset()</div>
          </el-col>
          <el-col :span="8">
            <div>清除： clear()</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>缩放： zoom(ratio)</div>
          </el-col>
          <el-col :span="8">
            <div>移动： move(offsetX[, offsetY])</div>
          </el-col>
          <el-col :span="8">
            <div>角度： rotate(degree)</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>scale： scale(scaleX[, scaleY])</div>
          </el-col>
          <el-col :span="16">
            <div>
              网站：
              <a
                class="link-type"
                href="https://fengyuanchen.github.io/cropperjs/"
                target="_blank"
              >cropperjs</a>
            </div>
          </el-col>
        </el-row>
      </template>
    </wb-page-header>
    <div class="components-container">
      <pan-thumb :image="image" />
      <cropper
        style="position: absolute;bottom: 15px;margin-left: 170px;"
        @crop-success="cropSuccess"
      ></cropper>
    </div>
  </div>
</template>

<script>
import Cropper from '@/components/Cropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'CropperUploadDemo',
  components: { PanThumb, Cropper },
  data() {
    return {
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    cropSuccess(url) {
      this.image = url
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>

