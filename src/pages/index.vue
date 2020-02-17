<template>
    <div class="index">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- <div class="a_alert">
            <i class="el-icon-info"></i>
            <span class="alert_main">应用记录今天更新了<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo> 条</span>
        </div> -->
        <!-- <div>
            <img src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3" class="img">
        </div> -->
        <div class="workflow" v-has="'user:user'">
            <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline" size="mini">
                <el-form-item label="内容" prop="con">
                    <el-input v-model.trim="searchItem.con" clearable></el-input>
                </el-form-item>
                <el-form-item label="发起人" prop="user">
                    <el-input v-model.trim="searchItem.user" clearable></el-input>
                </el-form-item>
                <el-form-item class="work">
                    <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                    <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="list"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column
                    label="ID"
                    prop="id"
                    width='50'
                    align="center">
                </el-table-column>
                <el-table-column
                    label="发起人"
                    prop="username"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="简要内容"
                    prop="speak"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    align="center"
                    :formatter="formTime">
                </el-table-column>
                <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="rowClick(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
            </el-table>
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
                <el-form :label-position="'left'" label-width="120px">
                    <el-form-item label="用户名称">
                        <el-input type="text" v-model="infoList.username" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="说法">
                        <el-input type="text" v-model="infoList.speak" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="答案">
                        <el-input type="text" v-model="infoList.answer" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="所属excel文件">
                        <el-input type="text" v-model="infoList.answer" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input type="text" v-model="infoList.createTime" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <el-input type="text" v-model="infoList.updateTime" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="流程id">
                        <el-input type="text" v-model="infoList.taskid" auto-complete="off" readonly></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handlePass()">通过</el-button>
                    <el-button type="primary" @click="handleBack()">退回</el-button>
                    <el-button type="primary" @click="handleConfirm()">关闭</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import {checkTime} from '@/utils/timer.js'
import countTo from 'vue-count-to';
import {activitiList,activitiPass} from '@/config/adminApi'
export default {
    components: { countTo },
    data(){
        return{
            startVal:0,
            endVal:0,
            list:[],
            searchItem:{
                user:'',
                con:''
            },
            infoList:{
                username:'',
                speak:'',
                answer:'',
                createTime:'',
                updateTime:'',
                taskid:''
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            btnLoading:false,
            infoVisible:false,
            listLoading:true,
        }
    },
    created(){
        this.getList();
    },
    methods:{
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
            this.getList()
        },
        onSubmit(){
            this.btnLoading = true
            this.currentPage = 1
            this.getList()
            this.btnLoading = false
        },
        rowClick(index,row){
            this.infoVisible = true
            this.infoList = {
                username:row.username,
                speak:row.speak,
                answer:row.answer,
                createTime:new Date(row.createTime).getFullYear()+'-'+checkTime(new Date(row.createTime).getMonth()+1)+'-'+checkTime(new Date(row.createTime).getDate())+' '+checkTime(new Date(row.createTime).getHours())+':'+checkTime(new Date(row.createTime).getMinutes()),
                updateTime:new Date(row.updateTime).getFullYear()+'-'+checkTime(new Date(row.updateTime).getMonth()+1)+'-'+checkTime(new Date(row.updateTime).getDate())+' '+checkTime(new Date(row.updateTime).getHours())+':'+checkTime(new Date(row.updateTime).getMinutes()),
                taskid:row.taskid
            }
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
        handleClose(){
            this.infoVisible = false
        },
        handleConfirm(){
            this.infoVisible = false
        },
        handlePass(){
            let passParams = {
                id:this.infoList.taskid,
                status:0
            }
            activitiPass(passParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'审核通过',
                        type:"success",
                        duration:1000
                    });
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1000
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        handleBack(){
            let passParams = {
                id:this.infoList.taskid,
                status:2,
                speak:this.infoList.speak
            }
            activitiPass(passParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'已退回',
                        type:"success",
                        duration:1000
                    });
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1000
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                username:this.searchItem.user,
                speak:this.searchItem.con
            }
            activitiList(params).then(res=>{
                this.listLoading = false
                this.list = res.data.rows
                this.totalCount = res.data.total
            })
        },
    }
}
</script>
<style scoped>
.img{
    width: 45%;
    display: block;
    margin: 10px auto 0;
}
.el-main{
    background: #e3e3e3 !important;
}
.workflow{
    width: 493px;
    padding: 14px 14px 14px 13px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    right: 16px;
}
</style>

