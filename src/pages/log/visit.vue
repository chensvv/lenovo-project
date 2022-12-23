<template>
    <div class="table height-135">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/list'}">应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="100px" class="demo-form-inline height100 width130" size="mini">
            <div class="form-input height100">
                <el-form-item label="页面唯一标识" prop="page">
                    <el-select v-model.trim="searchItem.page" placeholder="--" clearable>
                        <el-option v-for="item in pageList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model.trim="searchItem.type" placeholder="--" clearable>
                        <el-option v-for="item in opList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择时间" prop="pickerVal" class="picker-form">
                    <el-date-picker
                        :clearable="true"
                        v-model="pickerVal"
                        type="daterange"
                        align="center"
                        size="mini"
                        class="data-picker"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        @change="dateChangebirthday">
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
                <el-table-column
                    label="页面唯一标识"
                    prop="page"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.page" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.page }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.page }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="小时"
                    prop="hour"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.hour" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.hour }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.hour }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="次数(PV)"
                    prop="pv"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.pv" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.pv }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.pv }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户数(UV)"
                    prop="uv"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.uv" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.uv }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.uv }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="时间" prop="time" align="center" :formatter="formTime" min-width="120"></el-table-column>
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
import {visitList, visitPages} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {checkTime} from '@/utils/timer.js'
export default {
    data(){
        let vue = this
        return{
            pickerOptions: {
                disabledDate(time) {
                    let times = Date.now();
                    let timeOptionRange = vue.timeOptionRange;
                    let secondNum = 3600 * 1000 * 24 * 30;
                    if (timeOptionRange) {
                    return time.getTime() > timeOptionRange.getTime() + (Date.now() - timeOptionRange.getTime() < secondNum ? Date.now() - timeOptionRange.getTime() : secondNum) || time.getTime() < timeOptionRange.getTime() - secondNum;
                    }else{
                    return time.getTime() > times;
                    }
                    // return time.getTime() > Date.now();
                },
                onPick(time) {
                    //当第一时间选中才设置禁用
                    if (time.minDate && !time.maxDate) {
                        vue.timeOptionRange = time.minDate;
                    }
                    if (time.maxDate) {
                        vue.timeOptionRange = null;
                    }
                }
            },
            searchItem:{
                page:"",
                refreshTime:"",
                putTime:"",
                type:""
            },
            list:[],
            pageList:[],
            opList:[
                {id:1,label:"所有访问数"},
                {id:2,label:"每小时访问数"},
                {id:3,label:"每个页面访问数"},
                {id:4,label:"每时每页面访问数"}
            ],
            // 分页
            pickerVal:[],
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            btnLoading:false,
            listLoading:true,
            totalClass:'8'
        }
    },
    created(){
        this.searchItem.type = this.opList[0].id
        this.getList();
        this.getPages()
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
            var timer = row.time
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                checkTime(date.getMonth()+1)+'-'+
                checkTime(date.getDate())+' '+
                checkTime(date.getHours())+':'+
                checkTime(date.getMinutes())
        },
        dateChangebirthday(val) {
            if (val == null) val = []
                this.searchItem.refreshTime = val[0]
                this.searchItem.putTime = val[1]
        },
        getPages(){
            visitPages().then(res=>{
                this.pageList = res.data
            })
        },
        getList() {
            this.listLoading = true
            let params={
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                page:this.searchItem.page,
                type:this.searchItem.type,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            visitList(params).then(res => {
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = 1
            this.searchItem.type = this.opList[0].id
            this.getList()
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

<style>

</style>
