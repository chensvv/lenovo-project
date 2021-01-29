<template>
    <div class="table mainlog">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline cache" size="mini">
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
            <el-form-item label="起始时间" prop="refreshTime" class="width140">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.refreshTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="putTime" class="width140">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.putTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item class="sub-btn">
                <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
        <div  class="table-box">
            <el-table
            :data="list"
            :class="this.totalCount < 5 ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column label="ID" prop="id" align="center">
            </el-table-column>
            <el-table-column label="IT" prop="it" align="center" :formatter="formTime" min-width="120">
            </el-table-column>
            <el-table-column label="IXID" prop="ixid" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="DID" prop="did" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="CODEC" prop="codec" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{scope.row.codec == '7' ? 'Speex 16k' : 
                            scope.row.codec == '3' ? 'Speex 8k' : 
                            scope.row.codec == '5' ? 'Pcm 16k' : 
                            scope.row.codec == '1' ? 'Pcm 8k' : 
                            scope.row.codec == '4' ? 'Bv32 16k' : 
                            scope.row.codec == '0' ? 'Bv32 8k' : '未知'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="UID" prop="uid" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="DTP" prop="dtp" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="VER" prop="ver" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="VDM" prop="vdm" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="APP" prop="app" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="STAT"
                prop="stat"
                align="center">
                <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.stat === 'success' ? 'success' :'danger'"
                    disable-transitions>{{scope.row.stat == 'success'? 'S': 'F'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="L1C" prop="l1c" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" align="center" width="130" v-if="isshow">
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
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
        </div>
          
        <el-dialog title="详情" :visible.sync="infoVisible" width="300" :before-close="handleClose">
            <el-form :label-position="'right'" label-width="100px">
                <el-form-item label="ID">
                    <el-input type="text" v-model="infoList.id" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="设备ID">
                    <el-input type="text" v-model="infoList.did" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="客户端类型">
                    <el-input type="text" v-model="infoList.dtp" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input type="text" v-model="infoList.uid" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="客户端ip">
                    <el-input type="text" v-model="infoList.uip" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="客户端版本">
                    <el-input type="text" v-model="infoList.ver" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="执行状态">
                    <el-input type="text" v-model="infoList.stat" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="所属领域">
                    <el-input type="text" v-model="infoList.vdm" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="包的序号">
                    <el-input type="text" v-model="infoList.pidx" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="语音交互ID">
                    <el-input type="text" v-model="infoList.ixid" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="识别时间">
                    <el-input type="text" v-model="infoList.asrd" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="是否包尾">
                    <el-input type="text" v-model="infoList.over" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="开发者ID">
                    <el-input type="text" v-model="infoList.dev" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="服务总时间">
                    <el-input type="text" v-model="infoList.alld" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="省份">
                    <el-input type="text" v-model="infoList.cprv" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="服务器端地址">
                    <el-input type="text" v-model="infoList.svr" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="引擎类型">
                    <el-input type="text" v-model="infoList.egt" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="运营商类型">
                    <el-input type="text" v-model="infoList.cnwp" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="text" v-model="infoList.dsc" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="音频压缩格式">
                    <el-input type="text" v-model="infoList.dsc" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-input type="text" v-model="infoList.it" auto-complete="off" readonly></el-input>
                </el-form-item>
                 <el-form-item label="规则匹配时间">
                    <el-input type="text" v-model="infoList.nlpd" auto-complete="off" readonly></el-input>
                </el-form-item>
                 <el-form-item label="参数解析时间">
                    <el-input type="text" v-model="infoList.sppd" auto-complete="off" readonly></el-input>
                </el-form-item>
                 <el-form-item label="一级返回">
                    <el-input type="text" v-model="infoList.l1c" auto-complete="off" readonly></el-input>
                </el-form-item>
                 <el-form-item label="二级返回">
                    <el-input type="text" v-model="infoList.l2c" auto-complete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {logList, logDown, logInfo} from '@/config/api'
import downUrl from '@/config/http'
export default {
    data(){
        return{
            pickerOptions: {
                disabledDate(time) {
                    let times = Date.now() - 24 * 60 * 60 * 1000;
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
                refreshTime:"",
                putTime:""
            },
            list:[],
            perList:[],
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
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 8,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            btnLoading:false,
            infoVisible:false,
            listLoading:true,
            isshow:true,
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
            this.currentPage = 1
            this.getList()
        },
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                dtp:this.searchItem.dtp,
                uip:this.searchItem.uip,
                uid:this.searchItem.uid,
                vdm:this.searchItem.vdm,
                app:this.searchItem.app,
                desc:this.searchItem.stat
            }
            logList(params).then(res=>{
                this.listLoading = false
                this.list = res.data.data.data
                this.totalCount = res.data.data.total
            })
        },
        rowClick(index,row){
            this.infoVisible = true
            let iParams={
                id:row.id
            }
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
            
            let openUrl = downUrl.proURL + '/lasf-mgr/servlog/downLoad?ixid='+row.ixid+'&svr='+row.svr+'&uip='+time
            window.open(openUrl)
            // logDown(dParams).then(res=>{
            //     if(res.data.code == '400'){
            //         this.$message({
            //                 message:res.data.errorMessage,
            //                 type:"error",
            //                 duration:1000
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
            this.currentPage = 1
            this.getList()
            this.btnLoading = false
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
            this.getList();
        },
    }
}
</script>

<style scoped>

</style>
