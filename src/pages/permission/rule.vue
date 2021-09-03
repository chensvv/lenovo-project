<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline height50 width130" size="mini" style="padding-left:50px;">
            <el-form-item class="sub-btn">
                <el-button type="primary" @click="handleAdd(0)" size="mini" :loading="btnLoading" v-has="'Rule:add'">增加一级权限</el-button>
            </el-form-item>
        </el-form>
        <el-tree
            :props="defaultProps"
            :data="list"
            node-key="id"
            :default-expand-all="false"
            :expand-on-click-node="false"
            :laoding="listLoading"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => handleAdd(data)"
                        v-has="'Rule:add'"
                        v-if="data.menutype != 3"
                    >增加</el-button>
                    
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => handleEdit(data)"
                        v-has="'Rule:update'"
                    >编辑</el-button>
                    <el-button 
                    type="text" 
                    size="mini" 
                    @click="() => handleDel(data.id)"
                    v-has="'Rule:delete'"
                        >删除</el-button>
                </span>
            </span>
        </el-tree>
        <el-dialog :title="addTitle" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="权限名称" prop="ruleName">
                    <el-input type="text" v-model.trim="addList.ruleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="ruleCode" v-if="ruleCodeAuth">
                    <el-input type="text" v-model.trim="addList.ruleCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="url" prop="url" v-if="urlAuth">
                    <el-input type="text" v-model.trim="addList.url" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="权限名称" prop="ruleName">
                    <el-input type="text" v-model.trim="currentItem.ruleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="ruleCode" v-if="ruleCodeAuth">
                    <el-input type="text" v-model.trim="currentItem.ruleCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="url" prop="url" v-if="urlAuth">
                    <el-input type="text" v-model.trim="currentItem.url" auto-complete="off"></el-input>
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
import { authList, login, authAdd, authDel, authUpdate} from '@/config/adminApi'
let Base64 = require('js-base64').Base64
export default {
    inject:['reload'],
    data() {
        return {
            list:[],
            defaultProps: {
                children: "children",
                label: "ruleName"
            },
            addList: {//添加数据组
                parentCode:'',
                ruleCode:'',
                ruleName:'',
                url:'',
                icon:''
            },
            currentItem: {//编辑数据组
                id:'',
                ruleCode:'',
                ruleName:'',
                url:'',
                icon:''
            },
            addRules:{
                ruleName:[{ required: true, message: '请输入权限名称', trigger: 'change' }],
                ruleCode:[{ required: true, message: '请输入权限标识', trigger: 'change' }],
                url:[{ required: true, message: '请输入url', trigger: 'change' }]
            },
            editRules:{
                ruleName:[{ required: true, message: '请输入权限名称', trigger: 'change' }],
                ruleCode:[{ required: true, message: '请输入权限标识', trigger: 'change' }],
                url:[{ required: true, message: '请输入url', trigger: 'change' }]
            },
            listLoading:false,
            editVisible: false,
            addVisible: false,
            addBtnLoading:false,
            editBtnLoading:false,
            ruleCodeAuth:false,
            urlAuth:false,
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
        editHandleClose() {
            this.editVisible = false;
        },
        addHandleClose(){
            this.addVisible = false
        },
        handleAdd(v){
            this.addList = {
                parentCode:v == 0 ? 0 : v.id,
                ruleCode:'',
                ruleName:'',
                url:'',
                icon: v == 0 ? 'el-icon-tickets' : v.menutype == 3 ? ' ' : 'el-icon-document'
            }
            if(v == 0){
                this.ruleCodeAuth = false
                this.urlAuth = false
                this.addTitle = '新增一级菜单权限'
            }else if(v.menutype == 1){
                this.urlAuth = true
                this.ruleCodeAuth = true
                this.addTitle = '新增字菜单权限'
            }else{
                this.urlAuth = false
                this.ruleCodeAuth = true
                this.addTitle = '新增按钮权限'
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
                userName:sessionStorage.getItem('username'),
                password:Base64.decode(sessionStorage.getItem('log'))
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    authAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList();
                            this.addVisible = false
                            sessionStorage.removeItem('menuData');
                            sessionStorage.removeItem('btnpermission')
                            login(logParams).then((res)=>{
                                if(res.data.code == 200){
                                    sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                    this.reload();
                                }else{
                                    this.$message({
                                        message:res.data.errorMessage,
                                        type:"error",
                                        duration:1000
                                    });
                                }
                            })
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
        handleEdit(row) {
            console.log(row)
            this.currentItem = {
                id:row.id,
                ruleCode:row.ruleCode,
                ruleName:row.ruleName,
                url:row.url,
                icon: row.icon
            };
            if(row.menutype == 1){
                this.ruleCodeAuth = false
                this.urlAuth = false
            }else if(row.menutype == 2){
                this.urlAuth = true
                this.ruleCodeAuth = true
            }else{
                this.urlAuth = false
                this.ruleCodeAuth = true
            }
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
                userName:sessionStorage.getItem('username'),
                password:Base64.decode(sessionStorage.getItem('log'))
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    authUpdate(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'编辑成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList()
                            this.editVisible = false
                            sessionStorage.removeItem('menuData');
                            sessionStorage.removeItem('btnpermission')
                            login(logParams).then((res)=>{
                                if(res.data.code == 200){
                                    sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                    this.reload();
                                }else{
                                    this.$message({
                                        message:res.data.errorMessage,
                                        type:"error",
                                        duration:1000
                                    });
                                }
                            })
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
        handleDel(id) {
            let delParams = {
                id:id
            }
            let logParams = {
                userName:sessionStorage.getItem('username'),
                password:Base64.decode(sessionStorage.getItem('log'))
            }
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
                            duration:1000
                        });
                        this.getList();
                        sessionStorage.removeItem('menuData');
                        sessionStorage.removeItem('btnpermission')
                        login(logParams).then((res)=>{
                            if(res.data.code == 200){
                                sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                this.reload();
                            }else{
                                this.$message({
                                    message:res.data.errorMessage,
                                    type:"error",
                                    duration:1000
                                });
                            }
                        })
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
        getList() {
            this.listLoading = true
            authList().then(res => {
                this.listLoading = false
                this.list = res.data
            }).catch(()=>{
                this.listLoading = false
            })
        },
    }
};
</script>

<style>
</style>