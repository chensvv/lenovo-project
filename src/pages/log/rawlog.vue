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
        <el-form-item label="客户端IP" prop="uip">
          <el-input v-model.trim="searchItem.uip" clearable></el-input>
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
        <el-table-column label="客户端IP" prop="uip" align="center">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.uip" placement="top">
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                  {{ scope.row.uip }}
                  </div>
              </el-tooltip>
              <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                  {{ scope.row.uip }}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="客户端ID" prop="did" align="center">
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
        <el-table-column label="插入时间" prop="it" align="center"  :formatter="formTime" width="130"></el-table-column>
        <el-table-column label="原始日志" align="center" width="80" v-if="isshow">
          <template slot-scope="scope">
            <span slot @click="handleInfo(scope.$index, scope.row)" class="cur-info" v-has="'asr:rawview'">
              <i class="el-icon-search icon"></i>
            </span>
          </template>
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
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="详情" :visible.sync="editVisible" width="40%" top="10vh" :before-close="handleClose" class="log-info">
        <pre>{{infoList}}</pre>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="edithandleConfirm()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {rawList,rawView} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import countTo from 'vue-count-to';
export default {
  components: {countTo },
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
            let times = Date.now();
            return time.getTime() > times;
          },
      },
      list: [],
      perList:[],
      infoList:[],
      totalClass:'8',
      searchItem:{//搜索数据组
        uid:"",
        dtp:"",
        uip:"",
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
      editVisible:false,
      listLoading:true,
      isshow:true,
      isPageNumberError:false,
      MaxId:"",
      MinId:"",
      nextPage:"",
      isLastPage:false,
      lastCurrentPage:""
      // bigId:1
    };
  },
  created() {
      let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
      perArr.map(t=>{
          this.perList.push(Object.values(t).join())
      })
      this.getList();
  },
  mounted(){
      if(this.perList.indexOf('asr:rawview') == -1){
          this.isshow = false
      }
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
      // this.currentPage = ''
      this.MaxId = ''
      this.MinId = ''
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
    onSubmit(){
      this.seaBtnLoading = true
      // this.currentPage = ''
      this.getList(1)
      this.seaBtnLoading = false
    },
    handleClose() {
      this.editVisible = false;
    },
    edithandleConfirm(){
      this.editVisible = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`);
      // this.bigId = this.comId.id
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
    handleInfo(index,row){
      let infoParams = {
        id:row.id
      }
      infoParams.sign = deleteParams(infoParams)
      rawView(infoParams).then(res=>{
        this.infoList = res
        this.editVisible = true;
      })
    },
    sortChange(column){
        this.column = {
            prop:column.prop,
            order:column.order
        }
        this.getList()
    },
    getList(pageNum) {
      this.listLoading = true
      let params = {
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1], 
        uid:this.searchItem.uid,
        dtp:this.searchItem.dtp,
        uip:this.searchItem.uip,
        fieldName: this.column.prop,
        order:this.column.order == 'ascending' ? '0' : '',
        pgstr:this.nextPage,
        pcstr:this.pageSize,
        maxId:this.MaxId,
        minId:this.MinId,
        nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
        currentPage:this.lastCurrentPage
      }
      params.sign = deleteParams(params)
      rawList(params).then(res=>{
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          this.totalClass = res.data.data.data.length
          this.MaxId = Math.max.apply(Math, this.list.map(function(o) {return o.id}))
          this.MinId = Math.min.apply(Math, this.list.map(function(o) {return o.id}))
          this.isLastPage = res.data.data.lastPage
          this.lastCurrentPage = res.data.data.currentPage
          this.currentPage = res.data.data.currentPage
        }else{
            if(res.data.code != undefined){
                this.$message({
                    message:res.data.code+'：'+res.data.msg,
                    type:'error',
                    duration:2000
                });
            }
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
