<template>
    <div class="login">
        <div class="login-box">
        <el-form :label-position="'left'" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密  码" prop="password">
                <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('loginForm')" :loading="loginLoading">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>

import qs from 'qs'

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
        }
    },
    methods: {
        onSubmit(loginForm){
            
            var url = "http://api.baxiaobu.com/index.php/home/v1/login";

            var params = {
                username:this.loginForm.username,
                pwd:this.loginForm.password
            }
            params = qs.stringify(params);
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    this.loginLoading=true
                    this.$http.post(url, params).then((res)=>{
                        if(res.data.status == 200){
                            this.$message({
                                message:res.data.message,
                                type:"success",
                                duration:1000
                            });
                            this.loginLoading = false
                            localStorage.setItem('user_id', res.data.data.user_id);
                            localStorage.setItem('username',res.data.data.user_name)
                            this.$router.push('/home')
                        }else if(res.data.status == 400){
                            this.loginLoading = false
                            this.$message.error(res.data.message);
                        }
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
    margin: 200px auto;
}

.login-box .el-button {
    width: 100%;
}
</style>
