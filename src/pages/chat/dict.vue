<template>
  <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>闲聊数据</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="热词" prop="hotName">
                <el-input v-model.trim="searchItem.hotName" clearable></el-input>
            </el-form-item>
        <el-form-item label="VDM" prop="vdm">
            <el-select v-model="searchItem.vdm" placeholder="--" clearable>
            <el-option label="all" value="all"></el-option>
            <el-option label="les" value="les"></el-option>
            <el-option label="app" value="app"></el-option>
            <el-option label="vod" value="vod"></el-option>
            </el-select>
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
        <el-button class="success" size="mini" @click="handleAdd()" v-has="34">添加</el-button>
        </el-form>
        <div class="table-box">
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="index" align="center">
            </el-table-column>
            <el-table-column
                label="VDM"
                prop="vdm"
                align="center">
            </el-table-column>
            <el-table-column
                label="热词"
                prop="name"
                align="center">
            </el-table-column>
            <el-table-column
                label="发音"
                prop="pronounceName"
                align="center">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="upTime"
                 align="center"
                :formatter="formTime">
            </el-table-column>
            <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="110">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="37">删除</el-button>
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
        <el-form :label-position="'left'" label-width="100px" :rules="editRules" :model="currentItem" ref="currentItem">
            <el-form-item label="热词" prop="hotName">
                <el-input type="text" v-model.trim="currentItem.hotName" auto-complete="off"></el-input>
                <el-button size="mini">获取推荐读音</el-button>
            </el-form-item>
            <el-form-item label="词语发音" prop="pronounceName">
                <el-input type="text" v-model.trim="currentItem.pronounceName" auto-complete="off"></el-input>
                <span style="font-size:12px">(如热词为‘A180’，此处可填写‘诶裔巴绫’)</span>
            </el-form-item>
            <el-form-item label="VDM" prop="vdm">
                <el-select v-model="currentItem.vdm" placeholder="--">
                <el-option label="all" value="all"></el-option>
                <el-option label="les" value="les"></el-option>
                <el-option label="app" value="app"></el-option>
                <el-option label="vod" value="vod"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editHandleClose">取 消</el-button>
            <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
        <el-form :label-position="'left'" label-width="100px" :rules="addRules" :model="addList" ref="addList">
            <el-form-item label="热词" prop="hotName">
                <el-input type="text" v-model.trim="addList.hotName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="词语发音" prop="pronounceName">
                <el-input type="text" v-model.trim="addList.pronounceName" placeholder="(如热词为‘A180’，此处可填写‘诶裔巴绫’)" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="VDM" prop="vdm">
                <el-select v-model="addList.vdm" placeholder="--">
                    <el-option label="all" value="all"></el-option>
                    <el-option label="les" value="les"></el-option>
                    <el-option label="app" value="app"></el-option>
                    <el-option label="vod" value="vod"></el-option>
                </el-select>
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
import iTable from "@/components/table";
import {checkTime} from '@/utils/timer.js'
import {dictList, dictDel, dictAddUpd} from '@/config/api'
export default {
    name: "applicationlist",
    components: { iTable },
    data() {
        return {
            list: [],
            currentItem: {//编辑数据组
                hotName: "",
                pronounceName: "",
                vdm: "",
            },
            addList: {//添加数据组
                hotName: "",
                pronounceName: "",
                vdm: "",
            },
            searchItem:{//搜索数据组
                hotName:"",
                vdm:"",
                refreshTime:"",
                putTime:""
            },
            addRules:{
                hotName:[{ required: true, message: '请输入网站名称add', trigger: 'change' }],
                pronounceName:[{ required: true, message: '请输入说法', trigger: 'change' }],
                vdm:[{ required: true, message: '请输入手机网址', trigger: 'change' }],
            },
            editRules:{
                hotName:[{ required: true, message: '请输入网站名称add', trigger: 'blur' }],
                pronounceName:[{ required: true, message: '请输入说法', trigger: 'blur' }],
                vdm:[{ required: true, message: '请输入手机网址', trigger: 'blur' }],
            },
            editVisible: false,
            addVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 30,   //默认每页条数
            pageSizes:[10, 20, 30],
            totalCount:1,     // 总条数
            seaBtnLoading:false,
            addBtnLoading:false,
            editBtnLoading:false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        formTime(row, column){
            var timer = row.upTime
            var date = new Date(timer)
                return date.getFullYear()+'-'+
                    checkTime(date.getMonth()+1)+'-'+
                    checkTime(date.getDate())+' '+
                    checkTime(date.getMonth())+':'+
                    checkTime(date.getMinutes())+':'+
                    checkTime(date.getSeconds())
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getList();
        },
        onSubmit(){
            this.seaBtnLoading = true
            this.getList();
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
                hotName: row.name,
                pronounceName: row.pronounceName,
                vdm: row.vdm
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
                dictDel(delParams).then(res=>{
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
                vdm:this.currentItem.vdm,
                name:this.currentItem.hotName,
                pronounceName:this.currentItem.pronounceName
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    dictAddUpd(updParams).then(res=>{
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
            let addParams = {
                name:this.addList.hotName,
                vdm:this.addList.vdm,
                pronounceName:this.addList.pronounceName
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    dictAddUpd(addParams).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList()
                            this.addBtnLoading = false
                            this.addVisible = false
                        }else{
                            this.addBtnLoading = false
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
        getList() {
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                startStr:this.searchItem.refreshTime,
                endStr:this.searchItem.putTime,
                name: this.searchItem.hotName,
                vdm:this.searchItem.vdm,
            }
            dictList(params).then(res => {
                console.log(res)
                this.list = res.data.data.data
                this.totalCount = res.data.data.total
            });
        }
    }
};
</script>

<style scoped>
</style>
