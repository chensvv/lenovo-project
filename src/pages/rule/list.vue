<template>
  <div class="table height-105">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/qa/list'}">规则定义</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
      <div class="form-input height70">
        <el-form-item label="渠道" prop="channelVal">
          <el-select v-model="searchItem.channelVal" placeholder="请选择" clearable size="mini">
              <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.context"
              :value="item.id">
              </el-option>
          </el-select>
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
                :default-value="new Date(new Date() - 24*60*60*30*1000)">
            </el-date-picker>
        </el-form-item>
      </div>
      
      <div class="form-btn">
        <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleImport()" v-has="'showmode:add'">导入喜马拉雅数据</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'showmode:add'">创建资源</el-button>
        <el-button size="mini" @click="handleAddChannel()" v-has="'config:list'">添加渠道类型</el-button>
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
          <el-table-column
              label="渠道"
              prop="channelStr"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.channelStr" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.channelStr }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.channelStr }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
            label="资源图片"
            align="center" 
            >
            <template slot-scope="scope">
                <img :src="scope.row.phoneImg" class="thum" />
            </template>
            </el-table-column>
          <el-table-column
              label="资源说明"
              prop="description"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.description" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.description }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.description }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="名称"
              prop="name"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.name" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.name }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.name }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="类型"
              prop="typeStr"
              align="center">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.typeStr" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.typeStr }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.typeStr }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              width="130">
          </el-table-column>
          <el-table-column label="添加到待发布" align="center" min-width="80" v-if="issueshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleIssue(scope.$index, scope.row)"
                  v-has="'showmode:toBeReleased'">{{scope.row.publishStatus == 0 ? '添加' : '撤回'}}</el-button>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="130" align="center"  v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'showmode:update'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'showmode:delete'">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="添加资源渠道类型" :visible.sync="addResVisible" width="40%" top="10vh" :before-close="addResHandleClose" @open="openResFun('addResList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addResRules" :model="addResList" ref="addResList">
        <el-form-item label="资源类型" prop="resType">
            <el-select v-model="addResList.resType" placeholder="请选择" @change="selectChanged">
                <el-option
                v-for="item in resTypeList"
                :key="item.id"
                :label="item.context"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="资源渠道" prop="resChannel">
          <el-input type="text" v-model.trim="addResList.resChannel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用包名" prop="appname" v-if="appname">
          <el-input type="text" v-model.trim="addResList.appname" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addResHandleClose">取 消</el-button>
        <el-button type="primary" @click="addResHandleConfirm('addResList')" :loading="addResBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import Cropper from "@/components/cropper";
import {showModeList, showModeRele, configList, configAdd, showModeImport,showModeDel} from '@/config/api'
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
      channelList:[],//渠道
      typeList:[],//类型
      phoneTypeList:[],//机型
      resTypeList:[],
      totalClass:'6',
      selectList:[
            {typeLabel:"是",typeVal:"1"},
            {typeLabel:"否",typeVal:"0"}
        ],
      addResList: {
        resType:"",
        resChannel:"",
        appname:""
      },
      searchItem:{//搜索数据组
        channelVal:"",
        pickerVal:[]
      },
      addResRules:{
        resType:[{ required: true, message: '请选择资源类型', trigger: 'blur' }],
        resChannel:[{ required: true, message: '请输入资源渠道', trigger: 'blur' }],
        appname:[{ required: true, message: '请输入应用包名', trigger: 'blur' }],
      },
      addResVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 7,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
    //   图片上传裁剪参数
      seaBtnLoading:false,
      addResBtnLoading:false,
      listLoading:true,
      isshow:true,
      issueshow:true,
      appname:false
    };
  },
  components: {
    Cropper
  },
  watch: {
    addDefaultImgList: {
      handler: function(newVal, oldVal){
        this.addProductImageList = newVal   // 赋值
      },
      deep: true
    }
  },
  created() {
      let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
      perArr.map(t=>{
          this.perList.push(Object.values(t).join())
      })
      this.getList();
      this.getChannelList()
  },
  mounted(){
      if(this.perList.indexOf('showmode:update') == -1 && this.perList.indexOf('showmode:delete') == -1){
          this.isshow = false
      }
      if(this.perList.indexOf('showmode:toBeReleased') == -1){
          this.issueshow = false
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
    formTime(row, column){
      var timer = row.createTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
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
    selectChanged(value) {
      console.log(value)
      if(value == 1){
        this.appname = true
      }else{
        this.appname = false
      }
    },
    handleEdit(index, row) {
        this.$router.push({
            path: '/showmode/edit', 
            query: {
                data: JSON.stringify(row)
            }
        })
    },
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      delParams.sign = deleteParams(delParams)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          showModeDel(delParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:1500
                });
                this.getList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1500
                });
            }
          })
        }).catch((err) => {
          console.log(err);
        });
    },
    handleIssue(index, row) {
        let issueParams = {
            id:row.id,
            publishStatus:row.publishStatus
        }
        issueParams.sign = deleteParams(issueParams)
        showModeRele(issueParams).then(res=>{
        if(res.data.code == 200){
            this.$message({
                message:'操作成功',
                type:"success",
                duration:1500
            });
            this.getList();
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1500
            });
        }
        })
    },
    handleImport() {
        showModeImport().then(res=>{
        if(res.data.code == 200){
            this.$message({
                message:'导入成功',
                type:"success",
                duration:1500
            });
            this.getList();
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1500
            });
        }
        })
    },
    openResFun(addResList){
      this.$nextTick(() => {
        if(this.$refs[addResList]){
          this.$refs[addResList].resetFields();
        }
      })
    },
    addResHandleClose(){
      this.addResVisible = false
    },
    handleAdd(){
      this.$router.push({
          path:'/showmode/add'
      })
    },
    handleAddChannel(){
        this.addResVisible = true
        this.getResTypeList()
    },
    addResHandleConfirm(addResList){
        let addResParams = {
          parentCode:this.addResList.resType,
          context:this.addResList.resChannel,
          appPackageName:this.addResList.appname
        }
        addResParams.sign = deleteParams(addResParams)
      this.$refs[addResList].validate((valid) => {
          if (valid) {
              this.addResBtnLoading = true
              configAdd(addResParams).then(res=>{
                this.addResBtnLoading = false
                if(res.data.code == 200){
                    this.$message({
                        message:'添加成功',
                        type:"success",
                        duration:1500
                    });
                    this.getList()
                    this.getChannelList()
                    this.addResVisible = false
                }else{
                    
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1500
                    });
                }
            }).catch(err => {
                this.addBtnLoading = false
            })
          } else {
          return false;
        }
      })
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        startStr:this.searchItem.pickerVal[0],
        endStr: this.searchItem.pickerVal[1],
        channel: this.searchItem.channelVal
      }
      params.sign = deleteParams(params)
      showModeList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
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
    getChannelList(){
        let configParams = {
          parentCode:1
      }
      configParams.sign = deleteParams(configParams)
      configList(configParams).then(res=>{
          this.channelList = res.data.data
      })
    },
    getTypeList(){
        let typeParams = {
          parentCode:2
      }
      typeParams.sign = deleteParams(typeParams)
      configList(typeParams).then(res=>{
          this.typeList = res.data.data
      })
    },
    getPhoneTypeList(){
        let phoneParams = {
          parentCode:3
      }
      phoneParams.sign = deleteParams(phoneParams)
      configList(phoneParams).then(res=>{
          this.phoneTypeList = res.data.data
      })
    },
    getResTypeList(){
        let resParams = {
          parentCode:0
      }
      resParams.sign = deleteParams(resParams)
      configList(resParams).then(res=>{
          this.resTypeList = res.data.data
      })
    }
  },
};
</script>

<style scoped>

</style>
