<template>
  <div>
    <wb-page-header>
      Anchor 锚点
      <template #content>
        <div>
          用于跳转到页面指定位置。
          <!-- <a
            href="https://www.iviewui.com/components/anchor"
            target="_blank"
            class="link-type"
          >View UI 的 Anchor 锚点</a>-->
        </div>
      </template>
    </wb-page-header>
    <el-row class="demo">
      <el-col :span="20">
        <div>
          <h2 id="basic_usage">基础使用</h2>
          <pre>
          <div v-for="(c,i) in code" :key="i" class="code">{{ c }}</div>
        </pre>
        </div>
        <div>
          <h2 id="API">API</h2>
          <h3 id="Anchor_props">属性</h3>
          <table class="wb-table">
            <thead>
              <tr>
                <th>属性</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>affix</td>
                <td>固定模式</td>
                <td>Boolean</td>
                <td>true</td>
              </tr>
              <tr>
                <td>offset-top</td>
                <td>距离窗口顶部达到指定偏移量后触发</td>
                <td>Number</td>
                <td>0</td>
              </tr>
              <tr>
                <td>offset-bottom</td>
                <td>距离窗口底部达到指定偏移量后触发</td>
                <td>Number</td>
                <td>-</td>
              </tr>
              <tr>
                <td>bounds</td>
                <td>锚点区域边界，单位：px</td>
                <td>Number</td>
                <td>5</td>
              </tr>
              <tr>
                <td>scroll-offset</td>
                <td>点击滚动的额外距离</td>
                <td>Number</td>
                <td>0</td>
              </tr>
              <tr>
                <td>container</td>
                <td>指定滚动的容器</td>
                <td>String | HTMLElement</td>
                <td>-</td>
              </tr>
              <tr>
                <td>show-ink</td>
                <td>是否显示小圆点</td>
                <td>Boolean</td>
                <td>false</td>
              </tr>
            </tbody>
          </table>
          <h3 id="Anchor_events">事件</h3>
          <table class="wb-table">
            <thead>
              <tr>
                <th>事件名</th>
                <th>说明</th>
                <th>返回值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>on-select</td>
                <td>点击锚点时触发，返回链接</td>
                <td>href</td>
              </tr>
              <tr>
                <td>on-change</td>
                <td>链接改变时触发，返回新链接和旧链接</td>
                <td>newHref, oldHref</td>
              </tr>
            </tbody>
          </table>
          <h3 id="AnchorLink_props">链接属性</h3>
          <table class="wb-table">
            <thead>
              <tr>
                <th>事件名</th>
                <th>说明</th>
                <th>返回值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>on-select</td>
                <td>点击锚点时触发，返回链接</td>
                <td>href</td>
              </tr>
              <tr>
                <td>on-change</td>
                <td>链接改变时触发，返回新链接和旧链接</td>
                <td>newHref, oldHref</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-col>
      <el-col :span="4" style="font-size:14px;padding-left:10px;">
        <wb-anchor show-ink :offset-top="120" :container="mainScroll">
          <wb-anchor-link href="#basic_usage" title="用法" />
          <wb-anchor-link href="#API" title="API">
            <wb-anchor-link href="#Anchor_props" title="锚点属性" />
            <wb-anchor-link href="#Anchor_events" title="锚点事件" />
            <wb-anchor-link href="#AnchorLink_props" title="锚点链接属性" />
          </wb-anchor-link>
        </wb-anchor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AnchorDemo',
  data() {
    return {
      code: [
        '<wb-anchor show-ink :offset-top="110">',
        '    <wb-anchor-link href="#basic_usage" title="基础使用" />',
        '    <wb-anchor-link href="#API" title="API">',
        '        <wb-anchor-link href="#Anchor_props" title="属性" />',
        '        <wb-anchor-link href="#Anchor_events" title="事件" />',
        '    </wb-anchor-link>',
        '</wb-anchor>'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  background-color: #fff;
  margin: 16px 16px 0;
  padding: 20px;
  min-height: 1800px;
}
.code {
  margin: 5px 0;
  line-height: 24px;
}
pre {
  padding: 0 16px;
  margin: 0;
  color: #6e6e6e;
}
</style>
