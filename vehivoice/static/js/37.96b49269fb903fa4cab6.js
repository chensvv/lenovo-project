webpackJsonp([37],{"2sfn":function(e,t){},utgc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),n=a("gRE1"),r=a.n(n),o=a("iGF/"),l=a("krqS"),d=a("7oYi"),c={inject:["reload"],data:function(){return{getpageNum:d.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",roleCode:"",roleName:""},addList:{roleCode:"",roleName:""},searchItem:{roleName:""},treeData:[],selectedKeys:[],selectedKeysAdd:[],defaultProps:{children:"children",label:"ruleName"},addRules:{roleCode:[{required:!0,message:"请输入角色Code",trigger:"change"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"change"}]},editRules:{roleCode:[{required:!0,message:"请输入角色Code",trigger:"change"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!1,isshow:!0,checkStrictlyEdit:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(r()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("role:update")&&-1==this.perList.indexOf("role:del")&&(this.isshow=!1)},methods:{onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){var a=this;this.editVisible=!0,this.checkStrictlyEdit=!0;var i={id:t.id};this.currentItem={id:t.id,roleCode:t.roleCode,roleName:t.roleName},this.getTree(),Object(o.n)(i).then(function(e){a.$refs.tree.setCheckedKeys(e.data.ids)})},handleDel:function(e,t){var a=this,i={id:t.id};i.sign=Object(l.a)(i),this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.m)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.$refs.tree.setCheckedKeys([]),this.editVisible=!1},addHandleClose:function(){this.$refs.treeAdd.setCheckedKeys([]),this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={roleId:this.currentItem.id,roleName:this.currentItem.roleName,roleCode:this.currentItem.roleCode,ids:this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())},i={userName:sessionStorage.getItem("username")};a.sign=Object(l.a)(a),i.sign=Object(l.a)(i),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o.p)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:2e3}),t.getList(),t.editVisible=!1,sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.x)(i).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",s()(e.data.data)),t.reload()):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0,this.getTree()},addHandleConfirm:function(e){var t=this,a={roleCode:this.addList.roleCode,roleName:this.addList.roleName,ids:this.$refs.treeAdd.getCheckedKeys().concat(this.$refs.treeAdd.getHalfCheckedKeys())};a.sign=Object(l.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o.l)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:2e3}),t.getList(),t.addVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})})},getParentKey:function(e,t){},getChecked:function(e,t){t?this.$refs.tree.setCheckedKeys(this.$refs.tree.getCheckedKeys().concat(this.getAllIds(e))):this.$refs.tree.setCheckedKeys(this.removal(this.$refs.tree.getCheckedKeys(),this.getAllIds(e)))},getCheckedAdd:function(){},getAllIds:function(e){var t=[];return s()(e,function(e,a){return"id"===e&&t.push(a),a}),t},removal:function(e,t){return e.filter(function(e){return!t.includes(e)})},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,roleName:this.searchItem.roleName};t.sign=Object(l.a)(t),Object(o.o)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})},getTree:function(){var e=this,t={id:"0"};t.sign=Object(l.a)(t),Object(o.f)(t).then(function(t){e.treeData=t.data})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/permission/role"}}},[e._v("权限管理")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"Role Name",prop:"roleName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.roleName,callback:function(t){e.$set(e.searchItem,"roleName","string"==typeof t?t.trim():t)},expression:"searchItem.roleName"}})],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role:add",expression:"'role:add'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加角色")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"Role Code",prop:"roleCode",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"Role Name",prop:"roleName",align:"center"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role:update",expression:"'role:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role:del",expression:"'role:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,937689335)}):e._e()],1),e._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),a("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),a("li",[a("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"角色Code",prop:"roleCode"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.roleCode,callback:function(t){e.$set(e.currentItem,"roleCode","string"==typeof t?t.trim():t)},expression:"currentItem.roleCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.roleName,callback:function(t){e.$set(e.currentItem,"roleName","string"==typeof t?t.trim():t)},expression:"currentItem.roleName"}})],1),e._v(" "),a("el-form-item",[a("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id","check-strictly":e.checkStrictlyEdit,props:e.defaultProps,"default-checked-keys":e.selectedKeys},on:{"check-change":e.getChecked,check:e.getParentKey}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"角色Code",prop:"roleCode"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.roleCode,callback:function(t){e.$set(e.addList,"roleCode","string"==typeof t?t.trim():t)},expression:"addList.roleCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.roleName,callback:function(t){e.$set(e.addList,"roleName","string"==typeof t?t.trim():t)},expression:"addList.roleName"}})],1),e._v(" "),a("el-form-item",[a("el-tree",{ref:"treeAdd",attrs:{data:e.treeData,"show-checkbox":"","node-key":"id",props:e.defaultProps,"default-checked-keys":e.selectedKeysAdd},on:{"check-change":e.getCheckedAdd}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(c,u,!1,function(e){a("2sfn")},"data-v-76c8cf2a",null);t.default=m.exports}});