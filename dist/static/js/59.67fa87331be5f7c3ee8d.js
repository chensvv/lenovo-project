webpackJsonp([59],{m3A3:function(e,t){},mwpC:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("gRE1"),i=s.n(a),n=s("2hMI"),o=(s("Icdr"),{data:function(){return{list:[],data:[],perList:[],totalClass:"",addList:{name:"",sce:""},addRules:{name:[{required:!0,message:"请输入ip地址",trigger:"change"}],sce:[{required:!0,message:"请选择语音类型",trigger:"change"}]},sceList:[{typeLabel:"短语音",typeVal:"cmd"},{typeLabel:"长语音",typeVal:"long"}],currentPage:1,pageSize:10,totalCount:1,showTitle:!0,addBtnLoading:!1,listLoading:!0,addVisible:!1,isshow:!0,refsh:!0,intervalId:null}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.pageList()},mounted:function(){-1==this.perList.indexOf("engine:offline")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,a=t.scrollWidth;this.showTitle=!(s<a)},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},refresh:function(){var e=this;this.refsh=!this.refsh,null==this.intervalId&&(this.intervalId=setInterval(function(){e.pageList()},1e4))},refreshNo:function(){this.refsh=!this.refsh,this.clear()},clear:function(){clearInterval(this.intervalId),this.intervalId=null},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,s={serverAddr:this.addList.name,sce:this.addList.sce};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(n._11)(s).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"上线成功",type:"success",duration:1e3}),t.pageList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},handleDel:function(e,t){var s=this,a={serverAddr:t.name,sce:t.sce};Object(n._10)(a).then(function(e){200==e.data.code?(s.$message({message:"已下线",type:"success",duration:1e3}),s.pageList()):s.$message({message:e.data.errorMessage,type:"error",duration:1e3})})},pageList:function(){var e=this;this.listLoading=!0,Object(n.L)().then(function(t){e.listLoading=!1,200==t.data.code&&(e.data=t.data.data,e.getList())}).catch(function(){e.listLoading=!1})},getList:function(){var e=this;this.listLoading=!1,this.list=this.data.filter(function(t,s){return s<e.currentPage*e.pageSize&&s>=e.pageSize*(e.currentPage-1)}),this.totalCount=this.data.length,this.totalClass=this.list.length}},destroyed:function(){this.clear()}}),l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-85"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",[e._v("服务管理")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",staticStyle:{"padding-left":"10px"},attrs:{inline:!0,model:e.searchItem,size:"mini"}},[s("div",{staticClass:"form-btn"},[e.refsh?s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.refresh()}}},[e._v("定时刷新")]):s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.refreshNo()}}},[e._v("关闭刷新")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleAdd("addList")}}},[e._v("上线")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[s("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),s("el-table-column",{attrs:{label:"地址",prop:"name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                            "+e._s(t.row.name)+"\n                            ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                            "+e._s(t.row.name)+"\n                        ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"值",prop:"value",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.value,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                            "+e._s(t.row.value)+"\n                            ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                            "+e._s(t.row.value)+"\n                        ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"sce",prop:"sce",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sce,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                            "+e._s(t.row.sce)+"\n                            ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                            "+e._s(t.row.sce)+"\n                        ")]):e._e()]}}])}),e._v(" "),e.isshow?s("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{directives:[{name:"has",rawName:"v-has",value:"engine:offline",expression:"'engine:offline'"}],attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.handleDel(t.$index,t.row)}}},[e._v("下线")])]}}],null,!1,2874087231)}):e._e()],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{title:"上线",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[s("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[s("el-form-item",{attrs:{label:"ip地址",prop:"name"}},[s("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"输入多个ip地址请用英文,隔开"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name","string"==typeof t?t.trim():t)},expression:"addList.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"长短语音",prop:"sce"}},[s("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.sce,callback:function(t){e.$set(e.addList,"sce",t)},expression:"addList.sce"}},e._l(e.sceList,function(e,t){return s("el-option",{key:t,attrs:{label:e.typeLabel,value:e.typeVal}})}),1)],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=s("VU/8")(o,l,!1,function(e){s("m3A3")},"data-v-3b650d48",null);t.default=r.exports}});