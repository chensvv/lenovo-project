webpackJsonp([27],{"4wmL":function(e,t){},DgCU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("gRE1"),i=a.n(n),s=a("pWbq"),o=a("2hMI"),r=a("krqS"),l={data:function(){return{list:[],perList:[],totalClass:"8",addList:{command:"",interface:""},currentItem:{command:"",interface:""},searchItem:{command:""},addRules:{command:[{required:!0,message:"请输入用户query",trigger:"change"}],interface:[{required:!0,message:"请输入预设指令",trigger:"change"}]},editRules:{command:[{required:!0,message:"请输入关键字",trigger:"change"}],interface:[{required:!0,message:"请输入预设指令",trigger:"change"}]},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,addVisible:!1,seabtnLoading:!1,addBtnLoading:!1,editVisible:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("command:mainupdate")&&-1==this.perList.indexOf("command:maindelete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,n=t.scrollWidth;this.showTitle=!(a<n)},formTime:function(e,t){var a=e.createTime,n=new Date(a);return n.getFullYear()+"-"+Object(s.a)(n.getMonth()+1)+"-"+Object(s.a)(n.getDate())+" "+Object(s.a)(n.getHours())+":"+Object(s.a)(n.getMinutes())},formTime2:function(e,t){var a=e.updateTime,n=new Date(a);return n.getFullYear()+"-"+Object(s.a)(n.getMonth()+1)+"-"+Object(s.a)(n.getDate())+" "+Object(s.a)(n.getHours())+":"+Object(s.a)(n.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seabtnLoading=!0,this.currentPage=1,this.getList(),this.seabtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,command:t.command,interface:t.commandInterface}},editHandleClose:function(){this.editVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,command:this.currentItem.command,commandInterface:this.currentItem.interface};a.sign=Object(r.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._81)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1500}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},addHandleConfirm:function(e){var t=this,a={command:this.addList.command,interfaceId:this.addList.interface};a.sign=Object(r.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._78)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})},handleDel:function(e,t){var a=this,n={id:t.id};n.sign=Object(r.a)(n),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._79)(n).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1500}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,command:this.searchItem.command};t.sign=Object(r.a)(t),Object(o._80)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})},handleSong:function(){this.$router.push({path:"/command/norun/list"})},handleCommand:function(){this.$router.push({path:"/command/list"})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/outer/list"}}},[e._v("技能管理")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"用户query",prop:"command"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.command,callback:function(t){e.$set(e.searchItem,"command","string"==typeof t?t.trim():t)},expression:"searchItem.command"}})],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:mainadd",expression:"'command:mainadd'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:norun:list",expression:"'command:norun:list'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleSong()}}},[e._v("指令忽略管理")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:list",expression:"'command:list'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleCommand()}}},[e._v("相似度命令关联")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户query",prop:"command",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.command,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.command)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.command)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"预设指令",prop:"commandInterface",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.commandInterface,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.commandInterface)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.commandInterface)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:e.formTime,"min-with":"140"}}),e._v(" "),a("el-table-column",{attrs:{label:"修改时间",prop:"updateTime",align:"center",formatter:e.formTime2,"min-width":"120"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"!30"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:mainupdate",expression:"'command:mainupdate'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"command:maindelete",expression:"'command:maindelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,979266743)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"用户query",prop:"command"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.command,callback:function(t){e.$set(e.addList,"command","string"==typeof t?t.trim():t)},expression:"addList.command"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"预设指令",prop:"interface"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.interface,callback:function(t){e.$set(e.addList,"interface","string"==typeof t?t.trim():t)},expression:"addList.interface"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"用户query",prop:"command"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.command,callback:function(t){e.$set(e.currentItem,"command","string"==typeof t?t.trim():t)},expression:"currentItem.command"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"预设指令",prop:"interface"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.interface,callback:function(t){e.$set(e.currentItem,"interface","string"==typeof t?t.trim():t)},expression:"currentItem.interface"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(l,c,!1,function(e){a("4wmL")},"data-v-b3fb7a72",null);t.default=d.exports}});