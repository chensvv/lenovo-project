webpackJsonp([38],{NmEq:function(t,e){},ZPXn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),n=a("2hMI"),r={data:function(){return{value:[],data:[],allData:[],newData:[],grayList:[],addList:{version:"",gray:[]},currentItem:{name:"",context:""},addRules:{version:[{required:!0,message:"请输入版本号",trigger:"change"}]},editRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],context:[{required:!0,message:"请输入内容",trigger:"blur"}]},addBtnLoading:!1,sort:"",item:"",index:""}},created:function(){this.getList(),this.getGrayList()},methods:{leftCheckChange:function(t){t.length>1&&(t.pop(),this.$message({message:"单次只能选择一个",type:"warning",duration:1e3}))},handleChange:function(t,e,a){t.length>10&&(t.pop(),this.$message({message:"最多可选10个",type:"warning",duration:1e3}))},rightCheckChange:function(t){this.item=t},handleUp:function(t,e){if(1==(t=this.item).length)if(this.value.find(function(a,s,i){a==t&&(e=s)}),0!=e){var a=JSON.parse(i()(this.value[e-1]));this.value.splice(e-1,1),this.value.splice(e,0,a)}else this.$message.warning("没有上移的空间了");else this.$message.warning("只能选择一条数据进行上下移动")},handleDown:function(t,e){if(1==(t=this.item).length)if(this.value.find(function(a,s,i){a==t&&(e=s)}),e!=this.value.length-1){var a=JSON.parse(i()(this.value[e]));this.value.splice(e,1),this.value.splice(e+1,0,a)}else this.$message.warning("没有下移的空间了");else this.$message.warning("只能选择一条数据进行上下移动")},preview:function(){var t=this;this.newData.splice(0,this.newData.length);for(var e=function(e){var a=t.allData.find(function(a){return a.id===t.value[e]});t.newData.push(a)},a=0;a<this.value.length;a++)e(a)},addHandleConfirm:function(t){var e=this;if(0==this.value.length)this.$message({message:"请选择发布资源",type:"warning",duration:1e3});else{var a={version:this.addList.version,resources:this.value.join(),grayId:this.addList.gray.join()};this.$refs[t].validate(function(s){if(!s)return!1;e.addBtnLoading=!0,Object(n._106)(a).then(function(a){e.addBtnLoading=!1,200==a.data.code?(e.$message({message:"发布成功",type:"success",duration:1e3}),e.$refs[t].resetFields()):e.$message({message:a.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.addBtnLoading=!1})})}},handleGray:function(){this.$router.push({path:"/showmode/gray"})},handleHistory:function(){this.$router.push({path:"/showmode/history"})},getList:function(){var t=this;Object(n._101)().then(function(e){t.allData=e.data.data;for(var a=0;a<t.allData.length;a++)t.data.push({key:t.allData[a].id,label:t.allData[a].name,disabled:!1})})},getGrayList:function(){var t=this;Object(n._21)({}).then(function(e){t.grayList=e.data.data})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table carousel"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v("规则定义")]),t._v(" "),t._l(t.$route.meta,function(e,s){return a("el-breadcrumb-item",{key:s},[t._v(t._s(e))])})],2),t._v(" "),a("div",{staticClass:"search_box add-widths"},[a("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(e){return t.handleGray()}}},[t._v("灰度配置")]),t._v(" "),a("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(e){return t.handleHistory()}}},[t._v("历史版本")])],1),t._v(" "),a("div",{staticClass:"table-box"},[a("el-carousel",{attrs:{autoplay:!1,height:"250px"}},t._l(t.newData,function(t,e){return a("el-carousel-item",{key:e},[a("img",{staticClass:"carousel-img",attrs:{src:t.padImg}})])}),1),t._v(" "),a("div",{staticClass:"transfer"},[a("el-transfer",{attrs:{filterable:"",data:t.data,titles:["待发布资源","预发布资源"],"target-order":"push"},on:{"left-check-change":function(e){return t.leftCheckChange(e)},"right-check-change":t.rightCheckChange,change:t.handleChange},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("el-button",{staticClass:"transfer-footer",attrs:{slot:"right-footer",size:"mini",type:"primary",icon:"el-icon-top"},on:{click:function(e){return t.handleUp(t.index)}},slot:"right-footer"},[t._v("上移")]),t._v(" "),a("el-button",{staticClass:"transfer-footer",attrs:{slot:"right-footer",size:"mini",type:"primary",icon:"el-icon-bottom"},on:{click:function(e){return t.handleDown(t.index)}},slot:"right-footer"},[t._v("下移")])],1)],1),t._v(" "),a("div",{staticClass:"btn-box"},[a("el-button",{on:{click:function(e){return t.preview()}}},[t._v("预览")])],1),t._v(" "),a("div",{staticClass:"add-widths"},[a("el-form",{ref:"addList",staticClass:"add-width",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:t.addRules,model:t.addList}},[a("el-form-item",{attrs:{label:"版本号",prop:"version"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:t.addList.version,callback:function(e){t.$set(t.addList,"version","string"==typeof e?e.trim():e)},expression:"addList.version"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"选择灰度",prop:"gray"}},[a("el-select",{attrs:{multiple:"",placeholder:"不选为不灰度"},model:{value:t.addList.gray,callback:function(e){t.$set(t.addList,"gray",e)},expression:"addList.gray"}},t._l(t.grayList,function(t){return a("el-option",{key:t.grayId,attrs:{label:t.name,value:t.grayId}})}),1)],1)],1),t._v(" "),a("span",{staticClass:"dialog-con-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"showmode:savePublish",expression:"'showmode:savePublish'"}],attrs:{type:"primary",loading:t.addBtnLoading},on:{click:function(e){return t.addHandleConfirm("addList")}}},[t._v("发 布")])],1)],1),t._v(" "),a("div",{staticClass:"perch-box"})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,l,!1,function(t){a("NmEq")},"data-v-706330cf",null);e.default=o.exports}});