webpackJsonp([66],{YFle:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("gRE1"),o=s.n(i),r=(s("pWbq"),s("2hMI"));var a=s("FT/c"),n={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},list:[],perList:[],zipLists:[],keywordList:[],totalClass:"",downURLs:a.a.proURL,searchItem:{dtp:"",uid:"",clientVersion:"",engineVersion:"",developer:"",keywordType:"",keywordPhrase:"",origin:"",refreshTime:"",putTime:""},column:{prop:"",order:""},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,zipBtnLoading:!1,listBtnLoading:!1,zipVisible:!1,listLoading:!0,isshow:!1,btnshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(o()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("trigger:download")&&(this.btnshow=!1),this.getKeywordList()},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,i=t.scrollWidth;this.showTitle=!(s<i)},handleDown:function(e,t){var s=a.a.proURL+"/lasf-mgr/trigger/download?fileName="+t.filePath;window.open(s)},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},dataPack:function(){var e=this,t={startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin};this.zipBtnLoading=!0,Object(r._138)(t).then(function(t){e.zipBtnLoading=!1,200==t.data.code?e.$message({message:"打包成功",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.zipBtnLoading=!1,e.$message({message:res.data.message,type:"error",duration:1e3})})},packResult:function(){var e=this;this.zipVisible=!0,Object(r._168)().then(function(t){e.zipLists=t.data.array,0==e.zipLists.length&&(e.isshow=!0)})},zipHandleClose:function(){this.zipVisible=!1},zipFileDownload:function(e){var t=a.a.proURL+"/lasf-mgr/trigger/download?fileName="+e+"&fileType=zip",s=document.createElement("a");s.href=t,s.download=e,s.click()},querySearch:function(e,t){var s=this.keywordList;t(e?s.filter(this.createFilter(e)):s)},createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}},getKeywordList:function(){var e=this;Object(r._136)().then(function(t){e.keywordList=t.data.data})},sortChange:function(e){this.column={prop:e.prop,order:e.order},console.log(this.column),this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.refreshTime,endStr:this.searchItem.putTime,dtp:this.searchItem.dtp,uid:this.searchItem.uid,clientVersion:this.searchItem.clientVersion,engineVersion:this.searchItem.engineVersion,developer:this.searchItem.developer,keywordType:this.searchItem.keywordType,keywordPhrase:this.searchItem.keywordPhrase,origin:this.searchItem.origin,fieldName:this.column.prop,order:"ascending"==this.column.order?"0":""};Object(r._137)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})}}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-155"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",[e._v("闲聊数据")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height120 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[s("div",{staticClass:"form-input height120"},[s("el-form-item",{attrs:{label:"客户端平台",prop:"dtp"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.dtp,callback:function(t){e.$set(e.searchItem,"dtp","string"==typeof t?t.trim():t)},expression:"searchItem.dtp"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"用户ID",prop:"uid"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.uid,callback:function(t){e.$set(e.searchItem,"uid","string"==typeof t?t.trim():t)},expression:"searchItem.uid"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"客户端版本",prop:"clientVersion"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.clientVersion,callback:function(t){e.$set(e.searchItem,"clientVersion","string"==typeof t?t.trim():t)},expression:"searchItem.clientVersion"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"引擎版本",prop:"engineVersion"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.engineVersion,callback:function(t){e.$set(e.searchItem,"engineVersion","string"==typeof t?t.trim():t)},expression:"searchItem.engineVersion"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"开发者",prop:"developer"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.developer,callback:function(t){e.$set(e.searchItem,"developer","string"==typeof t?t.trim():t)},expression:"searchItem.developer"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"唤醒词类型",prop:"keywordType"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.keywordType,callback:function(t){e.$set(e.searchItem,"keywordType","string"==typeof t?t.trim():t)},expression:"searchItem.keywordType"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"唤醒词",prop:"keywordPhrase"}},[s("el-autocomplete",{attrs:{"fetch-suggestions":e.querySearch,clearable:""},on:{select:e.handleSelect},model:{value:e.searchItem.keywordPhrase,callback:function(t){e.$set(e.searchItem,"keywordPhrase",t)},expression:"searchItem.keywordPhrase"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"数据来源",prop:"origin"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.origin,callback:function(t){e.$set(e.searchItem,"origin","string"==typeof t?t.trim():t)},expression:"searchItem.origin"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"起始时间",prop:"refreshTime"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1)],1),e._v(" "),s("div",{staticClass:"form-btn-block"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),s("el-button",{attrs:{size:"mini",loading:e.zipBtnLoading},on:{click:e.dataPack}},[e._v("数据打包")]),e._v(" "),s("el-button",{attrs:{size:"mini",loading:e.listBtnLoading},on:{click:e.packResult}},[e._v("打包结果")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list},on:{"sort-change":e.sortChange}},[s("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),s("el-table-column",{attrs:{label:"设备类型",prop:"dtp",align:"center",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.dtp,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.dtp)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.dtp)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"用户ID",prop:"uid",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.uid,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.uid)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.uid)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"客户端版本",prop:"clientVersion",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.clientVersion,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.clientVersion)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.clientVersion)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"引擎版本",prop:"engineVersion",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.engineVersion,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.engineVersion)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.engineVersion)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"开发者",prop:"developer",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.developer,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.developer)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.developer)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"唤醒词类型",prop:"keywordType",align:"center",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.keywordType,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.keywordType)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.keywordType)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"唤醒词",prop:"keywordPhrase",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.keywordPhrase,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.keywordPhrase)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.keywordPhrase)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"数据来源",prop:"origin",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.origin,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.origin)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.origin)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"数据日期",prop:"displayDate",align:"center","min-width":"135"}}),e._v(" "),e.btnshow?s("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{directives:[{name:"has",rawName:"v-has",value:"trigger:download",expression:"'trigger:download'"}],attrs:{size:"mini"},on:{click:function(s){return e.handleDown(t.$index,t.row)}}},[e._v("下载文件")])]}}],null,!1,1535025030)}):e._e()],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{title:"数据压缩包下载",visible:e.zipVisible,width:"300","before-close":e.zipHandleClose},on:{"update:visible":function(t){e.zipVisible=t}}},[s("div",{staticClass:"zip_box"},[e._l(e.zipLists,function(t,i){return s("div",{key:i},[s("el-link",{attrs:{type:"primary",icon:"el-icon-download",href:e.downURLs+"/lasf-mgr/trigger/download?fileName="+t.filename+"&fileType=zip",target:"_blank"}},[e._v(e._s(t.lasttime))])],1)}),e._v(" "),e.isshow?s("div",{staticStyle:{"text-align":"center"}},[e._v("暂无数据")]):e._e()],2),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:e.zipHandleClose}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=s("VU/8")(n,l,!1,function(e){s("ykOa")},"data-v-25ae590b",null);t.default=c.exports},ykOa:function(e,t){}});