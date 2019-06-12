webpackJsonp([26],{"28nI":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("D7x1"),l=s("4/BI"),a={name:"applicationlist",components:{iTable:i.a},data:function(){var e=this;return{list:[],currentItem:{classnames:"",ruleDes:""},addList:{ruleDes:"",classnames:""},searchItem:{inc:"",ruleDes:""},columns:[{prop:"index",label:"序号",align:"center",width:100,hasSort:!0},{prop:"ruleDes",label:"问题",align:"left",hasSort:!0},{prop:"classnames",label:"答案",align:"left",hasSort:!0},{prop:"inc",label:"所属excel文件",align:"center",hasSort:!0},{prop:"refreshTime",label:"更新/入库时间",align:"center",hasSort:!0,render:function(e,t){var s=parseInt(t.row.refreshTime);return e("span",Object(l.a)(new Date(s),"yyyy-MM-dd hh:mm"))}}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:150,show:!1,list:[{id:"1",label:"编辑",show:!0,plain:!0,disabled:!1,method:function(t,s){e.handleEdit(t,s)}},{id:"2",label:"删除",type:"danger",show:!0,plain:!1,disabled:!1,method:function(t,s){e.handleDel(t,s)}}]},addRules:{ruleDes:[{required:!0,message:"请输入问题",trigger:"blur"}],classnames:[{required:!0,message:"请输入答案",trigger:"blur"}]},editRules:{ruleDes:[{required:!0,message:"请输入问题",trigger:"blur"}],classnames:[{required:!0,message:"请输入答案",trigger:"blur"}]},editVisible:!1,addVisible:!1,uploadVisible:!1,uploading:!1,file:[],currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields()},onSubmit:function(){console.log(this.searchItem)},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e)},handleEdit:function(e,t){console.log(e,t),this.editVisible=!0,this.currentItem={classnames:t.classnames,ruleDes:t.ruleDes}},handleDel:function(e,t){var s=this;console.log(t.id),console.log(e),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.list.splice(e,1)}).catch(function(){console.log("no")})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.currentItem),t.editVisible=!1})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.addList),t.addVisible=!1})},importExcel:function(){this.uploadVisible=!0},beforeUpload:function(e){var t="application/vnd.ms-excel"===e.type,s="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type;return t||s||this.$message.error("上传文件必须是Excel格式!"),t||s},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.file=e.file},postFile:function(){var e=this,t=this.file,s=new FormData;s.append("file",t);this.uploading=!0,this.$http.post("/url",{"Content-Type":"multipart/form-data"},s).then(function(t){200===t.data.code?(e.$message.success(t.data.msg),e.$refs.upload.clearFiles(),e.uploadVisible=!1):e.$message.error(t.data.msg)}),setTimeout(function(){this.uploadVisible=!1},1500)},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},getList:function(){var e=this;this.$http.get("/api/data").then(function(t){e.list=t.data,t.data.forEach(function(t){t.index=t.id%e.pageSize,0==t.index&&(t.index=e.pageSize)}),e.totalCount=e.list.length,e.options.loading=!1})}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",[e._v("数据管理")]),e._v(" "),e._l(e.$route.meta,function(t,i){return s("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[s("el-form-item",{attrs:{label:"问题",prop:"ruleDes"}},[s("el-input",{model:{value:e.searchItem.ruleDes,callback:function(t){e.$set(e.searchItem,"ruleDes",t)},expression:"searchItem.ruleDes"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"所属excel文件",prop:"inc"}},[s("el-input",{model:{value:e.searchItem.inc,callback:function(t){e.$set(e.searchItem,"inc",t)},expression:"searchItem.inc"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),s("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.buildAIML()}}},[e._v("生成AIML")]),e._v(" "),s("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),s("el-button",{staticClass:"success",attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.importExcel()}}},[e._v("导入Excel文件")])],1),e._v(" "),s("div",{staticClass:"table-box"},[s("i-table",{attrs:{list:e.list.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[s("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[s("el-form-item",{attrs:{label:"问题",prop:"ruleDes"}},[s("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.ruleDes,callback:function(t){e.$set(e.currentItem,"ruleDes",t)},expression:"currentItem.ruleDes"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"答案",prop:"classnames"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.classnames,callback:function(t){e.$set(e.currentItem,"classnames",t)},expression:"currentItem.classnames"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[s("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[s("el-form-item",{attrs:{label:"问题",prop:"ruleDes"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.ruleDes,callback:function(t){e.$set(e.addList,"ruleDes",t)},expression:"addList.ruleDes"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"答案",prop:"classnames"}},[s("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.classnames,callback:function(t){e.$set(e.addList,"classnames",t)},expression:"addList.classnames"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{staticClass:"eldialog",attrs:{title:"上传文件",visible:e.uploadVisible,width:"200","before-close":e.closeFile},on:{"update:visible":function(t){e.uploadVisible=t}}},[s("el-form",{ref:"addForm",staticClass:"eldialogForm",attrs:{id:"addForm"}},[s("el-form-item",{attrs:{label:""}},[s("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload,"on-exceed":e.handleExceed,limit:1,"http-request":e.uploadFile,multiple:"",action:""}},[s("i",{staticClass:"el-icon-upload"}),e._v(" "),s("div",{staticClass:"el-upload__text"},[e._v("\n                将文件拖到此处，或\n                "),s("em",[e._v("点击上传")])]),e._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){return e.closeFile()}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",disabled:e.uploading},on:{click:function(t){return e.postFile()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=s("VU/8")(a,n,!1,function(e){s("cBXp")},"data-v-01cb4046",null);t.default=o.exports},cBXp:function(e,t){}});