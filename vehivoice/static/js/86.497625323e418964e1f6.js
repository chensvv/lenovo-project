webpackJsonp([86],{Hr9W:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),s=a.n(i),n=a("pWbq"),o=a("2hMI"),r=a("iGF/"),l=a("krqS"),c=a("7oYi"),d={data:function(){return{getpageNum:c.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",speak:""},addList:{speak:""},searchItem:{q:""},addRules:{speak:[{required:!0,message:"请输入说法",trigger:"change"}]},editRules:{speak:[{required:!0,message:"请输入说法",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,AIMLBtnLoading:!1,listLoading:!0,isshow:!0,btnshow:!0}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(s()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("user:data")&&(this.isshow=!1),-1==this.perList.indexOf("joke:speakUpdate")&&-1==this.perList.indexOf("joke:speakDel")&&(this.btnshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,i=e.scrollWidth;this.showTitle=!(a<i)},formTime:function(t,e){var a=t.updateTime,i=new Date(a);return i.getFullYear()+"-"+Object(n.a)(i.getMonth()+1)+"-"+Object(n.a)(i.getDate())+" "+Object(n.a)(i.getHours())+":"+Object(n.a)(i.getMinutes())},formTime2:function(t,e){var a=t.createTime,i=new Date(a);return i.getFullYear()+"-"+Object(n.a)(i.getMonth()+1)+"-"+Object(n.a)(i.getDate())+" "+Object(n.a)(i.getHours())+":"+Object(n.a)(i.getMinutes())},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleAuditPass:function(t,e){var a=this;console.log(e);var i={id:e.otherid,status:1};Object(r.a)(i).then(function(t){200==t.data.code?(a.$message({message:"审核已通过",type:"success",duration:2e3}),a.getList()):a.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})})},handleAuditReject:function(t,e){var a=this,i={id:e.otherid,status:2};Object(r.a)(i).then(function(t){200==t.data.code?(a.$message({message:"审核已拒绝",type:"success",duration:2e3}),a.getList()):a.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})})},handleEdit:function(t,e){this.editVisible=!0,this.currentItem={id:e.id,speak:e.speak}},handleDel:function(t,e){var a=this,i={id:e.id};i.sign=Object(l.a)(i),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._63)(i).then(function(t){200==t.data.code?(a.$message({message:"删除成功",type:"success",duration:2e3}),a.getList()):a.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})})}).catch(function(t){console.log(t)})},openFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].resetFields()})},closeFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(t){var e=this,a={id:this.currentItem.id,speak:this.currentItem.speak};a.sign=Object(l.a)(a),this.$refs[t].validate(function(t){if(!t)return!1;e.editBtnLoading=!0,Object(o._65)(a).then(function(t){200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:2e3}),e.getList(),e.editBtnLoading=!1,e.editVisible=!1):(e.editBtnLoading=!1,e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3}))}).catch(function(t){e.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(t){var e=this,a={speak:this.addList.speak};a.sign=Object(l.a)(a),this.$refs[t].validate(function(t){if(!t)return!1;e.addBtnLoading=!0,Object(o._62)(a).then(function(t){e.addBtnLoading=!1,200==t.data.code?(e.$message({message:"添加成功",type:"success",duration:2e3}),e.getList(),e.addVisible=!1):e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.addBtnLoading=!1})})},buildAIML:function(){var t=this;this.AIMLBtnLoading=!0,Object(o._61)().then(function(e){t.AIMLBtnLoading=!1,200==e.data.code?t.$message({message:e.data.msg,type:"success",duration:2e3}):t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.AIMLBtnLoading=!1})},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(this.currentPage=t,!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,q:this.searchItem.q};e.sign=Object(l.a)(e),this.list=[],Object(o._64)(e).then(function(e){t.listLoading=!1,200==e.data.code?(e.data.data.data.map(function(e,a){e.data.otherstatus=e.other.status,e.data.otherid=e.other.id,t.list.push(e.data)}),t.totalCount=e.data.data.total,t.totalClass=e.data.data.data.length):t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(){t.listLoading=!1})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/forum/list"}}},[t._v("说法配置")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"说法配置",prop:"q"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.q,callback:function(e){t.$set(t.searchItem,"q","string"==typeof e?e.trim():e)},expression:"searchItem.q"}})],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:speakAiml",expression:"'joke:speakAiml'"}],attrs:{size:"mini",loading:t.AIMLBtnLoading},on:{click:function(e){return t.buildAIML()}}},[t._v("生成AIML")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:speakAdd",expression:"'joke:speakAdd'"}],attrs:{size:"mini"},on:{click:function(e){return t.handleAdd()}}},[t._v("添加")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),a("el-table-column",{attrs:{label:"说法",prop:"speak",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.speak,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.speak)+"\n                    ")])]),t._v(" "),t.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.speak)+"\n                ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:t.formTime2,width:"130"}}),t._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:t.formTime,width:"130"}}),t._v(" "),t.btnshow?a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-popconfirm",{attrs:{"hide-icon":!0,"confirm-button-text":"审核通过","cancel-button-text":"审核拒绝","cancel-button-type":"danger"},on:{confirm:function(a){return t.handleAuditPass(e.$index,e.row)},cancel:function(a){return t.handleAuditReject(e.$index,e.row)}}},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"activiti:pass",expression:"'activiti:pass'"}],attrs:{slot:"reference",size:"mini",disabled:0!=e.row.otherstatus},slot:"reference"},[t._v(t._s(0==e.row.otherstatus?"审核":1==e.row.otherstatus?"审核通过":2==e.row.otherstatus?"审核拒绝":""))])],1),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:speakUpdate",expression:"'joke:speakUpdate'"}],attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"joke:speakDel",expression:"'joke:speakDel'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}],null,!1,415710162)}):t._e()],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),t.currentPage==t.getpageNum(t.totalCount)&&1!=t.currentPage&&t.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),a("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),t.currentPage!=t.getpageNum(t.totalCount)&&0!=t.getpageNum(t.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&t.currentPage!=t.getpageNum(t.totalCount)&&t.getpageNum(t.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:t.currentPage==t.getpageNum(t.totalCount)||0==t.getpageNum(t.totalCount)},on:{click:function(e){t.turnToPage(t.getpageNum(t.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:t.editVisible,width:"40%",top:"10vh","before-close":t.editHandleClose},on:{"update:visible":function(e){t.editVisible=e},close:function(e){return t.closeFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:t.editRules,model:t.currentItem}},[a("el-form-item",{attrs:{label:"问题",prop:"speak"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.speak,callback:function(e){t.$set(t.currentItem,"speak","string"==typeof e?e.trim():e)},expression:"currentItem.speak"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.editHandleClose}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.editBtnLoading},on:{click:function(e){return t.editHandleConfirm("currentItem")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:t.addVisible,width:"40%",top:"10vh","before-close":t.addHandleClose},on:{"update:visible":function(e){t.addVisible=e},open:function(e){return t.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:t.addRules,model:t.addList}},[a("el-form-item",{attrs:{label:"说法",prop:"speak"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.speak,callback:function(e){t.$set(t.addList,"speak","string"==typeof e?e.trim():e)},expression:"addList.speak"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.addHandleClose}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var g=a("VU/8")(d,u,!1,function(t){a("qOVf")},"data-v-1cac9a88",null);e.default=g.exports},qOVf:function(t,e){}});