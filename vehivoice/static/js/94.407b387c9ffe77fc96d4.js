webpackJsonp([94],{W3JY:function(t,e){},ZPSw:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("gRE1"),a=i.n(n),s=i("pWbq"),o=i("2hMI"),r=i("krqS"),l=i("7oYi"),c={data:function(){return{getpageNum:l.a,list:[],perList:[],totalClass:"8",currentItem:{id:"",duration:"",price:"",discount:"",description:""},addList:{duration:"",price:"",discount:"",description:""},searchItem:{pickerVal:[]},addRules:{duration:[{required:!0,message:"请输入时长",trigger:"change"}],price:[{required:!0,message:"请输入单价",trigger:"change"}],discount:[{required:!0,message:"请输入折扣",trigger:"change"}],description:[{required:!0,message:"请输入描述",trigger:"change"}]},editRules:{duration:[{required:!0,message:"请输入时长",trigger:"blur"}],price:[{required:!0,message:"请输入单价",trigger:"blur"}],discount:[{required:!0,message:"请输入折扣",trigger:"blur"}],description:[{required:!0,message:"请输入描述",trigger:"blur"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(a()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("goods:delete")&&-1==this.perList.indexOf("goods:update")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,i=e.clientWidth,n=e.scrollWidth;this.showTitle=!(i<n)},formTime:function(t,e){var i=t.createTime,n=new Date(i);return n.getFullYear()+"-"+Object(s.a)(n.getMonth()+1)+"-"+Object(s.a)(n.getDate())+" "+Object(s.a)(n.getHours())+":"+Object(s.a)(n.getMinutes())},formTime2:function(t,e){var i=t.updateTime,n=new Date(i);return n.getFullYear()+"-"+Object(s.a)(n.getMonth()+1)+"-"+Object(s.a)(n.getDate())+" "+Object(s.a)(n.getHours())+":"+Object(s.a)(n.getMinutes())},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleEdit:function(t,e){this.editVisible=!0,this.currentItem={id:e.id,duration:e.duration,price:e.price,discount:e.discount,description:e.description}},handleDel:function(t,e){var i=this,n={id:e.id};n.sign=Object(r.a)(n),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._33)(n).then(function(t){200==t.data.code?(i.$message({message:"删除成功",type:"success",duration:2e3}),i.getList()):i.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})})}).catch(function(t){console.log(t)})},openFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].resetFields()})},closeFun:function(t){var e=this;this.$nextTick(function(){e.$refs[t]&&e.$refs[t].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(t){var e=this,i={id:this.currentItem.id,duration:this.currentItem.duration,price:this.currentItem.price,discount:this.currentItem.discount,description:this.currentItem.description};i.sign=Object(r.a)(i),this.$refs[t].validate(function(t){if(!t)return!1;e.editBtnLoading=!0,Object(o._35)(i).then(function(t){e.editBtnLoading=!1,200==t.data.code?(e.$message({message:"编辑成功",type:"success",duration:2e3}),e.getList(),e.editVisible=!1):e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(t){var e=this,i={duration:this.addList.duration,price:this.addList.price,discount:this.addList.discount,description:this.addList.description};i.sign=Object(r.a)(i),this.$refs[t].validate(function(t){if(!t)return!1;e.addBtnLoading=!0,Object(o._32)(i).then(function(t){e.addBtnLoading=!1,200==t.data.code?(e.$message({message:"添加成功",type:"success",duration:2e3}),e.getList(),e.addVisible=!1):e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(t){e.addBtnLoading=!1})})},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(this.currentPage=t,!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1]};e.sign=Object(r.a)(e),Object(o._34)(e).then(function(e){t.listLoading=!1,200==e.data.code?(t.list=e.data.data,t.totalCount=e.data.count,t.totalClass=e.data.data.length):t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(){t.listLoading=!1})}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table height-85"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/qa/list"}}},[t._v("规则定义")]),t._v(" "),i("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,size:"mini",model:t.searchItem,"label-width":"90px"}},[i("div",{staticClass:"form-input height50"},[i("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[i("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:t.searchItem.pickerVal,callback:function(e){t.$set(t.searchItem,"pickerVal",e)},expression:"searchItem.pickerVal"}})],1)],1),t._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"goods:add",expression:"'goods:add'"}],attrs:{size:"mini"},on:{click:function(e){return t.handleAdd()}}},[t._v("添加")])],1)]),t._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[i("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),i("el-table-column",{attrs:{label:"时长",prop:"duration",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.duration,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.duration)+"毫秒\n                    ")])]),t._v(" "),t.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.duration)+"毫秒\n                ")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"单价",prop:"price",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.price,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.price)+"元\n                    ")])]),t._v(" "),t.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.price)+"元\n                ")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"折扣",prop:"discount",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.discount,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.discount)+"折\n                    ")])]),t._v(" "),t.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.discount)+"折\n                ")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"描述",prop:"description",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.description,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.description)+"\n                    ")])]),t._v(" "),t.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.description)+"\n                ")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"添加时间",prop:"createTime",align:"center",formatter:t.formTime,width:"120"}}),t._v(" "),i("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:t.formTime2,width:"130"}}),t._v(" "),t.isshow?i("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"goods:update",expression:"'goods:update'"}],attrs:{size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"goods:delete",expression:"'goods:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}],null,!1,4047323575)}):t._e()],1),t._v(" "),i("div",{staticClass:"pagination-wrap"},[i("ul",{staticClass:"pagination"},[i("li",[i("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[i("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),t.currentPage==t.getpageNum(t.totalCount)&&1!=t.currentPage&&t.currentPage-2>0?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),i("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),t.currentPage!=t.getpageNum(t.totalCount)&&0!=t.getpageNum(t.totalCount)?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&t.currentPage!=t.getpageNum(t.totalCount)&&t.getpageNum(t.totalCount)>=3?i("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),i("li",[i("button",{attrs:{disabled:t.currentPage==t.getpageNum(t.totalCount)||0==t.getpageNum(t.totalCount)},on:{click:function(e){t.turnToPage(t.getpageNum(t.totalCount))}}},[i("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:t.editVisible,width:"40%",top:"10vh","before-close":t.editHandleClose},on:{"update:visible":function(e){t.editVisible=e},close:function(e){return t.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",rules:t.editRules,model:t.currentItem}},[i("el-form-item",{attrs:{label:"时长",prop:"duration"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.duration,callback:function(e){t.$set(t.currentItem,"duration",e)},expression:"currentItem.duration"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"单价",prop:"price"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.price,callback:function(e){t.$set(t.currentItem,"price",e)},expression:"currentItem.price"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"折扣",prop:"discount"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.discount,callback:function(e){t.$set(t.currentItem,"discount",e)},expression:"currentItem.discount"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"描述",prop:"description"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.currentItem.description,callback:function(e){t.$set(t.currentItem,"description",e)},expression:"currentItem.description"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.editHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.editBtnLoading},on:{click:function(e){return t.editHandleConfirm("currentItem")}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:t.addVisible,width:"40%",top:"10vh","before-close":t.addHandleClose},on:{"update:visible":function(e){t.addVisible=e},open:function(e){return t.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",rules:t.addRules,model:t.addList}},[i("el-form-item",{attrs:{label:"时长",prop:"duration"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.duration,callback:function(e){t.$set(t.addList,"duration",e)},expression:"addList.duration"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"单价",prop:"price"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.price,callback:function(e){t.$set(t.addList,"price",e)},expression:"addList.price"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"折扣",prop:"discount"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.discount,callback:function(e){t.$set(t.addList,"discount",e)},expression:"addList.discount"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"描述",prop:"description"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.description,callback:function(e){t.$set(t.addList,"description",e)},expression:"addList.description"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.addHandleClose}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=i("VU/8")(c,d,!1,function(t){i("W3JY")},"data-v-10b7946a",null);e.default=u.exports}});