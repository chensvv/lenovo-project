<template>
    <!-- <el-menu mode="vertical" :default-active="$route.path" :router="true">
        
        <el-menu-item index="/home/index">
            <i class="el-icon-location"></i>
			<span>首页</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-date"></i>
                <span>应用搜索</span>
            </template>
            <el-menu-item index="/app/list">
                <i class="el-icon-goods"></i>
                <span>应用列表</span>
            </el-menu-item>
            <el-menu-item index="/app/keyWord">
                <i class="el-icon-goods"></i>
                <span>应用关键词</span>
            </el-menu-item>
            <el-menu-item index="/app/aliReg">
                <i class="el-icon-goods"></i>
                <span>应用别名规则</span>
            </el-menu-item>
            <el-menu-item index="/app/cache">
                <i class="el-icon-goods"></i>
                <span>应用缓存</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-date"></i>
                <span>闲聊数据</span>
            </template>
            <el-menu-item index="/chat/was">
                <i class="el-icon-tickets"></i>
                <span>网站导航</span>
            </el-menu-item>
            <el-menu-item index="/chat/dict">
                <i class="el-icon-tickets"></i>
                <span>热词列表</span>
            </el-menu-item>
            <el-menu-item index="/chat/csc">
                <i class="el-icon-service"></i>
                <span>常用服务电话</span>
            </el-menu-item>
            <el-menu-item index="/chat/chat">
                <i class="el-icon-tickets"></i>
                <span>闲聊数据上报</span>
            </el-menu-item>
            <el-menu-item index="/chat/joke">
                <i class="el-icon-tickets"></i>
                <span>笑话</span>
            </el-menu-item>
            <el-menu-item index="/chat/sen">
                <i class="el-icon-tickets"></i>
                <span>敏感词</span>
            </el-menu-item>
            <el-menu-item index="/chat/trigger">
                <i class="el-icon-tickets"></i>
                <span>语音唤醒</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-date"></i>
                <span>规则定义</span>
            </template>
            <el-menu-item index="/rule/qa">
                <i class="el-icon-tickets"></i>
                <span>定制问答/说法增设</span>
            </el-menu-item>
            <el-menu-item index="/rule/rule">
                <i class="el-icon-tickets"></i>
                <span>小不点规则设置</span>
            </el-menu-item>
            <el-menu-item index="/rule/grey">
                <i class="el-icon-tickets"></i>
                <span>灰度发布</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-date"></i>
                <span>LASF KV</span>
            </template>

            <el-menu-item index="/lasf-kv/kv">
                <i class="el-icon-document"></i>
                <span>KV列表</span>
            </el-menu-item>
            <el-menu-item index="/lasf-kv/engine">
                <i class="el-icon-document"></i>
                <span>引擎规则</span>
            </el-menu-item>
            <el-menu-item index="/lasf-kv/outer">
                <i class="el-icon-document"></i>
                <span>三方错误信息</span>
            </el-menu-item>
            <el-menu-item index="/lasf-kv/skill">
                <i class="el-icon-document"></i>
                <span>技能配置信息</span>
            </el-menu-item>
            <el-menu-item index="/lasf-kv/video">
                <i class="el-icon-document"></i>
                <span>技能视频管理</span>
            </el-menu-item>
            <el-menu-item index="/lasf-kv/singer">
                <i class="el-icon-document"></i>
                <span>音乐歌手管理</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="/permission/role">
            <i class="el-icon-lock"></i>
			<span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="/permission/auth">
            <i class="el-icon-lock"></i>
			<span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/home/setting">
            <i class="el-icon-setting"></i>
			<span>设置</span>
        </el-menu-item>
    </el-menu> -->
   <div>
       <!-- <el-menu class='el-menu-vertical-demo' router @select="handleSelect">
           <el-menu-item index="/home/index">
            <i class="el-icon-location"></i>
			<span>首页</span>
        </el-menu-item>
           <div v-for='(item, index) in menuData' :key='index'>
                <el-submenu v-if='item.children' :index='item.id' :route ='item.url' class='edit_wrapper'>
                <template slot='title'>
                    <i :class='item.icon'></i>
                    <span slot='title'>{{item.ruleName}}</span>
                    <i class='iconfont icon-shenpi edit'></i>
                </template>
                <el-submenu v-if='item1.children' v-for= '(item1, index) in item.children' :key='item1.ruleCode' :index='item1.id' :route='item1.url'>
                    <template slot='title'>
                        <span slot='title'>{{item1.ruleName}}</span>
                    </template>
                    <el-submenu v-for= '(item2, index) in item1.children' :key='item2.ruleCode' v-if='item2.children' :index='item2.id' :route ='item2.url'>
                        <template slot='title'>
                            <span slot='title'>{{item2.ruleName}}</span>
                        </template>
                        <el-submenu v-for= '(item3, index) in item2.children' :key='item3.ruleCode' v-if='item3.children' :index='item3.id' :route ='item3.url'>
                            <template slot='title'>
                                <span slot='title'>{{item3.ruleName}}</span>
                            </template>
                            <el-menu-item v-for= '(item4, index) in item3.children' :key='item3.ruleCode' v-if='item4.children == null' :index='item4.id' :route ='item4.url'>
                                <i :class='item4.icon'></i>
                                <span>{{item4.ruleName}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-for= '(item3, index) in item2.children' :key='item3.ruleCode' v-if='item3.children == null' :index='item3.id' :route ='item3.url'>
                            <i :class='item3.icon'></i>
                            <span>{{item3.ruleName}}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-for= '(item2, index) in item1.children' :key='item2.ruleCode' v-if='item2.children == null' :index='item2.id' :route ='item2.url'>
                        <i :class='item2.icon'></i>
                        <span>{{item2.ruleName}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-for= '(item1, index) in item.children' :key='item1.ruleCode' v-if='item1.children == null' :index='item1.ruleCode' :route ='item1.url'>
                    <i :class='item1.icon'></i>
                    <span>{{item1.ruleName}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-if='item.children == null' :index='item.id' :route ='item.url'>
                <i :class='item.icon'></i>
                <span slot='title'>{{item.ruleName}}</span>
            </el-menu-item>
           </div>
           
          </el-menu> -->
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#333"
            active-text-color="#409eff"
            router
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
        NavMenu
    },
    data(){
            return {
              menuData:[]
            }
        },
    created() {
        this.menuData = JSON.parse(sessionStorage.getItem('menuData'))
    }
}
</script>

<style>

</style>
