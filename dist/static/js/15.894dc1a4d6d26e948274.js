webpackJsonp([15],{"2W2a":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("gRE1"),a=i.n(s),n=i("2hMI"),r={data:function(){return{list:[],perList:[],appId:"",functionId:"",totalClass:"",skillDetail:{appName:"",functionName:""},currentItem:{id:"",version:"",state:""},addList:{version:"",answer:""},strList:{minVer:"",maxVer:"",serCon:"",serNot:""},addRules:{version:[{required:!0,message:"请输入答案说明",trigger:"change"}],answer:[{required:!0,message:"请输入答案",trigger:"change"}]},editRules:{version:[{required:!0,message:"请输入答案说明",trigger:"blur"}],answer:[{required:!0,message:"请输入答案",trigger:"blur"}]},editVisible:!1,addVisible:!1,strVisible:!1,currentPage:1,pageSize:10,totalCount:1,addBtnLoading:!1,editBtnLoading:!1,relBtnLoading:!1,strBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var t=this;this.appId=this.$route.query.appId,this.functionId=this.$route.query.functionId,JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(a()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:versionupdate")&&-1==this.perList.indexOf("skill:versiondelete")&&-1==this.perList.indexOf("skill:versiondetail")&&(this.isshow=!1)},methods:{formVal:function(t,e){return!0===t.state?"true":"false"},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleEdit:function(t,e){this.editVisible=!0,this.currentItem={id:e.id,version:e.versionIllustration,answer:e.versionAnswer}},handleStr:function(t,e){this.strVisible=!0,this.strList={id:e.id,minVer:e.versionMinCode,maxVer:e.versionMaxCode,serCon:e.containsModel,serNot:e.notModel}},handleDel:function(t,e){var i=this,s={versionId:e.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n._138)(s).then(function(t){200==t.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:t.data.errorMessage,type:"error",duration:1e3})})})},openFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].resetFields()})},closeFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(t){var e=this,i={versionId:this.currentItem.id,versionAnswer:this.currentItem.answer,versionIllustration:this.currentItem.version};this.$refs[t].validate(function(t){if(!t)return!1;e.editBtnLoading=!0,Object(n._141)(i).then(function(t){e.editBtnLoading=!1,200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:1e3}),e.getList(),e.editVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(t){var e=this,i={versionAnswer:this.addList.answer,versionIllustration:this.addList.version,functionId:this.functionId};this.$refs[t].validate(function(t){if(!t)return!1;e.addBtnLoading=!0,Object(n._137)(i).then(function(t){e.addBtnLoading=!1,200==t.data.code?(e.$message({message:"添加成功",type:"success",duration:1e3}),e.getList(),e.addVisible=!1):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.addBtnLoading=!1})})},strHandleClose:function(){this.strVisible=!1},strHandleConfirm:function(){var t=this,e={versionId:this.strList.id,minVersion:this.strList.minVer,maxVersion:this.strList.maxVer,containsModel:this.strList.serCon,notModel:this.strList.serNot};this.strBtnLoading=!0,Object(n._140)(e).then(function(e){t.strBtnLoading=!1,200==e.data.code?(t.$message({message:"发布成功",type:"success",duration:1e3}),t.getList(),t.strVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.strBtnLoading=!1})},getList:function(){var t=this;this.listLoading=!0;var e={functionId:this.functionId,appId:this.appId,pgstr:this.currentPage,pcstr:this.pageSize};Object(n._139)(e).then(function(e){t.listLoading=!1,t.skillDetail.functionName=e.data.lasfControlFunction.functionName,t.list=e.data.lasfControlVersionPage.data,t.totalCount=e.data.lasfControlVersionPage.total,t.totalClass=e.data.lasfControlVersionPage.data.length});var i={id:this.appId};Object(n._109)(i).then(function(e){t.skillDetail.appName=e.data.data.appName})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table sersion"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),i("el-breadcrumb-item",[t._v("技能管理")]),t._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/skill/applist"}}},[t._v("应用列表")]),t._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/lasf-kv/skill/detail",query:{functionId:this.functionId,appId:this.appId}}}},[t._v("应用详情")]),t._v(" "),t._l(t.$route.meta,function(e,s){return i("el-breadcrumb-item",{key:s},[t._v(t._s(e))])})],2),t._v(" "),i("el-form",{staticClass:"demo-form-inline",staticStyle:{"text-align":"right"},attrs:{inline:!0,size:"mini"}},[i("div",{staticClass:"d_t"},[i("span",{staticClass:"d_title"},[t._v(t._s(t.skillDetail.appName)+"  >>")]),i("span",[t._v(t._s(t.skillDetail.functionName))])]),t._v(" "),i("el-form-item",{staticClass:"sub-btn"},[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:versionadd",expression:"'skill:versionadd'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(e){return t.handleAdd()}}},[t._v("添加")]),t._v(" "),i("router-link",{attrs:{to:{path:"/lasf-kv/skill/detail/speak",query:{functionId:this.functionId,appId:this.appId}}}},[i("el-button",{staticClass:"success",attrs:{size:"mini"}},[t._v("说法列表")])],1)],1)],1),t._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list}},[i("el-table-column",{attrs:{type:"index",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"说明",prop:"versionIllustration",align:"left","show-overflow-tooltip":!0}}),t._v(" "),i("el-table-column",{attrs:{label:"启用",prop:"state",align:"left",formatter:t.formVal}}),t._v(" "),i("el-table-column",{attrs:{label:"调用次数",prop:"versionCallCount",align:"left"}}),t._v(" "),i("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"left","min-width":"120"}}),t._v(" "),t.isshow?i("el-table-column",{attrs:{label:"操作",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:versionupdate",expression:"'skill:versionupdate'"}],attrs:{size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:versiondelete",expression:"'skill:versiondelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.handleDel(e.$index,e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:versiondetail",expression:"'skill:versiondetail'"}],attrs:{size:"mini"},on:{click:function(i){return t.handleStr(e.$index,e.row)}}},[t._v("策略")])]}}],null,!1,1342461394)}):t._e()],1),t._v(" "),i("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1),t._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"300","before-close":t.editHandleClose},on:{"update:visible":function(e){t.editVisible=e},close:function(e){return t.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"80px",size:"small",rules:t.editRules,model:t.currentItem}},[i("el-form-item",{attrs:{label:"说明",prop:"version"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.version,callback:function(e){t.$set(t.currentItem,"version","string"==typeof e?e.trim():e)},expression:"currentItem.version"}})],1),t._v(" "),i("el-form-item",{staticClass:"ser_t",attrs:{label:"答案",prop:"answer"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:t.currentItem.answer,callback:function(e){t.$set(t.currentItem,"answer","string"==typeof e?e.trim():e)},expression:"currentItem.answer"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.editHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.editBtnLoading},on:{click:function(e){return t.editHandleConfirm("currentItem")}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"添加答案",visible:t.addVisible,width:"300","before-close":t.addHandleClose},on:{"update:visible":function(e){t.addVisible=e},open:function(e){return t.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"0px",size:"small",rules:t.addRules,model:t.addList}},[i("el-form-item",{attrs:{prop:"version"}},[i("el-input",{attrs:{type:"text",placeholder:"在此处添加说明","auto-complete":"off"},model:{value:t.addList.version,callback:function(e){t.$set(t.addList,"version","string"==typeof e?e.trim():e)},expression:"addList.version"}})],1),t._v(" "),i("el-form-item",{staticClass:"ser_text",attrs:{prop:"answer"}},[i("el-input",{attrs:{type:"textarea",placeholder:"在此处添加答案","auto-complete":"off"},model:{value:t.addList.answer,callback:function(e){t.$set(t.addList,"answer","string"==typeof e?e.trim():e)},expression:"addList.answer"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.addHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"发布策略",visible:t.strVisible,width:"300","before-close":t.strHandleClose},on:{"update:visible":function(e){t.strVisible=e}}},[i("el-form",{ref:"strList",attrs:{"label-position":"right","label-width":"80px",size:"small"}},[i("el-form-item",{staticClass:"ver_text1",attrs:{label:"软件版本"}},[i("el-input",{attrs:{type:"text",placeholder:"最小版本","auto-complete":"off"},model:{value:t.strList.minVer,callback:function(e){t.$set(t.strList,"minVer","string"==typeof e?e.trim():e)},expression:"strList.minVer"}}),t._v(" - \n                "),i("el-input",{attrs:{type:"text",placeholder:"最大版本","auto-complete":"off"},model:{value:t.strList.maxVer,callback:function(e){t.$set(t.strList,"maxVer","string"==typeof e?e.trim():e)},expression:"strList.maxVer"}})],1),t._v(" "),i("el-form-item",{staticClass:"ver_text2",attrs:{label:"型号"}},[i("el-input",{attrs:{type:"text",placeholder:"contains","auto-complete":"off"},model:{value:t.strList.serCon,callback:function(e){t.$set(t.strList,"serCon","string"==typeof e?e.trim():e)},expression:"strList.serCon"}}),t._v(" "),i("el-input",{attrs:{type:"text",placeholder:"not","auto-complete":"off"},model:{value:t.strList.serNot,callback:function(e){t.$set(t.strList,"serNot","string"==typeof e?e.trim():e)},expression:"strList.serNot"}}),t._v(" "),i("span",{staticStyle:{"font-size":"12px",display:"block"}},[t._v("多个字段请用英文 , 隔开")])],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.strHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.strBtnLoading},on:{click:t.strHandleConfirm}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(r,o,!1,function(t){i("Cq0J")},"data-v-f322e12a",null);e.default=l.exports},Cq0J:function(t,e){}});