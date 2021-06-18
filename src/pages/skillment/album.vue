<template>
    <div class="table album">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>技能管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-form :inline="true" ref="searchItem" :model="searchItem" class="demo-form-inline search_box" size="mini">
            <el-form-item label="专辑名称" prop="name">
                <el-input v-model.trim="searchItem.name" clearable></el-input>
            </el-form-item>
            <el-form-item class="sub-btn">
                <el-button type="primary" @click="onSubmit" :loading="seaBtnLoading">查询</el-button>
                <el-button @click="resetForm('searchItem')">重置</el-button>
                <el-button size="mini" @click="handleAdd()" v-has="'skill:music:addalbum'">添加</el-button>
                <el-button size="mini" @click="handleSong()" v-has="'skill:music:songlist'">歌曲列表</el-button>
                <el-button size="mini" @click="handleSinger()" v-has="'skill:music:singerlist'">歌手管理</el-button>
            </el-form-item>
            
        </el-form>
        <div class="table-box">
            <el-table
                :data="list"
                :class="this.totalClass <= '5' ? 'limitWidth' :''"
                style="width: 100%"
                v-loading="listLoading">
                <el-table-column type="index" align="left" >
                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="albumName"
                    align="left" 
                    
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="专辑ID"
                    prop="id"
                    align="left" 
                    
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="QQ音乐ID"
                    prop="albumQqId"
                    align="left" 
                    
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="QQ音乐MID"
                    prop="albumQqMid"
                    align="left" 
                    
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="专辑对应歌手ID"
                    prop="albumQqSingerId"
                    align="left" 
                    
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="displayUpdateTime"
                    align="left" 
                    
                    min-width="120">
                </el-table-column>
                <el-table-column label="操作" align="center"  v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'skill:music:updatealbuml'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'skill:music:deletealbum'">删除</el-button>
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

        <el-dialog title="编辑" :visible.sync="editVisible" width="300" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="130px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="专辑名称" prop="albumName">
                    <el-input type="text" v-model.trim="currentItem.albumName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑QQ音乐ID" prop="albumQqId">
                    <el-input type="text" v-model.trim="currentItem.albumQqId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑QQ音乐MID" prop="albumQqMid">
                    <el-input type="text" v-model.trim="currentItem.albumQqMid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑对应歌手ID" prop="albumQqSingerId">
                    <el-input type="text" v-model.trim="currentItem.albumQqSingerId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑QQ音乐图片" prop="albumQqPhoto">
                    <el-input type="text" v-model.trim="currentItem.albumQqPhoto" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="300" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="130px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="专辑名称" prop="albumName">
                    <el-input type="text" v-model.trim="addList.albumName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑QQ音乐ID" prop="albumQqId">
                    <el-input type="text" v-model.trim="addList.albumQqId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑QQ音乐MID" prop="albumQqMid">
                    <el-input type="text" v-model.trim="addList.albumQqMid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑对应歌手ID" prop="albumQqSingerId">
                    <el-input type="text" v-model.trim="addList.albumQqSingerId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="专辑QQ音乐图片" prop="albumQqPhoto">
                    <el-input type="text" v-model.trim="addList.albumQqPhoto" auto-complete="off"></el-input>
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
import {albumList, albumDel, albumUpd, albumAdd} from '@/config/api'
export default {
    data() {
        return {
            list: [],
            perList:[],
            totalClass:'',
            currentItem: {//编辑数据组
                id:"",
                albumName: "",
                albumQqId: "",
                albumQqMid: "",
                albumQqSingerId:"",
                albumQqPhoto:""
            },
            addList: {//添加数据组
                albumName: "",
                albumQqId: "",
                albumQqMid: "",
                albumQqSingerId:"",
                albumQqPhoto:""
            },
            searchItem:{//搜索数据组
                name:"",
            },
            addRules:{
                albumName: [{ required: true, message: '请输入专辑名称', trigger: 'change' }],
                albumQqId: [{ required: true, message: '请输入专辑QQ音乐ID', trigger: 'change' }],
                albumQqMid: [{ required: true, message: '请输入专辑QQ音乐MID', trigger: 'change' }],
                albumQqSingerId:[{ required: true, message: '请输入专辑对应歌手ID', trigger: 'change' }],
                albumQqPhoto:[{ required: true, message: '请输入专辑QQ音乐图片', trigger: 'change' }]
            },
            editRules:{
                albumName: [{ required: true, message: '请输入歌手名称', trigger: 'change' }],
                albumQqId: [{ required: true, message: '请输入QQ音乐ID', trigger: 'change' }],
                albumQqMid: [{ required: true, message: '请输入QQ音乐MID', trigger: 'change' }],
                albumQqSingerId:[{ required: true, message: '请输入专辑对应歌手ID', trigger: 'change' }],
                albumQqPhoto:[{ required: true, message: '请输入专辑QQ音乐图片', trigger: 'change' }]
            },
            editVisible: false,
            addVisible: false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
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
        if(this.perList.indexOf('skill:music:updatealbuml') == -1 && this.perList.indexOf('skill:music:deletealbum') == -1){
            this.isshow = false
        }
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
            // console.log(`当前页: ${val}`);
            this.getList();
        },
        handleEdit(index, row) {
            // console.log(index, row);
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                albumName: row.albumName,
                albumQqId: row.albumQqId,
                albumQqMid: row.albumQqMid,
                albumQqSingerId:row.albumQqSingerId,
                albumQqPhoto:row.albumQqPhoto
            };
        },
        handleDel(index, row) {
            let delParams = {
                albumQqId:row.id
            }
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                albumDel(delParams).then(res=>{
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
                albumName: this.currentItem.albumName,
                albumQqId: this.currentItem.albumQqId,
                albumQqMid: this.currentItem.albumQqMid,
                albumQqPhoto: this.currentItem.albumQqPhoto,
                albumQqIntroduce: this.currentItem.albumQqIntroduce,
                albumQqPosterUrl:this.currentItem.albumQqPosterUrl
            }
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    albumUpd(updParams).then(res=>{
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
                albumName: this.addList.albumName,
                albumQqId: this.addList.albumQqId,
                albumQqMid: this.addList.albumQqMid,
                albumQqSingerId:this.addList.albumQqSingerId,
                albumQqPhoto:this.addList.albumQqPhoto,
            }
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    albumAdd(addParams).then(res=>{
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
            this.listLoading = true
            let params = {
                name:this.searchItem.name,
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            albumList(params).then(res => {
                this.listLoading = false
                this.list = res.data.data;
                this.totalCount = res.data.count
                this.totalClass = res.data.data.length
            });
        },
        handleSong(){
            this.$router.push({
                path:'/lasf-kv/song'
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
