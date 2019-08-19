<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
          <el-form-item label="Role Name" prop="roleName">
            <el-input v-model="searchItem.roleName" clearable></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
          <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
          <el-button type="primary" class="success btn_role" size="mini" @click="handleAdd()">添加角色</el-button>
        </el-form>
        
    <div class="table-box">
        <i-table :list="list" :options="options" :columns="columns" :operates="operates"></i-table>
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
                <el-input type="text" v-model="currentItem.roleCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="roleName">
                <el-input type="text" v-model="currentItem.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    ref="tree"
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
                    <el-input type="text" v-model="addList.roleCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input type="text" v-model="addList.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tree
                        :data="treeData"
                        show-checkbox
                        node-key="id"
                        :props="defaultProps"
                        ref="tree"
                        @check-change="getChecked"
                        :default-checked-keys="selectedKeys">
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
import iTable from "@/components/table";
import {checkTime} from '@/utils/timer.js'
import {roleList, authList, roleAdd, roleEcho, roleUpd, roleDel} from '@/config/adminApi'
export default {
  name: "applicationlist",
  components: { iTable },
  data() {
    return {
      list: [],
      currentItem: {//修改数据组
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
      defaultProps: {
          children: 'children',
          label: 'ruleName'
      },
      columns: [
        {
          prop: "roleCode",
          label: "Role Code",
          align: "center",
        },
        {
          prop: "roleName",
          label: "Role Name",
          align: "center",
        }
      ],
      options: {
        stripe: false, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        border:true     //是否显示纵向边框
      },
      operates: {
        width: 150,
        show: false,
        list: [
          {
            id: "1",
            label: "编辑",
            show: true,
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row);
            }
          },
          {
            id: "2",
            label: "删除",
            type:"danger",
            show: true,
            plain: false,
            disabled: false,
            method: (index, row) => {
              this.handleDel(index, row);
            }
          }
        ]
      }, // 列操作按钮
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
      pageSize: 30,   //默认每页条数
      pageSizes:[10, 20, 30],
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      AIMLBtnLoading:false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList()
    },
    onSubmit(){
      this.seaBtnLoading = true
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
      // console.log(row)
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
        console.log(res)
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
        }).catch(() => {
          console.log("no");
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
            if(res.data.code == 200){
                this.$message({
                    message:'修改成功',
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
                this.editBtnLoading = false
            } 
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
        ids:this.selectedKeys
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          roleAdd(addParams).then(res=>{
            if(res.status == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:1000
                });
                this.getList()
                this.addBtnLoading = false
                this.addVisible = false
            }else{
                this.addBtnLoading = false
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
    getChecked(){
      this.selectedKeys = this.$refs.tree.getCheckedKeys()
    },
    getList() {
      let params = {
        pgstr:this.pageSize,
        pcstr:this.currentPage,
        roleName:this.searchItem.roleName
      }
      roleList(params).then(res => {
        this.list = res.data;
        this.totalCount = res.data.length
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
