webpackJsonp([39],{SOHo:function(e,t){},Yb8w:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("gRE1"),n=i.n(s),r=(i("pWbq"),i("2hMI")),a={data:function(){return{list:[],perList:[],totalClass:"",currentItem:{id:"",singerName:"",singerQqId:"",singerQqMid:"",singerQqPosterUrl:"",singerQqIntroduce:"",singerQqPhoto:""},addList:{singerName:"",singerQqId:"",singerQqMid:"",singerQqPosterUrl:"",singerQqIntroduce:"",singerQqPhoto:""},searchItem:{name:""},addRules:{singerName:[{required:!0,message:"请输入歌手名称",trigger:"change"}],singerQqId:[{required:!0,message:"请输入QQ音乐ID",trigger:"change"}],singerQqMid:[{required:!0,message:"请输入QQ音乐MID",trigger:"change"}],singerQqIntroduce:[{required:!0,message:"请输入歌手简介",trigger:"change"}],singerQqPhoto:[{required:!0,message:"请输入歌手图片地址",trigger:"change"}]},editRules:{singerName:[{required:!0,message:"请输入歌手名称",trigger:"change"}],singerQqId:[{required:!0,message:"请输入QQ音乐ID",trigger:"change"}],singerQqMid:[{required:!0,message:"请输入QQ音乐MID",trigger:"change"}],singerQqIntroduce:[{required:!0,message:"请输入歌手简介",trigger:"change"}],singerQqPhoto:[{required:!0,message:"请输入歌手图片地址",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,pubBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:music:updatesinger")&&-1==this.perList.indexOf("skill:music:deletesinger")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,i=t.clientWidth,s=t.scrollWidth;this.showTitle=!(i<s)},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,singerName:t.singerName,singerQqId:t.singerQqId,singerQqMid:t.singerQqMid,singerQqIntroduce:t.singerQqIntroduce,singerQqPosterUrl:t.singerQqPosterUrl,singerQqPhoto:t.singerQqPhoto}},handleDel:function(e,t){var i=this,s={id:t.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r._109)(s).then(function(e){200==e.data.code?(i.$message({message:"删除成功",type:"success",duration:1e3}),i.getList()):i.$message({message:e.data.errorMessage,type:"error",duration:1e3})})})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,i={id:this.currentItem.id,singerName:this.currentItem.singerName,singerQqId:this.currentItem.singerQqId,singerQqMid:this.currentItem.singerQqMid,singerQqPhoto:this.currentItem.singerQqPhoto,singerQqIntroduce:this.currentItem.singerQqIntroduce,singerQqPosterUrl:this.currentItem.singerQqPosterUrl};this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(r._112)(i).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1e3}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,i={singerName:this.addList.singerName,singerQqId:this.addList.singerQqId,singerQqMid:this.addList.singerQqMid,singerQqPhoto:this.addList.singerQqPhoto,singerQqIntroduce:this.addList.singerQqIntroduce,singerQqPosterUrl:this.addList.singerQqPosterUrl};this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(r._108)(i).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})},handlePub:function(){var e=this;this.pubBtnLoading=!0,Object(r._111)().then(function(t){e.pubBtnLoading=!1,1==t.data.again?e.$message({message:"发布成功",type:"success",duration:1e3}):e.$message({message:t.data.errorMessage,type:"error",duration:1e3})}).catch(function(t){e.pubBtnLoading=!1})},getList:function(){var e=this;this.listLoading=!0;var t={name:this.searchItem.name,pgstr:this.currentPage,pcstr:this.pageSize};Object(r._110)(t).then(function(t){e.listLoading=!1,200==t.data.code&&(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length)}).catch(function(){e.listLoading=!1})},handleAblum:function(){this.$router.push({path:"/lasf-kv/album"})},handleSong:function(){this.$router.push({path:"/lasf-kv/song"})}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table height-85"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("技能管理")]),e._v(" "),i("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),i("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[i("div",{staticClass:"form-input height50"},[i("el-form-item",{attrs:{label:"歌手名称",prop:"name"}},[i("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1)],1),e._v(" "),i("div",{staticClass:"form-btn"},[i("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:addsinger",expression:"'skill:music:addsinger'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:singerpublish",expression:"'skill:music:singerpublish'"}],attrs:{size:"mini",loading:e.pubBtnLoading},on:{click:function(t){return e.handlePub()}}},[e._v("发布")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:albumlist",expression:"'skill:music:albumlist'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAblum()}}},[e._v("专辑列表")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:songlist",expression:"'skill:music:songlist'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleSong()}}},[e._v("歌曲列表")])],1)]),e._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list}},[i("el-table-column",{attrs:{type:"index",align:"left"}}),e._v(" "),i("el-table-column",{attrs:{label:"名称",prop:"singerName",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.singerName,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.singerName)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.singerName)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"歌手ID",prop:"id",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.id,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.id)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.id)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"QQ音乐ID",prop:"singerQqId",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.singerQqId,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.singerQqId)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.singerQqId)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"QQ音乐MID",prop:"singerQqMid",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.singerQqMid,placement:"top"}},[i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.singerQqMid)+"\n                        ")])]),e._v(" "),e.showTitle?i("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                        "+e._s(t.row.singerQqMid)+"\n                    ")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"更新时间",prop:"displayUpdateTime",align:"center","min-width":"120"}}),e._v(" "),e.isshow?i("el-table-column",{attrs:{label:"操作",align:"center","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:updatesinger",expression:"'skill:music:updatesinger'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:music:deletesinger",expression:"'skill:music:deletesinger'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,2441750455)}):e._e()],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[i("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[i("el-form-item",{attrs:{label:"歌手名称",prop:"singerName"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerName,callback:function(t){e.$set(e.currentItem,"singerName","string"==typeof t?t.trim():t)},expression:"currentItem.singerName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"QQ音乐ID",prop:"singerQqId"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqId,callback:function(t){e.$set(e.currentItem,"singerQqId","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"QQ音乐MID",prop:"singerQqMid"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqMid,callback:function(t){e.$set(e.currentItem,"singerQqMid","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqMid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"歌手海报URL",prop:"singerQqPosterUrl"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqPosterUrl,callback:function(t){e.$set(e.currentItem,"singerQqPosterUrl","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqPosterUrl"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"歌手简介",prop:"singerQqIntroduce"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqIntroduce,callback:function(t){e.$set(e.currentItem,"singerQqIntroduce","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqIntroduce"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"歌手图片",prop:"singerQqPhoto"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.singerQqPhoto,callback:function(t){e.$set(e.currentItem,"singerQqPhoto","string"==typeof t?t.trim():t)},expression:"currentItem.singerQqPhoto"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.addRules,model:e.addList}},[i("el-form-item",{attrs:{label:"歌手名称",prop:"singerName"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerName,callback:function(t){e.$set(e.addList,"singerName","string"==typeof t?t.trim():t)},expression:"addList.singerName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"QQ音乐ID",prop:"singerQqId"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqId,callback:function(t){e.$set(e.addList,"singerQqId","string"==typeof t?t.trim():t)},expression:"addList.singerQqId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"QQ音乐MID",prop:"singerQqMid"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqMid,callback:function(t){e.$set(e.addList,"singerQqMid","string"==typeof t?t.trim():t)},expression:"addList.singerQqMid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"歌手海报URL",prop:"singerQqPosterUrl"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqPosterUrl,callback:function(t){e.$set(e.addList,"singerQqPosterUrl","string"==typeof t?t.trim():t)},expression:"addList.singerQqPosterUrl"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"歌手简介",prop:"singerQqIntroduce"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqIntroduce,callback:function(t){e.$set(e.addList,"singerQqIntroduce","string"==typeof t?t.trim():t)},expression:"addList.singerQqIntroduce"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"歌手图片",prop:"singerQqPhoto"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.singerQqPhoto,callback:function(t){e.$set(e.addList,"singerQqPhoto","string"==typeof t?t.trim():t)},expression:"addList.singerQqPhoto"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(a,o,!1,function(e){i("SOHo")},"data-v-73a345a3",null);t.default=l.exports}});