<template>
  <div>
      <div class="reg-box">
            <h1>修改密码</h1>
            <el-form :label-position="'left'" :model="checkForm" :rules="regRules" ref="checkForm" @submit.native.prevent>
                <el-form-item prop="oldpass">
                    <el-input type="text" v-model.trim="checkForm.oldpass" placeholder="请输入原密码" prefix-icon="el-icon-user" autocomplete="off" clearable class="code-input"></el-input>
                </el-form-item>
                <el-form-item prop="newpass">
                    <el-input type="text" v-model.trim="checkForm.newpass" placeholder="请输入新密码" prefix-icon="el-icon-lock" autocomplete="off" clearable class="code-input"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="text" v-model.trim="checkForm.checkPass" placeholder="确认密码" prefix-icon="el-icon-lock" autocomplete="off" clearable class="code-input"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="regCode" class="imgcode-item">
                    <el-input type="text" v-model.trim="checkForm.regCode" placeholder="验证码" auto-complete="off" clearable></el-input>
                    <img :src="limgCode" class="img" @click="getImgCode()">
                </el-form-item> -->
                <el-form-item class="btn_item">
                    <el-button type="primary" native-type="submit" @click="regSubmit('checkForm')" :loading="regLoading">确认</el-button>
                </el-form-item>
            </el-form>
      </div>
      
  </div>
</template>
<script>
import {logImgCode, userCheckPass, userInfoOne, logout} from '@/config/adminApi'
let Base64 = require('js-base64').Base64
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
        let CheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value !== this.checkForm.newpass) {
                callback(new Error('两次密码输入不一致'));
            } else {
                callback();
            }
        }
        return {
            checkForm:{
                oldpass:'',
                newpass:'',
                checkPass:''
            },
            userinfo:[],
            regLoading:false,
            regRules:{
                oldpass:[{ required: true, message: '请输入原密码', trigger: 'blur' }],
                newpass:[{ required: true, validator: ValidatePass, trigger: 'blur' },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码限制8-16字符且必须包含大小写英文及数字',trigger: 'blur' }],
                checkPass: [
                    { required: true, validator: CheckPass, trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        // this.getImgCode()
        this.getQueryOne()
    },
    methods:{
        regSubmit(checkForm){
            this.$refs[checkForm].validate((valid) => {
                if (valid) {
                    this.regLoading = true
                    let params = {
                        userId:this.userinfo.id,
                        userName:Base64.decode(sessionStorage.getItem('username')),
                        oldpassword:this.checkForm.oldpass,
                        newpassword:this.checkForm.newpass
                    }
                    params.sign = deleteParams(params)
                    userCheckPass(params).then(res=>{
                        this.regLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'修改密码成功，请重新登录',
                                type:"success",
                                duration:2000,
                                onClose:()=>{
                                    this.logoutMethod()
                                    sessionStorage.clear();
                                    this.$router.push('/login')
                                }
                            });
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1500
                            });
                        }
                    })
                }
            })
        },
        logoutMethod(){
            logout().then(res=>{
                
            })
        },
        getQueryOne(){
            let uparams = {
                userName:Base64.decode(sessionStorage.getItem('username'))
            }
            uparams.sign = deleteParams(uparams)
            userInfoOne(uparams).then(res=>{
                this.userinfo = res.data.data.user
            })
        },
        getImgCode(){
            logImgCode().then(res=>{
                this.limgCode = 'data:image/png;base64,'+res.data.data.imgage
                this.uuid = res.data.data.uuid
            })
        },
    }
}
</script>
