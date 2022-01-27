<template>
  <div class="dashboard-container">
    <div style="border:1px solid black; width:1400px; height:50px">总资产、昨日盈亏</div>
    <div style="border:1px solid black; width:600px; height:300px;float:left;">总资产构成=现金+货币+固收+积极增值</div>
    <div style="border:1px solid black; width:600px; height:300px;float:left;">总资产变化折线图</div>
    <div style="border:1px solid black; width:600px; height:300px;float:left;">指数基金收益率变化折线图</div>
    <div style="border:1px solid black; width:600px; height:300px;float:left;">主动基金收益率变化折线图</div>
    <div style="border:1px solid black; width:600px; height:300px;float:left;">稳健组合收益率变化折线图</div>
    <div style="border:1px solid black; width:600px; height:300px;float:left;">积极增值组合收益率变化折线图</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
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
</style>
