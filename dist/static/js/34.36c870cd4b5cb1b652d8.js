webpackJsonp([34],{IMQM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("gRE1"),i=n.n(a),s=n("pWbq"),o=n("2hMI"),r=n("krqS"),l={data:function(){return{searchItem:{con:"",state:""},currentItem:{id:"",con:"",url:""},addList:{con:""},sels:[],list:[],perList:[],totalClass:"8",editRules:{con:[{required:!0,message:"请输入内容",trigger:"blur"}]},addRules:{con:[{required:!0,message:"请输入内容",trigger:"change"}]},column:{prop:"",order:""},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,editBtnLoading:!1,addBtnLoading:!1,listLoading:!0,checkLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("joke:veri")&&-1==this.perList.indexOf("joke:update")&&-1==this.perList.indexOf("joke:del")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,n=t.clientWidth,a=t.scrollWidth;this.showTitle=!(n<a)},formTime:function(e,t){var n=e.it,a=new Date(n);return a.getFullYear()+"-"+Object(s.a)(a.getMonth()+1)+"-"+Object(s.a)(a.getDate())+" "+Object(s.a)(a.getHours())+":"+Object(s.a)(a.getMinutes())},formState:function(e,t){return 1==e.sta?"已审核":"未审核"},sortChange:function(e){this.column={prop:e.prop,order:e.order},console.log(this.column),this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.con,ex:this.searchItem.state,fieldName:this.column.prop,order:"ascending"==this.column.order?"0":""};t.sign=Object(r.a)(t),Object(o._47)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},handleSelectionChange:function(e){this.sels=e},handleBatchDel:function(){var e=this,t=this.sels.map(function(e){return e.id});if(0==t.length||t==[]||null==t)this.$message({message:"请选择要删除的数据",type:"warning",duration:1500});else{var n={ids:t};n.sign=Object(r.a)(n),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._46)(n).then(function(t){200==t.data.code?(e.$message({message:"删除成功",type:"success",duration:1500}),e.getList()):e.$message({message:t.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})}},handleBatchState:function(){var e=this,t=this.sels.map(function(e){return e.id});if(0==t.length||t==[]||null==t)this.$message({message:"请选择要审核的数据",type:"warning",duration:1500});else{var n={ids:t};n.sign=Object(r.a)(n),Object(o._54)(n).then(function(t){200==t.data.code?(e.$message({message:"审核成功",type:"success",duration:1500}),e.getList()):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(e){})}},checkState:function(e,t){var n=this;this.checkLoading=!0;var a={id:t.id};a.sign=Object(r.a)(a),Object(o._53)(a).then(function(e){n.checkLoading=!1,200==e.data.code?(n.$message({message:"审核成功",type:"success",duration:1500}),n.getList()):n.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){n.checkLoading=!1})},handleClose:function(){this.editVisible=!1},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,con:t.con}},edithandleConfirm:function(e){var t=this,n={con:this.currentItem.con,id:this.currentItem.id};n.sign=Object(r.a)(n),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._44)(n).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1500}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},handleDel:function(e,t){var n=this,a={id:t.id};a.sign=Object(r.a)(a),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._45)(a).then(function(e){200==e.data.code?(n.$message({message:"删除成功",type:"success",duration:1500}),n.getList()):n.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,n={con:this.addList.con,url:""};n.sign=Object(r.a)(n),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._44)(n).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table height-85"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),n("el-breadcrumb-item",{attrs:{to:{path:"/csc/csc"}}},[e._v("闲聊数据")]),e._v(" "),n("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),n("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[n("div",{staticClass:"form-input height50"},[n("el-form-item",{attrs:{label:"内容",prop:"con"}},[n("el-input",{attrs:{clearable:""},model:{value:e.searchItem.con,callback:function(t){e.$set(e.searchItem,"con","string"==typeof t?t.trim():t)},expression:"searchItem.con"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"审核状态",prop:"state"}},[n("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.state,callback:function(t){e.$set(e.searchItem,"state",t)},expression:"searchItem.state"}},[n("el-option",{attrs:{label:"已审核",value:"1"}}),e._v(" "),n("el-option",{attrs:{label:"未审核",value:"2"}})],1)],1)],1),e._v(" "),n("div",{staticClass:"form-btn"},[n("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:save",expression:"'joke:save'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:delBatch",expression:"'joke:delBatch'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleBatchDel()}}},[e._v("批量删除")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:veriBatch",expression:"'joke:veriBatch'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleBatchState()}}},[e._v("批量审核")])],1)]),e._v(" "),n("div",{staticClass:"table-box"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"selection-change":e.handleSelectionChange,"sort-change":e.sortChange}},[n("el-table-column",{attrs:{type:"selection",width:"50",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),n("el-table-column",{attrs:{label:"内容",prop:"con",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.con,placement:"top"}},[n("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.con)+"\n                    ")])]),e._v(" "),e.showTitle?n("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.con)+"\n                ")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",prop:"sta",align:"center",formatter:e.formState,sortable:"custom"}}),e._v(" "),n("el-table-column",{attrs:{label:"更新/入库时间",prop:"it",align:"center","min-width":"120",width:"150",formatter:e.formTime}}),e._v(" "),e.isshow?n("el-table-column",{attrs:{label:"操作",align:"center","min-width":"190"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:veri",expression:"'joke:veri'"}],attrs:{size:"mini",type:"danger",loading:e.checkLoading},on:{click:function(n){return e.checkState(t.$index,t.row)}}},[e._v("审核")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:update",expression:"'joke:update'"}],attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:del",expression:"'joke:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1444513171)}):e._e()],1),e._v(" "),n("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.handleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[n("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"60px",size:"small",rules:e.editRules,model:e.currentItem}},[n("el-form-item",{attrs:{label:"内容",prop:"con"}},[n("el-input",{attrs:{type:"textarea","auto-complete":"off",rows:"5"},model:{value:e.currentItem.con,callback:function(t){e.$set(e.currentItem,"con","string"==typeof t?t.trim():t)},expression:"currentItem.con"}})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.edithandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[n("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"60px",size:"small",rules:e.addRules,model:e.addList}},[n("el-form-item",{attrs:{label:"内容",prop:"con"}},[n("el-input",{attrs:{type:"textarea","auto-complete":"off",rows:"5"},model:{value:e.addList.con,callback:function(t){e.$set(e.addList,"con","string"==typeof t?t.trim():t)},expression:"addList.con"}})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(l,c,!1,function(e){n("cDAZ")},null,null);t.default=d.exports},cDAZ:function(e,t){}});