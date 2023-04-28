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
import {clientChart} from '@/config/api'
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
            pickerVal:[]
        },
        pickerVal:[],
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
    resetForm(searchItem) {
      this.$refs[searchItem].resetFields();
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
          endStr:this.searchItem.endTime,
        }
        paramsList.sign = deleteParams(paramsList)
        clientChart(paramsList).then(res=>{
            console.log(res)
            let myChart = echarts.init(this.$refs.myChart)
            this.loading = false
            if(res.data == null || res.data.length == 0){
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
                            data:res.data,
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
                        text: '客户端日志统计',//主标题
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
                            data:res.data,
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
