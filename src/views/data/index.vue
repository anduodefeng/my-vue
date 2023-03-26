<template>
  <div>
    <div ref="fundLine" class="chartDiv"></div>
  </div>
</template>

<script>
import { getFundData } from "@/api/data";
export default {
  name: "fundData",
  data() {
    return {
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
    this.fetchData();
  },
  methods: {
    fetchData() {
      getFundData("001694").then((res) => {
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
          text: "华安刚沪深延伸",
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
  },
};
</script>

<style lang="scss" scoped>
.chartDiv {
  width: 1400px;
  height: 600px;
  margin-top: 30px;
}
</style>
