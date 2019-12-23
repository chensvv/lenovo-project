<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
          <el-form-item label="Role Name" prop="roleName">
            <el-input v-model.trim="searchItem.roleName" clearable></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
          <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
          <el-button type="primary" class="success btn_role" size="mini" @click="handleAdd()" v-has="'role:add'">添加角色</el-button>
        </el-form>
        
    <div class="table-box">
        <el-table
            :data="list"
            style="width: 100%"
            v-loading="listLoading">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="Role Code"
                prop="roleCode"
                align="center">
            </el-table-column>
            <el-table-column
                label="Role Name"
                prop="roleName"
                align="center"
                :formatter="formState">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-has="'role:update'">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDel(scope.$index, scope.row)"
                    v-has="'role:del'">删除</el-button>
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
        <el-form :label-position="'left'" label-width="120px" :rules="editRules" :model="currentItem" ref="currentItem">
            <el-form-item label="角色Code" prop="roleCode">
                <el-input type="text" v-model.trim="currentItem.roleCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="roleName">
                <el-input type="text" v-model.trim="currentItem.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    ref="tree"
                    :check-strictly='true'
                    @check-change="getChecked"
                    :default-checked-keys="selectedKeys">
                </el-tree>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editHandleClose">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="120px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="角色Code" prop="roleCode">
                    <el-input type="text" v-model.trim="addList.roleCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input type="text" v-model.trim="addList.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tree
                        :data="treeData"
                        show-checkbox
                        node-key="id"
                        :props="defaultProps"
                        :check-strictly='true'
                        ref="treeAdd"
                        @check-change="getCheckedAdd"
                        :default-checked-keys="selectedKeysAdd">
                    </el-tree>
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
import {roleList, authList, roleAdd, roleEcho, roleUpd, roleDel} from '@/config/adminApi'
export default {
  data() {
    return {
      list: [],
      currentItem: {//编辑数据组
        id:"",
        roleCode:"",
        roleName:""
      },
      addList: {//添加数据组
        roleCode:"",
        roleName:""
      },
      searchItem:{//搜索数据组
        roleName:""
      },
      treeData:[],
      selectedKeys:[],
      selectedKeysAdd:[],
      defaultProps: {
          children: 'children',
          label: 'ruleName'
      },
      addRules:{
        roleCode:[{ required: true, message: '请输入角色Code', trigger: 'change' }],
        roleName:[{ required: true, message: '请输入角色名称', trigger: 'change' }],
      },
      editRules:{
        roleCode:[{ required: true, message: '请输入角色Code', trigger: 'change' }],
        roleName:[{ required: true, message: '请输入角色名称', trigger: 'change' }],
      },
      editVisible: false,
      addVisible: false,
      // 分页
      currentPage: 1, //默认显示第几页
      pageSize: 10,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      listLoading:false,
      
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
    handleEdit(index, row) {
      let echoParams = {
        id:row.id,
      }
      this.currentItem = {
          id:row.id,
          roleCode:row.roleCode,
          roleName:row.roleName
        };
      this.getTree()
      roleEcho(echoParams).then(res=>{
        this.selectedKeys = res.data.ids
      })

      
      this.editVisible = true
    },
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          roleDel(delParams).then(res=>{
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
    editHandleClose() {
      this.editVisible = false;
      
    },
    addHandleClose(){
      this.addVisible = false
    },
    editHandleConfirm(currentItem) {
      let updParams = {
        roleId:this.currentItem.id,
        roleName:this.currentItem.roleName,
        roleCode:this.currentItem.roleCode,
        ids:this.selectedKeys
      }
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          roleUpd(updParams).then(res=>{
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
    handleAdd(){
      this.addVisible = true
      this.getTree()
    },
    addHandleConfirm(addList) {
      let addParams = {
        roleCode:this.addList.roleCode,
        roleName:this.addList.roleName,
        ids:this.selectedKeysAdd
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          roleAdd(addParams).then(res=>{
            this.addBtnLoading = false
            if(res.status == 200){
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
    getChecked(){
      this.selectedKeys = this.$refs.tree.getCheckedKeys()
    },
    getCheckedAdd(){
      this.selectedKeysAdd = this.$refs.treeAdd.getCheckedKeys()
    },
    getList() {
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        roleName:this.searchItem.roleName
      }
      roleList(params).then(res => {
        this.listLoading = false
        this.list = res.data.data;
        this.totalCount = res.data.count
      });
    },
    getTree(){
      authList().then(res=>{
        this.treeData = res.data
      })
    }
  }
};
</script>

<style scoped>
</style>
