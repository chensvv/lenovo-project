webpackJsonp([10],{Shg7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("pFYg"),d=a.n(i),s=a("2YME"),r=a("2hMI"),o={data:function(){return{padOfterImg:"",phoneOfterImg:"",channelList:[],typeList:[],phoneTypeList:[],videoTypeList:[],addList:{resTypeVal:"",resVideoTypeVal:"",resChannelVal:"",resPadFile:null,resPhoneFile:null,resPadLink:"",resPhoneLink:"",resState:"",resName:"",resVip:"",resPay:"",resPlayLink:"",resTypeCon:[100],resSinger:"",resAlbum:"",resLabel:""},addRules:{resTypeVal:[{required:!0,message:"请选择资源类型",trigger:"change"}],resVideoTypeVal:[{required:!0,message:"请选择视频类型",trigger:"change"}],resChannelVal:[{required:!0,message:"请选择资源渠道",trigger:"change"}],resState:[{required:!0,message:"请输入资源说明",trigger:"change"}],resName:[{required:!0,message:"请输入资源名称",trigger:"change"}],resVip:[{required:!0,message:"请选择是否VIP",trigger:"change"}],resPay:[{required:!0,message:"请选择是否付费",trigger:"change"}],resPlayLink:[{required:!0,message:"请输入播放链接",trigger:"change"}],resTypeCon:[{required:!0,message:"请选择机型配置",trigger:"change"}],resSinger:[{required:!0,message:"请输入歌手",trigger:"change"}],resAlbum:[{required:!0,message:"请输入专辑",trigger:"change"}],resLabel:[{required:!0,message:"请输入资源标签",trigger:"change"}]},addPadProductImageList:[],addPhoneProductImageList:[],addPadDefaultImgList:[],addPhoneDefaultImgList:[],addPadZoomScale:[1,1],addPhoneZoomScale:[1,1],addPadShowCropper:!1,addPhoneShowCropper:!1,addPadCropperImg:"",addPhoneCropperImg:"",addBtnLoading:!1,singerShow:!1,labelShow:!1,padSeen:!1,phoneSeen:!1,videoShow:!1}},components:{Cropper:s.a},watch:{addPadDefaultImgList:{handler:function(e,t){this.addPadProductImageList=e},deep:!0},addPhoneDefaultImgList:{handler:function(e,t){this.addPhoneProductImageList=e},deep:!0}},created:function(){this.getChannelList(),this.getTypeList(),this.getPhoneTypeList()},methods:{padEnter:function(){this.padSeen=!0},padLeave:function(){this.padSeen=!1},padEmpty:function(){this.padOfterImg="",this.addList.resPadFile=null},phoneEnter:function(){this.phoneSeen=!0},phoneLeave:function(){this.phoneSeen=!1},phoneEmpty:function(){this.phoneOfterImg="",this.addList.resPhoneFile=null},addPadBeforeAvatarUpload:function(e){if(!(e.size/1024/1024<2))return this.$message.error("上传图片大小不能超过 2MB!"),this.noCanUpload=!0,!1},addPadRemoveImage:function(e,t){var a=this.addPadProductImageList.findIndex(function(t){return t.uid==e.uid});a>-1&&this.addPadProductImageList.splice(a,1),this.$emit("getUploadImg",this.addPadProductImageList)},addPadUpdateCropper:function(){var e=this;if(!this.noCanUpload){var t=this.$refs.addPadFileUpload.uploadFiles,a=t.findIndex(function(t){return t.uid==e.currentFile.uid});t.splice(a,1)}var i=this.$refs.addPadFileUpload.$children.length-1;this.$refs.addPadFileUpload.$children[i].$el.click()},addPadCloseDialog:function(){var e=this;if(this.addPadShowCropper=!1,!this.noCanUpload){var t=this.$refs.addPadFileUpload.uploadFiles,a=t.findIndex(function(t){return t.uid==e.currentFile.uid});t.splice(a,1)}},addPadUploadImg:function(e){var t=this;this.uploadFile=e,this.addList.resPadFile=e;var a=new Image;a.src=window.URL.createObjectURL(e),this.padOfterImg=a.src,a.onload=function(){Math.min(a.width,a.height);t.addPadShowCropper=!1}},addPadSelectChange:function(e){var t=this;this.noCanUpload=!1;var a=e.raw,i=new FileReader;i.onload=function(a){var i=void 0;i="object"===d()(a.target.result)?window.URL.createObjectURL(new Blob([a.target.result])):a.target.result,t.addPadCropperImg=i,t.addPadShowCropper=!0,t.currentFile=e},i.readAsArrayBuffer(a)},addPhoneBeforeAvatarUpload:function(e){if(!(e.size/1024/1024<2))return this.$message.error("上传图片大小不能超过 2MB!"),this.noCanUpload=!0,!1},addPhoneRemoveImage:function(e,t){var a=this.addPhoneProductImageList.findIndex(function(t){return t.uid==e.uid});a>-1&&this.addPhoneProductImageList.splice(a,1),this.$emit("getUploadImg",this.addPhoneProductImageList)},addPhoneUpdateCropper:function(){var e=this;if(!this.noCanUpload){var t=this.$refs.addPhoneFileUpload.uploadFiles,a=t.findIndex(function(t){return t.uid==e.currentFile.uid});t.splice(a,1)}var i=this.$refs.addPhoneFileUpload.$children.length-1;this.$refs.addPhoneFileUpload.$children[i].$el.click()},addPhoneCloseDialog:function(){var e=this;if(this.addPhoneShowCropper=!1,!this.noCanUpload){var t=this.$refs.addPhoneFileUpload.uploadFiles,a=t.findIndex(function(t){return t.uid==e.currentFile.uid});t.splice(a,1)}},addPhoneUploadImg:function(e){var t=this;this.uploadFile=e,this.addList.resPhoneFile=e;var a=new Image;a.src=window.URL.createObjectURL(e),this.phoneOfterImg=a.src,a.onload=function(){Math.min(a.width,a.height);t.addPhoneShowCropper=!1}},addPhoneSelectChange:function(e){var t=this;this.noCanUpload=!1;var a=e.raw,i=new FileReader;i.onload=function(a){var i=void 0;i="object"===d()(a.target.result)?window.URL.createObjectURL(new Blob([a.target.result])):a.target.result,t.addPhoneCropperImg=i,t.addPhoneShowCropper=!0,t.currentFile=e},i.readAsArrayBuffer(a)},handleType:function(e){9==e?(this.singerShow=!0,this.labelShow=!1,this.videoShow=!1,this.addList.resVideoTypeVal="",this.addList.resLabel=""):10==e?(this.labelShow=!0,this.singerShow=!1,this.videoShow=!1,this.addList.resVideoTypeVal="",this.addList.resSinger="",this.addList.resAlbum=""):(this.labelShow=!1,this.singerShow=!1,this.videoShow=!0,this.addList.resLabel="",this.addList.resSinger="",this.addList.resAlbum="",this.getVideoTypeList())},addHandleConfirm:function(e){var t=this;if(null==this.addList.resPadFile&&""==this.addList.resPadLink)this.$message({message:"请选择Pad资源图片或输入资源url",type:"warning",duration:2e3});else if(null!=this.addList.resPhoneFile||""!=this.addList.resPhoneLink){var a=new FormData;a.append("type",this.addList.resTypeVal),a.append("subType",this.addList.resVideoTypeVal),a.append("channel",this.addList.resChannelVal),a.append("padImg",this.addList.resPadLink),a.append("phoneImg",this.addList.resPhoneLink),a.append("padFile",this.addList.resPadFile),a.append("phoneFile",this.addList.resPhoneFile),a.append("description",this.addList.resState),a.append("name",this.addList.resName),a.append("vip",this.addList.resVip),a.append("paid",this.addList.resPay),a.append("playUrl",this.addList.resPlayLink),a.append("modelConfig",this.addList.resTypeCon),a.append("singer",this.addList.resSinger),a.append("album",this.addList.resAlbum),a.append("label",this.addList.resLabel),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(r._71)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1e3}),t.getChannelList(),t.getTypeList(),t.getPhoneTypeList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){t.addBtnLoading=!1})})}else this.$message({message:"请选择Phone资源图片或输入资源url",type:"warning",duration:2e3})},addHandleClose:function(){this.$router.push({path:"/showmode/list"})},getChannelList:function(){var e=this;Object(r.M)({parentCode:1}).then(function(t){e.channelList=t.data.data})},getTypeList:function(){var e=this;Object(r.M)({parentCode:2}).then(function(t){e.typeList=t.data.data})},getPhoneTypeList:function(){var e=this;Object(r.M)({parentCode:3}).then(function(t){e.phoneTypeList=t.data.data})},getVideoTypeList:function(){var e=this,t={parentCode:this.addList.resTypeVal};Object(r.M)(t).then(function(t){e.videoTypeList=t.data.data})}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),i("el-breadcrumb-item",[e._v("规则定义")]),e._v(" "),i("el-breadcrumb-item",{attrs:{to:{path:"/showmode/list"}}},[e._v("资源管理")]),e._v(" "),e._l(e.$route.meta,function(t,a){return i("el-breadcrumb-item",{key:a},[e._v(e._s(t))])})],2),e._v(" "),i("div",[i("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",rules:e.addRules,model:e.addList}},[i("el-form-item",{attrs:{label:"资源类型",prop:"resTypeVal"}},[i("el-select",{attrs:{placeholder:"请选择",clearable:""},on:{change:e.handleType},model:{value:e.addList.resTypeVal,callback:function(t){e.$set(e.addList,"resTypeVal",t)},expression:"addList.resTypeVal"}},e._l(e.typeList,function(e){return i("el-option",{key:e.id,attrs:{label:e.context,value:e.id}})}),1)],1),e._v(" "),e.videoShow?i("el-form-item",{attrs:{label:"视频类型",prop:"resVideoTypeVal"}},[i("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.addList.resVideoTypeVal,callback:function(t){e.$set(e.addList,"resVideoTypeVal",t)},expression:"addList.resVideoTypeVal"}},e._l(e.videoTypeList,function(e){return i("el-option",{key:e.id,attrs:{label:e.context,value:e.id}})}),1)],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"资源渠道",prop:"resChannelVal"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.addList.resChannelVal,callback:function(t){e.$set(e.addList,"resChannelVal",t)},expression:"addList.resChannelVal"}},e._l(e.channelList,function(e){return i("el-option",{key:e.id,attrs:{label:e.context,value:e.id}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"PAD",prop:"resPadFile"}},[e.padOfterImg?i("div",{staticClass:"img-box",on:{mouseenter:e.padEnter,mouseleave:e.padLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.padSeen,expression:"padSeen"}],staticClass:"x-box"},[i("img",{staticClass:"x",attrs:{src:a("smv8")},on:{click:function(t){return e.padEmpty()}}})]),e._v(" "),i("img",{staticClass:"oftimg",attrs:{src:e.padOfterImg}})]):i("el-upload",{ref:"addPadFileUpload",staticClass:"cropper-upload-box",attrs:{"http-request":e.addUploadPad,multiple:!0,"list-type":"picture-card","file-list":e.addPadProductImageList,"on-remove":e.addPadRemoveImage,limit:1,"before-upload":e.addPadBeforeAvatarUpload,"auto-upload":!1,"on-change":e.addPadSelectChange,action:""}},[i("i",{staticClass:"el-icon-upload"})]),e._v(" "),e.addPadShowCropper?i("cropper",{attrs:{"dialog-visible":e.addPadShowCropper,"cropper-img":e.addPadCropperImg,zoomScale:e.addPadZoomScale},on:{"update-cropper":e.addPadUpdateCropper,"colse-dialog":e.addPadCloseDialog,"upload-img":e.addPadUploadImg}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"资源URL",prop:"resPadLink"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resPadLink,callback:function(t){e.$set(e.addList,"resPadLink","string"==typeof t?t.trim():t)},expression:"addList.resPadLink"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"手机"}},[e.phoneOfterImg?i("div",{staticClass:"img-box",on:{mouseenter:e.phoneEnter,mouseleave:e.phoneLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.phoneSeen,expression:"phoneSeen"}],staticClass:"x-box"},[i("img",{staticClass:"x",attrs:{src:a("smv8")},on:{click:function(t){return e.phoneEmpty()}}})]),e._v(" "),i("img",{staticClass:"oftimg",attrs:{src:e.phoneOfterImg}})]):i("el-upload",{ref:"addPhoneFileUpload",staticClass:"cropper-upload-box",attrs:{"http-request":e.addUploadPhone,multiple:!0,"list-type":"picture-card","file-list":e.addPhoneProductImageList,"on-remove":e.addPhoneRemoveImage,limit:1,"before-upload":e.addPhoneBeforeAvatarUpload,"auto-upload":!1,"on-change":e.addPhoneSelectChange,action:""}},[i("i",{staticClass:"el-icon-upload"})]),e._v(" "),e.addPhoneShowCropper?i("cropper",{attrs:{"dialog-visible":e.addPhoneShowCropper,"cropper-img":e.addPhoneCropperImg,zoomScale:e.addPhoneZoomScale},on:{"update-cropper":e.addPhoneUpdateCropper,"colse-dialog":e.addPhoneCloseDialog,"upload-img":e.addPhoneUploadImg}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"资源URL",prop:"resPhoneLink"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resPhoneLink,callback:function(t){e.$set(e.addList,"resPhoneLink","string"==typeof t?t.trim():t)},expression:"addList.resPhoneLink"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"资源说明",prop:"resState"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resState,callback:function(t){e.$set(e.addList,"resState","string"==typeof t?t.trim():t)},expression:"addList.resState"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"资源名称",prop:"resName"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resName,callback:function(t){e.$set(e.addList,"resName","string"==typeof t?t.trim():t)},expression:"addList.resName"}})],1),e._v(" "),e.singerShow?i("el-form-item",{attrs:{label:"歌手",prop:"resSinger"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resSinger,callback:function(t){e.$set(e.addList,"resSinger","string"==typeof t?t.trim():t)},expression:"addList.resSinger"}})],1):e._e(),e._v(" "),e.singerShow?i("el-form-item",{attrs:{label:"专辑",prop:"resAlbum"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resAlbum,callback:function(t){e.$set(e.addList,"resAlbum","string"==typeof t?t.trim():t)},expression:"addList.resAlbum"}})],1):e._e(),e._v(" "),e.labelShow?i("el-form-item",{attrs:{label:"资源标签",prop:"resLabel"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resLabel,callback:function(t){e.$set(e.addList,"resLabel","string"==typeof t?t.trim():t)},expression:"addList.resLabel"}})],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"VIP",prop:"resVip"}},[i("el-select",{attrs:{clearable:"",placeholder:"--"},model:{value:e.addList.resVip,callback:function(t){e.$set(e.addList,"resVip",t)},expression:"addList.resVip"}},[i("el-option",{attrs:{label:"是",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"否",value:"0"}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"付费",prop:"resPay"}},[i("el-select",{attrs:{clearable:"",placeholder:"--"},model:{value:e.addList.resPay,callback:function(t){e.$set(e.addList,"resPay",t)},expression:"addList.resPay"}},[i("el-option",{attrs:{label:"是",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"否",value:"0"}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"播放链接",prop:"resPlayLink"}},[i("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.resPlayLink,callback:function(t){e.$set(e.addList,"resPlayLink","string"==typeof t?t.trim():t)},expression:"addList.resPlayLink"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"机型配置",prop:"resTypeCon"}},[i("el-select",{attrs:{multiple:"",placeholder:"请选择"},model:{value:e.addList.resTypeCon,callback:function(t){e.$set(e.addList,"resTypeCon",t)},expression:"addList.resTypeCon"}},e._l(e.phoneTypeList,function(e){return i("el-option",{key:e.id,attrs:{label:e.context,value:e.id}})}),1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(o,n,!1,function(e){a("vu2M")},"data-v-544b9460",null);t.default=l.exports},smv8:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEEElEQVR4XuXbW6gNURzH8d8/kntyiSQSuSTXSCS5hJNIxMmLB148ePF03oQ8evDmQSl5UYhEclwi4eSSa3KJJJfIJbkn+mmd/nOM7ew9a82sNXvm2C8ezsw238+stfZu9ozgP39JvJ/kBAALALwAcFpE3nYEH5L9ASwB0B3AVRG5GnW1AZDcAmBzLPgBgE0icqDMCCRXAdgGYHSsY6uImF60ApCcBuBKldDGsiJo/P4qXRNF5HYEsA7A7hpnunQICfEmdYOI7IwA1gDYmzDUS4NgEW9S14vIrgjALBIXKuZJex6FR7CMN+vbLLPIxxdBs1hUmy9xjMIiWMablraGyo/B0iKkiW/7FKj4LlA6hLTx7QLox2JpELLEVwUoC0LW+JoARUfwEZ8IUFQEX/FWAEVD8BlvDVAUBN/xTgD1RggR7wxQL4RQ8akA8kYIGZ8aIC+E0PGZAEIj5BGfGSAUQl7xXgB8I+QZ7w3AF0Le8V4BsiLUI947QFqEesUHAXBFMNvX81LcX5fE9GC8/ONwVm3+v2DXIYMBOI6EWgjB4oNNgXhNxpEQND4XgAwjIXh8bgApEHKJzxtgpa72SesO9YeLgzarY9Ztkg4m6/u37k9yhcZ3snzDX4pwyHL71JsFByC5XOM7Ox7lT0U47Lif0+ZBAUgu0/guTkf1Z+MfinAk5f6JuwUDILlU47smHkXtDb4rwtGM79Pu7kEASJr7ccwvzd0SDrpR/570q/Q3RTjmG8E7AMnFGt8jKT669cbyy9IXRTjuE8ErAMkGje9lGx9tZ4nwSRFO+ELwBkByIQBzR1lv13hHhI+K0OwDwQsASXNvoZnHfdLGOyJ8UIRTWREyA5Ccr/F9s8Y7IrxXhDNZEDIBkJyrw76fr3hHhHcAVonI2bQIqQFIztEzP8B3vCPCGx0J59IgpAIgOVvjB4aKd0R4rQjnXRGcAUjO0mE/KHS8I8IrnQ7mfkfrlxMAyZkaPziveEeElzoSLtoKWAOQnKHDfkje8Y4IzxWhxQbBCoDkdI0fWq94R4RnOh0uJyEkAuit9OYb3rB6xzsiPFWEtocj2jv+mgAkp+qZH16UeEeEJzodrlU7/qoAJKdo/IiixTsiPFaE69YjgOQkXe1HFjXeEeGRToeblT3/jAB9cMrM+VFFj3dEeKgj4Va8q/J2+fE67MeUJd4R4b4i3In2iz8wMU6H/diyxTsi3NPpcNfsFz0y0xOAucBgvunVeuX2i03S53e1v1teWboEYJGIfI4AVgPYV/Z4x5GwVkT2RAAbAeyoAVD4M1957BYjoUlEtkcA5pLWySoApYu3HAkNItIcXwTNY7NN+nyteY+O+ujsVwDb/3p0NiY2GcC8Dv7wdIuI3PjnYzDtqlv2/X4D6r1SX+0QUjsAAAAASUVORK5CYII="},vu2M:function(e,t){}});