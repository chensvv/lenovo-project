webpackJsonp([67],{bKgf:function(e,t){},mJjX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),n=a.n(i);var s=a("2hMI"),o=a("krqS"),l=a("7oYi"),r={data:function(){return{getpageNum:l.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",appName:""},addList:{appName:"",appPackageName:"",appType:""},searchItem:{appName:""},addRules:{appName:[{required:!0,message:"请输入应用名称",trigger:"change"}],appPackageName:[{required:!0,message:"请输入应用包名",trigger:"change"}],appType:[{required:!0,message:"请输入应用类型",trigger:"change"}]},editRules:{appName:[{required:!0,message:"请输入应用名称",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:appupdate")&&-1==this.perList.indexOf("skill:appdelete")&&-1==this.perList.indexOf("skill:appdetail")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,i=t.scrollWidth;this.showTitle=!(a<i)},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,appName:t.appName}},handleDel:function(e,t){var a=this,i={id:t.id};i.sign=Object(o.a)(i),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s._188)(i).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:2e3}),a.getList()):void 0!=e.data.code&&a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(e){console.log(e)})},editHandleClose:function(){this.editVisible=!1},addHandClose:function(){this.addVisible=!1},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},addHandleClose:function(e){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,appName:this.currentItem.appName};a.sign=Object(o.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(s._194)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:2e3}),t.getList(),t.editVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(e){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={appName:this.addList.appName,appPackageName:this.addList.appPackageName,appType:this.addList.appType};a.sign=Object(o.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(s._187)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:2e3}),t.getList(),t.addVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})})},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,appName:this.searchItem.appName};t.sign=Object(o.a)(t),Object(s._193)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})},handleInfo:function(e,t){this.$router.push({name:"skilldetail",params:{appId:t.id}})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"},nativeOn:{submit:function(e){e.preventDefault()}}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmit.apply(null,arguments)}},model:{value:e.searchItem.appName,callback:function(t){e.$set(e.searchItem,"appName","string"==typeof t?t.trim():t)},expression:"searchItem.appName"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appadd",expression:"'skill:appadd'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"应用名称",prop:"appName",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.appName,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.appName)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.appName)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"应用调用用户数",prop:"appUserCount",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"技能数",prop:"funCount",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"调用次数",prop:"appCallCount",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"调用用户数",prop:"inc",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"失败次数",prop:"appFailCount",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"center",width:"140"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appupdate",expression:"'skill:appupdate'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appdelete",expression:"'skill:appdelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:appdetail",expression:"'skill:appdetail'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleInfo(t.$index,t.row)}}},[e._v("详情")])]}}],null,!1,3972109113)}):e._e()],1),e._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),a("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),a("li",[a("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.appName,callback:function(t){e.$set(e.currentItem,"appName","string"==typeof t?t.trim():t)},expression:"currentItem.appName"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"应用名称",prop:"appName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.appName,callback:function(t){e.$set(e.addList,"appName","string"==typeof t?t.trim():t)},expression:"addList.appName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"应用包名",prop:"appPackageName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.appPackageName,callback:function(t){e.$set(e.addList,"appPackageName","string"==typeof t?t.trim():t)},expression:"addList.appPackageName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"应用类型",prop:"appType"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.appType,callback:function(t){e.$set(e.addList,"appType","string"==typeof t?t.trim():t)},expression:"addList.appType"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.addHandleClose("addList")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(r,d,!1,function(e){a("bKgf")},"data-v-500ca7ae",null);t.default=c.exports}});