webpackJsonp([24],{Kngn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("pWbq"),n=a("2hMI"),r=a("krqS"),l=a("7oYi"),o={data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now();return t.getTime()>e}},getpageNum:l.a,list:[],totalClass:"8",searchItem:{uip:"",pickerVal:[]},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!1}},created:function(){this.getList()},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,i=e.scrollWidth;this.showTitle=!(a<i)},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},formTime:function(t,e){var a=t.createTime,n=new Date(a);return n.getFullYear()+"-"+Object(i.a)(n.getMonth()+1)+"-"+Object(i.a)(n.getDate())+" "+Object(i.a)(n.getHours())+":"+Object(i.a)(n.getMinutes())},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(this.currentPage=t,!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,startStr:null==this.searchItem.pickerVal?"":this.searchItem.pickerVal[0],endStr:null==this.searchItem.pickerVal?"":this.searchItem.pickerVal[1],uid:this.searchItem.uip};e.sign=Object(r.a)(e),Object(n._171)(e).then(function(e){t.listLoading=!1,200==e.data.code?(t.list=e.data.data.data,t.totalCount=e.data.data.total,t.totalClass=e.data.data.data.length):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(){t.listLoading=!1})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"},nativeOn:{submit:function(t){t.preventDefault()}}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"客户端ip",prop:"uip"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchItem.uip,callback:function(e){t.$set(t.searchItem,"uip","string"==typeof e?e.trim():e)},expression:"searchItem.uip"}})],1),t._v(" "),a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:t.searchItem.pickerVal,callback:function(e){t.$set(t.searchItem,"pickerVal",e)},expression:"searchItem.pickerVal"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")])],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),a("el-table-column",{attrs:{label:"ID",prop:"id",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端ip",prop:"ip",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端地址",prop:"address",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端设备",prop:"devid",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端id",prop:"appid",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端类型",prop:"model",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"接口输入",prop:"cinput",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"接口返回",prop:"result",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"计算时间",prop:"dur",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"入库时间",prop:"createTime",align:"left",formatter:t.formTime,width:"130"}})],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),t.currentPage==t.getpageNum(t.totalCount)&&1!=t.currentPage&&t.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),a("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),t.currentPage!=t.getpageNum(t.totalCount)&&0!=t.getpageNum(t.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&t.currentPage!=t.getpageNum(t.totalCount)&&t.getpageNum(t.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:t.currentPage==t.getpageNum(t.totalCount)||0==t.getpageNum(t.totalCount)},on:{click:function(e){t.turnToPage(t.getpageNum(t.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,s,!1,function(t){a("Y9YV")},"data-v-c48c10ea",null);e.default=c.exports},Y9YV:function(t,e){}});