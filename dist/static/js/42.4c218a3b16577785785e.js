webpackJsonp([42],{"2tya":function(e,t){},utgc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("iGF/"),i={name:"applicationlist",data:function(){return{list:[],currentItem:{id:"",roleCode:"",roleName:""},addList:{roleCode:"",roleName:""},searchItem:{roleName:""},treeData:[],selectedKeys:[],defaultProps:{children:"children",label:"ruleName"},addRules:{roleCode:[{required:!0,message:"请输入角色Code",trigger:"change"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"change"}]},editRules:{roleCode:[{required:!0,message:"请输入角色Code",trigger:"change"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:30,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,AIMLBtnLoading:!1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){var a=this,i={id:t.id};this.currentItem={id:t.id,roleCode:t.roleCode,roleName:t.roleName},this.getTree(),Object(r.e)(i).then(function(e){a.selectedKeys=e.data.ids}),this.editVisible=!0},handleDel:function(e,t){var a=this,i={id:t.id};this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r.d)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(){})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={roleId:this.currentItem.id,roleName:this.currentItem.roleName,roleCode:this.currentItem.roleCode,ids:this.selectedKeys};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(r.g)(a).then(function(e){200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editBtnLoading=!1,t.editVisible=!1):(t.$message({message:e.data.errorMessage,type:"error",duration:1e3}),t.editBtnLoading=!1)})})},handleAdd:function(){this.addVisible=!0,this.getTree()},addHandleConfirm:function(e){var t=this,a={roleCode:this.addList.roleCode,roleName:this.addList.roleName,ids:this.selectedKeys};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(r.c)(a).then(function(e){200==e.status?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addBtnLoading=!1,t.addVisible=!1):(t.addBtnLoading=!1,t.$message({message:e.data.errorMessage,type:"error",duration:1e3}))})})},getChecked:function(){this.selectedKeys=this.$refs.tree.getCheckedKeys()},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,roleName:this.searchItem.roleName};Object(r.f)(t).then(function(t){e.list=t.data.data,e.totalCount=t.data.count})},getTree:function(){var e=this;Object(r.a)().then(function(t){e.treeData=t.data})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"Role Name",prop:"roleName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.roleName,callback:function(t){e.$set(e.searchItem,"roleName","string"==typeof t?t.trim():t)},expression:"searchItem.roleName"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:175,expression:"175"}],staticClass:"success btn_role",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加角色")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"Role Code",prop:"roleCode",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"Role Name",prop:"roleName",align:"center",formatter:e.formState}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:176,expression:"176"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:177,expression:"177"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"角色Code",prop:"roleCode"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.roleCode,callback:function(t){e.$set(e.currentItem,"roleCode","string"==typeof t?t.trim():t)},expression:"currentItem.roleCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.roleName,callback:function(t){e.$set(e.currentItem,"roleName","string"==typeof t?t.trim():t)},expression:"currentItem.roleName"}})],1),e._v(" "),a("el-form-item",[a("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id",props:e.defaultProps,"default-checked-keys":e.selectedKeys},on:{"check-change":e.getChecked}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"120px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"角色Code",prop:"roleCode"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.roleCode,callback:function(t){e.$set(e.addList,"roleCode","string"==typeof t?t.trim():t)},expression:"addList.roleCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.roleName,callback:function(t){e.$set(e.addList,"roleName","string"==typeof t?t.trim():t)},expression:"addList.roleName"}})],1),e._v(" "),a("el-form-item",[a("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id",props:e.defaultProps,"default-checked-keys":e.selectedKeys},on:{"check-change":e.getChecked}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,n,!1,function(e){a("2tya")},"data-v-070d52b4",null);t.default=s.exports}});