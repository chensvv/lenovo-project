webpackJsonp([5],{BO1k:function(e,t,a){e.exports={default:a("fxRn"),__esModule:!0}},HA35:function(e,t){},Pwyu:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("BO1k"),i=a.n(r),s=a("gRE1"),n=a.n(s),l=(a("pWbq"),a("2hMI")),o={data:function(){return{list:[],perList:[],restaurants:[],currentItem:{id:"",regular:"",replaceResult:"",isFlag:null},addList:{regular:"",replaceResult:"",isFlag:!1},searchItem:{},addRules:{regular:[{required:!0,message:"请输入匹配规则",trigger:"change"}],replaceResult:[{required:!0,message:"请输入替换后内容",trigger:"change"}],isFlag:[{required:!0,message:"请选择是否生效",trigger:"change"}]},editRules:{regular:[{required:!0,message:"请输入匹配规则",trigger:"change"}],replaceResult:[{required:!0,message:"请输入替换后内容",trigger:"change"}],isFlag:[{required:!0,message:"请选择是否生效",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,AIMLBtnLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("ttsregular:add")&&-1==this.perList.indexOf("ttsregular:delete")&&(this.isshow=!1)},methods:{formState:function(e,t){return"true"==e.isFlag?"是":"否"},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,regular:t.regular,replaceResult:t.replaceResult,isFlag:"true"==t.isFlag}},handleDel:function(e,t){var a=this,r={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l.R)(r).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,regular:this.currentItem.regular,replaceResult:this.currentItem.replaceResult,isFlag:this.currentItem.isFlag};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(l._123)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={regular:this.addList.regular,replaceResult:this.addList.replaceResult,isFlag:this.addList.isFlag};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(l._123)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return-1!==t.value.toLowerCase().indexOf(e.toLowerCase())}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize};Object(l._124)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count,e.restaurants=[];var a=!0,r=!1,s=void 0;try{for(var n,l=i()(e.list);!(a=(n=l.next()).done);a=!0){var o=n.value;e.restaurants.push({value:o.regular})}}catch(e){r=!0,s=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw s}}})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table unit"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("说法配置")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{staticClass:"sub-btn"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:add",expression:"'ttsregular:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalCount<=5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"匹配规则",prop:"regular",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"替换后内容",prop:"replaceResult",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"是否生效",prop:"isFlag",align:"left",formatter:e.formState}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:add",expression:"'ttsregular:add'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:delete",expression:"'ttsregular:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1619173463)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"匹配规则",prop:"regular"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,"trigger-on-focus":!1,debounce:0},on:{select:e.handleSelect},model:{value:e.currentItem.regular,callback:function(t){e.$set(e.currentItem,"regular",t)},expression:"currentItem.regular"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"替换后内容",prop:"replaceResult"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.replaceResult,callback:function(t){e.$set(e.currentItem,"replaceResult","string"==typeof t?t.trim():t)},expression:"currentItem.replaceResult"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否生效",prop:"isFlag"}},[a("el-checkbox-group",{model:{value:e.currentItem.isFlag,callback:function(t){e.$set(e.currentItem,"isFlag",t)},expression:"currentItem.isFlag"}},[a("el-checkbox")],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"匹配规则",prop:"regular"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,"trigger-on-focus":!1,debounce:0},on:{select:e.handleSelect},model:{value:e.addList.regular,callback:function(t){e.$set(e.addList,"regular",t)},expression:"addList.regular"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"替换后内容",prop:"replaceResult"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.replaceResult,callback:function(t){e.$set(e.addList,"replaceResult","string"==typeof t?t.trim():t)},expression:"addList.replaceResult"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否生效",prop:"isFlag"}},[a("el-checkbox-group",{model:{value:e.addList.isFlag,callback:function(t){e.$set(e.addList,"isFlag",t)},expression:"addList.isFlag"}},[a("el-checkbox")],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,u,!1,function(e){a("HA35")},"data-v-c8c0a790",null);t.default=c.exports},fxRn:function(e,t,a){a("+tPU"),a("zQR9"),e.exports=a("g8Ux")},g8Ux:function(e,t,a){var r=a("77Pl"),i=a("3fs2");e.exports=a("FeBl").getIterator=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}}});