<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/csc/csc'}">IOT领域</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="Lenovoid" prop="lenovoid">
                    <el-input v-model.trim="searchItem.lenovoid" clearable></el-input>
                </el-form-item>
            </div>
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
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
                <el-table-column type="index" align="center" label="#">
                </el-table-column>
                <el-table-column
                    label="Lenovoid"
                    prop="lenovoid"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lenovoid" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.lenovoid }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.lenovoid }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="设备名称"
                    prop="modelName"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.modelName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.modelName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.modelName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="设备别名"
                    prop="friendlyName"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.friendlyName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.friendlyName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.friendlyName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="设备描述"
                    prop="friendlyDescription"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.friendlyDescription" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.friendlyDescription }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.friendlyDescription }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="制造商名称"
                    prop="manufacturerName"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.manufacturerName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.manufacturerName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.manufacturerName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updateTime"
                    align="center"
                    :formatter="formTime"
                    min-width="120">
                </el-table-column>
                <el-table-column label="操作" min-width="150" align="center"  v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleControl(scope.$index, scope.row)"
                        v-has="'iot:control'">控制</el-button>
                        <el-button
                        size="mini"
                        @click="handleInfo(scope.$index, scope.row)"
                        v-has="'iot:info'">详情</el-button>
                        <el-button
                        size="mini"
                        @click="handleAdd(scope.$index, scope.row)"
                        v-has="'iot:pull'">拉取</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'iot:delete'">删除</el-button>
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
        <el-dialog :visible.sync="infoVisible" width="40%" top="10vh" :before-close="infoHandleClose">
            <el-descriptions direction="vertical" :column="1" border>
                <el-descriptions-item label="Lenovoid">{{infoItem.lenovoid}}</el-descriptions-item>
                <el-descriptions-item label="设备类型">{{infoItem.applianceTypes}}</el-descriptions-item>
                <el-descriptions-item label="设备标识符">{{infoItem.applianceId}}</el-descriptions-item>
                <el-descriptions-item label="设备型号名称">{{infoItem.modelName}}</el-descriptions-item>
                <el-descriptions-item label="设备版本">{{infoItem.version}}</el-descriptions-item>
                <el-descriptions-item label="设备名称">{{infoItem.friendlyName}}</el-descriptions-item>
                <el-descriptions-item label="设备描述">{{infoItem.friendlyDescription}}</el-descriptions-item>
                <el-descriptions-item label="是否可用">{{infoItem.reachable == 0 ? '否' : '是'}}</el-descriptions-item>
                <el-descriptions-item label="支持的操作类型">{{infoItem.actions}}</el-descriptions-item>
                <el-descriptions-item label="附加信息">{{infoItem.additionalDetails}}</el-descriptions-item>
                <el-descriptions-item label="设备厂商名称">{{infoItem.manufacturerName}}</el-descriptions-item>
                <el-descriptions-item label="属性名称">{{infoItem.attributes}}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{infoItem.updateTime | timer}}</el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="infoHandleClose">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="controlTitle" :visible.sync="controlVisible" width="40%" top="10vh" :before-close="controlHandleClose">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="controlRules" :model="controlList" ref="controlList">
                <el-form-item label="开关">
                    <el-switch v-model="controlItem.value" active-value="ON" inactive-value="OFF" :disabled="switchDisabled"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="conBtnLoading" @click="controlHandleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {iotList, iotDel, iotPull, sceneControl} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data() {
        return {
            list: [],
            perList:[],
            totalClass:'8',
            searchItem:{//搜索数据组
                lenovoid:""
            },
            infoItem:[],
            controlItem:[],
            controlTitle:"",
            controlList:[],
            switchDisabled:false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            infoVisible:false,
            controlVisible:false,
            seaBtnLoading:false,
            conBtnLoading:false,
            listLoading:true,
            isshow:true
        };
    },
    created() {
        let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
        perArr.map(t=>{
            this.perList.push(Object.values(t).join())
        })
        this.getList();
    },
    mounted(){
        if(this.perList.indexOf('iot:pull') == -1 && this.perList.indexOf('iot:delete') == -1 && this.perList.indexOf('iot:info') == -1 && this.perList.indexOf('iot:control') == -1){
            this.isshow = false
        }
    },
    filters:{
        timer(val){
            var date = new Date(val)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        }
    },
    methods: {
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
            var timer = row.updateTime
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        },
        findItem(options, name) {
            return options.find(item => item.name === name) || {};
        },
        generateMixed(n) {
            var chars = ['0','1','2','3','4','5','6','7','8','9',
                        'A','B','C','D','E','F','G','H','I','J','K','L','M',
                        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var res = "";
            for(var i = 0; i < n ; i++) {
                var id = Math.floor(Math.random()*36);
                res += chars[id];
            }
            return res;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = 1
            this.getList();
        },
        onSubmit(){
            this.seaBtnLoading = true
            this.currentPage = 1
            this.getList()
            this.seaBtnLoading = false
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
        handleInfo(index, row) {
            // console.log(index, row);
            this.infoVisible = true;
            this.infoItem = row;
        },
        handleControl(index, row) {
            // console.log(index, row);
            this.controlList = row
            this.controlTitle = row.friendlyName
            let attributes = JSON.parse(row.attributes)
            this.controlItem = this.findItem(attributes, 'turnOnState')
            this.controlVisible = true;
        },
        infoHandleClose(){
            this.infoVisible = false
        },
        controlHandleClose(){
            this.controlVisible = false
        },
        controlHandleConfirm(){
            this.conBtnLoading = true
            let params = {
                header:{
                    namespace:"ZUI.SmartHome.Control",
                    name:this.controlItem.value == 'ON' ? 'TurnOnRequest' :'TurnOffRequest',
                    messageId:this.generateMixed(20),
                    payloadVersion:"1"
                },
                payload:{
                    lenovoId:String(this.controlList.lenovoid),
                    appliance:{
                        additionalApplianceDetails:JSON.parse(this.controlList.additionalDetails),
                        applianceId:this.controlList.applianceId
                    },
                    function:"light"
                }
            }
            sceneControl(params).then(res=>{
                this.conBtnLoading = false
                console.log(res)
                if(res.data.code == 200){
                    this.$message({
                        message:'控制成功',
                        type:"success",
                        duration:1500
                    });
                    this.getList();
                    this.controlVisible = false
                }else{
                    this.$message({
                        message:res.data.msg,
                        type:"error",
                        duration:1500
                    });
                }
            }).catch(err=>{
                this.conBtnLoading = false
            })
            
        },
        handleDel(index, row) {
            let delParams = {
                id:row.id
            }
            delParams.sign = deleteParams(delParams)
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                iotDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:1500
                        });
                        this.getList();
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1500
                        });
                    }
                    
                })
            }).catch(() => {
                console.log("no");
            });
        },
        openFun(addList){
            this.$nextTick(() => {
                if(this.$refs[addList]){
                    this.$refs[addList].resetFields();
                }
            })
        },
        closeFun(currentItem){
            this.$nextTick(() => {
                if(this.$refs[currentItem]){
                    this.$refs[currentItem].clearValidate();
                }
            })
        },
        handleAdd(index, row){
            let addParams = {
                lenovoid:row.lenovoid
            }
            iotPull(addParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'添加成功',
                            type:"success",
                            duration:1500
                        });
                        this.getList();
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:"error",
                            duration:1500
                        });
                    }
                    
                })
        },
        
        getList() {
            this.listLoading = true
            let params = {
                lenovoid:this.searchItem.lenovoid,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            iotList(params).then(res => {
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
    },
};
</script>

<style scoped>
</style>
