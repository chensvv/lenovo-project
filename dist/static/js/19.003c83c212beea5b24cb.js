webpackJsonp([19],{Jcxy:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("gRE1"),o=t.n(a),i=(t("pWbq"),t("2hMI")),s={data:function(){return{list:[],perList:[],currentItem:{id:"",programName:"",programAliasName:"",programDisplayType:"",programRelaseType:"",programContentType:"",programReleaseAge:"",programContentLanguage:"",programDirector:"",programMainStar:"",programActors:"",programIntroduce:"",programScore:"",programChildNumber:"",programUrl:"",programLevel:"",programSource:"",programPoster:""},sourceList:[],addList:{programName:"",programAliasName:"",programDisplayType:"",programRelaseType:"",programContentType:"",programReleaseAge:"",programContentLanguage:"",programDirector:"",programMainStar:"",programActors:"",programIntroduce:"",programScore:"",programChildNumber:"",programUrl:"",programLevel:"",programSource:"",programPoster:""},searchItem:{name:""},addRules:{programName:[{required:!0,message:"请输入电影名称",trigger:"change"}],programAliasName:[{required:!0,message:"请输入电影别名（如无别名，请输入电影名称）",trigger:"change"}],programDisplayType:[{required:!0,message:"请输入节目类型",trigger:"change"}],programRelaseType:[{required:!0,message:"请输入上映类型",trigger:"change"}],programContentType:[{required:!0,message:"请输入内容类型",trigger:"change"}],programReleaseAge:[{required:!0,message:"请输入上映年代",trigger:"change"}],programContentLanguage:[{required:!0,message:"请输入语言",trigger:"change"}],programDirector:[{required:!0,message:"请输入导演",trigger:"change"}],programMainStar:[{required:!0,message:"请输入主演",trigger:"change"}],programActors:[{required:!0,message:"请输入演员",trigger:"change"}],programIntroduce:[{required:!0,message:"请输入简介",trigger:"change"}],programScore:[{required:!0,message:"请输入电影评分",trigger:"change"}],programChildNumber:[{required:!0,message:"请输入电影集数",trigger:"change"}],programUrl:[{required:!0,message:"请输入链接",trigger:"change"}],programLevel:[{required:!0,message:"请输入级别",trigger:"change"}],programSource:[{required:!0,message:"请选择来源",trigger:"change"}],programPoster:[{required:!0,message:"请输入海报链接",trigger:"change"}]},editRules:{programName:[{required:!0,message:"请输入电影名称",trigger:"change"}],programAliasName:[{required:!0,message:"请输入电影别名（如无别名，请输入电影名称）",trigger:"change"}],programDisplayType:[{required:!0,message:"请输入节目类型",trigger:"change"}],programRelaseType:[{required:!0,message:"请输入上映类型",trigger:"change"}],programContentType:[{required:!0,message:"请输入内容类型",trigger:"change"}],programReleaseAge:[{required:!0,message:"请输入上映年代",trigger:"change"}],programContentLanguage:[{required:!0,message:"请输入语言",trigger:"change"}],programDirector:[{required:!0,message:"请输入导演",trigger:"change"}],programMainStar:[{required:!0,message:"请输入主演",trigger:"change"}],programActors:[{required:!0,message:"请输入演员",trigger:"change"}],programIntroduce:[{required:!0,message:"请输入简介",trigger:"change"}],programScore:[{required:!0,message:"请输入电影评分",trigger:"change"}],programChildNumber:[{required:!0,message:"请输入电影集数",trigger:"change"}],programUrl:[{required:!0,message:"请输入链接",trigger:"change"}],programLevel:[{required:!0,message:"请输入级别",trigger:"change"}],programSource:[{required:!0,message:"请选择来源",trigger:"change"}],programPoster:[{required:!0,message:"请输入海报链接",trigger:"change"}]},editVisible:!1,addVisible:!1,currentPage:1,pageSize:10,pageSizes:[10,20,30],totalCount:1,seaBtnLoading:!1,addBtnLoading:!1,editBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(r){e.perList.push(o()(r).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("skill:videoupdate")&&-1==this.perList.indexOf("skill:videodelete")&&(this.isshow=!1)},methods:{resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleEdit:function(e,r){var t=this;this.editVisible=!0,Object(i._103)().then(function(e){t.sourceList=e.data}),this.currentItem={id:r.id,programName:r.programName,programAliasName:r.programAliasName,programDisplayType:r.programDisplayType,programRelaseType:r.programReleaseType,programContentType:r.programContentType,programReleaseAge:r.programReleaseAge,programContentLanguage:r.programContentLanguage,programDirector:r.programDirector,programMainStar:r.programMainStar,programActors:r.programActors,programIntroduce:r.programIntroduce,programScore:r.programScore,programChildNumber:r.programChildNumber,programUrl:r.programUrl,programLevel:r.programLevel,programSource:r.programSource,programPoster:r.programPoster}},handleDel:function(e,r){var t=this,a={id:r.id};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i._101)(a).then(function(e){200==e.data.code?(t.$message({message:"删除成功",type:"success",duration:1e3}),t.getList()):t.$message({message:e.data.errorMessage,type:"error",duration:1e3})})}).catch(function(e){})},openFun:function(e){var r=this;this.$nextTick(function(){r.$refs[e]&&r.$refs[e].resetFields()})},closeFun:function(e){var r=this;this.$nextTick(function(){r.$refs[e]&&r.$refs[e].clearValidate()})},editHandleClose:function(){this.editVisible=!1},addHandleClose:function(){this.addVisible=!1},editHandleConfirm:function(e){var r=this,t={programName:this.currentItem.programName,programAliasName:this.currentItem.programAliasName,programType:this.currentItem.programType,programRelaseType:this.currentItem.programRelaseType,programContenType:this.currentItem.programContenType,programReleaseAge:this.currentItem.programReleaseAge,programContentLanguage:this.currentItem.programContentLanguage,programDirector:this.currentItem.programDirector,programNameMainStar:this.currentItem.programNameMainStar,programActors:this.currentItem.programActors,programScore:this.currentItem.programScore,programChildNumber:this.currentItem.programChildNumber,programUrl:this.currentItem.programUrl,programLevel:this.currentItem.programLevel,programSource:this.currentItem.programSource,programPoster:this.currentItem.programPoster,id:this.currentItem.id};this.$refs[e].validate(function(e){if(!e)return!1;r.editBtnLoading=!0,Object(i._104)(t).then(function(e){r.editBtnLoading=!1,200==e.data.code?(r.$message({message:"编辑成功",type:"success",duration:1e3}),r.getList(),r.editVisible=!1):r.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){r.editBtnLoading=!1})})},handleAdd:function(){var e=this;this.addVisible=!0,Object(i._103)().then(function(r){e.sourceList=r.data})},addHandleConfirm:function(e){var r=this,t={programName:this.addList.programName,programAliasName:this.addList.programAliasName,programDisplayType:this.addList.programDisplayType,programRelaseType:this.addList.programRelaseType,programContentType:this.addList.programContentType,programReleaseAge:this.addList.programReleaseAge,programContentLanguage:this.addList.programContentLanguage,programDirector:this.addList.programDirector,programMainStar:this.addList.programMainStar,programActors:this.addList.programActors,programIntroduce:this.addList.programIntroduce,programScore:this.addList.programScore,programChildNumber:this.addList.programChildNumber,programUrl:this.addList.programUrl,programLevel:this.addList.programLevel,programSource:this.addList.programSource,programPoster:this.addList.programPoster};this.$refs[e].validate(function(e){if(!e)return!1;r.addBtnLoading=!0,Object(i._100)(t).then(function(e){r.addBtnLoading=!1,200==e.data.code?(r.$message({message:"添加成功",type:"success",duration:1e3}),r.getList(),r.addVisible=!1):r.$message({message:e.data.errorMessage,type:"error",duration:1e3})}).catch(function(e){r.addBtnLoading=!1})})},getList:function(){var e=this;this.listLoading=!0;var r={name:this.searchItem.name,pgstr:this.currentPage,pcstr:this.pageSize};Object(i._102)(r).then(function(r){e.listLoading=!1,e.list=r.data.data,e.totalCount=r.data.count})}}},n={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"table"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),t("el-breadcrumb-item",[e._v("技能管理")]),e._v(" "),e._l(e.$route.meta,function(r,a){return t("el-breadcrumb-item",{key:a},[e._v(e._s(r))])})],2),e._v(" "),t("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:e.searchItem,size:"mini"}},[t("el-form-item",{attrs:{label:"名称",prop:"name"}},[t("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(r){e.$set(e.searchItem,"name","string"==typeof r?r.trim():r)},expression:"searchItem.name"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),t("el-button",{on:{click:function(r){return e.resetForm("searchItem")}}},[e._v("重置")])],1),e._v(" "),t("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:videoadd",expression:"'skill:videoadd'"}],staticClass:"success",attrs:{size:"mini"},on:{click:function(r){return e.handleAdd()}}},[e._v("添加")])],1),e._v(" "),t("div",{staticClass:"table-box"},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list}},[t("el-table-column",{attrs:{type:"index",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{label:"名称",prop:"programName",align:"center","show-overflow-tooltip":!0}}),e._v(" "),t("el-table-column",{attrs:{label:"类型",prop:"programDisplayType",align:"center","show-overflow-tooltip":!0}}),e._v(" "),t("el-table-column",{attrs:{label:"导演",prop:"programDirector",align:"center","show-overflow-tooltip":!0}}),e._v(" "),t("el-table-column",{attrs:{label:"集数",prop:"programChildNumber",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{label:"链接",prop:"programUrl",align:"center","show-overflow-tooltip":!0}}),e._v(" "),t("el-table-column",{attrs:{label:"来源",prop:"programDisplaySource",align:"center"}}),e._v(" "),e.isshow?t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:videoupdate",expression:"'skill:videoupdate'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleEdit(r.$index,r.row)}}},[e._v("编辑")]),e._v(" "),t("el-button",{directives:[{name:"has",rawName:"v-has",value:"skill:videodelete",expression:"'skill:videodelete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDel(r.$index,r.row)}}},[e._v("删除")])]}}],null,!1,1452005623)}):e._e()],1),e._v(" "),t("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(r){e.currentPage=r},"update:current-page":function(r){e.currentPage=r}}})],1),e._v(" "),t("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"300","before-close":e.editHandleClose},on:{"update:visible":function(r){e.editVisible=r},close:function(r){return e.closeFun("currentItem")}}},[t("el-form",{ref:"currentItem",attrs:{"label-position":"left","label-width":"120px",rules:e.editRules,model:e.currentItem}},[t("el-form-item",{attrs:{label:"名称",prop:"programName"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programName,callback:function(r){e.$set(e.currentItem,"programName","string"==typeof r?r.trim():r)},expression:"currentItem.programName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"别名",prop:"programAliasName"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programAliasName,callback:function(r){e.$set(e.currentItem,"programAliasName","string"==typeof r?r.trim():r)},expression:"currentItem.programAliasName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"节目类型",prop:"programDisplayType"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programDisplayType,callback:function(r){e.$set(e.currentItem,"programDisplayType","string"==typeof r?r.trim():r)},expression:"currentItem.programDisplayType"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"上映类型",prop:"programRelaseType"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programRelaseType,callback:function(r){e.$set(e.currentItem,"programRelaseType","string"==typeof r?r.trim():r)},expression:"currentItem.programRelaseType"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"内容类型",prop:"programContentType"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programContentType,callback:function(r){e.$set(e.currentItem,"programContentType","string"==typeof r?r.trim():r)},expression:"currentItem.programContentType"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"上映年代",prop:"programReleaseAge"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programReleaseAge,callback:function(r){e.$set(e.currentItem,"programReleaseAge","string"==typeof r?r.trim():r)},expression:"currentItem.programReleaseAge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"语音",prop:"programContentLanguage"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programContentLanguage,callback:function(r){e.$set(e.currentItem,"programContentLanguage","string"==typeof r?r.trim():r)},expression:"currentItem.programContentLanguage"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"导演",prop:"programDirector"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programDirector,callback:function(r){e.$set(e.currentItem,"programDirector","string"==typeof r?r.trim():r)},expression:"currentItem.programDirector"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"主演",prop:"programMainStar"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programMainStar,callback:function(r){e.$set(e.currentItem,"programMainStar","string"==typeof r?r.trim():r)},expression:"currentItem.programMainStar"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"演员",prop:"programActors"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programActors,callback:function(r){e.$set(e.currentItem,"programActors","string"==typeof r?r.trim():r)},expression:"currentItem.programActors"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"简介",prop:"programIntroduce"}},[t("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.currentItem.programIntroduce,callback:function(r){e.$set(e.currentItem,"programIntroduce","string"==typeof r?r.trim():r)},expression:"currentItem.programIntroduce"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"网站评分",prop:"programScore"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programScore,callback:function(r){e.$set(e.currentItem,"programScore","string"==typeof r?r.trim():r)},expression:"currentItem.programScore"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"集数",prop:"programChildNumber"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programChildNumber,callback:function(r){e.$set(e.currentItem,"programChildNumber","string"==typeof r?r.trim():r)},expression:"currentItem.programChildNumber"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"链接",prop:"programUrl"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programUrl,callback:function(r){e.$set(e.currentItem,"programUrl","string"==typeof r?r.trim():r)},expression:"currentItem.programUrl"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"级别",prop:"programLevel"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programLevel,callback:function(r){e.$set(e.currentItem,"programLevel","string"==typeof r?r.trim():r)},expression:"currentItem.programLevel"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"来源网站",prop:"programSource"}},[t("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.currentItem.programSource,callback:function(r){e.$set(e.currentItem,"programSource",r)},expression:"currentItem.programSource"}},e._l(e.sourceList,function(e,r){return t("el-option",{key:r,attrs:{label:e.appName,value:e.id}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"海报链接",prop:"programPoster"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.currentItem.programPoster,callback:function(r){e.$set(e.currentItem,"programPoster","string"==typeof r?r.trim():r)},expression:"currentItem.programPoster"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.editHandleClose}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary",loading:e.editBtnLoading},on:{click:function(r){return e.editHandleConfirm("currentItem")}}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"新增",visible:e.addVisible,width:"300","before-close":e.addHandleClose},on:{"update:visible":function(r){e.addVisible=r},open:function(r){return e.openFun("addList")}}},[t("el-form",{ref:"addList",attrs:{"label-position":"left","label-width":"120px",rules:e.addRules,model:e.addList}},[t("el-form-item",{attrs:{label:"名称",prop:"programName"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programName,callback:function(r){e.$set(e.addList,"programName","string"==typeof r?r.trim():r)},expression:"addList.programName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"别名",prop:"programAliasName"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programAliasName,callback:function(r){e.$set(e.addList,"programAliasName","string"==typeof r?r.trim():r)},expression:"addList.programAliasName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"节目类型",prop:"programDisplayType"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programDisplayType,callback:function(r){e.$set(e.addList,"programDisplayType","string"==typeof r?r.trim():r)},expression:"addList.programDisplayType"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"上映类型",prop:"programRelaseType"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programRelaseType,callback:function(r){e.$set(e.addList,"programRelaseType","string"==typeof r?r.trim():r)},expression:"addList.programRelaseType"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"内容类型",prop:"programContentType"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programContentType,callback:function(r){e.$set(e.addList,"programContentType","string"==typeof r?r.trim():r)},expression:"addList.programContentType"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"上映年代",prop:"programReleaseAge"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programReleaseAge,callback:function(r){e.$set(e.addList,"programReleaseAge","string"==typeof r?r.trim():r)},expression:"addList.programReleaseAge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"语言",prop:"programContentLanguage"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programContentLanguage,callback:function(r){e.$set(e.addList,"programContentLanguage","string"==typeof r?r.trim():r)},expression:"addList.programContentLanguage"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"导演",prop:"programDirector"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programDirector,callback:function(r){e.$set(e.addList,"programDirector","string"==typeof r?r.trim():r)},expression:"addList.programDirector"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"主演",prop:"programMainStar"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programMainStar,callback:function(r){e.$set(e.addList,"programMainStar","string"==typeof r?r.trim():r)},expression:"addList.programMainStar"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"演员",prop:"programActors"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programActors,callback:function(r){e.$set(e.addList,"programActors","string"==typeof r?r.trim():r)},expression:"addList.programActors"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"简介",prop:"programIntroduce"}},[t("el-input",{attrs:{type:"textarea","auto-complete":"off"},model:{value:e.addList.programIntroduce,callback:function(r){e.$set(e.addList,"programIntroduce","string"==typeof r?r.trim():r)},expression:"addList.programIntroduce"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"网站评分",prop:"programScore"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programScore,callback:function(r){e.$set(e.addList,"programScore","string"==typeof r?r.trim():r)},expression:"addList.programScore"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"集数",prop:"programChildNumber"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programChildNumber,callback:function(r){e.$set(e.addList,"programChildNumber","string"==typeof r?r.trim():r)},expression:"addList.programChildNumber"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"链接",prop:"programUrl"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programUrl,callback:function(r){e.$set(e.addList,"programUrl","string"==typeof r?r.trim():r)},expression:"addList.programUrl"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"级别",prop:"programLevel"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programLevel,callback:function(r){e.$set(e.addList,"programLevel","string"==typeof r?r.trim():r)},expression:"addList.programLevel"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"来源网站",prop:"programSource"}},[t("el-select",{attrs:{placeholder:"--",clearable:""},model:{value:e.addList.programSource,callback:function(r){e.$set(e.addList,"programSource",r)},expression:"addList.programSource"}},e._l(e.sourceList,function(e,r){return t("el-option",{key:r,attrs:{label:e.appName,value:e.id}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"海报链接",prop:"programPoster"}},[t("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.programPoster,callback:function(r){e.$set(e.addList,"programPoster","string"==typeof r?r.trim():r)},expression:"addList.programPoster"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(r){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=t("VU/8")(s,n,!1,function(e){t("PVVk")},"data-v-be172c6c",null);r.default=m.exports},PVVk:function(e,r){}});