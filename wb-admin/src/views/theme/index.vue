<template>
  <div class="app-container">
    <div class="block">
      <h3 style="padding-bottom:20px;margin-top:10px;">主题设置</h3>
      <div class="box-item">
        <span class="field-label">顶部栏</span>
        <el-radio-group v-model="color" @change="changeColor">
          <el-radio-button label="dark">暗色</el-radio-button>
          <el-radio-button label="light">亮色</el-radio-button>
          <el-radio-button label="color">主色</el-radio-button>
        </el-radio-group>
      </div>
      <div class="box-item" style="padding-top:20px;">
        <span class="field-label">侧边栏</span>
        <el-radio-group v-model="style" @change="changeStyle">
          <el-radio-button label="dark">暗</el-radio-button>
          <el-radio-button label="light">亮</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="block drawer-container">
      <h3>布局设置</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card" header="侧边栏">
            <div class="drawer-item">
              <span>侧边栏Logo</span>
              <el-switch v-model="sidebarLogo" class="drawer-switch" />
            </div>
            <div class="drawer-item">
              <span>单个菜单</span>
              <el-tooltip effect="dark" content="单个菜单是否开启侧边栏" placement="top">
                <i class="el-icon-question" style="color:#bbb;"></i>
              </el-tooltip>
              <el-switch v-model="oneChild" class="drawer-switch" />
            </div>
            <div class="drawer-item">&nbsp;</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" header="顶部栏">
            <div class="drawer-item">
              <span>固定顶栏</span>
              <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>
            <div class="drawer-item">
              <span>置顶顶栏</span>
              <el-tooltip effect="dark" content="需开启固定顶栏" placement="top">
                <i class="el-icon-question" style="color:#bbb;"></i>
              </el-tooltip>
              <el-switch v-model="fullHeader" :disabled="!fixedHeader" class="drawer-switch" />
            </div>
            <div class="drawer-item">
              <span>顶部导航</span>
              <el-switch v-model="topMenu" class="drawer-switch" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" header="底部栏">
            <div class="drawer-item">
              <span>开启底栏</span>
              <el-switch v-model="footer" class="drawer-switch" />
            </div>
            <div class="drawer-item">
              <span>固定底栏</span>
              <el-tooltip effect="dark" content="需开启底栏" placement="top">
                <i class="el-icon-question" style="color:#bbb;"></i>
              </el-tooltip>
              <el-switch v-model="fixedFooter" :disabled="!footer" class="drawer-switch" />
            </div>
            <div class="drawer-item">&nbsp;</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" header="标签 & 面包屑">
            <div class="drawer-item">
              <span>开启标签栏</span>
              <el-switch v-model="tagsView" class="drawer-switch" />
            </div>
            <div class="drawer-item">
              <span>标签图标</span>
              <el-tooltip effect="dark" content="需开启标签栏" placement="top">
                <i class="el-icon-question" style="color:#bbb;"></i>
              </el-tooltip>
              <el-switch v-model="tagsIcon" :disabled="!tagsView" class="drawer-switch" />
            </div>
            <div class="drawer-item">
              <span>面包屑图标</span>
              <el-switch v-model="breadcrumbIcon" class="drawer-switch" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import waves from '@/js/directive/waves/index.js' // 水波纹指令

export default {
  name: 'Theme',
  data() {
    return {
      color: '',
      style: ''
    }
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    fullHeader: {
      get() {
        return this.$store.state.settings.fullHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fullHeader',
          value: val
        })
      }
    },
    topMenu: {
      get() {
        return this.$store.state.settings.topMenu
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'topMenu',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    tagsIcon: {
      get() {
        return this.$store.state.settings.tagsIcon
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsIcon',
          value: val
        })
      }
    },
    breadcrumbIcon: {
      get() {
        return this.$store.state.settings.breadcrumbIcon
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'breadcrumbIcon',
          value: val
        })
      }
    },
    footer: {
      get() {
        return this.$store.state.settings.footer
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'footer',
          value: val
        })
      }
    },
    fixedFooter: {
      get() {
        return this.$store.state.settings.fixedFooter
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedFooter',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    oneChild: {
      get() {
        return this.$store.state.settings.oneChild
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'oneChild',
          value: val
        })
      }
    }
  },
  created() {
    this.color = this.getThemeColor()
    this.style = this.getThemeStyle()
    // this.size = this.$store.getters.size
  },
  methods: {
    changeColor(color) {
      document.documentElement.setAttribute('data-color', color)
      this.$store.dispatch('settings/setTheme', { key: 'color', value: color })
    },
    changeStyle(style) {
      document.documentElement.setAttribute('data-style', style)
      this.$store.dispatch('settings/setTheme', { key: 'style', value: style })
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 24px;
  margin: 20px 0 20px;
  color: #333;
}
.field-label {
  vertical-align: middle;
  padding-right: 8px;
}

.block {
  padding: 10px 24px;
  &.preview {
    border-radius: 4px;
    background: #fff;
    max-width: 855px;
    margin-left: 24px;
    padding-top: 5px;
  }
}

.drawer-container {
  padding: 24px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    font-size: 14px;
    // color: rgba(0, 0, 0, 0.65);
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
