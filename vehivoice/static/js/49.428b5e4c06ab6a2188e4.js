webpackJsonp([49],{Mh1s:function(e,t){},lBPo:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("gRE1"),a=s.n(n),i=s("pWbq"),o=s("krqS"),l=s("7oYi"),r=s("2hMI"),d={data:function(){return{getpageNum:l.a,list:[],perList:[],dialogList:[],intentList:[],sels:[],selsAll:[],genList:[],saveGenParams:[],searchItem:{type:""},GenSeaItem:{sentence:""},subNerList:[{id:0,value:"不切割"},{id:1,value:"切割"}],typeList:[{id:1,value:"分类数据"},{id:2,value:"ner数据"},{id:3,value:"全部"}],dialogListTotalClass:"8",totalClass:"8",addList:{intent:"",type:"",tag:"",wordNum:"",subNer:"",desc:""},addRules:{intent:[{required:!0,message:"请选择intent",trigger:"change"}],type:[{required:!0,message:"请选择类型",trigger:"change"}],tag:[{required:!0,message:"请输入标签",trigger:"change"}],wordNum:[{required:!0,message:"请输入词元数",trigger:"change"}],subNer:[{required:!0,message:"请选择是否切割",trigger:"change"}],desc:[{required:!0,message:"请输入描述",trigger:"change"}]},currentPage:1,pageSize:10,totalCount:0,dialogListCurrentPage:1,dialogListPageSize:5,dialogListTotalCount:0,showTitle:!0,seaBtnLoading:!1,seaGenLoading:!1,addBtnLoading:!1,listLoading:!1,dialogListLoading:!1,downloading:!1,addVisible:!1,innerVisible:!1,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(a()(t).join())}),this.getList(),this.getIntentList()},mounted:function(){-1==this.perList.indexOf("stenGen:download")&&-1==this.perList.indexOf("stenGen:delete")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,s=t.clientWidth,n=t.scrollWidth;this.showTitle=!(s<n)},formTime:function(e,t){var s=e.createTime,n=new Date(s);return n.getFullYear()+"-"+Object(i.a)(n.getMonth()+1)+"-"+Object(i.a)(n.getDate())+" "+Object(i.a)(n.getHours())+":"+Object(i.a)(n.getMinutes())},resetGen:function(e){this.$refs[e].resetFields(),this.dialogListCurrentPage=1,this.seaGenLoading()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},onSearch:function(){this.seaGenLoading=!0,this.dialogListCurrentPage=1,this.getIntentChangeList(),this.seaGenLoading=!1},addHandleConfirm:function(e){var t=this;0==this.sels.length?this.sels=this.$refs.dialogTable.selection:this.sels.concat(this.$refs.dialogTable.selection),this.$refs[e].validate(function(e){if(!e)return!1;if(0==t.sels.length&&0==t.saveGenParams.length)t.$message({message:"请选择句式数据",type:"error",duration:2e3});else{if(t.addBtnLoading=!0,0==t.saveGenParams.length){var s={type:t.addList.type,intent:t.addList.intent,sentenceId:t.sels.map(function(e){return e.id})+"",tag:t.addList.tag,subNer:t.addList.subNer,wordNum:t.addList.wordNum,desc:t.addList.desc};t.saveGenParams.push(s)}Object(r._112)(t.saveGenParams).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"已生成分类",type:"success",duration:2e3}),t.addVisible=!1,t.sels=[],t.dialogList=[],t.saveGenParams,t.dialogListTotalCount=0,t.$refs.dialogTable.clearSelection(),t.getList()):t.$message({message:e.data.msg,type:"error",duration:2e3})}).catch(function(e){t.addBtnLoading=!1})}})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.getList()},dialogListHandleSizeChange:function(e){this.dialogListPageSize=e,this.dialogListCurrentPage=1,this.getIntentChangeList()},dialogListHandleCurrentChange:function(e){this.dialogListCurrentPage=e,this.getIntentChangeList()},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},typeChange:function(e){1==e?(this.addRules.subNer[0].required=!1,this.addRules.desc[0].required=!1,this.addRules.tag[0].required=!0):2==e?(this.addRules.tag[0].required=!1,this.addRules.subNer[0].required=!0,this.addRules.desc[0].required=!0):(this.addRules.subNer[0].required=!0,this.addRules.desc[0].required=!0,this.addRules.tag[0].required=!0)},saveId:function(e){var t=this;0==this.sels.length?this.sels=this.$refs.dialogTable.selection:this.sels.concat(this.$refs.dialogTable.selection),this.$refs[e].validate(function(e){if(!e)return!1;if(0==t.sels.length)t.$message({message:"请选择句式数据",type:"error",duration:2e3});else{var s={type:t.addList.type,intent:t.addList.intent,sentenceId:t.sels.map(function(e){return e.id})+"",tag:t.addList.tag,subNer:t.addList.subNer,wordNum:t.addList.wordNum,desc:t.addList.desc},n={type:t.addList.type,intent:t.addList.intent,sentenceId:t.sels.map(function(e){return e.id})+"",sentenceTxt:t.sels.map(function(e){return e.sentence})+",",tag:t.addList.tag,subNer:t.addList.subNer,wordNum:t.addList.wordNum,desc:t.addList.desc};t.saveGenParams.push(s),t.genList.push(n),t.sels=[],t.$refs.dialogTable.clearSelection(),t.$message({message:"已保存",type:"success",duration:2e3})}})},getRowKeys:function(e){return e.id},getIntentList:function(){var e=this;Object(r._110)({}).then(function(t){200==t.data.code&&(e.intentList=t.data.data)})},handleAdd:function(){this.addVisible=!0},addHandleClose:function(){this.addVisible=!1,this.sels=[],this.dialogList=[],this.dialogListTotalCount=0,this.$refs.dialogTable.clearSelection()},intentChange:function(){this.dialogListCurrentPage=1,this.getIntentChangeList()},getIntentChangeList:function(){var e=this;this.dialogListLoading=!0;var t={pgstr:this.dialogListCurrentPage,pcstr:this.dialogListPageSize,type:this.addList.intent,sentence:this.GenSeaItem.sentence};t.sign=Object(o.a)(t),Object(r._109)(t).then(function(t){e.dialogListLoading=!1,200==t.data.code?(e.dialogList=t.data.data,e.dialogListTotalCount=t.data.count,e.dialogListTotalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.dialogListLoading=!1})},handleDel:function(e,t){var s=this,n={id:t.id,sign:this.$md5("id="+t.id)};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r._212)(n).then(function(e){200==e.data.code?(s.$message({message:"删除成功",type:"success",duration:2e3}),s.getList()):void 0!=e.data.code&&s.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})})}).catch(function(e){console.log(e)})},handleDown:function(e,t){var s=this,n={id:t.id,sign:this.$md5("id="+t.id)};Object(r._213)(n).then(function(e){s.downloading=!1;var n=new Blob([e.data]),a=document.createElement("a"),i=window.URL.createObjectURL(n);a.href=i,a.download=t.intent+"-"+(new Date).toLocaleString().replace(/[:/\s]/g,"")+".zip",a.click(),window.URL.revokeObjectURL(i)})},saveData:function(){this.innerVisible=!0},turnToPage:function(e){if(-1==(e=parseInt(e)))this.getList(e);else{if(this.currentPage=e,!e||e<1)return console.log("页码输入有误！"),!1;this.getList(e)}},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,intent:this.searchItem.type};t.sign=Object(o.a)(t),Object(r._113)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):void 0!=t.data.code&&e.$message({message:t.data.code+"："+t.data.msg,type:"error",duration:2e3})}).catch(function(){e.listLoading=!1})}}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table height-105"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",{attrs:{to:{path:"/nlu/word/list"}}},[e._v("nlu数据管理")]),e._v(" "),s("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),s("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[s("div",{staticClass:"form-input height70"},[s("el-form-item",{attrs:{label:"intent",prop:"type"}},[s("el-select",{attrs:{placeholder:"--"},model:{value:e.searchItem.type,callback:function(t){e.$set(e.searchItem,"type",t)},expression:"searchItem.type"}},e._l(e.intentList,function(e,t){return s("el-option",{key:t,attrs:{label:e,value:e}})}),1)],1)],1),e._v(" "),s("div",{staticClass:"form-btn"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaBtnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"stenGen:generator",expression:"'stenGen:generator'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("生成数据")])],1)]),e._v(" "),s("div",{staticClass:"table-box"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[s("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),s("el-table-column",{attrs:{label:"intent",prop:"intents",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.intents,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.intents)+"\n                    ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.intents)+"\n                ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"是否切割",prop:"subNer",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:1==t.row.subNer?"是":"否",placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(1==t.row.subNer?"是":"否")+"\n                    ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(1==t.row.subNer?"是":"否")+"\n                ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"分类标签",prop:"tag",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.tag,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.tag)+"\n                    ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.tag)+"\n                ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"词元数",prop:"wordNum",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.wordNum,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.wordNum)+"\n                    ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.wordNum)+"\n                ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"数据类型",prop:"type",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:1==t.row.type?"分类数据":2==t.row.type?"ner数据":"全部数据",placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(1==t.row.type?"分类数据":2==t.row.type?"ner数据":"全部数据")+"\n                    ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(1==t.row.type?"分类数据":2==t.row.type?"ner数据":"全部数据")+"\n                ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"备注",prop:"desc",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.desc,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.desc)+"\n                    ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.desc)+"\n                ")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"创建时间",prop:"createTime",align:"center",formatter:e.formTime,"min-width":"130"}}),e._v(" "),e.isshow?s("el-table-column",{attrs:{label:"操作","min-width":"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{directives:[{name:"has",rawName:"v-has",value:"stenGen:download",expression:"'stenGen:download'"}],attrs:{size:"mini",loading:e.downloading},on:{click:function(s){return e.handleDown(t.$index,t.row)}}},[e._v("下载")]),e._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has",value:"stenGen:delete",expression:"'stenGen:delete'"}],attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,1586193452)}):e._e()],1),e._v(" "),s("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),s("el-dialog",{attrs:{"custom-class":"gendialog","close-on-click-modal":!1,"close-on-press-escape":!1,title:"生成分类",visible:e.addVisible,width:"70%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[s("div",{staticClass:"main-box"},[s("el-form",{ref:"addList",staticClass:"demo-form-inline create-form",attrs:{model:e.addList,"label-width":"90px",size:"mini",rules:e.addRules}},[s("el-form-item",{staticClass:"intent-form",attrs:{label:"intent",prop:"intent"}},[s("el-select",{attrs:{placeholder:"--"},on:{change:e.intentChange},model:{value:e.addList.intent,callback:function(t){e.$set(e.addList,"intent",t)},expression:"addList.intent"}},e._l(e.intentList,function(e,t){return s("el-option",{key:t,attrs:{label:e,value:e}})}),1),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.saveId("addList")}}},[e._v("保存")])],1),e._v(" "),s("el-form-item",{attrs:{label:"type",prop:"type"}},[s("el-select",{attrs:{placeholder:"--"},on:{change:e.typeChange},model:{value:e.addList.type,callback:function(t){e.$set(e.addList,"type",t)},expression:"addList.type"}},e._l(e.typeList,function(e,t){return s("el-option",{key:t,attrs:{label:e.value,value:e.id}})}),1)],1),e._v(" "),s("el-form-item",{attrs:{label:"分类标签",prop:"tag"}},[s("el-input",{attrs:{clearable:""},model:{value:e.addList.tag,callback:function(t){e.$set(e.addList,"tag","string"==typeof t?t.trim():t)},expression:"addList.tag"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"词元数",prop:"wordNum"}},[s("el-input",{attrs:{clearable:""},model:{value:e.addList.wordNum,callback:function(t){e.$set(e.addList,"wordNum","string"==typeof t?t.trim():t)},expression:"addList.wordNum"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"是否切割",prop:"subNer"}},[s("el-select",{attrs:{placeholder:"--"},model:{value:e.addList.subNer,callback:function(t){e.$set(e.addList,"subNer",t)},expression:"addList.subNer"}},e._l(e.subNerList,function(e,t){return s("el-option",{key:t,attrs:{label:e.value,value:e.id}})}),1)],1),e._v(" "),s("el-form-item",{attrs:{label:"描述",prop:"desc"}},[s("el-input",{attrs:{clearable:""},model:{value:e.addList.desc,callback:function(t){e.$set(e.addList,"desc","string"==typeof t?t.trim():t)},expression:"addList.desc"}})],1)],1),e._v(" "),s("div",{staticClass:"table-box"},[s("el-form",{ref:"GenSeaItem",staticClass:"display-flex height70 demo-form-inline",attrs:{inline:!0,model:e.GenSeaItem,"label-width":"50px",size:"mini"}},[s("div",{staticClass:"form-input"},[s("el-form-item",{attrs:{label:"句式",prop:"sentence"}},[s("el-input",{attrs:{clearable:""},model:{value:e.GenSeaItem.sentence,callback:function(t){e.$set(e.GenSeaItem,"sentence","string"==typeof t?t.trim():t)},expression:"GenSeaItem.sentence"}})],1)],1),e._v(" "),s("div",{staticClass:"form-btn"},[s("el-button",{attrs:{size:"mini",type:"primary",loading:e.seaGenLoading},on:{click:e.onSearch}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetGen("GenSeaItem")}}},[e._v("重置")])],1)]),e._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogListLoading,expression:"dialogListLoading"}],ref:"dialogTable",class:this.dialogListTotalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.dialogList,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","row-key":e.getRowKeys},on:{"select-all":e.selectAll,"selection-change":e.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"50",align:"center","reserve-selection":!0}}),e._v(" "),s("el-table-column",{attrs:{label:"句式",prop:"sentence",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sentence,placement:"top"}},[s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                              "+e._s(t.row.sentence)+"\n                              ")])]),e._v(" "),e.showTitle?s("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                              "+e._s(t.row.sentence)+"\n                          ")]):e._e()]}}])})],1),e._v(" "),s("div",{staticClass:"pagination-wrap"},[s("ul",{staticClass:"pagination"},[s("li",[s("button",{attrs:{disabled:1==e.currentPage},on:{click:function(t){return e.turnToPage(1)}}},[s("i",{staticClass:"el-icon-d-arrow-left"})])]),e._v(" "),e.currentPage==e.getpageNum(e.totalCount)&&1!=e.currentPage&&e.currentPage-2>0?s("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-2)},on:{click:function(t){return e.turnToPage(e.currentPage-2)}}}):e._e(),e._v(" "),e.currentPage-1>0?s("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage-1)},on:{click:function(t){return e.turnToPage(e.currentPage-1)}}}):e._e(),e._v(" "),s("li",{staticClass:"active",domProps:{textContent:e._s(e.currentPage)},on:{click:function(t){return e.turnToPage(e.currentPage)}}}),e._v(" "),e.currentPage!=e.getpageNum(e.totalCount)&&0!=e.getpageNum(e.totalCount)?s("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+1)},on:{click:function(t){return e.turnToPage(e.currentPage+1)}}}):e._e(),e._v(" "),e.currentPage+1<3&&e.currentPage!=e.getpageNum(e.totalCount)&&e.getpageNum(e.totalCount)>=3?s("li",{staticClass:"unum",domProps:{textContent:e._s(e.currentPage+2)},on:{click:function(t){return e.turnToPage(e.currentPage+2)}}}):e._e(),e._v(" "),s("li",[s("button",{attrs:{disabled:e.currentPage==e.getpageNum(e.totalCount)||0==e.getpageNum(e.totalCount)},on:{click:function(t){e.turnToPage(e.getpageNum(e.totalCount))}}},[s("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1)],1),e._v(" "),s("el-dialog",{attrs:{width:"45%",title:"保存的数据",visible:e.innerVisible,"append-to-body":""},on:{"update:visible":function(t){e.innerVisible=t}}},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.genList}},[s("el-table-column",{attrs:{prop:"intent",label:"intent",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"type",label:"type",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(1==t.row.type?"分类数据":2==t.row.type?"ner数据":"全部数据"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"tag",label:"分类标签",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"sentenceTxt",label:"句式","show-overflow-tooltip":!0,align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"subNer",label:"是否切割",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(1==t.row.subNer?"是":"否"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"wordNum",label:"词元数",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"desc",label:"描述","show-overflow-tooltip":!0,align:"center"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.saveData}},[e._v("已保存数据")]),e._v(" "),s("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("生成数据")])],1)],1)],1)},staticRenderFns:[]};var u=s("VU/8")(d,c,!1,function(e){s("Mh1s")},"data-v-60a0e17c",null);t.default=u.exports}});