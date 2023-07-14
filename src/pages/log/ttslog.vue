<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/asr/log/client'}">日志管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="101px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="状态" prop="status">
          <el-select v-model.trim="searchItem.status" placeholder="--" clearable>
              <el-option label="成功" value="success"></el-option>
              <el-option label="失败" value="failed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="pickerVal" class="nludate-form">
                <el-date-picker
                    v-model="searchItem.pickerVal"
                    type="datetimerange"
                    align="center"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                </el-date-picker>
            </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
      </div>
      
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          stripe
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="sessionId"
              prop="sessionId"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.sessionId" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.sessionId }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.sessionId }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="结果信息"
              prop="resultInfo"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.resultInfo" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.resultInfo }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.resultInfo }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="合成文本"
              prop="ttsText"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ttsText" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.ttsText }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.ttsText }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="状态"
              prop="status"
              align="center"
              width="50">
                <template slot-scope="scope">
                    <span
                    :class="scope.row.status === 'success' ? 'tag-s' :'tag-d'"
                    >{{scope.row.status == 'success' ? '成功' :'失败'}}</span>
                </template>
          </el-table-column>
          <el-table-column
              label="开始时间"
              prop="startTime"
              align="center"
              :formatter="formTimeStart"
              width="155">
          </el-table-column>
          <el-table-column
              label="结束时间"
              prop="endTime"
              align="center"
              :formatter="formTimeEnd"
              width="155">
          </el-table-column>
          <el-table-column
              label="添加时间"
              prop="createTime"
              align="center"
              :formatter="formTime">
          </el-table-column>
          
      </el-table>
      <div class="pagination-wrap" v-cloak>
            <ul class="pagination">
                <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                <li v-if="isLastPage != false && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                <li v-if="currentPage+1 < 3 && isLastPage!=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                <li><button :disabled="isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {ttslogList} from '@/config/api'
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
      perList:[],
      totalClass:'8',
      searchItem:{//搜索数据组
        status:"",
        pickerVal:[]
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      listLoading:true,
      isLastPage:false
    };
  },
  created() {
    let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
    perArr.map(t=>{
      this.perList.push(Object.values(t).join())
    })
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
      var timer = row.createTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    formTimeStart(row, column){
      var timer = row.startTime
      var date = new Date(timer)
      var ms = date.getMilliseconds()
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())+':'+
        checkTime(date.getSeconds())+':'+
        (ms<10?'00'+ms : ms<100?'0'+ms :ms)
    },
    formTimeEnd(row, column){
      var timer = row.endTime
      var date = new Date(timer)
      var ms = date.getMilliseconds()
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())+':'+
        checkTime(date.getSeconds())+':'+
        (ms<10?'00'+ms : ms<100?'0'+ms :ms)
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
    turnToPage(pageNum){
        // this.currentPage = pageNum
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getList(pageNum)
        }else{
            // ts.currentPage = pageNum
            if (!pageNum || pageNum < 1) {
                console.log('页码输入有误！');
                return false;
            }else{
                ts.getList(pageNum)
            }
        }
    },
    getList(pageNum) {
      this.listLoading = true
      let params = {
        nextPage:pageNum == 1 || pageNum == undefined ? 1 : pageNum,
        pcstr:this.pageSize,
        status:this.searchItem.status,
        startStr:this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal[1]
      }
      params.sign = deleteParams(params)
      this.list = []
      ttslogList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          this.isLastPage = res.data.data.lastPage
          this.totalClass = res.data.data.data.length
          this.currentPage = res.data.data.currentPage
        }else{
            this.$message({
                message:res.data.code+'：'+res.data.msg,
                type:'error',
                duration:2000
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
