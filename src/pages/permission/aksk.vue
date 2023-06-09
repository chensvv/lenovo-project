<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/permission/role'}">权限管理</el-breadcrumb-item>
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
            stripe
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            @sort-change="sortChange"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <!-- <el-table-column
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
            </el-table-column> -->
            <el-table-column
                label="用户名"
                prop="userName"
                align="center">
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
                        {{ scope.row.userDailyCloudasrCount  <= -99 ? '∞' : scope.row.userDailyCloudasrCount}}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle" :class="scope.row.userDailyCloudasrCount <= -99 ? 'fontSize30' : ''">
                        {{ scope.row.userDailyCloudasrCount <= -99 ? '∞' : scope.row.userDailyCloudasrCount}}
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
                        {{ scope.row.userDailyCloudttsCount <= -99 ? '∞' : scope.row.userDailyCloudttsCount}}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle" :class="scope.row.userDailyCloudttsCount <= -99 ? 'fontSize30' : ''">
                        {{ scope.row.userDailyCloudttsCount <= -99 ? '∞' : scope.row.userDailyCloudttsCount}}
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
                        {{ scope.row.dailyUseAsr == null ? '0' : scope.row.dailyUseAsr }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.dailyUseAsr == null ? '0' : scope.row.dailyUseAsr }}
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
                        {{ scope.row.dailyUseTts == null ? '0' : scope.row.dailyUseTts }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.dailyUseTts == null ? '0' : scope.row.dailyUseTts }}
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
            <!-- <el-table-column
                label="会议监控权限"
                prop="meetingService"
                align="center"
                :formatter="meeting">
                <template slot="header">
                    <el-tooltip effect="dark" content="会议监控权限" placement="top">
                    <span slot class="headlips">会议监控权限</span>
                    </el-tooltip>
                </template>
            </el-table-column> -->
            <el-table-column
                label="添加时间"
                prop="createTime"
                align="center"
                :formatter="formTime"
                width="130">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="updateTime"
                align="center"
                :formatter="formTime2"
                width="130">
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
          
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="infoVisible" width="40%" top="10vh" :before-close="handleClose" class="aksk-info">
            <el-descriptions>
                <el-descriptions-item label="lenovoId">{{infoList.lenovoId}}</el-descriptions-item>
                <el-descriptions-item label="用户名">{{infoList.userName}}</el-descriptions-item>
                <el-descriptions-item label="ASR可访问次数">{{infoList.userDailyCloudasrCount <= -99 ? '∞' : infoList.userDailyCloudasrCount}}</el-descriptions-item>
                <el-descriptions-item label="TTS可访问次数">{{infoList.userDailyCloudttsCount <= -99 ? '∞' : infoList.userDailyCloudttsCount}}</el-descriptions-item>
                <el-descriptions-item label="ASR历史使用次数">{{infoList.historyUseAsr}}</el-descriptions-item>
                <el-descriptions-item label="TTS历史使用次数">{{infoList.historyUseTts}}</el-descriptions-item>
                <el-descriptions-item label="ASR当日使用次数">{{infoList.usedAsrCount}}</el-descriptions-item>
                <el-descriptions-item label="TTS当日使用次数">{{infoList.usedTTSCount}}</el-descriptions-item>
                <el-descriptions-item label="ASR剩余可访问次数">{{infoList.remainAsrCount <= -99 ? '∞' : infoList.remainAsrCount}}</el-descriptions-item>
                <el-descriptions-item label="TTS剩余可访问次数">{{infoList.remainTTSCount <= -99 ? '∞' : infoList.remainTTSCount}}</el-descriptions-item>
                <el-descriptions-item label="会议监控权限">{{infoList.meetingService =='1' ? "是" : "否"}}</el-descriptions-item>
                <el-descriptions-item label="历史AK">{{infoList.oldLenovoKey}}</el-descriptions-item>
                <el-descriptions-item label="历史SK">{{infoList.oldSecretKey}}</el-descriptions-item>
                <el-descriptions-item label="历史AK、SK过期时间">{{infoList.oldTimeOut}}</el-descriptions-item>
            </el-descriptions>
            <el-form :label-position="'right'" label-width="80px" size="small" :rules="infoRules" :model="infoList" ref="infoList">
                <el-form-item label="AK">
                    <el-input type="text" v-model="infoList.ak" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="SK">
                    <el-input type="text" v-model="infoList.sk" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="过期时间" prop="outDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="infoList.outDate" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="getAkSk('infoList')" :loading="regLoading" v-has="'userinfo:modify'">更新AKSK</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleConfirm()">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="ASR访问次数" prop="userDailyCloudasrCount">
                    <el-input type="text" v-model.trim="currentItem.userDailyCloudasrCount" auto-complete="off" :class="currentItem.asrChecked == true ? 'text-d': ''" :disabled="currentItem.asrChecked"></el-input>
                    <el-checkbox v-model="currentItem.asrChecked" @change="asrChange">不限制</el-checkbox>
                </el-form-item>
                <el-form-item label="TTS访问次数" prop="userDailyCloudttsCount">
                    <el-input type="text" v-model.trim="currentItem.userDailyCloudttsCount" auto-complete="off" :class="currentItem.ttsChecked == true ? 'text-d': ''" :disabled="currentItem.ttsChecked"></el-input>
                    <el-checkbox v-model="currentItem.ttsChecked" @change="ttsChange">不限制</el-checkbox>
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
                <el-form-item label="是否禁用">
                    <el-checkbox-group v-model="currentItem.userStatus">
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
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data(){
        return{
            pickerOptions: {
            disabledDate(v) {
                    return v.getTime() < new Date().getTime() - 86400000;//  - 86400000是否包括当天
                }
            },
            searchItem:{
                userName:''
            },
            list:[],
            perList:[],
            totalClass:'8',
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
                remainTTSCount:'',
                oldLenovoKey:"",
                oldSecretKey:"",
                oldTimeOut:"",
                outDate:""
            },
            currentItem: {//编辑数据组
                id:"",
                lid:'',
                userDailyCloudasrCount:"",
                userDailyCloudttsCount:"",
                meetingService:null,
                asrService:null,
                ttsService:null,
                asrChecked:false,
                ttsChecked:false,
                userStatus:null
            },
            checkArr:'',
            editRules:{
                userDailyCloudasrCount:[{ required: true, message: '请输入访问次数', trigger: 'blur' }], 
                userDailyCloudttsCount:[{ required: true, message: '请输入访问次数', trigger: 'blur' }], 
            },
            infoRules:{
                outDate:[{ required: true, message: '请选择过期时间', trigger: 'blur' }]
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
        asrChange(val){
            if(val == false){
                if(this.currentItem.userDailyCloudasrCount == -99){
                    this.currentItem.userDailyCloudasrCount = ''
                }
            }else{
                if(this.currentItem.userDailyCloudasrCount == ''){
                    this.currentItem.userDailyCloudasrCount = -99
                }
            }
        },
        ttsChange(val){
            if(val == false){
                if(this.currentItem.userDailyCloudttsCount == -99){
                    this.currentItem.userDailyCloudttsCount = ''
                }
            }else{
                if(this.currentItem.userDailyCloudttsCount == ''){
                    this.currentItem.userDailyCloudttsCount = -99
                }
            }
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
                ttsService:row.userService == '2' || row.userService == '3'? true : false,
                asrChecked: row.userDailyCloudasrCount <= -99 ? true : false,
                ttsChecked: row.userDailyCloudttsCount <= -99 ? true : false,
                userStatus: row.userStatus == 0 ? false : true
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
                userDailyCloudasrCount:this.currentItem.asrChecked == false ? this.currentItem.userDailyCloudasrCount : -99,
                userDailyCloudttsCount:this.currentItem.ttsChecked == false ? this.currentItem.userDailyCloudttsCount : -99,
                meetingService:this.currentItem.meetingService == true ? 1 : 0,
                userStatus:this.currentItem.userStatus == true ? 1 : 0,
                userService:setService,
                lenovoId:this.currentItem.lid
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                this.editBtnLoading = true
                userinfoUpdate(updParams).then(res=>{
                        this.editBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:'编辑成功',
                            type:"success",
                            duration:1500
                        });
                        this.getList()
                        this.editVisible = false
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1500
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
        getAkSk(infoList){
            let detailParams = {
                userName:this.infoList.userName,
                lenovoId:this.infoList.lenovoId,
                timeOut:this.infoList.outDate
            }
            detailParams.sign = deleteParams(detailParams)
            this.$refs[infoList].validate((valid) => {
                if (valid) {
                    modinfy(detailParams).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message:'更新成功',
                                type:"success",
                                duration:1500
                            });
                            this.getAkSkDetail();
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1500
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            })
            
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
            params.sign = deleteParams(params)
            akskList(params).then(res=>{
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data
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
        rowClick(index,row){
            this.infoVisible = true
            this.user = row.userName
            this.id = row.lenovoId
            this.getAkSkDetail()
        },
        getAkSkDetail(){
            let detailsParams = {
                userName:this.user,
                lenovoId:this.id
            }
            detailsParams.sign = deleteParams(detailsParams)
            akskDetail(detailsParams).then(res=>{
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
                    remainTTSCount:res.data.remainTTSCount,
                    oldTimeOut:res.data.oldTimeOut == null ? '' : new Date(res.data.oldTimeOut).getFullYear()+'-'+checkTime(new Date(res.data.oldTimeOut).getMonth()+1)+'-'+checkTime(new Date(res.data.oldTimeOut).getDate()),
                    oldLenovoKey:res.data.oldLenovoKey,
                    oldSecretKey:res.data.oldSecretKey
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
