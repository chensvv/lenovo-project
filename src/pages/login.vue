<template>
    <div class="login">
        <div class="head">
            <div class="head_logo">
                <img src="../../static/images/logo_img.png" alt="" class="logo_img">
            </div>
            <span class="logo_txt">联想车载语音管理系统</span>
        </div>
        <div class="login-box">
            <div class="login_background">
                <img src="../../static/images/vehi.svg" alt="">
            </div>
            
            <div class="login-content">
                <span class="form-title">联想车载语音管理系统</span>
                <div class="loginn" v-if="loginShow">
                    <el-form :label-position="'left'" :model="loginForm" :rules="loginRules" ref="loginForm" @submit.native.prevent>
                        <el-form-item prop="username" :error="loginUserErr">
                            <el-input type="text" v-model.trim="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="password" :error="loginPsdErr">
                            <el-input type="password" v-model.trim="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="imgCode" class="imgcode-item" :error="loginImgCodeErr">
                                <el-input type="text" v-model.trim="loginForm.imgCode" placeholder="验证码" auto-complete="off" clearable>
                                    <i slot="prefix" class="el-input__icon codeimg">
                                        <img src="../../static/images/code.svg">
                                    </i>
                                </el-input>
                                <img :src="limgCode" class="img" @click="getImgCode()">
                                <div class="tooltiptext" v-if="loginStatus == '1'">
                                    登录超时
                                </div>
                        </el-form-item>
                        <el-form-item class="btn_item lr-btn">
                            <el-button type="primary" native-type="submit" @click="loginSubmit('loginForm')" :loading="loginLoading">登录</el-button>
                            <span native-type="submit" @click="register()" class="register_btn">注册</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="register" v-else key="register">
                    <el-form :label-position="'left'" :model="regForm" :rules="regRules" ref="regForm" @submit.native.prevent>
                        <el-form-item prop="username" :error="regUserErr">
                            <el-input style="position:fixed; bottom:-9999px"></el-input>
                            <el-input type="text" v-model.trim="regForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" auto-complete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input style="position:fixed; bottom:-9999px"></el-input>
                            <el-input v-model.trim="regForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" auto-complete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="regCode" class="imgcode-item" :error="regCodeErr">
                            <el-input type="text" v-model.trim="regForm.regCode" placeholder="验证码" auto-complete="off" clearable>
                                <i slot="prefix" class="el-input__icon codeimg">
                                    <img src="../../static/images/code.svg">
                                </i>
                            </el-input>
                            <img :src="limgCode" class="img" @click="getImgCode()">
                        </el-form-item>
                        <el-form-item class="btn_item lr-btn">
                            <el-button type="primary" native-type="submit" @click="regSubmit('regForm')" :loading="regLoading">注册</el-button>
                            <span native-type="submit" @click="register()" class="register_btn">登录</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
                
        </div>
        
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64
import {login,userReg,userMenu,logImgCode} from '@/config/adminApi'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data(){
        let ValidatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        }
        let ValidateloginPsd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                this.loginPsdErr = ''
                callback();
            }
        }
        let ValidateloginImgCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {
                this.loginImgCodeErr = ''
                callback();
            }
        }
        let ValidateRegUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                this.regUserErr = ''
                callback();
            }
        }
        let ValidateRegCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {
                this.regCodeErr = ''
                callback();
            }
        }
        return {
            limgCode:'',
            uuid:'',
            loginUserErr:"",
            loginPsdErr:"",
            loginImgCodeErr:"",
            regUserErr:"",
            regCodeErr:"",
            loginStatus: this.$store.getters.get_userinfo,
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
                password:[{ required: true, validator: ValidateloginPsd, trigger: 'change' }],
                imgCode:[{ required: true, validator: ValidateloginImgCode, trigger: 'change' }]
            },
            regRules:{
                username:[{ required: true, validator: ValidateRegUser, trigger: 'change' }],
                password:[{ required: true, validator: ValidatePass, trigger: 'change' },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码限制8-16字符且必须包含大小写英文及数字',trigger: 'blur' }],
                regCode:[{ required: true, validator: ValidateRegCode, trigger: 'change' }]
            },
            menu:[],
        }
    },
    created(){
        this.getImgCode()
    },
    mounted(){
        //读取全局变量
        console.log( this.$store.getters.get_userinfo)
        //修改全局变量 修改要用commit 然后commit(key,value) key是名，要和mutations下的set_userinfo一致 value是修改的值
        
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
            params.sign = deleteParams(params)
            u_params.sign = deleteParams(u_params)
            // params = qs.stringify(params);
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    this.loginLoading=true
                    login(params).then((res)=>{
                        this.loginLoading = false
                        if(res.data.code == 200){
                            sessionStorage.setItem('username',Base64.encode(this.loginForm.username))
                            let paramss = {'t': Base64.encode(res.data.data)};
                            var datas = Object.assign(paramss, { startTime: new Date().getTime() });
                            sessionStorage.setItem("token", JSON.stringify(datas));
                            this.$store.commit('set_userinfo','0')
                            // sessionStorage.setItem('log',Base64.encode(this.loginForm.password))
                            userMenu(u_params).then(res=>{
                                sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                this.$router.push('/')
                            })
                        }else if(res.data.code == 400){
                            this.getImgCode()
                            this.loginPsdErr = res.data.msg
                            
                        }else{
                            this.getImgCode()
                            this.loginImgCodeErr = res.data.msg
                        }
                    }).catch(err=>{
                        this.getImgCode()
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
            regParams.sign = deleteParams(regParams)
            this.$refs[regForm].validate((valid) => {
                if(valid){
                    this.regLoading = true
                    userReg(regParams).then(res=>{
                        this.regLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'注册成功，请登录',
                                type:"success",
                                duration:2000
                            });
                            this.loginShow = !this.loginShow
                        }else if(res.data.code == 400){
                            this.getImgCode()
                            this.regUserErr = res.data.msg
                        }else{
                            this.getImgCode()
                            this.regCodeErr = res.data.msg
                        }
                        
                    }).catch(err=>{
                        this.getImgCode()
                        this.$message({
                            message:'服务器错误，请稍后重试！',
                            type:"error",
                            duration:2000
                        });
                    })
                }else{
                    return false
                }
            })
        },
        getImgCode(){
            logImgCode().then(res=>{
                if(res.data.code == 200){
                    this.limgCode = 'data:image/png;base64,'+res.data.data.imgage
                    this.uuid = res.data.data.uuid
                }else{
                    this.$message({
                        message:res.data.msg,
                        type:"error",
                        duration:2000
                    });
                }
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
    background-color: #3ccdff;
    background-image: linear-gradient(225deg,#3ccdff 0%,#93c4ff 50%,rgb(101, 189, 240) 100%);
    width: 100%;
    height: 100%;
    min-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
}
.login_background{
    width: 55%;
    background-image: linear-gradient(225deg,#3CCDFF 0%,rgb(101, 189, 240) 50%,#93c4ff 100%);
    text-align: center;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: rgba(60, 205, 255, 0.4) 4px 0px, rgba(60, 205, 255, 0.1) 8px 0px, rgba(60, 205, 255, 0.05) 12px 0px;
    z-index: 99;
}
.login_background img{
    width: 80%;
    height: 100%;
}
.login-box {
    background: #fff;
    padding: 0;
    border-radius: 22px;
    width: 50%;
    min-width: 650px;
    max-width: 700px;
    display: flex;
    box-shadow: rgba(101, 189, 240, 1) 0px 0px 50px 10px, #93c4ff 0px 0px 50px 10px;
}
.login-content{
    width: 45%;
    padding: 20px 0 0;
}

.login-box .form-title{
    display: block;
    text-align: center;
    font-size: 18px;
    background-image: linear-gradient(225deg,#65a7f0 0%,#93c4ff 50%,#3CCDFF 100%);
    border-radius: 50px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    width: 80%;
    margin: 0 auto 30px;
}
.loginn, .register{
    padding: 0 30px;
}
.login-box .btn_item .el-form-item__content button{
    width: 45%;
    border-radius: 20px;
}
.register_btn{
    display: inline-block;
    width: 45%;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 20px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
    float: right;
}

.fadeOutLeft-enter-active, .fadeOutLeft-leave-active {
  transition: opacity .1s;
}
.fadeOutLeft-enter, .fadeOutLeft-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.login .head{
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 20px;
    color: #fff;
}
.login .head_logo {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
}
.login .head_logo .logo_img{
    width: 100%;
}
.login .head .logo_txt{
    padding-left: 10px;
}
</style>
