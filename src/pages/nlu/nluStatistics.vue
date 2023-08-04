<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini"  @submit.native.prevent>
          <div class="form-input height70">
            <el-form-item label="数据类型" prop="type">
                <el-select v-model.trim="searchItem.type" ref="typeValue" placeholder="每天统计数" @change="typeChange">
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="意图" prop="intent" v-if="searchItem.type == 1 || searchItem.type == 3">
                <el-select v-model.trim="searchItem.intent" placeholder="" @change="intentChange" clearable>
                    <el-option v-for="(item,index) in intentList" :key="index" :label="item.key" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="意图" prop="intent" v-if="searchItem.type == 4">
                <el-select v-model.trim="searchItem.intent" placeholder="" @change="intentChange" clearable>
                    <el-option v-for="(item,index) in intentKeyList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="key" prop="key1" v-if="searchItem.type == 4">
                <el-select v-model.trim="searchItem.key1" placeholder="" clearable :loading="keyListLoading" @visible-change="keyChange">
                    <el-option v-for="(item,index) in topKeyList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="pickerVal" class="nludate-form">
                <el-date-picker
                    v-model="searchItem.pickerVal"
                    type="datetimerange"
                    align="center"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00','23:59:59']"
                    :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                </el-date-picker>
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
import {nlulogStatistic, nlulogDict, nluTop20KeyIntent, nluTop20Key} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {checkTime} from '@/utils/timer.js'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/tooltip')

export default {
  data() {
    let vue = this
    return {
        pickerOptions: {
          disabledDate(time) {
              let times = Date.now();
              let timeOptionRange = vue.timeOptionRange;
              let secondNum = vue.dataTime;
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
            pickerVal:[],
            type:"",
            intent:"",
            key1:""
        },
        typeList:[
            {id:1, label:"每天统计数"},
            {id:2, label:"每个intent的数量"},
            {id:3, label:"每小时统计数"},
            {id:4, label:"前20 key的数量"},
            {id:5, label:"导航类别分布比例"}
        ],
        intentList:[],
        topKeyList:[],
        intentKeyList:[],
        dataTime: 3600 * 1000 * 24 * 15,
        list: [],
        pickerVal:[],
        seaBtnLoading:false,
        keyListLoading:false,
        loading:true
    };
  },
  created(){
    this.searchItem.type = this.typeList[0].id
    this.getIntentList()
    this.getIntentKeyList()
  },
  mounted() {
    this.getChartsData()
  },
  methods: {
    onSubmit(){
      this.seaBtnLoading = true
      this.getChartsData()
      this.seaBtnLoading = false
    },
    intentChange(){
        this.searchItem.key1=""
    },
    typeChange(){
        this.searchItem.pickerVal = []
        this.searchItem.intent=""
        this.searchItem.key1=""
    },
    getIntentList(){
        let p = {
            pid:1
        }
        nlulogDict(p).then(res=>{
            this.intentList = res.data.data
        })
    },
    getIntentKeyList(){
        nluTop20KeyIntent().then(res=>{
            this.intentKeyList = res.data.data
        })
    },
    keyChange(istrue){
        if(istrue){
            this.keyListLoading = true
            let keyParams = {
                intent:this.searchItem.intent
            }
            nluTop20Key(keyParams).then(res=>{
                this.keyListLoading = false
                this.topKeyList = res.data.data
            })
        }
        
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
            startStr:this.searchItem.pickerVal == null ? '': this.searchItem.pickerVal[0],
            endStr:this.searchItem.pickerVal == null ? '': this.searchItem.pickerVal[1],
            type:this.searchItem.type,
            intent:this.searchItem.intent,
            key1:this.searchItem.key1
        }
        paramsList.sign = deleteParams(paramsList)
        let myChart = echarts.init(this.$refs.myChart)
        nlulogStatistic(paramsList).then(res=>{
            this.loading = false
            let pieData = []
            let itemStyles = {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16,
                            formatter: "{value} ",

                        }
                    }
                }
            }
            if(this.$refs.typeValue.selected.value == 5){
                res.data.data.columnName.forEach((item, i) => {
                    pieData.push({
                        name:item,
                        value:res.data.data.counts[i]
                    })
                });
            }
            if(res.data.code == 200){
                myChart.setOption({
                    title: { 
                        text: res.data.data.title,
                        left:'center'
                    },
                    tooltip: {
                        trigger: this.$refs.typeValue.selected.value == 5 ? 'item' :'axis',
                        axisPointer: {
                            type: ''
                        },
                    },
                    toolbox: {
                        show: this.$refs.typeValue.selected.value == 5 ? false : true,
                        right:"50",
                        feature: {
                            magicType: { type: ['line', 'bar'] }
                        }
                    },
                    xAxis: {
                        show:this.$refs.typeValue.selected.value == 5 ? false : true,
                        type:'category',
                        boundaryGap: false,
                        data: res.data.data.columnName,
                        axisLabel:{
                            rotate:20,
                            formatter:'{value}'
                        }
                    },
                    legend: {
                        show: this.$refs.typeValue.selected.value == 5 ? true : false,
                        top:'5%',
                        orient: 'horizontal',
                        left: 'center'
                    },
                    grid:{
                        // x:'5%', //左上角x轴距盒子边框的距离
                        // y:'10%', //左上角Y轴距盒子边框的距离
                        // x2:'5%',//右下角x轴距盒子边框的距离
                        y2:'15%',//右下角Y轴距盒子边框的距离
                        borderWidth:1
                    },
                    yAxis: {
                        show:this.$refs.typeValue.selected.value == 5 ? false : true,
                        minInterval : 1,
                        type: 'value',
                        axisLabel:{
                        formatter: "{value} ",
                        }
                    },
                    series: [{
                        name: res.data.data.title,
                        type: this.$refs.typeValue.selected.value == 5 ? 'pie' : 'line',
                        data: this.$refs.typeValue.selected.value == 5 ? pieData : res.data.data.counts,
                        radius: '50%',
                        barMaxWidth: 60, // 最大宽度
                        itemStyle: this.$refs.typeValue.selected.value == 5 ? {} : itemStyles
                    }],
                    //   dataZoom: [
                    //       {
                    //         type: 'slider',
                    //         show: true,
                    //         handleSize: 2,
                    //         height: '15px',
                    //         start:0 ,
                    //         end: this.computedPosition(1,xArraylength)
                    //       }
                    //     ]
                })
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }
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
