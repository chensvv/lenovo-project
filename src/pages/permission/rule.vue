<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/permission/role'}">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" size="mini" style="padding-left:50px;">
            <el-form-item class="sub-btn">
                <el-button type="primary" @click="handleAdd(1,0)" size="mini" :loading="btnLoading" v-has="'Rule:add'">增加一级菜单</el-button>
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                stripe
                v-laoding="listLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column
                    prop="ruleName"
                    label="一级菜单权限名称">
                </el-table-column>
                <el-table-column label="操作" align="center"  width="180" v-if="isshow">
                    <template slot-scope="scope">
                      <el-button
                            size="mini"
                            @click.native.stop="handleInfo(scope.$index, scope.row)"
                            v-has="'Rule:add'"
                            v-if="scope.row.menutype != 3"
                        >详情</el-button>
                        <el-button
                            size="mini"
                            @click.native.stop="handleEdit(scope.$index, scope.row)"
                            v-has="'Rule:update'"
                        >编辑</el-button>
                        <el-button 
                            size="mini" 
                            type="danger"
                            @click.native.stop="handleDel(scope.$index, scope.row)"
                            v-has="'Rule:delete'"
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
        
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增一级菜单权限" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="菜单名称" prop="ruleName">
                    <el-input type="text" v-model.trim="addList.ruleName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="菜单名称" prop="ruleName">
                    <el-input type="text" v-model.trim="currentItem.ruleName" auto-complete="off"></el-input>
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
import { ruleList, userMenu, authAdd, authDel, authUpdate} from '@/config/adminApi'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    inject:['reload'],
    data() {
        return {
            list:[],
            totalClass:'8',
            expands:[],
            addl:{},
            defaultProps: {
                children: "children",
                label: "ruleName"
            },
            addList: {
                parentCode: '',
                ruleCode: '',
                ruleName:'',
                url:'',
                icon:''
            },
            currentItem: {
                id:'',
                ruleCode:'',
                ruleName:'',
                url:'',
                icon:''
            },
            addRules:{
                ruleName:[{ required: true, message: '请输入菜单名称', trigger: 'change' }]
            },
            editRules:{
                ruleName:[{ required: true, message: '请输入菜单名称', trigger: 'change' }]
            },
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            listLoading:false,
            editVisible: false,
            addVisible: false,
            addBtnLoading:false,
            editBtnLoading:false,
            ruleCodeAuth:false,
            urlAuth:false,
            isshow:true,
            addTitle:''
        };
    },
    created() {
        this.getList();
    },
    methods: {
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
            // console.log(`当前页: ${val}`);
            this.getList();
        },
        handleInfo(index, row){
            this.$router.push({
                path:'/rule/detail',
                query:{
                    did:row.id
                }
            })
        },
        editHandleClose() {
            this.editVisible = false;
        },
        addHandleClose(){
            this.addVisible = false
        },
        handleAdd(index,row){
            this.addList = {
                parentCode:row == 0 ? 0 : row.id,
                ruleCode:'',
                ruleName:'',
                url:'',
                icon: row == 0 ? 'el-icon-tickets' : row.menutype == 3 ? ' ' : 'el-icon-document'
            }
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            let addParams={
                parentCode:this.addList.parentCode,
                ruleCode:this.addList.ruleCode,
                ruleName:this.addList.ruleName,
                url:this.addList.url,
                icon:this.addList.icon
            }
            let logParams = {
                userName:sessionStorage.getItem('username')
            }
            addParams.sign = deleteParams(addParams)
            logParams.sign = deleteParams(logParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    authAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1500
                            });
                            this.getList();
                            this.addVisible = false
                            sessionStorage.removeItem('menuData');
                            sessionStorage.removeItem('btnpermission')
                            userMenu(logParams).then((res)=>{
                                if(res.data.code == 200){
                                    sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                    let menuData = res.data.data
                                    let menuList=[]
                                    for (let item of menuData) {
                                        if (item.menutype === 0) {
                                            menuList.push({
                                                ruleCode:item.ruleCode
                                            });
                                        }
                                        for (let towMenus of item.children) {
                                            if (towMenus.menutype === 2) {
                                                menuList.push({
                                                    ruleCode:towMenus.ruleCode
                                                });
                                            }
                                            for (let threeMenus of towMenus.children2) {
                                                if (threeMenus.menutype === 0) {
                                                    menuList.push({
                                                        ruleCode:threeMenus.ruleCode
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    sessionStorage.setItem('btnpermission',JSON.stringify(menuList))
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
                        this.editBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        handleEdit(index,row) {
            this.currentItem = {
                id:row.id,
                ruleCode:row.ruleCode,
                ruleName:row.ruleName,
                url:row.url,
                icon: row.icon
            };
            this.editVisible = true;
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                id:this.currentItem.id,
                ruleCode:this.currentItem.ruleCode,
                ruleName:this.currentItem.ruleName,
                url:this.currentItem.url,
                icon:this.currentItem.icon
            }
            let logParams = {
                userName:sessionStorage.getItem('username')
            }
            updParams.sign = deleteParams(updParams)
            logParams.sign = deleteParams(logParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    authUpdate(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'编辑成功',
                                type:"success",
                                duration:1500
                            });
                            this.getList()
                            this.editVisible = false
                            sessionStorage.removeItem('menuData');
                            sessionStorage.removeItem('btnpermission')
                            userMenu(logParams).then((res)=>{
                                if(res.data.code == 200){
                                    sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                    let menuData = res.data.data
                                    let menuList=[]
                                    for (let item of menuData) {
                                        if (item.menutype === 0) {
                                            menuList.push({
                                                ruleCode:item.ruleCode
                                            });
                                        }
                                        for (let towMenus of item.children) {
                                            if (towMenus.menutype === 2) {
                                                menuList.push({
                                                    ruleCode:towMenus.ruleCode
                                                });
                                            }
                                            for (let threeMenus of towMenus.children2) {
                                                if (threeMenus.menutype === 0) {
                                                    menuList.push({
                                                        ruleCode:threeMenus.ruleCode
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    sessionStorage.setItem('btnpermission',JSON.stringify(menuList))
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
                        this.editBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
        },
        handleDel(index,row) {
            let delParams = {
                id:row.id
            }
            let logParams = {
                userName:sessionStorage.getItem('username')
            }
            delParams.sign = deleteParams(delParams)
            logParams.sign = deleteParams(logParams)
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                authDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:1500
                        });
                        this.getList();
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
                    
                })
            }).catch((err) => {
                console.log(err);
            });
        },
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
            }
            params.sign = deleteParams(params)
            ruleList(params).then(res => {
                this.listLoading = false
                this.list = res.data.data
                this.totalCount = res.data.count
                this.totalClass = res.data.data.length
            }).catch(()=>{
                this.listLoading = false
            })
        },
    }
};
</script>

<style>
</style>