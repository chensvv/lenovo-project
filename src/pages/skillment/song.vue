<template>
    <div class="table height-85">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/skill/applist'}">技能管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="90px" class="demo-form-inline height50 width130" size="mini">
            <div class="form-input height50">
                <el-form-item label="歌曲名称" prop="name">
                    <el-input v-model.trim="searchItem.name" clearable></el-input>
                </el-form-item>
            </div>
            
            <div class="form-btn">
                <el-button size="mini" type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button size="mini" @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'skill:music:addsong'">添加</el-button>
                <el-button size="mini" icon="el-icon-upload" @click="importExcel()">导入数据</el-button>
                <el-button size="mini" @click="handleAlbum()" v-has="'skill:music:albumlist'">专辑列表</el-button>
                <el-button size="mini" @click="handleSinger()" v-has="'skill:music:singerlist'">歌手管理</el-button>
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
                    label="歌曲名称"
                    prop="songName"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.songName" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.songName }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.songName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="歌曲ID"
                    prop="songId"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.songId" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.songId }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.songId }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="专辑ID"
                    prop="id"
                    align="center">
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
                    label="QQ音乐MID"
                    prop="songMid"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" v-if="!showTitle" :content="scope.row.songMid" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.songMid }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.songMid }}
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
                        v-has="'skill:music:updatesong'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'skill:music:deletesong'">删除</el-button>
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
                <el-form-item label="歌曲名称" prop="songName">
                    <el-input type="text" v-model.trim="currentItem.songName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐MID" prop="songMid">
                    <el-input type="text" v-model.trim="currentItem.songMid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐ID" prop="songId">
                    <el-input type="text" v-model.trim="currentItem.songId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="对应专辑ID" prop="songAlbumId">
                    <el-input type="text" v-model.trim="currentItem.songAlbumId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="对应歌手简介" prop="songSingerId">
                    <el-input type="text" v-model.trim="currentItem.songSingerId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌曲来源" prop="songSource">
                    <el-select v-model="currentItem.songSource" placeholder="--" clearable>
                        <el-option v-for="(item,index) in sourceList" :key="index" :label="item.appName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="歌曲名称" prop="songName">
                    <el-input type="text" v-model.trim="addList.songName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐MID" prop="songMid">
                    <el-input type="text" v-model.trim="addList.songMid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ音乐ID" prop="songId">
                    <el-input type="text" v-model.trim="addList.songId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="对应专辑ID" prop="songAlbumId">
                    <el-input type="text" v-model.trim="addList.songAlbumId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="对应歌手ID" prop="songSingerId">
                    <el-input type="text" v-model.trim="addList.songSingerId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌曲来源" prop="songSource">
                    <el-select v-model="addList.songSource" placeholder="--" clearable>
                        <el-option v-for="(item,index) in sourceList" :key="index" :label="item.appName" :value="item.id"></el-option>
                    </el-select>
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
import {songList, songDel, songUpd, songAdd, songSelect, songUpFile} from '@/config/api'
import {deleteParams} from '@/utils/deleteParams.js'
export default {
    data() {
        return {
            list: [],
            perList:[],
            fileList:[],
            totalClass:'8',
            currentItem: {//编辑数据组
                id:"",
                songName: "",
                songMid: "",
                songId: "",
                songAlbumId:"",
                songSingerId:"",
                songSource:""
            },
            sourceList:[],
            addList: {//添加数据组
                songName: "",
                songMid: "",
                songId: "",
                songAlbumId:"",
                songSingerId:"",
                songSource:""
            },
            searchItem:{//搜索数据组
                name:"",
            },
            addRules:{
                songName: [{ required: true, message: '请输入歌曲名称', trigger: 'change' }],
                songMid: [{ required: true, message: '请输入QQ音乐MID', trigger: 'change' }],
                songId: [{ required: true, message: '请输入QQ音乐ID', trigger: 'change' }],
                songAlbumId:[{ required: true, message: '请输入对应专辑ID', trigger: 'change' }],
                songSingerId:[{ required: true, message: '对应歌手ID', trigger: 'change' }],
                songSource:[{ required: true, message: '请选择歌曲来源', trigger: 'change' }]
            },
            editRules:{
                songName: [{ required: true, message: '请输入歌曲名称', trigger: 'change' }],
                songMid: [{ required: true, message: '请输入QQ音乐MID', trigger: 'change' }],
                songId: [{ required: true, message: '请输入QQ音乐ID', trigger: 'change' }],
                songAlbumId:[{ required: true, message: '请输入对应专辑ID', trigger: 'change' }],
                songSingerId:[{ required: true, message: '对应歌手ID', trigger: 'change' }],
                songSource:[{ required: true, message: '请选择歌曲来源', trigger: 'change' }]
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
        if(this.perList.indexOf('skill:music:updatesong') == -1 && this.perList.indexOf('skill:music:deletesong') == -1){
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
        importExcel(){
            this.uploadVisible = true
        },
        closeFile(){
            this.uploadVisible = false
        },
        fileChange(file,fileList) {
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
            console.log(this.fileList)
            if(this.$refs.upload.$children[0].fileList.length < 1){
                this.$message.warning('请选择要上传的文件！')
                return false
            }else{
               var fileData = new FormData();
                this.fileList.forEach(function(item,index){
                    fileData.append("file", item.raw);
                });
                this.fileBtnLoading = true;
                songUpFile(fileData).then(res=>{
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
            this.editVisible = true;
            songSelect().then(res=>{
                this.sourceList = res.data
            })
            this.currentItem = {
                id:row.id,
                songName: row.songName,
                songMid: row.songMid,
                songId: row.songId,
                songAlbumId:row.songAlbumId,
                songSingerId:row.songSingerId,
                songSource:row.songSource
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
                songDel(delParams).then(res=>{
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
            }).catch((err) => {
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
            this.addVisible = false
        },
        editHandleConfirm(currentItem) {
            let updParams = {
                id:this.currentItem.id,
                songName: this.currentItem.songName,
                songMid: this.currentItem.songMid,
                songId: this.currentItem.songId,
                songAlbumId:this.currentItem.songAlbumId,
                songSingerId:this.currentItem.songSingerId,
                songSource:this.currentItem.songSource
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    songUpd(updParams).then(res=>{
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
            songSelect().then(res=>{
                this.sourceList = res.data
            })
        },
        addHandleConfirm(addList) {
            let addParams={
                songName: this.addList.songName,
                songMid: this.addList.songMid,
                songId: this.addList.songId,
                songAlbumId:this.addList.songAlbumId,
                songSingerId:this.addList.songSingerId,
                songSource:this.addList.songSource
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    songAdd(addParams).then(res=>{
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
        getList() {
            this.listLoading = true
            let params = {
                name:this.searchItem.name,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            songList(params).then(res => {
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
        handleAlbum(){
            this.$router.push({
                path:'/lasf-kv/album'
            })
        },
        handleSinger(){
            this.$router.push({
                path:'/skill/music/singerlist'
            })
        }
    },
};
</script>

<style scoped>
</style>
