<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="detailList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 1400px"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="基金代码">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="基金名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="基金净值">
        <template slot-scope="scope">
          <span>{{ scope.row.worth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="基金份额">
        <template slot-scope="scope">
          <span>{{ scope.row.shares }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="变动金额">
        <template slot-scope="scope">
          <span>{{ scope.row.changeMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="变动类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
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
import { getFundDetail } from '@/api/fund'

export default {
  data() {
    return {
      detailList: [],
      code: '',
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
      this.code = this.$route.params.code;
      getFundDetail({
        "page": this.currentPage, 
        "pageSize": this.pageSize,
        "code": this.code 
        }).then(response => {
          const { data} = response
          this.detailList = data.fundDetailList
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
