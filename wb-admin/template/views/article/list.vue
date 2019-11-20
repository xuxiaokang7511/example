<template>
  <content-main
    title-height="48px"
    show-foot
    style="padding-left:16px;padding-right:16px;padding-bottom:10px;"
  >
    <template #title>
      <span style="font-size:14px;font-weight:bold;">文章列表</span>
    </template>
    <template #right>
      <router-link to="/article/create">
        <el-button style="margin-right:18px;" size="mini" icon="el-icon-plus">创建文章</el-button>
      </router-link>
    </template>
    <div style="padding-left:16px;padding-right:16px;padding-top:5px;">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="Date">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="Author">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" label="Importance">
          <template slot-scope="scope">
            <svg-icon
              v-for="n in +scope.row.importance"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
            />
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="300px" label="Title">
          <template slot-scope="{row}">
            <router-link :to="'/article/edit/'+row.id" class="link-type">
              <span>{{ row.title }}</span>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="scope">
            <router-link :to="'/article/edit/'+scope.row.id">
              <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #foot>
      <pagination
        v-show="total>0"
        style="padding-left:16px;padding-bottom:5px;"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </template>
  </content-main>
</template>

<script>
import { fetchList } from '@/store/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
