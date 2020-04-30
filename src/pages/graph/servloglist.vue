<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline no_width" size="mini">
      <el-form-item label="用户" prop="lenovoId">
            <el-select v-model.trim="searchItem.lenovoId" placeholder="--" clearable>
                <el-option v-for="(item,index) in userList" :key="index" :label="item.userName" :value="item.lenovoId"></el-option>
            </el-select>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <div class="table-box">
        <div ref="myChart" :style="{width: '100%', height: '100%', margin:'30px auto 0'}"></div>
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
      fileBtnLoading:false
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
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart)
        const Ydata = []
        const Xdata = []
        servlogList().then(res=>{
            var obj = res.data
            for(let key in obj){
                Xdata.push(key)
                Ydata.push(obj[key])
            }
            console.log(Ydata)
            console.log(Xdata)
            myChart.setOption({
              title: { 
                  text: 'NL领域统计',
                  left:'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
              dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 80,
                    handleSize: 8
                  }]
            
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
.table-box{
    width: 100%;
    height: 90%;
}
</style>
