webpackJsonp([76],{"9bYh":function(t,e){},y8iu:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("gRE1"),a=i.n(n),s=i("2hMI"),l={data:function(){return{appId:"",list:[],perList:[],skillDetail:[],totalClass:"",currentItem:{functionId:"",functionName:""},addList:{skillName:""},searchItem:{functionName:""},addRules:{skillName:[{required:!0,message:"请输入技能描述",trigger:"change"}]},editRules:{functionName:[{required:!0,message:"请输入技能描述",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var t=this;this.appId=this.$route.query.appId,JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(a()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:functionupdate")&&-1==this.perList.indexOf("skill:functiondelete")&&-1==this.perList.indexOf("skill:speaklist")&&(this.isshow=!1)},methods:{resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleEdit:function(t,e){this.editVisible=!0,this.currentItem={functionId:e.id,functionName:e.functionName}},handleDel:function(t,e){var i=this,n={functionId:e.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s._115)(n).then(function(t){200==t.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:t.data.errorMessage,type:"error",duration:1e3})})}).catch(function(t){console.log(t)})},openFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].resetFields()})},closeFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addList={},this.addVisible=!1},editHandleConfirm:function(t){var e=this,i={functionId:this.currentItem.functionId,functionName:this.currentItem.functionName};this.$refs[t].validate(function(t){if(!t)return!1;e.editBtnLoading=!0,Object(s._116)(i).then(function(t){e.editBtnLoading=!1,200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:1e3}),e.getList(),e.editVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(t){var e=this,i={id:this.appId,appName:this.addList.skillName};this.$refs[t].validate(function(t){if(!t)return!1;e.addBtnLoading=!0,Object(s._114)(i).then(function(t){e.addBtnLoading=!1,200==t.data.code?(e.$message({message:"添加成功",type:"success",duration:1e3}),e.getList(),e.addVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.addBtnLoading=!1})})},getList:function(){var t=this;this.listLoading=!0;var e={id:this.appId,pgstr:this.currentPage,pcstr:this.pageSize};Object(s._117)(e).then(function(e){t.listLoading=!1,200==e.data.code&&(t.skillDetail=e.data.data,t.list=e.data.data.functions,t.totalCount=e.data.count,t.totalClass=e.data.data.functions.length)}).catch(function(){t.listLoading=!1})},handleInfo:function(t,e){this.$router.push({path:"/lasf-kv/skill/detail/speak",query:{functionId:e.id,appId:e.appId}})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table detail"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),i("el-breadcrumb-item",[t._v("技能管理")]),t._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/skill/applist"}}},[t._v("应用列表")]),t._v(" "),t._l(t.$route.meta,function(e,n){return i("el-breadcrumb-item",{key:n},[t._v(t._s(e))])})],2),t._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:t.searchItem,size:"mini"}},[i("div",{staticClass:"d_t"},[i("span",{staticClass:"d_title"},[t._v(t._s(t.skillDetail.appName)+"  \n                ")]),i("span",[t._v("("+t._s(t.skillDetail.appType)+")")])]),t._v(" "),i("el-form-item",{attrs:{label:"应用名称",prop:"functionName"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchItem.functionName,callback:function(e){t.$set(t.searchItem,"functionName","string"==typeof e?e.trim():e)},expression:"searchItem.functionName"}})],1),t._v(" "),i("el-form-item",{staticClass:"sub-btn"},[i("el-button",{attrs:{type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:functionadd",expression:"'skill:functionadd'"}],attrs:{size:"mini"},on:{click:function(e){return t.handleAdd()}}},[t._v("添加")])],1)],1),t._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list}},[i("el-table-column",{attrs:{type:"index",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"技能描述",prop:"functionName",align:"left","show-overflow-tooltip":!0}}),t._v(" "),i("el-table-column",{attrs:{label:"说法数量",prop:"speakCount",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"答案数量",prop:"versionCount",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"调用次数",prop:"funCallCount",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"用户数",prop:"inc",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"失败次数",prop:"funFailCount",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"left","min-width":"120"}}),t._v(" "),t.isshow?i("el-table-column",{attrs:{label:"操作",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:functionupdate",expression:"'skill:functionupdate'"}],attrs:{size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:functiondelete",expression:"'skill:functiondelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.handleDel(e.$index,e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:speaklist",expression:"'skill:speaklist'"}],attrs:{size:"mini"},on:{click:function(i){return t.handleInfo(e.$index,e.row)}}},[t._v("详情")])]}}],null,!1,2474924025)}):t._e()],1),t._v(" "),i("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1),t._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"300","before-close":t.editHandleClose},on:{"update:visible":function(e){t.editVisible=e},close:function(e){return t.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:t.editRules,model:t.currentItem}},[i("el-form-item",{attrs:{label:"技能描述",prop:"functionName"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.functionName,callback:function(e){t.$set(t.currentItem,"functionName","string"==typeof e?e.trim():e)},expression:"currentItem.functionName"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.editHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.editBtnLoading},on:{click:function(e){return t.editHandleConfirm("currentItem")}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"新增",visible:t.addVisible,width:"300","before-close":t.addHandleClose},on:{"update:visible":function(e){t.addVisible=e},open:function(e){return t.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:t.addRules,model:t.addList}},[i("el-form-item",{attrs:{label:"技能描述",prop:"skillName"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.skillName,callback:function(e){t.$set(t.addList,"skillName","string"==typeof e?e.trim():e)},expression:"addList.skillName"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.addHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")(l,o,!1,function(t){i("9bYh")},"data-v-0e9d196c",null);e.default=r.exports}});