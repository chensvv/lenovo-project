webpackJsonp([53],{"3qOn":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("pWbq"),i=s("2hMI"),o={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},list:[],totalClass:"",searchItem:{sce:"",lenovokey:"",refreshTime:"",putTime:""},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!0}},created:function(){this.getList()},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,a=t.scrollWidth;this.showTitle=!(s<a)},formTime:function(e,t){var s=e.createTime,i=new Date(s);return i.getFullYear()+"-"+Object(a.a)(i.getMonth()+1)+"-"+Object(a.a)(i.getDate())+" "+Object(a.a)(i.getHours())+":"+Object(a.a)(i.getMinutes())},formTime2:function(e,t){var s=e.startTime,i=new Date(s);return i.getFullYear()+"-"+Object(a.a)(i.getMonth()+1)+"-"+Object(a.a)(i.getDate())+" "+Object(a.a)(i.getHours())+":"+Object(a.a)(i.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,sce:this.searchItem.sce,lenovokey:this.searchItem.lenovokey};Object(i._154)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data.data,e.totalCount=t.data.data.total,e.totalClass=t.data.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(){e.listLoading=!1})}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-105"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[e._v("日志管理")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[s("div",{staticClass:"form-input height70"},[s("el-form-item",{attrs:{label:"sce",prop:"sce"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.sce,callback:function(t){e.$set(e.searchItem,"sce","string"==typeof t?t.trim():t)},expression:"searchItem.sce"}},[s("el-option",{attrs:{label:"cmd",value:"cmd"}}),e._v(" "),s("el-option",{attrs:{label:"long",value:"long"}}),e._v(" "),s("el-option",{attrs:{label:"iat",value:"iat"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"账号",prop:"lenovokey"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.lenovokey,callback:function(t){e.$set(e.searchItem,"lenovokey","string"==typeof t?t.trim():t)},expression:"searchItem.lenovokey"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1)],1),e._v(" "),s("div",{staticClass:"form-btn"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:""}},[s("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),s("el-table-column",{attrs:{label:"sessionid",prop:"sessionid",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sessionid,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.sessionid)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.sessionid)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"sce",prop:"sce",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sce,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.sce)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.sce)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"lenovokey",prop:"lenovokey",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.lenovokey,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.lenovokey)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.lenovokey)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"secretkey",prop:"secretkey",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.secretkey,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.secretkey)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.secretkey)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"插入时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"140"}}),e._v(" "),s("el-table-column",{attrs:{label:"调用时间",prop:"startTime",align:"center",formatter:e.formTime2,"min-width":"140"}})],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var n=s("VU/8")(o,r,!1,function(e){s("GGhV")},"data-v-40158aab",null);t.default=n.exports},GGhV:function(e,t){}});