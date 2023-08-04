<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini"  @submit.native.prevent>
          <div class="form-input height70">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model.trim="searchItem.roleName" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item>
                    <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                </el-form-item>
          </div>
          <div class="form-btn">
            <el-button size="mini" class="success" @click="handleAdd()" v-has="'role:add'">添加角色</el-button>
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
                label="角色 Code"
                prop="roleCode"
                align="center" 
                >
            </el-table-column>
            <el-table-column
                label="角色名称"
                prop="roleName"
                align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="130" v-if="isshow">
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
        <div class="pagination-wrap" v-cloak>
            <ul class="pagination">
                <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                <li v-if="currentPage == getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                <li v-if="currentPage != getpageNum(totalCount) && getpageNum(totalCount) !=0" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                <li v-if="currentPage+1 < 3 && currentPage != getpageNum(totalCount) && getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0? true: false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
            </ul>
        </div>
    </div>

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
        <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem" @submit.native.prevent>
            <el-form-item label="角色Code" prop="roleCode">
                <el-input type="text" v-model.trim="currentItem.roleCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="roleName">
                <el-input type="text" v-model.trim="currentItem.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <span style="color: #f56c6c">更改或新增权限后用户需重新登录！</span>
                <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :check-strictly="checkStrictlyEdit"
                    :props="defaultProps"
                    ref="tree"
                    @check="hanleCheck">
                </el-tree>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editHandleClose">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList" @submit.native.prevent>
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
                        ref="treeAdd">
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
import {roleList, authList, roleAdd, roleEcho, roleUpd, roleDel, userMenu} from '@/config/adminApi'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
  inject:['reload'],
  data() {
    return {
      getpageNum:getpageNum,
      list: [],
      perList:[],
      totalClass:'8',
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
      totalCount:1,     // 总条数
      seaBtnLoading:false,
      addBtnLoading:false,
      editBtnLoading:false,
      listLoading:false,
      isshow:true,
      checkStrictlyEdit:true
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
      if(this.perList.indexOf('role:update') == -1 && this.perList.indexOf('role:del') == -1){
          this.isshow = false
      }
  },
  methods: {
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
    handleEdit(index, row) {
      this.editVisible = true
      let echoParams = {
        id:row.id,
      }
      this.currentItem = {
          id:row.id,
          roleCode:row.roleCode,
          roleName:row.roleName
        };
        this.getTree()
          // this.$nextTick(()=>{
            roleEcho(echoParams).then(res=>{
                  this.$refs.tree.setCheckedKeys(res.data.ids)
              // this.selectedKeys = res.data.ids
            })
          // })
          // this.selectedKeys = JSON.parse(JSON.stringify(this.selectedKeys))
      
    },
    handleDel(index, row) {
      let delParams = {
        id:row.id
      }
      delParams.sign = deleteParams(delParams)
      this.$confirm(`此操作将永久删除该角色, 是否继续?<br><span style="color: #f56c6c"; font-size:12px;>(更改角色或权限后用户需重新登录！)</span>`, "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          roleDel(delParams).then(res=>{
            if(res.data.code == 200){
              this.$message({
                message:'删除成功',
                type:"success",
                duration:2000
              });
              this.getList();
            }else{
              if(res.data.code != undefined){
                  this.$message({
                      message:res.data.code+'：'+res.data.msg,
                      type:'error',
                      duration:2000
                  });
              }
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
      this.$refs.tree.setCheckedKeys([])
      this.editVisible = false;
    },
    addHandleClose(){
      this.$refs.treeAdd.setCheckedKeys([])
      this.addVisible = false
    },
    editHandleConfirm(currentItem) {
      // console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
      let updParams = {
        roleId:this.currentItem.id,
        roleName:this.currentItem.roleName,
        roleCode:this.currentItem.roleCode,
        ids:this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      }
      // let logParams = {
      //     userName:sessionStorage.getItem('username')
      // }
      updParams.sign = deleteParams(updParams)
      // logParams.sign = deleteParams(logParams)
      this.$refs[currentItem].validate((valid) => {
        if (valid) {
          this.editBtnLoading = true
          roleUpd(updParams).then(res=>{
            this.editBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'编辑成功',
                    type:"success",
                    duration:2000
                });
                this.getList()
                this.editVisible = false
                // sessionStorage.removeItem('menuData');
                // sessionStorage.removeItem('btnpermission')
                // userMenu(logParams).then((res)=>{
                //     if(res.data.code == 200){
                //         sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                //         this.reload();
                //     }else{
                //         if(res.data.code != undefined){
                //             this.$message({
                //                 message:res.data.code+'：'+res.data.msg,
                //                 type:'error',
                //                 duration:2000
                //             });
                //         }
                //     }
                // })
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
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
        ids:this.$refs.treeAdd.getCheckedKeys().concat(this.$refs.treeAdd.getHalfCheckedKeys())
      }
      addParams.sign = deleteParams(addParams)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          this.addBtnLoading = true
          roleAdd(addParams).then(res=>{
            this.addBtnLoading = false
            if(res.data.code == 200){
                this.$message({
                    message:'添加成功',
                    type:"success",
                    duration:2000
                });
                this.getList()
                this.addVisible = false
            }else{
                if(res.data.code != undefined){
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }
          }).catch(err => {
            this.addBtnLoading = false
          })
        } else {
          return false;
        }
      });
    },
    hanleCheck (data, node) {
    const _this = this
    // 获取当前节点是否被选中
    const isChecked = this.$refs.tree.getNode(data).checked
    // 如果当前节点被选中，则遍历上级节点和下级子节点并选中，如果当前节点取消选中，则遍历下级节点并取消选中
    if (isChecked) {
        // 判断是否有上级节点，如果有那么遍历设置上级节点选中
        data.parentCode && setParentChecked(data.parentCode)
        // 判断该节点是否有下级节点，如果有那么遍历设置下级节点为选中
        data.children && setChildreChecked(data.children, true)
    } else {
        // 如果节点取消选中，则取消该节点下的子节点选中
        data.children && setChildreChecked(data.children, false)
    }
    function setParentChecked (parentCode) {
        // 获取该id的父级node
        const parentNode = _this.$refs.tree.getNode(parentCode)
        // 如果该id的父级node存在父级id则继续遍历
        parentNode && parentNode.data && parentNode.data.parentCode && setParentChecked(parentNode.data.parentCode)
        //  设置该id的节点为选中状态
        _this.$refs.tree.setChecked(parentCode, true)
    }
    function setChildreChecked (node, isChecked) {
        node.forEach(item => {
            item.children && setChildreChecked(item.children, isChecked)
            _this.$refs.tree.setChecked(item.id, isChecked)
        })
    }
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
      let params = {
        pgstr:this.currentPage,
        pcstr:this.pageSize,
        roleName:this.searchItem.roleName
      }
      params.sign = deleteParams(params)
      roleList(params).then(res => {
        this.listLoading = false
        if(res.data.code == 200){
          this.list = res.data.data
          this.totalCount = res.data.count
          this.totalClass = res.data.data.length
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
    },
    getTree(){
      let treeParams = {
        id: '0'
      }
      treeParams.sign = deleteParams(treeParams)
      authList(treeParams).then(res=>{
        this.treeData = res.data
      })
    }
  }
};
</script>

<style scoped>
</style>
