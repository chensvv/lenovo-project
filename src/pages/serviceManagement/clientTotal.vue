<template>
    <div class="table chart">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>avatar</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline" size="mini">
          <el-form-item>
              <el-button size="mini" @click="server1()">10.0.42.104下线</el-button>
              <el-button size="mini" @click="server2()">10.0.42.208下线</el-button>
              <el-button size="mini" @click="refresh()" v-if="refsh">定时刷新</el-button>
              <el-button size="mini" @click="refreshNo()" v-else>关闭刷新</el-button>
          </el-form-item>
        </el-form>
        <div class="table-box" v-loading="loading">
            <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
        </div>
    </div>
</template>

<script>
import {clientTotal,engineOffline} from '@/config/api'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    let vue = this
    return {
        loading:true,
        refsh:true,
        intervalId:null,
    };
  },
  mounted() {
    this.getChartsData()
  },
  methods: {

    refresh(){
        this.refsh = !this.refsh
        if (this.intervalId != null) {
        return;
    }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        // console.log("刷新" + new Date());
        this.getChartsData(); //加载数据函数
      }, 10000);
    },
    refreshNo(){
        this.refsh = !this.refsh
        this.clear()
    },
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    server1(){
        let params = {
            serverAddr:'server1'
        }
        engineOffline(params).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'下线成功！',
                    type:"success",
                    duration:1000
                });
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
        })
    },
    server2(){
        let params = {
            serverAddr:'server2'
        }
        engineOffline(params).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'下线成功！',
                    type:"success",
                    duration:1000
                });
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            }
        })
    },
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart)
        let Xdata = []
        let Ydata = []
        clientTotal().then(res=>{
            this.loading = false
            let obj = res.data.data
              for(let key in obj){
                Xdata.push(obj[key].name)
                Ydata.push(obj[key].value)
            }
            // let xArraylength = Xdata.length
            myChart.setOption({
              title: { 
                  text: '',
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
                //   axisLabel:{
                //       rotate:20
                //   }
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
              // dataZoom: [
              //       {
              //           type: 'slider',
              //           show: true,
              //           handleSize: 2,
              //           height: '15px',
              //           start:0 ,
              //           end: this.computedPosition(1,xArraylength)
              //       }
              //   ]
            })
        })
    },
  },
  destroyed() {
        this.clear();
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
    color: #606266;
    font-size: 12px;
    padding: 0 2px 0 0;
}
</style>
