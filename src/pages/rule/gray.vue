<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/qa/list'}">规则定义</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/showmode/conf'}">资源发布</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini" style="float:right;">
      <div class="form-btn">
        <el-button size="mini" v-has="'gray:add'" @click="handleAddGray()">新增灰度</el-button>
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
              label="内容"
              prop="currentContext"
              align="left">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.currentContext" placement="top">
                      <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                      {{ scope.row.currentContext }}
                      </div>
                  </el-tooltip>
                  <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                      {{ scope.row.currentContext }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column
              label="发布时间"
              prop="createTime"
              align="center"
              :formatter="formTime"
              width="130">
          </el-table-column>
          <el-table-column label="操作" align="left" width="130" v-if="isshow">
              <template slot-scope="scope">
                  <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-has="'gray:updGray'">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)"
                  v-has="'gray:delete'">删除</el-button>
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
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增灰度" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @close="openFun('addItem')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addItem" ref="addItem">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model.trim="addItem.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="context">
          <el-input type="text" v-model.trim="addItem.context" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHandleClose">取 消</el-button>
        <el-button type="primary" @click="addHandleConfirm('addItem')" :loading="addBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
      <el-form :label-position="'right'" label-width="100px" :rules="editRules" :model="currentItem" ref="currentItem">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="currentItem.name" readonly auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="context">
          <el-input type="text" v-model="currentItem.context" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import { grayAdd, listGrays, updGray, deleteGray} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
  data() {
    return {
      getpageNum:getpageNum,
      list: [],
      perList:[],
      infoList:[],
      phoneList:[],
      grayList:[],
      totalClass:'8',
      addItem:{
          name:'',
          context:''
      },
      currentItem: {//编辑数据组
        grayId:"",
        name:"",
        context:''
      },
      addRules:{
        name:[{ required: true, message: '请输入名称', trigger: 'blur' }], 
        context:[{ required: true, message: '请输入内容', trigger: 'blur' }], 
      },
      editRules:{
        name:[{ required: true, message: '请输入名称', trigger: 'blur' }], 
        context:[{ required: true, message: '请输入内容', trigger: 'blur' }], 
      },
      addVisible:false,
      addBtnLoading:false,
      editVisible:false,
      editBtnLoading:false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      isshow:true
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
      if(this.perList.indexOf('gray:updGray') == -1 && this.perList.indexOf('gray:delete') == -1){
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
    formTime(row, column){
      var timer = row.createTime
      var date = new Date(timer)
      return date.getFullYear()+'-'+
        checkTime(date.getMonth()+1)+'-'+
        checkTime(date.getDate())+' '+
        checkTime(date.getHours())+':'+
        checkTime(date.getMinutes())
    },
    openFun(addItem){
      this.$nextTick(() => {
        if(this.$refs[addItem]){
          this.$refs[addItem].resetFields();
        }
      })
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
    handleEdit(index, row) {
      this.editVisible = true;
      this.currentItem = {
        grayId:row.grayId,
        name: row.name,
        context:row.currentContext
      };
    },
    closeFun(currentItem){
      this.$nextTick(() => {
        if(this.$refs[currentItem]){
          this.$refs[currentItem].clearValidate();
        }
      })
    },
    editHandleClose(){
        this.editVisible = false;
    },
    handleAddGray(){
      this.addVisible = true
    },
    addHandleClose(){
      this.addVisible = false
    },
    addHandleConfirm(addItem) {
      let addParams = {
        name:this.addItem.name,
        currentContext:this.addItem.context
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addItem].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          grayAdd(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'新增成功',
                    type:"success",
                    duration:2000
                });
                this.getList();
                this.addVisible = false
            }else{
                this.$message({
                    message:res.data.code+'：'+res.data.msg,
                    type:"error",
                    duration:2000
                });
            }
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    handleDel(index, row) {
      let delParams = {
        grayId:row.grayId
      }
      delParams.sign = deleteParams(delParams)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          deleteGray(delParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'删除成功',
                    type:"success",
                    duration:2000
                });
                this.getList();
            }else{
                this.$message({
                    message:res.data.code+'：'+res.data.msg,
                    type:"error",
                    duration:2000
                });
            }
          })
        }).catch((err) => {
          console.log(err);
        });
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        grayId:this.currentItem.grayId,
        name:this.currentItem.name,
        currentContext:this.currentItem.context
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          updGray(updParams).then(res=>{
                this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:2000
                });
                this.getList()
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.code+'：'+res.data.msg,
                    type:"error",
                    duration:2000
                });
            }
          }).catch(err => {
            this.editBtnLoading = false
          })
        } else {
          return false;
        }
      });
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
      let listParams = {
          pgstr:this.currentPage,
          pcstr:this.pageSize,
      }
      listParams.sign = deleteParams(listParams)
      listGrays(listParams).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
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
    },
  }
};
</script>

<style scoped>
</style>
