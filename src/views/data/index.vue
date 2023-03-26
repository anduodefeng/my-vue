<template>
  <div>
    <div style="padding-left: 50px; padding-top: 10px">
      <span>选择基金：</span>
      <el-select
        v-model="fundCode"
        placeholder="请选择"
        size="medium"
        @change="changeFund(fundCode)"
      >
        <el-option
          v-for="fund in fundList"
          :key="fund.fundCode"
          :label="fund.fundName"
          :value="fund.fundCode"
        >
        </el-option>
      </el-select>
    </div>
    <div ref="fundLine" class="chartDiv"></div>
  </div>
</template>

<script>
import { getFundData } from "@/api/data";
export default {
  name: "fundData",
  data() {
    return {
      fundCode: "519736",
      fundName: "交银施罗德新成长混合",
      fundList: [
        { fundCode: "519736", fundName: "交银施罗德新成长混合" },
        { fundCode: "519702", fundName: "交银施罗德趋势优先混合A" },
        { fundCode: "002943", fundName: "广发多因子灵活配置混合" },
        { fundCode: "320021", fundName: "诺安双利债券" },
        { fundCode: "001694", fundName: "华安沪港深外延增长灵活配置混合A" },
        { fundCode: "000991", fundName: "工银瑞信战略转型主题股票A" },
        { fundCode: "003961", fundName: "易方达瑞程灵活配置混合A" },
        { fundCode: "090018", fundName: "大成新锐产业混合" },
        { fundCode: "001718", fundName: "工银瑞信物流产业股票A" },
        { fundCode: "519002", fundName: "华安安信消费服务混合A" },
        { fundCode: "121010", fundName: "国投瑞银瑞源灵活配置混合A" },
      ],
      dateList: [],
      activeFundLine: [],
      percent10: [],
      percent20: [],
      percent30: [],
      percent40: [],
      percent50: [],
      percent60: [],
      percent70: [],
      percent80: [],
      percent90: [],
    };
  },
  mounted() {
    this.fetchData(this.fundCode);
  },
  methods: {
    fetchData(fundCode) {
      getFundData(fundCode).then((res) => {
        const { data } = res;
        this.dateList = data.date;
        this.activeFundLine = data.worth;
        this.percent10 = data.percent10;
        this.percent20 = data.percent20;
        this.percent30 = data.percent30;
        this.percent40 = data.percent40;
        this.percent50 = data.percent50;
        this.percent60 = data.percent60;
        this.percent70 = data.percent70;
        this.percent80 = data.percent80;
        this.percent90 = data.percent90;
        this.initChart();
      });
    },
    initChart() {
      const activeFund = this.$refs.fundLine;
      const fundChart = this.$echarts.init(activeFund, "walden");

      const activeLineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title: {
          text: this.fundName,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.dateList,
        },
        yAxis: {
          type: "value",
          scale: true,
        },
        series: [
          {
            name: "基金数据",
            symbol: "none",
            data: this.activeFundLine,
            type: "line",
            lineStyle: {
              width: 2,
            },
          },
          {
            name: "10%",
            data: this.percent10,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "20%",
            data: this.percent20,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "30%",
            data: this.percent30,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "40%",
            data: this.percent40,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "50%",
            data: this.percent50,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "60%",
            data: this.percent60,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "70%",
            data: this.percent70,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "80%",
            data: this.percent80,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
          {
            name: "90%",
            data: this.percent90,
            symbol: "none",
            type: "line",
            lineStyle: {
              width: 1,
              type: "dashed",
              color: "red",
            },
          },
        ],
      };

      fundChart.setOption(activeLineOption);
    },
    changeFund(fundCode) {
      this.fundList.forEach((fund) => {
        if (fund.fundCode == fundCode) {
          this.fundName = fund.fundName;
          this.fetchData(fundCode);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chartDiv {
  width: 1400px;
  height: 600px;
  margin-top: 30px;
}
.option_class {
  height: 200px;
}
</style>
