webpackJsonp([39],{qcy3:function(e,t){},qoUw:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("gRE1"),a=i.n(n),o=i("pWbq"),r=i("2hMI"),s={data:function(){return{list:[],perList:[],infoList:[],phoneList:[],grayList:[],currentItem:{id:"",gray:"",version:""},editRules:{},editVisible:!1,infoVisible:!1,currentPage:1,pageSize:10,totalCount:1,editBtnLoading:!1,listLoading:!0,infoListLoading:!0,isshow:!0,issueshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(a()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("history:updateGray")&&(this.isshow=!1),-1==this.perList.indexOf("history:details")&&(this.issueshow=!1)},methods:{formTime:function(e,t){var i=e.createTime,n=new Date(i);return n.getFullYear()+"-"+Object(o.a)(n.getMonth()+1)+"-"+Object(o.a)(n.getDate())+" "+Object(o.a)(n.getHours())+":"+Object(o.a)(n.getMinutes())},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.getGrayList(),this.editVisible=!0,this.currentItem={id:t.id,version:t.version,gray:JSON.parse("["+t.grayId+"]")}},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},infoHandleClose:function(){this.infoVisible=!1},handleDel:function(e,t){var i=this,n={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r._11)(n).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,grayId:this.currentItem.gray.join()};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(r._5)(i).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleInfo:function(e,t){var i=this;this.infoVisible=!0,this.getPhoneTypeList();var n={resources:t.resources};this.infoListLoading=!0,Object(r._12)(n).then(function(e){200==e.data.code?(i.infoListLoading=!1,i.infoList=e.data.data):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){})},getList:function(){var e=this;this.listLoading=!0;Object(r._13)({}).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})},getPhoneTypeList:function(){var e=this;Object(r.N)({parentCode:3}).then(function(t){e.phoneList=t.data.data})},getGrayList:function(){var e=this,t={pgstr:this.pageSize,pcstr:this.currentPage};Object(r._4)(t).then(function(t){e.grayList=t.data.data})}}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/showmode/conf"}}},[e._v("资源发布")]),e._v(" "),e._l(e.$route.meta,function(t,n){return i("el-breadcrumb-item",{key:n},[e._v(e._s(t))])})],2),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalCount<5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"版本号",prop:"version",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"发布时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"120"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"灰度",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"history:updateGray",expression:"'history:updateGray'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")])]}}],null,!1,25406760)}):e._e(),e._v(" "),i("el-table-column",{attrs:{label:"是否灰度",prop:"isGray",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s("0"==t.row.isGray?"不灰度":"灰度"))])]}}])}),e._v(" "),e.issueshow?i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"history:details",expression:"'history:details'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleInfo(t.$index,t.row)}}},[e._v("详情")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"history:delete",expression:"'history:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1854793281)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[i("el-form-item",{attrs:{label:"版本号"}},[i("el-input",{attrs:{type:"text",readonly:"","auto-complete":"off"},model:{value:e.currentItem.version,callback:function(t){e.$set(e.currentItem,"version","string"==typeof t?t.trim():t)},expression:"currentItem.version"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"新灰度内容",prop:"gray"}},[i("el-select",{attrs:{multiple:"",placeholder:"请选择"},model:{value:e.currentItem.gray,callback:function(t){e.$set(e.currentItem,"gray",t)},expression:"currentItem.gray"}},e._l(e.grayList,function(e){return i("el-option",{key:e.grayId,attrs:{label:e.name,value:e.grayId}})}),1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"详情",visible:e.infoVisible,width:"70%","before-close":e.infoHandleClose},on:{"update:visible":function(t){e.infoVisible=t}}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.infoListLoading,expression:"infoListLoading"}],class:this.totalCount<5?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.infoList,height:"400"}},[i("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"渠道",prop:"channelStr",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"资源图片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[i("img",{staticClass:"thum",attrs:{src:e.row.phoneImg}})]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"资源说明",prop:"description",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"名称",prop:"name",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"类型",prop:"typeStr",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"VIP",prop:"vip",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s("0"==t.row.vip?"否":"是"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"付费",prop:"paid",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s("0"==t.row.paid?"否":"是"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"机型",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-select",{attrs:{multiple:"",disabled:"",placeholder:"请选择"},model:{value:t.row.modelConfigList,callback:function(i){e.$set(t.row,"modelConfigList",i)},expression:"scope.row.modelConfigList"}},e._l(e.phoneList,function(e){return i("el-option",{key:e.id,attrs:{label:e.context,value:e.id}})}),1)]}}])})],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.infoHandleClose}},[e._v("关 闭")])],1)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(s,l,!1,function(e){i("qcy3")},"data-v-64a10295",null);t.default=c.exports}});