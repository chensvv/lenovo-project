<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="网站名" prop="name">
                <el-input v-model.trim="searchItem.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="来源" prop="source">
                <el-input v-model.trim="searchItem.source" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="refreshTime">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.refreshTime" 
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="putTime">
                <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.putTime" 
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="'was:add'">添加</el-button>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="网站名称"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="别名"
                    prop="alias"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="手机网址"
                    prop="wapUrl"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="WEB网址"
                    prop="url"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="来源"
                    prop="source"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="createTime"
                    align="center"
                    :formatter="formTime">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'was:update'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'was:delete'">删除</el-button>
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
                <el-form-item label="网站名称modify" prop="name">
                    <el-input type="text" v-model.trim="currentItem.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="说法" prop="alias">
                    <el-input type="text" v-model.trim="currentItem.alias" auto-complete="off"></el-input>
                    <span style="font-size:12px">(多个说法用' / '分隔。例：网址导航/联想导航)</span>
                </el-form-item>
                <el-form-item label="手机网址" prop="wapUrl">
                    <el-input type="text" v-model.trim="currentItem.wapUrl" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="120px" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="网站名称add" prop="name">
                    <el-input type="text" v-model.trim="addList.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="说法" prop="alias">
                    <el-input type="text" v-model.trim="addList.alias" placeholder="(多个说法用' / '分隔。例：网址导航/联想导航)" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机网址" prop="wapUrl">
                    <el-input type="text" v-model.trim="addList.wapUrl" auto-complete="off"></el-input>
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
import {checkTime} from '@/utils/timer.js'
import {wasList, wasDel, wasUpd, wasAdd} from '@/config/api'
export default {
    data() {
        return {
            list: [],
            currentItem: {//编辑数据组
                id:"",
                name: "",
                alias: "",
                wapUrl: "",
            },
            addList: {//添加数据组
                name: "",
                alias: "",
                wapUrl: "",
            },
            searchItem:{//搜索数据组
                name:"",
                source:"",
                refreshTime:"",
                putTime:""
            },
            addRules:{
                name:[{ required: true, message: '请输入网站名称add', trigger: 'change' }],
                alias:[{ required: true, message: '请输入说法', trigger: 'change' }],
                wapUrl:[{ required: true, message: '请输入手机网址', trigger: 'change' }],
            },
            editRules:{
                name:[{ required: true, message: '请输入网站名称add', trigger: 'blur' }],
                alias:[{ required: true, message: '请输入说法', trigger: 'blur' }],
                wapUrl:[{ required: true, message: '请输入手机网址', trigger: 'blur' }],
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
            listLoading:true
        };
    },
    created() {
        this.getList();
    },
    methods: {
        formTime(row, column){
            var timer = row.createTime
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getHours())+':'+
                    checkTime(date.getMinutes())
        },
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
                name: row.name,
                alias: row.alias,
                wapUrl: row.wapUrl
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
                wasDel(delParams).then(res=>{
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
                id:this.currentItem.id,
                name:this.currentItem.name,
                alias:this.currentItem.alias,
                wapUrl:this.currentItem.wapUrl
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    wasUpd(updParams).then(res=>{
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
                name:this.addList.name,
                alias:this.addList.alias,
                wapUrl:this.addList.wapUrl
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    wasAdd(addParams).then(res=>{
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
            let params = {
                title:this.searchItem.name,
                source:this.searchItem.source,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            wasList(params).then(res => {
                this.listLoading = false
                this.list = res.data.data.data;
                this.totalCount = res.data.data.total
            });
        }
    },
};
</script>

<style scoped>
</style>
