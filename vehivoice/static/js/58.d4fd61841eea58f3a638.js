webpackJsonp([58],{JAw3:function(e,t){},iOMR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),n=a.n(i),r=a("pWbq"),o=a("2hMI"),s=a("krqS"),l=a("7oYi"),d={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now();return e.getTime()>t}},getpageNum:l.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",licenseType:"",authorizationTime:"",productId:"",threadNum:"",operator:"",updateFile:null},addList:{licenseType:"",authorizationTime:"",productId:"",threadNum:"",operator:"",addFile:null},searchItem:{name:"",pickerVal:[]},addRules:{licenseType:[{required:!0,message:"请选择授权类别",trigger:"change"}],authorizationTime:[{required:!0,message:"请输入授权时间",trigger:"change"}],productId:[{required:!0,message:"请输入产品ID",trigger:"change"}],threadNum:[{required:!0,message:"请输入授权线程数",trigger:"change"}],operator:[{required:!0,message:"请输入操作人",trigger:"change"}]},editRules:{licenseType:[{required:!0,message:"请选择授权类别",trigger:"change"}],authorizationTime:[{required:!0,message:"请输入授权时间",trigger:"change"}],productId:[{required:!0,message:"请输入产品ID",trigger:"change"}],threadNum:[{required:!0,message:"请输入授权线程数",trigger:"change"}],operator:[{required:!0,message:"请输入操作人",trigger:"change"}]},column:{prop:"",order:""},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,downBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("license:generate")&&-1==this.perList.indexOf("license:delete")&&-1==this.perList.indexOf("license:update")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,i=t.scrollWidth;this.showTitle=!(a<i)},formTime:function(e,t){var a=e.buildTime,i=new Date(a);return i.getFullYear()+"-"+Object(r.a)(i.getMonth()+1)+"-"+Object(r.a)(i.getDate())+" "+Object(r.a)(i.getHours())+":"+Object(r.a)(i.getMinutes())},formTime2:function(e,t){var a=e.createTime,i=new Date(a);return i.getFullYear()+"-"+Object(r.a)(i.getMonth()+1)+"-"+Object(r.a)(i.getDate())+" "+Object(r.a)(i.getHours())+":"+Object(r.a)(i.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,licenseType:t.licenseType,authorizationTime:t.authorizationTime,productId:t.productId,threadNum:t.threadNum,operator:t.operator,updateFile:t.machineInfo},console.log(this.currentItem)},handleGenerate:function(e,t){var a=this,i={id:t.id};i.sign=Object(s.a)(i),Object(o._80)(i).then(function(e){200==e.data.code?(a.$message({message:"授权成功",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})},handleDownload:function(e,t){var a=this;this.downBtnLoading=!0;var i={id:t.id};i.sign=Object(s.a)(i),Object(o._79)(i).then(function(e){var i=new Blob([e.data]),n=document.createElement("a"),r=window.URL.createObjectURL(i),o=t.licenseFile;n.href=r,n.download=o,n.click(),window.URL.revokeObjectURL(r),a.downBtnLoading=!1})},handleDel:function(e,t){var a=this,i={id:t.id};i.sign=Object(s.a)(i),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._78)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(){console.log("no")})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&(t.$refs[e].resetFields(),t.addList.addFile=null,t.$refs.addUpload.clearFiles())})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&(t.$refs[e].clearValidate(),t.currentItem.updateFile=null,t.$refs.editUpload.clearFiles())})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a=new FormData;a.append("id",this.currentItem.id),a.append("licenseType",this.currentItem.licenseType),a.append("authorizationTime",this.currentItem.authorizationTime),a.append("productId",this.currentItem.productId),a.append("threadNum",this.currentItem.threadNum),a.append("operator",this.currentItem.operator),a.append("ex",this.currentItem.updateFile),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._82)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:2e3}),t.$refs.editUpload.clearFiles(),t.getList(),t.editVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.editBtnLoading=!1})})},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},handleExceedEdit:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){this.addList.addFile=e.file},uploadFileEdit:function(e){this.currentItem.updateFile=e.file},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this;if(null==this.addList.addFile)this.$message({message:"请先上传机器信息文件后提交！",type:"warning",duration:2e3});else{var a=new FormData;a.append("licenseType",this.addList.licenseType),a.append("authorizationTime",this.addList.authorizationTime),a.append("productId",this.addList.productId),a.append("threadNum",this.addList.threadNum),a.append("operator",this.addList.operator),a.append("ex",this.addList.addFile),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._77)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:2e3}),t.$refs.addUpload.clearFiles(),t.getList(),t.addVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})})}},sortChange:function(e){this.column={prop:e.prop,order:e.order},console.log(this.column),this.getList()},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={startStr:null==this.searchItem.pickerVal?"":this.searchItem.pickerVal[0],endStr:null==this.searchItem.pickerVal?"":this.searchItem.pickerVal[1],pgstr:this.currentPage,pcstr:this.pageSize,operator:this.searchItem.name};t.sign=Object(s.a)(t),Object(o._81)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"},nativeOn:{submit:function(e){e.preventDefault()}}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"操作人",prop:"name"}},[a("el-input",{attrs:{clearable:""},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmit.apply(null,arguments)}},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"was:add",expression:"'was:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"产品ID",prop:"productId",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"授权线程数",prop:"threadNum",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.threadNum,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.threadNum)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.threadNum)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作人",prop:"operator",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.operator,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.operator)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.operator)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"机器信息文件",prop:"machineInfo",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.machineInfo,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.machineInfo)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.machineInfo)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"授权文件",prop:"licenseFile",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.licenseFile,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.licenseFile)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.licenseFile)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"授权时间",prop:"authorizationTime",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"授权文件生效时间",prop:"buildTime",formatter:e.formTime,align:"center",width:"130"}}),e._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",formatter:e.formTime2,align:"center",width:"130"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",width:"240",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"license:download",expression:"'license:download'"}],attrs:{size:"mini",loading:e.downBtnLoading},on:{click:function(a){return e.handleDownload(t.$index,t.row)}}},[e._v("下载")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"license:generate",expression:"'license:generate'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleGenerate(t.$index,t.row)}}},[e._v("授权")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"license:update",expression:"'license:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"license:delete",expression:"'license:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,2583494089)}):e._e()],1),e._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),a("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),a("li",[a("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"授权类别",prop:"licenseType"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.currentItem.licenseType,callback:function(t){e.$set(e.currentItem,"licenseType",t)},expression:"currentItem.licenseType"}},[a("el-option",{attrs:{label:"asr",value:"asr"}}),e._v(" "),a("el-option",{attrs:{label:"tts",value:"tts"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"授权时间",prop:"authorizationTime"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.authorizationTime,callback:function(t){e.$set(e.currentItem,"authorizationTime","string"==typeof t?t.trim():t)},expression:"currentItem.authorizationTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品ID",prop:"productId"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.productId,callback:function(t){e.$set(e.currentItem,"productId","string"==typeof t?t.trim():t)},expression:"currentItem.productId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"授权线程数",prop:"threadNum"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.threadNum,callback:function(t){e.$set(e.currentItem,"threadNum","string"==typeof t?t.trim():t)},expression:"currentItem.threadNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"操作人",prop:"operator"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.operator,callback:function(t){e.$set(e.currentItem,"operator","string"==typeof t?t.trim():t)},expression:"currentItem.operator"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机器信息文件"}},[a("el-upload",{ref:"editUpload",staticClass:"lice-upload",attrs:{drag:"","on-exceed":e.handleExceedEdit,limit:1,"http-request":e.uploadFileEdit,multiple:"",action:""}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("\n                    将文件拖到此处，或\n                    "),a("em",[e._v("点击上传")])])])],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},close:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"授权类别",prop:"licenseType"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.licenseType,callback:function(t){e.$set(e.addList,"licenseType",t)},expression:"addList.licenseType"}},[a("el-option",{attrs:{label:"asr",value:"asr"}}),e._v(" "),a("el-option",{attrs:{label:"tts",value:"tts"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"授权时间",prop:"authorizationTime"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.authorizationTime,callback:function(t){e.$set(e.addList,"authorizationTime","string"==typeof t?t.trim():t)},expression:"addList.authorizationTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品ID",prop:"productId"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.productId,callback:function(t){e.$set(e.addList,"productId","string"==typeof t?t.trim():t)},expression:"addList.productId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"授权线程数",prop:"threadNum"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.threadNum,callback:function(t){e.$set(e.addList,"threadNum","string"==typeof t?t.trim():t)},expression:"addList.threadNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"操作人",prop:"operator"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.operator,callback:function(t){e.$set(e.addList,"operator","string"==typeof t?t.trim():t)},expression:"addList.operator"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机器信息文件"}},[a("el-upload",{ref:"addUpload",staticClass:"lice-upload",attrs:{drag:"","on-exceed":e.handleExceed,limit:1,"http-request":e.uploadFile,multiple:"",action:""}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("\n                    将文件拖到此处，或\n                    "),a("em",[e._v("点击上传")])])])],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(d,c,!1,function(e){a("JAw3")},"data-v-5c20ed14",null);t.default=u.exports}});