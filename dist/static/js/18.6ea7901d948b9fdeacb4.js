webpackJsonp([18],{"33yN":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("gRE1"),s=i.n(n),a=i("pWbq"),o=i("2hMI"),r=i("krqS"),l={data:function(){return{list:[],perList:[],totalClass:"8",searchItem:{lenovoid:""},infoItem:[],currentPage:1,pageSize:10,totalCount:1,showTitle:!0,infoVisible:!1,seaBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(s()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("iot:pull")&&-1==this.perList.indexOf("iot:delete")&&-1==this.perList.indexOf("iot:info")&&(this.isshow=!1)},filters:{timer:function(e){var t=new Date(e);return t.getFullYear()+"-"+Object(a.a)(t.getMonth()+1)+"-"+Object(a.a)(t.getDate())+" "+Object(a.a)(t.getHours())+":"+Object(a.a)(t.getMinutes())}},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,n=t.scrollWidth;this.showTitle=!(i<n)},formTime:function(e,t){var i=e.updateTime,n=new Date(i);return n.getFullYear()+"-"+Object(a.a)(n.getMonth()+1)+"-"+Object(a.a)(n.getDate())+" "+Object(a.a)(n.getHours())+":"+Object(a.a)(n.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleInfo:function(e,t){this.infoVisible=!0,this.infoItem=t},infoHandleClose:function(){this.infoVisible=!1},handleDel:function(e,t){var i=this,n={id:t.id};n.sign=Object(r.a)(n),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._33)(n).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(){console.log("no")})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},handleAdd:function(e,t){var i=this,n={lenovoid:t.lenovoid};Object(o._35)(n).then(function(e){200==e.data.code?(i.$message({message:"添加成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.msg,type:"error",duration:1e3})})},getList:function(){var e=this;this.listLoading=!0;var t={lenovoid:this.searchItem.lenovoid,pgstr:this.currentPage,pcstr:this.pageSize};t.sign=Object(r.a)(t),Object(o._34)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-105"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/csc/csc"}}},[e._v("IOT领域")]),e._v(" "),i("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[i("div",{staticClass:"form-input height70"},[i("el-form-item",{attrs:{label:"Lenovoid",prop:"lenovoid"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.lenovoid,callback:function(t){e.$set(e.searchItem,"lenovoid","string"==typeof t?t.trim():t)},expression:"searchItem.lenovoid"}})],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":e.sortChange}},[i("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),i("el-table-column",{attrs:{label:"Lenovoid",prop:"lenovoid",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.lenovoid,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.lenovoid)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.lenovoid)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"设备名称",prop:"friendlyName",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.friendlyName,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.friendlyName)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.friendlyName)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"设备描述",prop:"friendlyDescription",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.friendlyDescription,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.friendlyDescription)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.friendlyDescription)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"制造商名称",prop:"manufacturerName",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.manufacturerName,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.manufacturerName)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.manufacturerName)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"操作","min-width":"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"iot:info",expression:"'iot:info'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleInfo(t.$index,t.row)}}},[e._v("详情")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"iot:pull",expression:"'iot:pull'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleAdd(t.$index,t.row)}}},[e._v("拉取")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"iot:delete",expression:"'iot:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,449966780)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{visible:e.infoVisible,width:"40%",top:"10vh","before-close":e.infoHandleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[i("el-descriptions",{attrs:{direction:"vertical",column:1,border:""}},[i("el-descriptions-item",{attrs:{label:"Lenovoid"}},[e._v(e._s(e.infoItem.lenovoid))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备类型"}},[e._v(e._s(e.infoItem.applianceTypes))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备标识符"}},[e._v(e._s(e.infoItem.applianceId))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备型号名称"}},[e._v(e._s(e.infoItem.modelName))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备版本"}},[e._v(e._s(e.infoItem.version))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备名称"}},[e._v(e._s(e.infoItem.friendlyName))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备描述"}},[e._v(e._s(e.infoItem.friendlyDescription))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"是否可用"}},[e._v(e._s(0==e.infoItem.reachable?"否":"是"))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"支持的操作类型"}},[e._v(e._s(e.infoItem.actions))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"附加信息"}},[e._v(e._s(e.infoItem.additionalDetails))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"设备厂商名称"}},[e._v(e._s(e.infoItem.manufacturerName))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"属性名称"}},[e._v(e._s(e.infoItem.attributes))]),e._v(" "),i("el-descriptions-item",{attrs:{label:"创建时间"}},[e._v(e._s(e._f("timer")(e.infoItem.updateTime)))])],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:e.infoHandleClose}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(l,c,!1,function(e){i("PftD")},"data-v-c9c01018",null);t.default=d.exports},PftD:function(e,t){}});