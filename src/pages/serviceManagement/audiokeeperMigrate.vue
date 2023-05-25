<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/audiokeeper/list'}">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" size="mini" style="padding-left:10px;">
          <div class="form-btn">
              <el-button size="mini" @click="refresh()" v-if="refsh">定时刷新</el-button>
              <el-button size="mini" @click="refreshNo()" v-else>关闭刷新</el-button>
              <el-button size="mini" @click="handleAdd()" v-has="'audiokeeperMigrate:migrate'">迁移</el-button>
          </div>
        </el-form>
        <div class="table-box" v-loading="loading">
            <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="迁移" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="服务地址" prop="serverAddr">
                <el-input type="text" v-model.trim="addList.serverAddr" auto-complete="off" placeholder="实例：localhost:8080"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {socketTotal,migrate} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/bar');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
export default {
  data() {
    let vue = this
    return {
        list: [],
        pickerVal:[],
        seaBtnLoading:false,
        channelList:[],
        loading:true,
        refsh:true,
        intervalId:null,
        addList: {//添加数据组
            serverAddr:"",
        },
        addRules:{
            serverAddr:[{ required: true, message: '请输入名称', trigger: 'change' }],
        },
        addVisible: false,
        addBtnLoading:false,
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
      }, 5000);
    },
    refreshNo(){
        this.refsh = !this.refsh
        this.clear()
    },
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    openFun(addList){
      this.$nextTick(() => {
        if(this.$refs[addList]){
          this.$refs[addList].resetFields();
        }
      })
    },
    addHandleClose(){
      this.addVisible = false
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams = {
        serverAddr:this.addList.serverAddr,
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          migrate(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'迁移成功',
                    type:"success",
                    duration:1500
                });
                this.addVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
                });
            }
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    getChartsData(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart)
        let Xdata = []
        let Ydata = []
        socketTotal().then(res=>{
            this.loading = false
            let obj = res.data.data
              for(let key in obj){
                Xdata.push(obj[key].name)
                Ydata.push(obj[key].value)
            }
            // let xArraylength = Xdata.length
            myChart.setOption({
              title: { 
                  text: '服务socket总数',
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
              }]
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
