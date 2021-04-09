<template>
    <div class="table userinfo">
        <div class="pass-title">
            <span>修改密码</span>
            <div class="content">
                <p class="user">用户名：{{username}}</p>
            </div>
            <div class="pass-content">
                <el-form status-icon :rules="passRule" :model="passForm" ref="passForm" :label-position="'right'" label-width="120px">
                    <el-form-item label="当前密码" prop="oldPass">
                        <el-input type="password" v-model="passForm.oldPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPass">
                        <el-input type="password" v-model="passForm.newPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="passForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <div class="reg_box">
                        <el-button type="primary" @click="Submit('passForm')" :loading="regEmailLoading">确认修改</el-button>
                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        var emailValidatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.passForm.checkPass !== '') {
                    this.$refs.passForm.validateField('checkPass');
                }
            callback();
            }
        }
        var emailCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passForm.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return{
            username:"admin",
            passForm:{
                oldPass:'',
                newPass:'',
                checkPass:''
            },
            regEmailLoading:false,
            passRule:{
                oldPass: [
                    { required: true, message: '请输入当前密码', trigger: 'blur' }                
                ],
                newPass: [
                    { required: true, validator: emailValidatePass, trigger: 'blur' },
                    // { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/, message: '密码长度8~16位,必须包含数字、字母、特殊符号',trigger: 'change' }
                ],
                checkPass: [
                    { required: true, validator: emailCheckPass, trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        Submit(passForm){
            this.$refs[passForm].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    return false;
                }
            })
        }
    },
}
</script>
<style scoped lang="">

</style>