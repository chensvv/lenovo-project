webpackJsonp([20],{R223:function(e,t){},zDsE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("D7x1"),s=a("pWbq"),i=a("2hMI"),n=a("WBHA"),l=a.n(n),o={name:"applicationlist",components:{iTable:r.a,countTo:l.a},data:function(){return{list:[],searchItem:{app:"",desc:"",refreshTime:"",putTime:""},columns:[{prop:"did",label:"客户端设备ID",align:"center",hasSort:!0},{prop:"ver",label:"客户端版本",align:"center",hasSort:!0},{prop:"opts",label:"操作时间",align:"center",hasSort:!0},{prop:"app",label:"应用包名",align:"center",hasSort:!0},{prop:"oper",label:"操作",align:"center",hasSort:!0},{prop:"desc",label:"描述",align:"center",hasSort:!0},{prop:"it",label:"插入时间",align:"center",hasSort:!0,render:function(e,t){var a=t.row.it,r=new Date(a);return e("span",r.getFullYear()+"-"+Object(s.a)(r.getMonth()+1)+"-"+Object(s.a)(r.getDate())+" "+Object(s.a)(r.getMonth())+":"+Object(s.a)(r.getMinutes())+":"+Object(s.a)(r.getSeconds()))}}],options:{stripe:!1,loading:!1,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:120,show:!1,list:[]},currentPage:1,pageSize:30,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,fileBtnLoading:!1,startVal:0,endVal:0}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields()},onSubmit:function(){this.seaBtnLoading=!0,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,app:this.searchItem.app,desc:this.searchItem.desc};Object(i.U)(t).then(function(t){e.list=t.data.data.data,e.totalCount=t.data.data.total,e.endVal=t.data.count})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("div",{staticClass:"a_alert"},[a("i",{staticClass:"el-icon-info"}),e._v(" "),a("span",{staticClass:"alert_main"},[e._v("操作日志今天更新了"),a("countTo",{attrs:{startVal:e.startVal,endVal:e.endVal,duration:3e3}}),e._v(" 条")],1)]),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"应用包名",prop:"app"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.app,callback:function(t){e.$set(e.searchItem,"app","string"==typeof t?t.trim():t)},expression:"searchItem.app"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述",prop:"desc"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.desc,callback:function(t){e.$set(e.searchItem,"desc","string"==typeof t?t.trim():t)},expression:"searchItem.desc"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("i-table",{attrs:{list:e.list,options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var p=a("VU/8")(o,c,!1,function(e){a("R223")},"data-v-97da7088",null);t.default=p.exports}});