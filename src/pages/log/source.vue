<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="用户" prop="username">
          <el-select v-model.trim="searchItem.username" placeholder="--" clearable>
              <el-option
                v-for="item in usernameList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="channel">
            <el-select v-model.trim="searchItem.channel" placeholder="--" clearable>
                <el-option label="itemClick" value="itemClick"></el-option>
                <el-option label="softKeyboard" value="softKeyboard"></el-option>
                <el-option label="voice" value="voice"></el-option>
            </el-select>
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
        <el-tooltip class="item" effect="dark" content="请在左侧选择起始时间和结束时间或者选择类型导出" placement="top-end">
          <el-button size="mini" @click="exportFile()" icon="el-icon-download" :loading="fileBtnLoading" v-has="'source:export'">导出数据</el-button>
        </el-tooltip>
      </div>
    </el-form>
    <div class="table-box">
      <el-table
              :data="list"
              stripe
              :class="this.totalClass <= '5' ? 'limitWidth' :''"
              style="width: 100%"
              v-loading="listLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading">
              <el-table-column type="index" align="center" label="#">
              </el-table-column>
              <el-table-column label="ID" prop="id" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.id" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.id }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.id }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="说法" prop="speak" align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.speak" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.speak }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.speak }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="领域" prop="vdm" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.vdm" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.vdm }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.vdm }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="结果" prop="nlpResult" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.nlpResult" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.nlpResult }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.nlpResult }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="类型" prop="sourceType" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.sourceType" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.sourceType }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.sourceType }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="createTime" align="center"  :formatter="formTime" min-width="120">
              </el-table-column>
              <el-table-column label="修改时间" prop="updateTime" align="center"  :formatter="formTime2" min-width="120">
              </el-table-column>
          </el-table>
      <!-- <i-table :list="list" :options="options" :columns="columns" :operates="operates"></i-table> -->
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
              <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {sourceList, sourceExport,sourceUserNameList} from '@/config/api'
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
        channel:"",
        refreshTime:"",
        putTime:"",
        username:''

      },
      usernameList:[],
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      listLoading:false,
      fileBtnLoading:false,
      isPageNumberError:false,
      lastPage:0,
      MaxId:"",
      MinId:"",
      nextPage:"",
      isLastPage:false,
      lastCurrentPage:""
    };
  },
  created() {
    this.getList();
    this.getUsernameList()
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = ''
      this.maxId = ''
      this.minId = ''
      this.getList(1)
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
    formTime2(row, column) {
      var timer = row.updateTime;
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
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    turnToPage(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.lastPage = -1
            ts.getList(pageNum)
        }else{
            // ts.currentPage = pageNum
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberError = true;
                return false;
            }else{
                ts.lastPage = 0
                ts.getList(pageNum)
                ts.isPageNumberError = false;
            }
        }
    },
    exportFile(){
        this.fileBtnLoading = true
        if(this.searchItem.refreshTime != '' && this.searchItem.putTime != '' || this.searchItem.channel != ''){
            let exprotParams = {
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                channel:this.searchItem.channel
            }
            exprotParams.sign = deleteParams(exprotParams)
            sourceExport(exprotParams).then(res=>{
              if(res.data.size == 0){
                this.$message({
                    message:'您选择当前时间的数据为空！',
                    type:"error",
                    duration:1500
                });
                this.fileBtnLoading = false
              }else{
                // let blobUrl = new Blob([res.data],{type:'application/vnd.ms-excel'})
                // let bom = '\uFEFF'
                let blobUrl = new Blob([res.data], {type: 'text/csv,charset=UTF-8'})
                let a = document.createElement('a');
                let url = window.URL.createObjectURL(blobUrl);
                let filename = this.searchItem.refreshTime+'-'+this.searchItem.putTime+'.csv';
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                this.fileBtnLoading = false
              }
            }).catch(err => {
                this.fileBtnLoading = false
            })
        }else{
            this.$message({
                message:'请选择起始时间和结束时间或者类型导出！',
                type:"error",
                duration:1500
            });
            this.fileBtnLoading = false
        }
    },
    getList(pageNum) {
      this.listLoading = true
      let params = {
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        channel:this.searchItem.channel,
        userName:this.searchItem.username,
        pgstr:this.nextPage,
        pcstr:this.pageSize,
        maxId:this.MaxId,
        minId:this.MinId,
        nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
        currentPage:this.lastCurrentPage
      }
      params.sign = deleteParams(params)
      sourceList(params).then(res=>{
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          this.totalClass = res.data.data.data.length
          this.MaxId = Math.max.apply(Math, this.list.map(function(o) {return o.id}))
          this.MinId = Math.min.apply(Math, this.list.map(function(o) {return o.id}))
          this.isLastPage = res.data.data.lastPage
          this.lastCurrentPage = res.data.data.currentPage
          this.currentPage = res.data.data.currentPage
          if(res.data.data.lastPage == true){
              this.lastPage = -1
          }
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
    },
    getUsernameList(){
      sourceUserNameList().then(res=>{
        if(res.data.data[0] == null){
          this.usernameList = res.data.data.slice(1);
        }else{
          this.usernameList = res.data.data
        }
      })
    }
  }
};
</script>

<style scoped>
</style>
