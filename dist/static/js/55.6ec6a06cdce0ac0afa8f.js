webpackJsonp([55],{"2wez":function(t,e){},i5cX:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),n=a.n(i),s=a("pWbq"),r=a("2hMI"),o={data:function(){return{list:[],perList:[],totalClass:"",currentItem:{id:"",q:""},addList:{q:""},searchItem:{q:""},addRules:{q:[{required:!0,message:"请输入数据名称",trigger:"change"}]},editRules:{q:[{required:!0,message:"请输入数据名称",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(n()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("qa:channelUpdate")&&-1==this.perList.indexOf("qa:channelDel")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,i=e.scrollWidth;this.showTitle=!(a<i)},formTime:function(t,e){var a=t.updateTime,i=new Date(a);return i.getFullYear()+"-"+Object(s.a)(i.getMonth()+1)+"-"+Object(s.a)(i.getDate())+" "+Object(s.a)(i.getHours())+":"+Object(s.a)(i.getMinutes())},formTime2:function(t,e){var a=t.createTime,i=new Date(a);return i.getFullYear()+"-"+Object(s.a)(i.getMonth()+1)+"-"+Object(s.a)(i.getDate())+" "+Object(s.a)(i.getHours())+":"+Object(s.a)(i.getMinutes())},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleEdit:function(t,e){this.editVisible=!0,this.currentItem={id:e.id,q:e.dataValue}},handleDel:function(t,e){var a=this,i={id:e.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r.F)(i).then(function(t){200==t.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:t.data.errorMessage,type:"error",duration:1e3})})}).catch(function(t){console.log(t)})},openFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].resetFields()})},closeFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(t){var e=this,a={id:this.currentItem.id,q:this.currentItem.q};this.$refs[t].validate(function(t){if(!t)return!1;e.editBtnLoading=!0,Object(r.H)(a).then(function(t){e.editBtnLoading=!1,200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:1e3}),e.getList(),e.editVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(t){var e=this,a={q:this.addList.q};this.$refs[t].validate(function(t){if(!t)return!1;e.addBtnLoading=!0,Object(r.E)(a).then(function(t){e.addBtnLoading=!1,200==t.data.code?(e.$message({message:"添加成功",type:"success",duration:1e3}),e.getList(),e.addVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.addBtnLoading=!1})})},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.q};Object(r.G)(e).then(function(e){t.listLoading=!1,200==e.data.code&&(t.list=e.data.data.data,t.totalCount=e.data.data.total,t.totalClass=e.data.data.data.length)}).catch(function(){t.listLoading=!1})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v("规则定义")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"中文名称",prop:"q"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.q,callback:function(e){t.$set(t.searchItem,"q","string"==typeof e?e.trim():e)},expression:"searchItem.q"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:channelAdd",expression:"'qa:channelAdd'"}],attrs:{size:"mini"},on:{click:function(e){return t.handleAdd()}}},[t._v("添加")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),t._v(" "),a("el-table-column",{attrs:{label:"数据名称",prop:"dataValue",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.dataValue,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.dataValue)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.dataValue)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"数据拼音",prop:"dataPinyin",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.dataPinyin,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.dataPinyin)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.dataPinyin)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:t.formTime2,"min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:t.formTime,"min-width":"120"}}),t._v(" "),t.isshow?a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:channelUpdate",expression:"'qa:channelUpdate'"}],attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:channelDel",expression:"'qa:channelDel'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}],null,!1,3488345815)}):t._e()],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1),t._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"40%",top:"10vh","before-close":t.editHandleClose},on:{"update:visible":function(e){t.editVisible=e},close:function(e){return t.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:t.editRules,model:t.currentItem}},[a("el-form-item",{attrs:{label:"数据名称",prop:"q"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.q,callback:function(e){t.$set(t.currentItem,"q","string"==typeof e?e.trim():e)},expression:"currentItem.q"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.editHandleClose}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.editBtnLoading},on:{click:function(e){return t.editHandleConfirm("currentItem")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"新增",visible:t.addVisible,width:"40%",top:"10vh","before-close":t.addHandleClose},on:{"update:visible":function(e){t.addVisible=e},open:function(e){return t.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:t.addRules,model:t.addList}},[a("el-form-item",{attrs:{label:"数据名称",prop:"q"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.q,callback:function(e){t.$set(t.addList,"q","string"==typeof e?e.trim():e)},expression:"addList.q"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.addHandleClose}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(o,l,!1,function(t){a("2wez")},"data-v-4c3fe79c",null);e.default=d.exports}});