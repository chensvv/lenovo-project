webpackJsonp([19],{IEGq:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("gRE1"),s=n.n(i),a=n("pWbq"),o=n("krqS"),l=n("2hMI"),r={data:function(){return{list:[],perList:[],typeList:[],totalClass:"8",currentItem:{id:"",sentence:"",type:""},addList:{sentence:"",type:""},searchItem:{sentence:"",type:""},addRules:{sentence:[{required:!0,message:"请输入句式",trigger:"change"}],type:[{required:!0,message:"请输入类型",trigger:"change"}]},editRules:{sentence:[{required:!0,message:"请输入句式",trigger:"blur"}],type:[{required:!0,message:"请输入类型",trigger:"blur"}]},editVisible:!1,addVisible:!1,uploadVisible:!1,fileBtnLoading:!1,file:[],currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(s()(t).join())}),this.getList(),this.getTypeList()},mounted:function(){-1==this.perList.indexOf("nlu:sentence:update")&&-1==this.perList.indexOf("nlu:sentence:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,n=t.clientWidth,i=t.scrollWidth;this.showTitle=!(n<i)},formTime:function(e,t){var n=e.createTime,i=new Date(n);return i.getFullYear()+"-"+Object(a.a)(i.getMonth()+1)+"-"+Object(a.a)(i.getDate())+" "+Object(a.a)(i.getHours())+":"+Object(a.a)(i.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,sentence:t.sentence,type:t.type}},getTypeList:function(){var e=this;Object(l._97)({}).then(function(t){200==t.data.code&&(e.typeList=t.data.data)})},handleDel:function(e,t){var n=this,i={id:t.id,sign:this.$md5("id="+t.id)};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l._94)(i).then(function(e){200==e.data.code?(n.$message({message:"删除成功",type:"success",duration:1500}),n.getList()):n.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,n={id:this.currentItem.id,sentence:this.currentItem.sentence,type:this.currentItem.type};n.sign=Object(o.a)(n),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(l._98)(n).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1500}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,n={sentence:this.addList.sentence,type:this.addList.type,sign:this.$md5("appName="+this.addList.appName)};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(l._93)(n).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})},importExcel:function(){this.uploadVisible=!0},beforeUpload:function(e){},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.file=e.file},postFile:function(){var e=this;if(""==this.file)return this.$message.warning("请选择要上传的文件！"),!1;var t=this.file,n=new FormData;n.append("ex",t),this.fileBtnLoading=!0,Object(l._95)(n).then(function(t){e.fileBtnLoading=!1,200==t.data.code?(e.$message({message:t.data.msg,type:"success",duration:1500}),e.$refs.upload.clearFiles(),e.uploadVisible=!1,e.getList()):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(t){e.fileBtnLoading=!1})},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,sentence:this.searchItem.sentence,type:this.searchItem.type};t.sign=Object(o.a)(t),Object(l._96)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table height-85"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),n("el-breadcrumb-item",{attrs:{to:{path:"/nlu/word/list"}}},[e._v("词元句式管理")]),e._v(" "),n("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),n("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[n("div",{staticClass:"form-input height50"},[n("el-form-item",{attrs:{label:"类别",prop:"type"}},[n("el-select",{attrs:{placeholder:"--"},model:{value:e.searchItem.type,callback:function(t){e.$set(e.searchItem,"type",t)},expression:"searchItem.type"}},e._l(e.typeList,function(e,t){return n("el-option",{key:t,attrs:{label:e,value:e}})}),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"句式",prop:"sentence"}},[n("el-input",{attrs:{clearable:""},model:{value:e.searchItem.sentence,callback:function(t){e.$set(e.searchItem,"sentence","string"==typeof t?t.trim():t)},expression:"searchItem.sentence"}})],1)],1),e._v(" "),n("div",{staticClass:"form-btn"},[n("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:sentence:add",expression:"'nlu:sentence:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:sentence:import",expression:"'nlu:sentence:import'"}],attrs:{size:"mini",icon:"el-icon-upload"},on:{click:function(t){return e.importExcel()}}},[e._v("导入文件")])],1)]),e._v(" "),n("div",{staticClass:"table-box"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[n("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),n("el-table-column",{attrs:{label:"句式",prop:"sentence",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sentence,placement:"top"}},[n("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.sentence)+"\n                    ")])]),e._v(" "),e.showTitle?n("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.sentence)+"\n                ")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"类别",prop:"type",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.type,placement:"top"}},[n("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.type)+"\n                    ")])]),e._v(" "),e.showTitle?n("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.type)+"\n                ")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"130"}}),e._v(" "),e.isshow?n("el-table-column",{attrs:{label:"操作","min-width":"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:sentence:update",expression:"'nlu:sentence:update'"}],attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:sentence:delete",expression:"'nlu:sentence:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,3068628471)}):e._e()],1),e._v(" "),n("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[n("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[n("el-form-item",{attrs:{label:"类别",prop:"type"}},[n("el-select",{attrs:{placeholder:"--"},model:{value:e.currentItem.type,callback:function(t){e.$set(e.currentItem,"type",t)},expression:"currentItem.type"}},e._l(e.typeList,function(e,t){return n("el-option",{key:t,attrs:{label:e,value:e}})}),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"句式",prop:"sentence"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.sentence,callback:function(t){e.$set(e.currentItem,"sentence","string"==typeof t?t.trim():t)},expression:"currentItem.sentence"}})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[n("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[n("el-form-item",{attrs:{label:"类别",prop:"type"}},[n("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.type,callback:function(t){e.$set(e.addList,"type",t)},expression:"addList.type"}},e._l(e.typeList,function(e,t){return n("el-option",{key:t,attrs:{label:e,value:e}})}),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"句式",prop:"sentence"}},[n("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.sentence,callback:function(t){e.$set(e.addList,"sentence","string"==typeof t?t.trim():t)},expression:"addList.sentence"}})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{staticClass:"eldialog",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"上传文件",visible:e.uploadVisible,width:"40%",top:"10vh","before-close":e.closeFile},on:{"update:visible":function(t){e.uploadVisible=t}}},[n("el-form",{staticClass:"eldialogForm"},[n("el-form-item",{attrs:{label:""}},[n("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload,"http-request":e.uploadFile,"on-exceed":e.handleExceed2,limit:1,multiple:"",action:""}},[n("i",{staticClass:"el-icon-upload"}),e._v(" "),n("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),n("em",[e._v("点击上传")])]),e._v(" "),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传Excel文件，且每次只能上传一个文件")])])],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){return e.closeFile()}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading},on:{click:function(t){return e.postFile()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(r,c,!1,function(e){n("dotC")},"data-v-c8eb41be",null);t.default=d.exports},dotC:function(e,t){}});