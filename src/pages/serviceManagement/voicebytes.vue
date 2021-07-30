<template>
  <div class="table dict">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>服务管理</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-button class="success" size="mini" @click="handleAdd()">添加</el-button> -->
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height80 search_box" size="mini" label-width="70px">
          <el-form-item label="通道" prop="channel">
                <el-select v-model.trim="searchItem.channel" placeholder="--" clearable>
                    <el-option label="单通道" value="1"></el-option>
                    <el-option label="双通道" value="8"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="比特率" prop="rate">
                <el-select v-model.trim="searchItem.rate" placeholder="--" clearable>
                    <el-option label="8000" value="8000"></el-option>
                    <el-option label="16000" value="16000"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="会话id" prop="sessionId">
            <el-input v-model.trim="searchItem.sessionId" clearable></el-input>
          </el-form-item>
          <el-form-item label="lenovoKey" prop="lenovoKey">
            <el-input v-model.trim="searchItem.lenovoKey" clearable></el-input>
          </el-form-item>
          <el-form-item label="secretKey" prop="secretKey">
            <el-input v-model.trim="searchItem.secretKey" clearable></el-input>
          </el-form-item>
           <el-form-item label="长短语音" prop="sce">
                <el-select v-model.trim="searchItem.sce" placeholder="--" clearable>
                    <el-option label="cmd" value="cmd"></el-option>
                    <el-option label="long" value="long"></el-option>
                    <el-option label="iat" value="iat"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="语言" prop="language">
                <el-select v-model.trim="searchItem.language" placeholder="--" clearable>
                    <el-option label="chinese" value="chinese"></el-option>
                    <el-option label="english" value="english"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否离线" prop="offline">
                <el-select v-model.trim="searchItem.offline" placeholder="--" clearable>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item class="sub-btn" >
            <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
            <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
          </el-form-item>
          
    </el-form>

    
      
    <div class="table-box">
      <el-table
            :data="list"
            :class="this.totalClass <= '5' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="left" >
            </el-table-column>
            <el-table-column
                label="通道"
                prop="channel"
                align="left"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span
                    disable-transitions>{{scope.row.channel == 1 ? '单通道': '双通道'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="比特率"
                prop="rate"
                align="left"
                >
            </el-table-column>
            <el-table-column
                label="会话id"
                prop="sessionId"
                align="left"
                
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="lenovoKey"
                prop="lenovoKey"
                 align="left"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="secretKey"
                prop="secretKey"
                 align="left"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="字节数"
                prop="voiceBytes"
                 align="left"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="长短语音"
                prop="sce"
                 align="left"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="语言"
                prop="language"
                 align="left"
                 
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="是否离线"
                prop="offline"
                 align="left"
                 :show-overflow-tooltip="true">
                 <template slot-scope="scope">
                    <span
                    disable-transitions>{{scope.row.offline == 1 ? '是': '否'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="添加时间"
                prop="createTime"
                align="left"
                min-width="120"
                :formatter="formTime">
            </el-table-column>
            <el-table-column
                label="修改时间"
                prop="updateTime"
                align="left"
                min-width="120"
                :formatter="formTime2">
            </el-table-column>
        </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {voicebytes} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      totalClass:'',
      searchItem:{//搜索数据组
        channel:"",
        rate:"",
        sessionId:"",
        lenovoKey:"",
        secretKey:"",
        sce:"",
        language:"",
        offline:"",
        // refreshTime:"",
        // putTime:""
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      listLoading:true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
      formTime(row, column){
      var timer = row.createTime
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
    },
    formTime2(row, column){
      var timer = row.updateTime
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.getList()
      this.seaBtnLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        channel:this.searchItem.channel,
        rate:this.searchItem.rate,
        sessionId:this.searchItem.sessionId,
        lenovoKey:this.searchItem.lenovoKey,
        secretKey:this.searchItem.secretKey,
        sce:this.searchItem.sce,
        language:this.searchItem.language,
        offline:this.searchItem.offline
      }
      voicebytes(params).then(res => {
        this.listLoading = false
        this.list = res.data.data;
        this.totalCount = res.data.count
        this.totalClass = res.data.data.length
      })
    }
  }
};
</script>

<style scoped>

</style>
