webpackJsonp([69],{"+cN8":function(e,t){},ybBp:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),n=i.n(a),s=i("pWbq"),o=i("2hMI"),r={data:function(){return{list:[],perList:[],totalClass:"",currentItem:{id:"",code:"",name:""},addList:{name:"",code:""},searchItem:{inc:"",name:""},optList:{code:"",name:"",pageDate:[]},multipleSelection:[],selectId:"",addRules:{name:[{required:!0,message:"请输入机型名称",trigger:"change"}],code:[{required:!0,message:"请输入机型UA",trigger:"change"}]},editRules:{name:[{required:!0,message:"请输入机型名称",trigger:"blur"}],code:[{required:!0,message:"请输入机型UA",trigger:"blur"}]},editVisible:!1,addVisible:!1,optVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,optBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("grey:devupdate")&&-1==this.perList.indexOf("grey:devdel")&&-1==this.perList.indexOf("grey:dev")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,a=t.scrollWidth;this.showTitle=!(i<a)},formTime:function(e,t){var i=e.it,a=new Date(i);return a.getFullYear()+"-"+Object(s.a)(a.getMonth()+1)+"-"+Object(s.a)(a.getDate())+" "+Object(s.a)(a.getHours())+":"+Object(s.a)(a.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,code:t.code,name:t.name}},handleDel:function(e,t){var i=this,a={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.Y)(a).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,n:this.currentItem.name,c:this.currentItem.code};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o.X)(i).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,i={n:this.addList.name,c:this.addList.code};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o.X)(i).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},optShow:function(){var e=this;this.$nextTick(function(){e.optList.pageDate.forEach(function(t){"checked"===t.check&&e.$refs.table.toggleRowSelection(t,!0)})})},handleOpt:function(e,t){var i=this;this.selectId=t.id;var a={id:t.id};Object(o._0)(a).then(function(e){i.optList.name=e.data.devName,i.optList.code=e.data.devCode,i.optList.pageDate=e.data.page.data,i.optShow()}),this.optVisible=!0},optHandleClose:function(){this.$refs.table.clearSelection(),this.optVisible=!1},handleSelectionChange:function(e){e=e.map(function(e){return e.code}),this.multipleSelection=e},optHandleConfirm:function(){var e=this,t={id:this.selectId,chk:this.multipleSelection};this.optBtnLoading=!0,Object(o._1)(t).then(function(t){e.optBtnLoading=!1,200==t.data.code?(e.$message({message:"配置成功",type:"success",duration:1e3}),e.getList(),e.optVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.optBtnLoading=!1})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.name,ex:this.searchItem.inc};Object(o.Z)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})}}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-85"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),e._l(e.$route.meta,function(t,a){return i("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,size:"mini",model:e.searchItem,"label-width":"90px"}},[i("div",{staticClass:"form-input height50"},[i("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name",t)},expression:"searchItem.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"机型",prop:"inc"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.inc,callback:function(t){e.$set(e.searchItem,"inc",t)},expression:"searchItem.inc"}})],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:devadd",expression:"'grey:devadd'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),i("router-link",{attrs:{to:{path:"/grey/funlist"}}},[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:funlist",expression:"'grey:funlist'"}],attrs:{size:"mini"}},[e._v("功能列表")])],1)],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),i("el-table-column",{attrs:{label:"机型名称",prop:"name",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"机型代码",prop:"code",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.code,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.code)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.code)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"更新/入库时间",prop:"it",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"操作",align:"center","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:devupdate",expression:"'grey:devupdate'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:devdel",expression:"'grey:devdel'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:dev",expression:"'grey:dev'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleOpt(t.$index,t.row)}}},[e._v("配置")])]}}],null,!1,2001837340)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",rules:e.editRules,model:e.currentItem}},[i("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.name,callback:function(t){e.$set(e.currentItem,"name",t)},expression:"currentItem.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"机型UA",prop:"code"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.code,callback:function(t){e.$set(e.currentItem,"code",t)},expression:"currentItem.code"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",rules:e.addRules,model:e.addList}},[i("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name",t)},expression:"addList.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"机型UA",prop:"code"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.code,callback:function(t){e.$set(e.addList,"code",t)},expression:"addList.code"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"配置",visible:e.optVisible,width:"300","before-close":e.optHandleClose},on:{"update:visible":function(t){e.optVisible=t},open:function(t){return e.optShow()}}},[i("el-form",{attrs:{"label-position":"right","label-width":"100px"}},[i("el-form-item",{attrs:{label:"机型名称"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.optList.name,callback:function(t){e.$set(e.optList,"name",t)},expression:"optList.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"机型UA"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.optList.code,callback:function(t){e.$set(e.optList,"code",t)},expression:"optList.code"}})],1),e._v(" "),i("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{"show-header":!1,data:e.optList.pageDate,border:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),i("el-table-column",{attrs:{prop:"name"}}),e._v(" "),i("el-table-column",{attrs:{prop:"code"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.optVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.optBtnLoading},on:{click:e.optHandleConfirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(r,l,!1,function(e){i("+cN8")},"data-v-1f35c332",null);t.default=d.exports}});