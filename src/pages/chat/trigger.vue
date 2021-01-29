<template>
  <div class="table trigg">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-button class="success" size="mini" @click="handleAdd()">添加</el-button> -->
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline trigger" size="mini" label-width="70px">
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
            <el-input v-model.trim="searchItem.keywordPhrase" clearable></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="origin">
            <el-input v-model.trim="searchItem.origin" clearable></el-input>
          </el-form-item>
          <el-form-item label="起始时间" prop="refreshTime" class="width140">
              <el-date-picker 
                type="date" 
                placeholder="选择日期" 
                v-model="searchItem.refreshTime" 
                :picker-options="pickerOptions"
                style="width: 100%;"
                value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="putTime" class="width140">
              <el-date-picker 
                type="date" 
                placeholder="选择日期" 
                v-model="searchItem.putTime" 
                :picker-options="pickerOptions"
                style="width: 100%;"
                value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item class="sub-btn" >
            <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
            <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
            <el-button size="mini" @click="dataPack" :loading="zipBtnLoading">数据打包</el-button>
            <el-button size="mini" @click="packResult" :loading="listBtnLoading">打包结果</el-button>
          </el-form-item>
          
    </el-form>

    
      
    <div class="table-box">
      <el-table
            :data="list"
            :class="this.totalCount < 5 ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="设备类型"
                prop="dtp"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="用户ID"
                prop="uid"
                align="center">
            </el-table-column>
            <el-table-column
                label="客户端版本"
                prop="clientVersion"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="引擎版本"
                prop="engineVersion"
                 align="center"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="开发者"
                prop="developer"
                 align="center"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="唤醒词类型"
                prop="keywordType"
                 align="center"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="唤醒词"
                prop="keywordPhrase"
                 align="center"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="数据来源"
                prop="origin"
                 align="center"
                 :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="数据日期"
                prop="displayDate"
                align="center"
                min-width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" v-if="btnshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                     v-has="'trigger:download'"
                    @click="handleDown(scope.$index, scope.row)"
                    >下载文件</el-button>
                </template>
            </el-table-column>
        </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <el-dialog title="数据压缩包下载" :visible.sync="zipVisible" width="300" :before-close="zipHandleClose">
        <div class="zip_box">
          <el-link type="primary" icon="el-icon-download" v-for="(item,index) in zipLists" :key="index" @click="zipFileDownload(item.filename)">{{item.filename}}({{item.lasttime}})</el-link>
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
import {triggerList, triggerZip, zipList, zipDownload} from '@/config/api'
import {readablizeBytes} from '@/utils/bytes.js' 
import downUrl from '@/config/http'
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
      perList:[],
      zipLists:[],
      searchItem:{//搜索数据组
        dtp:"",
        uid:"",
        clientVersion:"",
        engineVersion:"",
        developer:"",
        keywordType:"",
        keywordPhrase:"",
        origin:"",
        refreshTime:"",
        putTime:""
      },
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      zipBtnLoading:false,
      listBtnLoading:false,
      zipVisible:false,
      listLoading:true,
      isshow:false,
      btnshow:true
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
    if(this.perList.indexOf('trigger:download') == -1){
      this.btnshow = false
    }
  },
  methods: {
    handleDown(index,row){
      let downURL = downUrl.proURL+'/lasf-mgr/trigger/download?fileName='+row.filePath
      window.open(downURL)
      // let a = document.createElement('a');
      //   a.href = downURL;
      //   a.download = d;
      //   a.click();
      //   window.URL.revokeObjectURL(url);
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
      console.log(`当前页: ${val}`);
      this.getList();
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
        origin:this.searchItem.origin
      }
      this.zipBtnLoading = true
      triggerZip(zipParams).then(res=>{
            this.zipBtnLoading = false
        if(res.data.code == 200){
            this.$message({
                message:'打包成功',
                type:"success",
                duration:1000
            });
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            });
        }
      }).catch(error=>{
        this.zipBtnLoading = false
        this.$message({
            message:res.data.message,
            type:"error",
            duration:1000
        });
      })
    },
    packResult(){
      this.zipVisible = true
      zipList().then(res=>{
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
        a.href = openURL;
        a.download = d;
        a.click();
        window.URL.revokeObjectURL(url);
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
      //       duration:1000
      //   });
      // })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.refreshTime,
        endStr:this.searchItem.putTime,
        dtp:this.searchItem.dtp,
        uid:this.searchItem.uid,
        clientVersion:this.searchItem.clientVersion,
        engineVersion:this.searchItem.engineVersion,
        developer:this.searchItem.developer,
        keywordType:this.searchItem.keywordType,
        keywordPhrase:this.searchItem.keywordPhrase,
        origin:this.searchItem.origin
      }
      triggerList(params).then(res => {
        this.listLoading = false
        this.list = res.data.data;
        this.totalCount = res.data.count
      })
    }
  }
};
</script>

<style scoped>

</style>
