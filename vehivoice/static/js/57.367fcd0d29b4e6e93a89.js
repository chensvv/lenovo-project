webpackJsonp([57],{V9DN:function(t,e){},c914:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),s=a.n(i),n=a("pWbq"),r=a("2hMI"),l=a("krqS"),o=(a("FT/c"),a("Icdr"));a("4UDB"),a("miEh"),a("Oq2I"),a("ILx8"),a("80cc");var c={data:function(){var t=this;return{pickerOptionsList:{disabledDate:function(t){var e=Date.now();return t.getTime()>e}},pickerOptions:{disabledDate:function(e){var a=Date.now(),i=t.timeOptionRange;return i?e.getTime()>i.getTime()+(Date.now()-i.getTime()<1296e6?Date.now()-i.getTime():1296e6)||e.getTime()<i.getTime()-1296e6:e.getTime()>a},onPick:function(e){e.minDate&&!e.maxDate&&(t.timeOptionRange=e.minDate),e.maxDate&&(t.timeOptionRange=null)}},searchItem:{dtp:"",uip:"",uid:"",vdm:"",app:"",desc:"",stat:"",pickerVal:[]},searchStat:{pickerVal:[]},list:[],perList:[],totalClass:"8",infoList:{id:"",did:"",dtp:"",uid:"",uip:"",ver:"",stat:"",vdm:"",pidx:"",ixid:"",asrd:"",over:"",dev:"",alld:"",cprv:"",svr:"",egt:"",cnwp:"",dsc:"",it:"",nlpd:"",sppd:"",l1c:"",l2c:""},clientInfo:{uid:"",dtp:"",ver:"",svr:"",stat:"",cltd:"",rcn:"",ixcd:"",ixsd:"",ixnd:"",ixad:"",it:""},column:{prop:"",order:""},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,btnLoading:!1,statLoading:!1,infoVisible:!1,clientVisible:!1,listLoading:!0,isshow:!0,isPageNumberError:!1,MaxId:"",MinId:"",nextPage:"",isLastPage:!1,lastCurrentPage:"",activeName:"main",mainForm:!0,statForm:!1,chartLoading:!1}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(s()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("servlog:detail")&&-1==this.perList.indexOf("servlog:clientlog")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,i=e.scrollWidth;this.showTitle=!(a<i)},formTime:function(t,e){var a=t.it,i=new Date(a);return i.getFullYear()+"-"+Object(n.a)(i.getMonth()+1)+"-"+Object(n.a)(i.getDate())+" "+Object(n.a)(i.getHours())+":"+Object(n.a)(i.getMinutes())},resetForm:function(t){this.$refs[t].resetFields(),this.MaxId="",this.MinId="",this.getList(1)},resetStat:function(t){this.$refs[t].resetFields(),this.getChartsData()},handleClickTabs:function(t,e){var a=this;"main"==t.name?(this.statForm=!1,this.mainForm=!0):(this.mainForm=!1,this.statForm=!0,setTimeout(function(){a.getChartsData()},100))},sortChange:function(t){this.column={prop:t.prop,order:t.order},this.getList(this.lastCurrentPage)},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(!t||t<1)return console.log("页码输入有误！"),this.isPageNumberError=!0,!1;this.getList(t),this.isPageNumberError=!1}},getList:function(t){var e=this;this.listLoading=!0;var a={startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],dtp:this.searchItem.dtp,uip:this.searchItem.uip,uid:this.searchItem.uid,vdm:this.searchItem.vdm,app:this.searchItem.app,desc:this.searchItem.stat,fieldName:this.column.prop,pgstr:this.nextPage,pcstr:this.pageSize,maxId:this.MaxId,minId:this.MinId,nextPage:1==t||void 0==t?1:t,currentPage:this.lastCurrentPage,order:"ascending"==this.column.order?"0":""};a.sign=Object(l.a)(a),Object(r._83)(a).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data.data,e.totalClass=t.data.data.data.length,e.MaxId=Math.max.apply(Math,e.list.map(function(t){return t.id})),e.MinId=Math.min.apply(Math,e.list.map(function(t){return t.id})),e.isLastPage=t.data.data.lastPage,e.lastCurrentPage=t.data.data.currentPage,e.currentPage=t.data.data.currentPage):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})},getChartsData:function(){var t=this;this.chartLoading=!0;var e={startStr:this.searchStat.pickerVal[0],endStr:this.searchStat.pickerVal[1]};e.sign=Object(l.a)(e);var a=o.init(this.$refs.myChart);Object(r._191)(e).then(function(e){if(t.chartLoading=!1,e.data.code=200){var i=e.data.data.date,s=e.data.data.countYes,n=e.data.data.countNo;a.setOption({title:{text:"结果数据统计",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:""}},legend:{orient:"horizontal",x:"center",y:"5%",data:["有结果数据","无结果数据"]},xAxis:{type:"category",boundaryGap:!1,axisLabel:{rotate:20},data:i},grid:{x:"5%",y:"10%",x2:"5%",y2:"10%",borderWidth:1},yAxis:{type:"value",minInterval:1},series:[{name:"有结果数据",type:"line",data:s},{name:"无结果数据",type:"line",data:n}]})}else t.$message({message:e.data.msg,type:"error",duration:1500})})},rowClick:function(t,e){var a=this;this.infoVisible=!0;var i={id:e.id};i.sign=Object(l.a)(i),Object(r._82)(i).then(function(t){a.infoList={id:t.data.data.id,did:t.data.data.did,dtp:t.data.data.dtp,uid:t.data.data.uid,uip:t.data.data.uip,ver:t.data.data.ver,stat:t.data.data.stat,vdm:t.data.data.vdm,pidx:t.data.data.pidx,ixid:t.data.data.ixid,asrd:t.data.data.asrd,over:1==t.data.data.over?"是":"否",dev:t.data.data.dev,alld:t.data.data.alld,cprv:t.data.data.cprv,svr:t.data.data.svr,egt:t.data.data.egt,cnwp:t.data.data.cnwp,dsc:t.data.data.dsc,it:new Date(t.data.data.it).getFullYear()+"-"+Object(n.a)(new Date(t.data.data.it).getMonth()+1)+"-"+Object(n.a)(new Date(t.data.data.it).getDate())+" "+Object(n.a)(new Date(t.data.data.it).getHours())+":"+Object(n.a)(new Date(t.data.data.it).getMinutes()),nlpd:t.data.data.nlpd,sppd:t.data.data.sppd,l1c:t.data.data.l1c,l2c:t.data.data.l2c}})},rowClient:function(t,e){var a=this;this.clientVisible=!0;var i={uid:e.uid,ixid:e.ixid};Object(r.Q)(i).then(function(t){200==t.data.code?null!=t.data.data?a.clientInfo={uid:t.data.data.uid,dtp:t.data.data.dtp,ver:t.data.data.ver,svr:t.data.data.svr,stat:t.data.data.stat,cltd:t.data.data.cltd,rcn:t.data.data.rcn,ixcd:t.data.data.ixcd,ixsd:t.data.data.ixsd,ixnd:t.data.data.ixnd,ixad:t.data.data.ixad,it:new Date(t.data.data.it).getFullYear()+"-"+Object(n.a)(new Date(t.data.data.it).getMonth()+1)+"-"+Object(n.a)(new Date(t.data.data.it).getDate())+" "+Object(n.a)(new Date(t.data.data.it).getHours())+":"+Object(n.a)(new Date(t.data.data.it).getMinutes())}:a.clientInfo={uid:"",dtp:"",ver:"",svr:"",stat:"",cltd:"",rcn:"",ixcd:"",ixsd:"",ixnd:"",ixad:"",it:""}:a.$message({message:t.data.errorMessage,type:"error",duration:1500})})},handleDown:function(t,e){var a=new Date(e.it),i=Object(n.a)(a.getFullYear())+"-"+Object(n.a)(a.getMonth()+1)+"-"+Object(n.a)(a.getDate());Object(r._150)(e.ixid,e.svr,i).then(function(t){console.log(t)})},handleClose:function(){this.infoVisible=!1},handleClient:function(){this.clientVisible=!1},handleConfirm:function(){this.infoVisible=!1},onSubmit:function(){this.btnLoading=!0,this.getList(1),this.btnLoading=!1},submitStat:function(){this.statLoading=!0,this.getChartsData(),this.statLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[t._v("日志管理")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),t.mainForm?a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"客户端类型",prop:"dtp"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.dtp,callback:function(e){t.$set(t.searchItem,"dtp","string"==typeof e?e.trim():e)},expression:"searchItem.dtp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"设备ID",prop:"uip"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uip,callback:function(e){t.$set(t.searchItem,"uip","string"==typeof e?e.trim():e)},expression:"searchItem.uip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户UID",prop:"uid"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uid,callback:function(e){t.$set(t.searchItem,"uid","string"==typeof e?e.trim():e)},expression:"searchItem.uid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开发者ID",prop:"app"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.app,callback:function(e){t.$set(t.searchItem,"app","string"==typeof e?e.trim():e)},expression:"searchItem.app"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:t.searchItem.vdm,callback:function(e){t.$set(t.searchItem,"vdm",e)},expression:"searchItem.vdm"}},[a("el-option",{attrs:{label:"all",value:"all"}}),t._v(" "),a("el-option",{attrs:{label:"les",value:"les"}}),t._v(" "),a("el-option",{attrs:{label:"app",value:"app"}}),t._v(" "),a("el-option",{attrs:{label:"vod",value:"vod"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"stat"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:t.searchItem.stat,callback:function(e){t.$set(t.searchItem,"stat","string"==typeof e?e.trim():e)},expression:"searchItem.stat"}},[a("el-option",{attrs:{label:"成功",value:"success"}}),t._v(" "),a("el-option",{attrs:{label:"失败",value:"failed"}})],1)],1),t._v(" "),a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptionsList,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:t.searchItem.pickerVal,callback:function(e){t.$set(t.searchItem,"pickerVal",e)},expression:"searchItem.pickerVal"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.btnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)]):t._e(),t._v(" "),t.statForm?a("el-form",{ref:"searchStat",staticClass:"demo-form-inline height100 width130",attrs:{inline:!0,model:t.searchStat,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height100"},[a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:t.searchStat.pickerVal,callback:function(e){t.$set(t.searchStat,"pickerVal",e)},expression:"searchStat.pickerVal"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.statLoading},on:{click:t.submitStat}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetStat("searchStat")}}},[t._v("重置")])],1)]):t._e(),t._v(" "),a("div",{staticClass:"table-box"},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClickTabs},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{staticClass:"flex-align",attrs:{label:"明细日志",name:"main"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.activeName,class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{label:"UID",prop:"uid",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.uid,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.uid)+"\n                            ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.uid)+"\n                        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"DID",prop:"did",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.did,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.did)+"\n                            ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.did)+"\n                        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"客户端类型",prop:"dtp",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.dtp,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.dtp)+"\n                            ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.dtp)+"\n                        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"客户端版本",prop:"ver",align:"center",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.ver,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.ver)+"\n                            ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.ver)+"\n                        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"VDM",prop:"vdm",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"stat",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:"success"===e.row.stat?"tag-s":"tag-d"},[t._v(t._s(e.row.stat))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"一级返回",prop:"l1c",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.l1c,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.l1c)+"\n                            ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                            "+t._s(e.row.l1c)+"\n                        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"it",align:"center",formatter:t.formTime,width:"130"}}),t._v(" "),t.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"servlog:detail",expression:"'servlog:detail'"}],attrs:{size:"mini"},on:{click:function(a){return t.rowClick(e.$index,e.row)}}},[t._v("详情")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"servlog:clientlog",expression:"'servlog:clientlog'"}],attrs:{size:"mini"},on:{click:function(a){return t.rowClient(e.$index,e.row)}}},[t._v("上报日志")])]}}],null,!1,4195431321)}):t._e()],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),0!=t.isLastPage&&1!=t.currentPage&&t.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),a("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),1!=t.isLastPage?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&1!=t.isLastPage?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:1==t.isLastPage},on:{click:function(e){return t.turnToPage(-1)}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),t._v(" "),a("el-tab-pane",{attrs:{label:"统计",name:"stat"}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.chartLoading,expression:"chartLoading"}],staticClass:"table-box",staticStyle:{"margin-top":"30px"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("div",{ref:"myChart",style:{width:"100%",height:"100%"}})])])],1)],1),t._v(" "),a("el-dialog",{staticClass:"aksk-info",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"详情",visible:t.infoVisible,width:"40%",top:"10vh","before-close":t.handleClose},on:{"update:visible":function(e){t.infoVisible=e}}},[a("el-descriptions",[a("el-descriptions-item",{attrs:{label:"ID"}},[t._v(t._s(t.infoList.id))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"设备ID"}},[t._v(t._s(t.infoList.did))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"客户端类型"}},[t._v(t._s(t.infoList.dtp))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"用户ID"}},[t._v(t._s(t.infoList.uid))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"客户端ip"}},[t._v(t._s(t.infoList.uip))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"客户端版本"}},[t._v(t._s(t.infoList.ver))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"执行状态"}},[t._v(t._s(t.infoList.stat))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"所属领域"}},[t._v(t._s(t.infoList.vdm))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"包的序号"}},[t._v(t._s(t.infoList.pidx))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"语音交互ID"}},[t._v(t._s(t.infoList.ixid))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"识别时间"}},[t._v(t._s(t.infoList.asrd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"是否包尾"}},[t._v(t._s(t.infoList.over))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"开发者ID"}},[t._v(t._s(t.infoList.dev))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"服务总时间"}},[t._v(t._s(t.infoList.alld))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"省份"}},[t._v(t._s(t.infoList.cprv))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"服务器端地址"}},[t._v(t._s(t.infoList.svr))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"引擎类型"}},[t._v(t._s(t.infoList.egt))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"运营商类型"}},[t._v(t._s(t.infoList.cnwp))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"描述"}},[t._v(t._s(t.infoList.dsc))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"添加时间"}},[t._v(t._s(t.infoList.it))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"规则匹配时间"}},[t._v(t._s(t.infoList.nlpd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"参数解析时间"}},[t._v(t._s(t.infoList.sppd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"一级返回"}},[t._v(t._s(t.infoList.l1c))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"二级返回"}},[t._v(t._s(t.infoList.l2c))])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleConfirm()}}},[t._v("关 闭")])],1)],1),t._v(" "),a("el-dialog",{staticClass:"aksk-info",attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"详情",visible:t.clientVisible,width:"40%",top:"10vh","before-close":t.handleClient},on:{"update:visible":function(e){t.clientVisible=e}}},[a("el-descriptions",[a("el-descriptions-item",{attrs:{label:"用户ID"}},[t._v(t._s(t.clientInfo.uid))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"客户端类型"}},[t._v(t._s(t.clientInfo.dtp))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"客户端版本"}},[t._v(t._s(t.clientInfo.ver))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"服务端地址"}},[t._v(t._s(t.clientInfo.svr))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"客户端总耗时"}},[t._v(t._s(t.clientInfo.ixcd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"服务端总耗时"}},[t._v(t._s(t.clientInfo.ixsd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"网络总延时"}},[t._v(t._s(t.clientInfo.ixnd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"服务端识别耗时"}},[t._v(t._s(t.clientInfo.ixad))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"执行状态"}},[t._v(t._s(t.clientInfo.stat))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"延时"}},[t._v(t._s(t.clientInfo.cltd))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"内容"}},[t._v(t._s(t.clientInfo.rcn))]),t._v(" "),a("el-descriptions-item",{attrs:{label:"插入时间"}},[t._v(t._s(t.clientInfo.it))])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleClient()}}},[t._v("关 闭")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(c,d,!1,function(t){a("V9DN")},"data-v-44bf2f07",null);e.default=p.exports}});