<template>
  <div class="table height-85">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规则定义</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/showmode/conf'}">资源发布</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini" style="float:right;">
      <div class="form-btn">
        <el-button size="mini" v-has="'gray:add'" @click="handleAddGray()">新增灰度</el-button>
      </div>
    </el-form>
    <div class="table-box">
      <el-table
          :data="list"
          :class="this.totalClass <= '7' ? 'limitWidth' :''"
          style="width: 100%"
          v-loading="listLoading">
          <el-table-column type="index" align="left" >
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
              min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="left" min-width="130" v-if="isshow">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <el-dialog title="新增灰度" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @close="openFun('addItem')">
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
    <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
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
export default {
  data() {
    return {
      list: [],
      perList:[],
      infoList:[],
      phoneList:[],
      grayList:[],
      totalClass:'',
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
      this.$refs[addItem].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          grayAdd(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'新增成功',
                    type:"success",
                    duration:1000
                });
                this.getList();
                this.addVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
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
                    duration:1000
                });
                this.getList();
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
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
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          updGray(updParams).then(res=>{
                this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
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
    getList() {
      this.listLoading = true
      let listParams = {
          pgstr:this.currentPage,
          pcstr:this.pageSize,
      }
      listGrays(listParams).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
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
