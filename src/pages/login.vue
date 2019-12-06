<template>
    <div class="login">
        <div class="login_background">
            <img src="../../static/images/login1.png" alt="">
        </div>
            <div class="login-box">
                <transition name = "custom-classes-transition"
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX"
                mode="out-in"
                key="login">
                    <div class="loginn" v-if="loginShow">
                        <span class="form-title">语音服务管理系统</span>
                        <el-form :label-position="'left'" :model="loginForm" :rules="loginRules" ref="loginForm" @submit.native.prevent>
                            <el-form-item prop="username">
                                <el-input type="text" v-model.trim="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model.trim="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item class="btn_item">
                                <el-button type="primary" native-type="submit" @click="loginSubmit('loginForm')" :loading="loginLoading">登录</el-button>
                                <span native-type="submit" @click="register()" class="register_btn">注册</span>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="register" v-else key="register">
                        <span class="form-title">语音服务管理系统</span>
                        <el-form :label-position="'left'" :model="regForm" :rules="regRules" ref="regForm" @submit.native.prevent>
                            <el-form-item prop="username">
                                <el-input style="position:fixed; bottom:-9999px"></el-input>
                                <el-input type="text" v-model.trim="regForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input style="position:fixed; bottom:-9999px"></el-input>
                                <el-input v-model.trim="regForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item class="btn_item">
                                <el-button type="primary" native-type="submit" @click="regSubmit('regForm')" :loading="regLoading">注册</el-button>
                                <span native-type="submit" @click="register()" class="register_btn">登录</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
                
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
            regForm:{
                username:'',
                password:''
            },
            loginShow:true,
            loginLoading:false,
            regLoading:false,
            loginRules:{
                username:[{ required: true, message: '请输入用户名', trigger: 'change' }],
                password:[{ required: true, message: '请输入密码', trigger: 'change' }]  
            },
            regRules:{
                username:[{ required: true, message: '请输入用户名', trigger: 'change' }],
                password:[{ required: true, message: '请输入密码', trigger: 'change' }]  
            },
            menu:[]
        }
    },
    methods:{
        loginSubmit(loginForm){

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
        },
        regSubmit(regForm){
            this.$refs[regForm].validate((valid) => {
                if(valid){
                    alert('submit!');
                }else{
                    return false
                }
            })
        },
        register(){
            this.loginShow = !this.loginShow
        }
    }
}
</script>

<style scoped>
.login{
    background-color: #3CCDFF;
    background-image: linear-gradient(225deg,#3CCDFF 0%,#939BFF 50%,#65A8F0 100%);
    background-image: -webkit-linear-gradient(225deg,#3CCDFF 0%,#939BFF 50%,#65A8F0 100%);
    background-image: -moz-linear-gradient(225deg,#3CCDFF 0%,#939BFF 50%,#65A8F0 100%);
    background-image: -o-linear-gradient(225deg,#3CCDFF 0%,#939BFF 50%,#65A8F0 100%);
    width: 100%;
    height: 100%;
    min-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.login_background{
    width: 50%;
    height: 99%;
}
.login_background img{
    width: 100%;
    height: 100%;
}
.login-box {
    background: #fff;
    padding: 20px 50px 35px 50px;
    border-radius: 10px;
    width: 18%;
}

.login-box .form-title{
    display: block;
    text-align: center;
    padding-bottom: 30px;
    font-size: 20px;
}
.login-box .btn_item .el-form-item__content button{
    width: 100%;
    border-radius: 20px;
}
.register_btn{
    display: block;
    width: 100%;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 20px;
    text-align: center;
    margin-top: 10px;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
}
.fadeOutLeft-enter-active, .fadeOutLeft-leave-active {
  transition: opacity .5s;
}
.fadeOutLeft-enter, .fadeOutLeft-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
