<template>
    <div class="table height-135">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height100 width130" size="mini">
            <div class="form-input height100">
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
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                    </el-date-picker>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
            </div>
        </el-form>
        <div class="table-box">
            <el-table
            :data="list"
            stripe
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            @sort-change="sortChange"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
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
            <el-table-column label="操作" align="center"  width="130" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="rowClick(scope.$index, scope.row)"
                        v-has="'servlog:detail'">详情</el-button>
                        <el-button
                        size="mini"
                        icon="el-icon-download"
                        @click="handleDown(scope.$index, scope.row)"
                        v-has="'servlog:downLoad'"></el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- <i-table :list="list" :options="options" :columns="columns" :operates="operates"></i-table> -->
        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination> -->
        <div class="pagination-wrap" v-cloak>
            <ul class="pagination">
                <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                <!-- <li><button :disabled="currentPage==1? true : false" @click="turnToPage(currentPage-1)"><i class="el-icon-arrow-left"></i></button></li> -->
                <li v-if="isLastPage != false && currentPage !=1" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                <li v-if="currentPage+1 < 3 && isLastPage!=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
                <li><button :disabled="isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div>
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
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {logList, logDown, logInfo, servDownload} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import downUrl from '@/config/http'
export default {
    data(){
        return{
            pickerOptions: {
                disabledDate(time) {
                    let times = Date.now();
                    return time.getTime() > times;
                },
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
            infoVisible:false,
            listLoading:true,
            isshow:true,
            isPageNumberError:false,
            MaxId:"",
            MinId:"",
            nextPage:"",
            isLastPage:false,
            lastCurrentPage:""
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
        if(this.perList.indexOf('servlog:detail') == -1 && this.perList.indexOf('servlog:downLoad') == -1){
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = ''
            this.maxId = ''
            this.minId = ''
            this.getList(1)
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
                    over:res.data.data.over,
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
        handleConfirm(){
            this.infoVisible = false
        },
        onSubmit(){
            this.btnLoading = true
            this.currentPage = ''
            this.getList(1)
            this.btnLoading = false
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
