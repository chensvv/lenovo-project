<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="规则" prop="reg">
                    <el-input v-model.trim="searchItem.reg" clearable></el-input>
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
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading">
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
import {regList} from '@/config/api'
export default {
    data(){
        return{
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
        totalClass:''
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
        getList() {
            this.listLoading = true
            let params={
                reg:this.searchItem.reg,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            regList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }
            }).catch(()=>{
                this.listLoading = false
            })
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
