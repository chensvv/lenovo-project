webpackJsonp([72],{f6aM:function(e,t){},utgc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),r=a.n(i),s=a("gRE1"),n=a.n(s),o=a("iGF/"),l={inject:["reload"],data:function(){return{list:[],perList:[],currentItem:{id:"",roleCode:"",roleName:""},addList:{roleCode:"",roleName:""},searchItem:{roleName:""},treeData:[],selectedKeys:[],selectedKeysAdd:[],defaultProps:{children:"children",label:"ruleName"},addRules:{roleCode:[{required:!0,message:"请输入角色Code",trigger:"change"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"change"}]},editRules:{roleCode:[{required:!0,message:"请输入角色Code",trigger:"change"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("role:update")&&-1==this.perList.indexOf("role:del")&&(this.isshow=!1)},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){var a=this,i={id:t.id};this.currentItem={id:t.id,roleCode:t.roleCode,roleName:t.roleName},this.getTree(),Object(o.l)(i).then(function(e){a.selectedKeys=e.data.ids}),this.editVisible=!0},handleDel:function(e,t){var a=this,i={id:t.id};this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.k)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.$refs.tree.setCheckedKeys([]),this.editVisible=!1},addHandleClose:function(){this.$refs.treeAdd.setCheckedKeys([]),this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={roleId:this.currentItem.id,roleName:this.currentItem.roleName,roleCode:this.currentItem.roleCode,ids:this.selectedKeys},i={userName:sessionStorage.getItem("username"),password:sessionStorage.getItem("log")};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o.n)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1,sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.h)(i).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",r()(e.data.data)),t.reload()):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})})):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0,this.getTree()},addHandleConfirm:function(e){var t=this,a={roleCode:this.addList.roleCode,roleName:this.addList.roleName,ids:this.selectedKeysAdd};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o.j)(a).then(function(e){t.addBtnLoading=!1,200==e.status?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},getChecked:function(){this.selectedKeys=this.$refs.tree.getCheckedKeys()},getCheckedAdd:function(){this.selectedKeysAdd=this.$refs.treeAdd.getCheckedKeys()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,roleName:this.searchItem.roleName};Object(o.m)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})},getTree:function(){var e=this;Object(o.g)().then(function(t){e.treeData=t.data})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table role"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"Role Name",prop:"roleName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.roleName,callback:function(t){e.$set(e.searchItem,"roleName","string"==typeof t?t.trim():t)},expression:"searchItem.roleName"}})],1),e._v(" "),a("el-form-item",{staticClass:"sub-btn"},[a("el-button",{attrs:{type:"primary",size:"mini",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role:add",expression:"'role:add'"}],staticClass:"success btn_role",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加角色")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalCount<=5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"Role Code",prop:"roleCode",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"Role Name",prop:"roleName",align:"left",formatter:e.formState}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role:update",expression:"'role:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role:del",expression:"'role:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,937689335)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"角色Code",prop:"roleCode"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.roleCode,callback:function(t){e.$set(e.currentItem,"roleCode","string"==typeof t?t.trim():t)},expression:"currentItem.roleCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.roleName,callback:function(t){e.$set(e.currentItem,"roleName","string"==typeof t?t.trim():t)},expression:"currentItem.roleName"}})],1),e._v(" "),a("el-form-item",[a("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id",props:e.defaultProps,"check-strictly":!0,"default-checked-keys":e.selectedKeys},on:{"check-change":e.getChecked}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"角色Code",prop:"roleCode"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.roleCode,callback:function(t){e.$set(e.addList,"roleCode","string"==typeof t?t.trim():t)},expression:"addList.roleCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.roleName,callback:function(t){e.$set(e.addList,"roleName","string"==typeof t?t.trim():t)},expression:"addList.roleName"}})],1),e._v(" "),a("el-form-item",[a("el-tree",{ref:"treeAdd",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id",props:e.defaultProps,"check-strictly":!0,"default-checked-keys":e.selectedKeysAdd},on:{"check-change":e.getCheckedAdd}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(l,d,!1,function(e){a("f6aM")},"data-v-08f2d22d",null);t.default=c.exports}});