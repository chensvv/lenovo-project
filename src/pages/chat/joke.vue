<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/csc/csc'}">闲聊数据</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
          <div class="form-input height50">
            <el-form-item label="内容" prop="con">
                <el-input v-model.trim="searchItem.con" clearable></el-input>
            </el-form-item>
            <el-form-item label="审核状态" prop="state">
                <el-select v-model="searchItem.state" placeholder="--" clearable>
                    <el-option label="已审核" value="1"></el-option>
                    <el-option label="未审核" value="2"></el-option>
                </el-select>
            </el-form-item>
          </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'joke:save'">添加</el-button>
                <el-button size="mini" @click="handleBatchDel()" v-has="'joke:delBatch'">批量删除</el-button>
                <el-button size="mini" @click="handleBatchState()" v-has="'joke:veriBatch'">批量审核</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
          <el-table
            :data="list"
            stripe
            :class="this.totalClass <= '7' ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading"
            @selection-change="handleSelectionChange"
            @sort-change="sortChange"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column
                label="内容"
                prop="con"
                align="left">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.con" placement="top">
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                        {{ scope.row.con }}
                        </div>
                    </el-tooltip>
                    <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                        {{ scope.row.con }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="sta"
                align="center"
                :formatter="formState"
                sortable="custom">
            </el-table-column>
            <el-table-column
                label="更新/入库时间"
                prop="it"
                align="center"
                min-width="120"
                width="150"
                :formatter="formTime">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="190" v-if="isshow">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="checkState(scope.$index, scope.row)"
                    :loading="checkLoading"
                    v-has="'joke:veri'">审核</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-has="'joke:update'">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDel(scope.$index, scope.row)"
                    v-has="'joke:del'">删除</el-button>
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
        

        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="handleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="60px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="内容" prop="con">
                    <el-input type="textarea" v-model.trim="currentItem.con" auto-complete="off" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="edithandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="60px" size="small" :rules="addRules" :model="addList" ref="addList">
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
import {jokeList, jokeAddUpd, jokeDel, jokeVeri, jokeDelBatch, jokeVeriBatch} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
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
      sels:[],
      list:[],
      perList:[],
      totalClass:'8',
      editRules:{
        con:[{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      addRules:{
        con:[{ required: true, message: '请输入内容', trigger: 'change' }],
      },
      column:{
        prop:'',
        order:''
      },
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      showTitle:true,
      seaBtnLoading:false,
      editBtnLoading:false,
      addBtnLoading:false,
      listLoading:true,
      checkLoading:false,
      isshow:true
    }
  },
  created() {
      let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
      perArr.map(t=>{
          this.perList.push(Object.values(t).join())
      })
      this.getList();
    },
    mounted(){
        if(this.perList.indexOf('joke:veri') == -1 && this.perList.indexOf('joke:update') == -1 && this.perList.indexOf('joke:del') == -1){
            this.isshow = false
        }
    },
  methods:{
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
      var timer = row.it
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
    },
    formState(row, column){
      return row.sta == 1 ? "已审核" : "未审核"
    },
    sortChange(column){
      this.column = {
        prop:column.prop,
        order:column.order
      }
      console.log(this.column)
      this.getList()
    },
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        q:this.searchItem.con,
        ex:this.searchItem.state,
        fieldName: this.column.prop,
        order:this.column.order == 'ascending' ? '0' : ''
      }
      params.sign = deleteParams(params)
      jokeList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data;
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
        }else{
            this.$message({
                message:res.data.errorMessage,
                type:'error',
                duration:1000
            });
        }
      }).catch(()=>{
        this.listLoading = false
      })
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
      this.listLoading = true
      // console.log(`当前页: ${val}`);
      this.getList();
    },
    handleSelectionChange(val){
      this.sels = val
    },
    handleBatchDel(){
      let ids = this.sels.map(item => item.id)
      if(ids.length == 0 || ids == [] || ids == null){
        this.$message({
            message:'请选择要删除的数据',
            type:"warning",
            duration:1000
        });
      }else{
        let delsParams = {
          ids:ids
        }
        delsParams.sign = deleteParams(delsParams)
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            jokeDelBatch(delsParams).then(res=>{
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
        }).catch(err => {
            console.log(err);
        });
      }
      
    },
    handleBatchState(){
      let ids = this.sels.map(item => item.id)
      if(ids.length == 0 || ids == [] || ids == null){
        this.$message({
            message:'请选择要审核的数据',
            type:"warning",
            duration:1000
        });
      }else{
        let veriParams = {
          ids:ids
        }
        veriParams.sign = deleteParams(veriParams)
        jokeVeriBatch(veriParams).then(res=>{
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
        }).catch(err => {
          
        })
      }
      
    },
    checkState(index,row){
      this.checkLoading = true
      let verParams = {
        id:row.id
      }
      verParams.sign = deleteParams(verParams)
      jokeVeri(verParams).then(res=>{
        this.checkLoading = false
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
      }).catch(err => {
        this.checkLoading = false
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
        id:this.currentItem.id
      }
      updParams.sign = deleteParams(updParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          jokeAddUpd(updParams).then(res=>{
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
    handleDel(index, row){
      let delParams = {
        id:row.id
      }
      delParams.sign = deleteParams(delParams)
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
      }).catch(err => {
          console.log(err);
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
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
          if (valid) {
            this.addBtnLoading = true
            jokeAddUpd(addParams).then(res=>{
                  this.addBtnLoading = false
              if(res.data.code == 200){
                  this.$message({
                    message:'添加成功',
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
  }
}
</script>

<style>

</style>
