<template>
    <div class="table">
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
            <el-form-item label="起始时间" prop="refreshTime" class="width140">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.refreshTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="putTime" class="width140">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.putTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item class="sub-btn">
                <el-button type="primary" @click="onSubmit" size="mini" :loading="btnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')" size="mini">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'app:cacheadd'">添加</el-button>
            </el-form-item>
            
        </el-form>
        <div class="table-box">
             <el-table
            :data="list"
            :class="this.totalCount < 5 ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="名称"
                prop="name"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="拼音"
                prop="pinyin"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="类型"
                prop="atype"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="类别"
                prop="cname"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="是否别名"
                prop="isAlias"
                 align="center"
                :formatter="aliasVal">
            </el-table-column>
            <el-table-column
                label="原名"
                prop="sname"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="是否索引"
                prop="isIndex"
                align="center"
                :formatter="indexVal">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="upTime"
                 align="center"
                :formatter="formTime"
                min-width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" v-if="isshow">
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
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
        </div>
         
        
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="应用名" prop="name">
                    <el-input type="text" v-model.trim="addList.name"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                    <el-input type="text" v-model.trim="addList.alias" auto-complete="off" placeholder="别名对应的原始名 — 只对别名有效"></el-input>
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
            pickerOptions: {
                disabledDate(time) {
                let times = Date.now() - 24 * 60 * 60 * 1000;
                return time.getTime() > times;
                },
            },
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
            perList:[],
            addRules:{
                name:[{ required: true, message: '请输入应用名', trigger: 'change' }],
                alias:[{ required: true, message: '请输入别名', trigger: 'change' }],
            },
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            btnLoading:false,
            addVisible:false,
            addBtnLoading:false,
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
        if(this.perList.indexOf('app:cachedel') == -1){
            this.isshow = false
        }
    },
    methods:{
        getList() {
            this.listLoading = true
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
                this.listLoading = false
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
        indexVal(row,column){
            return row.isIndex == true ? '是' : '否'
        },
        aliasVal(row,column){
            return row.isAlias == true ? '是' : '否'
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.currentPage = 1
            this.getList();
        },
        onSubmit(){
            this.btnLoading = true
            this.currentPage = 1
            this.listLoading = true
            this.getList()
            this.btnLoading = false
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.listLoading = true
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.listLoading = true
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
        }).catch(err => {
            console.log(err);
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
                        this.addBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:'添加成功',
                            type:"success",
                            duration:1000
                        });
                        this.getList()
                        this.addVisible = false
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1000
                        });
                    }
                    
                }).catch(err => {
                    this.addBtnLoading = false
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
