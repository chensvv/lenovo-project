<template>
    <div class="joke">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline cache" size="mini">
            <el-form-item label="名字" prop="name">
                <el-input v-model.trim="searchItem.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input v-model.trim="searchItem.type" clearable></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="cn">
                <el-input v-model.trim="searchItem.cn" clearable></el-input>
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
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
            </el-form-item>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="'app:cacheadd'">添加</el-button>
        </el-form>
          <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="名称"
                prop="name"
                align="center">
            </el-table-column>
            <el-table-column
                label="拼音"
                prop="pinyin"
                align="center">
            </el-table-column>
            <el-table-column
                label="类型"
                prop="atype"
                align="center">
            </el-table-column>
            <el-table-column
                label="类别"
                prop="cname"
                 align="center">
            </el-table-column>
            <el-table-column
                label="是否别名"
                prop="isAlias"
                 align="center"
                :formatter="formVal">
            </el-table-column>
            <el-table-column
                label="原名"
                prop="sname"
                 align="center">
            </el-table-column>
            <el-table-column
                label="是否索引"
                prop="isIndex"
                 align="center"
                :formatter="formVal">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="upTime"
                 align="center"
                :formatter="formTime">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                     v-has="'app:cachedel'"
                    @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
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
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="应用名" prop="name">
                <el-input type="text" v-model.trim="addList.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                <el-input type="text" v-model.trim="addList.alias" auto-complete="off"></el-input>
                <span style="font-size:12px;">别名对应的原始名—只对别名有效</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {cacheList, cacheDel, cacheAdd} from '@/config/api'
export default {
    data(){
        return{
            searchItem:{
                name:"",
                type:"",
                cn:"",
                refreshTime:"",
                putTime:""
            },
            addList: {//添加数据组
                name:"",
                alias:""
            },
            list:[],
            addRules:{
                name:[{ required: true, message: '应用名', trigger: 'change' }],
                alias:[{ required: true, message: '', trigger: 'change' }],
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            btnLoading:false,
            addVisible:false,
            addBtnLoading:false
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                name:this.searchItem.name,
                type:this.searchItem.type,
                cn:this.searchItem.cn
            }
            cacheList(params).then(res => {
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
        },
        formTime(row, column){
            var timer = row.upTime
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        },
        formVal(row,column){
            return row.isIndex === true ? 'true' : 'false'
            return row.isAlias === true ? 'true' : 'false'
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = 1
            this.getList();
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
        handleDel(index, row){
            let delParams = {
                name:row.name
            }
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                cacheDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                                message:'删除成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList();
                    }else{
                        this.$message.error('错误')
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
    addHandleClose(){
        this.addVisible = false
    },
    handleAdd(){
        this.addVisible = true
    },
    addHandleConfirm(addList) {
        let addParams = {
            name:this.addList.name,
            alias:this.addList.alias
        }
        this.$refs[addList].validate((valid) => {
            if (valid) {
                this.addBtnLoading = true
                cacheAdd(addParams).then(res => {
                    if(res.data.code == 200){
                        this.$message({
                            message:'添加成功',
                            type:"success",
                            duration:1000
                        });
                        this.getList()
                        this.addBtnLoading = false
                        this.addVisible = false
                    }else{
                        this.addBtnLoading = false
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1000
                        });
                    }
                    
                })
            } else {
                return false;
            }
        });
    },
}
}
</script>

<style scoped>

</style>
