<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/outer/list'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.meta.title}}（{{skillDetail.appName}} - {{skillDetail.appType}}）</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="应用名称" prop="functionName">
                    <el-input v-model.trim="searchItem.functionName" clearable></el-input>
                </el-form-item>
            </div>
            <!-- <div class="d_t">
                <span class="d_title">{{skillDetail.appName}}  
                    </span><span>({{skillDetail.appType}})</span>
            </div> -->
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'skill:functionadd'">添加</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                stripe
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="center" label="#">
                </el-table-column>
                <el-table-column
                    label="技能描述"
                    prop="functionName"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.functionName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.functionName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.functionName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="说法数量"
                    prop="speakCount"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="答案数量"
                    prop="versionCount"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="调用次数"
                    prop="funCallCount"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="用户数"
                    prop="inc"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="失败次数"
                    prop="funFailCount"
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
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="totalCount"
            ></el-pagination>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="技能描述" prop="functionName">
                <el-input type="text" v-model.trim="currentItem.functionName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
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
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data() {
        return {
            appId:"",
            list: [],
            perList:[],
            skillDetail:[],
            totalClass:'',
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
        this.appId = this.$route.query.appId
      let perArr = JSON.parse(sessionStorage.getItem('btnpermission'))
      perArr.map(t=>{
          this.perList.push(Object.values(t).join())
      })
      this.getList();
    },
    mounted(){
        if(this.perList.indexOf('skill:functionupdate') == -1 && this.perList.indexOf('skill:functiondelete') == -1 && this.perList.indexOf('skill:speaklist') == -1){
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
            // console.log(`当前页: ${val}`);
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
            // console.log(row)
            let delParams = {
                functionId:row.id
            }
            delParams.sign = deleteParams(delParams)
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
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    skillDetailUpd(updParams).then(res=>{
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
        },
        addHandleConfirm(addList) {
            let addParams={
                id:this.appId,
                appName:this.addList.skillName
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    skillDetailAdd(addParams).then(res=>{
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
                id:this.appId,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            skillInfo(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.skillDetail = res.data.data
                    this.list = res.data.data.functions;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.functions.length
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:'error',
                        duration:1000
                    });
                }
            }).catch(()=>{
                this.listLoading = false
            })
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
