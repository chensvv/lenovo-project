<template>
    <div class="login">
        <div class="login-box">
        <el-form :label-position="'left'" :model="loginForm" :rules="loginRules" ref="loginForm" @submit.native.prevent label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model.trim="loginForm.username" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密  码" prop="password">
                <el-input type="password" v-model.trim="loginForm.password" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" @click="onSubmit('loginForm')" :loading="loginLoading">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
import {login} from '@/config/adminApi'
import qs from 'qs' 
import axios from 'axios'
export default {
    data(){
        return {
            loginForm:{
                username:'',
                password:'',
            },
            loginLoading:false,
            loginRules:{
                username:[{ required: true, message: '请输入用户名', trigger: 'change' }],
                password:[{ required: true, message: '请输入密码', trigger: 'change' }]  
            },
            menu:[]
        }
    },
    methods:{
        onSubmit(loginForm){

            var params = {
                userName:this.loginForm.username,
                password:this.loginForm.password
            }
            // params = qs.stringify(params);
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    this.loginLoading=true
                    login(params).then((res)=>{
                        if(res.data.code == 200){
                            sessionStorage.setItem('username',this.loginForm.username)
                            // this.$store.dispatch('menuData',res.data)
                            sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                            
                            this.$router.push('/home')
                            this.loginLoading = false
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1000
                            });
                            this.loginLoading = false
                        }
                    }).catch(err=>{
                        
                        this.loginLoading = false
                    })
                } else {
                    return false;
                }
            });
            
                
            
        }
    }
}
</script>

<style scoped>

.login-box {
    width: 300px;
    margin: 0 auto;
    padding-top: 200px;
}

.login-box .el-button {
    width: 100%;
}
</style>
