webpackJsonp([22],{"P+Zp":function(t,e){},tpdv:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("gRE1"),i=a.n(s),n=a("pWbq"),r=a("2hMI"),o=a("krqS"),l={data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now();return t.getTime()>e}},list:[],perList:[],totalClass:"8",searchItem:{uid:"",ixid:"",status:"",pickerVal:[]},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!0,isLastPage:!1}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(i()(e).join())}),void 0==this.$route.params.page?this.getList():this.getList(this.$route.params.page)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,s=e.scrollWidth;this.showTitle=!(a<s)},formTime:function(t,e){var a=t.createTime,s=new Date(a);return s.getFullYear()+"-"+Object(n.a)(s.getMonth()+1)+"-"+Object(n.a)(s.getDate())+" "+Object(n.a)(s.getHours())+":"+Object(n.a)(s.getMinutes())},formTimeStart:function(t,e){var a=t.startTime,s=new Date(a),i=s.getMilliseconds();return s.getFullYear()+"-"+Object(n.a)(s.getMonth()+1)+"-"+Object(n.a)(s.getDate())+" "+Object(n.a)(s.getHours())+":"+Object(n.a)(s.getMinutes())+":"+Object(n.a)(s.getSeconds())+":"+(i<10?"00"+i:i<100?"0"+i:i)},formTimeEnd:function(t,e){var a=t.endTime,s=new Date(a),i=s.getMilliseconds();return s.getFullYear()+"-"+Object(n.a)(s.getMonth()+1)+"-"+Object(n.a)(s.getDate())+" "+Object(n.a)(s.getHours())+":"+Object(n.a)(s.getMinutes())+":"+Object(n.a)(s.getSeconds())+":"+(i<10?"00"+i:i<100?"0"+i:i)},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},handleInfo:function(t,e){this.$router.push({name:"asrlogdetail",params:{ixid:e.ixidString,page:this.$refs.page.innerHTML}})},getList:function(t){var e=this;this.listLoading=!0;var a={uid:this.searchItem.uid,ixid:this.searchItem.ixid,nextPage:1==t||void 0==t?1:t,pcstr:this.pageSize,status:this.searchItem.status,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1]};a.sign=Object(o.a)(a),this.list=[],Object(r.y)(a).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data.data,e.isLastPage=t.data.data.lastPage,e.totalClass=t.data.data.data.length,e.currentPage=t.data.data.currentPage):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[t._v("日志管理")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"101px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"用户id",prop:"uid"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uid,callback:function(e){t.$set(t.searchItem,"uid","string"==typeof e?e.trim():e)},expression:"searchItem.uid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"识别会话id",prop:"ixid"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.ixid,callback:function(e){t.$set(t.searchItem,"ixid","string"==typeof e?e.trim():e)},expression:"searchItem.ixid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否成功识别",prop:"status"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:t.searchItem.status,callback:function(e){t.$set(t.searchItem,"status","string"==typeof e?e.trim():e)},expression:"searchItem.status"}},[a("el-option",{attrs:{label:"成功",value:"success"}}),t._v(" "),a("el-option",{attrs:{label:"失败",value:"failed"}})],1)],1),t._v(" "),a("el-form-item",{staticClass:"nludate-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"datetimerange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:t.searchItem.pickerVal,callback:function(e){t.$set(t.searchItem,"pickerVal",e)},expression:"searchItem.pickerVal"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户id",prop:"uid",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.uid,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.uid)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.uid)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"识别会话id",prop:"ixidString",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.ixidString,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.ixidString)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.ixidString)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"识别交互次数",prop:"pidx",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.pidx,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.pidx)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.pidx)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"长短语音",prop:"sce",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s("cmd"==e.row.sce?"短语音":"长语音"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"是否尾包",prop:"over",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(0==e.row.over?"否":"是"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"最大请求时间",prop:"maxUseTime",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.maxUseTime)+"ms")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"识别请求状态",prop:"status",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:"success"===e.row.status?"tag-s":"tag-d"},[t._v(t._s("success"==e.row.status?"成功":"失败"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:t.formTime,"min-width":"130"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"app:keywordupdate",expression:"'app:keywordupdate'"}],attrs:{size:"mini"},on:{click:function(a){return t.handleInfo(e.$index,e.row)}}},[t._v("明细")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),0!=t.isLastPage&&1!=t.currentPage&&t.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),a("li",{ref:"page",staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),1!=t.isLastPage?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&1!=t.isLastPage?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:1==t.isLastPage},on:{click:function(e){return t.turnToPage(-1)}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1)],1)},staticRenderFns:[]};var u=a("VU/8")(l,c,!1,function(t){a("P+Zp")},"data-v-ae977d34",null);e.default=u.exports}});