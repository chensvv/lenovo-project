<template>
    <div class="joke">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline cache" size="mini">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model.trim="searchItem.userName" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
          <el-table
            :data="list"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column
                label="lenovoId"
                prop="lenovoId"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="用户名"
                prop="userName"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="访问次数"
                prop="userDailyCount"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="添加时间"
                prop="createTime"
                align="center"
                :formatter="formTime"
                min-width="140">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="updateTime"
                align="center"
                :formatter="formTime2"
                min-width="140">
            </el-table-column>
            <el-table-column label="操作" align="center" width="130" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="rowClick(scope.$index, scope.row)"
                        v-has="'userinfo:detail'">详情</el-button>
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
                <el-form-item label="lenovoId">
                    <el-input type="text" v-model="infoList.lenovoId" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input type="text" v-model="infoList.userName" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="访问次数">
                    <el-input type="text" v-model="infoList.userDailyCount" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="AK">
                    <el-input type="text" v-model="infoList.ak" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="SK">
                    <el-input type="text" v-model="infoList.sk" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="getAkSk()" :loading="regLoading" v-has="'userinfo:modify'">更新AKSK</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirm()">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {akskList,akskDetail,modinfy} from '@/config/adminApi'
export default {
    data(){
        return{
            searchItem:{
                userName:''
            },
            list:[],
            perList:[],
            infoList:{
                lenovoId:'',
                userName:'',
                userDailyCount:'',
                ak:'',
                sk:''
            },
            user:'',
            id:'',
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            btnLoading:false,
            infoVisible:false,
            listLoading:true,
            isshow:true
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
        if(this.perList.indexOf('userinfo:detail') == -1){
            this.isshow = false
        }
    },
    methods:{
        formTime(row, column){
        var timer = row.createTime
        var date = new Date(timer * 1000)
        return date.getFullYear()+'-'+
            checkTime(date.getMonth()+1)+'-'+
            checkTime(date.getDate())+' '+
            checkTime(date.getHours())+':'+
            checkTime(date.getMinutes())
        },
        formTime2(row, column){
        var timer = row.updateTime
        var date = new Date(timer * 1000)
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
        getAkSk(){
            let detailParams = {
                userName:this.infoList.userName,
                lenovoId:this.infoList.lenovoId
            }
            modinfy(detailParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'更新成功',
                    type:"success",
                    duration:1000
                });
                this.getAkSkDetail();
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
                q:this.searchItem.userName,
            }
            akskList(params).then(res=>{
                this.listLoading = false
                this.list = res.data.data
                this.totalCount = res.data.count
            })
        },
        rowClick(index,row){
            this.infoVisible = true
            this.user = row.userName
            this.id = row.lenovoId
            this.getAkSkDetail()
        },
        getAkSkDetail(){
            let detailParams = {
                userName:this.user,
                lenovoId:this.id
            }
            akskDetail(detailParams).then(res=>{
                this.infoList = {
                    lenovoId:res.data.lenovoId,
                    userName:res.data.userName,
                    userDailyCount:res.data.userDailyCount,
                    ak:res.data.lenovoKey,
                    sk:res.data.secretKey
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
