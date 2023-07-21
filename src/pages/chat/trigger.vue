<template>
  <div class="table height-155">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/csc/csc'}">闲聊数据</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height120 width130" label-width="90px" size="mini">
        <div class="form-input height120">
          <el-form-item label="客户端平台" prop="dtp">
            <el-input v-model.trim="searchItem.dtp" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户ID" prop="uid">
            <el-input v-model.trim="searchItem.uid" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户端版本" prop="clientVersion">
            <el-input v-model.trim="searchItem.clientVersion" clearable></el-input>
          </el-form-item>
          <el-form-item label="引擎版本" prop="engineVersion">
            <el-input v-model.trim="searchItem.engineVersion" clearable></el-input>
          </el-form-item>
          <el-form-item label="开发者" prop="developer">
            <el-input v-model.trim="searchItem.developer" clearable></el-input>
          </el-form-item>
          <el-form-item label="唤醒词类型" prop="keywordType">
            <el-input v-model.trim="searchItem.keywordType" clearable></el-input>
          </el-form-item>
          <el-form-item label="唤醒词" prop="keywordPhrase">
            <el-autocomplete v-model="searchItem.keywordPhrase" :fetch-suggestions="querySearch" @select="handleSelect" clearable></el-autocomplete>
          </el-form-item>
          <el-form-item label="数据来源" prop="origin">
            <el-input v-model.trim="searchItem.origin" clearable></el-input>
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
        <div class="form-btn-block" >
          <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
          <el-button size="mini" @click="dataPack" :loading="zipBtnLoading" v-has="'trigger:zip'">数据打包</el-button>
          <el-button size="mini" @click="packResult" v-has="'trigger:zip:list'">打包结果</el-button>
          <el-button icon="el-icon-download" size="mini" @click="exportBatch" :loading="exportBtnLoading" v-has="'trigger:batchDownload'">批量导出</el-button>
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
            @selection-change="handleSelectionChange"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column
              type="selection"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column
                label="设备类型"
                prop="dtp"
                align="center"
                sortable="custom">
                <!-- <template slot="header">
                  <el-tooltip class="item" effect="dark" content="设备类型" placement="top">
                    <span slot class="headlips">设备类型</span>
                  </el-tooltip>
                </template> -->
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
            <el-table-column
                label="用户ID"
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
                label="客户端版本"
                prop="clientVersion"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.clientVersion" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.clientVersion }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.clientVersion }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="引擎版本"
                prop="engineVersion"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.engineVersion" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.engineVersion }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.engineVersion }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="开发者"
                prop="developer"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.developer" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.developer }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.developer }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="唤醒词类型"
                prop="keywordType"
                align="center"
                sortable="custom">
                <!-- <template slot="header">
                  <el-tooltip class="item" effect="dark" content="唤醒词类型" placement="top">
                    <span slot class="headlips">唤醒词类型</span>
                  </el-tooltip>
                </template> -->
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.keywordType" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.keywordType }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.keywordType }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="唤醒词"
                prop="keywordPhrase"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.keywordPhrase" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.keywordPhrase }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.keywordPhrase }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="数据来源"
                prop="origin"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.origin" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.origin }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.origin }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="数据日期"
                prop="displayDate"
                align="center"
                width="140">
            </el-table-column>
            <el-table-column label="操作" align="center" width="80" v-if="btnshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                     v-has="'trigger:download'"
                    @click="handleDown(scope.$index, scope.row)"
                    >下载文件</el-button>
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
              <li v-if="isLastPage != false && currentPage !=1 && currentPage-2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
              <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
              <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
              <li v-if="isLastPage != true" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
              <li v-if="currentPage+1 < 3 && isLastPage !=true" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
              <!-- <li><button :disabled="lastPage!= 0 && isLastPage == true? true: false" @click="turnToPage(currentPage+1)" ><i class="el-icon-arrow-right"></i></button></li> -->
              <li><button :disabled="isLastPage == true? true: false" @click="turnToPage(-1)"><i class="el-icon-d-arrow-right"></i></button></li>
          </ul>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="数据压缩包下载" :visible.sync="zipVisible" width="40%" top="10vh" :before-close="zipHandleClose">
        <div class="zip_box">
          <div v-for="(item,index) in zipLists" :key="index">
            <el-link type="primary" icon="el-icon-download" @click="downZip(item.filename)">{{item.lasttime}}</el-link>
          </div>
          <div v-if="isshow" style="text-align:center;">暂无数据</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="zipHandleClose">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {triggerList, triggerZip, zipList, zipDownload, topKeyWord, pcmDownload, triggerBatchDownload} from '@/config/api'
import {readablizeBytes} from '@/utils/bytes.js' 
import downUrl from '@/config/http'
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
      zipLists:[],
      keywordList:[],
      exportIds:[],
      totalClass:'8',
      downURLs:downUrl.proURL,
      searchItem:{//搜索数据组
        dtp:"",
        uid:"",
        clientVersion:"",
        engineVersion:"",
        developer:"",
        keywordType:"",
        keywordPhrase:"",
        origin:"",
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
      zipBtnLoading:false,
      listBtnLoading:false,
      exportBtnLoading:false,
      downloading:false,
      zipVisible:false,
      listLoading:true,
      isshow:false,
      btnshow:true,
      isPageNumberError:false,
      MaxId:"",
      MinId:"",
      nextPage:"",
      isLastPage:false,
      lastCurrentPage:""
    };
  },
  created() {
    let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
    perArr.map(t=>{
      this.perList.push(Object.values(t).join())
    })
    this.getList()
    
  },
  mounted(){
    if(this.perList.indexOf('trigger:download') == -1){
      this.btnshow = false
    }
    this.getKeywordList()
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
    handleDown(index,row){
      pcmDownload(row.filePath).then(res=>{
        let blobUrl = new Blob([res.data])
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blobUrl);
        let filename = row.filePath
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      // let a = document.createElement('a');
      //   a.href = downURL;
      //   a.download = d;
      //   a.click();
      //   window.URL.revokeObjectURL(url);
    },
    downZip(data){
      this.downloading = true
      zipDownload(data).then(res=>{
        this.downloading = false
        let blobUrl = new Blob([res.data])
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blobUrl);
        let filename = data
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      })
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
    handleSelectionChange(val){
      this.exportIds = val
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
    exportBatch(){
      let ids = this.exportIds.map(item => item.id)
      if(ids.length == 0 || ids == [] || ids == null){
        this.$message({
            message:'请选择要导出的数据',
            type:"warning",
            duration:1500
        });
      }else{
        this.exportBtnLoading = true
        let batchParams = {
          ids:ids
        }
        batchParams.sign = deleteParams(batchParams)
        triggerBatchDownload(batchParams).then(res=>{
                this.exportBtnLoading = false
                let blobUrl = new Blob([res.data])
                let a = document.createElement('a');
                let url = window.URL.createObjectURL(blobUrl);
                let filename = ids.join('-')+'.zip'
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            }).catch(()=>{
              this.$message({
                  message:'请稍后再试！',
                  type:"error",
                  duration:1500
                });
              this.exportBtnLoading = false
            })
      }
    },
    dataPack(){
      let zipParams = {
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        dtp:this.searchItem.dtp,
        uid:this.searchItem.uid,
        clientVersion:this.searchItem.clientVersion,
        engineVersion:this.searchItem.engineVersion,
        developer:this.searchItem.developer,
        keywordType:this.searchItem.keywordType,
        keywordPhrase:this.searchItem.keywordPhrase,
        origin:this.searchItem.origin,
        userName:sessionStorage.getItem('username')
      }
      zipParams.sign = deleteParams(zipParams)
      this.zipBtnLoading = true
      triggerZip(zipParams).then(res=>{
            this.zipBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:'打包成功',
                type:"success",
                duration:1500
            });
        }else{
            if(res.data.code != undefined){
                this.$message({
                    message:res.data.code+'：'+res.data.msg,
                    type:'error',
                    duration:2000
                });
            }
        }
      }).catch(error=>{
        this.zipBtnLoading = false
        this.$message({
            message:res.data.msg,
            type:"error",
            duration:1500
        });
      })
    },
    packResult(){
      this.zipVisible = true
      let userparams = {
        userName:sessionStorage.getItem('username')
      }
      userparams.sign = deleteParams(userparams)
      zipList(userparams).then(res=>{
        this.zipLists = res.data.array
        if(this.zipLists.length == 0){
          this.isshow = true
        }
        
      })
    },
    zipHandleClose(){
      this.zipVisible = false
    },
    zipFileDownload(d){
      var openURL = downUrl.proURL+'/lasf-mgr/trigger/download?fileName='+d+'&fileType=zip'
      let a = document.createElement('a');
      // let url = window.URL.createObjectURL(blobUrl);
        a.href = openURL;
        a.download = d;
        a.click();
        // window.URL.revokeObjectURL(url);
      // this.loadShow = true
      // this.total = readablizeBytes(s)
      // let downParams = {
      //   fileName:d,
      //   fileType:'zip'
      // }
      // let proConfig = {
      //     onDownloadProgress: progressEvent => {
      //         var complete = readablizeBytes(progressEvent.loaded)
      //         this.loadeds = complete
      //     }
      // }
      // this.$http({
      //   method:'post',
      //   url:downUrl.proURL+'/lasf-mgr/trigger/download',
      //   data:downParams,
      //   headers: {
      //     'Content-Type': 'application/json; application/octet-stream'
      //   },
      //   responseType: 'blob',
      //   proConfig,
      // }).then(res=>{
      //   let blobUrl = new Blob([res.data], {type: 'application/zip'})
      //   let a = document.createElement('a');
      //   let url = window.URL.createObjectURL(blobUrl);
      //   a.href = url;
      //   a.download = d;
      //   a.click();
      //   window.URL.revokeObjectURL(url);
      // }).catch(error=>{
      //   this.$message({
      //       message:res.data.message,
      //       type:"error",
      //       duration:1500
      //   });
      // })
    },
    querySearch(queryString, cb) {
      var keywordList = this.keywordList;
      var results = queryString ? keywordList.filter(this.createFilter(queryString)) : keywordList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getKeywordList(){
      topKeyWord().then(res=>{
        this.keywordList = res.data.data
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
        startStr:this.searchItem.pickerVal == null ? '': this.searchItem.pickerVal[0],
        endStr:this.searchItem.pickerVal == null ? '': this.searchItem.pickerVal[1],
        dtp:this.searchItem.dtp,
        uid:this.searchItem.uid,
        clientVersion:this.searchItem.clientVersion,
        engineVersion:this.searchItem.engineVersion,
        developer:this.searchItem.developer,
        keywordType:this.searchItem.keywordType,
        keywordPhrase:this.searchItem.keywordPhrase,
        origin:this.searchItem.origin,
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
      triggerList(params).then(res => {
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
