webpackJsonp([68],{Ypn2:function(t,e){},"e+cG":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("2hMI"),n=(a("pWbq"),a("Icdr")),r={data:function(){var t=this;return{pickerOptions:{disabledDate:function(e){var a=Date.now(),i=t.timeOptionRange;return i?e.getTime()>i.getTime()+5184e5||e.getTime()<i.getTime()-5184e5:e.getTime()>a},onPick:function(e){e.minDate&&!e.maxDate&&(t.timeOptionRange=e.minDate),e.maxDate&&(t.timeOptionRange=null)},shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5);var a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5);var a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}}]},searchItem:{startTime:"",endTime:"",channelVal:""},list:[],pickerVal:[],seaBtnLoading:!1,channelList:[],loading:!0}},mounted:function(){this.getChartsData(),this.getChannelList()},methods:{resetForm:function(){this.searchItem={startTime:"",endTime:"",channelVal:""},this.pickerVal=[],this.getChartsData()},onSubmit:function(){this.seaBtnLoading=!0,this.getChartsData(),this.seaBtnLoading=!1},dateChangebirthday:function(t){this.searchItem.startTime=t[0],this.searchItem.endTime=t[1]},computedPosition:function(t,e){return e>=10?this.end=t<=10?50:100-Math.floor(50/t*100):100},getChartsData:function(){var t=this,e={startStr:this.searchItem.startTime,endStr:this.searchItem.endTime,channel:this.searchItem.channelVal},a=n.init(this.$refs.myChart),r=[],s=[];Object(i.y)(e).then(function(e){t.loading=!1;var i=e.data;for(var n in i)r.push(i[n].time),s.push(i[n].pCount);r.length;a.setOption({title:{text:"事件统计",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:""}},xAxis:{data:r,axisLabel:{rotate:20}},grid:{x:"5%",y:"10%",x2:"5%",y2:"15%",borderWidth:1},yAxis:{minInterval:1},series:[{name:"数据条数",type:"bar",data:s,color:"#409eff",barMaxWidth:60,itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"black",fontSize:16}}}}}]})})},getChannelList:function(){var t=this;Object(i.x)().then(function(e){t.channelList=e.data.data})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table height-85"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/avater/list"}}},[t._v("avatar")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(this.$route.meta.title))])],1),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline height50 width130",attrs:{inline:!0,model:t.searchItem,"label-width":"90px",size:"mini"}},[a("div",{staticClass:"form-input height50"},[a("el-form-item",{attrs:{label:"渠道"}},[a("el-select",{attrs:{placeholder:"请选择",size:"mini"},model:{value:t.searchItem.channelVal,callback:function(e){t.$set(t.searchItem,"channelVal",e)},expression:"searchItem.channelVal"}},t._l(t.channelList,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}),1)],1),t._v(" "),a("span",{staticClass:"label-time"},[t._v("选择日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},on:{change:t.dateChangebirthday},model:{value:t.pickerVal,callback:function(e){t.pickerVal=e},expression:"pickerVal"}})],1),t._v(" "),a("div",{staticClass:"form-btn"},[a("el-button",{attrs:{size:"mini",type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.resetForm()}}},[t._v("重置")])],1)]),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-box"},[a("div",{ref:"myChart",style:{width:"100%",height:"100%"}})])],1)},staticRenderFns:[]};var l=a("VU/8")(r,s,!1,function(t){a("Ypn2")},"data-v-25a6a2a1",null);e.default=l.exports}});