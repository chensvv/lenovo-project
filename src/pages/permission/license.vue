<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/permission/role'}">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="操作人" prop="name">
                    <el-input v-model.trim="searchItem.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="pickerVal" class="date-form">
                    <el-date-picker
                        v-model="searchItem.pickerVal"
                        type="daterange"
                        align="center"
                        size="mini"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))">
                    </el-date-picker>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'was:add'">添加</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                stripe
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading"
                @sort-change="sortChange"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column type="index" align="center" label="#">
                </el-table-column>
                <el-table-column
                    label="产品ID"
                    prop="productId"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="授权线程数"
                    prop="threadNum"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.threadNum" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.threadNum }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.threadNum }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作人"
                    prop="operator"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.operator" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.operator }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.operator }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="机器信息文件"
                    prop="machineInfo"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.machineInfo" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.machineInfo }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.machineInfo }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="授权文件"
                    prop="licenseFile"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.licenseFile" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.licenseFile }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.licenseFile }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="授权时间"
                    prop="authorizationTime"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="授权文件生效时间"
                    prop="buildTime"
                    :formatter="formTime"
                    align="center"
                    width="130">
                </el-table-column>
                <el-table-column
                    label="添加时间"
                    prop="createTime"
                    :formatter="formTime2"
                    align="center"
                    width="130">
                </el-table-column>
                <el-table-column label="操作" width="240" align="center"  v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        :loading="downBtnLoading"
                        @click="handleDownload(scope.$index, scope.row)"
                        v-has="'license:download'">下载</el-button>
                        <el-button
                        size="mini"
                        @click="handleGenerate(scope.$index, scope.row)"
                        v-has="'license:generate'">授权</el-button>
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'license:update'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'license:delete'">删除</el-button>
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

        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="授权类别" prop="licenseType">
                    <el-select v-model="currentItem.licenseType" placeholder="--">
                        <el-option label="asr" value="asr"></el-option>
                        <el-option label="tts" value="tts"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权时间" prop="authorizationTime">
                    <el-input type="text" v-model.trim="currentItem.authorizationTime" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品ID" prop="productId">
                    <el-input type="text" v-model.trim="currentItem.productId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="授权线程数" prop="threadNum">
                    <el-input type="text" v-model.trim="currentItem.threadNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="操作人" prop="operator">
                    <el-input type="text" v-model.trim="currentItem.operator" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="机器信息文件" >
                    <el-upload
                        class="lice-upload"
                        drag
                        :on-exceed="handleExceedEdit"
                        :limit="1"
                        :http-request="uploadFileEdit"
                        multiple
                        ref="editUpload"
                        action
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @close="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="授权类别" prop="licenseType">
                    <el-select v-model="addList.licenseType" placeholder="--">
                        <el-option label="asr" value="asr"></el-option>
                        <el-option label="tts" value="tts"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权时间" prop="authorizationTime">
                    <el-input type="text" v-model.trim="addList.authorizationTime" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品ID" prop="productId">
                    <el-input type="text" v-model.trim="addList.productId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="授权线程数" prop="threadNum">
                    <el-input type="text" v-model.trim="addList.threadNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="操作人" prop="operator">
                    <el-input type="text" v-model.trim="addList.operator" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="机器信息文件" >
                    <el-upload
                        class="lice-upload"
                        drag
                        :on-exceed="handleExceed"
                        :limit="1"
                        :http-request="uploadFile"
                        multiple
                        ref="addUpload"
                        action
                        
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                        </div>
                    </el-upload>
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
import {licenseList, licenseAdd, licenseUpdate, licenseDel, licenseGen, licenseDown} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
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
            totalClass:'8',
            currentItem: {//编辑数据组
                id:"",
                licenseType:"",
                authorizationTime: "",
                productId: "",
                threadNum: "",
                operator:"",
                updateFile:null
            },
            addList: {//添加数据组
                licenseType:"",
                authorizationTime: "",
                productId: "",
                threadNum: "",
                operator:"",
                addFile:null
            },
            searchItem:{//搜索数据组
                name:"",
                pickerVal:[]
            },
            addRules:{
                licenseType:[{ required: true, message: '请选择授权类别', trigger: 'change' }],
                authorizationTime:[{ required: true, message: '请输入授权时间', trigger: 'change' }],
                productId:[{ required: true, message: '请输入产品ID', trigger: 'change' }],
                threadNum:[{ required: true, message: '请输入授权线程数', trigger: 'change' }],
                operator:[{ required: true, message: '请输入操作人', trigger: 'change' }],
            },
            editRules:{
                licenseType:[{ required: true, message: '请选择授权类别', trigger: 'change' }],
                authorizationTime:[{ required: true, message: '请输入授权时间', trigger: 'change' }],
                productId:[{ required: true, message: '请输入产品ID', trigger: 'change' }],
                threadNum:[{ required: true, message: '请输入授权线程数', trigger: 'change' }],
                operator:[{ required: true, message: '请输入操作人', trigger: 'change' }],
            },
            column:{
                prop:'',
                order:''
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
            downBtnLoading:false,
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
        if(this.perList.indexOf('license:generate') == -1 && this.perList.indexOf('license:delete') == -1 && this.perList.indexOf('license:update') == -1){
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
            var timer = row.buildTime
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
                licenseType:row.licenseType,
                authorizationTime: row.authorizationTime,
                productId: row.productId,
                threadNum: row.threadNum,
                operator:row.operator,
                updateFile:row.machineInfo
            };
            console.log(this.currentItem)
        },
        handleGenerate(index, row){
            let GenerateParams = {
                id:row.id
            }
            GenerateParams.sign = deleteParams(GenerateParams)
            licenseGen(GenerateParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'授权成功',
                        type:"success",
                        duration:1500
                    });
                    this.getList();
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1500
                    });
                }
                
            })
        },
        handleDownload(index, row){
            this.downBtnLoading = true
            let downloadParams = {
                id:row.id
            }
            downloadParams.sign = deleteParams(downloadParams)
            licenseDown(downloadParams).then(res=>{
                let blobUrl = new Blob([res.data])
                let a = document.createElement('a');
                let url = window.URL.createObjectURL(blobUrl);
                let filename = row.licenseFile
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                this.downBtnLoading = false
                // if(res.data.code == 200){
                //     this.$message({
                //         message:'授权成功',
                //         type:"success",
                //         duration:1500
                //     });
                //     this.getList();
                // }else{
                //     this.$message({
                //         message:res.data.errorMessage,
                //         type:"error",
                //         duration:1500
                //     });
                // }
                
            })
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
                licenseDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:1500
                        });
                        this.getList();
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1500
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
                    this.addList.addFile = null
                    this.$refs.addUpload.clearFiles()
                }
            })
        },
        closeFun(currentItem){
            this.$nextTick(() => {
                if(this.$refs[currentItem]){
                    this.$refs[currentItem].clearValidate();
                    // this.fileList[0].name=''
                    // this.fileList[0].url = ''
                    this.currentItem.updateFile = null
                    this.$refs.editUpload.clearFiles()
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
            let updParams = new FormData()
            updParams.append('id',this.currentItem.id)
            updParams.append('licenseType',this.currentItem.licenseType)
            updParams.append('authorizationTime',this.currentItem.authorizationTime)
            updParams.append('productId',this.currentItem.productId)
            updParams.append('threadNum',this.currentItem.threadNum)
            updParams.append('operator',this.currentItem.operator)
            updParams.append('ex',this.currentItem.updateFile)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    licenseUpdate(updParams).then(res=>{
                            this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'编辑成功',
                                type:"success",
                                duration:1500
                            });
                            this.$refs.editUpload.clearFiles()
                            this.getList()
                            this.editVisible = false
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
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
        },
        handleExceedEdit(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
        },
        uploadFile(item) {
            this.addList.addFile = item.file;
        },
        uploadFileEdit(item) {
            this.currentItem.updateFile = item.file;
        },
        handleAdd(){
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            if(this.addList.addFile == null){
                this.$message({
                    message:'请先上传机器信息文件后提交！',
                    type:"warning",
                    duration:2000
                });
            }else{
                let addParams = new FormData()
                addParams.append('licenseType',this.addList.licenseType)
                addParams.append('authorizationTime',this.addList.authorizationTime)
                addParams.append('productId',this.addList.productId)
                addParams.append('threadNum',this.addList.threadNum)
                addParams.append('operator',this.addList.operator)
                addParams.append('ex',this.addList.addFile)
                this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    licenseAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1500
                            });
                            this.$refs.addUpload.clearFiles()
                            this.getList();
                            this.addVisible = false
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1500
                            });
                            
                        }
                        
                    }).catch(err => {
                        this.addBtnLoading = false
                    })
                } else {
                    return false;
                }
            });
            }
            
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

                startStr:this.searchItem.pickerVal[0],
                endStr:this.searchItem.pickerVal[1],
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                operator:this.searchItem.name
                // fieldName: this.column.prop,
                // order:this.column.order == 'ascending' ? '0' : ''
            }
            params.sign = deleteParams(params)
            licenseList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:'error',
                        duration:1500
                    });
                }
            }).catch(()=>{
                this.listLoading = false
            })
        }
    },
};
</script>

<style scoped>
</style>
