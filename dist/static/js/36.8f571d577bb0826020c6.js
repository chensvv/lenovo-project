webpackJsonp([36],{"2NXm":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("pWbq"),n=a("WBHA"),s=a.n(n),r=a("iGF/"),o={components:{countTo:s.a},data:function(){return{startVal:0,endVal:0,list:[],searchItem:{user:"",con:""},infoList:{username:"",speak:"",answer:"",type:"",createTime:"",updateTime:"",taskid:""},currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,btnLoading:!1,infoVisible:!1,listLoading:!0}},created:function(){},methods:{formTime:function(e,t){var a=e.createTime,n=new Date(a);return n.getFullYear()+"-"+Object(i.a)(n.getMonth()+1)+"-"+Object(i.a)(n.getDate())+" "+Object(i.a)(n.getHours())+":"+Object(i.a)(n.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.btnLoading=!0,this.currentPage=1,this.getList(),this.btnLoading=!1},rowClick:function(e,t){this.infoVisible=!0,this.infoList={username:t.username,speak:t.speak,answer:t.answer,type:t.type,createTime:new Date(t.createTime).getFullYear()+"-"+Object(i.a)(new Date(t.createTime).getMonth()+1)+"-"+Object(i.a)(new Date(t.createTime).getDate())+" "+Object(i.a)(new Date(t.createTime).getHours())+":"+Object(i.a)(new Date(t.createTime).getMinutes()),updateTime:new Date(t.updateTime).getFullYear()+"-"+Object(i.a)(new Date(t.updateTime).getMonth()+1)+"-"+Object(i.a)(new Date(t.updateTime).getDate())+" "+Object(i.a)(new Date(t.updateTime).getHours())+":"+Object(i.a)(new Date(t.updateTime).getMinutes()),taskid:t.taskid}},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleClose:function(){this.infoVisible=!1},handleConfirm:function(){this.infoVisible=!1},handlePass:function(){var e=this,t={id:this.infoList.taskid,status:0};Object(r.b)(t).then(function(t){200==t.data.code?e.$message({message:"审核通过",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){})},handleBack:function(){var e=this,t={id:this.infoList.taskid,status:2,speak:this.infoList.speak};Object(r.b)(t).then(function(t){200==t.data.code?e.$message({message:"已退回",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,username:this.searchItem.user,speak:this.searchItem.con};Object(r.a)(t).then(function(t){e.listLoading=!1,e.list=t.data.rows,e.totalCount=t.data.total})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"index"},[a("div",{directives:[{name:"has",rawName:"v-has",value:"user:user",expression:"'user:user'"}],staticClass:"workflow"},[a("el-form",{ref:"searchItem",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"内容",prop:"con"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.con,callback:function(t){e.$set(e.searchItem,"con","string"==typeof t?t.trim():t)},expression:"searchItem.con"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"发起人",prop:"user"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.user,callback:function(t){e.$set(e.searchItem,"user","string"==typeof t?t.trim():t)},expression:"searchItem.user"}})],1),e._v(" "),a("el-form-item",{staticClass:"work"},[a("el-button",{attrs:{type:"primary",size:"mini",loading:e.btnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{label:"ID",prop:"id",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"发起人",prop:"username",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"简要内容",prop:"speak",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:e.formTime}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.rowClick(t.$index,t.row)}}},[e._v("详情")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"详情",visible:e.infoVisible,width:"300","before-close":e.handleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[a("el-form",{attrs:{"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"用户名称"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.username,callback:function(t){e.$set(e.infoList,"username",t)},expression:"infoList.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"说法"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.speak,callback:function(t){e.$set(e.infoList,"speak",t)},expression:"infoList.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.answer,callback:function(t){e.$set(e.infoList,"answer",t)},expression:"infoList.answer"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属excel文件"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.excel,callback:function(t){e.$set(e.infoList,"excel",t)},expression:"infoList.excel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"操作类型"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.type,callback:function(t){e.$set(e.infoList,"type",t)},expression:"infoList.type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.createTime,callback:function(t){e.$set(e.infoList,"createTime",t)},expression:"infoList.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"修改时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.updateTime,callback:function(t){e.$set(e.infoList,"updateTime",t)},expression:"infoList.updateTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"流程id"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.taskid,callback:function(t){e.$set(e.infoList,"taskid",t)},expression:"infoList.taskid"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handlePass()}}},[e._v("通过")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleBack()}}},[e._v("退回")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirm()}}},[e._v("关闭")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,l,!1,function(e){a("XcMH")},"data-v-402bd90e",null);t.default=c.exports},XcMH:function(e,t){}});