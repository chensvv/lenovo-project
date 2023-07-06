<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height70 width130" size="mini">
            <div class="form-input height70">
                <el-form-item label="歌手名称" prop="name">
                    <el-input v-model.trim="searchItem.name" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'skill:music:addsinger'">添加</el-button>
                <el-button size="mini" icon="el-icon-upload" @click="importExcel()">导入数据</el-button>
                <el-button size="mini" @click="handlePub()" :loading="pubBtnLoading" v-has="'skill:music:singerpublish'">发布</el-button>
                <el-button size="mini" @click="handleAblum()" v-has="'skill:music:albumlist'">专辑列表</el-button>
                <el-button size="mini" @click="handleSong()" v-has="'skill:music:songlist'">歌曲列表</el-button>
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
                    label="名称"
                    prop="singerName"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.singerName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.singerName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.singerName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="歌手ID"
                    prop="id"
                    align="center" >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.id" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.id }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.id }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="QQ音乐ID"
                    prop="singerQqId"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.singerQqId" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.singerQqId }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.singerQqId }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="QQ音乐MID"
                    prop="singerQqMid"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.singerQqMid" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.singerQqMid }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.singerQqMid }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="displayUpdateTime"
                    align="center"
                    width="140">
                </el-table-column>
                <el-table-column label="操作" align="center" width="130" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'skill:music:updatesinger'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'skill:music:deletesinger'">删除</el-button>
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
                <el-form-item label="歌手名称" prop="singerName">
                    <el-input type="text" v-model.trim="currentItem.singerName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐ID" prop="singerQqId">
                    <el-input type="text" v-model.trim="currentItem.singerQqId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐MID" prop="singerQqMid">
                    <el-input type="text" v-model.trim="currentItem.singerQqMid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手海报URL" prop="singerQqPosterUrl">
                    <el-input type="text" v-model.trim="currentItem.singerQqPosterUrl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手简介" prop="singerQqIntroduce">
                    <el-input type="text" v-model.trim="currentItem.singerQqIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手图片" prop="singerQqPhoto">
                    <el-input type="text" v-model.trim="currentItem.singerQqPhoto" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="歌手名称" prop="singerName">
                    <el-input type="text" v-model.trim="addList.singerName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐ID" prop="singerQqId">
                    <el-input type="text" v-model.trim="addList.singerQqId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐MID" prop="singerQqMid">
                    <el-input type="text" v-model.trim="addList.singerQqMid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手海报URL" prop="singerQqPosterUrl">
                    <el-input type="text" v-model.trim="addList.singerQqPosterUrl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手简介" prop="singerQqIntroduce">
                    <el-input type="text" v-model.trim="addList.singerQqIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手图片" prop="singerQqPhoto">
                    <el-input type="text" v-model.trim="addList.singerQqPhoto" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addHandleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm('addList')" :loading="addBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="上传文件" :visible.sync="uploadVisible" width="40%" top="10vh" class="eldialog" :before-close="closeFile">
          <el-form class="eldialogForm">
            <el-form-item label >
               <el-upload
                    class="upload-demo"
                    drag
                    ref="upload"
                    :auto-upload="false"
                    accept=".xlsx,.xls"
                    action
                    :before-upload="beforeUpload"
                    :on-change="fileChange"
                    :on-exceed="handleExceed"
                    :filelist="fileList"
                    :multiple="false"
                    :limit="1"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传Excel文件</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeFile()">取 消</el-button>
            <el-button type="primary" @click="postFile()" :loading="fileBtnLoading">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {singerList, singerDel, singerUpd, singerAdd, singerPub, singerUpFile} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data() {
        return {
            list: [],
            perList:[],
            totalClass:'8',
            fileList:[],
            currentItem: {//编辑数据组
                id:"",
                singerName: "",
                singerQqId: "",
                singerQqMid: "",
                singerQqPosterUrl:"",
                singerQqIntroduce:"",
                singerQqPhoto:""
            },
            addList: {//添加数据组
                singerName: "",
                singerQqId: "",
                singerQqMid: "",
                singerQqPosterUrl:"",
                singerQqIntroduce:"",
                singerQqPhoto:""
            },
            searchItem:{//搜索数据组
                name:"",
            },
            addRules:{
                singerName: [{ required: true, message: '请输入歌手名称', trigger: 'change' }],
                singerQqId: [{ required: true, message: '请输入QQ音乐ID', trigger: 'change' }],
                singerQqMid: [{ required: true, message: '请输入QQ音乐MID', trigger: 'change' }],
                singerQqIntroduce:[{ required: true, message: '请输入歌手简介', trigger: 'change' }],
                singerQqPhoto:[{ required: true, message: '请输入歌手图片地址', trigger: 'change' }]
            },
            editRules:{
                singerName: [{ required: true, message: '请输入歌手名称', trigger: 'change' }],
                singerQqId: [{ required: true, message: '请输入QQ音乐ID', trigger: 'change' }],
                singerQqMid: [{ required: true, message: '请输入QQ音乐MID', trigger: 'change' }],
                singerQqIntroduce:[{ required: true, message: '请输入歌手简介', trigger: 'change' }],
                singerQqPhoto:[{ required: true, message: '请输入歌手图片地址', trigger: 'change' }]
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
            pubBtnLoading:false,
            listLoading:true,
            uploadVisible:false,
            fileBtnLoading: false,
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
        if(this.perList.indexOf('skill:music:updatesinger') == -1 && this.perList.indexOf('skill:music:deletesinger') == -1){
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
        importExcel(){
            this.uploadVisible = true
        },
        closeFile(){
            this.uploadVisible = false
        },
        fileChange(file,fileList) {
            console.log(fileList)
            this.fileList = fileList;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
        },
        beforeUpload(file) {
            const extension = file.name.split('.')[1] === 'xls'
            const extension2 = file.name.split('.')[1] === 'xlsx'
            if (!extension && !extension2) {
                this.$message.warning('上传文件必须是Excel格式!')
                return false
            }else{
                return extension || extension2;
            }
            
        },
        postFile(){
            if(this.$refs.upload.$children[0].fileList.length < 1){
                this.$message.warning('请选择要上传的文件！')
                return false
            }else{
               var fileData = new FormData();
                this.fileList.forEach(function(item,index){
                    fileData.append("file", item.raw);
                });
                this.fileBtnLoading = true;
                singerUpFile(fileData).then(res=>{
                    this.fileBtnLoading = false
                    if(res.data.code == 200){
                        this.$message({
                            message:res.data.msg,
                            type:"success",
                        });
                        this.$refs.upload.clearFiles()
                        this.uploadVisible = false
                        this.getList()
                    }else{
                        this.$message({
                            message:res.data.errorMessage,
                            type:"error",
                            duration:1500
                        });
                    }
                }).catch(err=>{
                    this.$message.error('请稍后重试！')
                    this.fileBtnLoading = false;
                })
            }
            
        },
        closeFile() {
            this.files = []
            this.$refs.upload.clearFiles()
            this.uploadVisible = false;
        },
        handleEdit(index, row) {
            // console.log(index, row);
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                singerName: row.singerName,
                singerQqId: row.singerQqId,
                singerQqMid: row.singerQqMid,
                singerQqIntroduce:row.singerQqIntroduce,
                singerQqPosterUrl:row.singerQqPosterUrl,
                singerQqPhoto:row.singerQqPhoto
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
                singerDel(delParams).then(res=>{
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
            })
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
                singerName: this.currentItem.singerName,
                singerQqId: this.currentItem.singerQqId,
                singerQqMid: this.currentItem.singerQqMid,
                singerQqPhoto: this.currentItem.singerQqPhoto,
                singerQqIntroduce: this.currentItem.singerQqIntroduce,
                singerQqPosterUrl:this.currentItem.singerQqPosterUrl
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    singerUpd(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'编辑成功',
                                type:"success",
                                duration:1500
                            });
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
        handleAdd(){
            this.addVisible = true
        },
        addHandleConfirm(addList) {
            let addParams={
                singerName: this.addList.singerName,
                singerQqId: this.addList.singerQqId,
                singerQqMid: this.addList.singerQqMid,
                singerQqPhoto:this.addList.singerQqPhoto,
                singerQqIntroduce:this.addList.singerQqIntroduce,
                singerQqPosterUrl:this.addList.singerQqPosterUrl,
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    singerAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1500
                            });
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
        },
        handlePub(){
            this.pubBtnLoading = true
            singerPub().then(res=>{
                this.pubBtnLoading = false
                if(res.data.again == 1){
                    this.$message({
                        message:'发布成功',
                        type:"success",
                        duration:1500
                    });
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1500
                    });
                    
                }
            }).catch(err => {
            this.pubBtnLoading = false
          })
        },
        getList() {
            this.listLoading = true
            let params = {
                name:this.searchItem.name,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            singerList(params).then(res => {
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
        },
        handleAblum(){
            this.$router.push({
                path:'/lasf-kv/album'
            })
        },
        handleSong(){
            this.$router.push({
                path:'/lasf-kv/song'
            })
        }
    },
};
</script>

<style scoped>
</style>
