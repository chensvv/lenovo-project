webpackJsonp([34],{FDUa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("gRE1"),i=a.n(n),r=a("pWbq"),s=a("2hMI"),o={data:function(){return{list:[],perList:[],infoList:[],phoneList:[],grayList:[],totalClass:"",addItem:{name:"",context:""},currentItem:{grayId:"",name:"",context:""},addRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],context:[{required:!0,message:"请输入内容",trigger:"blur"}]},editRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],context:[{required:!0,message:"请输入内容",trigger:"blur"}]},addVisible:!1,addBtnLoading:!1,editVisible:!1,editBtnLoading:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("gray:updGray")&&-1==this.perList.indexOf("gray:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,n=t.scrollWidth;this.showTitle=!(a<n)},formTime:function(e,t){var a=e.createTime,n=new Date(a);return n.getFullYear()+"-"+Object(r.a)(n.getMonth()+1)+"-"+Object(r.a)(n.getDate())+" "+Object(r.a)(n.getHours())+":"+Object(r.a)(n.getMinutes())},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={grayId:t.grayId,name:t.name,context:t.currentContext}},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},handleAddGray:function(){this.addVisible=!0},addHandleClose:function(){this.addVisible=!1},addHandleConfirm:function(e){var t=this,a={name:this.addItem.name,currentContext:this.addItem.context};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(s._20)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"新增成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},handleDel:function(e,t){var a=this,n={grayId:t.grayId};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.W)(n).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},editHandleConfirm:function(e){var t=this,a={grayId:this.currentItem.grayId,name:this.currentItem.name,currentContext:this.currentItem.context};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(s._148)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize};Object(s._55)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/showmode/conf"}}},[e._v("资源发布")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",staticStyle:{float:"right"},attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-btn"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gray:add",expression:"'gray:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAddGray()}}},[e._v("新增灰度")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"名称",prop:"name",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"内容",prop:"currentContext",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.currentContext,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.currentContext)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.currentContext)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"发布时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"left","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gray:updGray",expression:"'gray:updGray'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gray:delete",expression:"'gray:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,3059478615)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"新增灰度",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},close:function(t){return e.openFun("addItem")}}},[a("el-form",{ref:"addItem",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addItem}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addItem.name,callback:function(t){e.$set(e.addItem,"name","string"==typeof t?t.trim():t)},expression:"addItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"内容",prop:"context"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addItem.context,callback:function(t){e.$set(e.addItem,"context","string"==typeof t?t.trim():t)},expression:"addItem.context"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"100px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{type:"text",readonly:"","auto-complete":"off"},model:{value:e.currentItem.name,callback:function(t){e.$set(e.currentItem,"name",t)},expression:"currentItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"内容",prop:"context"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.context,callback:function(t){e.$set(e.currentItem,"context",t)},expression:"currentItem.context"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(o,l,!1,function(e){a("a6Dr")},"data-v-7cd11200",null);t.default=d.exports},a6Dr:function(e,t){}});