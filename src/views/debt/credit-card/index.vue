<template>
  <div class="app-container">
    <el-button type="primary" style="margin:10px;float:right;" @click="addBankDrawerVisible=true">添加银行卡/变动</el-button>
    <div style="width:1400px;height:300px;">
      <div ref="PABBar" style="width:600px;height:300px; margin-bottom:10px;float:left">
      </div>
      <div ref="CMBBar" style="width:600px;height:300px; margin-bottom:10px;float:left">
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="creditList"
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
      <el-table-column label="总额度" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.limit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本月消费">
        <template slot-scope="scope">
          <span>{{ scope.row.customAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账单日">
        <template slot-scope="scope">
          <span>{{ scope.row.billDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="还款日">
        <template slot-scope="scope">
          <span>{{ scope.row.repayDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="距离还款日天数">
        <template slot-scope="scope">
          <span v-if="scope.row.leftBillDay <= 5" style="color:red;font-weight:bolder;">{{ scope.row.leftBillDay }}</span>
          <span v-if="scope.row.leftBillDay > 5">{{ scope.row.leftBillDay }}</span>
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
               size="400px" title="添加银行卡/变动记录">
      <el-form style="margin-left:90px" :model="addBankForm" ref="addBankForm" :rules="addBankRules" label-width="80px" size="mini" @submit.native.prevent>
        <el-form-item label="银行名称" prop="bankName">
          <el-select v-model="addBankForm.bankName" filterable allow-create @change="getCreditInfo" placeholder="请选择">
            <el-option
              v-for="item in bankNames"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总额度">
          <el-input type="number" v-model.number="addBankForm.limit" style="width:180px"/>
        </el-form-item>
        <el-form-item label="账单日">
          <el-input type="number" v-model.number="addBankForm.billDay" style="width:180px"/>
        </el-form-item>
        <el-form-item label="还款日">
          <el-input type="number" v-model.number="addBankForm.repayDay" style="width:180px"/>
        </el-form-item>
        <el-form-item label="变动金额" prop="changeMoney">
          <el-input-number :precision="2" :step="0.01" v-model="addBankForm.changeMoney" style="width:180px"/>
        </el-form-item>
        <el-form-item label="变动时间">
          <el-date-picker v-model="addBankForm.createTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
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
import { getBankNames, getList, getBankInfo, saveDetail, getChart } from '@/api/credit'

export default {
  data() {
    return {
      creditList: [],
      listLoading: true,
      currentPage:1,
      totalCount:1,
      pageSize: 10,
      addBankDrawerVisible: false,
      direction: 'rtl',
      addBankForm: {
        bankName: '',
        changeMoney: '',
        reason: '',
        limit: '',
        billDay: '',
        repayDay: '',
        createTime: ''
      },
      addBankRules: {
        bankName: [
          {required: true, message: "请输入银行名称", trigger: "blur"}
        ],
        changeMoney: [
          {required: true, message: "请输入变动金额", trigger: "blur"}
        ],
        reason: [
          {required: true, message: "请输入原因", trigger: "blur"}
        ]
      },
      bankWidth: '90px',
      bankNames: [],
      monthBar:[],
      cmbList: [],
      pabList: []
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
        this.creditList = response.data.creditCardList
        this.currentPage = response.data.currentPage
        this.totalCount = response.data.totalNum
        this.listLoading = false
      })
      getBankNames().then(response => {
        this.bankNames = response.data.bankNames
      })
    },
    getCreditInfo(bankName){
      getBankInfo(bankName).then(response => {
        const {data} = response
        this.addBankForm.limit = data.limit
        this.addBankForm.billDay = data.billDay
        this.addBankForm.repayDay = data.repayDay
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
          saveDetail({
            "bankName": this.addBankForm.bankName,
            "changeMoney": this.addBankForm.changeMoney,
            "reason": this.addBankForm.reason,
            "limit": this.addBankForm.limit,
            "billDay": this.addBankForm.billDay,
            "repayDay": this.addBankForm.repayDay,
            "createTime": this.addBankForm.createTime
          }).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.addBankDrawerVisible = false
            this.fetchData()
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
        path: "/debt",
        name: 'creditDetail',
        params: {bankName: bankName}
      })
    },
    getChartData(){
      getChart().then(response => {
        this.monthBar = response.data.monthList
        this.cmbList = response.data.cmbList
        this.pabList = response.data.pabList

        this.initCharts()
      })
    },
    initCharts(){
      const pabBar = this.$refs.PABBar
      const cmbBar = this.$refs.CMBBar

      const pabCharts = this.$echarts.init(pabBar,'walden')
      const cmbCharts = this.$echarts.init(cmbBar,'walden')
      
      const cmbOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "招商银行消费情况"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: this.monthBar
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.cmbList,
            type: 'bar'
          }
        ]
      };
      const pabOption = {
        //动画时长 2000ms
        animationDuration: 2000,
        title:{
          text: "平安银行消费情况"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: this.monthBar
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.pabList,
            type: 'bar'
          }
        ]
      }
      cmbCharts.setOption(cmbOption)
      pabCharts.setOption(pabOption)
    }
  }
}
</script>
