<template>
  <div>
    <wb-page-header>
      Time 相对时间
      <template #content>
        <div>
          常用于表示几分钟前、几小时前等相对于此时此刻的时间描述。
          <!-- <a
            href="https://www.iviewui.com/components/time"
            target="_blank"
            class="link-type"
          >View UI 的 Time 相对时间</a>-->
        </div>
      </template>
    </wb-page-header>
    <div class="demo">
      <el-divider content-position="left">基本:</el-divider>
      <p>
        <wb-time :time="time1" />
      </p>
      <p>
        <wb-time :time="time2" />
      </p>
      <el-divider content-position="left">自动更新间隔:</el-divider>
      <p>
        <wb-time :time="time3" :interval="1" />
      </p>
      <el-divider content-position="left">不同类型显示:</el-divider>
      <p>
        <wb-time :time="time2" />
      </p>
      <p>
        <wb-time :time="time2" type="date" />
      </p>
      <p>
        <wb-time :time="time2" type="datetime" />
      </p>
      <el-divider content-position="left">锚点:</el-divider>
      <p>
        <wb-time :time="time2" hash="#hash" />
      </p>
      <h2 id="API">API</h2>
      <h3 id="Anchor_props">props 属性</h3>
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
            <td>time</td>
            <td>需要对比的时间，可以是时间戳或 Date 类型</td>
            <td>Number | Date | String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>type</td>
            <td>类型，可选值为 relative、date 或 datetime</td>
            <td>String</td>
            <td>relative</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>自动更新的间隔，单位：秒</td>
            <td>Number</td>
            <td>60</td>
          </tr>
          <tr>
            <td>hash</td>
            <td>填写该值，点击会定位锚点</td>
            <td>String</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeDemo',
  data() {
    return {
      time1: new Date().getTime() - 60 * 3 * 1000,
      time2: new Date().getTime() - 86400 * 3 * 1000,
      time3: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  background-color: #fff;
  margin: 16px 16px 0;
  padding: 20px;
}
</style>
