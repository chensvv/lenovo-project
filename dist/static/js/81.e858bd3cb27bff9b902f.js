webpackJsonp([81],{YMIq:function(e,t){},xnvG:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),n=i.n(a),s=i("pWbq"),o=i("2hMI"),r=i("krqS"),l={data:function(){return{list:[],perList:[],totalClass:"8",currentItem:{id:"",code:"",name:""},addList:{code:"",name:""},searchItem:{inc:"",name:""},optList:{code:"",name:"",pageDate:[]},multipleSelection:[],selectId:"",addRules:{name:[{required:!0,message:"请输入功能名称",trigger:"change"}],code:[{required:!0,message:"请输入功能代码",trigger:"change"}]},editRules:{name:[{required:!0,message:"请输入功能名称",trigger:"blur"}],code:[{required:!0,message:"请输入功能代码",trigger:"blur"}]},editVisible:!1,addVisible:!1,optVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,optBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("grey:funupdate")&&-1==this.perList.indexOf("grey:fundel")&&-1==this.perList.indexOf("grey:fun")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,a=t.scrollWidth;this.showTitle=!(i<a)},formTime:function(e,t){var i=e.it,a=new Date(i);return a.getFullYear()+"-"+Object(s.a)(a.getMonth()+1)+"-"+Object(s.a)(a.getDate())+" "+Object(s.a)(a.getHours())+":"+Object(s.a)(a.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,code:t.code,name:t.name}},handleDel:function(e,t){var i=this,a={id:t.id};a.sign=Object(r.a)(a),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._26)(a).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1500}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,n:this.currentItem.name,c:this.currentItem.code};i.sign=Object(r.a)(i),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._25)(i).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1500}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,i={n:this.addList.name,c:this.addList.code};i.sign=Object(r.a)(i),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._25)(i).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})},optShow:function(){var e=this;this.$nextTick(function(){e.optList.pageDate.forEach(function(t){"checked"===t.check&&e.$refs.table.toggleRowSelection(t,!0)})})},handleOpt:function(e,t){var i=this;this.selectId=t.id;var a={id:t.id};a.sign=Object(r.a)(a),Object(o._28)(a).then(function(e){i.optList.name=e.data.devName,i.optList.code=e.data.devCode,i.optList.pageDate=e.data.page.data,i.optShow()}),this.optVisible=!0},handleSelectionChange:function(e){e=e.map(function(e){return e.code}),this.multipleSelection=e},optHandleClose:function(){this.$refs.table.clearSelection(),this.optVisible=!1},optHandleConfirm:function(){var e=this,t={id:this.selectId,chk:this.multipleSelection};t.sign=Object(r.a)(t),this.optBtnLoading=!0,Object(o._29)(t).then(function(t){e.optBtnLoading=!1,200==t.data.code?(e.$message({message:"配置成功",type:"success",duration:1500}),e.getList(),e.optVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(t){e.optBtnLoading=!1})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,n:this.searchItem.name,c:this.searchItem.inc};t.sign=Object(r.a)(t),Object(o._27)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-85"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/qa/list"}}},[e._v("规则定义")]),e._v(" "),i("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[i("div",{staticClass:"form-input height50"},[i("el-form-item",{attrs:{label:"机型名称",prop:"name"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name",t)},expression:"searchItem.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"机型",prop:"inc"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.inc,callback:function(t){e.$set(e.searchItem,"inc",t)},expression:"searchItem.inc"}})],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:funadd",expression:"'grey:funadd'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),i("router-link",{attrs:{to:{path:"/rule/devlist"}}},[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:devlist",expression:"'grey:devlist'"}],attrs:{size:"mini"}},[e._v("机型列表")])],1)],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[i("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),i("el-table-column",{attrs:{label:"功能名称",prop:"name",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"功能代码",prop:"code",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.code,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.code)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.code)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"更新/入库时间",prop:"it",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"操作",align:"center","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:funupdate",expression:"'grey:funupdate'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:fundel",expression:"'grey:fundel'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"grey:fun",expression:"'grey:fun'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleOpt(t.$index,t.row)}}},[e._v("配置")])]}}],null,!1,931432924)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",rules:e.editRules,model:e.currentItem}},[i("el-form-item",{attrs:{label:"功能名称",prop:"name"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.name,callback:function(t){e.$set(e.currentItem,"name",t)},expression:"currentItem.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"功能代码",prop:"code"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.code,callback:function(t){e.$set(e.currentItem,"code",t)},expression:"currentItem.code"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",rules:e.addRules,model:e.addList}},[i("el-form-item",{attrs:{label:"功能名称",prop:"name"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name",t)},expression:"addList.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"功能代码",prop:"code"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.code,callback:function(t){e.$set(e.addList,"code",t)},expression:"addList.code"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"配置",visible:e.optVisible,width:"40%",top:"10vh","before-close":e.optHandleClose},on:{"update:visible":function(t){e.optVisible=t},open:function(t){return e.optShow()}}},[i("el-form",{attrs:{"label-position":"right","label-width":"100px"}},[i("el-form-item",{attrs:{label:"功能名称"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.optList.name,callback:function(t){e.$set(e.optList,"name",t)},expression:"optList.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"功能代码"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.optList.code,callback:function(t){e.$set(e.optList,"code",t)},expression:"optList.code"}}),e._v(" "),i("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{"show-header":!1,data:e.optList.pageDate,border:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{prop:"name"}}),e._v(" "),i("el-table-column",{attrs:{prop:"code"}})],1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.optVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.optBtnLoading},on:{click:e.optHandleConfirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(l,c,!1,function(e){i("YMIq")},"data-v-03987a0c",null);t.default=d.exports}});