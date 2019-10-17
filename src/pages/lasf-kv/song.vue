<template>
    <div class="table">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>LASF KV</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="歌手名称" prop="name">
                <el-input v-model.trim="searchItem.name" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
            </el-form-item>
            <el-button class="success" size="mini" @click="handleAdd()" v-has="158">添加</el-button>
            <el-button class="success" size="mini" @click="handleAlbum()" v-has="153">专辑列表</el-button>
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                style="width: 100%">
                <el-table-column type="index" align="center">
                </el-table-column>
                <el-table-column
                    label="歌曲名称"
                    prop="songName"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="歌曲ID"
                    prop="songId"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="专辑ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="QQ音乐MID"
                    prop="songMid"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="displayUpdateTime"
                    align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="159">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="160">删除</el-button>
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
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'left'" label-width="120px" :rules="addRules" :model="addList" ref="addList">
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
    </div>
</template>

<script>
import {checkTime} from '@/utils/timer.js'
import {songList, songDel, songUpd, songAdd, songSelect} from '@/config/api'
export default {
    name: "applicationlist",
    data() {
        return {
            list: [],
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
                songName: [{ required: true, message: '请输入歌手名称', trigger: 'change' }],
                songMid: [{ required: true, message: '请输入QQ音乐MID', trigger: 'change' }],
                songId: [{ required: true, message: '请输入QQ音乐ID', trigger: 'change' }],
                songAlbumId:[{ required: true, message: '请输入对应专辑ID', trigger: 'change' }],
                songSingerId:[{ required: true, message: '对应歌手ID', trigger: 'change' }],
                songSource:[{ required: true, message: '请选择歌曲来源', trigger: 'change' }]
            },
            editRules:{
                songName: [{ required: true, message: '请输入歌手名称', trigger: 'change' }],
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
                songName: this.currentItem.songName,
                songMid: this.currentItem.songMid,
                songId: this.currentItem.songId,
                songAlbumId:this.currentItem.songAlbumId,
                songSingerId:this.currentItem.songSingerId,
                songSource:this.currentItem.songSource
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    songUpd(updParams).then(res=>{
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
            songSelect().then(res=>{
                this.sourceList = res.data
                console.log(res.data)
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
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    songAdd(addParams).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:1000
                            });
                            this.getList();
                            this.addVisible = false
                            this.addBtnLoading = false
                        }else{
                            this.$message({
                                message:res.data.errorMessage,
                                type:"error",
                                duration:1000
                            });
                            this.addBtnLoading = false
                        }
                        
                    })
                } else {
                    return false;
                }
            });
        },
        handlePub(){
            songPub().then(res=>{
                if(res.data.again == 1){
                    this.$message({
                        message:'发布成功',
                        type:"success",
                        duration:1000
                    });
                    this.getList();
                    this.addVisible = false
                    this.addBtnLoading = false
                }else{
                    this.$message({
                        message:res.data.errorMessage,
                        type:"error",
                        duration:1000
                    });
                    this.addBtnLoading = false
                }
            })
        },
        getList() {
            let params = {
                name:this.searchItem.name,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            songList(params).then(res => {
                this.list = res.data.data;
                this.totalCount = res.data.count
            });
            
        },
        handleAlbum(){
            this.$router.push({
                path:'/lasf-kv/album'
            })
        },
    },
};
</script>

<style scoped>
</style>
