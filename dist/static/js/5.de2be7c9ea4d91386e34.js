webpackJsonp([5],{"6Jqy":function(e,t){},"6QGq":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),s=a.n(i),n=a("bOdI"),l=a.n(n),o=a("pWbq"),r=a("2hMI"),c={data:function(){var e;return e={list:[],perList:[],currentItem:{id:"",answer:"",speak:""},addList:{speak:"",answer:""},searchItem:{excel:"",speak:""},addRules:{speak:[{required:!0,message:"请输入问题",trigger:"change"}],answer:[{required:!0,message:"请输入答案",trigger:"change"}]},editRules:{speak:[{required:!0,message:"请输入问题",trigger:"blur"}],answer:[{required:!0,message:"请输入答案",trigger:"blur"}]},editVisible:!1,addVisible:!1,uploadVisible:!1,fileBtnLoading:!1,uploadVisible2:!1,fileBtnLoading2:!1,file:[],file2:[],currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1},l()(e,"fileBtnLoading",!1),l()(e,"AIMLBtnLoading",!1),l()(e,"listLoading",!0),l()(e,"isshow",!0),l()(e,"btnshow",!0),e},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(s()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("user:data")&&(this.isshow=!1),-1==this.perList.indexOf("qa:update")&&-1==this.perList.indexOf("qa:del")&&(this.btnshow=!1)},methods:{formTime:function(e,t){var a=e.createTime,i=new Date(a);return i.getFullYear()+"-"+Object(o.a)(i.getMonth()+1)+"-"+Object(o.a)(i.getDate())+" "+Object(o.a)(i.getHours())+":"+Object(o.a)(i.getMinutes())},formTime2:function(e,t){var a=e.updateTime,i=new Date(a);return i.getFullYear()+"-"+Object(o.a)(i.getMonth()+1)+"-"+Object(o.a)(i.getDate())+" "+Object(o.a)(i.getHours())+":"+Object(o.a)(i.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},handleEdit:function(e,t){console.log(e,t),this.editVisible=!0,this.currentItem={id:t.id,answer:t.answer,speak:t.speak}},handleDel:function(e,t){var a=this,i={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r._41)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,q:this.currentItem.speak,a:this.currentItem.answer};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(r._45)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={q:this.addList.speak,a:this.addList.answer};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(r._45)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},importExcel:function(){this.uploadVisible=!0},customExcel:function(){this.uploadVisible2=!0},beforeUpload:function(e){var t="application/vnd.ms-excel"===e.type,a="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type;return t||a||this.$message.error("上传文件必须是Excel格式!"),t||a},beforeUpload2:function(e){var t="application/vnd.ms-excel"===e.type,a="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type;return t||a||this.$message.error("上传文件必须是Excel格式!"),t||a},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},handleExceed2:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.file=e.file},uploadFile2:function(e){this.file2=e.file},postFile:function(){var e=this,t=this.file,a=new FormData;a.append("ex",t),this.fileBtnLoading=!0,Object(r._46)(a).then(function(t){e.fileBtnLoading=!1,200==t.data.code?(e.$message({message:t.data.msg,type:"success"}),e.$refs.upload.clearFiles(),e.uploadVisible=!1,e.getList()):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.fileBtnLoading=!1})},postFile2:function(){var e=this,t=this.file2,a=new FormData;a.append("ex",t),this.fileBtnLoading2=!0,Object(r._42)(a).then(function(t){e.fileBtnLoading2=!1,200==t.data.code?(e.$message({message:t.data.msg,type:"success"}),e.$refs.upload2.clearFiles(),e.uploadVisible2=!1,e.getList()):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.fileBtnLoading2=!1})},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},closeFile2:function(){this.$refs.upload2.clearFiles(),this.uploadVisible2=!1},buildAIML:function(){var e=this;this.AIMLBtnLoading=!0,Object(r._44)().then(function(t){e.AIMLBtnLoading=!1,200==t.data.code?e.$message({message:t.data.msg,type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.AIMLBtnLoading=!1})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.speak,ex:this.searchItem.excel};Object(r._43)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.speak,callback:function(t){e.$set(e.searchItem,"speak","string"==typeof t?t.trim():t)},expression:"searchItem.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属excel文件",prop:"excel"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.excel,callback:function(t){e.$set(e.searchItem,"excel","string"==typeof t?t.trim():t)},expression:"searchItem.excel"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:pub",expression:"'qa:pub'"}],staticClass:"success",attrs:{size:"mini",loading:e.AIMLBtnLoading},on:{click:function(t){return e.buildAIML()}}},[e._v("生成AIML")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:save",expression:"'qa:save'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:excel",expression:"'qa:excel'"}],staticClass:"success",attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.importExcel()}}},[e._v("导入Excel文件")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:excel",expression:"'qa:excel'"}],staticClass:"success",attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.customExcel()}}},[e._v("导入自定义Excel文件")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"问题",prop:"speak",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"答案",prop:"answer",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"所属excel文件",prop:"excel",align:"center","show-overflow-tooltip":!0}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"状态",prop:"status",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{directives:[{name:"has",rawName:"v-has",value:"user:data",expression:"'user:data'"}]},[e._v(e._s(0==t.row.status?"已审批":1==t.row.status?"未审批":2==t.row.status?"申请拒绝":""))])]}}],null,!1,2807680840)}):e._e(),e._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:e.formTime2,"min-width":"120"}}),e._v(" "),e.btnshow?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:update",expression:"'qa:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:del",expression:"'qa:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1179343799)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.speak,callback:function(t){e.$set(e.currentItem,"speak","string"==typeof t?t.trim():t)},expression:"currentItem.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案",prop:"answer"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.answer,callback:function(t){e.$set(e.currentItem,"answer","string"==typeof t?t.trim():t)},expression:"currentItem.answer"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.speak,callback:function(t){e.$set(e.addList,"speak","string"==typeof t?t.trim():t)},expression:"addList.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案",prop:"answer"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.answer,callback:function(t){e.$set(e.addList,"answer","string"==typeof t?t.trim():t)},expression:"addList.answer"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"eldialog",attrs:{title:"上传文件",visible:e.uploadVisible,width:"200","before-close":e.closeFile},on:{"update:visible":function(t){e.uploadVisible=t}}},[a("el-form",{staticClass:"eldialogForm"},[a("el-form-item",{attrs:{label:""}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload,"on-exceed":e.handleExceed,limit:1,"http-request":e.uploadFile,multiple:"",action:""}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.closeFile()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading},on:{click:function(t){return e.postFile()}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"eldialog",attrs:{title:"上传文件",visible:e.uploadVisible2,width:"200","before-close":e.closeFile2},on:{"update:visible":function(t){e.uploadVisible2=t}}},[a("el-form",{staticClass:"eldialogForm"},[a("el-form-item",{attrs:{label:""}},[a("el-upload",{ref:"upload2",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload2,"on-exceed":e.handleExceed2,limit:1,"http-request":e.uploadFile2,multiple:"",action:""}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.closeFile2()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading2},on:{click:function(t){return e.postFile2()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(c,d,!1,function(e){a("6Jqy")},"data-v-e015668c",null);t.default=u.exports},"9bBU":function(e,t,a){a("mClu");var i=a("FeBl").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var i,s=a("C4MV"),n=(i=s)&&i.__esModule?i:{default:i};t.default=function(e,t,a){return t in e?(0,n.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},mClu:function(e,t,a){var i=a("kM2E");i(i.S+i.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})}});