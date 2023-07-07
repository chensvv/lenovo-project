<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/permission/role'}">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model.trim="searchItem.userName" clearable></el-input>
                </el-form-item>
            </div>
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'user:add'">添加</el-button>
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
                    label="用户名"
                    prop="userName"
                    align="center"  
                    >
                </el-table-column>
                <el-table-column
                    label="密码"
                    prop="password"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.password | hideStar}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status"
                    align="center"  
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.status == 0 ? '未审核': '已审核'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center"  width="180" v-if="isshow">
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
            <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <li v-if="currentPage == this.getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                    <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                    <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                    <li v-if="currentPage != this.getpageNum(totalCount)" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                    <li v-if="currentPage+1 < 3 && currentPage != this.getpageNum(totalCount) && this.getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                    <li><button :disabled="currentPage == this.getpageNum(totalCount)? true: false" @click="turnToPage(this.getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </div>

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
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
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
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
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="角色" :visible.sync="roleVisible" width="40%" top="10vh" :before-close="roleHandleClose" @open="optShow()">
            <el-form :label-position="'right'" label-width="120px">
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
import {userList, userDel, userUpd, userAdd, userEcho, userRole, userRoleEcho, userRoleSave, userMenu} from '@/config/adminApi'
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
            seleId:'',
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
            totalCount:1,     // 总条数
            seaBtnLoading:false,
            addBtnLoading:false,
            editBtnLoading:false,
            roleBtnLoading:false,
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
        if(this.perList.indexOf('user:editRole') == -1 && this.perList.indexOf('user:update') == -1 && this.perList.indexOf('user:del') == -1){
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
            delParams.sign = deleteParams(delParams)
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
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    userUpd(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'编辑成功',
                                type:"success",
                                duration:1500
                            });
                            this.getList()
                            
                            this.editVisible = false
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1500
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
        },
        addHandleConfirm(addList) {
            let addParams={
                userName:this.addList.userName,
                password:this.addList.password,
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    userAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1500
                            });
                            this.getList();
                            this.addVisible = false
                            
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1500
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
        handleRole(index,row){
            this.seleId = row.id
             let roleParams = {
                id:this.seleId
            }
            roleParams.sign = deleteParams(roleParams)
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
                ids:this.multipleSelection,
            }
            let logParams = {
                userName:sessionStorage.getItem('username')
            }
            Saveparams.sign = deleteParams(Saveparams)
            logParams.sign = deleteParams(logParams)
            this.roleBtnLoading = true
            userRoleSave(Saveparams).then(res=>{
                this.roleBtnLoading = false
                if(res.data.code == 200){
                    this.$message({
                        message:'编辑成功',
                        type:"success",
                        duration:1500
                    });
                    this.getList()
                    this.roleVisible = false
                    sessionStorage.removeItem('menuData');
                    sessionStorage.removeItem('btnpermission')
                    userMenu(logParams).then((res)=>{
                        if(res.data.code == 200){
                            sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                            this.reload();
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1500
                            });
                        }
                    })
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1500
                    });
                }
            }).catch(err => {
                this.roleBtnLoading = false
            })
        },
        handleSelectionChange(val) {
            val = val.map(item=>item.id)
            this.multipleSelection = val;
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
                userName:this.searchItem.userName,
                roleName:window.sessionStorage.getItem('username')
            }
            params.sign = deleteParams(params)
            userList(params).then(res => {
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
        
        
    },
    filters:{
        hideStar(str){
            return str.substring(0,4) + new Array(str.length).join('*')
            // return str.substring(0,4) + new Array(str.length-3).join('*')
        }
    }
};
</script>

<style scoped>
</style>
