webpackJsonp([21],{UvlI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),s=a.n(i),n=(a("pWbq"),a("2hMI")),r={data:function(){return{list:[],perList:[],appId:"",functionId:"",skillDetail:{appName:"",functionName:""},currentItem:{id:"",speak:"",state:""},addList:{speak:"",state:""},addRules:{speak:[{required:!0,message:"请输入说法名称",trigger:"change"}],state:[{required:!0,message:"请选择是否强制匹配",trigger:"change"}]},editRules:{speak:[{required:!0,message:"请输入说法名称",trigger:"blur"}],state:[{required:!0,message:"请选择是否强制匹配",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,addBtnLoading:!1,editBtnLoading:!1,relBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;this.appId=this.$route.query.appId,this.functionId=this.$route.query.functionId,JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(s()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:speakupdate")&&-1==this.perList.indexOf("skill:speakdelete")&&(this.isshow=!1)},methods:{formVal:function(e,t){return!0===e.state?"true":"false"},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,speak:t.speak,state:t.state}},handleDel:function(e,t){var a=this,i={functionId:this.functionId,speakId:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n._71)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={speakId:this.currentItem.id,content:this.currentItem.speak};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(n._74)(a).then(function(e){200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editBtnLoading=!1,t.editVisible=!1):(t.editBtnLoading=!1,t.$message({message:e.data.errorMessage,type:"error",duration:1e3}))}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={id:this.functionId,speak:this.addList.speak};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(n._70)(a).then(function(e){200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1,t.addBtnLoading=!1):(t.$message({message:e.data.errorMessage,type:"error",duration:1e3}),t.addBtnLoading=!1)}).catch(function(e){t.addBtnLoading=!1})})},release:function(){var e=this;this.relBtnLoading=!0,Object(n._73)().then(function(t){e.relBtnLoading=!1,200==t.data.code?e.$message({message:"发布成功",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.relBtnLoading=!1})},getList:function(){var e=this,t={appId:this.appId,functionId:this.functionId,pgstr:this.currentPage,pcstr:this.pageSize};Object(n._72)(t).then(function(t){e.listLoading=!1,e.skillDetail.functionName=t.data.lasfControlFunction.functionName,e.list=t.data.lasfControlSpeakPage.data,e.totalCount=t.data.lasfControlSpeakPage.total});var a={id:this.appId};Object(n._62)(a).then(function(t){e.skillDetail.appName=t.data.data.appName})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/lasf-kv/skill"}}},[e._v("应用列表")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/lasf-kv/skill/detail",query:{functionId:this.functionId,appId:this.appId}}}},[e._v("应用详情")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{staticClass:"demo-form-inline",staticStyle:{"text-align":"right"},attrs:{inline:!0,size:"mini"}},[a("div",{staticClass:"d_t"},[a("span",{staticClass:"d_title"},[e._v(e._s(e.skillDetail.appName)+"  >> ")]),a("span",[e._v(e._s(e.skillDetail.functionName))])]),e._v(" "),a("el-form-item",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:speakpublish",expression:"'skill:speakpublish'"}],staticClass:"success",attrs:{size:"mini",loading:e.relBtnLoading},on:{click:function(t){return e.release()}}},[e._v("发布")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:speakadd",expression:"'skill:speakadd'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),a("router-link",{attrs:{to:{path:"/lasf-kv/skill/detail/sersion",query:{functionId:this.functionId,appId:this.appId}}}},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:versionlist",expression:"'skill:versionlist'"}],staticClass:"success",attrs:{size:"mini"}},[e._v("答案列表")])],1)],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"说法",prop:"speak",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"强制匹配",prop:"state",align:"center",formatter:e.formVal}}),e._v(" "),a("el-table-column",{attrs:{label:"调用次数",prop:"inc",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"center","min-width":"140"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:speakupdate",expression:"'skill:speakupdate'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:speakdelete",expression:"'skill:speakdelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,731693879)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"80px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"说法",prop:"speak"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.speak,callback:function(t){e.$set(e.currentItem,"speak","string"==typeof t?t.trim():t)},expression:"currentItem.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"强制匹配",prop:"state"}},[a("el-radio-group",{attrs:{size:"medium"},model:{value:e.currentItem.state,callback:function(t){e.$set(e.currentItem,"state",t)},expression:"currentItem.state"}},[a("el-radio",{attrs:{label:0}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("否")])],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加说法",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"80px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"说法",prop:"speak"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.speak,callback:function(t){e.$set(e.addList,"speak","string"==typeof t?t.trim():t)},expression:"addList.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"强制匹配",prop:"state"}},[a("el-radio-group",{attrs:{size:"medium"},model:{value:e.addList.state,callback:function(t){e.$set(e.addList,"state",t)},expression:"addList.state"}},[a("el-radio",{attrs:{label:"0"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,l,!1,function(e){a("r9S8")},"data-v-7bec74a7",null);t.default=o.exports},r9S8:function(e,t){}});