<template>
  <div class="table oprlog">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="应用包名" prop="app">
        <el-input v-model.trim="searchItem.app" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model.trim="searchItem.desc" clearable></el-input>
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
      <el-table :data="list" :class="this.totalCount <= 5 ? 'limitWidth' :''" style="width: 100%" v-loading="listLoading">
        <el-table-column type="index" align="left" ></el-table-column>
        <el-table-column label="客户端设备ID" prop="did" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="客户端版本" prop="ver" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作时间" prop="opts" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="应用包名" prop="app" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" prop="oper" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="描述" prop="desc" align="left"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="插入时间" prop="it" align="left"  :formatter="formTime" min-width="120"></el-table-column>
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
import {checkTime} from '@/utils/timer.js';
import {oprList} from '@/config/api';
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
        app:"",
        desc:"",
        refreshTime:"",
        putTime:""
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      listLoading:true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formTime(row, column) {
      var timer = row.it;
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
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        app:this.searchItem.app,
        desc:this.searchItem.desc
      }
      oprList(params).then(res=>{
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
