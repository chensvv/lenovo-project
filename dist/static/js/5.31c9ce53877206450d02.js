webpackJsonp([5],{"6QGq":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("bOdI"),s=i.n(a),n=i("D7x1"),l=i("pWbq"),o=i("2hMI"),r={name:"applicationlist",components:{iTable:n.a},data:function(){var e;return e={aimlInfo:"",list:[],currentItem:{id:"",answer:"",question:""},addList:{question:"",answer:""},searchItem:{excel:"",question:""},addRules:{question:[{required:!0,message:"请输入问题",trigger:"change"}],answer:[{required:!0,message:"请输入答案",trigger:"change"}]},editRules:{question:[{required:!0,message:"请输入问题",trigger:"blur"}],answer:[{required:!0,message:"请输入答案",trigger:"blur"}]},editVisible:!1,addVisible:!1,uploadVisible:!1,fileBtnLoading:!1,uploadVisible2:!1,fileBtnLoading2:!1,file:[],file2:[],currentPage:1,pageSize:30,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1},s()(e,"fileBtnLoading",!1),s()(e,"AIMLBtnLoading",!1),s()(e,"AIMLVisible",!1),e},created:function(){this.getList()},methods:{formTime:function(e,t){var i=e.it,a=new Date(i);return a.getFullYear()+"-"+Object(l.a)(a.getMonth()+1)+"-"+Object(l.a)(a.getDate())+" "+Object(l.a)(a.getMonth())+":"+Object(l.a)(a.getMinutes())+":"+Object(l.a)(a.getSeconds())},resetForm:function(e){this.$refs[e].resetFields(),this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,answer:t.answer,question:t.question}},handleDel:function(e,t){var i=this,a={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.Z)(a).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(){})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,q:this.currentItem.question,a:this.currentItem.answer};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._3)(i).then(function(e){200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editBtnLoading=!1,t.editVisible=!1):(t.editBtnLoading=!1,t.$message({message:e.data.errorMessage,type:"error",duration:1e3}))})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,i={q:this.addList.question,a:this.addList.answer};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._3)(i).then(function(e){200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addBtnLoading=!1,t.addVisible=!1):(t.addBtnLoading=!1,t.$message({message:e.data.errorMessage,type:"error",duration:1e3}))})})},importExcel:function(){this.uploadVisible=!0},customExcel:function(){this.uploadVisible2=!0},beforeUpload:function(e){var t="application/vnd.ms-excel"===e.type,i="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type;return t||i||this.$message.error("上传文件必须是Excel格式!"),t||i},beforeUpload2:function(e){var t="application/vnd.ms-excel"===e.type,i="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type;return t||i||this.$message.error("上传文件必须是Excel格式!"),t||i},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},handleExceed2:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.file=e.file},uploadFile2:function(e){this.file2=e.file},postFile:function(){var e=this,t=this.file,i=new FormData;i.append("ex",t),this.fileBtnLoading=!0,Object(o._4)(i).then(function(t){200==t.data.code?(e.$message({message:"上传成功",type:"success",duration:1e3}),e.$refs.upload.clearFiles(),e.fileBtnLoading=!1,e.uploadVisible=!1,e.getList()):(e.fileBtnLoading=!1,e.$message({message:t.data.errorMessage,type:"error",duration:1e3}))})},postFile2:function(){var e=this,t=this.file2,i=new FormData;i.append("ex",t),this.fileBtnLoading2=!0,Object(o._0)(i).then(function(t){200==t.data.code?(e.$message({message:"上传成功",type:"success",duration:1e3}),e.$refs.upload2.clearFiles(),e.fileBtnLoading2=!1,e.uploadVisible2=!1,e.getList()):(e.fileBtnLoading2=!1,e.$message({message:t.data.errorMessage,type:"error",duration:1e3}))})},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},closeFile2:function(){this.$refs.upload2.clearFiles(),this.uploadVisible2=!1},buildAIML:function(){var e=this;Object(o._2)().then(function(t){e.aimlInfo=t.data.data.aiml,200==t.data.code?(e.$message({message:t.data.msg,type:"success",duration:1e3}),e.AIMLBtnLoading=!1,setTimeout(function(){e.AIMLVisible=!0},1e3)):(e.AIMLBtnLoading=!1,e.$message({message:t.data.errorMessage,type:"error",duration:1e3}))})},AINLBtn:function(){this.AIMLVisible=!1},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.question,ex:this.searchItem.excel};Object(o._1)(t).then(function(t){e.list=t.data.data,e.totalCount=t.data.count})}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),e._l(e.$route.meta,function(t,a){return i("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[i("el-form-item",{attrs:{label:"问题",prop:"question"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.question,callback:function(t){e.$set(e.searchItem,"question","string"==typeof t?t.trim():t)},expression:"searchItem.question"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"所属excel文件",prop:"excel"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.excel,callback:function(t){e.$set(e.searchItem,"excel","string"==typeof t?t.trim():t)},expression:"searchItem.excel"}})],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:46,expression:"46"}],staticClass:"success",attrs:{size:"mini",loading:e.AIMLBtnLoading},on:{click:function(t){return e.buildAIML()}}},[e._v("生成AIML")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:44,expression:"44"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:47,expression:"47"}],staticClass:"success",attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.importExcel()}}},[e._v("导入Excel文件")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:47,expression:"47"}],staticClass:"success",attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.customExcel()}}},[e._v("导入自定义Excel文件")])],1),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"问题",prop:"question",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"答案",prop:"answer",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"所属excel文件",prop:"excel",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"更新时间",prop:"it",align:"center",formatter:e.formTime}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:113,expression:"113"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:45,expression:"45"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[i("el-form-item",{attrs:{label:"问题",prop:"question"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.question,callback:function(t){e.$set(e.currentItem,"question","string"==typeof t?t.trim():t)},expression:"currentItem.question"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"答案",prop:"answer"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.answer,callback:function(t){e.$set(e.currentItem,"answer","string"==typeof t?t.trim():t)},expression:"currentItem.answer"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[i("el-form-item",{attrs:{label:"问题",prop:"question"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.question,callback:function(t){e.$set(e.addList,"question","string"==typeof t?t.trim():t)},expression:"addList.question"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"答案",prop:"answer"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.answer,callback:function(t){e.$set(e.addList,"answer","string"==typeof t?t.trim():t)},expression:"addList.answer"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{staticClass:"eldialog",attrs:{title:"上传文件",visible:e.uploadVisible,width:"200","before-close":e.closeFile},on:{"update:visible":function(t){e.uploadVisible=t}}},[i("el-form",{staticClass:"eldialogForm"},[i("el-form-item",{attrs:{label:""}},[i("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload,"on-exceed":e.handleExceed,limit:1,"http-request":e.uploadFile,multiple:"",action:""}},[i("i",{staticClass:"el-icon-upload"}),e._v(" "),i("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),i("em",[e._v("点击上传")])]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){return e.closeFile()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading},on:{click:function(t){return e.postFile()}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{staticClass:"eldialog",attrs:{title:"上传文件",visible:e.uploadVisible2,width:"200","before-close":e.closeFile2},on:{"update:visible":function(t){e.uploadVisible2=t}}},[i("el-form",{staticClass:"eldialogForm"},[i("el-form-item",{attrs:{label:""}},[i("el-upload",{ref:"upload2",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload2,"on-exceed":e.handleExceed2,limit:1,"http-request":e.uploadFile2,multiple:"",action:""}},[i("i",{staticClass:"el-icon-upload"}),e._v(" "),i("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),i("em",[e._v("点击上传")])]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){return e.closeFile2()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading2},on:{click:function(t){return e.postFile2()}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{staticClass:"eldialog",attrs:{title:"AIML",visible:e.AIMLVisible,width:"300"},on:{"update:visible":function(t){e.AIMLVisible=t}}},[i("el-form",{attrs:{"label-position":"left","label-width":"50px"}},[i("el-form-item",{staticClass:"aiml_text",attrs:{label:"AIML:"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.aimlInfo,callback:function(t){e.aimlInfo=t},expression:"aimlInfo"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.AINLBtn()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(r,c,!1,function(e){i("IDOM")},"data-v-49eea801",null);t.default=d.exports},"9bBU":function(e,t,i){i("mClu");var a=i("FeBl").Object;e.exports=function(e,t,i){return a.defineProperty(e,t,i)}},C4MV:function(e,t,i){e.exports={default:i("9bBU"),__esModule:!0}},IDOM:function(e,t){},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var a,s=i("C4MV"),n=(a=s)&&a.__esModule?a:{default:a};t.default=function(e,t,i){return t in e?(0,n.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},mClu:function(e,t,i){var a=i("kM2E");a(a.S+a.F*!i("+E39"),"Object",{defineProperty:i("evD5").f})}});