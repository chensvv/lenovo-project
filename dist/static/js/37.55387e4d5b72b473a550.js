webpackJsonp([37],{L0Za:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("gRE1"),i=s.n(n),a=(s("pWbq"),s("2hMI")),o={data:function(){return{list:[],perList:[],currentItem:{id:"",songName:"",songMid:"",songId:"",songAlbumId:"",songSingerId:"",songSource:""},sourceList:[],addList:{songName:"",songMid:"",songId:"",songAlbumId:"",songSingerId:"",songSource:""},searchItem:{name:""},addRules:{songName:[{required:!0,message:"请输入歌手名称",trigger:"change"}],songMid:[{required:!0,message:"请输入QQ音乐MID",trigger:"change"}],songId:[{required:!0,message:"请输入QQ音乐ID",trigger:"change"}],songAlbumId:[{required:!0,message:"请输入对应专辑ID",trigger:"change"}],songSingerId:[{required:!0,message:"对应歌手ID",trigger:"change"}],songSource:[{required:!0,message:"请选择歌曲来源",trigger:"change"}]},editRules:{songName:[{required:!0,message:"请输入歌手名称",trigger:"change"}],songMid:[{required:!0,message:"请输入QQ音乐MID",trigger:"change"}],songId:[{required:!0,message:"请输入QQ音乐ID",trigger:"change"}],songAlbumId:[{required:!0,message:"请输入对应专辑ID",trigger:"change"}],songSingerId:[{required:!0,message:"对应歌手ID",trigger:"change"}],songSource:[{required:!0,message:"请选择歌曲来源",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(i()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:music:updatesong")&&-1==this.perList.indexOf("skill:music:deletesong")&&(this.isshow=!1)},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,console.log("当前页: "+e),this.getList()},handleEdit:function(e,t){var s=this;this.editVisible=!0,Object(a._68)().then(function(e){s.sourceList=e.data}),this.currentItem={id:t.id,songName:t.songName,songMid:t.songMid,songId:t.songId,songAlbumId:t.songAlbumId,songSingerId:t.songSingerId,songSource:t.songSource}},handleDel:function(e,t){var s=this,n={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a._66)(n).then(function(e){200==e.data.code?(s.$message({message:"删除成功",type:"success",duration:1e3}),s.getList()):s.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,s={id:this.currentItem.id,songName:this.currentItem.songName,songMid:this.currentItem.songMid,songId:this.currentItem.songId,songAlbumId:this.currentItem.songAlbumId,songSingerId:this.currentItem.songSingerId,songSource:this.currentItem.songSource};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(a._69)(s).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){var e=this;this.addVisible=!0,Object(a._68)().then(function(t){e.sourceList=t.data,console.log(t.data)})},addHandleConfirm:function(e){var t=this,s={songName:this.addList.songName,songMid:this.addList.songMid,songId:this.addList.songId,songAlbumId:this.addList.songAlbumId,songSingerId:this.addList.songSingerId,songSource:this.addList.songSource};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(a._65)(s).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},getList:function(){var e=this,t={name:this.searchItem.name,pgstr:this.currentPage,pcstr:this.pageSize};Object(a._67)(t).then(function(t){e.listLoading=!1,e.list=t.data.data,e.totalCount=t.data.count})},handleAlbum:function(){this.$router.push({path:"/lasf-kv/album"})},handleSinger:function(){this.$router.push({path:"/skill/music/singerlist"})}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",[e._v("LASF KV")]),e._v(" "),e._l(e.$route.meta,function(t,n){return s("el-breadcrumb-item",{key:n},[e._v(e._s(t))])})],2),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[s("el-form-item",{attrs:{label:"歌手名称",prop:"name"}},[s("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:addsong",expression:"'skill:music:addsong'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:albumlist",expression:"'skill:music:albumlist'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleAlbum()}}},[e._v("专辑列表")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:singerlist",expression:"'skill:music:singerlist'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(t){return e.handleSinger()}}},[e._v("歌手管理")])],1),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[s("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:"歌曲名称",prop:"songName",align:"center","show-overflow-tooltip":!0}}),e._v(" "),s("el-table-column",{attrs:{label:"歌曲ID",prop:"songId",align:"center","show-overflow-tooltip":!0}}),e._v(" "),s("el-table-column",{attrs:{label:"专辑ID",prop:"id",align:"center","show-overflow-tooltip":!0}}),e._v(" "),s("el-table-column",{attrs:{label:"QQ音乐MID",prop:"songMid",align:"center","show-overflow-tooltip":!0}}),e._v(" "),s("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"center","min-width":"140"}}),e._v(" "),e.isshow?s("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:updatesong",expression:"'skill:music:updatesong'"}],attrs:{size:"mini"},on:{click:function(s){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:deletesong",expression:"'skill:music:deletesong'"}],attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,2629014775)}):e._e()],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[s("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[s("el-form-item",{attrs:{label:"歌曲名称",prop:"songName"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.songName,callback:function(t){e.$set(e.currentItem,"songName","string"==typeof t?t.trim():t)},expression:"currentItem.songName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"QQ音乐MID",prop:"songMid"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.songMid,callback:function(t){e.$set(e.currentItem,"songMid","string"==typeof t?t.trim():t)},expression:"currentItem.songMid"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"QQ音乐ID",prop:"songId"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.songId,callback:function(t){e.$set(e.currentItem,"songId","string"==typeof t?t.trim():t)},expression:"currentItem.songId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"对应专辑ID",prop:"songAlbumId"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.songAlbumId,callback:function(t){e.$set(e.currentItem,"songAlbumId","string"==typeof t?t.trim():t)},expression:"currentItem.songAlbumId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"对应歌手简介",prop:"songSingerId"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.songSingerId,callback:function(t){e.$set(e.currentItem,"songSingerId","string"==typeof t?t.trim():t)},expression:"currentItem.songSingerId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"歌曲来源",prop:"songSource"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.currentItem.songSource,callback:function(t){e.$set(e.currentItem,"songSource",t)},expression:"currentItem.songSource"}},e._l(e.sourceList,function(e,t){return s("el-option",{key:t,attrs:{label:e.appName,value:e.id}})}),1)],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[s("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"120px",rules:e.addRules,model:e.addList}},[s("el-form-item",{attrs:{label:"歌曲名称",prop:"songName"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.songName,callback:function(t){e.$set(e.addList,"songName","string"==typeof t?t.trim():t)},expression:"addList.songName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"QQ音乐MID",prop:"songMid"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.songMid,callback:function(t){e.$set(e.addList,"songMid","string"==typeof t?t.trim():t)},expression:"addList.songMid"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"QQ音乐ID",prop:"songId"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.songId,callback:function(t){e.$set(e.addList,"songId","string"==typeof t?t.trim():t)},expression:"addList.songId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"对应专辑ID",prop:"songAlbumId"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.songAlbumId,callback:function(t){e.$set(e.addList,"songAlbumId","string"==typeof t?t.trim():t)},expression:"addList.songAlbumId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"对应歌手ID",prop:"songSingerId"}},[s("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.songSingerId,callback:function(t){e.$set(e.addList,"songSingerId","string"==typeof t?t.trim():t)},expression:"addList.songSingerId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"歌曲来源",prop:"songSource"}},[s("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.addList.songSource,callback:function(t){e.$set(e.addList,"songSource",t)},expression:"addList.songSource"}},e._l(e.sourceList,function(e,t){return s("el-option",{key:t,attrs:{label:e.appName,value:e.id}})}),1)],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=s("VU/8")(o,r,!1,function(e){s("ZUuB")},"data-v-45711fb8",null);t.default=l.exports},ZUuB:function(e,t){}});