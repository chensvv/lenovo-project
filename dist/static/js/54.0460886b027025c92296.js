webpackJsonp([54],{"3ty0":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("2hMI"),r=(a("pWbq"),a("Icdr")),n={data:function(){return{pickerOptions:{disabledDate:function(t){var e=Date.now();return t.getTime()>e}},searchItem:{startTime:"",endTime:""},list:[],pickerVal:[],seaBtnLoading:!1,loading:!0}},mounted:function(){this.getChartsData()},methods:{resetForm:function(t){this.$refs[t].resetFields(),this.getChartsData()},onSubmit:function(){this.seaBtnLoading=!0,this.getChartsData(),this.seaBtnLoading=!1},dateChangebirthday:function(t){this.searchItem.startTime=t[0],this.searchItem.endTime=t[1]},getChartsData:function(){var t=this,e={startStr:this.searchItem.startTime,endStr:this.searchItem.endTime},a=r.init(this.$refs.myChart);Object(i._14)(e).then(function(e){t.loading=!1,a.setOption({title:{text:"联想大脑统计",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{data:e.data.data.data,axisLabel:{rotate:20}},grid:{show:!1,left:"20%",right:"10%",borderColor:"#c45455",bottom:"20%"},yAxis:{minInterval:1},series:[{name:"数据条数",type:"bar",data:e.data.data.visit,color:"#409eff",barMaxWidth:45,itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"black",fontSize:16}}}}}],dataZoom:[{id:"dataZoomX",type:"slider",show:!0,start:0,end:80,handleSize:8}]})})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,i){return a("el-breadcrumb-item",{key:i},[t._v(t._s(e))])})],2),t._v(" "),a("el-form",{ref:"searchItem",staticClass:"demo-form-inline search_box",attrs:{inline:!0,model:t.searchItem,size:"mini"}},[a("el-date-picker",{attrs:{type:"daterange",align:"right",size:"mini","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd"},on:{change:t.dateChangebirthday},model:{value:t.pickerVal,callback:function(e){t.pickerVal=e},expression:"pickerVal"}}),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:t.seaBtnLoading},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{on:{click:function(e){return t.resetForm("searchItem")}}},[t._v("重置")])],1)],1),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-box"},[a("div",{ref:"myChart",style:{width:"100%",height:"100%",margin:"20px auto 0"}})])],1)},staticRenderFns:[]};var o=a("VU/8")(n,s,!1,function(t){a("T2s4")},"data-v-05968d36",null);e.default=o.exports},T2s4:function(t,e){}});