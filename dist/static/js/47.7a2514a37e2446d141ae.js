webpackJsonp([47],{R6EK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("BO1k"),n=a.n(s),i=a("mvHQ"),r=a.n(i),o=a("gRE1"),l=a.n(o),d=(a("pWbq"),a("2hMI")),c=a("iGF/"),u=a("krqS"),f={inject:["reload"],data:function(){return{list:[],perList:[],addList:{lasfpsd:"",lasfkey:"",lasfval:""},currentItem:{lasfpsd:"",lasfkey:"",lasfval:""},columns:[{prop:"key",label:"KEY",hasSort:!0},{prop:"val",label:"VAL",hasSort:!0,className:"reg"}],addRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"change"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"change"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"change"}]},editRules:{lasfpsd:[{required:!0,message:"请输入修改密码",trigger:"change"}],lasfkey:[{required:!0,message:"请输入LASF KEY",trigger:"change"}],lasfval:[{required:!0,message:"请输入LASF VAL",trigger:"change"}]},addVisible:!1,editVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0,totalClass:"8"}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(l()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("kv:update")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,s=t.scrollWidth;this.showTitle=!(a<s)},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,lasfkey:t.key,lasfval:t.val}},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},editHandleConfirm:function(e){var t=this,a={key:this.currentItem.lasfkey,pwd:this.currentItem.lasfpsd,val:this.currentItem.lasfval};a.sign=Object(u.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(d._58)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"修改成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},addHandleConfirm:function(e){var t=this,a={pwd:this.addList.lasfpsd,key:this.addList.lasfkey,val:this.addList.lasfval};a.sign=Object(u.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(d._55)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},handleDelete:function(e,t){var a=this,s={key:t.key};s.sign=Object(u.a)(s),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(d._56)(s).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},handleDel:function(e,t){var a=this,s={sql:t.sta,name:t.key},n={userName:sessionStorage.getItem("username")};s.sign=Object(u.a)(s),n.sign=Object(u.a)(n),this.$confirm("此操作不会永久删除该数据, 可以随时撤回, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(d._21)(s).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList(),sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(c.A)(n).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",r()(e.data.data)),a.reload()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},handleRecall:function(e,t){var a=this,s={sql:t.sta,name:t.key},i={userName:sessionStorage.getItem("username")};s.sign=Object(u.a)(s),i.sign=Object(u.a)(i),Object(d._21)(s).then(function(e){200==e.data.code?(a.$message({message:"撤回成功",type:"success",duration:1e3}),a.getList(),sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(c.A)(i).then(function(e){if(200==e.data.code){sessionStorage.setItem("menuData",r()(e.data.data));var t=e.data.data,s=[],i=!0,o=!1,l=void 0;try{for(var d,c=n()(t);!(i=(d=c.next()).done);i=!0){var u=d.value;0===u.menutype&&s.push({ruleCode:u.ruleCode});var f=!0,m=!1,p=void 0;try{for(var g,v=n()(u.children);!(f=(g=v.next()).done);f=!0){var h=g.value;2===h.menutype&&s.push({ruleCode:h.ruleCode});var b=!0,y=!1,_=void 0;try{for(var k,L=n()(h.children2);!(b=(k=L.next()).done);b=!0){var w=k.value;0===w.menutype&&s.push({ruleCode:w.ruleCode})}}catch(e){y=!0,_=e}finally{try{!b&&L.return&&L.return()}finally{if(y)throw _}}}}catch(e){m=!0,p=e}finally{try{!f&&v.return&&v.return()}finally{if(m)throw p}}}}catch(e){o=!0,l=e}finally{try{!i&&c.return&&c.return()}finally{if(o)throw l}}sessionStorage.setItem("btnpermission",r()(s)),a.reload()}else a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize};t.sign=Object(u.a)(t),Object(d._57)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(){e.listLoading=!1})},handleState:function(){this.$router.push({path:"/gift/add"})}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/kv/list"}}},[e._v("LASF KV")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{staticClass:"demo-form-inline height50 width130",staticStyle:{float:"right"},attrs:{inline:!0,size:"mini"}},[a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleState()}}},[e._v("报表配置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:editsave",expression:"'kv:editsave'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"KEY",prop:"key",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{attrs:{"popper-class":"kv-tooltip",effect:"dark",content:t.row.key,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.key)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.key)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"VAL",prop:"val",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{attrs:{"popper-class":"kv-tooltip",effect:"dark",content:t.row.val,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.val)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.val)+"\n                    ")]):e._e()]}}])}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:update",expression:"'kv:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),1==t.row.sta?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gift:status",expression:"'gift:status'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除报表")]):e._e(),e._v(" "),2==t.row.sta?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gift:status",expression:"'gift:status'"}],attrs:{size:"mini",type:"warning"},on:{click:function(a){return e.handleRecall(t.$index,t.row)}}},[e._v("撤回")]):e._e(),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"kv:delete",expression:"'kv:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,704348026)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.lasfpsd,callback:function(t){e.$set(e.currentItem,"lasfpsd","string"==typeof t?t.trim():t)},expression:"currentItem.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",readonly:""},model:{value:e.currentItem.lasfkey,callback:function(t){e.$set(e.currentItem,"lasfkey","string"==typeof t?t.trim():t)},expression:"currentItem.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.lasfval,callback:function(t){e.$set(e.currentItem,"lasfval","string"==typeof t?t.trim():t)},expression:"currentItem.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"修改密码",prop:"lasfpsd"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfpsd,callback:function(t){e.$set(e.addList,"lasfpsd","string"==typeof t?t.trim():t)},expression:"addList.lasfpsd"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF KEY",prop:"lasfkey"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.lasfkey,callback:function(t){e.$set(e.addList,"lasfkey","string"==typeof t?t.trim():t)},expression:"addList.lasfkey"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"LASF VAL",prop:"lasfval"}},[a("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.lasfval,callback:function(t){e.$set(e.addList,"lasfval","string"==typeof t?t.trim():t)},expression:"addList.lasfval"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(f,m,!1,function(e){a("xPG7")},"data-v-5e42345a",null);t.default=p.exports},xPG7:function(e,t){}});