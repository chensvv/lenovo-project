webpackJsonp([59],{"Buk+":function(t,e){},c914:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),l=a.n(i),o=a("pWbq"),s=a("2hMI"),n=a("FT/c"),r={data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now()-864e5;return t.getTime()>e}},searchItem:{dtp:"",uip:"",uid:"",vdm:"",app:"",desc:"",stat:"",refreshTime:"",putTime:""},list:[],perList:[],infoList:{id:"",did:"",dtp:"",uid:"",uip:"",ver:"",stat:"",vdm:"",pidx:"",ixid:"",asrd:"",over:"",dev:"",alld:"",cprv:"",svr:"",egt:"",cnwp:"",dsc:"",it:"",nlpd:"",sppd:"",l1c:"",l2c:""},currentPage:1,pageSize:8,totalCount:1,btnLoading:!1,infoVisible:!1,listLoading:!0,isshow:!0}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(l()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("servlog:detail")&&-1==this.perList.indexOf("servlog:downLoad")&&(this.isshow=!1)},methods:{formTime:function(t,e){var a=t.it,i=new Date(a);return i.getFullYear()+"-"+Object(o.a)(i.getMonth()+1)+"-"+Object(o.a)(i.getDate())+" "+Object(o.a)(i.getHours())+":"+Object(o.a)(i.getMinutes())},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uip:this.searchItem.uip,uid:this.searchItem.uid,vdm:this.searchItem.vdm,app:this.searchItem.app,desc:this.searchItem.stat};Object(s._35)(e).then(function(e){t.listLoading=!1,t.list=e.data.data.data,t.totalCount=e.data.data.total})},rowClick:function(t,e){var a=this;this.infoVisible=!0;var i={id:e.id};Object(s._34)(i).then(function(t){a.infoList={id:t.data.data.id,did:t.data.data.did,dtp:t.data.data.dtp,uid:t.data.data.uid,uip:t.data.data.uip,ver:t.data.data.ver,stat:t.data.data.stat,vdm:t.data.data.vdm,pidx:t.data.data.pidx,ixid:t.data.data.ixid,asrd:t.data.data.asrd,over:t.data.data.over,dev:t.data.data.dev,alld:t.data.data.alld,cprv:t.data.data.cprv,svr:t.data.data.svr,egt:t.data.data.egt,cnwp:t.data.data.cnwp,dsc:t.data.data.dsc,it:new Date(t.data.data.it).getFullYear()+"-"+Object(o.a)(new Date(t.data.data.it).getMonth()+1)+"-"+Object(o.a)(new Date(t.data.data.it).getDate())+" "+Object(o.a)(new Date(t.data.data.it).getHours())+":"+Object(o.a)(new Date(t.data.data.it).getMinutes()),nlpd:t.data.data.nlpd,sppd:t.data.data.sppd,l1c:t.data.data.l1c,l2c:t.data.data.l2c}})},handleDown:function(t,e){var a=new Date(e.it),i=Object(o.a)(a.getFullYear())+"-"+Object(o.a)(a.getMonth()+1)+"-"+Object(o.a)(a.getDate()),l=n.a.proURL+"/lasf-mgr/servlog/downLoad?ixid="+e.ixid+"&svr="+e.svr+"&uip="+i;window.open(l)},handleClose:function(){this.infoVisible=!1},handleConfirm:function(){this.infoVisible=!1},onSubmit:function(){this.btnLoading=!0,this.currentPage=1,this.getList(),this.btnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table mainlog"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v("日志管理")]),t._v(" "),t._l(t.$route.meta,function(e,i){return a("el-breadcrumb-item",{key:i},[t._v(t._s(e))])})],2),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline cache",attrs:{inline:!0,model:t.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"客户端类型",prop:"dtp"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.dtp,callback:function(e){t.$set(t.searchItem,"dtp","string"==typeof e?e.trim():e)},expression:"searchItem.dtp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"设备ID",prop:"uip"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uip,callback:function(e){t.$set(t.searchItem,"uip","string"==typeof e?e.trim():e)},expression:"searchItem.uip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户UID",prop:"uid"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uid,callback:function(e){t.$set(t.searchItem,"uid","string"==typeof e?e.trim():e)},expression:"searchItem.uid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开发者ID",prop:"app"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.app,callback:function(e){t.$set(t.searchItem,"app","string"==typeof e?e.trim():e)},expression:"searchItem.app"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:t.searchItem.vdm,callback:function(e){t.$set(t.searchItem,"vdm",e)},expression:"searchItem.vdm"}},[a("el-option",{attrs:{label:"all",value:"all"}}),t._v(" "),a("el-option",{attrs:{label:"les",value:"les"}}),t._v(" "),a("el-option",{attrs:{label:"app",value:"app"}}),t._v(" "),a("el-option",{attrs:{label:"vod",value:"vod"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"stat"}},[a("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:t.searchItem.stat,callback:function(e){t.$set(t.searchItem,"stat","string"==typeof e?e.trim():e)},expression:"searchItem.stat"}},[a("el-option",{attrs:{label:"成功",value:"success"}}),t._v(" "),a("el-option",{attrs:{label:"失败",value:"failed"}})],1)],1),t._v(" "),a("el-form-item",{staticClass:"width140",attrs:{label:"起始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.refreshTime,callback:function(e){t.$set(t.searchItem,"refreshTime",e)},expression:"searchItem.refreshTime"}})],1),t._v(" "),a("el-form-item",{staticClass:"width140",attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:t.searchItem.putTime,callback:function(e){t.$set(t.searchItem,"putTime",e)},expression:"searchItem.putTime"}})],1),t._v(" "),a("el-form-item",{staticClass:"sub-btn"},[a("el-button",{attrs:{type:"primary",size:"mini",loading:t.btnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)],1),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalCount<5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list}},[a("el-table-column",{attrs:{label:"ID",prop:"id",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"IT",prop:"it",align:"center",formatter:t.formTime,"min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"IXID",prop:"ixid",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"DID",prop:"did",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"CODEC",prop:"codec",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s("7"==e.row.codec?"Speex 16k":"3"==e.row.codec?"Speex 8k":"5"==e.row.codec?"Pcm 16k":"1"==e.row.codec?"Pcm 8k":"4"==e.row.codec?"Bv32 16k":"0"==e.row.codec?"Bv32 8k":"未知"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"UID",prop:"uid",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"DTP",prop:"dtp",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"VER",prop:"ver",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"VDM",prop:"vdm",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"APP",prop:"app",align:"center","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"STAT",prop:"stat",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"success"===e.row.stat?"success":"danger","disable-transitions":""}},[t._v(t._s("success"==e.row.stat?"S":"F"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"L1C",prop:"l1c",align:"center","show-overflow-tooltip":!0}}),t._v(" "),t.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"servlog:detail",expression:"'servlog:detail'"}],attrs:{size:"mini"},on:{click:function(a){return t.rowClick(e.$index,e.row)}}},[t._v("详情")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"servlog:downLoad",expression:"'servlog:downLoad'"}],attrs:{size:"mini",icon:"el-icon-download"},on:{click:function(a){return t.handleDown(e.$index,e.row)}}})]}}],null,!1,1241209382)}):t._e()],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.infoVisible,width:"300","before-close":t.handleClose},on:{"update:visible":function(e){t.infoVisible=e}}},[a("el-form",{attrs:{"label-position":"right","label-width":"100px"}},[a("el-form-item",{attrs:{label:"ID"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.id,callback:function(e){t.$set(t.infoList,"id",e)},expression:"infoList.id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"设备ID"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.did,callback:function(e){t.$set(t.infoList,"did",e)},expression:"infoList.did"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端类型"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.dtp,callback:function(e){t.$set(t.infoList,"dtp",e)},expression:"infoList.dtp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户ID"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.uid,callback:function(e){t.$set(t.infoList,"uid",e)},expression:"infoList.uid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端ip"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.uip,callback:function(e){t.$set(t.infoList,"uip",e)},expression:"infoList.uip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端版本"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.ver,callback:function(e){t.$set(t.infoList,"ver",e)},expression:"infoList.ver"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"执行状态"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.stat,callback:function(e){t.$set(t.infoList,"stat",e)},expression:"infoList.stat"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"所属领域"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.vdm,callback:function(e){t.$set(t.infoList,"vdm",e)},expression:"infoList.vdm"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"包的序号"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.pidx,callback:function(e){t.$set(t.infoList,"pidx",e)},expression:"infoList.pidx"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"语音交互ID"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.ixid,callback:function(e){t.$set(t.infoList,"ixid",e)},expression:"infoList.ixid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"识别时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.asrd,callback:function(e){t.$set(t.infoList,"asrd",e)},expression:"infoList.asrd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否包尾"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.over,callback:function(e){t.$set(t.infoList,"over",e)},expression:"infoList.over"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开发者ID"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.dev,callback:function(e){t.$set(t.infoList,"dev",e)},expression:"infoList.dev"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"服务总时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.alld,callback:function(e){t.$set(t.infoList,"alld",e)},expression:"infoList.alld"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"省份"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.cprv,callback:function(e){t.$set(t.infoList,"cprv",e)},expression:"infoList.cprv"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"服务器端地址"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.svr,callback:function(e){t.$set(t.infoList,"svr",e)},expression:"infoList.svr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"引擎类型"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.egt,callback:function(e){t.$set(t.infoList,"egt",e)},expression:"infoList.egt"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"运营商类型"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.cnwp,callback:function(e){t.$set(t.infoList,"cnwp",e)},expression:"infoList.cnwp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.dsc,callback:function(e){t.$set(t.infoList,"dsc",e)},expression:"infoList.dsc"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"音频压缩格式"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.dsc,callback:function(e){t.$set(t.infoList,"dsc",e)},expression:"infoList.dsc"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.it,callback:function(e){t.$set(t.infoList,"it",e)},expression:"infoList.it"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"规则匹配时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.nlpd,callback:function(e){t.$set(t.infoList,"nlpd",e)},expression:"infoList.nlpd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"参数解析时间"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.sppd,callback:function(e){t.$set(t.infoList,"sppd",e)},expression:"infoList.sppd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"一级返回"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.l1c,callback:function(e){t.$set(t.infoList,"l1c",e)},expression:"infoList.l1c"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"二级返回"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:t.infoList.l2c,callback:function(e){t.$set(t.infoList,"l2c",e)},expression:"infoList.l2c"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleConfirm()}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(r,c,!1,function(t){a("Buk+")},"data-v-1640848c",null);e.default=d.exports}});