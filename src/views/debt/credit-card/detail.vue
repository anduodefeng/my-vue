<template>
  <div class="app-container">
    <div ref="spendList" style="width:1400px;height:300px;"></div>
    <el-table
      v-loading="listLoading"
      :data="detailList"
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
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
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
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize" 
    :total="totalCount"/>
  </div>
</template>

<script>
import { getDetail, getDetailChart } from '@/api/credit'

export default {
  data() {
    return {
      detailList: [],
      bankName: '',
      listLoading: true,
      currentPage:1,
      totalCount:1,
      pageSize: 50,
      dateList: [],
      spendList:[]
    }
  },
  mounted(){
    this.getChartData()
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.bankName = this.$route.params.bankName;
      getDetail({
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
    handleCurrentChange(val){
      //改变默认的页数
      this.currentPage = val
      this.fetchData()
    },
    getChartData(){
      const bankName = this.$route.params.bankName;
      getDetailChart(bankName).then(response => {
        const {data} = response
        this.dateList = data.dateList
        this.spendList = data.moneyList

        this.initCharts()
      })
    },
    initCharts(){
      const spend = this.$refs.spendList
      
      const spendCharts = this.$echarts.init(spend,'walden')

      const spendOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "消费情况"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: this.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.spendList,
            type: 'bar'
          }
        ]
      }
      spendCharts.setOption(spendOption)
    }
  }
}
</script>
