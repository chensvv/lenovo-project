webpackJsonp([20],{O0jc:function(e,t){},r7jg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Dd8w"),n=i.n(a),s=i("fZjL"),r=i.n(s),o=i("gRE1"),l=i.n(o),c=i("pWbq"),u=i("krqS"),p=i("7oYi"),d=i("2hMI"),h={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now();return e.getTime()>t}},getpageNum:p.a,searchItem:{pickerVal:[],asrres:"",intent:"",pid:"",parrotmin:"",parrotmax:"",userId:""},searchKey:[],list:[],infoList:[],intentList:[],infoData:{uid:"",asrres:"",nluApproach:"",intent:""},keyList:[],perList:[],pidList:[],totalClass:"8",timer:null,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,btnLoading:!1,listLoading:!0,popLoading:!1,visiblepop:!1,infoVisible:!1,roachLoading:!1}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(l()(t).join())}),this.getroachList()},directives:{"debounce-input":{inserted:function(e,t){var i=void 0;e.addEventListener("input",function(){clearTimeout(i),i=setTimeout(function(){t.value()},parseInt(t.arg)||300)})}}},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,a=t.scrollWidth;this.showTitle=!(i<a)},formTime:function(e,t){var i=e.createTime,a=new Date(i);return a.getFullYear()+"-"+Object(c.a)(a.getMonth()+1)+"-"+Object(c.a)(a.getDate())+" "+Object(c.a)(a.getHours())+":"+Object(c.a)(a.getMinutes())},onSubmit:function(){this.btnLoading=!0,this.currentPage=1,this.listLoading=!0,this.getList(),this.btnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.listLoading=!0,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},popverShow:function(){this.getLoginfoKey()},popverHide:function(){},getroachList:function(){var e=this;Object(d._129)({pid:0}).then(function(t){200==t.data.code?(e.pidList=t.data.data,e.searchItem.pid=e.pidList[0].id,e.$nextTick(function(){e.getIntentList(e.$refs.approachId.selected.value),e.getList()})):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(e){})},roachChange:function(e){this.intentList=[],this.keyList=[],this.searchItem.intent="",this.getIntentList(e)},intentChange:function(e){this.searchKey=[],this.getLoginfoKey(e)},visibleChange:function(e){e&&this.getLoginfoKey(this.$refs.intent.selected.value),this.visiblepop=!0},intentClear:function(){},intentInput:function(){},rowClick:function(e,t){var i=this,a={intent:t.intent,nluApproach:t.nluApproach};Object(d._128)(a).then(function(e){i.infoList=e.data.data,i.infoList.forEach(function(e){e[e.key]=t[e.key]})}),this.infoData={uid:t.userId,asrres:t.asrres,nluApproach:t.nluApproach,intent:t.intent},this.infoVisible=!0},handleClose:function(){this.infoVisible=!1},handleConfirm:function(){this.infoVisible=!1},getLoginfoKey:function(e){var t=this;if(void 0!=e&&""!=e){var i={pid:e};Object(d._129)(i).then(function(e){200==e.data.code?(t.keyList=e.data.data,null!=e.data.data?t.popLoading=!1:t.popLoading=!0):(t.keyList=[],t.popLoading=!0)}).catch(function(e){t.keyList=[],t.popLoading=!0})}else this.keyList=[],this.popLoading=!0},getIntentList:function(e){var t=this,i={pid:e};Object(d._129)(i).then(function(e){200==e.data.code&&(t.intentList=e.data.data)})},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,userId:this.searchItem.userId,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],intent:this.$refs.intent.selected.label,asrres:this.searchItem.asrres,useTimeS:this.searchItem.parrotmin,useTimeE:this.searchItem.parrotmax,nluApproach:this.$refs.approachId.selected.label,key1:this.searchKey.key1,key2:this.searchKey.key2,key3:this.searchKey.key3,key4:this.searchKey.key4,key5:this.searchKey.key5,key6:this.searchKey.key6,key7:this.searchKey.key7,key8:this.searchKey.key8,key9:this.searchKey.key9,key10:this.searchKey.key10,key11:this.searchKey.key11,key12:this.searchKey.key12,key13:this.searchKey.key13,key14:this.searchKey.key14,key15:this.searchKey.key15};t.sign=Object(u.a)(t),Object(d._130)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})},getData:function(e,t){return t.map(function(t){var i=e.find(function(e){return r()(t).includes(e.key)})||{};return n()({},i,t)})}}},m={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-105"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/nlulog/list"}}},[e._v("运营日志分析")]),e._v(" "),i("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[i("div",{staticClass:"form-input height70"},[i("el-form-item",{attrs:{label:"用户ID",prop:"userId"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.userId,callback:function(t){e.$set(e.searchItem,"userId","string"==typeof t?t.trim():t)},expression:"searchItem.userId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"文本指令",prop:"asrres"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.asrres,callback:function(t){e.$set(e.searchItem,"asrres","string"==typeof t?t.trim():t)},expression:"searchItem.asrres"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"处理分支",prop:"pid"}},[i("el-select",{ref:"approachId",attrs:{loading:e.roachLoading,placeholder:"--"},on:{change:e.roachChange},model:{value:e.searchItem.pid,callback:function(t){e.$set(e.searchItem,"pid",t)},expression:"searchItem.pid"}},e._l(e.pidList,function(e,t){return i("el-option",{key:t,attrs:{label:e.key,value:e.id}})}),1)],1),e._v(" "),i("el-popover",{attrs:{placement:"right",width:"300",trigger:"click",title:"详细日志","popper-class":"popkey"},on:{show:e.popverShow,hide:e.popverHide},model:{value:e.visiblepop,callback:function(t){e.visiblepop=t},expression:"visiblepop"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.popLoading,expression:"popLoading"}],staticClass:"as",attrs:{"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 1)"}}),e._v(" "),e._l(e.keyList,function(t,a){return i("div",{key:a,staticClass:"keyLabel"},[i("el-form-item",{attrs:{label:t.desc,prop:t.key}},[i("el-input",{model:{value:e.searchKey[t.key],callback:function(i){e.$set(e.searchKey,t.key,"string"==typeof i?i.trim():i)},expression:"searchKey[item.key]"}})],1)],1)}),e._v(" "),i("el-form-item",{attrs:{slot:"reference",label:"意图",prop:"intent"},slot:"reference"},[i("el-select",{ref:"intent",attrs:{placeholder:"--",clearable:""},on:{change:e.intentChange,"visible-change":e.visibleChange,clear:e.intentClear},model:{value:e.searchItem.intent,callback:function(t){e.$set(e.searchItem,"intent",t)},expression:"searchItem.intent"}},e._l(e.intentList,function(e,t){return i("el-option",{key:t,attrs:{label:e.key,value:e.id}})}),1)],1)],2),e._v(" "),i("el-form-item",{staticClass:"parrotinput",attrs:{label:"parrot耗时",prop:"parrotmin"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.parrotmin,callback:function(t){e.$set(e.searchItem,"parrotmin","string"==typeof t?t.trim():t)},expression:"searchItem.parrotmin"}}),e._v(" - \n                "),i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.parrotmax,callback:function(t){e.$set(e.searchItem,"parrotmax","string"==typeof t?t.trim():t)},expression:"searchItem.parrotmax"}})],1),e._v(" "),i("el-form-item",{staticClass:"nludate-form",attrs:{label:"日期",prop:"pickerVal"}},[i("el-date-picker",{attrs:{type:"datetimerange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.btnLoading},on:{click:e.onSubmit}},[e._v("查询")])],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[i("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),i("el-table-column",{attrs:{label:"用户ID",prop:"userId",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.userId,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.userId)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.userId)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"文本指令",prop:"asrres",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.asrres,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.asrres)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.asrres)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"处理分支",prop:"nluApproach",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.nluApproach,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.nluApproach)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.nluApproach)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"意图",prop:"intent",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.intent,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.intent)+"\n                    ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.intent)+"\n                ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,width:"130"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlulog:detail",expression:"'nlulog:detail'"}],attrs:{size:"mini"},on:{click:function(i){return e.rowClick(t.$index,t.row)}}},[e._v("详情")])]}}])})],1),e._v(" "),i("div",{staticClass:"pagination-wrap"},[i("ul",{staticClass:"pagination"},[i("li",[i("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[i("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==this.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),i("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=this.getpageNum(e.totalCount)?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=this.getpageNum(e.totalCount)?i("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),i("li",[i("button",{attrs:{disabled:e.currentPage==this.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(this.getpageNum(e.totalCount))}}},[i("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),i("el-dialog",{staticClass:"aksk-info",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"详情",visible:e.infoVisible,width:"40%",top:"10vh","before-close":e.handleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[i("el-descriptions",[i("el-descriptions-item",{attrs:{label:"Uid"}},[e._v(e._s(e.infoData.uid))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"文本指令"}},[e._v(e._s(e.infoData.asrres))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"处理分支"}},[e._v(e._s(e.infoData.nluApproach))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"意图"}},[e._v(e._s(e.infoData.intent))]),e._v(" "),e._l(e.infoList,function(t,a){return[i("el-descriptions-item",{key:a,attrs:{label:t.desc}},[e._v(e._s(t[t.key]))])]})],2),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirm()}}},[e._v("关闭")])],1)],1)],1)},staticRenderFns:[]};var g=i("VU/8")(h,m,!1,function(e){i("O0jc")},"data-v-cc60570c",null);t.default=g.exports}});