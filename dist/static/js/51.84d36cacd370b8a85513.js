webpackJsonp([51],{U6sc:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("2hMI"),n=a("krqS"),r=(a("pWbq"),a("Icdr")),s={data:function(){var t=this;return{pickerOptions:{disabledDate:function(e){var a=Date.now(),i=t.timeOptionRange;return i?e.getTime()>i.getTime()+(Date.now()-i.getTime()<6048e5?Date.now()-i.getTime():6048e5)||e.getTime()<i.getTime()-6048e5:e.getTime()>a},onPick:function(e){e.minDate&&!e.maxDate&&(t.timeOptionRange=e.minDate),e.maxDate&&(t.timeOptionRange=null)}},searchItem:{startTime:"",endTime:""},list:[],pickerVal:[],seaBtnLoading:!1,loading:!0}},mounted:function(){this.getChartsData()},methods:{resetForm:function(){this.searchItem={startTime:"",endTime:""},this.pickerVal=[],this.getChartsData()},onSubmit:function(){this.seaBtnLoading=!0,this.getChartsData(),this.seaBtnLoading=!1},dateChangebirthday:function(t){this.searchItem.startTime=t[0],this.searchItem.endTime=t[1]},computedPosition:function(t,e){return e>=24?this.end=t<=24?50:100-Math.floor(50/t*100):100},getChartsData:function(){var t=this,e={startStr:this.searchItem.startTime,endStr:this.searchItem.endTime};e.sign=Object(n.a)(e);var a=r.init(this.$refs.myChart);Object(i.f)(e).then(function(e){t.loading=!1;var i=e.data.data.visit.length;a.setOption({title:{text:"时间响应统计",left:"center"},tooltip:{trigger:"item",formatter:"{b}:00 <br/>{a} : {c}ms"},xAxis:{type:"category",data:e.data.data.data,axisLabel:{rotate:20,formatter:"{value}:00"}},grid:{x:"5%",y:"10%",x2:"5%",y2:"15%",borderWidth:1},yAxis:{minInterval:1,type:"value",axisLabel:{formatter:"{value} ms"}},series:[{name:"平均时间",type:"line",data:e.data.data.visit+"ms",color:"#409eff",barMaxWidth:60,itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"black",fontSize:16}}}}}],dataZoom:[{type:"slider",show:!0,handleSize:2,height:"15px",start:0,end:t.computedPosition(1,i)}]})})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/asr/log/client"}}},[t._v("日志管理")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("span",{staticClass:"label-time"},[t._v("选择日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},on:{change:t.dateChangebirthday},model:{value:t.pickerVal,callback:function(e){t.pickerVal=e},expression:"pickerVal"}})],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm()}}},[t._v("重置")])],1)]),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-box",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("div",{ref:"myChart",style:{width:"100%",height:"100%"}})])],1)},staticRenderFns:[]};var l=a("VU/8")(s,o,!1,function(t){a("yAtT")},"data-v-4c951db0",null);e.default=l.exports},yAtT:function(t,e){}});