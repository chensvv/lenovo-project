webpackJsonp([67],{"G/0J":function(e,t){},ZPXn:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("2hMI"),s={data:function(){return{value:[],data:[],allData:[],newData:[],grayList:[],addList:{version:"",gray:[]},currentItem:{name:"",context:""},addRules:{version:[{required:!0,message:"请输入版本号",trigger:"change"}]},editRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],context:[{required:!0,message:"请输入内容",trigger:"blur"}]},addBtnLoading:!1,editVisible:!1,editBtnLoading:!1}},created:function(){this.getList(),this.getGrayList()},methods:{openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},leftCheckChange:function(e){e.length>1&&(e.pop(),this.$message({message:"单次只能选择一个",type:"warning",duration:1e3}))},handleChange:function(e,t,a){e.length>10&&(e.pop(),this.$message({message:"最多可选10个",type:"warning",duration:1e3}))},preview:function(){var e=this;this.newData=[];for(var t=0;t<this.value.length;t++){var a=this.allData.find(function(a){return a.id===e.value[t]});this.newData.push(a)}},addHandleConfirm:function(e){var t=this;if(0==this.value.length)this.$message({message:"请选择发布资源",type:"warning",duration:1e3});else{var a={version:this.addList.version,resources:this.value.join(),grayId:this.addList.gray.join()};this.$refs[e].validate(function(s){if(!s)return!1;t.addBtnLoading=!0,Object(i._78)(a).then(function(a){t.addBtnLoading=!1,200==a.data.code?(t.$message({message:"发布成功",type:"success",duration:1e3}),t.$refs[e].resetFields()):t.$message({message:a.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})}},handleAddGray:function(){this.editVisible=!0},editHandleClose:function(){this.editVisible=!1},editHandleConfirm:function(e){var t=this,a={name:this.currentItem.name,currentContext:this.currentItem.context};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(i._3)(a).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"新增成功",type:"success",duration:1e3}),t.getGrayList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleHistory:function(){this.$router.push({path:"/showmode/history"})},getList:function(){var e=this;Object(i._74)().then(function(t){e.allData=t.data.data;for(var a=0;a<e.allData.length;a++)e.data.push({key:e.allData[a].id,label:e.allData[a].name,disabled:!1})})},getGrayList:function(){var e=this;Object(i._4)({}).then(function(t){e.grayList=t.data.data})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"carousel"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),e._l(e.$route.meta,function(t,i){return a("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),a("div",{staticClass:"search_box add-widths"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"gray:add",expression:"'gray:add'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAddGray()}}},[e._v("新增灰度")]),e._v(" "),a("el-button",{staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleHistory()}}},[e._v("历史版本")])],1),e._v(" "),a("div",{staticClass:"table-box"},[a("el-carousel",{attrs:{autoplay:!1,height:"250px"}},e._l(e.newData,function(e){return a("el-carousel-item",{key:e},[a("img",{staticClass:"carousel-img",attrs:{src:e.padImg}})])}),1),e._v(" "),a("div",{staticClass:"transfer"},[a("el-transfer",{attrs:{filterable:"",data:e.data,titles:["待发布资源","预发布资源"],"target-order":"push"},on:{"left-check-change":function(t){return e.leftCheckChange(t)},change:e.handleChange},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("div",{staticClass:"btn-box"},[a("el-button",{on:{click:function(t){return e.preview()}}},[e._v("预览")])],1),e._v(" "),a("div",{staticClass:"add-widths"},[a("el-form",{ref:"addList",staticClass:"add-width",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"版本号",prop:"version"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.version,callback:function(t){e.$set(e.addList,"version","string"==typeof t?t.trim():t)},expression:"addList.version"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择灰度",prop:"gray"}},[a("el-select",{attrs:{multiple:"",placeholder:"不选为不灰度"},model:{value:e.addList.gray,callback:function(t){e.$set(e.addList,"gray",t)},expression:"addList.gray"}},e._l(e.grayList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-con-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"showmode:savePublish",expression:"'showmode:savePublish'"}],attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("发 布")])],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增灰度",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.openFun("currentItem")}}},[a("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.name,callback:function(t){e.$set(e.currentItem,"name","string"==typeof t?t.trim():t)},expression:"currentItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"内容",prop:"context"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.context,callback:function(t){e.$set(e.currentItem,"context","string"==typeof t?t.trim():t)},expression:"currentItem.context"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(s,n,!1,function(e){a("G/0J")},"data-v-063d7abb",null);t.default=r.exports}});