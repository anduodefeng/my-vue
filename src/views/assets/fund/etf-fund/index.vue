<template>
  <div class="app-container">
    <el-button type="primary" style="margin:10px;" @click="addFundDrawerVisible=true">更新基金</el-button>
    <div style="width:1400px;height:300px;">
      <div ref="fundPie" style="width:600px;height:300px; margin-bottom:10px;float:left">
      </div>
      <div ref="fundBar" style="width:600px;height:300px; margin-bottom:10px;float:left">
      </div>
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
      <el-table-column align="center" label="基金价值">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="盈利">
        <template slot-scope="scope">
          <span v-if="scope.row.profit > 0" style="color:red">{{ scope.row.profit }}</span>
          <span v-if="scope.row.profit < 0" style="color:green">{{ scope.row.profit }}</span>
          <span v-if="scope.row.profit == 0">{{ scope.row.profit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收益率">
        <template slot-scope="scope">
          <span v-if="scope.row.profitRate > 0" style="color:red">{{ scope.row.profitRate }}%</span>
          <span v-if="scope.row.profitRate < 0" style="color:green">{{ scope.row.profitRate }}%</span>
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="getDetail(scope.row.code)">查看变动</el-button>
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
               size="400px" title="更新基金(先更新当日收益情况，再更新转入转出操作哦！)">
      <el-form style="margin-left:90px" :model="addFundForm" ref="addFundForm" :rules="addFundRules" label-width="80px" size="mini" @submit.native.prevent>
        <el-form-item label="基金名称" prop="name">
          <el-select v-model="addFundForm.name" filterable allow-create @change="getFundInfo" placeholder="请选择">
            <el-option
              v-for="item in fundInfos"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基金代码" prop="code">
          <el-input v-model="addFundForm.code" style="width:180px"/>
        </el-form-item>
        <el-form-item label="基金净值" prop="worth">
          <el-input-number :precision="4" :step="0.0001" v-model="addFundForm.worth" style="width:180px"/>
        </el-form-item>
        <el-form-item label="基金份额" prop="shares">
          <el-input-number :precision="2" :step="0.01" v-model="addFundForm.shares" style="width:180px"/>
        </el-form-item>
        <el-form-item label="变动金额" prop="changeMoney">
          <el-input-number :precision="2" :step="0.01" v-model="addFundForm.changeMoney" style="width:180px"/>
        </el-form-item>
        <el-form-item label="变动类型" prop="type">
          <el-radio v-model="addFundForm.type" label="0">转入或转出</el-radio>
          <el-radio v-model="addFundForm.type" label="1">记录更新</el-radio>
        </el-form-item>
        <el-form-item label="变动时间">
          <el-date-picker v-model="addFundForm.createTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addFundForm.remark" style="width:180px"/>
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
import { getChart, getFundList, getFundInfos, getFundInfo, saveFundDetail } from '@/api/fund'

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
        worth: '',
        shares: '',
        changeMoney: '',
        principal: '',
        type: '',
        fundType: '3',
        remark: '',
        createTime: ''
      },
      addFundRules: {
        name: [
          {required: true, message: "请输入基金信息", trigger: "blur"}
        ],
        code: [
          {required: true, message: "请输入基金代码", trigger: "blur"},
        ],
        type: [
          {required: true, message: "请选择变动类型", trigger: "blur"},
        ]
      },
      bankWidth: '90px',
      fundInfos: [],
      pieData: [],
      fundNameBar: [],
      fundProfitRate: []
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
      getFundList({"page": this.currentPage, "pageSize": this.pageSize, "type": this.addFundForm.fundType}).then(response => {
        this.fundList = response.data.fundList
        this.currentPage = response.data.currentPage
        this.totalCount = response.data.totalNum
        this.listLoading = false
      })
      getFundInfos({"fundType": this.addFundForm.fundType}).then(response => {
        this.fundInfos = response.data.fundInfos
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
            "worth": this.addFundForm.worth,
            "shares": this.addFundForm.shares,
            "changeMoney": this.addFundForm.changeMoney,
            "type": this.addFundForm.type,
            "fundType": this.addFundForm.fundType,
            "remark": this.addFundForm.remark,
            "createTime": this.addFundForm.createTime
          }).then(response => {
            const {code} = response
            const {message} = response
            if(code == 1000){
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.addFundDrawerVisible = false
              this.fetchData()
            }else{
              this.$message.error(message)
            }
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
    getFundInfo(value){
      getFundInfo({"code": value}).then(response => {
        const { data } = response
        this.addFundForm.code = data.code
        this.addFundForm.worth = data.worth
        this.addFundForm.shares = data.shares
        this.addFundForm.principal = data.principal
      })
    },
    getDetail(code){
      this.$router.push({
        path: "/assets/fund",
        name: 'indexFundDetail',
        params: {code: code}
      })
    },
    getChartData(){
      getChart(3).then(response => {
        const { data } = response;
        this.pieData = data.pieList
        this.fundNameBar = data.fundNameList
        this.fundProfitRate = data.profitRateList
        this.initCharts();
      })
    },
    initCharts(){
      const pieChart = this.$refs.fundPie
      const barChart = this.$refs.fundBar

      const myPieCharts = this.$echarts.init(pieChart)
      const myBarCharts = this.$echarts.init(barChart)
      const pieOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "各个基金占比",
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
      const barOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "基金收益率"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        xAxis: {
          type: 'category',
          data: this.fundNameBar
        },
        yAxis: {
            type: 'value',
          },
        series: [
          {
            data: this.fundProfitRate,
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(param){
                  return param.data['color']
                }
              }
            }
          }
        ]
      };
      myPieCharts.setOption(pieOption)
      myBarCharts.setOption(barOption)
    }
  }
}
</script>
