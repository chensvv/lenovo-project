<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="UID" prop="uid">
          <el-input v-model.trim="searchItem.uid" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户端类型" prop="dtp">
          <el-input v-model.trim="searchItem.dtp" clearable></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="pickerVal" class="date-form">
            <el-date-picker
                v-model="searchItem.pickerVal"
                type="daterange"
                align="center"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
            </el-date-picker>
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
        <el-table-column label="客户端设备类型" prop="dtp" align="center" sortable="custom">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dtp" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.dtp }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.dtp }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="客户端设备ID" prop="did" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.did" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.did }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.did }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="dsc" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.dsc" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.dsc }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.dsc }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="插入时间" prop="it" align="center" :formatter="formTime" width="130"></el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination> -->
      <div class="pagination-wrap" v-cloak>
          <ul class="pagination">
              <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
              <!-- <li><button :disabled="currentPage==1? true : false" @click="turnToPage(currentPage-1)"><i class="el-icon-arrow-left"></i></button></li> -->
              <li v-if="isLastPage != false && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
              <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
              <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
              <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
              <li v-if="currentPage+1 < 3 && isLastPage !=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
              <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
              <li><button :disabled="isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {asrfList} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
              let times = Date.now();
              return time.getTime() > times;
          },
      },
      list: [],
      totalClass:'8',
      searchItem:{//搜索数据组
        uid:"",
        dtp:"",
        pickerVal:[]
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
      fileBtnLoading:false,
      listLoading:true,
      isPageNumberError:false,
      MaxId:"",
      MinId:"",
      nextPage:"",
      isLastPage:false,
      lastCurrentPage:""
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
      // this.currentPage = ''
      this.MaxId = ''
      this.MinId = ''
      this.getList(1)
    },
    onSubmit(){
      this.seaBtnLoading = true
      // this.currentPage = ''
      this.getList(1)
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
    sortChange(column){
        this.column = {
            prop:column.prop,
            order:column.order
        }
        console.log(this.column)
        this.getList(this.lastCurrentPage)
    },
    turnToPage(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getList(pageNum)
        }else{
            // ts.currentPage = pageNum
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberError = true;
                return false;
            }else{
                ts.getList(pageNum)
                ts.isPageNumberError = false;
            }
        }
    },
    getList(pageNum) {
      this.listLoading = true
      let params = {
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1],
        dtp:this.searchItem.dtp,
        uid:this.searchItem.uid,
        fieldName: this.column.prop,
        pgstr:this.nextPage,
        pcstr:this.pageSize,
        maxId:this.MaxId,
        minId:this.MinId,
        nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
        currentPage:this.lastCurrentPage,
        order:this.column.order == 'ascending' ? '0' : ''
      }
      params.sign = deleteParams(params)
      asrfList(params).then(res=>{
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          // this.totalCount = res.data.data.total
          this.totalClass = res.data.data.data.length
          this.MaxId = Math.max.apply(Math, this.list.map(function(o) {return o.id}))
          this.MinId = Math.min.apply(Math, this.list.map(function(o) {return o.id}))
          this.isLastPage = res.data.data.lastPage
          this.lastCurrentPage = res.data.data.currentPage
          this.currentPage = res.data.data.currentPage
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:'error',
                duration:1500
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
