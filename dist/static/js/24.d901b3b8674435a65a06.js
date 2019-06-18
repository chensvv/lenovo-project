webpackJsonp([24],{Ij2A:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("D7x1"),a=(n("4/BI"),{name:"applicationlist",components:{iTable:i.a},data:function(){var e=this;return{list:[],currentItem:{ruleDes:"",sougou:"",duer:"",wenwen:"",naturali:""},addList:{ruleDes:"",sougou:"",duer:"",wenwen:"",naturali:""},searchItem:{ruleDes:""},columns:[{prop:"index",label:"序号",align:"center",width:100,hasSort:!0},{prop:"ruleDes",label:"规则名称",align:"center",hasSort:!0},{prop:"classnames",label:"规则配置",align:"center",hasSort:!0}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:150,show:!1,list:[{id:"1",label:"编辑",show:!0,plain:!0,disabled:!1,method:function(t,n){e.handleEdit(t,n)}},{id:"2",label:"删除",type:"danger",show:!0,plain:!1,disabled:!1,method:function(t,n){e.handleDel(t,n)}}]},addRules:{ruleDes:[{required:!0,message:"请输入规则名称",trigger:"change"}],sougou:[{required:!0,message:"请输入sougou引擎优先级",trigger:"change"}],duer:[{required:!0,message:"请输入duer引擎优先级",trigger:"change"}],wenwen:[{required:!0,message:"请输入wenwen引擎优先级",trigger:"change"}],naturali:[{required:!0,message:"请输入naturali引擎优先级",trigger:"change"}]},editRules:{ruleDes:[{required:!0,message:"请输入规则名称",trigger:"change"}],sougou:[{required:!0,message:"请输入sougou引擎优先级",trigger:"change"}],duer:[{required:!0,message:"请输入duer引擎优先级",trigger:"change"}],wenwen:[{required:!0,message:"请输入wenwen引擎优先级",trigger:"change"}],naturali:[{required:!0,message:"请输入naturali引擎优先级",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,AIMLBtnLoading:!1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields()},onSubmit:function(){var e=this;this.seaBtnLoading=!0,setTimeout(function(){e.seaBtnLoading=!1},2e3),console.log(this.searchItem)},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e)},handleEdit:function(e,t){console.log(e,t),this.editVisible=!0,this.currentItem={ruleDes:t.ruleDes,sougou:t.sougou,duer:t.duer,wenwen:t.sougou,naturali:t.naturali}},handleDel:function(e,t){var n=this;console.log(t.id),console.log(e),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.list.splice(e,1)}).catch(function(){console.log("no")})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.currentItem),t.editBtnLoading=!0,setTimeout(function(){t.editBtnLoading=!1,t.editVisible=!1},2e3)})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.addList),t.addBtnLoading=!0,setTimeout(function(){t.addBtnLoading=!1,t.addVisible=!1},2e3)})},buildAIML:function(){var e=this;this.AIMLBtnLoading=!0,setTimeout(function(){e.AIMLBtnLoading=!1},2e3)},getList:function(){var e=this;this.$http.get("/api/data").then(function(t){e.list=t.data,t.data.forEach(function(t){t.index=t.id%e.pageSize,0==t.index&&(t.index=e.pageSize)}),e.totalCount=e.list.length,e.options.loading=!1})}}}),r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),n("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),e._l(e.$route.meta,function(t,i){return n("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),n("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[n("el-form-item",{attrs:{label:"规则名称",prop:"ruleDes"}},[n("el-input",{attrs:{clearable:""},model:{value:e.searchItem.ruleDes,callback:function(t){e.$set(e.searchItem,"ruleDes",t)},expression:"searchItem.ruleDes"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),n("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),n("el-button",{staticClass:"success",attrs:{size:"mini",loading:e.AIMLBtnLoading},on:{click:function(t){return e.buildAIML()}}},[e._v("生成AIML")]),e._v(" "),n("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1),e._v(" "),n("div",{staticClass:"table-box"},[n("i-table",{attrs:{list:e.list.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),n("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[n("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"80px",rules:e.editRules,model:e.currentItem}},[n("el-form-item",{attrs:{label:"规则名称",prop:"ruleDes"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.ruleDes,callback:function(t){e.$set(e.currentItem,"ruleDes",t)},expression:"currentItem.ruleDes"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"sougou",prop:"sougou"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.sougou,callback:function(t){e.$set(e.currentItem,"sougou",t)},expression:"currentItem.sougou"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"duer",prop:"duer"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.duer,callback:function(t){e.$set(e.currentItem,"duer",t)},expression:"currentItem.duer"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"wenwen",prop:"wenwen"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.wenwen,callback:function(t){e.$set(e.currentItem,"wenwen",t)},expression:"currentItem.wenwen"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"naturali",prop:"naturali"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.naturali,callback:function(t){e.$set(e.currentItem,"naturali",t)},expression:"currentItem.naturali"}})],1),e._v(" "),n("div",{staticStyle:{"font-size":"12px","padding-left":"80px"}},[e._v("\n            0:代表不使用此引擎. "),n("br"),e._v("\n            2~4:可以使用，但需要等待其他优先级更高的引擎，相同优先级的不需要等待."),n("br"),e._v("\n            7：\t优先 ，可以直接使用，不必等待其他引擎\n        ")])],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[n("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"80px",rules:e.addRules,model:e.addList}},[n("el-form-item",{attrs:{label:"规则名称",prop:"ruleDes"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.ruleDes,callback:function(t){e.$set(e.addList,"ruleDes",t)},expression:"addList.ruleDes"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"sougou",prop:"sougou"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.sougou,callback:function(t){e.$set(e.addList,"sougou",t)},expression:"addList.sougou"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"duer",prop:"duer"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.duer,callback:function(t){e.$set(e.addList,"duer",t)},expression:"addList.duer"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"wenwen",prop:"wenwen"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.wenwen,callback:function(t){e.$set(e.addList,"wenwen",t)},expression:"addList.wenwen"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"naturali",prop:"naturali"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.naturali,callback:function(t){e.$set(e.addList,"naturali",t)},expression:"addList.naturali"}})],1),e._v(" "),n("div",{staticStyle:{"font-size":"12px","padding-left":"80px"}},[e._v("\n                0:代表不使用此引擎. "),n("br"),e._v("\n                2~4:可以使用，但需要等待其他优先级更高的引擎，相同优先级的不需要等待."),n("br"),e._v("\n                7：\t优先 ，可以直接使用，不必等待其他引擎\n            ")])],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=n("VU/8")(a,r,!1,function(e){n("kXDr")},"data-v-025d65b6",null);t.default=o.exports},kXDr:function(e,t){}});