<template>
   <div class="com-aside">
       <el-radio-group v-model="isCollapse" class="aside-group" :style="{'left':leftpx+'px'}">
        <div class="collapse-btn-box" @click="openCloseCollapse">
            <i class="hidebtn el-icon-caret-left"  v-if="isCollapse == false"></i>
            <i class="hidebtn el-icon-caret-right" v-if="isCollapse == true"></i>
        </div>
    </el-radio-group>
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#333"
            active-text-color="#409eff"
            router
            :default-active="r"
            :unique-opened="true"
            :collapse="isCollapse"
            >
            
            <el-menu-item index="/home/index">
                <i class="el-icon-location"></i>
                <span>首页</span>
            </el-menu-item>
            <NavMenu :navMenus="menuData"></NavMenu>
        </el-menu>
   </div>
</template>
<script>
import NavMenu from './silder'
export default {
    components:{
        NavMenu,
        
    },
    data(){
            return {
              menuData:[],
              isCollapse:false,
              r:this.$route.path,
              leftpx:200
            }
        },
    // beforeCreate() {
    //     this.r = this.$route.path
    // },
    created() {
        this.menuData = JSON.parse(sessionStorage.getItem('menuData'))
    },
    methods:{
        openCloseCollapse(){
            this.isCollapse = !this.isCollapse
            if(this.isCollapse == false){
                this.leftpx = 200
            }else{
                this.leftpx = 65
            }
        }
    }
}
</script>
<style>

</style>
