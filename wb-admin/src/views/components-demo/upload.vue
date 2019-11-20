<template>
  <div>
    <wb-page-header>
      图片上传
      <template #content>
        <div>基础的单图片上传</div>
      </template>
    </wb-page-header>
    <div class="components-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>默认上传</h3>
          <el-upload
            :accept="accept"
            :action="action"
            :show-file-list="false"
            :multiple="false"
            :before-upload="imgeBeforeUpload"
            :on-success="imgUploadSuccess"
            :on-error="imgUploadError"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <h3>自定义上传</h3>
          <el-upload
            :accept="accept"
            :action="action2"
            :show-file-list="false"
            :multiple="false"
            :limit="1"
            :before-upload="imgeBeforeUpload"
            :http-request="uploadSectionFile"
            :on-success="imgUploadSuccess"
            :on-error="imgUploadError"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-col>
      </el-row>
      <transition name="el-zoom-in-center">
        <el-image
          v-if="imgUrl"
          style="width: 200px; height: 200px; margin-top: 20px;"
          :src="imgUrl"
          fit="scale-down"
          :preview-src-list="imgUrls"
          lazy
        ></el-image>
      </transition>
    </div>
  </div>
</template>

<script>
const baseURL = process.env.VUE_APP_BASE_API
export default {
  name: 'UploadDemo',
  data() {
    return {
      action: baseURL + '/file/imgUpload',
      action2: '',
      accept: 'image/jpeg,image/png',
      imgUrl: '',
      imgUrls: []
    }
  },
  methods: {
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
        this.imgUrls = []
        this.imgUrl = ''
        this.$nextTick(() => {
          this.imgUrls = [res.data]
          this.imgUrl = res.data
        })
      } else {
        this.imgUploadError(res, file, fileList)
      }
    },
    imgUploadError(err, file, fileList) {
      this.$message.error(err.msg)
    },
    uploadSectionFile(params) {
      const file = params.file
      this.$store
        .dispatch('common/imgUpload', file)
        .then(res => {
          params.onSuccess(res)
        })
        .catch(err => {
          params.onError(err)
        })
    },
    clearFiles(name) {
      // this.$nextTick(() => {
      //   this.$refs[name].clearFiles()
      // })
    }
  }
}
</script>

