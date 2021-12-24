<template>
    <div class="login">
        <div class="login_background">
            <img src="../../static/images/login1.png" alt="">
        </div>
            <div class="login-box">
                    <div class="loginn" v-if="loginShow">
                        <span class="form-title">联想语音管理系统</span>
                        <el-form :label-position="'left'" :model="loginForm" :rules="loginRules" ref="loginForm" @submit.native.prevent>
                            <el-form-item prop="username">
                                <el-input type="text" v-model.trim="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model.trim="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="imgCode" class="imgcode-item">
                                <el-input type="text" v-model.trim="loginForm.imgCode" placeholder="验证码" auto-complete="off" clearable></el-input>
                                <img :src="limgCode" class="img" @click="getImgCode()">
                            </el-form-item>
                            <el-form-item class="btn_item">
                                <el-button type="primary" native-type="submit" @click="loginSubmit('loginForm')" :loading="loginLoading">登录</el-button>
                                <span native-type="submit" @click="register()" class="register_btn">注册</span>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="register" v-else key="register">
                        <span class="form-title">联想语音管理系统</span>
                        <el-form :label-position="'left'" :model="regForm" :rules="regRules" ref="regForm" @submit.native.prevent>
                            <el-form-item prop="username">
                                <el-input style="position:fixed; bottom:-9999px"></el-input>
                                <el-input type="text" v-model.trim="regForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input style="position:fixed; bottom:-9999px"></el-input>
                                <el-input v-model.trim="regForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="regCode" class="imgcode-item">
                                <el-input type="text" v-model.trim="regForm.regCode" placeholder="验证码" auto-complete="off" clearable></el-input>
                                <img :src="limgCode" class="img" @click="getImgCode()">
                            </el-form-item>
                            <el-form-item class="btn_item">
                                <el-button type="primary" native-type="submit" @click="regSubmit('regForm')" :loading="regLoading">注册</el-button>
                                <span native-type="submit" @click="register()" class="register_btn">登录</span>
                            </el-form-item>
                        </el-form>
                    </div>
        </div>
        
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64
import {login,userReg,userMenu,logImgCode} from '@/config/adminApi'
import qs from 'qs' 
import axios from 'axios'
export default {
    data(){
        let ValidatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        }
        return {
            limgCode:'',
            uuid:'',
            loginForm:{
                username:'',
                password:'',
                imgCode:''
            },
            regForm:{
                username:'',
                password:'',
                regCode:''
            },
            loginShow:true,
            loginLoading:false,
            regLoading:false,
            loginRules:{
                username:[{ required: true, message: '请输入用户名', trigger: 'change' }],
                password:[{ required: true, message: '请输入密码', trigger: 'change' }],
                imgCode:[{ required: true, message: '请输入验证码', trigger: 'change' }]
            },
            regRules:{
                username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password:[{ required: true, validator: ValidatePass, trigger: 'blur' },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码限制8-16字符且必须包含大小写英文及数字',trigger: 'blur' }],
                regCode:[{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            menu:[]
        }
    },
    created(){
        this.getImgCode()
    },
    methods:{
        loginSubmit(loginForm){

            let params = {
                userName:this.loginForm.username,
                password:this.loginForm.password,
                imgCode:this.loginForm.imgCode,
                ucode:this.uuid
            }
            let u_params = {
                 userName:this.loginForm.username,
            }
            // params = qs.stringify(params);
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    this.loginLoading=true
                    login(params).then((res)=>{
                        if(res.data.code == 200){
                            sessionStorage.setItem('username',Base64.encode(this.loginForm.username))
                            let paramss = {'t': res.data.data};
                            var datas = Object.assign(paramss, { startTime: new Date().getTime() });
                            sessionStorage.setItem("token", JSON.stringify(datas));
                            // sessionStorage.setItem('log',Base64.encode(this.loginForm.password))
                            userMenu(u_params).then(res=>{
                                sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                this.$router.push('/')
                            })
                            this.loginLoading = false
                        }else{
                            this.getImgCode()
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1000
                            });
                            this.loginLoading = false
                        }
                    }).catch(err=>{
                        this.getImgCode()
                        this.loginLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        regSubmit(regForm){
            let regParams={
                userName:this.regForm.username,
                password:this.regForm.password,
                imgCode:this.regForm.regCode,
                ucode:this.uuid
            }
            this.$refs[regForm].validate((valid) => {
                if(valid){
                    userReg(regParams).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message:'注册成功，请登录',
                                type:"success",
                                duration:1000
                            });
                            this.loginShow = !this.loginShow
                        }else{
                            this.getImgCode()
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1000
                            });
                        }
                        
                    }).catch(err=>{
                        this.getImgCode()
                        this.$message({
                            message:'服务器错误，请稍后重试！',
                            type:"error",
                            duration:1000
                        });
                    })
                }else{
                    return false
                }
            })
        },
        getImgCode(){
            logImgCode().then(res=>{
                this.limgCode = 'data:image/png;base64,'+res.data.data.imgage
                this.uuid = res.data.data.uuid
            })
        },
        register(){
            this.getImgCode()
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
    padding: 20px 30px 35px 30px;
    border-radius: 10px;
    width: 20%;
    min-width: 270px;
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
  transition: opacity .1s;
}
.fadeOutLeft-enter, .fadeOutLeft-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
