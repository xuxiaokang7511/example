<template>
  <div>
    <wb-page-header>
      wb-list 列表
      <template #content>
        <div>
          最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。参考：
          <!-- <a
            href="https://www.iviewui.com/components/list"
            target="_blank"
            class="link-type"
          >View UI 的 List 列表</a>-->
        </div>
      </template>
    </wb-page-header>
    <div class="demo">
      <h2 id="API">API</h2>
      <h3>List props 属性</h3>
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
            <td>border</td>
            <td>是否显示边框</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>item-layout</td>
            <td>设置 ListItem 布局, 可选值为 horizontal（横排）或 vertical（竖直）</td>
            <td>String</td>
            <td>horizontal</td>
          </tr>
          <tr>
            <td>header</td>
            <td>列表头部</td>
            <td>String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>footer</td>
            <td>列表底部</td>
            <td>String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>loading</td>
            <td>列表是否正在加载</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>size</td>
            <td>列表尺寸，可选值为 small、large、default</td>
            <td>String</td>
            <td>default</td>
          </tr>
          <tr>
            <td>split</td>
            <td>是否展示分割线</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
      <h3>List slot 插槽</h3>
      <table class="wb-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>header</td>
            <td>自定义列表头部</td>
          </tr>
          <tr>
            <td>footer</td>
            <td>自定义列表底部</td>
          </tr>
          <tr>
            <td>loading</td>
            <td>自定义加载中</td>
          </tr>
        </tbody>
      </table>
      <h3>ListItem slot 插槽</h3>
      <table class="wb-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>action</td>
            <td>列表操作组，根据 item-layout 的不同, 位置在卡片底部或者最右侧</td>
          </tr>
          <tr>
            <td>extra</td>
            <td>额外内容, 通常用在 item-layout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧</td>
          </tr>
        </tbody>
      </table>
      <h3>ListItemMeta props 属性</h3>
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
            <td>avatar</td>
            <td>列表元素的图标</td>
            <td>String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>title</td>
            <td>列表元素的标题</td>
            <td>String</td>
            <td>-</td>
          </tr>
          <tr>
            <td>description</td>
            <td>列表元素的描述内容</td>
            <td>String</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <h3>ListItemMeta slot 插槽</h3>
      <table class="wb-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>avatar</td>
            <td>自定义列表元素的图标</td>
          </tr>
          <tr>
            <td>title</td>
            <td>自定义列表元素的标题</td>
          </tr>
          <tr>
            <td>description</td>
            <td>自定义列表元素的描述内容</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="demo">
      <h2>示例</h2>
      <strong>默认尺寸：</strong>
      <br />
      <br />
      <wb-list header="Header" footer="Footer">
        <wb-list-item>这是一段文本</wb-list-item>
        <wb-list-item>这是一段文本</wb-list-item>
        <wb-list-item>这是一段文本</wb-list-item>
      </wb-list>
      <br />
      <strong>小尺寸：</strong>
      <br />
      <br />
      <wb-list header="Header" footer="Footer" border size="small">
        <wb-list-item>这是一段文本</wb-list-item>
        <wb-list-item>这是一段文本</wb-list-item>
        <wb-list-item>这是一段文本</wb-list-item>
      </wb-list>
      <br />
      <strong>大尺寸：</strong>
      <br />
      <br />
      <wb-list header="Header" footer="Footer" border size="large">
        <wb-list-item>这是一段文本</wb-list-item>
        <wb-list-item>这是一段文本</wb-list-item>
        <wb-list-item>这是一段文本</wb-list-item>
      </wb-list>
    </div>
    <div class="demo">
      <wb-list>
        <wb-list-item>
          <wb-list-item-meta
            avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            title="这是标题"
            description="这是描述信息，这是描述信息。"
          />
        </wb-list-item>
        <wb-list-item>
          <wb-list-item-meta
            avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            title="这是标题"
            description="这是描述信息，这是描述信息。"
          />
        </wb-list-item>
        <wb-list-item>
          <wb-list-item-meta
            avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            title="这是标题"
            description="这是描述信息，这是描述信息。"
          />
          <template slot="action">
            <li>
              <a href>编辑</a>
            </li>
            <li>
              <a href>更多</a>
            </li>
          </template>
        </wb-list-item>
        <wb-list-item>
          <wb-list-item-meta
            avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            title="这是标题"
            description="这是描述信息，这是描述信息。"
          />
          <template slot="action">
            <li>
              <a href>编辑</a>
            </li>
            <li>
              <a href>更多</a>
            </li>
          </template>
        </wb-list-item>
      </wb-list>
    </div>
    <div class="demo">
      <wb-list item-layout="vertical">
        <wb-list-item v-for="item in data" :key="item.title">
          <wb-list-item-meta
            :avatar="item.avatar"
            :title="item.title"
            :description="item.description"
          />
          {{ item.content }}
          <template slot="action">
            <li>
              <i class="el-icon-star-off" style="padding-right:3px;"></i>123
            </li>
            <li>
              <i class="el-icon-thumb" style="padding-right:3px;"></i>234
            </li>
            <li>
              <i class="el-icon-chat-line-round" style="padding-right:3px;"></i>345
            </li>
          </template>
          <template slot="extra">
            <img
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
              style="width: 280px"
            />
          </template>
        </wb-list-item>
      </wb-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListDemo',
  data() {
    return {
      data: [
        {
          title: '这是标题 1',
          description:
            '这是一段很长的描述信息，这是一段很长的描述信息，这是一段很长的描述信息。',
          avatar:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          content:
            '这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容。'
        },
        {
          title: '这是标题 2',
          description:
            '这是一段很长的描述信息，这是一段很长的描述信息，这是一段很长的描述信息。',
          avatar:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          content:
            '这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容。'
        },
        {
          title: '这是标题 3',
          description:
            '这是一段很长的描述信息，这是一段很长的描述信息，这是一段很长的描述信息。',
          avatar:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          content:
            '这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容。'
        }
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
}
</style>
