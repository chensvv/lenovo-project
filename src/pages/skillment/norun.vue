<template>
    <div class="table norun">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>技能管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="用户query" prop="command">
                <el-input v-model.trim="searchItem.command" clearable></el-input>
            </el-form-item>
            <el-form-item class="sub-btn">
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'command:norun:add'">添加</el-button>
                <el-button size="mini" @click="handleCommand()" v-has="'command:list'">相似度命令关联</el-button>
                <el-button size="mini" @click="handleOriginal()" v-has="'command:mainlist'">原始指令管理</el-button>
            </el-form-item>
            
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                :class="this.totalCount <= 5 ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="用户query"
                    prop="command"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="修改时间"
                    prop="updateTime"
                    align="center"
                    :formatter="formTime"
                    min-width="120">
                </el-table-column>
                <el-table-column label="操作" align="center" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                         v-has="'command:norun:delete'"
                        @click="handleDel(scope.$index, scope.row)"
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
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="130px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="addList.command" auto-complete="off"></el-input>
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
import {norunList, norunDel, norunAdd} from '@/config/api'
export default {
    data() {
        return {
            list: [],
            perList:[],
            sourceList:[],
            addList: {//添加数据组
                command:"",
                interFaceId:""
            },
            searchItem:{//搜索数据组
                command:"",
            },
            addRules:{
                command: [{ required: true, message: '请输入用户query', trigger: 'change' }],
            },
            addVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            seaBtnLoading:false,
            addBtnLoading:false,
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
        if(this.perList.indexOf('command:norun:delete') == -1){
            this.isshow = false
        }
    },
    methods: {
        formTime(row, column){
            var timer = row.updateTime
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
            // console.log(`当前页: ${val}`);
            this.getList();
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
                norunDel(delParams).then(res=>{
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
        addHandleClose(){
            this.addVisible = false
        },
        handleAdd(){
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            let addParams={
                command:this.addList.command
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    norunAdd(addParams).then(res=>{
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
                        
                    })
                    .catch(err => {
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
                command:this.searchItem.command,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            norunList(params).then(res => {
                this.listLoading = false
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
        },
        handleCommand(){
            this.$router.push({
                path:'/command/list'
            })
        },
        handleOriginal(){
            this.$router.push({
                path:'/command/mainlist'
            })
        }
    },
};
</script>

<style scoped>
</style>
