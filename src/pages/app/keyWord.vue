<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/list'}">应用搜索</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="关键字" prop="name">
                    <el-input v-model.trim="searchItem.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="标准名" prop="stname">
                    <el-input v-model.trim="searchItem.stname" clearable></el-input>
                </el-form-item>
                <el-form-item label="起始时间" prop="refreshTime">
                    <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.refreshTime" 
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="putTime">
                    <el-date-picker 
                    type="date" 
                    placeholder="选择日期" 
                    v-model="searchItem.putTime"
                    :picker-options="pickerOptions" 
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </div>
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="btnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'app:keywordadd'">添加</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
        <el-table
                :data="list"
                stripe
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading"
                @sort-change="sortChange">
                <el-table-column type="index" align="center" label="#">
                </el-table-column>
                <el-table-column label="原始名" prop="name" align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.name" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.name }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="标准名" prop="stname" align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.stname" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.stname }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.stname }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="别名" prop="alias" align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.alias" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.alias }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.alias }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="来源" prop="source" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.source" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.source }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.source }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="查询时间" prop="searchDate" align="center" :formatter="formTime" min-width="120"></el-table-column>
                <el-table-column label="入库时间" prop="createTime" align="center" :formatter="formTime2" min-width="120"></el-table-column>
                <el-table-column label="操作" min-width="130" align="center"  v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'app:keywordupdate'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'app:keyworddel'">删除</el-button>
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
                <el-form-item label="关键字" prop="name">
                    <el-input type="text" v-model.trim="addList.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标准名" prop="stname">
                    <el-input type="text" v-model.trim="addList.stname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                    <el-input type="text" v-model.trim="addList.alias" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="关键字" prop="name">
                    <el-input type="text" v-model.trim="currentItem.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标准名" prop="stname">
                    <el-input type="text" v-model.trim="currentItem.stname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                    <el-input type="text" v-model.trim="currentItem.alias" auto-complete="off"></el-input>
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
import {wordList,keyAdd,keyUpd,keyDel} from '@/config/api'
export default {
  data() {
    return {
        pickerOptions: {
            disabledDate(time) {
            let times = Date.now() - 24 * 60 * 60 * 1000;
            return time.getTime() > times;
            },
        },
        list: [],
        perList:[],
        totalClass:'',
        addList:{
            name:"",
            stname:"",
            alias:""
        },
        currentItem:{
            name:"",
            stname:"",
            alias:""
        },
        searchItem:{//搜索数据组
            name:"",
            stname:"",
            refreshTime:"",
            putTime:""
        },
        addRules:{
            name:[{ required: true, message: '请输入关键字', trigger: 'change' }],
            stname:[{ required: true, message: '请输入标准名', trigger: 'change' }],
            alias:[{ required: true, message: '请输入别名', trigger: 'change' }],
        },
        editRules:{
            name:[{ required: true, message: '请输入关键字', trigger: 'change' }],
            stname:[{ required: true, message: '请输入标准名', trigger: 'change' }],
            alias:[{ required: true, message: '请输入别名', trigger: 'change' }],
        },
        column:{
            prop:'',
            order:''
        },
        // 分页
        currentPage: 1, //默认显示第几页
        pageSize: 10,   //默认每页条数
        totalCount:1,     // 总条数
        showTitle:true,
        btnLoading:false,
        addVisible:false,
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
        if(this.perList.indexOf('app:keywordupdate') == -1 && this.perList.indexOf('app:keyworddel') == -1){
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
      var timer = row.searchDate
      var date = new Date(timer)
        return date.getFullYear()+'-'+
          checkTime(date.getMonth()+1)+'-'+
          checkTime(date.getDate())+' '+
          checkTime(date.getHours())+':'+
          checkTime(date.getMinutes())
    },
    formTime2(row, column){
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
      this.btnLoading = true
      this.currentPage = 1
      this.getList();
      this.btnLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listLoading = true
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
            name: row.name,
            alias: row.alias,
            stname: row.stname
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
            name:this.currentItem.name,
            alias:this.currentItem.alias,
            stname:this.currentItem.stname
        }
        this.$refs[currentItem].validate((valid) => {
            if (valid) {
                this.editBtnLoading = true
                keyUpd(updParams).then(res=>{
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
            name:this.addList.name,
            alias:this.addList.alias,
            stname:this.addList.stname
        }
        this.$refs[addList].validate((valid) => {
            if (valid) {
                this.addBtnLoading = true
                keyAdd(addParams).then(res=>{
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
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            keyDel(delParams).then(res=>{
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
    sortChange(column){
        this.column = {
            prop:column.prop,
            order:column.order
        }
        console.log(this.column)
        this.getList()
    },
    getList() {
        this.listLoading = true
        let params = {
            pgstr:this.currentPage,
            pcstr:this.pageSize,
            name:this.searchItem.name,
            stname:this.searchItem.stname,
            startStr:this.searchItem.refreshTime,
            endStr:this.searchItem.putTime,
            fieldName: this.column.prop,
            order:this.column.order == 'ascending' ? '0' : ''
        }
        wordList(params).then(res => {
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
    }
  }
};
</script>

<style scoped>
</style>
