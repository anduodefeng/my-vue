<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="detailList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="银行名称">
        <template slot-scope="scope">
          {{ scope.row.bankName }}
        </template>
      </el-table-column>
      <el-table-column label="变动金额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="update_at" label="变动时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination style="float: right;" background layout="prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize" 
    :total="totalCount"/>
  </div>
</template>

<script>
import { getCashDetail } from '@/api/cash'

export default {
  data() {
    return {
      detailList: [],
      bankName: '',
      listLoading: true,
      currentPage:1,
      totalCount:1,
      pageSize: 20
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.bankName = this.$route.params.bankName;
      getCashDetail({
        "page": this.currentPage, 
        "pageSize": this.pageSize,
        "bankName": this.bankName
        }).then(response => {
          const { data} = response
          this.detailList = data.detailList
          this.currentPage = response.data.currentPage
          this.totalCount = response.data.totalNum
          this.listLoading = false;
        })
      
    },
    handleSizeChange(val){
      //改变每页显示的条数
      this.pageSize = val
      //注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    handleCurrentChange(val){
      //改变默认的页数
      this.currentPage = val
    }
  }
}
</script>
