webpackJsonp([27],{HiA6:function(t,e){},Kngn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("pWbq"),r=a("2hMI"),l={data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now()-864e5;return t.getTime()>e}},list:[],totalClass:"",searchItem:{uip:"",refreshTime:"",putTime:""},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!1}},created:function(){this.getList()},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,i=e.scrollWidth;this.showTitle=!(a<i)},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},formTime:function(t,e){var a=t.createTime,r=new Date(a);return r.getFullYear()+"-"+Object(i.a)(r.getMonth()+1)+"-"+Object(i.a)(r.getDate())+" "+Object(i.a)(r.getHours())+":"+Object(i.a)(r.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,uid:this.searchItem.uip};Object(r._101)(e).then(function(e){t.listLoading=!1,200==e.data.code?(t.list=e.data.data.data,t.totalCount=e.data.data.total,t.totalClass=e.data.data.data.length):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(){t.listLoading=!1})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[t._v("日志管理")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"客户端ip",prop:"uip"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uip,callback:function(e){t.$set(t.searchItem,"uip","string"==typeof e?e.trim():e)},expression:"searchItem.uip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.refreshTime,callback:function(e){t.$set(t.searchItem,"refreshTime",e)},expression:"searchItem.refreshTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.putTime,callback:function(e){t.$set(t.searchItem,"putTime",e)},expression:"searchItem.putTime"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),a("el-table-column",{attrs:{label:"ID",prop:"id",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端ip",prop:"ip",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端地址",prop:"address",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端设备",prop:"devid",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端id",prop:"appid",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端类型",prop:"model",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"接口输入",prop:"cinput",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"接口返回",prop:"result",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"计算时间",prop:"dur",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"入库时间",prop:"createTime",align:"left",formatter:t.formTime,"min-width":"120"}})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(l,s,!1,function(t){a("HiA6")},"data-v-8b1791e2",null);e.default=o.exports}});