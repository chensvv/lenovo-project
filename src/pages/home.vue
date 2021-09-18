<template>
    <div class="home">
    <!-- <el-container> -->
        <el-header :class="{is404:is404}">
            <div class="head">
                <div class="head_logo">
                    <img src="../../static/images/logo_img.png" alt="" class="logo_img">
                </div>
            <span class="logo_txt">联想语音管理系统</span>
            </div>
            
            
            <el-dropdown class="fr" @command="handleDropdown" trigger="click">
                <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item command="change">切换账号</el-dropdown-item> -->
                    <!-- <el-dropdown-item @click="userInfo()">修改密码</el-dropdown-item> -->
                    <el-dropdown-item divided command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
    
        <el-container>
            <el-aside width="200px" :class="{is404:is404}">
                <Aside></Aside>
            </el-aside>
            <el-main>
                <router-view>
                </router-view>
            </el-main>
        </el-container>
    <!-- </el-container> -->
    </div>
</template>

<script>

import Aside from '@/components/Aside'

export default {
    data(){
        return {
            username:"",
            is404:false
        }
    },
    created(){
        this.username = sessionStorage.getItem('username')
        this.menuData = JSON.parse(sessionStorage.getItem('menuData'))
        let menuList=[]
        for (let item of this.menuData) {
            // console.log(item)
            if (item.menutype === 0) {
                menuList.push({
                    ruleCode:item.ruleCode
                });
            }
            for (let towMenus of item.children) {
                if (towMenus.menutype === 2) {
                    menuList.push({
                        ruleCode:towMenus.ruleCode
                    });
                }
                for (let threeMenus of towMenus.children2) {
                    if (threeMenus.menutype === 0) {
                        menuList.push({
                            ruleCode:threeMenus.ruleCode
                        });
                    }
                }
            }
        }
        sessionStorage.setItem('btnpermission',JSON.stringify(menuList))
    },
    components: {
        Aside
    },
    watch:{
        $route(to, from) {
        if(this.$route.path == '/404' || this.$route.path == '/401'){
            this.is404 = true
        }else{
            this.is404 = false
        }
    }
    },
    methods:{
        handleDropdown(v){
            if(v == "logout"){
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('menuData');
                sessionStorage.removeItem('btnpermission')
                this.$router.push('/login')
            }else{
                this.$router.push('/home/userinfo')
            }
        }
    }
}
</script>

<style>
.home {
    height: 100%;
    min-width: 1300px;
}

.home .el-container{
    height: 100%;
    padding-top: 60px;
}
.is404 .el-header{
    display: none;
}
.is404 .el-aside{
    display: none;
}
.home .el-header {
    background-color: #2b2b2b;
    color:#ffffff;
    line-height: 60px;
    text-align: left;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 15px;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.home .el-menu {
    height: 100%;
    border-right: none;
}

.home .el-footer {
    background-color: #2b2b2b;
    color:#ffffff;
    line-height: 60px;
    text-align: center;
}

.fr {
    float: right;
}


.home .el-icon--right{
    vertical-align: middle;
}
.home .el-dropdown-link{
    cursor: pointer;
}
.head{
    display: flex;
    align-items: center;
}
.head_logo {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
}
.head_logo .logo_img{
    width: 100%;
}
.head .logo_txt{
    padding-left: 10px;
}
</style>