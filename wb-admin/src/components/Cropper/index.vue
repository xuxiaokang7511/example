<template>
  <div id="cropper-com">
    <!-- 层 -->
    <el-dialog
      :visible.sync="panel"
      :show-close="false"
      :close-on-click-modal="false"
      width="618px"
    >
      <el-row :gutter="2">
        <el-col :span="18">
          <div style="margin-top:1%;margin-left: 1%;margin-right: 1%;height: 85%;margin-bottom: 1%">
            <img id="image" :src="url" alt="Picture" />
          </div>
        </el-col>
        <el-col :span="6">
          <div style="margin-top:5px;">预览：</div>
          <div class="prec">
            <div class="pre-show"></div>
          </div>
          <div style="margin-top:10px;padding:3px;">
            <el-button-group>
              <el-button type="primary" title="缩小" icon="el-icon-zoom-out" @click="zoom(-0.1)"></el-button>
              <el-button type="primary" title="向上移动" icon="el-icon-top" @click="move(0,-10)"></el-button>
              <el-button type="primary" title="放大" icon="el-icon-zoom-in" @click="zoom(0.1)"></el-button>
            </el-button-group>
            <el-button-group style="margin-top:1px;">
              <el-button type="primary" title="向左移动" icon="el-icon-back" @click="move(-10,0)"></el-button>
              <el-button type="primary" title="还原" icon="el-icon-refresh" @click="reset"></el-button>
              <el-button type="primary" title="向右移动" icon="el-icon-right" @click="move(10,0)"></el-button>
            </el-button-group>
            <el-button-group style="margin-top:1px;">
              <el-button
                type="primary"
                title="向左旋转45°"
                icon="el-icon-refresh-left"
                @click="rotateLeft"
              ></el-button>
              <el-button type="primary" title="向下移动" icon="el-icon-bottom" @click="move(0,10)"></el-button>
              <el-button
                type="primary"
                title="向右旋转45°"
                icon="el-icon-refresh-right"
                @click="rotateRight"
              ></el-button>
            </el-button-group>
            <el-button-group style="margin-top:12px;">
              <el-button
                type="success"
                style="padding: 10px 10px;"
                icon="el-icon-check"
                @click="crop"
              >保存</el-button>
              <el-button
                type="warning"
                style="padding: 10px 10px;"
                icon="el-icon-close"
                @click="panel=false"
              >取消</el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="false">
        <el-col :span="18">
          <el-row style="padding-bottom: 3px;">
            <el-col :span="14" style="padding-left:4px;">
              <el-button-group>
                <el-button type="primary" icon="el-icon-zoom-out" @click="zoom(-1)"></el-button>
                <el-button type="primary" icon="el-icon-zoom-in" @click="zoom(1)"></el-button>
              </el-button-group>
              <el-button-group style="margin-left:5px;">
                <el-button type="primary" icon="el-icon-refresh-left" @click="rotateLeft"></el-button>
                <el-button type="primary" icon="el-icon-refresh-right" @click="rotateRight"></el-button>
              </el-button-group>
            </el-col>
            <el-col :span="10" style="text-align:right;padding-right: 4px;">
              <el-button-group>
                <el-button
                  type="success"
                  style="padding: 10px 10px;"
                  icon="el-icon-check"
                  @click="crop"
                >保存</el-button>
                <el-button
                  type="danger"
                  style="padding: 10px 10px;"
                  icon="el-icon-close"
                  @click="panel=false"
                >取消</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <div style="float: right;margin-right: 1%">
            <!-- <el-button icon="el-icon-zoom-out" size="small" circle @click="zoom(-1)"></el-button>
            <el-button icon="el-icon-zoom-in" size="small" circle @click="zoom(1)"></el-button>-->
            <!-- <el-button icon="el-icon-refresh-left" size="small" circle @click="rotateLeft"></el-button>
            <el-button icon="el-icon-refresh-right" size="small" circle @click="rotateRight"></el-button>-->
            <!-- <el-button type="success" icon="el-icon-check" size="small" circle @click="crop"></el-button>
            <el-button type="danger" icon="el-icon-close" size="small" circle @click="panel=false"></el-button>-->
          </div>
        </el-col>
        <el-col :span="6" style="text-align:center;">
          <!-- <el-button-group>
            <el-button
              type="success"
              style="padding: 10px 10px;"
              icon="el-icon-check"
              @click="crop"
            >保存</el-button>
            <el-button
              type="danger"
              style="padding: 10px 10px;"
              icon="el-icon-close"
              @click="panel=false"
            >取消</el-button>
          </el-button-group>-->
        </el-col>
      </el-row>
    </el-dialog>
    <el-upload
      :accept="accept"
      :action="action"
      :show-file-list="false"
      :multiple="false"
      :before-upload="imgeBeforeUpload"
      :http-request="uploadSectionFile"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">上传不超过2M的jpg/png图片</div>
    </el-upload>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { dataURLtoFile } from '@/js/libs/img'
export default {
  props: {
    accept: {
      type: String,
      default: function() {
        return 'image/jpeg,image/png'
      }
    },
    maxSize: {
      type: Number,
      default: function() {
        return 4
      }
    }
  },
  data() {
    return {
      action: '',
      cropper: '',
      croppable: false,
      panel: false,
      url: ''
    }
  },
  mounted() {
    // 初始化这个裁剪框
  },
  methods: {
    imgeBeforeUpload(file) {
      this.url = ''
      const fileType = file.type
      const isImage = this.accept.split(',').indexOf(fileType) !== -1
      const isLtSize = file.size / 1024 / 1024 <= this.maxSize
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error('只能上传图片格式png、jpg!')
        return false
      } else if (!isLtSize) {
        this.$message.error('只能上传图片大小小于2M')
        return false
      }
    },
    uploadSectionFile(params) {
      // 每次替换图片要重新得到新的url
      const url = this.getObjectURL(params.file)
      this.url = url
      this.panel = true
      if (this.cropper) {
        this.cropper.replace(url)
      } else {
        this.$nextTick(this.init)
      }
    },
    init() {
      var self = this
      this.cropper = new Cropper(document.getElementById('image'), {
        aspectRatio: 1,
        preview: '.pre-show',
        viewMode: 1,
        dragMode: 'move',
        zoomOnWheel: true, // 是否允许通过鼠标滚轮来缩放图片
        background: true, // 是否在容器上显示网格背景
        rotatable: true, // 是否允许旋转图片
        minContainerWidth: 450,
        minContainerHeight: 330,
        ready: function() {
          self.croppable = true
        }
      })
    },
    // 旋转
    rotateLeft() {
      this.cropper.rotate(-45)
    },
    rotateRight() {
      this.cropper.rotate(45)
    },
    // 缩放
    zoom(num) {
      num = num || 1
      this.cropper.zoom(num)
    },
    move(x, y) {
      this.cropper.move(x, y)
    },
    reset() {
      this.cropper.reset()
    },
    getObjectURL(file) {
      var url = null
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    getCrop() {
      const croppedCanvas = this.cropper.getCroppedCanvas()
      // 圆形
      // getRoundedCanvas(croppedCanvas).toDataURL()
      return croppedCanvas.toDataURL()
    },
    crop() {
      this.panel = false
      if (!this.croppable) {
        return
      }
      this.postImg(this.getCrop())
    },
    postImg(dataURL) {
      // 这边写图片的上传
      this.$store
        .dispatch('common/imgUpload', dataURLtoFile(dataURL))
        .then(res => {
          this.$emit('crop-success', res.data)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.i {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
#cropper-com {
  /deep/ .el-dialog__header {
    display: none;
  }
  /deep/ .el-dialog__body {
    padding: 1px;
  }
  /deep/ .el-button--medium {
    // padding: 7px 10px;
    // font-size: 18px;
    padding: 10px 15px;
  }
  .prec {
    margin-top: 5px;
    padding: 3px;
    background-color: #fff;
    border: 1px solid #00000026;
    width: 138px;
    height: 138px;
    .pre-show {
      // border: 1px dashed #d9d9d9;
      width: 130px;
      height: 130px;
      overflow: hidden;
    }
    &.round {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      .pre-show {
        width: 96px;
        height: 96px;
        border-radius: 50%;
      }
    }
  }

  #image {
    max-width: 100%;
    min-height: 300px;
    max-height: 70vh;
  }
}
</style>
