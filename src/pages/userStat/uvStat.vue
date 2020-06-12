<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
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
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="table-box" v-loading="loading">
            <div ref="myChart" :style="{width: '100%', height: '100%', margin:'20px auto 0'}"></div>
        </div>
    </div>
</template>

<script>
import {avaterList} from '@/config/api'
import {checkTime} from '@/utils/timer.js'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    let vue = this
    return {
      pickerOptions: {
        disabledDate(time) {
              let times = Date.now() - 24 * 60 * 60 * 1000;
              let timeOptionRange = vue.timeOptionRange;
              let secondNum = 60 * 60 * 24 * 6 * 1000;
              if (timeOptionRange) {
                return time.getTime() > timeOptionRange.getTime() + secondNum || time.getTime() < timeOptionRange.getTime() - secondNum;
              }else{
                return time.getTime() > times;
              }
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
            endTime:''
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let paramsList = {
          startStr:this.searchItem.startTime,
          endStr:this.searchItem.endTime
        }
        let myChart = echarts.init(this.$refs.myChart)
        avaterList(paramsList).then(res=>{
            this.loading = false
            myChart.setOption({
              title: { 
                  text: '用户统计',
                  left:'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              xAxis: {
                  data: res.data.data.data,
                  axisLabel:{
                      rotate:20
                  }
              },
              grid:{
                show:false,//是否显示直角坐标系网格。[ default: false ]
                left:"20%",//grid 组件离容器左侧的距离。
                right:"10%",
                bottom:"20%"
              },
              yAxis: {
                minInterval : 1
              },
              series: [{
                  name: '数据条数',
                  type: 'bar',
                  data: res.data.data.uv,
                  color:"#409eff",
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
              }]
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
.table-box {
    width: 100%;
    height: 90%;
}
</style>
