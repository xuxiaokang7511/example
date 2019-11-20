<template>
  <div>
    <wb-page-header>
      wb-cell 单元格
      <template #content>
        <div>
          用于固定的菜单列表。
          <!-- <a
            href="https://www.iviewui.com/components/cell"
            target="_blank"
            class="link-type"
          >View UI 的 wb-cell 单元格</a>-->
        </div>
      </template>
    </wb-page-header>

    <el-row class="demo">
      <el-col :span="17">
        <h2 id="API">API</h2>
        <h3>CellGroup 事件</h3>
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
              <td>on-click</td>
              <td>点击单元格时触发</td>
              <td>name</td>
            </tr>
          </tbody>
        </table>
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
              <td>name</td>
              <td>用来标识这一项</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>title</td>
              <td>左侧标题</td>
              <td>String</td>
              <td>-</td>
            </tr>
            <tr>
              <td>label</td>
              <td>标题下方的描述信息</td>
              <td>String</td>
              <td>-</td>
            </tr>
            <tr>
              <td>extra</td>
              <td>右侧额外内容</td>
              <td>String</td>
              <td>-</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>禁用该项</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>selected</td>
              <td>标记该项为选中状态</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>to</td>
              <td>跳转的链接，支持 vue-router 对象</td>
              <td>String | Object</td>
              <td>-</td>
            </tr>
            <tr>
              <td>replace</td>
              <td>路由跳转时，开启 replace 将不会向 history 添加新记录</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>target</td>
              <td>相当于 a 链接的 target 属性</td>
              <td>String</td>
              <td>_self</td>
            </tr>
            <tr>
              <td>append</td>
              <td>同 vue-router append</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
        <h3>slot 插槽</h3>
        <table class="wb-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>默认</td>
              <td>相当于 title</td>
            </tr>
            <tr>
              <td>icon</td>
              <td>标题前的 Icon</td>
            </tr>
            <tr>
              <td>label</td>
              <td>相当于 label</td>
            </tr>
            <tr>
              <td>extra</td>
              <td>相当于 extra</td>
            </tr>
            <tr>
              <td>arrow</td>
              <td>有链接时，可自定义右侧箭头</td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="7">
        <wb-affix :container="mainScroll" :offset-top="120" style="z-index:10;">
          <h2 style="margin-left:16px;">示例</h2>
          <el-card style="max-width:300px;margin:16px 16px 0;" :body-style="	{ padding: 0 }">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-operation"></i>
              <span>选项</span>
            </div>
            <wb-cell-group>
              <wb-cell title="只显示标题" />
              <wb-cell title="显示 label 内容" label="label 的内容" />
              <wb-cell title="显示右侧内容" extra="详细信息" />
              <wb-cell title="链接" extra="详细信息" to="/example/upload" />
              <wb-cell title="新窗口打开链接" to="/example/list" target="_blank" />
              <wb-cell title="禁用" disabled />
              <wb-cell title="选中" selected />
              <wb-cell title="显示徽标" to="/example/loading">
                <el-badge slot="extra" :value="10"></el-badge>
              </wb-cell>
              <wb-cell title="开关">
                <el-switch v-model="switchValue"></el-switch>
              </wb-cell>
            </wb-cell-group>
          </el-card>
        </wb-affix>
      </el-col>
    </el-row>

    <!-- <div class="demo">
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'CellDemo',
  data() {
    return {
      switchValue: true
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
