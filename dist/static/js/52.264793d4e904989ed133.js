webpackJsonp([52],{"9Ukb":function(e,t){},R6EK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),n=a("gRE1"),r=a.n(n),l=(a("pWbq"),a("2hMI")),o=a("iGF/"),d={inject:["reload"],data:function(){return{list:[],perList:[],addList:{lasfpsd:"",lasfkey:"",lasfval:""},currentItem:{lasfpsd:"",lasfkey:"",lasfval:""},columns:[{prop:"key",label:"KEY",hasSort:!0},{prop:"val",label:"VAL",hasSort:!0,className:"reg"}],addRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"change"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"change"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"change"}]},editRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"change"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"change"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"change"}]},addVisible:!1,editVisible:!1,currentPage:1,pageSize:10,totalCount:1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0,totalClass:""}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(r()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("kv:update")&&(this.isshow=!1)},methods:{handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,lasfkey:t.key,lasfval:t.val}},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},editHandleConfirm:function(e){var t=this,a={key:this.currentItem.lasfkey,pwd:this.currentItem.lasfpsd,val:this.currentItem.lasfval};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(l._52)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"修改成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},addHandleConfirm:function(e){var t=this,a={pwd:this.addList.lasfpsd,key:this.addList.lasfkey,val:this.addList.lasfval};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(l._49)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},handleDelete:function(e,t){var a=this,s={key:t.key};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l._50)(s).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},handleDel:function(e,t){var a=this,s={sql:t.sta,name:t.key},n={userName:sessionStorage.getItem("username"),password:sessionStorage.getItem("log")};this.$confirm("此操作不会永久删除该数据, 可以随时撤回, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l._18)(s).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList(),sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.k)(n).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",i()(e.data.data)),a.reload()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},handleRecall:function(e,t){var a=this,s={sql:t.sta,name:t.key},n={userName:sessionStorage.getItem("username"),password:sessionStorage.getItem("log")};Object(l._18)(s).then(function(e){200==e.data.code?(a.$message({message:"撤回成功",type:"success",duration:1e3}),a.getList(),sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.k)(n).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",i()(e.data.data)),a.reload()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize};Object(l._51)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})},handleState:function(){this.$router.push({path:"/gift/add"})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table kv"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,s){return a("el-breadcrumb-item",{key:s},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{staticClass:"demo-form-inline search_box",attrs:{inline:!0,size:"mini"}},[a("el-form-item",{staticClass:"sub-btn"},[a("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleState()}}},[e._v("报表配置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:editsave",expression:"'kv:editsave'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"KEY",prop:"key",align:"left","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"VAL",prop:"val",align:"left","show-overflow-tooltip":!0}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:update",expression:"'kv:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),1==t.row.sta?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gift:status",expression:"'gift:status'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除报表")]):e._e(),e._v(" "),2==t.row.sta?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gift:status",expression:"'gift:status'"}],attrs:{size:"mini",type:"warning"},on:{click:function(a){return e.handleRecall(t.$index,t.row)}}},[e._v("撤回")]):e._e(),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:delete",expression:"'kv:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,704348026)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.lasfpsd,callback:function(t){e.$set(e.currentItem,"lasfpsd","string"==typeof t?t.trim():t)},expression:"currentItem.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.currentItem.lasfkey,callback:function(t){e.$set(e.currentItem,"lasfkey","string"==typeof t?t.trim():t)},expression:"currentItem.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.lasfval,callback:function(t){e.$set(e.currentItem,"lasfval","string"==typeof t?t.trim():t)},expression:"currentItem.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfpsd,callback:function(t){e.$set(e.addList,"lasfpsd","string"==typeof t?t.trim():t)},expression:"addList.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfkey,callback:function(t){e.$set(e.addList,"lasfkey","string"==typeof t?t.trim():t)},expression:"addList.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.lasfval,callback:function(t){e.$set(e.addList,"lasfval","string"==typeof t?t.trim():t)},expression:"addList.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(d,c,!1,function(e){a("9Ukb")},"data-v-4a48348e",null);t.default=u.exports}});