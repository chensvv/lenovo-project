<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="Uid" prop="uid">
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
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="客户端信息" name="client" class="flex-align">
          <el-table 
            :data="clientList" 
            stripe 
            :class="this.ctotalClass <= '7' ? 'limitWidth' :''" 
            style="width: 100%" 
            v-loading="ClistLoading" 
            @sort-change="sortChange"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column type="index" align="left"  ></el-table-column>
            <el-table-column label="UID" prop="uid" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.uid" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.uid }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.uid }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="客户端类型" prop="dtp" align="center" sortable="custom">
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
            <el-table-column label="客户端版本" prop="ver" align="center" sortable="custom">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ver" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.ver }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.ver }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="服务端地址" prop="svr" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.svr" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.svr }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.svr }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="执行状态" prop="stat" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.stat === 'success' ? 'tag-s' : scope.row.stat === 'failed' ? 'tag-d' :'tag-i'"
                >{{scope.row.stat}}</span>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center" min-width="90">
              <template slot="header">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.cltd" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.cltd }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.cltd }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rcn" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.rcn }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.rcn }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" width="130"></el-table-column>
          </el-table>
          <!-- <el-pagination
            @size-change="handleSizeChangeC"
            @current-change="handleCurrentChangeC"
            :current-page.sync="CcurrentPage"
            :page-size="CpageSize"
            layout="total, prev, pager, next, jumper"
            :total="CtotalCount"
          ></el-pagination> -->
          <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPageC==1? true : false" @click="turnToPageC(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <!-- <li><button :disabled="currentPage==1? true : false" @click="turnToPage(currentPage-1)"><i class="el-icon-arrow-left"></i></button></li> -->
                    <li v-if="isLastPageC != false && currentPageC !=1" class="unum" @click="turnToPageC(currentPageC-2)">{{currentPageC-2}}</li>
                    <li v-if="currentPageC-1>0"  class="unum" @click="turnToPageC(currentPageC-1)">{{currentPageC-1}}</li>
                    <li class="active" @click="turnToPageC(currentPageC)">{{currentPageC}}</li>
                    <li v-if="isLastPageC != true" class="unum" @click="turnToPageC(currentPageC+1)">{{currentPageC+1}}</li>
                    <li v-if="currentPageC+1 < 3 && isLastPageC !=true" class="unum" @click="turnToPageC(currentPageC+2)">{{currentPageC+2}}</li>
                    <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
                    <li><button :disabled="isLastPageC == true ? true: false" @click="turnToPageC(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane label="服务器信息" name="server">
          <el-table 
            :data="serverList" 
            stripe 
            :class="this.totalClass <= '7' ? 'limitWidth' :''" 
            style="width: 100%" 
            v-loading="SlistLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="客户端总耗时" prop="ixcd" align="center">
            </el-table-column>
            <el-table-column label="服务端总耗时" prop="ixsd" align="center">
            </el-table-column>
            <el-table-column label="网络总延时" prop="ixnd" align="center">
            </el-table-column>
            <el-table-column label="服务端识别耗时" prop="ixad" align="center">
            </el-table-column>
            <el-table-column label="执行状态" prop="stat" align="center" min-width="90">
              <template slot-scope="scope">
                <span
                  :class="scope.row.stat === 'success' ? 'tag-s' : scope.row.stat === 'failed' ? 'tag-d' :'tag-i'"
                >{{scope.row.stat}}</span>
              </template>
            </el-table-column>
            <el-table-column label="延时" prop="cltd" align="center">
              <template slot="header">
                <el-tooltip effect="dark" content="从结束录音到返回结果" placement="top">
                  <span slot>延时</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="内容" prop="rcn" align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.rcn" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.rcn }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.rcn }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" width="130"></el-table-column>
          </el-table>
          <!-- <el-pagination
            @size-change="handleSizeChangeS"
            @current-change="handleCurrentChangeS"
            :current-page.sync="ScurrentPage"
            :page-size="SpageSize"
            layout="total, prev, pager, next, jumper"
            :total="StotalCount"
          ></el-pagination> -->
          <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPageS==1? true : false" @click="turnToPageS(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <!-- <li><button :disabled="currentPage==1? true : false" @click="turnToPage(currentPage-1)"><i class="el-icon-arrow-left"></i></button></li> -->
                    <li v-if="isLastPageS != false && currentPageS != 1" class="unum" @click="turnToPageS(currentPageS-2)">{{currentPageS-2}}</li>
                    <li v-if="currentPageS-1>0"  class="unum" @click="turnToPageS(currentPageS-1)">{{currentPageS-1}}</li>
                    <li class="active" @click="turnToPageS(currentPageS)">{{currentPageS}}</li>
                    <li v-if="isLastPageS != true" class="unum" @click="turnToPageS(currentPageS+1)">{{currentPageS+1}}</li>
                    <li v-if="currentPageS+1 < 3 && isLastPageS != true" class="unum" @click="turnToPageS(currentPageS+2)">{{currentPageS+2}}</li>

                    <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
                    <li><button :disabled="isLastPageS == true? true: false" @click="turnToPageS(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { checkTime } from "@/utils/timer.js";
import { clientList } from "@/config/api.js";
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
      clientList: [],
      serverList: [],
      searchItem: {
        //搜索数据组
        uid: "",
        dtp: "",
        pickerVal:[]
      },
      activeName: "client",
      ctotalClass:'8',
      totalClass:'8',
      // 分页
      currentPageC: 1, //默认显示第几页
      CpageSize: 10, //默认每页条数
      CtotalCount: 1, // 总条数
      isPageNumberErrorC:false,
      MaxIdC:"",
      MinIdC:"",
      nextPageC:"",
      isLastPageC:false,
      lastCurrentPageC:"",

      currentPageS: 1, //默认显示第几页
      SpageSize: 10, //默认每页条数
      StotalCount: 1, // 总条数
      showTitle:true,
      seaBtnLoading: false,
      ClistLoading:true,
      SlistLoading:true,
      isPageNumberErrorS:false,
      MaxIdS:"",
      MinIdS:"",
      nextPageS:"",
      isLastPageS:false,
      lastCurrentPageS:"",
      column:{
        prop:'',
        order:''
      }
    }
  },
  created() {
    this.getList();
    this.getSList()
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
      this.currentPageC = ''
      this.MaxIdC = ''
      this.MinIdC = ''
      this.getList(1)
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
    onSubmit() {
      this.seaBtnLoading = true;
      this.currentPage = 1
      this.getList(1);
      this.seaBtnLoading = false;
    },
    handleSizeChangeC(val) {
      this.CpageSize = val;
      this.currentPageC = 1;
      this.getList();
    },
    handleSizeChangeS(val) {
      this.SpageSize = val;
      this.currentPageS = 1;
      this.getList();
    },
    handleCurrentChangeC(val) {
      this.currentPageC = val;
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    handleCurrentChangeS(val) {
      this.currentPageS = val;
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    turnToPageC(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getList(pageNum)
        }else{
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberErrorC = true;
                return false;
            }else{
                ts.getList(pageNum);
                ts.isPageNumberErrorC = false;
            }
        }
    },
    turnToPageS(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getSList(pageNum)
        }else{
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberErrorS = true;
                return false;
            }else{
                ts.getSList(pageNum);
                ts.isPageNumberErrorS = false;
            }
        }
    },
    sortChange(column){
      this.column = {
        prop:column.prop,
        order:column.order
      }
      this.getList(this.lastCurrentPageC)
    },
    getList(pageNum) {
      this.ClistLoading = true
      let Cparams = {
          startStr: this.searchItem.pickerVal[0],
          endStr: this.searchItem.pickerVal[1],
          uid: this.searchItem.uid,
          dtp: this.searchItem.dtp,
          fieldName: this.column.prop,
          pgstr:this.nextPageC,
          pcstr:this.CpageSize,
          maxId:this.MaxIdC,
          minId:this.MinIdC,
          nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
          currentPage:this.lastCurrentPageC,
          order:this.column.order == 'ascending' ? '0' : ''
        };
        Cparams.sign = deleteParams(Cparams)
        clientList(Cparams).then(res => {
          this.ClistLoading = false
          if(res.data.code == 200){
            this.clientList = res.data.data.data;
            this.ctotalClass = res.data.data.data.length
            this.isLastPageC = res.data.data.lastPage
            this.lastCurrentPageC = res.data.data.currentPage
            this.currentPageC = res.data.data.currentPage
            this.MaxIdC = Math.max.apply(Math, this.clientList.map(function(o) {return o.id}))
            this.MinIdC = Math.min.apply(Math, this.clientList.map(function(o) {return o.id}))
          }else{
              this.$message({
                  message:res.data.errorMessage,
                  type:'error',
                  duration:1500
              });
          }
        }).catch(()=>{
          this.ClistLoading = false
        })
      },
      getSList(pageNum){
        this.SlistLoading = true
        let Sparams = {
          pgstr:this.nextPageS,
          pcstr:this.SpageSize,
          maxId:this.MaxIdS,
          minId:this.MinIdS,
          nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
          currentPage:this.lastCurrentPageS,
        };
        Sparams.sign = deleteParams(Sparams)
        clientList(Sparams).then(res => {
          this.SlistLoading = false
          if(res.data.code == 200){
            this.serverList = res.data.data.data;
            this.totalClass = res.data.data.data.length
            this.isLastPageS = res.data.data.lastPage
            this.lastCurrentPageS = res.data.data.currentPage
            this.currentPageS = res.data.data.currentPage
            this.MaxIdS = Math.max.apply(Math, this.serverList.map(function(o) {return o.id}))
            this.MinIdS = Math.min.apply(Math, this.serverList.map(function(o) {return o.id}))
          }
        }).catch(()=>{
          this.SlistLoading = false
        })
      },
    }
  }
;
</script>

<style scoped>
</style>
