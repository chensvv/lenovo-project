webpackJsonp([23],{ADnO:function(e,t){},caMe:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r("pWbq");var i=r("2hMI"),n={name:"applicationlist",data:function(){return{list:[],currentItem:{id:"",singerName:"",singerQqId:"",singerQqMid:"",singerQqPosterUrl:"",singerQqIntroduce:"",singerQqPhoto:""},addList:{singerName:"",singerQqId:"",singerQqMid:"",singerQqPosterUrl:"",singerQqIntroduce:"",singerQqPhoto:""},searchItem:{name:""},addRules:{singerName:[{required:!0,message:"请输入歌手名称",trigger:"change"}],singerQqId:[{required:!0,message:"请输入QQ音乐ID",trigger:"change"}],singerQqMid:[{required:!0,message:"请输入QQ音乐MID",trigger:"change"}],singerQqIntroduce:[{required:!0,message:"请输入歌手简介",trigger:"change"}],singerQqPhoto:[{required:!0,message:"请输入歌手图片地址",trigger:"change"}]},editRules:{singerName:[{required:!0,message:"请输入歌手名称",trigger:"change"}],singerQqId:[{required:!0,message:"请输入QQ音乐ID",trigger:"change"}],singerQqMid:[{required:!0,message:"请输入QQ音乐MID",trigger:"change"}],singerQqIntroduce:[{required:!0,message:"请输入歌手简介",trigger:"change"}],singerQqPhoto:[{required:!0,message:"请输入歌手图片地址",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:30,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1}},created:function(){this.getList()},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,singerName:t.singerName,singerQqId:t.singerQqId,singerQqMid:t.singerQqMid,singerQqIntroduce:t.singerQqIntroduce,singerQqPosterUrl:t.singerQqPosterUrl,singerQqPhoto:t.singerQqPhoto}},handleDel:function(e,t){var r=this,n={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i._20)(n).then(function(e){200==e.data.code?(r.$message({message:"删除成功",type:"success",duration:1e3}),r.getList()):r.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(){})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,r={id:this.currentItem.id,singerName:this.currentItem.singerName,singerQqId:this.currentItem.singerQqId,singerQqMid:this.currentItem.singerQqMid,singerQqPhoto:this.currentItem.singerQqPhoto,singerQqIntroduce:this.currentItem.singerQqIntroduce,singerQqPosterUrl:this.currentItem.singerQqPosterUrl};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(i._23)(r).then(function(e){200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editBtnLoading=!1,t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,r={singerName:this.addList.singerName,singerQqId:this.addList.singerQqId,singerQqMid:this.addList.singerQqMid,singerQqPhoto:this.addList.singerQqPhoto,singerQqIntroduce:this.addList.singerQqIntroduce,singerQqPosterUrl:this.addList.singerQqPosterUrl};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(i._19)(r).then(function(e){200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1,t.addBtnLoading=!1):(t.$message({message:e.data.errorMessage,type:"error",duration:1e3}),t.addBtnLoading=!1)})})},handlePub:function(){var e=this;Object(i._22)().then(function(t){1==t.data.again?(e.$message({message:"发布成功",type:"success",duration:1e3}),e.getList(),e.addVisible=!1,e.addBtnLoading=!1):(e.$message({message:t.data.errorMessage,type:"error",duration:1e3}),e.addBtnLoading=!1)})},getList:function(){var e=this,t={name:this.searchItem.name,pgstr:this.currentPage,pcstr:this.pageSize};Object(i._21)(t).then(function(t){e.list=t.data.data,e.totalCount=t.data.count})},handleAblum:function(){this.$router.push({path:"/lasf-kv/album"})},handleSong:function(){this.$router.push({path:"/lasf-kv/song"})}}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),r("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,i){return r("el-breadcrumb-item",{key:i},[e._v(e._s(t))])})],2),e._v(" "),r("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[r("el-form-item",{attrs:{label:"歌手名称",prop:"name"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),r("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:149,expression:"149"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:152,expression:"152"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handlePub()}}},[e._v("发布")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:153,expression:"153"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAblum()}}},[e._v("专辑列表")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:157,expression:"157"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleSong()}}},[e._v("歌曲列表")])],1),e._v(" "),r("div",{staticClass:"table-box"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list}},[r("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"名称",prop:"singerName",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"歌手ID",prop:"id",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"QQ音乐ID",prop:"singerQqId"}}),e._v(" "),r("el-table-column",{attrs:{label:"QQ音乐MID",prop:"singerQqMid",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"has",rawName:"v-has",value:150,expression:"150"}],attrs:{size:"mini"},on:{click:function(r){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:151,expression:"151"}],attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),r("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[r("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[r("el-form-item",{attrs:{label:"歌手名称",prop:"singerName"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerName,callback:function(t){e.$set(e.currentItem,"singerName","string"==typeof t?t.trim():t)},expression:"currentItem.singerName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"QQ音乐ID",prop:"singerQqId"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqId,callback:function(t){e.$set(e.currentItem,"singerQqId","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqId"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"QQ音乐MID",prop:"singerQqMid"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqMid,callback:function(t){e.$set(e.currentItem,"singerQqMid","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqMid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"歌手海报URL",prop:"singerQqPosterUrl"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqPosterUrl,callback:function(t){e.$set(e.currentItem,"singerQqPosterUrl","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqPosterUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"歌手简介",prop:"singerQqIntroduce"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqIntroduce,callback:function(t){e.$set(e.currentItem,"singerQqIntroduce","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqIntroduce"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"歌手图片",prop:"singerQqPhoto"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqPhoto,callback:function(t){e.$set(e.currentItem,"singerQqPhoto","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqPhoto"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[r("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"120px",rules:e.addRules,model:e.addList}},[r("el-form-item",{attrs:{label:"歌手名称",prop:"singerName"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerName,callback:function(t){e.$set(e.addList,"singerName","string"==typeof t?t.trim():t)},expression:"addList.singerName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"QQ音乐ID",prop:"singerQqId"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqId,callback:function(t){e.$set(e.addList,"singerQqId","string"==typeof t?t.trim():t)},expression:"addList.singerQqId"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"QQ音乐MID",prop:"singerQqMid"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqMid,callback:function(t){e.$set(e.addList,"singerQqMid","string"==typeof t?t.trim():t)},expression:"addList.singerQqMid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"歌手海报URL",prop:"singerQqPosterUrl"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqPosterUrl,callback:function(t){e.$set(e.addList,"singerQqPosterUrl","string"==typeof t?t.trim():t)},expression:"addList.singerQqPosterUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"歌手简介",prop:"singerQqIntroduce"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqIntroduce,callback:function(t){e.$set(e.addList,"singerQqIntroduce","string"==typeof t?t.trim():t)},expression:"addList.singerQqIntroduce"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"歌手图片",prop:"singerQqPhoto"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqPhoto,callback:function(t){e.$set(e.addList,"singerQqPhoto","string"==typeof t?t.trim():t)},expression:"addList.singerQqPhoto"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=r("VU/8")(n,s,!1,function(e){r("ADnO")},"data-v-65bd7c78",null);t.default=a.exports}});