webpackJsonp([43],{ppPz:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("gRE1"),r=s.n(n),o=s("iGF/"),l={inject:["reload"],data:function(){return{list:[],perList:[],currentItem:{id:"",userName:"",password:""},addList:{userName:"",password:""},searchItem:{userName:""},roleIds:{},roleData:[],multipleSelection:[],seleId:"",addRules:{userName:[{required:!0,message:"请输入用户名",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]},editRules:{userName:[{required:!0,message:"请输入用户名",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]},editVisible:!1,addVisible:!1,roleVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,roleBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(r()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("user:editRole")&&-1==this.perList.indexOf("user:update")&&-1==this.perList.indexOf("user:del")&&(this.isshow=!1)},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,userName:t.userName,password:t.password}},handleDel:function(e,t){var s=this,a={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.p)(a).then(function(e){200==e.data.code?(s.$message({message:"删除成功",type:"success",duration:1e3}),s.getList()):s.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},roleHandleClose:function(){this.roleVisible=!1},editHandleConfirm:function(e){var t=this,s={userId:this.currentItem.id,userName:this.currentItem.userName,password:this.currentItem.password};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o.u)(s).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,s={userName:this.addList.userName,password:this.addList.password};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o.o)(s).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleRole:function(e,t){var s=this;this.seleId=t.id;var a={id:this.seleId};Object(o.s)(a).then(function(e){s.roleIds=e.data.ids}),Object(o.r)().then(function(e){s.roleData=e.data}),this.roleVisible=!0},optShow:function(){var e=this;setTimeout(function(){e.roleIds.map(function(t){e.roleData.map(function(s,a){s.id==t&&e.$refs.table.toggleRowSelection(e.roleData[a],!0)})})},100)},roleHandleConfirm:function(){var e=this,t={id:this.seleId,ids:this.multipleSelection},s={userName:sessionStorage.getItem("username"),password:sessionStorage.getItem("log")};this.roleBtnLoading=!0,Object(o.t)(t).then(function(t){e.roleBtnLoading=!1,200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:1e3}),e.getList(),e.roleVisible=!1,sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.h)(s).then(function(t){200==t.data.code?(sessionStorage.setItem("menuData",i()(t.data.data)),e.reload()):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})})):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.roleBtnLoading=!1})},handleSelectionChange:function(e){e=e.map(function(e){return e.id}),this.multipleSelection=e},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,userName:this.searchItem.userName,roleName:window.sessionStorage.getItem("username")};Object(o.q)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),e._l(e.$route.meta,function(t,a){return s("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[s("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.userName,callback:function(t){e.$set(e.searchItem,"userName","string"==typeof t?t.trim():t)},expression:"searchItem.userName"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"user:add",expression:"'user:add'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLading,expression:"listLading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[s("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:"用户名",prop:"userName",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:"密码",prop:"password",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:"状态",prop:"status",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(0==t.row.status?"未审核":"已审核"))])]}}])}),e._v(" "),e.isshow?s("el-table-column",{attrs:{label:"操作",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{directives:[{name:"has",rawName:"v-has",value:"user:editRole",expression:"'user:editRole'"}],attrs:{size:"mini",type:"primary"},on:{click:function(s){return e.handleRole(t.$index,t.row)}}},[e._v("角色")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"user:update",expression:"'user:update'"}],attrs:{size:"mini"},on:{click:function(s){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"user:del",expression:"'user:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,3788958786)}):e._e()],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[s("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[s("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.userName,callback:function(t){e.$set(e.currentItem,"userName","string"==typeof t?t.trim():t)},expression:"currentItem.userName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.password,callback:function(t){e.$set(e.currentItem,"password","string"==typeof t?t.trim():t)},expression:"currentItem.password"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[s("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"120px",rules:e.addRules,model:e.addList}},[s("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.userName,callback:function(t){e.$set(e.addList,"userName","string"==typeof t?t.trim():t)},expression:"addList.userName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.password,callback:function(t){e.$set(e.addList,"password","string"==typeof t?t.trim():t)},expression:"addList.password"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"角色",visible:e.roleVisible,width:"300","before-close":e.roleHandleClose},on:{"update:visible":function(t){e.roleVisible=t},open:function(t){return e.optShow()}}},[s("el-form",{attrs:{"label-position":"left","label-width":"120px"}},[s("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:e.roleData,border:""},on:{"selection-change":e.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{label:"roleCode",prop:"roleCode"}}),e._v(" "),s("el-table-column",{attrs:{label:"roleName",prop:"roleName"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.roleHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.roleBtnLoading},on:{click:function(t){return e.roleHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=s("VU/8")(l,d,!1,function(e){s("uTsY")},"data-v-300875bc",null);t.default=u.exports},uTsY:function(e,t){}});