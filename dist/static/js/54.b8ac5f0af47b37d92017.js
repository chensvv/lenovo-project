webpackJsonp([54],{B9Pa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("pWbq"),l=a("2hMI"),i={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},list:[],searchItem:{appName:"",source:"",refreshTime:"",putTime:""},currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,btnLoading:!1,listLoading:!0}},created:function(){this.getList()},methods:{formTime:function(e,t){var a=e.createTime,l=new Date(a);return l.getFullYear()+"-"+Object(r.a)(l.getMonth()+1)+"-"+Object(r.a)(l.getDate())+" "+Object(r.a)(l.getHours())+":"+Object(r.a)(l.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.currentPage=1,this.btnLoading=!0,this.getList(),this.btnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,appname:this.searchItem.appName,source:this.searchItem.source};Object(l.e)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("应用搜索")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"应用名",prop:"appName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.appName,callback:function(t){e.$set(e.searchItem,"appName","string"==typeof t?t.trim():t)},expression:"searchItem.appName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"来自于",prop:"source"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.source,callback:function(t){e.$set(e.searchItem,"source","string"==typeof t?t.trim():t)},expression:"searchItem.source"}},[a("el-option",{attrs:{label:"联想",value:"lenovo"}}),e._v(" "),a("el-option",{attrs:{label:"百度",value:"baidu"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"应用名",prop:"name",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"类别",prop:"cat",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"平台",prop:"platform",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"费用",prop:"fee",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"积分",prop:"score",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"下载次数",prop:"dnum",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"来自",prop:"source",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{label:"入库时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"140"}})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var n=a("VU/8")(i,o,!1,function(e){a("cYoj")},"data-v-03c61f86",null);t.default=n.exports},cYoj:function(e,t){}});