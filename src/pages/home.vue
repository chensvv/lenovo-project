<template>
    <div class="home">
    <!-- <el-container> -->
        <el-header :class="{is404:is404}">
            <div class="head">
                <div class="head_logo">
                    <img src="../../static/images/logo_img.png" alt="" class="logo_img">
                </div>
                <span class="logo_txt">联想车载语音管理系统</span>
            </div>
            <div class="fr">
                <el-popover
                    placement="bottom"
                    width="400"
                    trigger="click"
                    v-model="visible"
                    class="inform-popo"
                    popper-class="inform-popover">
                    <div class="pover-body">
                        <div class="tooltips-wrap" v-for="item in inform.data" :key="item.id">
                            <span class="pocont" v-if="inform.manager == '1'" @click="goPage(item.url)">{{item.dataType}}有新增数据需要你审核</span>
                            <span class="pocont" v-if="inform.manager == '2'" @click="goPage(item.url)">你添加的{{item.dataType}}数据已被审核，审批{{item.status == 1 ? '通过' : '拒绝'}}</span>
                            <el-button size="mini" @click="informBtn(item.ids)">标记已读</el-button>
                        </div>
                        <div class="hintnull" v-if="informCount == 0">
                            <span>暂无通知</span>
                        </div>
                    </div>
                    <el-badge slot="reference" :value="informCount" :max="99" class="inform-item">
                        <el-button class="inform-button" icon="el-icon-bell" type="primary"></el-button>
                    </el-badge>
                </el-popover>
                
                <el-dropdown @command="handleDropdown" trigger="click">
                    <span class="el-dropdown-link">
                        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">账号信息</el-dropdown-item>
                        <el-dropdown-item command="checkpass">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </el-header>
    
        <el-container>
            <el-aside width="auto" :class="{is404:is404}">
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
// import EllipsisTooltip from '@/components/popover'
import { activitiNotice, activitiRead } from '@/config/api'
import { logout} from '@/config/adminApi'
let Base64 = require('js-base64').Base64
export default {
    data(){
        return {
            username:"",
            is404:false,
            inform:[],
            informCount:0,
            menuData:[],
            disabledTip: false,
            tooltipFlag: false,
            disabledTip2: false,
            tooltipFlag2: false,
            placement:'top',
            className:'text'
        }
    },
    created(){
        this.username = Base64.decode(sessionStorage.getItem('username'))
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
        this.getactivitiNotice()
    },
    components: {
        Aside,
        // EllipsisTooltip
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
                this.logoutMethod()
                sessionStorage.clear();
                this.$router.push('/login')
            }else if(v == 'userinfo'){
                this.$router.push('/user/userinfo')
            }else{
                this.$router.push('/user/checkpass')
            }
        },
        visibilityChange(event) {
            const ev = event.target
            const ev_height = ev.offsetHeight // 文本的实际高度
            const content_height = this.$refs.tlp.$el.parentNode.clientHeight // 文本容器高度
            if (content_height < ev_height) {
                // 实际内容高度 > 文本高度 =》内容溢出
                this.tooltipFlag = true // NameIsIncludeWord ? true : !!false
            } else {
                // 否则为不溢出
                this.tooltipFlag = false
            }
        },
        visibilityChange2(event) {
            const ev = event.target
            const ev_height = ev.offsetHeight // 文本的实际高度
            const content_height = this.$refs.tlp.$el.parentNode.clientHeight // 文本容器高度
            if (content_height < ev_height) {
                // 实际内容高度 > 文本高度 =》内容溢出
                this.tooltipFlag2 = true // NameIsIncludeWord ? true : !!false
            } else {
                // 否则为不溢出
                this.tooltipFlag2 = false
            }
        },
        logoutMethod(){
            logout().then(res=>{
                
            })
        },
        getactivitiNotice(){
            let params = {}
            activitiNotice(params).then(res=>{
                this.inform = res.data
                this.informCount = res.data.count
            })
        },
        informBtn(id){
            let paramsID = {
                ids:id
            }
            activitiRead(paramsID).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'通知已读',
                        type:"success",
                        duration:2000
                    });
                    this.getactivitiNotice()
                }else{
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:"error",
                        duration:2000
                    });
                }
                
            })
        },
        goPage(url){
            this.$router.push(url)
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
    /* position: relative; */
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
    margin-right: 25px;
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