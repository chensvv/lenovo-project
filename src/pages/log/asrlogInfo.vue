<template>
  <div class="table height-40">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item :to="{ name: 'asrloglist', params:{page:this.$route.params.page}}">识别明细报表</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <div class="table-box ruletable asrlogtable" ref="tables">
      <el-table
          :data="list"
          stripe
          :max-height="tableHeight"
          :class="this.totalClass <= '10' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" :inline="true" class="table-expand">
                        <el-form-item label="机器id:">
                            <span>{{ props.row.did }}</span>
                        </el-form-item>
                        <el-form-item label="数据长度:">
                            <span>{{ props.row.data_len }}</span>
                        </el-form-item>
                        <el-form-item label="应用code:">
                            <span>{{ props.row.app }}</span>
                        </el-form-item>
                        <el-form-item label="lenovokey:">
                            <span>{{ props.row.lenovokey }}</span>
                        </el-form-item>
                        <el-form-item label="secretkey:">
                            <span>{{ props.row.lenovokey }}</span>
                        </el-form-item>
                        <el-form-item label="错误信息:" v-if="props.row.status == 'failed'">
                            <span>{{ props.row.errorMessage }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column
              label="用户id"
              prop="uid"
              align="center">
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
          <el-table-column
              label="识别会话id"
              prop="ixid"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.ixid" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.ixid }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.ixid }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="请求序号"
              prop="pidx"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.pidx" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.pidx }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.pidx }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="长短语音"
              prop="sce"
              align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.sce == 'cmd' ? '短语音' :'长语音'}}</span>
                </template>
          </el-table-column>
          <el-table-column
              label="是否尾包"
              prop="over"
              align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.over == 0 ? '否' :'是'}}</span>
                </template>
          </el-table-column>
          <el-table-column
              label="请求耗时"
              prop="useTime"
              align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.useTime}}ms</span>
                </template>
          </el-table-column>
          <el-table-column
              label="识别请求状态"
              prop="status"
              align="center">
                <template slot-scope="scope">
                    <span
                    :class="scope.row.status === 'success' ? 'tag-s' :'tag-d'"
                    >{{scope.row.status == 'success' ? '成功' :'失败'}}</span>
                </template>
          </el-table-column>
          <el-table-column
              label="请求时间"
              prop="startTime"
              align="center"
              :formatter="formTime"
              min-width="130">
          </el-table-column>
        </el-table>
        <!-- <div class="pagination-wrap" v-cloak>
            <ul class="pagination">
                <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                <li v-if="isLastPage != false && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                <li v-if="currentPage+1 < 3 && isLastPage!=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                <li><button :disabled="isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div> -->
    </div>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {asrlogDetail} from '@/config/api'
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
      ixid:"",
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      listLoading:true,
      isLastPage:false,
      tableHeight:0
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
    setTimeout(()=>{
        this.tableHeight = this.$refs.tables.offsetHeight
    },0)
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
      var timer = row.startTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    formTimeStart(row){
      var timer = row
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
    getList() {
      this.listLoading = true
      let params = {
        ixidString:this.$route.params.ixid
      }
      params.sign = deleteParams(params)
      this.list = []
      asrlogDetail(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
        //   this.isLastPage = res.data.data.lastPage
          this.totalClass = res.data.data.length
        //   this.currentPage = res.data.data.currentPage
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
