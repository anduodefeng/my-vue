(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fccb3fd"],{6844:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"d",(function(){return n})),a.d(e,"e",(function(){return o})),a.d(e,"b",(function(){return l})),a.d(e,"c",(function(){return s}));var i=a("b775");function r(t){return Object(i["a"])({url:"/portfolio/chart/"+t,method:"GET"})}function n(t){return Object(i["a"])({url:"/portfolio/page",method:"POST",data:t})}function o(t){return Object(i["a"])({url:"/portfolio/change",method:"POST",data:t})}function l(t){return Object(i["a"])({url:"/portfolio/detail/chart/"+t,method:"GET"})}function s(t){return Object(i["a"])({url:"/portfolio/detailPage",method:"POST",data:t})}},d475:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticStyle:{width:"1400px",height:"300px"}},[a("div",{ref:"detailBar",staticStyle:{width:"600px",height:"300px","margin-bottom":"10px",float:"left"}}),a("div",{ref:"detailLine",staticStyle:{width:"600px",height:"300px","margin-bottom":"10px",float:"left"}})]),a("div",[t._v("变动详情")]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"1400px"},attrs:{data:t.detailList,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"组合名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.name)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"总金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.newMoney))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"盈利金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.profit>0?a("span",{staticStyle:{color:"red","font-weight":"bolder"}},[t._v(t._s(e.row.profit))]):t._e(),e.row.profit<0?a("span",{staticStyle:{color:"green","font-weight":"bolder"}},[t._v(t._s(e.row.profit))]):t._e(),0==e.row.profit?a("span",[t._v(t._s(e.row.profit)+"%")]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",label:"收益率"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.profitRate>0?a("span",{staticStyle:{color:"red","font-weight":"bolder"}},[t._v(t._s(e.row.profitRate)+"%")]):t._e(),e.row.profitRate<0?a("span",{staticStyle:{color:"green","font-weight":"bolder"}},[t._v(t._s(e.row.profitRate)+"%")]):t._e(),0==e.row.profitRate?a("span",[t._v(t._s(e.row.profitRate)+"%")]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.createTime))])]}}])})],1),a("br"),a("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",layout:"prev, pager, next","current-page":t.currentPage,"page-size":t.pageSize,total:t.totalCount},on:{"current-change":t.handleCurrentChange}})],1)},r=[],n=a("6844"),o={data:function(){return{detailList:[],id:"",listLoading:!0,currentPage:1,totalCount:1,pageSize:30,dateList:[],dataList:[],rateList:[]}},created:function(){this.fetchData()},mounted:function(){this.getDetailChart()},methods:{fetchData:function(){var t=this;this.id=this.$route.params.id,Object(n["c"])({page:this.currentPage,pageSize:this.pageSize,id:this.id}).then((function(e){var a=e.data;t.detailList=a.detailList,t.currentPage=e.data.currentPage,t.totalCount=e.data.totalNum,t.listLoading=!1}))},checkChangeMoney:function(t,e){return t>0&&"日常更新"==e?0:t<0&&"日常更新"==e?1:2},handleCurrentChange:function(t){this.currentPage=t,this.fetchData()},getDetailChart:function(){var t=this;Object(n["b"])(this.id).then((function(e){var a=e.data;t.dateList=a.dateList,t.dataList=a.dataList,t.rateList=a.rateList,t.initCharts()}))},initCharts:function(){var t=this.$refs.detailBar,e=this.$refs.detailLine;if(t){var a=this.$echarts.init(t,"walden"),i=this.$echarts.init(e,"walden"),r={title:{text:"基金日常变动"},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},xAxis:{type:"category",data:this.dateList},yAxis:{type:"value"},series:[{name:"收益",type:"candlestick",data:this.dataList,barWidth:5,animationDuration:2e3,itemStyle:{color:"#eb5454",color0:"#47b262",borderColor:"#eb5454",borderColor0:"#47b262",borderWidth:1}}]},n={title:{text:"基金收益率"},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},xAxis:{type:"category",data:this.dateList},yAxis:{type:"value"},series:[{name:"收益率",type:"line",data:this.rateList,animationDuration:2e3}]};a.setOption(r),i.setOption(n)}}}},l=o,s=a("2877"),c=Object(s["a"])(l,i,r,!1,null,null,null);e["default"]=c.exports}}]);