webpackJsonp([41],{YFle:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r("pWbq");var a=r("2hMI"),i={name:"applicationlist",data:function(){return{list:[],searchItem:{dtp:"",uid:"",clientVersion:"",engineVersion:"",developer:"",keywordType:"",keywordPhrase:"",origin:"",refreshTime:"",putTime:""},currentPage:1,pageSize:30,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1}},created:function(){this.getList()},methods:{handleDown:function(e,t){var r=document.createElement("a");r.href=t.filePath,r.download="pcm",r.click()},resetForm:function(e){this.$refs[e].resetFields(),this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},getList:function(){var e=this,t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin};Object(a._41)(t).then(function(t){e.list=t.data.data,e.totalCount=t.data.count})}}},l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),r("el-breadcrumb-item",[e._v("闲聊数据")]),e._v(" "),e._l(e.$route.meta,function(t,a){return r("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),r("el-form",{ref:"searchItem",staticClass:"demo-form-inline trigger",attrs:{inline:!0,model:e.searchItem,size:"mini","label-width":"70px"}},[r("el-form-item",{attrs:{label:"客户端平台",prop:"dtp"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.dtp,callback:function(t){e.$set(e.searchItem,"dtp","string"==typeof t?t.trim():t)},expression:"searchItem.dtp"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户ID",prop:"uid"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.uid,callback:function(t){e.$set(e.searchItem,"uid","string"==typeof t?t.trim():t)},expression:"searchItem.uid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"客户端版本",prop:"clientVersion"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.clientVersion,callback:function(t){e.$set(e.searchItem,"clientVersion","string"==typeof t?t.trim():t)},expression:"searchItem.clientVersion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"引擎版本",prop:"engineVersion"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.engineVersion,callback:function(t){e.$set(e.searchItem,"engineVersion","string"==typeof t?t.trim():t)},expression:"searchItem.engineVersion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"开发者",prop:"developer"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.developer,callback:function(t){e.$set(e.searchItem,"developer","string"==typeof t?t.trim():t)},expression:"searchItem.developer"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"唤醒词类型",prop:"keywordType"}},[r("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.keywordType,callback:function(t){e.$set(e.searchItem,"keywordType",t)},expression:"searchItem.keywordType"}},[r("el-option",{attrs:{label:"联想",value:"联想"}}),e._v(" "),r("el-option",{attrs:{label:"百度",value:"百度"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"唤醒词",prop:"keywordPhrase"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.keywordPhrase,callback:function(t){e.$set(e.searchItem,"keywordPhrase","string"==typeof t?t.trim():t)},expression:"searchItem.keywordPhrase"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"数据来源",prop:"origin"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.origin,callback:function(t){e.$set(e.searchItem,"origin","string"==typeof t?t.trim():t)},expression:"searchItem.origin"}})],1),e._v(" "),r("el-form-item",{staticClass:"width140",attrs:{label:"开始时间",prop:"refreshTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),r("el-form-item",{staticClass:"width140",attrs:{label:"结束时间",prop:"putTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),r("el-form-item",{staticClass:"width140",staticStyle:{"text-align":"right"}},[r("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1),e._v(" "),r("div",{staticClass:"table-box"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list}},[r("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"设备类型",prop:"dtp",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"用户ID",prop:"uid",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"客户端版本",prop:"clientVersion"}}),e._v(" "),r("el-table-column",{attrs:{label:"引擎版本",prop:"engineVersion",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"开发者",prop:"developer",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"唤醒词类型",prop:"keywordType",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"唤醒词",prop:"keywordPhrase",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"数据来源",prop:"origin",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"数据日期",prop:"displayDate",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"has",rawName:"v-has",value:121,expression:"121"}],attrs:{size:"mini"},on:{click:function(r){return e.handleDown(t.$index,t.row)}}},[e._v("下载文件")])]}}])})],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var s=r("VU/8")(i,l,!1,function(e){r("trs5")},"data-v-15892c8d",null);t.default=s.exports},trs5:function(e,t){}});