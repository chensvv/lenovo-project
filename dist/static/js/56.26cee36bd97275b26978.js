webpackJsonp([56],{"+mNw":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),n=a.n(i);var s=a("2hMI"),r={data:function(){return{list:[],perList:[],currentItem:{id:"",appName:""},addList:{appName:"",appPackageName:"",appType:""},searchItem:{appName:""},addRules:{appName:[{required:!0,message:"请输入应用名称",trigger:"change"}],appPackageName:[{required:!0,message:"请输入应用包名",trigger:"change"}],appType:[{required:!0,message:"请输入应用类型",trigger:"change"}]},editRules:{appName:[{required:!0,message:"请输入应用名称",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:appupdate")&&-1==this.perList.indexOf("skill:appdelete")&&-1==this.perList.indexOf("skill:appdetail")&&(this.isshow=!1)},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},handleEdit:function(e,t){console.log(e,t),this.editVisible=!0,this.currentItem={id:t.id,appName:t.appName}},handleDel:function(e,t){var a=this,i={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s._58)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},editHandleClose:function(){this.editVisible=!1},addHandClose:function(){this.addVisible=!1},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},addHandleClose:function(e){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,appName:this.currentItem.appName};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(s._64)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(e){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={appName:this.addList.appName,appPackageName:this.addList.appPackageName,appType:this.addList.appType};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(s._57)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,appName:this.searchItem.appName};Object(s._63)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})},handleInfo:function(e,t){this.$router.push({path:"/lasf-kv/skill/detail",query:{appId:t.id}})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{model:{value:e.searchItem.appName,callback:function(t){e.$set(e.searchItem,"appName","string"==typeof t?t.trim():t)},expression:"searchItem.appName"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appadd",expression:"'skill:appadd'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"技能名称",prop:"appName",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"技能数",prop:"inc",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"调用次数",prop:"inc",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"调用用户数",prop:"inc",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"失败次数",prop:"inc",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"center","min-width":"140"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appupdate",expression:"'skill:appupdate'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appdelete",expression:"'skill:appdelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appdetail",expression:"'skill:appdetail'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleInfo(t.$index,t.row)}}},[e._v("详情")])]}}],null,!1,3972109113)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.appName,callback:function(t){e.$set(e.currentItem,"appName","string"==typeof t?t.trim():t)},expression:"currentItem.appName"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.appName,callback:function(t){e.$set(e.addList,"appName","string"==typeof t?t.trim():t)},expression:"addList.appName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"应用包名",prop:"appPackageName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.appPackageName,callback:function(t){e.$set(e.addList,"appPackageName","string"==typeof t?t.trim():t)},expression:"addList.appPackageName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"应用类型",prop:"appType"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.appType,callback:function(t){e.$set(e.addList,"appType","string"==typeof t?t.trim():t)},expression:"addList.appType"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.addHandleClose("addList")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,l,!1,function(e){a("DmU+")},"data-v-00368d98",null);t.default=o.exports},"DmU+":function(e,t){}});