webpackJsonp([42],{Fc3u:function(e,t){},YFle:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("pWbq");var r=a("2hMI"),i={data:function(){return{list:[],zipLists:[],searchItem:{dtp:"",uid:"",clientVersion:"",engineVersion:"",developer:"",keywordType:"",keywordPhrase:"",origin:"",refreshTime:"",putTime:""},currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,zipBtnLoading:!1,listBtnLoading:!1,zipVisible:!1,listLoading:!0}},created:function(){this.getList()},methods:{handleDown:function(e,t){var a=this,i={fileName:t.filePath};Object(r._96)(i).then(function(e){var a=document.createElement("a"),r=window.URL.createObjectURL(new Blob([e.data])),i=t.filePath.lastIndexOf("/"),s=t.filePath.substring(i+1,t.filePath.length);a.href=r,a.download=s,a.click(),window.URL.revokeObjectURL(r)}).catch(function(e){a.$message({message:res.data.error,type:"error",duration:1e3})})},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},dataPack:function(){var e=this,t={startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin};this.zipBtnLoading=!0,Object(r._75)(t).then(function(t){e.zipBtnLoading=!1,200==t.data.code?e.$message({message:"打包成功",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.$message({message:res.data.message,type:"error",duration:1e3})})},packResult:function(){var e=this;Object(r._97)().then(function(t){e.zipLists=t.data.array,e.zipVisible=!0})},zipHandleClose:function(){this.zipVisible=!1},zipFileDownload:function(e){var t=this,a={fileName:e,fileType:"zip"};Object(r._96)(a).then(function(t){var a=new Blob([t.data]),r=document.createElement("a"),i=window.URL.createObjectURL(a);r.href=i,r.download=e,r.click(),window.URL.revokeObjectURL(i)}).catch(function(e){t.$message({message:res.data.message,type:"error",duration:1e3})})},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin};Object(r._74)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count}).catch(function(t){listLoading=!1,e.$message({message:res.data.error,type:"error",duration:1e3})})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("闲聊数据")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline trigger",attrs:{inline:!0,model:e.searchItem,size:"mini","label-width":"70px"}},[a("el-form-item",{attrs:{label:"客户端平台",prop:"dtp"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.dtp,callback:function(t){e.$set(e.searchItem,"dtp","string"==typeof t?t.trim():t)},expression:"searchItem.dtp"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户ID",prop:"uid"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.uid,callback:function(t){e.$set(e.searchItem,"uid","string"==typeof t?t.trim():t)},expression:"searchItem.uid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客户端版本",prop:"clientVersion"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.clientVersion,callback:function(t){e.$set(e.searchItem,"clientVersion","string"==typeof t?t.trim():t)},expression:"searchItem.clientVersion"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"引擎版本",prop:"engineVersion"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.engineVersion,callback:function(t){e.$set(e.searchItem,"engineVersion","string"==typeof t?t.trim():t)},expression:"searchItem.engineVersion"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"开发者",prop:"developer"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.developer,callback:function(t){e.$set(e.searchItem,"developer","string"==typeof t?t.trim():t)},expression:"searchItem.developer"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"唤醒词类型",prop:"keywordType"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.keywordType,callback:function(t){e.$set(e.searchItem,"keywordType","string"==typeof t?t.trim():t)},expression:"searchItem.keywordType"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"唤醒词",prop:"keywordPhrase"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.keywordPhrase,callback:function(t){e.$set(e.searchItem,"keywordPhrase","string"==typeof t?t.trim():t)},expression:"searchItem.keywordPhrase"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"数据来源",prop:"origin"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.origin,callback:function(t){e.$set(e.searchItem,"origin","string"==typeof t?t.trim():t)},expression:"searchItem.origin"}})],1),e._v(" "),a("el-form-item",{staticClass:"width140",attrs:{label:"开始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),a("el-form-item",{staticClass:"width140",attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),a("el-form-item",{staticClass:"width140",staticStyle:{"text-align":"right"}},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{attrs:{size:"mini",loading:e.zipBtnLoading},on:{click:e.dataPack}},[e._v("数据打包")]),e._v(" "),a("el-button",{attrs:{size:"mini",loading:e.listBtnLoading},on:{click:e.packResult}},[e._v("打包结果")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"设备类型",prop:"dtp",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户ID",prop:"uid",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"客户端版本",prop:"clientVersion"}}),e._v(" "),a("el-table-column",{attrs:{label:"引擎版本",prop:"engineVersion",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"开发者",prop:"developer",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"唤醒词类型",prop:"keywordType",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"唤醒词",prop:"keywordPhrase",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"数据来源",prop:"origin",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"数据日期",prop:"displayDate",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"trigger:download",expression:"'trigger:download'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleDown(t.$index,t.row)}}},[e._v("下载文件")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"数据压缩包下载",visible:e.zipVisible,width:"300","before-close":e.zipHandleClose},on:{"update:visible":function(t){e.zipVisible=t}}},[a("div",{staticClass:"zip_box"},e._l(e.zipLists,function(t,r){return a("el-link",{key:r,attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(a){return e.zipFileDownload(t.filename)}}},[e._v(e._s(t.filename)+"("+e._s(t.lasttime)+")")])}),1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.zipHandleClose}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(e){a("Fc3u")},"data-v-29c8458c",null);t.default=n.exports}});