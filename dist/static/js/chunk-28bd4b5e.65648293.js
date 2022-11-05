(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28bd4b5e"],{2743:function(t,e,a){"use strict";a.d(e,"c",(function(){return r})),a.d(e,"d",(function(){return i})),a.d(e,"a",(function(){return o})),a.d(e,"e",(function(){return s})),a.d(e,"b",(function(){return l}));var n=a("b775");function r(){return Object(n["a"])({url:"/cash/chart",method:"GET"})}function i(t){return Object(n["a"])({url:"/cash/page",method:"POST",data:t})}function o(){return Object(n["a"])({url:"/cash/bankNames",method:"POST"})}function s(t){return Object(n["a"])({url:"/cash/change",method:"POST",data:t})}function l(t){return Object(n["a"])({url:"/cash/detailPage",method:"POST",data:t})}},"61cd":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-button",{staticStyle:{margin:"10px",float:"right"},attrs:{type:"primary"},on:{click:function(e){return t.addBank()}}},[t._v("添加银行卡/变动")]),a("div",{staticStyle:{width:"1400px",height:"300px"}},[a("div",{ref:"cashPie",staticStyle:{width:"600px",height:"300px","margin-bottom":"10px",float:"left"}}),a("div",{ref:"cashBar",staticStyle:{width:"600px",height:"300px","margin-bottom":"10px",float:"left"}})]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.bankList,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"银行名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.bankName)+" ")]}}])}),a("el-table-column",{attrs:{label:"余额",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.amount))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"created_at",label:"截止时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.latestTime))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"查看"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(a){return t.getDetail(e.row.bankName)}}},[t._v("详情")]),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(a){return t.recordCash(e.row.bankName)}}},[t._v("变动")])]}}])})],1),a("br"),a("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",layout:"prev, pager, next","current-page":t.currentPage,"page-size":t.pageSize,total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),a("el-drawer",{attrs:{visible:t.addBankDrawerVisible,direction:t.direction,size:"400px",title:"添加银行卡"},on:{"update:visible":function(e){t.addBankDrawerVisible=e},close:function(e){return t.$refs["addBankForm"].resetFields()}}},[a("el-form",{ref:"addBankForm",staticStyle:{"margin-left":"90px"},attrs:{model:t.addBankForm,rules:t.addBankRules,"label-width":"80px",size:"mini"},nativeOn:{submit:function(t){t.preventDefault()}}},[a("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[a("el-input",{staticStyle:{width:"180px"},model:{value:t.addBankForm.bankName,callback:function(e){t.$set(t.addBankForm,"bankName",e)},expression:"addBankForm.bankName"}})],1),a("el-form-item",{attrs:{label:"总金额",prop:"changeMoney"}},[a("el-input-number",{staticStyle:{width:"180px"},attrs:{precision:2,step:.01},model:{value:t.addBankForm.changeMoney,callback:function(e){t.$set(t.addBankForm,"changeMoney",t._n(e))},expression:"addBankForm.changeMoney"}})],1),a("el-form-item",{attrs:{label:"原因"}},[a("el-input",{staticStyle:{width:"180px"},model:{value:t.addBankForm.reason,callback:function(e){t.$set(t.addBankForm,"reason",e)},expression:"addBankForm.reason"}})],1),a("el-form-item",{staticStyle:{"text-align":"left"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("addBankForm")}}},[t._v("添加")]),a("el-button",{on:{click:function(e){return t.resetForm("addBankForm")}}},[t._v("重置")])],1)],1)],1)],1)},r=[],i=a("2743"),o={data:function(){return{bankList:[],listLoading:!0,currentPage:1,totalCount:1,pageSize:10,addBankDrawerVisible:!1,direction:"rtl",addBankForm:{bankName:"",changeMoney:"",reason:""},addBankRules:{bankName:[{required:!0,message:"请输入银行名称",trigger:"blur"}],changeMoney:[{required:!0,message:"请输入变动金额",trigger:"blur"}]},bankWidth:"90px",bankNames:[],pieData:[],bankNameBar:[],bankValueBar:[]}},created:function(){this.fetchData()},mounted:function(){this.getChartData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,Object(i["d"])({page:this.currentPage,pageSize:this.pageSize}).then((function(e){t.bankList=e.data.cashList,t.currentPage=e.data.currentPage,t.totalCount=e.data.totalNum,t.listLoading=!1})),Object(i["a"])().then((function(e){t.bankNames=e.data.bankNames}))},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1},handleCurrentChange:function(t){this.currentPage=t,this.fetchData()},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){t?Object(i["e"])({bankName:e.addBankForm.bankName,changeMoney:e.addBankForm.changeMoney,reason:e.addBankForm.reason}).then((function(t){var a=t.code,n=t.message;1e3==a?(e.$message({message:"保存成功",type:"success"}),e.addBankDrawerVisible=!1,e.fetchData()):alert(n)})):alert("请填写全部内容后，在提交!!!")}))},resetForm:function(t){this.$refs[t]&&this.$refs[t].resetFields()},addBank:function(){this.addBankDrawerVisible=!0},getDetail:function(t){this.$router.push({path:"/assets",name:"cashDetail",params:{bankName:t}})},recordCash:function(t){this.addBankForm.bankName=t,this.addBankDrawerVisible=!0},getChartData:function(){var t=this;Object(i["c"])().then((function(e){t.pieData=e.data.pieList,t.bankNameBar=e.data.bankNameList,t.bankValueBar=e.data.bankValueList,t.initCharts()}))},initCharts:function(){var t=this.$refs.cashPie,e=this.$refs.cashBar,a=this.$echarts.init(t,"walden"),n=this.$echarts.init(e,"walden"),r={animationDuration:2e3,title:{text:"余额占比"},tooltip:{trigger:"item",formatter:"{b} : {c}({d}%)"},series:[{type:"pie",radius:"80%",data:this.pieData}]},i={animationDuration:2e3,title:{text:"银行卡余额"},tooltip:{trigger:"axis",axisPointer:{type:"none"}},xAxis:{type:"category",data:this.bankNameBar},yAxis:{type:"value"},series:[{data:this.bankValueBar,type:"bar"}]};a.setOption(r),n.setOption(i)}}},s=o,l=a("2877"),c=Object(l["a"])(s,n,r,!1,null,null,null);e["default"]=c.exports}}]);