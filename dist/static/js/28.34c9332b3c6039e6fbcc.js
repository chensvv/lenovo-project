webpackJsonp([28],{k2bj:function(e,t){},zMg6:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("gRE1"),i=a.n(r),n=a("pWbq"),s=a("2hMI"),l={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},list:[],perList:[],currentItem:{hotName:"",pronounceName:"",vdm:"",dataType:""},addList:{hotName:"",pronounceName:"",vdm:"",matcherPattern:"",dataType:""},searchItem:{hotName:"",vdm:"",refreshTime:"",putTime:"",dataType:""},addRules:{hotName:[{required:!0,message:"请输入热词名称",trigger:"change"}],pronounceName:[{required:!0,message:"请输入说法",trigger:"change"}],vdm:[{required:!0,message:"请选择VDM",trigger:"change"}],dataType:[{required:!0,message:"请选择数据类型",trigger:"change"}]},editRules:{hotName:[{required:!0,message:"请输入热词名称",trigger:"change"}],pronounceName:[{required:!0,message:"请输入说法",trigger:"change"}],vdm:[{required:!0,message:"请选择VDM",trigger:"change"}],dataType:[{required:!0,message:"请选择数据类型",trigger:"change"}]},dataTypeArr:[{id:1,typeLabel:"纠正数据",typeVal:"1"},{id:2,typeLabel:"新增数据",typeVal:"2"}],editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("dict:update")&&-1==this.perList.indexOf("dict:del")&&(this.isshow=!1)},methods:{formTime:function(e,t){var a=e.upTime,r=new Date(a);return r.getFullYear()+"-"+Object(n.a)(r.getMonth()+1)+"-"+Object(n.a)(r.getDate())+" "+Object(n.a)(r.getHours())+":"+Object(n.a)(r.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,hotName:t.name,pronounceName:t.pronounceName,matcherPattern:t.matcherPattern,vdm:t.vdm,dataType:t.dataType}},handleDel:function(e,t){var a=this,r={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.T)(r).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,vdm:this.currentItem.vdm,name:this.currentItem.hotName,matcherPattern:this.currentItem.matcherPattern,pronounceName:this.currentItem.pronounceName,dataType:this.currentItem.dataType};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(s.S)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={name:this.addList.hotName,vdm:this.addList.vdm,pronounceName:this.addList.pronounceName,matcherPattern:this.addList.matcherPattern,dataType:this.addList.dataType};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(s.S)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,name:this.searchItem.hotName,vdm:this.searchItem.vdm,dataType:this.searchItem.dataType};Object(s.U)(t).then(function(t){e.listLoading=!1,e.list=t.data.data.data,e.totalCount=t.data.data.total})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("闲聊数据")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"热词",prop:"hotName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.hotName,callback:function(t){e.$set(e.searchItem,"hotName","string"==typeof t?t.trim():t)},expression:"searchItem.hotName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.vdm,callback:function(t){e.$set(e.searchItem,"vdm",t)},expression:"searchItem.vdm"}},[a("el-option",{attrs:{label:"all",value:"all"}}),e._v(" "),a("el-option",{attrs:{label:"les",value:"les"}}),e._v(" "),a("el-option",{attrs:{label:"app",value:"app"}}),e._v(" "),a("el-option",{attrs:{label:"vod",value:"vod"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"数据类型",prop:"dataType"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.dataType,callback:function(t){e.$set(e.searchItem,"dataType","string"==typeof t?t.trim():t)},expression:"searchItem.dataType"}},[a("el-option",{attrs:{label:"纠正数据",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"新增数据",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"dict:add",expression:"'dict:add'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"VDM",prop:"vdm",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"热词",prop:"name",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"发音",prop:"pronounceName",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"数据类型",prop:"dataType",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s("1"==t.row.dataType?"纠正数据":"新增数据"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"匹配模式",prop:"matcherPattern",align:"center","show-overflow-tooltip":!0}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"upTime",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"dict:update",expression:"'dict:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"dict:del",expression:"'dict:del'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1581459703)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"100px",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"热词",prop:"hotName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.hotName,callback:function(t){e.$set(e.currentItem,"hotName","string"==typeof t?t.trim():t)},expression:"currentItem.hotName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"词语发音",prop:"pronounceName"}},[a("el-input",{attrs:{type:"text",placeholder:"(如热词为‘A180’，此处可填写‘诶裔巴绫’)","auto-complete":"off"},model:{value:e.currentItem.pronounceName,callback:function(t){e.$set(e.currentItem,"pronounceName","string"==typeof t?t.trim():t)},expression:"currentItem.pronounceName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"匹配模式",prop:"matcherPattern"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.matcherPattern,callback:function(t){e.$set(e.currentItem,"matcherPattern","string"==typeof t?t.trim():t)},expression:"currentItem.matcherPattern"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.currentItem.vdm,callback:function(t){e.$set(e.currentItem,"vdm",t)},expression:"currentItem.vdm"}},[a("el-option",{attrs:{label:"all",value:"all"}}),e._v(" "),a("el-option",{attrs:{label:"les",value:"les"}}),e._v(" "),a("el-option",{attrs:{label:"app",value:"app"}}),e._v(" "),a("el-option",{attrs:{label:"vod",value:"vod"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"数据类型",prop:"dataType"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.currentItem.dataType,callback:function(t){e.$set(e.currentItem,"dataType",t)},expression:"currentItem.dataType"}},e._l(e.dataTypeArr,function(e,t){return a("el-option",{key:t,attrs:{label:e.typeLabel,value:e.id}})}),1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"100px",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"热词",prop:"hotName"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.hotName,callback:function(t){e.$set(e.addList,"hotName","string"==typeof t?t.trim():t)},expression:"addList.hotName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"词语发音",prop:"pronounceName"}},[a("el-input",{attrs:{type:"text",placeholder:"(如热词为‘A180’，此处可填写‘诶裔巴绫’)","auto-complete":"off"},model:{value:e.addList.pronounceName,callback:function(t){e.$set(e.addList,"pronounceName","string"==typeof t?t.trim():t)},expression:"addList.pronounceName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"匹配模式",prop:"matcherPattern"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.matcherPattern,callback:function(t){e.$set(e.addList,"matcherPattern","string"==typeof t?t.trim():t)},expression:"addList.matcherPattern"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.vdm,callback:function(t){e.$set(e.addList,"vdm",t)},expression:"addList.vdm"}},[a("el-option",{attrs:{label:"all",value:"all"}}),e._v(" "),a("el-option",{attrs:{label:"les",value:"les"}}),e._v(" "),a("el-option",{attrs:{label:"app",value:"app"}}),e._v(" "),a("el-option",{attrs:{label:"vod",value:"vod"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"数据类型",prop:"dataType"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.dataType,callback:function(t){e.$set(e.addList,"dataType",t)},expression:"addList.dataType"}},[a("el-option",{attrs:{label:"纠正数据",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"新增数据",value:"2"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(l,o,!1,function(e){a("k2bj")},"data-v-68e5e47f",null);t.default=d.exports}});