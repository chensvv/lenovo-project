<template>
  <div class="table chart">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline no_width" size="mini">
      <el-form-item label="用户" prop="lenovoId">
            <el-select v-model.trim="searchItem.lenovoId" placeholder="--" clearable>
                <el-option v-for="(item,index) in userList" :key="index" :label="item.userName" :value="item.lenovoId"></el-option>
            </el-select>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
        <div ref="myChart" :style="{width: '700px', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
import {censusList, censusUserList} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {checkTime} from '@/utils/timer.js'
let echarts = require('echarts/lib/echarts')
export default {
  data() {
    return {
      list: [],
      searchItem:{//搜索数据组
        lenovoId:"",
      },
      userList:[],
      seaBtnLoading:false,
      fileBtnLoading:false
    };
  },
  created() {
    this.getUserList();
  },
  mounted() {
    this.getChartsData()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getUserList()
      this.getChartsData()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.getChartsData()
      this.seaBtnLoading = false
    },
    getUserList() {
        censusUserList().then(res=>{
            this.userList = res.data.data
        })
    },
    getChartsData(){
        // console.log(this.searchItem.lenovoId)
        let userParams = {
          lenovoid:this.searchItem.lenovoId
        }
        userParams.sign = deleteParams(userParams)
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart)
        censusList(userParams).then(res=>{
            const visit = res.data.data.visits
            const timeArr = res.data.data.data
            myChart.setOption({
              title: { 
                  text: '用户访问量统计',
                  left:'center'
              },
              tooltip: {},
              xAxis: {
                  data: timeArr.reverse(),
                  axisLabel:{
                      rotate:40
                  }
              },
              yAxis: {
                minInterval : 1
              },
              series: [{
                  name: '访问量',
                  type: 'bar',
                  data: visit.reverse(),
                  color:"#409eff",
                  barWidth : 60,
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
</style>
