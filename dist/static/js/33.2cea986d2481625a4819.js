webpackJsonp([33],{TV7j:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gRE1"),n=a.n(i),o=a("2hMI"),s=a("krqS"),r=a("pWbq"),l={data:function(){var e=this;return{pickerOptions:{disabledDate:function(t){var a=Date.now(),i=e.timeOptionRange;return i?t.getTime()>i.getTime()+(Date.now()-i.getTime()<2592e6?Date.now()-i.getTime():2592e6)||t.getTime()<i.getTime()-2592e6:t.getTime()>a},onPick:function(t){t.minDate&&!t.maxDate&&(e.timeOptionRange=t.minDate),t.maxDate&&(e.timeOptionRange=null)}},list:[],perList:[],totalClass:"8",pickerVal:[],searchItem:{lenovoid:"",pickerVal:[]},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,listLoading:!0,fileBtnLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("csc:delete")&&(this.isshow=!1)},methods:{formTime:function(e,t){var a=e.createTime,i=new Date(a);return i.getFullYear()+"-"+Object(r.a)(i.getMonth()+1)+"-"+Object(r.a)(i.getDate())+" "+Object(r.a)(i.getHours())+":"+Object(r.a)(i.getMinutes())},formTime2:function(e,t){var a=e.updateTime,i=new Date(a);return i.getFullYear()+"-"+Object(r.a)(i.getMonth()+1)+"-"+Object(r.a)(i.getDate())+" "+Object(r.a)(i.getHours())+":"+Object(r.a)(i.getMinutes())},onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,i=t.scrollWidth;this.showTitle=!(a<i)},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},dateChangebirthday:function(e){null==e&&(e=[]),this.searchItem.startTime=e[0],this.searchItem.endTime=e[1]},exportFile:function(){var e=this,t={startStr:this.searchItem.startTime,endStr:this.searchItem.endTime,lenovoid:this.searchItem.lenovoid};t.sign=Object(s.a)(t),this.fileBtnLoading=!0,Object(o._102)(t).then(function(t){var a=new Blob([t.data],{type:"text/csv,charset=UTF-8"}),i=document.createElement("a"),n=window.URL.createObjectURL(a),o=""==e.searchItem.startTime&&""==e.searchItem.endTime&&""==e.searchItem.lenovoid?"支付信息.csv":""==e.searchItem.startTime&&""==e.searchItem.endTime&&""!=e.searchItem.lenovoid?e.searchItem.lenovoid+".csv":e.searchItem.startTime+"-"+e.searchItem.endTime+".csv";i.href=n,i.download=o,i.click(),window.URL.revokeObjectURL(n),e.fileBtnLoading=!1}).catch(function(t){e.fileBtnLoading=!1})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,lenovoid:this.searchItem.lenovoid,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1]};t.sign=Object(s.a)(t),Object(o._103)(t).then(function(t){console.log(t),e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[e._v("日志管理")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"用户ID",prop:"lenovoid"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.lenovoid,callback:function(t){e.$set(e.searchItem,"lenovoid","string"==typeof t?t.trim():t)},expression:"searchItem.lenovoid"}})],1),e._v(" "),a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"默认导出全部数据，如需自定义请根据左侧查询条件导出",placement:"top-end"}},[a("el-button",{attrs:{size:"mini",icon:"el-icon-download",loading:e.fileBtnLoading},on:{click:function(t){return e.exportFile()}}},[e._v("导出数据")])],1)],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"lenovoid",prop:"lenovoid",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.lenovoid,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.lenovoid)+"\n                      ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.lenovoid)+"\n                  ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"时长",prop:"duration",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.duration,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.duration)+"\n                      ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.duration)+"\n                  ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"status",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s("1"==t.row.status?"创建订单":"2"==t.row.status?"同步CUI失败":"订单同步成功"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"总金额",prop:"totalMoney",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.totalMoney,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.totalMoney)+"\n                      ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.totalMoney)+"\n                  ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"参数",prop:"paramJson",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.paramJson,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.paramJson)+"\n                      ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.paramJson)+"\n                  ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"描述",prop:"description",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.description,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.description)+"\n                      ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.description)+"\n                  ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,width:"130"}}),e._v(" "),a("el-table-column",{attrs:{label:"修改时间",prop:"updateTime",align:"center",formatter:e.formTime2,width:"130"}})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var d=a("VU/8")(l,c,!1,function(e){a("dFgc")},"data-v-72521b0a",null);t.default=d.exports},dFgc:function(e,t){}});