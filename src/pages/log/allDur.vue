<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
          <div class="form-input height50">
            <el-form-item label="日期" prop="pickerVal" class="date-form">
                <el-date-picker
                    v-model="searchItem.pickerVal"
                    type="daterange"
                    align="center"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                    :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-btn">
              <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
              <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
          </div>
        </el-form>
        <div class="table-box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
        </div>
    </div>
</template>

<script>
import {allDurList} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {checkTime} from '@/utils/timer.js'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    let vue = this
    return {
        pickerOptions: {
          disabledDate(time) {
              let times = Date.now();
              let timeOptionRange = vue.timeOptionRange;
              let secondNum = 3600 * 1000 * 24 * 7;
              if (timeOptionRange) {
                return time.getTime() > timeOptionRange.getTime() + (Date.now() - timeOptionRange.getTime() < secondNum ? Date.now() - timeOptionRange.getTime() : secondNum) || time.getTime() < timeOptionRange.getTime() - secondNum;
              }else{
                return time.getTime() > times;
              }
              // return time.getTime() > Date.now();
          },
          onPick(time) {
              //当第一时间选中才设置禁用
              if (time.minDate && !time.maxDate) {
                  vue.timeOptionRange = time.minDate;
              }
              if (time.maxDate) {
                  vue.timeOptionRange = null;
              }
          }
        },
        searchItem:{
            pickerVal:[]
        },
        list: [],
        pickerVal:[],
        seaBtnLoading:false,
        loading:true
    };
  },
  mounted() {
    this.getChartsData()
  },
  methods: {
    resetForm(searchItem) {
      this.$refs[searchItem].resetFields();
      this.getChartsData()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.getChartsData()
      this.seaBtnLoading = false
    },
    computedPosition(length,xArraylength) {
      if(xArraylength>=24){
        return length <= 24 ? this.end = 50 : this.end = (100 - Math.floor(50 / length * 100));
      }else{
        return 100;//小于24条数据显示全部
      }
    },
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let paramsList = {
          startStr:this.searchItem.pickerVal[0],
          endStr:this.searchItem.pickerVal[1]
        }
        paramsList.sign = deleteParams(paramsList)
        let myChart = echarts.init(this.$refs.myChart)
        allDurList(paramsList).then(res=>{
            this.loading = false
            var xArraylength = res.data.data.visit.length
            myChart.setOption({
              title: { 
                  text: '时间响应统计',
                  left:'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{b}:00 <br/>{a} : {c}ms"
              },
              xAxis: {
                type:'category',
                  data: res.data.data.data,
                  axisLabel:{
                      rotate:20,
                      formatter:'{value}:00'
                  }
              },
              grid:{
                x:'5%', //左上角x轴距盒子边框的距离
                y:'10%', //左上角Y轴距盒子边框的距离
                x2:'5%',//右下角x轴距盒子边框的距离
                y2:'15%',//右下角Y轴距盒子边框的距离
                borderWidth:1
              },
              yAxis: {
                minInterval : 1,
                type: 'value',
                axisLabel:{
                  formatter: "{value} ms",
                }
              },
              series: [{
                  name: '平均时间',
                  type: 'line',
                  data: res.data.data.visit,
                  color:"#409eff",
                  barMaxWidth: 60, // 最大宽度
                  itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 16,
                                 formatter: "{value} ms",

                            }
                        }
                    }
                  }
              }],
              dataZoom: [
                  {
                    type: 'slider',
                    show: true,
                    handleSize: 2,
                    height: '15px',
                    start:0 ,
                    end: this.computedPosition(1,xArraylength)
                  }
                ]
            })
        })
    }
  }
};
</script>

<style scoped>
.table {
    width: 100%;
    height: 100%;
}
.chart .table-box {
    width: 90%;
    height: 80% !important;
    margin: 0 auto;
}
.label-time{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    width: 90px;
    margin-left: 10px;
}
</style>
