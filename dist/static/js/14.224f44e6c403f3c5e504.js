webpackJsonp([14],{DsGI:function(e,t){},"Fs+j":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("gRE1"),i=a.n(n),r=a("pWbq"),s=a("2hMI"),o={data:function(){return{list:[],perList:[],addList:{command:"",interface:""},currentItem:{command:"",interface:""},searchItem:{command:""},addRules:{command:[{required:!0,message:"请输入用户query",trigger:"change"}],interface:[{required:!0,message:"请输入预设指令",trigger:"change"}]},editRules:{command:[{required:!0,message:"请输入关键字",trigger:"change"}],interface:[{required:!0,message:"请输入预设指令",trigger:"change"}]},currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,addVisible:!1,seabtnLoading:!1,addBtnLoading:!1,editVisible:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("command:mainupdate")&&-1==this.perList.indexOf("command:maindelete")&&(this.isshow=!1)},methods:{formTime:function(e,t){var a=e.createTime,n=new Date(a);return n.getFullYear()+"-"+Object(r.a)(n.getMonth()+1)+"-"+Object(r.a)(n.getDate())+" "+Object(r.a)(n.getHours())+":"+Object(r.a)(n.getMinutes())},formTime2:function(e,t){var a=e.updateTime,n=new Date(a);return n.getFullYear()+"-"+Object(r.a)(n.getMonth()+1)+"-"+Object(r.a)(n.getDate())+" "+Object(r.a)(n.getHours())+":"+Object(r.a)(n.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seabtnLoading=!0,this.currentPage=1,this.getList(),this.seabtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,command:t.command,interface:t.commandInterface}},editHandleClose:function(){this.editVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,command:this.currentItem.command,commandInterface:this.currentItem.interface};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(s._28)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},addHandleConfirm:function(e){var t=this,a={command:this.addList.command,interfaceId:this.addList.interface};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(s._25)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},handleDel:function(e,t){var a=this,n={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s._26)(n).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,command:this.searchItem.command};Object(s._27)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})},handleSong:function(){this.$router.push({path:"/command/norun/list"})},handleCommand:function(){this.$router.push({path:"/command/list"})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,n){return a("el-breadcrumb-item",{key:n},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"用户query",prop:"command"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.command,callback:function(t){e.$set(e.searchItem,"command","string"==typeof t?t.trim():t)},expression:"searchItem.command"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:mainadd",expression:"'command:mainadd'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:norun:list",expression:"'command:norun:list'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleSong()}}},[e._v("指令忽略管理")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:list",expression:"'command:list'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleCommand()}}},[e._v("相似度命令关联")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户query",prop:"command",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"预设指令",prop:"commandInterface",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,"min-with":"140"}}),e._v(" "),a("el-table-column",{attrs:{label:"修改时间",prop:"updateTime",align:"center",formatter:e.formTime2,"min-width":"140"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:mainupdate",expression:"'command:mainupdate'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:maindelete",expression:"'command:maindelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,979266743)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"120px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"用户query",prop:"command"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.command,callback:function(t){e.$set(e.addList,"command","string"==typeof t?t.trim():t)},expression:"addList.command"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"预设指令",prop:"interface"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.interface,callback:function(t){e.$set(e.addList,"interface","string"==typeof t?t.trim():t)},expression:"addList.interface"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"用户query",prop:"command"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.command,callback:function(t){e.$set(e.currentItem,"command","string"==typeof t?t.trim():t)},expression:"currentItem.command"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"预设指令",prop:"interface"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.interface,callback:function(t){e.$set(e.currentItem,"interface","string"==typeof t?t.trim():t)},expression:"currentItem.interface"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(o,c,!1,function(e){a("DsGI")},"data-v-93a4a21e",null);t.default=d.exports}});