webpackJsonp([43],{MlW2:function(e,t){},MwPh:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("gRE1"),i=s.n(a),n=s("2hMI"),o=s("krqS"),l={data:function(){return{list:[],perList:[],totalClass:"8",addList:{name:"",tel:"",exts:""},searchItem:{name:"",tel:"",exts:""},addRules:{name:[{required:!0,message:"请输入名称",trigger:"change"}],tel:[{required:!0,message:"请输入电话号码",trigger:"change"}],exts:[{required:!0,message:"请输入扩展",trigger:"change"}]},addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("csc:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,a=t.scrollWidth;this.showTitle=!(s<a)},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},handleDel:function(e,t){var s=this,a={id:t.id};a.sign=Object(o.a)(a),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.S)(a).then(function(e){200==e.data.code?(s.$message({message:"删除成功",type:"success",duration:1500}),s.getList()):s.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,s={name:this.addList.name,exts:this.addList.exts,tels:this.addList.tel};s.sign=Object(o.a)(s),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(n.R)(s).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,name:this.searchItem.name,exts:this.searchItem.exts,tel:this.searchItem.tel};t.sign=Object(o.a)(t),Object(n.T)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-85"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",{attrs:{to:{path:"/csc/csc"}}},[e._v("闲聊数据")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[s("div",{staticClass:"form-input height50"},[s("el-form-item",{attrs:{label:"名称",prop:"name"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"电话",prop:"tel"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.tel,callback:function(t){e.$set(e.searchItem,"tel","string"==typeof t?t.trim():t)},expression:"searchItem.tel"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"扩展",prop:"exts"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.exts,callback:function(t){e.$set(e.searchItem,"exts","string"==typeof t?t.trim():t)},expression:"searchItem.exts"}})],1)],1),e._v(" "),s("div",{staticClass:"form-btn"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"csc:add",expression:"'csc:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[s("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),s("el-table-column",{attrs:{label:"名称",prop:"name",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.name)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.name)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"电话",prop:"tels",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.tels,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.tels)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.tels)+"\n                  ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"扩展",prop:"exts",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.exts,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.exts)+"\n                      ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                      "+e._s(t.row.exts)+"\n                  ")]):e._e()]}}])}),e._v(" "),e.isshow?s("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{directives:[{name:"has",rawName:"v-has",value:"csc:delete",expression:"'csc:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,765601967)}):e._e()],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[s("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[s("el-form-item",{attrs:{label:"名称",prop:"name"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name","string"==typeof t?t.trim():t)},expression:"addList.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"电话",prop:"tel"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.tel,callback:function(t){e.$set(e.addList,"tel","string"==typeof t?t.trim():t)},expression:"addList.tel"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"扩展",prop:"exts"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.exts,callback:function(t){e.$set(e.addList,"exts","string"==typeof t?t.trim():t)},expression:"addList.exts"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=s("VU/8")(l,r,!1,function(e){s("MlW2")},"data-v-6805bfa0",null);t.default=d.exports}});