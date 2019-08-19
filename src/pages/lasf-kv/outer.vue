<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>LASF KV</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline outer" size="mini">
            <el-form-item label="用户ID" prop="userId">
                <el-input v-model="searchItem.userId" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户指令" prop="domain">
                <el-input v-model="searchItem.domain" clearable></el-input>
            </el-form-item>
            <el-form-item label="解析领域" prop="domain">
                <el-input v-model="searchItem.domain" clearable></el-input>
            </el-form-item>
            <el-form-item label="响应状态" prop="respstatus">
                <el-select v-model="searchItem.respstatus" placeholder="--" clearable>
                    <el-option label="联想" value="联想"></el-option>
                    <el-option label="百度" value="百度"></el-option>
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
            <el-form-item class="width140">
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                style="width: 100%">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="用户ID"
                    prop="uid"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="用户指令"
                    prop="asrres"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="解析领域"
                    prop="domain">
                </el-table-column>
                <el-table-column
                    label="响应状态"
                    prop="respstatus"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="三方名称"
                    prop="outerType"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="接口名称"
                    prop="protname"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="时间"
                    prop="displayTime"
                    align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleInfo(scope.$index, scope.row)"
                        v-has="125">详情</el-button>
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
        <el-dialog title="详情" :visible.sync="infoVisible" width="300" :before-close="infoHandleClose">
            <el-form :label-position="'left'" label-width="100px">
                <el-form-item label="用户ID">
                <el-input type="text" v-model="infoList.uid" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                <el-input type="text" v-model="infoList.sblx" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="会话ID">
                <el-input type="text" v-model="infoList.hhID" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="来源类型">
                <el-input type="text" v-model="infoList.lylx" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="请求内容">
                <el-input type="textarea" v-model="infoList.content" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="响应头部信息">
                <el-input type="textarea" v-model="infoList.responseHeader" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="响应内容">
                <el-input type="textarea" v-model="infoList.xynr" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="请求消耗时间">
                <el-input type="text" v-model="infoList.qqxhsj" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="接口名称">
                <el-input type="text" v-model="infoList.jkmc" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="接口路径">
                <el-input type="text" v-model="infoList.jklj" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="响应状态">
                <el-input type="text" v-model="infoList.xyzt" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="错误信息">
                <el-input type="text" v-model="infoList.cwxx" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="三方名称">
                <el-input type="text" v-model="infoList.outerType" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="入库时间">
                <el-input type="text" v-model="infoList.displayTime" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="解析领域">
                <el-input type="text" v-model="infoList.jxly" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户指令">
                <el-input type="text" v-model="infoList.yhzl" auto-complete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="infoHandleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import iTable from "@/components/table";
import {checkTime} from '@/utils/timer.js'
import {outerList, outerInfo} from '@/config/api'
export default {
    name: "applicationlist",
    components: { iTable },
    data() {
        return {
            list: [],
            searchItem:{
                userId:"",
                domain:"",
                domain:"",
                respstatus:"",
                refreshTime:"",
                putTime:""
            },
            infoList:[],
            infoVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 30,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            seaBtnLoading:false,
        };
    },
    created() {
        this.getList();
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getList()
        },
        onSubmit(){
            console.log(this.searchItem)
            this.seaBtnLoading = true
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
            console.log(`当前页: ${val}`);
            this.getList();
        },
        handleInfo(index, row) {
            
            this.infoVisible = true;
            let infoParams = {
                id:row.id
            }
            outerInfo(infoParams).then(res=>{
                this.infoList = res.data
                console.log(this.infoList)
            })
        },
        infoHandleConfirm() {
            this.infoVisible = false;
        },
        infoHandleClose(){
            this.infoVisible = false;
        },
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                userId:this.searchItem.userId,
                asrres:this.searchItem.asrres,
                domain:this.searchItem.domain,
                respstatus:this.searchItem.respstatus,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime
            }
            outerList(params).then(res => {
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
        }
    }
};
</script>

<style scoped>

</style>
