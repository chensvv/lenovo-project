webpackJsonp([21],{etgG:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gRE1"),s=i.n(a),o=(i("pWbq"),i("2hMI")),r={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},list:[],perList:[],searchItem:{userId:"",domain:"",asrres:"",respstatus:"",refreshTime:"",putTime:""},infoList:[],infoVisible:!1,currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(s()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("outer:detail")&&(this.isshow=!1)},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleInfo:function(e,t){var i=this;this.infoVisible=!0;var a={id:t.id};Object(o._49)(a).then(function(e){i.infoList=e.data})},infoHandleConfirm:function(){this.infoVisible=!1},infoHandleClose:function(){this.infoVisible=!1},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,userId:this.searchItem.userId,asrres:this.searchItem.asrres,domain:this.searchItem.domain,respstatus:this.searchItem.respstatus,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime};Object(o._50)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("技能管理")]),e._v(" "),e._l(e.$route.meta,function(t,a){return i("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline outer",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[i("el-form-item",{attrs:{label:"用户ID",prop:"userId"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.userId,callback:function(t){e.$set(e.searchItem,"userId","string"==typeof t?t.trim():t)},expression:"searchItem.userId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"用户指令",prop:"asrres"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.asrres,callback:function(t){e.$set(e.searchItem,"asrres","string"==typeof t?t.trim():t)},expression:"searchItem.asrres"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"解析领域",prop:"domain"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.domain,callback:function(t){e.$set(e.searchItem,"domain","string"==typeof t?t.trim():t)},expression:"searchItem.domain"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"响应状态",prop:"respstatus"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.respstatus,callback:function(t){e.$set(e.searchItem,"respstatus","string"==typeof t?t.trim():t)},expression:"searchItem.respstatus"}})],1),e._v(" "),i("el-form-item",{staticClass:"width140",attrs:{label:"起始时间",prop:"refreshTime"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),i("el-form-item",{staticClass:"width140",attrs:{label:"结束时间",prop:"putTime"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),i("el-form-item",{staticClass:"width140"},[i("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalCount<5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"用户ID",prop:"uid",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"用户指令",prop:"userText",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"解析领域",prop:"nlpDomain",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"响应状态",prop:"responseStatus",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"三方名称",prop:"outerType",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"接口名称",prop:"interfaceUrl",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"时间",prop:"displayTime",align:"center","min-width":"120"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"outer:detail",expression:"'outer:detail'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleInfo(t.$index,t.row)}}},[e._v("详情")])]}}],null,!1,1902092414)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"详情",visible:e.infoVisible,width:"300","before-close":e.infoHandleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[i("el-form",{attrs:{"label-position":"right",size:"small","label-width":"100px"}},[i("el-form-item",{attrs:{label:"用户ID"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.uid,callback:function(t){e.$set(e.infoList,"uid",t)},expression:"infoList.uid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"设备类型"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.dtp,callback:function(t){e.$set(e.infoList,"dtp",t)},expression:"infoList.dtp"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"会话ID"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.ixid,callback:function(t){e.$set(e.infoList,"ixid",t)},expression:"infoList.ixid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"来源类型"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.sourceType,callback:function(t){e.$set(e.infoList,"sourceType",t)},expression:"infoList.sourceType"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"请求内容"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.infoList.content,callback:function(t){e.$set(e.infoList,"content",t)},expression:"infoList.content"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"响应头部信息"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.infoList.responseHeader,callback:function(t){e.$set(e.infoList,"responseHeader",t)},expression:"infoList.responseHeader"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"响应内容"}},[i("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.infoList.responseContent,callback:function(t){e.$set(e.infoList,"responseContent",t)},expression:"infoList.responseContent"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"请求消耗时间"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.costTime,callback:function(t){e.$set(e.infoList,"costTime",t)},expression:"infoList.costTime"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"接口名称"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.interfaceName,callback:function(t){e.$set(e.infoList,"interfaceName",t)},expression:"infoList.interfaceName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"接口路径"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.interfaceUrl,callback:function(t){e.$set(e.infoList,"interfaceUrl",t)},expression:"infoList.interfaceUrl"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"响应状态"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.responseStatus,callback:function(t){e.$set(e.infoList,"responseStatus",t)},expression:"infoList.responseStatus"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"错误信息"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.errorMsg,callback:function(t){e.$set(e.infoList,"errorMsg",t)},expression:"infoList.errorMsg"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"三方名称"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.outerType,callback:function(t){e.$set(e.infoList,"outerType",t)},expression:"infoList.outerType"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"入库时间"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.displayTime,callback:function(t){e.$set(e.infoList,"displayTime",t)},expression:"infoList.displayTime"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"解析领域"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.nlpDomain,callback:function(t){e.$set(e.infoList,"nlpDomain",t)},expression:"infoList.nlpDomain"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"用户指令"}},[i("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoList.userText,callback:function(t){e.$set(e.infoList,"userText",t)},expression:"infoList.userText"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:e.infoHandleConfirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(r,n,!1,function(e){i("yzT6")},"data-v-cce08cba",null);t.default=l.exports},yzT6:function(e,t){}});