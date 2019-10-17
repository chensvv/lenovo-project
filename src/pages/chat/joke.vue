<template>
    <div class="joke">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="内容" prop="con">
                <el-input v-model.trim="searchItem.con" clearable></el-input>
            </el-form-item>
            <el-form-item label="审核状态" prop="state">
                <el-select v-model="searchItem.state" placeholder="--" clearable>
                    <el-option label="已审核" value="1"></el-option>
                    <el-option label="未审核" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="117">添加</el-button>
        </el-form>
        <el-table
                :data="list"
                style="width: 100%">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="内容"
                    prop="con"
                    align="left">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="sta"
                    align="center"
                    width="100"
                    :formatter="formState">
                </el-table-column>
                <el-table-column
                    label="更新/入库时间"
                    prop="it"
                    align="center"
                    width="200"
                    :formatter="formTime">
                </el-table-column>
                <el-table-column label="操作" align="center" width="250">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="checkState(scope.$index, scope.row)"
                        v-has="118">审核</el-button>
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="60">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="61">删除</el-button>
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="handleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'left'" label-width="60px" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="内容" prop="con">
                    <el-input type="textarea" v-model.trim="currentItem.con" auto-complete="off" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="edithandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="60px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="内容" prop="con">
                    <el-input type="textarea" v-model.trim="addList.con" auto-complete="off" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {jokeList, jokeAddUpd, jokeDel, jokeVeri} from '@/config/api'
export default {
  data(){
    return{
      searchItem:{
        con:"",
        state:""
      },
      currentItem:{
        id:"",
        con:"",
        url:""
      },
      addList:{
        con:""
      },
      list:[],
      editRules:{
        con:[{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      addRules:{
        con:[{ required: true, message: '请输入内容', trigger: 'change' }],
      },
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 30,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      editBtnLoading:false,
      addBtnLoading:false
    }
  },
  created(){
    this.getList();
  },
  methods:{
    formTime(row, column){
      var timer = row.it
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())+':'+
          checkTime(date.getSeconds())
    },
    formState(row, column){
      return row.sta == 1 ? "已审核" : "未审核"
    },
    getList() {
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        q:this.searchItem.con,
        ex:this.searchItem.state
      }
      jokeList(params).then(res => {
        this.list = res.data.data;
        this.totalCount = res.data.count
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList()
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.getList();
      this.seaBtnLoading = false
    },
    openFun(addList){
      this.$nextTick(() => {
        if(this.$refs[addList]){
          this.$refs[addList].resetFields();
        }
      })
    },
    closeFun(currentItem){
      this.$nextTick(() => {
        if(this.$refs[currentItem]){
          this.$refs[currentItem].clearValidate();
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
      console.log(`当前页: ${val}`);
      this.getList();
    },
    checkState(index,row){
      let veriParams = {
        id:row.id
      }
      jokeVeri(veriParams).then(res=>{
        if(res.data.code == 200){
            this.$message({
                message:'审核成功',
                type:"success",
                duration:1000
            });
            this.getList()
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:"error",
                duration:1000
            });
        }
      })
    },
    handleClose() {
      this.editVisible = false;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      this.currentItem = {
        id:row.id,
        con:row.con
      };
    },
    edithandleConfirm(currentItem) {
      let updParams = {
        con:this.currentItem.con,
        url:this.currentItem.url,
        id:this.currentItem.id
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          jokeAddUpd(updParams).then(res=>{
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.editBtnLoading = false
                this.editVisible = false
            }else{
                this.$message({
                    message:res.data.errorMessage,
                    type:"error",
                    duration:1000
                });
            } 
          })
        } else {
          return false;
        }
      });
    },
    handleDel(index, row){
      let delParams = {
        id:row.id
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
          jokeDel(delParams).then(res=>{
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
      }).catch(() => {
          console.log("no");
      });
    },
    addHandleClose(){
        this.addVisible = false
    },
    handleAdd(){
        this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams={
          con:this.addList.con,
          url:''
      }
      this.$refs[addList].validate((valid) => {
          if (valid) {
            this.addBtnLoading = true
            jokeAddUpd(addParams).then(res=>{
              if(res.data.code == 200){
                  this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                  });
                  this.getList();
                  this.addVisible = false
                  this.addBtnLoading = false
              }else{
                  this.$message({
                      message:res.data.errorMessage,
                      type:"error",
                      duration:1000
                  });
                  this.addBtnLoading = false
              } 
            })
          } else {
              return false;
          }
      });
    },
  }
}
</script>

<style>

</style>
