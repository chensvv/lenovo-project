webpackJsonp([57],{O3g1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mvHQ"),r=a.n(s),n=a("2hMI"),o=a("iGF/"),m={inject:["reload"],data:function(){return{searchItem:{name:"",sql:""},seaBtnLoading:!1,addRules:{sql:[{required:!0,message:"请输入查询sql",trigger:"change"}],name:[{required:!0,message:"请输入报表名称",trigger:"change"}]}}},methods:{resetForm:function(e){this.$refs[e].resetFields()},onSubmit:function(e){var t=this;this.$refs[e].validate(function(e){if(e){t.seaBtnLoading=!0;var a={name:t.searchItem.name,sql:t.searchItem.sql},s={userName:sessionStorage.getItem("username"),password:sessionStorage.getItem("log")};Object(n._103)(a).then(function(e){200==e.data.code?(t.$message({message:"请求成功",type:"success",duration:1e3}),t.seaBtnLoading=!1,sessionStorage.removeItem("menuData"),sessionStorage.removeItem("btnpermission"),Object(o.h)(s).then(function(e){200==e.data.code?(sessionStorage.setItem("menuData",r()(e.data.data)),t.reload()):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})})):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("报表系统")]),e._v(" "),e._l(e.$route.meta,function(t,s){return a("el-breadcrumb-item",{key:s},[e._v(e._s(t))])})],2),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline state",attrs:{model:e.searchItem,rules:e.addRules,size:"medium"}},[a("el-form-item",{attrs:{label:"查询sql",prop:"sql"}},[a("el-input",{attrs:{type:"textarea",clearable:"","auto-complete":"off"},model:{value:e.searchItem.sql,callback:function(t){e.$set(e.searchItem,"sql",t)},expression:"searchItem.sql"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"报表名称",prop:"name"}},[a("el-input",{attrs:{clearable:"","auto-complete":"off"},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:function(t){return e.onSubmit("searchItem")}}},[e._v("新增")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(m,i,!1,function(e){a("gYZ1")},"data-v-16b89fea",null);t.default=l.exports},gYZ1:function(e,t){}});