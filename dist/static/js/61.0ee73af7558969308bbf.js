webpackJsonp([61],{YFle:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),r=i.n(a),s=(i("pWbq"),i("2hMI"));var n=i("FT/c"),l={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},list:[],perList:[],zipLists:[],totalClass:"",downURLs:n.a.proURL,searchItem:{dtp:"",uid:"",clientVersion:"",engineVersion:"",developer:"",keywordType:"",keywordPhrase:"",origin:"",refreshTime:"",putTime:""},currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,zipBtnLoading:!1,listBtnLoading:!1,zipVisible:!1,listLoading:!0,isshow:!1,btnshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(r()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("trigger:download")&&(this.btnshow=!1)},methods:{handleDown:function(e,t){var i=n.a.proURL+"/lasf-mgr/trigger/download?fileName="+t.filePath;window.open(i)},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},dataPack:function(){var e=this,t={startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin};this.zipBtnLoading=!0,Object(s._136)(t).then(function(t){e.zipBtnLoading=!1,200==t.data.code?e.$message({message:"打包成功",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.zipBtnLoading=!1,e.$message({message:res.data.message,type:"error",duration:1e3})})},packResult:function(){var e=this;this.zipVisible=!0,Object(s._164)().then(function(t){e.zipLists=t.data.array,0==e.zipLists.length&&(e.isshow=!0)})},zipHandleClose:function(){this.zipVisible=!1},zipFileDownload:function(e){var t=n.a.proURL+"/lasf-mgr/trigger/download?fileName="+e+"&fileType=zip",i=document.createElement("a");i.href=t,i.download=e,i.click()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin};Object(s._135)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table trigg"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("闲聊数据")]),e._v(" "),e._l(e.$route.meta,function(t,a){return i("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline trigger",attrs:{inline:!0,model:e.searchItem,size:"mini","label-width":"70px"}},[i("el-form-item",{attrs:{label:"客户端平台",prop:"dtp"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.dtp,callback:function(t){e.$set(e.searchItem,"dtp","string"==typeof t?t.trim():t)},expression:"searchItem.dtp"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"用户ID",prop:"uid"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.uid,callback:function(t){e.$set(e.searchItem,"uid","string"==typeof t?t.trim():t)},expression:"searchItem.uid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"客户端版本",prop:"clientVersion"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.clientVersion,callback:function(t){e.$set(e.searchItem,"clientVersion","string"==typeof t?t.trim():t)},expression:"searchItem.clientVersion"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"引擎版本",prop:"engineVersion"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.engineVersion,callback:function(t){e.$set(e.searchItem,"engineVersion","string"==typeof t?t.trim():t)},expression:"searchItem.engineVersion"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开发者",prop:"developer"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.developer,callback:function(t){e.$set(e.searchItem,"developer","string"==typeof t?t.trim():t)},expression:"searchItem.developer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"唤醒词类型",prop:"keywordType"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.keywordType,callback:function(t){e.$set(e.searchItem,"keywordType","string"==typeof t?t.trim():t)},expression:"searchItem.keywordType"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"唤醒词",prop:"keywordPhrase"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.keywordPhrase,callback:function(t){e.$set(e.searchItem,"keywordPhrase","string"==typeof t?t.trim():t)},expression:"searchItem.keywordPhrase"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"数据来源",prop:"origin"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.origin,callback:function(t){e.$set(e.searchItem,"origin","string"==typeof t?t.trim():t)},expression:"searchItem.origin"}})],1),e._v(" "),i("el-form-item",{staticClass:"width140",attrs:{label:"起始时间",prop:"refreshTime"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),i("el-form-item",{staticClass:"width140",attrs:{label:"结束时间",prop:"putTime"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),i("el-form-item",{staticClass:"sub-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),i("el-button",{attrs:{size:"mini",loading:e.zipBtnLoading},on:{click:e.dataPack}},[e._v("数据打包")]),e._v(" "),i("el-button",{attrs:{size:"mini",loading:e.listBtnLoading},on:{click:e.packResult}},[e._v("打包结果")])],1)],1),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),i("el-table-column",{attrs:{label:"设备类型",prop:"dtp",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"用户ID",prop:"uid",align:"left"}}),e._v(" "),i("el-table-column",{attrs:{label:"客户端版本",prop:"clientVersion",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"引擎版本",prop:"engineVersion",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"开发者",prop:"developer",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"唤醒词类型",prop:"keywordType",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"唤醒词",prop:"keywordPhrase",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"数据来源",prop:"origin",align:"left","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"数据日期",prop:"displayDate",align:"left","min-width":"120"}}),e._v(" "),e.btnshow?i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"trigger:download",expression:"'trigger:download'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleDown(t.$index,t.row)}}},[e._v("下载文件")])]}}],null,!1,1535025030)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"数据压缩包下载",visible:e.zipVisible,width:"300","before-close":e.zipHandleClose},on:{"update:visible":function(t){e.zipVisible=t}}},[i("div",{staticClass:"zip_box"},[e._l(e.zipLists,function(t,a){return i("div",{key:a},[i("el-link",{attrs:{type:"primary",icon:"el-icon-download",href:e.downURLs+"/lasf-mgr/trigger/download?fileName="+t.filename+"&fileType=zip",target:"_blank"}},[e._v(e._s(t.lasttime))])],1)}),e._v(" "),e.isshow?i("div",{staticStyle:{"text-align":"center"}},[e._v("暂无数据")]):e._e()],2),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:e.zipHandleClose}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=i("VU/8")(l,o,!1,function(e){i("uDU0")},"data-v-296ab421",null);t.default=c.exports},uDU0:function(e,t){}});