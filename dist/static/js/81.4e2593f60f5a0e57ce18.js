webpackJsonp([81],{kkQr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("gRE1"),s=a.n(n),i=a("pWbq"),o=a("krqS"),r=a("2hMI"),l={data:function(){return{pickerOptions:{disabledDate:function(e){var t=Date.now()-864e5;return e.getTime()>t}},searchItem:{name:"",type:"",cn:"",pickerVal:[]},addList:{name:"",alias:""},list:[],perList:[],totalClass:"8",addRules:{name:[{required:!0,message:"请输入应用名",trigger:"change"}],alias:[{required:!0,message:"请输入别名",trigger:"change"}]},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,btnLoading:!1,addVisible:!1,addBtnLoading:!1,listLoading:!0,isshow:!0}},created:function(){var e=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(t){e.perList.push(s()(t).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("app:cachedel")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(e){var t=e.target,a=t.clientWidth,n=t.scrollWidth;this.showTitle=!(a<n)},getList:function(){var e=this;this.listLoading=!0;var t={pgstr:this.currentPage,pcstr:this.pageSize,startStr:this.searchItem.pickerVal[0],endStr:this.searchItem.pickerVal[1],name:this.searchItem.name,type:this.searchItem.type,cn:this.searchItem.cn};t.sign=Object(o.a)(t),Object(r.D)(t).then(function(t){e.listLoading=!1,200==t.data.code?(e.list=t.data.data,e.totalCount=t.data.count,e.totalClass=t.data.data.length):e.$message({message:t.data.errorMessage,type:"error",duration:1500})}).catch(function(){e.listLoading=!1})},formTime:function(e,t){var a=e.upTime,n=new Date(a);return n.getFullYear()+"-"+Object(i.a)(n.getMonth()+1)+"-"+Object(i.a)(n.getDate())+" "+Object(i.a)(n.getHours())+":"+Object(i.a)(n.getMinutes())},indexVal:function(e,t){return 1==e.isIndex?"是":"否"},aliasVal:function(e,t){return 1==e.isAlias?"是":"否"},resetForm:function(e){this.$refs[e].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.btnLoading=!0,this.currentPage=1,this.listLoading=!0,this.getList(),this.btnLoading=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.listLoading=!0,this.getList()},handleCurrentChange:function(e){this.currentPage=e,this.listLoading=!0,this.getList()},handleDel:function(e,t){var a=this,n={name:t.name,sign:this.$md5("name="+t.name)};this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r.C)(n).then(function(e){200==e.data.code?(a.$message({message:"删除成功",type:"success",duration:1500}),a.getList()):a.$message.error("错误")})}).catch(function(e){console.log(e)})},openFun:function(e){var t=this;this.$nextTick(function(){t.$refs[e]&&t.$refs[e].resetFields()})},addHandleClose:function(){this.addVisible=!1},handleAdd:function(){this.addVisible=!0},addHandleConfirm:function(e){var t=this,a={name:this.addList.name,alias:this.addList.alias};a.sign=Object(o.a)(a),this.$refs[e].validate(function(e){if(!e)return!1;t.addBtnLoading=!0,Object(r.B)(a).then(function(e){t.addBtnLoading=!1,200==e.data.code?(t.$message({message:"添加成功",type:"success",duration:1500}),t.getList(),t.addVisible=!1):t.$message({message:e.data.errorMessage,type:"error",duration:1500})}).catch(function(e){t.addBtnLoading=!1})})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/app/list"}}},[e._v("应用搜索")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(this.$route.meta.title))])],1),e._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:e.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"名字",prop:"name"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.name,callback:function(t){e.$set(e.searchItem,"name","string"==typeof t?t.trim():t)},expression:"searchItem.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型",prop:"type"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.type,callback:function(t){e.$set(e.searchItem,"type","string"==typeof t?t.trim():t)},expression:"searchItem.type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类别",prop:"cn"}},[a("el-input",{attrs:{clearable:""},model:{value:e.searchItem.cn,callback:function(t){e.$set(e.searchItem,"cn","string"==typeof t?t.trim():t)},expression:"searchItem.cn"}})],1),e._v(" "),a("el-form-item",{staticClass:"date-form",attrs:{label:"日期",prop:"pickerVal"}},[a("el-date-picker",{attrs:{type:"daterange",align:"center",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd","default-value":new Date((new Date).setMonth((new Date).getMonth()-1))},model:{value:e.searchItem.pickerVal,callback:function(t){e.$set(e.searchItem,"pickerVal",t)},expression:"searchItem.pickerVal"}})],1)],1),e._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:e.btnLoading},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.resetForm("searchItem")}}},[e._v("重置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"app:cacheadd",expression:"'app:cacheadd'"}],attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")])],1)]),e._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:this.totalClass<="7"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{label:"名称",prop:"name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.name,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.name)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"拼音",prop:"pinyin",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.pinyin,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.pinyin)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.pinyin)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"类型",prop:"atype",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.atype,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.atype)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.atype)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"类别",prop:"cname",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.cname,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.cname)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.cname)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"是否别名",prop:"isAlias",align:"center",formatter:e.aliasVal}}),e._v(" "),a("el-table-column",{attrs:{label:"原名",prop:"sname",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTitle?e._e():a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.sname,placement:"top"}},[a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.sname)+"\n                    ")])]),e._v(" "),e.showTitle?a("div",{staticClass:"toEllipsis",on:{mouseover:e.onShowNameTipsMouseenter}},[e._v("\n                    "+e._s(t.row.sname)+"\n                ")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"是否索引",prop:"isIndex",align:"center",formatter:e.indexVal}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",prop:"upTime",align:"center",formatter:e.formTime,width:"130"}}),e._v(" "),e.isshow?a("el-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"app:cachedel",expression:"'app:cachedel'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,148931759)}):e._e()],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:"新增",visible:e.addVisible,width:"40%",top:"10vh","before-close":e.addHandleClose},on:{"update:visible":function(t){e.addVisible=t},open:function(t){return e.openFun("addList")}}},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",size:"small",rules:e.addRules,model:e.addList}},[a("el-form-item",{attrs:{label:"应用名",prop:"name"}},[a("el-input",{attrs:{type:"text","auto-complete":"off"},model:{value:e.addList.name,callback:function(t){e.$set(e.addList,"name","string"==typeof t?t.trim():t)},expression:"addList.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"别名",prop:"alias"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"别名对应的原始名 — 只对别名有效"},model:{value:e.addList.alias,callback:function(t){e.$set(e.addList,"alias","string"==typeof t?t.trim():t)},expression:"addList.alias"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addHandleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.addBtnLoading},on:{click:function(t){return e.addHandleConfirm("addList")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(l,c,!1,function(e){a("ng5j")},"data-v-14531ed6",null);t.default=d.exports},ng5j:function(e,t){}});