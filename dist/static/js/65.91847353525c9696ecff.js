webpackJsonp([65],{Pwyu:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("BO1k"),i=a.n(r),s=a("gRE1"),n=a.n(s),l=a("pWbq"),o=a("2hMI"),u={data:function(){return{list:[],perList:[],restaurants:[],totalClass:"",currentItem:{id:"",regular:"",replaceResult:"",isFlag:null},addList:{regular:"",replaceResult:"",isFlag:!1},searchItem:{},addRules:{regular:[{required:!0,message:"请输入匹配规则",trigger:"change"}],replaceResult:[{required:!0,message:"请输入替换后内容",trigger:"change"}],isFlag:[{required:!0,message:"请选择是否生效",trigger:"change"}]},editRules:{regular:[{required:!0,message:"请输入匹配规则",trigger:"change"}],replaceResult:[{required:!0,message:"请输入替换后内容",trigger:"change"}],isFlag:[{required:!0,message:"请选择是否生效",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,AIMLBtnLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("ttsregular:add")&&-1==this.perList.indexOf("ttsregular:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,r=t.scrollWidth;this.showTitle=!(a<r)},formTime:function(e,t){var a=e.updateTime,r=new Date(a);return r.getFullYear()+"-"+Object(l.a)(r.getMonth()+1)+"-"+Object(l.a)(r.getDate())+" "+Object(l.a)(r.getHours())+":"+Object(l.a)(r.getMinutes())},formTime2:function(e,t){var a=e.createTime,r=new Date(a);return r.getFullYear()+"-"+Object(l.a)(r.getMonth()+1)+"-"+Object(l.a)(r.getDate())+" "+Object(l.a)(r.getHours())+":"+Object(l.a)(r.getMinutes())},formState:function(e,t){return"true"==e.isFlag?"是":"否"},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,regular:t.regular,replaceResult:t.replaceResult,isFlag:"true"==t.isFlag}},handleDel:function(e,t){var a=this,r={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.V)(r).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1e3}),a.getList()):a.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,regular:this.currentItem.regular,replaceResult:this.currentItem.replaceResult,isFlag:this.currentItem.isFlag};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._139)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={regular:this.addList.regular,replaceResult:this.addList.replaceResult,isFlag:this.addList.isFlag};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._139)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return-1!==t.value.toLowerCase().indexOf(e.toLowerCase())}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize};Object(o._142)(t).then(function(t){if(e.listLoading=!1,200==t.data.code){e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length,e.restaurants=[];var a=!0,r=!1,s=void 0;try{for(var n,l=i()(e.list);!(a=(n=l.next()).done);a=!0){var o=n.value;e.restaurants.push({value:o.regular})}}catch(e){r=!0,s=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw s}}}}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("说法配置")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline width130 height50",staticStyle:{"padding-left":"10px"},attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("div",{staticClass:"form-btn"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:add",expression:"'ttsregular:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[a("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),a("el-table-column",{attrs:{label:"匹配规则",prop:"regular",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.regular,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.regular)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.regular)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"替换后内容",prop:"replaceResult",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.replaceResult,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.replaceResult)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.replaceResult)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"是否生效",prop:"isFlag",align:"center",formatter:e.formState}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:e.formTime2,"min-wdth":"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:add",expression:"'ttsregular:add'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:delete",expression:"'ttsregular:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1619173463)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"匹配规则",prop:"regular"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,"trigger-on-focus":!1,debounce:0},on:{select:e.handleSelect},model:{value:e.currentItem.regular,callback:function(t){e.$set(e.currentItem,"regular",t)},expression:"currentItem.regular"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"替换后内容",prop:"replaceResult"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.replaceResult,callback:function(t){e.$set(e.currentItem,"replaceResult","string"==typeof t?t.trim():t)},expression:"currentItem.replaceResult"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否生效",prop:"isFlag"}},[a("el-checkbox-group",{model:{value:e.currentItem.isFlag,callback:function(t){e.$set(e.currentItem,"isFlag",t)},expression:"currentItem.isFlag"}},[a("el-checkbox")],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"匹配规则",prop:"regular"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,"trigger-on-focus":!1,debounce:0},on:{select:e.handleSelect},model:{value:e.addList.regular,callback:function(t){e.$set(e.addList,"regular",t)},expression:"addList.regular"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"替换后内容",prop:"replaceResult"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.replaceResult,callback:function(t){e.$set(e.addList,"replaceResult","string"==typeof t?t.trim():t)},expression:"addList.replaceResult"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否生效",prop:"isFlag"}},[a("el-checkbox-group",{model:{value:e.addList.isFlag,callback:function(t){e.$set(e.addList,"isFlag",t)},expression:"addList.isFlag"}},[a("el-checkbox")],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(u,c,!1,function(e){a("VDzE")},"data-v-25f3af3c",null);t.default=d.exports},VDzE:function(e,t){}});