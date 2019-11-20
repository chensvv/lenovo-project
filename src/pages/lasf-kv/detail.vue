<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>LASF KV</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <div class="d_t">
                <span class="d_title">{{skillDetail.appName}}  
                    </span><span>({{skillDetail.appType}})</span>
            </div>
            <el-form-item label="应用名称" prop="functionName">
                <el-input v-model.trim="searchItem.functionName" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="'skill:functionadd'">添加</el-button>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                style="width: 100%">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="技能描述"
                    prop="functionName"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="说法数量"
                    prop="inc"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="答案数量"
                    prop="inc"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="调用次数"
                    prop="inc"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="用户数"
                    prop="inc"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="失败次数"
                    prop="inc"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="displayUpdateTime"
                    align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'skill:functionupdate'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'skill:functiondelete'">删除</el-button>
                        <el-button
                        size="mini"
                        @click="handleInfo(scope.$index, scope.row)"
                        v-has="'skill:speaklist'">详情</el-button>
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
                <el-form-item label="技能描述" prop="functionName">
                <el-input type="text" v-model.trim="currentItem.functionName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="技能描述" prop="skillName">
                <el-input type="text" v-model.trim="addList.skillName" auto-complete="off"></el-input>
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
import {skillInfo, skillDetailAdd, skillDetailDel, skillDetailUpd} from '@/config/api'
export default {
    data() {
        return {
            appId:"",
            list: [],
            skillDetail:[],
            currentItem: {//编辑数据组
                functionId:"",
                functionName:""
            },
            addList: {//添加数据组
                skillName:""
            },
            searchItem:{//搜索数据组
                functionName:"",
            },
            addRules:{
                skillName:[{ required: true, message: '请输入技能描述', trigger: 'change' }]
            },
            editRules:{
                functionName:[{ required: true, message: '请输入技能描述', trigger: 'blur' }]
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
            editBtnLoading:false
            
        };
    },
    created() {
        this.appId = this.$route.query.appId
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
            this.editVisible = true;
            this.currentItem = {
                functionId:row.id,
                functionName: row.functionName,
            };
        },
        handleDel(index, row) {
            console.log(row)
            let delParams = {
                functionId:row.id
            }
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                skillDetailDel(delParams).then(res=>{
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
            this.addList = {}
            this.addVisible = false
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                functionId:this.currentItem.functionId,
                functionName:this.currentItem.functionName
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    skillDetailUpd(updParams).then(res=>{
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
                id:this.appId,
                appName:this.addList.skillName
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    skillDetailAdd(addParams).then(res=>{
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
        getList() {
            let params = {
                id:this.appId
            }
            skillInfo(params).then(res => {
                this.skillDetail = res.data
                this.list = res.data.functions;
                this.totalCount = res.data.count
            });
        },
        handleInfo(index, row) {
            this.$router.push({
                path:'/lasf-kv/skill/detail/speak',
                query:{
                    functionId:row.id,
                    appId:row.appId
                }
            })
        }
    }
};
</script>

<style scoped>
.d_t{
    display: inline-block; 
    float: left; 
    font-size:12px;
}
.d_title{
    font-size: 16px;
}
</style>
