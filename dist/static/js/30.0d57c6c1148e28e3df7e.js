webpackJsonp([30],{"sB/X":function(e,t){},ybBp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("D7x1"),i=a("pWbq"),s=a("2hMI"),o={name:"applicationlist",components:{iTable:n.a},data:function(){return{list:[],currentItem:{id:"",code:"",name:""},addList:{name:"",code:""},searchItem:{inc:"",name:""},optList:{code:"",name:"",pageDate:[]},multipleSelection:[],selectId:"",addRules:{name:[{required:!0,message:"请输入机型名称",trigger:"change"}],code:[{required:!0,message:"请输入机型UA",trigger:"change"}]},editRules:{name:[{required:!0,message:"请输入机型名称",trigger:"blur"}],code:[{required:!0,message:"请输入机型UA",trigger:"blur"}]},editVisible:!1,addVisible:!1,optVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,optBtnLoading:!1}},created:function(){this.getList()},methods:{formTime:function(e,t){var a=e.it,n=new Date(a);return n.getFullYear()+"-"+Object(i.a)(n.getMonth()+1)+"-"+Object(i.a)(n.getDate())+" "+Object(i.a)(n.getMonth())+":"+Object(i.a)(n.getMinutes())+":"+Object(i.a)(n.getSeconds())},resetForm:function(e){this.$refs[e].resetFields(),this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,code:t.code,name:t.name}},handleDel:function(e,t){var a=this,n={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.u)(n).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(){})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,n:this.currentItem.name,c:this.currentItem.code};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(s.t)(a).then(function(e){200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editBtnLoading=!1,t.editVisible=!1):(t.editBtnLoading=!1,t.$message({message:e.data.errorMessage,type:"error",duration:1e3}))})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={n:this.addList.name,c:this.addList.code};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(s.t)(a).then(function(e){200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addBtnLoading=!1,t.addVisible=!1):(t.addBtnLoading=!1,t.$message({message:e.data.errorMessage,type:"error",duration:1e3}))})})},optShow:function(){var e=this;this.$nextTick(function(){e.optList.pageDate.forEach(function(t){"checked"===t.check&&e.$refs.table.toggleRowSelection(t,!0)})})},handleOpt:function(e,t){var a=this;this.selectId=t.id;var n={id:t.id};Object(s.w)(n).then(function(e){a.optList.name=e.data.devName,a.optList.code=e.data.devCode,a.optList.pageDate=e.data.page.data,a.optShow()}),this.optVisible=!0},optHandleClose:function(){this.optVisible=!1},handleSelectionChange:function(e){e=e.map(function(e){return e.code}),this.multipleSelection=e},optHandleConfirm:function(){var e=this;this.optBtnLoading=!0;var t={id:this.selectId,chk:this.multipleSelection};Object(s.x)(t).then(function(t){200==t.data.code?(e.$message({message:"配置成功",type:"success",duration:1e3}),e.getList(),e.optBtnLoading=!1,e.optVisible=!1):(e.optBtnLoading=!1,e.$message({message:t.data.errorMessage,type:"error",duration:1e3}))})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.name,ex:this.searchItem.code};Object(s.v)(t).then(function(t){e.list=t.data.data,e.totalCount=t.data.count})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),e._l(e.$route.meta,function(t,n){return a("el-breadcrumb-item",{key:n},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name",t)},expression:"searchItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机型",prop:"inc"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.inc,callback:function(t){e.$set(e.searchItem,"inc",t)},expression:"searchItem.inc"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:52,expression:"52"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),a("router-link",{attrs:{to:{path:"/grey/funlist"}}},[a("el-button",{staticClass:"success",attrs:{size:"mini"}},[e._v("功能列表")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"机型名称",prop:"name",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"机型代码",prop:"code",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新/入库时间",prop:"it",align:"center",formatter:e.formTime}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:167,expression:"167"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:53,expression:"53"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:168,expression:"168"}],attrs:{size:"mini"},on:{click:function(a){return e.handleOpt(t.$index,t.row)}}},[e._v("配置")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.name,callback:function(t){e.$set(e.currentItem,"name",t)},expression:"currentItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机型UA",prop:"code"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.code,callback:function(t){e.$set(e.currentItem,"code",t)},expression:"currentItem.code"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name",t)},expression:"addList.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机型UA",prop:"code"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.code,callback:function(t){e.$set(e.addList,"code",t)},expression:"addList.code"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"配置",visible:e.optVisible,width:"300","before-close":e.optHandleClose},on:{"update:visible":function(t){e.optVisible=t},open:function(t){return e.optShow()}}},[a("el-form",{attrs:{"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"机型名称"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.optList.name,callback:function(t){e.$set(e.optList,"name",t)},expression:"optList.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机型UA"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.optList.code,callback:function(t){e.$set(e.optList,"code",t)},expression:"optList.code"}})],1),e._v(" "),a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{"show-header":!1,data:e.optList.pageDate,border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{prop:"code"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.optVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.optBtnLoading},on:{click:e.optHandleConfirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(o,r,!1,function(e){a("sB/X")},"data-v-4e46a9ed",null);t.default=l.exports}});