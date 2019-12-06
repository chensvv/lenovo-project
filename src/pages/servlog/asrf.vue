<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="a_alert">
        <i class="el-icon-info"></i>
        <span class="alert_main">错误日志今天更新了<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo> 条</span>
    </div>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="UID" prop="uid">
        <el-input v-model.trim="searchItem.uid" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户端类型" prop="dtp">
        <el-input v-model.trim="searchItem.dtp" clearable></el-input>
      </el-form-item>
      <el-form-item label="起始时间" prop="refreshTime">
          
          <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="searchItem.refreshTime" 
          style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="putTime">
          <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="searchItem.putTime" 
          style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <i-table :list="list" :options="options" :columns="columns" :operates="operates"></i-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import iTable from "@/components/table";
import {checkTime} from '@/utils/timer.js'
import {asrfList} from '@/config/api'
import countTo from 'vue-count-to';
export default {
  components: { iTable, countTo },
  data() {
    return {
      list: [],
      searchItem:{//搜索数据组
        uid:"",
        dtp:"",
        refreshTime:"",
        putTime:""
      },
      columns: [
            {
                prop: "dtp",
                label: "客户端设备类型",
                align: "center",
                hasSort:true
            },
            {
                prop: "did",
                label: "客户端设备ID",
                align: "center",
                hasSort:true
            },
            {
                prop: "dsc",
                label: "描述",
                align: "center",
                hasSort:true
            },
            {
                prop: "it",
                label: "插入时间",
                align: "center",
                hasSort:true,
                render: (h, params)=>{
                        var timer = params.row.it
                        var date = new Date(timer)
                        return h('span',
                        date.getFullYear()+'-'+
                        checkTime(date.getMonth()+1)+'-'+
                        checkTime(date.getDate())+' '+
                        checkTime(date.getHours())+':'+
                        checkTime(date.getMinutes()))
                    }
            }
      ],
      options: {
        stripe: false, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        border:false     //是否显示纵向边框
      },
      operates: {
        width: 120,
        show: false,
        list: [
        ]
      }, // 列操作按钮
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      fileBtnLoading:false,
      startVal:0,
      endVal:0
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
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        dtp:this.searchItem.dtp,
        uid:this.searchItem.uid
      }
      asrfList(params).then(res=>{
        this.list = res.data.data.data
        this.totalCount = res.data.data.total
        this.endVal = res.data.count
      })
    }
  }
};
</script>

<style scoped>
</style>
