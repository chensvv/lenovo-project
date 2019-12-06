<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model.trim="searchItem.userName" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="'user:add'">添加</el-button>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                style="width: 100%">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="用户名"
                    prop="userName"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="密码"
                    prop="password"
                    align="center"
                    :formatter="formState">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleRole(scope.$index, scope.row)"
                        v-has="'user:editRole'">角色</el-button>
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'user:update'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'user:del'">删除</el-button>
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
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model.trim="currentItem.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model.trim="currentItem.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="120px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model.trim="addList.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model.trim="addList.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="角色" :visible.sync="roleVisible" width="300" :before-close="roleHandleClose" @open="optShow()">
            <el-form :label-position="'left'" label-width="120px">
                <el-table :data="roleData" border ref="table" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column
                        label="roleCode"
                        prop="roleCode">
                    </el-table-column>
                    <el-table-column
                        label="roleName"
                        prop="roleName">
                    </el-table-column>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleHandleClose">取 消</el-button>
                <el-button type="primary" @click="roleHandleConfirm('addList')" :loading="roleBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {userList, userDel, userUpd, userAdd, userEcho, userRole, userRoleEcho, userRoleSave} from '@/config/adminApi'
export default {
    data() {
        return {
            list: [],
            currentItem: {//编辑数据组
                id:"",
                userName: "",
                password: "",
            },
            addList: {//添加数据组
                userName: "",
                password: "",
            },
            searchItem:{//搜索数据组
                userName:"",
            },
            roleIds:{},
            roleData:[],
            multipleSelection:[],
            addRules:{
                userName:[{ required: true, message: '请输入用户名', trigger: 'change' }],
                password:[{ required: true, message: '请输入密码', trigger: 'change' }]
            },
            editRules:{
                userName:[{ required: true, message: '请输入用户名', trigger: 'change' }],
                password:[{ required: true, message: '请输入密码', trigger: 'change' }]
            },
            editVisible: false,
            addVisible: false,
            roleVisible:false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            seaBtnLoading:false,
            addBtnLoading:false,
            editBtnLoading:false,
            roleBtnLoading:false,
        };
    },
    created() {
        this.getList();
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
            console.log(index, row);
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                userName: row.userName,
                password: row.password,
            };
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
                userDel(delParams).then(res=>{
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
        roleHandleClose(){
            this.roleVisible = false
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                userId:this.currentItem.id,
                userName:this.currentItem.userName,
                password:this.currentItem.password,
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    userUpd(updParams).then(res=>{
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
                            this.editBtnLoading = false
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
        handleAdd(){
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            let addParams={
                userName:this.addList.userName,
                password:this.addList.password,
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    userAdd(addParams).then(res=>{
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
        handleRole(index,row){
            this.seleId = row.id
             let roleParams = {
                id:this.seleId
            }
            userRoleEcho(roleParams).then(res=>{
                this.roleIds = res.data.ids
            })
            userRole().then(res=>{
                this.roleData = res.data
            })
            this.roleVisible = true
            

        },
        optShow(){
           setTimeout(()=>{
               this.roleIds.map(id=>{
                   this.roleData.map((rolelist,index)=>{
                       if(rolelist.id == id){
                           this.$refs.table.toggleRowSelection(this.roleData[index], true)
                       }
                   })
               })
           },100)
        },
        roleHandleConfirm(){
            let Saveparams = {
                id:this.seleId,
                ids:this.multipleSelection
            }
            userRoleSave(Saveparams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'编辑成功',
                        type:"success",
                        duration:1000
                    });
                    this.getList()
                    this.roleBtnLoading = false
                    this.roleVisible = false
                }else{
                    this.roleBtnLoading = false
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1000
                    });
                }
            })
        },
        handleSelectionChange(val) {
            val = val.map(item=>item.id)
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        },
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                userName:this.searchItem.userName
            }
            userList(params).then(res => {
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
        },
        
        
    },
};
</script>

<style scoped>
</style>
