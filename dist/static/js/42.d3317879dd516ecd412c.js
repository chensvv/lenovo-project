webpackJsonp([42],{EKmh:function(e,t){},FX4T:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("D7x1"),r=a("pWbq"),n=a("2hMI"),s={components:{iTable:i.a},data:function(){return{list:[],searchItem:{question:"",refreshTime:"",putTime:""},exList:{},columns:[{prop:"ques",label:"问题",align:"center",hasSort:!0},{prop:"answ",label:"答案",align:"center",hasSort:!0},{prop:"engi",label:"引擎",align:"center",hasSort:!0},{prop:"it",label:"入库时间",align:"center",hasSort:!0,render:function(e,t){var a=t.row.it,i=new Date(a);return e("span",i.getFullYear()+"-"+Object(r.a)(i.getMonth()+1)+"-"+Object(r.a)(i.getDate())+" "+Object(r.a)(i.getHours())+":"+Object(r.a)(i.getMinutes()))}}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:120,show:!1,list:[]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,fileBtnLoading:!1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},exportFile:function(){var e=this,t={starttime:this.searchItem.refreshTime,endtime:this.searchItem.putTime,question:this.searchItem.question};this.fileBtnLoading=!0,Object(n.z)(t).then(function(t){var a=new Blob([t.data]),i=document.createElement("a"),r=window.URL.createObjectURL(a),n=e.searchItem.refreshTime+"-"+e.searchItem.putTime+".xlsx";i.href=r,i.download=n,i.click(),window.URL.revokeObjectURL(r),e.fileBtnLoading=!1}).catch(function(t){e.fileBtnLoading=!1})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.question,ex:"",startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime};Object(n.A)(t).then(function(t){e.options.loading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("闲聊数据")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"问题",prop:"question"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.question,callback:function(t){e.$set(e.searchItem,"question","string"==typeof t?t.trim():t)},expression:"searchItem.question"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"导出数据默认导出全部数据，如需自定义请在左侧选择起始时间和结束时间或者输入问题导出",placement:"top-end"}},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"chat:export",expression:"'chat:export'"}],attrs:{size:"mini",loading:e.fileBtnLoading},on:{click:function(t){return e.exportFile()}}},[e._v("导出数据")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("i-table",{attrs:{list:e.list,options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var c=a("VU/8")(s,o,!1,function(e){a("EKmh")},"data-v-2718d73f",null);t.default=c.exports}});