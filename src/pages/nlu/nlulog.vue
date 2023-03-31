<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/list'}">应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="文本指令" prop="asrres">
                    <el-input v-model.trim="searchItem.asrres" clearable></el-input>
                </el-form-item>
                <el-form-item label="意图" prop="intent">
                    <el-input v-model.trim="searchItem.intent" clearable></el-input>
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
            <el-table-column
                label="耗时"
                prop="parrotUseTime"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.parrotUseTime" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.parrotUseTime }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.parrotUseTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="详细日志"
                prop="logInfo"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.logInfo" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.logInfo }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.logInfo }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" prop="createTime" align="center" :formatter="formTime" width="130"></el-table-column>
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
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {deleteParams} from '@/utils/deleteParams.js'
import {nlulogList} from '@/config/api'
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
                pickerVal:[],
                asrres:"",
                intent:""
            },
            list:[],
            perList:[],
            totalClass:'8',
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            btnLoading:false,
            listLoading:true
        }
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getList();
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
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.pickerVal[0],
                endStr:this.searchItem.pickerVal[1],
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
        }
}
}
</script>

<style scoped>

</style>
