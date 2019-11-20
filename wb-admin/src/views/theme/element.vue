<template>
  <div class="app-container">
    <div class="block">
      <h3>Element UI 设置</h3>
      <div class="box-item">
        <span class="field-label">布局大小</span>
        <el-radio-group v-model="size">
          <el-radio-button
            v-for="item of sizeOptions"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </div>
      <h3>Element UI 示例</h3>
    </div>
    <div class="block preview">
      <basic-tokens-preview></basic-tokens-preview>
      <components-preview />
    </div>
    <el-backtop :target="mainScroll" :bottom="50"></el-backtop>
  </div>
</template>

<script>
import basicTokensPreview from './components/basic-tokens-preview'
import componentsPreview from './components/preview'
export default {
  name: 'Element',
  components: { componentsPreview, basicTokensPreview },
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ],
      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '100%',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1' // 按钮的背景颜色 The background color of the button
      }
    }
  },
  computed: {
    size: {
      get() {
        return this.$store.getters.size
      },
      set(val) {
        this.changeSize(val)
      }
    }
  },
  methods: {
    changeSize(size) {
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size)
      this.refreshView()
      this.$message({
        message: '切换布局大小成功',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 24px;
  margin: 30px 0 20px;
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

    min-width: 680px;
    max-width: 855px;
    width: 80%;
    margin-left: 24px;
    padding-top: 5px;
  }
}
</style>
