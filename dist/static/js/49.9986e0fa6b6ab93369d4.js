webpackJsonp([49],{lGRM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("BO1k"),r=a.n(n),i=a("mvHQ"),s=a.n(i),o=a("iGF/"),l=a("krqS"),d={inject:["reload"],data:function(){return{list:[],totalClass:"8",expands:[],addl:{},defaultProps:{children:"children",label:"ruleName"},addList:{parentCode:"",ruleCode:"",ruleName:"",url:"",icon:""},currentItem:{id:"",ruleCode:"",ruleName:"",url:"",icon:""},addRules:{ruleName:[{required:!0,message:"请输入菜单名称",trigger:"change"}]},editRules:{ruleName:[{required:!0,message:"请输入菜单名称",trigger:"change"}]},currentPage:1,pageSize:10,totalCount:1,listLoading:!1,editVisible:!1,addVisible:!1,addBtnLoading:!1,editBtnLoading:!1,ruleCodeAuth:!1,urlAuth:!1,isshow:!0,addTitle:""}},created:function(){this.getList()},methods:{openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleInfo:function(e,t){this.$router.push({path:"/rule/detail",query:{did:t.id}})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},handleAdd:function(e,t){this.addList={parentCode:0==t?0:t.id,ruleCode:"",ruleName:"",url:"",icon:0==t?"el-icon-tickets":3==t.menutype?" ":"el-icon-document"},this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={parentCode:this.addList.parentCode,ruleCode:this.addList.ruleCode,ruleName:this.addList.ruleName,url:this.addList.url,icon:this.addList.icon},n={userName:sessionStorage.getItem("username")};a.sign=Object(l.a)(a),n.sign=Object(l.a)(n),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o.g)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1,sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.A)(n).then(function(e){if(200==e.data.code){sessionStorage.setItem("menuData",s()(e.data.data));var a=e.data.data,n=[],i=!0,o=!1,l=void 0;try{for(var d,u=r()(a);!(i=(d=u.next()).done);i=!0){var c=d.value;0===c.menutype&&n.push({ruleCode:c.ruleCode});var m=!0,h=!1,g=void 0;try{for(var f,p=r()(c.children);!(m=(f=p.next()).done);m=!0){var v=f.value;2===v.menutype&&n.push({ruleCode:v.ruleCode});var b=!0,y=!1,C=void 0;try{for(var L,_=r()(v.children2);!(b=(L=_.next()).done);b=!0){var I=L.value;0===I.menutype&&n.push({ruleCode:I.ruleCode})}}catch(e){y=!0,C=e}finally{try{!b&&_.return&&_.return()}finally{if(y)throw C}}}}catch(e){h=!0,g=e}finally{try{!m&&p.return&&p.return()}finally{if(h)throw g}}}}catch(e){o=!0,l=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}sessionStorage.setItem("btnpermission",s()(n)),t.reload()}else t.$message({message:e.data.errorMessage,type:"error",duration:1500})})):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},handleEdit:function(e,t){this.currentItem={id:t.id,ruleCode:t.ruleCode,ruleName:t.ruleName,url:t.url,icon:t.icon},this.editVisible=!0},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,ruleCode:this.currentItem.ruleCode,ruleName:this.currentItem.ruleName,url:this.currentItem.url,icon:this.currentItem.icon},n={userName:sessionStorage.getItem("username")};a.sign=Object(l.a)(a),n.sign=Object(l.a)(n),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o.j)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1500}),t.getList(),t.editVisible=!1,sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.A)(n).then(function(e){if(200==e.data.code){sessionStorage.setItem("menuData",s()(e.data.data));var a=e.data.data,n=[],i=!0,o=!1,l=void 0;try{for(var d,u=r()(a);!(i=(d=u.next()).done);i=!0){var c=d.value;0===c.menutype&&n.push({ruleCode:c.ruleCode});var m=!0,h=!1,g=void 0;try{for(var f,p=r()(c.children);!(m=(f=p.next()).done);m=!0){var v=f.value;2===v.menutype&&n.push({ruleCode:v.ruleCode});var b=!0,y=!1,C=void 0;try{for(var L,_=r()(v.children2);!(b=(L=_.next()).done);b=!0){var I=L.value;0===I.menutype&&n.push({ruleCode:I.ruleCode})}}catch(e){y=!0,C=e}finally{try{!b&&_.return&&_.return()}finally{if(y)throw C}}}}catch(e){h=!0,g=e}finally{try{!m&&p.return&&p.return()}finally{if(h)throw g}}}}catch(e){o=!0,l=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}sessionStorage.setItem("btnpermission",s()(n)),t.reload()}else t.$message({message:e.data.errorMessage,type:"error",duration:1500})})):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},handleDel:function(e,t){var a=this,n={id:t.id},r={userName:sessionStorage.getItem("username")};n.sign=Object(l.a)(n),r.sign=Object(l.a)(r),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.h)(n).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1500}),a.getList(),sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.A)(r).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",s()(e.data.data)),a.reload()):a.$message({message:e.data.errorMessage,type:"error",duration:1500})})):a.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize};t.sign=Object(l.a)(t),Object(o.u)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length}).catch(function(){e.listLoading=!1})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/permission/role"}}},[e._v("权限管理")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",staticStyle:{"padding-left":"50px"},attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{staticClass:"sub-btn"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"Rule:add",expression:"'Rule:add'"}],attrs:{type:"primary",size:"mini",loading:e.btnLoading},on:{click:function(t){return e.handleAdd(1,0)}}},[e._v("增加一级菜单")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"laoding",rawName:"v-laoding",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{prop:"ruleName",label:"一级菜单权限名称"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[3!=t.row.menutype?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"Rule:add",expression:"'Rule:add'"}],attrs:{size:"mini"},nativeOn:{click:function(a){return a.stopPropagation(),e.handleInfo(t.$index,t.row)}}},[e._v("详情")]):e._e(),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"Rule:update",expression:"'Rule:update'"}],attrs:{size:"mini"},nativeOn:{click:function(a){return a.stopPropagation(),e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"Rule:delete",expression:"'Rule:delete'"}],attrs:{size:"mini",type:"danger"},nativeOn:{click:function(a){return a.stopPropagation(),e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,2274685377)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增一级菜单权限",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"菜单名称",prop:"ruleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.ruleName,callback:function(t){e.$set(e.addList,"ruleName","string"==typeof t?t.trim():t)},expression:"addList.ruleName"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"菜单名称",prop:"ruleName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.ruleName,callback:function(t){e.$set(e.currentItem,"ruleName","string"==typeof t?t.trim():t)},expression:"currentItem.ruleName"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(d,u,!1,function(e){a("tkv0")},null,null);t.default=c.exports},tkv0:function(e,t){}});