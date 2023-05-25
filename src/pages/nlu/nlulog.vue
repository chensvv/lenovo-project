<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/nlulog/list'}">运营日志分析</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="文本指令" prop="asrres">
                    <el-input v-model.trim="searchItem.asrres" clearable></el-input>
                </el-form-item>
                <el-form-item label="处理分支" prop="pid">
                    <el-select v-model="searchItem.pid" ref="approachId" :loading="roachLoading" placeholder="--" @change="roachChange">
                        <el-option v-for="(item,index) in pidList" :key="index" :label="item.key" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-popover
                    placement="right"
                    width="300"
                    trigger="click"
                    title="详细日志"
                    popper-class="popkey"
                    v-model="visiblepop"
                    @show="popverShow"
                    @hide="popverHide"
                    >
                    <div class="as" v-loading="popLoading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)"></div>
                    <div  v-for="(item , i) in keyList" :key="i" class="keyLabel">
                        <el-form-item :label="item.desc" :prop="item.key">
                            <el-input v-model.trim="searchKey[item.key]"></el-input>
                        </el-form-item>
                    </div>
                    <!-- <el-button >click 激活</el-button> -->
                    <el-form-item label="意图" prop="intent" slot="reference">
                        <!-- <el-input v-model.trim="searchItem.intent" clearable v-debounce-input="getLoginfoKey" @input="intentInput"></el-input> -->
                        <el-select v-model="searchItem.intent" placeholder="--" ref="intent" clearable @change="intentChange" @visible-change="visibleChange" @clear="intentClear">
                            <el-option v-for="(item,index) in intentList" :key="index" :label="item.key" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-popover>
                <el-form-item label="parrot耗时" prop="parrotmin" class="parrotinput">
                    <el-input v-model.trim="searchItem.parrotmin" clearable>
                    </el-input> - 
                    <el-input v-model.trim="searchItem.parrotmax" clearable></el-input>
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
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column label="用户ID" prop="userId" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.userId" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.userId }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.userId }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="文本指令"
                prop="asrres"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.asrres" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.asrres }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.asrres }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="处理分支"
                prop="nluApproach"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.nluApproach" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.nluApproach }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.nluApproach }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="意图"
                prop="intent"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.intent" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.intent }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.intent }}
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column label="添加时间" prop="createTime" align="center" :formatter="formTime" width="130"></el-table-column>
            <el-table-column label="操作" align="center" width="130">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="rowClick(scope.$index, scope.row)"
                    v-has="'nlulog:detail'">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="infoVisible" width="40%" top="10vh" :before-close="handleClose" class="aksk-info">
            <el-descriptions>
                <el-descriptions-item label="Uid">{{infoData.uid}}</el-descriptions-item>
                <el-descriptions-item label="文本指令">{{infoData.asrres}}</el-descriptions-item>
                <el-descriptions-item label="处理分支">{{infoData.nluApproach}}</el-descriptions-item>
                <el-descriptions-item label="意图">{{infoData.intent}}</el-descriptions-item>
                <template v-for="(item, i) in infoList">
                        <!-- {{item.value}}:{{item[item.key]}} -->
                            <el-descriptions-item :label="item.desc" :key="i">{{item[item.key]}}</el-descriptions-item>
                        
                </template>
                
            </el-descriptions>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirm()">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
import {nlulogList, nlulogDict, nlulogDetail} from '@/config/api'
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
                pickerVal:[],
                asrres:"",
                intent:"",
                pid:"",
                parrotmin:"",
                parrotmax:""
            },
            searchKey:[],
            list:[],
            infoList:[],
            intentList:[],
            infoData:{
                uid:"",
                asrres:"",
                nluApproach:"",
                intent:"",
            },
            keyList:[],
            perList:[],
            pidList:[],
            totalClass:'8',
            timer:null,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            btnLoading:false,
            listLoading:true,
            popLoading:false,
            visiblepop:false,
            infoVisible:false,
            roachLoading:false
        }
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.$nextTick(()=>{
            this.getList();
            this.getroachList()
            
        })
        
    },
    directives:{
        'debounce-input':{
            inserted(el, binding){
                let timeOut
                el.addEventListener('input', ()=>{
                    clearTimeout(timeOut)
                    timeOut = setTimeout(()=>{
                        binding.value()
                    }, parseInt(binding.arg) || 300)
                })
            }
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
            var timer = row.createTime
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.searchKey = []
            this.currentPage = 1
            this.getList();
        },
        onSubmit(){
            this.btnLoading = true
            this.currentPage = 1
            this.listLoading = true
            this.getList()
            this.btnLoading = false
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.listLoading = true
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.listLoading = true
            // console.log(`当前页: ${val}`);
            this.getList();
        },
        popverShow(){
            // if(this.keyList.length == 0){
            //     this.popLoading = true
            // }
            this.getLoginfoKey()
        },
        popverHide(){
            // this.popLoading = false
            // this.getLoginfoKey()
        },
        // intentFocus(){
        //     this.visiblepop = true
        // },
        // intentBlur(){
        //     this.visiblepop = false
        // },
        getroachList(){
            let dictParams = {
                pid: 0
            }
            nlulogDict(dictParams).then(res=>{
                if(res.data.code == 200){
                    this.pidList = res.data.data
                    this.searchItem.pid = this.pidList[0].id
                    this.$nextTick(()=>{
                        this.getIntentList(this.$refs.approachId.selected.value)
                    })
                }
            }).catch(err=>{
            })
        },
        roachChange(val){
            // if(!istrue){
                this.intentList = []
                this.keyList = []
                this.searchItem.intent = ''
                this.getIntentList(val)
            // }
        },
        intentChange(val){
            this.searchKey = []
            this.getLoginfoKey(val)
        },
        visibleChange(istrue){
            if(istrue){
                this.getLoginfoKey(this.$refs.intent.selected.value)
            }
            this.visiblepop = true
        },
        intentClear(){

        },
        intentInput(){
            
        },
        rowClick(index, row){
            let dP = {
                intent:row.intent,
                nluApproach:row.nluApproach
            }
            nlulogDetail(dP).then(res=>{
                this.infoList = res.data.data
                this.infoList.forEach(item=>{
                    item[item.key] = row[item.key];
                })
            })
            this.infoData = {
                uid:row.userId,
                asrres:row.asrres,
                nluApproach:row.nluApproach,
                intent:row.intent,
            }
            this.infoVisible = true
        },
        handleClose(){
            this.infoVisible = false
        },
        handleConfirm(){
            this.infoVisible = false
        },
        getLoginfoKey(val){
            // console.log(val == "")
            // if(this.searchItem.intent != ''){
                if(val != undefined && val != ""){
                    let dictParams = {
                        pid: val
                    }
                    nlulogDict(dictParams).then(res=>{
                        if(res.data.code == 200){
                            this.keyList = res.data.data
                            if(res.data.data != null){
                                this.popLoading = false
                            }else{
                                this.popLoading = true
                            }
                        }else{
                            this.keyList = []
                            this.popLoading = true
                        }
                    }).catch(err=>{
                        this.keyList = []
                        this.popLoading = true
                    })
                }else{
                    this.keyList = []
                    this.popLoading = true
                }
                
            // }
        },
        getIntentList(val){
            let intentParams = {
                pid:val
            }
            nlulogDict(intentParams).then(res=>{
                if(res.data.code == 200){
                    this.intentList = res.data.data
                }
            })
        },
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.pickerVal[0],
                endStr:this.searchItem.pickerVal[1],
                intent:this.$refs.intent.selected.label,
                asrres:this.searchItem.asrres,
                useTimeS:this.searchItem.parrotmin,
                useTimeE:this.searchItem.parrotmax,
                nluApproach:this.$refs.approachId.selected.label,
                key1:this.searchKey.key1,
                key2:this.searchKey.key2,
                key3:this.searchKey.key3,
                key4:this.searchKey.key4,
                key5:this.searchKey.key5,
                key6:this.searchKey.key6,
                key7:this.searchKey.key7,
                key8:this.searchKey.key8,
                key9:this.searchKey.key9,
                key10:this.searchKey.key10,
                key11:this.searchKey.key11,
                key12:this.searchKey.key12,
                key13:this.searchKey.key13,
                key14:this.searchKey.key14,
                key15:this.searchKey.key15
            }
            params.sign = deleteParams(params)
            nlulogList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
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
        getData(a, b) {
            var list = b.map(item => {
                var obj = a.find(i => Object.keys(item).includes(i.key)) || {}
                return {...obj, ...item}        
            })
            return list
        }
    }
}
</script>

<style scoped>

</style>
