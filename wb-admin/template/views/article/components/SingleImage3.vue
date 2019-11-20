<template>
  <div class="upload-container">
    <el-upload
      :accept="accept"
      :action="action"
      :multiple="false"
      :show-file-list="false"
      :before-upload="imgeBeforeUpload"
      :on-success="imgUploadSuccess"
      :on-error="imgUploadError"
      class="image-uploader"
      drag
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <div v-show="imageUrl" class="image-preview">
      <el-image :src="imageUrl" class="image-preview-wrapper" fit="scale-down" lazy></el-image>
      <div class="image-preview-action">
        <i class="el-icon-delete" @click="emitInput('')" />
      </div>
    </div>
  </div>
</template>

<script>
const baseURL = process.env.VUE_APP_BASE_API
export default {
  name: 'SingleImageUpload3',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      accept: 'image/jpeg,image/png',
      action: baseURL + '/file/imgUpload'
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    imgeBeforeUpload(file) {
      // this.imgUrls = []
      // this.imgUrl = ''

      const fileType = file.type
      const isImage = this.accept.split(',').indexOf(fileType) !== -1
      const isLt2M = file.size / 1024 / 1024 <= 2
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error('只能上传图片格式png、jpg!')
        return false
      } else if (!isLt2M) {
        this.$message.error('只能上传图片大小小于2M')
        return false
      }
    },
    imgUploadSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.emitInput(res.data)
      } else {
        this.imgUploadError(res, file, fileList)
      }
    },
    imgUploadError(err, file, fileList) {
      this.$message.error(err.msg)
    },
    handleImageSuccess(file) {
      this.emitInput(file.files.file)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 35%;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
