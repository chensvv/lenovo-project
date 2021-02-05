<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="客户端ip" prop="uip">
        <el-input v-model.trim="searchItem.uip" clearable></el-input>
      </el-form-item>
      <el-form-item label="起始时间" prop="refreshTime">
          <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="searchItem.refreshTime" 
          :picker-options="pickerOptions"
          style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="putTime">
          <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="searchItem.putTime" 
          :picker-options="pickerOptions"
          style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item class="sub-btn">
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table
              :data="list"
              :class="this.totalCount < 5 ? 'limitWidth' :''"
              style="width: 100%"
              v-loading="listLoading">
              <el-table-column type="index" align="center">
              </el-table-column>
              <el-table-column label="ID" prop="id" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端ip" prop="ip" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端地址" prop="address" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端设备" prop="devid" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端id" prop="appid" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端类型" prop="model" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="接口输入" prop="cinput" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="接口返回" prop="result" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="计算时间" prop="dur" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="入库时间" prop="createTime" align="center" :formatter="formTime" min-width="120">
              </el-table-column>
          </el-table>
      <!-- <i-table :list="list" :options="options" :columns="columns" :operates="operates"></i-table> -->
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
import {servList} from '@/config/api'
export default {
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
              let times = Date.now() - 24 * 60 * 60 * 1000;
              return time.getTime() > times;
          },
      },
      list: [],
      searchItem:{//搜索数据组
        uip:"",
        refreshTime:"",
        putTime:""
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      listLoading:false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList()
    },
    formTime(row, column) {
      var timer = row.createTime;
      var date = new Date(timer);
      return (
        date.getFullYear() +
        "-" +
        checkTime(date.getMonth() + 1) +
        "-" +
        checkTime(date.getDate()) +
        " " +
        checkTime(date.getHours()) +
        ":" +
        checkTime(date.getMinutes())
      );
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
      console.log(`当前页: ${val}`);
      this.getList();
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        uid:this.searchItem.uip
      }
      servList(params).then(res=>{
        this.listLoading = false
        this.list = res.data.data.data
        this.totalCount = res.data.data.total
      })
    }
  }
};
</script>

<style scoped>
</style>
