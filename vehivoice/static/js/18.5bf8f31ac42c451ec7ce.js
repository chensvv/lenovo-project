webpackJsonp([18],{"3eMI":function(e,t){},"6QGq":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("gRE1"),i=a.n(s),n=a("pWbq"),o=a("2hMI"),l=a("iGF/"),r=a("krqS"),c=a("7oYi"),d={data:function(){return{getpageNum:c.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",answer:"",speak:""},addList:{speak:"",answer:""},searchItem:{excel:"",speak:"",answer:"",status:""},addRules:{speak:[{required:!0,message:"请输入问题",trigger:"change"}],answer:[{required:!0,message:"请输入答案",trigger:"change"}]},editRules:{speak:[{required:!0,message:"请输入问题",trigger:"blur"}],answer:[{required:!0,message:"请输入答案",trigger:"blur"}]},editVisible:!1,addVisible:!1,uploadVisible:!1,fileBtnLoading:!1,uploadVisible2:!1,fileBtnLoading2:!1,file:[],file2:[],currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,AIMLBtnLoading:!1,listLoading:!0,btnshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("qa:update")&&-1==this.perList.indexOf("qa:del")&&(this.btnshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,s=t.scrollWidth;this.showTitle=!(a<s)},formTime:function(e,t){var a=e.createTime,s=new Date(a);return s.getFullYear()+"-"+Object(n.a)(s.getMonth()+1)+"-"+Object(n.a)(s.getDate())+" "+Object(n.a)(s.getHours())+":"+Object(n.a)(s.getMinutes())},formTime2:function(e,t){var a=e.updateTime,s=new Date(a);return s.getFullYear()+"-"+Object(n.a)(s.getMonth()+1)+"-"+Object(n.a)(s.getDate())+" "+Object(n.a)(s.getHours())+":"+Object(n.a)(s.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,answer:t.answer,speak:t.speak}},handleAuditPass:function(e,t){var a=this;console.log(t);var s={id:t.actvId,status:1};Object(l.a)(s).then(function(e){200==e.data.code?(a.$message({message:"审核已通过",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})},handleAuditReject:function(e,t){var a=this,s={id:t.actvId,status:2};Object(l.a)(s).then(function(e){200==e.data.code?(a.$message({message:"审核已拒绝",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})},handleDel:function(e,t){var a=this,s={id:t.id};s.sign=Object(r.a)(s),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._146)(s).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,q:this.currentItem.speak,a:this.currentItem.answer};a.sign=Object(r.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._150)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:2e3}),t.getList(),t.editVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={q:this.addList.speak,a:this.addList.answer};a.sign=Object(r.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._150)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:2e3}),t.getList(),t.addVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})})},importExcel:function(){this.uploadVisible=!0},customExcel:function(){this.uploadVisible2=!0},beforeUpload:function(e){var t="xls"===e.name.split(".")[1],a="xlsx"===e.name.split(".")[1],s=e.size/1024<500;return t||a?s?t||a||s:(this.$message.warning("上传文件大小不能超过 500KB!"),!1):(this.$message.warning("上传文件必须是Excel格式!"),!1)},beforeUpload2:function(e){var t="xls"===e.name.split(".")[1],a="xlsx"===e.name.split(".")[1],s=e.size/1024<500;return t||a?s?t||a||s:(this.$message.warning("上传文件大小不能超过 500KB!"),!1):(this.$message.warning("上传文件必须是Excel格式!"),!1)},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},handleExceed2:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.file=e.file},uploadFile2:function(e){this.file2=e.file},postFile:function(){var e=this;if(""==this.file)return this.$message.warning("请选择要上传的文件！"),!1;var t=this.file,a=new FormData;a.append("ex",t),this.fileBtnLoading=!0,Object(o._151)(a).then(function(t){e.fileBtnLoading=!1,200==t.data.code?(e.$message({message:t.data.msg,type:"success"}),e.$refs.upload.clearFiles(),e.uploadVisible=!1,e.getList()):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.fileBtnLoading=!1})},postFile2:function(){var e=this;if(""==this.file2)return this.$message.warning("请选择要上传的文件！"),!1;var t=this.file2,a=new FormData;a.append("ex",t),this.fileBtnLoading2=!0,Object(o._147)(a).then(function(t){e.fileBtnLoading2=!1,200==t.data.code?(e.$message({message:t.data.msg,type:"success"}),e.$refs.upload2.clearFiles(),e.uploadVisible2=!1,e.getList()):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.fileBtnLoading2=!1})},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},closeFile2:function(){this.$refs.upload2.clearFiles(),this.uploadVisible2=!1},buildAIML:function(){var e=this;this.AIMLBtnLoading=!0,Object(o._149)().then(function(t){e.AIMLBtnLoading=!1,200==t.data.code?e.$message({message:t.data.msg,type:"success",duration:2e3}):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.AIMLBtnLoading=!1})},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.speak,a:this.searchItem.answer,ex:this.searchItem.excel,status:this.searchItem.status};t.sign=Object(r.a)(t),this.list=[],Object(o._148)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/qa/list"}}},[e._v("规则定义")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"101px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.speak,callback:function(t){e.$set(e.searchItem,"speak","string"==typeof t?t.trim():t)},expression:"searchItem.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案",prop:"answer"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.answer,callback:function(t){e.$set(e.searchItem,"answer","string"==typeof t?t.trim():t)},expression:"searchItem.answer"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属excel文件",prop:"excel"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.excel,callback:function(t){e.$set(e.searchItem,"excel","string"==typeof t?t.trim():t)},expression:"searchItem.excel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.status,callback:function(t){e.$set(e.searchItem,"status","string"==typeof t?t.trim():t)},expression:"searchItem.status"}},[a("el-option",{attrs:{label:"未审核",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"通过",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"拒绝",value:"2"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:pub",expression:"'qa:pub'"}],attrs:{size:"mini",loading:e.AIMLBtnLoading},on:{click:function(t){return e.buildAIML()}}},[e._v("生成AIML")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:save",expression:"'qa:save'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:excel",expression:"'qa:excel'"}],attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.importExcel()}}},[e._v("导入Excel文件")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:excel",expression:"'qa:excel'"}],attrs:{icon:"el-icon-upload",size:"mini"},on:{click:function(t){return e.customExcel()}}},[e._v("导入自定义Excel文件")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"问题",prop:"speak",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.speak,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.speak)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.speak)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"答案",prop:"answer",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.answer,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.answer)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.answer)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"所属excel文件",prop:"excel",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.excel,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.excel)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.excel)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"status",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:1==t.row.status?"tag-s":2==t.row.status?"tag-d":"tag-i"},[e._v(e._s(0==t.row.status?"未审批":1==t.row.status?"通过":2==t.row.status?"拒绝":""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,width:"130"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:e.formTime2,width:"130"}}),e._v(" "),e.btnshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popconfirm",{attrs:{"hide-icon":!0,"confirm-button-text":"审批通过","cancel-button-text":"审批拒绝","cancel-button-type":"danger"},on:{confirm:function(a){return e.handleAuditPass(t.$index,t.row)},cancel:function(a){return e.handleAuditReject(t.$index,t.row)}}},[0==t.row.status?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"activiti:pass",expression:"'activiti:pass'"}],attrs:{slot:"reference",size:"mini",disabled:0!=t.row.status&&1!=t.row.isMe},slot:"reference"},[e._v(e._s(0==t.row.status?"审批":1==t.row.status?"审批通过":2==t.row.status?"审批拒绝":""))]):e._e()],1),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:update",expression:"'qa:update'"}],attrs:{size:"mini",disabled:1!=t.row.isMe},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qa:del",expression:"'qa:del'"}],attrs:{size:"mini",type:"danger",disabled:1!=t.row.isMe},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,66174507)}):e._e()],1),e._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),a("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),a("li",[a("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.speak,callback:function(t){e.$set(e.currentItem,"speak","string"==typeof t?t.trim():t)},expression:"currentItem.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案",prop:"answer"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.answer,callback:function(t){e.$set(e.currentItem,"answer","string"==typeof t?t.trim():t)},expression:"currentItem.answer"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.speak,callback:function(t){e.$set(e.addList,"speak","string"==typeof t?t.trim():t)},expression:"addList.speak"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答案",prop:"answer"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.answer,callback:function(t){e.$set(e.addList,"answer","string"==typeof t?t.trim():t)},expression:"addList.answer"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"eldialog",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"上传文件",visible:e.uploadVisible,width:"40%",top:"10vh","before-close":e.closeFile},on:{"update:visible":function(t){e.uploadVisible=t}}},[a("el-form",{staticClass:"eldialogForm"},[a("el-form-item",{attrs:{label:""}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload,"on-exceed":e.handleExceed,limit:1,"http-request":e.uploadFile,multiple:"",action:""}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.closeFile()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading},on:{click:function(t){return e.postFile()}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"eldialog",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"上传文件",visible:e.uploadVisible2,width:"40%",top:"10vh","before-close":e.closeFile2},on:{"update:visible":function(t){e.uploadVisible2=t}}},[a("el-form",{staticClass:"eldialogForm"},[a("el-form-item",{attrs:{label:""}},[a("el-upload",{ref:"upload2",staticClass:"upload-demo",attrs:{drag:"","before-upload":e.beforeUpload2,"on-exceed":e.handleExceed2,limit:1,"http-request":e.uploadFile2,multiple:"",action:""}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("\n            将文件拖到此处，或\n            "),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("1、只能上传Excel文件，且不超过500kb")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("2、由于需要生成AIML，所以excle文件请使用全英文")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("3、请编辑excel文件时，‘设置单元格格式’->‘文本’")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("4、第一列为‘问题’，第二列为'答案'")])])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.closeFile2()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.fileBtnLoading2},on:{click:function(t){return e.postFile2()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(d,u,!1,function(e){a("3eMI")},"data-v-d349e34c",null);t.default=p.exports}});