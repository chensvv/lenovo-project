webpackJsonp([41],{TD8U:function(t,e){},wTfw:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("gRE1"),n=i.n(a),s=i("pWbq"),o=i("2hMI"),r=i("krqS"),l=i("7oYi"),d={data:function(){return{getpageNum:l.a,list:[],perList:[],typeList:[],totalClass:"8",currentItem:{id:"",did:"",gids:[]},addList:{did:"",gids:[]},searchItem:{did:""},addRules:{did:[{required:!0,message:"请输入数据did",trigger:"change"}],gids:[{required:!0,message:"请选择gids",trigger:"change"}]},editRules:{did:[{required:!0,message:"请输入数据did",trigger:"blur"}],gids:[{required:!0,message:"请选择gids",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(n()(e).join())}),this.getList(),this.getTypeList()},mounted:function(){-1==this.perList.indexOf("qa:channelUpdate")&&-1==this.perList.indexOf("qa:channelDel")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,i=e.clientWidth,a=e.scrollWidth;this.showTitle=!(i<a)},formTime:function(t,e){var i=t.createTime,a=new Date(i);return a.getFullYear()+"-"+Object(s.a)(a.getMonth()+1)+"-"+Object(s.a)(a.getDate())+" "+Object(s.a)(a.getHours())+":"+Object(s.a)(a.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleEdit:function(t,e){this.editVisible=!0;var i=e.grey.split(",");this.currentItem={id:e.id,did:e.did,gids:this.typeList.filter(function(t){return i.includes(t.value)}).map(function(t){return t.lable})}},handleDel:function(t,e){var i=this,a={id:e.id};a.sign=Object(r.a)(a),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._95)(a).then(function(t){200==t.data.code?(i.$message({message:"删除成功",type:"success",duration:2e3}),i.getList()):void 0!=t.data.code&&i.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})})}).catch(function(t){console.log(t)})},openFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].resetFields()})},closeFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(t){var e=this,i={id:this.currentItem.id,did:this.currentItem.did,gids:this.currentItem.gids};i.sign=Object(r.a)(i),this.$refs[t].validate(function(t){if(!t)return!1;e.editBtnLoading=!0,Object(o._99)(i).then(function(t){e.editBtnLoading=!1,200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:2e3}),e.getList(),e.editVisible=!1):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(t){var e=this,i={did:this.addList.did,gids:this.addList.gids};i.sign=Object(r.a)(i),this.$refs[t].validate(function(t){if(!t)return!1;e.addBtnLoading=!0,Object(o._97)(i).then(function(t){e.addBtnLoading=!1,200==t.data.code?(e.$message({message:"添加成功",type:"success",duration:2e3}),e.getList(),e.addVisible=!1):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.addBtnLoading=!1})})},getTypeList:function(){var t=this;Object(o._98)().then(function(e){t.typeList=e.data})},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(this.currentPage=t,!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,did:this.searchItem.did};e.sign=Object(r.a)(e),Object(o._96)(e).then(function(e){t.listLoading=!1,200==e.data.code?(t.list=e.data.data,t.totalCount=e.data.count,t.totalClass=e.data.data.length):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(){t.listLoading=!1})}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table height-105"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/qa/list"}}},[t._v("规则定义")]),t._v(" "),i("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[i("div",{staticClass:"form-input height70"},[i("el-form-item",{attrs:{label:"did",prop:"did"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchItem.did,callback:function(e){t.$set(t.searchItem,"did","string"==typeof e?e.trim():e)},expression:"searchItem.did"}})],1)],1),t._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlpgrey:save",expression:"'nlpgrey:save'"}],attrs:{size:"mini"},on:{click:function(e){return t.handleAdd()}}},[t._v("添加")])],1)]),t._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[i("el-table-column",{attrs:{type:"index",align:"left",label:"#"}}),t._v(" "),i("el-table-column",{attrs:{label:"did",prop:"did",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.did,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.did)+"\n                    ")])]),t._v(" "),t.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.did)+"\n                ")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"灰度",prop:"grey",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.grey,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.grey)+"\n                    ")])]),t._v(" "),t.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.grey)+"\n                ")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:t.formTime,width:"130"}}),t._v(" "),t.isshow?i("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlpgrey:update",expression:"'nlpgrey:update'"}],attrs:{size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"nlpgrey:delete",expression:"'nlpgrey:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}],null,!1,1794705527)}):t._e()],1),t._v(" "),i("div",{staticClass:"pagination-wrap"},[i("ul",{staticClass:"pagination"},[i("li",[i("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[i("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),t.currentPage==t.getpageNum(t.totalCount)&&1!=t.currentPage&&t.currentPage-2>0?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),i("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),t.currentPage!=t.getpageNum(t.totalCount)&&0!=t.getpageNum(t.totalCount)?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&t.currentPage!=t.getpageNum(t.totalCount)&&t.getpageNum(t.totalCount)>=3?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),i("li",[i("button",{attrs:{disabled:t.currentPage==t.getpageNum(t.totalCount)||0==t.getpageNum(t.totalCount)},on:{click:function(e){t.turnToPage(t.getpageNum(t.totalCount))}}},[i("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:t.editVisible,width:"40%",top:"10vh","before-close":t.editHandleClose},on:{"update:visible":function(e){t.editVisible=e},close:function(e){return t.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:t.editRules,model:t.currentItem}},[i("el-form-item",{attrs:{label:"did",prop:"did"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.did,callback:function(e){t.$set(t.currentItem,"did","string"==typeof e?e.trim():e)},expression:"currentItem.did"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"灰度",prop:"gids"}},[i("el-select",{attrs:{multiple:"",placeholder:"--"},on:{change:t.selectChange},model:{value:t.currentItem.gids,callback:function(e){t.$set(t.currentItem,"gids",e)},expression:"currentItem.gids"}},t._l(t.typeList,function(t,e){return i("el-option",{key:e,attrs:{label:t.value,value:t.lable}})}),1)],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.editHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.editBtnLoading},on:{click:function(e){return t.editHandleConfirm("currentItem")}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:t.addVisible,width:"40%",top:"10vh","before-close":t.addHandleClose},on:{"update:visible":function(e){t.addVisible=e},open:function(e){return t.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:t.addRules,model:t.addList}},[i("el-form-item",{attrs:{label:"did",prop:"did"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.did,callback:function(e){t.$set(t.addList,"did","string"==typeof e?e.trim():e)},expression:"addList.did"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"灰度",prop:"gids"}},[i("el-select",{attrs:{multiple:"",placeholder:"--"},model:{value:t.addList.gids,callback:function(e){t.$set(t.addList,"gids",e)},expression:"addList.gids"}},t._l(t.typeList,function(t,e){return i("el-option",{key:e,attrs:{label:t.value,value:t.lable}})}),1)],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.addHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=i("VU/8")(d,c,!1,function(t){i("TD8U")},"data-v-6c8551d4",null);e.default=u.exports}});