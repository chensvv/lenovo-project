<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini"  @submit.native.prevent>
      <div class="form-input height70">
        <el-form-item label="客户端设备类型" prop="dtp">
          <el-input v-model.trim="searchItem.dtp" clearable @keydown.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="客户端IP" prop="uip">
          <el-input v-model.trim="searchItem.uip" clearable @keydown.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="开发者ID" prop="app">
          <el-input v-model.trim="searchItem.app" clearable @keydown.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="识别文本" prop="desc">
          <el-input v-model.trim="searchItem.desc" clearable @keydown.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        </el-form-item>
      </div>
      <div class="form-btn">
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
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
              <el-table-column label="客户端设备类型" prop="dtp" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="版本" prop="ver" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端ip" prop="uip" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="客户端设备ID" prop="did" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="开发者ID" prop="dev" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="应用ID" prop="zhi" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="设备文本" prop="tai" align="left"  :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="音频文件" align="center" width="80" v-if="isshow">
                <template slot-scope="scope">
                    <span 
                    slot 
                    @click="handleInfo(scope.$index, scope.row)" 
                    class="cur-info"
                    v-has="'asr:log:download'"><i class="el-icon-folder-opened icon"></i></span>
                </template>
            </el-table-column>
          </el-table>
      <div class="pagination-wrap" v-cloak>
          <ul class="pagination">
              <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
              <li v-if="currentPage == getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
              <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
              <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
              <li v-if="currentPage != getpageNum(totalCount) && getpageNum(totalCount) !=0" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
              <li v-if="currentPage+1 < 3 && currentPage != getpageNum(totalCount) && getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
              <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0 ? true : false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {rvdList} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import countTo from 'vue-count-to';
import downUrl from '@/config/http'
import {getpageNum} from '@/utils/pagination.js'
export default {
  components: {countTo },
  data() {
    return {
      getpageNum:getpageNum,
      list: [],
      perList:[],
      totalClass:'8',
      searchItem:{//搜索数据组
        dtp:"",
        uip:"",
        app:"",
        desc:""
      },
      columns: [
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
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      listLoading:false,
      isshow:true,
      startVal:0,
      endVal:0
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
      if(this.perList.indexOf('asr:log:download') == -1){
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
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    handleInfo(index,row){
      // var name = row.ixid+'.raw'
      // let downParams = {
      //   id:row.id
      // }
      let openUrl = downUrl.proURL + '/lasf-mgr/asr/log/download?id='+row.id
      window.open(openUrl)
      
      // rvdDownload(downParams).then(res=>{
      //   if(res.data.code == 200){
      //     let a = document.createElement('a');
      //     a.href = row.rfp;
      //     a.download = name,
      //     a.click();
      //   }else{
      //     this.$message({
      //         message:res.data.code+'：'+res.data.msg,
      //         type:"error",
      //         duration:2000
      //     });
      //   }
      // })
      
    },
    turnToPage(pageNum){
        var ts = this;
        var pageNum = parseInt(pageNum);
        if(pageNum == -1){
            ts.getList(pageNum)
        }else{
            ts.currentPage = pageNum
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
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        dtp:this.searchItem.dtp,
        uip:this.searchItem.uip,
        app:this.searchItem.app,
        desc:this.searchItem.desc
      }
      params.sign = deleteParams(params)
      rvdList(params).then(res=>{
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data.data
          this.totalCount = res.data.data.total
          this.endVal = res.data.count
          this.totalClass = res.data.data.data.length
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
