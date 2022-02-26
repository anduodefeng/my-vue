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
        <span class="info">总收益率：</span>
        <span v-if="totalProfitRate > 0 " style="color:red;" class="infoNum" >{{ totalProfitRate }}%</span>
        <span v-if="totalProfitRate < 0 " style="color:green;" class="infoNum" >{{ totalProfitRate }}%</span>
        <span v-if="totalProfitRate == 0 " class="infoNum">{{ totalProfitRate }}</span>
      </div>
    </div>
    <div class="chartDiv">
      <div ref = "totalPie" class = "topDiv" style="float:left;"></div>
      <div ref = "totalLine" style="width: 790px; height:400px;float:left;"></div>
    </div>
    <div class="chartDiv">
      <div ref = "profitEveryWeek" style="width:650px; height:400px;float:left;"></div>
      <div ref = "profitRateEveryWeek" style="width: 650px; height:400px;float:left;"></div>
    </div>
    
    <div ref = "indexFundLine" class="chartDiv"></div>
    <div ref = "activeFundLine" class="chartDiv"></div>
    <div ref = "robustLine" class="chartDiv"></div>
    <div ref = "aggressiveLine" class="chartDiv"></div>
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
      totalProfitRate: 0,
      pieData:[],
      dateList:[],
      moneyList:[],
      totalPrincipal: [],
      indexFundName: [],
      indexFundLine: [],
      activeFundName: [],
      activeFundLine: [],
      robustName: [],
      robustLine: [],
      aggressiveName: [],
      aggressiveLine: [],
      profitEveryWeek: [],
      profitRateEveryWeek: []
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
        this.totalProfitRate = data.totalProfitRate
        this.pieData = data.pieList
        this.dateList = data.dateList
        this.moneyList = data.moneyList
        this.totalPrincipal = data.principalList
        this.indexFundName = data.indexFundNameList
        this.indexFundLine = data.indexFundLine
        this.activeFundName = data.activeFundNameList
        this.activeFundLine = data.activeFundLine
        this.robustName = data.robustPortfolioNameList
        this.robustLine = data.robustPortfolioLine
        this.aggressiveName = data.aggressivePortfolioNameList
        this.aggressiveLine = data.aggressivePortfolioLine
        this.profitEveryWeek = data.profitEveryWeek
        this.profitRateEveryWeek = data.profitRateEveryWeek
        this.initCharts()
      })
    },
    initCharts(){
      const pieChart = this.$refs.totalPie
      const lineChart = this.$refs.totalLine
      const indexFund = this.$refs.indexFundLine
      const activeFund = this.$refs.activeFundLine
      const robustPortfolio = this.$refs.robustLine
      const aggressivePortfolio = this.$refs.aggressiveLine
      const profitEveryWeek = this.$refs.profitEveryWeek
      const profitRateEveryWeek = this.$refs.profitRateEveryWeek

      const myPieCharts = this.$echarts.init(pieChart, 'walden')
      const myLineCharts = this.$echarts.init(lineChart, 'walden')
      const myIndexFundCharts = this.$echarts.init(indexFund, 'walden')
      const myActiveFundCharts = this.$echarts.init(activeFund, 'walden')
      const myRobustPortfolioCharts = this.$echarts.init(robustPortfolio, 'walden')
      const myAggressivePortfolioCharts = this.$echarts.init(aggressivePortfolio, 'walden')
      const profitEveryWeekCharts = this.$echarts.init(profitEveryWeek, 'walden')
      const profitRateEveryWeekCharts = this.$echarts.init(profitRateEveryWeek, 'walden')

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
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['总资产', '总成本']
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
            name: '总资产',
            data: this.moneyList,
            type: 'line',
          },
          {
            name: '总成本',
            data: this.totalPrincipal,
            type: 'line',
          }
        ]
      };
      const indexLineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "指数基金收益率"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        legend: {
          data: this.indexFundName,
          left: 150
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
        series: this.indexFundLine
      };
      const activeLineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "主动基金收益率"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: this.activeFundName,
          left: 150,
          top: 10
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
        series: this.activeFundLine
      };
      const robustLineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "稳健组合收益率"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: this.robustName,
          left: 150,
          top: 10
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
        series: this.robustLine
      };
      const aggressiveLineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "积极组合收益率"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: this.aggressiveName,
          left: 150,
          top: 10
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
        series: this.aggressiveLine
      };
      const profitEveryWeekOption =  {
          title: {
            text: '总资产日常变动'
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
              data: this.profitEveryWeek,
              barWidth: 20,
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
        };
      const profitRateEveryWeekLineOption = {
            //动画时长 2000ms
            animationDuration: 2000,
            title:{
              text: "总收益率"
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line'
              }
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
                name: '总收益率',
                data: this.profitRateEveryWeek,
                type: 'line',
              }
            ]
          };
      myPieCharts.setOption(pieOption)
      myLineCharts.setOption(lineOption)
      myIndexFundCharts.setOption(indexLineOption)
      myActiveFundCharts.setOption(activeLineOption)
      myRobustPortfolioCharts.setOption(robustLineOption)
      myAggressivePortfolioCharts.setOption(aggressiveLineOption)
      profitEveryWeekCharts.setOption(profitEveryWeekOption)
      profitRateEveryWeekCharts.setOption(profitRateEveryWeekLineOption)
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
  margin-bottom: 20px;
  float:left;
}
.topDiv{
  width:600px; 
  height:400px;
}
.chartDiv{ 
  width:1400px; 
  height:400px;
  margin-top: 30px;
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
