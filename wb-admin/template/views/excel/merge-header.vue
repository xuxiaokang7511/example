<template>
  <div class="app-container">
    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >导出</el-button>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="名称" width="200" align="center">
        <el-table-column label="Title">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="状态" width="150" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.count }}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllExcel } from '@/store/api/excle'
import { parseTime } from '@/js/libs'

export default {
  name: 'MergeHeader',
  data() {
    return {
      list: null,
      listLoading: true,
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      downloadLoading: false
    }
  },
  created() {
    this.getAllExcel()
  },
  methods: {
    async getAllExcel() {
      try {
        this.listLoading = true
        const { data, page } = await getAllExcel(this.page)
        this.list = data
        this.page = page
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
        // this.$message.error(error.message)
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/js/vendor/Export2Excel').then(excel => {
        const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
        const header = ['', 'Title', 'Author', 'Readings', '']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        const merges = ['A1:A2', 'B1:D1', 'E1:E2']
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
