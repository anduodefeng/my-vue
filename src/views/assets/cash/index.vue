<template>
  <div class="app-container">
    <el-button type="primary" style="margin:10px;" @click="addBankDrawerVisible=true">添加银行卡/变动</el-button>
    <div style="width:1400px;height:300px;">
      <div ref="cashPie" style="width:600px;height:300px; margin-bottom:10px;float:left">
      </div>
      <div ref="cashBar" style="width:600px;height:300px; margin-bottom:10px;float:left">
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="bankList"
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
      <el-table-column label="余额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="截止时间">
        <template slot-scope="scope">
          <span>{{ scope.row.latestTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="getDetail(scope.row.bankName)">查看变动详情</el-button>
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

    <el-drawer :visible.sync="addBankDrawerVisible" @close="$refs['addBankForm'].resetFields()" :direction="direction" 
               size="400px" title="添加银行卡">
      <el-form style="margin-left:90px" :model="addBankForm" ref="addBankForm" :rules="addBankRules" label-width="80px" size="mini" @submit.native.prevent>
        <el-form-item label="银行名称" prop="bankName">
          <el-select v-model="addBankForm.bankName" filterable allow-create placeholder="请选择">
            <el-option
              v-for="item in bankNames"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变动金额" prop="changeMoney">
          <el-input type="number" v-model.number="addBankForm.changeMoney" style="width:180px"/>
        </el-form-item>
        <el-form-item label="原因" prop="reason">
          <el-input v-model="addBankForm.reason" style="width:180px"/>
        </el-form-item>
        <el-form-item style="text-align:left">
          <el-button type="primary" @click="submitForm('addBankForm')">添加</el-button>
          <el-button @click="resetForm('addBankForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-drawer>
  </div>
</template>

<script>
import { getBankNames, getList, saveCashDetail, getChart } from '@/api/cash'

export default {
  data() {
    return {
      bankList: [],
      listLoading: true,
      currentPage:1,
      totalCount:1,
      pageSize: 10,
      addBankDrawerVisible: false,
      direction: 'rtl',
      addBankForm: {
        bankName: '',
        changeMoney: '',
        reason: ''
      },
      addBankRules: {
        bankName: [
          {required: true, message: "请输入银行名称", trigger: "blur"}
        ],
        changeMoney: [
          {required: true, message: "请输入变动金额", trigger: "blur"},
          {type: 'number', message: "变动金额必须为数字", trigger: "blur"}
        ],
        reason: [
          {required: true, message: "请输入原因", trigger: "blur"}
        ]
      },
      bankWidth: '90px',
      bankNames: [],
      pieData: [],
      bankNameBar: [],
      bankValueBar: []
    }
  },
  created() {
    this.fetchData()
  },
  mounted(){
    this.getChartData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({"page": this.currentPage, "pageSize": this.pageSize}).then(response => {
        this.bankList = response.data.cashList
        this.currentPage = response.data.currentPage
        this.totalCount = response.data.totalNum
        this.listLoading = false
      })
      getBankNames().then(response => {
        this.bankNames = response.data.bankNames
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
      this.fetchData()
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid){
          saveCashDetail({
            "bankName": this.addBankForm.bankName,
            "changeMoney": this.addBankForm.changeMoney,
            "reason": this.addBankForm.reason
          }).then(response => {
            const {code} = response
            const {message} = response
            if(code == 1000){
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.addBankDrawerVisible = false
              this.fetchData()
            }else{
              alert(message)
            }
          })
        }else{
          alert("请填写全部内容后，在提交!!!")
        }
      })
      
    },
    resetForm(formName){
      if(this.$refs[formName]){
        this.$refs[formName].resetFields();
      }
    },
    getDetail(bankName){
      this.$router.push({
        path: "/assets",
        name: 'cashDetail',
        params: {bankName: bankName}
      })
    },
    getChartData(){
      getChart().then(response => {
        this.pieData = response.data.pieList
        this.bankNameBar = response.data.bankNameList
        this.bankValueBar = response.data.bankValueList
        this.initCharts()
      })
    },
    initCharts(){
      const pieChart = this.$refs.cashPie
      const barChart = this.$refs.cashBar

      const myPieCharts = this.$echarts.init(pieChart, 'walden')
      const myBarCharts = this.$echarts.init(barChart, 'walden')
      const pieOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "余额占比",
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
          text: "银行卡余额"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        xAxis: {
          type: 'category',
          data: this.bankNameBar
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.bankValueBar,
            type: 'bar'
          }
        ]
      };
      myPieCharts.setOption(pieOption)
      myBarCharts.setOption(barOption)
    }
  }
}
</script>
