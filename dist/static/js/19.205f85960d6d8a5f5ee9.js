webpackJsonp([19],{PdYd:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("D7x1"),i=a("4/BI"),o={name:"applicationlist",components:{iTable:l.a},data:function(){var e=this;return{list:[],currentItem:{platform:"",fay:"",vdm:""},addList:{},searchItem:{platform:"",vdm:"",refreshTime:"",putTime:""},columns:[{prop:"index",label:"序号",align:"center",hasSort:!0},{prop:"vdm",label:"VDM",align:"left",hasSort:!0},{prop:"platform",label:"热词",align:"left",hasSort:!0},{prop:"applicationName",label:"发音",align:"center",hasSort:!0},{prop:"putTime",label:"更新时间",align:"center",hasSort:!0,render:function(e,t){var a=parseInt(t.row.putTime);return e("span",Object(i.a)(new Date(a),"yyyy-MM-dd hh:mm"))}}],options:{stripe:!1,loading:!0,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:150,show:!1,list:[{id:"1",label:"编辑",show:!0,plain:!0,disabled:!1,method:function(t,a){e.handleEdit(t,a)}},{id:"2",label:"删除",type:"danger",show:!0,plain:!1,disabled:!1,method:function(t,a){e.handleDel(t,a)}}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields()},onSubmit:function(){console.log(this.searchItem)},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e)},handleEdit:function(e,t){console.log(e,t),this.editVisible=!0,this.currentItem={classnames:t.platform,fay:t.fay,vdm:t.vdm}},handleDel:function(e,t){var a=this;console.log(t.id),console.log(e),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.list.splice(e,1)}).catch(function(){console.log("no")})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addList={},this.addVisible=!1},editHandleConfirm:function(){console.log(this.currentItem),this.editVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(){console.log(this.addList),this.list.push(this.addList),this.getList(),this.addList={},this.addVisible=!1},getList:function(){var e=this;this.$http.get("/api/data").then(function(t){e.list=t.data,console.log(e.pageSize),t.data.forEach(function(t){t.index=t.id%e.pageSize,0==t.index&&(t.index=e.pageSize)}),e.totalCount=e.list.length,e.options.loading=!1})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("数据管理")]),e._v(" "),e._l(e.$route.meta,function(t,l){return a("el-breadcrumb-item",{key:l},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[a("el-form-item",{attrs:{label:"热词",prop:"platform"}},[a("el-input",{model:{value:e.searchItem.platform,callback:function(t){e.$set(e.searchItem,"platform",t)},expression:"searchItem.platform"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.searchItem.vdm,callback:function(t){e.$set(e.searchItem,"vdm",t)},expression:"searchItem.vdm"}},[a("el-option",{attrs:{label:"ALL",value:"ALL"}}),e._v(" "),a("el-option",{attrs:{label:"LES",value:"LES"}}),e._v(" "),a("el-option",{attrs:{label:"APP",value:"APP"}}),e._v(" "),a("el-option",{attrs:{label:"VOD",value:"VOD"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间",prop:"refreshTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.searchItem.refreshTime,callback:function(t){e.$set(e.searchItem,"refreshTime",t)},expression:"searchItem.refreshTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"putTime"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.searchItem.putTime,callback:function(t){e.$set(e.searchItem,"putTime",t)},expression:"searchItem.putTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),a("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("i-table",{attrs:{list:e.list.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),options:e.options,columns:e.columns,operates:e.operates}}),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{attrs:{"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"热词"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.platform,callback:function(t){e.$set(e.currentItem,"platform",t)},expression:"currentItem.platform"}}),e._v(" "),a("el-button",{attrs:{size:"mini"}},[e._v("获取推荐读音")])],1),e._v(" "),a("el-form-item",{attrs:{label:"词语发音"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.fay,callback:function(t){e.$set(e.currentItem,"fay",t)},expression:"currentItem.fay"}}),e._v(" "),a("span",{staticStyle:{"font-size":"12px"}},[e._v("(如热词为‘A180’，此处可填写‘诶裔巴绫’)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.searchItem.vdm,callback:function(t){e.$set(e.searchItem,"vdm",t)},expression:"searchItem.vdm"}},[a("el-option",{attrs:{label:e.ALL,value:"ALL"}}),e._v(" "),a("el-option",{attrs:{label:e.LES,value:"LES"}}),e._v(" "),a("el-option",{attrs:{label:e.APP,value:"APP"}}),e._v(" "),a("el-option",{attrs:{label:e.VOD,value:"VOD"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.editHandleConfirm}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t}}},[a("el-form",{attrs:{"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"热词"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.platform,callback:function(t){e.$set(e.addList,"platform",t)},expression:"addList.platform"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"词语发音"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.fay,callback:function(t){e.$set(e.addList,"fay",t)},expression:"addList.fay"}}),e._v(" "),a("span",{staticStyle:{"font-size":"12px"}},[e._v("(如热词为‘A180’，此处可填写‘诶裔巴绫’)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"VDM",prop:"vdm"}},[a("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.vdm,callback:function(t){e.$set(e.addList,"vdm",t)},expression:"addList.vdm"}},[a("el-option",{attrs:{label:"ALL",value:"ALL"}}),e._v(" "),a("el-option",{attrs:{label:"LES",value:"LES"}}),e._v(" "),a("el-option",{attrs:{label:"APP",value:"APP"}}),e._v(" "),a("el-option",{attrs:{label:"VOD",value:"VOD"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addHandleConfirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(o,s,!1,function(e){a("r8+o")},"data-v-208f4e98",null);t.default=r.exports},"r8+o":function(e,t){}});