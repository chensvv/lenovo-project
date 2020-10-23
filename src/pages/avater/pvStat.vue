<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>avater</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
          <el-form-item label="渠道">
            <el-select v-model="searchItem.channelVal" placeholder="请选择" size="mini">
              <el-option
                v-for="item in channelList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <span class="label-time">选择日期</span>
            <el-date-picker
              v-model="pickerVal"
              type="daterange"
              align="right"
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              @change="dateChangebirthday">
            </el-date-picker>
          <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
              <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="table-box" v-loading="loading">
            <div ref="myChart" :style="{width: '100%', height: '100%', margin:'20px auto 0'}"></div>
        </div>
    </div>
</template>

<script>
import {avaterList,avaterChannel} from '@/config/api'
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
              let secondNum = 60 * 60 * 24 * 6 * 1000;
              if (timeOptionRange) {
                return time.getTime() > timeOptionRange.getTime() + secondNum || time.getTime() < timeOptionRange.getTime() - secondNum;
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
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        searchItem:{
            startTime:'',
            endTime:'',
            channelVal:'',
        },
        list: [],
        pickerVal:[],
        seaBtnLoading:false,
        channelList:[],
        loading:true
    };
  },
  mounted() {
    this.getChartsData()
    this.getChannelList()
  },
  methods: {
    resetForm() {
      this.searchItem = {
        startTime:'',
        endTime:'',
        channelVal:''
      }
      this.pickerVal = []
      this.getChartsData()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.getChartsData()
      this.seaBtnLoading = false
    },
    dateChangebirthday(val) {
        this.searchItem.startTime = val[0]
        this.searchItem.endTime = val[1]
    },
    computedPosition(length,xArraylength) {
        if(xArraylength>=10){
            return length <= 10 ? this.end = 50 : this.end = (100 -   Math.floor(50 / length * 100));
        }else{
            return 100;//小于十条数据显示全部
        }
    },
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let paramsList = {
          startStr:this.searchItem.startTime,
          endStr:this.searchItem.endTime,
          channel:this.searchItem.channelVal
        }
        let myChart = echarts.init(this.$refs.myChart)
        let Xdata = []
        let Ydata = []
        avaterList(paramsList).then(res=>{
            this.loading = false
            let obj = res.data
              for(let key in obj){
                Xdata.push(obj[key].time)
                Ydata.push(obj[key].pCount)
            }
            var xArraylength = Xdata.length
            myChart.setOption({
              title: { 
                  text: '事件统计',
                  left:'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: ''        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              xAxis: {
                  data: Xdata,
                  axisLabel:{
                      rotate:20
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
                minInterval : 1
              },
              series: [{
                  name: '数据条数',
                  type: 'bar',
                  data: Ydata,
                  color:"#409eff",
                  barMaxWidth: 60, // 最大宽度
                  itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 16
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
    },
    getChannelList(){
      avaterChannel().then(res=>{
        this.channelList = res.data.data
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
.table-box {
    width: 100%;
    height: 90%;
}
.label-time{
    color: #606266;
    font-size: 12px;
    padding: 0 2px 0 0;
}
</style>
