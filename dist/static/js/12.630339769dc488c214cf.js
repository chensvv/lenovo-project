webpackJsonp([12],{"5cBU":function(e,t){},WIO6:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("D7x1"),o=l("4/BI"),i={name:"applicationlist",components:{iTable:a.a},data:function(){var e=this;return{list:[],searchItem:{},infoItem:{},columns:[{prop:"index",label:"序号",align:"center",hasSort:!0},{prop:"mobile_num",label:"用户ID",align:"center",hasSort:!0},{prop:"biem",label:"用户指令",align:"center",hasSort:!0},{prop:"biem",label:"解析领域",align:"center",hasSort:!0},{prop:"biem",label:"响应状态",align:"center",hasSort:!0},{prop:"was_from",label:"三方名称",align:"center",hasSort:!0},{prop:"biem",label:"接口名称",align:"center",hasSort:!0},{prop:"refreshTime",label:"时间",align:"center",hasSort:!0,render:function(e,t){var l=parseInt(t.row.refreshTime);return e("span",Object(o.a)(new Date(l),"yyyy-MM-dd hh:mm"))}}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:120,show:!1,list:[{id:"1",label:"详情",show:!0,plain:!0,disabled:!1,method:function(t,l){e.handleInfo(t,l)}}]},infoVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields()},onSubmit:function(){var e=this;console.log(this.searchItem),this.seaBtnLoading=!0,setTimeout(function(){e.seaBtnLoading=!1},2e3)},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e)},handleInfo:function(e,t){console.log(e,t),this.infoVisible=!0,this.infoItem={yhID:t.mobile_num,sblx:t.biem,hhID:t.biem,lylx:t.biem,qqnr:t.cost,xytbxx:t.platform,xynr:t.biem,qqxhsj:t.biem,jkmc:t.biem,jklj:t.biem,xyzt:t.biem,cwxx:t.biem,sfmc:t.was_from,rksj:t.refreshTime,jxly:t.biem,yhzl:t.biem}},infoHandleConfirm:function(){this.infoVisible=!1},infoHandleClose:function(){this.infoVisible=!1},getList:function(){var e=this;this.$http.get("/api/data").then(function(t){e.list=t.data,t.data.forEach(function(t){t.index=t.id%e.pageSize,0==t.index&&(t.index=e.pageSize)}),e.totalCount=e.list.length,e.options.loading=!1})}}},n={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"table"},[l("el-breadcrumb",{attrs:{separator:"/"}},[l("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),l("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,a){return l("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),l("el-form",{ref:"searchItem",staticClass:"demo-form-inline outer",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[l("el-form-item",{attrs:{label:"用户ID",prop:"mobile_num"}},[l("el-input",{attrs:{clearable:""},model:{value:e.searchItem.mobile_num,callback:function(t){e.$set(e.searchItem,"mobile_num",t)},expression:"searchItem.mobile_num"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"用户指令",prop:"zhil"}},[l("el-input",{attrs:{clearable:""},model:{value:e.searchItem.zhil,callback:function(t){e.$set(e.searchItem,"zhil",t)},expression:"searchItem.zhil"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"解析领域",prop:"lingy"}},[l("el-input",{attrs:{clearable:""},model:{value:e.searchItem.lingy,callback:function(t){e.$set(e.searchItem,"lingy",t)},expression:"searchItem.lingy"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"响应状态",prop:"state"}},[l("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.state,callback:function(t){e.$set(e.searchItem,"state",t)},expression:"searchItem.state"}},[l("el-option",{attrs:{label:"联想",value:"联想"}}),e._v(" "),l("el-option",{attrs:{label:"百度",value:"百度"}})],1)],1),e._v(" "),l("el-form-item",{staticClass:"width140",attrs:{label:"开始时间",prop:"refreshTime"}},[l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),l("el-form-item",{staticClass:"width140",attrs:{label:"结束时间",prop:"putTime"}},[l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),l("el-form-item",{staticClass:"width140"},[l("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),l("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1),e._v(" "),l("div",{staticClass:"table-box"},[l("i-table",{attrs:{list:e.list.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),l("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),l("el-dialog",{attrs:{title:"详情",visible:e.infoVisible,width:"300","before-close":e.infoHandleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[l("el-form",{attrs:{"label-position":"left","label-width":"100px"}},[l("el-form-item",{attrs:{label:"用户ID"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.yhID,callback:function(t){e.$set(e.infoItem,"yhID",t)},expression:"infoItem.yhID"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"设备类型"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.sblx,callback:function(t){e.$set(e.infoItem,"sblx",t)},expression:"infoItem.sblx"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"会话ID"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.hhID,callback:function(t){e.$set(e.infoItem,"hhID",t)},expression:"infoItem.hhID"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"来源类型"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.lylx,callback:function(t){e.$set(e.infoItem,"lylx",t)},expression:"infoItem.lylx"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"请求内容"}},[l("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.infoItem.qqnr,callback:function(t){e.$set(e.infoItem,"qqnr",t)},expression:"infoItem.qqnr"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"响应头部信息"}},[l("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.infoItem.xytbxx,callback:function(t){e.$set(e.infoItem,"xytbxx",t)},expression:"infoItem.xytbxx"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"响应内容"}},[l("el-input",{attrs:{type:"textarea","auto-complete":"off",readonly:""},model:{value:e.infoItem.xynr,callback:function(t){e.$set(e.infoItem,"xynr",t)},expression:"infoItem.xynr"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"请求消耗时间"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.qqxhsj,callback:function(t){e.$set(e.infoItem,"qqxhsj",t)},expression:"infoItem.qqxhsj"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"接口名称"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.jkmc,callback:function(t){e.$set(e.infoItem,"jkmc",t)},expression:"infoItem.jkmc"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"接口路径"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.jklj,callback:function(t){e.$set(e.infoItem,"jklj",t)},expression:"infoItem.jklj"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"响应状态"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.xyzt,callback:function(t){e.$set(e.infoItem,"xyzt",t)},expression:"infoItem.xyzt"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"错误信息"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.cwxx,callback:function(t){e.$set(e.infoItem,"cwxx",t)},expression:"infoItem.cwxx"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"三方名称"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.sfmc,callback:function(t){e.$set(e.infoItem,"sfmc",t)},expression:"infoItem.sfmc"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"入库时间"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.rksj,callback:function(t){e.$set(e.infoItem,"rksj",t)},expression:"infoItem.rksj"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"解析领域"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.jxly,callback:function(t){e.$set(e.infoItem,"jxly",t)},expression:"infoItem.jxly"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"用户指令"}},[l("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.infoItem.yhzl,callback:function(t){e.$set(e.infoItem,"yhzl",t)},expression:"infoItem.yhzl"}})],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.infoHandleConfirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=l("VU/8")(i,n,!1,function(e){l("5cBU")},"data-v-70481794",null);t.default=r.exports}});