<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/outer/list'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="searchItem.name" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'skill:videoadd'">添加</el-button>
                <el-button size="mini" @click="handleBatchDel()" v-has="'skill:videodelete'">批量删除</el-button>
            </div>
            
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                stripe
                :class="this.totalClass <= '7' ? 'limitWidth' :''"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                @sort-change="sortChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column type="index" align="center" label="#">
                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="programName"
                    align="left"
                    sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.programName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.programName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.programName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="programDisplayType"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.programDisplayType" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.programDisplayType }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.programDisplayType }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="导演"
                    prop="programDirector"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.programDirector" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.programDirector }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.programDirector }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="集数"
                    prop="programChildNumber"
                    align="center" 
                    >
                </el-table-column>
                <el-table-column
                    label="链接"
                    prop="programUrl"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.programUrl" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.programUrl }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.programUrl }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="来源"
                    prop="programDisplaySource"
                    align="center" 
                    sortable="custom"
                    >
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="130" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'skill:videoupdate'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'skill:videodelete'">删除</el-button>
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
                <el-form-item label="名称" prop="programName">
                    <el-input type="text" v-model.trim="currentItem.programName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="programAliasName">
                    <el-input type="text" v-model.trim="currentItem.programAliasName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节目类型" prop="programDisplayType">
                    <el-input type="text" v-model.trim="currentItem.programDisplayType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上映类型" prop="programReleaseType">
                    <el-input type="text" v-model.trim="currentItem.programReleaseType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容类型" prop="programContentType">
                    <el-input type="text" v-model.trim="currentItem.programContentType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上映年代" prop="programReleaseAge">
                    <el-input type="text" v-model.trim="currentItem.programReleaseAge" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="语音" prop="programContentLanguage">
                    <el-input type="text" v-model.trim="currentItem.programContentLanguage" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="导演" prop="programDirector">
                    <el-input type="text" v-model.trim="currentItem.programDirector" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主演" prop="programMainStar">
                    <el-input type="text" v-model.trim="currentItem.programMainStar" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="演员" prop="programActors">
                    <el-input type="text" v-model.trim="currentItem.programActors" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="programIntroduce">
                    <el-input type="textarea" v-model.trim="currentItem.programIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网站评分" prop="programScore" class="inpntNumber">
                    <el-input-number v-model.trim="currentItem.programScore" auto-complete="off" :precision="1" :controls="false"></el-input-number>
                </el-form-item>
                <el-form-item label="集数" prop="programChildNumber">
                    <el-input type="text" v-model.trim="currentItem.programChildNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="programUrl">
                    <el-input type="text" v-model.trim="currentItem.programUrl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="级别" prop="programLevel">
                    <el-input type="text" v-model.trim="currentItem.programLevel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源网站" prop="programSource">
                    <el-select v-model="currentItem.programSource" placeholder="--" clearable>
                        <el-option v-for="(item,index) in sourceList" :key="index" :label="item.appName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="海报链接" prop="programPoster">
                    <el-input type="text" v-model.trim="currentItem.programPoster" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="名称" prop="programName">
                    <el-input type="text" v-model.trim="addList.programName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="programAliasName">
                    <el-input type="text" v-model.trim="addList.programAliasName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节目类型" prop="programDisplayType">
                    <el-input type="text" v-model.trim="addList.programDisplayType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上映类型" prop="programReleaseType">
                    <el-input type="text" v-model.trim="addList.programReleaseType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容类型" prop="programContentType">
                    <el-input type="text" v-model.trim="addList.programContentType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上映年代" prop="programReleaseAge">
                    <el-input type="text" v-model.trim="addList.programReleaseAge" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="语言" prop="programContentLanguage">
                    <el-input type="text" v-model.trim="addList.programContentLanguage" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="导演" prop="programDirector">
                    <el-input type="text" v-model.trim="addList.programDirector" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主演" prop="programMainStar">
                    <el-input type="text" v-model.trim="addList.programMainStar" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="演员" prop="programActors">
                    <el-input type="text" v-model.trim="addList.programActors" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="programIntroduce">
                    <el-input type="textarea" v-model.trim="addList.programIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网站评分" prop="programScore" class="inpntNumber">
                    <el-input-number v-model.trim="addList.programScore" auto-complete="off" :precision="1" :controls="false"></el-input-number>
                </el-form-item>
                <el-form-item label="集数" prop="programChildNumber">
                    <el-input type="text" v-model.trim="addList.programChildNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="programUrl">
                    <el-input type="text" v-model.trim="addList.programUrl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="级别" prop="programLevel">
                    <el-input type="text" v-model.trim="addList.programLevel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源网站" prop="programSource">
                    <el-select v-model="addList.programSource" placeholder="--" clearable>
                        <el-option v-for="(item,index) in sourceList" :key="index" :label="item.appName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="海报链接" prop="programPoster">
                    <el-input type="text" v-model.trim="addList.programPoster" auto-complete="off"></el-input>
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
import {videoList, videoDel, videoUpd, videoAdd, videoSelect, videoDelBatch} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data() {
        return {
            list: [],
            perList:[],
            sels:[],
            totalClass:'',
            currentItem: {//编辑数据组
                id:"",
                programName: "",
                programAliasName: "",
                programDisplayType: "",
                programReleaseType:"",
                programContentType:"",
                programReleaseAge:"",
                programContentLanguage:"",
                programDirector:"",
                programMainStar:"",
                programActors:"",
                programIntroduce:"",
                programScore:"",
                programChildNumber:"",
                programUrl:"",
                programLevel:"",
                programSource:"",
                programPoster:""
            },
            sourceList:[],
            addList: {//添加数据组
                programName: "",
                programAliasName: "",
                programDisplayType: "",
                programReleaseType:"",
                programContentType:"",
                programReleaseAge:"",
                programContentLanguage:"",
                programDirector:"",
                programMainStar:"",
                programActors:"",
                programIntroduce:"",
                programScore:"",
                programChildNumber:"",
                programUrl:"",
                programLevel:"",
                programSource:"",
                programPoster:""
            },
            searchItem:{//搜索数据组
                name:"",
            },
            addRules:{
                programName: [{ required: true, message: '请输入电影名称', trigger: 'change' }],
                programAliasName: [{ required: true, message: '请输入电影别名（如无别名，请输入电影名称）', trigger: 'change' }],
                programDisplayType: [{ required: true, message: '请输入节目类型', trigger: 'change' }],
                programReleaseType:[{ required: true, message: '请输入上映类型', trigger: 'change' }],
                programContentType:[{ required: true, message: '请输入内容类型', trigger: 'change' }],
                programReleaseAge:[{ required: true, message: '请输入上映年代', trigger: 'change' }],
                programContentLanguage:[{ required: true, message: '请输入语言', trigger: 'change' }],
                programDirector:[{ required: true, message: '请输入导演', trigger: 'change' }],
                programMainStar:[{ required: true, message: '请输入主演', trigger: 'change' }],
                programActors:[{ required: true, message: '请输入演员', trigger: 'change' }],
                programIntroduce:[{ required: true, message: '请输入简介', trigger: 'change' }],
                programScore:[{ required: true,message: '请输入电影评分', trigger: 'change' }],
                programChildNumber:[{ required: true, message: '请输入电影集数', trigger: 'change' }],
                programUrl:[{ required: true, message: '请输入链接', trigger: 'change' }],
                programLevel:[{ required: true, message: '请输入级别', trigger: 'change' }],
                programSource:[{ required: true, message: '请选择来源', trigger: 'change' }],
                programPoster:[{ required: true, message: '请输入海报链接', trigger: 'change' }]
            },
            editRules:{
                programName: [{ required: true, message: '请输入电影名称', trigger: 'change' }],
                programAliasName: [{ required: true, message: '请输入电影别名（如无别名，请输入电影名称）', trigger: 'change' }],
                programDisplayType: [{ required: true, message: '请输入节目类型', trigger: 'change' }],
                programReleaseType:[{ required: true, message: '请输入上映类型', trigger: 'change' }],
                programContentType:[{ required: true, message: '请输入内容类型', trigger: 'change' }],
                programReleaseAge:[{ required: true, message: '请输入上映年代', trigger: 'change' }],
                programContentLanguage:[{ required: true, message: '请输入语言', trigger: 'change' }],
                programDirector:[{ required: true, message: '请输入导演', trigger: 'change' }],
                programMainStar:[{ required: true, message: '请输入主演', trigger: 'change' }],
                programActors:[{ required: true, message: '请输入演员', trigger: 'change' }],
                programIntroduce:[{ required: true, message: '请输入简介', trigger: 'change' }],
                programScore:[{ required: true, message: '请输入电影评分', trigger: 'change' }],
                programChildNumber:[{ required: true, message: '请输入电影集数', trigger: 'change' }],
                programUrl:[{ required: true, message: '请输入链接', trigger: 'change' }],
                programLevel:[{ required: true, message: '请输入级别', trigger: 'change' }],
                programSource:[{ required: true, message: '请选择来源', trigger: 'change' }],
                programPoster:[{ required: true, message: '请输入海报链接', trigger: 'change' }]
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
        if(this.perList.indexOf('skill:videoupdate') == -1 && this.perList.indexOf('skill:videodelete') == -1){
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
        handleSelectionChange(val){
            this.sels = val
        },
        handleEdit(index, row) {
            this.editVisible = true;
            videoSelect().then(res=>{
                this.sourceList = res.data
            })
            this.currentItem = {
                id:row.id,
                programName: row.programName,
                programAliasName: row.programAliasName,
                programDisplayType: row.programDisplayType,
                programReleaseType:row.programReleaseType,
                programContentType:row.programContentType,
                programReleaseAge:row.programReleaseAge,
                programContentLanguage:row.programContentLanguage,
                programDirector:row.programDirector,
                programMainStar:row.programMainStar,
                programActors:row.programActors,
                programIntroduce:row.programIntroduce,
                programScore:row.programScore,
                programChildNumber:row.programChildNumber,
                programUrl:row.programUrl,
                programLevel:row.programLevel,
                programSource:row.programSource,
                programPoster:row.programPoster
            };
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
                videoDel(delParams).then(res=>{
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
            }).catch((err) => {
                console.log(err);
            });
        },
        handleBatchDel(){
            let ids = this.sels.map(item => item.id)
            if(ids.length == 0 || ids == [] || ids == null){
                this.$message({
                    message:'请选择要删除的数据',
                    type:"warning",
                    duration:1000
                });
            }else{
                let delsParams = {
                    ids:ids
                }
                delsParams.sign = deleteParams(delsParams)
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    videoDelBatch(delsParams).then(res=>{
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
            }
            
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
                programName:this.currentItem.programName,
                programAliasName:this.currentItem.programAliasName,
                programDisplayType: this.currentItem.programDisplayType,
                programReleaseType:this.currentItem.programReleaseType,
                programContentType:this.currentItem.programContentType,
                programReleaseAge:this.currentItem.programReleaseAge,
                programContentLanguage:this.currentItem.programContentLanguage,
                programDirector:this.currentItem.programDirector,
                programMainStar:this.currentItem.programMainStar,
                programActors:this.currentItem.programActors,
                programScore:Number(this.currentItem.programScore).toFixed(1),
                programIntroduce:this.currentItem.programIntroduce,
                programChildNumber:this.currentItem.programChildNumber,
                programUrl:this.currentItem.programUrl,
                programLevel:this.currentItem.programLevel,
                programSource:this.currentItem.programSource,
                programPoster:this.currentItem.programPoster,
                id:this.currentItem.id
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    videoUpd(updParams).then(res=>{
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
            videoSelect().then(res=>{
                this.sourceList = res.data
            })
        },
        addHandleConfirm(addList) {
            console.log(addList)
            let addParams={
                programName: this.addList.programName,
                programAliasName: this.addList.programAliasName,
                programDisplayType: this.addList.programDisplayType,
                programReleaseType:this.addList.programReleaseType,
                programContentType:this.addList.programContentType,
                programReleaseAge:this.addList.programReleaseAge,
                programContentLanguage:this.addList.programContentLanguage,
                programDirector:this.addList.programDirector,
                programMainStar:this.addList.programMainStar,
                programActors:this.addList.programActors,
                programIntroduce:this.addList.programIntroduce,
                programScore:Number(this.addList.programScore).toFixed(1),
                programChildNumber:this.addList.programChildNumber,
                programUrl:this.addList.programUrl,
                programLevel:this.addList.programLevel,
                programSource:this.addList.programSource,
                programPoster:this.addList.programPoster
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    videoAdd(addParams).then(res=>{
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
                name:this.searchItem.name,
                pgstr:this.currentPage,
                pcstr:this.pageSize,
                fieldName: this.column.prop,
                order:this.column.order == 'ascending' ? '0' : ''
            }
            params.sign = deleteParams(params)
            videoList(params).then(res => {
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
    },
};
</script>

<style scoped>
</style>
