<template>
  <div class="table chart">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/servlog/list'}">业务报表</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
  </div>
</template>

<script>
import {servlogList} from '@/config/api'
import {checkTime} from '@/utils/timer.js'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    return {
      list: [],
      seaBtnLoading:false,
      fileBtnLoading:false,
      loading:true
    };
  },
  mounted() {
    this.getChartsData()
  },
  methods: {
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    //   this.currentPage = 1
    //   this.getUserList()
    //   this.getChartsData()
    // },
    // onSubmit(){
    //   this.seaBtnLoading = true
    //   this.getChartsData()
    //   this.seaBtnLoading = false
    // },
    computedPosition(length,xArraylength) {
        if(xArraylength>=10){
            return length <= 10 ? this.end = 50 : this.end = (100 -   Math.floor(50 / length * 100));
        }else{
            return 100;//小于十条数据显示全部
        }
    },
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart)
        const Ydata = []
        const Xdata = []
        servlogList().then(res=>{
            this.loading=false
            var obj = res.data
            for(let key in obj){
                Xdata.push(key)
                Ydata.push(obj[key])
            }
            var xArraylength = Xdata.length
            myChart.setOption({
              title: { 
                  text: 'NL领域统计',
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
                      rotate:40
                  }
              },
              yAxis: {
                minInterval : 1
              },
              grid:{
                 x:'5%', //左上角x轴距盒子边框的距离
                 y:'10%', //左上角Y轴距盒子边框的距离
                  x2:'5%',//右下角x轴距盒子边框的距离
                 y2:'15%',//右下角Y轴距盒子边框的距离
                 borderWidth:1
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
    }
  }
};
</script>

<style scoped>
.table{
    width: 100%;
    height: 100%;
}
.chart .table-box{
    width: 90%;
    height: 80% !important;
    margin: 0 auto;
}
</style>
