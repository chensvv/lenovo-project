<template>
  <div class="table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="searchItem.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model.trim="searchItem.tel" clearable></el-input>
      </el-form-item>
      <el-form-item label="扩展" prop="exts">
        <el-input v-model.trim="searchItem.exts" clearable></el-input>
      </el-form-item>
      <el-form-item class="sub-btn">
        <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
        <el-button @click="resetForm('searchItem')">重置</el-button>
        <el-button size="mini" @click="handleAdd()" v-has="'csc:add'">添加</el-button>
      </el-form-item>
      
    </el-form>
    <div class="table-box">
      <el-table
            :data="list"
            :class="this.totalCount <= 5 ? 'limitWidth' :''"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="名称"
                prop="name"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="tels"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="扩展"
                prop="exts"
                align="center"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" align="center" v-if="isshow">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                     v-has="'csc:delete'"
                    @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
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
    <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
      <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model.trim="addList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input type="text" v-model.trim="addList.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="扩展" prop="exts">
          <el-input type="text" v-model.trim="addList.exts" auto-complete="off"></el-input>
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
import {cscList, cscAdd, cscDel} from '@/config/api'
export default {
  data() {
    return {
      list: [],
      perList:[],
      addList: {//添加数据组
        name:"",
        tel:"",
        exts:""
      },
      searchItem:{//搜索数据组
        name:"",
        tel:"",
        exts:""
      },
      addRules:{
          name:[{ required: true, message: '请输入名称', trigger: 'change' }],
          tel:[{ required: true, message: '请输入电话号码', trigger: 'change' }],
          exts:[{ required: true, message: '请输入扩展', trigger: 'change' }],
      },
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      listLoading:true,
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
    if(this.perList.indexOf('csc:delete') == -1){
      this.isshow = false
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1
      this.getList();
    },
    onSubmit(){
      this.seaBtnLoading = true
      this.currentPage = 1
      this.getList();
      this.seaBtnLoading = false
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
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          cscDel(delParams).then(res=>{
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
    openFun(addList){
      this.$nextTick(() => {
        if(this.$refs[addList]){
          this.$refs[addList].resetFields();
        }
      })
    },
    addHandleClose(){
      this.addVisible = false
    },
    handleAdd(){
      this.addVisible = true
    },
    addHandleConfirm(addList) {
      let addParams = {
        name:this.addList.name,
        exts:this.addList.exts,
        tels:this.addList.tel
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          cscAdd(addParams).then(res=>{
                this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
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
    getList() {
      this.listLoading = true
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        name:this.searchItem.name,
        exts:this.searchItem.exts,
        tel:this.searchItem.tel
      }
      cscList(params).then(res => {
        this.listLoading = false
        this.list = res.data.data;
        this.totalCount = res.data.count
      });
    }
  }
};
</script>

<style scoped>
</style>
