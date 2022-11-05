<template>
  <div class="app-container">
    <div style="width:1400px;height:300px;">
      <div ref="detailBar" style="width:600px;height:300px; margin-bottom:10px;float:left"></div>
      <div ref="detailLine" style="width:600px;height:300px; margin-bottom:10px;float:left"></div>
    </div>
    <div>变动详情</div>
    <el-table
      v-loading="listLoading"
      :data="detailList"
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
      <el-table-column align="center" label="组合名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.newMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="盈利金额">
          <template slot-scope="scope">
          <span v-if="scope.row.profit > 0" style="color:red;font-weight:bolder;">{{ scope.row.profit }}</span>
          <span v-if="scope.row.profit < 0" style="color:green;font-weight:bolder;">{{ scope.row.profit }}</span>
          <span v-if="scope.row.profit == 0">{{ scope.row.profit }}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收益率">
        <template slot-scope="scope">
          <span v-if="scope.row.profitRate > 0" style="color:red;font-weight:bolder;">{{ scope.row.profitRate }}%</span>
          <span v-if="scope.row.profitRate < 0" style="color:green;font-weight:bolder;">{{ scope.row.profitRate }}%</span>
          <span v-if="scope.row.profitRate == 0">{{ scope.row.profitRate }}%</span>
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
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize" 
    :total="totalCount"/>
  </div>
</template>

<script>
import { getPortfolioDetail, getDetailChart } from '@/api/portfolio'

export default {
  data() {
    return {
      detailList: [],
      id: '',
      listLoading: true,
      currentPage:1,
      totalCount:1,
      pageSize: 30,
      dateList:[],
      dataList:[],
      rateList:[]
    }
  },
  created() {
    this.fetchData()
  },
  mounted(){
    this.getDetailChart()
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id;
      getPortfolioDetail({
        "page": this.currentPage, 
        "pageSize": this.pageSize,
        "id": this.id 
        }).then(response => {
          const { data} = response
          this.detailList = data.detailList
          this.currentPage = response.data.currentPage
          this.totalCount = response.data.totalNum
          this.listLoading = false;
        })
      
    },
    checkChangeMoney(changeMoney, changeType){
      if(changeMoney > 0 && changeType == '日常更新'){
        return 0
      }else if(changeMoney < 0 && changeType == '日常更新'){
        return 1
      }else{
        return 2
      }
    },
    handleCurrentChange(val){
      //改变默认的页数
      this.currentPage = val
      this.fetchData();
    },
    getDetailChart(){
      getDetailChart(this.id).then(response => {
        const {data} = response
        this.dateList = data.dateList
        this.dataList = data.dataList
        this.rateList = data.rateList
        this.initCharts()
      })
    },
    initCharts(){
      const chart = this.$refs.detailBar
      const lineChart = this.$refs.detailLine
      if(chart){
        const myCharts = this.$echarts.init(chart, 'walden')
        const myLineCharts = this.$echarts.init(lineChart, 'walden')
        const option = {
          title: {
            text: '基金日常变动'
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
              name: "收益",
              type: 'candlestick',
              data: this.dataList,
              barWidth: 5,
              animationDuration: 2000,
              itemStyle: {
                color: "#eb5454",
                color0: "#47b262",
                borderColor: "#eb5454",
                borderColor0: "#47b262",
                borderWidth: 1
              }
            }
          ]
        }
        const lineOption = {
          title: {
            text: '基金收益率'
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
              name: "收益率",
              type: 'line',
              data: this.rateList,
              animationDuration: 2000
            }
          ]
        }
        myCharts.setOption(option)
        myLineCharts.setOption(lineOption)
      }
    }
  }
}
</script>
