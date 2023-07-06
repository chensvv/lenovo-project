<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-if="mainForm" :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="客户端类型" prop="dtp">
                    <el-input v-model.trim="searchItem.dtp" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备ID" prop="uip">
                    <el-input v-model.trim="searchItem.uip" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户UID" prop="uid">
                    <el-input v-model.trim="searchItem.uid" clearable></el-input>
                </el-form-item>
                <el-form-item label="开发者ID" prop="app">
                    <el-input v-model.trim="searchItem.app" clearable></el-input>
                </el-form-item>
                <el-form-item label="VDM" prop="vdm">
                    <el-select v-model="searchItem.vdm" placeholder="--" clearable>
                        <el-option label="all" value="all"></el-option>
                        <el-option label="les" value="les"></el-option>
                        <el-option label="app" value="app"></el-option>
                        <el-option label="vod" value="vod"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="stat">
                    <el-select v-model.trim="searchItem.stat" placeholder="--" clearable>
                    <el-option label="成功" value="success"></el-option>
                    <el-option label="失败" value="failed"></el-option>
                    </el-select>
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
                        :picker-options="pickerOptionsList"
                        value-format="yyyy-MM-dd"
                        :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                    </el-date-picker>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
                <!-- <el-button size="mini" @click="resetForm('searchItem')">重置</el-button> -->
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
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                    </el-date-picker>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="submitStat" :loading="statLoading">查询</el-button>
                <el-button size="mini" @click="resetStat('searchStat')">重置</el-button>
            </div>
        </el-form>
        <div class="table-box">
            <el-tabs type="card" v-model="activeName" @tab-click="handleClickTabs">
                <el-tab-pane label="明细日志" name="main" class="flex-align">
                    <el-table
                    :data="list"
                    stripe
                    :class="this.totalClass <= '7' ? 'limitWidth' :''"
                    style="width: 100%"
                    v-loading="listLoading"
                    @sort-change="sortChange"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    :key="activeName">
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
                    <!-- <el-table-column label="ID" prop="id" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.id" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.id }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.id }}
                            </div>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="IXID" prop="ixid" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ixid" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.ixid }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.ixid }}
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="DID" prop="did" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.did" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.did }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.did }}
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="CODEC" prop="codec" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.codec == '7' ? 'Speex 16k' : 
                                    scope.row.codec == '3' ? 'Speex 8k' : 
                                    scope.row.codec == '5' ? 'Pcm 16k' : 
                                    scope.row.codec == '1' ? 'Pcm 8k' : 
                                    scope.row.codec == '4' ? 'Bv32 16k' : 
                                    scope.row.codec == '0' ? 'Bv32 8k' : '未知'}}</span>
                        </template>
                    </el-table-column> -->
                    
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
                    <el-table-column label="客户端版本" prop="ver" align="center" sortable="custom">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ver" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.ver }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.ver }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="VDM" prop="vdm" align="center">
                    </el-table-column>
                    <!-- <el-table-column label="APP" prop="app" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.app" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.app }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.app }}
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="状态"
                        prop="stat"
                        align="center" 
                        >
                        <template slot-scope="scope">
                            <span
                            :class="scope.row.stat === 'success' ? 'tag-s' :'tag-d'"
                            >{{scope.row.stat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="一级返回" prop="l1c" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.l1c" placement="top">
                                <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                                {{ scope.row.l1c }}
                                </div>
                            </el-tooltip>
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                                {{ scope.row.l1c }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间" prop="it" align="center"  :formatter="formTime" width="130">
                    </el-table-column>
                    <el-table-column label="操作" align="center"  width="150" v-if="isshow">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="rowClick(scope.$index, scope.row)"
                                v-has="'servlog:detail'">详情</el-button>
                                <el-button
                                size="mini"
                                @click="rowClient(scope.$index, scope.row)"
                                v-has="'servlog:clientlog'">上报日志</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-wrap" v-cloak>
                        <ul class="pagination">
                            <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                            <li v-if="isLastPage != false && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                            <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                            <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                            <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                            <li v-if="currentPage+1 < 3 && isLastPage!=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                            <li><button :disabled="isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
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
          
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="infoVisible" width="40%" top="10vh" :before-close="handleClose" class="aksk-info">
            <el-descriptions>
                <el-descriptions-item label="ID">{{infoList.id}}</el-descriptions-item>
                <el-descriptions-item label="设备ID">{{infoList.did}}</el-descriptions-item>
                <el-descriptions-item label="客户端类型">{{infoList.dtp}}</el-descriptions-item>
                <el-descriptions-item label="用户ID">{{infoList.uid}}</el-descriptions-item>
                <el-descriptions-item label="客户端ip">{{infoList.uip}}</el-descriptions-item>
                <el-descriptions-item label="客户端版本">{{infoList.ver}}</el-descriptions-item>
                <el-descriptions-item label="执行状态">{{infoList.stat}}</el-descriptions-item>
                <el-descriptions-item label="所属领域">{{infoList.vdm}}</el-descriptions-item>
                <el-descriptions-item label="包的序号">{{infoList.pidx}}</el-descriptions-item>
                <el-descriptions-item label="语音交互ID">{{infoList.ixid}}</el-descriptions-item>
                <el-descriptions-item label="识别时间">{{infoList.asrd}}</el-descriptions-item>
                <el-descriptions-item label="是否包尾">{{infoList.over}}</el-descriptions-item>
                <el-descriptions-item label="开发者ID">{{infoList.dev}}</el-descriptions-item>
                <el-descriptions-item label="服务总时间">{{infoList.alld}}</el-descriptions-item>
                <el-descriptions-item label="省份">{{infoList.cprv}}</el-descriptions-item>
                <el-descriptions-item label="服务器端地址">{{infoList.svr}}</el-descriptions-item>
                <el-descriptions-item label="引擎类型">{{infoList.egt}}</el-descriptions-item>
                <el-descriptions-item label="运营商类型">{{infoList.cnwp}}</el-descriptions-item>
                <el-descriptions-item label="描述">{{infoList.dsc}}</el-descriptions-item>
                <el-descriptions-item label="添加时间">{{infoList.it}}</el-descriptions-item>
                <el-descriptions-item label="规则匹配时间">{{infoList.nlpd}}</el-descriptions-item>
                <el-descriptions-item label="参数解析时间">{{infoList.sppd}}</el-descriptions-item>
                <el-descriptions-item label="一级返回">{{infoList.l1c}}</el-descriptions-item>
                <el-descriptions-item label="二级返回">{{infoList.l2c}}</el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirm()">关 闭</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="clientVisible" width="40%" top="10vh" :before-close="handleClient" class="aksk-info">
            <el-descriptions>
                <el-descriptions-item label="用户ID">{{clientInfo.uid}}</el-descriptions-item>
                <el-descriptions-item label="客户端类型">{{clientInfo.dtp}}</el-descriptions-item>
                <el-descriptions-item label="客户端版本">{{clientInfo.ver}}</el-descriptions-item>
                <el-descriptions-item label="服务端地址">{{clientInfo.svr}}</el-descriptions-item>
                <el-descriptions-item label="客户端总耗时">{{clientInfo.ixcd}}</el-descriptions-item>
                <el-descriptions-item label="服务端总耗时">{{clientInfo.ixsd}}</el-descriptions-item>
                <el-descriptions-item label="网络总延时">{{clientInfo.ixnd}}</el-descriptions-item>
                <el-descriptions-item label="服务端识别耗时">{{clientInfo.ixad}}</el-descriptions-item>
                <el-descriptions-item label="执行状态">{{clientInfo.stat}}</el-descriptions-item>
                <el-descriptions-item label="延时">{{clientInfo.cltd}}</el-descriptions-item>
                <el-descriptions-item label="内容">{{clientInfo.rcn}}</el-descriptions-item>
                <el-descriptions-item label="插入时间">{{clientInfo.it}}</el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClient()">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {logList, logDown, logInfo, servDownload, statistics, clientlog} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import downUrl from '@/config/http'
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
export default {
    data(){
        let vue = this
        return{
            pickerOptionsList:{
                disabledDate(time) {
                    let times = Date.now();
                    return time.getTime() > times;
                },
            },
            pickerOptions: {
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
            searchItem:{
                dtp:'',
                uip:'',
                uid:'',
                vdm:'',
                app:'',
                desc:'',
                stat:"",
                pickerVal:[]
            },
            searchStat:{
                pickerVal:[]
            },
            list:[],
            perList:[],
            totalClass:'8',
            infoList:{
                id:"",
                did:"",
                dtp:"",
                uid:"",
                uip:"",
                ver:"",
                stat:"",
                vdm:"",
                pidx:"",
                ixid:"",
                asrd:"",
                over:"",
                dev:"",
                alld:"",
                cprv:"",
                svr:"",
                egt:"",
                cnwp:"",
                dsc:"",
                it:"",
                nlpd:"",
                sppd:"",
                l1c:"",
                l2c:""
            },
            clientInfo:{
                uid:"",
                dtp:"",
                ver:"",
                svr:"",
                stat:"",
                cltd:"",
                rcn:"",
                ixcd:"",
                ixsd:"",
                ixnd:"",
                ixad:"",
                it:""
            },
            column:{
                prop:'',
                order:''
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            btnLoading:false,
            statLoading:false,
            infoVisible:false,
            clientVisible:false,
            listLoading:true,
            isshow:true,
            isPageNumberError:false,
            MaxId:"",
            MinId:"",
            nextPage:"",
            isLastPage:false,
            lastCurrentPage:"",
            activeName: "main",
            mainForm:true,
            statForm:false,
            chartLoading:false
        }
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getList();
    },
    mounted(){
        
        if(this.perList.indexOf('servlog:detail') == -1 && this.perList.indexOf('servlog:clientlog') == -1){
            this.isshow = false
        }
    },
    methods:{
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
        formTime(row, column){
            var timer = row.it
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        //     // this.currentPage = 1
        //     this.MaxId = ''
        //     this.MinId = ''
        //     this.getList(1)
        // },
        resetStat(formName) {
            this.$refs[formName].resetFields();
            this.getChartsData()
        },
        handleClickTabs(tab, event){
            if(tab.name == "main"){
                this.statForm = false
                this.mainForm = true
            }else{
                this.mainForm = false
                this.statForm = true
                setTimeout(()=>{
                    this.getChartsData()
                },100)
            }
        },
        sortChange(column){
            this.column = {
                prop:column.prop,
                order:column.order
            }
            this.getList(this.lastCurrentPage)
        },
        turnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getList(pageNum)
            }else{
                // ts.currentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    ts.isPageNumberError = true;
                    return false;
                }else{
                    ts.getList(pageNum)
                    ts.isPageNumberError = false;
                }
            }
        },
        getList(pageNum) {
            this.listLoading = true
            let params = {
                startStr:this.searchItem.pickerVal[0],
                endStr:this.searchItem.pickerVal[1],
                dtp:this.searchItem.dtp,
                uip:this.searchItem.uip,
                uid:this.searchItem.uid,
                vdm:this.searchItem.vdm,
                app:this.searchItem.app,
                desc:this.searchItem.stat,
                fieldName: this.column.prop,
                pgstr:this.nextPage,
                pcstr:this.pageSize,
                maxId:this.MaxId,
                minId:this.MinId,
                nextPage:pageNum == 1 || pageNum == undefined ? 1 : pageNum,
                currentPage:this.lastCurrentPage,
                order:this.column.order == 'ascending' ? '0' : ''
            }
            params.sign = deleteParams(params)
            logList(params).then(res=>{
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data.data
                    this.totalClass = res.data.data.data.length
                    this.MaxId = Math.max.apply(Math, this.list.map(function(o) {return o.id}))
                    this.MinId = Math.min.apply(Math, this.list.map(function(o) {return o.id}))
                    this.isLastPage = res.data.data.lastPage
                    this.lastCurrentPage = res.data.data.currentPage
                    this.currentPage = res.data.data.currentPage
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:'error',
                        duration:1500
                    });
                }
            }).catch(()=>{
                this.listLoading = false
            })
        },
        getChartsData(){
            // 基于准备好的dom，初始化echarts实例
            this.chartLoading = true
            let paramsList = {
                startStr:this.searchStat.pickerVal[0],
                endStr:this.searchStat.pickerVal[1],
            }
            paramsList.sign = deleteParams(paramsList)
            let myChart = echarts.init(this.$refs.myChart)
            statistics(paramsList).then(res=>{
                this.chartLoading = false
                if(res.data.code = 200){
                    let xData = res.data.data.date
                    let countYes = res.data.data.countYes
                    let countNo = res.data.data.countNo
                    
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
                            data: ['有结果数据', '无结果数据']
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
                            x:'5%', //左上角x轴距盒子边框的距离
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
                                name: '有结果数据',
                                type: 'line',
                                data: countYes
                            },
                            {
                                name: '无结果数据',
                                type: 'line',
                                data: countNo
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
        rowClick(index,row){
            this.infoVisible = true
            let iParams={
                id:row.id
            }
            iParams.sign = deleteParams(iParams)
            logInfo(iParams).then(res=>{
                this.infoList = {
                    id:res.data.data.id,
                    did:res.data.data.did,
                    dtp:res.data.data.dtp,
                    uid:res.data.data.uid,
                    uip:res.data.data.uip,
                    ver:res.data.data.ver,
                    stat:res.data.data.stat,
                    vdm:res.data.data.vdm,
                    pidx:res.data.data.pidx,
                    ixid:res.data.data.ixid,
                    asrd:res.data.data.asrd,
                    over:res.data.data.over == 1 ? '是' : '否',
                    dev:res.data.data.dev,
                    alld:res.data.data.alld,
                    cprv:res.data.data.cprv,
                    svr:res.data.data.svr,
                    egt:res.data.data.egt,
                    cnwp:res.data.data.cnwp,
                    dsc:res.data.data.dsc,
                    it:new Date(res.data.data.it).getFullYear()+'-'+checkTime(new Date(res.data.data.it).getMonth()+1)+'-'+checkTime(new Date(res.data.data.it).getDate())+' '+checkTime(new Date(res.data.data.it).getHours())+':'+checkTime(new Date(res.data.data.it).getMinutes()),
                    nlpd:res.data.data.nlpd,
                    sppd:res.data.data.sppd,
                    l1c:res.data.data.l1c,
                    l2c:res.data.data.l2c
                }
            })
        },
        rowClient(index,row){
            this.clientVisible = true
            let clientParams = {
                uid:row.uid,
                ixid:row.ixid
            }
            clientlog(clientParams).then(res=>{
                if(res.data.code == 200){
                    if(res.data.data !=null){
                        this.clientInfo = {
                            uid:res.data.data.uid,
                            dtp:res.data.data.dtp,
                            ver:res.data.data.ver,
                            svr:res.data.data.svr,
                            stat:res.data.data.stat,
                            cltd:res.data.data.cltd,
                            rcn:res.data.data.rcn,
                            ixcd:res.data.data.ixcd,
                            ixsd:res.data.data.ixsd,
                            ixnd:res.data.data.ixnd,
                            ixad:res.data.data.ixad,
                            it:new Date(res.data.data.it).getFullYear()+'-'+checkTime(new Date(res.data.data.it).getMonth()+1)+'-'+checkTime(new Date(res.data.data.it).getDate())+' '+checkTime(new Date(res.data.data.it).getHours())+':'+checkTime(new Date(res.data.data.it).getMinutes())
                        }
                    }else{
                        this.clientInfo = {
                            uid:"",
                            dtp:"",
                            ver:"",
                            svr:"",
                            stat:"",
                            cltd:"",
                            rcn:"",
                            ixcd:"",
                            ixsd:"",
                            ixnd:"",
                            ixad:"",
                            it:''
                        }
                    }
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:'error',
                        duration:1500
                    });
                }
                
            })
        },
        handleDown(index,row){
            let date = new Date(row.it)
            let time = checkTime(date.getFullYear())+'-'+checkTime((date.getMonth()+1))+'-'+checkTime(date.getDate())
            
            // let openUrl = downUrl.proURL + '/lasf-mgr/servlog/downLoad?ixid='+row.ixid+'&svr='+row.svr+'&uip='+time
            
            servDownload(row.ixid, row.svr, time).then(res=>{
                console.log(res)
                // let blobUrl = new Blob([res.data])
                // let a = document.createElement('a');
                // let url = window.URL.createObjectURL(blobUrl);
                // let filename = row.filePath
                // a.href = url;
                // a.download = filename;
                // a.click();
                // window.URL.revokeObjectURL(url);
            })
            // window.open(openUrl)
            // logDown(dParams).then(res=>{
            //     if(res.data.code == '400'){
            //         this.$message({
            //                 message:res.data.errorMessage,
            //                 type:"error",
            //                 duration:1500
            //             });
            //     }
            // })

        },
        handleClose(){
            this.infoVisible = false
        },
        handleClient(){
            this.clientVisible = false
        },
        handleConfirm(){
            this.infoVisible = false
        },
        onSubmit(){
            this.btnLoading = true
            // this.currentPage = ''
            this.getList(1)
            this.btnLoading = false
        },
        submitStat(){
            this.statLoading = true
            this.getChartsData()
            this.statLoading = false
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            // console.log(`当前页: ${val}`);
            this.getList();
        },
    }
}
</script>

<style scoped>

</style>
