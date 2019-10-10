<template>
    <div class="joke">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="a_alert">
            <i class="el-icon-info"></i>
            <span class="alert_main">明细日志今天更新了<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo> 条</span>
        </div>
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
                <el-select v-model.trim="searchItem.source" placeholder="--" clearable>
                <el-option label="成功" value="success"></el-option>
                <el-option label="失败" value="failed"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="refreshTime" class="width140">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.refreshTime" 
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="putTime" class="width140">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.putTime" 
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
          <el-table
            :data="list"
            style="width: 100%">
            <el-table-column label="ID" prop="id" align="center">
            </el-table-column>
            <el-table-column label="IT" prop="it" align="center" :formatter="formTime">
            </el-table-column>
            <el-table-column label="IXID" prop="ixid" align="center">
            </el-table-column>
            <el-table-column label="DID" prop="did" align="center">
            </el-table-column>
            <el-table-column label="CODEC" prop="codec" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.codec == '7' ? 'Speex 16k' : 
                            scope.row.codec == '3' ? 'Speex 8k' : 
                            scope.row.codec == '5' ? 'Pcm 16k' : 
                            scope.row.codec == '1' ? 'Pcm 8k' : 
                            scope.row.codec == '4' ? 'Bv32 16k' : 
                            scope.row.codec == '0' ? 'Bv32 8k' : '未知'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="UID" prop="uid" align="center">
            </el-table-column>
            <el-table-column label="DTP" prop="dtp" align="center">
            </el-table-column>
            <el-table-column label="VER" prop="ver" align="center">
            </el-table-column>
            <el-table-column label="VDM" prop="vdm" align="center">
            </el-table-column>
            <el-table-column label="APP" prop="app" align="center">
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
            <el-table-column label="L1C" prop="l1c" align="center" className="reg">
                <template slot-scope="scope">
                      <el-tooltip effect="dark" :content="scope.row.l1c" placement="top">
                      <span slot>{{scope.row.l1c}}</span>
                      </el-tooltip>
                  </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="130">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="rowClick(scope.$index, scope.row)"
                        v-has="198">详情</el-button>
                        <el-button
                        size="mini"
                        icon="el-icon-download"
                        @click="handleDown(scope.$index, scope.row)"
                        v-has="199"></el-button>
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
        <el-dialog title="详情" :visible.sync="infoVisible" width="300" :before-close="handleClose">
            <el-form :label-position="'left'" label-width="100px">
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
import iTable from "@/components/table";
import {checkTime} from '@/utils/timer.js'
import {logList, logDown, logInfo} from '@/config/api'
import countTo from 'vue-count-to';
export default {
    components: { iTable, countTo },
    data(){
        return{
            searchItem:{
                dtp:'',
                uip:'',
                uid:'',
                vdm:'',
                app:'',
                desc:'',
                refreshTime:"",
                putTime:""
            },
            // columns: [
            //     {
            //         prop: "id",
            //         label: "ID",
            //         align: "center"
            //     },
            //     {
            //         prop: "it",
            //         label: "IT",
            //         align: "center",
            //         render: (h, params)=>{
            //             var timer = params.row.it
            //             var date = new Date(timer)
            //             return h('span',
            //             date.getFullYear()+'-'+
            //             checkTime(date.getMonth()+1)+'-'+
            //             checkTime(date.getDate())+' '+
            //             checkTime(date.getMonth())+':'+
            //             checkTime(date.getMinutes())+':'+
            //             checkTime(date.getSeconds()))
            //         }
            //     },
            //     {
            //         prop: "ixid",
            //         label: "IXID",
            //         align: "center"
            //     },
            //     {
            //         prop: "did",
            //         label: "DID",
            //         align: "center"
            //     },
            //     {
            //         prop: "codec",
            //         label: "CODEC",
            //         align: "center",
            //         render: (h, params) => {
            //             return h('span', { // 组件的props
            //             }, params.row.codec == '7' ? 'Speex 16k' : 
            //                 params.row.codec == '3' ? 'Speex 8k' : 
            //                 params.row.codec == '5' ? 'Pcm 16k' : 
            //                 params.row.codec == '1' ? 'Pcm 8k' : 
            //                 params.row.codec == '4' ? 'Bv32 16k' : 
            //                 params.row.codec == '0' ? 'Bv32 8k' : '未知')
            //         }
            //     },
            //     {
            //         prop: "uid",
            //         label: "UID",
            //         align: "center"
            //     },
            //     {
            //         prop: "dtp",
            //         label: "DTP",
            //         align: "center",
            //     },
            //     {
            //         prop: "ver",
            //         label: "VER",
            //         align: "center",
            //     },
            //     {
            //         prop: "vdm",
            //         label: "VDM",
            //         align: "center",
            //     },
            //     {
            //         prop: "app",
            //         label: "APP",
            //         align: "center",
            //     },
            //     {
            //         prop: "stat",
            //         label: "STAT",
            //         align: "center",
            //         render: (h, params) => {
            //             return h('el-tag', {
            //                 props: {type: params.row.stat === 'success' ? 'success' : 'danger'} // 组件的props
            //             }, params.row.stat === 'success' ? 'S' : 'F')
            //         }
            //     },
            //     {
            //         prop: "l1c",
            //         label: "L1C",
            //         align: "center",
            //     },
            // ],
            // options: {
            //     stripe: false, // 是否为斑马纹 table
            //     loading: false, // 是否添加表格loading加载动画
            //     highlightCurrentRow: false, // 是否支持当前行高亮显示
            //     mutiSelect: false, // 是否支持列表项选中功能
            //     border:false     //是否显示纵向边框
            // },
            // operates: {
            //     // show: false,
            //     width:120,
            //     list: [
            //         {
            //             label:'详情',
            //             type: 'primary',
            //             show: true,
            //             disabled: false,
            //             method: (index, row) => {
            //                 this.rowClick(index, row)
            //             }
            //         },
            //         {
            //             type: 'info',
            //             show: true,
            //             icon: 'el-icon-download',
            //             disabled: false,
            //             method: (index, row) => {
            //                 this.handleDown(index, row)
            //             }
            //         }
            //     ]
            // }, // 列操作按钮
            list:[],
            infoList:[],
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 30,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            btnLoading:false,
            infoVisible:false,
            startVal:0,
            endVal:0,
            infoBtn:1983,
            downBtn:1992
        }
    },
    created(){
        this.getList();
        
    },
    methods:{
        formTime(row, column){
            var timer = row.it
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getMonth())+':'+
                    checkTime(date.getMinutes())+':'+
                    checkTime(date.getSeconds())
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getList() {
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
                this.list = res.data.data.data
                this.totalCount = res.data.data.total
                this.endVal = res.data.count
            })
        },
        rowClick(index,row){
            this.infoVisible = true
            let iParams={
                id:row.id
            }
            logInfo(iParams).then(res=>{
                this.infoList = res.data.data
            })
        },
        handleDown(index,row){
            var date = new Date(row.it)
            let dParams = {
                ixid:row.ixid,
                svr:row.svr,
                it:checkTime(date.getFullYear())+'-'+checkTime((date.getMonth()+1))+'-'+checkTime(date.getDate())
            }
            logDown(dParams).then(res=>{
                if(res.data.code == '400'){
                    this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1000
                        });
                }
            })

        },
        handleClose(){
            this.infoVisible = false
        },
        handleConfirm(){
            this.infoVisible = false
        },
        onSubmit(){
            this.btnLoading = true
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
