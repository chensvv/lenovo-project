<template>
    <div class="table state">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/gift/add'}">报表系统</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form ref="searchItem" :model="searchItem" :rules="addRules" class="demo-form-inline state" size="medium">
            <el-form-item label="查询sql" prop="sql">
                <el-input type="textarea" v-model="searchItem.sql" clearable auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="报表名称" prop="name">
                <el-input v-model.trim="searchItem.name" clearable auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('searchItem')" :loading="seaBtnLoading">新增</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {stateAdd} from '@/config/api'
import {login} from '@/config/adminApi'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    inject:['reload'],
    data() {
        return {
            searchItem:{//搜索数据组
                name:"",
                sql:''
            },
            seaBtnLoading:false,
            addRules:{
                sql:[{ required: true, message: '请输入查询sql', trigger: 'change' }],
                name:[{ required: true, message: '请输入报表名称', trigger: 'change' }],
            },
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(searchItem){
            this.$refs[searchItem].validate((valid) => {
                if (valid) {
                    this.seaBtnLoading = true
                    let params = {
                        name:this.searchItem.name,
                        sql:this.searchItem.sql
                    }
                    let logParams = {
                        userName:sessionStorage.getItem('username'),
                        password:sessionStorage.getItem('log')
                    }
                    params.sign = deleteParams(params)
                    logParams.sign = deleteParams(logParams)
                    stateAdd(params).then(res => {
                        if(res.data.code == 200){
                            this.$message({
                                message:'请求成功',
                                type:"success",
                                duration:1000
                            });
                            this.seaBtnLoading = false
                            sessionStorage.removeItem('menuData')
                            sessionStorage.removeItem('btnpermission')
                            login(logParams).then((res)=>{
                                if(res.data.code == 200){
                                    sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                    this.reload();
                                }else{
                                    this.$message({
                                        message:res.data.errorMessage,
                                        type:"error",
                                        duration:1000
                                    });
                                }
                            })
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1000
                            });
                        } 
                        
                    })
                }
            })
            
            
        }
    },
};
</script>

<style scoped>
</style>
