(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02ffda1a"],{2743:function(t,e,a){"use strict";a.d(e,"c",(function(){return r})),a.d(e,"d",(function(){return u})),a.d(e,"a",(function(){return i})),a.d(e,"e",(function(){return l})),a.d(e,"b",(function(){return c}));var n=a("b775");function r(){return Object(n["a"])({url:"/cash/chart",method:"GET"})}function u(t){return Object(n["a"])({url:"/cash/page",method:"POST",data:t})}function i(){return Object(n["a"])({url:"/cash/bankNames",method:"POST"})}function l(t){return Object(n["a"])({url:"/cash/change",method:"POST",data:t})}function c(t){return Object(n["a"])({url:"/cash/detailPage",method:"POST",data:t})}},"89c5":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.detailList,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"银行名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.bankName)+" ")]}}])}),a("el-table-column",{attrs:{label:"总金额",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.amount))])]}}])}),a("el-table-column",{attrs:{label:"备注",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.reason))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"update_at",label:"记录时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.createTime))])]}}])})],1),a("br"),a("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",layout:"prev, pager, next","current-page":t.currentPage,"page-size":t.pageSize,total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},r=[],u=a("2743"),i={data:function(){return{detailList:[],bankName:"",listLoading:!0,currentPage:1,totalCount:1,pageSize:20}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.bankName=this.$route.params.bankName,Object(u["b"])({page:this.currentPage,pageSize:this.pageSize,bankName:this.bankName}).then((function(e){var a=e.data;t.detailList=a.detailList,t.currentPage=e.data.currentPage,t.totalCount=e.data.totalNum,t.listLoading=!1}))},handleCurrentChange:function(t){this.currentPage=t,this.fetchData()}}},l=i,c=a("2877"),o=Object(c["a"])(l,n,r,!1,null,null,null);e["default"]=o.exports}}]);