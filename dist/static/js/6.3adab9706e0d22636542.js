webpackJsonp([6],{"/f2P":function(t,e){},"9bGk":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("D7x1"),l=a("pWbq"),n=a("2hMI"),r=a("WBHA"),s=a.n(r),i={components:{iTable:o.a,countTo:s.a},data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now()-864e5;return t.getTime()>e}},clientList:[],serverList:[],searchItem:{uid:"",dtp:"",refreshTime:"",putTime:""},activeName:"client",CcurrentPage:1,CpageSize:10,CpageSizes:[10,20,30],CtotalCount:1,ScurrentPage:1,SpageSize:10,SpageSizes:[10,20,30],StotalCount:1,seaBtnLoading:!1,ClistLoading:!0,SlistLoading:!0}},created:function(){this.getList()},methods:{resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},formTime:function(t,e){var a=t.it,o=new Date(a);return o.getFullYear()+"-"+Object(l.a)(o.getMonth()+1)+"-"+Object(l.a)(o.getDate())+" "+Object(l.a)(o.getHours())+":"+Object(l.a)(o.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChangeC:function(t){this.CpageSize=t,this.CcurrentPage=1,this.getList()},handleSizeChangeS:function(t){this.SpageSize=t,this.ScurrentPage=1,this.getList()},handleCurrentChangeC:function(t){this.CcurrentPage=t,console.log("当前页: "+t),this.getList()},handleCurrentChangeS:function(t){this.ScurrentPage=t,console.log("当前页: "+t),this.getList()},getList:function(){var t=this,e={pgstr:this.CcurrentPage,pcstr:this.CpageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,uid:this.searchItem.uid,dtp:this.searchItem.dtp},a={pgstr:this.ScurrentPage,pcstr:this.SpageSize};Object(n.C)(e).then(function(e){t.ClistLoading=!1,t.clientList=e.data.data.data,t.CtotalCount=e.data.data.total}),Object(n.C)(a).then(function(e){t.SlistLoading=!1,t.serverList=e.data.data.data,t.StotalCount=e.data.data.total})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,o){return a("el-breadcrumb-item",{key:o},[t._v(t._s(e))])})],2),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:t.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"Uid",prop:"uid"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uid,callback:function(e){t.$set(t.searchItem,"uid","string"==typeof e?e.trim():e)},expression:"searchItem.uid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端类型",prop:"dtp"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.dtp,callback:function(e){t.$set(t.searchItem,"dtp","string"==typeof e?e.trim():e)},expression:"searchItem.dtp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.refreshTime,callback:function(e){t.$set(t.searchItem,"refreshTime",e)},expression:"searchItem.refreshTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.putTime,callback:function(e){t.$set(t.searchItem,"putTime",e)},expression:"searchItem.putTime"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)],1),t._v(" "),a("div",{staticClass:"table-box"},[a("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"客户端信息",name:"client"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.ClistLoading,expression:"ClistLoading"}],staticStyle:{width:"100%"},attrs:{data:t.clientList}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"UID",prop:"uid",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端类型",prop:"dtp",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端ip",prop:"uip",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端位置",prop:"upos",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端版本",prop:"ver",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"服务端地址",prop:"svr",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"执行状态",prop:"stat",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"success"===e.row.stat?"success":"failed"===e.row.stat?"danger":"info","disable-transitions":""}},[t._v(t._s(e.row.stat))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"延时",prop:"cltd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"从结束录音到返回结果",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("延时")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"内容",prop:"rcn",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"插入时间",prop:"it",align:"center",formatter:t.formTime,"min-width":"140"}})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.CcurrentPage,"page-sizes":t.CpageSizes,"page-size":t.CpageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.CtotalCount},on:{"size-change":t.handleSizeChangeC,"current-change":t.handleCurrentChangeC,"update:currentPage":function(e){t.CcurrentPage=e},"update:current-page":function(e){t.CcurrentPage=e}}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"服务器信息",name:"server"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.SlistLoading,expression:"SlistLoading"}],staticStyle:{width:"100%"},attrs:{data:t.serverList}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"总耗时...",prop:"ixcd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"客户端总耗时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("总耗时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"总耗时...",prop:"ixsd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"服务端总耗时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("总耗时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"总延时...",prop:"ixnd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"网络总延时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("总延时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"识别耗时...",prop:"ixad",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"服务端语音识别耗时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("识别耗时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"总延时...",prop:"ixod",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"服务端其他总延时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("总延时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"耗时...",prop:"lpcd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"最后一个包的客户端耗时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("耗时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"耗时...",prop:"lpsd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"最后一个包的服务端耗时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("耗时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"网络延时...",prop:"lpnd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"最后一个包的网络延时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("网络延时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"识别耗时...",prop:"lpad",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"最后一个包的服务端语音识别耗时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("识别耗时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"其他总延时...",prop:"lpod",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"最后一个包的服务端其他总延时",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("总延时...")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"执行状态",prop:"stat",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"success"===e.row.stat?"success":"failed"===e.row.stat?"danger":"info","disable-transitions":""}},[t._v(t._s(e.row.stat))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"延时",prop:"cltd",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"从结束录音到返回结果",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("延时")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"内容",prop:"rcn",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"插入时间",prop:"it",align:"center",formatter:t.formTime,"min-width":"140"}})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.ScurrentPage,"page-sizes":t.SpageSizes,"page-size":t.SpageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.StotalCount},on:{"size-change":t.handleSizeChangeS,"current-change":t.handleCurrentChangeS,"update:currentPage":function(e){t.ScurrentPage=e},"update:current-page":function(e){t.ScurrentPage=e}}})],1)],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(i,c,!1,function(t){a("Y2MZ")},"data-v-65a0124c",null);e.default=p.exports},D7x1:function(t,e,a){"use strict";var o={props:{list:{type:Array,default:[]},columns:{type:Array,default:[]},operates:{},options:{type:Object,default:{stripe:!1,highlightCurrentRow:!1}}},components:{expandDom:{functional:!0,props:{row:Object,render:Function,index:Number,column:{type:Object,default:null}},render:function(t,e){var a={row:e.props.row,index:e.props.index};return e.props.column&&(a.column=e.props.column),e.props.render(t,a)}}},data:function(){return{pageIndex:1,multipleSelection:[]}},mounted:function(){},computed:{},methods:{handleSelectionChange:function(t){this.multipleSelection=t,this.$emit("handleSelectionChange",t)},showActionTableDialog:function(){console.log(4444),this.$emit("handelAction")}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.iTable",value:t.options.loading,expression:"options.loading",modifiers:{iTable:!0}}],ref:"mutipleTable",attrs:{id:"iTable",data:t.list,stripe:t.options.stripe,border:t.options.border}},[a("el-table-column",{attrs:{type:"index",align:"center"}}),t._v(" "),t._l(t.columns,function(e,o){return[a("el-table-column",{key:e.key,attrs:{prop:e.prop,label:e.label,align:e.align,width:e.width,sortable:e.hasSort,"class-name":e.className},scopedSlots:t._u([{key:"default",fn:function(l){return[e.render?[a("expand-dom",{attrs:{column:e,row:l.row,render:e.render,index:o}})]:[e.formatter?[a("span",{domProps:{innerHTML:t._s(e.formatter(l.row,e))}})]:[a("span",[t._v(t._s(l.row[e.prop]))])]]]}}],null,!0)})]}),t._v(" "),t.operates.list.filter(function(t){return!0===t.show}).length>0?a("el-table-column",{ref:"fixedColumn",attrs:{label:"操作",align:"center",width:t.operates.width,fixed:t.operates.fixed},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"operate-group"},[t._l(t.operates.list,function(o,l){return[o.show?a("div",{key:o.id,staticClass:"item"},[a("el-button",{attrs:{type:o.type,size:"mini",icon:o.icon,disabled:o.disabled,plain:o.plain},nativeOn:{click:function(t){return t.preventDefault(),o.method(e.$index,e.row)}}},[t._v(t._s(o.label)+"\n   ")])],1):t._e()]})],2)]}}],null,!1,1531993323)}):t._e()],2)],1)},staticRenderFns:[]};var n=a("VU/8")(o,l,!1,function(t){a("/f2P")},"data-v-ced9f18a",null);e.a=n.exports},Y2MZ:function(t,e){}});