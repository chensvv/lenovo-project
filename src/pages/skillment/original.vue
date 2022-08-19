<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/outer/list'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="用户query" prop="command">
                    <el-input v-model.trim="searchItem.command" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'command:mainadd'">添加</el-button>
                <el-button size="mini" @click="handleSong()" v-has="'command:norun:list'">指令忽略管理</el-button>
                <el-button size="mini" @click="handleCommand()" v-has="'command:list'">相似度命令关联</el-button>
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
                    label="用户query"
                    prop="command"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.command" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.command }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.command }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="预设指令"
                    prop="commandInterface"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.commandInterface" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.commandInterface }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.commandInterface }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="添加时间"
                    prop="createTime"
                    align="center"
                    :formatter="formTime"
                    min-with="140">
                </el-table-column>
                <el-table-column
                    label="修改时间"
                    prop="updateTime"
                    align="center"
                    :formatter="formTime2"
                    min-width="120">
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="!30" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'command:mainupdate'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'command:maindelete'">删除</el-button>
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
        <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="addList.command" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预设指令" prop="interface">
                    <el-input type="text" v-model.trim="addList.interface" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="用户query" prop="command">
                    <el-input type="text" v-model.trim="currentItem.command" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预设指令" prop="interface">
                    <el-input type="text" v-model.trim="currentItem.interface" auto-complete="off"></el-input>
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
import {checkTime} from '@/utils/timer.js'
import {originalList,originalAdd,originalUpd,originalDel} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
  data() {
    return {
        list: [],
        perList:[],
        totalClass:'8',
        addList:{
            command:"",
            interface:""
        },
        currentItem:{
            command:"",
            interface:""
        },
        searchItem:{//搜索数据组
            command:"",
        },
        addRules:{
            command:[{ required: true, message: '请输入用户query', trigger: 'change' }],
            interface:[{ required: true, message: '请输入预设指令', trigger: 'change' }],
        },
        editRules:{
            command:[{ required: true, message: '请输入关键字', trigger: 'change' }],
            interface:[{ required: true, message: '请输入预设指令', trigger: 'change' }],
        },
        // 分页
        currentPage: 1, //默认显示第几页
        pageSize: 10,   //默认每页条数
        totalCount:1,     // 总条数
        showTitle:true,
        addVisible:false,
        seabtnLoading:false,
        addBtnLoading:false,
        editVisible: false,
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
        if(this.perList.indexOf('command:mainupdate') == -1 && this.perList.indexOf('command:maindelete') == -1){
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
    formTime(row, column){
      var timer = row.createTime
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
    },
    formTime2(row, column){
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
      this.seabtnLoading = true
      this.currentPage = 1
      this.getList();
      this.seabtnLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
    //   console.log(`当前页: ${val}`);
      this.getList();
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
    handleEdit(index, row) {
        this.editVisible = true;
        this.currentItem = {
            id:row.id,
            command: row.command,
            interface: row.commandInterface
        };
    },
    editHandleClose() {
        this.editVisible = false;
    },
    handleAdd(){
        this.addVisible = true
    },
    addHandleClose(){
        this.addVisible = false
    },
    editHandleConfirm(currentItem) {
        let updParams = {
            id:this.currentItem.id,
            command:this.currentItem.command,
            commandInterface:this.currentItem.interface
        }
        updParams.sign = deleteParams(updParams)
        this.$refs[currentItem].validate((valid) => {
            if (valid) {
                this.editBtnLoading = true
                originalUpd(updParams).then(res=>{
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
    addHandleConfirm(addList) {
        let addParams={
            command:this.addList.command,
            interfaceId:this.addList.interface,
        }
        addParams.sign = deleteParams(addParams)
        this.$refs[addList].validate((valid) => {
            if (valid) {
                this.addBtnLoading = true
                originalAdd(addParams).then(res=>{
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
            originalDel(delParams).then(res=>{
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
    getList() {
        this.listLoading = true
        let params = {
            pgstr:this.currentPage,
            pcstr:this.pageSize,
            command:this.searchItem.command,
        }
        params.sign = deleteParams(params)
        originalList(params).then(res => {
            this.listLoading = false
            if(res.data.code == 200){
                this.list = res.data.data;
                this.totalCount = res.data.count
                this.totalClass = res.data.data.length
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
    handleSong(){
        this.$router.push({
            path:'/command/norun/list'
        })
    },
    handleCommand(){
        this.$router.push({
            path:'/command/list'
        })
    }
  }
};
</script>

<style scoped>
</style>
