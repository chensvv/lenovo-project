webpackJsonp([60],{GohJ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("gRE1"),i=n.n(a),r=n("pWbq"),s=n("2hMI"),o=n("krqS"),l=n("7oYi"),c={data:function(){return{getpageNum:l.a,list:[],perList:[],articleId:"",totalClass:"8",currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!0,btnshow:!0}},created:function(){var t=this;this.articleId=this.$route.query.articleId,JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(i()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("forum:delete")&&(this.btnshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,n=e.clientWidth,a=e.scrollWidth;this.showTitle=!(n<a)},formTime:function(t,e){var n=Number(t.createTime+"000"),a=new Date(n);return a.getFullYear()+"-"+Object(r.a)(a.getMonth()+1)+"-"+Object(r.a)(a.getDate())+" "+Object(r.a)(a.getHours())+":"+Object(r.a)(a.getMinutes())},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleDel:function(t,e){var n=this,a={id:e.id};a.sign=Object(o.a)(a),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s._27)(a).then(function(t){200==t.data.code?(n.$message({message:"删除成功",type:"success",duration:2e3}),n.getList()):n.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})})}).catch(function(t){console.log(t)})},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(this.currentPage=t,!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},getList:function(){var t=this;this.listLoading=!0;var e={articleId:this.articleId,pgstr:this.currentPage,pcstr:this.pageSize};e.sign=Object(o.a)(e),Object(s._26)(e).then(function(e){t.listLoading=!1,200==e.data.code?(t.list=e.data.data,t.totalCount=e.data.count,t.totalClass=e.data.data.length):t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(){t.listLoading=!1})}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table ask"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),n("el-breadcrumb-item",{attrs:{to:{path:"/forum/list"}}},[t._v("说法配置")]),t._v(" "),n("el-breadcrumb-item",{attrs:{to:{path:"/forum/list"}}},[t._v("论坛管理")]),t._v(" "),n("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),n("div",{staticClass:"table-box"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[n("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),n("el-table-column",{attrs:{label:"内容",prop:"content",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showTitle?t._e():n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.content,placement:"top"}},[n("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.content)+"\n                    ")])]),t._v(" "),t.showTitle?n("div",{staticClass:"toEllipsis",on:{mouseover:t.onShowNameTipsMouseenter}},[t._v("\n                    "+t._s(e.row.content)+"\n                ")]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:t.formTime,width:"130"}}),t._v(" "),t.btnshow?n("el-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{directives:[{name:"has",rawName:"v-has",value:"forum:delete",expression:"'forum:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(n){return t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}],null,!1,4031920175)}):t._e()],1),t._v(" "),n("div",{staticClass:"pagination-wrap"},[n("ul",{staticClass:"pagination"},[n("li",[n("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[n("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),t.currentPage==t.getpageNum(t.totalCount)&&1!=t.currentPage&&t.currentPage-2>0?n("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?n("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),n("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),t.currentPage!=t.getpageNum(t.totalCount)&&0!=t.getpageNum(t.totalCount)?n("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&t.currentPage!=t.getpageNum(t.totalCount)&&t.getpageNum(t.totalCount)>=3?n("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),n("li",[n("button",{attrs:{disabled:t.currentPage==t.getpageNum(t.totalCount)||0==t.getpageNum(t.totalCount)},on:{click:function(e){t.turnToPage(t.getpageNum(t.totalCount))}}},[n("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1)],1)},staticRenderFns:[]};var g=n("VU/8")(c,u,!1,function(t){n("g/Fj")},"data-v-4be588c4",null);e.default=g.exports},"g/Fj":function(t,e){}});