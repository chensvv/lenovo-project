webpackJsonp([75],{Pwyu:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("BO1k"),i=r.n(a),s=r("gRE1"),n=r.n(s),l=r("pWbq"),o=r("2hMI"),c=r("krqS"),u=r("FT/c"),d={data:function(){var e=function(e,t,r){""===t?r(new Error("请输入替换后内容")):t.split("<").length-1!=t.split(">").length-1?r(new Error("请确认内容输入是否正确")):r()};return{pickerOptions:{disabledDate:function(e){var t=Date.now();return e.getTime()>t}},list:[],perList:[],restaurants:[],totalClass:"8",voiceStatus:"el-icon-microphone",currentItem:{id:"",liju:"",regular:"",replaceResult:"",isFlag:null},addList:{liju:"",regular:"",replaceResult:"",isFlag:!1},redisList:{redisVal:""},searchItem:{regular:"",pickerVal:[]},addRules:{regular:[{required:!0,message:"请输入匹配规则",trigger:"change"}],replaceResult:[{required:!0,validator:e,trigger:"blur"}],isFlag:[{required:!0,message:"请选择是否生效",trigger:"change"}]},editRules:{regular:[{required:!0,message:"请输入匹配规则",trigger:"change"}],replaceResult:[{required:!0,validator:e,trigger:"blur"}],isFlag:[{required:!0,message:"请选择是否生效",trigger:"change"}]},redisRules:{redisVal:[{required:!0,message:"请输入要删除的说法",trigger:"change"}]},column:{prop:"",order:""},editVisible:!1,addVisible:!1,redisVisible:!1,currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,AIMLBtnLoading:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(n()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("ttsregular:add")&&-1==this.perList.indexOf("ttsregular:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,r=t.clientWidth,a=t.scrollWidth;this.showTitle=!(r<a)},formTime:function(e,t){var r=e.updateTime,a=new Date(r);return a.getFullYear()+"-"+Object(l.a)(a.getMonth()+1)+"-"+Object(l.a)(a.getDate())+" "+Object(l.a)(a.getHours())+":"+Object(l.a)(a.getMinutes())},formTime2:function(e,t){var r=e.createTime,a=new Date(r);return a.getFullYear()+"-"+Object(l.a)(a.getMonth()+1)+"-"+Object(l.a)(a.getDate())+" "+Object(l.a)(a.getHours())+":"+Object(l.a)(a.getMinutes())},formState:function(e,t){return"true"==e.isFlag?"是":"否"},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,t){this.editVisible=!0,this.currentItem={id:t.id,regular:t.regular,replaceResult:t.replaceResult,isFlag:"true"==t.isFlag}},playVoice:function(e){var t=this;this.voiceStatus="el-icon-loading";var r,a=new XMLHttpRequest;r="add"==e?"-1"!=u.a.proURL.indexOf("8085")?"text="+this.addList.liju+"&user=2":"text="+this.addList.liju+"&user=10140802691":"-1"!=u.a.proURL.indexOf("8085")?"text="+this.currentItem.liju+"&user=2":"text="+this.currentItem.liju+"&user=10140802691","-1"!=u.a.proURL.indexOf("8085")?(a.open("POST",u.a.proURL+"/lasf/cloudtts",!0),a.setRequestHeader("channel","cloudasr"),a.setRequestHeader("lenovokey","LENOVO-VOICE-2t6588161u3bcba"),a.setRequestHeader("secretkey","28A5E16C525F2442E9DAA64CB5208AA7")):(a.open("POST",u.a.proURL+"/website/cloudtts",!0),a.setRequestHeader("channel","cloudasr"),a.setRequestHeader("lenovokey","LENOVO-VOICE-25c705e83m8865da1l7ac6d"),a.setRequestHeader("secretkey","266AC5CAC135A2221A0D8D9CBC896F4F")),a.setRequestHeader("content-type","application/x-www-form-urlencoded"),a.responseType="arraybuffer",a.overrideMimeType("text/xml; charset = utf-8"),a.onload=function(){t.voiceStatus="el-icon-microphone";var e=new Blob([a.response]),r=new FileReader;r.readAsText(e,"utf-8"),r.onload=function(a){var i=r.result;if(i.length<200&&i.length>1)t.$message({message:i.split("error=")[1],type:"error",duration:1500});else if(0==i.length||""==i)t.$message({message:"请稍后重试！",type:"error",duration:1500});else{var s=new Audio;s.src=URL.createObjectURL(e),s.play()}}},a.onerror=function(){Swal.fire({text:$.i18n.prop("server_error"),confirmButtonText:$.i18n.prop("confirm"),confirmButtonColor:"#94cb82"})},a.send(r)},handleDel:function(e,t){var r=this,a={id:t.id};a.sign=Object(c.a)(a),this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._0)(a).then(function(e){200==e.data.code?(r.$message({message:"删除成功",type:"success",duration:1500}),r.getList()):r.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},closeFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var t=this,r={id:this.currentItem.id,regular:this.currentItem.regular,replaceResult:this.currentItem.replaceResult,isFlag:this.currentItem.isFlag};r.sign=Object(c.a)(r),this.$refs[e].validate(function(e){if(!e)return!1;t.editBtnLoading=!0,Object(o._180)(r).then(function(e){t.editBtnLoading=!1,200==e.data.code?(t.$message({message:"编辑成功",type:"success",duration:1500}),t.getList(),t.editVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.editBtnLoading=!1})})},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,r={regular:this.addList.regular,replaceResult:this.addList.replaceResult,isFlag:this.addList.isFlag};r.sign=Object(c.a)(r),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(o._180)(r).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})},handleDelRedis:function(){this.redisVisible=!0},handleRedis:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var r={regular:t.redisList.redisVal};r.sign=Object(c.a)(r),t.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o._1)(r).then(function(e){200==e.data.code?(t.$message({message:"删除成功",type:"success",duration:1500}),t.getList(),t.redisVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})})}).catch(function(e){console.log(e)})}})},querySearch:function(e,t){var r=this.restaurants;t(e?r.filter(this.createFilter(e)):r)},createFilter:function(e){return function(t){return-1!==t.value.toLowerCase().indexOf(e.toLowerCase())}},sortChange:function(e){this.column={prop:e.prop,order:e.order},this.getList()},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,regular:this.searchItem.regular,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],fieldName:this.column.prop,order:"ascending"==this.column.order?"0":""};t.sign=Object(c.a)(t),Object(o._183)(t).then(function(t){if(e.listLoading=!1,200==t.data.code){e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length,e.restaurants=[];var r=!0,a=!1,s=void 0;try{for(var n,l=i()(e.list);!(r=(n=l.next()).done);r=!0){var o=n.value;e.restaurants.push({value:o.regular})}}catch(e){a=!0,s=e}finally{try{!r&&l.return&&l.return()}finally{if(a)throw s}}}else e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})}}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table height-85"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),r("el-breadcrumb-item",{attrs:{to:{path:"/forum/list"}}},[e._v("说法配置")]),e._v(" "),r("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),r("el-form",{ref:"searchItem",staticClass:"demo-form-inline width130 height50",staticStyle:{"padding-left":"10px"},attrs:{inline:!0,model:e.searchItem,size:"mini"}},[r("div",{staticClass:"form-input height50"},[r("el-form-item",{attrs:{label:"说法",prop:"regular"}},[r("el-input",{attrs:{clearable:""},model:{value:e.searchItem.regular,callback:function(t){e.$set(e.searchItem,"regular","string"==typeof t?t.trim():t)},expression:"searchItem.regular"}})],1),e._v(" "),r("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[r("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),r("div",{staticClass:"form-btn"},[r("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:add",expression:"'ttsregular:add'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:delete",expression:"'ttsregular:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelRedis()}}},[e._v("删除redis缓存")])],1)]),e._v(" "),r("div",{staticClass:"table-box"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"},on:{"sort-change":e.sortChange}},[r("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),r("el-table-column",{attrs:{label:"匹配规则",prop:"regular",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.regular,placement:"top"}},[r("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.regular)+"\n                    ")])]),e._v(" "),e.showTitle?r("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.regular)+"\n                ")]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"替换后内容",prop:"replaceResult",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.replaceResult,placement:"top"}},[r("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.replaceResult)+"\n                    ")])]),e._v(" "),e.showTitle?r("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.replaceResult)+"\n                ")]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"是否生效",prop:"isFlag",align:"center",formatter:e.formState}}),e._v(" "),r("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:e.formTime2,width:"130",sortable:"custom"}}),e._v(" "),r("el-table-column",{attrs:{label:"更新时间",prop:"updateTime",align:"center",formatter:e.formTime,width:"130",sortable:"custom"}}),e._v(" "),e.isshow?r("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:add",expression:"'ttsregular:add'"}],attrs:{size:"mini"},on:{click:function(r){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has",value:"ttsregular:delete",expression:"'ttsregular:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1619173463)}):e._e()],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),r("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"编辑",visible:e.editVisible,width:"40%",top:"10vh","before-close":e.editHandleClose},on:{"update:visible":function(t){e.editVisible=t},close:function(t){return e.closeFun("currentItem")}}},[r("el-form",{ref:"currentItem",attrs:{"label-position":"right","label-width":"120px",size:"small",rules:e.editRules,model:e.currentItem}},[r("el-form-item",{attrs:{label:"例句",prop:"liju"}},[r("el-input",{staticClass:"tts-input",attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.liju,callback:function(t){e.$set(e.currentItem,"liju","string"==typeof t?t.trim():t)},expression:"currentItem.liju"}}),e._v(" "),r("span",{on:{click:function(t){return e.playVoice("adit")}}},[r("i",{class:e.voiceStatus,staticStyle:{"font-size":"18px",cursor:"pointer"}})])],1),e._v(" "),r("el-form-item",{attrs:{label:"匹配规则",prop:"regular"}},[r("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,"trigger-on-focus":!1,debounce:0},on:{select:e.handleSelect},model:{value:e.currentItem.regular,callback:function(t){e.$set(e.currentItem,"regular",t)},expression:"currentItem.regular"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"替换后内容",prop:"replaceResult"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.replaceResult,callback:function(t){e.$set(e.currentItem,"replaceResult","string"==typeof t?t.trim():t)},expression:"currentItem.replaceResult"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否生效",prop:"isFlag"}},[r("el-checkbox-group",{model:{value:e.currentItem.isFlag,callback:function(t){e.$set(e.currentItem,"isFlag",t)},expression:"currentItem.isFlag"}},[r("el-checkbox")],1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(t){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[r("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[r("el-form-item",{attrs:{label:"例句",prop:"liju"}},[r("el-input",{staticClass:"tts-input",attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.liju,callback:function(t){e.$set(e.addList,"liju","string"==typeof t?t.trim():t)},expression:"addList.liju"}}),e._v(" "),r("span",{on:{click:function(t){return e.playVoice("add")}}},[r("i",{class:e.voiceStatus,staticStyle:{"font-size":"18px",cursor:"pointer"}})])],1),e._v(" "),r("el-form-item",{attrs:{label:"匹配规则",prop:"regular"}},[r("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,"trigger-on-focus":!1,debounce:0},on:{select:e.handleSelect},model:{value:e.addList.regular,callback:function(t){e.$set(e.addList,"regular",t)},expression:"addList.regular"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"替换后内容",prop:"replaceResult"}},[r("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.replaceResult,callback:function(t){e.$set(e.addList,"replaceResult","string"==typeof t?t.trim():t)},expression:"addList.replaceResult"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否生效",prop:"isFlag"}},[r("el-checkbox-group",{model:{value:e.addList.isFlag,callback:function(t){e.$set(e.addList,"isFlag",t)},expression:"addList.isFlag"}},[r("el-checkbox")],1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"",visible:e.redisVisible,width:"40%",top:"35vh"},on:{"update:visible":function(t){e.redisVisible=t},open:function(t){return e.openFun("redisList")}}},[r("el-form",{ref:"redisList",attrs:{"label-position":"right","label-width":"70px",size:"small",rules:e.redisRules,model:e.redisList}},[r("el-form-item",{attrs:{label:"说法",prop:"redisVal"}},[r("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.redisList.redisVal,callback:function(t){e.$set(e.redisList,"redisVal",t)},expression:"redisList.redisVal"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.redisVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleRedis("redisList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var g=r("VU/8")(d,p,!1,function(e){r("tlrK")},"data-v-1bdcbeb6",null);t.default=g.exports},tlrK:function(e,t){}});