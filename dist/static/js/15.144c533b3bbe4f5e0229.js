webpackJsonp([15],{JD8y:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("pWbq"),l=s("2hMI"),o={data:function(){return{list:[],totalClass:"",searchItem:{channel:"",rate:"",sessionId:"",lenovoKey:"",secretKey:"",sce:"",language:"",offline:""},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!0}},created:function(){this.getList()},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,a=t.scrollWidth;this.showTitle=!(s<a)},formTime:function(e,t){var s=e.createTime,l=new Date(s);return l.getFullYear()+"-"+Object(a.a)(l.getMonth()+1)+"-"+Object(a.a)(l.getDate())+" "+Object(a.a)(l.getHours())+":"+Object(a.a)(l.getMinutes())},formTime2:function(e,t){var s=e.updateTime,l=new Date(s);return l.getFullYear()+"-"+Object(a.a)(l.getMonth()+1)+"-"+Object(a.a)(l.getDate())+" "+Object(a.a)(l.getHours())+":"+Object(a.a)(l.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,channel:this.searchItem.channel,rate:this.searchItem.rate,sessionId:this.searchItem.sessionId,lenovoKey:this.searchItem.lenovoKey,secretKey:this.searchItem.secretKey,sce:this.searchItem.sce,language:this.searchItem.language,offline:this.searchItem.offline};Object(l._162)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-135"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",[e._v("服务管理")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height100 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[s("div",{staticClass:"form-input height100"},[s("el-form-item",{attrs:{label:"通道",prop:"channel"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.channel,callback:function(t){e.$set(e.searchItem,"channel","string"==typeof t?t.trim():t)},expression:"searchItem.channel"}},[s("el-option",{attrs:{label:"单通道",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"双通道",value:"8"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"比特率",prop:"rate"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.rate,callback:function(t){e.$set(e.searchItem,"rate","string"==typeof t?t.trim():t)},expression:"searchItem.rate"}},[s("el-option",{attrs:{label:"8000",value:"8000"}}),e._v(" "),s("el-option",{attrs:{label:"16000",value:"16000"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"会话id",prop:"sessionId"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.sessionId,callback:function(t){e.$set(e.searchItem,"sessionId","string"==typeof t?t.trim():t)},expression:"searchItem.sessionId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"lenovoKey",prop:"lenovoKey"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.lenovoKey,callback:function(t){e.$set(e.searchItem,"lenovoKey","string"==typeof t?t.trim():t)},expression:"searchItem.lenovoKey"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"secretKey",prop:"secretKey"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.secretKey,callback:function(t){e.$set(e.searchItem,"secretKey","string"==typeof t?t.trim():t)},expression:"searchItem.secretKey"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"长短语音",prop:"sce"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.sce,callback:function(t){e.$set(e.searchItem,"sce","string"==typeof t?t.trim():t)},expression:"searchItem.sce"}},[s("el-option",{attrs:{label:"cmd",value:"cmd"}}),e._v(" "),s("el-option",{attrs:{label:"long",value:"long"}}),e._v(" "),s("el-option",{attrs:{label:"iat",value:"iat"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"语言",prop:"language"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.language,callback:function(t){e.$set(e.searchItem,"language","string"==typeof t?t.trim():t)},expression:"searchItem.language"}},[s("el-option",{attrs:{label:"chinese",value:"chinese"}}),e._v(" "),s("el-option",{attrs:{label:"english",value:"english"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"是否离线",prop:"offline"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.searchItem.offline,callback:function(t){e.$set(e.searchItem,"offline","string"==typeof t?t.trim():t)},expression:"searchItem.offline"}},[s("el-option",{attrs:{label:"是",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"否",value:"0"}})],1)],1)],1),e._v(" "),s("div",{staticClass:"form-btn"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[s("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),s("el-table-column",{attrs:{label:"通道",prop:"channel",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{attrs:{"disable-transitions":""}},[e._v(e._s(1==t.row.channel?"单通道":"双通道"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"比特率",prop:"rate",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:"会话id",prop:"sessionId",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sessionId,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.sessionId)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.sessionId)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"lenovoKey",prop:"lenovoKey",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.lenovoKey,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.lenovoKey)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.lenovoKey)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"secretKey",prop:"secretKey",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.secretKey,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.secretKey)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.secretKey)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"字节数",prop:"voiceBytes",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.voiceBytes,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.voiceBytes)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.voiceBytes)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"长短语音",prop:"sce",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sce,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.sce)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.sce)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"语言",prop:"language",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.language,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.language)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.language)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"是否离线",prop:"offline",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{attrs:{"disable-transitions":""}},[e._v(e._s(1==t.row.offline?"是":"否"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center","min-width":"120",formatter:e.formTime}}),e._v(" "),s("el-table-column",{attrs:{label:"修改时间",prop:"updateTime",align:"center","min-width":"120",formatter:e.formTime2}})],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)},staticRenderFns:[]};var r=s("VU/8")(o,n,!1,function(e){s("Rzlu")},"data-v-ed0a92ea",null);t.default=r.exports},Rzlu:function(e,t){}});