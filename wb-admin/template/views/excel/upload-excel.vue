<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div v-if="tableData.length>0">
      <el-button
        :loading="uploadLoading"
        style="margin-bottom:20px;margin-top:20px"
        type="primary"
        icon="el-icon-document"
        @click="upload"
      >上传</el-button>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { impExcel } from '@/store/api/excle'
import UploadExcelComponent from './components/UploadExcel.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      file: null,
      uploadLoading: false,
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    upload() {
      impExcel(this.file).then(res => {
        this.tableData = []
        this.tableHeader = []
        this.$message.success(res.msg)
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        this.file = file
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
