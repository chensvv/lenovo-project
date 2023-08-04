<template>
  <div class="table height-135">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-button class="success" size="mini" @click="handleAdd()">添加</el-button> -->
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height100 width130" @submit.native.prevent size="mini">
      <div class="form-input height100">
        <el-form-item label="通道" prop="channel">
              <el-select v-model.trim="searchItem.channel" placeholder="--" clearable>
                  <el-option label="单通道" value="1"></el-option>
                  <el-option label="双通道" value="8"></el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="比特率" prop="rate">
              <el-select v-model.trim="searchItem.rate" placeholder="--" clearable>
                  <el-option label="8000" value="8000"></el-option>
                  <el-option label="16000" value="16000"></el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="会话id" prop="sessionId">
          <el-input v-model.trim="searchItem.sessionId" clearable></el-input>
        </el-form-item>
        <el-form-item label="lenovoKey" prop="lenovoKey">
          <el-input v-model.trim="searchItem.lenovoKey" clearable></el-input>
        </el-form-item>
        <el-form-item label="secretKey" prop="secretKey">
          <el-input v-model.trim="searchItem.secretKey" clearable></el-input>
        </el-form-item>
          <el-form-item label="长短语音" prop="sce">
              <el-select v-model.trim="searchItem.sce" placeholder="--" clearable>
                  <el-option label="cmd" value="cmd"></el-option>
                  <el-option label="long" value="long"></el-option>
                  <el-option label="iat" value="iat"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="语言" prop="language">
              <el-select v-model.trim="searchItem.language" placeholder="--" clearable>
                  <el-option label="chinese" value="chinese"></el-option>
                  <el-option label="english" value="english"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否离线" prop="offline">
              <el-select v-model.trim="searchItem.offline" placeholder="--" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
              </el-select>
          </el-form-item>
      </div>
          
          <div class="form-btn" >
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
                label="通道"
                prop="channel"
                align="center"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span
                    disable-transitions>{{scope.row.channel == 1 ? '单通道': '双通道'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="比特率"
                prop="rate"
                align="center"
                >
            </el-table-column>
            <el-table-column
                label="会话id"
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
                label="lenovoKey"
                prop="lenovoKey"
                 align="center">
                 <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.lenovoKey" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.lenovoKey }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.lenovoKey }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="secretKey"
                prop="secretKey"
                 align="center">
                 <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.secretKey" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.secretKey }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.secretKey }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="字节数"
                prop="voiceBytes"
                 align="center">
                 <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.voiceBytes" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.voiceBytes }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.voiceBytes }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="长短语音"
                prop="sce"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.sce" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.sce }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.sce }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="语言"
                prop="language"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.language" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.language }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.language }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="是否离线"
                prop="offline"
                 align="center">
                 <template slot-scope="scope">
                    <span
                    disable-transitions>{{scope.row.offline == 1 ? '是': '否'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="添加时间"
                prop="createTime"
                align="center"
                width="130"
                :formatter="formTime">
            </el-table-column>
            <el-table-column
                label="修改时间"
                prop="updateTime"
                align="center"
                width="130"
                :formatter="formTime2">
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
              <li v-if="isLastPage != false && currentPage !=1 && currentPage-2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
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
import {voicebytes} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
      list: [],
      totalClass:'8',
      searchItem:{//搜索数据组
        channel:"",
        rate:"",
        sessionId:"",
        lenovoKey:"",
        secretKey:"",
        sce:"",
        language:"",
        offline:"",
        // refreshTime:"",
        // putTime:""
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      listLoading:true,
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
    formTime2(row, column){
      var timer = row.updateTime
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
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
    getList(pageNum) {
      this.listLoading = true
      let params = {
        channel:this.searchItem.channel,
        rate:this.searchItem.rate,
        sessionId:this.searchItem.sessionId,
        lenovoKey:this.searchItem.lenovoKey,
        secretKey:this.searchItem.secretKey,
        sce:this.searchItem.sce,
        language:this.searchItem.language,
        offline:this.searchItem.offline,
        pgstr:this.nextPage,
        pcstr:this.pageSize,
        maxId:this.MaxId,
        minId:this.MinId,
        nextPage:pageNum == 1 || pageNum == undefined ? '1' : pageNum,
        currentPage:this.lastCurrentPage,
      }
      params.sign = deleteParams(params)
      voicebytes(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data;
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
