<template>
  <div>
    <div class="userinfo-box">
      <el-descriptions title="用户信息">
          <el-descriptions-item label="用户名">{{userinfo.userName}}</el-descriptions-item>
          <el-descriptions-item label="密码">
            <span v-if="passShow">{{userinfo.password}}</span>
            <span class="pass" v-else>{{password}}</span> 
            <span class="lookmi" @click="passHide()"><i class="el-icon-view"></i></span>
          </el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical">
          <el-descriptions-item label="权限">
            <el-tree
              :data="treeList"
              :props="defaultProps"
              accordion>
            </el-tree>
          </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script>
import {userInfoOne} from '@/config/adminApi'
let Base64 = require('js-base64').Base64
export default {
  name:'userinfo',
  data(){
    return{
      userinfo:{},
      treeList:[],
      password:'',
      passShow:false,
      defaultProps: {
          children: 'children',
          label: 'ruleName'
      },
    }
  },
  created(){
    this.getUserInfo()
  },
  methods:{
    passHide(){
      this.passShow = !this.passShow
    },
    getUserInfo(){
      let params = {
          userName:Base64.decode(sessionStorage.getItem('username'))
      }
      userInfoOne(params).then(res=>{
          this.userinfo = res.data.data.user
          this.treeList = res.data.data.menu
          this.password = res.data.data.user.password.replace(/./g , '*')
      })
    }
  },
  filters:{
    valHide(s){
      console.log(typeof(s))
      return s.replace(/./g,'*')
    }
  }
}
</script>