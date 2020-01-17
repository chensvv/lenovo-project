<template>
    <div class="login">
        <div class="login-box">
        <el-form :label-position="'left'" label-width="60px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密  码" prop="pass">
                <el-input type="password" v-model="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">注册</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>

import qs from 'qs'
import {userAdd} from '@/config/adminApi';

export default {
    data(){
        return {
            username:'',
            password:'',
        }
    },
    methods: {
        onSubmit(){
            
        }
    }  
}
</script>

<style>


</style>
