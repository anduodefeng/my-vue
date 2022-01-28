<template>
  <div class="dashboard-container">
    <div style="width:1400px; height:50px">
      <div class="assetsDiv">
        <span class="info">总资产(元)：</span>
        <span class="infoNum">{{ totalAssets }}</span>
      </div>
      <div class="assetsDiv">
        <span class="info">总收益(元)：</span>
        <span v-if="totalProfit > 0 " style="color:red;" class="infoNum" >{{ totalProfit }}</span>
        <span v-if="totalProfit < 0 " style="color:green;" class="infoNum" >{{ totalProfit }}</span>
        <span v-if="totalProfit == 0 " class="infoNum">{{ totalProfit }}</span>
      </div>
      <div class="assetsDiv">
        <span class="info">昨日收益(元)：</span>
        <span v-if="yesterdayProfit > 0 " style="color:red;" class="infoNum" >{{ yesterdayProfit }}</span>
        <span v-if="yesterdayProfit < 0 " style="color:green;" class="infoNum" >{{ yesterdayProfit }}</span>
        <span v-if="yesterdayProfit == 0 " class="infoNum">{{ yesterdayProfit }}</span>
      </div>
    </div>
    <div ref="totalPie" class="chartDiv"></div>
    <div ref="totalLine" class="chartDiv">总资产变化折线图</div>
    <div class="chartDiv">指数基金收益率变化折线图</div>
    <div class="chartDiv">主动基金收益率变化折线图</div>
    <div class="chartDiv">稳健组合收益率变化折线图</div>
    <div class="chartDiv">积极增值组合收益率变化折线图</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getIndexData } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return {
      totalAssets: 0,
      totalProfit: 0,
      yesterdayProfit: 0,
      pieData:[],
      dateList:[],
      moneyList:[]
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      getIndexData().then(response => {
        const {data} = response 
        this.totalAssets = data.totalAssets
        this.totalProfit = data.totalProfit
        this.yesterdayProfit = data.yesterdayProfit
        this.pieData = data.pieList
        this.dateList = data.dateList
        this.moneyList = data.moneyList

        this.initCharts()
      })
    },
    initCharts(){
      const pieChart = this.$refs.totalPie
      const lineChart = this.$refs.totalLine

      const myPieCharts = this.$echarts.init(pieChart, 'macarons')
      const myLineCharts = this.$echarts.init(lineChart, 'macarons')
      const pieOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "资产构成",
        },
        tooltip:{
          trigger: 'item',
          formatter: "{b} : {c}({d}%)"
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            data: this.pieData
          }
        ]
      };
      const lineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "总资产变化"
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.dateList
        },
        yAxis: {
            type: 'value',

          },
        series: [
          {
            data: this.moneyList,
            type: 'line',
          }
        ]
      };
      myPieCharts.setOption(pieOption)
      myLineCharts.setOption(lineOption)
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.assetsDiv{
  width:400px;
  height:50px;
  margin-left:50px;
  float:left;
}
.chartDiv{
  border:1px solid black; 
  width:600px; 
  height:300px;
  float:left;
}
.info{
  line-height:50px;
  font-weight:bolder;
  font-size:18px;
}
.infoNum{
  line-height:50px;
  font-weight:bolder;
  font-size:20px; 
  margin-left:30px;
}
</style>
