webpackJsonp([75],{BPEi:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),n=i.n(a),s=i("pWbq"),o=i("krqS"),r=i("7oYi"),l=i("2hMI"),d={data:function(){return{getpageNum:r.a,list:[],perList:[],typeList:[],totalClass:"8",currentItem:{id:"",value:"",expression:""},addList:{value:"",expression:""},searchItem:{expression:""},addRules:{expression:[{required:!0,message:"请输入表达式",trigger:"change"}],value:[{required:!0,message:"请输入值",trigger:"change"}]},editRules:{expression:[{required:!0,message:"请输入表达式",trigger:"blur"}],value:[{required:!0,message:"请输入值",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,labelLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList(),this.getTypeList()},mounted:function(){-1==this.perList.indexOf("nlu:transWord:update")&&-1==this.perList.indexOf("nlu:transWord:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,a=t.scrollWidth;this.showTitle=!(i<a)},formTime:function(e,t){var i=e.createTime,a=new Date(i);return a.getFullYear()+"-"+Object(s.a)(a.getMonth()+1)+"-"+Object(s.a)(a.getDate())+" "+Object(s.a)(a.getHours())+":"+Object(s.a)(a.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,expression:t.expression,value:t.value}},getTypeList:function(){var e=this;Object(l._120)({}).then(function(t){200==t.data.code&&(e.typeList=t.data.data)})},handleLabel:function(){var e=this;if(""==this.searchItem.expression)this.$message({message:"请选择表达式",type:"error",duration:2e3});else{this.labelLoading=!0;var t={expression:this.searchItem.expression};Object(l._118)(t).then(function(t){e.labelLoading=!1,200==t.data.code?(e.$message({message:"已生成",type:"success",duration:2e3}),e.getList()):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.labelLoading=!1})}},handleDel:function(e,t){var i=this,a={id:t.id,sign:this.$md5("id="+t.id)};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l._117)(a).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:2e3}),i.getList()):void 0!=e.data.code&&i.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,expression:this.currentItem.expression,value:this.currentItem.value};i.sign=Object(o.a)(i),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(l._121)(i).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:2e3}),t.getList(),t.editVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,i={value:this.addList.value,expression:this.addList.expression,sign:this.$md5("appName="+this.addList.appName)};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(l._116)(i).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:2e3}),t.getList(),t.addVisible=!1):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})})},closeFile:function(){this.$refs.upload.clearFiles(),this.uploadVisible=!1},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,expression:this.searchItem.expression};t.sign=Object(o.a)(t),Object(l._119)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},u={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-105"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"},nativeOn:{submit:function(e){e.preventDefault()}}},[i("div",{staticClass:"form-input height70"},[i("el-form-item",{attrs:{label:"表达式",prop:"expression"}},[i("el-select",{attrs:{placeholder:"--"},model:{value:e.searchItem.expression,callback:function(t){e.$set(e.searchItem,"expression",t)},expression:"searchItem.expression"}},e._l(e.typeList,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}),1)],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")])],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:transWord:add",expression:"'nlu:transWord:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:transWord:genTranWord",expression:"'nlu:transWord:genTranWord'"}],attrs:{size:"mini",loading:e.labelLoading},on:{click:function(t){return e.handleLabel()}}},[e._v("生成词转换文件")])],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[i("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),i("el-table-column",{attrs:{label:"表达式",prop:"expression",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.expression,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.expression)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.expression)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"值",prop:"value",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.value,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.value)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.value)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"130"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"操作","min-width":"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:transWord:update",expression:"'nlu:transWord:update'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlu:transWord:delete",expression:"'nlu:transWord:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,386089399)}):e._e()],1),e._v(" "),i("div",{staticClass:"pagination-wrap"},[i("ul",{staticClass:"pagination"},[i("li",[i("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[i("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),i("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),i("li",[i("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[i("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-form-item",{attrs:{label:"表达式",prop:"expression"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.expression,callback:function(t){e.$set(e.currentItem,"expression","string"==typeof t?t.trim():t)},expression:"currentItem.expression"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"值",prop:"value"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.value,callback:function(t){e.$set(e.currentItem,"value","string"==typeof t?t.trim():t)},expression:"currentItem.value"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-form-item",{attrs:{label:"表达式",prop:"expression"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.expression,callback:function(t){e.$set(e.addList,"expression","string"==typeof t?t.trim():t)},expression:"addList.expression"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"值",prop:"value"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.value,callback:function(t){e.$set(e.addList,"value","string"==typeof t?t.trim():t)},expression:"addList.value"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(d,u,!1,function(e){i("pt0I")},"data-v-3115fa8d",null);t.default=c.exports},pt0I:function(e,t){}});