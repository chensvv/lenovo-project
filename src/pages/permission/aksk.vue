<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model.trim="searchItem.userName" clearable></el-input>
                </el-form-item>
            </div>
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
            </div>
        </el-form>
        <div class="table-box flex-align">
            <el-table
            :data="list"
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            @sort-change="sortChange">
            <el-table-column
                label="lenovoId"
                prop="lenovoId"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lenovoId" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.lenovoId }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.lenovoId }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="用户名"
                prop="userName"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.userName" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.userName }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.userName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="ASR可访问次数"
                prop="userDailyCloudasrCount"
                align="center">
                <template slot="header">
                    <el-tooltip effect="dark" content="ASR可访问次数" placement="top">
                    <span slot class="headlips">ASR可访问次数</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.userDailyCloudasrCount" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.userDailyCloudasrCount }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.userDailyCloudasrCount }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="TTS可访问次数"
                prop="userDailyCloudttsCount"
                align="center">
                <template slot="header">
                    <el-tooltip effect="dark" content="TTS可访问次数" placement="top">
                    <span slot class="headlips">TTS可访问次数</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.userDailyCloudttsCount" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.userDailyCloudttsCount }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.userDailyCloudttsCount }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="ASR当日使用次数"
                prop="dailyUseAsr"
                align="center"
                sortable="custom">
                <template slot="header">
                    <el-tooltip effect="dark" content="ASR当日使用次数" placement="top">
                    <span slot class="headlips">ASR当日使用次数</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dailyUseAsr" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.dailyUseAsr }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.dailyUseAsr }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="TTS当日使用次数"
                prop="dailyUseTts"
                align="center"
                sortable="custom">
                <template slot="header">
                    <el-tooltip effect="dark" content="TTS当日使用次数" placement="top">
                    <span slot class="headlips">TTS当日使用次数</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dailyUseTts" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.dailyUseTts }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.dailyUseTts }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="ASR历史使用次数"
                prop="historyUseAsr"
                align="center"
                sortable="custom">
                <template slot="header">
                    <el-tooltip effect="dark" content="ASR历史使用次数" placement="top">
                    <span slot class="headlips">ASR历史使用次数</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.historyUseAsr" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.historyUseAsr }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.historyUseAsr }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="TTS历史使用次数"
                prop="historyUseTts"
                align="center"
                sortable="custom">
                <template slot="header">
                    <el-tooltip effect="dark" content="TTS历史使用次数" placement="top">
                    <span slot class="headlips">TTS历史使用次数</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.historyUseTts" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.historyUseTts }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.historyUseTts }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="会议监控权限"
                prop="meetingService"
                align="center"
                :formatter="meeting">
                <template slot="header">
                    <el-tooltip effect="dark" content="会议监控权限" placement="top">
                    <span slot class="headlips">会议监控权限</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                label="添加时间"
                prop="createTime"
                align="center"
                :formatter="formTime"
                min-width="120">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="updateTime"
                align="center"
                :formatter="formTime2"
                min-width="120">
            </el-table-column>
            <el-table-column label="操作" align="center"  width="130" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="rowClick(scope.$index, scope.row)"
                        v-has="'userinfo:detail'">详情</el-button>
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'userinfo:update'">编辑</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- <i-table :list="list" :options="options" :columns="columns" :operates="operates"></i-table> -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
        </div>
          
        <el-dialog title="详情" :visible.sync="infoVisible" width="300" :before-close="handleClose">
            <el-form :label-position="'right'" label-width="140px" size="small">
                <el-form-item label="lenovoId">
                    <el-input type="text" v-model="infoList.lenovoId" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input type="text" v-model="infoList.userName" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="ASR可访问次数">
                    <el-input type="text" v-model="infoList.userDailyCloudasrCount" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="TTS可访问次数">
                    <el-input type="text" v-model="infoList.userDailyCloudttsCount" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="ASR历史使用次数">
                    <el-input type="text" v-model="infoList.historyUseAsr" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="TTS历史使用次数">
                    <el-input type="text" v-model="infoList.historyUseTts" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="ASR当日使用次数">
                    <el-input type="text" v-model="infoList.usedAsrCount" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="TTS当日使用次数">
                    <el-input type="text" v-model="infoList.usedTTSCount" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="ASR剩余可访问次数">
                    <el-input type="text" v-model="infoList.remainAsrCount" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="TTS剩余可访问次数">
                    <el-input type="text" v-model="infoList.remainTTSCount" auto-complete="off" readonly></el-input>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="ASR访问次数" prop="userDailyCloudasrCount">
                    <el-input type="text" v-model.trim="currentItem.userDailyCloudasrCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="TTS访问次数" prop="userDailyCloudttsCount">
                    <el-input type="text" v-model.trim="currentItem.userDailyCloudttsCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议监控权限" prop="meetingService">
                    <el-checkbox-group v-model="currentItem.meetingService">
                        <el-checkbox></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="ASR权限">
                    <el-checkbox-group v-model="currentItem.asrService">
                        <el-checkbox></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="TTS权限">
                    <el-checkbox-group v-model="currentItem.ttsService">
                        <el-checkbox></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {akskList,akskDetail,modinfy, userinfoUpdate} from '@/config/adminApi'
export default {
    data(){
        return{
            searchItem:{
                userName:''
            },
            list:[],
            perList:[],
            totalClass:'',
            checkList:[],
            infoList:{
                lenovoId:'',
                userName:'',
                userDailyCloudasrCount:'',
                userDailyCloudttsCount:'',
                ak:'',
                sk:'',
                historyUseAsr:'',
                historyUseTts:'',
                usedAsrCount:'',
                usedTTSCount:'',
                remainAsrCount:'',
                remainTTSCount:''
            },
            currentItem: {//编辑数据组
                id:"",
                lid:'',
                userDailyCloudasrCount:"",
                userDailyCloudttsCount:"",
                meetingService:null,
                asrService:null,
                ttsService:null
            },
            checkArr:'',
            editRules:{
                userDailyCloudasrCount:[{ required: true, message: '请输入访问次数', trigger: 'blur' }], 
                userDailyCloudttsCount:[{ required: true, message: '请输入访问次数', trigger: 'blur' }], 
            },
            column:{
                prop:'',
                order:''
            },
            user:'',
            id:'',
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            editVisible: false,
            editBtnLoading:false,
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
        if(this.perList.indexOf('userinfo:detail') == -1 && this.perList.indexOf('userinfo:update') == -1){
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
        meeting(row, column){
            return row.meetingService == '1' ? "是" : "否"
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = 1
            this.getList()
        },
        closeFun(currentItem){
            this.$nextTick(() => {
                if(this.$refs[currentItem]){
                this.$refs[currentItem].clearValidate();
                }
            })
        },
        handleEdit(index, row){
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                lid:row.lenovoId,
                userDailyCloudasrCount: row.userDailyCloudasrCount,
                userDailyCloudttsCount: row.userDailyCloudttsCount,
                meetingService:row.meetingService == '1' ? true : false,
                asrService:row.userService == '1' || row.userService == '3'? true : false,
                ttsService:row.userService == '2' || row.userService == '3'? true : false
            };
            
        },
        editHandleClose() {
            this.editVisible = false;
        },
        editHandleConfirm(currentItem) {
            let setService = null
            if(this.currentItem.asrService == true && this.currentItem.ttsService == true){
                setService = '3'
            }else if(this.currentItem.asrService == true && this.currentItem.ttsService == false){
                setService = '1'
            }else if(this.currentItem.asrService == false && this.currentItem.ttsService == true){
                setService = '2'
            }else if(this.currentItem.asrService == false && this.currentItem.ttsService == false){
                setService = '0'
            }
            let updParams = {
                id:this.currentItem.id,
                userDailyCloudasrCount:this.currentItem.userDailyCloudasrCount,
                userDailyCloudttsCount:this.currentItem.userDailyCloudttsCount,
                meetingService:this.currentItem.meetingService == true ? 1 : 0,
                userService:setService,
                lenovoId:this.currentItem.lid
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                this.editBtnLoading = true
                userinfoUpdate(updParams).then(res=>{
                        this.editBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:'编辑成功',
                            type:"success",
                            duration:1000
                        });
                        this.getList()
                        this.editVisible = false
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1000
                        });
                    }
                }).catch(err => {
                    this.editBtnLoading = false
                })
                } else {
                return false;
                }
            });
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
        sortChange(column){
            this.column = {
                prop:column.prop,
                order:column.order
            }
            console.log(this.column)
            this.getList()
        },
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                q:this.searchItem.userName,
                fieldName: this.column.prop,
                order:this.column.order == 'ascending' ? '0' : ''
            }
            akskList(params).then(res=>{
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }
            }).catch(()=>{
                this.listLoading = false
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
                    userDailyCloudasrCount:res.data.userDailyCloudasrCount,
                    userDailyCloudttsCount:res.data.userDailyCloudttsCount,
                    ak:res.data.lenovoKey,
                    sk:res.data.secretKey,
                    historyUseAsr:res.data.historyUseAsr,
                    historyUseTts:res.data.historyUseTts,
                    usedAsrCount:res.data.usedAsrCount,
                    usedTTSCount:res.data.usedTTSCount,
                    remainAsrCount:res.data.remainAsrCount,
                    remainTTSCount:res.data.remainTTSCount
                }
            })
        },
        handleCheck(val){
            console.log(val)
            this.checkList = val
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
            // console.log(`当前页: ${val}`);
            this.getList();
        },
    }
}
</script>

<style scoped>

</style>
