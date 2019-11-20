<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >导出本页</el-button>

      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="getExcel"
      >导出全部</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
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
const baseURL = process.env.VUE_APP_BASE_API
import { getAllExcel } from '@/store/api/excle'
// options components

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { Pagination, FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: true,
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
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
        const tHeader = ['Id', '角色', '时间', '数量', '状态']
        const filterVal = ['id', 'name', 'time', 'count', 'state']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    async getExcel() {
      this.downloadLoading = true

      try {
        // const res = await getExcel()
        // getExcel()
        //   .then(res => {
        //     debugger
        //     console.log(res)
        //   })
        //   .catch(err => {
        //     debugger
        //     console.log(err)
        //   })
        // const { data } = await getExcel()
        // const arr = data.split('/')
        // const aEle = document.createElement('a')
        // aEle.download = arr[arr.length - 1]
        // aEle.href = data
        // aEle.target = '_blank'
        // aEle.click()

        import('@/js/vendor/Export2Excel').then(excel => {
          excel.export_url_to_excel(baseURL + '/excel/excelShow', 'abc.xls')
          this.downloadLoading = false
        })
      } catch (error) {
        this.downloadLoading = false
        // this.$message.error(error.message)
      }
      this.downloadLoading = false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 10px;
}
</style>
