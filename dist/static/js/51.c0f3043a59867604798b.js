webpackJsonp([51],{"9bGk":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("pWbq"),n=a("2hMI"),i=a("krqS"),r={data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now()-864e5;return t.getTime()>e}},clientList:[],serverList:[],searchItem:{uid:"",dtp:"",refreshTime:"",putTime:""},activeName:"client",ctotalClass:"8",totalClass:"8",currentPageC:1,CpageSize:10,CtotalCount:1,isPageNumberErrorC:!1,lastPageC:0,MaxIdC:"",MinIdC:"",nextPageC:"",isLastPageC:!1,lastCurrentPageC:"",currentPageS:1,SpageSize:10,StotalCount:1,showTitle:!0,seaBtnLoading:!1,ClistLoading:!0,SlistLoading:!0,isPageNumberErrorS:!1,lastPageS:0,MaxIdS:"",MinIdS:"",nextPageS:"",isLastPageS:!1,lastCurrentPageS:"",column:{prop:"",order:""}}},created:function(){this.getList(),this.getSList()},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,s=e.scrollWidth;this.showTitle=!(a<s)},resetForm:function(t){this.$refs[t].resetFields(),this.currentPageC=1,this.getList()},formTime:function(t,e){var a=t.it,n=new Date(a);return n.getFullYear()+"-"+Object(s.a)(n.getMonth()+1)+"-"+Object(s.a)(n.getDate())+" "+Object(s.a)(n.getHours())+":"+Object(s.a)(n.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChangeC:function(t){this.CpageSize=t,this.currentPageC=1,this.getList()},handleSizeChangeS:function(t){this.SpageSize=t,this.currentPageS=1,this.getList()},handleCurrentChangeC:function(t){this.currentPageC=t,this.getList()},handleCurrentChangeS:function(t){this.currentPageS=t,this.getList()},turnToPageC:function(t){var e=this;if(-1==(t=parseInt(t)))e.lastPageC=-1,e.getList(t);else{if(!t||t<1)return console.log("页码输入有误！"),e.isPageNumberErrorC=!0,!1;e.lastPageC=0,e.getList(t),e.isPageNumberErrorC=!1}},turnToPageS:function(t){var e=this;if(-1==(t=parseInt(t)))e.lastPageS=-1,e.getSList(t);else{if(!t||t<1)return console.log("页码输入有误！"),e.isPageNumberErrorS=!0,!1;e.lastPageS=0,e.getSList(t),e.isPageNumberErrorS=!1}},sortChange:function(t){this.column={prop:t.prop,order:t.order},console.log(this.column),this.getList()},getList:function(t){var e=this,a={startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,uid:this.searchItem.uid,dtp:this.searchItem.dtp,fieldName:this.column.prop,pgstr:this.nextPageC,pcstr:this.CpageSize,maxId:this.MaxIdC,minId:this.MinIdC,nextPage:1==t||void 0==t?"1":t,currentPage:this.lastCurrentPageC,order:"ascending"==this.column.order?"0":""};a.sign=Object(i.a)(a),Object(n.K)(a).then(function(t){console.log(t.data.data),e.ClistLoading=!1,200==t.data.code?(e.clientList=t.data.data.data,e.ctotalClass=t.data.data.data.length,e.isLastPageC=t.data.data.lastPage,e.lastCurrentPageC=t.data.data.currentPage,e.currentPageC=t.data.data.currentPage,e.MaxIdC=Math.max.apply(Math,e.clientList.map(function(t){return t.id})),e.MinIdC=Math.min.apply(Math,e.clientList.map(function(t){return t.id})),1==t.data.lastPage&&(e.lastPageC=-1)):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.ClistLoading=!1})},getSList:function(t){var e=this,a={pgstr:this.nextPageS,pcstr:this.SpageSize,maxId:this.MaxIdS,minId:this.MinIdS,nextPage:1==t||void 0==t?"1":t,currentPage:this.lastCurrentPageS};a.sign=Object(i.a)(a),Object(n.K)(a).then(function(t){e.SlistLoading=!1,200==t.data.code&&(e.serverList=t.data.data.data,e.totalClass=t.data.data.data.length,e.isLastPageS=t.data.data.lastPage,e.lastCurrentPageS=t.data.data.currentPage,e.currentPageS=t.data.data.currentPage,e.MaxIdS=Math.max.apply(Math,e.serverList.map(function(t){return t.id})),e.MinIdS=Math.min.apply(Math,e.serverList.map(function(t){return t.id})),1==t.data.lastPage&&(e.lastPageS=-1))}).catch(function(){e.SlistLoading=!1})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[t._v("日志管理")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"Uid",prop:"uid"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uid,callback:function(e){t.$set(t.searchItem,"uid","string"==typeof e?e.trim():e)},expression:"searchItem.uid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端类型",prop:"dtp"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.dtp,callback:function(e){t.$set(t.searchItem,"dtp","string"==typeof e?e.trim():e)},expression:"searchItem.dtp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.refreshTime,callback:function(e){t.$set(t.searchItem,"refreshTime",e)},expression:"searchItem.refreshTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.putTime,callback:function(e){t.$set(t.searchItem,"putTime",e)},expression:"searchItem.putTime"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{staticClass:"flex-align",attrs:{label:"客户端信息",name:"client"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.ClistLoading,expression:"ClistLoading"}],class:this.ctotalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.clientList,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),t._v(" "),a("el-table-column",{attrs:{label:"UID",prop:"uid",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.uid,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.uid)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.uid)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"客户端类型",prop:"dtp",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.dtp,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.dtp)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.dtp)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"客户端版本",prop:"ver",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.ver,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.ver)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.ver)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"服务端地址",prop:"svr",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.svr,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.svr)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.svr)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"执行状态",prop:"stat",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:"success"===e.row.stat?"tag-s":"failed"===e.row.stat?"tag-d":"tag-i"},[t._v(t._s(e.row.stat))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"延时",prop:"cltd",align:"center","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.cltd,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.cltd)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.cltd)+"\n                ")]):t._e()]}}])},[a("template",{slot:"header"},[a("el-tooltip",{attrs:{effect:"dark",content:"从结束录音到返回结果",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("延时")])])],1)],2),t._v(" "),a("el-table-column",{attrs:{label:"内容",prop:"rcn",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.rcn,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.rcn)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.rcn)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"插入时间",prop:"it",align:"center",formatter:t.formTime,"min-width":"140"}})],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPageC},on:{click:function(e){return t.turnToPageC(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),0!=t.isLastPageC?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageC(t.currentPageC-2)}}},[t._v(t._s(t.currentPageC-2))]):t._e(),t._v(" "),t.currentPageC-1>0?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageC(t.currentPageC-1)}}},[t._v(t._s(t.currentPageC-1))]):t._e(),t._v(" "),a("li",{staticClass:"active",on:{click:function(e){return t.turnToPageC(t.currentPageC)}}},[t._v(t._s(t.currentPageC))]),t._v(" "),1!=t.isLastPageC?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageC(t.currentPageC+1)}}},[t._v(t._s(t.currentPageC+1))]):t._e(),t._v(" "),t.currentPageC+1<3?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageC(t.currentPageC+2)}}},[t._v(t._s(t.currentPageC+2))]):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:0!=t.lastPageC&&1==t.isLastPageC},on:{click:function(e){return t.turnToPageC(-1)}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),t._v(" "),a("el-tab-pane",{attrs:{label:"服务器信息",name:"server"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.SlistLoading,expression:"SlistLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.serverList,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端总耗时",prop:"ixcd",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"服务端总耗时",prop:"ixsd",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"网络总延时",prop:"ixnd",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"服务端识别耗时",prop:"ixad",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"执行状态",prop:"stat",align:"center","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:"success"===e.row.stat?"tag-s":"failed"===e.row.stat?"tag-d":"tag-i"},[t._v(t._s(e.row.stat))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"延时",prop:"cltd",align:"center"}},[a("template",{slot:"header"},[a("el-tooltip",{attrs:{effect:"dark",content:"从结束录音到返回结果",placement:"top"}},[a("span",{attrs:{slot:""},slot:"default"},[t._v("延时")])])],1)],2),t._v(" "),a("el-table-column",{attrs:{label:"内容",prop:"rcn",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.rcn,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.rcn)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.rcn)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"插入时间",prop:"it",align:"center",formatter:t.formTime,"min-width":"140"}})],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPageS},on:{click:function(e){return t.turnToPageS(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),0!=t.isLastPageS?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageS(t.currentPageS-2)}}},[t._v(t._s(t.currentPageS-2))]):t._e(),t._v(" "),t.currentPageS-1>0?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageS(t.currentPageS-1)}}},[t._v(t._s(t.currentPageS-1))]):t._e(),t._v(" "),a("li",{staticClass:"active",on:{click:function(e){return t.turnToPageS(t.currentPageS)}}},[t._v(t._s(t.currentPageS))]),t._v(" "),1!=t.isLastPageS?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageS(t.currentPageS+1)}}},[t._v(t._s(t.currentPageS+1))]):t._e(),t._v(" "),t.currentPageS+1<3?a("li",{staticClass:"unum",on:{click:function(e){return t.turnToPageS(t.currentPageS+2)}}},[t._v(t._s(t.currentPageS+2))]):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:0!=t.lastPageS&&1==t.isLastPageS},on:{click:function(e){return t.turnToPageS(-1)}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,l,!1,function(t){a("om2H")},"data-v-4e8ad944",null);e.default=o.exports},om2H:function(t,e){}});