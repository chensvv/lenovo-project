webpackJsonp([41],{R6EK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("D7x1"),i=(a("pWbq"),a("2hMI")),n={components:{iTable:s.a},data:function(){var e=this;return{list:[],addList:{lasfpsd:"",lasfkey:"",lasfval:""},currentItem:{lasfpsd:"",lasfkey:"",lasfval:""},columns:[{prop:"key",label:"KEY",hasSort:!0},{prop:"val",label:"VAL",hasSort:!0,className:"reg"}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:150,show:!1,list:[{id:"1",label:"编辑",show:!0,plain:!0,disabled:!1,method:function(t,a){e.handleEdit(t,a)}}]},addRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"change"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"change"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"change"}]},editRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"change"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"change"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"change"}]},addVisible:!1,editVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,addBtnLoading:!1,editBtnLoading:!1}},created:function(){this.getList()},methods:{handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,lasfkey:t.key,lasfval:t.val}},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},editHandleConfirm:function(e){var t=this,a={key:this.currentItem.lasfkey,pwd:this.currentItem.lasfpsd,val:this.currentItem.lasfval};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(i._10)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"修改成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},addHandleConfirm:function(e){var t=this,a={pwd:this.addList.lasfpsd,key:this.addList.lasfkey,val:this.addList.lasfval};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(i._10)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize};Object(i._11)(t).then(function(t){e.options.loading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,s){return a("el-breadcrumb-item",{key:s},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{staticClass:"demo-form-inline search_box",attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:editsave",expression:"'kv:editsave'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("i-table",{attrs:{list:e.list,options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.lasfpsd,callback:function(t){e.$set(e.currentItem,"lasfpsd","string"==typeof t?t.trim():t)},expression:"currentItem.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.currentItem.lasfkey,callback:function(t){e.$set(e.currentItem,"lasfkey","string"==typeof t?t.trim():t)},expression:"currentItem.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.lasfval,callback:function(t){e.$set(e.currentItem,"lasfval","string"==typeof t?t.trim():t)},expression:"currentItem.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfpsd,callback:function(t){e.$set(e.addList,"lasfpsd","string"==typeof t?t.trim():t)},expression:"addList.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfkey,callback:function(t){e.$set(e.addList,"lasfkey","string"==typeof t?t.trim():t)},expression:"addList.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.lasfval,callback:function(t){e.$set(e.addList,"lasfval","string"==typeof t?t.trim():t)},expression:"addList.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(n,l,!1,function(e){a("yxKC")},"data-v-31678c91",null);t.default=r.exports},yxKC:function(e,t){}});