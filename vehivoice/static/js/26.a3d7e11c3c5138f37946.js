webpackJsonp([26],{ONWU:function(e,t){},zDsE:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("pWbq"),o=s("2hMI"),i=s("krqS"),n={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now();return e.getTime()>t}},list:[],totalClass:"8",searchItem:{app:"",desc:"",pickerVal:[]},column:{prop:"",order:""},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!0}},created:function(){this.getList()},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,a=t.scrollWidth;this.showTitle=!(s<a)},formTime:function(e,t){var s=e.it,o=new Date(s);return o.getFullYear()+"-"+Object(a.a)(o.getMonth()+1)+"-"+Object(a.a)(o.getDate())+" "+Object(a.a)(o.getHours())+":"+Object(a.a)(o.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},sortChange:function(e){this.column={prop:e.prop,order:e.order},console.log(this.column),this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],app:this.searchItem.app,desc:this.searchItem.desc,fieldName:this.column.prop,order:"ascending"==this.column.order?"0":""};t.sign=Object(i.a)(t),Object(o._136)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data.data,e.totalCount=t.data.data.total,e.totalClass=t.data.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-105"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[e._v("日志管理")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[s("div",{staticClass:"form-input height70"},[s("el-form-item",{attrs:{label:"应用包名",prop:"app"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.app,callback:function(t){e.$set(e.searchItem,"app","string"==typeof t?t.trim():t)},expression:"searchItem.app"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"描述",prop:"desc"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.desc,callback:function(t){e.$set(e.searchItem,"desc","string"==typeof t?t.trim():t)},expression:"searchItem.desc"}})],1),e._v(" "),s("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[s("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),s("div",{staticClass:"form-btn"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":e.sortChange}},[s("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),s("el-table-column",{attrs:{label:"客户端设备ID",prop:"did",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.did,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.did)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.did)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"客户端版本",prop:"ver",align:"center",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.ver,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.ver)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.ver)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作时间",prop:"opts",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.opts,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.opts)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.opts)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"应用包名",prop:"app",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.app,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.app)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.app)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",prop:"oper",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.oper,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.oper)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.oper)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"描述",prop:"desc",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.desc,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.desc)+"\n                ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                "+e._s(t.row.desc)+"\n            ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"插入时间",prop:"it",align:"center",formatter:e.formTime,width:"130"}})],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var l=s("VU/8")(n,r,!1,function(e){s("ONWU")},"data-v-a91f83bc",null);t.default=l.exports}});