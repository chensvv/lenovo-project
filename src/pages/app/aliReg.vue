<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/list'}">应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="规则" prop="reg">
                    <el-input v-model.trim="searchItem.reg" clearable></el-input>
                </el-form-item>
            </div>
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
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
                    label="匹配规则"
                    prop="reg"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.reg" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.reg }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.reg }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="输出形式"
                    prop="result"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.result" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.result }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.result }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="规则描述"
                    prop="dsc"
                    align="left"
                    
                    :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <li v-if="currentPage == getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                    <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                    <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                    <li v-if="currentPage != getpageNum(totalCount) && getpageNum(totalCount) !=0" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                    <li v-if="currentPage+1 < 3 && currentPage != getpageNum(totalCount) && getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                    <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0 ? true : false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </div>
            
        
    </div>
</template>

<script>
import {regList} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
    data(){
        return{
            getpageNum:getpageNum,
            searchItem:{
                reg:""
            },
            list:[],
            // 分页
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
        turnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getList(pageNum)
            }else{
                ts.currentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    return false;
                }else{
                    ts.getList(pageNum)
                }
            }
        },
        getList() {
            this.listLoading = true
            let params={
                reg:this.searchItem.reg,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            regList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }else{
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }).catch(()=>{
                this.listLoading = false
            })
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
