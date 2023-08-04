<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="日期" prop="startTime">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.startTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"
                    :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="table-box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
        </div>
    </div>
</template>

<script>
import {errChart} from '@/config/api'
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/chart/pie');
export default {
  data() {
    let vue = this
    return {
      pickerOptions: {
        disabledDate(time) {
              let times = Date.now();
              return time.getTime() > times;
          }
        },
        searchItem:{
            startTime:''
        },
        list: [],
        seaBtnLoading:false,
        loading:true,
        dataNull:false
    };
  },
  mounted() {
    this.getChartsData()
  },
  methods: {
    resetForm() {
      this.searchItem = {
        startTime:''
      }
      this.getChartsData()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.getChartsData()
      this.seaBtnLoading = false
    },
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let paramsList = {
          startStr:this.searchItem.startTime
        }
        paramsList.sign = deleteParams(paramsList)
        errChart(paramsList).then(res=>{
            let myChart = echarts.init(this.$refs.myChart)
            this.loading = false
            if(res.data.data.data == null || res.data.data.data.length == 0){
                myChart.setOption({
                    title : {
                        text: '暂无数据',//主标题
                        subtext:'',
                        x:'center',//x轴方向对齐方式
                        textStyle: {
                            color: '#606266',
                            fontweight:400,
                            fontSize: 14
                        }
                    },
                    tooltip : {},
                    series : [
                        {
                            name: '数据条数',
                            type: 'pie',
                            radius : '55%',
                            data:res.data.data.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }else{
                myChart.setOption({
                    title : {
                        text: '异常率统计',//主标题
                        subtext:this.formTime(res.data.data.date),
                        x:'center',//x轴方向对齐方式
                        y: 'top',
                        textStyle: {
                            color: '#606266',
                            fontWeight:'normal',
                            fontSize: 16
                        }
                    },
                    tooltip : {},
                    series : [
                        {
                            name: '数据条数',
                            type: 'pie',
                            radius : '55%',
                            data:res.data.data.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
            
        })
    },
    formTime(row) {
      var date = new Date(row);
      return (
        date.getFullYear() +
        "-" +
        checkTime(date.getMonth() + 1) +
        "-" +
        checkTime(date.getDate())
      );
    },
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
</style>
