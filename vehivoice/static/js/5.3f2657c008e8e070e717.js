webpackJsonp([5],{WBHA:function(t,e,a){var n;n=function(){return function(t){function e(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var a={};return e.m=t,e.c=a,e.i=function(t){return t},e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,a){var n=a(4)(a(1),a(5),null,null);t.exports=n.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,a,n){return a*(1-Math.pow(2,-10*t/n))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var e=(t+="").split("."),a=e[0],n=e.length>1?this.decimal+e[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;i.test(a);)a=a.replace(i,"$1"+this.separator+"$2");return this.prefix+a+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){return t&&t.__esModule?t:{default:t}}(a(0));e.default=n.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",n.default)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=0,i="webkit moz ms o".split(" "),r=void 0,o=void 0;if("undefined"==typeof window)e.requestAnimationFrame=r=function(){},e.cancelAnimationFrame=o=function(){};else{e.requestAnimationFrame=r=window.requestAnimationFrame,e.cancelAnimationFrame=o=window.cancelAnimationFrame;for(var s=void 0,l=0;l<i.length&&(!r||!o);l++)s=i[l],e.requestAnimationFrame=r=r||window[s+"RequestAnimationFrame"],e.cancelAnimationFrame=o=o||window[s+"CancelAnimationFrame"]||window[s+"CancelRequestAnimationFrame"];r&&o||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),a=Math.max(0,16-(e-n)),i=window.setTimeout(function(){t(e+a)},a);return n=e+a,i},e.cancelAnimationFrame=o=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=r,e.cancelAnimationFrame=o},function(t,e){t.exports=function(t,e,a,n){var i,r=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(i=t,r=t.default);var s="function"==typeof r?r.options:r;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),a&&(s._scopeId=a),n){var l=Object.create(s.computed||null);Object.keys(n).forEach(function(t){var e=n[t];l[t]=function(){return e}}),s.computed=l}return{esModule:i,exports:r,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},t.exports=n()},aV5e:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("gRE1"),i=a.n(n),r=(a("pWbq"),a("2hMI")),o=a("krqS"),s=a("WBHA"),l=a.n(s),u=a("FT/c"),c=a("7oYi"),d={components:{countTo:l.a},data:function(){return{getpageNum:c.a,list:[],perList:[],totalClass:"8",searchItem:{dtp:"",uip:"",app:"",desc:""},columns:[],options:{stripe:!1,loading:!1,highlightCurrentRow:!1,mutiSelect:!1,border:!1},operates:{width:120,show:!1,list:[]},currentPage:1,pageSize:10,totalCount:1,showTitle:!0,seaBtnLoading:!1,listLoading:!1,isshow:!0,startVal:0,endVal:0}},created:function(){var t=this;JSON.parse(sessionStorage.getItem("btnpermission")).map(function(e){t.perList.push(i()(e).join())}),this.getList()},mounted:function(){-1==this.perList.indexOf("asr:log:download")&&(this.isshow=!1)},methods:{onShowNameTipsMouseenter:function(t){var e=t.target,a=e.clientWidth,n=e.scrollWidth;this.showTitle=!(a<n)},resetForm:function(t){this.$refs[t].resetFields(),this.currentPage=1,this.getList()},onSubmit:function(){this.seaBtnLoading=!0,this.currentPage=1,this.getList(),this.seaBtnLoading=!1},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleInfo:function(t,e){var a=u.a.proURL+"/lasf-mgr/asr/log/download?id="+e.id;window.open(a)},turnToPage:function(t){if(-1==(t=parseInt(t)))this.getList(t);else{if(this.currentPage=t,!t||t<1)return console.log("页码输入有误！"),!1;this.getList(t)}},getList:function(){var t=this;this.listLoading=!0;var e={pgstr:this.currentPage,pcstr:this.pageSize,dtp:this.searchItem.dtp,uip:this.searchItem.uip,app:this.searchItem.app,desc:this.searchItem.desc};e.sign=Object(o.a)(e),Object(r._161)(e).then(function(e){t.listLoading=!1,200==e.data.code?(t.list=e.data.data.data,t.totalCount=e.data.data.total,t.endVal=e.data.count,t.totalClass=e.data.data.data.length):void 0!=e.data.code&&t.$message({message:e.data.code+"："+e.data.msg,type:"error",duration:2e3})}).catch(function(){t.listLoading=!1})}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-105"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height70 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"},nativeOn:{submit:function(t){t.preventDefault()}}},[a("div",{staticClass:"form-input height70"},[a("el-form-item",{attrs:{label:"客户端设备类型",prop:"dtp"}},[a("el-input",{attrs:{clearable:""},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSubmit.apply(null,arguments)}},model:{value:t.searchItem.dtp,callback:function(e){t.$set(t.searchItem,"dtp","string"==typeof e?e.trim():e)},expression:"searchItem.dtp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"客户端IP",prop:"uip"}},[a("el-input",{attrs:{clearable:""},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSubmit.apply(null,arguments)}},model:{value:t.searchItem.uip,callback:function(e){t.$set(t.searchItem,"uip","string"==typeof e?e.trim():e)},expression:"searchItem.uip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开发者ID",prop:"app"}},[a("el-input",{attrs:{clearable:""},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSubmit.apply(null,arguments)}},model:{value:t.searchItem.app,callback:function(e){t.$set(t.searchItem,"app","string"==typeof e?e.trim():e)},expression:"searchItem.app"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"识别文本",prop:"desc"}},[a("el-input",{attrs:{clearable:""},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSubmit.apply(null,arguments)}},model:{value:t.searchItem.desc,callback:function(e){t.$set(t.searchItem,"desc","string"==typeof e?e.trim():e)},expression:"searchItem.desc"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")])],1)],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)]),t._v(" "),a("div",{staticClass:"table-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],class:this.totalClass<="5"?"limitWidth":"",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{type:"index",align:"center",label:"#"}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端设备类型",prop:"dtp",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"版本",prop:"ver",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端ip",prop:"uip",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"客户端设备ID",prop:"did",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"开发者ID",prop:"dev",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"应用ID",prop:"zhi",align:"left","show-overflow-tooltip":!0}}),t._v(" "),a("el-table-column",{attrs:{label:"设备文本",prop:"tai",align:"left","show-overflow-tooltip":!0}}),t._v(" "),t.isshow?a("el-table-column",{attrs:{label:"音频文件",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{directives:[{name:"has",rawName:"v-has",value:"asr:log:download",expression:"'asr:log:download'"}],staticClass:"cur-info",attrs:{slot:""},on:{click:function(a){return t.handleInfo(e.$index,e.row)}},slot:"default"},[a("i",{staticClass:"el-icon-folder-opened icon"})])]}}],null,!1,186505666)}):t._e()],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("ul",{staticClass:"pagination"},[a("li",[a("button",{attrs:{disabled:1==t.currentPage},on:{click:function(e){return t.turnToPage(1)}}},[a("i",{staticClass:"el-icon-d-arrow-left"})])]),t._v(" "),t.currentPage==t.getpageNum(t.totalCount)&&1!=t.currentPage&&t.currentPage-2>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-2)},on:{click:function(e){return t.turnToPage(t.currentPage-2)}}}):t._e(),t._v(" "),t.currentPage-1>0?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage-1)},on:{click:function(e){return t.turnToPage(t.currentPage-1)}}}):t._e(),t._v(" "),a("li",{staticClass:"active",domProps:{textContent:t._s(t.currentPage)},on:{click:function(e){return t.turnToPage(t.currentPage)}}}),t._v(" "),t.currentPage!=t.getpageNum(t.totalCount)&&0!=t.getpageNum(t.totalCount)?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+1)},on:{click:function(e){return t.turnToPage(t.currentPage+1)}}}):t._e(),t._v(" "),t.currentPage+1<3&&t.currentPage!=t.getpageNum(t.totalCount)&&t.getpageNum(t.totalCount)>=3?a("li",{staticClass:"unum",domProps:{textContent:t._s(t.currentPage+2)},on:{click:function(e){return t.turnToPage(t.currentPage+2)}}}):t._e(),t._v(" "),a("li",[a("button",{attrs:{disabled:t.currentPage==t.getpageNum(t.totalCount)||0==t.getpageNum(t.totalCount)},on:{click:function(e){t.turnToPage(t.getpageNum(t.totalCount))}}},[a("i",{staticClass:"el-icon-d-arrow-right"})])])])])],1)],1)},staticRenderFns:[]};var m=a("VU/8")(d,p,!1,function(t){a("du0R")},"data-v-758986f5",null);e.default=m.exports},du0R:function(t,e){}});