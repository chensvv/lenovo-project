webpackJsonp([76],{g6lS:function(e,t){},r7jg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("Dd8w"),a=i.n(s),n=i("fZjL"),r=i.n(n),o=i("gRE1"),l=i.n(o),c=i("pWbq"),u=i("krqS"),p=i("2hMI"),h={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now();return e.getTime()>t}},searchItem:{pickerVal:[],asrres:"",intent:""},searchKey:[],list:[],infoList:[],infoData:{uid:"",asrres:"",nluApproach:"",intent:""},keyList:[],perList:[],totalClass:"8",timer:null,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,btnLoading:!1,listLoading:!0,popLoading:!1,visiblepop:!1,infoVisible:!1}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(l()(t).join())}),this.getList()},directives:{"debounce-input":{inserted:function(e,t){var i=void 0;e.addEventListener("input",function(){clearTimeout(i),i=setTimeout(function(){t.value()},parseInt(t.arg)||300)})}}},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,s=t.scrollWidth;this.showTitle=!(i<s)},formTime:function(e,t){var i=e.createTime,s=new Date(i);return s.getFullYear()+"-"+Object(c.a)(s.getMonth()+1)+"-"+Object(c.a)(s.getDate())+" "+Object(c.a)(s.getHours())+":"+Object(c.a)(s.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.searchKey=[],this.currentPage=1,this.getList()},onSubmit:function(){this.btnLoading=!0,this.currentPage=1,this.listLoading=!0,this.getList(),this.btnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.listLoading=!0,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},popverShow:function(){this.getLoginfoKey()},popverHide:function(){},intentInput:function(){this.searchKey=[]},rowClick:function(e,t){var i=this,s={key:t.intent};Object(p._91)(s).then(function(e){i.infoList=e.data.data,i.infoList.forEach(function(e){e[e.key]=t[e.key]})}),this.infoData={uid:t.userId,asrres:t.asrres,nluApproach:t.nluApproach,intent:t.intent},this.infoVisible=!0},handleClose:function(){this.infoVisible=!1},handleConfirm:function(){this.infoVisible=!1},getLoginfoKey:function(){var e=this,t={key:this.searchItem.intent};Object(p._91)(t).then(function(t){200==t.data.code?(e.keyList=t.data.data,null!=t.data.data?e.popLoading=!1:e.popLoading=!0):(e.keyList=[],e.popLoading=!0)})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],intent:this.searchItem.intent,asrres:this.searchItem.asrres,key1:this.searchKey.key1,key2:this.searchKey.key2,key3:this.searchKey.key3,key4:this.searchKey.key4,key5:this.searchKey.key5,key6:this.searchKey.key6,key7:this.searchKey.key7,key8:this.searchKey.key8,key9:this.searchKey.key9,key10:this.searchKey.key10,key11:this.searchKey.key11,key12:this.searchKey.key12,key13:this.searchKey.key13,key14:this.searchKey.key14,key15:this.searchKey.key15,key16:this.searchKey.key16,key17:this.searchKey.key17,key18:this.searchKey.key18,key19:this.searchKey.key19,key20:this.searchKey.key20};t.sign=Object(u.a)(t),Object(p._92)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})},getData:function(e,t){return t.map(function(t){var i=e.find(function(e){return r()(t).includes(e.key)})||{};return a()({},i,t)})}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-105"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/app/list"}}},[e._v("应用搜索")]),e._v(" "),i("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[i("div",{staticClass:"form-input height70"},[i("el-form-item",{attrs:{label:"文本指令",prop:"asrres"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.asrres,callback:function(t){e.$set(e.searchItem,"asrres","string"==typeof t?t.trim():t)},expression:"searchItem.asrres"}})],1),e._v(" "),i("el-popover",{attrs:{placement:"right",width:"300",trigger:"click",title:"详细日志","popper-class":"popkey"},on:{show:e.popverShow,hide:e.popverHide},model:{value:e.visiblepop,callback:function(t){e.visiblepop=t},expression:"visiblepop"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.popLoading,expression:"popLoading"}],staticClass:"as",attrs:{"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 1)"}}),e._v(" "),e._l(e.keyList,function(t,s){return i("div",{key:s,staticClass:"keyLabel"},[i("el-form-item",{attrs:{label:t.value,prop:t.key}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchKey[t.key],callback:function(i){e.$set(e.searchKey,t.key,"string"==typeof i?i.trim():i)},expression:"searchKey[item.key]"}})],1)],1)}),e._v(" "),i("el-form-item",{attrs:{slot:"reference",label:"意图",prop:"intent"},slot:"reference"},[i("el-input",{directives:[{name:"debounce-input",rawName:"v-debounce-input",value:e.getLoginfoKey,expression:"getLoginfoKey"}],attrs:{clearable:""},on:{input:e.intentInput},model:{value:e.searchItem.intent,callback:function(t){e.$set(e.searchItem,"intent","string"==typeof t?t.trim():t)},expression:"searchItem.intent"}})],1)],2),e._v(" "),i("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[i("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.btnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[i("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),i("el-table-column",{attrs:{label:"用户ID",prop:"userId",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.userId,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.userId)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.userId)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"文本指令",prop:"asrres",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.asrres,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.asrres)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.asrres)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"处理分支",prop:"nluApproach",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.nluApproach,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.nluApproach)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.nluApproach)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"意图",prop:"intent",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.intent,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.intent)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.intent)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,width:"130"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlulog:detail",expression:"'nlulog:detail'"}],attrs:{size:"mini"},on:{click:function(i){return e.rowClick(t.$index,t.row)}}},[e._v("详情")])]}}])})],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{staticClass:"aksk-info",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"详情",visible:e.infoVisible,width:"40%",top:"10vh","before-close":e.handleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[i("el-descriptions",[i("el-descriptions-item",{attrs:{label:"Uid"}},[e._v(e._s(e.infoData.uid))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"文本指令"}},[e._v(e._s(e.infoData.asrres))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"处理分支"}},[e._v(e._s(e.infoData.nluApproach))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"意图"}},[e._v(e._s(e.infoData.intent))]),e._v(" "),e._l(e.infoList,function(t,s){return[i("el-descriptions-item",{key:s,attrs:{label:t.value}},[e._v(e._s(t[t.key]))])]})],2),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirm()}}},[e._v("关闭")])],1)],1)],1)},staticRenderFns:[]};var m=i("VU/8")(h,d,!1,function(e){i("g6lS")},"data-v-140840d4",null);t.default=m.exports}});