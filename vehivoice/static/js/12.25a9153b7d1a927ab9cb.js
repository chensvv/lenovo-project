webpackJsonp([12],{RPbu:function(e,t){},v3Rh:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("gRE1"),i=a.n(s),n=a("pWbq"),r=a("2hMI"),o=a("krqS"),l=a("7oYi"),c={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now();return e.getTime()>t}},getpageNum:l.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",name:"",alias:"",wapUrl:""},addList:{name:"",alias:"",wapUrl:""},searchItem:{name:"",source:"",pickerVal:[]},addRules:{name:[{required:!0,message:"请输入网站名称add",trigger:"change"}],alias:[{required:!0,message:"请输入说法",trigger:"change"}],wapUrl:[{required:!0,message:"请输入手机网址",trigger:"change"}]},editRules:{name:[{required:!0,message:"请输入网站名称add",trigger:"blur"}],alias:[{required:!0,message:"请输入说法",trigger:"blur"}],wapUrl:[{required:!0,message:"请输入手机网址",trigger:"blur"}]},column:{prop:"",order:""},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("was:update")&&-1==this.perList.indexOf("was:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,s=t.scrollWidth;this.showTitle=!(a<s)},formTime:function(e,t){var a=e.createTime,s=new Date(a);return s.getFullYear()+"-"+Object(n.a)(s.getMonth()+1)+"-"+Object(n.a)(s.getDate())+" "+Object(n.a)(s.getHours())+":"+Object(n.a)(s.getMinutes())},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,name:t.name,alias:t.alias,wapUrl:t.wapUrl}},handleDel:function(e,t){var a=this,s={id:t.id};s.sign=Object(o.a)(s),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r._247)(s).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:2e3}),a.getList()):a.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(){console.log("no")})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,a={id:this.currentItem.id,name:this.currentItem.name,alias:this.currentItem.alias,wapUrl:this.currentItem.wapUrl};a.sign=Object(o.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(r._249)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:2e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={name:this.addList.name,alias:this.addList.alias,wapUrl:this.addList.wapUrl};a.sign=Object(o.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(r._246)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:2e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})})},sortChange:function(e){this.column={prop:e.prop,order:e.order},console.log(this.column),this.getList()},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={title:this.searchItem.name,source:this.searchItem.source,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],pgstr:this.currentPage,pcstr:this.pageSize,fieldName:this.column.prop,order:"ascending"==this.column.order?"0":""};t.sign=Object(o.a)(t),Object(r._248)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data.data,e.totalCount=t.data.data.total,e.totalClass=t.data.data.data.length):e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/csc/csc"}}},[e._v("闲聊数据")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"网站名",prop:"name"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"来源",prop:"source"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.source,callback:function(t){e.$set(e.searchItem,"source","string"==typeof t?t.trim():t)},expression:"searchItem.source"}})],1),e._v(" "),a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"was:add",expression:"'was:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"网站名称",prop:"name",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.name)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.name)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"别名",prop:"alias",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.alias,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.alias)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.alias)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"手机网址",prop:"wapUrl",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.wapUrl,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.wapUrl)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.wapUrl)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"来源",prop:"source",align:"center",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.source,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.source)+"\n                        ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.source)+"\n                    ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"createTime",align:"center",formatter:e.formTime,width:"130"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",width:"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"was:update",expression:"'was:update'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"was:delete",expression:"'was:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,2231193463)}):e._e()],1),e._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),a("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),a("li",[a("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"网站名称modify",prop:"name"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.name,callback:function(t){e.$set(e.currentItem,"name","string"==typeof t?t.trim():t)},expression:"currentItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"说法",prop:"alias"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.alias,callback:function(t){e.$set(e.currentItem,"alias","string"==typeof t?t.trim():t)},expression:"currentItem.alias"}}),e._v(" "),a("span",{staticStyle:{"font-size":"12px"}},[e._v("(多个说法用' / '分隔。例：网址导航/联想导航)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"手机网址",prop:"wapUrl"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.wapUrl,callback:function(t){e.$set(e.currentItem,"wapUrl","string"==typeof t?t.trim():t)},expression:"currentItem.wapUrl"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"网站名称add",prop:"name"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name","string"==typeof t?t.trim():t)},expression:"addList.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"说法",prop:"alias"}},[a("el-input",{attrs:{type:"text",placeholder:"(多个说法用' / '分隔。例：网址导航/联想导航)","auto-complete":"off"},model:{value:e.addList.alias,callback:function(t){e.$set(e.addList,"alias","string"==typeof t?t.trim():t)},expression:"addList.alias"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机网址",prop:"wapUrl"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.wapUrl,callback:function(t){e.$set(e.addList,"wapUrl","string"==typeof t?t.trim():t)},expression:"addList.wapUrl"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(c,u,!1,function(e){a("RPbu")},"data-v-fbf1723e",null);t.default=d.exports}});