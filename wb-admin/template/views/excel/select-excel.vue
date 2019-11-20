<template>
  <div class="app-container">
    <el-input
      v-model="filename"
      placeholder="请输入文件名 (默认 excel-list)"
      style="width:350px;"
      prefix-icon="el-icon-document"
    />
    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >导出已选择项</el-button>
    <a
      href="https://panjiachen.gitee.io/vue-element-admin-site/zh/feature/component/excel.html"
      target="_blank"
      style="margin-left:15px;"
    >
      <el-tag type="info">文档</el-tag>
    </a>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="名称" width="200" align="center">
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
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="page.total/page.pageSize>1"
      :total="page.total"
      :background="false"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @pagination="getAllExcel"
    />
  </div>
</template>

<script>
import { getAllExcel } from '@/store/api/excle'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SelectExcel',
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      multipleSelection: [],
      downloadLoading: false,
      filename: ''
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/js/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', '角色', '时间', '数量', '状态']
          const filterVal = ['id', 'name', 'time', 'count', 'state']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
