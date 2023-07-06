<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form v-if="clientForm" :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="Uid" prop="uid">
          <el-input v-model.trim="searchItem.uid" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户端类型" prop="dtp">
          <el-input v-model.trim="searchItem.dtp" clearable></el-input>
        </el-form-item>
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
      </div>
    </el-form>
    <el-form v-if="servForm" :inline="true" ref="searchServ" :model="searchServ" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="Uid" prop="uid">
          <el-input v-model.trim="searchServ.uid" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户端类型" prop="dtp">
          <el-input v-model.trim="searchServ.dtp" clearable></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="pickerVal" class="date-form">
            <el-date-picker
                v-model="searchServ.pickerVal"
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
        <el-button size="mini" type="primary" @click="onServ" :loading="servBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetServ('searchServ')">重置</el-button>
      </div>
    </el-form>
    <el-form v-if="statForm" :inline="true" ref="searchStat" :model="searchStat" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="日期" prop="pickerVal" class="date-form">
            <el-date-picker
                v-model="searchStat.pickerVal"
                type="daterange"
                align="center"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptionsChart"
                value-format="yyyy-MM-dd"
                :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
            </el-date-picker>
        </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onStat" :loading="statLoading">查询</el-button>
        <el-button size="mini" @click="resetStat('searchStat')">重置</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClickTabs">
        <el-tab-pane label="客户端信息" name="client" class="flex-align">
          <el-table 
            :data="clientList" 
            stripe 
            :class="this.ctotalClass <= '7' ? 'limitWidth' :''" 
            style="width: 100%" 
            v-loading="ClistLoading" 
            @sort-change="sortChange"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :key="activeName">
            <el-table-column type="index" align="left" label="#" width="50"></el-table-column>
            <el-table-column label="UID" prop="uid" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.uid" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.uid }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.uid }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="客户端类型" prop="dtp" align="center" sortable="custom">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dtp" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.dtp }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.dtp }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="执行状态" prop="stat" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.stat === 'success' ? 'tag-s' : scope.row.stat === 'failed' ? 'tag-d' :'tag-i'"
                >{{scope.row.stat}}</span>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center" min-width="90">
              <template slot="header">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.cltd" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.cltd }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.cltd }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rcn" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.rcn }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.rcn }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" width="130"></el-table-column>
          </el-table>
          <!-- <el-pagination
            @size-change="handleSizeChangeC"
            @current-change="handleCurrentChangeC"
            :current-page.sync="CcurrentPage"
            :page-size="CpageSize"
            layout="total, prev, pager, next, jumper"
            :total="CtotalCount"
          ></el-pagination> -->
          <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPageC==1? true : false" @click="turnToPageC(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <li v-if="isLastPageC != false && currentPageC !=1 && currentPageC - 2 > 0" class="unum" @click="turnToPageC(currentPageC-2)">{{currentPageC-2}}</li>
                    <li v-if="currentPageC-1>0"  class="unum" @click="turnToPageC(currentPageC-1)">{{currentPageC-1}}</li>
                    <li class="active" @click="turnToPageC(currentPageC)">{{currentPageC}}</li>
                    <li v-if="isLastPageC != true" class="unum" @click="turnToPageC(currentPageC+1)">{{currentPageC+1}}</li>
                    <li v-if="currentPageC+1 < 3 && isLastPageC !=true" class="unum" @click="turnToPageC(currentPageC+2)">{{currentPageC+2}}</li>
                    <li><button :disabled="isLastPageC == true ? true: false" @click="turnToPageC(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane label="服务器信息" name="server">
          <el-table 
            :data="serverList" 
            stripe 
            :class="this.totalClass <= '7' ? 'limitWidth' :''" 
            style="width: 100%" 
            v-loading="SlistLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :key="activeName">
            <el-table-column type="index" align="center" label="#" width="50"></el-table-column>
            <el-table-column label="客户端总耗时" prop="ixcd" align="center">
            </el-table-column>
            <el-table-column label="服务端总耗时" prop="ixsd" align="center">
            </el-table-column>
            <el-table-column label="网络总延时" prop="ixnd" align="center">
            </el-table-column>
            <el-table-column label="服务端识别耗时" prop="ixad" align="center">
            </el-table-column>
            <el-table-column label="执行状态" prop="stat" align="center" min-width="90">
              <template slot-scope="scope">
                <span
                  :class="scope.row.stat === 'success' ? 'tag-s' : scope.row.stat === 'failed' ? 'tag-d' :'tag-i'"
                >{{scope.row.stat}}</span>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rcn" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.rcn }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.rcn }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" width="130"></el-table-column>
          </el-table>
          <!-- <el-pagination
            @size-change="handleSizeChangeS"
            @current-change="handleCurrentChangeS"
            :current-page.sync="ScurrentPage"
            :page-size="SpageSize"
            layout="total, prev, pager, next, jumper"
            :total="StotalCount"
          ></el-pagination> -->
          <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPageS==1? true : false" @click="turnToPageS(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <!-- <li><button :disabled="currentPage==1? true : false" @click="turnToPage(currentPage-1)"><i class="el-icon-arrow-left"></i></button></li> -->
                    <li v-if="isLastPageS != false && currentPageS != 1 && currentPageS - 2 > 0" class="unum" @click="turnToPageS(currentPageS-2)">{{currentPageS-2}}</li>
                    <li v-if="currentPageS-1>0"  class="unum" @click="turnToPageS(currentPageS-1)">{{currentPageS-1}}</li>
                    <li class="active" @click="turnToPageS(currentPageS)">{{currentPageS}}</li>
                    <li v-if="isLastPageS != true" class="unum" @click="turnToPageS(currentPageS+1)">{{currentPageS+1}}</li>
                    <li v-if="currentPageS+1 < 3 && isLastPageS != true" class="unum" @click="turnToPageS(currentPageS+2)">{{currentPageS+2}}</li>

                    <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
                    <li><button :disabled="isLastPageS == true? true: false" @click="turnToPageS(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane label="统计" name="stat">
            <div class="table-box" style="margin-top: 30px;" v-loading="chartLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { checkTime } from "@/utils/timer.js";
import { clientList, clientStatistic } from "@/config/api.js";
import {deleteParams} from '@/utils/deleteParams.js'
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
export default {
  data() {
    let vue = this
    return {
      pickerOptions: {
          disabledDate(time) {
            let times = Date.now();
            return time.getTime() > times;
          },
      },
      pickerOptionsChart:{
        disabledDate(time) {
            let times = Date.now();
            let timeOptionRange = vue.timeOptionRange;
            let secondNum = 3600 * 1000 * 24 * 15;
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
      clientList: [],
      serverList: [],
      searchItem: {
        //搜索数据组
        uid: "",
        dtp: "",
        pickerVal:[]
      },
      searchServ: {
        //搜索数据组
        uid: "",
        dtp: "",
        pickerVal:[]
      },
      searchStat: {
        pickerVal:[]
      },
      activeName: "client",
      ctotalClass:'8',
      totalClass:'8',
      clientForm:true,
      statForm:false,
      servForm:false,
      // 分页
      currentPageC: 1, //默认显示第几页
      CpageSize: 10, //默认每页条数
      CtotalCount: 1, // 总条数
      isPageNumberErrorC:false,
      MaxIdC:"",
      MinIdC:"",
      nextPageC:"",
      isLastPageC:false,
      lastCurrentPageC:"",

      currentPageS: 1, //默认显示第几页
      SpageSize: 10, //默认每页条数
      StotalCount: 1, // 总条数
      showTitle:true,
      seaBtnLoading: false,
      servBtnLoading: false,
      statLoading: false,
      chartLoading:false,
      ClistLoading:true,
      SlistLoading:true,
      isPageNumberErrorS:false,
      MaxIdS:"",
      MinIdS:"",
      nextPageS:"",
      isLastPageS:false,
      lastCurrentPageS:"",
      column:{
        prop:'',
        order:''
      }
    }
  },
  created() {
    this.getList();
    this.getSList()
  },
  mounted(){
    
  },
  methods: {
    onShowNameTipsMouseenter(e) {
        var target = e.target;
        let textLength = target.clientWidth;
        let containerLength = target.scrollWidth;
        if (textLength < containerLength) {
            // 溢出了
            this.showTitle = false;
        } else {
            this.showTitle = true;
        }
    },
    resetServ(formName) {
      this.$refs[formName].resetFields();
      // this.currentPageS = ''
      this.MaxIdS = ''
      this.MinIdS = ''
      this.getSList(1)
    },
    resetStat(formName) {
      this.$refs[formName].resetFields();
      this.getStatistic()
    },
    handleClickTabs(tab, event){
      if(tab.name == "server"){
            this.statForm = false
            this.clientForm = false
            this.servForm = true
        }else if(tab.name == "stat"){
            this.clientForm = false
            this.servForm = false
            this.statForm = true
            setTimeout(()=>{
                this.getStatistic()
            },100)
        }else{
            this.statForm = false
            this.servForm = false
            this.clientForm = true
        }
    },
    formTime(row, column) {
      var timer = row.it;
      var date = new Date(timer);
      return (
        date.getFullYear() +
        "-" +
        checkTime(date.getMonth() + 1) +
        "-" +
        checkTime(date.getDate()) +
        " " +
        checkTime(date.getHours()) +
        ":" +
        checkTime(date.getMinutes())
      );
    },
    onSubmit() {
      this.seaBtnLoading = true;
      // this.currentPageC = 1
      this.getList(1);
      this.seaBtnLoading = false;
    },
    onServ() {
      this.servBtnLoading = true;
      // this.currentPageS = 1
      this.getSList(1);
      this.servBtnLoading = false;
    },
    onStat() {
      this.statLoading = true;
      this.getStatistic();
      this.statLoading = false;
    },
    handleSizeChangeC(val) {
      this.CpageSize = val;
      this.currentPageC = 1;
      this.getList();
    },
    handleSizeChangeS(val) {
      this.SpageSize = val;
      this.currentPageS = 1;
      this.getList();
    },
    handleCurrentChangeC(val) {
      this.currentPageC = val;
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    handleCurrentChangeS(val) {
      this.currentPageS = val;
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    turnToPageC(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getList(pageNum)
        }else{
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberErrorC = true;
                return false;
            }else{
                ts.getList(pageNum);
                ts.isPageNumberErrorC = false;
            }
        }
    },
    turnToPageS(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getSList(pageNum)
        }else{
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberErrorS = true;
                return false;
            }else{
                ts.getSList(pageNum);
                ts.isPageNumberErrorS = false;
            }
        }
    },
    sortChange(column){
      this.column = {
        prop:column.prop,
        order:column.order
      }
      this.getList(this.lastCurrentPageC)
    },
    getList(pageNum) {
      this.ClistLoading = true
      let Cparams = {
          startStr: this.searchItem.pickerVal[0],
          endStr: this.searchItem.pickerVal[1],
          uid: this.searchItem.uid,
          dtp: this.searchItem.dtp,
          fieldName: this.column.prop,
          pgstr:this.nextPageC,
          pcstr:this.CpageSize,
          maxId:this.MaxIdC,
          minId:this.MinIdC,
          nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
          currentPage:this.lastCurrentPageC,
          order:this.column.order == 'ascending' ? '0' : ''
        };
        Cparams.sign = deleteParams(Cparams)
        clientList(Cparams).then(res => {
          this.ClistLoading = false
          if(res.data.code == 200){
            this.clientList = res.data.data.data;
            this.ctotalClass = res.data.data.data.length
            this.isLastPageC = res.data.data.lastPage
            this.lastCurrentPageC = res.data.data.currentPage
            this.currentPageC = res.data.data.currentPage
            this.MaxIdC = Math.max.apply(Math, this.clientList.map(function(o) {return o.id}))
            this.MinIdC = Math.min.apply(Math, this.clientList.map(function(o) {return o.id}))
          }else{
              this.$message({
                  message:res.data.errorMessage,
                  type:'error',
                  duration:1500
              });
          }
        }).catch(()=>{
          this.ClistLoading = false
        })
      },
      getSList(pageNum){
        this.SlistLoading = true
        let Sparams = {
          startStr: this.searchServ.pickerVal[0],
          endStr: this.searchServ.pickerVal[1],
          uid: this.searchServ.uid,
          dtp: this.searchServ.dtp,
          fieldName: this.column.prop,
          pgstr:this.nextPageS,
          pcstr:this.SpageSize,
          maxId:this.MaxIdS,
          minId:this.MinIdS,
          nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
          currentPage:this.lastCurrentPageS,
        };
        Sparams.sign = deleteParams(Sparams)
        clientList(Sparams).then(res => {
          this.SlistLoading = false
          if(res.data.code == 200){
            this.serverList = res.data.data.data;
            this.totalClass = res.data.data.data.length
            this.isLastPageS = res.data.data.lastPage
            this.lastCurrentPageS = res.data.data.currentPage
            this.currentPageS = res.data.data.currentPage
            this.MaxIdS = Math.max.apply(Math, this.serverList.map(function(o) {return o.id}))
            this.MinIdS = Math.min.apply(Math, this.serverList.map(function(o) {return o.id}))
          }
        }).catch(()=>{
          this.SlistLoading = false
        })
      },
      getStatistic(){
        // 基于准备好的dom，初始化echarts实例
        this.chartLoading = true
        let paramsList = {
            startStr:this.searchStat.pickerVal[0],
            endStr:this.searchStat.pickerVal[1],
        }
        paramsList.sign = deleteParams(paramsList)
        let myChart = echarts.init(this.$refs.myChart)
        clientStatistic(paramsList).then(res=>{
          this.chartLoading = false
            if(res.data.code == 200){
              let xData = res.data.data.date
              // var xArraylength = res.data.data.visit.length
              myChart.setOption({
                title: { 
                    text: '结果数据统计',
                    left:'center'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: ''
                  },
                },
                legend: {
                    orient:'horizontal',
                    x:'center',
                    y:'5%',
                    data: ['每天总量', '取消', '无识别结果', '没说话点mic取消', '每天成功次数', '纠正删除']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:{
                        rotate:20
                    },
                    data: xData
                },
                grid:{
                    x:'10%', //左上角x轴距盒子边框的距离
                    y:'10%', //左上角Y轴距盒子边框的距离
                    x2:'5%',//右下角x轴距盒子边框的距离
                    y2:'10%',//右下角Y轴距盒子边框的距离
                    borderWidth:1
                },
                yAxis: {
                    type: 'value',
                    minInterval : 1
                },
                series: [
                      {
                        name: '每天总量',
                        type: 'line',
                        data: res.data.data.all
                    },
                    {
                        name: '取消',
                        type: 'line',
                        data: res.data.data.abort
                    },
                    {
                        name: '无识别结果',
                        type: 'line',
                        data: res.data.data.failed
                    },
                    {
                        name: '没说话点mic取消',
                        type: 'line',
                        data: res.data.data.failed1
                    },
                    {
                        name: '每天成功次数',
                        type: 'line',
                        data: res.data.data.success
                    },
                    {
                        name: '纠正删除',
                        type: 'line',
                        data: res.data.data.success1
                    },
                    // {
                    //     name: '数据条数',
                    //     type: 'bar',
                    //     data: res.data.data.visit,
                    //     color:"#409eff",
                    //     barMaxWidth: 60, // 最大宽度
                    //     itemStyle: {
                    //         normal: {
                    //             label: {
                    //                 show: true, //开启显示
                    //                 position: 'top', //在上方显示
                    //                 textStyle: { //数值样式
                    //                     color: 'black',
                    //                     fontSize: 16
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                ]
              })
            }else{
              this.$message({
                  message:res.data.msg,
                  type:'error',
                  duration:1500
              });
            }
        })
    },
    }
  }
;
</script>

<style scoped>
</style>
