<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="问题" prop="question">
        <el-input v-model.trim="searchItem.question" clearable></el-input>
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
      <el-tooltip class="item" effect="dark" content="导出数据默认导出全部数据，如需自定义请在左侧选择起始时间和结束时间或者输入问题导出" placement="top-end">
        <el-button size="mini" @click="exportFile()" :loading="fileBtnLoading" v-has="'chat:export'">导出数据</el-button>
      </el-tooltip>
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
import {chatList, chatExport} from '@/config/api'
export default {
  components: { iTable },
  data() {
    return {
      list: [],
      searchItem:{//搜索数据组
        question:"",
        refreshTime:"",
        putTime:""
      },
      exList:{

      },
      columns: [
        {
          prop: "ques",
          label: "问题",
          align: "center",
          hasSort:true
        },
        {
          prop: "answ",
          label: "答案",
          align: "center",
          hasSort:true
        },
        {
          prop: "engi",
          label: "引擎",
          align: "center",
          hasSort:true
        },
        {
          prop: "it",
          label: "入库时间",
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
        loading: true, // 是否添加表格loading加载动画
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
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      fileBtnLoading:false
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
    exportFile(){
      // let timestamp = new Date();
      // let toData = timestamp.getFullYear()+'-'+checkTime(timestamp.getMonth()+1)+'-'+checkTime(timestamp.getDate())
      let exprotParams = {
        starttime:this.searchItem.refreshTime,
        endtime:this.searchItem.putTime,
        question:this.searchItem.question
      }
      this.fileBtnLoading = true
      chatExport(exprotParams).then(res=>{
        let blobUrl = new Blob([res.data])
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blobUrl);
        let filename = this.searchItem.refreshTime+'-'+this.searchItem.putTime+'.xlsx';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        this.fileBtnLoading = false
      }).catch(err => {
          this.fileBtnLoading = false
        })
    },
    getList() {
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        q:this.searchItem.question,
        ex:'',
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime
      }
      chatList(params).then(res => {
        this.options.loading = false
        this.list = res.data.data;
        this.totalCount = res.data.count
      });
    }
  }
};
</script>

<style scoped>
</style>
