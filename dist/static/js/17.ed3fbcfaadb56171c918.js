webpackJsonp([17],{"+dPo":function(e,t){},"X+yW":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("D7x1"),s=(a("4/BI"),{name:"applicationlist",components:{iTable:i.a},data:function(){return{list:[],addList:{lasfpsd:"",lasfkey:"",lasfval:""},columns:[{prop:"index",label:"序号",align:"center",width:100,hasSort:!0},{prop:"ruleDes",label:"KEY",align:"center",hasSort:!0},{prop:"ruleDes",label:"VAL",align:"center",hasSort:!0}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:150,show:!1,list:[]},addRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"blur"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"blur"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"blur"}]},addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1}},created:function(){this.getList()},methods:{handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e)},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},addHandleConfirm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.addList),t.addVisible=!1})},getList:function(){var e=this;this.$http.get("/api/data").then(function(t){e.list=t.data,t.data.forEach(function(t){t.index=t.id%e.pageSize,0==t.index&&(t.index=e.pageSize)}),e.totalCount=e.list.length,e.options.loading=!1})}}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{staticClass:"demo-form-inline search_box",attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("i-table",{attrs:{list:e.list.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfpsd,callback:function(t){e.$set(e.addList,"lasfpsd",t)},expression:"addList.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfkey,callback:function(t){e.$set(e.addList,"lasfkey",t)},expression:"addList.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.lasfval,callback:function(t){e.$set(e.addList,"lasfval",t)},expression:"addList.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(s,l,!1,function(e){a("+dPo")},"data-v-2a10c1a6",null);t.default=n.exports}});