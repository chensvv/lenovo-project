<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
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
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-table 
        :data="list" 
        stripe 
        :class="this.totalClass <= '7' ? 'limitWidth' :''" 
        style="width: 100%" 
        v-loading="listLoading" 
        @sort-change="sortChange"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
        <el-table-column type="index" align="center" label="#"></el-table-column>
        <el-table-column label="用户" prop="user" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.user" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.user }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.user }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operation" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.operation" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.operation }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.operation }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="方法" prop="method" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.method" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.method }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.method }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="参数" prop="params" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.params" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.params }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.params }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="插入时间" prop="createTime" align="center"  :formatter="formTime" min-width="120"></el-table-column>
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
import {syslogList} from '@/config/api';
import {deleteParams} from '@/utils/deleteParams.js'
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
      totalClass:'8',
      searchItem:{//搜索数据组
        app:"",
        desc:"",
        refreshTime:"",
        putTime:""
      },
      column:{
          prop:'',
          order:''
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      listLoading:true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onShowNameTipsMouseenter(e) {
        var target = e.target;
        let textLength = target.clientWidth;
        let containerLength = target.scrollWidth;
        if (textLength < containerLength) {
            // 溢出了
            this.showTitle = false;
        } else {
            this.showTitle = true;
        }
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
      }
      params.sign = deleteParams(params)
      syslogList(params).then(res=>{
          console.log(res)
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:'error',
                duration:1000
            });
        }
      }).catch(()=>{
        this.listLoading = false
      })
    }
  }
};
</script>

<style scoped>
</style>
