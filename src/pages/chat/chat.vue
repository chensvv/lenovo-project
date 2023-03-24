<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/csc/csc'}">闲聊数据</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
      <div class="form-input height50">
        <el-form-item label="问题" prop="question">
          <el-input v-model.trim="searchItem.question" clearable></el-input>
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
      </div>
      
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-tooltip class="item" effect="dark" content="导出数据默认导出全部数据，如需自定义请在左侧选择起始时间和结束时间或者输入问题导出" placement="top-end">
          <el-button size="mini" @click="exportFile()" icon="el-icon-download" :loading="fileBtnLoading" v-has="'chat:export'">导出数据</el-button>
        </el-tooltip>
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
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="问题"
              prop="ques"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ques" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.ques }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.ques }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="答案"
              prop="answ"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.answ" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.answ }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.answ }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="引擎"
              prop="engi"
              align="center"
              sortable="custom">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.engi" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.engi }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.engi }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="入库时间"
              prop="it"
              align="center"
              width="130"
              :formatter="formTime">
          </el-table-column>
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
              <li v-if="isLastPage != false && currentPage !=1" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
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
import {deleteParams} from '@/utils/deleteParams.js'
import {chatList, chatExport} from '@/config/api'
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
        question:"",
        refreshTime:"",
        putTime:""
      },
      column:{
        prop:'',
        order:''
      },
      editVisible: false,
      addVisible: false,
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
    formTime(row, column){
      var timer = row.it
      var date = new Date(timer)
          return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = ''
      this.maxId = ''
      this.minId = ''
      this.getList(1)
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = ''
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
      this.listLoading = true
      // console.log(`当前页: ${val}`);
      this.getList();
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
    exportFile(){
      // let timestamp = new Date();
      // let toData = timestamp.getFullYear()+'-'+checkTime(timestamp.getMonth()+1)+'-'+checkTime(timestamp.getDate())
      let exprotParams = {
        starttime:this.searchItem.refreshTime,
        endtime:this.searchItem.putTime,
        question:this.searchItem.question
      }
      exprotParams.sign = deleteParams(exprotParams)
      this.fileBtnLoading = true
      chatExport(exprotParams).then(res=>{
        // let bom = '\uFEFF'
        let blobUrl = new Blob([res.data], {type: 'text/csv,charset=UTF-8'})
        // let blobUrl = new Blob('\uFEFF' +[res.data], {type: 'text/csv,charset=UTF-8'})
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blobUrl);
        let filename = this.searchItem.refreshTime == '' && this.searchItem.putTime == '' && this.searchItem.question == '' ? 'chat.csv' 
        : this.searchItem.refreshTime == '' && this.searchItem.putTime == '' && this.searchItem.question !='' ? `${this.searchItem.question}.csv` : this.searchItem.refreshTime+'-'+this.searchItem.putTime+'.csv'
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        this.fileBtnLoading = false
      }).catch(err => {
          this.fileBtnLoading = false
      })
    },
    sortChange(column){
      this.column = {
        prop:column.prop,
        order:column.order
      }
      this.getList(this.lastCurrentPage)
    },
    getList(pageNum) {
      this.listLoading = true
      let params = {
        q:this.searchItem.question,
        ex:'',
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
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
      chatList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data;
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
