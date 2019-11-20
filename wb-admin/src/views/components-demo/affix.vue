<template>
  <div>
    <wb-page-header>
      Affix 图钉
      <template #content>
        <div>
          使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。
          <a
            href="https://www.iviewui.com/components/affix"
            target="_blank"
            class="link-type"
          >View UI 的 Affix 图钉</a>
        </div>
      </template>
    </wb-page-header>
    <div class="demo">
      <wb-affix :container="mainScroll" style="z-index:10;">
        <span class="demo-affix">固定在最顶部</span>
      </wb-affix>
      <div>
        <h2 id="API">API</h2>
        <h3>props 属性</h3>
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
          </tbody>
        </table>
        <h3>events 事件</h3>
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
              <td>on-change</td>
              <td>在固定状态发生改变时触发</td>
              <td>true | false</td>
            </tr>
          </tbody>
        </table>
      </div>
      <wb-affix :container="mainScroll" :offset-top="120">
        <span class="demo-affix">固定在距离顶部 120px 的位置</span>
      </wb-affix>
      <div style="height:500px"></div>
      <wb-affix :container="mainScroll" :offset-bottom="50">
        <span class="demo-affix">固定在距离底部 50px 的位置</span>
      </wb-affix>
      <div style="height:400px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AffixDemo',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.demo {
  background-color: #fff;
  margin: 16px 16px 0;
  padding: 20px;
  min-height: 1500px;
}
.demo-affix {
  display: inline-block;
  color: #fff;
  padding: 10px 30px;
  text-align: center;
  background: #0099e5e6;
}
</style>
