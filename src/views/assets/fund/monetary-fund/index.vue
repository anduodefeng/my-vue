<template>
  <div class="app-container">
    <el-button type="primary" style="margin:10px;float:right;" @click="addFund()">添加基金</el-button>
    <div style="width:1400px;height:300px;">
      <div ref="fundPie" style="width:600px;height:300px; margin-bottom:10px;float:left"></div>
      <div ref="totalLine" style="width:600px;height:300px; margin-bottom:10px;float:left"></div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="fundList"
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
      <el-table-column align="center" label="基金价值">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="盈利">
        <template slot-scope="scope">
          <span v-if="scope.row.profit > 0" style="color:red;font-weight:bolder">{{ scope.row.profit }}</span>
          <span v-if="scope.row.profit < 0" style="color:green;font-weight:bolder">{{ scope.row.profit }}</span>
          <span v-if="scope.row.profit == 0">{{ scope.row.profit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收益率">
        <template slot-scope="scope">
          <span v-if="scope.row.profitRate > 0" style="color:red;font-weight:bolder">{{ scope.row.profitRate }}%</span>
          <span v-if="scope.row.profitRate < 0" style="color:green;font-weight:bolder">{{ scope.row.profitRate }}%</span>
          <span v-if="scope.row.profitRate == 0">{{ scope.row.profitRate }}%</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="查看">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="getDetail(scope.row.code)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="记录">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="recordFund(scope.row.code, scope.row.name)">更新</el-button>
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

    <el-drawer :visible.sync="addFundDrawerVisible" @close="$refs['addFundForm'].resetFields()" :direction="direction" 
               size="400px" title="添加基金">
      <el-form style="margin-left:90px" :model="addFundForm" ref="addFundForm" :rules="addFundRules" label-width="80px" size="mini" @submit.native.prevent>
        <el-form-item label="基金名称" prop="name">
          <el-input v-model="addFundForm.name" style="width:180px"/>
        </el-form-item>
        <el-form-item label="基金代码" prop="code">
          <el-input v-model="addFundForm.code" style="width:180px"/>
        </el-form-item>
        <el-form-item label="最新金额" prop="newMoney">
          <el-input-number :precision="2" :step="0.01" v-model="addFundForm.newMoney" style="width:180px"/>
        </el-form-item>
        <el-form-item label="盈利金额" prop="profit">
          <el-input-number :precision="2" :step="0.01" v-model="addFundForm.profit" style="width:180px"/>
        </el-form-item>
        <el-form-item label="收益率" prop="profitRate">
          <el-input-number :precision="2" :step="0.01" v-model="addFundForm.profitRate" style="width:180px"/>
        </el-form-item>
        <el-form-item label="记录时间">
          <el-date-picker v-model="addFundForm.createTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item style="text-align:left">
          <el-button type="primary" @click="submitForm('addFundForm')">添加</el-button>
          <el-button @click="resetForm('addFundForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-drawer>
  </div>
</template>

<script>
import { getChart, getFundList, saveFundDetail } from '@/api/fund'

export default {
  data() {
    return {
      fundList: [],
      listLoading: true,
      currentPage:1,
      totalCount:1,
      pageSize: 20,
      addFundDrawerVisible: false,
      direction: 'rtl',
      addFundForm: {
        code: '',
        name: '',
        newMoney: '',
        profit: '',
        profitRate: '',
        fundType: '2',
        createTime: ''
      },
      addFundRules: {
        name: [
          {required: true, message: "请输入基金信息", trigger: "blur"}
        ],
        code: [
          {required: true, message: "请输入基金代码", trigger: "blur"},
        ]
      },
      pieData: [],
      fundNameList: [],
      dateList:[],
      totalAmount: [],
      totalPrincipal: []
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
      this.listLoading = true
      getFundList({"page": this.currentPage, "pageSize": this.pageSize, "type": "2"}).then(response => {
        this.fundList = response.data.fundList
        this.currentPage = response.data.currentPage
        this.totalCount = response.data.totalNum
        this.listLoading = false
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
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid){
          saveFundDetail({
            "code": this.addFundForm.code,
            "name": this.addFundForm.name,
            "newMoney": this.addFundForm.newMoney,
            "profit": this.addFundForm.profit,
            "profitRate": this.addFundForm.profitRate,
            "fundType": this.addFundForm.fundType,
            "createTime": this.addFundForm.createTime
          }).then(response => {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.addFundDrawerVisible = false
              this.fetchData()
          })
        }else{
          this.$message.error("请填写全部内容后，在提交!!!")
        }
      })
      
    },
    resetForm(formName){
      if(this.$refs[formName]){
        this.$refs[formName].resetFields();
      }
    },
    addFund(){
      this.addFundForm.code = ''
      this.addFundForm.name = ''
      this.addFundForm.profit = 0
      this.addFundForm.profitRate = 0
      this.addFundForm.newMoney = 0

      this.addFundDrawerVisible=true
    },
    getDetail(code){
      this.$router.push({
        path: "/assets/fund",
        name: 'indexFundDetail',
        params: {code: code}
      })
    },
    recordFund(code, name){
      this.addFundForm.code = code
      this.addFundForm.name = name
      this.addFundForm.profit = 0
      this.addFundForm.profitRate = 0
      this.addFundForm.newMoney = 0

      this.addFundDrawerVisible = true
    },
    getChartData(){
      getChart(2).then(response => {
        const { data } = response;
        this.pieData = data.pieList
        this.fundNameList = data.fundNameList
        this.dateList = data.dateList
        this.totalAmount = data.totalAmount
        this.totalPrincipal = data.totalPrincipal
        this.initCharts();
      })
    },
    initCharts(){
      const pieChart = this.$refs.fundPie
      const totalLine = this.$refs.totalLine

      const myPieCharts = this.$echarts.init(pieChart, 'walden')
      const totalLineCharts = this.$echarts.init(totalLine, 'walden')
      const pieOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "基金占比",
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip:{
          trigger: 'item',
          formatter: "{b} : {c}({d}%)"
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: this.pieData
          }
        ]
      }
      const totalLineOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "货币基金总资产"
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
            data: this.totalAmount,
            type: 'line'
          },
          {
            name: '总成本',
            data: this.totalPrincipal,
            type: 'line'
          }
        ]
      };
      myPieCharts.setOption(pieOption)
      totalLineCharts.setOption(totalLineOption)
    }
  }
}
</script>
