<template>
  <div
    class="tinymce-container"
    :style="{width:containerWidth,height:containerHeight,visibility:show?'visible':'hidden'}"
  >
    <editor v-if="show" v-model="myValue" :disabled="disabled" :init="init" v-on="listeners"></editor>
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import menubar from './menubar'

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'

import { blob2File } from '@/js/libs/img'

const baseURL = process.env.VUE_APP_BASE_API
const validEvents = [
  'onActivate',
  'onAddUndo',
  'onBeforeAddUndo',
  'onBeforeExecCommand',
  'onBeforeGetContent',
  'onBeforeRenderUI',
  'onBeforeSetContent',
  'onBeforePaste',
  'onBlur',
  'onChange',
  'onClearUndos',
  'onClick',
  'onContextMenu',
  'onCopy',
  'onCut',
  'onDblclick',
  'onDeactivate',
  'onDirty',
  'onDrag',
  'onDragDrop',
  'onDragEnd',
  'onDragGesture',
  'onDragOver',
  'onDrop',
  'onExecCommand',
  'onFocus',
  'onFocusIn',
  'onFocusOut',
  'onGetContent',
  'onHide',
  'onInit',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onLoadContent',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onNodeChange',
  'onObjectResizeStart',
  'onObjectResized',
  'onObjectSelected',
  'onPaste',
  'onPostProcess',
  'onPostRender',
  'onPreProcess',
  'onProgressState',
  'onRedo',
  'onRemove',
  'onReset',
  'onSaveContent',
  'onSelectionChange',
  'onSetAttrib',
  'onSetContent',
  'onShow',
  'onSubmit',
  'onUndo',
  'onVisualAid'
]

export default {
  name: 'Tinymce5',
  components: {
    Editor
  },
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    plugins: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    menubar: {
      type: String,
      required: false,
      default() {
        return ''
        // return 'file edit insert view format table tools'
      }
    },
    mode: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    // 隐藏底栏的元素路径
    elementpath: {
      type: Boolean,
      default: false
    },
    // 显示隐藏状态栏
    statusbar: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      required: false,
      default: 500
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    let _mode = this.mode.trim()
    if (['mini', 'basic', 'full'].indexOf(_mode) === -1) {
      _mode = 'basic'
    }
    let _toolbar = this.toolbar
    if (_toolbar.trim() === '') {
      _toolbar = toolbar[_mode]
    }
    let _plugins = this.plugins
    if (_plugins.trim() === '') {
      _plugins = plugins[_mode]
    }
    let _menubar = this.menubar.trim() ? this.menubar.trim() : false
    if (!_menubar) {
      _menubar = menubar[_mode]
    }
    return {
      show: false,
      fullscreen: false,
      init: {
        id: this.id,
        language_url: '/vendor/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/vendor/tinymce/skins/ui/oxide',
        // skin_url: '/vendor/tinymce/skins/ui/oxide-dark', // 暗色系
        height: this.height,
        plugins: _plugins,
        toolbar: _toolbar,
        menubar: _menubar,
        // 隐藏右下角技术支持
        branding: false,
        // 隐藏底栏的元素路径
        elementpath: this.elementpath,
        // 显示隐藏状态栏
        statusbar: this.statusbar,
        // 图片对话框的高级
        image_advtab: true,
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'merge',
        powerpaste_html_import: 'merge',
        powerpaste_block_drop: true,
        link_context_toolbar: true,
        templates: [
          {
            title: '内容模板',
            description: '简单内容模板示例',
            content: '这是模板内容，<b>加粗这里将会显示</b>。'
          },
          {
            title: '表格模板',
            description: '2x2 的表格模板示例',
            url: '/vendor/tinymce/templates/table.html'
          }
        ],
        // 图片标题
        image_caption: true,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        // http://tinymce.ax-z.cn/configure/file-image-upload.php#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          let file = blobInfo.blob()

          if (!file.name) {
            // file.lastModifiedDate = new Date()
            // file.name = blobInfo.filename()
            file = blob2File(file, blobInfo.filename())
          }
          this.$store
            .dispatch('common/imgUpload', file)
            .then(res => {
              success(res.data)
            })
            .catch(err => {
              failure(err)
            })
        },
        // imagetools_cors_hosts: ['tinymce.com', '192.168.1.108'],
        imagetools_proxy: baseURL + '/file/imgShow',
        setup: this.setup
      },
      myValue: this.value
    }
  },
  computed: {
    // 容器高度
    containerHeight() {
      const height = this.height
      if (/^[\d]+(\.[\d]+)?$/.test(height)) {
        // matches `100`, `'100'`
        return `${height}px`
      }
      return height
    },
    // 容器宽度
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    },
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    listeners() {
      const vm = this
      const listeners = {}
      Object.keys(this.$listeners)
        .filter(key => validEvents.indexOf(key) !== -1)
        .forEach(key => {
          listeners[key] = function(event) {
            vm.$emit(key, event, tinymce)
          }
        })
      return listeners
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    // console.log('mounted')
    this.initTinymce()
  },
  activated() {
    // console.log('activated')
    this.initTinymce()
  },
  deactivated() {
    // const editor = tinymce.activeEditor
    // if (this.fullscreen) {
    //   editor.execCommand('mceFullScreen')
    // }
    this.fullscreen = false
    this.show = false
  },
  methods: {
    initTinymce() {
      this.show = true
      tinymce.init({})
    },
    setup(editor) {
      editor.on('FullscreenStateChanged', e => {
        this.fullscreen = e.state
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
  textarea {
    display: none;
  }
}
</style>
