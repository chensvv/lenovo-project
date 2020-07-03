<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button class="success" size="mini" @click="handleAdd()">添加</el-button> -->
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="应用名" prop="appName">
                <el-input v-model.trim="searchItem.appName" clearable></el-input>
            </el-form-item>
            <el-form-item label="来自于" prop="source">
                <el-select v-model.trim="searchItem.source" placeholder="--" clearable>
                <el-option label="联想" value="lenovo"></el-option>
                <el-option label="百度" value="baidu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="起始时间" prop="refreshTime">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.refreshTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="putTime">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.putTime"
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column label="应用名" prop="name" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="类别"
                    prop="cat"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="平台"
                    prop="platform"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="费用"
                    prop="fee"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="积分"
                    prop="score"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="下载次数"
                    prop="dnum"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="来自"
                    prop="source"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updateTime"
                    align="center"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    label="入库时间"
                    prop="createTime"
                    align="center"
                    :formatter="formTime"
                    min-width="120">
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
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {appList} from '@/config/api'
export default {
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    let times = Date.now() - 24 * 60 * 60 * 1000;
                    return time.getTime() > times;
                },
            },
            list: [],
            searchItem:{//搜索数据组
                appName:"",
                source:"",
                refreshTime:"",
                putTime:""
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            btnLoading:false,
            listLoading:true,
        };
    },
    created() {
        this.getList();
    },
    methods: {
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
            this.currentPage = 1
            this.btnLoading = true
            this.getList();
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
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                appname:this.searchItem.appName,
                source:this.searchItem.source
            }
            appList(params).then(res => {
                this.listLoading = false
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
        }
    }
};
</script>

<style scoped>
</style>
