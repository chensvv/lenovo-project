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
                <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
                    <template slot-scope="scope">
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
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {iotList, iotDel, iotPull} from '@/config/api'
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
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            infoVisible:false,
            seaBtnLoading:false,
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
        if(this.perList.indexOf('iot:pull') == -1 && this.perList.indexOf('iot:delete') == -1 && this.perList.indexOf('iot:info') == -1){
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
        infoHandleClose(){
            this.infoVisible = false
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
                            duration:1000
                        });
                        this.getList();
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1000
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
                            duration:1000
                        });
                        this.getList();
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:"error",
                            duration:1000
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
                        duration:1000
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
