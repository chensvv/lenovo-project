webpackJsonp([4],{"9bBU":function(e,t,i){i("mClu");var a=i("FeBl").Object;e.exports=function(e,t,i){return a.defineProperty(e,t,i)}},C4MV:function(e,t,i){e.exports={default:i("9bBU"),__esModule:!0}},RORP:function(e,t){},Xi1I:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),n=i.n(a),s=i("bOdI"),r=i.n(s),o=i("pWbq"),l=i("2hMI"),u={data:function(){var e;return e={list:[],perList:[],currentItem:{id:"",answer:"",question:""},addList:{question:"",answer:""},searchItem:{excel:"",question:""},addRules:{question:[{required:!0,message:"请输入问题",trigger:"change"}],answer:[{required:!0,message:"请输入答案",trigger:"change"}]},editRules:{question:[{required:!0,message:"请输入问题",trigger:"blur"}],answer:[{required:!0,message:"请输入答案",trigger:"blur"}]},editVisible:!1,addVisible:!1,uploadVisible:!1,fileBtnLoading:!1,file:[],currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1},r()(e,"fileBtnLoading",!1),r()(e,"AIMLBtnLoading",!1),r()(e,"listLoading",!0),r()(e,"isshow",!0),r()(e,"btnshow",!0),e},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("user:data")&&(this.isshow=!1),-1==this.perList.indexOf("item:save")&&-1==this.perList.indexOf("item:del")&&(this.btnshow=!1)},methods:{formTime:function(e,t){var i=e.it,a=new Date(i);return a.getFullYear()+"-"+Object(o.a)(a.getMonth()+1)+"-"+Object(o.a)(a.getDate())+" "+Object(o.a)(a.getHours())+":"+Object(o.a)(a.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,answer:t.answer,question:t.question}},handleDel:function(e,t){var i=this,a={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l._13)(a).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,q:this.currentItem.question,a:this.currentItem.answer};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(l._16)(i).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,i={q:this.addList.question,a:this.addList.answer};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(l._16)(i).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},importExcel:function(){this.uploadVisible=!0},customExcel:function(){this.uploadVisible2=!0},beforeUpload:function(e){var t="xls"===e.name.split(".")[1],i="xlsx"===e.name.split(".")[1];return t||i?t||i:(this.$message.warning("上传文件必须是Excel格式!"),!1)},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.file=e.file},postFile:function(){var e=this;if(""==this.file)return this.$message.warning("请选择要上传的文件！"),!1;var t=this.file,i=new FormData;i.append("ex",t),this.fileBtnLoading=!0,Object(l._17)(i).then(function(t){e.fileBtnLoading=!1,200==t.data.code?(e.$message({message:t.data.msg,type:"success"}),e.$refs.upload.clearFiles(),e.uploadVisible=!1,e.getList()):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.fileBtnLoading=!1})},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},buildAIML:function(){var e=this;this.AIMLBtnLoading=!0,Object(l._15)().then(function(t){e.AIMLBtnLoading=!1,200==t.data.code?e.$message({message:t.data.msg,type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.AIMLBtnLoading=!1})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.question,ex:this.searchItem.excel};Object(l._14)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("说法配置")]),e._v(" "),e._l(e.$route.meta,function(t,a){return i("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[i("el-form-item",{attrs:{label:"问题",prop:"question"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.question,callback:function(t){e.$set(e.searchItem,"question","string"==typeof t?t.trim():t)},expression:"searchItem.question"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"所属excel文件",prop:"excel"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.excel,callback:function(t){e.$set(e.searchItem,"excel","string"==typeof t?t.trim():t)},expression:"searchItem.excel"}})],1),e._v(" "),i("el-form-item",{staticClass:"sub-btn"},[i("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"item:pub",expression:"'item:pub'"}],attrs:{size:"mini",loading:e.AIMLBtnLoading},on:{click:function(t){return e.buildAIML()}}},[e._v("生成AIML")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"item:save",expression:"'item:save'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"item:excel",expression:"'item:excel'"}],attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.importExcel()}}},[e._v("导入Excel文件")])],1)],1),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalCount<5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"问题",prop:"question",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"答案",prop:"answer",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"所属excel文件",prop:"excel",align:"center","show-overflow-tooltip":!0}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"状态",prop:"status",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{directives:[{name:"has",rawName:"v-has",value:"user:data",expression:"'user:data'"}]},[e._v(e._s(0==t.row.status?"已审批":1==t.row.status?"未审批":2==t.row.status?"申请拒绝":""))])]}}],null,!1,2807680840)}):e._e(),e._v(" "),i("el-table-column",{attrs:{label:"添加时间",prop:"it",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.btnshow?i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"item:save",expression:"'item:save'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"item:del",expression:"'item:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,2761368279)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[i("el-form-item",{attrs:{label:"问题",prop:"question"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.question,callback:function(t){e.$set(e.currentItem,"question","string"==typeof t?t.trim():t)},expression:"currentItem.question"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"答案",prop:"answer"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.answer,callback:function(t){e.$set(e.currentItem,"answer","string"==typeof t?t.trim():t)},expression:"currentItem.answer"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[i("el-form-item",{attrs:{label:"问题",prop:"question"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.question,callback:function(t){e.$set(e.addList,"question","string"==typeof t?t.trim():t)},expression:"addList.question"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"答案",prop:"answer"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.answer,callback:function(t){e.$set(e.addList,"answer","string"==typeof t?t.trim():t)},expression:"addList.answer"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{staticClass:"eldialog",attrs:{title:"上传文件",visible:e.uploadVisible,width:"200","before-close":e.closeFile},on:{"update:visible":function(t){e.uploadVisible=t}}},[i("el-form",{staticClass:"eldialogForm"},[i("el-form-item",{attrs:{label:""}},[i("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload,"on-exceed":e.handleExceed,limit:1,"http-request":e.uploadFile,multiple:"",action:""}},[i("i",{staticClass:"el-icon-upload"}),e._v(" "),i("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),i("em",[e._v("点击上传")])]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){return e.closeFile()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading},on:{click:function(t){return e.postFile()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(u,d,!1,function(e){i("RORP")},"data-v-b678173c",null);t.default=c.exports},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var a,n=i("C4MV"),s=(a=n)&&a.__esModule?a:{default:a};t.default=function(e,t,i){return t in e?(0,s.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},mClu:function(e,t,i){var a=i("kM2E");a(a.S+a.F*!i("+E39"),"Object",{defineProperty:i("evD5").f})}});