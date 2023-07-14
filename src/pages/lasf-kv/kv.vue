<template>
    <div class="table height-105">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/kv/list'}">LASF KV</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    
    <el-form :inline="true" class="demo-form-inline height70 width130" size="mini" style="float:right;">
        <div class="form-btn">
            <!-- <el-button size="mini" @click="handleState()">报表配置</el-button> -->
            <el-button size="mini" @click="handleAdd()" v-has="'kv:editsave'">添加</el-button>
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
                    label="KEY"
                    prop="key"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="kv-tooltip" effect="dark" v-if="!showTitle" :content="scope.row.key" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.key }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.key }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="VAL"
                    prop="val"
                    align="left">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="kv-tooltip" effect="dark" v-if="!showTitle" :content="scope.row.val" placement="top">
                            <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter">
                            {{ scope.row.val }}
                            </div>
                        </el-tooltip>
                        <div class="toEllipsis" @mouseover="onShowNameTipsMouseenter" v-if="showTitle">
                            {{ scope.row.val }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center"  min-width="200" v-if="isshow">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-has="'kv:update'">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        v-if="scope.row.sta == 1"
                        @click="handleDel(scope.$index, scope.row)"
                        v-has="'gift:status'">删除报表</el-button>
                        <el-button
                        size="mini"
                        type="warning"
                        v-if="scope.row.sta == 2"
                        @click="handleRecall(scope.$index, scope.row)"
                        v-has="'gift:status'">撤回</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        v-has="'kv:delete'">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> 
            <div class="pagination-wrap" v-cloak>
                <ul class="pagination">
                    <li><button :disabled="currentPage==1? true : false" @click="turnToPage(1)"><i class="el-icon-d-arrow-left"></i></button></li>
                    <li v-if="currentPage == getpageNum(totalCount) && currentPage !=1 && currentPage - 2 > 0" class="unum" @click="turnToPage(currentPage-2)" v-text="currentPage-2"></li>
                    <li v-if="currentPage-1>0"  class="unum" @click="turnToPage(currentPage-1)" v-text="currentPage-1"></li>
                    <li class="active" @click="turnToPage(currentPage)" v-text="currentPage"></li>
                    <li v-if="currentPage != getpageNum(totalCount) && getpageNum(totalCount) !=0" class="unum" @click="turnToPage(currentPage+1)" v-text="currentPage+1"></li>
                    <li v-if="currentPage+1 < 3 && currentPage != getpageNum(totalCount) && getpageNum(totalCount) >=3" class="unum" @click="turnToPage(currentPage+2)" v-text="currentPage+2"></li>
                    <li><button :disabled="currentPage == getpageNum(totalCount) || getpageNum(totalCount) == 0? true: false" @click="turnToPage(getpageNum(totalCount))"><i class="el-icon-d-arrow-right"></i></button></li>
                </ul>
            </div>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="编辑" :visible.sync="editVisible" width="40%" top="10vh" :before-close="editHandleClose" @close="closeFun('currentItem')">
            <el-form :label-position="'right'" label-width="120px" size="small" :rules="editRules" :model="currentItem" ref="currentItem">
                <el-form-item label="修改密码" prop="lasfpsd">
                    <el-input type="text" v-model.trim="currentItem.lasfpsd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LASF KEY" prop="lasfkey">
                    <el-input type="text" v-model.trim="currentItem.lasfkey" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="LASF VAL" prop="lasfval">
                    <el-input type="textarea" v-model.trim="currentItem.lasfval" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="editHandleConfirm('currentItem')" :loading="editBtnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="新增" :visible.sync="addVisible" width="40%" top="10vh" :before-close="addHandleClose" @open="openFun('addList')">
            <el-form :label-position="'right'" label-width="100px" size="small" :rules="addRules" :model="addList" ref="addList">
                <el-form-item label="修改密码" prop="lasfpsd">
                    <el-input type="text" v-model.trim="addList.lasfpsd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LASF KEY" prop="lasfkey">
                    <el-input type="text" v-model.trim="addList.lasfkey" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LASF VAL" prop="lasfval">
                    <el-input type="textarea" v-model.trim="addList.lasfval" auto-complete="off"></el-input>
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
import {kvList,kvAdd,kvUpd, giftDel,kvDel} from '@/config/api'
import {userMenu} from '@/config/adminApi'
import {deleteParams} from '@/utils/deleteParams.js'
import {getpageNum} from '@/utils/pagination.js'
export default {
    inject:['reload'],
    data() {
        return {
            getpageNum:getpageNum,
            list: [],
            perList:[],
            addList: {//添加数据组
                lasfpsd:"",
                lasfkey:"",
                lasfval:""
            },
            currentItem:{
                lasfpsd:"",
                lasfkey:"",
                lasfval:""
            },
            columns: [
                {
                prop: "key",
                label: "KEY",
                hasSort:true
                },
                {
                prop: "val",
                label: "VAL",
                hasSort:true,
                className: 'reg'
                }
            ],
            addRules:{
                lasfpsd:[{ required: true, message: '请输入修改密码', trigger: 'change' }],
                lasfkey:[{ required: true, message: '请输入LASF KEY', trigger: 'change' }],
                lasfval:[{ required: true, message: '请输入LASF VAL', trigger: 'change' }],
            },
            editRules:{
                lasfpsd:[{ required: true, message: '请输入修改密码', trigger: 'change' }],
                lasfkey:[{ required: true, message: '请输入LASF KEY', trigger: 'change' }],
                lasfval:[{ required: true, message: '请输入LASF VAL', trigger: 'change' }],
            },
            addVisible: false,
            editVisible:false,
            // 分页
            currentPage: 1, //默认显示第几页
            pageSize: 10,   //默认每页条数
            totalCount:1,     // 总条数
            showTitle:true,
            addBtnLoading:false,
            editBtnLoading:false,
            listLoading:true,
            isshow:true,
            totalClass:'8'
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
        if(this.perList.indexOf('kv:update') == -1 && this.perList.indexOf('kv:delete') == -1){
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
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            // console.log(`当前页: ${val}`);
            this.getList();
            // setTimeout(()=>{
            //     console.log(this.list.length)
            // })
        },
        addHandleClose(){
            this.addVisible = false
        },
        handleAdd(){
            this.addVisible = true
        },
        handleEdit(index, row) {
            // console.log(index, row);
            this.editVisible = true;
            this.currentItem = {
                id:row.id,
                lasfkey: row.key,
                lasfval: row.val
            };
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
        editHandleConfirm(currentItem) {
            let updParams = {
                key:this.currentItem.lasfkey,
                pwd:this.currentItem.lasfpsd,
                val:this.currentItem.lasfval
            }
            updParams.sign = deleteParams(updParams)
            this.$refs[currentItem].validate((valid) => {
                if (valid) {
                    this.editBtnLoading = true
                    kvUpd(updParams).then(res=>{
                        this.editBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'修改成功',
                                type:"success",
                                duration:2000
                            });
                            this.getList()
                            this.editVisible = false
                        }else{
                            this.$message({
                                message:res.data.code+'：'+res.data.msg,
                                type:"error",
                                duration:2000
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
            let addParams = {
                pwd:this.addList.lasfpsd,
                key:this.addList.lasfkey,
                val:this.addList.lasfval
            }
            addParams.sign = deleteParams(addParams)
            this.$refs[addList].validate((valid) => {
                if (valid) {
                    this.addBtnLoading = true
                    kvAdd(addParams).then(res=>{
                        this.addBtnLoading = false
                        if(res.data.code == 200){
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:2000
                            });
                            this.getList();
                            this.addVisible = false
                        }else{
                            this.$message({
                                message:res.data.code+'：'+res.data.msg,
                                type:"error",
                                duration:2000
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
        handleDelete(index, row) {
            let delParams = {
                key:row.key,
            }
            delParams.sign = deleteParams(delParams)
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                kvDel(delParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:2000
                        })
                        this.getList();
                    }else{
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:"error",
                            duration:2000
                        });
                    }
                })
            }).catch(err => {
                console.log(err);
            });
        },
        handleDel(index, row) {
            let delsParams = {
                sql:row.sta,
                name:row.key,
            }
            let logParams = {
                userName:sessionStorage.getItem('username')
            }
            delsParams.sign = deleteParams(delsParams)
            logParams.sign = deleteParams(logParams)
            this.$confirm("此操作不会永久删除该数据, 可以随时撤回, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                giftDel(delsParams).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:'删除成功',
                            type:"success",
                            duration:2000
                        });
                        this.getList();
                        sessionStorage.removeItem('menuData');
                        sessionStorage.removeItem('btnpermission')
                        userMenu(logParams).then((res)=>{
                            if(res.data.code == 200){
                                sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                                this.reload();
                            }else{
                                this.$message({
                                    message:res.data.code+'：'+res.data.msg,
                                    type:"error",
                                    duration:2000
                                });
                            }
                        })
                    }else{
                        this.$message({
                            message:res.data.code+'：'+res.data.msg,
                            type:"error",
                            duration:2000
                        });
                    }
                })
            }).catch(err => {
                console.log(err);
            });
        },
        handleRecall(index, row) {
            let delcParams = {
                sql:row.sta,
                name:row.key,
            }
            let logsParams = {
                userName:sessionStorage.getItem('username')
            }
            delcParams.sign = deleteParams(delcParams)
            logsParams.sign = deleteParams(logsParams)
            giftDel(delcParams).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message:'撤回成功',
                        type:"success",
                        duration:2000
                    });
                    this.getList();
                    sessionStorage.removeItem('menuData');
                    sessionStorage.removeItem('btnpermission')
                    userMenu(logsParams).then((res)=>{
                        if(res.data.code == 200){
                            sessionStorage.setItem('menuData',JSON.stringify(res.data.data))
                            let menuData = res.data.data
                            let menuList=[]
                            for (let item of menuData) {
                                if (item.menutype === 0) {
                                    menuList.push({
                                        ruleCode:item.ruleCode
                                    });
                                }
                                for (let towMenus of item.children) {
                                    if (towMenus.menutype === 2) {
                                        menuList.push({
                                            ruleCode:towMenus.ruleCode
                                        });
                                    }
                                    for (let threeMenus of towMenus.children2) {
                                        if (threeMenus.menutype === 0) {
                                            menuList.push({
                                                ruleCode:threeMenus.ruleCode
                                            });
                                        }
                                    }
                                }
                            }
                            sessionStorage.setItem('btnpermission',JSON.stringify(menuList))
                            this.reload();
                        }else{
                            this.$message({
                                message:res.data.code+'：'+res.data.msg,
                                type:"error",
                                duration:2000
                            });
                        }
                    })
                }else{
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:"error",
                        duration:2000
                    });
                }
            })
        },
        turnToPage(pageNum){
            var ts = this;
            var pageNum = parseInt(pageNum);
            if(pageNum == -1){
                ts.getList(pageNum)
            }else{
                ts.currentPage = pageNum
                if (!pageNum || pageNum < 1) {
                    console.log('页码输入有误！');
                    return false;
                }else{
                    ts.getList(pageNum)
                }
            }
        },
        getList() {
            this.listLoading = true
            let params = {
                pgstr:this.currentPage,
                pcstr:this.pageSize
            }
            params.sign = deleteParams(params)
            kvList(params).then(res => {
                this.listLoading = false
                if(res.data.code == 200){
                    this.list = res.data.data;
                    this.totalCount = res.data.count
                    this.totalClass = res.data.data.length
                }else{
                    this.$message({
                        message:res.data.code+'：'+res.data.msg,
                        type:'error',
                        duration:2000
                    });
                }
            }).catch(()=>{
                this.listLoading = false
            })
        },
        handleState(){
            this.$router.push({
                path:'/gift/add'
            })
        }
    }
};
</script>

<style scoped>

</style>
