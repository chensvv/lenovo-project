<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="应用名称" prop="appName">
                    <el-input v-model.trim="searchItem.appName"></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'skill:appadd'">添加</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="left" >
                </el-table-column>
                <el-table-column
                    label="应用名称"
                    prop="appName"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.appName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.appName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.appName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="技能数"
                    prop="funCount"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="调用次数"
                    prop="appCallCount"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="调用用户数"
                    prop="inc"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="失败次数"
                    prop="appFailCount"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="displayUpdateTime"
                    align="center"
                    min-width="120">
                </el-table-column>
                <el-table-column label="操作" align="center" width="200" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'skill:appupdate'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'skill:appdelete'">删除</el-button>
                        <el-button
                        size="mini"
                        @click="handleInfo(scope.$index, scope.row)"
                        v-has="'skill:appdetail'">详情</el-button>
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="应用名称" prop="appName">
                <el-input type="text" v-model.trim="currentItem.appName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="应用名称" prop="appName">
                <el-input type="text" v-model.trim="addList.appName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用包名" prop="appPackageName">
                <el-input type="text" v-model.trim="addList.appPackageName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="appType">
                <el-input type="text" v-model.trim="addList.appType" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose('addList')">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {formatDate} from '@/utils/format.js'
import {skillList, skillAdd, skillUpd,skillDel} from '@/config/api'
export default {
    data() {
        return {
            list: [],
            perList:[],
            totalClass:'',
            currentItem: {//编辑数据组
                id:"",
                appName:""
            },
            addList: {//添加数据组
                appName:"",
                appPackageName:"",
                appType:""
            },
            searchItem:{//搜索数据组
                appName:"",
            },
            addRules:{
                appName:[{ required: true, message: '请输入应用名称', trigger: 'change' }],
                appPackageName:[{ required: true, message: '请输入应用包名', trigger: 'change' }],
                appType:[{ required: true, message: '请输入应用类型', trigger: 'change' }],
            },
            editRules:{
                appName:[{ required: true, message: '请输入应用名称', trigger: 'blur' }],
            },
            editVisible: false,
            addVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            seaBtnLoading:false,
            addBtnLoading:false,
            editBtnLoading:false,
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
        if(this.perList.indexOf('skill:appupdate') == -1 && this.perList.indexOf('skill:appdelete') == -1 && this.perList.indexOf('skill:appdetail') == -1){
            this.isshow = false
        }
    },
    methods: {
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
        resetForm(searchItem) {
            this.$refs[searchItem].resetFields();
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
            // console.log(`当前页: ${val}`);
            this.getList();
        },
        handleEdit(index, row) {
            // console.log(index, row);
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                appName: row.appName,
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
                skillDel(delParams).then(res=>{
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
        editHandleClose() {
            this.editVisible = false;
        
        },
        addHandClose() {
            this.addVisible = false
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
        addHandleClose(addList){
            this.addVisible = false
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                id:this.currentItem.id,
                appName:this.currentItem.appName
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    skillUpd(updParams).then(res=>{
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
        handleAdd(addList){
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            let addParams = {
                appName:this.addList.appName,
                appPackageName:this.addList.appPackageName,
                appType:this.addList.appType,
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    skillAdd(addParams).then(res=>{
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
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                appName:this.searchItem.appName
            }
            skillList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }
            }).catch(()=>{
                this.listLoading = false
            })
        },
        handleInfo(index, row) {
            this.$router.push({
                path:'/lasf-kv/skill/detail',
                query:{
                    appId:row.id
                }
            })
        }
    }
};
</script>

<style scoped>
</style>
